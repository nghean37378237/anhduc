import React, { useRef } from 'react';
import { FooterBannerConfig, BannerStyleType } from '../types';
import {
  Type,
  Upload,
  Sparkles,
  Check,
  MousePointerClick,
  Palette,
  Layers,
  Image as ImageIcon,
  Flame,
  Layout,
} from 'lucide-react';

interface BannerCustomizerPanelProps {
  banner: FooterBannerConfig;
  onUpdateBanner: (updated: Partial<FooterBannerConfig>) => void;
  onSwitchPhotoCount: (count: 1 | 2 | 3) => void;
  currentPhotoCount: number;
}

export const BannerCustomizerPanel: React.FC<BannerCustomizerPanelProps> = ({
  banner,
  onUpdateBanner,
  onSwitchPhotoCount,
  currentPhotoCount,
}) => {
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
    { name: 'Xanh Theanh28', color: '#059669', text: '#ffffff', badge: '#059669' },
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
      name: '⭐ MẪU VÀNG CHỦ ĐẠO: Showroom Ô Tô & Bán Hàng (37CAR)',
      symbol: '37',
      badge: 'CAR',
      color: '#ea580c',
      bg: '#facc15', // User's requested primary signature yellow!
      style: 'theanh28-news' as BannerStyleType,
      headline: 'HỖ TRỢ TRẢ GÓP 70% · DUYỆT HỒ SƠ NHANH · LÃI SUẤT THẤP',
      highlights: 'TRẢ GÓP 70%, LÃI SUẤT THẤP',
      highlightColor: '#dc2626',
      highlightStyle: 'color' as 'color' | 'box',
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
      style: 'theanh28-news' as BannerStyleType,
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
      name: 'Mẫu 3: Theanh28 Thể Thao (Messi & Ronaldo)',
      symbol: '28',
      badge: 'NEWS',
      color: '#059669',
      bg: '#f1f5f9',
      style: 'theanh28-news' as BannerStyleType,
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
      name: 'Mẫu 4: So Sánh 2 Cột (2 Bác Sĩ Nữ)',
      symbol: '28',
      badge: 'NEWS',
      color: '#059669',
      bg: '#ffffff',
      style: 'two-columns' as BannerStyleType,
      headline: 'HAI NỮ BÁC SĨ TÀI NĂNG',
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
      symbol: '28',
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
        const result = ev.target?.result as string;
        if (result) {
          onUpdateBanner({
            brandLogo: {
              ...banner.brandLogo,
              logoType: 'image',
              customImageUrl: result,
            },
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Helper for 1-click word highlighting toggle
  const headlineWords = banner.headline.text
    .normalize('NFC')
    .split(' ')
    .filter(Boolean);

  const currentHighlightsList = (banner.headline.highlightWords || '')
    .normalize('NFC')
    .split(',')
    .map((w) => w.trim().toUpperCase())
    .filter(Boolean);

  const toggleWordHighlight = (word: string) => {
    const cleanWordUpper = word.replace(/^[“"']|[”"',.?!:;]$/g, '').toUpperCase();
    if (!cleanWordUpper) return;

    let nextList: string[];
    if (currentHighlightsList.some((w) => w.includes(cleanWordUpper) || cleanWordUpper.includes(w))) {
      // Remove word
      nextList = currentHighlightsList.filter((w) => !w.includes(cleanWordUpper) && !cleanWordUpper.includes(w));
    } else {
      // Add word
      nextList = [...currentHighlightsList, cleanWordUpper];
    }

    onUpdateBanner({
      headline: {
        ...banner.headline,
        highlightWords: nextList.join(', '),
      },
    });
  };

  const isYellowBackground = banner.backgroundColor.toLowerCase() === '#facc15' || banner.backgroundColor.toLowerCase() === '#eab308';

  return (
    <div className="p-4 space-y-6">
      {/* Header with Yellow Dominant Theme Callout */}
      <div className="bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent p-3.5 rounded-2xl border border-amber-400/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h3 className="text-sm font-bold text-amber-300 tracking-wide flex items-center gap-1.5">
              <span>Mẫu Ghép Ảnh Nền Vàng Chủ Đạo</span>
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-amber-400 text-black font-extrabold px-2 py-0.5 rounded-full">
            ƯU TIÊN
          </span>
        </div>
        <p className="text-xs text-neutral-300 mt-1">
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
      <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-amber-400" />
            <span>Phần Trên: Chọn 1, 2 hoặc 3 Ảnh</span>
          </label>
          <span className="text-[10px] text-amber-400 font-mono font-semibold">
            {currentPhotoCount} Ảnh đang chọn
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onSwitchPhotoCount(1)}
            className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all text-center flex flex-col items-center justify-center gap-1 ${
              currentPhotoCount === 1
                ? 'bg-amber-400 text-black border-amber-400 shadow-md ring-2 ring-amber-400/30'
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

      {/* Presets: Highlight User's Yellow Showroom as #1 */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
          Chọn Nhanh Mẫu Mẫu Chữ & Logo Có Sẵn:
        </label>
        <div className="space-y-2">
          {newsPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(preset)}
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                idx === 0
                  ? 'bg-amber-400/20 border-amber-400/90 hover:bg-amber-400/30 ring-1 ring-amber-400'
                  : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="min-w-0 pr-2">
                <div
                  className={`text-xs font-extrabold truncate ${
                    idx === 0 ? 'text-amber-300' : 'text-white group-hover:text-amber-400'
                  }`}
                >
                  {preset.name}
                </div>
                <div className="text-[10px] text-neutral-400 mt-1 truncate font-mono">
                  Logo [{preset.symbol} {preset.badge}] · Nền {preset.bg} · Font: {preset.fontFamily}
                </div>
              </div>
              <span
                className={`text-[10px] font-mono shrink-0 px-2 py-1 rounded-md ${
                  idx === 0
                    ? 'bg-amber-400 text-black font-extrabold shadow-sm'
                    : 'bg-neutral-800 text-neutral-300 group-hover:bg-amber-400 group-hover:text-black font-bold'
                }`}
              >
                Chọn mẫu
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* 1. Corner Logo & Brand Badge Config */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>1. Tự Điền Logo & Nhãn Ở Góc</span>
          </label>
          <label className="flex items-center gap-1.5 text-xs text-neutral-400 cursor-pointer">
            <input
              type="checkbox"
              checked={banner.brandLogo.enabled}
              onChange={(e) =>
                onUpdateBanner({
                  brandLogo: { ...banner.brandLogo, enabled: e.target.checked },
                })
              }
              className="rounded accent-amber-400 cursor-pointer"
            />
            <span>Hiển thị logo</span>
          </label>
        </div>

        {banner.brandLogo.enabled && (
          <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <span className="text-[11px] font-medium text-neutral-300">Chữ số / Ký hiệu trong vòng tròn:</span>
                <input
                  type="text"
                  value={banner.brandLogo.symbolText}
                  onChange={(e) =>
                    onUpdateBanner({
                      brandLogo: { ...banner.brandLogo, symbolText: e.target.value },
                    })
                  }
                  placeholder="37"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-black text-center focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-medium text-neutral-300">Chữ nhãn thương hiệu (Bên cạnh):</span>
                <input
                  type="text"
                  value={banner.brandLogo.badgeText}
                  onChange={(e) =>
                    onUpdateBanner({
                      brandLogo: { ...banner.brandLogo, badgeText: e.target.value },
                    })
                  }
                  placeholder="CAR"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-black text-center focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Custom Logo Image Upload or Reset */}
            <div className="p-2.5 bg-neutral-900/80 rounded-lg border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-neutral-300">
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
                    className="text-[10px] text-red-400 hover:underline"
                  >
                    Xóa ảnh
                  </button>
                )}
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className="flex items-center gap-1 text-[11px] bg-neutral-800 hover:bg-neutral-700 text-amber-400 px-2 py-1 rounded-md font-bold"
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
              <span className="text-[11px] text-neutral-400">Màu huy hiệu logo & vạch kẻ trên:</span>
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
                        ? 'border-white scale-125 shadow-md ring-2 ring-white/50'
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

      <div className="h-px bg-neutral-800" />

      {/* 2. Headline & Interactive Click-to-Highlight Feature */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider block">
          2. Nội Dung Chữ & Chọn Từ Khóa Bôi Màu (Vàng / Đỏ)
        </label>

        {/* Text Input */}
        <div className="space-y-1">
          <label className="text-[11px] text-neutral-400">Nhập câu tiêu đề bên dưới:</label>
          <textarea
            rows={2}
            value={banner.headline.text}
            onChange={(e) =>
              onUpdateBanner({
                headline: { ...banner.headline, text: e.target.value },
              })
            }
            placeholder="HỖ TRỢ TRẢ GÓP 70% · DUYỆT HỒ SƠ NHANH..."
            className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-xs text-white font-bold leading-relaxed focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Font Family Selector (100% Vietnamese tested) */}
        <div className="space-y-1">
          <label className="text-[11px] text-neutral-400 flex items-center justify-between">
            <span>Font chữ chuẩn Tiếng Việt (Không bị lỗi dấu):</span>
          </label>
          <select
            value={banner.headline.fontFamily || 'Montserrat'}
            onChange={(e) =>
              onUpdateBanner({
                headline: { ...banner.headline, fontFamily: e.target.value },
              })
            }
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            {fontFamilies.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {/* 1-Click Interactive Word Selector (Bấm trực tiếp vào chữ để chọn bôi vàng/đỏ) */}
        <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <MousePointerClick className="w-3.5 h-3.5" />
              <span>Chữ lúc chọn (Bấm để bôi màu nổi bật):</span>
            </span>
            <button
              onClick={() =>
                onUpdateBanner({
                  headline: { ...banner.headline, highlightWords: '' },
                })
              }
              className="text-[10px] text-neutral-500 hover:text-white font-mono"
            >
              Xóa chọn
            </button>
          </div>

          {/* Interactive Word Chips - Styled in user's dominant Yellow or active highlight color */}
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1.5 bg-neutral-900 rounded-lg border border-neutral-800">
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
            <span className="text-[11px] text-neutral-300 font-medium">Màu chữ khi được chọn:</span>
            <div className="flex items-center gap-1.5">
              {highlightColors.map((hc) => {
                const isCurrent = banner.headline.highlightColor.toLowerCase() === hc.color.toLowerCase();
                return (
                  <button
                    key={hc.color}
                    onClick={() =>
                      onUpdateBanner({
                        headline: { ...banner.headline, highlightColor: hc.color },
                      })
                    }
                    className={`w-5 h-5 rounded-md border transition-transform ${
                      isCurrent ? 'border-white scale-125 shadow-sm ring-2 ring-white/60' : 'border-neutral-700'
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
            <span className="text-[11px] text-neutral-300 font-medium">Kiểu bôi màu:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  onUpdateBanner({
                    headline: { ...banner.headline, highlightStyle: 'color' },
                  })
                }
                className={`px-2 py-0.5 text-[11px] rounded font-bold ${
                  (banner.headline.highlightStyle || 'color') === 'color'
                    ? 'bg-amber-400 text-black'
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
                className={`px-2 py-0.5 text-[11px] rounded font-bold ${
                  banner.headline.highlightStyle === 'box'
                    ? 'bg-amber-400 text-black'
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
            <span className="text-neutral-400">Cỡ chữ tiêu đề</span>
            <span className="font-mono text-neutral-300 tabular-nums">
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
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* 3. Màu Nền Banner (Màu Vàng Chủ Đạo) */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider block">
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
                    ? 'bg-neutral-800 border-amber-400 ring-2 ring-amber-400 text-amber-300'
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

      <div className="h-px bg-neutral-800" />

      {/* 4. Hotline & Địa chỉ góc dưới phải */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider block">
          4. Thông Tin Liên Hệ Góc Dưới Phải
        </label>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <span className="text-[11px] text-neutral-400">Số Hotline / Zalo:</span>
            <input
              type="text"
              value={banner.footerMeta.hotline}
              onChange={(e) =>
                onUpdateBanner({
                  footerMeta: { ...banner.footerMeta, hotline: e.target.value },
                })
              }
              placeholder="0987 361 234"
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-neutral-400">Địa chỉ / Showroom / Email:</span>
            <input
              type="text"
              value={banner.footerMeta.emailOrPage}
              onChange={(e) =>
                onUpdateBanner({
                  footerMeta: { ...banner.footerMeta, emailOrPage: e.target.value },
                })
              }
              placeholder="Số 82 Đại Lộ Lê Nin"
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
