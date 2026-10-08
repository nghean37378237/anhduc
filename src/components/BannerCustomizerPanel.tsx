import React, { useRef } from 'react';
import { FooterBannerConfig, BannerStyleType, CanvasSettings } from '../types';
import {
  Upload,
  Sparkles,
  MousePointerClick,
  Image as ImageIcon,
  Flame,
  Layout,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ArrowUp,
  Maximize2,
} from 'lucide-react';

interface BannerCustomizerPanelProps {
  banner: FooterBannerConfig;
  onUpdateBanner: (updated: Partial<FooterBannerConfig>) => void;
  onSwitchPhotoCount: (count: 1 | 2 | 3) => void;
  currentPhotoCount: number;
  settings?: CanvasSettings;
  onUpdateSettings?: (updated: Partial<CanvasSettings>) => void;
  theme?: 'light' | 'dark';
}

export const BannerCustomizerPanel: React.FC<BannerCustomizerPanelProps> = ({
  banner,
  onUpdateBanner,
  onSwitchPhotoCount,
  currentPhotoCount,
  settings,
  onUpdateSettings,
  theme = 'light',
}) => {
  const isLight = theme === 'light';
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Background colors with Yellow as the #1 Dominant Theme
  const brandColors = [
    {
      name: 'VÀNG CHỦ ĐẠO (Showroom / Tin Tức)',
      color: '#facc15',
      text: '#09090b',
      badge: '#ea580c',
      isPrimary: true,
    },
    { name: 'Xanh Lá Tươi Mát', color: '#059669', text: '#ffffff', badge: '#059669' },
    { name: 'Đỏ Tin Nóng', color: '#dc2626', text: '#ffffff', badge: '#dc2626' },
    { name: 'Đen Sang Trọng', color: '#09090b', text: '#ffffff', badge: '#ea580c' },
    { name: 'Trắng Tinh Tế', color: '#ffffff', text: '#09090b', badge: '#059669' },
  ];

  // Highlight colors with Yellow as top recommendation
  const highlightColors = [
    { name: 'Vàng Rực Rỡ (Chủ đạo)', color: '#facc15', textContrast: '#09090b' },
    { name: 'Đỏ Nổi Bật', color: '#dc2626', textContrast: '#ffffff' },
    { name: 'Đen Sắc Nét', color: '#09090b', textContrast: '#ffffff' },
    { name: 'Cam Thể Thao', color: '#ea580c', textContrast: '#ffffff' },
    { name: 'Trắng Tinh Khiết', color: '#ffffff', textContrast: '#09090b' },
    { name: 'Xanh Ngọc', color: '#059669', textContrast: '#ffffff' },
  ];

  // Tested Vietnamese fonts with 100% full unicode support
  const fontFamilies = [
    { id: 'Montserrat', name: 'Montserrat (Đậm nét, mạnh mẽ, chuẩn tin tức)' },
    { id: 'Be Vietnam Pro', name: 'Be Vietnam Pro (Chuẩn Quốc Ngữ, siêu sắc nét)' },
    { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans (Hiện đại, tối giản tinh tế)' },
    { id: 'Lora', name: 'Lora (Serif thanh lịch, phong cách tạp chí)' },
  ];

  // Presets with User's Yellow Showroom as #1 Dominant Theme
  const newsPresets = [
    {
      name: '⭐ MẪU VÀNG CHỦ ĐẠO: Tin Tức 24H NGHỆ AN (Căn Giữa)',
      symbol: '24H',
      badge: 'NGHỆ AN',
      color: '#ea580c',
      bg: '#facc15', // User's requested primary signature yellow!
      style: 'social-news' as BannerStyleType,
      headline: 'HỖ TRỢ TRẢ GÓP 70% · DUYỆT HỒ SƠ NHANH · LÃI SUẤT THẤP',
      highlights: 'TRẢ GÓP 70%, LÃI SUẤT THẤP',
      highlightColor: '#dc2626',
      highlightStyle: 'color' as 'color' | 'box',
      textAlign: 'center' as 'left' | 'center' | 'right',
      fontFamily: 'Montserrat',
      hotline: '0987 361 234',
      email: 'Số 82 Đại Lộ Lê Nin',
      twoCols: false,
      quote: false,
    },
    {
      name: '⭐ MẪU VÀNG NỔI BẬT: Hộp Nền Chữ Bôi Vàng / Đỏ',
      symbol: 'VIP',
      badge: 'AUTO',
      color: '#b45309',
      bg: '#facc15',
      style: 'social-news' as BannerStyleType,
      headline: 'XE LƯỚT CHÍNH HÃNG · CAM KẾT KHÔNG ĐÂM ĐỤNG · GIAO XE TẬN NHÀ',
      highlights: 'XE LƯỚT CHÍNH HÃNG, GIAO XE TẬN NHÀ',
      highlightColor: '#dc2626',
      highlightStyle: 'box' as 'color' | 'box',
      fontFamily: 'Montserrat',
      hotline: '0987 361 234',
      email: 'Showroom 37Car Nghệ An',
      twoCols: false,
      quote: false,
    },
    {
      name: 'Mẫu 3: Bản Tin Thể Thao & Đời Sống',
      symbol: '24H',
      badge: 'SPORT',
      color: '#059669',
      bg: '#f1f5f9',
      style: 'social-news' as BannerStyleType,
      headline:
        'TRÊN SÂN CỎ LÀ NHỮNG CUỘC ĐUA KHÔNG KHOAN NHƯỢNG. NHƯNG NGOÀI ĐỜI, MESSI VÀ RONALDO VẪN LUÔN TÔN TRỌNG ĐỐI THỦ LỚN NHẤT CỦA MÌNH',
      highlights: 'CUỘC ĐUA, VẪN LUÔN TÔN TRỌNG',
      highlightColor: '#dc2626',
      highlightStyle: 'color' as 'color' | 'box',
      fontFamily: 'Montserrat',
      hotline: '0983 663 092',
      email: '28.hotline@gmail.com',
      twoCols: false,
      quote: false,
    },
    {
      name: 'Mẫu 4: So Sánh 2 Cột (2 Bác Sĩ / 2 Xe)',
      symbol: '37',
      badge: 'CAR',
      color: '#0284c7',
      bg: '#ffffff',
      style: 'two-columns' as BannerStyleType,
      headline: 'BÔNG HỒNG THÉP CỦA NGÀNH Y HỌC VIỆT NAM',
      highlights: 'BÔNG HỒNG THÉP',
      highlightColor: '#dc2626',
      highlightStyle: 'color' as 'color' | 'box',
      fontFamily: 'Be Vietnam Pro',
      hotline: '0983 663 092',
      email: '28.hotline@gmail.com',
      twoCols: true,
      quote: false,
    },
    {
      name: 'Mẫu 5: Nền Đen Mờ Quote (Chữ Chọn Màu Vàng Rực)',
      symbol: '24H',
      badge: 'NEWS',
      color: '#facc15',
      bg: '#09090b',
      style: 'dark-quote' as BannerStyleType,
      headline:
        'TỪ 15H HÔM NAY (8/10), GIÁ XĂNG TIẾP TỤC TĂNG, XĂNG E10 LÊN HƠN 28.200 ĐỒNG/LÍT',
      highlights: 'GIÁ XĂNG TIẾP TỤC TĂNG, 28.200 ĐỒNG/LÍT',
      highlightColor: '#facc15', // Highlight yellow on dark background!
      highlightStyle: 'color' as 'color' | 'box',
      fontFamily: 'Montserrat',
      hotline: '0983 663 092',
      email: '28.hotline@gmail.com',
      twoCols: false,
      quote: true,
    },
  ];

  const handleApplyPreset = (p: (typeof newsPresets)[0]) => {
    onUpdateBanner({
      styleType: p.style,
      backgroundColor: p.bg,
      pattern: p.bg === '#facc15' ? 'grid-dots' : 'none',
      brandLogo: {
        ...banner.brandLogo,
        symbolText: p.symbol,
        badgeText: p.badge,
        themeColor: p.color,
      },
      headline: {
        ...banner.headline,
        text: p.headline,
        highlightWords: p.highlights,
        highlightColor: p.highlightColor,
        highlightStyle: p.highlightStyle,
        fontFamily: p.fontFamily,
        textAlign: (p as any).textAlign || 'center',
        color: p.bg === '#09090b' ? '#ffffff' : '#09090b',
      },
      twoColumns: {
        ...banner.twoColumns,
        enabled: p.twoCols,
      },
      quoteBadge: {
        ...banner.quoteBadge,
        enabled: p.quote,
      },
      footerMeta: {
        ...banner.footerMeta,
        hotline: p.hotline,
        emailOrPage: p.email,
        color: p.bg === '#facc15' ? '#7c2d12' : p.color,
      },
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          onUpdateBanner({
            brandLogo: {
              ...banner.brandLogo,
              logoType: 'image',
              customImageUrl: ev.target.result as string,
            },
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Words breakdown for interactive 1-click highlighting
  const headlineWords = (banner.headline.text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const currentHighlightsList = (banner.headline.highlightWords || '')
    .split(',')
    .map((w) => w.trim().toUpperCase())
    .filter(Boolean);

  const toggleWordHighlight = (word: string) => {
    const cleanWord = word.replace(/^[“"']|[”"',.?!:;]$/g, '').trim().toUpperCase();
    if (!cleanWord) return;

    let nextList = [...currentHighlightsList];
    const exists = nextList.some((w) => w.includes(cleanWord) || cleanWord.includes(w));

    if (exists) {
      nextList = nextList.filter((w) => !w.includes(cleanWord) && !cleanWord.includes(w));
    } else {
      nextList.push(cleanWord);
    }

    onUpdateBanner({
      headline: {
        ...banner.headline,
        highlightWords: nextList.join(', '),
      },
    });
  };

  const isYellowBackground =
    banner.backgroundColor.toLowerCase() === '#facc15' ||
    banner.backgroundColor.toLowerCase() === '#eab308';

  return (
    <div className={`p-4 space-y-6 ${isLight ? 'text-slate-800' : 'text-neutral-100'}`}>
      {/* Header with Yellow Dominant Theme Callout */}
      <div
        className={`p-3.5 rounded-2xl border transition-colors ${
          isLight
            ? 'bg-amber-50/90 border-amber-300 text-slate-800 shadow-2xs'
            : 'bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent border-amber-400/40 text-neutral-100'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <h3
              className={`text-sm font-bold tracking-wide flex items-center gap-1.5 ${
                isLight ? 'text-amber-950' : 'text-amber-300'
              }`}
            >
              <span>Mẫu Ghép Ảnh Nền Vàng Chủ Đạo</span>
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-amber-400 text-black font-extrabold px-2 py-0.5 rounded-full shadow-2xs">
            ƯU TIÊN
          </span>
        </div>
        <p className={`text-xs mt-1 ${isLight ? 'text-amber-900' : 'text-neutral-300'}`}>
          Phần trên ghép 1, 2 hoặc 3 ảnh (tỷ lệ 1:1, 4:5, 3:4). Phía dưới là banner viết chữ & logo góc tự điền theo ý bạn!
        </p>

        {/* 1-Click Quick Yellow Theme Apply if not already yellow */}
        {!isYellowBackground && (
          <button
            onClick={() =>
              onUpdateBanner({
                backgroundColor: '#facc15',
                pattern: 'grid-dots',
                headline: {
                  ...banner.headline,
                  color: '#09090b',
                  highlightColor: '#dc2626',
                },
                footerMeta: {
                  ...banner.footerMeta,
                  color: '#7c2d12',
                },
              })
            }
            className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kích hoạt Màu Vàng Chủ Đạo Ngay</span>
          </button>
        )}
      </div>

      {/* Quick Switcher for 1, 2, or 3 Photos on Top */}
      <div
        className={`p-3.5 rounded-xl border space-y-2.5 transition-colors ${
          isLight ? 'bg-slate-50 border-slate-200/90 shadow-2xs' : 'bg-neutral-950 border-neutral-800'
        }`}
      >
        <div className="flex items-center justify-between">
          <label
            className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isLight ? 'text-slate-800' : 'text-neutral-200'
            }`}
          >
            <Layout className="w-3.5 h-3.5 text-amber-500" />
            <span>Phần Trên: Chọn 1, 2 hoặc 3 Ảnh</span>
          </label>
          <span
            className={`text-[10px] font-mono font-semibold ${
              isLight ? 'text-amber-700' : 'text-amber-400'
            }`}
          >
            {currentPhotoCount} Ảnh đang chọn
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onSwitchPhotoCount(1)}
            className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all text-center flex flex-col items-center justify-center gap-1 ${
              currentPhotoCount === 1
                ? 'bg-amber-400 text-black border-amber-400 shadow-md ring-2 ring-amber-400/30'
                : isLight
                ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="w-6 h-4 border border-current rounded-xs flex items-center justify-center text-[9px]">
              1
            </div>
            <span>1 Ảnh Lớn</span>
          </button>

          <button
            onClick={() => onSwitchPhotoCount(2)}
            className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all text-center flex flex-col items-center justify-center gap-1 ${
              currentPhotoCount === 2
                ? 'bg-amber-400 text-black border-amber-400 shadow-md ring-2 ring-amber-400/30'
                : isLight
                ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="w-6 h-4 border border-current rounded-xs flex divide-x divide-current">
              <div className="w-1/2 h-full" />
              <div className="w-1/2 h-full" />
            </div>
            <span>2 Ảnh (Song đôi)</span>
          </button>

          <button
            onClick={() => onSwitchPhotoCount(3)}
            className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all text-center flex flex-col items-center justify-center gap-1 ${
              currentPhotoCount === 3
                ? 'bg-amber-400 text-black border-amber-400 shadow-md ring-2 ring-amber-400/30'
                : isLight
                ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="w-6 h-4 border border-current rounded-xs flex">
              <div className="w-3/5 h-full border-r border-current" />
              <div className="w-2/5 h-full flex flex-col divide-y divide-current">
                <div className="h-1/2" />
                <div className="h-1/2" />
              </div>
            </div>
            <span>3 Ảnh (1 Lớn + 2 Nhỏ)</span>
          </button>
        </div>
      </div>

      {/* Viền Giữa Các Ảnh (Mặc định: Màu Trắng, Tùy chỉnh To / Nhỏ / Màu Sắc) */}
      <div
        className={`p-3.5 rounded-xl border space-y-3 transition-colors ${
          isLight ? 'bg-slate-50 border-slate-200/90 shadow-2xs' : 'bg-neutral-950 border-neutral-800'
        }`}
      >
        <div className="flex items-center justify-between">
          <label
            className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isLight ? 'text-slate-800' : 'text-neutral-200'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5 text-amber-500" />
            <span>Viền Giữa Các Ảnh (Mặc định: Màu Trắng)</span>
          </label>
          <span
            className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
              isLight ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-amber-400/20 text-amber-300'
            }`}
          >
            {settings?.innerGap ?? 8}px
          </span>
        </div>

        {/* Slider chỉnh độ dày viền to/nhỏ */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className={isLight ? 'text-slate-600' : 'text-neutral-400'}>
              Độ dày viền (to / nhỏ):
            </span>
            <span
              className={`font-mono tabular-nums font-bold ${
                isLight ? 'text-slate-800' : 'text-neutral-300'
              }`}
            >
              {settings?.innerGap ?? 8}px
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={24}
            value={settings?.innerGap ?? 8}
            onChange={(e) => onUpdateSettings?.({ innerGap: Number(e.target.value) })}
            className={`w-full accent-amber-500 h-1.5 rounded-lg appearance-none cursor-pointer ${
              isLight ? 'bg-slate-200' : 'bg-neutral-800'
            }`}
          />
          <div className="flex items-center gap-1.5 pt-0.5 overflow-x-auto no-scrollbar">
            <span className={`text-[10px] font-mono shrink-0 ${isLight ? 'text-slate-500' : 'text-neutral-500'}`}>
              Nhanh:
            </span>
            {[
              { label: '0px (Dính liền)', val: 0 },
              { label: '4px (Mảnh)', val: 4 },
              { label: '8px (Mặc định)', val: 8 },
              { label: '14px (Dày)', val: 14 },
              { label: '20px (To)', val: 20 },
            ].map((b) => (
              <button
                key={b.val}
                type="button"
                onClick={() => onUpdateSettings?.({ innerGap: b.val })}
                className={`px-2 py-0.5 text-[11px] rounded-md font-bold whitespace-nowrap border transition-all ${
                  (settings?.innerGap ?? 8) === b.val
                    ? 'bg-amber-400 text-black border-amber-400 shadow-xs ring-1 ring-amber-400/50'
                    : isLight
                    ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chỉnh màu sắc viền khác nhau */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className={isLight ? 'text-slate-600' : 'text-neutral-400'}>
              Màu sắc viền giữa các ảnh:
            </span>
            <span className="font-mono text-[10px] font-bold text-amber-700">
              {settings?.borderColor || '#ffffff'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { name: 'Trắng (Mặc định)', color: '#ffffff' },
              { name: 'Đen', color: '#000000' },
              { name: 'Vàng Showroom', color: '#facc15' },
              { name: 'Đỏ Nổi Bật', color: '#dc2626' },
              { name: 'Xám Bạc', color: '#e2e8f0' },
              { name: 'Xanh Ngọc', color: '#059669' },
            ].map((bc) => {
              const isSelected = (settings?.borderColor || '#ffffff').toLowerCase() === bc.color.toLowerCase();
              return (
                <button
                  key={bc.color}
                  type="button"
                  onClick={() => onUpdateSettings?.({ borderColor: bc.color, backgroundColor: bc.color })}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-400 shadow-2xs font-bold'
                      : isLight
                      ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: bc.color }}
                  />
                  <span>{bc.name}</span>
                </button>
              );
            })}

            {/* Custom Color Picker */}
            <div className="flex items-center gap-1 pl-1">
              <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>Tùy ý:</span>
              <input
                type="color"
                value={settings?.borderColor || '#ffffff'}
                onChange={(e) => onUpdateSettings?.({ borderColor: e.target.value, backgroundColor: e.target.value })}
                className="w-6 h-6 rounded border border-slate-300 bg-transparent cursor-pointer"
                title="Chọn màu viền bất kỳ"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Presets: Highlight User's Yellow Showroom as #1 */}
      <div className="space-y-2">
        <label
          className={`text-xs font-bold uppercase tracking-wider block ${
            isLight ? 'text-slate-700' : 'text-neutral-300'
          }`}
        >
          Chọn Nhanh Mẫu Mẫu Chữ & Logo Có Sẵn:
        </label>
        <div className="space-y-2">
          {newsPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(preset)}
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                idx === 0
                  ? isLight
                    ? 'bg-amber-50/90 border-amber-400 hover:bg-amber-100/90 ring-1 ring-amber-400 shadow-2xs'
                    : 'bg-amber-400/20 border-amber-400/90 hover:bg-amber-400/30 ring-1 ring-amber-400'
                  : isLight
                  ? 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="min-w-0 pr-2">
                <div
                  className={`text-xs font-extrabold truncate ${
                    idx === 0
                      ? isLight
                        ? 'text-amber-900'
                        : 'text-amber-300'
                      : isLight
                      ? 'text-slate-900 group-hover:text-amber-600'
                      : 'text-white group-hover:text-amber-400'
                  }`}
                >
                  {preset.name}
                </div>
                <div
                  className={`text-[10px] mt-1 truncate font-mono ${
                    isLight ? 'text-slate-500' : 'text-neutral-400'
                  }`}
                >
                  Logo [{preset.symbol} {preset.badge}] · Nền {preset.bg} · Font: {preset.fontFamily}
                </div>
              </div>
              <span
                className={`text-[10px] font-mono shrink-0 px-2 py-1 rounded-md ${
                  idx === 0
                    ? 'bg-amber-400 text-black font-extrabold shadow-sm'
                    : isLight
                    ? 'bg-slate-100 text-slate-700 group-hover:bg-amber-400 group-hover:text-black font-bold'
                    : 'bg-neutral-800 text-neutral-300 group-hover:bg-amber-400 group-hover:text-black font-bold'
                }`}
              >
                Chọn mẫu
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={`h-px ${isLight ? 'bg-slate-200' : 'bg-neutral-800'}`} />

      {/* 1. Corner Logo & Brand Badge Config */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label
            className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isLight ? 'text-slate-800' : 'text-neutral-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>1. Tự Điền Logo & Nhãn Ở Góc</span>
          </label>
          <label
            className={`flex items-center gap-1.5 text-xs cursor-pointer ${
              isLight ? 'text-slate-600' : 'text-neutral-400'
            }`}
          >
            <input
              type="checkbox"
              checked={banner.brandLogo.enabled}
              onChange={(e) =>
                onUpdateBanner({
                  brandLogo: { ...banner.brandLogo, enabled: e.target.checked },
                })
              }
              className="rounded accent-amber-500 cursor-pointer"
            />
            <span>Hiển thị logo</span>
          </label>
        </div>

        {banner.brandLogo.enabled && (
          <div
            className={`p-3.5 rounded-xl border space-y-3 ${
              isLight ? 'bg-slate-50 border-slate-200 shadow-2xs' : 'bg-neutral-950 border-neutral-800'
            }`}
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <span
                  className={`text-[11px] font-medium ${
                    isLight ? 'text-slate-600' : 'text-neutral-300'
                  }`}
                >
                  Chữ số / Ký hiệu trong vòng tròn:
                </span>
                <input
                  type="text"
                  value={banner.brandLogo.symbolText}
                  onChange={(e) =>
                    onUpdateBanner({
                      brandLogo: { ...banner.brandLogo, symbolText: e.target.value },
                    })
                  }
                  placeholder="24H"
                  className={`w-full rounded-lg px-2.5 py-1.5 text-xs font-black text-center focus:outline-none focus:border-amber-500 border ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900'
                      : 'bg-neutral-900 border-neutral-700 text-white'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <span
                  className={`text-[11px] font-medium ${
                    isLight ? 'text-slate-600' : 'text-neutral-300'
                  }`}
                >
                  Chữ nhãn thương hiệu (Bên cạnh):
                </span>
                <input
                  type="text"
                  value={banner.brandLogo.badgeText}
                  onChange={(e) =>
                    onUpdateBanner({
                      brandLogo: { ...banner.brandLogo, badgeText: e.target.value },
                    })
                  }
                  placeholder="NGHỆ AN"
                  className={`w-full rounded-lg px-2.5 py-1.5 text-xs font-black text-center focus:outline-none focus:border-amber-500 border ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900'
                      : 'bg-neutral-900 border-neutral-700 text-white'
                  }`}
                />
              </div>
            </div>

            {/* Quick Suggestions for Logo & Badge */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
              <span
                className={`text-[10px] font-mono shrink-0 ${
                  isLight ? 'text-slate-500' : 'text-neutral-500'
                }`}
              >
                Gợi ý nhanh:
              </span>
              {[
                { symbol: '24H', badge: 'NGHỆ AN', isSpecial: true },
                { symbol: '37', badge: 'CAR' },
                { symbol: '28', badge: 'NEWS' },
                { symbol: 'VIP', badge: 'AUTO' },
                { symbol: 'HOT', badge: 'TIN NÓNG' },
              ].map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() =>
                    onUpdateBanner({
                      brandLogo: {
                        ...banner.brandLogo,
                        symbolText: sug.symbol,
                        badgeText: sug.badge,
                      },
                    })
                  }
                  className={`px-2.5 py-1 text-[11px] rounded-md font-bold whitespace-nowrap border transition-all ${
                    banner.brandLogo.symbolText === sug.symbol && banner.brandLogo.badgeText === sug.badge
                      ? 'bg-amber-400 text-black border-amber-400 shadow-xs ring-1 ring-amber-400/50'
                      : sug.isSpecial
                      ? isLight
                        ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                        : 'bg-amber-400/20 text-amber-300 border-amber-400/50 hover:bg-amber-400/30'
                      : isLight
                      ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  [{sug.symbol}] [{sug.badge}]
                </button>
              ))}
            </div>

            {/* Custom Logo Image Upload or Reset */}
            <div
              className={`p-2.5 rounded-lg border flex items-center justify-between ${
                isLight ? 'bg-white border-slate-200 shadow-2xs' : 'bg-neutral-900/80 border-neutral-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-500" />
                <span className={`text-xs ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                  {banner.brandLogo.customImageUrl ? 'Đã tải ảnh logo riêng' : 'Hoặc tải file ảnh logo riêng:'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {banner.brandLogo.customImageUrl && (
                  <button
                    onClick={() =>
                      onUpdateBanner({
                        brandLogo: { ...banner.brandLogo, customImageUrl: undefined },
                      })
                    }
                    className="text-[10px] text-red-500 hover:underline"
                  >
                    Xóa ảnh
                  </button>
                )}
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded-md font-bold transition-colors ${
                    isLight
                      ? 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-amber-400'
                  }`}
                >
                  <Upload className="w-3 h-3" />
                  <span>{banner.brandLogo.customImageUrl ? 'Đổi ảnh logo' : 'Tải ảnh PNG/JPG'}</span>
                </button>
                <input
                  type="file"
                  ref={logoInputRef}
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Color of Pill Badge */}
            <div className="space-y-1.5 pt-1">
              <span
                className={`text-[11px] ${
                  isLight ? 'text-slate-600' : 'text-neutral-400'
                }`}
              >
                Màu huy hiệu logo & vạch kẻ trên:
              </span>
              <div className="flex items-center gap-2">
                {['#ea580c', '#facc15', '#dc2626', '#09090b', '#059669', '#0284c7'].map((col) => (
                  <button
                    key={col}
                    onClick={() =>
                      onUpdateBanner({
                        brandLogo: { ...banner.brandLogo, themeColor: col },
                      })
                    }
                    className={`w-6 h-6 rounded-full border transition-transform ${
                      banner.brandLogo.themeColor === col
                        ? 'border-white scale-125 shadow-md ring-2 ring-slate-400'
                        : 'border-transparent hover:scale-110'
                    }`}
                    style={{ backgroundColor: col }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`h-px ${isLight ? 'bg-slate-200' : 'bg-neutral-800'}`} />

      {/* 2. Headline & Interactive Click-to-Highlight Feature */}
      <div className="space-y-3">
        <label
          className={`text-xs font-bold uppercase tracking-wider block ${
            isLight ? 'text-slate-800' : 'text-neutral-200'
          }`}
        >
          2. Nội Dung Chữ & Chọn Từ Khóa Bôi Màu (Vàng / Đỏ)
        </label>

        {/* Text Input */}
        <div className="space-y-1">
          <label className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
            Nhập câu tiêu đề bên dưới:
          </label>
          <textarea
            rows={2}
            value={banner.headline.text}
            onChange={(e) =>
              onUpdateBanner({
                headline: { ...banner.headline, text: e.target.value },
              })
            }
            placeholder="HỖ TRỢ TRẢ GÓP 70% · DUYỆT HỒ SƠ NHANH..."
            className={`w-full rounded-lg p-2.5 text-xs font-bold leading-relaxed focus:outline-none focus:border-amber-500 border ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900'
                : 'bg-neutral-950 border-neutral-700 text-white'
            }`}
          />
        </div>

        {/* Text Alignment Controls (Căn trái, Căn giữa trang, Căn phải) */}
        <div
          className={`flex items-center justify-between p-2 rounded-lg border ${
            isLight ? 'bg-slate-50 border-slate-200 shadow-2xs' : 'bg-neutral-950 border-neutral-800'
          }`}
        >
          <span
            className={`text-[11px] font-semibold flex items-center gap-1 ${
              isLight ? 'text-slate-700' : 'text-neutral-300'
            }`}
          >
            <AlignCenter className="w-3.5 h-3.5 text-amber-500" />
            <span>Căn lề trang:</span>
          </span>
          <div
            className={`flex items-center gap-1 p-0.5 rounded-lg border ${
              isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-700/60'
            }`}
          >
            <button
              type="button"
              onClick={() =>
                onUpdateBanner({
                  headline: { ...banner.headline, textAlign: 'left' },
                })
              }
              className={`px-2 py-1 text-xs rounded-md font-bold flex items-center gap-1 transition-all ${
                banner.headline.textAlign === 'left'
                  ? 'bg-amber-400 text-black shadow-xs'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Căn lề trái"
            >
              <AlignLeft className="w-3.5 h-3.5" />
              <span>Trái</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onUpdateBanner({
                  headline: { ...banner.headline, textAlign: 'center' },
                })
              }
              className={`px-2.5 py-1 text-xs rounded-md font-bold flex items-center gap-1 transition-all ${
                (banner.headline.textAlign || 'center') === 'center'
                  ? 'bg-amber-400 text-black shadow-xs ring-1 ring-amber-400/50'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Căn giữa trang (Khuyên dùng)"
            >
              <AlignCenter className="w-3.5 h-3.5" />
              <span>Căn giữa trang</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onUpdateBanner({
                  headline: { ...banner.headline, textAlign: 'right' },
                })
              }
              className={`px-2 py-1 text-xs rounded-md font-bold flex items-center gap-1 transition-all ${
                banner.headline.textAlign === 'right'
                  ? 'bg-amber-400 text-black shadow-xs'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Căn lề phải"
            >
              <AlignRight className="w-3.5 h-3.5" />
              <span>Phải</span>
            </button>
          </div>
        </div>

        {/* Font Family Selector (100% Vietnamese tested) */}
        <div className="space-y-1">
          <label
            className={`text-[11px] flex items-center justify-between ${
              isLight ? 'text-slate-600' : 'text-neutral-400'
            }`}
          >
            <span>Font chữ chuẩn Tiếng Việt (Không bị lỗi dấu):</span>
          </label>
          <select
            value={banner.headline.fontFamily || 'Montserrat'}
            onChange={(e) =>
              onUpdateBanner({
                headline: { ...banner.headline, fontFamily: e.target.value },
              })
            }
            className={`w-full rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-amber-500 cursor-pointer border ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900'
                : 'bg-neutral-900 border-neutral-700 text-white'
            }`}
          >
            {fontFamilies.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {/* 1-Click Interactive Word Selector */}
        <div
          className={`p-3 rounded-xl border space-y-2.5 ${
            isLight ? 'bg-slate-50 border-slate-200 shadow-2xs' : 'bg-neutral-950 border-neutral-800'
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <span
              className={`font-bold flex items-center gap-1.5 ${
                isLight ? 'text-amber-800' : 'text-amber-400'
              }`}
            >
              <MousePointerClick className="w-3.5 h-3.5" />
              <span>Chữ lúc chọn (Bấm để bôi màu nổi bật):</span>
            </span>
            <button
              onClick={() =>
                onUpdateBanner({
                  headline: { ...banner.headline, highlightWords: '' },
                })
              }
              className={`text-[10px] font-mono hover:underline ${
                isLight ? 'text-slate-500 hover:text-slate-800' : 'text-neutral-500 hover:text-white'
              }`}
            >
              Xóa chọn
            </button>
          </div>

          {/* Interactive Word Chips */}
          <div
            className={`flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1.5 rounded-lg border ${
              isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
            }`}
          >
            {headlineWords.map((word, i) => {
              const cleanUpper = word.replace(/^[“"']|[”"',.?!:;]$/g, '').toUpperCase();
              const isSelected = currentHighlightsList.some(
                (w) => w.includes(cleanUpper) || cleanUpper.includes(w)
              );

              return (
                <button
                  key={i}
                  onClick={() => toggleWordHighlight(word)}
                  className={`px-2.5 py-1 text-xs rounded-md transition-all font-bold ${
                    isSelected
                      ? 'bg-amber-400 text-black shadow-md ring-2 ring-amber-300 scale-105'
                      : isLight
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
                  }`}
                  title="Nhấn để đổi trạng thái bôi màu"
                >
                  {isSelected ? `✓ ${word}` : word}
                </button>
              );
            })}
          </div>

          {/* Color for Highlighted Words */}
          <div className="flex items-center justify-between pt-1">
            <span
              className={`text-[11px] font-medium ${
                isLight ? 'text-slate-600' : 'text-neutral-300'
              }`}
            >
              Màu chữ khi được chọn:
            </span>
            <div className="flex items-center gap-1.5">
              {highlightColors.map((hc) => {
                const isCurrent =
                  banner.headline.highlightColor.toLowerCase() === hc.color.toLowerCase();
                return (
                  <button
                    key={hc.color}
                    onClick={() =>
                      onUpdateBanner({
                        headline: { ...banner.headline, highlightColor: hc.color },
                      })
                    }
                    className={`w-5 h-5 rounded-md border transition-transform ${
                      isCurrent
                        ? 'border-white scale-125 shadow-sm ring-2 ring-slate-400'
                        : isLight
                        ? 'border-slate-300 hover:scale-110'
                        : 'border-neutral-700 hover:scale-110'
                    }`}
                    style={{ backgroundColor: hc.color }}
                    title={hc.name}
                  />
                );
              })}
            </div>
          </div>

          {/* Style of Highlight: Text Color or Box Badge */}
          <div className="flex items-center justify-between pt-1">
            <span
              className={`text-[11px] font-medium ${
                isLight ? 'text-slate-600' : 'text-neutral-300'
              }`}
            >
              Kiểu bôi màu:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  onUpdateBanner({
                    headline: { ...banner.headline, highlightStyle: 'color' },
                  })
                }
                className={`px-2 py-0.5 text-[11px] rounded font-bold transition-colors ${
                  (banner.headline.highlightStyle || 'color') === 'color'
                    ? 'bg-amber-400 text-black'
                    : isLight
                    ? 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    : 'bg-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                Đổi màu chữ
              </button>
              <button
                onClick={() =>
                  onUpdateBanner({
                    headline: { ...banner.headline, highlightStyle: 'box' },
                  })
                }
                className={`px-2 py-0.5 text-[11px] rounded font-bold transition-colors ${
                  banner.headline.highlightStyle === 'box'
                    ? 'bg-amber-400 text-black'
                    : isLight
                    ? 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    : 'bg-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                Hộp nền nổi bật
              </button>
            </div>
          </div>
        </div>

        {/* Font size slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className={isLight ? 'text-slate-600' : 'text-neutral-400'}>Cỡ chữ tiêu đề</span>
            <span
              className={`font-mono tabular-nums font-bold ${
                isLight ? 'text-slate-800' : 'text-neutral-300'
              }`}
            >
              {banner.headline.fontSize}px
            </span>
          </div>
          <input
            type="range"
            min={16}
            max={32}
            value={banner.headline.fontSize}
            onChange={(e) =>
              onUpdateBanner({
                headline: { ...banner.headline, fontSize: Number(e.target.value) },
              })
            }
            className={`w-full accent-amber-500 h-1.5 rounded-lg appearance-none cursor-pointer ${
              isLight ? 'bg-slate-200' : 'bg-neutral-800'
            }`}
          />
        </div>

        {/* Vị trí tiêu đề: Đẩy lên cao (Lên tới 100px) */}
        <div
          className={`p-3 rounded-xl border space-y-2.5 transition-colors ${
            isLight ? 'bg-slate-50 border-slate-200/90 shadow-2xs' : 'bg-neutral-950 border-neutral-800'
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <span
              className={`font-bold flex items-center gap-1.5 ${
                isLight ? 'text-slate-800' : 'text-neutral-200'
              }`}
            >
              <ArrowUp className="w-3.5 h-3.5 text-amber-500" />
              <span>Đẩy Tiêu Đề Lên Cao (Lên Tới 100px):</span>
            </span>
            <span
              className={`font-mono font-bold tabular-nums text-xs px-2 py-0.5 rounded ${
                (banner.headline.offsetY || 0) > 0
                  ? isLight
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-amber-400/20 text-amber-300'
                  : isLight
                  ? 'bg-slate-200 text-slate-700'
                  : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              +{banner.headline.offsetY || 0}px
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={banner.headline.offsetY || 0}
            onChange={(e) =>
              onUpdateBanner({
                headline: { ...banner.headline, offsetY: Number(e.target.value) },
              })
            }
            className={`w-full accent-amber-500 h-1.5 rounded-lg appearance-none cursor-pointer ${
              isLight ? 'bg-slate-200' : 'bg-neutral-800'
            }`}
          />

          <div className="flex items-center gap-1.5 pt-0.5 overflow-x-auto no-scrollbar">
            <span className={`text-[10px] font-mono shrink-0 ${isLight ? 'text-slate-500' : 'text-neutral-500'}`}>
              Nhanh:
            </span>
            {[
              { label: '0px (Gốc)', val: 0 },
              { label: '25px', val: 25 },
              { label: '50px', val: 50 },
              { label: '75px', val: 75 },
              { label: '100px (Lên tối đa)', val: 100 },
            ].map((b) => (
              <button
                key={b.val}
                type="button"
                onClick={() =>
                  onUpdateBanner({
                    headline: { ...banner.headline, offsetY: b.val },
                  })
                }
                className={`px-2 py-0.5 text-[11px] rounded-md font-bold whitespace-nowrap border transition-all ${
                  (banner.headline.offsetY || 0) === b.val
                    ? 'bg-amber-400 text-black border-amber-400 shadow-xs ring-1 ring-amber-400/50'
                    : isLight
                    ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                    : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`h-px ${isLight ? 'bg-slate-200' : 'bg-neutral-800'}`} />

      {/* 3. Màu Nền Banner (Màu Vàng Chủ Đạo) */}
      <div className="space-y-3">
        <label
          className={`text-xs font-bold uppercase tracking-wider block ${
            isLight ? 'text-slate-800' : 'text-neutral-200'
          }`}
        >
          3. Màu Nền Banner Phía Dưới
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {brandColors.map((bg, idx) => {
            const isSelected = banner.backgroundColor.toLowerCase() === bg.color.toLowerCase();
            return (
              <button
                key={idx}
                onClick={() =>
                  onUpdateBanner({
                    backgroundColor: bg.color,
                    pattern: bg.color === '#facc15' ? 'grid-dots' : 'none',
                    headline: { ...banner.headline, color: bg.text },
                    footerMeta: {
                      ...banner.footerMeta,
                      color: bg.color === '#facc15' ? '#7c2d12' : '#ffffff',
                    },
                  })
                }
                className={`p-2.5 rounded-xl text-center border transition-all text-xs font-medium ${
                  isSelected
                    ? isLight
                      ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400 text-amber-950 font-bold shadow-2xs'
                      : 'bg-neutral-800 border-amber-400 ring-2 ring-amber-400 text-amber-300 font-bold'
                    : isLight
                    ? 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div
                  className="w-full h-5 rounded-md mb-1.5 border border-black/20 shadow-xs"
                  style={{ backgroundColor: bg.color }}
                />
                <span className="text-[11px] truncate block font-bold">
                  {bg.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={`h-px ${isLight ? 'bg-slate-200' : 'bg-neutral-800'}`} />

      {/* 4. Hotline & Địa chỉ góc dưới phải */}
      <div className="space-y-3">
        <label
          className={`text-xs font-bold uppercase tracking-wider block ${
            isLight ? 'text-slate-800' : 'text-neutral-200'
          }`}
        >
          4. Thông Tin Liên Hệ Góc Dưới Phải
        </label>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <span className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
              Số Hotline / Zalo:
            </span>
            <input
              type="text"
              value={banner.footerMeta.hotline}
              onChange={(e) =>
                onUpdateBanner({
                  footerMeta: { ...banner.footerMeta, hotline: e.target.value },
                })
              }
              placeholder="0987 361 234"
              className={`w-full rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500 border ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900'
                  : 'bg-neutral-950 border-neutral-700 text-white'
              }`}
            />
          </div>

          <div className="space-y-1">
            <span className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
              Địa chỉ / Showroom / Email:
            </span>
            <input
              type="text"
              value={banner.footerMeta.emailOrPage}
              onChange={(e) =>
                onUpdateBanner({
                  footerMeta: { ...banner.footerMeta, emailOrPage: e.target.value },
                })
              }
              placeholder="Số 82 Đại Lộ Lê Nin"
              className={`w-full rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500 border ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900'
                  : 'bg-neutral-950 border-neutral-700 text-white'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
