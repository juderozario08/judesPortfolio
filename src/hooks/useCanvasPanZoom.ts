import { useState, useRef, useEffect, useCallback } from 'react';
import type { SchemaTable } from '../data/radiusSchema';

interface UseCanvasPanZoomProps {
  canvasWidth: number;
  canvasHeight: number;
  initialZoom?: number;
}

export const useCanvasPanZoom = ({
  canvasWidth,
  canvasHeight,
  initialZoom = 0.65,
}: UseCanvasPanZoomProps) => {
  const [zoom, setZoom] = useState<number>(initialZoom);
  const [isPanning, setIsPanning] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });
  const touchStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  // Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(1.5, Number((prev + 0.1).toFixed(2))));
  const handleZoomOut = () => setZoom((prev) => Math.max(0.2, Number((prev - 0.1).toFixed(2))));
  const handleZoomReset = () => setZoom(initialZoom);

  // Auto-fit schema onto screen
  const handleFitToScreen = useCallback(() => {
    if (!containerRef.current) return;
    const availableWidth = containerRef.current.clientWidth - 40;
    const availableHeight = containerRef.current.clientHeight - 40;
    const scaleX = availableWidth / canvasWidth;
    const scaleY = availableHeight / canvasHeight;
    const fitScale = Math.max(0.2, Math.min(1.0, Math.min(scaleX, scaleY)));
    setZoom(Number(fitScale.toFixed(2)));
    containerRef.current.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }, [canvasWidth, canvasHeight]);

  // Center on a specific table
  const centerOnTable = useCallback(
    (table: SchemaTable) => {
      if (containerRef.current) {
        const targetX = table.x * zoom - containerRef.current.clientWidth / 2 + (table.width * zoom) / 2;
        const targetY = table.y * zoom - containerRef.current.clientHeight / 2 + 150;
        containerRef.current.scrollTo({
          left: Math.max(0, targetX),
          top: Math.max(0, targetY),
          behavior: 'smooth',
        });
      }
    },
    [zoom]
  );

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, select, textarea')) return;
    if (!containerRef.current) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: containerRef.current.scrollLeft,
      scrollTop: containerRef.current.scrollTop,
    };
    setIsPanning(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    if (Math.hypot(dx, dy) > 4) {
      hasDraggedRef.current = true;
    }

    containerRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;
    containerRef.current.scrollTop = dragStartRef.current.scrollTop - dy;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsPanning(false);
  };

  // Touch pan handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, select, textarea')) return;
    if (!containerRef.current || e.touches.length !== 1) return;

    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      scrollLeft: containerRef.current.scrollLeft,
      scrollTop: containerRef.current.scrollTop,
    };
    hasDraggedRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - touchStartRef.current.x;
    const dy = e.touches[0].clientY - touchStartRef.current.y;

    if (Math.hypot(dx, dy) > 4) {
      hasDraggedRef.current = true;
    }

    containerRef.current.scrollLeft = touchStartRef.current.scrollLeft - dx;
    containerRef.current.scrollTop = touchStartRef.current.scrollTop - dy;
  };

  // Non-passive wheel handler to prevent page scroll and smoothly pan/zoom canvas
  const wheelHandlerRef = useRef<((e: WheelEvent) => void) | null>(null);

  useEffect(() => {
    wheelHandlerRef.current = (e: WheelEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const target = e.target as HTMLElement | null;
      // If scrolling inside an inner scrollable list (like a table's column list), allow it
      if (target && target.closest('.overflow-y-auto')) {
        const scrollableChild = target.closest('.overflow-y-auto') as HTMLElement;
        if (scrollableChild !== container) {
          const isAtTop = scrollableChild.scrollTop <= 0 && e.deltaY < 0;
          const isAtBottom =
            scrollableChild.scrollTop + scrollableChild.clientHeight >= scrollableChild.scrollHeight - 1 &&
            e.deltaY > 0;
          if (!isAtTop && !isAtBottom) {
            return;
          }
        }
      }

      // Intercept wheel event so background article does not scroll
      e.preventDefault();
      e.stopPropagation();

      if (e.ctrlKey || e.metaKey) {
        // Pinch-to-zoom / Ctrl+Wheel: exactly 2% per scroll
        const zoomDelta = e.deltaY < 0 ? 0.02 : -0.02;
        setZoom((prev) => Math.max(0.2, Math.min(1.5, Number((prev + zoomDelta).toFixed(2)))));
      } else if (e.shiftKey) {
        // Shift + scroll -> Horizontal scroll
        container.scrollLeft += e.deltaY;
      } else {
        // Standard wheel / Trackpad -> scroll in both X and Y
        container.scrollLeft += e.deltaX;
        container.scrollTop += e.deltaY;
      }
    };
  });

  const containerCallbackRef = useCallback((node: HTMLDivElement | null) => {
    if (containerRef.current && wheelHandlerRef.current) {
      containerRef.current.removeEventListener('wheel', wheelHandlerRef.current);
    }
    containerRef.current = node;
    if (node && wheelHandlerRef.current) {
      node.addEventListener('wheel', wheelHandlerRef.current, { passive: false });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (containerRef.current && wheelHandlerRef.current) {
        containerRef.current.removeEventListener('wheel', wheelHandlerRef.current);
      }
    };
  }, []);

  return {
    zoom,
    setZoom,
    isPanning,
    hasDraggedRef,
    containerRef,
    containerCallbackRef,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
    handleFitToScreen,
    centerOnTable,
    panHandlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleMouseUp,
    },
  };
};
