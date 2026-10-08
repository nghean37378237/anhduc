import React, { useState, useEffect, useCallback } from 'react';
import {
  AspectRatioId,
  CanvasSettings,
  DoodleStroke,
  FilterPresetId,
  FreestyleLayer,
  GridTemplate,
  PhotoAdjustments,
  PhotoSlot,
} from './types';
import {
  DEFAULT_ADJUSTMENTS,
  GRID_TEMPLATES,
  STICKER_LIBRARY,
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
import { ExportModal } from './components/ExportModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { ImagePickerModal } from './components/ImagePickerModal';

export default function App() {
  const [samples, setSamples] = useState<SamplePhoto[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<GridTemplate>(GRID_TEMPLATES[7]); // quad-grid
  const [activeTab, setActiveTab] = useState<ActiveTab>('layout');

  const [settings, setSettings] = useState<CanvasSettings>({
    aspectRatio: '1:1',
    outerPadding: 16,
    innerGap: 12,
    cellRadius: 16,
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
    globalGrain: 14,
    globalVignette: 15,
    globalFilter: 'none',
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

    GRID_TEMPLATES[7].slots.forEach((s, idx) => {
      initialSlots[s.id] = {
        id: s.id,
        imageUrl: sampleUrls[idx % sampleUrls.length] || '',
        zoom: 1,
        panX: 0,
        panY: 0,
        rotation: 0,
        flipH: false,
        flipV: false,
        filterId: idx === 0 ? 'kodak-portra' : idx === 1 ? 'golden-hour' : 'vintage-70s',
        adjustments: { ...DEFAULT_ADJUSTMENTS },
      };
    });

    setSlots(initialSlots);

    // Initial decorative aesthetic typography layer
    setFreestyleLayers([
      {
        id: 'init-text-1',
        type: 'text',
        x: 32,
        y: 84,
        width: 36,
        height: 8,
        rotation: 0,
        scale: 1,
        zIndex: 5,
        opacity: 0.95,
        textData: {
          text: 'MOMENTS · COLLECTED',
          fontFamily: "'Syne', sans-serif",
          fontSize: 22,
          color: '#ffffff',
          letterSpacing: 4,
          lineHeight: 1.2,
          textAlign: 'center',
          fontWeight: '700',
          isItalic: false,
          hasBgBox: true,
          bgBoxColor: 'rgba(9, 9, 11, 0.85)',
          hasShadow: true,
        },
      },
    ]);
  }, []);

  // Update template and preserve images
  const handleSelectTemplate = (newTemplate: GridTemplate) => {
    setCurrentTemplate(newTemplate);

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

  // Slot adjustments
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

  // Filter application
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

  // Freestyle layers (Typography, Stickers)
  const handleAddTextLayer = (textConfig: any) => {
    const newLayer: FreestyleLayer = {
      id: `text-${Date.now()}`,
      type: 'text',
      x: 30,
      y: 45,
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
      x: 40,
      y: 35,
      width: 25,
      height: 12,
      rotation: (Math.random() - 0.5) * 15,
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
          // Find first slot or replace slot 1
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
      outerPadding: 16,
      innerGap: 12,
      cellRadius: 16,
      backgroundColor: '#09090b',
      backgroundType: 'solid',
      frameStyle: 'none',
      lightLeak: 'none',
      globalGrain: 14,
      globalVignette: 15,
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
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-neutral-950 text-neutral-100 font-sans">
      {/* Top Bar with 3-Zone Contract */}
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
      />

      {/* Aspect Ratio Ribbon Bar */}
      <AspectRatioBar
        currentRatio={settings.aspectRatio}
        onChangeRatio={(ratio) => setSettings((s) => ({ ...s, aspectRatio: ratio }))}
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
        />

        {/* Right Sidebar Tool Panel */}
        <aside className="w-80 md:w-96 bg-neutral-900 border-l border-neutral-800 flex flex-col shrink-0 overflow-y-auto z-20">
          {activeTab === 'layout' && (
            <LayoutPicker
              currentTemplate={currentTemplate}
              onSelectTemplate={handleSelectTemplate}
              settings={settings}
              onUpdateSettings={(up) => setSettings((s) => ({ ...s, ...up }))}
            />
          )}

          {activeTab === 'filters' && (
            <FilterPanel
              selectedSlot={activeSelectedSlot}
              onApplyFilterToSlot={handleApplyFilterToSlot}
              onApplyFilterToAll={handleApplyFilterToAll}
              settings={settings}
              onUpdateSettings={(up) => setSettings((s) => ({ ...s, ...up }))}
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
            />
          )}

          {activeTab === 'stickers' && (
            <StickerPanel onAddSticker={handleAddSticker} />
          )}

          {activeTab === 'ai' && (
            <div className="p-6 text-center space-y-4">
              <h3 className="text-sm font-bold text-white">AI Studio Assistant</h3>
              <p className="text-xs text-neutral-400">
                Sử dụng trí tuệ nhân tạo Gemini để sáng tạo câu từ nghệ thuật, trích dẫn thơ hoặc tự động đề xuất phong cách bố cục và màu sắc.
              </p>
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-xl text-xs transition-colors"
              >
                Mở Cửa Sổ Trợ Lý AI
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
