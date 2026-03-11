const QUESTION_TIME = 30; // seconds per question

class MathQuizScene extends Phaser.Scene {
  constructor() { super('MathQuiz'); }

  create() {
    drawOceanBg(this);

    this.questions = getQuestions(GameState.round);
    this.qIndex    = 0;
    this.score     = 0;
    this.answered  = false;

    // Header
    this.add.text(400, 22, `Round ${GameState.round} of 4 — Math Challenge!`, {
      fontSize: '20px', fill: '#ffe066',
      fontFamily: 'Arial Black, Arial', stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5);

    // Progress dots
    this.dots = [];
    for (let i = 0; i < 5; i++) {
      this.dots.push(this.add.circle(320 + i * 40, 55, 10, 0x555555));
    }

    // Lives
    this.add.text(750, 22, `❤️ x${GameState.lives}`, {
      fontSize: '18px', fill: '#ff6b6b', fontFamily: 'Arial'
    }).setOrigin(1, 0.5);

    // Timer bar
    this.add.rectangle(400, 82, 500, 16, 0x1a3c5e);
    this.timerBar = this.add.rectangle(150, 82, 500, 14, 0x00d2ff).setOrigin(0, 0.5);

    // Animal portrait
    this.animalSpr = this.add.image(80, 300, 'animals', GameState.selectedAnimal).setScale(4);
    // Gentle bob
    this.tweens.add({
      targets: this.animalSpr, y: 308, duration: 900,
      yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });

    this.add.text(80, 340, GameState.selectedAnimalName, {
      fontSize: '13px', fill: '#ffe066', fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Score display
    this.scoreText = this.add.text(720, 300, 'Score: 0', {
      fontSize: '20px', fill: '#ffffff',
      fontFamily: 'Arial', stroke: '#000', strokeThickness: 2
    }).setOrigin(0.5);

    // Question text
    this.questionText = this.add.text(400, 140, '', {
      fontSize: '28px', fill: '#ffffff',
      fontFamily: 'Arial Black, Arial',
      stroke: '#0a3d62', strokeThickness: 4,
      align: 'center', wordWrap: { width: 480 }
    }).setOrigin(0.5);

    // Visual / emoji area
    this.visualText = this.add.text(400, 235, '', {
      fontSize: '30px', fill: '#ffffff',
      fontFamily: 'Arial', align: 'center',
      wordWrap: { width: 560 }
    }).setOrigin(0.5);

    // Answer buttons
    this.choiceBtns = [];
    const btnColors  = [0x8e44ad, 0x27ae60, 0xe67e22];
    const btnHover   = [0xaa55cc, 0x2ecc71, 0xf39c12];

    for (let i = 0; i < 3; i++) {
      const x  = 180 + i * 220;
      const y  = 380;
      const bg = this.add.rectangle(x, y, 180, 80, btnColors[i])
        .setStrokeStyle(3, 0xffffff)
        .setInteractive({ useHandCursor: true });
      const txt = this.add.text(x, y, '?', {
        fontSize: '34px', fill: '#ffffff',
        fontFamily: 'Arial Black, Arial', stroke: '#000', strokeThickness: 3
      }).setOrigin(0.5);

      const idx = i;
      bg.on('pointerover', () => { if (!this.answered) bg.setFillStyle(btnHover[idx]); });
      bg.on('pointerout',  () => { if (!this.answered) bg.setFillStyle(btnColors[idx]); });
      bg.on('pointerup',   () => { if (!this.answered) this.answer(idx); });

      this.choiceBtns.push({ bg, txt, baseColor: btnColors[i] });
    }

    // Feedback text
    this.feedbackText = this.add.text(400, 475, '', {
      fontSize: '36px', fill: '#ffe066',
      fontFamily: 'Arial Black, Arial', stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5);

    // Timer
    this.timeLeft   = QUESTION_TIME;
    this.timerEvent = this.time.addEvent({
      delay: 100, callback: this.tickTimer,
      callbackScope: this, loop: true
    });

    this.showQuestion();
  }

  showQuestion() {
    this.answered  = false;
    this.timeLeft  = QUESTION_TIME;
    this.feedbackText.setText('');
    this.timerBar.setFillStyle(0x00d2ff);

    this.dots.forEach((dot, i) => dot.setFillStyle(i < this.qIndex ? 0xf1c40f : 0x555555));

    const q = this.questions[this.qIndex];
    this.questionText.setText(q.text);
    this.visualText.setText(q.visual || '');

    q.choices.forEach((choice, i) => {
      this.choiceBtns[i].txt.setText(choice.label);
      this.choiceBtns[i].bg.setFillStyle(this.choiceBtns[i].baseColor);
      this.choiceBtns[i].bg.setAlpha(1);
    });

    // Pop-in animation on buttons
    this.choiceBtns.forEach((b, i) => {
      b.bg.setScale(0.8);
      this.tweens.add({
        targets: [b.bg, b.txt], scaleX: 1, scaleY: 1,
        duration: 200, delay: i * 60, ease: 'Back.easeOut'
      });
    });
  }

  tickTimer() {
    if (this.answered) return;
    this.timeLeft -= 0.1;
    const ratio = Math.max(0, this.timeLeft / QUESTION_TIME);
    this.timerBar.setSize(500 * ratio, 14);
    if (ratio < 0.3) this.timerBar.setFillStyle(0xe84118);
    else if (ratio < 0.6) this.timerBar.setFillStyle(0xf39c12);
    if (this.timeLeft <= 0) { this.timeLeft = 0; this.answer(-1); }
  }

  answer(btnIndex) {
    this.answered  = true;
    const q        = this.questions[this.qIndex];
    const chosen   = btnIndex >= 0 ? q.choices[btnIndex] : null;
    const isCorrect = chosen && chosen.isCorrect;
    const isFast    = this.timeLeft > (QUESTION_TIME - 10);

    if (isCorrect) {
      const pts = isFast ? 3 : 2;
      this.score += pts;
      SoundManager.correct();
      this.feedbackText.setText(isFast ? '⚡ Fast! +3' : '✅ Correct! +2');
      this.feedbackText.setColor(isFast ? '#ffe066' : '#2ecc71');
      this.choiceBtns[btnIndex].bg.setFillStyle(0x27ae60);

      // Bounce the correct button
      this.tweens.add({
        targets: [this.choiceBtns[btnIndex].bg, this.choiceBtns[btnIndex].txt],
        scaleX: 1.15, scaleY: 1.15, duration: 120,
        yoyo: true, ease: 'Quad.easeOut'
      });
    } else {
      SoundManager.wrong();
      this.feedbackText.setText(btnIndex === -1 ? '⏰ Time\'s up!' : '❌ Not quite!');
      this.feedbackText.setColor('#ff6b6b');
      if (btnIndex >= 0) {
        this.choiceBtns[btnIndex].bg.setFillStyle(0xe84118);
        // Shake wrong button
        this.tweens.add({
          targets: [this.choiceBtns[btnIndex].bg, this.choiceBtns[btnIndex].txt],
          x: `+=8`, duration: 60, yoyo: true, repeat: 3, ease: 'Linear'
        });
      }
      q.choices.forEach((c, i) => {
        if (c.isCorrect) this.choiceBtns[i].bg.setFillStyle(0x27ae60);
      });
    }

    this.scoreText.setText(`Score: ${this.score}`);
    this.choiceBtns.forEach(b => b.bg.setAlpha(0.7));

    this.time.delayedCall(1300, () => {
      this.qIndex++;
      if (this.qIndex < 5) {
        this.dots[this.qIndex - 1].setFillStyle(0xf1c40f);
        this.showQuestion();
      } else {
        this.finishQuiz();
      }
    });
  }

  finishQuiz() {
    this.timerEvent.remove();
    this.dots.forEach(d => d.setFillStyle(0xf1c40f));
    GameState.quizScore = this.score;
    GameState.addRoundScore(this.score);
    const tier = GameState.calculatePowerTier(this.score);
    GameState.applyStats(tier);
    this.time.delayedCall(500, () => this.scene.start('PowerUp'));
  }
}
