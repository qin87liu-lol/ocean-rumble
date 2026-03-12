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

const EMOJI_FISH  = '🐟';
const EMOJI_CRAB  = '🦀';
const EMOJI_STAR  = '⭐';
const EMOJI_SHELL = '🐚';
const EMOJI_WAVE  = '🌊';

function repeat(emoji, n) { return Array(n).fill(emoji).join('  '); }

// Round 1: Counting 1–5, number recognition
const ROUND1_POOL = [
  { text: 'How many fish?',            visual: repeat(EMOJI_FISH,  3), correct: 3, wrongA: 1, wrongB: 5 },
  { text: 'How many crabs?',           visual: repeat(EMOJI_CRAB,  5), correct: 5, wrongA: 3, wrongB: 4 },
  { text: 'How many stars?',           visual: repeat(EMOJI_STAR,  2), correct: 2, wrongA: 4, wrongB: 3 },
  { text: 'How many shells?',          visual: repeat(EMOJI_SHELL, 4), correct: 4, wrongA: 2, wrongB: 5 },
  { text: 'How many waves?',           visual: repeat(EMOJI_WAVE,  1), correct: 1, wrongA: 3, wrongB: 2 },
  { text: 'How many fish?',            visual: repeat(EMOJI_FISH,  5), correct: 5, wrongA: 4, wrongB: 3 },
  { text: 'How many crabs?',           visual: repeat(EMOJI_CRAB,  3), correct: 3, wrongA: 2, wrongB: 4 },
  { text: 'How many stars?',           visual: repeat(EMOJI_STAR,  4), correct: 4, wrongA: 3, wrongB: 5 },
  { text: 'What number comes after 2?',visual: '1 ➡ 2 ➡ ❓',           correct: 3, wrongA: 4, wrongB: 2 },
  { text: 'What number comes after 4?',visual: '3 ➡ 4 ➡ ❓',           correct: 5, wrongA: 3, wrongB: 6 },
  { text: 'Which number is bigger?\n4 or 2?',  visual: '4   🆚   2',  correct: 4, wrongA: 2, wrongB: 3 },
  { text: 'Which number is smaller?\n3 or 5?', visual: '3   🆚   5',  correct: 3, wrongA: 5, wrongB: 4 },
];

// Round 2: Addition within 5, counting to 10
const ROUND2_POOL = [
  { text: '2 + 3 = ?', visual: repeat(EMOJI_FISH,  2) + '   ➕   ' + repeat(EMOJI_FISH,  3), correct: 5,  wrongA: 4,  wrongB: 6  },
  { text: '1 + 4 = ?', visual: repeat(EMOJI_CRAB,  1) + '   ➕   ' + repeat(EMOJI_CRAB,  4), correct: 5,  wrongA: 3,  wrongB: 6  },
  { text: '3 + 2 = ?', visual: repeat(EMOJI_STAR,  3) + '   ➕   ' + repeat(EMOJI_STAR,  2), correct: 5,  wrongA: 4,  wrongB: 6  },
  { text: '4 + 1 = ?', visual: repeat(EMOJI_SHELL, 4) + '   ➕   ' + repeat(EMOJI_SHELL, 1), correct: 5,  wrongA: 4,  wrongB: 6  },
  { text: '2 + 2 = ?', visual: repeat(EMOJI_FISH,  2) + '   ➕   ' + repeat(EMOJI_FISH,  2), correct: 4,  wrongA: 3,  wrongB: 5  },
  { text: '3 + 3 = ?', visual: repeat(EMOJI_CRAB,  3) + '   ➕   ' + repeat(EMOJI_CRAB,  3), correct: 6,  wrongA: 5,  wrongB: 7  },
  { text: 'How many fish?',            visual: repeat(EMOJI_FISH, 7),  correct: 7,  wrongA: 6,  wrongB: 8  },
  { text: 'How many stars?',           visual: repeat(EMOJI_STAR, 9),  correct: 9,  wrongA: 8,  wrongB: 10 },
  { text: 'How many crabs?',           visual: repeat(EMOJI_CRAB, 8),  correct: 8,  wrongA: 6,  wrongB: 10 },
  { text: 'What number comes after 7?',visual: '6 ➡ 7 ➡ ❓',           correct: 8,  wrongA: 7,  wrongB: 9  },
  { text: 'What number comes after 9?',visual: '8 ➡ 9 ➡ ❓',           correct: 10, wrongA: 8,  wrongB: 11 },
  { text: 'How many shells?',          visual: repeat(EMOJI_SHELL, 6), correct: 6,  wrongA: 5,  wrongB: 7  },
];

// Round 3: Addition & subtraction within 10
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
];

// Round 4: Mix — compare numbers, add/subtract within 10
const ROUND4_POOL = [
  { text: 'Which is more?\n6 or 9?',  visual: '', correct: 9,  wrongA: 6,  wrongB: 8  },
  { text: 'Which is less?\n4 or 7?',  visual: '', correct: 4,  wrongA: 7,  wrongB: 5  },
  { text: '7 + 3 = ?',                visual: '', correct: 10, wrongA: 9,  wrongB: 8  },
  { text: '10 - 4 = ?',               visual: '', correct: 6,  wrongA: 5,  wrongB: 7  },
  { text: 'Which is more?\n3 or 8?',  visual: '', correct: 8,  wrongA: 3,  wrongB: 5  },
  { text: '5 + 3 = ?',                visual: '', correct: 8,  wrongA: 7,  wrongB: 9  },
  { text: '9 - 6 = ?',                visual: '', correct: 3,  wrongA: 2,  wrongB: 4  },
  { text: 'Which is less?\n2 or 7?',  visual: '', correct: 2,  wrongA: 7,  wrongB: 5  },
  { text: '6 + 4 = ?',                visual: '', correct: 10, wrongA: 9,  wrongB: 8  },
  { text: '10 - 7 = ?',               visual: '', correct: 3,  wrongA: 2,  wrongB: 4  },
  { text: 'Which is more?\n5 or 10?', visual: '', correct: 10, wrongA: 5,  wrongB: 8  },
  { text: '8 - 2 = ?',                visual: '', correct: 6,  wrongA: 5,  wrongB: 7  },
];

const QUESTION_POOLS = [null, ROUND1_POOL, ROUND2_POOL, ROUND3_POOL, ROUND4_POOL];

// Choices are reshuffled fresh on every call — so answer positions vary each game.
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
