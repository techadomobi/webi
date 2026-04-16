import { motion } from 'framer-motion';

interface AnimatedWordsProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export default function AnimatedWords({ text, className = '', delay = 0, once = true }: AnimatedWordsProps) {
  const words = text.split(' ');

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.09, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 48, rotateX: -40 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: 'spring', stiffness: 260, damping: 22 },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={`inline ${className}`}
      style={{ perspective: '600px' }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            variants={child}
            style={{ display: 'inline-block' }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
