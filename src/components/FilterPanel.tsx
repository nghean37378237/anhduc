import React, { useState } from 'react';
import { FILTER_PRESETS } from '../utils/constants';
import { CanvasSettings, FilterPresetId, LightLeakType, PhotoSlot } from '../types';
import { Sparkles, Check } from 'lucide-react';

interface FilterPanelProps {
  selectedSlot: PhotoSlot | null;
  onApplyFilterToSlot: (slotId: string, filterId: FilterPresetId) => void;
  onApplyFilterToAll: (filterId: FilterPresetId) => void;
  settings: CanvasSettings;
  onUpdateSettings: (updated: Partial<CanvasSettings>) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedSlot,
  onApplyFilterToSlot,
  onApplyFilterToAll,
  settings,
  onUpdateSettings,
}) => {
  const [filterTarget, setFilterTarget] = useState<'selected' | 'all'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Cổ Điển', 'Điện Ảnh', 'Tươi Sáng', 'Nghệ Thuật'];

  const filteredPresets = FILTER_PRESETS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const currentActiveFilter = selectedSlot ? selectedSlot.filterId : settings.globalFilter;

  const handleSelectFilter = (filterId: FilterPresetId) => {
    if (filterTarget === 'selected' && selectedSlot) {
      onApplyFilterToSlot(selectedSlot.id, filterId);
    } else {
      onApplyFilterToAll(filterId);
      onUpdateSettings({ globalFilter: filterId });
    }
  };

  const lightLeakOptions: { id: LightLeakType; label: string }[] = [
    { id: 'none', label: 'Tắt' },
    { id: 'golden', label: 'Vạt Nắng Vàng' },
    { id: 'rainbow', label: 'Cầu Vồng Lăng Kính' },
    { id: 'cyan', label: 'Bình Minh Xanh' },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-sm font-semibold text-white tracking-wide">
          Bộ Lọc & Hiệu Ứng Sáng Tạo
        </h3>
        <p className="text-xs text-neutral-400 mt-0.5">
          Tông màu film analog kinh điển và hiệu ứng quang sai điện ảnh
        </p>
      </div>

      {/* Target scope toggle: To Selected Photo vs All Photos */}
      <div className="p-1 bg-neutral-900 rounded-lg border border-neutral-800 flex items-center gap-1">
        <button
          onClick={() => setFilterTarget('all')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
            filterTarget === 'all'
              ? 'bg-amber-400 text-black font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Áp dụng tất cả ảnh
        </button>
        <button
          onClick={() => setFilterTarget('selected')}
          disabled={!selectedSlot}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
            filterTarget === 'selected'
              ? 'bg-amber-400 text-black font-semibold'
              : 'text-neutral-400 hover:text-white disabled:opacity-40 disabled:hover:text-neutral-400'
          }`}
        >
          Chỉ ảnh đang chọn {selectedSlot ? '' : '(Chưa chọn ô)'}
        </button>
      </div>

      {/* Categories Segmented Bar */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-neutral-800 text-amber-400 border border-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat === 'all' ? 'Tất cả' : cat}
            </button>
          );
        })}
      </div>

      {/* Preset Swatches Grid */}
      <div className="grid grid-cols-2 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
        {filteredPresets.map((preset) => {
          const isSelected = currentActiveFilter === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => handleSelectFilter(preset.id)}
              className={`group relative p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-neutral-800 border-amber-400 ring-1 ring-amber-400'
                  : 'bg-neutral-900/90 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/60'
              }`}
            >
              {/* Preview simulation box */}
              <div
                className="w-full h-16 rounded-lg mb-2 relative overflow-hidden bg-neutral-950 flex items-center justify-center border border-neutral-800"
                style={{
                  filter: preset.cssFilter !== 'none' ? preset.cssFilter : 'none',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/60 via-stone-700/50 to-orange-500/40" />
                <span className="relative z-10 text-[10px] font-mono text-white/90 uppercase tracking-widest px-2 py-0.5 bg-black/40 rounded-xs">
                  {preset.name.split(' ')[0]}
                </span>

                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-400 text-black flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </div>

              <div>
                <div className="text-xs font-semibold text-white leading-tight">
                  {preset.name}
                </div>
                <div className="text-[10px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                  {preset.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="h-px bg-neutral-800" />

      {/* Creative Special FX: Light Leaks, Film Grain, Vignette */}
      <div className="space-y-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Hiệu Ứng Ánh Sáng & Film FX</span>
        </div>

        {/* Light Leaks */}
        <div className="space-y-2">
          <label className="text-xs text-neutral-400">Vệt sáng rò rỉ (Light Leaks):</label>
          <div className="grid grid-cols-2 gap-1.5">
            {lightLeakOptions.map((opt) => {
              const isActive = settings.lightLeak === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onUpdateSettings({ lightLeak: opt.id })}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-colors text-left ${
                    isActive
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

        {/* Global Film Grain */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Độ hạt phim 35mm (Film Grain)</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              {settings.globalGrain}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={60}
            value={settings.globalGrain}
            onChange={(e) => onUpdateSettings({ globalGrain: Number(e.target.value) })}
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Global Vignette */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Tối 4 góc (Vignette)</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              {settings.globalVignette}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={60}
            value={settings.globalVignette}
            onChange={(e) => onUpdateSettings({ globalVignette: Number(e.target.value) })}
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
