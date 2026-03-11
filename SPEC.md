# Ocean Rumble — Game Specification

## Overview

Ocean Rumble is a web browser game built with **Phaser.js** for Kindergarten-age children (~5 years old). It combines Illinois K math practice with a fun ocean animal battle game. The player selects a sea creature, answers math questions to power it up, then battles a series of 4 AI opponents in a side-facing shooter format.

---

## Core Game Flow

```
Title Screen
    → Animal Selection
        → [Round 1–4 Loop]
            → Math Quiz (5 questions)
            → Power-Up Summary
            → Battle (boss-mode shooter)
            → Win: next round / Lose: retry (3 lives) or Game Over
        → Victory Screen (if all 4 rounds won)
```

---

## Illinois Kindergarten Math Standards Reference

Per CCSS/Illinois K standards, questions will draw from:
- Counting and cardinality (count objects, number recognition 1–20)
- Addition and subtraction within 10
- Comparing numbers (greater/less than)
- Simple number word problems with visual aids

---

## Math Quiz Rules

- **5 questions** before each battle
- Questions are displayed with large text and visuals (e.g., pictures of fish to count)
- Player taps/clicks the correct answer from 3 multiple-choice options
- **Scoring:**
  - Correct answer: +2 power points
  - Correct answer answered quickly (< 5 seconds): +1 bonus power point
  - Wrong answer: 0 points (no penalty — this is for a 5-year-old!)
- Max score per quiz: **15 power points**

### Difficulty Progression by Round

| Round | Focus | Example |
|-------|-------|---------|
| 1 | Counting & number recognition 1–5 | "How many fish? 🐟🐟🐟" |
| 2 | Addition within 5, counting to 10 | "2 + 3 = ?" |
| 3 | Addition & subtraction within 10 | "7 - 3 = ?" |
| 4 | Mix: compare numbers, add/subtract within 10 | "Which is more: 6 or 9?" |

---

## Power System

Math score translates into battle stats:

| Power Points | Tier | Health | Fire Rate | Projectile Size |
|---|---|---|---|---|
| 12–15 | Max Power | 5 HP | Fast | Large |
| 8–11 | Strong | 4 HP | Medium | Medium |
| 4–7 | Normal | 3 HP | Normal | Small |
| 0–3 | Weak | 2 HP | Slow | Tiny |

A fun "power-up animation" plays after the quiz showing what tier the animal reached.

---

## Battle Mechanic

- **Format:** Two animals face each other on screen (player on left, enemy on right)
- Think of it as **boss mode** — the AI opponent is large and formidable
- **Player controls:**
  - Arrow keys (or WASD) to move up/down
  - Spacebar (or click/tap) to shoot
- **Enemy AI:** moves up/down in a pattern and fires back at set intervals
- **Projectiles:** ocean-themed (bubbles, shells, ink blobs)
- **Win condition:** reduce enemy HP to 0
- **Lose condition:** player HP reaches 0

### Lives System
- Player has **3 lives per round**
- Losing a battle uses 1 life; player retries the battle (no re-quiz)
- Losing all 3 lives = **Game Over** (return to title screen)
- Lives carry across rounds (not reset each round — adds tension!)

### Enemy Scaling by Round

| Round | Enemy | Enemy HP | Enemy Fire Rate |
|---|---|---|---|
| 1 | Small fish (easy) | 3 HP | Slow |
| 2 | Pufferfish (medium) | 4 HP | Medium |
| 3 | Shark (hard) | 5 HP | Fast |
| 4 | Giant Crab (boss) | 6 HP | Fast + patterns |

---

## Animal Assets

Source: `MarineAnimals/PixelCreatures.png.PNG` — a single spritesheet with ~20 pixel art sea creatures.

Player can choose from a curated selection of **6 animals** on the selection screen.

---

## Screens Summary

| Screen | Description |
|---|---|
| **Title Screen** | "Ocean Rumble" logo, animated ocean background, Start button |
| **Animal Selection** | Grid of 6 animals, player clicks to pick one |
| **Math Quiz** | 5 questions, large visuals, multiple choice (3 options) |
| **Power-Up Summary** | Shows tier earned, animal animation |
| **Battle Screen** | Main gameplay — shooter battle |
| **Round Win Screen** | Short celebration, "Next Round" button |
| **Game Over Screen** | Friendly message, "Try Again" button |
| **Victory Screen** | Celebration, "You won Ocean Rumble!" |

---

## Technical Stack

- **Engine:** Phaser 3 (latest stable)
- **Language:** JavaScript
- **Assets:** PNG sprites from `MarineAnimals/` folder
- **Audio:** Simple royalty-free ocean SFX (optional per milestone)
- **Target:** Desktop web browser (keyboard controls primary, click/tap secondary)
- **Resolution:** 800x600

---

---

# Milestones

Each milestone is independently **playable** — you can test and enjoy the game at each stage.

---

## Milestone 1 — Playable Core Loop (No Battle)

**Goal:** The complete game flow works end-to-end, but the battle is replaced by a simple "calculated result" screen based on math score alone.

### Deliverables
- [ ] `index.html` + Phaser 3 project scaffolding
- [ ] **Title Screen** with Start button
- [ ] **Animal Selection Screen** — 6 animals from spritesheet, player clicks to select
- [ ] **Math Quiz Screen** — 5 questions per round, all 4 rounds functional
  - Round-appropriate question types and difficulty
  - Visual aids (emoji or simple graphics)
  - 3 multiple-choice answers
  - Timer per question (shown visually)
  - Score tracking
- [ ] **Power-Up Summary Screen** — shows tier earned based on score
- [ ] **Simulated Battle Result** — a simple animated screen showing "You Win!" or "You Lose!" based on power tier (no actual shooting yet)
- [ ] **Round progression** — 4 rounds loop correctly
- [ ] **Victory Screen** and **Game Over Screen**
- [ ] Basic ocean color palette / background

**Playable experience:** Child can play the full math quiz game through all 4 rounds and see outcomes. Fun and educational on its own.

---

## Milestone 2 — Battle Mechanic

**Goal:** Replace the simulated battle with a real shooter battle scene.

### Deliverables
- [ ] **Battle Scene** fully implemented
  - Player animal (left side) controlled with arrow keys + spacebar
  - Player can move up/down within bounds
  - Player fires projectiles (bubbles/shells) on spacebar
  - Enemy animal (right side) moves in simple AI pattern (up/down oscillation)
  - Enemy fires back at regular intervals
  - Projectile collision detection
  - Health bars displayed for both player and enemy
  - Enemy HP and fire rate scaled to round number
- [ ] **Power stats applied** — player HP, fire rate, and projectile size based on math quiz tier
- [ ] **Lives system** — 3 lives, lose one on battle loss, retry battle
- [ ] **Round Win / Game Over** transitions wired to real battle outcome
- [ ] Sprite animations: idle and shooting states (2-frame minimum)
- [ ] Basic hit flash effect when taking damage

**Playable experience:** Full game is playable — math + real battles. Core gameplay loop complete.

---

## Milestone 3 — Polish & Full Experience

**Goal:** Make it feel like a real game a 5-year-old will love and want to replay.

### Deliverables
- [ ] **Animated ocean background** — scrolling waves, bubbles
- [ ] **Sound effects**
  - Button clicks
  - Correct / wrong answer sounds
  - Power-up fanfare
  - Shooting / hit sounds
  - Victory jingle
- [ ] **Visual feedback improvements**
  - Particle effects on hit
  - Screen shake on big hits
  - Animated power-up meter filling up
  - Confetti / celebration on victory
- [ ] **Round 4 boss** — Giant Crab with more complex fire pattern (shoots in bursts or spread)
- [ ] **Math question polish**
  - Correct answer triggers green flash + ✓
  - Wrong answer triggers red flash (no shame, just feedback)
  - Animated fish/object counters for counting questions
- [ ] **Mobile/touch support** — on-screen buttons for move/shoot
- [ ] **Score display** — running total shown at end
- [ ] **Accessibility** — large buttons, high-contrast text, simple font
- [ ] Final playtesting pass for 5-year-old usability

**Playable experience:** Polished, complete game ready for a child to enjoy independently.

---

## Open Questions / Future Ideas
- Add a second player mode (two kids play together)?
- Difficulty settings (easy/medium/hard math)?
- Unlockable animals as reward for winning?
- Save progress / track math stats over time?
