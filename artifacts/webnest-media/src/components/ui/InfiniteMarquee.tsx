import { motion } from 'framer-motion';

interface InfiniteMarqueeProps {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
  itemClassName?: string;
}

export default function InfiniteMarquee({
  items,
  speed = 30,
  direction = 'left',
  className = '',
  itemClassName = '',
}: InfiniteMarqueeProps) {
  const duplicated = [...items, ...items, ...items];
  const totalWidth = items.length * 200;

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <motion.div
        style={{ display: 'inline-flex', gap: '3rem', alignItems: 'center' }}
        animate={{ x: direction === 'left' ? [-totalWidth, 0] : [0, -totalWidth] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
      >
        {duplicated.map((item, i) => (
          <span key={i} className={`shrink-0 font-display font-bold text-xl ${itemClassName}`}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
