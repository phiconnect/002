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
  synHintBtn: document.getElementById("synHintBtn"),
  synHintText: document.getElementById("synHintText"),
  backMeaning: document.getElementById("backMeaning"),
  backSyn: document.getElementById("backSyn"),
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
function categories() {
  const set = new Set(state.allWords.map((w) => w.category).filter(Boolean));
  return ["ทั้งหมด", ...[...set].sort()];
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

  // Synonym memory aid: front shows a hint button, back reinforces it.
  const syn = synonymFor(w);
  el.synHintText.textContent = syn ? "≈ " + syn : "";
  el.synHintText.hidden = true; // collapsed until the learner asks for the hint
  el.synHintBtn.hidden = !syn;
  el.backSyn.textContent = syn ? "≈ " + syn : "";
  el.backSyn.hidden = !syn;

  // Highlight rating state for the current card
  const knownNow = state.known.has(wordId(w));
  el.knowBtn.textContent = knownNow ? "✅ รู้แล้ว (จำได้)" : "✅ รู้แล้ว";

  setFlipped(false);
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
  }
});

// ---- Init -----------------------------------------------------------------
el.onlyUnknown.checked = state.onlyUnknown;
renderCategoryOptions();
buildDeck(true);
renderAll();
