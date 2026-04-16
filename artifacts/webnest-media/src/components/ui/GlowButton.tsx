import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export default function GlowButton({ children, onClick, className = '', variant = 'primary', size = 'md' }: GlowButtonProps) {
  const sizeClasses = {
    sm: 'h-10 px-6 text-sm',
    md: 'h-12 px-8 text-base',
    lg: 'h-14 px-10 text-lg',
  };

  const baseClasses = 'relative rounded-full font-semibold overflow-hidden inline-flex items-center justify-center gap-2 transition-shadow duration-300';

  const variantClasses = {
    primary: 'bg-gradient-brand text-white shadow-lg hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]',
    outline: 'border-2 border-primary/30 text-primary bg-transparent hover:border-primary hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]',
    white: 'bg-white text-foreground shadow-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]',
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.3) 50%, transparent 80%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
