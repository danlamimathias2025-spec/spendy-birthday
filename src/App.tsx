/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ReceiptModal } from './components/ReceiptModal';
import { ExportHtmlModal } from './components/ExportHtmlModal';
import { CountdownOverlay } from './components/CountdownOverlay';
import { AchievementBadge } from './components/AchievementBadge';
import { FintechBackgroundAnimation } from './components/FintechBackgroundAnimation';
import { FallingBirthdayText } from './components/FallingBirthdayText';
import { BirthdayWishesLedger } from './components/BirthdayWishesLedger';
import { DEFAULT_RECEIPT_DATA, PartnerReceiptData } from './types';
import { fireBirthdayConfetti } from './utils/confetti';
import { playConfirmationSound, playCountdownTickSound } from './utils/audio';
import { recordProtocolUnlock, subscribeToStats, CelebrationStats } from './firebase';

export default function App() {
  // Fixed immutable birthday data: uneditable, verified settlement
  const [receiptData] = useState<PartnerReceiptData>(DEFAULT_RECEIPT_DATA);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [hasDismissedReceipt, setHasDismissedReceipt] = useState(false);
  const [stats, setStats] = useState<CelebrationStats>({
    totalUnlocks: 1,
    lastUnlockedAt: new Date().toISOString(),
    honoree: 'SPENDY',
    level: 24,
  });

  // Subscribe to real-time celebration statistics from Firebase Firestore
  useEffect(() => {
    const unsubscribe = subscribeToStats((liveStats) => {
      setStats(liveStats);
    });
    return () => unsubscribe();
  }, []);

  const handleExecuteTransaction = () => {
    if (countdown !== null || isProcessing) return;

    setIsProcessing(true);
    setCountdown(3);
    playCountdownTickSound(3, !soundEnabled);

    // Countdown second 2
    setTimeout(() => {
      setCountdown(2);
      playCountdownTickSound(2, !soundEnabled);
    }, 1000);

    // Countdown second 1
    setTimeout(() => {
      setCountdown(1);
      playCountdownTickSound(1, !soundEnabled);
    }, 2000);

    // 3 Seconds complete: unlock protocol & reveal birthday receipt
    setTimeout(() => {
      setCountdown(0);
      playConfirmationSound(!soundEnabled);
      fireBirthdayConfetti();

      // Record live verified unlock to Firebase Firestore
      recordProtocolUnlock().catch(console.warn);

      setTimeout(() => {
        setCountdown(null);
        setIsProcessing(false);
        setIsReceiptOpen(true);
      }, 350);
    }, 3000);
  };

  const handleCloseReceipt = () => {
    setIsReceiptOpen(false);
    setHasDismissedReceipt(true);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300 flex flex-col justify-between overflow-x-hidden font-sans">
      {/* Subtle, Low-Opacity Animated Background (Moving Grid, Scanline, Floating Node Constellations & Data Streams) */}
      <FintechBackgroundAnimation />

      {/* Falling 'HAPPY SPECIAL BIRTHDAY SPENDY' celebratory text rain in background */}
      <FallingBirthdayText />

      {/* Ambient Radial Glows */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[580px] h-96 sm:h-[580px] bg-radial-gradient rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-10 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed top-20 left-10 w-52 h-52 bg-emerald-500/[0.03] rounded-full blur-2xl pointer-events-none z-0" />

      {/* Top Header Navigation (Uneditable) */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        partnerName={receiptData.partnerName}
        senderName={receiptData.senderName}
      />

      {/* Main Hero Screen (Centered Hero Layout) */}
      <HeroSection
        onExecute={handleExecuteTransaction}
        isProcessing={isProcessing}
        countdown={countdown}
        age={receiptData.ageUnlocked}
      />

      {/* Real-Time Immutable Birthday Wishes Ledger (Firebase Firestore) */}
      <BirthdayWishesLedger
        partnerName={receiptData.partnerName}
        senderName={receiptData.senderName}
      />

      {/* 3-Second High-Tech Countdown Overlay Before Receipt Popup */}
      <CountdownOverlay
        isActive={countdown !== null}
        count={countdown ?? 0}
        partnerName={receiptData.partnerName}
        senderName={receiptData.senderName}
        age={receiptData.ageUnlocked}
      />

      {/* Small 'Level 24 Unlocked' Achievement Badge in corner after receipt is dismissed */}
      <AchievementBadge
        isVisible={hasDismissedReceipt}
        onReopenReceipt={() => setIsReceiptOpen(true)}
        age={receiptData.ageUnlocked}
        partnerName={receiptData.partnerName}
        senderName={receiptData.senderName}
      />

      {/* Sleek Celebration Footer */}
      <footer className="relative z-10 w-full text-center py-4 border-t border-slate-900 bg-slate-950/90 backdrop-blur-sm text-[11px] font-mono text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>SPENDY LEVEL 24 CELEBRATION &bull; SEPTEMBER 15, 2026</span>
            <span className="text-slate-700 hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline text-slate-400">
              DROPS UNLOCKED: <strong className="text-emerald-400 font-bold">{stats.totalUnlocks}</strong>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>HONOREE: <strong className="text-emerald-300 font-extrabold">{receiptData.partnerName}</strong></span>
            <span className="text-slate-700">&bull;</span>
            <span>PRESENT FROM: <strong className="text-amber-300 font-extrabold">{receiptData.senderName}</strong></span>
            <span className="text-slate-700">&bull;</span>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="hover:text-emerald-400 underline underline-offset-2 transition-colors cursor-pointer text-slate-300"
            >
              Standalone HTML
            </button>
          </div>
        </div>
      </footer>

      {/* High-Tech "Partnership Receipt" Modal (Uneditable, Large & Colorful) */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={handleCloseReceipt}
        data={receiptData}
        onOpenExportModal={() => {
          setIsReceiptOpen(false);
          setIsExportModalOpen(true);
        }}
      />

      {/* Standalone HTML Export Modal */}
      <ExportHtmlModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={receiptData}
      />
    </div>
  );
}
