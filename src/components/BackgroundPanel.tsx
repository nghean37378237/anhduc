import React from 'react';
import { BackgroundType, CanvasSettings, TextureType } from '../types';
import { COLOR_PALETTES, GRADIENT_PRESETS } from '../utils/constants';

interface BackgroundPanelProps {
  settings: CanvasSettings;
  onUpdateSettings: (updated: Partial<CanvasSettings>) => void;
}

export const BackgroundPanel: React.FC<BackgroundPanelProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const bgTypeButtons: { id: BackgroundType; label: string }[] = [
    { id: 'solid', label: 'Màu Đơn Sắc' },
    { id: 'gradient', label: 'Chuyển Sắc (Gradient)' },
    { id: 'texture', label: 'Họa Tiết & Giấy' },
  ];

  const textureOptions: { id: TextureType; label: string }[] = [
    { id: 'none', label: 'Trơn Mịn' },
    { id: 'grid', label: 'Lưới Kẻ Notebook' },
    { id: 'paper', label: 'Giấy Mỹ Thuật Sần' },
    { id: 'grain', label: 'Hạt Nhiễu Studio' },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-sm font-semibold text-white tracking-wide">
          Khung Nền & Họa Tiết
        </h3>
        <p className="text-xs text-neutral-400 mt-0.5">
          Tùy chỉnh tông màu nền và chất liệu bề mặt cho bức ảnh ghép
        </p>
      </div>

      {/* Background Type Segmented Tabs */}
      <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800">
        {bgTypeButtons.map((tab) => {
          const isActive = settings.backgroundType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onUpdateSettings({ backgroundType: tab.id })}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Solid Colors */}
      {settings.backgroundType === 'solid' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
              Bảng Màu Tuyển Chọn
            </label>
            <div className="grid grid-cols-3 gap-2">
              {COLOR_PALETTES.map((pal) => {
                const isSelected = settings.backgroundColor.toLowerCase() === pal.color.toLowerCase();
                return (
                  <button
                    key={pal.id}
                    onClick={() => onUpdateSettings({ backgroundColor: pal.color })}
                    className={`p-2 rounded-xl text-left border transition-all flex flex-col gap-1.5 ${
                      isSelected
                        ? 'border-amber-400 ring-1 ring-amber-400 bg-neutral-800'
                        : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900'
                    }`}
                  >
                    <div
                      className="w-full h-8 rounded-lg border border-black/20 shadow-inner"
                      style={{ backgroundColor: pal.color }}
                    />
                    <div className="text-[11px] font-medium text-neutral-200 truncate">
                      {pal.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Hex Color Picker */}
          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
            <span className="text-xs text-neutral-400">Tự chọn mã màu (Hex):</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => onUpdateSettings({ backgroundColor: e.target.value })}
                className="w-7 h-7 rounded border border-neutral-700 bg-transparent cursor-pointer"
              />
              <span className="text-xs font-mono text-neutral-300 uppercase">
                {settings.backgroundColor}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Gradients */}
      {settings.backgroundType === 'gradient' && (
        <div className="space-y-4">
          <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
            Dải Gradient Nghệ Thuật
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {GRADIENT_PRESETS.map((grad) => {
              const isSelected =
                settings.backgroundGradient.from === grad.from &&
                settings.backgroundGradient.to === grad.to;
              return (
                <button
                  key={grad.id}
                  onClick={() =>
                    onUpdateSettings({
                      backgroundGradient: { from: grad.from, to: grad.to, direction: grad.dir },
                    })
                  }
                  className={`p-2 rounded-xl text-left border transition-all flex flex-col gap-2 ${
                    isSelected
                      ? 'border-amber-400 ring-1 ring-amber-400 bg-neutral-800'
                      : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900'
                  }`}
                >
                  <div
                    className="w-full h-12 rounded-lg shadow-inner"
                    style={{
                      backgroundImage: `linear-gradient(${grad.dir}, ${grad.from}, ${grad.to})`,
                    }}
                  />
                  <div className="text-xs font-medium text-white truncate">
                    {grad.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Textures */}
      {settings.backgroundType === 'texture' && (
        <div className="space-y-4">
          <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
            Chất Liệu Bề Mặt (Surface Texture)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {textureOptions.map((tex) => {
              const isSelected = settings.backgroundTexture === tex.id;
              return (
                <button
                  key={tex.id}
                  onClick={() => onUpdateSettings({ backgroundTexture: tex.id })}
                  className={`px-3 py-2 text-xs rounded-xl border transition-all text-left ${
                    isSelected
                      ? 'bg-amber-400 text-black font-semibold border-amber-400'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {tex.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
