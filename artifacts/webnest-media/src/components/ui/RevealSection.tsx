import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

type Variant = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'clipLeft' | 'rotate';

interface RevealSectionProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const variants: Record<Variant, { hidden: object; visible: object }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  clipLeft: {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
    visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1 },
  },
  rotate: {
    hidden: { opacity: 0, y: 40, rotate: -4 },
    visible: { opacity: 1, y: 0, rotate: 0 },
  },
};

export default function RevealSection({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
}: RevealSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      variants={variants[variant]}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
