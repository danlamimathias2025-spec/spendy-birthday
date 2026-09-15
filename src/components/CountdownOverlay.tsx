import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ShieldAlert, Sparkles, Gift, Lock, Calendar } from 'lucide-react';

interface CountdownOverlayProps {
  isActive: boolean;
  count: number; // 3, 2, 1, 0
  partnerName: string;
  senderName: string;
  age: number; // 24
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({
  isActive,
  count,
  partnerName,
  senderName,
  age,
}) => {
  if (!isActive) return null;

  const getPhaseDetails = (num: number) => {
    switch (num) {
      case 3:
        return {
          title: 'SYNCHRONIZING VERIFIED NODES',
          subtitle: `Initiating Age ${age} Level-Up Sequence...`,
          accent: 'from-emerald-400 to-teal-400',
          textColor: 'text-emerald-400',
          borderColor: 'border-emerald-500/40',
          ringColor: '#10B981',
          progress: 33,
        };
      case 2:
        return {
          title: 'OVERRIDING INSTITUTIONAL BANK HOLD',
          subtitle: 'Zero-Block Settlement Verification Underway...',
          accent: 'from-amber-400 to-yellow-400',
          textColor: 'text-amber-300',
          borderColor: 'border-amber-500/40',
          ringColor: '#F59E0B',
          progress: 66,
        };
      case 1:
        return {
          title: 'DISPATCHING BIRTHDAY MESSAGE',
          subtitle: `Delivering VIP Drop from ${senderName} to ${partnerName}...`,
          accent: 'from-cyan-400 to-teal-300',
          textColor: 'text-cyan-300',
          borderColor: 'border-cyan-500/40',
          ringColor: '#06B6D4',
          progress: 95,
        };
      default:
        return {
          title: `AGE ${age} UNLOCKED`,
          subtitle: 'Settlement Confirmed!',
          accent: 'from-emerald-400 via-teal-300 to-amber-400',
          textColor: 'text-white',
          borderColor: 'border-emerald-400',
          ringColor: '#10B981',
          progress: 100,
        };
    }
  };

  const phase = getPhaseDetails(count);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          id="countdown-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl select-none"
        >
          {/* Animated Background Grid & Neon Halo */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0%,transparent_70%)] pointer-events-none" />

          {/* Centered HUD Card */}
          <motion.div
            initial={{ scale: 0.88, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900/95 border-2 ${phase.borderColor} shadow-2xl shadow-emerald-950/60 text-center overflow-hidden`}
          >
            {/* Top scanning accent beam */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${phase.accent} animate-pulse`} />

            {/* Header pill */}
            <div className="mt-4 mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-300 font-bold">TRANSACTION IN FLIGHT:</span>
              <span className="text-amber-300 font-extrabold">{senderName}</span>
              <span className="text-slate-500">➔</span>
              <span className="text-emerald-300 font-extrabold">{partnerName}</span>
            </div>

            {/* Countdown Circular Centerpiece */}
            <div className="relative my-4 flex items-center justify-center">
              {/* Outer rotating cyber ring */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    className="text-slate-800 stroke-current"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  {/* Animated Progress Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke={phase.ringColor}
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="transparent"
                    strokeDasharray={264}
                    strokeDashoffset={264 - (264 * phase.progress) / 100}
                    style={{ transition: 'stroke-dashoffset 0.8s ease-out, stroke 0.3s ease' }}
                  />
                </svg>

                {/* Pulsing center number */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={count}
                      initial={{ scale: 1.6, opacity: 0, y: -10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.6, opacity: 0, y: 15 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 350 }}
                      className="flex flex-col items-center justify-center"
                    >
                      <span className={`text-6xl sm:text-7xl font-black font-mono tracking-tighter ${phase.textColor} drop-shadow-[0_0_25px_currentColor]`}>
                        {count > 0 ? count : 'GO!'}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-widest mt-1">
                        {count > 0 ? 'SECONDS' : 'CONFIRMED'}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Dynamic Status Display */}
            <div className="mt-2 space-y-1.5">
              <div className="text-xs sm:text-sm font-mono font-extrabold text-white tracking-wide uppercase">
                {phase.title}
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {phase.subtitle}
              </p>
            </div>

            {/* Milestone Info Badge (Age 24 Today!) */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>LEVEL {age} UNLOCKED TODAY</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>SEPTEMBER 15</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
