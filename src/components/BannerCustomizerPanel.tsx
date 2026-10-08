import React, { useRef } from 'react';
import { FooterBannerConfig, BannerStyleType } from '../types';
import {
  Type,
  Phone,
  Mail,
  Upload,
  Palette,
  Columns,
  Quote,
  Sparkles,
  Check,
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

  const brandColors = [
    { name: 'Xanh Theanh28', color: '#059669' },
    { name: 'Đỏ Tin Nóng', color: '#dc2626' },
    { name: 'Vàng Rực Rỡ', color: '#facc15' },
    { name: 'Xanh Dương', color: '#0284c7' },
    { name: 'Đen Tối Giản', color: '#09090b' },
    { name: 'Cam Năng Động', color: '#ea580c' },
  ];

  const highlightColors = [
    { name: 'Đỏ Nổi Bật', color: '#dc2626' },
    { name: 'Vàng Chanh', color: '#eab308' },
    { name: 'Xanh Lá', color: '#16a34a' },
    { name: 'Xanh Dương', color: '#2563eb' },
  ];

  // Presets accurately mimicking the user's uploaded samples
  const newsPresets = [
    {
      name: 'Mẫu 1: Theanh28 Thể Thao (Messi & Ronaldo)',
      symbol: '28',
      badge: 'NEWS',
      color: '#059669',
      bg: '#f1f5f9',
      style: 'theanh28-news' as BannerStyleType,
      headline:
        'TRÊN SÂN CỎ LÀ NHỮNG CUỘC ĐUA KHÔNG KHOAN NHƯỢNG. NHƯNG NGOÀI ĐỜI, MESSI VÀ RONALDO VẪN LUÔN TÔN TRỌNG ĐỐI THỦ LỚN NHẤT CỦA MÌNH',
      highlights: 'CUỘC ĐUA, VẪN LUÔN TÔN TRỌNG',
      highlightColor: '#dc2626',
      hotline: '0983 663 092',
      email: '28.hotline@gmail.com',
      twoCols: false,
      quote: false,
    },
    {
      name: 'Mẫu 2: Tin Báo Chí (Trump & Nobel Hòa Bình)',
      symbol: '28',
      badge: 'NEWS',
      color: '#059669',
      bg: '#f1f5f9',
      style: 'theanh28-news' as BannerStyleType,
      headline:
        'TỔNG THỐNG TRUMP KHẲNG ĐỊNH ÔNG XỨNG ĐÁNG NHẬN GIẢI NOBEL HÒA BÌNH VÌ "ĐÃ LÀM NHỮNG ĐIỀU CHƯA AI LÀM ĐƯỢC KHI CHẤM DỨT 8 CUỘC XUNG ĐỘT"',
      highlights: 'XỨNG ĐÁNG NHẬN GIẢI NOBEL HÒA BÌNH',
      highlightColor: '#059669',
      hotline: '0983 663 092',
      email: '28.hotline@gmail.com',
      twoCols: false,
      quote: false,
    },
    {
      name: 'Mẫu 3: So Sánh 2 Cột (2 Bác Sĩ Nữ)',
      symbol: '28',
      badge: 'NEWS',
      color: '#059669',
      bg: '#ffffff',
      style: 'two-columns' as BannerStyleType,
      headline: 'HAI NỮ BÁC SĨ TÀI NĂNG',
      highlights: 'BÔNG HỒNG THÉP',
      highlightColor: '#dc2626',
      hotline: '0983 663 092',
      email: '28.hotline@gmail.com',
      twoCols: true,
      quote: false,
    },
    {
      name: 'Mẫu 4: Tin Nóng Nền Đen & Quote (Giá Xăng Tăng)',
      symbol: '28',
      badge: 'NEWS',
      color: '#facc15',
      bg: '#09090b',
      style: 'dark-quote' as BannerStyleType,
      headline:
        'TỪ 15H HÔM NAY (8/10), GIÁ XĂNG TIẾP TỤC TĂNG, XĂNG E10 LÊN HƠN 28.200 ĐỒNG/LÍT',
      highlights: 'GIÁ XĂNG TIẾP TỤC TĂNG, 28.200 ĐỒNG/LÍT',
      highlightColor: '#facc15',
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
        color: p.color,
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

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
          <Type className="w-4 h-4 text-amber-400" />
          <span>Tùy Chỉnh Chữ & Logo Ở Góc</span>
        </h3>
        <p className="text-xs text-neutral-400 mt-0.5">
          Tạo mẫu tin tức mạng xã hội chuẩn Theanh28 / Báo chí với Logo và chữ bôi màu
        </p>
      </div>

      {/* Quick Switcher for 1, 2, or 3 Photos on Top */}
      <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
          Số Lượng Ảnh Phần Trên:
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onSwitchPhotoCount(1)}
            className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all text-center ${
              currentPhotoCount === 1
                ? 'bg-amber-400 text-black border-amber-400 shadow-xs'
                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            1 Ảnh Trên
          </button>

          <button
            onClick={() => onSwitchPhotoCount(2)}
            className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all text-center ${
              currentPhotoCount === 2
                ? 'bg-amber-400 text-black border-amber-400 shadow-xs'
                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            2 Ảnh Trên (Song Đôi)
          </button>

          <button
            onClick={() => onSwitchPhotoCount(3)}
            className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all text-center ${
              currentPhotoCount === 3
                ? 'bg-amber-400 text-black border-amber-400 shadow-xs'
                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            3 Ảnh Trên
          </button>
        </div>
      </div>

      {/* Preset Buttons matching user's images */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
          Áp Dụng Mẫu Có Sẵn (Theo 4 ảnh mẫu):
        </label>
        <div className="space-y-1.5">
          {newsPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(preset)}
              className="w-full text-left p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-400 transition-colors flex items-center justify-between group"
            >
              <div className="min-w-0 pr-2">
                <div className="text-xs font-medium text-white group-hover:text-amber-400 truncate">
                  {preset.name}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5 truncate font-mono">
                  Logo [{preset.symbol} {preset.badge}] · Màu {preset.color}
                </div>
              </div>
              <span className="text-[10px] text-neutral-500 font-mono group-hover:text-amber-400 shrink-0">
                Áp dụng
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* 1. Corner Logo & Brand Pill Badge Config */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            1. Logo & Nhãn Ở Góc (Brand Badge)
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
            <span>Bật logo</span>
          </label>
        </div>

        {banner.brandLogo.enabled && (
          <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
            {/* Symbol & Badge Text Inputs */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <span className="text-[11px] text-neutral-400">Ký hiệu trong vòng tròn:</span>
                <input
                  type="text"
                  value={banner.brandLogo.symbolText}
                  onChange={(e) =>
                    onUpdateBanner({
                      brandLogo: { ...banner.brandLogo, symbolText: e.target.value },
                    })
                  }
                  placeholder="28"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold text-center focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-neutral-400">Chữ nhãn bên cạnh:</span>
                <input
                  type="text"
                  value={banner.brandLogo.badgeText}
                  onChange={(e) =>
                    onUpdateBanner({
                      brandLogo: { ...banner.brandLogo, badgeText: e.target.value },
                    })
                  }
                  placeholder="NEWS"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold text-center focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Custom Logo Upload option */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-neutral-400">Hoặc tải ảnh logo riêng:</span>
              <button
                onClick={() => logoInputRef.current?.click()}
                className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-medium"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Tải ảnh PNG</span>
              </button>
              <input
                type="file"
                ref={logoInputRef}
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>

            {/* Color of Pill Badge */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] text-neutral-400">Màu chủ đạo huy hiệu & vạch kẻ:</span>
              <div className="flex items-center gap-2">
                {brandColors.map((c) => (
                  <button
                    key={c.color}
                    onClick={() =>
                      onUpdateBanner({
                        brandLogo: { ...banner.brandLogo, themeColor: c.color },
                        footerMeta: { ...banner.footerMeta, color: c.color },
                      })
                    }
                    className={`w-6 h-6 rounded-full border transition-transform ${
                      banner.brandLogo.themeColor === c.color
                        ? 'border-white scale-110 shadow-md ring-2 ring-white/50'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.color }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="h-px bg-neutral-800" />

      {/* 2. Headline & Keyword Highlighting */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            2. Nội Dung Chữ & Tô Màu Nổi Bật
          </label>
          <label className="flex items-center gap-1.5 text-xs text-neutral-400 cursor-pointer">
            <input
              type="checkbox"
              checked={banner.twoColumns.enabled}
              onChange={(e) =>
                onUpdateBanner({
                  twoColumns: { ...banner.twoColumns, enabled: e.target.checked },
                })
              }
              className="rounded accent-amber-400 cursor-pointer"
            />
            <span>2 cột (như mẫu bác sĩ)</span>
          </label>
        </div>

        {!banner.twoColumns.enabled ? (
          /* Single Main Headline Mode */
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] text-neutral-400">Nội dung câu tiêu đề:</label>
              <textarea
                rows={3}
                value={banner.headline.text}
                onChange={(e) =>
                  onUpdateBanner({
                    headline: { ...banner.headline, text: e.target.value },
                  })
                }
                placeholder="Nhập nội dung tin tức..."
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-xs text-white font-bold leading-relaxed focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Keyword Highlighting Feature (bôi màu từ khóa như ảnh mẫu) */}
            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-300">Từ khóa cần tô màu nổi bật:</span>
                <span className="text-[10px] text-neutral-500 font-mono">Cách nhau bằng dấu phẩy</span>
              </div>
              <input
                type="text"
                value={banner.headline.highlightWords}
                onChange={(e) =>
                  onUpdateBanner({
                    headline: { ...banner.headline, highlightWords: e.target.value },
                  })
                }
                placeholder="VD: CUỘC ĐUA, VẪN LUÔN TÔN TRỌNG"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold focus:outline-none focus:border-amber-400"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-neutral-400">Màu chữ nổi bật:</span>
                <div className="flex items-center gap-1.5">
                  {highlightColors.map((hc) => (
                    <button
                      key={hc.color}
                      onClick={() =>
                        onUpdateBanner({
                          headline: { ...banner.headline, highlightColor: hc.color },
                        })
                      }
                      className={`w-5 h-5 rounded-md border ${
                        banner.headline.highlightColor === hc.color
                          ? 'border-white scale-110'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: hc.color }}
                      title={hc.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Font size */}
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
                max={30}
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
        ) : (
          /* Two Columns Comparison Mode (as seen in doctor sample 3) */
          <div className="space-y-3 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
            {/* Column 1 */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-red-400">Cột 1 (Ảnh bên trái):</span>
              <input
                type="text"
                value={banner.twoColumns.col1Title}
                onChange={(e) =>
                  onUpdateBanner({
                    twoColumns: { ...banner.twoColumns, col1Title: e.target.value },
                  })
                }
                placeholder="Tên hoặc chức danh nhân vật 1"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-red-400 font-bold focus:outline-none"
              />
              <textarea
                rows={2}
                value={banner.twoColumns.col1Text}
                onChange={(e) =>
                  onUpdateBanner({
                    twoColumns: { ...banner.twoColumns, col1Text: e.target.value },
                  })
                }
                placeholder="Mô tả hoặc câu nói nhân vật 1..."
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Column 2 */}
            <div className="space-y-1.5 pt-2 border-t border-neutral-800">
              <span className="text-[11px] font-semibold text-red-400">Cột 2 (Ảnh bên phải):</span>
              <input
                type="text"
                value={banner.twoColumns.col2Title}
                onChange={(e) =>
                  onUpdateBanner({
                    twoColumns: { ...banner.twoColumns, col2Title: e.target.value },
                  })
                }
                placeholder="Tên hoặc chức danh nhân vật 2"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-red-400 font-bold focus:outline-none"
              />
              <textarea
                rows={2}
                value={banner.twoColumns.col2Text}
                onChange={(e) =>
                  onUpdateBanner({
                    twoColumns: { ...banner.twoColumns, col2Text: e.target.value },
                  })
                }
                placeholder="Mô tả hoặc câu nói nhân vật 2..."
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-white focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      <div className="h-px bg-neutral-800" />

      {/* 3. Quote Badge & Background Tone */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
          3. Màu Nền Banner & Huy Hiệu Quote “ ”
        </label>

        {/* Quote Badge toggle */}
        <label className="flex items-center justify-between p-2 bg-neutral-950 rounded-lg border border-neutral-800 text-xs text-neutral-300 cursor-pointer">
          <div className="flex items-center gap-2">
            <Quote className="w-3.5 h-3.5 text-amber-400" />
            <span>Huy hiệu dấu ngoặc kép “ ” (như ảnh 4)</span>
          </div>
          <input
            type="checkbox"
            checked={banner.quoteBadge.enabled}
            onChange={(e) =>
              onUpdateBanner({
                quoteBadge: { ...banner.quoteBadge, enabled: e.target.checked },
              })
            }
            className="rounded accent-amber-400 cursor-pointer"
          />
        </label>

        {/* Background Tone Selection */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Trắng Sáng (Ảnh 1-3)', color: '#f1f5f9', text: '#09090b' },
            { label: 'Đen Mờ (Ảnh 4)', color: '#09090b', text: '#ffffff' },
            { label: 'Vàng Rực Showroom', color: '#facc15', text: '#09090b' },
          ].map((bg, idx) => (
            <button
              key={idx}
              onClick={() =>
                onUpdateBanner({
                  backgroundColor: bg.color,
                  headline: { ...banner.headline, color: bg.text },
                })
              }
              className={`p-2 rounded-xl text-center border transition-all text-xs font-medium ${
                banner.backgroundColor.toLowerCase() === bg.color.toLowerCase()
                  ? 'bg-neutral-800 border-amber-400 ring-1 ring-amber-400 text-amber-400'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div
                className="w-full h-4 rounded-md mb-1 border border-black/20"
                style={{ backgroundColor: bg.color }}
              />
              <span className="text-[10px] truncate block">{bg.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* 4. Footer Meta: Hotline, Email & Credit */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
          4. Hotline & Thông Tin Ở Góc Phải Dưới
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
              placeholder="0983 663 092"
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-neutral-400">Email hoặc Tên Page:</span>
            <input
              type="text"
              value={banner.footerMeta.emailOrPage}
              onChange={(e) =>
                onUpdateBanner({
                  footerMeta: { ...banner.footerMeta, emailOrPage: e.target.value },
                })
              }
              placeholder="28.hotline@gmail.com"
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {banner.quoteBadge.enabled && (
          <div className="space-y-1">
            <span className="text-[11px] text-neutral-400">Nguồn ảnh (Credit góc phải ảnh):</span>
            <input
              type="text"
              value={banner.quoteBadge.creditText}
              onChange={(e) =>
                onUpdateBanner({
                  quoteBadge: { ...banner.quoteBadge, creditText: e.target.value },
                })
              }
              placeholder="ẢNH: HOÀI BẢO"
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};
