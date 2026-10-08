import React, { useRef, useState, useEffect } from 'react';
import {
  CanvasSettings,
  DoodleStroke,
  FreestyleLayer,
  GridTemplate,
  PhotoSlot,
} from '../types';
import { getFullSlotFilter } from '../utils/filterEngine';
import { CellQuickEdit } from './CellQuickEdit';
import { ZoomIn, ZoomOut, Maximize2, Trash2, Move } from 'lucide-react';

interface CanvasAreaProps {
  settings: CanvasSettings;
  template: GridTemplate;
  slots: Record<string, PhotoSlot>;
  freestyleLayers: FreestyleLayer[];
  doodleStrokes: DoodleStroke[];
  selectedSlotId: string | null;
  selectedLayerId: string | null;
  onSelectSlot: (slotId: string | null) => void;
  onSelectLayer: (layerId: string | null) => void;
  onUpdateSlot: (slotId: string, updated: Partial<PhotoSlot>) => void;
  onUpdateLayer: (layerId: string, updated: Partial<FreestyleLayer>) => void;
  onDeleteLayer: (layerId: string) => void;
  onImageDropOnSlot: (slotId: string, file: File) => void;
  onReplaceImageTrigger: (slotId: string) => void;
  onOpenDetailedAdjust: () => void;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  settings,
  template,
  slots,
  freestyleLayers,
  selectedSlotId,
  selectedLayerId,
  onSelectSlot,
  onSelectLayer,
  onUpdateSlot,
  onUpdateLayer,
  onDeleteLayer,
  onImageDropOnSlot,
  onReplaceImageTrigger,
  onOpenDetailedAdjust,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [dragOverSlotId, setDragOverSlotId] = useState<string | null>(null);

  // Pan dragging state within cell
  const [isPanningSlot, setIsPanningSlot] = useState<string | null>(null);
  const panStartRef = useRef<{ startX: number; startY: number; initPanX: number; initPanY: number }>({
    startX: 0,
    startY: 0,
    initPanX: 0,
    initPanY: 0,
  });

  // Freestyle layer dragging state
  const [isDraggingLayer, setIsDraggingLayer] = useState<string | null>(null);
  const layerDragStartRef = useRef<{ startX: number; startY: number; initX: number; initY: number }>({
    startX: 0,
    startY: 0,
    initX: 0,
    initY: 0,
  });

  // Calculate container aspect ratio dimensions
  const [ratioW, ratioH] = settings.aspectRatio.split(':').map(Number);
  const aspectRatioValue = ratioW / ratioH;

  // Handle slot panning
  const handleSlotMouseDown = (e: React.MouseEvent, slotId: string) => {
    onSelectSlot(slotId);
    onSelectLayer(null);
    const slot = slots[slotId];
    if (!slot) return;

    setIsPanningSlot(slotId);
    panStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initPanX: slot.panX || 0,
      initPanY: slot.panY || 0,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // 1. Photo panning
    if (isPanningSlot) {
      const slot = slots[isPanningSlot];
      if (!slot) return;
      const dx = e.clientX - panStartRef.current.startX;
      const dy = e.clientY - panStartRef.current.startY;
      const sensitivity = 0.4;
      const newPanX = Math.min(100, Math.max(-100, panStartRef.current.initPanX + dx * sensitivity));
      const newPanY = Math.min(100, Math.max(-100, panStartRef.current.initPanY + dy * sensitivity));
      onUpdateSlot(isPanningSlot, { panX: Math.round(newPanX), panY: Math.round(newPanY) });
    }

    // 2. Freestyle Layer dragging
    if (isDraggingLayer && containerRef.current) {
      const layer = freestyleLayers.find((l) => l.id === isDraggingLayer);
      if (!layer) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dx = ((e.clientX - layerDragStartRef.current.startX) / rect.width) * 100;
      const dy = ((e.clientY - layerDragStartRef.current.startY) / rect.height) * 100;
      const newX = Math.min(90, Math.max(0, layerDragStartRef.current.initX + dx));
      const newY = Math.min(90, Math.max(0, layerDragStartRef.current.initY + dy));
      onUpdateLayer(isDraggingLayer, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsPanningSlot(null);
    setIsDraggingLayer(null);
  };

  // Drag and Drop from File System
  const handleSlotDragOver = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverSlotId(slotId);
  };

  const handleSlotDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverSlotId(null);
  };

  const handleSlotDrop = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverSlotId(null);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageDropOnSlot(slotId, file);
      }
    }
  };

  // Layer drag start
  const handleLayerMouseDown = (e: React.MouseEvent, layerId: string) => {
    e.stopPropagation();
    onSelectLayer(layerId);
    onSelectSlot(null);
    const layer = freestyleLayers.find((l) => l.id === layerId);
    if (!layer) return;
    setIsDraggingLayer(layerId);
    layerDragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: layer.x,
      initY: layer.y,
    };
  };

  // Background style
  const getCanvasBackgroundStyle = () => {
    if (settings.backgroundType === 'gradient') {
      return {
        backgroundImage: `linear-gradient(${settings.backgroundGradient.direction}, ${settings.backgroundGradient.from}, ${settings.backgroundGradient.to})`,
      };
    }
    return { backgroundColor: settings.backgroundColor };
  };

  const activeSlot = selectedSlotId ? slots[selectedSlotId] : null;

  return (
    <div
      className="relative flex-1 bg-neutral-950 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={() => {
        onSelectSlot(null);
        onSelectLayer(null);
      }}
    >
      {/* Canvas Frame Stage */}
      <div
        className="relative max-w-full max-h-full flex items-center justify-center transition-transform duration-200"
        style={{
          transform: `scale(${zoomLevel})`,
        }}
      >
        <div
          ref={containerRef}
          className="relative shadow-2xl overflow-hidden transition-all duration-300"
          style={{
            ...getCanvasBackgroundStyle(),
            width: aspectRatioValue >= 1 ? 'min(820px, 86vw)' : `min(${820 * aspectRatioValue}px, 86vw)`,
            aspectRatio: `${ratioW} / ${ratioH}`,
            padding: `${settings.outerPadding * 0.4}px`,
          }}
        >
          {/* Background Textures */}
          {settings.backgroundTexture === 'grid' && (
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
          )}

          {settings.backgroundTexture === 'paper' && (
            <div
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.4) 100%)',
              }}
            />
          )}

          {/* Grid Slots Container */}
          <div
            className="relative w-full h-full"
            style={{
              gap: `${settings.innerGap * 0.3}px`,
            }}
          >
            {template.slots.map((slotDef) => {
              const slotData = slots[slotDef.id];
              const isSelected = selectedSlotId === slotDef.id;
              const isDragTarget = dragOverSlotId === slotDef.id;

              const slotGapHalf = (settings.innerGap * 0.25);

              return (
                <div
                  key={slotDef.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSlot(slotDef.id);
                    onSelectLayer(null);
                  }}
                  onMouseDown={(e) => handleSlotMouseDown(e, slotDef.id)}
                  onDragOver={(e) => handleSlotDragOver(e, slotDef.id)}
                  onDragLeave={handleSlotDragLeave}
                  onDrop={(e) => handleSlotDrop(e, slotDef.id)}
                  style={{
                    position: 'absolute',
                    left: `calc(${slotDef.x}% + ${slotGapHalf}px)`,
                    top: `calc(${slotDef.y}% + ${slotGapHalf}px)`,
                    width: `calc(${slotDef.width}% - ${slotGapHalf * 2}px)`,
                    height: `calc(${slotDef.height}% - ${slotGapHalf * 2}px)`,
                    borderRadius: `${settings.cellRadius * 0.4}px`,
                  }}
                  className={`group relative overflow-hidden cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-neutral-900 shadow-xl z-20'
                      : 'hover:ring-1 hover:ring-amber-400/60 z-10'
                  } ${isDragTarget ? 'ring-4 ring-amber-400 bg-amber-400/20' : ''}`}
                >
                  {/* Photo Display */}
                  {slotData && slotData.imageUrl ? (
                    <div className="relative w-full h-full overflow-hidden bg-neutral-900">
                      <img
                        src={slotData.imageUrl}
                        alt="Collage photo"
                        referrerPolicy="no-referrer"
                        draggable={false}
                        className="w-full h-full object-cover transition-transform duration-75 select-none"
                        style={{
                          filter: getFullSlotFilter(slotData),
                          transform: `scale(${slotData.zoom || 1}) translate(${slotData.panX || 0}%, ${
                            slotData.panY || 0
                          }%) rotate(${slotData.rotation || 0}deg) scaleX(${
                            slotData.flipH ? -1 : 1
                          }) scaleY(${slotData.flipV ? -1 : 1})`,
                          transformOrigin: 'center center',
                        }}
                      />

                      {/* Vignette Overlay */}
                      {((slotData.adjustments.vignette || 0) + (settings.globalVignette || 0)) > 0 && (
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,${
                              Math.min(
                                0.9,
                                ((slotData.adjustments.vignette || 0) + (settings.globalVignette || 0)) /
                                  100
                              )
                            }) 100%)`,
                          }}
                        />
                      )}

                      {/* Grain Overlay */}
                      {((slotData.adjustments.grain || 0) + (settings.globalGrain || 0)) > 0 && (
                        <div
                          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50"
                          style={{
                            backgroundImage:
                              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                          }}
                        />
                      )}

                      {/* 35mm Film Sprockets Effect */}
                      {settings.frameStyle === 'film35mm' && (
                        <div className="absolute inset-0 pointer-events-none flex justify-between">
                          <div className="w-4 bg-black/90 flex flex-col justify-around items-center py-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <div key={i} className="w-2.5 h-3.5 bg-white/90 rounded-xs" />
                            ))}
                          </div>
                          <div className="w-4 bg-black/90 flex flex-col justify-around items-center py-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <div key={i} className="w-2.5 h-3.5 bg-white/90 rounded-xs" />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Hover Pan Indicator */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-xs text-[10px] text-white px-2 py-0.5 rounded-md flex items-center gap-1 font-mono pointer-events-none">
                        <Move className="w-3 h-3 text-amber-400" />
                        <span>Kéo để căn chỉnh</span>
                      </div>
                    </div>
                  ) : (
                    /* Empty Slot State */
                    <div
                      onClick={() => onReplaceImageTrigger(slotDef.id)}
                      className="w-full h-full flex flex-col items-center justify-center gap-2 bg-neutral-900/60 hover:bg-neutral-800/80 border border-dashed border-neutral-700 hover:border-amber-400/80 transition-colors p-4 text-center"
                    >
                      <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        +
                      </div>
                      <span className="text-xs text-neutral-400 font-medium">Thêm ảnh vào đây</span>
                      <span className="text-[10px] text-neutral-600 font-mono">hoặc kéo thả ảnh</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Global Light Leaks */}
          {settings.lightLeak === 'golden' && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70"
              style={{
                background:
                  'radial-gradient(circle at 10% 10%, rgba(251, 146, 60, 0.6) 0%, rgba(245, 158, 11, 0.3) 40%, transparent 80%)',
              }}
            />
          )}

          {settings.lightLeak === 'rainbow' && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50"
              style={{
                background:
                  'linear-gradient(135deg, rgba(239, 68, 68, 0.4) 0%, rgba(234, 179, 8, 0.3) 30%, rgba(16, 185, 129, 0.25) 50%, rgba(59, 130, 246, 0.3) 75%, rgba(168, 85, 247, 0.4) 100%)',
              }}
            />
          )}

          {settings.lightLeak === 'cyan' && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen opacity-60"
              style={{
                background:
                  'radial-gradient(circle at 90% 90%, rgba(6, 182, 212, 0.6) 0%, rgba(59, 130, 246, 0.2) 60%, transparent 90%)',
              }}
            />
          )}

          {/* Freestyle Movable Layers (Text, Stickers) */}
          {freestyleLayers.map((layer) => {
            const isSelected = selectedLayerId === layer.id;
            return (
              <div
                key={layer.id}
                onMouseDown={(e) => handleLayerMouseDown(e, layer.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectLayer(layer.id);
                  onSelectSlot(null);
                }}
                style={{
                  position: 'absolute',
                  left: `${layer.x}%`,
                  top: `${layer.y}%`,
                  transform: `rotate(${layer.rotation}deg) scale(${layer.scale})`,
                  transformOrigin: 'center center',
                  zIndex: 30 + (layer.zIndex || 0),
                  opacity: layer.opacity,
                }}
                className={`group cursor-move select-none ${
                  isSelected ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black rounded-sm' : ''
                }`}
              >
                {layer.type === 'text' && layer.textData && (
                  <div
                    style={{
                      fontFamily: layer.textData.fontFamily,
                      fontSize: `${layer.textData.fontSize * 0.75}px`,
                      color: layer.textData.color,
                      letterSpacing: `${layer.textData.letterSpacing}px`,
                      fontWeight: layer.textData.fontWeight,
                      fontStyle: layer.textData.isItalic ? 'italic' : 'normal',
                      textAlign: layer.textData.textAlign,
                      backgroundColor: layer.textData.hasBgBox ? layer.textData.bgBoxColor : 'transparent',
                      padding: layer.textData.hasBgBox ? '4px 10px' : '0px',
                      textShadow: layer.textData.hasShadow ? '0 3px 10px rgba(0,0,0,0.8)' : 'none',
                    }}
                    className="whitespace-pre-wrap leading-tight"
                  >
                    {layer.textData.text}
                  </div>
                )}

                {layer.type === 'sticker' && layer.stickerData && (
                  <div
                    className="w-28 md:w-36 text-amber-400"
                    dangerouslySetInnerHTML={{ __html: layer.stickerData.svgContent }}
                  />
                )}

                {/* Layer delete button on active selection */}
                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteLayer(layer.id);
                    }}
                    className="absolute -top-3 -right-3 w-6 h-6 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                    title="Xóa phần tử này"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick floating toolbar for the clicked cell */}
      {activeSlot && (
        <CellQuickEdit
          slot={activeSlot}
          onUpdateSlot={(updated) => onUpdateSlot(activeSlot.id, updated)}
          onReplaceImage={() => onReplaceImageTrigger(activeSlot.id)}
          onClose={() => onSelectSlot(null)}
          onOpenDetailedAdjust={onOpenDetailedAdjust}
        />
      )}

      {/* Floating Canvas Zoom & Viewport Controls (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 p-1.5 rounded-xl shadow-xl">
        <button
          onClick={() => setZoomLevel((z) => Math.max(0.5, +(z - 0.15).toFixed(2)))}
          className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
          title="Thu nhỏ view"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <span className="text-xs font-mono text-neutral-300 w-12 text-center tabular-nums">
          {Math.round(zoomLevel * 100)}%
        </span>

        <button
          onClick={() => setZoomLevel((z) => Math.min(2, +(z + 0.15).toFixed(2)))}
          className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
          title="Phóng to view"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-neutral-800 mx-0.5" />

        <button
          onClick={() => setZoomLevel(1)}
          className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
          title="Vừa màn hình (100%)"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
