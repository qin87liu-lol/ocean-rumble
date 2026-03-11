// Round enemy data: { frame, name, hp }
const ENEMIES = [
  { frame: 14, name: 'Flounder',    label: 'Round 1 Boss' },
  { frame: 10, name: 'Pufferfish',  label: 'Round 2 Boss' },
  { frame: 11, name: 'Hammerhead',  label: 'Round 3 Boss' },
  { frame: 1,  name: 'Giant Crab',  label: 'FINAL BOSS'   },
];

class BattleResultScene extends Phaser.Scene {
  constructor() { super('BattleResult'); }

  create() {
    drawOceanBg(this);

    const round  = GameState.round;
    const enemy  = ENEMIES[round - 1];
    const winChance = GameState.calcWinChance();
    const didWin = Math.random() * 100 < winChance;

    this.add.text(400, 28, `Round ${round} Battle!`, {
      fontSize: '26px', fill: '#ffe066',
      fontFamily: 'Arial Black, Arial', stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(400, 60, enemy.label, {
      fontSize: '17px', fill: '#ff6b6b', fontFamily: 'Arial'
    }).setOrigin(0.5);

    // VS layout
    const playerSpr = this.add.image(170, 240, 'animals', GameState.selectedAnimal).setScale(6);
    const enemySpr  = this.add.image(630, 240, 'animals', enemy.frame).setScale(6).setFlipX(true);

    this.add.text(170, 310, GameState.selectedAnimalName, {
      fontSize: '16px', fill: '#00d2ff', fontFamily: 'Arial'
    }).setOrigin(0.5);
    this.add.text(630, 310, enemy.name, {
      fontSize: '16px', fill: '#ff6b6b', fontFamily: 'Arial'
    }).setOrigin(0.5);

    this.add.text(400, 240, 'VS', {
      fontSize: '52px', fill: '#ffffff',
      fontFamily: 'Arial Black, Arial', stroke: '#e84118', strokeThickness: 6
    }).setOrigin(0.5);

    // Power tier badge
    const tierColor = TIER_COLORS[GameState.powerTier];
    this.add.rectangle(170, 350, 200, 34, tierColor, 0.8).setStrokeStyle(2, 0xffffff);
    this.add.text(170, 350, `${TIER_EMOJI[GameState.powerTier]} ${GameState.powerTier}`, {
      fontSize: '15px', fill: '#ffffff', fontFamily: 'Arial Black, Arial'
    }).setOrigin(0.5);

    // HP bars
    this.drawHpBar(170, 390, GameState.playerStats.hp, 5, 0x27ae60, 'Your HP');
    const enemyHp = [3, 4, 5, 6][round - 1];
    this.drawHpBar(630, 390, enemyHp, 6, 0xe84118, 'Enemy HP');

    // Battle animation phase
    this.time.delayedCall(800, () => this.runBattleAnim(playerSpr, enemySpr, didWin));
  }

  drawHpBar(x, y, val, max, color, label) {
    this.add.text(x, y - 14, label, {
      fontSize: '13px', fill: '#aaaaaa', fontFamily: 'Arial'
    }).setOrigin(0.5);
    for (let i = 0; i < max; i++) {
      this.add.rectangle(x - (max * 18) / 2 + i * 20 + 9, y + 8, 16, 14,
        i < val ? color : 0x2c3e50
      ).setStrokeStyle(1, 0xffffff).setOrigin(0, 0.5);
    }
  }

  runBattleAnim(playerSpr, enemySpr, didWin) {
    // Simulate shooting back and forth
    let shots = 0;
    const maxShots = 5;

    const shootOnce = () => {
      if (shots >= maxShots) {
        this.time.delayedCall(400, () => this.showResult(didWin, playerSpr, enemySpr));
        return;
      }
      shots++;
      // Alternate: player shoots then enemy shoots
      const fromX = 220, toX = 580;
      const proj = this.add.circle(fromX, 240, 7, 0x00d2ff);
      this.tweens.add({
        targets: proj, x: toX, duration: 400,
        onComplete: () => {
          proj.destroy();
          this.cameras.main.shake(60, 0.006);
          this.time.delayedCall(300, shootOnce);
        }
      });
    };
    shootOnce();
  }

  showResult(didWin, playerSpr, enemySpr) {
    if (didWin) {
      // Victory flash
      this.cameras.main.flash(300, 255, 215, 0);
      this.add.text(400, 460, '🎉 YOU WIN! 🎉', {
        fontSize: '44px', fill: '#ffe066',
        fontFamily: 'Arial Black, Arial', stroke: '#000', strokeThickness: 5
      }).setOrigin(0.5);

      this.tweens.add({ targets: enemySpr, alpha: 0, duration: 600 });

      const nextLabel = GameState.round < 4 ? 'Next Round →' : '🏆 Claim Victory!';
      const btn = this.add.text(400, 540, nextLabel, {
        fontSize: '26px', fill: '#ffffff',
        backgroundColor: '#27ae60',
        fontFamily: 'Arial Black, Arial',
        padding: { x: 24, y: 12 }, stroke: '#000', strokeThickness: 3
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      btn.on('pointerdown', () => {
        if (GameState.round < 4) {
          GameState.round++;
          this.scene.start('MathQuiz');
        } else {
          this.scene.start('Victory');
        }
      });

    } else {
      // Lose
      this.cameras.main.shake(300, 0.015);
      this.add.text(400, 460, '💀 You Lost!', {
        fontSize: '44px', fill: '#e84118',
        fontFamily: 'Arial Black, Arial', stroke: '#000', strokeThickness: 5
      }).setOrigin(0.5);

      this.tweens.add({ targets: playerSpr, alpha: 0, duration: 600 });

      GameState.lives--;

      if (GameState.lives > 0) {
        this.add.text(400, 505, `❤️ x${GameState.lives} lives left`, {
          fontSize: '18px', fill: '#ff6b6b', fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(400, 530, 'Answer more math to power up and try again!', {
          fontSize: '15px', fill: '#ffe066', fontFamily: 'Arial'
        }).setOrigin(0.5);

        const btn = this.add.text(400, 568, '📚 Power Up & Retry!', {
          fontSize: '26px', fill: '#ffffff',
          backgroundColor: '#e67e22',
          fontFamily: 'Arial Black, Arial',
          padding: { x: 24, y: 12 }, stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btn.on('pointerup', () => this.scene.start('MathQuiz'));
      } else {
        this.scene.start('GameOver');
      }
    }
  }
}
