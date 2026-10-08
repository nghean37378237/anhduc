import React from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Upload,
  X,
  Palette,
  RotateCcw,
} from 'lucide-react';
import { PhotoSlot, FilterPresetId } from '../types';
import { FILTER_PRESETS } from '../utils/constants';

interface CellQuickEditProps {
  slot: PhotoSlot;
  onUpdateSlot: (updated: Partial<PhotoSlot>) => void;
  onReplaceImage: () => void;
  onClose: () => void;
  onOpenDetailedAdjust: () => void;
  theme?: 'light' | 'dark';
}

export const CellQuickEdit: React.FC<CellQuickEditProps> = ({
  slot,
  onUpdateSlot,
  onReplaceImage,
  onClose,
  onOpenDetailedAdjust,
  theme = 'light',
}) => {
  const isLight = theme === 'light';
  const currentZoom = slot.zoom || 1;

  const handleZoom = (delta: number) => {
    const nextZoom = Math.min(3, Math.max(1, +(currentZoom + delta).toFixed(2)));
    onUpdateSlot({ zoom: nextZoom });
  };

  const handleRotate = () => {
    const nextRot = ((slot.rotation || 0) + 90) % 360;
    onUpdateSlot({ rotation: nextRot });
  };

  const handleFlipH = () => {
    onUpdateSlot({ flipH: !slot.flipH });
  };

  const handleFlipV = () => {
    onUpdateSlot({ flipV: !slot.flipV });
  };

  const handleReset = () => {
    onUpdateSlot({
      zoom: 1,
      panX: 0,
      panY: 0,
      rotation: 0,
      flipH: false,
      flipV: false,
    });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-40 backdrop-blur-md shadow-2xl rounded-xl p-2.5 flex items-center gap-2 max-w-[95%] overflow-x-auto select-none transition-all duration-150 border ${
        isLight
          ? 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-300/50'
          : 'bg-neutral-900/95 border-neutral-700/80 text-white shadow-black/80'
      }`}
    >
      {/* Zoom controls */}
      <div
        className={`flex items-center gap-1 rounded-lg px-2 py-1 shrink-0 ${
          isLight ? 'bg-slate-100' : 'bg-neutral-800/90'
        }`}
      >
        <button
          onClick={() => handleZoom(-0.2)}
          disabled={currentZoom <= 1}
          className={`p-1 disabled:opacity-30 transition-colors ${
            isLight
              ? 'text-slate-500 hover:text-slate-900'
              : 'text-neutral-400 hover:text-white'
          }`}
          title="Thu nhỏ"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span
          className={`text-xs font-mono w-10 text-center tabular-nums font-bold ${
            isLight ? 'text-amber-600' : 'text-amber-400'
          }`}
        >
          {Math.round(currentZoom * 100)}%
        </span>
        <button
          onClick={() => handleZoom(0.2)}
          disabled={currentZoom >= 3}
          className={`p-1 disabled:opacity-30 transition-colors ${
            isLight
              ? 'text-slate-500 hover:text-slate-900'
              : 'text-neutral-400 hover:text-white'
          }`}
          title="Phóng to"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className={`h-5 w-px shrink-0 ${isLight ? 'bg-slate-200' : 'bg-neutral-700'}`} />

      {/* Rotation & Flip */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={handleRotate}
          className={`p-1.5 rounded-md transition-colors ${
            isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
          }`}
          title="Xoay 90°"
        >
          <RotateCw className="w-4 h-4" />
        </button>

        <button
          onClick={handleFlipH}
          className={`p-1.5 rounded-md transition-colors ${
            slot.flipH
              ? 'bg-amber-400 text-black font-bold'
              : isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
          }`}
          title="Lật gương ngang"
        >
          <FlipHorizontal className="w-4 h-4" />
        </button>

        <button
          onClick={handleFlipV}
          className={`p-1.5 rounded-md transition-colors ${
            slot.flipV
              ? 'bg-amber-400 text-black font-bold'
              : isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
          }`}
          title="Lật gương dọc"
        >
          <FlipVertical className="w-4 h-4" />
        </button>
      </div>

      <div className={`h-5 w-px shrink-0 ${isLight ? 'bg-slate-200' : 'bg-neutral-700'}`} />

      {/* Quick Filter Selection */}
      <div className="flex items-center gap-1 shrink-0">
        <Palette className="w-3.5 h-3.5 text-amber-500" />
        <select
          value={slot.filterId}
          onChange={(e) => onUpdateSlot({ filterId: e.target.value as FilterPresetId })}
          className={`text-xs rounded-md px-2 py-1 border focus:outline-none focus:border-amber-500 ${
            isLight
              ? 'bg-slate-100 text-slate-800 border-slate-200'
              : 'bg-neutral-800 text-neutral-200 border-neutral-700'
          }`}
        >
          {FILTER_PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className={`h-5 w-px shrink-0 ${isLight ? 'bg-slate-200' : 'bg-neutral-700'}`} />

      {/* Replace Image */}
      <button
        onClick={onReplaceImage}
        className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-colors shrink-0 ${
          isLight
            ? 'text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200'
            : 'text-amber-400 hover:bg-amber-400/10'
        }`}
        title="Đổi ảnh này"
      >
        <Upload className="w-3.5 h-3.5" />
        <span>Đổi Ảnh</span>
      </button>

      {/* Detailed Adjustment */}
      <button
        onClick={onOpenDetailedAdjust}
        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors shrink-0 whitespace-nowrap ${
          isLight
            ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
        }`}
      >
        Chỉnh Pro
      </button>

      <button
        onClick={handleReset}
        title="Đặt lại vị trí"
        className={`p-1.5 rounded-md transition-colors shrink-0 ${
          isLight
            ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
        }`}
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>

      {/* Close button */}
      <button
        onClick={onClose}
        className={`p-1 rounded-md transition-colors shrink-0 ${
          isLight
            ? 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
            : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
        }`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
