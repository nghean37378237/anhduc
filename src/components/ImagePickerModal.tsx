import React, { useRef } from 'react';
import { SamplePhoto } from '../utils/sampleImages';
import { Upload, X, Check, Image as ImageIcon } from 'lucide-react';

interface ImagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  samples: SamplePhoto[];
  onSelectImage: (imageUrl: string) => void;
  onUploadFile: (file: File) => void;
}

export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  isOpen,
  onClose,
  samples,
  onSelectImage,
  onUploadFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadFile(e.target.files[0]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
      >
        {/* Header */}
        <div className="p-4 px-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Chọn Hình Ảnh Cho Khung Ghép
              </h3>
              <p className="text-xs text-neutral-400">
                Tải ảnh từ thiết bị của bạn hoặc chọn từ thư viện mẫu nghệ thuật
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

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group cursor-pointer p-6 rounded-2xl border-2 border-dashed border-neutral-700 hover:border-amber-400 bg-neutral-950/60 hover:bg-neutral-950 transition-all flex flex-col items-center justify-center text-center gap-2"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                Tải ảnh từ máy tính hoặc điện thoại
              </span>
              <p className="text-xs text-neutral-400 mt-1">
                Hỗ trợ định dạng PNG, JPG, JPEG, WebP, HEIC
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-neutral-800" />
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
              hoặc chọn ảnh mẫu có sẵn
            </span>
            <div className="flex-1 h-px bg-neutral-800" />
          </div>

          {/* Sample Gallery Grid */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {samples.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    onSelectImage(sample.dataUrl);
                    onClose();
                  }}
                  className="group relative rounded-xl overflow-hidden border border-neutral-800 hover:border-amber-400 text-left transition-all aspect-4/3 bg-neutral-950 flex flex-col justify-end"
                >
                  <img
                    src={sample.dataUrl}
                    alt={sample.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  <div className="relative z-10 p-2.5">
                    <span className="text-[10px] text-amber-400 font-mono uppercase tracking-wider">
                      {sample.category}
                    </span>
                    <h4 className="text-xs font-medium text-white truncate mt-0.5">
                      {sample.title}
                    </h4>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
