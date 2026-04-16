import { useRef, useState, ReactNode } from 'react';
import { motion, useSpring } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({ children, className = '', intensity = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });
  const scale = useSpring(1, { stiffness: 300, damping: 25 });
  const glowX = useSpring(50, { stiffness: 200, damping: 25 });
  const glowY = useSpring(50, { stiffness: 200, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateY.set((x - 0.5) * intensity * 2);
    rotateX.set((0.5 - y) * intensity * 2);
    glowX.set(x * 100);
    glowY.set(y * 100);
  }

  function handleMouseEnter() {
    setHovered(true);
    scale.set(1.03);
  }

  function handleMouseLeave() {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    glowX.set(50);
    glowY.set(50);
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, scale, perspective: 1000, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer ${className}`}
    >
      {/* Glow layer */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, rgba(99,102,241,0.15) 0%, transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
