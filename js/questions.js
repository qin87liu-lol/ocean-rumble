// Illinois Kindergarten Math Standards — question bank for all 4 rounds.
// Each question: { text, visual (emoji string), choices: [a,b,c], correct: index }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeChoices(correct, wrongA, wrongB) {
  // Shuffle so correct isn't always first
  const opts = [
    { label: String(correct), isCorrect: true },
    { label: String(wrongA),  isCorrect: false },
    { label: String(wrongB),  isCorrect: false },
  ];
  return shuffle(opts);
}

const EMOJI_FISH  = '🐟';
const EMOJI_CRAB  = '🦀';
const EMOJI_STAR  = '⭐';
const EMOJI_SHELL = '🐚';
const EMOJI_WAVE  = '🌊';

function repeat(emoji, n) {
  return Array(n).fill(emoji).join(' ');
}

// Round 1: Counting 1–5, number recognition
const ROUND1_POOL = [
  { text: 'How many fish?',   visual: repeat(EMOJI_FISH, 3),  choices: makeChoices(3, 1, 5),  correct: 3 },
  { text: 'How many crabs?',  visual: repeat(EMOJI_CRAB, 5),  choices: makeChoices(5, 3, 4),  correct: 5 },
  { text: 'How many stars?',  visual: repeat(EMOJI_STAR, 2),  choices: makeChoices(2, 4, 3),  correct: 2 },
  { text: 'How many shells?', visual: repeat(EMOJI_SHELL, 4), choices: makeChoices(4, 2, 5),  correct: 4 },
  { text: 'How many waves?',  visual: repeat(EMOJI_WAVE, 1),  choices: makeChoices(1, 3, 2),  correct: 1 },
  { text: 'What number comes after 2?', visual: '1  2  ❓',  choices: makeChoices(3, 4, 2),  correct: 3 },
  { text: 'What number comes after 4?', visual: '3  4  ❓',  choices: makeChoices(5, 3, 6),  correct: 5 },
  { text: 'Which number is bigger?\n4 or 2?', visual: '4  🆚  2', choices: makeChoices(4, 2, 3), correct: 4 },
  { text: 'Which number is smaller?\n3 or 5?', visual: '3  🆚  5', choices: makeChoices(3, 5, 4), correct: 3 },
  { text: 'How many fish?',   visual: repeat(EMOJI_FISH, 5),  choices: makeChoices(5, 4, 3),  correct: 5 },
];

// Round 2: Addition within 5, counting to 10
const ROUND2_POOL = [
  { text: '2 + 3 = ?', visual: repeat(EMOJI_FISH, 2) + '  +  ' + repeat(EMOJI_FISH, 3), choices: makeChoices(5, 4, 6), correct: 5 },
  { text: '1 + 4 = ?', visual: repeat(EMOJI_CRAB, 1) + '  +  ' + repeat(EMOJI_CRAB, 4), choices: makeChoices(5, 3, 6), correct: 5 },
  { text: '3 + 2 = ?', visual: repeat(EMOJI_STAR, 3) + '  +  ' + repeat(EMOJI_STAR, 2), choices: makeChoices(5, 4, 6), correct: 5 },
  { text: '4 + 1 = ?', visual: repeat(EMOJI_SHELL, 4) + '  +  ' + repeat(EMOJI_SHELL, 1), choices: makeChoices(5, 4, 6), correct: 5 },
  { text: 'How many fish?',  visual: repeat(EMOJI_FISH, 8),  choices: makeChoices(8, 6, 10), correct: 8 },
  { text: 'How many stars?', visual: repeat(EMOJI_STAR, 10), choices: makeChoices(10, 8, 9), correct: 10 },
  { text: '2 + 2 = ?', visual: repeat(EMOJI_FISH, 2) + '  +  ' + repeat(EMOJI_FISH, 2), choices: makeChoices(4, 3, 5), correct: 4 },
  { text: '3 + 3 = ?', visual: repeat(EMOJI_CRAB, 3) + '  +  ' + repeat(EMOJI_CRAB, 3), choices: makeChoices(6, 5, 7), correct: 6 },
  { text: 'What number comes after 7?', visual: '6  7  ❓', choices: makeChoices(8, 7, 9), correct: 8 },
  { text: 'How many crabs?', visual: repeat(EMOJI_CRAB, 9), choices: makeChoices(9, 8, 10), correct: 9 },
];

// Round 3: Addition & subtraction within 10
const ROUND3_POOL = [
  { text: '5 + 4 = ?', visual: '', choices: makeChoices(9, 8, 10), correct: 9 },
  { text: '6 + 3 = ?', visual: '', choices: makeChoices(9, 8, 10), correct: 9 },
  { text: '8 - 3 = ?', visual: '', choices: makeChoices(5, 4, 6),  correct: 5 },
  { text: '7 - 2 = ?', visual: '', choices: makeChoices(5, 4, 6),  correct: 5 },
  { text: '4 + 6 = ?', visual: '', choices: makeChoices(10, 9, 8), correct: 10 },
  { text: '9 - 4 = ?', visual: '', choices: makeChoices(5, 4, 6),  correct: 5 },
  { text: '3 + 7 = ?', visual: '', choices: makeChoices(10, 9, 8), correct: 10 },
  { text: '6 - 3 = ?', visual: '', choices: makeChoices(3, 2, 4),  correct: 3 },
  { text: '5 + 5 = ?', visual: '', choices: makeChoices(10, 9, 8), correct: 10 },
  { text: '8 - 5 = ?', visual: '', choices: makeChoices(3, 2, 4),  correct: 3 },
];

// Round 4: Mix — compare numbers, add/subtract within 10
const ROUND4_POOL = [
  { text: 'Which is more?\n6 or 9?',   visual: '', choices: makeChoices(9, 6, 8),  correct: 9  },
  { text: 'Which is less?\n4 or 7?',   visual: '', choices: makeChoices(4, 7, 5),  correct: 4  },
  { text: '7 + 3 = ?',                  visual: '', choices: makeChoices(10, 9, 8), correct: 10 },
  { text: '10 - 4 = ?',                 visual: '', choices: makeChoices(6, 5, 7),  correct: 6  },
  { text: 'Which is more?\n3 or 8?',   visual: '', choices: makeChoices(8, 3, 5),  correct: 8  },
  { text: '5 + 3 = ?',                  visual: '', choices: makeChoices(8, 7, 9),  correct: 8  },
  { text: '9 - 6 = ?',                  visual: '', choices: makeChoices(3, 2, 4),  correct: 3  },
  { text: 'Which is less?\n2 or 7?',   visual: '', choices: makeChoices(2, 7, 5),  correct: 2  },
  { text: '6 + 4 = ?',                  visual: '', choices: makeChoices(10, 9, 8), correct: 10 },
  { text: '10 - 7 = ?',                 visual: '', choices: makeChoices(3, 2, 4),  correct: 3  },
];

const QUESTION_POOLS = [null, ROUND1_POOL, ROUND2_POOL, ROUND3_POOL, ROUND4_POOL];

function getQuestions(round) {
  const pool = [...QUESTION_POOLS[round]];
  // Regenerate choices fresh (so they're reshuffled each game)
  return shuffle(pool).slice(0, 5);
}
