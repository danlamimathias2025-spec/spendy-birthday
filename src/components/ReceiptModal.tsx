import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  ExternalLink,
  Share2,
  Gift,
  Heart,
  Calendar,
  Lock,
} from 'lucide-react';
import { PartnerReceiptData } from '../types';
import { fireBirthdayConfetti } from '../utils/confetti';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PartnerReceiptData;
  onOpenExportModal?: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  data,
  onOpenExportModal,
}) => {
  const [copiedTx, setCopiedTx] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleCopyTx = () => {
    navigator.clipboard.writeText(data.transactionId);
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  const handleCopySummary = () => {
    const summary = `🎁 OFFICIAL BIRTHDAY PRESENT RECEIPT [SETTLED]
Sender: ${data.senderName || 'SPLENZZY'}
Recipient: ${data.partnerName}
Date: September 15
TX Hash: ${data.transactionId}
Age Unlocked: ${data.ageUnlocked} Years (+1 Tier)
Bank Status: ${data.bankStatus}

💌 Message from SPLENZZY:
"${data.partnerNote}"`;
    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="receipt-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md transition-all"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="relative w-full max-w-2xl my-auto flex flex-col items-center gap-2 sm:gap-3">
            {/* Real-time horizontal scrolling banner ABOVE the pop-up message */}
            <motion.div
              id="birthday-scrolling-marquee"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="w-full overflow-hidden rounded-2xl bg-slate-950/95 border-2 border-emerald-400/60 shadow-[0_0_35px_rgba(16,185,129,0.4)] py-2 sm:py-2.5 px-2 backdrop-blur-xl relative"
            >
              {/* Neon top accent glow bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 animate-pulse" />
              
              <div className="flex select-none whitespace-nowrap overflow-hidden">
                <div className="animate-marquee inline-flex items-center gap-6 font-mono font-black text-xs sm:text-sm tracking-wider uppercase">
                  <span className="text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.7)] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                    HAPPY SPECIAL BIRTHDAY SPENDY
                  </span>
                  <span className="text-slate-600">//</span>
                  <span className="text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]">
                    ★ LEVEL 24 UNLOCKED ★
                  </span>
                  <span className="text-slate-600">//</span>
                  <span className="text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]">
                    VIP BIRTHDAY DROP FROM SPLENZZY
                  </span>
                  <span className="text-slate-600">//</span>
                  <span className="text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.7)] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                    HAPPY SPECIAL BIRTHDAY SPENDY
                  </span>
                  <span className="text-slate-600">//</span>
                  <span className="text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]">
                    ★ LEVEL 24 UNLOCKED ★
                  </span>
                  <span className="text-slate-600">//</span>
                  <span className="text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]">
                    VIP BIRTHDAY DROP FROM SPLENZZY
                  </span>
                  <span className="text-slate-600">//</span>
                </div>
                <div className="animate-marquee inline-flex items-center gap-6 font-mono font-black text-xs sm:text-sm tracking-wider uppercase" aria-hidden="true">
                  <span className="text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.7)] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                    HAPPY SPECIAL BIRTHDAY SPENDY
                  </span>
                  <span className="text-slate-600">//</span>
                  <span className="text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]">
                    ★ LEVEL 24 UNLOCKED ★
                  </span>
                  <span className="text-slate-600">//</span>
                  <span className="text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]">
                    VIP BIRTHDAY DROP FROM SPLENZZY
                  </span>
                  <span className="text-slate-600">//</span>
                  <span className="text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.7)] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                    HAPPY SPECIAL BIRTHDAY SPENDY
                  </span>
                  <span className="text-slate-600">//</span>
                  <span className="text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]">
                    ★ LEVEL 24 UNLOCKED ★
                  </span>
                  <span className="text-slate-600">//</span>
                  <span className="text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]">
                    VIP BIRTHDAY DROP FROM SPLENZZY
                  </span>
                  <span className="text-slate-600">//</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              id="partnership-receipt-card"
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="relative w-full rounded-3xl bg-slate-900 border-2 border-slate-700 shadow-2xl shadow-emerald-950/50 text-slate-100 overflow-hidden"
            >
            {/* Background Image Layer for the Pop-up Modal */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <img
                src="/popup-birthday-bg.jpg"
                alt="Spendy Birthday Special"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center opacity-30 filter contrast-115 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/80 to-slate-950/90" />
            </div>

            {/* Top decorative cryptographic accent line */}
            <div className="relative z-10 h-2 w-full bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400"></div>

            {/* Modal Header */}
            <div className="relative z-10 flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black font-mono tracking-tight text-white flex items-center gap-2">
                    <span>PARTNERSHIP RECEIPT</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      <Lock className="w-3 h-3 text-emerald-400" />
                      IMMUTABLE RECORD
                    </span>
                  </h2>
                  <p className="text-xs font-mono text-cyan-300 flex items-center gap-2 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>SEPTEMBER 15 &bull; SETTLED BIRTHDAY DROP</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Green Status Badge */}
                <div
                  id="receipt-status-badge"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>STATUS: CONFIRMED</span>
                </div>

                {/* Close Button */}
                <button
                  id="receipt-close-btn"
                  onClick={onClose}
                  aria-label="Close Receipt Modal"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="relative z-10 p-5 sm:p-7 space-y-6 max-h-[78vh] overflow-y-auto">

              {/* Large & Colorful Birthday Present Attribution Banner from SPLENZZY */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-emerald-500/15 to-cyan-500/15 border-2 border-amber-500/40 shadow-xl shadow-amber-950/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-amber-500/25 border border-amber-400/50 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.35)]">
                      <Gift className="w-6 h-6 text-amber-300 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-amber-300 font-extrabold uppercase tracking-widest flex items-center gap-2">
                        <span>OFFICIAL BIRTHDAY PRESENT</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-200">
                          VERIFIED
                        </span>
                      </div>
                      <div className="text-base sm:text-xl font-mono font-black text-white mt-1">
                        GIFT FROM{' '}
                        <span className="text-amber-300 font-extrabold underline decoration-amber-400 decoration-2 underline-offset-4">
                          SPLENZZY
                        </span>{' '}
                        ➔{' '}
                        <span className="text-emerald-300 font-extrabold underline decoration-emerald-400 decoration-2 underline-offset-4">
                          SPENDY
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="self-start sm:self-center px-3.5 py-1.5 rounded-xl bg-slate-950/70 border border-slate-700 text-xs font-mono text-cyan-300 font-bold flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>SEP 15 CELEBRATION</span>
                  </div>
                </div>
              </div>

              {/* 1. BIRTHDAY MESSAGE (LARGE & COLORFUL, WITH DEDICATED IMAGE BACKGROUND) */}
              <div
                id="partner-note-box"
                className="relative rounded-2xl p-6 sm:p-7 border-2 border-emerald-400/70 shadow-2xl shadow-emerald-950/60 overflow-hidden bg-slate-950/80 backdrop-blur-md"
              >
                {/* Pop-up Message Dedicated Background Image */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                  <img
                    src="/popup-birthday-bg.jpg"
                    alt="Spendy Birthday Special"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-top opacity-35 filter contrast-125 brightness-95 transform scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-slate-950/70" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,6,23,0.85)_100%)]" />
                </div>

                {/* Message Content on top of background */}
                <div className="relative z-10">
                  {/* Header ribbon for message */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3.5 border-b border-slate-800/80">
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono font-extrabold text-amber-300 uppercase tracking-wider">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.5)] shrink-0">
                        <img
                          src="/popup-birthday-bg.jpg"
                          alt="Spendy"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <Sparkles className="w-5 h-5 text-amber-400 animate-pulse hidden sm:inline" />
                      <span>BIRTHDAY MEMORANDUM // FROM SPLENZZY</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-xs font-mono text-cyan-300 font-extrabold shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>SEPTEMBER 15 DEDICATION</span>
                    </div>
                  </div>

                  {/* Large, Bold & Colorful Birthday Message Text */}
                  <div className="relative my-3">
                    <span className="text-4xl sm:text-5xl text-emerald-400/40 font-serif leading-none select-none block -mb-3">“</span>
                    <p className="text-lg sm:text-xl md:text-2xl font-black leading-relaxed text-white font-sans tracking-tight px-1 sm:px-2 drop-shadow-md">
                      Happy Birthday to the one and only{' '}
                      <span className="text-emerald-300 bg-emerald-500/20 border-b-2 border-emerald-400 px-1 py-0.5 rounded">
                        SPENDY
                      </span>! This level up protocol is your official birthday present from{' '}
                      <span className="text-amber-300 bg-amber-500/20 border-b-2 border-amber-400 px-1 py-0.5 rounded">
                        SPLENZZY
                      </span>. Another legendary year of breaking ceilings, dominating allocations, surviving chaotic bank holds and wire freezes, and conquering market volatility together. Entering{' '}
                      <span className="text-amber-300 bg-amber-500/20 border-b-2 border-amber-400 px-1.5 py-0.5 rounded font-black">
                        24 TODAY
                      </span>{' '}
                      with unshakeable execution and visionary drive making this{' '}
                      <span className="text-cyan-300">unstoppable partnership</span>. Massive liquidity events, milestone drops, and historic trades are unlocked ahead.{' '}
                      <span className="text-emerald-400 font-black">Level 24 confirmed</span> — let’s keep winning.
                    </p>
                    <span className="text-4xl sm:text-5xl text-emerald-400/40 font-serif leading-none select-none block text-right -mt-3">”</span>
                  </div>

                  {/* Originator / Presenter Signer Footer */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Presented by:</span>
                      <span className="text-amber-300 font-black text-sm sm:text-base">SPLENZZY</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-200 font-bold uppercase">
                        VIP ORIGINATOR
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-300 font-extrabold">
                      <Heart className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                      <span>100% Shared Wins & Unbreakable Bond</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. RECIPIENT & TRANSACTION INFORMATION (LARGE & COLORFUL) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1 text-xs sm:text-sm font-mono text-slate-300">
                  <span className="font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Key Settlement Information
                  </span>
                  <span className="text-xs text-emerald-300 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Verified on Block {data.blockHash}
                  </span>
                </div>

                {/* Prominent Large Cards Grid */}
                <div
                  id="receipt-metadata-grid"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {/* Partner Name / Recipient Card - Large & Colorful */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-950/90 border-2 border-emerald-500/40 shadow-lg shadow-emerald-950/30">
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400/90 mb-1.5 font-bold uppercase tracking-wider">
                      <span>BIRTHDAY RECIPIENT</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                        VIP HONOREE
                      </span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-emerald-300 flex items-baseline gap-2">
                      <span>{data.partnerName}</span>
                    </div>
                    <p className="text-xs font-mono text-slate-400 mt-1">
                      Target Account: Executive Founding Partner
                    </p>
                  </div>

                  {/* Gift Sender / Originator Card - Large & Colorful */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-950/60 to-slate-950/90 border-2 border-amber-500/40 shadow-lg shadow-amber-950/30">
                    <div className="flex items-center justify-between text-xs font-mono text-amber-400/90 mb-1.5 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Gift className="w-3.5 h-3.5 text-amber-400" />
                        PRESENT FROM
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300">
                        ORIGINATOR
                      </span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-amber-300 flex items-baseline gap-2">
                      <span>{data.senderName || 'SPLENZZY'}</span>
                    </div>
                    <p className="text-xs font-mono text-slate-400 mt-1">
                      Gift Protocol Architect & Co-Founder
                    </p>
                  </div>

                  {/* Age Unlocked Card - Large & Colorful */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-teal-950/60 to-slate-950/90 border-2 border-teal-500/40 shadow-lg shadow-teal-950/30">
                    <div className="text-xs font-mono text-teal-400/90 mb-1.5 font-bold uppercase tracking-wider">
                      AGE UNLOCKED
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl sm:text-5xl font-black font-mono text-white">
                        {data.ageUnlocked}
                      </span>
                      <span className="text-xl sm:text-2xl font-bold font-mono text-teal-300">
                        YEARS
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono font-bold">
                        +1 TIER LEVEL UP
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-400 mt-1">
                      Next Milestones & Maximum Tier Allocation Active
                    </p>
                  </div>

                  {/* Transaction ID Card - Large & Colorful */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-slate-950/90 border-2 border-cyan-500/40 shadow-lg shadow-cyan-950/30">
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400/90 mb-1.5 font-bold uppercase tracking-wider">
                      <span>TRANSACTION HASH</span>
                      <button
                        id="copy-tx-btn"
                        onClick={handleCopyTx}
                        title="Copy Transaction ID"
                        className="text-cyan-300 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold"
                      >
                        {copiedTx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="font-mono text-base sm:text-lg font-black text-white tracking-wider break-all">
                      {data.transactionId}
                    </div>
                    <p className="text-xs font-mono text-slate-400 mt-1">
                      Timestamp: {data.timestamp}
                    </p>
                  </div>

                  {/* Bank Status Card (Amber/Gold & Emerald) - Large & Colorful Banner */}
                  <div
                    id="receipt-bank-status-card"
                    className="sm:col-span-2 p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 border-2 border-amber-500/40 shadow-xl"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <span className="flex items-center gap-2 text-xs sm:text-sm font-mono font-extrabold text-amber-300 uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        INSTITUTIONAL BANK STATUS
                      </span>
                      <span className="self-start sm:self-center text-xs font-mono font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/50 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        HOLD BYPASS: 100% SUCCESS
                      </span>
                    </div>
                    <div className="text-lg sm:text-xl font-mono font-extrabold text-white flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-amber-300">{data.bankStatus}</span>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        Settlement: Instant (0 Blocks Pending)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Secondary protocol telemetry metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400 px-1 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Birthday Execution:</span>
                    <span className="text-cyan-300 font-semibold">September 15, 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Gas Settlement:</span>
                    <span className="text-emerald-300 font-bold">$0.00 (Gift Sponsored)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer / Actions */}
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-900/95 flex flex-col sm:flex-row items-center gap-3">
              {/* Extra Celebration Trigger */}
              <button
                id="trigger-more-confetti-btn"
                onClick={() => fireBirthdayConfetti()}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Blast Confetti</span>
              </button>

              {/* Copy Summary / Share */}
              <button
                id="copy-summary-btn"
                onClick={handleCopySummary}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Receipt Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-cyan-400" />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>

              {/* Standalone HTML Export Modal Trigger if provided */}
              {onOpenExportModal && (
                <button
                  id="open-export-modal-btn"
                  onClick={onOpenExportModal}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-teal-400" />
                  <span>Standalone HTML</span>
                </button>
              )}

              {/* Primary Action: Acknowledge & Close */}
              <button
                id="acknowledge-close-btn"
                onClick={onClose}
                className="w-full sm:flex-1 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-extrabold text-sm tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 cursor-pointer"
              >
                <span>ACKNOWLEDGE & CLOSE</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      )}
    </AnimatePresence>
  );
};
