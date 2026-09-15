import React from 'react';
import { Zap, Volume2, VolumeX, Code2, Gift, Sparkles } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenExportModal: () => void;
  partnerName: string;
  senderName: string;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenExportModal,
  partnerName,
  senderName,
}) => {
  return (
    <header className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b border-slate-800/80">
      {/* Brand / Logo */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <Zap className="w-5 h-5 fill-emerald-400 text-emerald-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-extrabold text-sm sm:text-base tracking-wider text-white">
              LEVEL UP PROTOCOL
            </span>
            <span className="text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 font-bold uppercase tracking-wider">
              MAINNET
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono mt-0.5">
            <span className="text-slate-400">BIRTHDAY EDITION:</span>
            <span className="font-bold text-emerald-400">{partnerName}</span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-slate-400">FROM:</span>
            <span className="font-bold text-amber-400">{senderName}</span>
          </div>
        </div>
      </div>

      {/* Action controls (Uneditable - No Edit Options) */}
      <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
        {/* Firebase Cloud Sync Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 font-mono text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>FIRESTORE SYNCED</span>
        </div>

        {/* September 15 Date Badge - Colorful & Prominent */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(6,182,212,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>SEPTEMBER 15</span>
        </div>

        {/* Gift Attribution Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-950/25 text-amber-300 font-semibold shadow-[0_0_12px_rgba(245,158,11,0.15)]">
          <Gift className="w-3.5 h-3.5 text-amber-400" />
          <span>GIFT FROM {senderName}</span>
        </div>

        {/* Export HTML code button */}
        <button
          onClick={onOpenExportModal}
          title="Export Single-File Standalone HTML"
          className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-700 hover:border-emerald-500/50 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Code2 className="w-3.5 h-3.5 text-teal-400" />
          <span className="hidden sm:inline">HTML Export</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute Sound Effects' : 'Unmute Sound Effects'}
          className="p-2 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-900/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-500" />
          )}
        </button>
      </div>
    </header>
  );
};
