import React, { useState } from 'react';
import { Sparkles, X, Plus, Palette, RefreshCw, Check } from 'lucide-react';
import { FilterPresetId } from '../types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTextLayer: (textConfig: any) => void;
  onApplyStyle: (style: {
    suggestedBg: string;
    recommendedFilter: FilterPresetId;
    grain: number;
    vignette: number;
  }) => void;
}

interface CaptionItem {
  text: string;
  tag: string;
  author?: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onAddTextLayer,
  onApplyStyle,
}) => {
  const [activeTab, setActiveTab] = useState<'captions' | 'style'>('captions');
  const [themeInput, setThemeInput] = useState<string>('Kỷ niệm mùa hè rực rỡ');
  const [tone, setTone] = useState<string>('poetic');
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedCaptions, setGeneratedCaptions] = useState<CaptionItem[]>([
    { text: 'Lưu giữ từng khoảnh khắc dịu dàng của ngày hôm qua.', tag: 'Thơ mộng' },
    { text: 'Chậm lại một nhịp để thấy đời vẫn bình yên.', tag: 'Tối giản' },
    { text: 'Golden hour & sweet memories that never fade.', tag: 'Song ngữ' },
    { text: 'Gói trọn nắng hạ vào trong từng khung hình nhỏ.', tag: 'Cảm xúc' },
  ]);

  const [styleResult, setStyleResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleGenerateCaptions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/suggest-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: themeInput, tone, language: 'vi' }),
      });
      const data = await res.json();
      if (data.captions && Array.isArray(data.captions)) {
        setGeneratedCaptions(data.captions);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateStyle = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/suggest-style', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: themeInput }),
      });
      const data = await res.json();
      setStyleResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCaptionToCollage = (captionText: string) => {
    onAddTextLayer({
      text: captionText,
      fontFamily: "'Playfair Display', serif",
      fontSize: 26,
      color: '#ffffff',
      letterSpacing: 2,
      lineHeight: 1.25,
      textAlign: 'center',
      fontWeight: '600',
      isItalic: true,
      hasBgBox: true,
      bgBoxColor: 'rgba(0, 0, 0, 0.75)',
      hasShadow: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-4 px-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Trợ Lý Sáng Tạo AI Studio
              </h3>
              <p className="text-xs text-neutral-400">
                Gợi ý câu chữ nghệ thuật & phối màu thẩm mỹ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-1 p-2 bg-neutral-950 border-b border-neutral-800">
          <button
            onClick={() => setActiveTab('captions')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'captions'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Gợi Ý Caption & Câu Nói Thơ
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'style'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Định Hình Tone Màu & Filter
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Prompt / Theme input */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-neutral-300">
              Chủ đề bộ ảnh của bạn:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={themeInput}
                onChange={(e) => setThemeInput(e.target.value)}
                placeholder="VD: Du lịch Đà Lạt, Sinh nhật tuổi 20, Cà phê cuối tuần..."
                className="flex-1 bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={activeTab === 'captions' ? handleGenerateCaptions : handleGenerateStyle}
                disabled={loading || !themeInput.trim()}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all shrink-0"
              >
                {loading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>Tạo Mới</span>
              </button>
            </div>
          </div>

          {/* Quick preset tone pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] text-neutral-400 shrink-0">Phong cách:</span>
            {['poetic', 'minimal', 'retro', 'cinematic'].map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  tone === t
                    ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40'
                    : 'bg-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                {t === 'poetic' && 'Thơ Mộng'}
                {t === 'minimal' && 'Tối Giản'}
                {t === 'retro' && 'Retro 90s'}
                {t === 'cinematic' && 'Điện Ảnh'}
              </button>
            ))}
          </div>

          <div className="h-px bg-neutral-800" />

          {/* Tab 1: Caption Results */}
          {activeTab === 'captions' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Chọn câu tâm đắc để dán trực tiếp lên ảnh:</span>
              </div>

              <div className="space-y-2.5">
                {generatedCaptions.map((cap, i) => (
                  <div
                    key={i}
                    className="group p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div>
                      <p className="text-xs text-white font-medium italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                        "{cap.text}"
                      </p>
                      <span className="text-[10px] text-amber-400/80 font-mono mt-1 inline-block">
                        {cap.tag}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddCaptionToCollage(cap.text)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-neutral-800 group-hover:bg-amber-400 text-neutral-300 group-hover:text-black rounded-lg text-xs font-semibold transition-all shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Dán ảnh</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Style Advice Results */}
          {activeTab === 'style' && (
            <div className="space-y-4">
              {styleResult ? (
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                      Lời Khuyên Nghệ Thuật:
                    </h4>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                      {styleResult.notes}
                    </p>
                  </div>

                  {/* Palette Preview */}
                  {styleResult.palette && (
                    <div className="space-y-1.5">
                      <span className="text-xs text-neutral-400">Bảng màu hài hòa:</span>
                      <div className="flex h-8 rounded-lg overflow-hidden border border-neutral-700">
                        {styleResult.palette.map((c: string, idx: number) => (
                          <div
                            key={idx}
                            className="flex-1 transition-transform hover:scale-105"
                            style={{ backgroundColor: c }}
                            title={c}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      onApplyStyle({
                        suggestedBg: styleResult.suggestedBg || '#0f172a',
                        recommendedFilter: styleResult.recommendedFilter || 'kodak-portra',
                        grain: styleResult.grain || 25,
                        vignette: styleResult.vignette || 20,
                      });
                      onClose();
                    }}
                    className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>Áp Dụng Phong Cách Này Ngay</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 text-neutral-500 text-xs">
                  Bấm nút "Tạo Mới" ở trên để AI phân tích và đề xuất phong cách cho chủ đề của bạn.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
