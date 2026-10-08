export type AspectRatioId = '1:1' | '4:5' | '9:16' | '16:9' | '3:4' | '2:3' | '4:3';

export interface AspectRatioOption {
  id: AspectRatioId;
  label: string;
  sublabel: string;
  width: number;
  height: number;
  isPriority?: boolean;
}

export type CollageMode = 'grid' | 'freestyle';

export type FilterPresetId =
  | 'none'
  | 'kodak-portra'
  | 'fuji-velvia'
  | 'polaroid-warmth'
  | 'noir-contrast'
  | 'cyberpunk-neon'
  | 'cinematic-teal'
  | 'golden-hour'
  | 'vintage-70s'
  | 'pastel-dream'
  | 'emerald-film'
  | 'glitch-split'
  | 'halftone-pop'
  | 'monochrome-soft';

export interface FilterPreset {
  id: FilterPresetId;
  name: string;
  category: 'Cổ Điển' | 'Điện Ảnh' | 'Nghệ Thuật' | 'Tươi Sáng';
  description: string;
  cssFilter: string;
  adjustments: Partial<PhotoAdjustments>;
  grainOverlay?: number;
  vignetteOverlay?: number;
  rgbSplit?: number;
}

export interface PhotoAdjustments {
  brightness: number; // -100 to 100
  contrast: number; // -100 to 100
  saturation: number; // -100 to 100
  warmth: number; // -100 to 100 (temperature)
  exposure: number; // -100 to 100
  vignette: number; // 0 to 100
  grain: number; // 0 to 100
  blur: number; // 0 to 20
  hueRotate: number; // 0 to 360
  sepia: number; // 0 to 100
  chromaticAberration: number; // 0 to 20
  invert: number; // 0 or 100
}

export interface PhotoSlot {
  id: string;
  imageUrl: string;
  zoom: number; // 1 to 3
  panX: number; // -100 to 100
  panY: number; // -100 to 100
  rotation: number; // 0, 90, 180, 270
  flipH: boolean;
  flipV: boolean;
  filterId: FilterPresetId;
  adjustments: PhotoAdjustments;
  caption?: string;
}

export interface GridTemplateSlot {
  id: string;
  x: number; // 0 to 100 (%)
  y: number; // 0 to 100 (%)
  width: number; // 0 to 100 (%)
  height: number; // 0 to 100 (%)
  borderRadius?: number;
}

export interface GridTemplate {
  id: string;
  name: string;
  category: 'Banner Bán Hàng' | 'Cơ Bản' | 'Tạp Chí' | 'Phim Ảnh' | 'Bento' | 'Đặc Biệt';
  photoCount: number;
  slots: GridTemplateSlot[];
  description: string;
  hasFooterBanner?: boolean;
}

export type FrameStyle =
  | 'none'
  | 'polaroid'
  | 'film35mm'
  | 'torn'
  | 'washi-tape'
  | 'neon-border'
  | 'stamp'
  | 'shadow-box'
  | 'minimal-hairline';

export type BackgroundType = 'solid' | 'gradient' | 'texture';
export type TextureType = 'none' | 'paper' | 'grain' | 'grid' | 'linen' | 'marble' | 'dots';
export type LightLeakType = 'none' | 'golden' | 'rainbow' | 'sunset' | 'cyan';

export interface FooterBannerConfig {
  enabled: boolean;
  heightPercent: number; // e.g. 33 (33% from bottom)
  backgroundColor: string; // default '#f59e0b' or '#eab308'
  pattern: 'grid-dots' | 'solid' | 'diagonal-stripes' | 'mesh';
  badge: {
    enabled: boolean;
    text: string;
    bgColor: string;
    textColor: string;
  };
  headline: {
    text: string;
    fontSize: number;
    color: string;
    fontWeight: string;
  };
  subheadline: {
    text: string;
    fontSize: number;
    color: string;
  };
  details: {
    text: string;
    fontSize: number;
    color: string;
  };
  hotline: {
    text: string;
    fontSize: number;
    color: string;
  };
  address: {
    text: string;
    fontSize: number;
    color: string;
  };
}

export interface CanvasSettings {
  aspectRatio: AspectRatioId;
  outerPadding: number; // 0 to 60px
  innerGap: number; // 0 to 40px
  cellRadius: number; // 0 to 48px
  backgroundColor: string;
  backgroundType: BackgroundType;
  backgroundGradient: {
    from: string;
    to: string;
    direction: string;
  };
  backgroundTexture: TextureType;
  frameStyle: FrameStyle;
  lightLeak: LightLeakType;
  globalGrain: number;
  globalVignette: number;
  globalFilter: FilterPresetId;
  footerBanner: FooterBannerConfig;
}

export interface FreestyleLayer {
  id: string;
  type: 'photo' | 'text' | 'sticker';
  x: number; // percentage (0 to 100)
  y: number;
  width: number; // percentage (0 to 100)
  height: number;
  rotation: number; // degrees
  scale: number;
  zIndex: number;
  opacity: number;
  blendMode?: string;
  photoData?: {
    slot: PhotoSlot;
    frame: FrameStyle;
    caption?: string;
  };
  textData?: {
    text: string;
    fontFamily: string;
    fontSize: number;
    color: string;
    letterSpacing: number;
    lineHeight: number;
    textAlign: 'left' | 'center' | 'right';
    fontWeight: string;
    isItalic: boolean;
    hasBgBox: boolean;
    bgBoxColor: string;
    hasShadow: boolean;
  };
  stickerData?: {
    stickerId: string;
    title: string;
    category: string;
    svgContent: string;
  };
}

export interface DoodleStroke {
  id: string;
  points: { x: number; y: number }[];
  color: string;
  size: number;
  opacity: number;
}
