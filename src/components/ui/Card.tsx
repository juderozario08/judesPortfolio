import { motion } from 'framer-motion';
import { TerminalHeader } from './TerminalHeader';

type CardProps = {
  index: number;
  children: React.ReactNode;
  className?: string;
  hoverColor?: "tokyo-blue" | "tokyo-purple" | "tokyo-cyan";
};

export const Card = ({ index, children, className = "", hoverColor = "tokyo-blue" }: CardProps) => {
  const hoverBorderClasses = {
    "tokyo-blue": "hover:border-tokyo-blue/50",
    "tokyo-purple": "hover:border-tokyo-purple/50",
    "tokyo-cyan": "hover:border-tokyo-cyan/50",
  }[hoverColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: Math.min(index * 0.1, 0.4), duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="h-full z-10"
    >
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`bg-tokyo-surface p-0 flex flex-col h-full border border-transparent transition-colors ${hoverBorderClasses} ${className} rounded-xl`}
      >
        <TerminalHeader title="user@archlinux:~" />
        <div className="p-8 flex flex-col h-full z-10 relative">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};
