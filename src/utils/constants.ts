import {
  AspectRatioOption,
  FilterPreset,
  FooterBannerConfig,
  GridTemplate,
  PhotoAdjustments,
} from '../types';

export const ASPECT_RATIOS: AspectRatioOption[] = [
  { id: '1:1', label: '1:1', sublabel: 'Vuông (Ưu tiên)', width: 1080, height: 1080, isPriority: true },
  { id: '4:5', label: '4:5', sublabel: 'Chân dung Feed (Ưu tiên)', width: 1080, height: 1350, isPriority: true },
  { id: '3:4', label: '3:4', sublabel: 'Dọc 3:4 (Ưu tiên)', width: 1080, height: 1440, isPriority: true },
  { id: '9:16', label: '9:16', sublabel: 'Story / Reel / TikTok', width: 1080, height: 1920 },
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

export const DEFAULT_FOOTER_BANNER: FooterBannerConfig = {
  enabled: true,
  heightPercent: 32, // 32% bottom banner height
  styleType: 'social-news',
  backgroundColor: '#facc15', // Màu vàng rực rỡ chủ đạo theo yêu cầu của bạn!
  pattern: 'grid-dots', // Họa tiết vân lưới chấm bi như mẫu gốc

  brandLogo: {
    enabled: true,
    logoType: 'symbol',
    symbolText: '24H',
    badgeText: 'NGHỆ AN',
    themeColor: '#ea580c', // Cam đỏ thể thao nổi bật trên nền vàng
    position: 'divider-left',
  },

  headline: {
    text: 'HỖ TRỢ TRẢ GÓP 70% · DUYỆT HỒ SƠ NHANH · LÃI SUẤT THẤP',
    highlightWords: 'TRẢ GÓP 70%, LÃI SUẤT THẤP',
    highlightColor: '#dc2626', // Chữ bôi đỏ nổi bật sắc nét
    fontSize: 22,
    color: '#09090b',
    fontFamily: 'Montserrat',
    highlightStyle: 'color',
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  twoColumns: {
    enabled: false,
    col1Title: 'XE ĐẸP TUYỂN CHỌN',
    col1Text: 'CAM KẾT KHÔNG ĐÂM ĐỤNG, KHÔNG THỦY KÍCH, BẢO HÀNH CHÍNH HÃNG 12 THÁNG',
    col1Color: '#dc2626',
    col2Title: 'HỖ TRỢ VAY NGÂN HÀNG',
    col2Text: 'THỦ TỤC ĐƠN GIẢN TRONG 24H, GIAO XE TẬN NHÀ TOÀN QUỐC',
    col2Color: '#dc2626',
  },

  quoteBadge: {
    enabled: false,
    symbol: '“ ”',
    bgColor: '#ea580c',
    creditText: '37CAR AUTO',
  },

  footerMeta: {
    hotline: '0987 361 234',
    emailOrPage: 'Số 82 Đại Lộ Lê Nin',
    color: '#7c2d12',
  },
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
  // --- USER PRIORITY: MẪU TIN TỨC & BÁO CHÍ MẠNG XÃ HỘI (1 Ảnh, 2 Ảnh, 3 Ảnh Trên + Banner Chữ & Logo Dưới) ---
  {
    id: 'banner-1-photo',
    name: '1 Ảnh Trên + Banner Tin Tức & Logo Dưới',
    category: 'Tin Tức Báo Chí',
    photoCount: 1,
    hasFooterBanner: true,
    description: '1 ảnh lớn phía trên (68%), phần dưới là tiêu đề tin tức nổi bật và logo góc',
    slots: [{ id: 's1', x: 0, y: 0, width: 100, height: 68 }],
  },
  {
    id: 'banner-2-photos',
    name: '2 Ảnh Trên (Song Đôi) + Banner Tin Tức',
    category: 'Tin Tức Báo Chí',
    photoCount: 2,
    hasFooterBanner: true,
    description: '2 ảnh so sánh phía trên (như ảnh Messi/Ronaldo hoặc 2 bác sĩ) + banner chữ & logo',
    slots: [
      { id: 's1', x: 0, y: 0, width: 50, height: 68 },
      { id: 's2', x: 50, y: 0, width: 50, height: 68 },
    ],
  },
  {
    id: 'banner-3-photos',
    name: '3 Ảnh Trên (1 Lớn + 2 Nhỏ) + Banner Tin Tức',
    category: 'Tin Tức Báo Chí',
    photoCount: 3,
    hasFooterBanner: true,
    description: '1 ảnh lớn chính bên trái, 2 ảnh chi tiết bên phải + banner tin tức & logo',
    slots: [
      { id: 's1', x: 0, y: 0, width: 62, height: 68 },
      { id: 's2', x: 62, y: 0, width: 38, height: 34 },
      { id: 's3', x: 62, y: 34, width: 38, height: 34 },
    ],
  },
  {
    id: 'banner-3-cols',
    name: '3 Ảnh Cột Đều Trên + Banner',
    category: 'Tin Tức Báo Chí',
    photoCount: 3,
    hasFooterBanner: true,
    description: '3 ảnh chia đều 3 cột phía trên + banner chữ phía dưới',
    slots: [
      { id: 's1', x: 0, y: 0, width: 33.333, height: 68 },
      { id: 's2', x: 33.333, y: 0, width: 33.333, height: 68 },
      { id: 's3', x: 66.666, y: 0, width: 33.334, height: 68 },
    ],
  },

  // --- CÁC MẪU LƯỚI KHÁC ---
  {
    id: 'solo-hero',
    name: 'Đơn Sắc Trọng Tâm (1 Ảnh)',
    category: 'Cơ Bản',
    photoCount: 1,
    description: '1 ảnh toàn màn hình với tỷ lệ khung hình tinh chỉnh',
    slots: [{ id: 's1', x: 0, y: 0, width: 100, height: 100 }],
  },
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
    ],
  },
];

export const COLOR_PALETTES = [
  { id: 'showroom-yellow', name: 'Vàng Showroom', color: '#facc15', text: '#09090b' },
  { id: 'dark-obsidian', name: 'Đá Đen Huyền Bí', color: '#09090b', text: '#ffffff' },
  { id: 'slate-midnight', name: 'Xanh Đêm Midnight', color: '#0f172a', text: '#ffffff' },
  { id: 'editorial-travertine', name: 'Đá Travertine Ý', color: '#f5f5f0', text: '#18181b' },
  { id: 'clean-white', name: 'Trắng Studio Tinh Khiết', color: '#ffffff', text: '#09090b' },
  { id: 'vibrant-red', name: 'Đỏ Nổi Bật Siêu Deal', color: '#dc2626', text: '#ffffff' },
  { id: 'warm-terracotta', name: 'Đất Nung Terracotta', color: '#291b16', text: '#fde68a' },
  { id: 'forest-pine', name: 'Rừng Thông Xanh', color: '#052e16', text: '#dcfce7' },
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
  {
    id: 'badge-hot-deal',
    category: 'Bán Hàng',
    title: 'Hỗ Trợ Trả Góp 70%',
    svg: `<svg viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H145L160 48H15L0 0Z" fill="#ea580c"/>
      <text x="80" y="30" font-family="'Syne', sans-serif" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="1">TRẢ GÓP 70%</text>
    </svg>`,
  },
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
];
