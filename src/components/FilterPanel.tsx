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
  theme?: 'light' | 'dark';
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedSlot,
  onApplyFilterToSlot,
  onApplyFilterToAll,
  settings,
  onUpdateSettings,
  theme = 'light',
}) => {
  const isLight = theme === 'light';
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
    <div className={`p-4 space-y-6 ${isLight ? 'text-slate-800' : 'text-neutral-100'}`}>
      {/* Header */}
      <div>
        <h3 className={`text-sm font-bold tracking-wide ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Bộ Lọc & Hiệu Ứng Sáng Tạo
        </h3>
        <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
          Tông màu film analog kinh điển và hiệu ứng quang sai điện ảnh
        </p>
      </div>

      {/* Target scope toggle */}
      <div
        className={`p-1 rounded-lg border flex items-center gap-1 ${
          isLight ? 'bg-slate-100 border-slate-200' : 'bg-neutral-900 border-neutral-800'
        }`}
      >
        <button
          onClick={() => setFilterTarget('all')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${
            filterTarget === 'all'
              ? 'bg-amber-400 text-black shadow-xs'
              : isLight
              ? 'text-slate-600 hover:text-slate-900'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Áp dụng tất cả ảnh
        </button>
        <button
          onClick={() => setFilterTarget('selected')}
          disabled={!selectedSlot}
          className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${
            filterTarget === 'selected'
              ? 'bg-amber-400 text-black shadow-xs'
              : isLight
              ? 'text-slate-600 hover:text-slate-900 disabled:opacity-40'
              : 'text-neutral-400 hover:text-white disabled:opacity-40'
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
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                isActive
                  ? isLight
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-neutral-800 text-amber-400 border border-neutral-700'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
                  ? isLight
                    ? 'bg-amber-50/80 border-amber-400 ring-1 ring-amber-400 shadow-2xs'
                    : 'bg-neutral-800 border-amber-400 ring-1 ring-amber-400'
                  : isLight
                  ? 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  : 'bg-neutral-900/90 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/60'
              }`}
            >
              {/* Preview simulation box */}
              <div
                className={`w-full h-16 rounded-lg mb-2 relative overflow-hidden flex items-center justify-center border ${
                  isLight ? 'bg-slate-100 border-slate-200' : 'bg-neutral-950 border-neutral-800'
                }`}
                style={{
                  filter: preset.cssFilter !== 'none' ? preset.cssFilter : 'none',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/60 via-stone-700/50 to-orange-500/40" />
                <span className="relative z-10 text-[10px] font-mono text-white uppercase tracking-widest px-2 py-0.5 bg-black/50 rounded-xs font-bold">
                  {preset.name.split(' ')[0]}
                </span>

                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </div>

              <div>
                <div
                  className={`text-xs font-bold leading-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {preset.name}
                </div>
                <div
                  className={`text-[10px] mt-1 line-clamp-2 leading-relaxed ${
                    isLight ? 'text-slate-500' : 'text-neutral-400'
                  }`}
                >
                  {preset.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className={`h-px ${isLight ? 'bg-slate-200' : 'bg-neutral-800'}`} />

      {/* Creative Special FX: Light Leaks, Film Grain, Vignette */}
      <div className="space-y-4">
        <div
          className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${
            isLight ? 'text-slate-800' : 'text-neutral-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Hiệu Ứng Ánh Sáng & Film FX</span>
        </div>

        {/* Light Leaks */}
        <div className="space-y-2">
          <label className={`text-xs ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
            Vệt sáng rò rỉ (Light Leaks):
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {lightLeakOptions.map((opt) => {
              const isActive = settings.lightLeak === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onUpdateSettings({ lightLeak: opt.id })}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-colors text-left ${
                    isActive
                      ? 'bg-amber-400 text-black font-bold border-amber-400 shadow-2xs'
                      : isLight
                      ? 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
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
            <span className={isLight ? 'text-slate-600' : 'text-neutral-400'}>
              Độ hạt phim 35mm (Film Grain)
            </span>
            <span
              className={`font-mono tabular-nums font-bold ${
                isLight ? 'text-slate-800' : 'text-neutral-300'
              }`}
            >
              {settings.globalGrain}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={60}
            value={settings.globalGrain}
            onChange={(e) => onUpdateSettings({ globalGrain: Number(e.target.value) })}
            className={`w-full accent-amber-500 h-1.5 rounded-lg appearance-none cursor-pointer ${
              isLight ? 'bg-slate-200' : 'bg-neutral-800'
            }`}
          />
        </div>

        {/* Global Vignette */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className={isLight ? 'text-slate-600' : 'text-neutral-400'}>
              Tối 4 góc (Vignette)
            </span>
            <span
              className={`font-mono tabular-nums font-bold ${
                isLight ? 'text-slate-800' : 'text-neutral-300'
              }`}
            >
              {settings.globalVignette}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={60}
            value={settings.globalVignette}
            onChange={(e) => onUpdateSettings({ globalVignette: Number(e.target.value) })}
            className={`w-full accent-amber-500 h-1.5 rounded-lg appearance-none cursor-pointer ${
              isLight ? 'bg-slate-200' : 'bg-neutral-800'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
