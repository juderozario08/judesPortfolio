import { leadership } from '../data/resume';
import { Section } from './ui/Section';
import { Card } from './ui/Card';

const LeadershipItem = ({ item, index }: { item: typeof leadership[0], index: number }) => (
  <Card index={index} hoverColor="tokyo-cyan" className="mb-6">
    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
      <div>
        <h3 className="text-2xl font-bold text-tokyo-fg group-hover:text-tokyo-cyan transition-colors">{item.title}</h3>
        <h4 className="text-lg text-tokyo-blue font-mono">{item.organization}</h4>
      </div>
      <span className="text-tokyo-muted font-mono text-sm shrink-0 bg-tokyo-base px-3 py-1 rounded-full border border-tokyo-surface">
        {item.date}
      </span>
    </div>
    <ul className="list-none space-y-3 text-tokyo-muted leading-relaxed">
      {item.bullets.map((bullet: string, i: number) => {
        const colonMatch = bullet.match(/^([^:]+):\s+(.+)$/);
        return (
          <li key={i} className="flex items-start gap-3">
            <span className="text-tokyo-cyan font-mono font-bold mt-1 text-sm shrink-0">{">"}</span>
            <span>
              {colonMatch ? (
                <>
                  <strong className="text-tokyo-fg font-bold font-sans">
                    {colonMatch[1]}:
                  </strong>{' '}
                  {colonMatch[2]}
                </>
              ) : (
                bullet
              )}
            </span>
          </li>
        );
      })}
    </ul>
  </Card>
);

const Leadership = () => {
  return (
    <Section id="leadership" number="05" title="Extracurricular and Leadership" color="tokyo-cyan">
      <div>
        {leadership.map((item, index) => (
          <LeadershipItem key={index} item={item} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default Leadership;
