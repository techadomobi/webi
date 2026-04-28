import React from "react";

// Generates a random float between min and max
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export interface BubblesProps {
  count?: number;
  className?: string;
}

export default function Bubbles({ count = 24, className = "" }: BubblesProps) {
  // Generate bubbles only once
  const bubbles = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = rand(12, 32); // px
      const left = rand(0, 100); // %
      const delay = rand(0, 8); // s
      const duration = rand(8, 18); // s
      const blur = rand(0, 2) > 1 ? 2 : 0;
      return { size, left, delay, duration, blur };
    });
  }, [count]);

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 ${className}`} aria-hidden>
      {bubbles.map((b, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${b.left}%`,
            bottom: `-${b.size * 2}px`,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: "rgba(124,58,237,0.13)",
            filter: `blur(${b.blur}px)`,
            opacity: 0.7,
            animation: `bubble-float ${b.duration}s ease-in infinite`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
