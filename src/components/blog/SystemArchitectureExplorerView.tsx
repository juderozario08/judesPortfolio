import React, { useState } from 'react';
import {
  Search,
  X,
  ArrowRight,
  ShieldCheck,
  Copy,
  Check,
  Code2,
} from 'lucide-react';
import type { ArchNode } from '../../data/radiusSystemArchitecture';
import { getTierDotColor, getTierBadgeClass } from './systemArchitectureUtils';

interface SystemArchitectureExplorerViewProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filteredNodes: ArchNode[];
  selectedNode: ArchNode;
  onSelectAndCenterNode: (node: ArchNode) => void;
  setViewMode: (mode: 'canvas' | 'explorer') => void;
  inFullscreenModal: boolean;
  onInspectNode: (node: ArchNode) => void;
}

export const SystemArchitectureExplorerView: React.FC<SystemArchitectureExplorerViewProps> = ({
  searchQuery,
  setSearchQuery,
  filteredNodes,
  selectedNode,
  onSelectAndCenterNode,
  setViewMode,
  inFullscreenModal,
  onInspectNode,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'rules' | 'code' | 'flows'>('rules');

  const handleCopyPath = () => {
    navigator.clipboard.writeText(selectedNode.filePath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex flex-col md:grid md:grid-cols-3 gap-0 bg-[#13141c] ${
        inFullscreenModal
          ? 'flex-1 min-h-0 h-[calc(100vh-130px)]'
          : 'h-[440px] sm:h-[580px] max-h-[620px]'
      }`}
    >
      {/* Left Column: Search & Node Selector */}
      <div className="border-b md:border-b-0 md:border-r border-tokyo-surface p-3 sm:p-4 space-y-3 max-h-56 md:max-h-none overflow-y-auto custom-scrollbar shrink-0">
        {/* Search Bar */}
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-tokyo-muted" />
          <input
            type="text"
            placeholder="Search 24 components, handlers, services..."
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

        {/* Node List */}
        <div className="space-y-1">
          {filteredNodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => onSelectAndCenterNode(node)}
                className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-tokyo-purple/20 text-tokyo-cyan border border-tokyo-purple/40 font-medium'
                    : 'text-tokyo-muted hover:text-tokyo-fg hover:bg-tokyo-surface/70 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${getTierDotColor(node.tierNumber)}`}
                  />
                  <span className="font-mono text-xs font-bold truncate text-tokyo-fg">
                    {node.name}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-tokyo-muted shrink-0 uppercase">
                  Tier {node.tierNumber}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Deep-Dive Architecture Inspector */}
      <div className="md:col-span-2 p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
        {/* Component Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-tokyo-surface pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-mono text-base sm:text-lg font-bold text-tokyo-purple">
                {selectedNode.name}
              </h3>
              <span
                className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${getTierBadgeClass(
                  selectedNode.tierNumber
                )}`}
              >
                Tier {selectedNode.tierNumber}: {selectedNode.tierName}
              </span>
            </div>
            <p className="text-xs font-sans text-tokyo-muted mt-1 leading-relaxed">
              {selectedNode.subtitle} • {selectedNode.description}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => onInspectNode(selectedNode)}
              className="px-3 py-1.5 rounded-lg bg-tokyo-purple/10 text-tokyo-purple border border-tokyo-purple/30 hover:bg-tokyo-purple/20 transition-colors text-xs font-mono flex items-center gap-1.5"
            >
              <Code2 size={13} />
              <span>Inspect</span>
            </button>
            <button
              onClick={() => {
                setViewMode('canvas');
                onSelectAndCenterNode(selectedNode);
              }}
              className="px-3 py-1.5 rounded-lg bg-tokyo-cyan/10 text-tokyo-cyan border border-tokyo-cyan/30 hover:bg-tokyo-cyan/20 transition-colors text-xs font-mono flex items-center gap-1.5"
            >
              <span>Locate on Canvas</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Source File Path Bar */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-tokyo-base/90 border border-tokyo-surface font-mono text-xs text-tokyo-fg/80">
          <div className="flex items-center gap-2 truncate">
            <span className="text-tokyo-muted text-[11px]">Source:</span>
            <code className="text-tokyo-cyan truncate">{selectedNode.filePath}</code>
          </div>
          <button
            onClick={handleCopyPath}
            className="p-1.5 rounded hover:bg-tokyo-surface text-tokyo-muted hover:text-tokyo-fg transition-colors shrink-0 flex items-center gap-1 text-[11px]"
            title="Copy path"
          >
            {copied ? (
              <Check size={13} className="text-emerald-400" />
            ) : (
              <Copy size={13} />
            )}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-tokyo-surface gap-2">
          <button
            onClick={() => setActiveTab('rules')}
            className={`pb-2 text-xs font-mono font-medium border-b-2 transition-colors ${
              activeTab === 'rules'
                ? 'border-tokyo-purple text-tokyo-fg'
                : 'border-transparent text-tokyo-muted hover:text-tokyo-fg'
            }`}
          >
            Architecture & Safeguards
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`pb-2 text-xs font-mono font-medium border-b-2 transition-colors ${
              activeTab === 'code'
                ? 'border-tokyo-purple text-tokyo-fg'
                : 'border-transparent text-tokyo-muted hover:text-tokyo-fg'
            }`}
          >
            Implementation Code
          </button>
          <button
            onClick={() => setActiveTab('flows')}
            className={`pb-2 text-xs font-mono font-medium border-b-2 transition-colors ${
              activeTab === 'flows'
                ? 'border-tokyo-purple text-tokyo-fg'
                : 'border-transparent text-tokyo-muted hover:text-tokyo-fg'
            }`}
          >
            Simulation Flows & Metrics
          </button>
        </div>

        {/* Tab 1: Architecture & Safeguards */}
        {activeTab === 'rules' && (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-tokyo-base/60 border border-tokyo-surface space-y-1">
              <span className="text-[11px] font-mono text-tokyo-muted uppercase tracking-wider">
                Primary Architecture Role:
              </span>
              <p className="text-xs text-tokyo-fg leading-relaxed">{selectedNode.role}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-tokyo-base/60 border border-tokyo-surface space-y-1">
                <span className="text-[11px] font-mono text-tokyo-muted uppercase tracking-wider">
                  Inbound Callers:
                </span>
                <p className="text-xs text-tokyo-fg/90">{selectedNode.inbound}</p>
              </div>
              <div className="p-3 rounded-lg bg-tokyo-base/60 border border-tokyo-surface space-y-1">
                <span className="text-[11px] font-mono text-tokyo-muted uppercase tracking-wider">
                  Outbound Targets:
                </span>
                <p className="text-xs text-tokyo-fg/90">{selectedNode.outbound}</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck size={14} />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">
                  Production Safeguard & Resilience:
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                {selectedNode.safeguard}
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Implementation Code */}
        {activeTab === 'code' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-tokyo-muted">
              <span>Radius Production Source</span>
              <span className="uppercase">{selectedNode.codeSnippet.language}</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#101017] border border-tokyo-surface overflow-x-auto custom-scrollbar font-mono text-xs text-[#a9b1d6] leading-relaxed">
              <pre>
                <code>{selectedNode.codeSnippet.code}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Simulation Flows & Metrics */}
        {activeTab === 'flows' && (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-tokyo-base/60 border border-tokyo-surface space-y-2">
              <span className="text-[11px] font-mono text-tokyo-muted uppercase tracking-wider">
                Benchmark Metric:
              </span>
              <p className="text-xs font-mono font-semibold text-tokyo-cyan">
                {selectedNode.metrics}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-tokyo-muted uppercase tracking-wider">
                Lifecycle Flow Participation:
              </span>
              {selectedNode.flowSteps && Object.keys(selectedNode.flowSteps).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(selectedNode.flowSteps).map(([flowKey, step]) => (
                    <div
                      key={flowKey}
                      className="p-2.5 rounded-lg bg-tokyo-base/80 border border-tokyo-surface flex items-start gap-2.5"
                    >
                      <span className="px-2 py-0.5 rounded bg-tokyo-purple/20 text-tokyo-purple border border-tokyo-purple/40 font-mono text-[10px] font-bold shrink-0">
                        Step {step.stepNumber}
                      </span>
                      <div>
                        <span className="font-mono text-xs font-semibold text-tokyo-fg uppercase">
                          {flowKey} Flow
                        </span>
                        <p className="text-xs text-tokyo-muted mt-0.5">{step.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-tokyo-muted">
                  Runs continuously as background worker / infrastructure service.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
