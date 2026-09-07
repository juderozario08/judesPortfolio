import { useState, useMemo, useRef, useEffect } from 'react';
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
  Focus,
} from 'lucide-react';
import {
  RADIUS_SCHEMA_TABLES,
  RADIUS_SCHEMA_RELATIONS,
  SCHEMA_DOMAINS,
  type SchemaTable,
} from '../../data/radiusSchema';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './erDiagramUtils';
import { useCanvasPanZoom } from '../../hooks/useCanvasPanZoom';
import { ERCanvasView } from './ERCanvasView';
import { ERExplorerView } from './ERExplorerView';

interface ERDiagramProps {
  initialDomain?: string;
}

export const ERDiagram = ({ initialDomain = 'all' }: ERDiagramProps) => {
  const [selectedDomain, setSelectedDomain] = useState<string>(initialDomain);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [hoveredTableId, setHoveredTableId] = useState<string | null>(null);
  const [hoveredRelationId, setHoveredRelationId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'canvas' | 'explorer'>('canvas');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const inlineContainerRef = useRef<HTMLDivElement>(null);
  const [originRect, setOriginRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  // Hook for canvas pan, zoom, touch, wheel
  const {
    zoom,
    isPanning,
    hasDraggedRef,
    containerCallbackRef,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
    handleFitToScreen,
    centerOnTable,
    panHandlers,
  } = useCanvasPanZoom({
    canvasWidth: CANVAS_WIDTH,
    canvasHeight: CANVAS_HEIGHT,
    initialZoom: 0.65,
  });

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

  const selectedTableObj = useMemo(() => {
    if (!selectedTableId) return RADIUS_SCHEMA_TABLES[0];
    return RADIUS_SCHEMA_TABLES.find((t) => t.id === selectedTableId) || RADIUS_SCHEMA_TABLES[0];
  }, [selectedTableId]);

  const handleSelectTableAndCenter = (table: SchemaTable) => {
    setSelectedTableId(table.id);
    if (viewMode === 'canvas') {
      centerOnTable(table);
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
        <ERCanvasView
          zoom={zoom}
          isPanning={isPanning}
          containerCallbackRef={containerCallbackRef}
          panHandlers={panHandlers}
          hasDraggedRef={hasDraggedRef}
          inFullscreenModal={inFullscreenModal}
          selectedDomain={selectedDomain}
          selectedTableId={selectedTableId}
          setSelectedTableId={setSelectedTableId}
          hoveredTableId={hoveredTableId}
          setHoveredTableId={setHoveredTableId}
          hoveredRelationId={hoveredRelationId}
          setHoveredRelationId={setHoveredRelationId}
          activeTableId={activeTableId}
          activeRelations={activeRelations}
          relatedTableIds={relatedTableIds}
        />
      ) : (
        <ERExplorerView
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredTables={filteredTables}
          selectedTableObj={selectedTableObj}
          centerOnTable={handleSelectTableAndCenter}
          setViewMode={setViewMode}
          inFullscreenModal={inFullscreenModal}
        />
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
