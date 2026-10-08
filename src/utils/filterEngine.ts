import {
  CanvasSettings,
  DoodleStroke,
  FilterPresetId,
  FooterBannerConfig,
  FreestyleLayer,
  GridTemplate,
  PhotoAdjustments,
  PhotoSlot,
} from '../types';
import { FILTER_PRESETS } from './constants';

export function getAdjustmentsCss(adj: PhotoAdjustments): string {
  const parts: string[] = [];

  const b = 1 + adj.brightness / 100;
  if (adj.brightness !== 0) parts.push(`brightness(${b.toFixed(2)})`);

  const c = 1 + adj.contrast / 100;
  if (adj.contrast !== 0) parts.push(`contrast(${c.toFixed(2)})`);

  const s = Math.max(0, 1 + adj.saturation / 100);
  if (adj.saturation !== 0) parts.push(`saturate(${s.toFixed(2)})`);

  if (adj.exposure !== 0) {
    const exp = 1 + adj.exposure / 120;
    parts.push(`brightness(${exp.toFixed(2)})`);
  }

  if (adj.hueRotate !== 0) {
    parts.push(`hue-rotate(${adj.hueRotate}deg)`);
  }

  if (adj.sepia !== 0) {
    parts.push(`sepia(${(adj.sepia / 100).toFixed(2)})`);
  }

  if (adj.blur > 0) {
    parts.push(`blur(${adj.blur}px)`);
  }

  if (adj.invert > 0) {
    parts.push(`invert(${(adj.invert / 100).toFixed(2)})`);
  }

  return parts.length > 0 ? parts.join(' ') : 'none';
}

export function getFullSlotFilter(slot: PhotoSlot): string {
  const preset = FILTER_PRESETS.find((p) => p.id === slot.filterId);
  const presetFilter = preset && preset.cssFilter !== 'none' ? preset.cssFilter : '';
  const adjFilter = getAdjustmentsCss(slot.adjustments);

  if (!presetFilter && adjFilter === 'none') return 'none';
  if (!presetFilter) return adjFilter;
  if (adjFilter === 'none') return presetFilter;
  return `${presetFilter} ${adjFilter}`;
}

export function drawVignette(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  intensity: number
) {
  if (intensity <= 0) return;
  const radius = Math.max(width, height) * 0.75;
  const grad = ctx.createRadialGradient(
    width / 2,
    height / 2,
    radius * 0.3,
    width / 2,
    height / 2,
    radius
  );
  const alpha = Math.min(0.9, intensity / 100);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.7, `rgba(0,0,0,${alpha * 0.4})`);
  grad.addColorStop(1, `rgba(0,0,0,${alpha})`);

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
}

export function drawFilmGrain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  grainAmount: number
) {
  if (grainAmount <= 0) return;
  const offCanvas = document.createElement('canvas');
  offCanvas.width = 256;
  offCanvas.height = 256;
  const offCtx = offCanvas.getContext('2d');
  if (!offCtx) return;

  const imgData = offCtx.createImageData(256, 256);
  const data = imgData.data;
  const strength = (grainAmount / 100) * 80;

  for (let i = 0; i < data.length; i += 4) {
    const val = (Math.random() - 0.5) * strength;
    data[i] = 128 + val;
    data[i + 1] = 128 + val;
    data[i + 2] = 128 + val;
    data[i + 3] = Math.min(255, (grainAmount / 100) * 110);
  }
  offCtx.putImageData(imgData, 0, 0);

  ctx.save();
  ctx.globalCompositeOperation = 'overlay';
  const pattern = ctx.createPattern(offCanvas, 'repeat');
  if (pattern) {
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, width, height);
  }
  ctx.restore();
}

export function drawLightLeak(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  type: string
) {
  if (type === 'none') return;
  ctx.save();
  ctx.globalCompositeOperation = 'screen';

  if (type === 'golden' || type === 'sunset') {
    const grad = ctx.createLinearGradient(0, 0, width * 0.7, height * 0.8);
    grad.addColorStop(0, 'rgba(251, 146, 60, 0.45)');
    grad.addColorStop(0.4, 'rgba(245, 158, 11, 0.25)');
    grad.addColorStop(0.8, 'rgba(239, 68, 68, 0.1)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (type === 'rainbow') {
    const grad = ctx.createLinearGradient(width * 0.2, 0, width * 0.8, height);
    grad.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
    grad.addColorStop(0.3, 'rgba(234, 179, 8, 0.25)');
    grad.addColorStop(0.6, 'rgba(16, 185, 129, 0.2)');
    grad.addColorStop(0.8, 'rgba(59, 130, 246, 0.25)');
    grad.addColorStop(1, 'rgba(168, 85, 247, 0.3)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (type === 'cyan') {
    const grad = ctx.createLinearGradient(width, 0, 0, height);
    grad.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
    grad.addColorStop(0.5, 'rgba(14, 165, 233, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.restore();
}

export function drawFilmSprockets(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) {
  ctx.save();
  const stripWidth = Math.max(24, width * 0.08);
  ctx.fillStyle = '#09090b';
  ctx.fillRect(x, y, stripWidth, height);
  ctx.fillRect(x + width - stripWidth, y, stripWidth, height);

  const holeWidth = stripWidth * 0.55;
  const holeHeight = holeWidth * 1.3;
  const holeGap = holeHeight * 1.5;

  ctx.fillStyle = '#ffffff';
  for (let py = y + 15; py < y + height - holeHeight; py += holeGap) {
    ctx.beginPath();
    ctx.roundRect(x + (stripWidth - holeWidth) / 2, py, holeWidth, holeHeight, 3);
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(
      x + width - stripWidth + (stripWidth - holeWidth) / 2,
      py,
      holeWidth,
      holeHeight,
      3
    );
    ctx.fill();
  }

  ctx.fillStyle = '#f59e0b';
  ctx.font = `600 ${Math.max(9, stripWidth * 0.28)}px 'JetBrains Mono', monospace`;
  ctx.save();
  ctx.translate(x + stripWidth * 0.5, y + height * 0.5);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.fillText('KODAK SAFETY FILM · 400TX', 0, 0);
  ctx.restore();

  ctx.restore();
}

/**
 * Draws the high-impact Commercial Footer Banner (phần dưới viết chữ như mẫu người dùng gửi)
 */
export function drawFooterBanner(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  banner: FooterBannerConfig
) {
  if (!banner.enabled) return;

  const bannerHeight = (banner.heightPercent / 100) * height;
  const bannerY = height - bannerHeight;

  ctx.save();

  // 1. Banner Background
  ctx.fillStyle = banner.backgroundColor;
  ctx.fillRect(0, bannerY, width, bannerHeight);

  // 2. Pattern overlay (e.g. grid dots / subtle checkerboard as seen in the sample)
  if (banner.pattern === 'grid-dots') {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    const dotGap = Math.max(8, width * 0.012);
    for (let gx = 0; gx < width; gx += dotGap) {
      for (let gy = bannerY; gy < height; gy += dotGap) {
        ctx.fillRect(gx, gy, 1.5, 1.5);
      }
    }
  } else if (banner.pattern === 'diagonal-stripes') {
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.lineWidth = 2;
    for (let s = -bannerHeight; s < width; s += 16) {
      ctx.beginPath();
      ctx.moveTo(s, bannerY);
      ctx.lineTo(s + bannerHeight, height);
      ctx.stroke();
    }
  }

  // 3. Top border highlight line
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fillRect(0, bannerY, width, 2);

  // 4. Ribbon / Badge at the top-left edge (like the orange badge in user image)
  if (banner.badge.enabled && banner.badge.text) {
    const badgeW = Math.min(width * 0.42, 380);
    const badgeH = Math.max(38, bannerHeight * 0.24);
    const badgeY = bannerY - badgeH * 0.45; // Overlaps the photo and banner border!

    ctx.save();
    // Drop shadow under the badge
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;

    // Slanted polygon shape
    ctx.fillStyle = banner.badge.bgColor;
    ctx.beginPath();
    ctx.moveTo(0, badgeY);
    ctx.lineTo(badgeW - 24, badgeY);
    ctx.lineTo(badgeW, badgeY + badgeH);
    ctx.lineTo(0, badgeY + badgeH);
    ctx.closePath();
    ctx.fill();

    // Subtle gloss stripe inside badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(0, badgeY, badgeW - 24, badgeH * 0.28);

    // Badge text
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = banner.badge.textColor;
    ctx.font = `800 ${Math.max(14, badgeH * 0.45)}px 'Syne', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(banner.badge.text, (badgeW - 12) / 2, badgeY + badgeH / 2);
    ctx.restore();
  }

  // 5. Text elements inside the banner
  const contentPadX = width * 0.05;
  let cursorY = bannerY + bannerHeight * 0.28;

  // Headline
  if (banner.headline.text) {
    ctx.fillStyle = banner.headline.color;
    ctx.font = `${banner.headline.fontWeight} ${banner.headline.fontSize * (width / 1080)}px 'Syne', sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(banner.headline.text, contentPadX, cursorY);
    cursorY += banner.headline.fontSize * (width / 1080) * 1.25;
  }

  // Subheadline
  if (banner.subheadline.text) {
    ctx.fillStyle = banner.subheadline.color;
    ctx.font = `700 ${banner.subheadline.fontSize * (width / 1080)}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText(banner.subheadline.text, contentPadX, cursorY);
    cursorY += banner.subheadline.fontSize * (width / 1080) * 1.35;
  }

  // Details (specs / promises)
  if (banner.details.text) {
    ctx.fillStyle = banner.details.color;
    ctx.font = `500 ${banner.details.fontSize * (width / 1080)}px 'Plus Jakarta Sans', sans-serif`;
    const lines = banner.details.text.split('\n');
    for (const line of lines) {
      ctx.fillText(line, contentPadX, cursorY);
      cursorY += banner.details.fontSize * (width / 1080) * 1.35;
    }
  }

  // Bottom row: Hotline & Address with high contrast
  const bottomRowY = height - Math.max(28, bannerHeight * 0.18);
  if (banner.hotline.text) {
    ctx.fillStyle = banner.hotline.color;
    ctx.font = `800 ${banner.hotline.fontSize * (width / 1080)}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText(`☎ ${banner.hotline.text}`, contentPadX, bottomRowY);
  }

  if (banner.address.text) {
    ctx.fillStyle = banner.address.color;
    ctx.font = `600 ${banner.address.fontSize * (width / 1080)}px 'Plus Jakarta Sans', sans-serif`;
    ctx.textAlign = 'right';
    ctx.fillText(`📍 ${banner.address.text}`, width - contentPadX, bottomRowY);
  }

  ctx.restore();
}

export async function renderFullCollage(
  canvas: HTMLCanvasElement,
  settings: CanvasSettings,
  template: GridTemplate,
  slots: Record<string, PhotoSlot>,
  freestyleLayers: FreestyleLayer[],
  doodleStrokes: DoodleStroke[],
  renderWidth = 1080
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const [ratioW, ratioH] = settings.aspectRatio.split(':').map(Number);
  const width = renderWidth;
  const height = Math.round((renderWidth * ratioH) / ratioW);

  canvas.width = width;
  canvas.height = height;

  // 1. Draw Background
  if (settings.backgroundType === 'gradient') {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, settings.backgroundGradient.from);
    grad.addColorStop(1, settings.backgroundGradient.to);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else {
    ctx.fillStyle = settings.backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Background Texture
  if (settings.backgroundTexture === 'grid') {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    const step = 32;
    for (let x = 0; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  } else if (settings.backgroundTexture === 'paper') {
    drawFilmGrain(ctx, width, height, 18);
  } else if (settings.backgroundTexture === 'grain') {
    drawFilmGrain(ctx, width, height, 32);
  }

  // 3. Render Photo Slots
  const outerPad = (settings.outerPadding / 100) * (width * 0.15);
  const gap = (settings.innerGap / 100) * (width * 0.08);

  const usableW = width - outerPad * 2;
  const usableH = height - outerPad * 2;

  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  };

  for (const slotDef of template.slots) {
    const slotData = slots[slotDef.id];
    if (!slotData || !slotData.imageUrl) continue;

    const slotX = outerPad + (slotDef.x / 100) * usableW + gap / 2;
    const slotY = outerPad + (slotDef.y / 100) * usableH + gap / 2;
    const slotW = Math.max(1, (slotDef.width / 100) * usableW - gap);
    const slotH = Math.max(1, (slotDef.height / 100) * usableH - gap);

    const radius = Math.min(settings.cellRadius, Math.min(slotW, slotH) / 2);

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(slotX, slotY, slotW, slotH, radius);
    ctx.clip();

    try {
      const img = await loadImage(slotData.imageUrl);

      const filterStr = getFullSlotFilter(slotData);
      if (filterStr && filterStr !== 'none') {
        ctx.filter = filterStr;
      }

      ctx.save();
      ctx.translate(slotX + slotW / 2, slotY + slotH / 2);
      ctx.scale(slotData.flipH ? -1 : 1, slotData.flipV ? -1 : 1);

      if (slotData.rotation !== 0) {
        ctx.rotate((slotData.rotation * Math.PI) / 180);
      }

      const zoom = slotData.zoom || 1;
      const panPxX = ((slotData.panX || 0) / 100) * (slotW / 2);
      const panPxY = ((slotData.panY || 0) / 100) * (slotH / 2);
      ctx.translate(panPxX, panPxY);

      const imgAspect = img.width / img.height;
      const slotAspect = slotW / slotH;
      let drawW = slotW * zoom;
      let drawH = slotH * zoom;

      if (imgAspect > slotAspect) {
        drawW = drawH * imgAspect;
      } else {
        drawH = drawW / imgAspect;
      }

      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      ctx.filter = 'none';

      const totalVignette =
        (slotData.adjustments.vignette || 0) + (settings.globalVignette || 0);
      if (totalVignette > 0) {
        ctx.save();
        ctx.translate(slotX, slotY);
        drawVignette(ctx, slotW, slotH, totalVignette);
        ctx.restore();
      }

      const totalGrain = (slotData.adjustments.grain || 0) + (settings.globalGrain || 0);
      if (totalGrain > 0) {
        ctx.save();
        ctx.translate(slotX, slotY);
        drawFilmGrain(ctx, slotW, slotH, totalGrain);
        ctx.restore();
      }
    } catch (err) {
      console.warn('Could not load image for slot:', slotDef.id, err);
    }

    ctx.restore();

    if (settings.frameStyle === 'film35mm') {
      drawFilmSprockets(ctx, slotX, slotY, slotW, slotH);
    } else if (settings.frameStyle === 'minimal-hairline') {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(slotX, slotY, slotW, slotH, radius);
      ctx.stroke();
    }
  }

  // 4. Draw Commercial Footer Banner if template or setting enabled
  if (template.hasFooterBanner || settings.footerBanner.enabled) {
    drawFooterBanner(ctx, width, height, settings.footerBanner);
  }

  // 5. Global Light Leaks
  if (settings.lightLeak !== 'none') {
    drawLightLeak(ctx, width, height, settings.lightLeak);
  }

  // 6. Global Grain Overlay
  if (settings.globalGrain > 0) {
    drawFilmGrain(ctx, width, height, settings.globalGrain);
  }

  // 7. Draw Freestyle Layers
  for (const layer of freestyleLayers) {
    ctx.save();
    const lx = (layer.x / 100) * width;
    const ly = (layer.y / 100) * height;
    const lw = (layer.width / 100) * width;
    const lh = (layer.height / 100) * height;

    ctx.translate(lx + lw / 2, ly + lh / 2);
    ctx.rotate((layer.rotation * Math.PI) / 180);
    ctx.scale(layer.scale, layer.scale);
    ctx.globalAlpha = layer.opacity;

    if (layer.type === 'text' && layer.textData) {
      const td = layer.textData;
      ctx.font = `${td.fontWeight} ${td.isItalic ? 'italic' : ''} ${td.fontSize * (width / 1080)}px ${td.fontFamily}`;
      ctx.textAlign = td.textAlign;
      ctx.textBaseline = 'middle';

      if (td.hasShadow) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 4;
      }

      if (td.hasBgBox) {
        const textMetrics = ctx.measureText(td.text);
        const padX = 16 * (width / 1080);
        const padY = 8 * (width / 1080);
        ctx.fillStyle = td.bgBoxColor;
        ctx.fillRect(
          -textMetrics.width / 2 - padX,
          -td.fontSize / 2 - padY,
          textMetrics.width + padX * 2,
          td.fontSize + padY * 2
        );
      }

      ctx.fillStyle = td.color;
      ctx.fillText(td.text, 0, 0);
    } else if (layer.type === 'sticker' && layer.stickerData) {
      const img = new Image();
      const svg = layer.stickerData.svgContent;
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      try {
        await new Promise((resolve) => {
          img.onload = () => {
            ctx.drawImage(img, -lw / 2, -lh / 2, lw, lh);
            URL.revokeObjectURL(url);
            resolve(true);
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve(false);
          };
          img.src = url;
        });
      } catch (e) {
        // Fallback
      }
    }

    ctx.restore();
  }

  // 8. Draw Doodle strokes
  for (const stroke of doodleStrokes) {
    if (stroke.points.length < 2) continue;
    ctx.save();
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size * (width / 1080);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = stroke.opacity;

    ctx.beginPath();
    ctx.moveTo((stroke.points[0].x / 100) * width, (stroke.points[0].y / 100) * height);
    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo((stroke.points[i].x / 100) * width, (stroke.points[i].y / 100) * height);
    }
    ctx.stroke();
    ctx.restore();
  }
}
