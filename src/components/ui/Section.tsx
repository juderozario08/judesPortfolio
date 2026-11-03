import { motion } from 'framer-motion';

export type SectionAccent = 'purple' | 'blue' | 'cyan' | 'green' | 'orange';

const BAR: Record<SectionAccent, string> = {
  purple: 'bg-tokyo-purple',
  blue: 'bg-tokyo-blue',
  cyan: 'bg-tokyo-cyan',
  green: 'bg-tokyo-green',
  orange: 'bg-tokyo-orange',
};

type SectionProps = {
  id: string;
  title: string;
  accent?: SectionAccent;
  children: React.ReactNode;
};

export const Section = ({ id, title, accent = 'purple', children }: SectionProps) => (
  <section id={id} className="px-6 py-14 md:py-20">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-5xl mx-auto"
    >
      <h2 className="flex items-center gap-3 text-3xl font-bold text-tokyo-fg mb-10">
        <span className={`w-1.5 h-8 rounded-full ${BAR[accent]}`} aria-hidden />
        {title}
      </h2>
      {children}
    </motion.div>
  </section>
);
