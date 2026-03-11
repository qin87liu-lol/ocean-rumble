const ENEMY_CONFIGS = [
  { frame: 14, name: 'Narwhal',    hp: 3, oscSpeed: 1.2, fireRate: 1200, type: 'normal' },
  { frame: 10, name: 'Pufferfish', hp: 4, oscSpeed: 1.6, fireRate: 900,  type: 'normal' },
  { frame: 8,  name: 'Hammerhead', hp: 5, oscSpeed: 2.0, fireRate: 650,  type: 'normal' },
  { frame: 19, name: 'Giant Crab', hp: 6, oscSpeed: 1.4, fireRate: 450,  type: 'boss'   },
];

const FIRE_RATE_MS = { 'Slow': 1000, 'Normal': 700, 'Medium': 500, 'Fast': 300 };
const PROJ_RADIUS  = { 'Tiny': 4,    'Small': 6,   'Medium': 10,  'Large': 14  };

class BattleScene extends Phaser.Scene {
  constructor() { super('Battle'); }

  create() {
    const round = GameState.round;
    const stats = GameState.playerStats;
    this.cfg    = ENEMY_CONFIGS[round - 1];

    this.playerHp     = stats.hp;
    this.playerMaxHp  = stats.hp;
    this.enemyHp      = this.cfg.hp;
    this.enemyMaxHp   = this.cfg.hp;
    this.playerFireMs = FIRE_RATE_MS[stats.fireRate];
    this.projRadius   = PROJ_RADIUS[stats.projectileSize];
    this.canShoot     = true;
    this.battleOver   = false;
    this.oscAngle     = 0;
    this.enemyShootMs = 0;
    this.touchUp      = false;
    this.touchDown    = false;

    this.playerBullets = [];
    this.enemyBullets  = [];

    drawOceanBg(this);
    this.createHUD(round);

    this.add.line(400, 300, 0, 0, 0, 540, 0xffffff, 0.08).setOrigin(0.5);

    this.player = this.add.image(130, 300, 'animals', GameState.selectedAnimal).setScale(5);
    this.enemy  = this.add.image(670, 300, 'animals', this.cfg.frame).setScale(5).setFlipX(true);

    this.add.text(130, 358, GameState.selectedAnimalName, {
      fontSize: '13px', fill: '#00d2ff', fontFamily: 'Arial'
    }).setOrigin(0.5);
    this.add.text(670, 358, this.cfg.name, {
      fontSize: '13px', fill: '#ff6b6b', fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Touch controls (always visible — helpful on desktop too)
    this.createTouchControls();

    this.cursors  = this.input.keyboard.createCursorKeys();
    this.wasd     = this.input.keyboard.addKeys({
      up:   Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
    });
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.physics_active = false;
    this.showCountdown();
  }

  // ─── HUD ───────────────────────────────────────────────────────────────────

  createHUD(round) {
    this.add.text(400, 18, `Round ${round}  ⚔️  vs ${this.cfg.name}`, {
      fontSize: '18px', fill: '#ffe066',
      fontFamily: 'Arial Black, Arial', stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5);

    const tierColors = {
      'Max Power': 0xf1c40f, 'Strong': 0x27ae60,
      'Normal': 0x2980b9, 'Weak': 0x7f8c8d
    };
    this.add.rectangle(400, 44, 150, 22, tierColors[GameState.powerTier] || 0x2980b9, 0.85)
      .setStrokeStyle(1, 0xffffff);
    this.add.text(400, 44, `⚡ ${GameState.powerTier}`, {
      fontSize: '12px', fill: '#ffffff', fontFamily: 'Arial Black, Arial'
    }).setOrigin(0.5);

    this.add.text(400, 64, '❤️ '.repeat(GameState.lives).trim(), {
      fontSize: '14px', fill: '#ff6b6b', fontFamily: 'Arial'
    }).setOrigin(0.5);

    this.add.text(10, 38, 'YOUR HP', { fontSize: '11px', fill: '#aaaaaa', fontFamily: 'Arial' });
    this.playerHpBlocks = [];
    for (let i = 0; i < this.playerMaxHp; i++) {
      this.playerHpBlocks.push(
        this.add.rectangle(12 + i * 26, 56, 20, 14, 0x27ae60)
          .setStrokeStyle(1, 0x000000).setOrigin(0, 0.5)
      );
    }

    this.add.text(790, 38, 'BOSS HP', { fontSize: '11px', fill: '#aaaaaa', fontFamily: 'Arial' })
      .setOrigin(1, 0);
    this.enemyHpBlocks = [];
    for (let i = 0; i < this.enemyMaxHp; i++) {
      this.enemyHpBlocks.push(
        this.add.rectangle(788 - i * 26, 56, 20, 14, 0xe84118)
          .setStrokeStyle(1, 0x000000).setOrigin(1, 0.5)
      );
    }
  }

  refreshHUD() {
    this.playerHpBlocks.forEach((r, i) => r.setFillStyle(i < this.playerHp ? 0x27ae60 : 0x2c3e50));
    this.enemyHpBlocks.forEach((r, i)  => r.setFillStyle(i < this.enemyHp  ? 0xe84118 : 0x2c3e50));
  }

  // ─── Touch controls ────────────────────────────────────────────────────────

  createTouchControls() {
    const alpha = 0.35;
    const baseStyle = {
      fontSize: '28px', fill: '#ffffff',
      fontFamily: 'Arial Black, Arial',
      padding: { x: 18, y: 10 },
      backgroundColor: 'rgba(255,255,255,0.0)',
    };

    // Up button
    const upBg = this.add.rectangle(68, 490, 80, 50, 0xffffff, alpha)
      .setStrokeStyle(2, 0xffffff).setInteractive({ useHandCursor: true });
    this.add.text(68, 490, '▲', { fontSize: '26px', fill: '#ffffff', fontFamily: 'Arial' })
      .setOrigin(0.5);
    upBg.on('pointerdown', () => { this.touchUp = true; });
    upBg.on('pointerup',   () => { this.touchUp = false; });
    upBg.on('pointerout',  () => { this.touchUp = false; });

    // Down button
    const downBg = this.add.rectangle(68, 548, 80, 50, 0xffffff, alpha)
      .setStrokeStyle(2, 0xffffff).setInteractive({ useHandCursor: true });
    this.add.text(68, 548, '▼', { fontSize: '26px', fill: '#ffffff', fontFamily: 'Arial' })
      .setOrigin(0.5);
    downBg.on('pointerdown', () => { this.touchDown = true; });
    downBg.on('pointerup',   () => { this.touchDown = false; });
    downBg.on('pointerout',  () => { this.touchDown = false; });

    // Shoot button
    const shootBg = this.add.rectangle(718, 518, 120, 58, 0xe84118, alpha + 0.15)
      .setStrokeStyle(2, 0xff6b6b).setInteractive({ useHandCursor: true });
    this.add.text(718, 518, '💥 FIRE', {
      fontSize: '18px', fill: '#ffffff',
      fontFamily: 'Arial Black, Arial'
    }).setOrigin(0.5);
    shootBg.on('pointerdown', () => this.firePlayerBullet());

    // Keyboard hint (small, center bottom)
    this.add.text(400, 588, '↑↓ or ▲▼ to move  •  SPACE or FIRE to shoot', {
      fontSize: '11px', fill: '#444444', fontFamily: 'Arial'
    }).setOrigin(0.5);
  }

  // ─── Countdown ─────────────────────────────────────────────────────────────

  showCountdown() {
    const steps = ['3', '2', '1', 'FIGHT!'];
    let idx = 0;

    const txt = this.add.text(400, 300, '', {
      fontSize: '80px', fill: '#ffffff',
      fontFamily: 'Arial Black, Arial', stroke: '#000', strokeThickness: 8
    }).setOrigin(0.5).setAlpha(0);

    const tick = () => {
      txt.setText(steps[idx]).setAlpha(1).setScale(0.5);
      if (idx < 3) SoundManager.countdown(); else SoundManager.fight();

      this.tweens.add({
        targets: txt, alpha: 0, scaleX: 1.6, scaleY: 1.6,
        duration: 700, ease: 'Cubic.easeOut',
        onComplete: () => {
          idx++;
          if (idx < steps.length) tick();
          else { txt.destroy(); this.physics_active = true; }
        }
      });
    };
    tick();
  }

  // ─── Shooting ──────────────────────────────────────────────────────────────

  firePlayerBullet() {
    if (!this.canShoot || this.battleOver || !this.physics_active) return;
    this.canShoot = false;
    SoundManager.shoot();

    const b = this.add.circle(this.player.x + 45, this.player.y, this.projRadius, 0x00d2ff);
    b.vx = 520;
    this.playerBullets.push(b);

    this.player.setTint(0xaaddff);
    this.time.delayedCall(80, () => { if (this.player) this.player.clearTint(); });
    this.time.delayedCall(this.playerFireMs, () => { this.canShoot = true; });
  }

  fireEnemyBullet() {
    if (this.battleOver) return;

    const mk = (ox, oy, vx, color) => {
      const b = this.add.circle(this.enemy.x + ox, this.enemy.y + oy, 7, color);
      b.vx = vx;
      this.enemyBullets.push(b);
    };

    mk(-45, 0, -360, 0xe84118);

    if (this.cfg.type === 'boss' && Math.random() < 0.45) {
      mk(-45, -24, -310, 0xff6b35);
      mk(-45,  24, -310, 0xff6b35);
    }

    this.enemy.setTint(0xff8888);
    this.time.delayedCall(80, () => { if (this.enemy) this.enemy.clearTint(); });
  }

  // ─── Hit handling ──────────────────────────────────────────────────────────

  onPlayerHit() {
    if (this.battleOver) return;
    this.playerHp = Math.max(0, this.playerHp - 1);
    this.refreshHUD();
    SoundManager.hit();
    this.cameras.main.shake(150, 0.012);
    spawnParticles(this, this.player.x, this.player.y, 0xff3333, 8);
    this.player.setTint(0xff3333);
    this.time.delayedCall(220, () => { if (this.player) this.player.clearTint(); });
    if (this.playerHp <= 0) this.endBattle(false);
  }

  onEnemyHit() {
    if (this.battleOver) return;
    this.enemyHp = Math.max(0, this.enemyHp - 1);
    this.refreshHUD();
    SoundManager.hit();
    this.cameras.main.shake(80, 0.007);
    spawnParticles(this, this.enemy.x, this.enemy.y, 0xffe066, 8);
    this.enemy.setTint(0xff3333);
    this.time.delayedCall(220, () => { if (this.enemy) this.enemy.clearTint(); });
    if (this.enemyHp <= 0) this.endBattle(true);
  }

  // ─── End battle ────────────────────────────────────────────────────────────

  endBattle(won) {
    this.battleOver = true;

    [...this.playerBullets, ...this.enemyBullets].forEach(b => b.destroy());
    this.playerBullets = [];
    this.enemyBullets  = [];

    this.time.delayedCall(400, () => {
      this.add.rectangle(400, 300, 520, 230, 0x000000, 0.78)
        .setStrokeStyle(3, won ? 0xf1c40f : 0xe84118);

      if (won) {
        this.cameras.main.flash(300, 255, 215, 0);
        this.tweens.add({ targets: this.enemy, alpha: 0, duration: 500 });
        spawnParticles(this, 400, 300, 0xffe066, 16);

        this.add.text(400, 245, '🎉  YOU WIN!  🎉', {
          fontSize: '44px', fill: '#ffe066',
          fontFamily: 'Arial Black, Arial', stroke: '#000', strokeThickness: 5
        }).setOrigin(0.5);

        const nextLabel = GameState.round < 4 ? 'Next Round →' : '🏆 Claim Victory!';
        const btn = this.add.text(400, 335, nextLabel, {
          fontSize: '28px', fill: '#ffffff',
          backgroundColor: '#27ae60',
          fontFamily: 'Arial Black, Arial',
          padding: { x: 26, y: 13 }, stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btn.on('pointerup', () => {
          SoundManager.click();
          if (GameState.round < 4) {
            GameState.round++;
            this.scene.start('MathQuiz');
          } else {
            this.scene.start('Victory');
          }
        });

      } else {
        this.cameras.main.shake(300, 0.016);
        this.tweens.add({ targets: this.player, alpha: 0, duration: 500 });
        GameState.lives--;

        this.add.text(400, 238, '💀  You Lost!', {
          fontSize: '44px', fill: '#e84118',
          fontFamily: 'Arial Black, Arial', stroke: '#000', strokeThickness: 5
        }).setOrigin(0.5);

        if (GameState.lives > 0) {
          this.add.text(400, 296, `❤️ x${GameState.lives} lives remaining`, {
            fontSize: '18px', fill: '#ff6b6b', fontFamily: 'Arial'
          }).setOrigin(0.5);
          this.add.text(400, 320, 'Answer math to power up and try again!', {
            fontSize: '14px', fill: '#ffe066', fontFamily: 'Arial'
          }).setOrigin(0.5);

          const btn = this.add.text(400, 365, '📚  Power Up & Retry!', {
            fontSize: '25px', fill: '#ffffff',
            backgroundColor: '#e67e22',
            fontFamily: 'Arial Black, Arial',
            padding: { x: 22, y: 11 }, stroke: '#000', strokeThickness: 3
          }).setOrigin(0.5).setInteractive({ useHandCursor: true });

          btn.on('pointerup', () => {
            SoundManager.click();
            this.scene.start('MathQuiz');
          });
        } else {
          this.time.delayedCall(1200, () => this.scene.start('GameOver'));
        }
      }
    });
  }

  // ─── Main loop ─────────────────────────────────────────────────────────────

  update(time, delta) {
    if (!this.physics_active || this.battleOver) return;

    const dt = delta / 1000;

    // Player movement
    const goUp   = this.cursors.up.isDown   || this.wasd.up.isDown   || this.touchUp;
    const goDown = this.cursors.down.isDown || this.wasd.down.isDown || this.touchDown;
    if (goUp)   this.player.y = Math.max(85,  this.player.y - 280 * dt);
    if (goDown) this.player.y = Math.min(520, this.player.y + 280 * dt);

    // Player shoot
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) this.firePlayerBullet();

    // Enemy oscillation
    this.oscAngle += this.cfg.oscSpeed * dt;
    this.enemy.y   = 300 + Math.sin(this.oscAngle) * 130;

    // Enemy shoot
    this.enemyShootMs += delta;
    if (this.enemyShootMs >= this.cfg.fireRate) {
      this.enemyShootMs = 0;
      this.fireEnemyBullet();
    }

    // Player bullets
    for (let i = this.playerBullets.length - 1; i >= 0; i--) {
      const b = this.playerBullets[i];
      b.x += b.vx * dt;

      if (b.x > 820) {
        b.destroy(); this.playerBullets.splice(i, 1); continue;
      }

      const dx = b.x - this.enemy.x, dy = b.y - this.enemy.y;
      if (dx * dx + dy * dy < 52 * 52) {
        b.destroy(); this.playerBullets.splice(i, 1);
        this.onEnemyHit();
        if (this.battleOver) return;
      }
    }

    // Enemy bullets
    for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
      const b = this.enemyBullets[i];
      b.x += b.vx * dt;

      if (b.x < -20) {
        b.destroy(); this.enemyBullets.splice(i, 1); continue;
      }

      const dx = b.x - this.player.x, dy = b.y - this.player.y;
      if (dx * dx + dy * dy < 48 * 48) {
        b.destroy(); this.enemyBullets.splice(i, 1);
        this.onPlayerHit();
        if (this.battleOver) return;
      }
    }
  }
}
