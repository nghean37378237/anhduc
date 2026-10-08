/**
 * High-fidelity procedural photo generators.
 * Creates instant, ultra-crisp photo artworks via HTML5 canvas,
 * ensuring zero broken images, zero external network dependency, and 100% offline reliability.
 */

export interface SamplePhoto {
  id: string;
  title: string;
  category: string;
  dataUrl: string;
}

function createHaLongSunset(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 900;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 900);
  skyGrad.addColorStop(0, '#1e1b4b');
  skyGrad.addColorStop(0.3, '#701a75');
  skyGrad.addColorStop(0.6, '#c2410c');
  skyGrad.addColorStop(0.85, '#f59e0b');
  skyGrad.addColorStop(1, '#fef08a');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 1200, 900);

  // Glowing sun
  const sunGrad = ctx.createRadialGradient(600, 420, 20, 600, 420, 260);
  sunGrad.addColorStop(0, '#ffffff');
  sunGrad.addColorStop(0.2, '#fef08a');
  sunGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.4)');
  sunGrad.addColorStop(1, 'rgba(249, 115, 22, 0)');
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(600, 420, 260, 0, Math.PI * 2);
  ctx.fill();

  // Distant misty mountains
  ctx.fillStyle = 'rgba(88, 28, 135, 0.4)';
  ctx.beginPath();
  ctx.moveTo(0, 520);
  ctx.bezierCurveTo(200, 460, 350, 500, 500, 470);
  ctx.bezierCurveTo(650, 440, 850, 480, 1000, 460);
  ctx.bezierCurveTo(1100, 450, 1180, 470, 1200, 480);
  ctx.lineTo(1200, 900);
  ctx.lineTo(0, 900);
  ctx.fill();

  // Water layer
  const waterGrad = ctx.createLinearGradient(0, 520, 0, 900);
  waterGrad.addColorStop(0, '#431407');
  waterGrad.addColorStop(0.3, '#7c2d12');
  waterGrad.addColorStop(0.7, '#1c1917');
  waterGrad.addColorStop(1, '#09090b');
  ctx.fillStyle = waterGrad;
  ctx.fillRect(0, 520, 1200, 380);

  // Sun water reflection beam
  const reflectGrad = ctx.createLinearGradient(0, 520, 0, 900);
  reflectGrad.addColorStop(0, 'rgba(254, 240, 138, 0.7)');
  reflectGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.4)');
  reflectGrad.addColorStop(1, 'rgba(194, 65, 12, 0)');
  ctx.fillStyle = reflectGrad;
  ctx.beginPath();
  ctx.moveTo(560, 520);
  ctx.lineTo(640, 520);
  ctx.lineTo(820, 900);
  ctx.lineTo(380, 900);
  ctx.closePath();
  ctx.fill();

  // Silhouettes of karst rock islands
  ctx.fillStyle = '#0f172a';
  // Left giant karst
  ctx.beginPath();
  ctx.moveTo(80, 900);
  ctx.lineTo(110, 430);
  ctx.bezierCurveTo(140, 340, 200, 320, 240, 380);
  ctx.bezierCurveTo(280, 440, 310, 360, 350, 400);
  ctx.lineTo(420, 900);
  ctx.closePath();
  ctx.fill();

  // Right cliff island
  ctx.beginPath();
  ctx.moveTo(820, 900);
  ctx.lineTo(860, 480);
  ctx.bezierCurveTo(910, 380, 980, 370, 1040, 420);
  ctx.bezierCurveTo(1100, 470, 1130, 400, 1180, 450);
  ctx.lineTo(1200, 900);
  ctx.closePath();
  ctx.fill();

  // Traditional wooden junk boat silhouette
  ctx.fillStyle = '#09090b';
  ctx.beginPath();
  ctx.moveTo(540, 680);
  ctx.bezierCurveTo(570, 675, 620, 675, 660, 680);
  ctx.lineTo(650, 695);
  ctx.lineTo(550, 695);
  ctx.closePath();
  ctx.fill();
  // Mast & sail
  ctx.fillRect(598, 620, 3, 60);
  ctx.beginPath();
  ctx.moveTo(600, 625);
  ctx.bezierCurveTo(630, 640, 630, 665, 600, 670);
  ctx.closePath();
  ctx.fill();

  // Fine film grain overlay
  const imgData = ctx.getImageData(0, 0, 1200, 900);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 18;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  return canvas.toDataURL('image/jpeg', 0.92);
}

function createEditorialPortrait(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 900;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Minimalist warm plaster wall background
  const bg = ctx.createLinearGradient(0, 0, 1200, 900);
  bg.addColorStop(0, '#e7e5e4');
  bg.addColorStop(0.5, '#d6d3d1');
  bg.addColorStop(1, '#a8a29e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1200, 900);

  // Soft window shadow grid cast
  ctx.fillStyle = 'rgba(41, 37, 36, 0.14)';
  ctx.beginPath();
  ctx.moveTo(100, 0);
  ctx.lineTo(340, 0);
  ctx.lineTo(540, 900);
  ctx.lineTo(300, 900);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(420, 0);
  ctx.lineTo(660, 0);
  ctx.lineTo(860, 900);
  ctx.lineTo(620, 900);
  ctx.fill();

  // Architectural podium / pedestal
  ctx.fillStyle = '#78716c';
  ctx.fillRect(350, 640, 500, 260);
  ctx.fillStyle = '#57534e';
  ctx.fillRect(350, 640, 500, 20);

  // Ceramic vessel / sculpture on podium
  const vaseGrad = ctx.createLinearGradient(480, 320, 620, 640);
  vaseGrad.addColorStop(0, '#f5f5f4');
  vaseGrad.addColorStop(0.4, '#e7e5e4');
  vaseGrad.addColorStop(0.9, '#a8a29e');
  ctx.fillStyle = vaseGrad;
  ctx.beginPath();
  ctx.moveTo(560, 340);
  ctx.bezierCurveTo(520, 380, 480, 450, 480, 540);
  ctx.bezierCurveTo(480, 620, 520, 640, 560, 640);
  ctx.bezierCurveTo(600, 640, 640, 620, 640, 540);
  ctx.bezierCurveTo(640, 450, 600, 380, 560, 340);
  ctx.closePath();
  ctx.fill();

  // Elegant botanical olive branch & monstera leaf silhouette
  ctx.fillStyle = 'rgba(28, 25, 23, 0.75)';
  ctx.beginPath();
  ctx.moveTo(560, 500);
  ctx.bezierCurveTo(650, 400, 750, 300, 850, 200);
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#292524';
  ctx.stroke();

  // Branch leaves
  const leafPoints = [
    { x: 620, y: 440, angle: -0.6 },
    { x: 690, y: 370, angle: 0.8 },
    { x: 750, y: 310, angle: -0.7 },
    { x: 810, y: 240, angle: 0.6 },
    { x: 860, y: 190, angle: -0.2 },
  ];
  leafPoints.forEach((lp) => {
    ctx.save();
    ctx.translate(lp.x, lp.y);
    ctx.rotate(lp.angle);
    ctx.beginPath();
    ctx.ellipse(0, 0, 45, 18, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#44403c';
    ctx.fill();
    ctx.restore();
  });

  // Soft vignette
  const vig = ctx.createRadialGradient(600, 450, 300, 600, 450, 750);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(28, 25, 23, 0.45)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, 1200, 900);

  return canvas.toDataURL('image/jpeg', 0.92);
}

function createCoffeeLifestyle(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 900;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Rustic dark walnut wood tabletop
  const wood = ctx.createLinearGradient(0, 0, 1200, 900);
  wood.addColorStop(0, '#3f2e23');
  wood.addColorStop(0.5, '#2c1e16');
  wood.addColorStop(1, '#1b120c');
  ctx.fillStyle = wood;
  ctx.fillRect(0, 0, 1200, 900);

  // Wood plank lines
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.lineWidth = 3;
  for (let y = 150; y < 900; y += 180) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1200, y);
    ctx.stroke();
  }

  // Open journal / sketchbook on the left
  ctx.save();
  ctx.translate(340, 480);
  ctx.rotate(-0.08);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(-225, -295, 470, 600); // shadow
  ctx.fillStyle = '#fafaf9';
  ctx.fillRect(-230, -300, 460, 590); // open page
  // Center crease
  ctx.fillStyle = '#e7e5e4';
  ctx.fillRect(-5, -300, 10, 590);
  // Faint handwritten notes lines
  ctx.strokeStyle = '#d6d3d1';
  ctx.lineWidth = 2;
  for (let ly = -250; ly <= 250; ly += 28) {
    ctx.beginPath();
    ctx.moveTo(-200, ly);
    ctx.lineTo(-30, ly);
    ctx.moveTo(30, ly);
    ctx.lineTo(200, ly);
    ctx.stroke();
  }
  ctx.restore();

  // Ceramic Matcha / Latte cup with saucer
  // Saucer shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.beginPath();
  ctx.ellipse(825, 435, 175, 175, 0, 0, Math.PI * 2);
  ctx.fill();

  // Saucer ceramic
  const saucerGrad = ctx.createRadialGradient(820, 430, 20, 820, 430, 170);
  saucerGrad.addColorStop(0, '#f5f5f4');
  saucerGrad.addColorStop(0.85, '#e7e5e4');
  saucerGrad.addColorStop(1, '#a8a29e');
  ctx.fillStyle = saucerGrad;
  ctx.beginPath();
  ctx.arc(820, 430, 160, 0, Math.PI * 2);
  ctx.fill();

  // Cup body
  const cupGrad = ctx.createRadialGradient(800, 410, 30, 820, 430, 120);
  cupGrad.addColorStop(0, '#ffffff');
  cupGrad.addColorStop(0.7, '#f4f4f5');
  cupGrad.addColorStop(1, '#71717a');
  ctx.fillStyle = cupGrad;
  ctx.beginPath();
  ctx.arc(820, 430, 120, 0, Math.PI * 2);
  ctx.fill();

  // Coffee / Latte liquid
  const coffeeGrad = ctx.createRadialGradient(810, 420, 20, 820, 430, 100);
  coffeeGrad.addColorStop(0, '#a16207');
  coffeeGrad.addColorStop(0.7, '#713f12');
  coffeeGrad.addColorStop(1, '#451a03');
  ctx.fillStyle = coffeeGrad;
  ctx.beginPath();
  ctx.arc(820, 430, 102, 0, Math.PI * 2);
  ctx.fill();

  // Latte art rosette / heart
  ctx.fillStyle = '#fef3c7';
  ctx.beginPath();
  ctx.arc(810, 415, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(830, 415, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(786, 420);
  ctx.lineTo(820, 465);
  ctx.lineTo(854, 420);
  ctx.closePath();
  ctx.fill();

  // Vintage fountain pen
  ctx.save();
  ctx.translate(620, 720);
  ctx.rotate(-0.4);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-140, -8, 280, 16);
  ctx.fillStyle = '#d97706'; // gold ring
  ctx.fillRect(30, -9, 8, 18);
  ctx.restore();

  // Warm sunlight spill from top right
  const sun = ctx.createLinearGradient(1200, 0, 400, 900);
  sun.addColorStop(0, 'rgba(254, 243, 199, 0.35)');
  sun.addColorStop(0.6, 'rgba(251, 191, 36, 0.15)');
  sun.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, 1200, 900);

  return canvas.toDataURL('image/jpeg', 0.92);
}

function createModernArchitecture(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 900;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Mediterranean azure sky
  const sky = ctx.createLinearGradient(0, 0, 0, 500);
  sky.addColorStop(0, '#0284c7');
  sky.addColorStop(1, '#7dd3fc');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 1200, 900);

  // Geometric terracotta & travertine structure
  // Main building tower
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(400, 180, 420, 720);

  // Shadow side of tower
  ctx.fillStyle = '#9a3412';
  ctx.beginPath();
  ctx.moveTo(820, 180);
  ctx.lineTo(1080, 280);
  ctx.lineTo(1080, 900);
  ctx.lineTo(820, 900);
  ctx.closePath();
  ctx.fill();

  // White curved concrete arch / cantilever
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(120, 420);
  ctx.bezierCurveTo(340, 220, 560, 220, 780, 420);
  ctx.lineTo(780, 900);
  ctx.lineTo(120, 900);
  ctx.closePath();
  ctx.fill();

  // Arch cutout into blue sky / shadow
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(450, 680, 180, Math.PI, 0);
  ctx.lineTo(630, 900);
  ctx.lineTo(270, 900);
  ctx.closePath();
  ctx.fill();

  // Modernist architectural stair shadow
  ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
  for (let s = 0; s < 7; s++) {
    ctx.fillRect(200 + s * 30, 700 + s * 22, 120, 14);
  }

  // Desert agave / palm silhouette in foreground
  ctx.fillStyle = '#14532d';
  for (let leaf = 0; leaf < 9; leaf++) {
    ctx.save();
    ctx.translate(140, 880);
    ctx.rotate(-1.2 + leaf * 0.3);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(12, -180);
    ctx.lineTo(-12, -180);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  return canvas.toDataURL('image/jpeg', 0.92);
}

function createNeonTokyo(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 900;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Deep night dark indigo background
  const night = ctx.createLinearGradient(0, 0, 0, 900);
  night.addColorStop(0, '#09090b');
  night.addColorStop(0.6, '#0f172a');
  night.addColorStop(1, '#020617');
  ctx.fillStyle = night;
  ctx.fillRect(0, 0, 1200, 900);

  // Distant neon skyscrapers
  const towers = [
    { x: 60, w: 140, h: 560, color: '#06b6d4' },
    { x: 240, w: 180, h: 680, color: '#ec4899' },
    { x: 460, w: 220, h: 720, color: '#3b82f6' },
    { x: 720, w: 190, h: 640, color: '#a855f7' },
    { x: 950, w: 180, h: 580, color: '#f43f5e' },
  ];

  towers.forEach((t) => {
    ctx.fillStyle = '#111827';
    ctx.fillRect(t.x, 900 - t.h, t.w, t.h);

    // Glowing vertical neon signage
    const glow = ctx.createRadialGradient(
      t.x + t.w / 2,
      900 - t.h + 120,
      10,
      t.x + t.w / 2,
      900 - t.h + 120,
      140
    );
    glow.addColorStop(0, t.color);
    glow.addColorStop(0.3, 'rgba(255,255,255,0.8)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(t.x - 40, 900 - t.h, t.w + 80, 240);

    // Window grid dots
    ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
    for (let wy = 900 - t.h + 40; wy < 700; wy += 24) {
      for (let wx = t.x + 15; wx < t.x + t.w - 15; wx += 20) {
        if (Math.random() > 0.45) {
          ctx.fillRect(wx, wy, 8, 12);
        }
      }
    }
  });

  // Wet rain-slicked asphalt reflection ground
  const wetGround = ctx.createLinearGradient(0, 680, 0, 900);
  wetGround.addColorStop(0, '#020617');
  wetGround.addColorStop(0.3, '#0f172a');
  wetGround.addColorStop(1, '#09090b');
  ctx.fillStyle = wetGround;
  ctx.fillRect(0, 680, 1200, 220);

  // Reflections on wet street
  towers.forEach((t) => {
    const ref = ctx.createLinearGradient(0, 680, 0, 900);
    ref.addColorStop(0, t.color);
    ref.addColorStop(0.5, 'rgba(0,0,0,0.2)');
    ref.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ref;
    ctx.fillRect(t.x + 20, 680, t.w - 40, 220);
  });

  // Rain streak overlay
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  for (let r = 0; r < 250; r++) {
    const rx = Math.random() * 1200;
    const ry = Math.random() * 900;
    ctx.beginPath();
    ctx.moveTo(rx, ry);
    ctx.lineTo(rx - 8, ry + 24);
    ctx.stroke();
  }

  return canvas.toDataURL('image/jpeg', 0.92);
}

function createDesertDunes(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 900;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Warm desert twilight sky
  const sky = ctx.createLinearGradient(0, 0, 0, 600);
  sky.addColorStop(0, '#4a044e');
  sky.addColorStop(0.4, '#c2410c');
  sky.addColorStop(0.8, '#f59e0b');
  sky.addColorStop(1, '#fde68a');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 1200, 900);

  // Large crescent moon
  ctx.fillStyle = '#fffbeb';
  ctx.beginPath();
  ctx.arc(920, 220, 50, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#67193b';
  ctx.beginPath();
  ctx.arc(935, 210, 48, 0, Math.PI * 2);
  ctx.fill();

  // Back sand dune
  ctx.fillStyle = '#9a3412';
  ctx.beginPath();
  ctx.moveTo(0, 540);
  ctx.bezierCurveTo(320, 460, 600, 560, 900, 500);
  ctx.bezierCurveTo(1050, 470, 1150, 510, 1200, 520);
  ctx.lineTo(1200, 900);
  ctx.lineTo(0, 900);
  ctx.fill();

  // Mid golden dune
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.moveTo(0, 620);
  ctx.bezierCurveTo(400, 540, 700, 680, 1200, 580);
  ctx.lineTo(1200, 900);
  ctx.lineTo(0, 900);
  ctx.fill();

  // Foreground razor-edge dune
  const fg = ctx.createLinearGradient(0, 680, 1200, 900);
  fg.addColorStop(0, '#f59e0b');
  fg.addColorStop(0.4, '#b45309');
  fg.addColorStop(1, '#78350f');
  ctx.fillStyle = fg;
  ctx.beginPath();
  ctx.moveTo(0, 720);
  ctx.bezierCurveTo(500, 620, 800, 800, 1200, 710);
  ctx.lineTo(1200, 900);
  ctx.lineTo(0, 900);
  ctx.fill();

  return canvas.toDataURL('image/jpeg', 0.92);
}

let cachedSamples: SamplePhoto[] | null = null;

export function getSamplePhotos(): SamplePhoto[] {
  if (cachedSamples) return cachedSamples;

  try {
    cachedSamples = [
      {
        id: 'sample-sunset',
        title: 'Hoàng Hôn Vịnh Hạ Long',
        category: 'Phong Cảnh',
        dataUrl: createHaLongSunset(),
      },
      {
        id: 'sample-editorial',
        title: 'Tĩnh Vật Nghệ Thuật & Gốm',
        category: 'Editorial',
        dataUrl: createEditorialPortrait(),
      },
      {
        id: 'sample-coffee',
        title: 'Góc Cà Phê & Sổ Tay',
        category: 'Lifestyle',
        dataUrl: createCoffeeLifestyle(),
      },
      {
        id: 'sample-arch',
        title: 'Kiến Trúc Tối Giản Đất Nung',
        category: 'Kiến Trúc',
        dataUrl: createModernArchitecture(),
      },
      {
        id: 'sample-neon',
        title: 'Đêm Phố Mưa Cyberpunk',
        category: 'Điện Ảnh',
        dataUrl: createNeonTokyo(),
      },
      {
        id: 'sample-dune',
        title: 'Hoàng Hôn Đồi Cát Vàng',
        category: 'Du Lịch',
        dataUrl: createDesertDunes(),
      },
    ];
  } catch (err) {
    console.error('Failed generating procedural sample photos:', err);
    cachedSamples = [];
  }

  return cachedSamples;
}
