import React, { useState } from 'react';
import { GRID_TEMPLATES } from '../utils/constants';
import { CanvasSettings, FrameStyle, GridTemplate } from '../types';

interface LayoutPickerProps {
  currentTemplate: GridTemplate;
  onSelectTemplate: (template: GridTemplate) => void;
  settings: CanvasSettings;
  onUpdateSettings: (updated: Partial<CanvasSettings>) => void;
  theme?: 'light' | 'dark';
}

export const LayoutPicker: React.FC<LayoutPickerProps> = ({
  currentTemplate,
  onSelectTemplate,
  settings,
  onUpdateSettings,
  theme = 'light',
}) => {
  const isLight = theme === 'light';
  const [photoCountFilter, setPhotoCountFilter] = useState<number | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', 'Tin Tức Báo Chí', 'Banner Bán Hàng', 'Cơ Bản', 'Tạp Chí', 'Phim Ảnh', 'Bento'];

  const filteredTemplates = GRID_TEMPLATES.filter((t) => {
    if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
    if (photoCountFilter !== 'all' && t.photoCount !== photoCountFilter) return false;
    return true;
  });

  const photoCountButtons: (number | 'all')[] = ['all', 1, 2, 3, 4, 5, 6];

  const frameOptions: { id: FrameStyle; label: string }[] = [
    { id: 'none', label: 'Không Khung' },
    { id: 'film35mm', label: 'Cuộn Phim 35mm' },
    { id: 'minimal-hairline', label: 'Viền Mảnh Studio' },
  ];

  return (
    <div className={`p-4 space-y-6 ${isLight ? 'text-slate-800' : 'text-neutral-100'}`}>
      {/* Header */}
      <div>
        <h3 className={`text-sm font-bold tracking-wide ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Mẫu Bố Cục Ghép Ảnh
        </h3>
        <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
          Mẫu có banner viết chữ phía dưới (1-3 ảnh) và các dạng lưới đa năng
        </p>
      </div>

      {/* Category Pills */}
      <div className="space-y-1.5">
        <label className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
          Thể loại:
        </label>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = categoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400 text-black font-bold shadow-xs'
                    : isLight
                    ? 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat === 'all' ? 'Tất cả' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter by Photo Count */}
      <div className="space-y-1.5">
        <label className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
          Số lượng ảnh:
        </label>
        <div
          className={`flex items-center gap-1 overflow-x-auto no-scrollbar p-1 rounded-lg border ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-neutral-900 border-neutral-800'
          }`}
        >
          {photoCountButtons.map((count) => {
            const isActive = photoCountFilter === count;
            return (
              <button
                key={String(count)}
                onClick={() => setPhotoCountFilter(count)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400 text-black font-bold shadow-xs'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {count === 'all' ? 'Tất cả' : `${count} ảnh`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Templates Grid with Visual Wireframe Previews */}
      <div className="space-y-2">
        <div
          className={`flex items-center justify-between text-xs ${
            isLight ? 'text-slate-600' : 'text-neutral-400'
          }`}
        >
          <span>Danh sách mẫu ({filteredTemplates.length}):</span>
          <span
            className={`font-mono text-[11px] truncate max-w-[150px] font-bold ${
              isLight ? 'text-amber-800' : 'text-amber-400'
            }`}
          >
            {currentTemplate.name}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
          {filteredTemplates.map((tmpl) => {
            const isSelected = currentTemplate.id === tmpl.id;
            const isBannerType = tmpl.hasFooterBanner;

            return (
              <button
                key={tmpl.id}
                onClick={() => onSelectTemplate(tmpl)}
                className={`relative p-2 rounded-xl text-left border transition-all flex flex-col gap-2 ${
                  isSelected
                    ? isLight
                      ? 'bg-amber-50/80 border-amber-400 ring-1 ring-amber-400 shadow-2xs'
                      : 'bg-neutral-800 border-amber-400 ring-1 ring-amber-400'
                    : isLight
                    ? 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/60'
                }`}
              >
                {/* Visual miniature wireframe representation */}
                <div
                  className={`w-full aspect-4/3 rounded-lg p-1 relative overflow-hidden border flex flex-col ${
                    isLight ? 'bg-slate-100 border-slate-200' : 'bg-neutral-950 border-neutral-800'
                  }`}
                >
                  {/* Photo area */}
                  <div
                    className="relative w-full"
                    style={{ height: isBannerType ? '68%' : '100%' }}
                  >
                    {tmpl.slots.map((s) => (
                      <div
                        key={s.id}
                        style={{
                          position: 'absolute',
                          left: `${s.x}%`,
                          top: `${isBannerType ? (s.y / 68) * 100 : s.y}%`,
                          width: `calc(${s.width}% - 1px)`,
                          height: `calc(${isBannerType ? (s.height / 68) * 100 : s.height}% - 1px)`,
                        }}
                        className={`rounded-xs transition-colors ${
                          isSelected
                            ? 'bg-amber-400/40 border border-amber-400/80'
                            : isLight
                            ? 'bg-slate-200 border border-slate-300'
                            : 'bg-neutral-800 border border-neutral-700/60'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Banner wireframe bottom */}
                  {isBannerType && (
                    <div className="w-full h-[32%] bg-amber-400/90 flex flex-col justify-center px-1 border-t border-black/20">
                      <div className="w-3/4 h-1.5 bg-black/80 rounded-xs mb-0.5" />
                      <div className="w-1/2 h-1 bg-black/40 rounded-xs" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div
                    className={`text-xs font-bold truncate ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {tmpl.name}
                  </div>
                  <div
                    className={`text-[10px] font-mono mt-0.5 flex items-center gap-1 ${
                      isLight ? 'text-slate-500' : 'text-neutral-400'
                    }`}
                  >
                    <span>{tmpl.photoCount} ảnh</span>
                    {isBannerType && (
                      <span className="text-amber-700 font-bold">· Có banner</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className={`h-px ${isLight ? 'bg-slate-200' : 'bg-neutral-800'}`} />

      {/* Geometry Sliders: Spacing, Radius, Padding */}
      <div className="space-y-4">
        <h4
          className={`text-xs font-bold uppercase tracking-wider ${
            isLight ? 'text-slate-800' : 'text-neutral-300'
          }`}
        >
          Khoảng Cách & Bo Góc Ô Ảnh
        </h4>

        {/* Inner Gap - Viền giữa các ảnh to nhỏ */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className={isLight ? 'text-slate-600 font-medium' : 'text-neutral-400'}>
              Độ dày viền giữa các ảnh (To / Nhỏ):
            </span>
            <span
              className={`font-mono tabular-nums font-bold text-xs px-2 py-0.5 rounded ${
                isLight ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-neutral-800 text-amber-300'
              }`}
            >
              {settings.innerGap}px
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={36}
            value={settings.innerGap}
            onChange={(e) => onUpdateSettings({ innerGap: Number(e.target.value) })}
            className={`w-full accent-amber-500 h-1.5 rounded-lg appearance-none cursor-pointer ${
              isLight ? 'bg-slate-200' : 'bg-neutral-800'
            }`}
          />
          <div className="flex items-center gap-1.5 pt-0.5 overflow-x-auto no-scrollbar">
            <span className={`text-[10px] font-mono shrink-0 ${isLight ? 'text-slate-500' : 'text-neutral-500'}`}>
              Nhanh:
            </span>
            {[
              { label: '0px (Không viền)', val: 0 },
              { label: '4px (Mảnh)', val: 4 },
              { label: '8px (Mặc định)', val: 8 },
              { label: '14px (Dày)', val: 14 },
              { label: '20px (To)', val: 20 },
              { label: '28px (Rất to)', val: 28 },
            ].map((b) => (
              <button
                key={b.val}
                type="button"
                onClick={() => onUpdateSettings({ innerGap: b.val })}
                className={`px-2 py-0.5 text-[11px] rounded-md font-bold whitespace-nowrap border transition-all ${
                  settings.innerGap === b.val
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

        {/* Corner Radius */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className={isLight ? 'text-slate-600' : 'text-neutral-400'}>Bo góc ảnh</span>
            <span
              className={`font-mono tabular-nums font-bold ${
                isLight ? 'text-slate-800' : 'text-neutral-300'
              }`}
            >
              {settings.cellRadius}px
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={48}
            value={settings.cellRadius}
            onChange={(e) => onUpdateSettings({ cellRadius: Number(e.target.value) })}
            className={`w-full accent-amber-500 h-1.5 rounded-lg appearance-none cursor-pointer ${
              isLight ? 'bg-slate-200' : 'bg-neutral-800'
            }`}
          />
        </div>

        {/* Border Color */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className={isLight ? 'text-slate-600 font-medium' : 'text-neutral-400'}>
              Màu sắc viền giữa các ảnh (Mặc định màu trắng):
            </span>
            <span className="font-mono text-[10px] font-bold text-amber-600">
              {settings.borderColor || '#ffffff'}
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
              { name: 'Xanh Dương', color: '#0284c7' },
            ].map((bc) => {
              const isSelected = (settings.borderColor || '#ffffff').toLowerCase() === bc.color.toLowerCase();
              return (
                <button
                  key={bc.color}
                  type="button"
                  onClick={() => onUpdateSettings({ borderColor: bc.color, backgroundColor: bc.color })}
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 text-amber-950 ring-1 ring-amber-400 shadow-2xs font-bold'
                      : isLight
                      ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: bc.color }}
                  />
                  <span>{bc.name}</span>
                </button>
              );
            })}

            <div className="flex items-center gap-1 pl-1">
              <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>Tùy ý:</span>
              <input
                type="color"
                value={settings.borderColor || '#ffffff'}
                onChange={(e) => onUpdateSettings({ borderColor: e.target.value, backgroundColor: e.target.value })}
                className="w-6 h-6 rounded border border-slate-300 bg-transparent cursor-pointer"
                title="Chọn màu viền bất kỳ"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`h-px ${isLight ? 'bg-slate-200' : 'bg-neutral-800'}`} />

      {/* Frame Style Special Effects */}
      <div className="space-y-2">
        <label
          className={`text-xs font-bold uppercase tracking-wider block ${
            isLight ? 'text-slate-800' : 'text-neutral-300'
          }`}
        >
          Phong Cách Khung Ảnh
        </label>
        <div className="grid grid-cols-3 gap-2">
          {frameOptions.map((opt) => {
            const isSelected = settings.frameStyle === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onUpdateSettings({ frameStyle: opt.id })}
                className={`px-3 py-2 text-xs rounded-lg text-center border transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-black font-bold border-amber-400 shadow-2xs'
                    : isLight
                    ? 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
