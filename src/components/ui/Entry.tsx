import { TechChip } from './TechChip';

type EntryProps = {
  title: string;
  org: string;
  date: string;
  bullets: string[];
  tech?: string[];
  isLast: boolean;
};

/** One role on the timeline: a year marker on the left, a card on the right. */
export const Entry = ({ title, org, date, bullets, tech, isLast }: EntryProps) => {
  const year = date.match(/\d{4}/)?.[0] ?? '';

  return (
    <div className="relative flex gap-4 sm:gap-6">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-14 h-14 rounded-full bg-tokyo-blue text-tokyo-base text-sm font-bold flex items-center justify-center">
          {year}
        </div>
        {!isLast && <div className="w-px flex-1 bg-tokyo-blue/40 my-2" />}
      </div>

      <article className="flex-1 min-w-0 mb-8 rounded-xl border border-tokyo-border bg-tokyo-card p-5 sm:p-6 transition-colors hover:border-tokyo-blue/50">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
          <h3 className="text-lg font-semibold text-tokyo-fg">{title}</h3>
          <span className="text-sm text-tokyo-comment shrink-0">{date}</span>
        </div>
        <p className="text-sm text-tokyo-blue mb-4">{org}</p>
        <ul className="list-disc pl-5 space-y-2 text-tokyo-muted leading-relaxed marker:text-tokyo-comment">
          {bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
        {tech && tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-tokyo-border">
            {tech.map((t) => (
              <TechChip key={t} name={t} accent="blue" />
            ))}
          </div>
        )}
      </article>
    </div>
  );
};
