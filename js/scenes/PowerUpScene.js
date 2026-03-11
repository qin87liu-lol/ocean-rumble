const TIER_COLORS = {
  'Max Power': 0xf1c40f,
  'Strong':    0x27ae60,
  'Normal':    0x2980b9,
  'Weak':      0x7f8c8d,
};
const TIER_EMOJI = {
  'Max Power': '⚡⚡⚡',
  'Strong':    '💪💪',
  'Normal':    '👍',
  'Weak':      '😅',
};
const TIER_MSG = {
  'Max Power': 'UNSTOPPABLE!\nFull power activated!',
  'Strong':    'Looking strong!\nReady for battle!',
  'Normal':    'Good effort!\nLet\'s do this!',
  'Weak':      'Keep practicing!\nYou can still win!',
};

class PowerUpScene extends Phaser.Scene {
  constructor() { super('PowerUp'); }

  create() {
    drawOceanBg(this);

    const tier  = GameState.powerTier;
    const color = TIER_COLORS[tier];
    const stats = GameState.playerStats;

    SoundManager.powerup();

    this.add.text(400, 40, `Round ${GameState.round} — Power Up!`, {
      fontSize: '26px', fill: '#ffe066',
      fontFamily: 'Arial Black, Arial', stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5);

    // Animal (big, centered) — scale in
    const animalSpr = this.add.image(400, 185, 'animals', GameState.selectedAnimal)
      .setScale(2).setAlpha(0);
    this.tweens.add({
      targets: animalSpr, alpha: 1, scaleX: 7, scaleY: 7,
      duration: 500, ease: 'Back.easeOut'
    });
    // Idle bob
    this.tweens.add({
      targets: animalSpr, y: 192, duration: 900,
      yoyo: true, repeat: -1, ease: 'Sine.easeInOut', delay: 600
    });

    // Tier badge — scale in
    const tierBg = this.add.rectangle(400, 300, 340, 58, color, 0.9)
      .setStrokeStyle(3, 0xffffff).setScale(0);
    this.add.text(400, 300, `${TIER_EMOJI[tier]}  ${tier}  ${TIER_EMOJI[tier]}`, {
      fontSize: '28px', fill: '#ffffff',
      fontFamily: 'Arial Black, Arial', stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5);
    this.tweens.add({ targets: tierBg, scaleX: 1, scaleY: 1, duration: 400, delay: 450, ease: 'Back.easeOut' });

    this.add.text(400, 372, TIER_MSG[tier], {
      fontSize: '20px', fill: '#ffffff', fontFamily: 'Arial',
      align: 'center', stroke: '#000', strokeThickness: 2
    }).setOrigin(0.5);

    // Stat bars — animate filling in
    const statDefs = [
      ['Health',    stats.hp,    5],
      ['Fire Rate', ['Slow','Normal','Medium','Fast'].indexOf(stats.fireRate) + 1, 4],
      ['Power',     ['Tiny','Small','Medium','Large'].indexOf(stats.projectileSize) + 1, 4],
    ];

    statDefs.forEach(([labelTxt, val, max], row) => {
      const y = 440 + row * 32;
      this.add.text(155, y, labelTxt + ':', {
        fontSize: '16px', fill: '#ffe066', fontFamily: 'Arial'
      }).setOrigin(1, 0.5);

      for (let j = 0; j < max; j++) {
        const rect = this.add.rectangle(170 + j * 36, y, 30, 18, 0x2c3e50)
          .setStrokeStyle(1, 0xffffff).setOrigin(0, 0.5);
        if (j < val) {
          this.time.delayedCall(600 + row * 100 + j * 80, () => {
            rect.setFillStyle(color);
            this.tweens.add({
              targets: rect, scaleX: 1.2, scaleY: 1.2, duration: 100,
              yoyo: true, ease: 'Quad.easeOut'
            });
          });
        }
      }
    });

    // Score summary
    this.add.text(400, 545, `Quiz score: ${GameState.quizScore} / 15  •  Total: ${GameState.totalScore}`, {
      fontSize: '15px', fill: '#aaaaaa', fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Battle button — fades in after a moment
    const btn = this.add.text(400, 576, 'Battle! ⚔️', {
      fontSize: '26px', fill: '#ffffff',
      backgroundColor: '#e84118',
      fontFamily: 'Arial Black, Arial',
      padding: { x: 28, y: 12 },
      stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5).setInteractive({ useHandCursor: true }).setAlpha(0);

    this.time.delayedCall(1200, () => {
      this.tweens.add({ targets: btn, alpha: 1, duration: 400 });
      btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#ff6b35' }));
      btn.on('pointerout',  () => btn.setStyle({ backgroundColor: '#e84118' }));
      btn.on('pointerup',   () => {
        SoundManager.click();
        this.scene.start('Battle');
      });
    });
  }
}
