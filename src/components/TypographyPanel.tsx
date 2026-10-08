import React, { useState } from 'react';
import { FreestyleLayer } from '../types';
import { Type, Plus, AlignLeft, AlignCenter, AlignRight, Italic, Layers } from 'lucide-react';

interface TypographyPanelProps {
  onAddTextLayer: (textConfig: {
    text: string;
    fontFamily: string;
    fontSize: number;
    color: string;
    letterSpacing: number;
    lineHeight: number;
    textAlign: 'left' | 'center' | 'right';
    fontWeight: string;
    isItalic: boolean;
    hasBgBox: boolean;
    bgBoxColor: string;
    hasShadow: boolean;
  }) => void;
  selectedLayer: FreestyleLayer | null;
  onUpdateLayer: (layerId: string, updated: Partial<FreestyleLayer>) => void;
}

export const TypographyPanel: React.FC<TypographyPanelProps> = ({
  onAddTextLayer,
  selectedLayer,
  onUpdateLayer,
}) => {
  const [textInput, setTextInput] = useState<string>('MEMORIES IN SUNLIGHT');
  const [fontFamily, setFontFamily] = useState<string>("'Syne', sans-serif");
  const [fontSize, setFontSize] = useState<number>(28);
  const [textColor, setTextColor] = useState<string>('#ffffff');
  const [letterSpacing, setLetterSpacing] = useState<number>(3);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [hasBgBox, setHasBgBox] = useState<boolean>(false);
  const [bgBoxColor, setBgBoxColor] = useState<string>('rgba(0, 0, 0, 0.7)');
  const [hasShadow, setHasShadow] = useState<boolean>(true);

  // If a text layer is currently selected, sync its edits directly!
  const isEditingSelected = selectedLayer && selectedLayer.type === 'text' && selectedLayer.textData;

  const fontOptions = [
    { label: 'Be Vietnam Pro (Chuẩn Tiếng Việt, không lỗi dấu)', value: "'Be Vietnam Pro', sans-serif" },
    { label: 'Montserrat (Đậm nét, phong cách tin tức & tạp chí)', value: "'Montserrat', sans-serif" },
    { label: 'Plus Jakarta Sans (Hiện đại & Tinh gọn cao cấp)', value: "'Plus Jakarta Sans', sans-serif" },
    { label: 'Lora (Thơ mộng & Cổ điển có chân)', value: "'Lora', serif" },
    { label: 'JetBrains Mono (Máy ảnh Film & Kỹ thuật)', value: "'JetBrains Mono', monospace" },
  ];

  const presetTypographyStyles = [
    {
      name: '⭐ Chữ Vàng Showroom',
      text: 'SIÊU XE ĐẸP · GIẢM GIÁ 70%',
      font: "'Montserrat', sans-serif",
      size: 26,
      spacing: 2,
      italic: false,
      box: true,
      boxColor: '#09090b',
      textColor: '#facc15',
    },
    {
      name: 'Tiêu Đề Tạp Chí',
      text: 'EDITORIAL · PHONG CÁCH MÙA HÈ',
      font: "'Montserrat', sans-serif",
      size: 26,
      spacing: 3,
      italic: false,
      box: true,
      boxColor: 'rgba(0,0,0,0.85)',
      textColor: '#ffffff',
    },
    {
      name: 'Thơ Lãng Mạn',
      text: 'Những ngày nắng vàng ấm áp dịu dàng',
      font: "'Lora', serif",
      size: 24,
      spacing: 1,
      italic: true,
      box: false,
      boxColor: 'transparent',
      textColor: '#fef08a',
    },
    {
      name: 'Timestamp Máy Phim',
      text: '‘98 10 24 · NẮNG VÀNG HÀ NỘI',
      font: "'JetBrains Mono', monospace",
      size: 18,
      spacing: 3,
      italic: false,
      box: true,
      boxColor: 'rgba(15,23,42,0.9)',
      textColor: '#facc15',
    },
  ];

  const handleApplyPreset = (p: (typeof presetTypographyStyles)[0]) => {
    setTextInput(p.text);
    setFontFamily(p.font);
    setFontSize(p.size);
    setLetterSpacing(p.spacing);
    setIsItalic(p.italic);
    setHasBgBox(p.box);
    if (p.boxColor) setBgBoxColor(p.boxColor);
    if (p.textColor) setTextColor(p.textColor);
  };

  const handleCreate = () => {
    onAddTextLayer({
      text: textInput,
      fontFamily,
      fontSize,
      color: textColor,
      letterSpacing,
      lineHeight: 1.2,
      textAlign,
      fontWeight: '700',
      isItalic,
      hasBgBox,
      bgBoxColor,
      hasShadow,
    });
  };

  const updateCurrentOrForm = (key: string, value: any) => {
    if (isEditingSelected && selectedLayer.textData) {
      onUpdateLayer(selectedLayer.id, {
        textData: {
          ...selectedLayer.textData,
          [key]: value,
        },
      });
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-sm font-semibold text-white tracking-wide">
          Chữ Nghệ Thuật (Typography)
        </h3>
        <p className="text-xs text-neutral-400 mt-0.5">
          Thêm tiêu đề, trích dẫn thơ hoặc ngày tháng lên ảnh ghép
        </p>
      </div>

      {/* Preset Typography Cards */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
          Phong Cách Gợi Ý Nhanh
        </label>
        <div className="grid grid-cols-1 gap-2">
          {presetTypographyStyles.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(preset)}
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-left transition-colors flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-medium text-white">{preset.name}</div>
                <div
                  className="text-xs text-amber-400/90 mt-1"
                  style={{ fontFamily: preset.font, fontStyle: preset.italic ? 'italic' : 'normal' }}
                >
                  "{preset.text}"
                </div>
              </div>
              <span className="text-[10px] text-neutral-500 font-mono">Dùng mẫu</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* Text Content Input */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-neutral-400">Nội dung chữ:</label>
        <textarea
          rows={2}
          value={isEditingSelected ? selectedLayer.textData?.text : textInput}
          onChange={(e) => {
            setTextInput(e.target.value);
            updateCurrentOrForm('text', e.target.value);
          }}
          placeholder="Nhập nội dung chữ..."
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
        />
      </div>

      {/* Font Family Selection */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-neutral-400">Kiểu phông chữ:</label>
        <select
          value={isEditingSelected ? selectedLayer.textData?.fontFamily : fontFamily}
          onChange={(e) => {
            setFontFamily(e.target.value);
            updateCurrentOrForm('fontFamily', e.target.value);
          }}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-400"
        >
          {fontOptions.map((f, i) => (
            <option key={i} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Size & Spacing Sliders */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Cỡ chữ (Font Size)</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              {isEditingSelected ? selectedLayer.textData?.fontSize : fontSize}px
            </span>
          </div>
          <input
            type="range"
            min={14}
            max={64}
            value={isEditingSelected ? selectedLayer.textData?.fontSize : fontSize}
            onChange={(e) => {
              const val = Number(e.target.value);
              setFontSize(val);
              updateCurrentOrForm('fontSize', val);
            }}
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Khoảng cách chữ (Letter Spacing)</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              {isEditingSelected ? selectedLayer.textData?.letterSpacing : letterSpacing}px
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={12}
            value={isEditingSelected ? selectedLayer.textData?.letterSpacing : letterSpacing}
            onChange={(e) => {
              const val = Number(e.target.value);
              setLetterSpacing(val);
              updateCurrentOrForm('letterSpacing', val);
            }}
            className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Text Style Toolbar (Align, Italic, Color, Shadow, Box) */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-neutral-400">Định dạng & Màu sắc:</label>
        <div className="flex items-center justify-between bg-neutral-900 p-2 rounded-lg border border-neutral-800">
          {/* Alignment */}
          <div className="flex items-center gap-1">
            {(['left', 'center', 'right'] as const).map((align) => (
              <button
                key={align}
                onClick={() => {
                  setTextAlign(align);
                  updateCurrentOrForm('textAlign', align);
                }}
                className={`p-1.5 rounded ${
                  (isEditingSelected ? selectedLayer.textData?.textAlign : textAlign) === align
                    ? 'bg-amber-400 text-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {align === 'left' && <AlignLeft className="w-3.5 h-3.5" />}
                {align === 'center' && <AlignCenter className="w-3.5 h-3.5" />}
                {align === 'right' && <AlignRight className="w-3.5 h-3.5" />}
              </button>
            ))}

            <button
              onClick={() => {
                const next = !(isEditingSelected ? selectedLayer.textData?.isItalic : isItalic);
                setIsItalic(next);
                updateCurrentOrForm('isItalic', next);
              }}
              className={`p-1.5 rounded ml-1 ${
                (isEditingSelected ? selectedLayer.textData?.isItalic : isItalic)
                  ? 'bg-amber-400 text-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Color pickers */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-neutral-400">Màu chữ:</span>
            <input
              type="color"
              value={isEditingSelected ? selectedLayer.textData?.color : textColor}
              onChange={(e) => {
                setTextColor(e.target.value);
                updateCurrentOrForm('color', e.target.value);
              }}
              className="w-6 h-6 rounded border border-neutral-700 bg-transparent cursor-pointer"
            />
          </div>
        </div>

        {/* Badge Background Box & Shadow Toggles */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isEditingSelected ? selectedLayer.textData?.hasBgBox : hasBgBox}
              onChange={(e) => {
                setHasBgBox(e.target.checked);
                updateCurrentOrForm('hasBgBox', e.target.checked);
              }}
              className="rounded accent-amber-400 cursor-pointer"
            />
            <span>Khung nền đen mờ</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isEditingSelected ? selectedLayer.textData?.hasShadow : hasShadow}
              onChange={(e) => {
                setHasShadow(e.target.checked);
                updateCurrentOrForm('hasShadow', e.target.checked);
              }}
              className="rounded accent-amber-400 cursor-pointer"
            />
            <span>Đổ bóng chữ</span>
          </label>
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={handleCreate}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-xl transition-all shadow-md active:scale-98"
      >
        <Plus className="w-4 h-4" />
        <span>Thêm Chữ Vào Ảnh</span>
      </button>
    </div>
  );
};
