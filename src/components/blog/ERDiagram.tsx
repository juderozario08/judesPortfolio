import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Search,
  ArrowRight,
  Sparkles,
  X,
  Key,
  Focus,
  Move,
} from 'lucide-react';
import {
  RADIUS_SCHEMA_TABLES,
  RADIUS_SCHEMA_RELATIONS,
  SCHEMA_DOMAINS,
  type SchemaRelation,
  type SchemaTable,
} from '../../data/radiusSchema';

const CANVAS_WIDTH = 3400;
const CANVAS_HEIGHT = 2400;

interface ERDiagramProps {
  initialDomain?: string;
}

export const ERDiagram = ({ initialDomain = 'all' }: ERDiagramProps) => {
  const [selectedDomain, setSelectedDomain] = useState<string>(initialDomain);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [hoveredTableId, setHoveredTableId] = useState<string | null>(null);
  const [hoveredRelationId, setHoveredRelationId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'canvas' | 'explorer'>('canvas');
  const [zoom, setZoom] = useState<number>(0.65);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Drag-to-pan state & refs
  const containerRef = useRef<HTMLDivElement>(null);
  const inlineContainerRef = useRef<HTMLDivElement>(null);
  const [originRect, setOriginRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });
  const [isPanning, setIsPanning] = useState(false);

  // Active highlighted table is either hovered or selected
  const activeTableId = hoveredTableId || selectedTableId;

  // Escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Lock body scroll when fullscreen modal is active
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  // Filter tables by domain and search query
  const filteredTables = useMemo(() => {
    return RADIUS_SCHEMA_TABLES.filter((table) => {
      const matchesDomain = selectedDomain === 'all' || table.domain === selectedDomain;
      const matchesSearch =
        searchQuery.trim() === '' ||
        table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        table.columns.some((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesDomain && matchesSearch;
    });
  }, [selectedDomain, searchQuery]);

  // Set of related table IDs for highlighting
  const relatedTableIds = useMemo(() => {
    if (!activeTableId) return new Set<string>();
    const related = new Set<string>([activeTableId]);
    RADIUS_SCHEMA_RELATIONS.forEach((rel) => {
      if (rel.fromTable === activeTableId) related.add(rel.toTable);
      if (rel.toTable === activeTableId) related.add(rel.fromTable);
    });
    return related;
  }, [activeTableId]);

  // Active relations connected to current active table
  const activeRelations = useMemo(() => {
    if (!activeTableId) return new Set<string>();
    const rels = new Set<string>();
    RADIUS_SCHEMA_RELATIONS.forEach((rel) => {
      if (rel.fromTable === activeTableId || rel.toTable === activeTableId) {
        rels.add(rel.id);
      }
    });
    return rels;
  }, [activeTableId]);

  // Handle zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(1.5, Number((prev + 0.1).toFixed(2))));
  const handleZoomOut = () => setZoom((prev) => Math.max(0.2, Number((prev - 0.1).toFixed(2))));
  const handleZoomReset = () => setZoom(0.65);

  // Auto-fit the entire 32-table schema onto screen
  const handleFitToScreen = () => {
    if (!containerRef.current) return;
    const availableWidth = containerRef.current.clientWidth - 40;
    const availableHeight = containerRef.current.clientHeight - 40;
    const scaleX = availableWidth / CANVAS_WIDTH;
    const scaleY = availableHeight / CANVAS_HEIGHT;
    const fitScale = Math.max(0.2, Math.min(1.0, Math.min(scaleX, scaleY)));
    setZoom(Number(fitScale.toFixed(2)));
    containerRef.current.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  // Center on a specific table
  const centerOnTable = (table: SchemaTable) => {
    setSelectedTableId(table.id);
    if (containerRef.current && viewMode === 'canvas') {
      const targetX = table.x * zoom - containerRef.current.clientWidth / 2 + (table.width * zoom) / 2;
      const targetY = table.y * zoom - containerRef.current.clientHeight / 2 + 150;
      containerRef.current.scrollTo({
        left: Math.max(0, targetX),
        top: Math.max(0, targetY),
        behavior: 'smooth',
      });
    }
  };

  // Toggle fullscreen with animation origin detection
  const handleToggleFullscreen = () => {
    if (!isFullscreen) {
      if (inlineContainerRef.current) {
        const rect = inlineContainerRef.current.getBoundingClientRect();
        setOriginRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
      setIsFullscreen(true);
      setTimeout(() => {
        handleFitToScreen();
      }, 350);
    } else {
      setIsFullscreen(false);
    }
  };

  // Canvas Pan Drag Event Handlers
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

  // Touch handlers for mobile pan
  const touchStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });
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

  // Calculate clean SVG Bézier curve paths between tables
  const calculatePath = (rel: SchemaRelation) => {
    const fromTable = RADIUS_SCHEMA_TABLES.find((t) => t.id === rel.fromTable);
    const toTable = RADIUS_SCHEMA_TABLES.find((t) => t.id === rel.toTable);
    if (!fromTable || !toTable) return null;

    // Self-referential curve (e.g. categories -> categories)
    if (rel.fromTable === rel.toTable) {
      const loopX = fromTable.x + fromTable.width;
      const loopY = fromTable.y + 40;
      return `M ${loopX} ${loopY} C ${loopX + 60} ${loopY - 30}, ${loopX + 60} ${loopY + 50}, ${loopX} ${loopY + 25}`;
    }

    const fromCenterX = fromTable.x + fromTable.width / 2;
    const toCenterX = toTable.x + toTable.width / 2;

    // If tables are vertically aligned in the same column, route an arched side curve
    if (Math.abs(fromCenterX - toCenterX) < 60) {
      const fromX = fromTable.x + fromTable.width;
      const toX = toTable.x + toTable.width;
      const fromY = fromTable.y + 45;
      const toY = toTable.y + 45;
      const curveOffset = 35 + Math.abs(toY - fromY) * 0.12;
      return `M ${fromX} ${fromY} C ${fromX + curveOffset} ${fromY}, ${toX + curveOffset} ${toY}, ${toX} ${toY}`;
    }

    let fromX: number, toX: number;
    if (fromCenterX < toCenterX) {
      fromX = fromTable.x + fromTable.width;
      toX = toTable.x;
    } else {
      fromX = fromTable.x;
      toX = toTable.x + toTable.width;
    }

    const fromY = fromTable.y + 45;
    const toY = toTable.y + 45;

    const dx = Math.abs(toX - fromX) * 0.45;
    const cp1X = fromCenterX < toCenterX ? fromX + dx : fromX - dx;
    const cp1Y = fromY;
    const cp2X = fromCenterX < toCenterX ? toX - dx : toX + dx;
    const cp2Y = toY;

    return `M ${fromX} ${fromY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${toX} ${toY}`;
  };

  const selectedTableObj = useMemo(() => {
    if (!selectedTableId) return RADIUS_SCHEMA_TABLES[0];
    return RADIUS_SCHEMA_TABLES.find((t) => t.id === selectedTableId) || RADIUS_SCHEMA_TABLES[0];
  }, [selectedTableId]);

  // Color helper for domain badges
  const getDomainColor = (domain: string) => {
    switch (domain) {
      case 'core':
        return 'bg-tokyo-purple';
      case 'catalog':
        return 'bg-tokyo-cyan';
      case 'inventory':
        return 'bg-emerald-400';
      case 'sales':
        return 'bg-[#ffbd2e]';
      case 'purchasing':
        return 'bg-[#7aa2f7]';
      default:
        return 'bg-[#ff5f56]';
    }
  };

  // Render diagram header and body content
  const renderDiagramContent = (inFullscreenModal: boolean) => (
    <div className={`w-full flex flex-col bg-[#16161e] select-none ${inFullscreenModal ? 'h-full' : ''}`}>
      {/* Top Header Controls Bar */}
      <div className="bg-tokyo-base border-b border-tokyo-surface px-3 sm:px-5 py-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shrink-0">
        {/* Title & Domain Selector */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 text-tokyo-purple">
            <Database size={18} className="text-tokyo-purple shrink-0" />
            <div>
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-tokyo-fg block">
                Radius Relational Database Topology
              </span>
              <span className="text-[10px] font-mono text-tokyo-muted">
                32 Entities • 66 Foreign Keys • PostgreSQL 16
              </span>
            </div>
          </div>

          <span className="text-tokyo-surface hidden lg:inline">•</span>

          {/* View Mode Switch */}
          <div className="inline-flex rounded-lg p-0.5 bg-tokyo-surface border border-tokyo-surface text-[11px] font-mono">
            <button
              onClick={() => setViewMode('canvas')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === 'canvas'
                  ? 'bg-tokyo-purple text-tokyo-base font-bold shadow-sm'
                  : 'text-tokyo-muted hover:text-tokyo-fg'
              }`}
            >
              <Layers size={13} />
              <span>Canvas Graph</span>
            </button>
            <button
              onClick={() => setViewMode('explorer')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === 'explorer'
                  ? 'bg-tokyo-purple text-tokyo-base font-bold shadow-sm'
                  : 'text-tokyo-muted hover:text-tokyo-fg'
              }`}
            >
              <Search size={13} />
              <span>Table Inspector</span>
            </button>
          </div>
        </div>

        {/* Right Tools: Zoom, Auto-Fit, Fullscreen, Raw Diagram */}
        <div className="flex items-center justify-between md:justify-end gap-2 text-xs font-mono flex-wrap">
          {viewMode === 'canvas' && (
            <div className="flex items-center gap-1 bg-tokyo-surface/80 rounded-lg p-1 border border-tokyo-surface">
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded hover:bg-tokyo-base text-tokyo-muted hover:text-tokyo-cyan transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={14} />
              </button>
              <span className="px-1 text-[11px] text-tokyo-muted font-mono w-11 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded hover:bg-tokyo-base text-tokyo-muted hover:text-tokyo-cyan transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={14} />
              </button>
              <button
                onClick={handleFitToScreen}
                className="p-1.5 rounded hover:bg-tokyo-base text-tokyo-muted hover:text-tokyo-cyan transition-colors"
                title="Fit All Tables to Screen"
              >
                <Focus size={14} />
              </button>
              <button
                onClick={handleZoomReset}
                className="p-1.5 rounded hover:bg-tokyo-base text-tokyo-muted hover:text-tokyo-purple transition-colors"
                title="Reset Zoom (65%)"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          )}

          <a
            href="/assets/images/radius-er-diagram.png"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tokyo-surface/80 hover:bg-tokyo-base border border-tokyo-surface text-tokyo-muted hover:text-tokyo-cyan transition-colors text-xs font-mono"
            title="Open Original Full-Resolution Static Diagram"
          >
            <span>Static PNG</span>
          </a>

          <button
            onClick={handleToggleFullscreen}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors font-semibold ${
              inFullscreenModal
                ? 'bg-tokyo-purple text-tokyo-base border-tokyo-purple shadow-[0_0_15px_rgba(187,154,247,0.4)] hover:bg-tokyo-purple/90'
                : 'bg-tokyo-surface/80 hover:bg-tokyo-base border-tokyo-surface text-tokyo-muted hover:text-tokyo-purple'
            }`}
            title={inFullscreenModal ? 'Exit Fullscreen (Esc)' : 'Maximize Full Interactive Graph'}
          >
            {inFullscreenModal ? (
              <>
                <Minimize2 size={14} />
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 size={14} />
                <span>Maximize Graph</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Domain Filters Strip */}
      <div className="bg-tokyo-base/70 border-b border-tokyo-surface px-3 sm:px-5 py-2 flex items-center justify-between gap-2 overflow-x-auto custom-scrollbar shrink-0">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] font-mono text-tokyo-muted uppercase tracking-wider mr-1 hidden sm:inline">
            Domain:
          </span>
          {SCHEMA_DOMAINS.map((domain) => (
            <button
              key={domain.id}
              onClick={() => setSelectedDomain(domain.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all capitalize shrink-0 ${
                selectedDomain === domain.id
                  ? 'bg-tokyo-purple text-tokyo-base font-bold shadow-sm'
                  : 'bg-tokyo-surface/50 text-tokyo-muted hover:text-tokyo-fg hover:bg-tokyo-surface border border-tokyo-surface/60'
              }`}
            >
              {domain.label}
            </button>
          ))}
        </div>

        {/* Legend Hint */}
        <div className="hidden xl:flex items-center gap-4 text-[10px] font-mono text-tokyo-muted shrink-0">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> PK Primary Key
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-tokyo-purple" /> FK Foreign Key
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-tokyo-cyan" /> GEN Computed
          </span>
          {inFullscreenModal && <span className="text-tokyo-muted/70">(Press Esc to exit)</span>}
        </div>
      </div>

      {/* Main Content Area: Canvas Mode vs Explorer Mode */}
      {viewMode === 'canvas' ? (
        <div
          ref={containerCallbackRef}
          tabIndex={0}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{
            overscrollBehavior: 'contain',
            backgroundImage: `radial-gradient(rgba(122, 162, 247, 0.25) ${Math.max(1, 1.2 * zoom)}px, transparent ${Math.max(1, 1.2 * zoom)}px)`,
            backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
            backgroundAttachment: 'local',
          }}
          className={`relative w-full overflow-auto bg-[#13141c] custom-scrollbar select-none focus:outline-none ${
            isPanning ? 'cursor-grabbing' : 'cursor-grab'
          } ${
            inFullscreenModal
              ? 'flex-1 min-h-0 h-[calc(100vh-115px)]'
              : 'h-[300px] sm:h-[380px] max-h-[380px]'
          }`}
        >

          {/* Scalable Container holding SVG lines and all 32 Tables */}
          <div
            className="relative transition-transform duration-75 origin-top-left p-10"
            style={{
              transform: `scale(${zoom})`,
              width: `${CANVAS_WIDTH}px`,
              height: `${CANVAS_HEIGHT}px`,
            }}
          >
            {/* SVG Relationship Connectors */}
            <svg
              className="absolute inset-0 pointer-events-none w-full h-full z-0"
              style={{ width: `${CANVAS_WIDTH}px`, height: `${CANVAS_HEIGHT}px` }}
            >
              <defs>
                <linearGradient id="rel-active-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#bb9af7" />
                  <stop offset="100%" stopColor="#7dcfff" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="glow" />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>
              </defs>

              {RADIUS_SCHEMA_RELATIONS.map((rel) => {
                const isConnected = activeRelations.has(rel.id);
                const isHovered = hoveredRelationId === rel.id;
                const pathData = calculatePath(rel);
                if (!pathData) return null;

                return (
                  <g key={rel.id} className="pointer-events-auto">
                    {/* Wider invisible path for comfortable hover detection */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="transparent"
                      strokeWidth={14}
                      onMouseEnter={() => setHoveredRelationId(rel.id)}
                      onMouseLeave={() => setHoveredRelationId(null)}
                      className="cursor-pointer"
                    />

                    {/* Visible line */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={
                        isConnected || isHovered
                          ? 'url(#rel-active-gradient)'
                          : activeTableId
                          ? '#232433'
                          : '#3b4261'
                      }
                      strokeWidth={isConnected || isHovered ? 2.5 : 1.2}
                      strokeDasharray={isConnected ? 'none' : '5 4'}
                      filter={isConnected || isHovered ? 'url(#glow)' : undefined}
                      className="transition-all duration-150"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Table Cards positioned across the coordinate plane */}
            {RADIUS_SCHEMA_TABLES.map((table) => {
              const isSelected = selectedTableId === table.id;
              const isHovered = hoveredTableId === table.id;
              const isRelated = relatedTableIds.has(table.id);
              const matchesFilter = selectedDomain === 'all' || table.domain === selectedDomain;

              // Opacity logic for focus filtering
              const opacity =
                matchesFilter && (!activeTableId || isRelated)
                  ? 1
                  : !matchesFilter
                  ? 0.18
                  : 0.28;

              return (
                <div
                  key={table.id}
                  style={{
                    position: 'absolute',
                    left: `${table.x}px`,
                    top: `${table.y}px`,
                    width: `${table.width}px`,
                    opacity,
                  }}
                  onMouseEnter={() => setHoveredTableId(table.id)}
                  onMouseLeave={() => setHoveredTableId(null)}
                  onClick={() => {
                    if (hasDraggedRef.current) return;
                    setSelectedTableId(isSelected ? null : table.id);
                  }}
                  className={`rounded-xl border transition-all duration-150 cursor-pointer shadow-xl select-none z-10 ${
                    isSelected
                      ? 'bg-tokyo-surface border-tokyo-purple ring-2 ring-tokyo-purple/60 shadow-[0_0_28px_rgba(187,154,247,0.35)] scale-[1.02]'
                      : isHovered
                      ? 'bg-tokyo-surface border-tokyo-cyan shadow-[0_0_20px_rgba(125,207,255,0.25)]'
                      : isRelated && activeTableId
                      ? 'bg-tokyo-surface border-tokyo-blue/70 ring-1 ring-tokyo-blue/40'
                      : 'bg-tokyo-surface/90 border-tokyo-surface/90 hover:border-tokyo-purple/40'
                  }`}
                >
                  {/* Table Header */}
                  <div className="p-2.5 bg-tokyo-base rounded-t-xl border-b border-tokyo-surface flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${getDomainColor(table.domain)}`} />
                      <span className="font-mono text-xs font-bold text-tokyo-fg truncate">
                        {table.name}
                      </span>
                    </div>

                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-tokyo-surface text-tokyo-muted border border-tokyo-surface shrink-0">
                      {table.domain}
                    </span>
                  </div>

                  {/* Columns List */}
                  <div className="p-2 space-y-1 font-mono text-[11px] max-h-56 overflow-y-auto custom-scrollbar">
                    {table.columns.map((col, cIdx) => (
                      <div
                        key={cIdx}
                        className="flex items-center justify-between gap-1.5 py-0.5 px-1 rounded hover:bg-tokyo-base/60 transition-colors"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          {col.isPrimaryKey ? (
                            <span title="Primary Key">
                              <Key size={10} className="text-emerald-400 shrink-0" />
                            </span>
                          ) : col.isForeignKey ? (
                            <span className="text-[8px] font-bold px-1 rounded bg-tokyo-purple/20 text-tokyo-purple shrink-0">
                              FK
                            </span>
                          ) : col.isGenerated ? (
                            <span className="text-[8px] font-bold px-1 rounded bg-tokyo-cyan/20 text-tokyo-cyan shrink-0">
                              GEN
                            </span>
                          ) : (
                            <span className="w-2.5" />
                          )}
                          <span
                            className={`truncate ${
                              col.isPrimaryKey
                                ? 'text-emerald-300 font-semibold'
                                : col.isForeignKey
                                ? 'text-tokyo-purple font-semibold'
                                : 'text-tokyo-fg/90'
                            }`}
                          >
                            {col.name}
                          </span>
                        </div>

                        <span className="text-[10px] text-tokyo-muted/70 shrink-0">
                          {col.type}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Card Footer Indicator */}
                  {isSelected && (
                    <div className="px-2 py-1 bg-tokyo-purple/10 border-t border-tokyo-purple/30 text-[9px] font-mono text-tokyo-purple text-center rounded-b-xl flex items-center justify-center gap-1">
                      <Sparkles size={10} />
                      <span>{table.columns.length} columns • Relational focus</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Floating Instructions Pill */}
          <div className="absolute bottom-4 left-4 bg-tokyo-base/95 backdrop-blur-md border border-tokyo-surface rounded-xl px-3.5 py-2 text-xs font-mono text-tokyo-muted pointer-events-none hidden sm:flex items-center gap-2.5 shadow-xl">
            <Move size={14} className="text-tokyo-cyan shrink-0" />
            <span>Drag canvas or scroll wheel to navigate. Hold Ctrl to zoom. Click tables to inspect.</span>
          </div>
        </div>
      ) : (
        /* Schema Explorer Mode: Split-view table and column inspector */
        <div
          className={`flex flex-col md:grid md:grid-cols-3 gap-0 bg-[#13141c] ${
            inFullscreenModal
              ? 'flex-1 min-h-0 h-[calc(100vh-115px)]'
              : 'h-[300px] sm:h-[380px] max-h-[380px]'
          }`}
        >
          {/* Left Table Selector */}
          <div className="border-b md:border-b-0 md:border-r border-tokyo-surface p-3 sm:p-4 space-y-3 max-h-56 md:max-h-none overflow-y-auto custom-scrollbar shrink-0">
            {/* Search Input */}
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-tokyo-muted" />
              <input
                type="text"
                placeholder="Search 32 tables or columns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-tokyo-surface border border-tokyo-surface text-xs font-mono text-tokyo-fg placeholder:text-tokyo-muted/50 focus:outline-none focus:border-tokyo-purple"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-tokyo-muted hover:text-tokyo-fg"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="space-y-1">
              {filteredTables.map((table) => {
                const isSelected = selectedTableObj.id === table.id;
                return (
                  <button
                    key={table.id}
                    onClick={() => centerOnTable(table)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-tokyo-purple/20 text-tokyo-cyan border border-tokyo-purple/40 font-medium'
                        : 'text-tokyo-muted hover:text-tokyo-fg hover:bg-tokyo-surface/70 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${getDomainColor(table.domain)}`} />
                      <span className="font-mono text-xs font-bold truncate text-tokyo-fg">
                        {table.name}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-tokyo-muted shrink-0">
                      {table.columns.length} cols
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Table Deep-Dive Inspector */}
          <div className="md:col-span-2 p-3 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1 custom-scrollbar">
            {/* Table Heading & Domain info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-tokyo-surface pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-mono text-base sm:text-lg font-bold text-tokyo-purple">
                    {selectedTableObj.name}
                  </h3>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-tokyo-surface border border-tokyo-surface text-tokyo-cyan">
                    {selectedTableObj.domain} domain
                  </span>
                </div>
                <p className="text-xs font-sans text-tokyo-muted mt-1 leading-relaxed">
                  {selectedTableObj.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-tokyo-muted shrink-0">
                <button
                  onClick={() => {
                    setViewMode('canvas');
                    setTimeout(() => centerOnTable(selectedTableObj), 50);
                  }}
                  className="px-2.5 py-1 rounded bg-tokyo-surface hover:bg-tokyo-base border border-tokyo-surface text-tokyo-cyan transition-colors flex items-center gap-1"
                >
                  <Layers size={12} />
                  <span>View in Graph</span>
                </button>
                <span>{selectedTableObj.columns.length} columns</span>
              </div>
            </div>

            {/* Column Schema Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-tokyo-fg flex items-center gap-2">
                <span>Field Definitions & Constraints</span>
              </h4>

              <div className="rounded-xl border border-tokyo-surface overflow-hidden bg-tokyo-surface/40">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-tokyo-base text-[10px] text-tokyo-muted uppercase tracking-wider border-b border-tokyo-surface">
                    <tr>
                      <th className="p-2.5 sm:p-3">Column</th>
                      <th className="p-2.5 sm:p-3">Type</th>
                      <th className="p-2.5 sm:p-3">Constraints</th>
                      <th className="p-2.5 sm:p-3 hidden sm:table-cell">References / Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-tokyo-surface/60">
                    {selectedTableObj.columns.map((col, idx) => (
                      <tr key={idx} className="hover:bg-tokyo-surface/60 transition-colors">
                        <td className="p-2.5 sm:p-3 font-semibold">
                          <div className="flex items-center gap-1.5">
                            {col.isPrimaryKey && (
                              <span title="Primary Key">
                                <Key size={12} className="text-emerald-400 shrink-0" />
                              </span>
                            )}
                            <span
                              className={
                                col.isPrimaryKey
                                  ? 'text-emerald-300'
                                  : col.isForeignKey
                                  ? 'text-tokyo-purple'
                                  : 'text-tokyo-fg'
                              }
                            >
                              {col.name}
                            </span>
                          </div>
                        </td>

                        <td className="p-2.5 sm:p-3 text-tokyo-cyan font-mono text-[11px]">
                          {col.type}
                        </td>

                        <td className="p-2.5 sm:p-3">
                          <div className="flex flex-wrap gap-1">
                            {col.isPrimaryKey && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                PRIMARY KEY
                              </span>
                            )}
                            {col.isUnique && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-tokyo-blue/10 text-tokyo-blue border border-tokyo-blue/20">
                                UNIQUE
                              </span>
                            )}
                            {col.isForeignKey && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-tokyo-purple/10 text-tokyo-purple border border-tokyo-purple/20">
                                FOREIGN KEY
                              </span>
                            )}
                            {col.isGenerated && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-tokyo-cyan/10 text-tokyo-cyan border border-tokyo-cyan/20">
                                GENERATED
                              </span>
                            )}
                            {col.isNullable && !col.isPrimaryKey && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-tokyo-base text-tokyo-muted/70 border border-tokyo-surface">
                                NULL
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="p-2.5 sm:p-3 text-tokyo-muted text-[11px] hidden sm:table-cell">
                          {col.references ? (
                            <button
                              onClick={() => {
                                const target = RADIUS_SCHEMA_TABLES.find((t) => t.id === col.references!.table);
                                if (target) centerOnTable(target);
                              }}
                              className="text-tokyo-cyan hover:underline flex items-center gap-1 font-semibold"
                            >
                              <span>{col.references.table}({col.references.column})</span>
                              <ArrowRight size={11} />
                            </button>
                          ) : col.description ? (
                            <span className="italic text-tokyo-muted/80">{col.description}</span>
                          ) : (
                            <span className="opacity-30">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Outgoing & Incoming Relations Summary */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-tokyo-fg">
                Relational Dependencies
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Outgoing FKs */}
                <div className="p-3 rounded-xl bg-tokyo-surface/50 border border-tokyo-surface space-y-1.5">
                  <div className="text-[11px] font-mono font-bold text-tokyo-purple">
                    Outgoing Foreign Keys (References)
                  </div>
                  {RADIUS_SCHEMA_RELATIONS.filter((r) => r.fromTable === selectedTableObj.id).length === 0 ? (
                    <p className="text-xs font-mono text-tokyo-muted/60">No outgoing foreign keys.</p>
                  ) : (
                    RADIUS_SCHEMA_RELATIONS.filter((r) => r.fromTable === selectedTableObj.id).map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          const target = RADIUS_SCHEMA_TABLES.find((t) => t.id === r.toTable);
                          if (target) centerOnTable(target);
                        }}
                        className="w-full text-left text-xs font-mono text-tokyo-fg hover:text-tokyo-cyan flex items-center justify-between p-1.5 rounded hover:bg-tokyo-base transition-colors"
                      >
                        <span>{r.fromColumn}</span>
                        <div className="flex items-center gap-1 text-tokyo-cyan">
                          <ArrowRight size={11} />
                          <span>{r.toTable}({r.toColumn})</span>
                        </div>
                      </button>
                    ))
                  )}
                </div>

                {/* Incoming References */}
                <div className="p-3 rounded-xl bg-tokyo-surface/50 border border-tokyo-surface space-y-1.5">
                  <div className="text-[11px] font-mono font-bold text-tokyo-cyan">
                    Referenced By (Dependents)
                  </div>
                  {RADIUS_SCHEMA_RELATIONS.filter((r) => r.toTable === selectedTableObj.id).length === 0 ? (
                    <p className="text-xs font-mono text-tokyo-muted/60">No tables reference this entity.</p>
                  ) : (
                    RADIUS_SCHEMA_RELATIONS.filter((r) => r.toTable === selectedTableObj.id).map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          const target = RADIUS_SCHEMA_TABLES.find((t) => t.id === r.fromTable);
                          if (target) centerOnTable(target);
                        }}
                        className="w-full text-left text-xs font-mono text-tokyo-fg hover:text-tokyo-purple flex items-center justify-between p-1.5 rounded hover:bg-tokyo-base transition-colors"
                      >
                        <span>{r.fromTable}</span>
                        <div className="flex items-center gap-1 text-tokyo-purple">
                          <ArrowRight size={11} />
                          <span>via {r.fromColumn}</span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Status Bar */}
      <div className="bg-tokyo-base px-3 sm:px-5 py-2.5 border-t border-tokyo-surface flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-tokyo-muted shrink-0">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
          <span>PostgreSQL 16 Multi-Store Architecture</span>
          <span className="text-tokyo-surface">•</span>
          <span>{RADIUS_SCHEMA_TABLES.length} Schema Tables</span>
          <span className="text-tokyo-surface">•</span>
          <span>{RADIUS_SCHEMA_RELATIONS.length} Foreign Keys</span>
        </div>

        <div className="flex items-center gap-3">
          {activeTableId ? (
            <button
              onClick={() => {
                setSelectedTableId(null);
                setHoveredTableId(null);
              }}
              className="text-tokyo-purple hover:underline"
            >
              Clear selection ({activeTableId})
            </button>
          ) : (
            <span className="text-tokyo-cyan">Click any entity to inspect its relational graph</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Inline Container in Article Flow */}
      <div
        ref={inlineContainerRef}
        className="relative w-full my-6 rounded-2xl border border-tokyo-surface bg-tokyo-surface/90 shadow-2xl overflow-hidden flex flex-col"
      >
        {isFullscreen ? (
          /* Placeholder while popped-out into Fullscreen Modal */
          <div className="w-full h-[430px] sm:h-[510px] flex flex-col items-center justify-center text-tokyo-muted gap-3 p-6 text-center bg-tokyo-base/60">
            <div className="w-14 h-14 rounded-2xl bg-tokyo-purple/10 border border-tokyo-purple/30 flex items-center justify-center text-tokyo-purple mb-1 shadow-[0_0_20px_rgba(187,154,247,0.2)]">
              <Database size={28} className="animate-pulse" />
            </div>
            <span className="font-mono text-sm sm:text-base text-tokyo-fg font-bold">
              Radius Database Schema is Maximized
            </span>
            <p className="font-mono text-xs text-tokyo-muted max-w-md leading-relaxed">
              Interactive 32-table canvas is active in fullscreen view. Pan, zoom, and inspect entities directly above.
            </p>
            <button
              onClick={handleToggleFullscreen}
              className="mt-2 px-4 py-2 rounded-xl bg-tokyo-purple text-tokyo-base font-mono text-xs font-bold hover:bg-tokyo-purple/90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(187,154,247,0.35)]"
            >
              <Minimize2 size={14} />
              <span>Restore Inline View</span>
            </button>
          </div>
        ) : (
          renderDiagramContent(false)
        )}
      </div>

      {/* Fullscreen Pop-out Modal rendered into document.body via Portal with Framer Motion Spring */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence onExitComplete={() => setOriginRect(null)}>
            {isFullscreen && (
              <div className="fixed inset-0 z-[99990] pointer-events-auto overflow-hidden">
                {/* Dark Blurred Backdrop */}
                <motion.div
                  key="er-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="absolute inset-0 bg-black/85 backdrop-blur-md"
                  onClick={() => setIsFullscreen(false)}
                />

                {/* Pop-out / Shrink-back Modal Card */}
                <motion.div
                  key="er-modal"
                  initial={
                    originRect
                      ? {
                          top: originRect.top,
                          left: originRect.left,
                          width: originRect.width,
                          height: originRect.height,
                          borderRadius: 16,
                          opacity: 0.85,
                        }
                      : { scale: 0.93, opacity: 0 }
                  }
                  animate={{
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    borderRadius: 0,
                    opacity: 1,
                  }}
                  exit={
                    originRect
                      ? {
                          top: originRect.top,
                          left: originRect.left,
                          width: originRect.width,
                          height: originRect.height,
                          borderRadius: 16,
                          opacity: 0,
                        }
                      : { scale: 0.93, opacity: 0 }
                  }
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                  className="absolute z-10 overflow-hidden flex flex-col bg-[#16161e] border-none shadow-2xl"
                >
                  {renderDiagramContent(true)}
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
