import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Zap, ArrowRightLeft } from 'lucide-react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  vx: number;
  vy: number;
}

interface SparkleButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  isProcessing?: boolean;
  countdown?: number | null;
}

export const SparkleButton: React.FC<SparkleButtonProps> = ({
  onClick,
  disabled = false,
  label = 'EXECUTE NEXT TRANSACTION',
  isProcessing = false,
  countdown = null,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; isHovering: boolean }>({
    x: 0,
    y: 0,
    isHovering: false,
  });

  const nextIdRef = useRef(0);
  const lastEmitTimeRef = useRef(0);

  // Sparkle colors: diamond white, radiant emerald, warm golden yellow
  const sparkleColors = ['#FFFFFF', '#34D399', '#FBBF24', '#6EE7B7', '#FDE047'];

  const addSparkle = useCallback((clientX: number, clientY: number, count = 1) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newSparkles: Sparkle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.8 + 0.5;
      newSparkles.push({
        id: nextIdRef.current++,
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 16,
        size: Math.random() * 8 + 6,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        rotation: Math.random() * 90,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.8, // gentle upward drift
      });
    }

    setSparkles((prev) => [...prev.slice(-30), ...newSparkles]);
  }, []);

  // Handle mouse move across the button to generate sparkles
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y, isHovering: true });

    const now = Date.now();
    // Throttle sparkle emission rate to keep it subtle & performant
    if (now - lastEmitTimeRef.current > 45) {
      lastEmitTimeRef.current = now;
      addSparkle(e.clientX, e.clientY, 2);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top, isHovering: true });
    // Burst a few on enter
    addSparkle(e.clientX, e.clientY, 3);
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isHovering: false }));
  };

  // Sparkle animation loop (updates positions and removes old sparkles)
  useEffect(() => {
    if (sparkles.length === 0) return;

    const interval = setInterval(() => {
      setSparkles((prev) =>
        prev
          .map((sp) => ({
            ...sp,
            x: sp.x + sp.vx,
            y: sp.y + sp.vy,
            size: sp.size * 0.92,
            rotation: sp.rotation + 4,
          }))
          .filter((sp) => sp.size > 0.8)
      );
    }, 24);

    return () => clearInterval(interval);
  }, [sparkles.length]);

  return (
    <div className="relative inline-block">
      {/* Ambient background bloom glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 rounded-2xl blur-xl opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse pointer-events-none" />

      <button
        ref={buttonRef}
        id="execute-transaction-btn"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={disabled}
        aria-label={label}
        className="animate-pulse-glow group relative inline-flex items-center justify-center gap-3 px-8 sm:px-11 py-4 sm:py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-mono font-bold text-base sm:text-lg tracking-wider transition-all duration-200 cursor-pointer select-none border border-emerald-300/40 shadow-2xl shadow-emerald-500/30 overflow-hidden"
      >
        {/* Mouse Tracking Radial Glare */}
        {mousePos.isHovering && (
          <div
            className="absolute pointer-events-none transition-opacity duration-150 rounded-2xl"
            style={{
              inset: 0,
              background: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.32), transparent 70%)`,
            }}
          />
        )}

        {/* Floating Star / Diamond Sparkles following mouse */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {sparkles.map((sp) => (
            <svg
              key={sp.id}
              className="absolute pointer-events-none"
              style={{
                left: `${sp.x}px`,
                top: `${sp.y}px`,
                width: `${sp.size * 2}px`,
                height: `${sp.size * 2}px`,
                transform: `translate(-50%, -50%) rotate(${sp.rotation}deg)`,
                color: sp.color,
                filter: 'drop-shadow(0 0 4px currentColor)',
              }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              {/* 4-point magical diamond sparkle star */}
              <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
            </svg>
          ))}
        </div>

        {/* Lightning or Trade Icon */}
        <span className="relative flex items-center justify-center z-10">
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 fill-slate-950" />
        </span>

        {/* Button Text */}
        <span className="relative z-10 font-extrabold tracking-wider">
          {isProcessing
            ? countdown && countdown > 0
              ? `COUNTDOWN: ${countdown}S...`
              : 'BROADCASTING TRANSACTION...'
            : label}
        </span>

        <ArrowRightLeft className="relative z-10 w-4 h-4 text-slate-900 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </button>
    </div>
  );
};
