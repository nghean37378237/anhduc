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
  BadgePercent,
  Sun,
  Moon,
} from 'lucide-react';

export type ActiveTab =
  | 'banner'
  | 'layout'
  | 'filters'
  | 'adjust'
  | 'background'
  | 'text'
  | 'stickers'
  | 'ai';

interface TopNavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onReset: () => void;
  onOpenExport: () => void;
  onOpenAi: () => void;
  onUploadClick: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  setActiveTab,
  onReset,
  onOpenExport,
  onOpenAi,
  onUploadClick,
  theme = 'light',
  onToggleTheme,
}) => {
  const isLight = theme === 'light';

  return (
    <header
      className={`h-16 px-3 md:px-6 flex items-center justify-between shrink-0 select-none z-30 transition-colors duration-200 ${
        isLight
          ? 'bg-white border-b border-slate-200/90 text-slate-800 shadow-2xs'
          : 'bg-neutral-900 border-b border-neutral-800 text-neutral-100'
      }`}
    >
      {/* Zone 1: Wordmark */}
      <div className="flex items-center gap-3">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('banner');
          }}
          className={`text-base md:text-xl font-bold tracking-tight flex items-center gap-2 transition-colors ${
            isLight
              ? 'text-slate-900 hover:text-amber-600'
              : 'text-white hover:text-amber-400'
          }`}
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block animate-pulse" />
          <span>KROMA STUDIO</span>
        </a>
      </div>

      {/* Zone 2: Navigation Links / Primary Tools */}
      <nav
        className={`hidden lg:flex items-center gap-1 p-1 rounded-xl border transition-colors ${
          isLight
            ? 'bg-slate-100/90 border-slate-200/80'
            : 'bg-neutral-950 border-neutral-800/80'
        }`}
      >
        {/* User's primary requested feature: Banner Bán Hàng Phía Dưới */}
        <button
          onClick={() => setActiveTab('banner')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'banner'
              ? 'bg-amber-400 text-black shadow-sm ring-1 ring-amber-400/50'
              : isLight
              ? 'text-amber-700 hover:bg-amber-100/60'
              : 'text-amber-400 hover:text-amber-300 hover:bg-neutral-800'
          }`}
        >
          <BadgePercent className="w-3.5 h-3.5" />
          <span>Banner Chữ Dưới</span>
        </button>

        <button
          onClick={() => setActiveTab('layout')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'layout'
              ? isLight
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                : 'bg-neutral-800 text-white shadow-sm'
              : isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Bố Cục (1-3 Ảnh)</span>
        </button>

        <button
          onClick={() => setActiveTab('filters')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'filters'
              ? isLight
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                : 'bg-neutral-800 text-white shadow-sm'
              : isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Bộ Lọc Màu</span>
        </button>

        <button
          onClick={() => setActiveTab('adjust')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'adjust'
              ? isLight
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                : 'bg-neutral-800 text-white shadow-sm'
              : isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Chỉnh Sửa Pro</span>
        </button>

        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'text'
              ? isLight
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                : 'bg-neutral-800 text-white shadow-sm'
              : isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Thêm Chữ</span>
        </button>

        <button
          onClick={() => setActiveTab('stickers')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'stickers'
              ? isLight
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                : 'bg-neutral-800 text-white shadow-sm'
              : isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Sticker className="w-3.5 h-3.5" />
          <span>Tem & Nhãn</span>
        </button>

        <button
          onClick={onOpenAi}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'ai'
              ? 'bg-amber-400 text-black font-semibold'
              : isLight
              ? 'text-amber-700 hover:text-amber-800 hover:bg-amber-100/60'
              : 'text-amber-400 hover:text-amber-300 hover:bg-amber-400/10'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Caption</span>
        </button>
      </nav>

      {/* Zone 3: Primary Actions + Theme Switcher */}
      <div className="flex items-center gap-2">
        {/* Eye-friendly Theme Toggle */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            title={isLight ? 'Chuyển sang nền tối' : 'Chuyển sang nền sáng (dịu mắt)'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700'
            }`}
          >
            {isLight ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Nền Sáng (Dịu Mắt)</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Nền Tối</span>
              </>
            )}
          </button>
        )}

        <button
          onClick={onUploadClick}
          title="Tải ảnh từ máy tính hoặc điện thoại"
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
            isLight
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
              : 'text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 border-neutral-700/60'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
          <span>Thêm Ảnh</span>
        </button>

        <button
          onClick={onReset}
          title="Đặt lại cài đặt mặc định"
          className={`p-2 rounded-lg transition-colors ${
            isLight
              ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenExport}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all whitespace-nowrap hover:shadow-md active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Xuất Ảnh</span>
        </button>
      </div>
    </header>
  );
};
