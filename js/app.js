"use strict";

// ---- Persistence ----------------------------------------------------------
const STORAGE_KEY = "vocab-flashcards";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        known: [...state.known],
        custom: state.custom,
        category: state.category,
        onlyUnknown: state.onlyUnknown,
      })
    );
  } catch (e) {
    /* ignore storage errors (e.g. private mode) */
  }
}

// A stable id so known-status survives reloads even after shuffling.
function wordId(w) {
  return (w.en + "|" + w.th).toLowerCase();
}

// ---- State ----------------------------------------------------------------
const saved = loadState();
const state = {
  allWords: STARTER_WORDS.concat(Array.isArray(saved.custom) ? saved.custom : []),
  custom: Array.isArray(saved.custom) ? saved.custom : [],
  known: new Set(Array.isArray(saved.known) ? saved.known : []),
  category: saved.category || "ชีวิตประจำวัน",
  onlyUnknown: !!saved.onlyUnknown,
  deck: [],
  index: 0,
  flipped: false,
};

// ---- DOM refs -------------------------------------------------------------
const el = {
  categorySelect: document.getElementById("categorySelect"),
  onlyUnknown: document.getElementById("onlyUnknown"),
  shuffleBtn: document.getElementById("shuffleBtn"),
  resetBtn: document.getElementById("resetBtn"),
  scoreKnown: document.getElementById("scoreKnown"),
  scoreRemaining: document.getElementById("scoreRemaining"),
  scorePercent: document.getElementById("scorePercent"),
  progressFill: document.getElementById("progressFill"),
  cardCounter: document.getElementById("cardCounter"),
  flashcard: document.getElementById("flashcard"),
  frontCategory: document.getElementById("frontCategory"),
  frontWord: document.getElementById("frontWord"),
  frontPos: document.getElementById("frontPos"),
  frontExamples: document.getElementById("frontExamples"),
  exBtn: document.getElementById("exBtn"),
  synHintBtn: document.getElementById("synHintBtn"),
  synHintText: document.getElementById("synHintText"),
  backMeaning: document.getElementById("backMeaning"),
  backSyn: document.getElementById("backSyn"),
  backForms: document.getElementById("backForms"),
  backExample: document.getElementById("backExample"),
  ratingRow: document.getElementById("ratingRow"),
  dontKnowBtn: document.getElementById("dontKnowBtn"),
  flipBtn: document.getElementById("flipBtn"),
  knowBtn: document.getElementById("knowBtn"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  emptyMsg: document.getElementById("emptyMsg"),
  addForm: document.getElementById("addForm"),
  addEn: document.getElementById("addEn"),
  addTh: document.getElementById("addTh"),
};

// ---- Helpers --------------------------------------------------------------
// Preferred display order for categories: by level (easy -> hard), then idioms,
// then topical sets, then user-added. Categories not listed fall to the end.
const CATEGORY_ORDER = [
  "ทั้งหมด",
  "ชีวิตประจำวัน",
  "ระดับกลาง",
  "ขั้นสูง",
  "สำนวน",
  // ธุรกิจ / การสื่อสารในการทำงาน
  "อีเมลธุรกิจ",
  "ประชุม & เจรจา",
  "โทรศัพท์ & นัดหมาย",
  "การเงิน & การค้า",
  "วลีมืออาชีพ",
  // หมวดเฉพาะเรื่อง
  "อาหาร",
  "การเดินทาง",
  "อารมณ์",
  "การงาน",
  "ของฉัน",
];

function categories() {
  const set = new Set(state.allWords.map((w) => w.category).filter(Boolean));
  const all = ["ทั้งหมด", ...set];
  return all.sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

// Build a "word family" string from the forms map, e.g.
// "n. analysis · v. analyze · adj. analytical · adv. analytically".
function wordFamilyFor(w) {
  if (typeof WORD_FORMS === "undefined") return "";
  const forms = WORD_FORMS[w.en];
  if (!forms) return "";
  const labels = [["n", "n."], ["v", "v."], ["adj", "adj."], ["adv", "adv."]];
  const parts = labels
    .filter(([key]) => forms[key])
    .map(([key, label]) => `${label} ${forms[key]}`);
  return parts.length >= 2 ? parts.join("  ·  ") : "";
}

// Collect English example sentences for a word: its own `example` plus any
// extra ones from the EXAMPLES map. Used to let learners guess from context
// before flipping to the answer.
function examplesFor(w) {
  const list = [];
  if (w.example) list.push(w.example);
  if (typeof EXAMPLES !== "undefined" && Array.isArray(EXAMPLES[w.en])) {
    for (const s of EXAMPLES[w.en]) if (s && list.indexOf(s) === -1) list.push(s);
  }
  return list;
}

// Bold the target word inside an example sentence (case-insensitive).
function highlightWord(sentence, word) {
  try {
    const esc = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp("\\b(" + esc + ")\\b", "ig");
    if (re.test(sentence)) return sentence.replace(re, "<b>$1</b>");
  } catch (e) {
    /* fall through */
  }
  return sentence;
}

// Look up an English synonym for a word (memory aid). Returns "" if none.
// A word may carry its own `syn` field; otherwise fall back to the shared map.
function synonymFor(w) {
  if (w.syn) return w.syn;
  if (typeof SYNONYMS !== "undefined" && SYNONYMS[w.en]) return SYNONYMS[w.en];
  return "";
}

function wordsInCategory() {
  if (state.category === "ทั้งหมด") return state.allWords;
  return state.allWords.filter((w) => w.category === state.category);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(doShuffle) {
  let pool = wordsInCategory();
  if (state.onlyUnknown) pool = pool.filter((w) => !state.known.has(wordId(w)));
  state.deck = doShuffle ? shuffle(pool) : pool;
  state.index = 0;
  state.flipped = false;
}

// ---- Rendering ------------------------------------------------------------
function renderCategoryOptions() {
  el.categorySelect.innerHTML = "";
  for (const cat of categories()) {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    if (cat === state.category) opt.selected = true;
    el.categorySelect.appendChild(opt);
  }
}

function renderScore() {
  const pool = wordsInCategory();
  const total = pool.length;
  const known = pool.filter((w) => state.known.has(wordId(w))).length;
  const remaining = total - known;
  const pct = total ? Math.round((known / total) * 100) : 0;
  el.scoreKnown.textContent = known;
  el.scoreRemaining.textContent = remaining;
  el.scorePercent.textContent = pct + "%";
  el.progressFill.style.width = pct + "%";
}

function setFlipped(flipped) {
  state.flipped = flipped;
  el.flashcard.classList.toggle("flipped", flipped);
  el.flashcard.setAttribute("aria-pressed", String(flipped));
}

function renderCard() {
  const hasCards = state.deck.length > 0;
  el.emptyMsg.hidden = hasCards;
  el.flashcard.style.display = hasCards ? "" : "none";
  el.ratingRow.style.visibility = hasCards ? "visible" : "hidden";

  // Disable nav at edges
  el.prevBtn.disabled = !hasCards || state.index === 0;
  el.nextBtn.disabled = !hasCards || state.index === state.deck.length - 1;
  el.knowBtn.disabled = !hasCards;
  el.dontKnowBtn.disabled = !hasCards;
  el.flipBtn.disabled = !hasCards;

  if (!hasCards) {
    el.cardCounter.textContent = "การ์ดที่ 0 / 0";
    return;
  }

  const w = state.deck[state.index];
  el.cardCounter.textContent = `การ์ดที่ ${state.index + 1} / ${state.deck.length}`;
  el.frontCategory.textContent = w.category || "";
  el.frontWord.textContent = w.en;
  el.frontPos.textContent = w.pos || "";
  el.backMeaning.textContent = w.th;
  el.backExample.textContent = w.example || "";

  // Example sentences (guess-from-context): collapsed until requested.
  state.curExamples = examplesFor(w);
  state.exShown = 0;
  el.frontExamples.innerHTML = "";
  el.frontExamples.hidden = true;
  el.exBtn.hidden = state.curExamples.length === 0;
  el.exBtn.textContent = "📝 ดูประโยคตัวอย่าง";

  // Synonym memory aid: front shows a hint button, back reinforces it.
  const syn = synonymFor(w);
  el.synHintText.textContent = syn ? "≈ " + syn : "";
  el.synHintText.hidden = true; // collapsed until the learner asks for the hint
  el.synHintBtn.hidden = !syn;
  el.backSyn.textContent = syn ? "≈ " + syn : "";
  el.backSyn.hidden = !syn;

  // Word family (noun / verb / adjective / adverb forms) on the back.
  const family = wordFamilyFor(w);
  el.backForms.textContent = family;
  el.backForms.hidden = !family;

  // Highlight rating state for the current card
  const knownNow = state.known.has(wordId(w));
  el.knowBtn.textContent = knownNow ? "✅ รู้แล้ว (จำได้)" : "✅ รู้แล้ว";

  setFlipped(false);
}

// Reveal one more example sentence on the front (without flipping the card),
// so the learner can guess the meaning from several contexts first.
function revealExample() {
  if (state.deck.length === 0 || !state.curExamples) return;
  if (state.exShown >= state.curExamples.length) return;
  const w = state.deck[state.index];
  const div = document.createElement("div");
  div.className = "ex-sentence";
  div.innerHTML = highlightWord(state.curExamples[state.exShown], w.en);
  el.frontExamples.appendChild(div);
  el.frontExamples.hidden = false;
  state.exShown++;
  const n = state.curExamples.length;
  if (state.exShown >= n) {
    el.exBtn.hidden = true;
  } else {
    el.exBtn.textContent = "📝 ดูอีกประโยค (" + state.exShown + "/" + n + ")";
  }
}

// Reveal the synonym hint on the front without flipping the card.
function revealHint() {
  if (state.deck.length === 0 || el.synHintBtn.hidden) return;
  el.synHintText.hidden = false;
  el.synHintBtn.hidden = true;
}

function renderAll() {
  renderScore();
  renderCard();
}

// ---- Actions --------------------------------------------------------------
function goTo(index) {
  if (index < 0 || index >= state.deck.length) return;
  state.index = index;
  renderCard();
}

function next() {
  goTo(state.index + 1);
}

function prev() {
  goTo(state.index - 1);
}

function flip() {
  if (state.deck.length === 0) return;
  setFlipped(!state.flipped);
}

function rate(known) {
  if (state.deck.length === 0) return;
  const w = state.deck[state.index];
  const id = wordId(w);
  if (known) state.known.add(id);
  else state.known.delete(id);
  saveState();
  renderScore();

  // Move forward; if "onlyUnknown" is on and we just learned a word,
  // rebuild so it drops out of the deck.
  if (state.onlyUnknown && known) {
    const wasLast = state.index >= state.deck.length - 1;
    buildDeck(true);
    if (state.deck.length === 0) {
      renderAll();
      return;
    }
    state.index = wasLast ? 0 : Math.min(state.index, state.deck.length - 1);
    renderCard();
  } else if (state.index < state.deck.length - 1) {
    next();
  } else {
    renderCard();
  }
}

function reset() {
  const pool = wordsInCategory();
  for (const w of pool) state.known.delete(wordId(w));
  saveState();
  buildDeck(true);
  renderAll();
}

function addWord(en, th) {
  const word = { en: en.trim(), th: th.trim(), category: "ของฉัน" };
  if (!word.en || !word.th) return;
  state.custom.push(word);
  state.allWords.push(word);
  saveState();
  renderCategoryOptions();
  buildDeck(true);
  renderAll();
}

// ---- Events ---------------------------------------------------------------
el.categorySelect.addEventListener("change", (e) => {
  state.category = e.target.value;
  saveState();
  buildDeck(true);
  renderAll();
});

el.onlyUnknown.addEventListener("change", (e) => {
  state.onlyUnknown = e.target.checked;
  saveState();
  buildDeck(true);
  renderAll();
});

el.shuffleBtn.addEventListener("click", () => {
  buildDeck(true);
  renderAll();
});

el.resetBtn.addEventListener("click", reset);
el.flashcard.addEventListener("click", flip);
el.flipBtn.addEventListener("click", flip);
el.exBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // show an example without flipping the card
  revealExample();
});
el.synHintBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // reveal the hint without flipping the card
  revealHint();
});
el.knowBtn.addEventListener("click", () => rate(true));
el.dontKnowBtn.addEventListener("click", () => rate(false));
el.nextBtn.addEventListener("click", next);
el.prevBtn.addEventListener("click", prev);

el.addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addWord(el.addEn.value, el.addTh.value);
  el.addEn.value = "";
  el.addTh.value = "";
  el.addEn.focus();
});

document.addEventListener("keydown", (e) => {
  // Don't hijack typing inside inputs/selects
  const tag = (e.target.tagName || "").toLowerCase();
  if (tag === "input" || tag === "select" || tag === "textarea") return;

  switch (e.key) {
    case " ":
    case "Enter":
      e.preventDefault();
      flip();
      break;
    case "ArrowRight":
      next();
      break;
    case "ArrowLeft":
      prev();
      break;
    case "k":
    case "K":
      rate(true);
      break;
    case "j":
    case "J":
      rate(false);
      break;
    case "h":
    case "H":
      revealHint();
      break;
    case "e":
    case "E":
      revealExample();
      break;
  }
});

// ---- Init -----------------------------------------------------------------
el.onlyUnknown.checked = state.onlyUnknown;
renderCategoryOptions();
buildDeck(true);
renderAll();
