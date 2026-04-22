import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.01,
    filter: 'blur(4px)',
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial={false}
      animate="animate"
      exit="exit"
      className="w-full min-h-[calc(100vh-5rem)] flex flex-col"
    >
      {children}
    </motion.div>
  );
}
