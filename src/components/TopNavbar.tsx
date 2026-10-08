import React from 'react';
import {
  Download,
  RotateCcw,
  Sparkles,
  LayoutGrid,
  Sliders,
  Palette,
  Type,
  Sticker,
  Image as ImageIcon,
} from 'lucide-react';

export type ActiveTab = 'layout' | 'filters' | 'adjust' | 'background' | 'text' | 'stickers' | 'ai';

interface TopNavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onReset: () => void;
  onOpenExport: () => void;
  onOpenAi: () => void;
  onUploadClick: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  setActiveTab,
  onReset,
  onOpenExport,
  onOpenAi,
  onUploadClick,
}) => {
  return (
    <header className="h-16 px-4 md:px-6 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between shrink-0 select-none z-30">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('layout');
          }}
          className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2 hover:text-amber-400 transition-colors"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block animate-pulse" />
          KROMA STUDIO
        </a>
      </div>

      {/* Zone 2: Navigation links / Primary Tools */}
      <nav className="hidden lg:flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800/80">
        <button
          onClick={() => setActiveTab('layout')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'layout'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          Bố Cục (Layout)
        </button>

        <button
          onClick={() => setActiveTab('filters')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'filters'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          Bộ Lọc & Hiệu Ứng
        </button>

        <button
          onClick={() => setActiveTab('adjust')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'adjust'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          Chỉnh Sửa Pro
        </button>

        <button
          onClick={() => setActiveTab('background')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'background'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-sm border border-neutral-500 bg-amber-600/30 inline-block" />
          Khung & Nền
        </button>

        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'text'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          Chữ Nghệ Thuật
        </button>

        <button
          onClick={() => setActiveTab('stickers')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'stickers'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Sticker className="w-3.5 h-3.5" />
          Tem & Sticker
        </button>

        <button
          onClick={onOpenAi}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'ai'
              ? 'bg-amber-400 text-black font-semibold'
              : 'text-amber-400 hover:text-amber-300 hover:bg-amber-400/10'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI Studio
        </button>
      </nav>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onUploadClick}
          title="Tải ảnh từ máy tính hoặc điện thoại"
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-lg border border-neutral-700/60 transition-colors whitespace-nowrap"
        >
          <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Thêm Ảnh</span>
        </button>

        <button
          onClick={onReset}
          title="Đặt lại cài đặt mặc định"
          className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenExport}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Xuất Ảnh</span>
        </button>
      </div>
    </header>
  );
};
