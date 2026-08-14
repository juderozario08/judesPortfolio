import { motion } from 'framer-motion';

type SectionProps = {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
  color?: "tokyo-blue" | "tokyo-purple" | "tokyo-cyan";
};

export const Section = ({ id, number, title, children, color = "tokyo-blue" }: SectionProps) => {
  const colorClass = {
    "tokyo-blue": "text-tokyo-blue neon-text-blue",
    "tokyo-purple": "text-tokyo-purple neon-text-purple",
    "tokyo-cyan": "text-tokyo-cyan neon-text-cyan",
  }[color];

  return (
    <section id={id} className="py-24 px-6 md:px-20 min-h-[80vh] bg-tokyo-base flex flex-col justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto w-full"
      >
        <h2 className={`text-3xl md:text-4xl font-bold ${colorClass} mb-16 flex items-center gap-4`}>
          <span className="text-tokyo-muted text-xl font-mono font-normal">{number}.</span>
          {title}
          <div className="h-px bg-tokyo-surface flex-grow ml-4 border-t border-tokyo-surface/50"></div>
        </h2>
        {children}
      </motion.div>
    </section>
  );
};
