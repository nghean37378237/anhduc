import React from 'react';
import { BackgroundType, CanvasSettings, TextureType } from '../types';
import { COLOR_PALETTES, GRADIENT_PRESETS } from '../utils/constants';

interface BackgroundPanelProps {
  settings: CanvasSettings;
  onUpdateSettings: (updated: Partial<CanvasSettings>) => void;
  theme?: 'light' | 'dark';
}

export const BackgroundPanel: React.FC<BackgroundPanelProps> = ({
  settings,
  onUpdateSettings,
  theme = 'light',
}) => {
  const isLight = theme === 'light';

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
    <div className={`p-4 space-y-6 ${isLight ? 'text-slate-800' : 'text-neutral-100'}`}>
      {/* Header */}
      <div>
        <h3 className={`text-sm font-bold tracking-wide ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Khung Nền & Họa Tiết
        </h3>
        <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
          Tùy chỉnh tông màu nền và chất liệu bề mặt cho bức ảnh ghép
        </p>
      </div>

      {/* Background Type Segmented Tabs */}
      <div
        className={`flex items-center gap-1 p-1 rounded-lg border ${
          isLight ? 'bg-slate-100 border-slate-200' : 'bg-neutral-900 border-neutral-800'
        }`}
      >
        {bgTypeButtons.map((tab) => {
          const isActive = settings.backgroundType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onUpdateSettings({ backgroundType: tab.id })}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-amber-400 text-black font-bold shadow-2xs'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
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
            <label
              className={`text-xs font-bold uppercase tracking-wider block ${
                isLight ? 'text-slate-800' : 'text-neutral-300'
              }`}
            >
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
                        ? isLight
                          ? 'border-amber-500 ring-2 ring-amber-400 bg-amber-50 shadow-2xs'
                          : 'border-amber-400 ring-1 ring-amber-400 bg-neutral-800'
                        : isLight
                        ? 'border-slate-200 hover:border-slate-300 bg-white shadow-2xs'
                        : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900'
                    }`}
                  >
                    <div
                      className="w-full h-8 rounded-lg border border-black/15 shadow-inner"
                      style={{ backgroundColor: pal.color }}
                    />
                    <div
                      className={`text-[11px] font-semibold truncate ${
                        isLight ? 'text-slate-700' : 'text-neutral-200'
                      }`}
                    >
                      {pal.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Hex Color Picker */}
          <div className={`pt-2 border-t flex items-center justify-between ${isLight ? 'border-slate-200' : 'border-neutral-800'}`}>
            <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>Tự chọn mã màu (Hex):</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => onUpdateSettings({ backgroundColor: e.target.value })}
                className="w-7 h-7 rounded border border-slate-300 bg-transparent cursor-pointer"
              />
              <span className={`text-xs font-mono font-bold uppercase ${isLight ? 'text-slate-800' : 'text-neutral-300'}`}>
                {settings.backgroundColor}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Gradients */}
      {settings.backgroundType === 'gradient' && (
        <div className="space-y-4">
          <label
            className={`text-xs font-bold uppercase tracking-wider block ${
              isLight ? 'text-slate-800' : 'text-neutral-300'
            }`}
          >
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
                      ? isLight
                        ? 'border-amber-500 ring-2 ring-amber-400 bg-amber-50'
                        : 'border-amber-400 ring-1 ring-amber-400 bg-neutral-800'
                      : isLight
                      ? 'border-slate-200 hover:border-slate-300 bg-white'
                      : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900'
                  }`}
                >
                  <div
                    className="w-full h-12 rounded-lg shadow-inner"
                    style={{
                      backgroundImage: `linear-gradient(${grad.dir}, ${grad.from}, ${grad.to})`,
                    }}
                  />
                  <div
                    className={`text-xs font-bold truncate ${
                      isLight ? 'text-slate-800' : 'text-white'
                    }`}
                  >
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
          <label
            className={`text-xs font-bold uppercase tracking-wider block ${
              isLight ? 'text-slate-800' : 'text-neutral-300'
            }`}
          >
            Chất Liệu Bề Mặt (Surface Texture)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {textureOptions.map((tex) => {
              const isSelected = settings.backgroundTexture === tex.id;
              return (
                <button
                  key={tex.id}
                  onClick={() => onUpdateSettings({ backgroundTexture: tex.id })}
                  className={`px-3 py-2 text-xs rounded-xl border transition-all text-left font-semibold ${
                    isSelected
                      ? 'bg-amber-400 text-black font-bold border-amber-400 shadow-2xs'
                      : isLight
                      ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
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
