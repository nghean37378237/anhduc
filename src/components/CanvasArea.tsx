import React, { useRef, useState } from 'react';
import {
  CanvasSettings,
  DoodleStroke,
  FreestyleLayer,
  GridTemplate,
  PhotoSlot,
} from '../types';
import { getFullSlotFilter } from '../utils/filterEngine';
import { CellQuickEdit } from './CellQuickEdit';
import { ZoomIn, ZoomOut, Maximize2, Trash2, Move, Phone, MapPin, Edit3 } from 'lucide-react';

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
  onOpenBannerCustomizer?: () => void;
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
  onOpenBannerCustomizer,
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

  // Has bottom commercial banner?
  const isBannerMode = template.hasFooterBanner || settings.footerBanner.enabled;
  const bannerHeightPct = isBannerMode ? settings.footerBanner.heightPercent : 0;
  const topPhotosHeightPct = isBannerMode ? 100 - bannerHeightPct : 100;

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
      className="relative flex-1 bg-neutral-950 flex flex-col items-center justify-center p-3 md:p-6 overflow-hidden select-none"
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
            width: aspectRatioValue >= 1 ? 'min(760px, 86vw)' : `min(${760 * aspectRatioValue}px, 86vw)`,
            aspectRatio: `${ratioW} / ${ratioH}`,
            padding: isBannerMode ? '0px' : `${settings.outerPadding * 0.4}px`,
          }}
        >
          {/* Top Photos Container */}
          <div
            className="relative w-full"
            style={{
              height: `${topPhotosHeightPct}%`,
            }}
          >
            {template.slots.map((slotDef) => {
              const slotData = slots[slotDef.id];
              const isSelected = selectedSlotId === slotDef.id;
              const isDragTarget = dragOverSlotId === slotDef.id;

              // Scale slot coordinate within top area
              const slotGapHalf = settings.innerGap * 0.2;
              const adjustedHeight = isBannerMode
                ? (slotDef.height / 68) * 100 // normalized within top area
                : slotDef.height;
              const adjustedY = isBannerMode
                ? (slotDef.y / 68) * 100
                : slotDef.y;

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
                    top: `calc(${adjustedY}% + ${slotGapHalf}px)`,
                    width: `calc(${slotDef.width}% - ${slotGapHalf * 2}px)`,
                    height: `calc(${adjustedHeight}% - ${slotGapHalf * 2}px)`,
                    borderRadius: isBannerMode ? 0 : `${settings.cellRadius * 0.4}px`,
                  }}
                  className={`group relative overflow-hidden cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-neutral-900 shadow-xl z-20'
                      : 'hover:ring-1 hover:ring-amber-400/60 z-10'
                  } ${isDragTarget ? 'ring-4 ring-amber-400 bg-amber-400/20' : ''}`}
                >
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

                      {/* Hover Pan Indicator */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-xs text-[10px] text-white px-2 py-0.5 rounded-md flex items-center gap-1 font-mono pointer-events-none">
                        <Move className="w-3 h-3 text-amber-400" />
                        <span>Kéo để căn ảnh</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => onReplaceImageTrigger(slotDef.id)}
                      className="w-full h-full flex flex-col items-center justify-center gap-2 bg-neutral-900/60 hover:bg-neutral-800/80 border border-dashed border-neutral-700 hover:border-amber-400/80 transition-colors p-4 text-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        +
                      </div>
                      <span className="text-xs text-neutral-400 font-medium">Thêm ảnh vào đây</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Commercial Banner (phần dưới viết chữ như mẫu người dùng gửi) */}
          {isBannerMode && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenBannerCustomizer) onOpenBannerCustomizer();
              }}
              style={{
                height: `${bannerHeightPct}%`,
                backgroundColor: settings.footerBanner.backgroundColor,
              }}
              className="relative w-full overflow-hidden flex flex-col justify-between p-3 sm:p-5 select-none cursor-pointer border-t border-black/10 group transition-all"
            >
              {/* Dot Grid Pattern Texture (y như mẫu ảnh 37Car của khách) */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(0,0,0,0.4) 1px, transparent 1px)',
                  backgroundSize: '10px 10px',
                }}
              />

              {/* Slanted Ribbon Badge tab sitting at the top left edge */}
              {settings.footerBanner.badge.enabled && settings.footerBanner.badge.text && (
                <div
                  style={{
                    backgroundColor: settings.footerBanner.badge.bgColor,
                    color: settings.footerBanner.badge.textColor,
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 100%, 0 100%)',
                  }}
                  className="absolute -top-3 left-0 px-4 py-1.5 shadow-md flex items-center justify-center z-10"
                >
                  <span className="text-xs sm:text-sm font-black tracking-wider uppercase pr-2 font-display">
                    {settings.footerBanner.badge.text}
                  </span>
                </div>
              )}

              {/* Top Text Content: Headline & Subheadline */}
              <div className="relative z-10 pt-2 sm:pt-3">
                <div
                  style={{
                    color: settings.footerBanner.headline.color,
                  }}
                  className="text-base sm:text-xl font-black tracking-tight leading-tight uppercase font-display"
                >
                  {settings.footerBanner.headline.text}
                </div>

                <div
                  style={{
                    color: settings.footerBanner.subheadline.color,
                  }}
                  className="text-xs sm:text-sm font-bold tracking-wide mt-0.5 leading-snug"
                >
                  {settings.footerBanner.subheadline.text}
                </div>
              </div>

              {/* Details & Commitments Specs */}
              {settings.footerBanner.details.text && (
                <div
                  style={{
                    color: settings.footerBanner.details.color,
                  }}
                  className="relative z-10 text-[10px] sm:text-xs leading-relaxed my-1 whitespace-pre-wrap font-medium"
                >
                  {settings.footerBanner.details.text}
                </div>
              )}

              {/* Bottom Row: Hotline & Address */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-black/10 text-[10px] sm:text-xs font-semibold">
                <div
                  style={{ color: settings.footerBanner.hotline.color }}
                  className="flex items-center gap-1 font-bold"
                >
                  <Phone className="w-3 h-3 fill-current" />
                  <span>{settings.footerBanner.hotline.text}</span>
                </div>

                <div
                  style={{ color: settings.footerBanner.address.color }}
                  className="flex items-center gap-1 font-medium"
                >
                  <MapPin className="w-3 h-3 text-amber-700" />
                  <span>{settings.footerBanner.address.text}</span>
                </div>
              </div>

              {/* Hover Edit Hint */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 font-mono">
                <Edit3 className="w-3 h-3 text-amber-400" />
                <span>Click để sửa chữ banner</span>
              </div>
            </div>
          )}

          {/* Freestyle Movable Layers */}
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
