import React from 'react';
import { FooterBannerConfig } from '../types';
import { Type, Sparkles, Phone, MapPin, CheckCircle2, Sliders } from 'lucide-react';

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
  const bannerColors = [
    { name: 'Vàng Showroom (Như mẫu)', color: '#facc15', text: '#09090b', badge: '#ea580c' },
    { name: 'Cam Năng Động', color: '#f97316', text: '#ffffff', badge: '#c2410c' },
    { name: 'Đỏ Nổi Bật Hot Deal', color: '#dc2626', text: '#ffffff', badge: '#991b1b' },
    { name: 'Đen Sang Trọng', color: '#09090b', text: '#ffffff', badge: '#d97706' },
    { name: 'Xanh Navy Uy Tín', color: '#0f172a', text: '#ffffff', badge: '#0284c7' },
    { name: 'Trắng Thanh Lịch', color: '#ffffff', text: '#09090b', badge: '#dc2626' },
  ];

  const quickSamples = [
    {
      name: 'Mẫu Showroom Ô Tô (37Car)',
      badge: 'HỖ TRỢ TRẢ GÓP 70%',
      headline: '37CAR · MUA BÁN & KÝ GỬI Ô TÔ',
      subheadline: 'DUYỆT HỒ SƠ NHANH · LÃI SUẤT THẤP',
      details: '• Xe tuyển chọn bao test hãng toàn quốc\n• Cam kết không đâm đụng, không ngập nước\n• Bảo hành động cơ & hộp số 12 tháng',
      hotline: 'Hotline: 0987.361.234 - 0967.765.005',
      address: 'Số 82 - Đại Lộ Lê Nin, TP. Vinh',
      color: '#facc15',
    },
    {
      name: 'Mẫu Bất Động Sản / Nhà Đất',
      badge: 'SỔ ĐỎ CHÍNH CHỦ',
      headline: 'BÁN NHÀ MẶT PHỐ TRUNG TÂM',
      subheadline: 'DIỆN TÍCH 120M² · MẶT TIỀN 6M · GIÁ TỐT',
      details: '• Đường rộng 12m, ô tô tránh nhau thoải mái\n• Khu dân trí cao, gần chợ và trường học\n• Hỗ trợ vay ngân hàng 75% giá trị',
      hotline: 'Liên hệ chính chủ: 0912.345.678',
      address: 'Vị trí: Phường Quán Bàu, TP. Vinh',
      color: '#facc15',
    },
    {
      name: 'Mẫu Bán Hàng & Thời Trang',
      badge: 'GIẢM GIÁ 50% HÔM NAY',
      headline: 'BỘ SƯU TẬP MỚI VỀ · SỐ LƯỢNG CÓ HẠN',
      subheadline: 'CHẤT LIỆU CAO CẤP · SHIP COD TOÀN QUỐC',
      details: '• Kiểm tra hàng trước khi thanh toán\n• Đổi trả miễn phí trong vòng 7 ngày\n• Tặng kèm quà tri ân cho 50 đơn đầu tiên',
      hotline: 'Zalo đặt hàng: 0988.888.999',
      address: 'Giao hàng tận nơi toàn quốc',
      color: '#facc15',
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
          <Type className="w-4 h-4 text-amber-400" />
          <span>Viết Chữ Lên Banner Phía Dưới</span>
        </h3>
        <p className="text-xs text-neutral-400 mt-0.5">
          Tùy chỉnh thông tin bán hàng, tiêu đề, hotline và địa chỉ theo mẫu mong muốn
        </p>
      </div>

      {/* Quick Switcher for Top Photo Count: 1, 2, or 3 Photos */}
      <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
          Chọn Số Ảnh Phần Trên:
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
            2 Ảnh Trên
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

      {/* Quick Fill Templates */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
          Điền Nhanh Nội Dung Mẫu:
        </label>
        <div className="space-y-1.5">
          {quickSamples.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                onUpdateBanner({
                  backgroundColor: s.color,
                  badge: { ...banner.badge, text: s.badge },
                  headline: { ...banner.headline, text: s.headline },
                  subheadline: { ...banner.subheadline, text: s.subheadline },
                  details: { ...banner.details, text: s.details },
                  hotline: { ...banner.hotline, text: s.hotline },
                  address: { ...banner.address, text: s.address },
                });
              }}
              className="w-full text-left p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-400/80 transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-medium text-white group-hover:text-amber-400 transition-colors">
                  {s.name}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5 truncate max-w-[220px]">
                  {s.headline}
                </div>
              </div>
              <span className="text-[10px] text-neutral-500 font-mono group-hover:text-amber-400">
                Áp dụng
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* Ribbon Badge Config */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            Nhãn Ruy-Băng Góc Trên (Badge)
          </label>
          <label className="flex items-center gap-1.5 text-xs text-neutral-400 cursor-pointer">
            <input
              type="checkbox"
              checked={banner.badge.enabled}
              onChange={(e) =>
                onUpdateBanner({
                  badge: { ...banner.badge, enabled: e.target.checked },
                })
              }
              className="rounded accent-amber-400 cursor-pointer"
            />
            <span>Bật nhãn</span>
          </label>
        </div>

        {banner.badge.enabled && (
          <div className="space-y-2">
            <input
              type="text"
              value={banner.badge.text}
              onChange={(e) =>
                onUpdateBanner({
                  badge: { ...banner.badge, text: e.target.value },
                })
              }
              placeholder="VD: HỖ TRỢ TRẢ GÓP 70%"
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />

            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Màu nền nhãn:</span>
              <div className="flex items-center gap-1.5">
                {['#ea580c', '#dc2626', '#0284c7', '#16a34a', '#09090b'].map((col) => (
                  <button
                    key={col}
                    onClick={() =>
                      onUpdateBanner({
                        badge: { ...banner.badge, bgColor: col },
                      })
                    }
                    className={`w-5 h-5 rounded-md border ${
                      banner.badge.bgColor === col ? 'border-white scale-110' : 'border-transparent'
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

      {/* Main Text Fields */}
      <div className="space-y-3">
        {/* Headline */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-300">
            Tiêu đề chính (Thương hiệu / Tên xe):
          </label>
          <input
            type="text"
            value={banner.headline.text}
            onChange={(e) =>
              onUpdateBanner({
                headline: { ...banner.headline, text: e.target.value },
              })
            }
            placeholder="VD: 37CAR · MUA BÁN & KÝ GỬI Ô TÔ"
            className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Subheadline */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-300">
            Điểm nhấn / Khẩu hiệu ưu đãi:
          </label>
          <input
            type="text"
            value={banner.subheadline.text}
            onChange={(e) =>
              onUpdateBanner({
                subheadline: { ...banner.subheadline, text: e.target.value },
              })
            }
            placeholder="VD: DUYỆT HỒ SƠ NHANH · LÃI SUẤT THẤP"
            className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Details / Specs */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-300">
            Nội dung chi tiết / Cam kết (Mỗi dòng 1 ý):
          </label>
          <textarea
            rows={3}
            value={banner.details.text}
            onChange={(e) =>
              onUpdateBanner({
                details: { ...banner.details, text: e.target.value },
              })
            }
            placeholder="• Xe tuyển chọn bao test hãng toàn quốc&#10;• Cam kết không đâm đụng, không ngập nước"
            className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white leading-relaxed focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Hotline */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-red-500" />
            <span>Số điện thoại / Hotline:</span>
          </label>
          <input
            type="text"
            value={banner.hotline.text}
            onChange={(e) =>
              onUpdateBanner({
                hotline: { ...banner.hotline, text: e.target.value },
              })
            }
            placeholder="Hotline / Zalo: 0987.361.234"
            className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white font-semibold focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Address */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Địa chỉ showroom / Cửa hàng:</span>
          </label>
          <input
            type="text"
            value={banner.address.text}
            onChange={(e) =>
              onUpdateBanner({
                address: { ...banner.address, text: e.target.value },
              })
            }
            placeholder="Địa chỉ: Số 82 - Đại Lộ Lê Nin, TP. Vinh"
            className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* Colors & Height customization */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
          Màu Sắc & Chiều Cao Banner:
        </label>

        <div className="grid grid-cols-3 gap-2">
          {bannerColors.map((c, i) => {
            const isSelected = banner.backgroundColor.toLowerCase() === c.color.toLowerCase();
            return (
              <button
                key={i}
                onClick={() =>
                  onUpdateBanner({
                    backgroundColor: c.color,
                    headline: { ...banner.headline, color: c.text },
                    details: { ...banner.details, color: c.text === '#ffffff' ? '#e5e7eb' : '#1f2937' },
                  })
                }
                className={`p-2 rounded-xl text-left border transition-all flex flex-col gap-1 ${
                  isSelected ? 'border-amber-400 ring-1 ring-amber-400 bg-neutral-800' : 'border-neutral-800 bg-neutral-900'
                }`}
              >
                <div
                  className="w-full h-5 rounded-md border border-black/20"
                  style={{ backgroundColor: c.color }}
                />
                <span className="text-[10px] font-medium text-neutral-300 truncate">
                  {c.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Height Slider */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Chiều cao banner phía dưới</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              {banner.heightPercent}%
            </span>
          </div>
          <input
            type="range"
            min={22}
            max={45}
            value={banner.heightPercent}
            onChange={(e) => onUpdateBanner({ heightPercent: Number(e.target.value) })}
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
