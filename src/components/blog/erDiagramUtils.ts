import {
  RADIUS_SCHEMA_TABLES,
  type SchemaRelation,
} from '../../data/radiusSchema';

export const CANVAS_WIDTH = 3400;
export const CANVAS_HEIGHT = 2400;

/**
 * Calculates clean SVG Bézier curve paths between tables in the ER diagram.
 */
export const calculatePath = (rel: SchemaRelation): string | null => {
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

/**
 * Returns a Tailwind color badge class for a given schema domain.
 */
export const getDomainColor = (domain: string): string => {
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
