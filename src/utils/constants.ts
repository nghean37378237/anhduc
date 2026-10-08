import {
  AspectRatioOption,
  FilterPreset,
  GridTemplate,
  PhotoAdjustments,
} from '../types';

export const ASPECT_RATIOS: AspectRatioOption[] = [
  { id: '1:1', label: '1:1', sublabel: 'Vuông (Instagram)', width: 1080, height: 1080 },
  { id: '4:5', label: '4:5', sublabel: 'Chân dung Feed', width: 1080, height: 1350 },
  { id: '9:16', label: '9:16', sublabel: 'Story / Reel / TikTok', width: 1080, height: 1920 },
  { id: '3:4', label: '3:4', sublabel: 'Tạp chí / Poster', width: 1080, height: 1440 },
  { id: '16:9', label: '16:9', sublabel: 'Toàn cảnh Cinematic', width: 1920, height: 1080 },
  { id: '2:3', label: '2:3', sublabel: 'Phim 35mm Cổ điển', width: 1080, height: 1620 },
  { id: '4:3', label: '4:3', sublabel: 'Ngang Tiêu chuẩn', width: 1440, height: 1080 },
];

export const DEFAULT_ADJUSTMENTS: PhotoAdjustments = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  warmth: 0,
  exposure: 0,
  vignette: 0,
  grain: 0,
  blur: 0,
  hueRotate: 0,
  sepia: 0,
  chromaticAberration: 0,
  invert: 0,
};

export const FILTER_PRESETS: FilterPreset[] = [
  {
    id: 'none',
    name: 'Gốc (Original)',
    category: 'Cơ Bản' as any,
    description: 'Giữ nguyên màu sắc và chi tiết tự nhiên của ảnh',
    cssFilter: 'none',
    adjustments: {},
  },
  {
    id: 'kodak-portra',
    name: 'Kodak Portra 400',
    category: 'Cổ Điển',
    description: 'Tone da ấm áp tự nhiên, highlight dịu êm, hạt film mịn tinh tế',
    cssFilter: 'contrast(1.08) saturate(1.15) sepia(0.12) brightness(1.04)',
    adjustments: { warmth: 18, contrast: 8, saturation: 12, grain: 22 },
    grainOverlay: 20,
    vignetteOverlay: 15,
  },
  {
    id: 'fuji-velvia',
    name: 'Fuji Velvia 50',
    category: 'Cổ Điển',
    description: 'Độ tương phản cao, xanh ngọc và xanh lá rực rỡ, lý tưởng cho phong cảnh',
    cssFilter: 'contrast(1.22) saturate(1.35) brightness(1.02) hue-rotate(-4deg)',
    adjustments: { contrast: 20, saturation: 35, exposure: 2 },
    vignetteOverlay: 18,
  },
  {
    id: 'polaroid-warmth',
    name: 'Polaroid 600',
    category: 'Cổ Điển',
    description: 'Vùng tối ngả xanh rêu, vàng kem hoài niệm thập niên 80s',
    cssFilter: 'contrast(0.96) saturate(0.9) sepia(0.25) brightness(1.06)',
    adjustments: { sepia: 25, warmth: 22, contrast: -6, grain: 28 },
    grainOverlay: 25,
    vignetteOverlay: 30,
  },
  {
    id: 'cinematic-teal',
    name: 'Teal & Orange',
    category: 'Điện Ảnh',
    description: 'Phong cách Hollywood kinh điển: bóng xanh teal đối lập ánh cam rực',
    cssFilter: 'contrast(1.18) saturate(1.25) hue-rotate(8deg) brightness(1.02)',
    adjustments: { contrast: 18, saturation: 22, warmth: 15 },
    vignetteOverlay: 22,
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    category: 'Điện Ảnh',
    description: 'Tone tím dạ quang và xanh cyan huyền ảo, tương phản mạnh mẽ',
    cssFilter: 'contrast(1.3) saturate(1.6) hue-rotate(185deg) brightness(1.08)',
    adjustments: { contrast: 30, saturation: 50, chromaticAberration: 12 },
    rgbSplit: 8,
  },
  {
    id: 'golden-hour',
    name: 'Nắng Hoàng Hôn',
    category: 'Tươi Sáng',
    description: 'Ánh nắng chiều êm dịu phủ vàng mượt mà như mật ong',
    cssFilter: 'contrast(1.05) saturate(1.2) sepia(0.18) brightness(1.08)',
    adjustments: { warmth: 35, saturation: 20, brightness: 8 },
    vignetteOverlay: 14,
  },
  {
    id: 'noir-contrast',
    name: 'Noir Street 35mm',
    category: 'Nghệ Thuật',
    description: 'Đen trắng tương phản cao, chiều sâu sắc nét như phim tài liệu',
    cssFilter: 'grayscale(1) contrast(1.4) brightness(0.98)',
    adjustments: { saturation: -100, contrast: 38, grain: 30 },
    grainOverlay: 30,
    vignetteOverlay: 25,
  },
  {
    id: 'monochrome-soft',
    name: 'Bạc Mềm Mại',
    category: 'Nghệ Thuật',
    description: 'Trắng đen cổ điển mịn màng, dải sáng dịu mắt thanh lịch',
    cssFilter: 'grayscale(1) contrast(1.08) brightness(1.06)',
    adjustments: { saturation: -100, contrast: 8, brightness: 6 },
    grainOverlay: 15,
  },
  {
    id: 'vintage-70s',
    name: 'Retro 1970s',
    category: 'Cổ Điển',
    description: 'Màu nâu ấm faded sepia, viền tối mờ ảo của máy ảnh phim cũ',
    cssFilter: 'sepia(0.45) contrast(0.95) saturate(0.85) brightness(1.02)',
    adjustments: { sepia: 45, warmth: 30, saturation: -15, grain: 35 },
    grainOverlay: 32,
    vignetteOverlay: 35,
  },
  {
    id: 'pastel-dream',
    name: 'Pastel Mộng Mơ',
    category: 'Tươi Sáng',
    description: 'Tone màu hồng phấn và ngọc lam dịu dàng, tương phản nhẹ nhàng',
    cssFilter: 'contrast(0.92) saturate(1.1) brightness(1.14) hue-rotate(12deg)',
    adjustments: { brightness: 14, contrast: -10, warmth: -8 },
    grainOverlay: 10,
  },
  {
    id: 'emerald-film',
    name: 'Emerald Mơ Màng',
    category: 'Điện Ảnh',
    description: 'Sắc xanh ngọc lục bảo sâu thẳm, bí ẩn và cuốn hút',
    cssFilter: 'contrast(1.12) saturate(1.15) hue-rotate(-22deg) brightness(0.96)',
    adjustments: { contrast: 15, saturation: 15, warmth: -14 },
    vignetteOverlay: 24,
  },
  {
    id: 'glitch-split',
    name: 'Glitch RGB Split',
    category: 'Nghệ Thuật',
    description: 'Tách kênh màu đỏ lam viền quang sai, hiệu ứng số hóa phá cách',
    cssFilter: 'contrast(1.2) saturate(1.3) brightness(1.05)',
    adjustments: { chromaticAberration: 15, contrast: 20 },
    rgbSplit: 12,
  },
  {
    id: 'halftone-pop',
    name: 'Halftone Pop Art',
    category: 'Nghệ Thuật',
    description: 'Phong cách truyện tranh vintage Mỹ với tương phản đồ họa',
    cssFilter: 'contrast(1.45) saturate(1.5) brightness(1.02)',
    adjustments: { contrast: 45, saturation: 50 },
  },
];

export const GRID_TEMPLATES: GridTemplate[] = [
  // 1 Photo
  {
    id: 'solo-hero',
    name: 'Đơn Sắc Trọng Tâm (1 Ảnh)',
    category: 'Cơ Bản',
    photoCount: 1,
    description: '1 ảnh toàn màn hình với tỷ lệ khung hình tinh chỉnh',
    slots: [{ id: 's1', x: 0, y: 0, width: 100, height: 100 }],
  },

  // 2 Photos
  {
    id: 'split-2-v',
    name: 'Song Đôi Dọc (2 Ảnh)',
    category: 'Cơ Bản',
    photoCount: 2,
    description: '2 ảnh chia đôi chiều ngang, cân đối hoàn hảo',
    slots: [
      { id: 's1', x: 0, y: 0, width: 50, height: 100 },
      { id: 's2', x: 50, y: 0, width: 50, height: 100 },
    ],
  },
  {
    id: 'split-2-h',
    name: 'Song Đôi Ngang (2 Ảnh)',
    category: 'Cơ Bản',
    photoCount: 2,
    description: '2 ảnh xếp chồng trên dưới',
    slots: [
      { id: 's1', x: 0, y: 0, width: 100, height: 50 },
      { id: 's2', x: 0, y: 50, width: 100, height: 50 },
    ],
  },
  {
    id: 'asymmetric-2',
    name: 'Tỷ Lệ Vàng 65/35 (2 Ảnh)',
    category: 'Tạp Chí',
    photoCount: 2,
    description: '1 ảnh tiêu điểm lớn bên trái và 1 ảnh phụ thanh mảnh',
    slots: [
      { id: 's1', x: 0, y: 0, width: 65, height: 100 },
      { id: 's2', x: 65, y: 0, width: 35, height: 100 },
    ],
  },

  // 3 Photos
  {
    id: 'trio-hero-top',
    name: '1 Lớn Trên + 2 Dưới (3 Ảnh)',
    category: 'Tạp Chí',
    photoCount: 3,
    description: 'Ảnh chủ đạo phía trên kèm hai ảnh chi tiết bên dưới',
    slots: [
      { id: 's1', x: 0, y: 0, width: 100, height: 60 },
      { id: 's2', x: 0, y: 60, width: 50, height: 40 },
      { id: 's3', x: 50, y: 60, width: 50, height: 40 },
    ],
  },
  {
    id: 'trio-hero-left',
    name: '1 Lớn Trái + 2 Nhỏ Phải (3 Ảnh)',
    category: 'Tạp Chí',
    photoCount: 3,
    description: 'Trang đôi tạp chí thời trang chuẩn mực',
    slots: [
      { id: 's1', x: 0, y: 0, width: 62, height: 100 },
      { id: 's2', x: 62, y: 0, width: 38, height: 50 },
      { id: 's3', x: 62, y: 50, width: 38, height: 50 },
    ],
  },
  {
    id: 'triptych-3-cols',
    name: 'Bộ Ba Dọc Triptych (3 Ảnh)',
    category: 'Phim Ảnh',
    photoCount: 3,
    description: '3 dải ảnh dọc thanh lịch như cuộn phim điện ảnh',
    slots: [
      { id: 's1', x: 0, y: 0, width: 33.333, height: 100 },
      { id: 's2', x: 33.333, y: 0, width: 33.333, height: 100 },
      { id: 's3', x: 66.666, y: 0, width: 33.334, height: 100 },
    ],
  },

  // 4 Photos
  {
    id: 'quad-grid',
    name: 'Lưới 2x2 Cân Đối (4 Ảnh)',
    category: 'Cơ Bản',
    photoCount: 4,
    description: '4 ô đồng đều kinh điển, phù hợp cho mọi sự kiện',
    slots: [
      { id: 's1', x: 0, y: 0, width: 50, height: 50 },
      { id: 's2', x: 50, y: 0, width: 50, height: 50 },
      { id: 's3', x: 0, y: 50, width: 50, height: 50 },
      { id: 's4', x: 50, y: 50, width: 50, height: 50 },
    ],
  },
  {
    id: 'quad-hero-corner',
    name: 'Tạp Chí 1 Lớn + 3 Nhỏ (4 Ảnh)',
    category: 'Tạp Chí',
    photoCount: 4,
    description: '1 ảnh lớn trung tâm góc trái kết hợp 3 ảnh phụ bao quanh',
    slots: [
      { id: 's1', x: 0, y: 0, width: 65, height: 65 },
      { id: 's2', x: 65, y: 0, width: 35, height: 50 },
      { id: 's3', x: 65, y: 50, width: 35, height: 50 },
      { id: 's4', x: 0, y: 65, width: 65, height: 35 },
    ],
  },
  {
    id: 'filmstrip-4',
    name: 'Dải Phim 4 Tấm Tiếp Nối',
    category: 'Phim Ảnh',
    photoCount: 4,
    description: '4 khung ảnh xếp tầng liên hoàn phong cách contact sheet',
    slots: [
      { id: 's1', x: 0, y: 0, width: 100, height: 25 },
      { id: 's2', x: 0, y: 25, width: 100, height: 25 },
      { id: 's3', x: 0, y: 50, width: 100, height: 25 },
      { id: 's4', x: 0, y: 75, width: 100, height: 25 },
    ],
  },

  // 5 Photos
  {
    id: 'bento-5',
    name: 'Bento Grid Hiện Đại (5 Ảnh)',
    category: 'Bento',
    photoCount: 5,
    description: 'Bố cục bento đa dạng kích thước chuẩn phong cách thiết kế UI',
    slots: [
      { id: 's1', x: 0, y: 0, width: 55, height: 60 },
      { id: 's2', x: 55, y: 0, width: 45, height: 30 },
      { id: 's3', x: 55, y: 30, width: 45, height: 30 },
      { id: 's4', x: 0, y: 60, width: 45, height: 40 },
      { id: 's5', x: 45, y: 60, width: 55, height: 40 },
    ],
  },

  // 6 Photos
  {
    id: 'gallery-6',
    name: 'Bộ Sưu Tập 2x3 (6 Ảnh)',
    category: 'Cơ Bản',
    photoCount: 6,
    description: '2 hàng 3 cột cân xứng tuyệt đối',
    slots: [
      { id: 's1', x: 0, y: 0, width: 33.333, height: 50 },
      { id: 's2', x: 33.333, y: 0, width: 33.333, height: 50 },
      { id: 's3', x: 66.666, y: 0, width: 33.334, height: 50 },
      { id: 's4', x: 0, y: 50, width: 33.333, height: 50 },
      { id: 's5', x: 33.333, y: 50, width: 33.333, height: 50 },
      { id: 's6', x: 66.666, y: 50, width: 33.334, height: 50 },
    ],
  },
  {
    id: 'fashion-editorial-6',
    name: 'Editorial Spotlight (6 Ảnh)',
    category: 'Tạp Chí',
    photoCount: 6,
    description: '1 ảnh dọc ấn tượng bên trái và 5 ô câu chuyện bên phải',
    slots: [
      { id: 's1', x: 0, y: 0, width: 45, height: 100 },
      { id: 's2', x: 45, y: 0, width: 27.5, height: 50 },
      { id: 's3', x: 72.5, y: 0, width: 27.5, height: 50 },
      { id: 's4', x: 45, y: 50, width: 18.33, height: 50 },
      { id: 's5', x: 63.33, y: 50, width: 18.33, height: 50 },
      { id: 's6', x: 81.66, y: 50, width: 18.34, height: 50 },
    ],
  },
];

export const COLOR_PALETTES = [
  { id: 'dark-obsidian', name: 'Đá Đen Huyền Bí', color: '#09090b', text: '#ffffff' },
  { id: 'slate-midnight', name: 'Xanh Đêm Midnight', color: '#0f172a', text: '#ffffff' },
  { id: 'editorial-travertine', name: 'Đá Travertine Ý', color: '#f5f5f0', text: '#18181b' },
  { id: 'clean-white', name: 'Trắng Studio Tinh Khiết', color: '#ffffff', text: '#09090b' },
  { id: 'warm-terracotta', name: 'Đất Nung Terracotta', color: '#291b16', text: '#fde68a' },
  { id: 'warm-sand', name: 'Cát Vàng Safari', color: '#f4ede4', text: '#292524' },
  { id: 'forest-pine', name: 'Rừng Thông Xanh', color: '#052e16', text: '#dcfce7' },
  { id: 'burgundy-wine', name: 'Đỏ Rượu Vang', color: '#3b0713', text: '#ffe4e6' },
  { id: 'nordic-gray', name: 'Xám Xi Măng Nordic', color: '#27272a', text: '#fafafa' },
];

export const GRADIENT_PRESETS = [
  { id: 'sunset-amber', name: 'Nắng Hoàng Hôn', from: '#1e1b4b', to: '#c2410c', dir: 'to bottom' },
  { id: 'tokyo-cyber', name: 'Neon Cyberpunk', from: '#020617', to: '#701a75', dir: 'to bottom right' },
  { id: 'editorial-cream', name: 'Giấy Trầm Ấm', from: '#f5f5f4', to: '#d6d3d1', dir: 'to bottom' },
  { id: 'nordic-twilight', name: 'Bình Minh Bắc Âu', from: '#0f172a', to: '#1e293b', dir: 'to bottom' },
  { id: 'rose-gold', name: 'Hoa Hồng & Vàng', from: '#4c0519', to: '#b45309', dir: 'to bottom right' },
  { id: 'emerald-abyss', name: 'Biển Sâu Ngọc Bích', from: '#022c22', to: '#064e3b', dir: 'to bottom' },
];

export const STICKER_LIBRARY = [
  // Stamps & Badges
  {
    id: 'stamp-35mm',
    category: 'Phim 35mm',
    title: '35mm Film Roll',
    svg: `<svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="46" rx="4" stroke="currentColor" stroke-width="2.5" stroke-dasharray="6 4"/>
      <text x="80" y="28" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle" letter-spacing="3">35MM · KODAK</text>
      <text x="80" y="40" font-family="'JetBrains Mono', monospace" font-size="8" fill="currentColor" text-anchor="middle" letter-spacing="1.5">EXP. 36 · ISO 400</text>
    </svg>`,
  },
  {
    id: 'stamp-date-98',
    category: 'Thời Gian',
    title: 'Camera Date Stamp',
    svg: `<svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="75" y="26" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="700" fill="#f59e0b" text-anchor="middle" letter-spacing="2">‘98 10 24</text>
    </svg>`,
  },
  {
    id: 'stamp-rec',
    category: 'Thời Gian',
    title: 'REC Recording',
    svg: `<svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="20" r="7" fill="#ef4444"/>
      <text x="44" y="26" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" fill="currentColor" letter-spacing="2">REC</text>
      <text x="96" y="26" font-family="'JetBrains Mono', monospace" font-size="11" fill="currentColor" letter-spacing="1">00:04:12</text>
    </svg>`,
  },
  {
    id: 'stamp-barcode',
    category: 'Tạp Chí',
    title: 'Mã Vạch Barcode',
    svg: `<svg viewBox="0 0 140 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="4" width="4" height="26" fill="currentColor"/>
      <rect x="13" y="4" width="2" height="26" fill="currentColor"/>
      <rect x="18" y="4" width="6" height="26" fill="currentColor"/>
      <rect x="28" y="4" width="3" height="26" fill="currentColor"/>
      <rect x="35" y="4" width="8" height="26" fill="currentColor"/>
      <rect x="47" y="4" width="2" height="26" fill="currentColor"/>
      <rect x="53" y="4" width="5" height="26" fill="currentColor"/>
      <rect x="62" y="4" width="4" height="26" fill="currentColor"/>
      <rect x="70" y="4" width="7" height="26" fill="currentColor"/>
      <rect x="81" y="4" width="3" height="26" fill="currentColor"/>
      <rect x="88" y="4" width="6" height="26" fill="currentColor"/>
      <rect x="98" y="4" width="2" height="26" fill="currentColor"/>
      <rect x="104" y="4" width="5" height="26" fill="currentColor"/>
      <rect x="113" y="4" width="8" height="26" fill="currentColor"/>
      <rect x="125" y="4" width="3" height="26" fill="currentColor"/>
      <rect x="132" y="4" width="4" height="26" fill="currentColor"/>
      <text x="70" y="40" font-family="'JetBrains Mono', monospace" font-size="9" fill="currentColor" text-anchor="middle" letter-spacing="4">84092 1184</text>
    </svg>`,
  },
  {
    id: 'stamp-editorial',
    category: 'Tạp Chí',
    title: 'Editorial Issue Badge',
    svg: `<svg viewBox="0 0 140 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="136" height="41" rx="2" stroke="currentColor" stroke-width="2"/>
      <text x="70" y="21" font-family="'Syne', sans-serif" font-size="11" font-weight="700" fill="currentColor" text-anchor="middle" letter-spacing="3">EDITORIAL</text>
      <text x="70" y="34" font-family="'JetBrains Mono', monospace" font-size="8" fill="currentColor" text-anchor="middle" letter-spacing="2">VOL. 04 · NO. 88</text>
    </svg>`,
  },
  {
    id: 'stamp-washi-tape',
    category: 'Băng Dính Washi',
    title: 'Băng Dính Bóc Dán Washi Tape',
    svg: `<svg viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 2L0 18L5 34L155 34L160 18L156 2L4 2Z" fill="#fde68a" fill-opacity="0.85"/>
      <line x1="10" y1="8" x2="150" y2="8" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4 4" stroke-opacity="0.6"/>
      <line x1="10" y1="28" x2="150" y2="28" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4 4" stroke-opacity="0.6"/>
    </svg>`,
  },
  {
    id: 'stamp-sun-star',
    category: 'Họa Tiết',
    title: 'Ngôi Sao Lấp Lánh',
    svg: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 0C40 22 22 40 0 40C22 40 40 58 40 80C40 58 58 40 80 40C58 40 40 22 40 0Z" fill="currentColor"/>
    </svg>`,
  },
  {
    id: 'stamp-postage',
    category: 'Tem Bưu Chính',
    title: 'Dấu Bưu Điện Xưa',
    svg: `<svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="45" r="42" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="45" cy="45" r="34" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 3"/>
      <text x="45" y="36" font-family="'Syne', sans-serif" font-size="8" font-weight="700" fill="currentColor" text-anchor="middle" letter-spacing="2">AIR MAIL</text>
      <text x="45" y="52" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="currentColor" text-anchor="middle">PARIS</text>
      <text x="45" y="65" font-family="'JetBrains Mono', monospace" font-size="7" fill="currentColor" text-anchor="middle">1978 · POST</text>
    </svg>`,
  },
];
