import React, { useState } from 'react';
import { GRID_TEMPLATES } from '../utils/constants';
import { CanvasSettings, FrameStyle, GridTemplate } from '../types';

interface LayoutPickerProps {
  currentTemplate: GridTemplate;
  onSelectTemplate: (template: GridTemplate) => void;
  settings: CanvasSettings;
  onUpdateSettings: (updated: Partial<CanvasSettings>) => void;
}

export const LayoutPicker: React.FC<LayoutPickerProps> = ({
  currentTemplate,
  onSelectTemplate,
  settings,
  onUpdateSettings,
}) => {
  const [photoCountFilter, setPhotoCountFilter] = useState<number | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', 'Banner Bán Hàng', 'Cơ Bản', 'Tạp Chí', 'Phim Ảnh', 'Bento'];

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
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-sm font-semibold text-white tracking-wide">
          Mẫu Bố Cục Ghép Ảnh
        </h3>
        <p className="text-xs text-neutral-400 mt-0.5">
          Mẫu có banner viết chữ phía dưới (1-3 ảnh) và các dạng lưới đa năng
        </p>
      </div>

      {/* Category Pills */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-neutral-400">Thể loại:</label>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = categoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400 text-black font-semibold'
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
        <label className="text-xs font-medium text-neutral-400">Số lượng ảnh:</label>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar p-1 bg-neutral-900 rounded-lg border border-neutral-800">
          {photoCountButtons.map((count) => {
            const isActive = photoCountFilter === count;
            return (
              <button
                key={String(count)}
                onClick={() => setPhotoCountFilter(count)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400 text-black font-semibold shadow-xs'
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
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>Danh sách mẫu ({filteredTemplates.length}):</span>
          <span className="font-mono text-[11px] text-amber-400 truncate max-w-[150px]">
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
                    ? 'bg-neutral-800 border-amber-400 ring-1 ring-amber-400'
                    : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/60'
                }`}
              >
                {/* Visual miniature wireframe representation */}
                <div className="w-full aspect-4/3 bg-neutral-950 rounded-lg p-1 relative overflow-hidden border border-neutral-800 flex flex-col">
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
                  <div className="text-xs font-semibold text-white truncate">
                    {tmpl.name}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-0.5 flex items-center gap-1">
                    <span>{tmpl.photoCount} ảnh</span>
                    {isBannerType && (
                      <span className="text-amber-400 font-bold">· Có banner</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* Geometry Sliders: Spacing, Radius, Padding */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
          Khoảng Cách & Bo Góc Ô Ảnh
        </h4>

        {/* Inner Gap */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Khoảng cách giữa các ô</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              {settings.innerGap}px
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={36}
            value={settings.innerGap}
            onChange={(e) => onUpdateSettings({ innerGap: Number(e.target.value) })}
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Corner Radius */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Bo góc ảnh</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              {settings.cellRadius}px
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={48}
            value={settings.cellRadius}
            onChange={(e) => onUpdateSettings({ cellRadius: Number(e.target.value) })}
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* Frame Style Special Effects */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
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
                    ? 'bg-amber-400 text-black font-semibold border-amber-400'
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
