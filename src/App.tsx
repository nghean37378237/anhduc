import React, { useState, useEffect, useCallback } from 'react';
import {
  AspectRatioId,
  CanvasSettings,
  DoodleStroke,
  FilterPresetId,
  FooterBannerConfig,
  FreestyleLayer,
  GridTemplate,
  PhotoAdjustments,
  PhotoSlot,
} from './types';
import {
  DEFAULT_ADJUSTMENTS,
  DEFAULT_FOOTER_BANNER,
  GRID_TEMPLATES,
} from './utils/constants';
import { getSamplePhotos, SamplePhoto } from './utils/sampleImages';
import { TopNavbar, ActiveTab } from './components/TopNavbar';
import { AspectRatioBar } from './components/AspectRatioBar';
import { CanvasArea } from './components/CanvasArea';
import { LayoutPicker } from './components/LayoutPicker';
import { FilterPanel } from './components/FilterPanel';
import { AdjustmentsPanel } from './components/AdjustmentsPanel';
import { BackgroundPanel } from './components/BackgroundPanel';
import { TypographyPanel } from './components/TypographyPanel';
import { StickerPanel } from './components/StickerPanel';
import { BannerCustomizerPanel } from './components/BannerCustomizerPanel';
import { ExportModal } from './components/ExportModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { ImagePickerModal } from './components/ImagePickerModal';

export default function App() {
  const [appTheme, setAppTheme] = useState<'light' | 'dark'>('light'); // Chế độ nền sáng, dịu mắt theo yêu cầu người dùng
  const [samples, setSamples] = useState<SamplePhoto[]>([]);
  // Default to user's requested template: 1 Photo Top + Footer Banner (or 2/3 photos)
  const [currentTemplate, setCurrentTemplate] = useState<GridTemplate>(GRID_TEMPLATES[0]); // banner-1-photo
  const [activeTab, setActiveTab] = useState<ActiveTab>('banner');

  const [settings, setSettings] = useState<CanvasSettings>({
    aspectRatio: '1:1', // Priority 1:1 as requested
    outerPadding: 0,
    innerGap: 8,
    cellRadius: 8,
    backgroundColor: '#09090b',
    backgroundType: 'solid',
    backgroundGradient: {
      from: '#1e1b4b',
      to: '#c2410c',
      direction: 'to bottom',
    },
    backgroundTexture: 'none',
    frameStyle: 'none',
    lightLeak: 'none',
    globalGrain: 0,
    globalVignette: 0,
    globalFilter: 'none',
    footerBanner: { ...DEFAULT_FOOTER_BANNER },
  });

  const [slots, setSlots] = useState<Record<string, PhotoSlot>>({});
  const [freestyleLayers, setFreestyleLayers] = useState<FreestyleLayer[]>([]);
  const [doodleStrokes, setDoodleStrokes] = useState<DoodleStroke[]>([]);

  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);

  // Modals state
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState<boolean>(false);
  const [targetSlotForPicker, setTargetSlotForPicker] = useState<string | null>(null);

  // Initialize sample photos and populate starting slots
  useEffect(() => {
    const loadedSamples = getSamplePhotos();
    setSamples(loadedSamples);

    const initialSlots: Record<string, PhotoSlot> = {};
    const sampleUrls = loadedSamples.map((s) => s.dataUrl);

    // Initial slot for banner-1-photo
    GRID_TEMPLATES[0].slots.forEach((s, idx) => {
      initialSlots[s.id] = {
        id: s.id,
        imageUrl: sampleUrls[idx % sampleUrls.length] || '',
        zoom: 1,
        panX: 0,
        panY: 0,
        rotation: 0,
        flipH: false,
        flipV: false,
        filterId: 'none',
        adjustments: { ...DEFAULT_ADJUSTMENTS },
      };
    });

    setSlots(initialSlots);
  }, []);

  // Switch between 1, 2, or 3 photos on the top part while keeping the bottom banner!
  const handleSwitchPhotoCount = useCallback(
    (count: 1 | 2 | 3) => {
      let targetTmpl = GRID_TEMPLATES[0]; // 1 photo
      if (count === 2) targetTmpl = GRID_TEMPLATES[1]; // 2 photos
      if (count === 3) targetTmpl = GRID_TEMPLATES[2]; // 3 photos (1 large + 2 small)

      setCurrentTemplate(targetTmpl);

      setSlots((prevSlots) => {
        const nextSlots: Record<string, PhotoSlot> = {};
        const existingImages = Object.values(prevSlots)
          .map((s) => s.imageUrl)
          .filter(Boolean);

        targetTmpl.slots.forEach((s, idx) => {
          const existing = prevSlots[s.id];
          if (existing) {
            nextSlots[s.id] = existing;
          } else {
            const imgUrl =
              existingImages[idx % Math.max(1, existingImages.length)] ||
              (samples[idx % samples.length] ? samples[idx % samples.length].dataUrl : '');
            nextSlots[s.id] = {
              id: s.id,
              imageUrl: imgUrl,
              zoom: 1,
              panX: 0,
              panY: 0,
              rotation: 0,
              flipH: false,
              flipV: false,
              filterId: 'none',
              adjustments: { ...DEFAULT_ADJUSTMENTS },
            };
          }
        });
        return nextSlots;
      });

      if (selectedSlotId && !targetTmpl.slots.some((s) => s.id === selectedSlotId)) {
        setSelectedSlotId(null);
      }
    },
    [samples, selectedSlotId]
  );

  // Update template
  const handleSelectTemplate = (newTemplate: GridTemplate) => {
    setCurrentTemplate(newTemplate);

    // If template has footer banner, ensure banner is enabled
    if (newTemplate.hasFooterBanner) {
      setSettings((prev) => ({
        ...prev,
        footerBanner: { ...prev.footerBanner, enabled: true },
      }));
    }

    setSlots((prevSlots) => {
      const nextSlots: Record<string, PhotoSlot> = {};
      const existingImages = Object.values(prevSlots)
        .map((s) => s.imageUrl)
        .filter(Boolean);

      newTemplate.slots.forEach((s, idx) => {
        const existing = prevSlots[s.id];
        if (existing) {
          nextSlots[s.id] = existing;
        } else {
          const imgUrl =
            existingImages[idx % Math.max(1, existingImages.length)] ||
            (samples[idx % samples.length] ? samples[idx % samples.length].dataUrl : '');
          nextSlots[s.id] = {
            id: s.id,
            imageUrl: imgUrl,
            zoom: 1,
            panX: 0,
            panY: 0,
            rotation: 0,
            flipH: false,
            flipV: false,
            filterId: 'none',
            adjustments: { ...DEFAULT_ADJUSTMENTS },
          };
        }
      });
      return nextSlots;
    });

    if (selectedSlotId && !newTemplate.slots.some((s) => s.id === selectedSlotId)) {
      setSelectedSlotId(null);
    }
  };

  // Slot updates
  const handleUpdateSlot = useCallback((slotId: string, updated: Partial<PhotoSlot>) => {
    setSlots((prev) => {
      const current = prev[slotId];
      if (!current) return prev;
      return {
        ...prev,
        [slotId]: { ...current, ...updated },
      };
    });
  }, []);

  const handleUpdateSlotAdjustments = useCallback(
    (slotId: string, adjustments: Partial<PhotoAdjustments>) => {
      setSlots((prev) => {
        const current = prev[slotId];
        if (!current) return prev;
        return {
          ...prev,
          [slotId]: {
            ...current,
            adjustments: { ...current.adjustments, ...adjustments },
          },
        };
      });
    },
    []
  );

  const handleUpdateAllSlotsAdjustments = useCallback(
    (adjustments: Partial<PhotoAdjustments>) => {
      setSlots((prev) => {
        const next: Record<string, PhotoSlot> = {};
        for (const [id, slot] of Object.entries(prev)) {
          next[id] = {
            ...slot,
            adjustments: { ...slot.adjustments, ...adjustments },
          };
        }
        return next;
      });
    },
    []
  );

  const handleResetAdjustments = useCallback(
    (slotId?: string) => {
      if (slotId) {
        handleUpdateSlotAdjustments(slotId, { ...DEFAULT_ADJUSTMENTS });
      } else {
        handleUpdateAllSlotsAdjustments({ ...DEFAULT_ADJUSTMENTS });
      }
    },
    [handleUpdateSlotAdjustments, handleUpdateAllSlotsAdjustments]
  );

  const handleApplyFilterToSlot = useCallback(
    (slotId: string, filterId: FilterPresetId) => {
      handleUpdateSlot(slotId, { filterId });
    },
    [handleUpdateSlot]
  );

  const handleApplyFilterToAll = useCallback((filterId: FilterPresetId) => {
    setSlots((prev) => {
      const next: Record<string, PhotoSlot> = {};
      for (const [id, slot] of Object.entries(prev)) {
        next[id] = { ...slot, filterId };
      }
      return next;
    });
  }, []);

  // Banner updates
  const handleUpdateBanner = (updated: Partial<FooterBannerConfig>) => {
    setSettings((prev) => ({
      ...prev,
      footerBanner: {
        ...prev.footerBanner,
        ...updated,
      },
    }));
  };

  // Freestyle layers
  const handleAddTextLayer = (textConfig: any) => {
    const newLayer: FreestyleLayer = {
      id: `text-${Date.now()}`,
      type: 'text',
      x: 30,
      y: 35,
      width: 40,
      height: 10,
      rotation: 0,
      scale: 1,
      zIndex: freestyleLayers.length + 1,
      opacity: 1,
      textData: textConfig,
    };
    setFreestyleLayers((prev) => [...prev, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  const handleAddSticker = (stickerConfig: any) => {
    const newLayer: FreestyleLayer = {
      id: `sticker-${Date.now()}`,
      type: 'sticker',
      x: 35,
      y: 25,
      width: 25,
      height: 12,
      rotation: (Math.random() - 0.5) * 10,
      scale: 1,
      zIndex: freestyleLayers.length + 1,
      opacity: 1,
      stickerData: stickerConfig,
    };
    setFreestyleLayers((prev) => [...prev, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  const handleUpdateLayer = (layerId: string, updated: Partial<FreestyleLayer>) => {
    setFreestyleLayers((prev) =>
      prev.map((l) => (l.id === layerId ? { ...l, ...updated } : l))
    );
  };

  const handleDeleteLayer = (layerId: string) => {
    setFreestyleLayers((prev) => prev.filter((l) => l.id !== layerId));
    if (selectedLayerId === layerId) setSelectedLayerId(null);
  };

  // Image Upload / Drop Handlers
  const handleImageDropOnSlot = (slotId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        handleUpdateSlot(slotId, { imageUrl: result, zoom: 1, panX: 0, panY: 0 });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUploadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        if (targetSlotForPicker) {
          handleUpdateSlot(targetSlotForPicker, {
            imageUrl: result,
            zoom: 1,
            panX: 0,
            panY: 0,
          });
        } else if (selectedSlotId) {
          handleUpdateSlot(selectedSlotId, {
            imageUrl: result,
            zoom: 1,
            panX: 0,
            panY: 0,
          });
        } else {
          const firstSlotId = currentTemplate.slots[0]?.id;
          if (firstSlotId) {
            handleUpdateSlot(firstSlotId, { imageUrl: result });
          }
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSampleImage = (imageUrl: string) => {
    if (targetSlotForPicker) {
      handleUpdateSlot(targetSlotForPicker, { imageUrl, zoom: 1, panX: 0, panY: 0 });
    } else if (selectedSlotId) {
      handleUpdateSlot(selectedSlotId, { imageUrl, zoom: 1, panX: 0, panY: 0 });
    } else {
      const firstSlotId = currentTemplate.slots[0]?.id;
      if (firstSlotId) {
        handleUpdateSlot(firstSlotId, { imageUrl });
      }
    }
  };

  const handleOpenPickerForSlot = (slotId: string) => {
    setTargetSlotForPicker(slotId);
    setIsImagePickerOpen(true);
  };

  const handleResetAll = () => {
    const loadedSamples = getSamplePhotos();
    const initialSlots: Record<string, PhotoSlot> = {};
    const sampleUrls = loadedSamples.map((s) => s.dataUrl);

    currentTemplate.slots.forEach((s, idx) => {
      initialSlots[s.id] = {
        id: s.id,
        imageUrl: sampleUrls[idx % sampleUrls.length] || '',
        zoom: 1,
        panX: 0,
        panY: 0,
        rotation: 0,
        flipH: false,
        flipV: false,
        filterId: 'none',
        adjustments: { ...DEFAULT_ADJUSTMENTS },
      };
    });

    setSlots(initialSlots);
    setSettings((prev) => ({
      ...prev,
      footerBanner: { ...DEFAULT_FOOTER_BANNER },
      globalFilter: 'none',
    }));
    setSelectedSlotId(null);
    setSelectedLayerId(null);
  };

  const activeSelectedSlot = selectedSlotId ? slots[selectedSlotId] : null;
  const activeSelectedLayer = selectedLayerId
    ? freestyleLayers.find((l) => l.id === selectedLayerId) || null
    : null;

  return (
    <div
      className={`flex flex-col h-screen w-screen overflow-hidden font-sans transition-colors duration-200 ${
        appTheme === 'light'
          ? 'bg-slate-50 text-slate-800'
          : 'bg-neutral-950 text-neutral-100'
      }`}
    >
      {/* Top Navbar */}
      <TopNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReset={handleResetAll}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenAi={() => setIsAiModalOpen(true)}
        onUploadClick={() => {
          setTargetSlotForPicker(selectedSlotId);
          setIsImagePickerOpen(true);
        }}
        theme={appTheme}
        onToggleTheme={() => setAppTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      />

      {/* Aspect Ratio & Photo Count Ribbon (1:1, 4:5, 3:4 Priority) */}
      <AspectRatioBar
        currentRatio={settings.aspectRatio}
        onChangeRatio={(ratio) => setSettings((s) => ({ ...s, aspectRatio: ratio }))}
        currentPhotoCount={currentTemplate.photoCount}
        onSwitchPhotoCount={handleSwitchPhotoCount}
        theme={appTheme}
      />

      {/* Main Studio Workspace: Canvas Stage + Right Sidebar Tools */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Central Canvas Viewport */}
        <CanvasArea
          settings={settings}
          template={currentTemplate}
          slots={slots}
          freestyleLayers={freestyleLayers}
          doodleStrokes={doodleStrokes}
          selectedSlotId={selectedSlotId}
          selectedLayerId={selectedLayerId}
          onSelectSlot={setSelectedSlotId}
          onSelectLayer={setSelectedLayerId}
          onUpdateSlot={handleUpdateSlot}
          onUpdateLayer={handleUpdateLayer}
          onDeleteLayer={handleDeleteLayer}
          onImageDropOnSlot={handleImageDropOnSlot}
          onReplaceImageTrigger={handleOpenPickerForSlot}
          onOpenDetailedAdjust={() => setActiveTab('adjust')}
          onOpenBannerCustomizer={() => setActiveTab('banner')}
          theme={appTheme}
        />

        {/* Right Sidebar Tool Panel */}
        <aside
          className={`w-80 md:w-96 flex flex-col shrink-0 overflow-y-auto z-20 transition-colors duration-200 ${
            appTheme === 'light'
              ? 'bg-white border-l border-slate-200/90 text-slate-800'
              : 'bg-neutral-900 border-l border-neutral-800 text-neutral-100'
          }`}
        >
          {activeTab === 'banner' && (
            <BannerCustomizerPanel
              banner={settings.footerBanner}
              onUpdateBanner={handleUpdateBanner}
              onSwitchPhotoCount={handleSwitchPhotoCount}
              currentPhotoCount={currentTemplate.photoCount}
              theme={appTheme}
            />
          )}

          {activeTab === 'layout' && (
            <LayoutPicker
              currentTemplate={currentTemplate}
              onSelectTemplate={handleSelectTemplate}
              settings={settings}
              onUpdateSettings={(up) => setSettings((s) => ({ ...s, ...up }))}
              theme={appTheme}
            />
          )}

          {activeTab === 'filters' && (
            <FilterPanel
              selectedSlot={activeSelectedSlot}
              onApplyFilterToSlot={handleApplyFilterToSlot}
              onApplyFilterToAll={handleApplyFilterToAll}
              settings={settings}
              onUpdateSettings={(up) => setSettings((s) => ({ ...s, ...up }))}
              theme={appTheme}
            />
          )}

          {activeTab === 'adjust' && (
            <AdjustmentsPanel
              selectedSlot={activeSelectedSlot}
              slots={slots}
              onUpdateSlotAdjustments={handleUpdateSlotAdjustments}
              onUpdateAllSlotsAdjustments={handleUpdateAllSlotsAdjustments}
              onResetAdjustments={handleResetAdjustments}
            />
          )}

          {activeTab === 'background' && (
            <BackgroundPanel
              settings={settings}
              onUpdateSettings={(up) => setSettings((s) => ({ ...s, ...up }))}
            />
          )}

          {activeTab === 'text' && (
            <TypographyPanel
              onAddTextLayer={handleAddTextLayer}
              selectedLayer={activeSelectedLayer}
              onUpdateLayer={handleUpdateLayer}
              theme={appTheme}
            />
          )}

          {activeTab === 'stickers' && (
            <StickerPanel onAddSticker={handleAddSticker} />
          )}

          {activeTab === 'ai' && (
            <div className="p-6 text-center space-y-4">
              <h3 className={`text-sm font-bold ${appTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                AI Caption Studio
              </h3>
              <p className={`text-xs ${appTheme === 'light' ? 'text-slate-600' : 'text-neutral-400'}`}>
                Sử dụng AI để tự động tạo caption hấp dẫn, lời quảng cáo chốt sale hoặc câu nói nghệ thuật để gắn lên ảnh.
              </p>
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-xl text-xs transition-colors shadow-sm"
              >
                Mở Trợ Lý AI
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* Modals */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        settings={settings}
        template={currentTemplate}
        slots={slots}
        freestyleLayers={freestyleLayers}
        doodleStrokes={doodleStrokes}
      />

      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onAddTextLayer={handleAddTextLayer}
        onApplyStyle={(style) => {
          setSettings((prev) => ({
            ...prev,
            backgroundColor: style.suggestedBg,
            globalFilter: style.recommendedFilter,
            globalGrain: style.grain,
            globalVignette: style.vignette,
          }));
          handleApplyFilterToAll(style.recommendedFilter);
        }}
      />

      <ImagePickerModal
        isOpen={isImagePickerOpen}
        onClose={() => {
          setIsImagePickerOpen(false);
          setTargetSlotForPicker(null);
        }}
        samples={samples}
        onSelectImage={handleSelectSampleImage}
        onUploadFile={handleUploadFile}
      />
    </div>
  );
}
