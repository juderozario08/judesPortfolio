import { Search, X, Layers, Key, ArrowRight } from 'lucide-react';
import {
  RADIUS_SCHEMA_TABLES,
  RADIUS_SCHEMA_RELATIONS,
  type SchemaTable,
} from '../../data/radiusSchema';
import { getDomainColor } from './erDiagramUtils';

interface ERExplorerViewProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filteredTables: SchemaTable[];
  selectedTableObj: SchemaTable;
  centerOnTable: (table: SchemaTable) => void;
  setViewMode: (mode: 'canvas' | 'explorer') => void;
  inFullscreenModal: boolean;
}

export const ERExplorerView = ({
  searchQuery,
  setSearchQuery,
  filteredTables,
  selectedTableObj,
  centerOnTable,
  setViewMode,
  inFullscreenModal,
}: ERExplorerViewProps) => {
  return (
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
  );
};
