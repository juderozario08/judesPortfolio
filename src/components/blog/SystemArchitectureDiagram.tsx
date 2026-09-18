import React, { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Search,
  Focus,
  ExternalLink,
  Workflow,
  Sparkles,
  ShieldCheck,
  X,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';
import {
  ARCH_NODES,
  ARCH_FLOWS,
  SYSTEM_CANVAS_WIDTH,
  SYSTEM_CANVAS_HEIGHT,
  type ArchNode,
} from '../../data/radiusSystemArchitecture';
import { useCanvasPanZoom } from '../../hooks/useCanvasPanZoom';
import { SystemArchitectureCanvasView } from './SystemArchitectureCanvasView';
import { SystemArchitectureExplorerView } from './SystemArchitectureExplorerView';
import { getTierBadgeClass, getTierDotColor } from './systemArchitectureUtils';

interface SystemArchitectureDiagramProps {
  initialTier?: string;
  initialFlow?: string;
}

export const SystemArchitectureDiagram: React.FC<SystemArchitectureDiagramProps> = ({
  initialTier = 'all',
  initialFlow = 'all',
}) => {
  const [selectedTier, setSelectedTier] = useState<string>(initialTier);
  const [selectedFlowId, setSelectedFlowId] = useState<string>(initialFlow);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredConnId, setHoveredConnId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'canvas' | 'explorer'>('canvas');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Inspector modal state
  const [modalNode, setModalNode] = useState<ArchNode | null>(null);
  const [modalTab, setModalTab] = useState<'rules' | 'code' | 'flow'>('rules');
  const [modalCopied, setModalCopied] = useState(false);

  const inlineContainerRef = useRef<HTMLDivElement>(null);

  // Hook for pan, zoom, touch, wheel navigation
  const {
    zoom,
    isPanning,
    hasDraggedRef,
    containerCallbackRef,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
    handleFitToScreen,
    centerOnTable: centerOnNode,
    panHandlers,
  } = useCanvasPanZoom({
    canvasWidth: SYSTEM_CANVAS_WIDTH,
    canvasHeight: SYSTEM_CANVAS_HEIGHT,
    initialZoom: 0.58,
  });

  // Escape key to exit fullscreen or close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (modalNode) {
          setModalNode(null);
        } else if (isFullscreen) {
          setIsFullscreen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, modalNode]);

  // Lock body scroll when fullscreen modal is active
  useEffect(() => {
    if (isFullscreen || modalNode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen, modalNode]);

  // Filter nodes by tier and search query
  const filteredNodes = useMemo(() => {
    return ARCH_NODES.filter((node) => {
      const matchesTier = selectedTier === 'all' || node.tier === selectedTier;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        node.name.toLowerCase().includes(q) ||
        node.role.toLowerCase().includes(q) ||
        node.subtitle.toLowerCase().includes(q) ||
        node.filePath.toLowerCase().includes(q) ||
        node.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTier && matchesSearch;
    });
  }, [selectedTier, searchQuery]);

  const selectedNodeObj = useMemo(() => {
    if (!selectedNodeId) return ARCH_NODES[0];
    return ARCH_NODES.find((n) => n.id === selectedNodeId) || ARCH_NODES[0];
  }, [selectedNodeId]);

  const currentFlow = useMemo(() => {
    return ARCH_FLOWS.find((f) => f.id === selectedFlowId) || ARCH_FLOWS[0];
  }, [selectedFlowId]);

  const handleSelectAndCenterNode = (node: ArchNode) => {
    setSelectedNodeId(node.id);
    if (viewMode === 'canvas') {
      centerOnNode(node);
    }
  };

  const handleInspect = (node: ArchNode) => {
    setModalNode(node);
    setModalTab('rules');
    setModalCopied(false);
  };

  const handleCopyModalPath = () => {
    if (!modalNode) return;
    navigator.clipboard.writeText(modalNode.filePath);
    setModalCopied(true);
    setTimeout(() => setModalCopied(false), 2000);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setTimeout(() => {
      handleFitToScreen();
    }, 350);
  };

  // Content body
  const renderContent = (inFullscreenModal = false) => (
    <div className="flex flex-col h-full bg-[#13141c]">
      {/* Simulation Flow Pipeline Ribbon (when a specific flow is active) */}
      {selectedFlowId !== 'all' && currentFlow.steps.length > 0 && (
        <div className="px-3 sm:px-4 py-2 bg-tokyo-surface/40 border-b border-tokyo-surface flex items-center gap-2 overflow-x-auto custom-scrollbar">
          <span className="text-[10px] font-mono text-tokyo-purple font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
            <Sparkles size={11} className="text-tokyo-cyan" />
            {currentFlow.name} Pipeline:
          </span>

          <div className="flex items-center gap-1.5 shrink-0">
            {currentFlow.steps.map((step, sIdx) => {
              const targetNode = ARCH_NODES.find((n) => n.id === step.nodeId);
              const isCurrentSelected = selectedNodeId === step.nodeId;

              return (
                <React.Fragment key={sIdx}>
                  <button
                    type="button"
                    onClick={() => {
                      if (targetNode) {
                        handleSelectAndCenterNode(targetNode);
                        handleInspect(targetNode);
                      }
                    }}
                    className={`px-2 py-1 rounded-md text-[10px] font-mono transition-all flex items-center gap-1.5 border ${
                      isCurrentSelected
                        ? 'bg-tokyo-purple text-white border-tokyo-purple shadow-md font-semibold'
                        : 'bg-tokyo-base/90 text-tokyo-fg/90 border-tokyo-surface hover:border-tokyo-purple/50'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-tokyo-surface flex items-center justify-center text-[9px] font-bold text-tokyo-cyan shrink-0">
                      {step.step}
                    </span>
                    <span className="truncate">{step.title}</span>
                  </button>

                  {sIdx < currentFlow.steps.length - 1 && (
                    <ArrowRight size={11} className="text-tokyo-purple/70 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* Main View Area */}
      {viewMode === 'canvas' ? (
        <SystemArchitectureCanvasView
          zoom={zoom}
          isPanning={isPanning}
          containerCallbackRef={containerCallbackRef}
          panHandlers={panHandlers}
          hasDraggedRef={hasDraggedRef}
          inFullscreenModal={inFullscreenModal}
          selectedTier={selectedTier}
          selectedFlowId={selectedFlowId}
          selectedNodeId={selectedNodeId}
          setSelectedNodeId={setSelectedNodeId}
          hoveredNodeId={hoveredNodeId}
          setHoveredNodeId={setHoveredNodeId}
          hoveredConnId={hoveredConnId}
          setHoveredConnId={setHoveredConnId}
          onInspectNode={handleInspect}
        />
      ) : (
        <SystemArchitectureExplorerView
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredNodes={filteredNodes}
          selectedNode={selectedNodeObj}
          onSelectAndCenterNode={handleSelectAndCenterNode}
          setViewMode={setViewMode}
          inFullscreenModal={inFullscreenModal}
          onInspectNode={handleInspect}
        />
      )}
    </div>
  );

  return (
    <div
      ref={inlineContainerRef}
      className="w-full my-8 rounded-2xl border border-tokyo-surface bg-tokyo-base overflow-hidden shadow-md transition-all"
    >
      {/* Top Header Bar */}
      <div className="p-3 sm:p-4 bg-tokyo-surface/80 border-b border-tokyo-surface flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Title & Badge */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-tokyo-purple/20 border border-tokyo-purple/40 flex items-center justify-center text-tokyo-purple shrink-0 shadow-inner">
            <Workflow size={20} />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-mono text-sm sm:text-base font-bold text-tokyo-fg truncate">
                Radius System Architecture Topology
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-tokyo-purple/20 text-tokyo-purple border border-tokyo-purple/40 shrink-0">
                5-Tier Clean Architecture
              </span>
            </div>
            <p className="text-xs font-sans text-tokyo-muted mt-0.5 leading-relaxed">
              Interactive system topology, clean architecture tiers, directional data flow, and live Go/TS implementation code.
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-tokyo-base rounded-xl p-1 border border-tokyo-surface self-stretch md:self-auto justify-center">
          <button
            onClick={() => setViewMode('canvas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              viewMode === 'canvas'
                ? 'bg-tokyo-purple text-white shadow-md'
                : 'text-tokyo-muted hover:text-tokyo-fg'
            }`}
          >
            <Layers size={13} />
            <span>Canvas View</span>
          </button>
          <button
            onClick={() => setViewMode('explorer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              viewMode === 'explorer'
                ? 'bg-tokyo-purple text-white shadow-md'
                : 'text-tokyo-muted hover:text-tokyo-fg'
            }`}
          >
            <Search size={13} />
            <span>Explorer View</span>
          </button>
        </div>
      </div>

      {/* Toolbar Bar: Tier Filters, Simulation Flows & Zoom Controls */}
      <div className="p-2 sm:p-3 bg-[#111219] border-b border-tokyo-surface flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        {/* Tier & Flow Selector Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tier Filter Dropdown */}
          <div className="flex items-center gap-1.5 bg-tokyo-surface/50 border border-tokyo-surface rounded-lg px-2.5 py-1">
            <span className="text-tokyo-muted text-[11px]">Tier:</span>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-transparent text-tokyo-cyan focus:outline-none font-mono text-xs cursor-pointer"
            >
              <option value="all" className="bg-tokyo-base text-tokyo-fg">All 5 Tiers</option>
              <option value="client" className="bg-tokyo-base text-tokyo-fg">Tier 1: Client Frontends</option>
              <option value="gateway" className="bg-tokyo-base text-tokyo-fg">Tier 2: Ingress & Security</option>
              <option value="handler" className="bg-tokyo-base text-tokyo-fg">Tier 3: HTTP Handlers</option>
              <option value="service" className="bg-tokyo-base text-tokyo-fg">Tier 4: Domain Services</option>
              <option value="storage" className="bg-tokyo-base text-tokyo-fg">Tier 5: Storage & Cache</option>
              <option value="worker" className="bg-tokyo-base text-tokyo-fg">Tier 5: Background Workers</option>
            </select>
          </div>

          {/* Simulation Flow Selector */}
          <div className="flex items-center gap-1.5 bg-tokyo-surface/50 border border-tokyo-surface rounded-lg px-2.5 py-1">
            <span className="text-tokyo-muted text-[11px]">Flow:</span>
            <select
              value={selectedFlowId}
              onChange={(e) => setSelectedFlowId(e.target.value)}
              className="bg-transparent text-tokyo-purple focus:outline-none font-mono text-xs cursor-pointer font-medium"
            >
              <option value="all" className="bg-tokyo-base text-tokyo-fg">All Connections (32 Paths)</option>
              <option value="bopis" className="bg-tokyo-base text-tokyo-fg">BOPIS Order Flow (Picking Lock)</option>
              <option value="replenish" className="bg-tokyo-base text-tokyo-fg">Shelf Restocking (IS4TC Holes)</option>
              <option value="cycle" className="bg-tokyo-base text-tokyo-fg">Cycle Counting (Audit Lock)</option>
              <option value="auth" className="bg-tokyo-base text-tokyo-fg">Auth & Single Session Flow</option>
            </select>
          </div>
        </div>

        {/* Canvas Zoom & Tool Controls */}
        <div className="flex items-center gap-1.5">
          {viewMode === 'canvas' && (
            <>
              <div className="flex items-center bg-tokyo-surface/60 rounded-lg p-0.5 border border-tokyo-surface">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 rounded hover:bg-tokyo-surface text-tokyo-muted hover:text-tokyo-fg transition-colors"
                  title="Zoom out"
                >
                  <ZoomOut size={13} />
                </button>
                <span className="px-2 font-mono text-[11px] text-tokyo-fg font-semibold min-w-[42px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 rounded hover:bg-tokyo-surface text-tokyo-muted hover:text-tokyo-fg transition-colors"
                  title="Zoom in"
                >
                  <ZoomIn size={13} />
                </button>
              </div>

              <button
                onClick={handleZoomReset}
                className="p-1.5 rounded-lg bg-tokyo-surface/60 border border-tokyo-surface text-tokyo-muted hover:text-tokyo-fg transition-colors"
                title="Reset zoom"
              >
                <RotateCcw size={13} />
              </button>

              <button
                onClick={handleFitToScreen}
                className="p-1.5 rounded-lg bg-tokyo-surface/60 border border-tokyo-surface text-tokyo-muted hover:text-tokyo-fg transition-colors"
                title="Fit to screen"
              >
                <Focus size={13} />
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={handleToggleFullscreen}
            className="p-1.5 rounded-lg bg-tokyo-surface/60 border border-tokyo-surface text-tokyo-muted hover:text-tokyo-fg transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>

          {/* Raw SVG Link */}
          <a
            href="/assets/images/radius-system-architecture.svg"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-tokyo-purple/10 border border-tokyo-purple/30 text-tokyo-purple hover:bg-tokyo-purple/20 transition-colors flex items-center gap-1 text-[11px] font-mono"
            title="Open Raw SVG diagram in new tab"
          >
            <ExternalLink size={13} />
            <span className="hidden md:inline">Raw SVG</span>
          </a>
        </div>
      </div>

      {/* Embedded View */}
      {renderContent(false)}

      {/* Fullscreen Modal View */}
      {isFullscreen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex flex-col bg-[#13141c]/98 backdrop-blur-md">
            {/* Modal Top Bar */}
            <div className="p-3 sm:p-4 bg-tokyo-surface/90 border-b border-tokyo-surface flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Workflow size={20} className="text-tokyo-purple" />
                <h3 className="font-mono text-sm sm:text-base font-bold text-tokyo-fg">
                  Radius System Architecture: Fullscreen Inspector
                </h3>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {viewMode === 'canvas' && (
                  <div className="flex items-center bg-tokyo-surface rounded-lg p-0.5 border border-tokyo-surface">
                    <button
                      onClick={handleZoomOut}
                      className="p-1.5 rounded hover:bg-tokyo-base text-tokyo-muted hover:text-tokyo-fg"
                    >
                      <ZoomOut size={14} />
                    </button>
                    <span className="px-2 font-mono text-xs text-tokyo-fg">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="p-1.5 rounded hover:bg-tokyo-base text-tokyo-muted hover:text-tokyo-fg"
                    >
                      <ZoomIn size={14} />
                    </button>
                  </div>
                )}

                <button
                  onClick={handleToggleFullscreen}
                  className="px-3 py-1.5 rounded-lg bg-tokyo-surface text-tokyo-fg border border-tokyo-surface hover:border-tokyo-purple transition-all text-xs font-mono flex items-center gap-1.5"
                >
                  <Minimize2 size={13} />
                  <span>Exit (Esc)</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            {renderContent(true)}
          </div>,
          document.body
        )}

      {/* Focused Node Inspector Modal Popup */}
      {modalNode &&
        createPortal(
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#161723] border border-tokyo-purple/50 rounded-2xl shadow-md flex flex-col overflow-hidden">
              {/* Modal Header */}
              <div className="p-4 sm:p-5 bg-tokyo-base border-b border-tokyo-surface flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full shrink-0 ${getTierDotColor(modalNode.tierNumber)}`}
                    />
                    <h3 className="font-mono text-base sm:text-lg font-bold text-tokyo-fg">
                      {modalNode.name}
                    </h3>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${getTierBadgeClass(
                        modalNode.tierNumber
                      )}`}
                    >
                      Tier {modalNode.tierNumber}: {modalNode.tierName}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-tokyo-cyan mt-1">
                    {modalNode.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => setModalNode(null)}
                  className="p-1.5 rounded-lg text-tokyo-muted hover:text-tokyo-fg hover:bg-tokyo-surface transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal File Path Bar */}
              <div className="px-4 py-2 bg-tokyo-surface/40 border-b border-tokyo-surface/60 flex items-center justify-between font-mono text-xs text-tokyo-fg/90">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-tokyo-muted text-[11px]">Path:</span>
                  <code className="text-tokyo-cyan truncate">{modalNode.filePath}</code>
                </div>
                <button
                  onClick={handleCopyModalPath}
                  className="p-1 rounded hover:bg-tokyo-surface text-tokyo-muted hover:text-tokyo-fg transition-colors shrink-0 flex items-center gap-1 text-[11px]"
                >
                  {modalCopied ? (
                    <Check size={13} className="text-emerald-400" />
                  ) : (
                    <Copy size={13} />
                  )}
                  <span>{modalCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Modal Tabs */}
              <div className="flex border-b border-tokyo-surface px-4 gap-3 bg-tokyo-base/60">
                <button
                  onClick={() => setModalTab('rules')}
                  className={`py-2 text-xs font-mono font-medium border-b-2 transition-colors ${
                    modalTab === 'rules'
                      ? 'border-tokyo-purple text-tokyo-fg'
                      : 'border-transparent text-tokyo-muted hover:text-tokyo-fg'
                  }`}
                >
                  Architecture & Safeguards
                </button>
                <button
                  onClick={() => setModalTab('code')}
                  className={`py-2 text-xs font-mono font-medium border-b-2 transition-colors ${
                    modalTab === 'code'
                      ? 'border-tokyo-purple text-tokyo-fg'
                      : 'border-transparent text-tokyo-muted hover:text-tokyo-fg'
                  }`}
                >
                  Implementation Code
                </button>
                <button
                  onClick={() => setModalTab('flow')}
                  className={`py-2 text-xs font-mono font-medium border-b-2 transition-colors ${
                    modalTab === 'flow'
                      ? 'border-tokyo-purple text-tokyo-fg'
                      : 'border-transparent text-tokyo-muted hover:text-tokyo-fg'
                  }`}
                >
                  Lifecycle Simulation
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4 text-xs">
                {modalTab === 'rules' && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-tokyo-base/70 border border-tokyo-surface space-y-1">
                      <span className="text-[11px] font-mono text-tokyo-muted uppercase tracking-wider">
                        Core System Role:
                      </span>
                      <p className="text-xs text-tokyo-fg leading-relaxed">{modalNode.role}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-tokyo-base/70 border border-tokyo-surface space-y-1">
                        <span className="text-[11px] font-mono text-tokyo-muted uppercase tracking-wider">
                          Inbound Trigger:
                        </span>
                        <p className="text-xs text-tokyo-fg/90">{modalNode.inbound}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-tokyo-base/70 border border-tokyo-surface space-y-1">
                        <span className="text-[11px] font-mono text-tokyo-muted uppercase tracking-wider">
                          Outbound Targets:
                        </span>
                        <p className="text-xs text-tokyo-fg/90">{modalNode.outbound}</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <ShieldCheck size={14} />
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">
                          Production Safeguard & Resilience:
                        </span>
                      </div>
                      <p className="text-xs text-emerald-200/90 leading-relaxed">
                        {modalNode.safeguard}
                      </p>
                    </div>
                  </div>
                )}

                {modalTab === 'code' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-tokyo-muted">
                      <span>Radius Clean Architecture Source</span>
                      <span className="uppercase">{modalNode.codeSnippet.language}</span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#0e0f16] border border-tokyo-surface overflow-x-auto custom-scrollbar font-mono text-xs text-[#a9b1d6] leading-relaxed">
                      <pre>
                        <code>{modalNode.codeSnippet.code}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {modalTab === 'flow' && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-tokyo-base/70 border border-tokyo-surface space-y-1.5">
                      <span className="text-[11px] font-mono text-tokyo-muted uppercase tracking-wider">
                        Latency / Scale Metric:
                      </span>
                      <p className="text-xs font-mono font-bold text-tokyo-cyan">
                        {modalNode.metrics}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-tokyo-muted uppercase tracking-wider">
                        Simulation Scenarios:
                      </span>
                      {modalNode.flowSteps && Object.keys(modalNode.flowSteps).length > 0 ? (
                        <div className="space-y-2">
                          {Object.entries(modalNode.flowSteps).map(([key, step]) => (
                            <div
                              key={key}
                              className="p-3 rounded-lg bg-tokyo-base/80 border border-tokyo-surface flex items-start gap-2.5"
                            >
                              <span className="px-2 py-0.5 rounded bg-tokyo-purple/20 text-tokyo-purple border border-tokyo-purple/40 font-mono text-[10px] font-bold shrink-0">
                                Step {step.stepNumber}
                              </span>
                              <div>
                                <span className="font-mono text-xs font-semibold text-tokyo-fg uppercase">
                                  {key} Workflow
                                </span>
                                <p className="text-xs text-tokyo-muted mt-0.5">{step.action}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-tokyo-muted">
                          Operates continuously across all operational flows as infrastructure or security middleware.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
