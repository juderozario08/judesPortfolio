import React, { useMemo } from 'react';
import {
  Move,
  Code2,
  ArrowRight,
} from 'lucide-react';
import {
  ARCH_NODES,
  ARCH_CONNECTIONS,
  SYSTEM_CANVAS_WIDTH,
  SYSTEM_CANVAS_HEIGHT,
  type ArchNode,
} from '../../data/radiusSystemArchitecture';
import { calculateArchPath, getTierDotColor } from './systemArchitectureUtils';

interface SystemArchitectureCanvasViewProps {
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
  selectedTier: string;
  selectedFlowId: string;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  hoveredNodeId: string | null;
  setHoveredNodeId: (id: string | null) => void;
  hoveredConnId: string | null;
  setHoveredConnId: (id: string | null) => void;
  onInspectNode: (node: ArchNode) => void;
}

const TIER_REGIONS = [
  {
    tierNumber: 1,
    title: 'TIER 1: CLIENT APPLICATIONS (EXPO SDK 54 & RETAIL HARDWARE)',
    subtitle: 'iOS / Android Barcode Scanners • POS Registers • Service Desk',
    y: 50,
    height: 250,
    color: '#7aa2f7',
  },
  {
    tierNumber: 2,
    title: 'TIER 2: API GATEWAY & SECURITY INGRESS (PORT 8080)',
    subtitle: 'Token Bucket Rate Limiting • JWT Auth • Context Deadline • WebSocket Upgrader',
    y: 330,
    height: 215,
    color: '#bb9af7',
  },
  {
    tierNumber: 3,
    title: 'TIER 3: HTTP & TRANSPORT HANDLERS (THE FRONT DESK)',
    subtitle: 'gin-gonic/gin • JSON DTO Validation • Decoupled Go Service Invocation',
    y: 575,
    height: 230,
    color: '#7dcfff',
  },
  {
    tierNumber: 4,
    title: 'TIER 4: CORE DOMAIN BUSINESS SERVICES & WEBSOCKET HUB (BUSINESS LOGIC RULES)',
    subtitle: 'Zero SQL Dependencies • Pure Business Invariants • Store-Isolated Real-Time Broadcast',
    y: 835,
    height: 260,
    color: '#9ece6a',
  },
  {
    tierNumber: 5,
    title: 'TIER 5: STORAGE INFRASTRUCTURE, CACHE & WORKERS (THE FILING CABINET)',
    subtitle: 'PostgreSQL 16 (40 Migrations, pgx/v5 Pool) • Redis In-Memory Cache • Background Workers',
    y: 1125,
    height: 285,
    color: '#ff9e64',
  },
];

export const SystemArchitectureCanvasView: React.FC<SystemArchitectureCanvasViewProps> = ({
  zoom,
  isPanning,
  containerCallbackRef,
  panHandlers,
  hasDraggedRef,
  inFullscreenModal,
  selectedTier,
  selectedFlowId,
  selectedNodeId,
  setSelectedNodeId,
  hoveredNodeId,
  setHoveredNodeId,
  hoveredConnId,
  setHoveredConnId,
  onInspectNode,
}) => {
  const activeNodeId = hoveredNodeId || selectedNodeId;

  // Compute set of related node IDs for highlighting
  const relatedNodeIds = useMemo(() => {
    if (!activeNodeId) return new Set<string>();
    const related = new Set<string>([activeNodeId]);
    ARCH_CONNECTIONS.forEach((conn) => {
      if (conn.fromNode === activeNodeId) related.add(conn.toNode);
      if (conn.toNode === activeNodeId) related.add(conn.fromNode);
    });
    return related;
  }, [activeNodeId]);

  // Compute set of active connection IDs
  const activeConnIds = useMemo(() => {
    const active = new Set<string>();
    ARCH_CONNECTIONS.forEach((conn) => {
      const matchesFlow = selectedFlowId === 'all' || conn.flows.includes(selectedFlowId);
      const isDirectlyConnected = activeNodeId && (conn.fromNode === activeNodeId || conn.toNode === activeNodeId);
      if (isDirectlyConnected || (selectedFlowId !== 'all' && matchesFlow)) {
        active.add(conn.id);
      }
    });
    return active;
  }, [activeNodeId, selectedFlowId]);

  return (
    <div
      ref={containerCallbackRef}
      tabIndex={0}
      {...panHandlers}
      style={{
        overscrollBehavior: 'contain',
        backgroundImage: `radial-gradient(rgba(122, 162, 247, 0.22) ${Math.max(1, 1.2 * zoom)}px, transparent ${Math.max(1, 1.2 * zoom)}px)`,
        backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
        backgroundAttachment: 'local',
      }}
      className={`relative w-full overflow-auto bg-[#13141c] custom-scrollbar select-none focus:outline-none ${
        isPanning ? 'cursor-grabbing' : 'cursor-grab'
      } ${
        inFullscreenModal
          ? 'flex-1 min-h-0 h-[calc(100vh-130px)]'
          : 'h-[440px] sm:h-[580px] max-h-[620px]'
      }`}
    >
      {/* Scalable Canvas Container */}
      <div
        className="relative transition-transform duration-75 origin-top-left p-8"
        style={{
          transform: `scale(${zoom})`,
          width: `${SYSTEM_CANVAS_WIDTH}px`,
          height: `${SYSTEM_CANVAS_HEIGHT}px`,
        }}
      >
        {/* Tier Background Bands */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {TIER_REGIONS.map((region) => (
            <div
              key={region.tierNumber}
              style={{
                position: 'absolute',
                left: '30px',
                right: '30px',
                top: `${region.y}px`,
                height: `${region.height}px`,
              }}
              className="rounded-2xl border border-tokyo-surface/70 bg-[#161722]/50 backdrop-blur-sm p-4 flex flex-col justify-between"
            >
              <div className="flex flex-wrap items-center justify-between border-b border-tokyo-surface/50 pb-2 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: region.color }}
                  />
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-wider truncate"
                    style={{ color: region.color }}
                  >
                    {region.title}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-tokyo-muted shrink-0">
                  {region.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* SVG Relationship & Arrow Connections Overlay */}
        <svg
          className="absolute inset-0 pointer-events-none w-full h-full z-10"
          style={{ width: `${SYSTEM_CANVAS_WIDTH}px`, height: `${SYSTEM_CANVAS_HEIGHT}px` }}
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="active-arrow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bb9af7" />
              <stop offset="100%" stopColor="#7dcfff" />
            </linearGradient>

            <linearGradient id="flow-arrow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9ece6a" />
              <stop offset="100%" stopColor="#7dcfff" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="arch-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>

            {/* Arrowhead Markers */}
            <marker
              id="arrow-default"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#414868" />
            </marker>

            <marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#bb9af7" />
            </marker>

            <marker
              id="arrow-cyan"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#7dcfff" />
            </marker>

            <marker
              id="arrow-green"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#9ece6a" />
            </marker>

            <marker
              id="arrow-orange"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#ff9e64" />
            </marker>
          </defs>

          {/* Render All Directional Connections with Arrowheads */}
          {ARCH_CONNECTIONS.map((conn) => {
            const pathInfo = calculateArchPath(conn, ARCH_NODES);
            if (!pathInfo) return null;

            const isDirectActive = activeConnIds.has(conn.id);
            const isHovered = hoveredConnId === conn.id;
            const matchesFlow = selectedFlowId === 'all' || conn.flows.includes(selectedFlowId);

            // Visibility / styling logic
            const isHighlighted = isDirectActive || isHovered;
            const strokeColor = isHighlighted
              ? conn.color || '#bb9af7'
              : selectedFlowId !== 'all' && !matchesFlow
              ? '#1e2030'
              : '#3b4261';

            const markerId = isHighlighted
              ? 'arrow-active'
              : selectedFlowId !== 'all' && !matchesFlow
              ? 'arrow-default'
              : 'arrow-default';

            return (
              <g key={conn.id} className="pointer-events-auto">
                {/* Wider invisible path for comfortable hover */}
                <path
                  d={pathInfo.path}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={16}
                  onMouseEnter={() => setHoveredConnId(conn.id)}
                  onMouseLeave={() => setHoveredConnId(null)}
                  className="cursor-pointer"
                />

                {/* Visible Directional Path with Arrowhead */}
                <path
                  d={pathInfo.path}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isHighlighted ? 2.6 : 1.3}
                  strokeDasharray={
                    isHighlighted && selectedFlowId !== 'all'
                      ? '6 4'
                      : isHighlighted
                      ? 'none'
                      : '5 4'
                  }
                  markerEnd={`url(#${markerId})`}
                  filter={isHighlighted ? 'url(#arch-glow)' : undefined}
                  className="transition-all duration-200"
                />

                {/* Midpoint Label Badge on Active or Hovered Connections */}
                {isHighlighted && (
                  <g
                    transform={`translate(${pathInfo.midX}, ${pathInfo.midY})`}
                    className="pointer-events-none"
                  >
                    <rect
                      x="-55"
                      y="-11"
                      width="110"
                      height="22"
                      rx="6"
                      fill="#1f2335"
                      stroke={strokeColor}
                      strokeWidth="1"
                      filter="url(#arch-glow)"
                    />
                    <text
                      x="0"
                      y="3.5"
                      fill="#c0caf5"
                      fontSize="9"
                      fontFamily="'Fira Code', monospace"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {conn.protocol}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Node Cards Positioned Across Coordinates */}
        {ARCH_NODES.map((node) => {
          const isSelected = selectedNodeId === node.id;
          const isHovered = hoveredNodeId === node.id;
          const isRelated = relatedNodeIds.has(node.id);
          const matchesTier = selectedTier === 'all' || node.tier === selectedTier;
          const matchesFlow =
            selectedFlowId === 'all' || (node.flowSteps && Boolean(node.flowSteps[selectedFlowId]));

          // Flow step indicator if active
          const flowStep =
            selectedFlowId !== 'all' && node.flowSteps ? node.flowSteps[selectedFlowId] : null;

          // Opacity logic for focus filtering
          const opacity =
            matchesTier && matchesFlow && (!activeNodeId || isRelated || isSelected)
              ? 1
              : !matchesTier || !matchesFlow
              ? 0.2
              : 0.32;

          return (
            <div
              key={node.id}
              style={{
                position: 'absolute',
                left: `${node.x}px`,
                top: `${node.y}px`,
                width: `${node.width}px`,
                minHeight: `${node.height}px`,
                opacity,
              }}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              onClick={() => {
                if (hasDraggedRef.current) return;
                setSelectedNodeId(isSelected ? null : node.id);
              }}
              className={`rounded-xl border transition-all duration-150 cursor-pointer shadow-xl select-none z-20 flex flex-col justify-between ${
                isSelected
                  ? 'bg-tokyo-surface border-tokyo-purple ring-2 ring-tokyo-purple/60 shadow-[0_0_28px_rgba(187,154,247,0.35)] scale-[1.02]'
                  : isHovered
                  ? 'bg-tokyo-surface border-tokyo-cyan shadow-[0_0_20px_rgba(125,207,255,0.25)] scale-[1.01]'
                  : isRelated && activeNodeId
                  ? 'bg-tokyo-surface border-tokyo-blue/70 ring-1 ring-tokyo-blue/40'
                  : 'bg-tokyo-surface/90 border-tokyo-surface/90 hover:border-tokyo-purple/40'
              }`}
            >
              {/* Card Header */}
              <div className="p-2.5 bg-tokyo-base rounded-t-xl border-b border-tokyo-surface flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${getTierDotColor(node.tierNumber)}`}
                  />
                  <span className="font-mono text-xs font-bold text-tokyo-fg truncate">
                    {node.name}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {flowStep && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-tokyo-purple text-white shadow-sm">
                      Step {flowStep.stepNumber}
                    </span>
                  )}
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-tokyo-surface text-tokyo-muted border border-tokyo-surface">
                    Tier {node.tierNumber}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3 space-y-2 flex-1">
                <div className="font-mono text-[11px] text-tokyo-cyan truncate">
                  {node.subtitle}
                </div>

                <p className="text-[11px] text-tokyo-fg/80 line-clamp-2 leading-relaxed">
                  {node.role}
                </p>

                {/* Protocol / Tech Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {node.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-tokyo-base/70 text-tokyo-muted border border-tokyo-surface/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer with Inspect Action Button */}
              <div className="p-2 bg-tokyo-base/60 rounded-b-xl border-t border-tokyo-surface/50 flex items-center justify-between text-[10px] font-mono text-tokyo-muted">
                <span className="truncate text-tokyo-muted/70">
                  {node.filePath.split('/').pop()}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onInspectNode(node);
                  }}
                  className="px-2 py-0.5 rounded bg-tokyo-purple/10 text-tokyo-purple border border-tokyo-purple/30 hover:bg-tokyo-purple hover:text-white transition-all flex items-center gap-1 font-semibold"
                >
                  <Code2 size={11} />
                  <span>Inspect</span>
                  <ArrowRight size={10} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Canvas Navigation Pill */}
      <div className="absolute bottom-4 left-4 bg-tokyo-base/95 backdrop-blur-md border border-tokyo-surface rounded-xl px-3.5 py-2 text-xs font-mono text-tokyo-muted pointer-events-none hidden sm:flex items-center gap-2.5 shadow-xl z-30">
        <Move size={14} className="text-tokyo-cyan shrink-0" />
        <span>Drag canvas or scroll wheel to navigate • Click nodes or arrows to inspect</span>
      </div>
    </div>
  );
};
