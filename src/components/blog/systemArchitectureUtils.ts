import type { ArchNode, ArchConnection } from '../../data/radiusSystemArchitecture';

/**
 * Calculates smooth SVG Bézier curves with precise anchor points between architecture nodes.
 */
export const calculateArchPath = (
  conn: ArchConnection,
  nodes: ArchNode[]
): { path: string; midX: number; midY: number } | null => {
  const fromNode = nodes.find((n) => n.id === conn.fromNode);
  const toNode = nodes.find((n) => n.id === conn.toNode);
  if (!fromNode || !toNode) return null;

  // Upward feedback flow (e.g. WebSocket Hub in Tier 4 pushed back up to Mobile Client in Tier 1)
  if (fromNode.y > toNode.y + 100) {
    const fromX = fromNode.x + fromNode.width;
    const fromY = fromNode.y + 40;
    const toX = toNode.x + toNode.width;
    const toY = toNode.y + 40;
    const rightArchX = Math.max(fromX, toX) + 130;

    const path = `M ${fromX} ${fromY} C ${rightArchX} ${fromY}, ${rightArchX} ${toY}, ${toX} ${toY}`;
    const midX = rightArchX - 15;
    const midY = (fromY + toY) / 2;
    return { path, midX, midY };
  }

  // Horizontal flow within the same tier (e.g. Domain Service -> WebSocket Hub)
  if (Math.abs(fromNode.y - toNode.y) < 80) {
    let fromX: number, toX: number;
    let fromY = fromNode.y + fromNode.height / 2;
    let toY = toNode.y + toNode.height / 2;

    if (fromNode.x < toNode.x) {
      fromX = fromNode.x + fromNode.width;
      toX = toNode.x;
    } else {
      fromX = fromNode.x;
      toX = toNode.x + toNode.width;
    }

    const dx = Math.abs(toX - fromX);
    const cp1X = fromNode.x < toNode.x ? fromX + dx * 0.4 : fromX - dx * 0.4;
    const cp2X = fromNode.x < toNode.x ? toX - dx * 0.4 : toX + dx * 0.4;

    const path = `M ${fromX} ${fromY} C ${cp1X} ${fromY}, ${cp2X} ${toY}, ${toX} ${toY}`;
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    return { path, midX, midY };
  }

  // Standard downward flow (Tier N -> Tier N+1)
  const fromCenterX = fromNode.x + fromNode.width / 2;
  const toCenterX = toNode.x + toNode.width / 2;

  const fromX = fromCenterX;
  const fromY = fromNode.y + fromNode.height;
  const toX = toCenterX;
  const toY = toNode.y;

  const dy = toY - fromY;
  const cp1X = fromX;
  const cp1Y = fromY + dy * 0.45;
  const cp2X = toX;
  const cp2Y = toY - dy * 0.45;

  const path = `M ${fromX} ${fromY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${toX} ${toY}`;
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;
  return { path, midX, midY };
};

export const getTierBadgeClass = (tierNumber: number): string => {
  switch (tierNumber) {
    case 1:
      return 'bg-tokyo-blue/20 text-tokyo-blue border-tokyo-blue/40';
    case 2:
      return 'bg-tokyo-purple/20 text-tokyo-purple border-tokyo-purple/40';
    case 3:
      return 'bg-tokyo-cyan/20 text-tokyo-cyan border-tokyo-cyan/40';
    case 4:
      return 'bg-emerald-400/20 text-emerald-400 border-emerald-400/40';
    case 5:
    default:
      return 'bg-amber-400/20 text-amber-400 border-amber-400/40';
  }
};

export const getTierDotColor = (tierNumber: number): string => {
  switch (tierNumber) {
    case 1:
      return 'bg-tokyo-blue';
    case 2:
      return 'bg-tokyo-purple';
    case 3:
      return 'bg-tokyo-cyan';
    case 4:
      return 'bg-emerald-400';
    case 5:
    default:
      return 'bg-amber-400';
  }
};
