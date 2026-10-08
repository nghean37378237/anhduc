import React, { useState } from 'react';
import { FreestyleLayer } from '../types';
import { Plus, AlignLeft, AlignCenter, AlignRight, Italic } from 'lucide-react';

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
  theme?: 'light' | 'dark';
}

export const TypographyPanel: React.FC<TypographyPanelProps> = ({
  onAddTextLayer,
  selectedLayer,
  onUpdateLayer,
  theme = 'light',
}) => {
  const isLight = theme === 'light';
  const [textInput, setTextInput] = useState<string>('MEMORIES IN SUNLIGHT');
  const [fontFamily, setFontFamily] = useState<string>("'Montserrat', sans-serif");
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
      boxColor: 'rgba(0,0,0,0.7)',
      textColor: '#ffffff',
    },
    {
      name: 'Thơ Mộng Serif',
      text: 'Những ngày nắng dịu dàng ở Paris',
      font: "'Lora', serif",
      size: 24,
      spacing: 1,
      italic: true,
      box: false,
      textColor: '#ffffff',
    },
    {
      name: 'Timestamp Kỹ Thuật Số',
      text: 'REC · 1998.07.24 16:42',
      font: "'JetBrains Mono', monospace",
      size: 14,
      spacing: 2,
      italic: false,
      box: true,
      boxColor: 'rgba(239, 68, 68, 0.85)',
      textColor: '#ffffff',
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
      fontWeight: 'bold',
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
    <div className={`p-4 space-y-6 ${isLight ? 'text-slate-800' : 'text-neutral-100'}`}>
      {/* Header */}
      <div>
        <h3 className={`text-sm font-bold tracking-wide ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Chữ Nghệ Thuật (Typography)
        </h3>
        <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
          Thêm tiêu đề, trích dẫn thơ hoặc ngày tháng lên ảnh ghép
        </p>
      </div>

      {/* Preset Typography Cards */}
      <div className="space-y-2">
        <label className={`text-xs font-bold uppercase tracking-wider block ${isLight ? 'text-slate-800' : 'text-neutral-300'}`}>
          Phong Cách Gợi Ý Nhanh
        </label>
        <div className="grid grid-cols-1 gap-2">
          {presetTypographyStyles.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(preset)}
              className={`p-2.5 rounded-xl border text-left transition-colors flex items-center justify-between ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
                  : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div>
                <div className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{preset.name}</div>
                <div
                  className={`text-xs mt-1 font-semibold ${isLight ? 'text-amber-700' : 'text-amber-400/90'}`}
                  style={{ fontFamily: preset.font, fontStyle: preset.italic ? 'italic' : 'normal' }}
                >
                  "{preset.text}"
                </div>
              </div>
              <span className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-neutral-500'}`}>Dùng mẫu</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`h-px ${isLight ? 'bg-slate-200' : 'bg-neutral-800'}`} />

      {/* Text Content Input */}
      <div className="space-y-2">
        <label className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>Nội dung chữ:</label>
        <textarea
          rows={2}
          value={isEditingSelected ? selectedLayer.textData?.text : textInput}
          onChange={(e) => {
            setTextInput(e.target.value);
            updateCurrentOrForm('text', e.target.value);
          }}
          placeholder="Nhập nội dung chữ..."
          className={`w-full rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:border-amber-500 border ${
            isLight
              ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
              : 'bg-neutral-900 border-neutral-700 text-white placeholder-neutral-500'
          }`}
        />
      </div>

      {/* Font Family Selection */}
      <div className="space-y-2">
        <label className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>Kiểu phông chữ:</label>
        <select
          value={isEditingSelected ? selectedLayer.textData?.fontFamily : fontFamily}
          onChange={(e) => {
            setFontFamily(e.target.value);
            updateCurrentOrForm('fontFamily', e.target.value);
          }}
          className={`w-full rounded-lg p-2 text-xs font-semibold focus:outline-none focus:border-amber-500 border cursor-pointer ${
            isLight
              ? 'bg-white border-slate-300 text-slate-900'
              : 'bg-neutral-900 border-neutral-700 text-white'
          }`}
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
            <span className={isLight ? 'text-slate-600' : 'text-neutral-400'}>Cỡ chữ (Font Size)</span>
            <span className={`font-mono tabular-nums font-bold ${isLight ? 'text-slate-800' : 'text-neutral-300'}`}>
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
            className={`w-full accent-amber-500 h-1.5 rounded-lg appearance-none cursor-pointer ${
              isLight ? 'bg-slate-200' : 'bg-neutral-800'
            }`}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className={isLight ? 'text-slate-600' : 'text-neutral-400'}>Khoảng cách chữ (Letter Spacing)</span>
            <span className={`font-mono tabular-nums font-bold ${isLight ? 'text-slate-800' : 'text-neutral-300'}`}>
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
            className={`w-full accent-amber-500 h-1.5 rounded-lg appearance-none cursor-pointer ${
              isLight ? 'bg-slate-200' : 'bg-neutral-800'
            }`}
          />
        </div>
      </div>

      {/* Text Style Toolbar */}
      <div className="space-y-2">
        <label className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>Định dạng & Màu sắc:</label>
        <div
          className={`flex items-center justify-between p-2 rounded-lg border ${
            isLight ? 'bg-slate-50 border-slate-200 shadow-2xs' : 'bg-neutral-900 border-neutral-800'
          }`}
        >
          {/* Alignment */}
          <div className="flex items-center gap-1">
            {(['left', 'center', 'right'] as const).map((align) => (
              <button
                key={align}
                onClick={() => {
                  setTextAlign(align);
                  updateCurrentOrForm('textAlign', align);
                }}
                className={`p-1.5 rounded transition-colors ${
                  (isEditingSelected ? selectedLayer.textData?.textAlign : textAlign) === align
                    ? 'bg-amber-400 text-black font-bold'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
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
              className={`p-1.5 rounded ml-1 transition-colors ${
                (isEditingSelected ? selectedLayer.textData?.isItalic : isItalic)
                  ? 'bg-amber-400 text-black font-bold'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Color pickers */}
          <div className="flex items-center gap-2">
            <span className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>Màu chữ:</span>
            <input
              type="color"
              value={isEditingSelected ? selectedLayer.textData?.color : textColor}
              onChange={(e) => {
                setTextColor(e.target.value);
                updateCurrentOrForm('color', e.target.value);
              }}
              className="w-6 h-6 rounded border border-slate-300 bg-transparent cursor-pointer"
            />
          </div>
        </div>

        {/* Badge Background Box & Shadow Toggles */}
        <div className="flex items-center justify-between pt-1">
          <label className={`flex items-center gap-2 text-xs cursor-pointer ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
            <input
              type="checkbox"
              checked={isEditingSelected ? selectedLayer.textData?.hasBgBox : hasBgBox}
              onChange={(e) => {
                setHasBgBox(e.target.checked);
                updateCurrentOrForm('hasBgBox', e.target.checked);
              }}
              className="rounded accent-amber-500 cursor-pointer"
            />
            <span>Khung nền mờ</span>
          </label>

          <label className={`flex items-center gap-2 text-xs cursor-pointer ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
            <input
              type="checkbox"
              checked={isEditingSelected ? selectedLayer.textData?.hasShadow : hasShadow}
              onChange={(e) => {
                setHasShadow(e.target.checked);
                updateCurrentOrForm('hasShadow', e.target.checked);
              }}
              className="rounded accent-amber-500 cursor-pointer"
            />
            <span>Đổ bóng chữ</span>
          </label>
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={handleCreate}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-xl transition-all shadow-sm active:scale-98"
      >
        <Plus className="w-4 h-4" />
        <span>Thêm Chữ Vào Ảnh</span>
      </button>
    </div>
  );
};
