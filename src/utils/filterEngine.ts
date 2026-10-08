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

export const FONT_PRIMARY = "'Be Vietnam Pro', 'Montserrat', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
export const FONT_MONO = "'JetBrains Mono', monospace";

/**
 * Ensures all Vietnamese web fonts are loaded into the browser font cache
 * before canvas drawing, preventing fallback fonts or broken diacritics.
 */
export async function ensureVietnameseFontsLoaded(): Promise<void> {
  if (typeof document === 'undefined' || !document.fonts) return;
  try {
    await document.fonts.ready;
    const fontsToLoad = [
      "400 16px 'Be Vietnam Pro'",
      "600 16px 'Be Vietnam Pro'",
      "700 20px 'Be Vietnam Pro'",
      "800 24px 'Be Vietnam Pro'",
      "900 24px 'Be Vietnam Pro'",
      "600 20px 'Montserrat'",
      "700 20px 'Montserrat'",
      "800 24px 'Montserrat'",
      "900 24px 'Montserrat'",
      "600 20px 'Plus Jakarta Sans'",
      "700 20px 'Plus Jakarta Sans'",
      "600 20px 'Lora'",
      "700 20px 'Lora'",
      "700 16px 'JetBrains Mono'",
    ];
    await Promise.allSettled(fontsToLoad.map((f) => document.fonts.load(f)));
    await document.fonts.ready;
  } catch (err) {
    console.warn('Font loading check:', err);
  }
}

/**
 * Standard CSS Canvas 2D font generator:
 * Follows exact W3C order: [italic] [weight] [size]px [family]
 */
export function getCanvasFont(
  sizePx: number,
  weight: string | number = '700',
  isItalic = false,
  preferredFamily = 'Be Vietnam Pro'
): string {
  const cleanFamily = (preferredFamily || 'Be Vietnam Pro')
    .replace(/['"]/g, '')
    .split(',')[0]
    .trim();
  const stylePart = isItalic ? 'italic ' : '';
  const weightPart = weight || '700';
  const roundedSize = Math.max(10, Math.round(sizePx));
  return `${stylePart}${weightPart} ${roundedSize}px "${cleanFamily}", "Be Vietnam Pro", Montserrat, sans-serif`;
}

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

/**
 * Standardize text normalization for Vietnamese unicode characters
 */
function normalizeVietnamese(str: string): string {
  return str.normalize('NFC').toUpperCase().trim();
}

/**
 * Draws wrapped text with accurate Vietnamese font support and keyword highlights
 */
function drawTextWithHighlights(
  ctx: CanvasRenderingContext2D,
  text: string,
  highlightWordsStr: string,
  defaultColor: string,
  highlightColor: string,
  startX: number,
  startY: number,
  maxWidth: number,
  lineHeight: number,
  highlightStyle: 'color' | 'box' = 'color'
) {
  ctx.save();
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';

  const normText = text.normalize('NFC');
  const highlightPhrases = highlightWordsStr
    .split(',')
    .map(normalizeVietnamese)
    .filter(Boolean);

  const words = normText.split(' ');
  let lineWords: { word: string; isHighlight: boolean }[] = [];
  let currentY = startY;

  const renderLine = (items: { word: string; isHighlight: boolean }[], y: number) => {
    let drawX = startX;
    for (const item of items) {
      const wordMetrics = ctx.measureText(item.word);
      const wordWidth = wordMetrics.width;
      const spaceWidth = ctx.measureText(' ').width;

      if (item.isHighlight && highlightStyle === 'box') {
        const padX = 4;
        const padY = 2;
        ctx.fillStyle = highlightColor;
        ctx.beginPath();
        ctx.roundRect(drawX - padX, y - padY, wordWidth + padX * 2, lineHeight, 4);
        ctx.fill();

        // High contrast text inside box
        ctx.fillStyle =
          highlightColor === '#facc15' ||
          highlightColor === '#eab308' ||
          highlightColor === '#ffffff'
            ? '#09090b'
            : '#ffffff';
        ctx.fillText(item.word, drawX, y);
      } else {
        ctx.fillStyle = item.isHighlight ? highlightColor : defaultColor;
        ctx.fillText(item.word, drawX, y);
      }

      drawX += wordWidth + spaceWidth;
    }
  };

  for (let i = 0; i < words.length; i++) {
    const rawWord = words[i];
    const cleanWordUpper = normalizeVietnamese(rawWord.replace(/^[“"']|[”"',.?!:;]$/g, ''));

    const isHighlight = highlightPhrases.some((phrase) => {
      if (!phrase || !cleanWordUpper) return false;
      return phrase.includes(cleanWordUpper) || cleanWordUpper.includes(phrase);
    });

    const testLineStr = [...lineWords.map((lw) => lw.word), rawWord].join(' ');
    const metrics = ctx.measureText(testLineStr);

    if (metrics.width > maxWidth && lineWords.length > 0) {
      renderLine(lineWords, currentY);
      currentY += lineHeight;
      lineWords = [{ word: rawWord, isHighlight }];
    } else {
      lineWords.push({ word: rawWord, isHighlight });
    }
  }

  if (lineWords.length > 0) {
    renderLine(lineWords, currentY);
  }

  ctx.restore();
}

/**
 * Draws the Commercial / News Banner with rock-solid Vietnamese font rendering
 */
export async function drawFooterBanner(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  banner: FooterBannerConfig
): Promise<void> {
  if (!banner.enabled) return;

  const bannerHeight = (banner.heightPercent / 100) * height;
  const bannerY = height - bannerHeight;

  ctx.save();

  // 1. Banner Background
  ctx.fillStyle = banner.backgroundColor || '#facc15';
  ctx.fillRect(0, bannerY, width, bannerHeight);

  // Pattern overlay (grid dots as in original showroom image)
  if (banner.pattern === 'grid-dots') {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
    const dotGap = Math.max(8, width * 0.012);
    for (let gx = 0; gx < width; gx += dotGap) {
      for (let gy = bannerY; gy < height; gy += dotGap) {
        ctx.fillRect(gx, gy, 1.8, 1.8);
      }
    }
  }

  // 2. Themed Accent Line with Dot at the top border
  const themeColor = banner.brandLogo.themeColor || '#ea580c';
  ctx.fillStyle = themeColor;
  ctx.fillRect(0, bannerY, width, 4);

  ctx.beginPath();
  ctx.arc(width * 0.55, bannerY + 2, 6, 0, Math.PI * 2);
  ctx.fillStyle = themeColor;
  ctx.fill();

  // 3. Logo & Pill Badge at the dividing line
  if (banner.brandLogo.enabled) {
    const badgeH = Math.max(34, bannerHeight * 0.22);
    const badgeW = Math.max(120, badgeH * 3.4);
    const badgeX = width * 0.04;
    const badgeY = bannerY - badgeH * 0.5;

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;

    ctx.fillStyle = themeColor;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, badgeH / 2);
    ctx.fill();

    ctx.shadowColor = 'transparent';
    const circleRadius = badgeH * 0.38;
    const circleCenterX = badgeX + badgeH * 0.5;
    const circleCenterY = badgeY + badgeH * 0.5;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, circleRadius, 0, Math.PI * 2);
    ctx.fill();

    // Custom Logo Image or Symbol Text
    let drewCustomLogo = false;
    if (banner.brandLogo.customImageUrl) {
      try {
        const logoImg = await new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = banner.brandLogo.customImageUrl!;
        });
        ctx.save();
        ctx.beginPath();
        ctx.arc(circleCenterX, circleCenterY, circleRadius * 0.9, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(
          logoImg,
          circleCenterX - circleRadius,
          circleCenterY - circleRadius,
          circleRadius * 2,
          circleRadius * 2
        );
        ctx.restore();
        drewCustomLogo = true;
      } catch (e) {
        drewCustomLogo = false;
      }
    }

    if (!drewCustomLogo) {
      // Text inside circle (e.g. 37 or 28)
      ctx.fillStyle = themeColor;
      ctx.font = getCanvasFont(badgeH * 0.44, '900', false, 'Montserrat');
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(banner.brandLogo.symbolText || '37', circleCenterX, circleCenterY);
    }

    // Text on the right of circle (e.g. CAR or NEWS)
    ctx.fillStyle = '#ffffff';
    ctx.font = getCanvasFont(badgeH * 0.42, '800', false, 'Montserrat');
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(banner.brandLogo.badgeText || 'CAR', badgeX + badgeH * 1.05, circleCenterY);
    ctx.restore();
  }

  // 4. Quotation Badge "“ ”" if enabled
  if (banner.quoteBadge && banner.quoteBadge.enabled) {
    const qbW = 54;
    const qbH = 28;
    const qbX = width * 0.46;
    const qbY = bannerY + 12;

    ctx.save();
    ctx.fillStyle = banner.quoteBadge.bgColor || '#ea580c';
    ctx.beginPath();
    ctx.roundRect(qbX, qbY, qbW, qbH, 4);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = getCanvasFont(22, '900', false, 'Montserrat');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('“ ”', qbX + qbW / 2, qbY + qbH / 2 + 2);
    ctx.restore();
  }

  // 5. Headline or 2-Columns Layout
  const contentPadX = width * 0.045;
  const contentStartY = bannerY + bannerHeight * 0.28;
  const usableWidth = width - contentPadX * 2;
  const preferredFontFamily = banner.headline.fontFamily || 'Montserrat';

  if (banner.twoColumns && banner.twoColumns.enabled) {
    const colWidth = usableWidth * 0.48;
    const col2X = contentPadX + usableWidth * 0.52;

    ctx.fillStyle = banner.twoColumns.col1Color || '#dc2626';
    ctx.font = getCanvasFont(16 * (width / 1080), '800', false, preferredFontFamily);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(banner.twoColumns.col1Title, contentPadX, contentStartY);

    ctx.font = getCanvasFont(14 * (width / 1080), '700', false, 'Be Vietnam Pro');
    drawTextWithHighlights(
      ctx,
      banner.twoColumns.col1Text,
      banner.headline.highlightWords || '',
      '#09090b',
      banner.headline.highlightColor || '#dc2626',
      contentPadX,
      contentStartY + 24 * (width / 1080),
      colWidth,
      20 * (width / 1080),
      banner.headline.highlightStyle || 'color'
    );

    ctx.fillStyle = banner.twoColumns.col2Color || '#dc2626';
    ctx.font = getCanvasFont(16 * (width / 1080), '800', false, preferredFontFamily);
    ctx.fillText(banner.twoColumns.col2Title, col2X, contentStartY);

    ctx.font = getCanvasFont(14 * (width / 1080), '700', false, 'Be Vietnam Pro');
    drawTextWithHighlights(
      ctx,
      banner.twoColumns.col2Text,
      banner.headline.highlightWords || '',
      '#09090b',
      banner.headline.highlightColor || '#dc2626',
      col2X,
      contentStartY + 24 * (width / 1080),
      colWidth,
      20 * (width / 1080),
      banner.headline.highlightStyle || 'color'
    );
  } else {
    const headlineFontSize = banner.headline.fontSize * (width / 1080);
    ctx.font = getCanvasFont(headlineFontSize, '800', false, preferredFontFamily);
    ctx.textBaseline = 'top';

    const textToDraw =
      banner.headline.textTransform === 'none'
        ? banner.headline.text
        : banner.headline.text.toUpperCase();

    drawTextWithHighlights(
      ctx,
      textToDraw,
      banner.headline.highlightWords || '',
      banner.headline.color,
      banner.headline.highlightColor,
      contentPadX,
      contentStartY,
      usableWidth,
      headlineFontSize * 1.35,
      banner.headline.highlightStyle || 'color'
    );
  }

  // 6. Bottom Right Meta Bar (Logo + Hotline + Email/Address)
  if (banner.footerMeta) {
    const metaY = height - Math.max(24, bannerHeight * 0.16);
    const metaX = width - contentPadX;

    ctx.save();
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = banner.footerMeta.color || themeColor;
    ctx.font = getCanvasFont(12 * (width / 1080), '700', false, 'Be Vietnam Pro');

    const contactStr = `☎ ${banner.footerMeta.hotline}   📍 ${banner.footerMeta.emailOrPage}`;
    ctx.fillText(contactStr, metaX, metaY);

    const miniR = 12 * (width / 1080);
    const miniTextWidth = ctx.measureText(contactStr).width;
    const miniCircleX = metaX - miniTextWidth - miniR * 2.2;

    ctx.beginPath();
    ctx.arc(miniCircleX, metaY, miniR, 0, Math.PI * 2);
    ctx.fillStyle = themeColor;
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = getCanvasFont(miniR * 1.1, '900', false, 'Montserrat');
    ctx.textAlign = 'center';
    ctx.fillText(banner.brandLogo.symbolText || '37', miniCircleX, metaY);
    ctx.restore();
  }

  if (banner.quoteBadge && banner.quoteBadge.creditText) {
    ctx.save();
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = getCanvasFont(11 * (width / 1080), '600', false, 'JetBrains Mono');
    ctx.fillText(banner.quoteBadge.creditText, width - contentPadX, bannerY - 20);
    ctx.restore();
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
  // CRITICAL: Force-preload all Vietnamese web fonts before rasterizing onto canvas
  await ensureVietnameseFontsLoaded();

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const [ratioW, ratioH] = settings.aspectRatio.split(':').map(Number);
  const width = renderWidth;
  const height = Math.round((renderWidth * ratioH) / ratioW);

  canvas.width = width;
  canvas.height = height;

  // 1. Background
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

  // 3. Photo Slots
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
  }

  // 4. Commercial / News Footer Banner
  if (template.hasFooterBanner || settings.footerBanner.enabled) {
    await drawFooterBanner(ctx, width, height, settings.footerBanner);
  }

  // 5. Freestyle Layers (supporting user-specified Vietnamese fonts & styles)
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
      const targetSize = td.fontSize * (width / 1080);
      ctx.font = getCanvasFont(targetSize, td.fontWeight, td.isItalic, td.fontFamily);
      ctx.textAlign = td.textAlign;
      ctx.textBaseline = 'middle';

      if (td.hasBgBox) {
        const textWidth = ctx.measureText(td.text).width;
        ctx.fillStyle = td.bgBoxColor || 'rgba(0,0,0,0.7)';
        ctx.beginPath();
        ctx.roundRect(-textWidth / 2 - 8, -targetSize * 0.7, textWidth + 16, targetSize * 1.4, 6);
        ctx.fill();
      }

      if (td.hasShadow) {
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 2;
      }

      ctx.fillStyle = td.color;
      ctx.fillText(td.text, 0, 0);
    }
    ctx.restore();
  }
}
