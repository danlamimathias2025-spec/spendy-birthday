import React from 'react';

interface FallingItem {
  id: number;
  text: string;
  left: number; // percentage 0-100
  duration: number; // seconds
  delay: number; // seconds (negative so they appear mid-fall immediately)
  rotation: number; // degrees
  colorClass: string;
  opacity: number;
  fontSize: string;
}

// Staggered falling typography particles representing the birthday celebration
const FALLING_STREAMS: FallingItem[] = [
  {
    id: 1,
    text: '✨ HAPPY SPECIAL BIRTHDAY SPENDY ✨',
    left: 3,
    duration: 16,
    delay: -4,
    rotation: -4,
    colorClass: 'text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.7)]',
    opacity: 0.55,
    fontSize: 'text-xs sm:text-sm',
  },
  {
    id: 2,
    text: '★ HAPPY SPECIAL BIRTHDAY SPENDY ★',
    left: 11,
    duration: 21,
    delay: -11,
    rotation: 2,
    colorClass: 'text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]',
    opacity: 0.45,
    fontSize: 'text-[11px] sm:text-xs',
  },
  {
    id: 3,
    text: 'HAPPY SPECIAL BIRTHDAY SPENDY',
    left: 19,
    duration: 14,
    delay: -2,
    rotation: -3,
    colorClass: 'text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]',
    opacity: 0.5,
    fontSize: 'text-xs sm:text-sm',
  },
  {
    id: 4,
    text: '🎂 HAPPY SPECIAL BIRTHDAY SPENDY 🎂',
    left: 27,
    duration: 19,
    delay: -15,
    rotation: 5,
    colorClass: 'text-fuchsia-300 drop-shadow-[0_0_10px_rgba(217,70,239,0.6)]',
    opacity: 0.45,
    fontSize: 'text-[10px] sm:text-xs',
  },
  {
    id: 5,
    text: '✨ HAPPY SPECIAL BIRTHDAY SPENDY ✨',
    left: 35,
    duration: 17,
    delay: -7,
    rotation: -2,
    colorClass: 'text-amber-200 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)]',
    opacity: 0.55,
    fontSize: 'text-xs sm:text-sm',
  },
  {
    id: 6,
    text: '★ LEVEL 24 UNLOCKED ★ SPENDY',
    left: 42,
    duration: 23,
    delay: -18,
    rotation: 3,
    colorClass: 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]',
    opacity: 0.4,
    fontSize: 'text-[10px] sm:text-xs',
  },
  {
    id: 7,
    text: 'HAPPY SPECIAL BIRTHDAY SPENDY',
    left: 50,
    duration: 15,
    delay: -5,
    rotation: 0,
    colorClass: 'text-cyan-200 drop-shadow-[0_0_10px_rgba(103,232,249,0.6)]',
    opacity: 0.5,
    fontSize: 'text-xs sm:text-sm',
  },
  {
    id: 8,
    text: '✨ HAPPY SPECIAL BIRTHDAY SPENDY ✨',
    left: 58,
    duration: 18,
    delay: -13,
    rotation: -4,
    colorClass: 'text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.7)]',
    opacity: 0.55,
    fontSize: 'text-xs sm:text-sm',
  },
  {
    id: 9,
    text: '★ HAPPY SPECIAL BIRTHDAY SPENDY ★',
    left: 66,
    duration: 22,
    delay: -9,
    rotation: 4,
    colorClass: 'text-teal-300 drop-shadow-[0_0_10px_rgba(45,212,191,0.6)]',
    opacity: 0.45,
    fontSize: 'text-[11px] sm:text-xs',
  },
  {
    id: 10,
    text: 'HAPPY SPECIAL BIRTHDAY SPENDY',
    left: 74,
    duration: 16,
    delay: -3,
    rotation: -2,
    colorClass: 'text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]',
    opacity: 0.5,
    fontSize: 'text-xs sm:text-sm',
  },
  {
    id: 11,
    text: '🎂 HAPPY SPECIAL BIRTHDAY SPENDY 🎂',
    left: 82,
    duration: 20,
    delay: -16,
    rotation: 3,
    colorClass: 'text-amber-200 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]',
    opacity: 0.45,
    fontSize: 'text-[11px] sm:text-xs',
  },
  {
    id: 12,
    text: '✨ HAPPY SPECIAL BIRTHDAY SPENDY ✨',
    left: 90,
    duration: 17,
    delay: -8,
    rotation: -3,
    colorClass: 'text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]',
    opacity: 0.55,
    fontSize: 'text-xs sm:text-sm',
  },
  {
    id: 13,
    text: '★ HAPPY SPECIAL BIRTHDAY SPENDY ★',
    left: 96,
    duration: 24,
    delay: -12,
    rotation: 2,
    colorClass: 'text-purple-300 drop-shadow-[0_0_10px_rgba(192,132,252,0.6)]',
    opacity: 0.4,
    fontSize: 'text-[10px] sm:text-xs',
  }
];

export const FallingBirthdayText: React.FC = () => {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {FALLING_STREAMS.map((item) => (
        <div
          key={item.id}
          className="absolute animate-falling-text whitespace-nowrap font-mono font-black tracking-wider uppercase"
          style={{
            left: `${item.left}%`,
            top: 0,
            ['--fall-duration' as any]: `${item.duration}s`,
            ['--fall-delay' as any]: `${item.delay}s`,
            ['--fall-rot' as any]: `${item.rotation}deg`,
            ['--fall-max-opacity' as any]: item.opacity,
          }}
        >
          <span 
            className={`inline-block px-2.5 py-1 rounded-full bg-slate-950/40 backdrop-blur-[2px] border border-white/10 ${item.colorClass} ${item.fontSize}`}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};
