// Draws a static ocean gradient + wave lines, then starts animated background bubbles.
function drawOceanBg(scene) {
  scene.add.rectangle(400, 300, 800, 600, 0x0a3d62);
  scene.add.rectangle(400, 450, 800, 300, 0x1a5276);
  scene.add.rectangle(400, 570, 800, 60,  0x1f618d);

  // Subtle wave lines
  [120, 240, 360, 480].forEach(y => {
    const g = scene.add.graphics();
    g.lineStyle(1, 0xffffff, 0.06);
    g.beginPath();
    for (let x = 0; x <= 800; x += 4) {
      const wy = y + Math.sin(x * 0.04) * 6;
      x === 0 ? g.moveTo(x, wy) : g.lineTo(x, wy);
    }
    g.strokePath();
  });

  // Start gentle floating bubbles
  _spawnBgBubble(scene);
}

function _spawnBgBubble(scene) {
  if (!scene.sys || !scene.sys.isActive()) return;

  const x = Phaser.Math.Between(10, 790);
  const r = Phaser.Math.Between(3, 11);
  const b = scene.add.circle(x, 630, r, 0xffffff, 0.10);

  scene.tweens.add({
    targets: b,
    y: -30,
    duration: Phaser.Math.Between(5000, 10000),
    ease: 'Linear',
    onComplete: () => b.destroy(),
  });

  scene.time.delayedCall(Phaser.Math.Between(500, 1400), () => _spawnBgBubble(scene));
}

// Emit circular particles from a point (used for hit effects in BattleScene).
function spawnParticles(scene, x, y, color, count = 8) {
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
    const dist  = Phaser.Math.Between(50, 140);
    const r     = Phaser.Math.Between(3, 8);
    const p     = scene.add.circle(x, y, r, color);
    scene.tweens.add({
      targets: p,
      x: x + Math.cos(angle) * dist,
      y: y + Math.sin(angle) * dist,
      alpha: 0,
      scaleX: 0.1, scaleY: 0.1,
      duration: Phaser.Math.Between(280, 560),
      ease: 'Quad.easeOut',
      onComplete: () => p.destroy(),
    });
  }
}
