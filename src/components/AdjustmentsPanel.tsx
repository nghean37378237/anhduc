import React, { useState } from 'react';
import { PhotoAdjustments, PhotoSlot } from '../types';
import { DEFAULT_ADJUSTMENTS } from '../utils/constants';
import { RotateCcw, Sliders, Sun, Contrast, Droplets, Thermometer, Eye, Sparkles } from 'lucide-react';

interface AdjustmentsPanelProps {
  selectedSlot: PhotoSlot | null;
  slots: Record<string, PhotoSlot>;
  onUpdateSlotAdjustments: (slotId: string, adjustments: Partial<PhotoAdjustments>) => void;
  onUpdateAllSlotsAdjustments: (adjustments: Partial<PhotoAdjustments>) => void;
  onResetAdjustments: (slotId?: string) => void;
}

export const AdjustmentsPanel: React.FC<AdjustmentsPanelProps> = ({
  selectedSlot,
  slots,
  onUpdateSlotAdjustments,
  onUpdateAllSlotsAdjustments,
  onResetAdjustments,
}) => {
  const [applyMode, setApplyMode] = useState<'selected' | 'all'>('selected');

  // Active adjustments values
  const currentAdjustments = selectedSlot ? selectedSlot.adjustments : DEFAULT_ADJUSTMENTS;

  const handleChange = (key: keyof PhotoAdjustments, val: number) => {
    if (applyMode === 'selected' && selectedSlot) {
      onUpdateSlotAdjustments(selectedSlot.id, { [key]: val });
    } else {
      onUpdateAllSlotsAdjustments({ [key]: val });
    }
  };

  const handleReset = () => {
    if (applyMode === 'selected' && selectedSlot) {
      onResetAdjustments(selectedSlot.id);
    } else {
      onResetAdjustments();
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">
            Chỉnh Sửa Chi Tiết Chuyên Nghiệp
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Cân chỉnh ánh sáng, màu sắc và độ sắc nét theo ý muốn
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 px-2.5 py-1 text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
          title="Đặt lại các thông số về mặc định"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Đặt lại</span>
        </button>
      </div>

      {/* Target scope toggle */}
      <div className="p-1 bg-neutral-900 rounded-lg border border-neutral-800 flex items-center gap-1">
        <button
          onClick={() => setApplyMode('selected')}
          disabled={!selectedSlot}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
            applyMode === 'selected'
              ? 'bg-amber-400 text-black font-semibold'
              : 'text-neutral-400 hover:text-white disabled:opacity-40'
          }`}
        >
          Ô đang chọn {selectedSlot ? '' : '(Hãy click 1 ô)'}
        </button>
        <button
          onClick={() => setApplyMode('all')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
            applyMode === 'all'
              ? 'bg-amber-400 text-black font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Tất cả ảnh trong khung
        </button>
      </div>

      {/* Sliders Group 1: Ánh sáng (Light) */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span>Ánh Sáng & Tương Phản</span>
        </h4>

        {/* Brightness */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Độ sáng (Brightness)</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              {currentAdjustments.brightness > 0 ? `+${currentAdjustments.brightness}` : currentAdjustments.brightness}
            </span>
          </div>
          <input
            type="range"
            min={-80}
            max={80}
            value={currentAdjustments.brightness}
            onChange={(e) => handleChange('brightness', Number(e.target.value))}
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Contrast */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Độ tương phản (Contrast)</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              {currentAdjustments.contrast > 0 ? `+${currentAdjustments.contrast}` : currentAdjustments.contrast}
            </span>
          </div>
          <input
            type="range"
            min={-80}
            max={80}
            value={currentAdjustments.contrast}
            onChange={(e) => handleChange('contrast', Number(e.target.value))}
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Exposure */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Phơi sáng (Exposure)</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              {currentAdjustments.exposure > 0 ? `+${currentAdjustments.exposure}` : currentAdjustments.exposure}
            </span>
          </div>
          <input
            type="range"
            min={-60}
            max={60}
            value={currentAdjustments.exposure}
            onChange={(e) => handleChange('exposure', Number(e.target.value))}
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* Sliders Group 2: Màu sắc (Color) */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
          <Droplets className="w-3.5 h-3.5 text-amber-400" />
          <span>Màu Sắc & Nhiệt Độ</span>
        </h4>

        {/* Saturation */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Độ bão hòa màu (Saturation)</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              {currentAdjustments.saturation > 0 ? `+${currentAdjustments.saturation}` : currentAdjustments.saturation}
            </span>
          </div>
          <input
            type="range"
            min={-100}
            max={100}
            value={currentAdjustments.saturation}
            onChange={(e) => handleChange('saturation', Number(e.target.value))}
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Warmth (Temperature) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Độ ấm áp (Warmth)</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              {currentAdjustments.warmth > 0 ? `+${currentAdjustments.warmth}` : currentAdjustments.warmth}
            </span>
          </div>
          <input
            type="range"
            min={-80}
            max={80}
            value={currentAdjustments.warmth}
            onChange={(e) => handleChange('warmth', Number(e.target.value))}
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Sepia */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Tone nâu cổ điển (Sepia)</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              {currentAdjustments.sepia}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={currentAdjustments.sepia}
            onChange={(e) => handleChange('sepia', Number(e.target.value))}
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Hue Rotate */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Xoay dải sắc thái (Hue Shift)</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              {currentAdjustments.hueRotate}°
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={360}
            value={currentAdjustments.hueRotate}
            onChange={(e) => handleChange('hueRotate', Number(e.target.value))}
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* Sliders Group 3: Hiệu ứng nghệ thuật (FX) */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Hiệu Ứng Nghệ Thuật Riêng</span>
        </h4>

        {/* Blur */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Độ mờ ảo hậu cảnh (Blur)</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              {currentAdjustments.blur}px
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={15}
            value={currentAdjustments.blur}
            onChange={(e) => handleChange('blur', Number(e.target.value))}
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Chromatic Aberration */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Tách quang sai viền đỏ/lam (Glitch)</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              {currentAdjustments.chromaticAberration}px
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={20}
            value={currentAdjustments.chromaticAberration}
            onChange={(e) => handleChange('chromaticAberration', Number(e.target.value))}
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
