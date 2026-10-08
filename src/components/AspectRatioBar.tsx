import React from 'react';
import { ASPECT_RATIOS } from '../utils/constants';
import { AspectRatioId } from '../types';

interface AspectRatioBarProps {
  currentRatio: AspectRatioId;
  onChangeRatio: (ratio: AspectRatioId) => void;
}

export const AspectRatioBar: React.FC<AspectRatioBarProps> = ({
  currentRatio,
  onChangeRatio,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/90 border-b border-neutral-800/80 overflow-x-auto no-scrollbar gap-2">
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider mr-1">
          Tỷ Lệ:
        </span>
        {ASPECT_RATIOS.map((r) => {
          const isActive = currentRatio === r.id;
          return (
            <button
              key={r.id}
              onClick={() => onChangeRatio(r.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-amber-400 text-black font-semibold shadow-sm'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <span>{r.label}</span>
              <span
                className={`text-[10px] hidden sm:inline ${
                  isActive ? 'text-black/70' : 'text-neutral-500'
                }`}
              >
                · {r.sublabel.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="hidden md:flex items-center gap-2 text-xs text-neutral-500 shrink-0 font-mono">
        <span>Kéo & zoom ảnh trong ô</span>
        <span aria-hidden="true">·</span>
        <span>Click ô để chỉnh chi tiết</span>
      </div>
    </div>
  );
};
