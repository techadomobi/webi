const orbs = [
  { size: 500, x: '70%', y: '-10%', color: 'rgba(99, 102, 241, 0.18)', duration: 18, delay: 0 },
  { size: 400, x: '-5%', y: '40%', color: 'rgba(168, 85, 247, 0.14)', duration: 22, delay: 3 },
  { size: 350, x: '80%', y: '60%', color: 'rgba(236, 72, 153, 0.12)', duration: 26, delay: 6 },
  { size: 280, x: '30%', y: '80%', color: 'rgba(99, 102, 241, 0.10)', duration: 20, delay: 2 },
  { size: 200, x: '50%', y: '20%', color: 'rgba(168, 85, 247, 0.10)', duration: 15, delay: 8 },
];

export default function FloatingOrbs({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map((orb, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            borderRadius: '50%',
            background: orb.color,
            filter: 'blur(80px)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
}
