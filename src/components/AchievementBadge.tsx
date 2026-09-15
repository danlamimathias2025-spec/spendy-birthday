import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, CheckCircle2, Sparkles, X, FileText, ChevronRight } from 'lucide-react';
import { fireBirthdayConfetti } from '../utils/confetti';

interface AchievementBadgeProps {
  isVisible: boolean;
  onReopenReceipt: () => void;
  age?: number;
  partnerName?: string;
  senderName?: string;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  isVisible,
  onReopenReceipt,
  age = 24,
  partnerName = 'SPENDY',
  senderName = 'SPLENZZY',
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isVisible || isDismissed) return null;

  const handleCelebrate = (e: React.MouseEvent) => {
    e.stopPropagation();
    fireBirthdayConfetti();
  };

  return (
    <AnimatePresence>
      <motion.div
        id="achievement-badge"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="fixed bottom-24 sm:bottom-28 right-3 sm:right-6 z-40 max-w-[340px] sm:max-w-sm w-full"
      >
        <div
          onClick={onReopenReceipt}
          className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-900/95 p-3.5 sm:p-4 border-2 border-emerald-400/50 shadow-2xl shadow-emerald-950/80 backdrop-blur-xl transition-all duration-300 hover:border-emerald-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]"
        >
          {/* Ambient top light beam */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400"></div>

          {/* Corner close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDismissed(true);
            }}
            className="absolute top-2.5 right-2.5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="Dismiss Badge"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-start gap-3">
            {/* Trophy / Level Icon with glowing background */}
            <div className="relative shrink-0 mt-0.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/25 via-emerald-500/20 to-teal-500/10 border border-amber-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.25)] group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6 text-amber-300" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-slate-950 font-bold" />
              </span>
            </div>

            {/* Badge Content */}
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded border border-amber-400/30">
                  PROTOCOL COMPLETE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>

              <div className="mt-1 flex items-baseline gap-1.5">
                <h4 className="text-sm sm:text-base font-black font-mono text-white tracking-tight">
                  Level {age} Unlocked
                </h4>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  ★ TODAY
                </span>
              </div>

              <p className="text-[11px] text-slate-300 font-mono mt-0.5 line-clamp-1">
                Honoree: <strong className="text-emerald-300">{partnerName}</strong> &bull; From: <strong className="text-amber-300">{senderName}</strong>
              </p>

              {/* Action buttons footer */}
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={onReopenReceipt}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/30 text-[11px] font-mono font-bold transition-all"
                >
                  <FileText className="w-3 h-3" />
                  <span>View Receipt</span>
                  <ChevronRight className="w-3 h-3 ml-0.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={handleCelebrate}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 text-[11px] font-mono font-bold border border-slate-700 transition-colors"
                  title="Celebrate Again"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Confetti</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
