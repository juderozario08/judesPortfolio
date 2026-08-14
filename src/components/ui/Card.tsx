import { motion } from 'framer-motion';

type CardProps = {
  index: number;
  children: React.ReactNode;
  className?: string;
  hoverColor?: "tokyo-blue" | "tokyo-purple" | "tokyo-cyan";
};

export const Card = ({ index, children, className = "", hoverColor = "tokyo-blue" }: CardProps) => {
  const shadowClasses = {
    "tokyo-blue": "hover:shadow-[0_10px_30px_-15px_rgba(122,162,247,0.3)] hover:border-tokyo-blue/30",
    "tokyo-purple": "hover:shadow-[0_10px_30px_-15px_rgba(187,154,247,0.3)] hover:border-tokyo-purple/30",
    "tokyo-cyan": "hover:shadow-[0_10px_30px_-15px_rgba(125,207,255,0.3)] hover:border-tokyo-cyan/30",
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
        whileHover={{ scale: 1.02 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        className={`bg-tokyo-surface p-8 rounded-xl flex flex-col h-full border border-transparent relative group ${shadowClasses} ${className}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
