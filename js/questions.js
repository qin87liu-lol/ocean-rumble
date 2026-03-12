// Illinois Kindergarten Math Standards — question bank for all 4 rounds.
// Pool format: { text, visual, correct, wrongA, wrongB }
// Choices are reshuffled fresh every time getQuestions() is called.

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeChoices(correct, wrongA, wrongB) {
  return shuffle([
    { label: String(correct), isCorrect: true  },
    { label: String(wrongA),  isCorrect: false },
    { label: String(wrongB),  isCorrect: false },
  ]);
}

const EMOJI_FISH    = '🐟';
const EMOJI_CRAB    = '🦀';
const EMOJI_STAR    = '⭐';
const EMOJI_SHELL   = '🐚';
const EMOJI_WAVE    = '🌊';
const EMOJI_OCTO    = '🐙';
const EMOJI_SHARK   = '🦈';
const EMOJI_TURTLE  = '🐢';
const EMOJI_SHRIMP  = '🦐';
const EMOJI_LOBSTER = '🦞';
const EMOJI_DOLPHIN = '🐬';
const EMOJI_BUBBLE  = '🫧';

function repeat(emoji, n) { return Array(n).fill(emoji).join('  '); }

// ─── Round 1: Counting 1–5, number recognition ───────────────────────────────
const ROUND1_POOL = [
  { text: 'How many fish?',       visual: repeat(EMOJI_FISH,    3), correct: 3, wrongA: 1, wrongB: 5 },
  { text: 'How many crabs?',      visual: repeat(EMOJI_CRAB,    5), correct: 5, wrongA: 3, wrongB: 4 },
  { text: 'How many stars?',      visual: repeat(EMOJI_STAR,    2), correct: 2, wrongA: 4, wrongB: 3 },
  { text: 'How many shells?',     visual: repeat(EMOJI_SHELL,   4), correct: 4, wrongA: 2, wrongB: 5 },
  { text: 'How many waves?',      visual: repeat(EMOJI_WAVE,    1), correct: 1, wrongA: 3, wrongB: 2 },
  { text: 'How many fish?',       visual: repeat(EMOJI_FISH,    5), correct: 5, wrongA: 4, wrongB: 3 },
  { text: 'How many crabs?',      visual: repeat(EMOJI_CRAB,    3), correct: 3, wrongA: 2, wrongB: 4 },
  { text: 'How many stars?',      visual: repeat(EMOJI_STAR,    4), correct: 4, wrongA: 3, wrongB: 5 },
  { text: 'How many octopus?',    visual: repeat(EMOJI_OCTO,    2), correct: 2, wrongA: 3, wrongB: 1 },
  { text: 'How many sharks?',     visual: repeat(EMOJI_SHARK,   1), correct: 1, wrongA: 2, wrongB: 3 },
  { text: 'How many turtles?',    visual: repeat(EMOJI_TURTLE,  4), correct: 4, wrongA: 5, wrongB: 3 },
  { text: 'How many shrimp?',     visual: repeat(EMOJI_SHRIMP,  3), correct: 3, wrongA: 4, wrongB: 2 },
  { text: 'How many dolphins?',   visual: repeat(EMOJI_DOLPHIN, 5), correct: 5, wrongA: 4, wrongB: 3 },
  { text: 'How many bubbles?',    visual: repeat(EMOJI_BUBBLE,  2), correct: 2, wrongA: 1, wrongB: 3 },
  { text: 'How many lobsters?',   visual: repeat(EMOJI_LOBSTER, 4), correct: 4, wrongA: 3, wrongB: 5 },
  { text: 'How many shells?',     visual: repeat(EMOJI_SHELL,   1), correct: 1, wrongA: 2, wrongB: 3 },
  { text: 'How many octopus?',    visual: repeat(EMOJI_OCTO,    5), correct: 5, wrongA: 4, wrongB: 3 },
  { text: 'How many turtles?',    visual: repeat(EMOJI_TURTLE,  2), correct: 2, wrongA: 1, wrongB: 3 },
  { text: 'How many shrimp?',     visual: repeat(EMOJI_SHRIMP,  5), correct: 5, wrongA: 3, wrongB: 4 },
  { text: 'How many dolphins?',   visual: repeat(EMOJI_DOLPHIN, 3), correct: 3, wrongA: 2, wrongB: 4 },
  { text: 'What number comes after 2?',  visual: '1 ➡ 2 ➡ ❓', correct: 3, wrongA: 4, wrongB: 2 },
  { text: 'What number comes after 4?',  visual: '3 ➡ 4 ➡ ❓', correct: 5, wrongA: 3, wrongB: 6 },
  { text: 'What number comes after 1?',  visual: '0 ➡ 1 ➡ ❓', correct: 2, wrongA: 3, wrongB: 1 },
  { text: 'What number comes after 3?',  visual: '2 ➡ 3 ➡ ❓', correct: 4, wrongA: 5, wrongB: 3 },
  { text: 'Which number is bigger?\n4 or 2?',  visual: '4   🆚   2', correct: 4, wrongA: 2, wrongB: 3 },
  { text: 'Which number is smaller?\n3 or 5?', visual: '3   🆚   5', correct: 3, wrongA: 5, wrongB: 4 },
  { text: 'Which number is bigger?\n1 or 5?',  visual: '1   🆚   5', correct: 5, wrongA: 1, wrongB: 3 },
  { text: 'Which number is smaller?\n2 or 4?', visual: '2   🆚   4', correct: 2, wrongA: 4, wrongB: 3 },
  { text: 'Which number is bigger?\n3 or 2?',  visual: '3   🆚   2', correct: 3, wrongA: 2, wrongB: 1 },
  { text: 'Which number is smaller?\n1 or 4?', visual: '1   🆚   4', correct: 1, wrongA: 4, wrongB: 2 },
];

// ─── Round 2: Addition within 5, counting to 10 ──────────────────────────────
const ROUND2_POOL = [
  { text: '2 + 3 = ?', visual: repeat(EMOJI_FISH,    2) + '   ➕   ' + repeat(EMOJI_FISH,    3), correct: 5,  wrongA: 4,  wrongB: 6  },
  { text: '1 + 4 = ?', visual: repeat(EMOJI_CRAB,    1) + '   ➕   ' + repeat(EMOJI_CRAB,    4), correct: 5,  wrongA: 3,  wrongB: 6  },
  { text: '3 + 2 = ?', visual: repeat(EMOJI_STAR,    3) + '   ➕   ' + repeat(EMOJI_STAR,    2), correct: 5,  wrongA: 4,  wrongB: 6  },
  { text: '4 + 1 = ?', visual: repeat(EMOJI_SHELL,   4) + '   ➕   ' + repeat(EMOJI_SHELL,   1), correct: 5,  wrongA: 4,  wrongB: 6  },
  { text: '2 + 2 = ?', visual: repeat(EMOJI_FISH,    2) + '   ➕   ' + repeat(EMOJI_FISH,    2), correct: 4,  wrongA: 3,  wrongB: 5  },
  { text: '3 + 3 = ?', visual: repeat(EMOJI_CRAB,    3) + '   ➕   ' + repeat(EMOJI_CRAB,    3), correct: 6,  wrongA: 5,  wrongB: 7  },
  { text: '1 + 3 = ?', visual: repeat(EMOJI_OCTO,    1) + '   ➕   ' + repeat(EMOJI_OCTO,    3), correct: 4,  wrongA: 3,  wrongB: 5  },
  { text: '2 + 4 = ?', visual: repeat(EMOJI_TURTLE,  2) + '   ➕   ' + repeat(EMOJI_TURTLE,  4), correct: 6,  wrongA: 5,  wrongB: 7  },
  { text: '1 + 2 = ?', visual: repeat(EMOJI_SHRIMP,  1) + '   ➕   ' + repeat(EMOJI_SHRIMP,  2), correct: 3,  wrongA: 2,  wrongB: 4  },
  { text: '3 + 4 = ?', visual: repeat(EMOJI_BUBBLE,  3) + '   ➕   ' + repeat(EMOJI_BUBBLE,  4), correct: 7,  wrongA: 6,  wrongB: 8  },
  { text: '4 + 4 = ?', visual: repeat(EMOJI_DOLPHIN, 4) + '   ➕   ' + repeat(EMOJI_DOLPHIN, 4), correct: 8,  wrongA: 7,  wrongB: 9  },
  { text: '5 + 3 = ?', visual: repeat(EMOJI_STAR,    5) + '   ➕   ' + repeat(EMOJI_STAR,    3), correct: 8,  wrongA: 7,  wrongB: 9  },
  { text: 'How many fish?',    visual: repeat(EMOJI_FISH,    7), correct: 7,  wrongA: 6,  wrongB: 8  },
  { text: 'How many stars?',   visual: repeat(EMOJI_STAR,    9), correct: 9,  wrongA: 8,  wrongB: 10 },
  { text: 'How many crabs?',   visual: repeat(EMOJI_CRAB,    8), correct: 8,  wrongA: 6,  wrongB: 10 },
  { text: 'How many bubbles?', visual: repeat(EMOJI_BUBBLE,  6), correct: 6,  wrongA: 5,  wrongB: 7  },
  { text: 'How many turtles?', visual: repeat(EMOJI_TURTLE,  10),correct: 10, wrongA: 9,  wrongB: 8  },
  { text: 'How many shrimp?',  visual: repeat(EMOJI_SHRIMP,  7), correct: 7,  wrongA: 8,  wrongB: 6  },
  { text: 'How many dolphins?',visual: repeat(EMOJI_DOLPHIN, 9), correct: 9,  wrongA: 8,  wrongB: 10 },
  { text: 'What number comes after 5?', visual: '4 ➡ 5 ➡ ❓', correct: 6,  wrongA: 5,  wrongB: 7  },
  { text: 'What number comes after 7?', visual: '6 ➡ 7 ➡ ❓', correct: 8,  wrongA: 7,  wrongB: 9  },
  { text: 'What number comes after 9?', visual: '8 ➡ 9 ➡ ❓', correct: 10, wrongA: 8,  wrongB: 11 },
  { text: 'What number comes after 6?', visual: '5 ➡ 6 ➡ ❓', correct: 7,  wrongA: 6,  wrongB: 8  },
  { text: 'What number comes after 8?', visual: '7 ➡ 8 ➡ ❓', correct: 9,  wrongA: 8,  wrongB: 10 },
  { text: 'Which is bigger?\n6 or 8?',  visual: '6   🆚   8',  correct: 8,  wrongA: 6,  wrongB: 7  },
  { text: 'Which is smaller?\n7 or 9?', visual: '7   🆚   9',  correct: 7,  wrongA: 9,  wrongB: 8  },
  { text: 'Which is bigger?\n5 or 9?',  visual: '5   🆚   9',  correct: 9,  wrongA: 5,  wrongB: 7  },
  { text: 'Which is smaller?\n6 or 10?',visual: '6   🆚   10', correct: 6,  wrongA: 10, wrongB: 8  },
  { text: 'Which is bigger?\n7 or 4?',  visual: '7   🆚   4',  correct: 7,  wrongA: 4,  wrongB: 5  },
  { text: 'Which is smaller?\n3 or 8?', visual: '3   🆚   8',  correct: 3,  wrongA: 8,  wrongB: 5  },
];

// ─── Round 3: Addition & subtraction within 10 ───────────────────────────────
const ROUND3_POOL = [
  { text: '5 + 4 = ?',  visual: '', correct: 9,  wrongA: 8,  wrongB: 10 },
  { text: '6 + 3 = ?',  visual: '', correct: 9,  wrongA: 8,  wrongB: 10 },
  { text: '8 - 3 = ?',  visual: '', correct: 5,  wrongA: 4,  wrongB: 6  },
  { text: '7 - 2 = ?',  visual: '', correct: 5,  wrongA: 4,  wrongB: 6  },
  { text: '4 + 6 = ?',  visual: '', correct: 10, wrongA: 9,  wrongB: 8  },
  { text: '9 - 4 = ?',  visual: '', correct: 5,  wrongA: 4,  wrongB: 6  },
  { text: '3 + 7 = ?',  visual: '', correct: 10, wrongA: 9,  wrongB: 8  },
  { text: '6 - 3 = ?',  visual: '', correct: 3,  wrongA: 2,  wrongB: 4  },
  { text: '5 + 5 = ?',  visual: '', correct: 10, wrongA: 9,  wrongB: 8  },
  { text: '8 - 5 = ?',  visual: '', correct: 3,  wrongA: 2,  wrongB: 4  },
  { text: '2 + 7 = ?',  visual: '', correct: 9,  wrongA: 8,  wrongB: 10 },
  { text: '10 - 3 = ?', visual: '', correct: 7,  wrongA: 6,  wrongB: 8  },
  { text: '4 + 5 = ?',  visual: '', correct: 9,  wrongA: 8,  wrongB: 10 },
  { text: '7 - 4 = ?',  visual: '', correct: 3,  wrongA: 2,  wrongB: 4  },
  { text: '6 + 4 = ?',  visual: '', correct: 10, wrongA: 9,  wrongB: 8  },
  { text: '9 - 3 = ?',  visual: '', correct: 6,  wrongA: 5,  wrongB: 7  },
  { text: '5 + 3 = ?',  visual: '', correct: 8,  wrongA: 7,  wrongB: 9  },
  { text: '10 - 6 = ?', visual: '', correct: 4,  wrongA: 3,  wrongB: 5  },
  { text: '7 + 2 = ?',  visual: '', correct: 9,  wrongA: 8,  wrongB: 10 },
  { text: '8 - 4 = ?',  visual: '', correct: 4,  wrongA: 3,  wrongB: 5  },
  { text: '3 + 6 = ?',  visual: '', correct: 9,  wrongA: 8,  wrongB: 10 },
  { text: '10 - 2 = ?', visual: '', correct: 8,  wrongA: 7,  wrongB: 9  },
  { text: '6 + 2 = ?',  visual: '', correct: 8,  wrongA: 7,  wrongB: 9  },
  { text: '9 - 5 = ?',  visual: '', correct: 4,  wrongA: 3,  wrongB: 5  },
  { text: '4 + 4 = ?',  visual: '', correct: 8,  wrongA: 7,  wrongB: 9  },
  { text: '7 - 3 = ?',  visual: '', correct: 4,  wrongA: 3,  wrongB: 5  },
  { text: '5 + 2 = ?',  visual: '', correct: 7,  wrongA: 6,  wrongB: 8  },
  { text: '10 - 5 = ?', visual: '', correct: 5,  wrongA: 4,  wrongB: 6  },
  { text: '6 + 1 = ?',  visual: '', correct: 7,  wrongA: 6,  wrongB: 8  },
  { text: '9 - 2 = ?',  visual: '', correct: 7,  wrongA: 6,  wrongB: 8  },
];

// ─── Round 4: Mix — compare numbers, add/subtract within 10 ──────────────────
const ROUND4_POOL = [
  { text: 'Which is more?\n6 or 9?',   visual: '', correct: 9,  wrongA: 6,  wrongB: 8  },
  { text: 'Which is less?\n4 or 7?',   visual: '', correct: 4,  wrongA: 7,  wrongB: 5  },
  { text: '7 + 3 = ?',                  visual: '', correct: 10, wrongA: 9,  wrongB: 8  },
  { text: '10 - 4 = ?',                 visual: '', correct: 6,  wrongA: 5,  wrongB: 7  },
  { text: 'Which is more?\n3 or 8?',   visual: '', correct: 8,  wrongA: 3,  wrongB: 5  },
  { text: '5 + 3 = ?',                  visual: '', correct: 8,  wrongA: 7,  wrongB: 9  },
  { text: '9 - 6 = ?',                  visual: '', correct: 3,  wrongA: 2,  wrongB: 4  },
  { text: 'Which is less?\n2 or 7?',   visual: '', correct: 2,  wrongA: 7,  wrongB: 5  },
  { text: '6 + 4 = ?',                  visual: '', correct: 10, wrongA: 9,  wrongB: 8  },
  { text: '10 - 7 = ?',                 visual: '', correct: 3,  wrongA: 2,  wrongB: 4  },
  { text: 'Which is more?\n5 or 10?',  visual: '', correct: 10, wrongA: 5,  wrongB: 8  },
  { text: '8 - 2 = ?',                  visual: '', correct: 6,  wrongA: 5,  wrongB: 7  },
  { text: 'Which is less?\n1 or 9?',   visual: '', correct: 1,  wrongA: 9,  wrongB: 5  },
  { text: '4 + 5 = ?',                  visual: '', correct: 9,  wrongA: 8,  wrongB: 10 },
  { text: '10 - 8 = ?',                 visual: '', correct: 2,  wrongA: 1,  wrongB: 3  },
  { text: 'Which is more?\n7 or 4?',   visual: '', correct: 7,  wrongA: 4,  wrongB: 5  },
  { text: '6 + 3 = ?',                  visual: '', correct: 9,  wrongA: 8,  wrongB: 10 },
  { text: '9 - 1 = ?',                  visual: '', correct: 8,  wrongA: 7,  wrongB: 9  },
  { text: 'Which is less?\n6 or 3?',   visual: '', correct: 3,  wrongA: 6,  wrongB: 5  },
  { text: '5 + 4 = ?',                  visual: '', correct: 9,  wrongA: 8,  wrongB: 10 },
  { text: '10 - 9 = ?',                 visual: '', correct: 1,  wrongA: 2,  wrongB: 3  },
  { text: 'Which is more?\n8 or 2?',   visual: '', correct: 8,  wrongA: 2,  wrongB: 5  },
  { text: '7 + 2 = ?',                  visual: '', correct: 9,  wrongA: 8,  wrongB: 10 },
  { text: '10 - 1 = ?',                 visual: '', correct: 9,  wrongA: 8,  wrongB: 10 },
  { text: 'Which is less?\n5 or 8?',   visual: '', correct: 5,  wrongA: 8,  wrongB: 7  },
  { text: '3 + 6 = ?',                  visual: '', correct: 9,  wrongA: 8,  wrongB: 10 },
  { text: '8 - 6 = ?',                  visual: '', correct: 2,  wrongA: 1,  wrongB: 3  },
  { text: 'Which is more?\n9 or 6?',   visual: '', correct: 9,  wrongA: 6,  wrongB: 7  },
  { text: '2 + 8 = ?',                  visual: '', correct: 10, wrongA: 9,  wrongB: 8  },
  { text: 'Which is less?\n7 or 10?',  visual: '', correct: 7,  wrongA: 10, wrongB: 9  },
];

const QUESTION_POOLS = [null, ROUND1_POOL, ROUND2_POOL, ROUND3_POOL, ROUND4_POOL];

// Choices reshuffled fresh on every call — answer positions vary each game.
function getQuestions(round) {
  return shuffle([...QUESTION_POOLS[round]])
    .slice(0, 5)
    .map(q => ({
      text:    q.text,
      visual:  q.visual,
      correct: q.correct,
      choices: makeChoices(q.correct, q.wrongA, q.wrongB),
    }));
}
