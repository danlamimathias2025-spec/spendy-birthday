import React from 'react';
import { ShieldCheck, Flame, Layers, Gift, Sparkles, Calendar } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { SparkleButton } from './SparkleButton';

interface HeroSectionProps {
  onExecute: () => void;
  isProcessing?: boolean;
  countdown?: number | null;
  age?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExecute,
  isProcessing = false,
  countdown = null,
  age = 24,
}) => {
  return (
    <main
      id="main-hero-section"
      className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 md:py-16 max-w-4xl mx-auto w-full text-center"
    >
      {/* 1. Status Badge */}
      <div className="mb-5 sm:mb-6">
        <StatusBadge />
      </div>

      {/* Prominent Large & Colorful Birthday Attribution Hero Banner */}
      <div className="mb-6 w-full max-w-2xl px-4 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-amber-950/40 border border-emerald-500/40 shadow-xl shadow-emerald-950/40 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        {/* Present Attribution */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-left">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/25 to-yellow-500/10 border border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
            <Gift className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-amber-300/90 font-bold flex items-center gap-1.5">
              <span>EXCLUSIVE BIRTHDAY PRESENT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            </div>
            <div className="text-sm sm:text-base font-extrabold font-mono tracking-wide mt-0.5">
              <span className="text-amber-300 font-black">SPLENZZY</span>
              <span className="text-emerald-400 mx-2 font-bold text-lg">➔</span>
              <span className="text-emerald-300 font-black text-base sm:text-lg">SPENDY</span>
            </div>
          </div>
        </div>

        {/* Milestone Age 24 & September 15 Date Pill */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-black shadow-[0_0_12px_rgba(16,185,129,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>TURNING {age} TODAY</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold shadow-[0_0_12px_rgba(6,182,212,0.2)]">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-wider">SEP 15</span>
          </div>
        </div>
      </div>

      {/* 2. Main Heading */}
      <div className="relative mb-4 sm:mb-5">
        <h1
          id="main-heading"
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-mono uppercase selection:bg-emerald-500/40"
        >
          LEVEL UP{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
            PROTOCOL
          </span>
        </h1>

        {/* Decorative glowing horizontal cyber tick marks */}
        <div className="flex items-center justify-center gap-3 mt-3 opacity-80">
          <div className="h-[1px] w-8 sm:w-20 bg-gradient-to-r from-transparent via-emerald-400 to-emerald-500"></div>
          <div className="text-xs font-mono font-bold tracking-widest text-emerald-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>LEVEL {age} BIRTHDAY ALLOCATION // UNLOCKED</span>
          </div>
          <div className="h-[1px] w-8 sm:w-20 bg-gradient-to-l from-transparent via-emerald-400 to-emerald-500"></div>
        </div>
      </div>

      {/* 3. Subtitle with Large, Colorful Important Info */}
      <p
        id="main-subtitle"
        className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mb-8 sm:mb-10 leading-relaxed font-sans font-normal"
      >
        Process the pending birthday drop for honoree{' '}
        <span className="inline-block font-extrabold text-emerald-300 font-mono bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-md text-base sm:text-lg">
          SPENDY
        </span>{' '}
        who entered{' '}
        <span className="inline-block font-black text-amber-300 font-mono bg-amber-500/20 border border-amber-500/40 px-2.5 py-0.5 rounded-md text-base sm:text-lg shadow-[0_0_10px_rgba(245,158,11,0.2)]">
          {age} TODAY
        </span>{' '}
        to bypass traditional institutional bank holds — an exclusive birthday asset protocol minted by{' '}
        <span className="inline-block font-extrabold text-amber-300 font-mono bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-md text-base sm:text-lg">
          SPLENZZY
        </span>.
      </p>

      {/* 4. Primary Action Button with Mouse-Tracking Sparkle Effect & 3s Countdown State */}
      <SparkleButton
        onClick={onExecute}
        disabled={isProcessing}
        isProcessing={isProcessing}
        countdown={countdown}
        label="EXECUTE NEXT TRANSACTION"
      />

      {/* Live Fintech / Web3 Telemetry Strip */}
      <div
        id="hero-telemetry-strip"
        className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono text-slate-300"
      >
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Settlement Speed:</span>
          <span className="text-emerald-300 font-bold">Instant (0 Blocks)</span>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>Institutional Hold:</span>
          <span className="text-amber-300 font-bold">100% Bypassed</span>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-teal-500/30 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
          <Flame className="w-4 h-4 text-teal-400" />
          <span>Network Fee:</span>
          <span className="text-teal-300 font-bold">$0.00 (Gift Subsidized)</span>
        </div>
      </div>
    </main>
  );
};
