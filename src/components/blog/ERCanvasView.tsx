import React from 'react';
import { Key, Sparkles, Move } from 'lucide-react';
import {
  RADIUS_SCHEMA_TABLES,
  RADIUS_SCHEMA_RELATIONS,
} from '../../data/radiusSchema';
import { CANVAS_WIDTH, CANVAS_HEIGHT, calculatePath, getDomainColor } from './erDiagramUtils';

interface ERCanvasViewProps {
  zoom: number;
  isPanning: boolean;
  containerCallbackRef: (node: HTMLDivElement | null) => void;
  panHandlers: {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
  hasDraggedRef: React.MutableRefObject<boolean>;
  inFullscreenModal: boolean;
  selectedDomain: string;
  selectedTableId: string | null;
  setSelectedTableId: (id: string | null) => void;
  hoveredTableId: string | null;
  setHoveredTableId: (id: string | null) => void;
  hoveredRelationId: string | null;
  setHoveredRelationId: (id: string | null) => void;
  activeTableId: string | null;
  activeRelations: Set<string>;
  relatedTableIds: Set<string>;
}

export const ERCanvasView = ({
  zoom,
  isPanning,
  containerCallbackRef,
  panHandlers,
  hasDraggedRef,
  inFullscreenModal,
  selectedDomain,
  selectedTableId,
  setSelectedTableId,
  hoveredTableId,
  setHoveredTableId,
  hoveredRelationId,
  setHoveredRelationId,
  activeTableId,
  activeRelations,
  relatedTableIds,
}: ERCanvasViewProps) => {
  return (
    <div
      ref={containerCallbackRef}
      tabIndex={0}
      {...panHandlers}
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
  );
};
