import React from 'react';
import { ASPECT_RATIOS } from '../utils/constants';
import { AspectRatioId } from '../types';

interface AspectRatioBarProps {
  currentRatio: AspectRatioId;
  onChangeRatio: (ratio: AspectRatioId) => void;
  currentPhotoCount: number;
  onSwitchPhotoCount: (count: 1 | 2 | 3) => void;
}

export const AspectRatioBar: React.FC<AspectRatioBarProps> = ({
  currentRatio,
  onChangeRatio,
  currentPhotoCount,
  onSwitchPhotoCount,
}) => {
  return (
    <div className="flex items-center justify-between px-3 md:px-6 py-2 bg-neutral-900/90 border-b border-neutral-800/80 overflow-x-auto no-scrollbar gap-3 select-none">
      {/* Aspect Ratio Switcher with Priority Highlighting */}
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
                  ? 'bg-amber-400 text-black font-bold shadow-sm'
                  : r.isPriority
                  ? 'text-amber-300/90 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <span>{r.label}</span>
              {r.isPriority && (
                <span
                  className={`text-[9px] uppercase font-mono px-1 rounded-xs ${
                    isActive ? 'bg-black text-amber-400 font-bold' : 'text-amber-400 font-semibold'
                  }`}
                >
                  Ưu tiên
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Switcher for 1, 2, or 3 Photos on top */}
      <div className="flex items-center gap-1 shrink-0 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
        <span className="text-[10px] text-neutral-500 font-mono px-1.5 uppercase hidden sm:inline">
          Phần trên:
        </span>
        <button
          onClick={() => onSwitchPhotoCount(1)}
          className={`px-2.5 py-0.5 text-xs font-semibold rounded-md transition-colors ${
            currentPhotoCount === 1
              ? 'bg-amber-400 text-black shadow-xs'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          1 Ảnh
        </button>
        <button
          onClick={() => onSwitchPhotoCount(2)}
          className={`px-2.5 py-0.5 text-xs font-semibold rounded-md transition-colors ${
            currentPhotoCount === 2
              ? 'bg-amber-400 text-black shadow-xs'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          2 Ảnh
        </button>
        <button
          onClick={() => onSwitchPhotoCount(3)}
          className={`px-2.5 py-0.5 text-xs font-semibold rounded-md transition-colors ${
            currentPhotoCount === 3
              ? 'bg-amber-400 text-black shadow-xs'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          3 Ảnh
        </button>
      </div>
    </div>
  );
};
