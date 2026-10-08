import React, { useEffect, useRef, useState } from 'react';
import {
  CanvasSettings,
  DoodleStroke,
  FreestyleLayer,
  GridTemplate,
  PhotoSlot,
} from '../types';
import { renderFullCollage } from '../utils/filterEngine';
import confetti from 'canvas-confetti';
import { Download, Copy, Check, X, RefreshCw, Sparkles, Image as ImageIcon } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: CanvasSettings;
  template: GridTemplate;
  slots: Record<string, PhotoSlot>;
  freestyleLayers: FreestyleLayer[];
  doodleStrokes: DoodleStroke[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  settings,
  template,
  slots,
  freestyleLayers,
  doodleStrokes,
}) => {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [scale, setScale] = useState<number>(2); // Default to 2x for high-res crispness!
  const [quality, setQuality] = useState<number>(0.95);
  const [isRendering, setIsRendering] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [renderedDataUrl, setRenderedDataUrl] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsRendering(true);

    const render = async () => {
      const canvas = previewCanvasRef.current;
      if (!canvas) return;

      const baseWidth = scale === 2 ? 2160 : 1080;
      await renderFullCollage(
        canvas,
        settings,
        template,
        slots,
        freestyleLayers,
        doodleStrokes,
        baseWidth
      );

      if (!isMounted) return;

      const mime = format === 'png' ? 'image/png' : format === 'jpeg' ? 'image/jpeg' : 'image/webp';
      const dataUrl = canvas.toDataURL(mime, quality);
      setRenderedDataUrl(dataUrl);
      setIsRendering(false);
    };

    render();

    return () => {
      isMounted = false;
    };
  }, [isOpen, format, scale, quality, settings, template, slots, freestyleLayers, doodleStrokes]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!renderedDataUrl) return;

    const [ratioW, ratioH] = settings.aspectRatio.split(':');
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `kroma_collage_${ratioW}x${ratioH}_${timestamp}.${format === 'jpeg' ? 'jpg' : format}`;

    const link = document.createElement('a');
    link.download = filename;
    link.href = renderedDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#fbbf24', '#f59e0b', '#d97706', '#ffffff'],
      });
    } catch (e) {
      // Ignored if confetti fails
    }
  };

  const handleCopyToClipboard = async () => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }, 'image/png');
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  };

  const [ratioW, ratioH] = settings.aspectRatio.split(':').map(Number);
  const targetWidth = scale === 2 ? 2160 : 1080;
  const targetHeight = Math.round((targetWidth * ratioH) / ratioW);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-4 px-6 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>Xuất Tác Phẩm Ghép Ảnh</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Kết xuất độ phân giải cao {targetWidth} × {targetHeight}px sắc nét chuẩn in ấn & mạng xã hội
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content: Split Screen Preview vs Options */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Left: Live Preview */}
          <div className="flex-1 bg-neutral-950 p-6 flex flex-col items-center justify-center relative overflow-hidden">
            {isRendering && (
              <div className="absolute inset-0 z-10 bg-neutral-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-amber-400">
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span className="text-xs font-mono text-neutral-300">Đang render ảnh độ nét cao...</span>
              </div>
            )}

            <div className="max-w-full max-h-[460px] flex items-center justify-center shadow-2xl rounded-lg overflow-hidden border border-neutral-800">
              <canvas
                ref={previewCanvasRef}
                className="max-w-full max-h-[460px] object-contain"
              />
            </div>
          </div>

          {/* Right: Export Options */}
          <div className="w-full md:w-80 p-6 border-t md:border-t-0 md:border-l border-neutral-800 flex flex-col justify-between space-y-6 overflow-y-auto">
            <div className="space-y-5">
              {/* Format selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
                  Định Dạng Tệp
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['png', 'jpeg', 'webp'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setFormat(fmt)}
                      className={`py-2 text-xs font-semibold uppercase rounded-xl border transition-all text-center ${
                        format === fmt
                          ? 'bg-amber-400 text-black border-amber-400'
                          : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      {fmt === 'jpeg' ? 'JPG' : fmt}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-500 font-mono">
                  {format === 'png' && 'PNG: Nén không giảm chất lượng, sắc nét nhất'}
                  {format === 'jpeg' && 'JPG: Kích thước tệp nhẹ, tương thích mọi nơi'}
                  {format === 'webp' && 'WebP: Chuẩn ảnh hiện đại tối ưu cao'}
                </p>
              </div>

              {/* Resolution Scale */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
                  Độ Phân Giải (Resolution)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setScale(1)}
                    className={`py-2 px-3 text-xs rounded-xl border transition-all text-left ${
                      scale === 1
                        ? 'bg-amber-400 text-black font-semibold border-amber-400'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-medium">1x Tiêu Chuẩn</div>
                    <div className="text-[10px] opacity-75 font-mono">1080px (Web)</div>
                  </button>

                  <button
                    onClick={() => setScale(2)}
                    className={`py-2 px-3 text-xs rounded-xl border transition-all text-left ${
                      scale === 2
                        ? 'bg-amber-400 text-black font-semibold border-amber-400'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-medium">2x Siêu Sắc Nét</div>
                    <div className="text-[10px] opacity-75 font-mono">2160px (In ấn/4K)</div>
                  </button>
                </div>
              </div>

              {/* JPG/WebP Quality slider */}
              {format !== 'png' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Chất lượng ảnh</span>
                    <span className="font-mono text-neutral-300 tabular-nums">
                      {Math.round(quality * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.7}
                    max={1}
                    step={0.05}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-4 border-t border-neutral-800">
              <button
                onClick={handleDownload}
                disabled={isRendering}
                className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>Tải Xuống Tác Phẩm</span>
              </button>

              <button
                onClick={handleCopyToClipboard}
                disabled={isRendering}
                className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition-colors border border-neutral-700/60"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Đã sao chép vào bộ nhớ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-neutral-400" />
                    <span>Sao Chép Vào Clipboard</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
