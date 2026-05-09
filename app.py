import os
import re
import json
import uuid
from flask import Flask, render_template, request, redirect, url_for, session, jsonify

app = Flask(__name__)
app.secret_key = os.urandom(24)
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # 5 MB limit
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'static', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# ---------------------------------------------------------------------------
# LaTeX parser
# ---------------------------------------------------------------------------

def strip_latex_commands(text):
    """Remove common formatting commands while keeping content."""
    text = re.sub(r'\\textbf\{([^}]*)\}', r'\1', text)
    text = re.sub(r'\\textit\{([^}]*)\}', r'\1', text)
    text = re.sub(r'\\emph\{([^}]*)\}', r'\1', text)
    text = re.sub(r'\\text\{([^}]*)\}', r'\\text{\1}', text)  # keep \text inside math
    text = re.sub(r'\\label\{[^}]*\}', '', text)
    text = re.sub(r'\\ref\{[^}]*\}', '', text)
    text = re.sub(r'\\noindent\b', '', text)
    text = re.sub(r'\\hspace\{[^}]*\}', '', text)
    text = re.sub(r'\\vspace\{[^}]*\}', '', text)
    return text.strip()


def extract_choices(block):
    """
    Return list of choice strings from an 'choices' / 'enumerate' / 'itemize'
    environment inside a question block.
    """
    choices = []
    env_pat = re.compile(
        r'\\begin\{(?:choices|enumerate|itemize)\}(.*?)\\end\{(?:choices|enumerate|itemize)\}',
        re.DOTALL
    )
    m = env_pat.search(block)
    if not m:
        return choices
    inner = m.group(1)
    # split on \item or \choice
    parts = re.split(r'\\(?:item|choice)\b', inner)
    for part in parts:
        part = strip_latex_commands(part).strip()
        if part:
            choices.append(part)
    return choices


def extract_answer(block):
    """Pull out answer metadata like \\answer{...} or \\correctchoice{...}."""
    m = re.search(r'\\(?:answer|correctanswer|correctchoice)\{([^}]*)\}', block)
    if m:
        return m.group(1).strip()
    return None


def parse_latex_questions(latex_text):
    """
    Parse a LaTeX document and return a list of question dicts:
      {
        "text": <question stem>,
        "choices": [<str>, ...],   # empty list if open-ended
        "answer": <str or None>
      }

    Supports:
      - \\begin{question}...\\end{question}
      - \\begin{problem}...\\end{problem}
      - \\begin{exercise}...\\end{exercise}
      - \\begin{parts}...\\part ...
      - Bare \\item inside \\begin{enumerate} at top level
    """
    questions = []

    # 1. Named environments: question / problem / exercise
    named_env = re.compile(
        r'\\begin\{(question|problem|exercise)\}(.*?)\\end\{\1\}',
        re.DOTALL | re.IGNORECASE
    )
    for m in named_env.finditer(latex_text):
        block = m.group(2)
        choices = extract_choices(block)
        # Remove the choices sub-environment from the stem
        stem = re.sub(
            r'\\begin\{(?:choices|enumerate|itemize)\}.*?\\end\{(?:choices|enumerate|itemize)\}',
            '', block, flags=re.DOTALL
        )
        answer = extract_answer(block)
        # Remove answer metadata from the visible stem
        stem = re.sub(r'\\(?:answer|correctanswer|correctchoice)\{[^}]*\}', '', stem)
        stem = strip_latex_commands(stem).strip()
        if stem:
            questions.append({'text': stem, 'choices': choices, 'answer': answer})

    # 2. \part items inside \begin{parts}...\end{parts}
    parts_env = re.compile(r'\\begin\{parts\}(.*?)\\end\{parts\}', re.DOTALL)
    for m in parts_env.finditer(latex_text):
        inner = m.group(1)
        items = re.split(r'\\part\b', inner)
        for item in items[1:]:
            choices = extract_choices(item)
            stem = re.sub(
                r'\\begin\{(?:choices|enumerate|itemize)\}.*?\\end\{(?:choices|enumerate|itemize)\}',
                '', item, flags=re.DOTALL
            )
            answer = extract_answer(item)
            stem = re.sub(r'\\(?:answer|correctanswer|correctchoice)\{[^}]*\}', '', stem)
            stem = strip_latex_commands(stem).strip()
            if stem:
                questions.append({'text': stem, 'choices': choices, 'answer': answer})

    # 3. Fallback: \item inside top-level \begin{enumerate}
    if not questions:
        enum_env = re.compile(r'\\begin\{enumerate\}(.*?)\\end\{enumerate\}', re.DOTALL)
        for m in enum_env.finditer(latex_text):
            inner = m.group(1)
            items = re.split(r'\\item\b', inner)
            for item in items[1:]:
                stem = strip_latex_commands(item).strip()
                if stem:
                    questions.append({'text': stem, 'choices': [], 'answer': None})

    return questions


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/upload', methods=['POST'])
def upload():
    f = request.files.get('latex_file')
    if not f or not f.filename.endswith('.tex'):
        return render_template('index.html', error='Please upload a .tex file.')

    content = f.read().decode('utf-8', errors='replace')
    questions = parse_latex_questions(content)

    if not questions:
        return render_template('index.html', error=(
            'No questions found. Make sure your file uses \\begin{question}…\\end{question}, '
            '\\begin{problem}…, \\begin{exercise}…, \\begin{parts}…\\part…, '
            'or \\begin{enumerate}…\\item… environments.'
        ))

    # Store in session (questions are small JSON)
    session['questions'] = questions
    session['score'] = 0
    session['current'] = 0
    session['answers'] = [None] * len(questions)
    return redirect(url_for('quiz'))


@app.route('/quiz', methods=['GET'])
def quiz():
    questions = session.get('questions')
    if not questions:
        return redirect(url_for('index'))
    return render_template('quiz.html', total=len(questions))


@app.route('/api/question/<int:idx>', methods=['GET'])
def api_question(idx):
    questions = session.get('questions', [])
    if idx < 0 or idx >= len(questions):
        return jsonify({'error': 'out of range'}), 404
    q = questions[idx]
    return jsonify({
        'index': idx,
        'total': len(questions),
        'text': q['text'],
        'choices': q['choices'],
        'has_answer': q['answer'] is not None,
    })


@app.route('/api/answer', methods=['POST'])
def api_answer():
    data = request.get_json()
    idx = data.get('index')
    user_ans = data.get('answer', '').strip()
    questions = session.get('questions', [])
    answers = session.get('answers', [])

    if idx is None or idx >= len(questions):
        return jsonify({'error': 'invalid index'}), 400

    q = questions[idx]
    correct_ans = q.get('answer')
    is_correct = None
    if correct_ans is not None:
        is_correct = user_ans.lower() == correct_ans.lower()

    answers[idx] = user_ans
    session['answers'] = answers
    return jsonify({'correct': is_correct, 'correct_answer': correct_ans})


@app.route('/api/results', methods=['GET'])
def api_results():
    questions = session.get('questions', [])
    answers = session.get('answers', [])
    scored = 0
    scorable = 0
    details = []
    for i, q in enumerate(questions):
        user_ans = answers[i] if i < len(answers) else None
        correct_ans = q.get('answer')
        is_correct = None
        if correct_ans is not None:
            scorable += 1
            is_correct = (user_ans or '').lower() == correct_ans.lower()
            if is_correct:
                scored += 1
        details.append({
            'text': q['text'],
            'choices': q['choices'],
            'user_answer': user_ans,
            'correct_answer': correct_ans,
            'is_correct': is_correct,
        })
    return jsonify({'scored': scored, 'scorable': scorable, 'total': len(questions), 'details': details})


@app.route('/reset')
def reset():
    session.clear()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True, port=5000)
