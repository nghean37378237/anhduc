import React, { useState } from 'react';
import { STICKER_LIBRARY } from '../utils/constants';
import { Plus } from 'lucide-react';

interface StickerPanelProps {
  onAddSticker: (sticker: {
    stickerId: string;
    title: string;
    category: string;
    svgContent: string;
  }) => void;
  theme?: 'light' | 'dark';
}

export const StickerPanel: React.FC<StickerPanelProps> = ({ onAddSticker, theme = 'light' }) => {
  const isLight = theme === 'light';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Phim 35mm', 'Thời Gian', 'Tạp Chí', 'Băng Dính Washi', 'Tem Bưu Chính', 'Họa Tiết'];

  const filteredStickers = STICKER_LIBRARY.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  return (
    <div className={`p-4 space-y-6 ${isLight ? 'text-slate-800' : 'text-neutral-100'}`}>
      {/* Header */}
      <div>
        <h3 className={`text-sm font-bold tracking-wide ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Tem, Nhãn Dán & Washi Tape
        </h3>
        <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
          Trang trí ảnh ghép với phong cách scrapbook, sổ tay và cuộn phim vintage
        </p>
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                isActive
                  ? isLight
                    ? 'bg-amber-400 text-black shadow-2xs font-bold'
                    : 'bg-neutral-800 text-amber-400 border border-neutral-700'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat === 'all' ? 'Tất cả' : cat}
            </button>
          );
        })}
      </div>

      {/* Stickers Grid */}
      <div className="grid grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
        {filteredStickers.map((item) => (
          <button
            key={item.id}
            onClick={() =>
              onAddSticker({
                stickerId: item.id,
                title: item.title,
                category: item.category,
                svgContent: item.svg,
              })
            }
            className={`group p-3 rounded-xl border text-left transition-all flex flex-col items-center justify-between gap-3 ${
              isLight
                ? 'bg-white border-slate-200 hover:border-amber-500 hover:shadow-md'
                : 'bg-neutral-900 border-neutral-800 hover:border-amber-400/80 hover:bg-neutral-800/80 text-amber-400'
            }`}
          >
            <div
              className="w-full h-16 flex items-center justify-center transition-transform group-hover:scale-105"
              dangerouslySetInnerHTML={{ __html: item.svg }}
            />
            <div
              className={`w-full flex items-center justify-between pt-2 border-t ${
                isLight
                  ? 'border-slate-100 text-slate-700 group-hover:text-amber-600'
                  : 'border-neutral-800/60 text-neutral-400 group-hover:text-white'
              }`}
            >
              <span className="text-[11px] font-semibold truncate">{item.title}</span>
              <Plus className="w-3.5 h-3.5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
