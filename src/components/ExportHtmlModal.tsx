import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Download, ExternalLink, Code2 } from 'lucide-react';
import { PartnerReceiptData } from '../types';

interface ExportHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PartnerReceiptData;
}

export const ExportHtmlModal: React.FC<ExportHtmlModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [copied, setCopied] = useState(false);

  // Generate the customized standalone single file HTML string dynamically using the user's custom details!
  const generateHtmlCode = () => {
    return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LEVEL UP PROTOCOL | ${data.partnerName} Birthday Celebration</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- canvas-confetti CDN -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.4/dist/confetti.browser.min.js"></script>
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            mono: ['"JetBrains Mono"', 'monospace'],
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
          },
          colors: {
            slate: {
              950: '#020617',
              900: '#0f172a',
              800: '#1e293b',
              700: '#334155',
            }
          }
        }
      }
    }
  </script>

  <style>
    body {
      background-color: #020617;
      color: #f8fafc;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }
    .bg-grid-overlay {
      background-size: 32px 32px;
      background-image: 
        linear-gradient(to right, rgba(51, 65, 85, 0.12) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(51, 65, 85, 0.12) 1px, transparent 1px);
    }
    @keyframes gridDrift {
      0% { background-position: 0px 0px; }
      100% { background-position: 32px 32px; }
    }
    .animate-grid-drift {
      animation: gridDrift 16s linear infinite;
    }
    @keyframes scanlineSweep {
      0% { transform: translateY(-100%); opacity: 0; }
      20% { opacity: 0.15; }
      80% { opacity: 0.15; }
      100% { transform: translateY(100vh); opacity: 0; }
    }
    .animate-scanline {
      animation: scanlineSweep 9s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    @keyframes pulseGlow {
      0%, 100% {
        box-shadow: 0 0 20px -2px rgba(16, 185, 129, 0.4), 0 0 40px -8px rgba(16, 185, 129, 0.25);
        transform: translateY(0px) scale(1);
      }
      50% {
        box-shadow: 0 0 35px 2px rgba(16, 185, 129, 0.65), 0 0 65px -4px rgba(16, 185, 129, 0.4);
        transform: translateY(-1px) scale(1.015);
      }
    }
    .animate-pulse-glow {
      animation: pulseGlow 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes radarPing {
      0% { transform: scale(0.95); opacity: 0.85; }
      70% { transform: scale(2.2); opacity: 0; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    .animate-radar-ping {
      animation: radarPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    @keyframes fallBirthdayStream {
      0% {
        transform: translateY(-160px) rotate(var(--fall-rot, 0deg));
        opacity: 0;
      }
      12% {
        opacity: var(--fall-max-opacity, 0.65);
      }
      88% {
        opacity: var(--fall-max-opacity, 0.65);
      }
      100% {
        transform: translateY(108vh) rotate(calc(var(--fall-rot, 0deg) + 6deg));
        opacity: 0;
      }
    }
    .animate-falling-text {
      animation: fallBirthdayStream var(--fall-duration, 14s) linear infinite;
      animation-delay: var(--fall-delay, 0s);
      will-change: transform, opacity;
    }
  </style>
</head>
<body class="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300 relative overflow-x-hidden flex flex-col justify-between">

  <!-- 0. Full Website Background: Compressed Spendy Birthday Portrait with Blur Effect -->
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-950">
    <img 
      src="spendy-bg-compressed.jpg" 
      alt="Spendy Birthday Background" 
      class="w-full h-full object-cover object-center filter blur-md sm:blur-lg scale-105 opacity-40 brightness-85 contrast-110"
      onerror="this.style.display='none'"
    />
    <div class="absolute inset-0 bg-slate-950/65 mix-blend-multiply"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80"></div>
  </div>

  <!-- Falling 'HAPPY SPECIAL BIRTHDAY SPENDY' celebratory text rain in background -->
  <div aria-hidden="true" class="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
    <div class="absolute animate-falling-text whitespace-nowrap font-mono font-black tracking-wider uppercase text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.7)] text-xs sm:text-sm"
      style="left: 3%; top: 0; --fall-duration: 16s; --fall-delay: -4s; --fall-rot: -4deg; --fall-max-opacity: 0.55;">
      <span class="inline-block px-2.5 py-1 rounded-full bg-slate-950/40 backdrop-blur-[2px] border border-white/10">✨ HAPPY SPECIAL BIRTHDAY SPENDY ✨</span>
    </div>
    <div class="absolute animate-falling-text whitespace-nowrap font-mono font-black tracking-wider uppercase text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.6)] text-[11px] sm:text-xs"
      style="left: 14%; top: 0; --fall-duration: 21s; --fall-delay: -11s; --fall-rot: 2deg; --fall-max-opacity: 0.45;">
      <span class="inline-block px-2.5 py-1 rounded-full bg-slate-950/40 backdrop-blur-[2px] border border-white/10">★ HAPPY SPECIAL BIRTHDAY SPENDY ★</span>
    </div>
    <div class="absolute animate-falling-text whitespace-nowrap font-mono font-black tracking-wider uppercase text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)] text-xs sm:text-sm"
      style="left: 27%; top: 0; --fall-duration: 14s; --fall-delay: -2s; --fall-rot: -3deg; --fall-max-opacity: 0.5;">
      <span class="inline-block px-2.5 py-1 rounded-full bg-slate-950/40 backdrop-blur-[2px] border border-white/10">HAPPY SPECIAL BIRTHDAY SPENDY</span>
    </div>
    <div class="absolute animate-falling-text whitespace-nowrap font-mono font-black tracking-wider uppercase text-amber-200 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)] text-xs sm:text-sm"
      style="left: 45%; top: 0; --fall-duration: 17s; --fall-delay: -7s; --fall-rot: -2deg; --fall-max-opacity: 0.55;">
      <span class="inline-block px-2.5 py-1 rounded-full bg-slate-950/40 backdrop-blur-[2px] border border-white/10">✨ HAPPY SPECIAL BIRTHDAY SPENDY ✨</span>
    </div>
    <div class="absolute animate-falling-text whitespace-nowrap font-mono font-black tracking-wider uppercase text-cyan-200 drop-shadow-[0_0_10px_rgba(103,232,249,0.6)] text-xs sm:text-sm"
      style="left: 60%; top: 0; --fall-duration: 15s; --fall-delay: -5s; --fall-rot: 0deg; --fall-max-opacity: 0.5;">
      <span class="inline-block px-2.5 py-1 rounded-full bg-slate-950/40 backdrop-blur-[2px] border border-white/10">★ LEVEL 24 UNLOCKED ★ SPENDY</span>
    </div>
    <div class="absolute animate-falling-text whitespace-nowrap font-mono font-black tracking-wider uppercase text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.7)] text-xs sm:text-sm"
      style="left: 74%; top: 0; --fall-duration: 18s; --fall-delay: -13s; --fall-rot: -4deg; --fall-max-opacity: 0.55;">
      <span class="inline-block px-2.5 py-1 rounded-full bg-slate-950/40 backdrop-blur-[2px] border border-white/10">✨ HAPPY SPECIAL BIRTHDAY SPENDY ✨</span>
    </div>
    <div class="absolute animate-falling-text whitespace-nowrap font-mono font-black tracking-wider uppercase text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.7)] text-xs sm:text-sm"
      style="left: 88%; top: 0; --fall-duration: 17s; --fall-delay: -8s; --fall-rot: -3deg; --fall-max-opacity: 0.55;">
      <span class="inline-block px-2.5 py-1 rounded-full bg-slate-950/40 backdrop-blur-[2px] border border-white/10">★ HAPPY SPECIAL BIRTHDAY SPENDY ★</span>
    </div>
  </div>

  <!-- Low-opacity moving grid background -->
  <div class="fixed inset-0 bg-grid-overlay animate-grid-drift pointer-events-none z-0 opacity-70"></div>
  
  <!-- Faint cyber scanline beam -->
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div class="w-full h-24 bg-gradient-to-b from-transparent via-emerald-500/[0.035] to-transparent animate-scanline"></div>
  </div>

  <!-- HTML5 Canvas for subtle fintech data streams & floating nodes -->
  <canvas id="bg-canvas" class="fixed inset-0 pointer-events-none z-0"></canvas>

  <!-- Ambient glows -->
  <div class="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none z-0"></div>
  <div class="fixed bottom-10 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none z-0"></div>

  <!-- Header -->
  <header class="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between border-b border-slate-800/80">
    <div class="flex items-center gap-3">
      <div class="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
      </div>
      <div>
        <span class="font-mono font-bold text-xs sm:text-sm tracking-wider text-white">LEVEL UP PROTOCOL</span>
        <span class="hidden sm:inline-block text-[10px] font-mono text-emerald-500 ml-2 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">MAINNET</span>
      </div>
    </div>

    <div class="flex items-center gap-4 text-xs font-mono text-slate-400">
      <div class="hidden sm:flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span>BLOCK #${data.blockHash}</span>
      </div>
    </div>
  </header>

  <!-- Main Hero Screen -->
  <main class="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 max-w-4xl mx-auto w-full text-center">
    <!-- Status Badge -->
    <div class="mb-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 shadow-xl shadow-black/40 backdrop-blur-md">
      <span class="relative flex h-2.5 w-2.5">
        <span class="animate-radar-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10B981]"></span>
      </span>
      <span class="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
        INCOMING TRANSACTION READY
      </span>
      <span class="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-700"></span>
      <span class="hidden sm:inline-block text-[11px] font-mono text-slate-400">HOLD OVERRIDE: ACTIVE</span>
    </div>

    <!-- Birthday Present Attribution Pill -->
    <div class="mb-5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] sm:text-xs font-mono text-emerald-400">
      <svg class="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
      <span>SPECIAL BIRTHDAY PRESENT:</span>
      <span class="font-bold text-white">${data.senderName || 'SPLENZZY'}</span>
      <span class="text-emerald-500">→</span>
      <span class="font-bold text-emerald-300">${data.partnerName}</span>
    </div>

    <!-- Main Heading -->
    <h1 class="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 font-mono uppercase">
      LEVEL UP <span class="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">PROTOCOL</span>
    </h1>

    <!-- Subtitle -->
    <p class="text-slate-300 text-sm sm:text-base md:text-lg max-w-xl mb-10 leading-relaxed font-sans font-normal">
      Process the pending birthday drop for honoree <span class="text-emerald-400 font-bold font-mono">${data.partnerName}</span> who entered <span class="text-amber-300 font-black font-mono bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">${data.ageUnlocked} TODAY</span> to bypass traditional institutional processing delays — an exclusive birthday present protocol minted by <span class="text-amber-300 font-bold font-mono">${data.senderName || 'SPLENZZY'}</span>.
    </p>

    <!-- Primary Action Button with Mouse Tracking Sparkles -->
    <div class="relative inline-block">
      <div class="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 rounded-2xl blur-xl opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse pointer-events-none"></div>
      <button 
        id="execute-btn"
        class="animate-pulse-glow group relative inline-flex items-center justify-center gap-3 px-8 sm:px-11 py-4 sm:py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-mono font-bold text-base sm:text-lg tracking-wider transition-all duration-200 cursor-pointer select-none border border-emerald-300/40 shadow-2xl shadow-emerald-500/30 overflow-hidden"
      >
        <canvas id="btn-sparkle-canvas" class="absolute inset-0 pointer-events-none rounded-2xl"></canvas>
        <svg class="relative z-10 w-6 h-6 text-slate-950 transition-transform group-hover:scale-110 group-hover:rotate-12" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
        <span class="relative z-10">EXECUTE NEXT TRANSACTION</span>
        <svg class="relative z-10 w-4 h-4 text-slate-900 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="20" y1="17" x2="4" y2="17"></line><polyline points="10 11 4 17 10 23"></polyline><line x1="4" y1="7" x2="20" y2="7"></line><polyline points="14 1 20 7 14 13"></polyline></svg>
      </button>
    </div>
  </main>

  <!-- Small 'Level ${data.ageUnlocked} Unlocked' Achievement Badge in Corner (Appears once receipt is dismissed) -->
  <div 
    id="achievement-badge" 
    class="fixed bottom-24 sm:bottom-28 right-3 sm:right-6 z-40 max-w-[340px] sm:max-w-sm w-full hidden opacity-0 translate-y-8 transition-all duration-500 ease-out"
  >
    <div 
      id="achievement-badge-card"
      class="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-900/95 p-3.5 sm:p-4 border-2 border-emerald-400/50 shadow-2xl shadow-emerald-950/80 backdrop-blur-xl hover:border-emerald-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all duration-300"
    >
      <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400"></div>
      
      <button 
        id="achievement-close-btn"
        class="absolute top-2.5 right-2.5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        title="Dismiss Badge"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div class="flex items-start gap-3">
        <div class="relative shrink-0 mt-0.5">
          <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/25 via-emerald-500/20 to-teal-500/10 border border-amber-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.25)]">
            <svg class="w-6 h-6 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
          </div>
          <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
            <svg class="w-2.5 h-2.5 text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </span>
        </div>

        <div class="flex-1 pr-4">
          <div class="flex items-center gap-1.5">
            <span class="text-[10px] font-mono font-black uppercase tracking-wider text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded border border-amber-400/30">
              PROTOCOL COMPLETE
            </span>
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>

          <div class="mt-1 flex items-baseline gap-1.5">
            <h4 class="text-sm sm:text-base font-black font-mono text-white tracking-tight">
              Level ${data.ageUnlocked} Unlocked
            </h4>
            <span class="text-[10px] font-mono text-emerald-400 font-bold">
              ★ TODAY
            </span>
          </div>

          <p class="text-[11px] text-slate-300 font-mono mt-0.5">
            Honoree: <strong class="text-emerald-300">${data.partnerName}</strong> &bull; From: <strong class="text-amber-300">${data.senderName || 'SPLENZZY'}</strong>
          </p>

          <div class="mt-2.5 flex items-center gap-2">
            <button
              id="achievement-view-btn"
              type="button"
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/30 text-[11px] font-mono font-bold transition-all cursor-pointer"
            >
              <span>View Receipt</span>
              <span>➔</span>
            </button>
            <button
              id="achievement-confetti-btn"
              type="button"
              class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-amber-300 text-[11px] font-mono font-bold border border-slate-700 transition-colors cursor-pointer"
            >
              <span>Confetti</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Debug Terminal Overlay at Bottom of Page displaying scrolling low-opacity Web3 transaction logs -->
  <div 
    id="debug-terminal" 
    class="relative z-20 w-full border-t border-slate-800/80 bg-slate-950/60 hover:bg-slate-950/85 backdrop-blur-md transition-colors duration-200 select-none text-[11px] font-mono"
  >
    <div 
      id="terminal-toggle-bar"
      class="px-3 sm:px-4 py-1.5 flex items-center justify-between cursor-pointer border-b border-slate-900/80 bg-slate-950/80 hover:bg-slate-900/60 transition-colors"
    >
      <div class="flex items-center gap-2 sm:gap-3 overflow-hidden">
        <div class="flex items-center gap-1.5 shrink-0">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <svg class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
          <span class="font-bold text-slate-200 tracking-wider hidden xs:inline">DEBUG_TERMINAL</span>
          <span class="text-slate-600">//</span>
          <span class="text-slate-400 tracking-tight truncate">WEB3_TRANSACTION_PIPELINE</span>
        </div>
        <div class="hidden md:flex items-center gap-2 text-[10px] text-slate-500">
          <span class="px-1.5 py-0.2 rounded bg-slate-900/80 border border-slate-800 text-slate-400">NET: ETH-MAINNET</span>
          <span class="px-1.5 py-0.2 rounded bg-slate-900/80 border border-slate-800 text-emerald-400">ORACLE: 0x${data.partnerName}</span>
          <span class="px-1.5 py-0.2 rounded bg-slate-900/80 border border-slate-800 text-amber-300">AGE: ${data.ageUnlocked}</span>
          <span class="px-1.5 py-0.2 rounded bg-slate-900/80 border border-slate-800 text-slate-400">BLOCK: #21049281</span>
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button 
          id="terminal-autoscroll-btn" 
          type="button" 
          class="px-1.5 py-0.5 rounded text-[10px] border bg-emerald-500/15 border-emerald-500/30 text-emerald-300 cursor-pointer"
        >
          AUTO-SCROLL: ON
        </button>
        <button 
          id="terminal-clear-btn" 
          type="button" 
          class="p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors cursor-pointer"
          title="Clear Console"
        >
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
        <button 
          id="terminal-expand-btn" 
          type="button" 
          class="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <svg id="terminal-chevron" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
      </div>
    </div>

    <!-- Scrolling Log Feed -->
    <div 
      id="terminal-logs" 
      class="relative max-h-32 sm:max-h-36 overflow-y-auto px-3 sm:px-4 py-2 font-mono space-y-1 select-text bg-slate-950/50"
    ></div>
  </div>

  <!-- Sleek Minimal Web3 Footer -->
  <footer class="relative z-10 w-full text-center py-4 border-t border-slate-900 bg-slate-950/90 backdrop-blur-sm text-[11px] font-mono text-slate-400">
    <div class="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
      <span>LEVEL UP PROTOCOL &bull; VERIFIED BIRTHDAY SETTLEMENT &bull; SEPTEMBER 15, 2026</span>
      <div class="flex items-center gap-3">
        <span>HONOREE: <strong class="text-emerald-300 font-extrabold">${data.partnerName}</strong></span>
        <span class="text-slate-700">&bull;</span>
        <span>PRESENT FROM: <strong class="text-amber-300 font-extrabold">${data.senderName || 'SPLENZZY'}</strong></span>
      </div>
    </div>
  </footer>

  <!-- 3-Second High-Tech Countdown Overlay -->
  <div id="countdown-overlay" class="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl select-none transition-opacity duration-200">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0%,transparent_70%)] pointer-events-none"></div>
    <div id="countdown-card" class="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900/95 border-2 border-emerald-500/40 shadow-2xl shadow-emerald-950/60 text-center overflow-hidden transition-all duration-300 transform scale-95">
      <div id="countdown-beam" class="h-1.5 w-full bg-gradient-to-r from-emerald-400 to-teal-400 animate-pulse"></div>

      <div class="mt-4 mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span class="text-slate-300 font-bold">TRANSACTION IN FLIGHT:</span>
        <span class="text-amber-300 font-extrabold">${data.senderName || 'SPLENZZY'}</span>
        <span class="text-slate-500">➔</span>
        <span class="text-emerald-300 font-extrabold">${data.partnerName}</span>
      </div>

      <div class="relative my-4 flex items-center justify-center">
        <div class="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" class="text-slate-800 stroke-current" stroke-width="4" fill="transparent"></circle>
            <circle id="countdown-circle" cx="50" cy="50" r="42" stroke="#10B981" stroke-width="6" stroke-linecap="round" fill="transparent" stroke-dasharray="264" stroke-dashoffset="176" style="transition: stroke-dashoffset 0.8s ease-out, stroke 0.3s ease"></circle>
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span id="countdown-num" class="text-6xl sm:text-7xl font-black font-mono tracking-tighter text-emerald-400 drop-shadow-[0_0_25px_currentColor]">3</span>
            <span id="countdown-label" class="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-widest mt-1">SECONDS</span>
          </div>
        </div>
      </div>

      <div class="mt-2 space-y-1.5">
        <div id="countdown-title" class="text-xs sm:text-sm font-mono font-extrabold text-white tracking-wide uppercase">
          SYNCHRONIZING VERIFIED NODES
        </div>
        <p id="countdown-sub" class="text-xs text-slate-300 font-sans leading-relaxed">
          Initiating Age ${data.ageUnlocked} Level-Up Sequence...
        </p>
      </div>

      <div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
        <div class="flex items-center gap-1.5 text-emerald-400 font-bold">
          <span>★ LEVEL ${data.ageUnlocked} UNLOCKED TODAY</span>
        </div>
        <div class="flex items-center gap-1.5 text-cyan-300 font-bold">
          <span>SEPTEMBER 15</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div id="receipt-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md transition-all duration-300">
    <div id="receipt-card" class="relative w-full max-w-xl my-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl shadow-emerald-950/40 text-slate-100 overflow-hidden transform scale-95 opacity-0 transition-all duration-300">
      <!-- Background Image Layer for the Pop-up Modal -->
      <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/popup-birthday-bg.jpg"
          alt="Spendy Birthday Special"
          class="w-full h-full object-cover object-center opacity-30 filter contrast-115 brightness-90"
          loading="eager"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/80 to-slate-950/90"></div>
      </div>

      <div class="relative z-10 h-1.5 w-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400"></div>
      
      <!-- Header -->
      <div class="relative z-10 flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <div>
            <h2 class="text-base sm:text-lg font-bold font-mono tracking-tight text-white">PARTNERSHIP RECEIPT</h2>
            <p class="text-[11px] font-mono text-slate-400">SETTLED TRANSACTION LOG</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
            <svg class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>STATUS: CONFIRMED</span>
          </div>
          <button id="modal-close-btn" class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="relative z-10 p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
        <!-- Birthday Present Banner -->
        <div class="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-teal-500/10 border border-amber-500/40 shadow-inner">
          <div class="flex items-center gap-2.5">
            <div class="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
            </div>
            <div>
              <div class="text-[11px] font-mono text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span>SPECIAL BIRTHDAY PRESENT</span>
                <span class="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/25 text-amber-200">VERIFIED</span>
              </div>
              <div class="text-xs sm:text-sm font-bold text-white font-mono mt-0.5">
                GIFT FROM <span class="text-amber-400 font-extrabold underline decoration-amber-500/50 decoration-2 underline-offset-2">${data.senderName || 'SPLENZZY'}</span> TO <span class="text-emerald-400 font-extrabold">${data.partnerName}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 1. Birthday Message Box (Appears FIRST, Larger and Bold) -->
        <div class="relative rounded-2xl p-5 sm:p-6 border-2 border-emerald-500/50 shadow-xl shadow-emerald-950/40 overflow-hidden bg-slate-950/85 backdrop-blur-md">
          <!-- Pop-up Message Background Image -->
          <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="/popup-birthday-bg.jpg"
              alt="Spendy Birthday Special"
              class="w-full h-full object-cover object-top opacity-35 filter contrast-125 brightness-95"
              loading="eager"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-slate-950/70"></div>
          </div>

          <div class="relative z-10">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800/90">
              <div class="flex items-center gap-2.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                <div class="w-7 h-7 rounded-full overflow-hidden border border-amber-400 shadow-sm shrink-0">
                  <img src="/popup-birthday-bg.jpg" alt="Spendy" class="w-full h-full object-cover object-top" />
                </div>
                <span>BIRTHDAY MEMORANDUM // FROM ${data.senderName || 'SPLENZZY'}</span>
              </div>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold">SEPTEMBER 15 DEDICATION</span>
            </div>

            <div class="relative my-2">
              <span class="text-3xl sm:text-4xl text-emerald-500/40 font-serif leading-none select-none block -mb-2">“</span>
              <p class="text-base sm:text-lg md:text-xl font-bold leading-relaxed text-white font-sans tracking-tight px-1">
                ${data.partnerNote}
              </p>
              <span class="text-3xl sm:text-4xl text-emerald-500/40 font-serif leading-none select-none block text-right -mt-2">”</span>
            </div>

          <div class="mt-4 pt-3.5 border-t border-slate-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
            <div class="flex items-center gap-2 text-slate-300">
              <span class="text-slate-400">Gift Originator:</span>
              <span class="text-amber-400 font-extrabold">${data.senderName || 'SPLENZZY'}</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">FOUNDER</span>
            </div>
            <span class="text-emerald-400 font-bold flex items-center gap-1.5">
              100% Shared Wins & Partner Bond
            </span>
          </div>
        </div>

        <!-- 2. Recipient & Transaction Information (Appears After Message) -->
        <div class="space-y-3">
          <div class="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider px-1">
            Recipient & Transaction Information
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Birthday Recipient - Large & Colorful -->
            <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-950/90 border-2 border-emerald-500/40 shadow-lg shadow-emerald-950/30">
              <div class="flex items-center justify-between text-xs font-mono text-emerald-400/90 mb-1.5 font-bold uppercase tracking-wider">
                <span>BIRTHDAY RECIPIENT</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">VIP HONOREE</span>
              </div>
              <div class="text-3xl sm:text-4xl font-black font-mono tracking-tight text-emerald-300">
                ${data.partnerName}
              </div>
              <p class="text-xs font-mono text-slate-400 mt-1">
                Target Account: Executive Founding Partner
              </p>
            </div>

            <!-- Present From (Sender) - Large & Colorful -->
            <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-950/60 to-slate-950/90 border-2 border-amber-500/40 shadow-lg shadow-amber-950/30">
              <div class="flex items-center justify-between text-xs font-mono text-amber-400/90 mb-1.5 font-bold uppercase tracking-wider">
                <span class="flex items-center gap-1">
                  PRESENT FROM
                </span>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300">ORIGINATOR</span>
              </div>
              <div class="text-3xl sm:text-4xl font-black font-mono tracking-tight text-amber-300">
                ${data.senderName || 'SPLENZZY'}
              </div>
              <p class="text-xs font-mono text-slate-400 mt-1">
                Gift Protocol Architect & Co-Founder
              </p>
            </div>

            <!-- Age Unlocked - Large & Colorful -->
            <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-teal-950/60 to-slate-950/90 border-2 border-teal-500/40 shadow-lg shadow-teal-950/30">
              <div class="text-xs font-mono text-teal-400/90 mb-1.5 font-bold uppercase tracking-wider">
                AGE UNLOCKED
              </div>
              <div class="flex items-baseline gap-3">
                <span class="text-4xl sm:text-5xl font-black font-mono text-white">${data.ageUnlocked}</span>
                <span class="text-xl sm:text-2xl font-bold font-mono text-teal-300">YEARS</span>
                <span class="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono font-bold">+1 TIER LEVEL UP</span>
              </div>
              <p class="text-xs font-mono text-slate-400 mt-1">
                Next Milestones & Maximum Tier Allocation Active
              </p>
            </div>

            <!-- Transaction ID - Large & Colorful -->
            <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-slate-950/90 border-2 border-cyan-500/40 shadow-lg shadow-cyan-950/30">
              <div class="flex items-center justify-between text-xs font-mono text-cyan-400/90 mb-1.5 font-bold uppercase tracking-wider">
                <span>TRANSACTION HASH</span>
              </div>
              <div class="font-mono text-base sm:text-lg font-black text-white tracking-wider break-all">${data.transactionId}</div>
              <p class="text-xs font-mono text-slate-400 mt-1">
                Timestamp: ${data.timestamp}
              </p>
            </div>

            <!-- Bank Status - Large & Colorful -->
            <div class="sm:col-span-2 p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 border-2 border-amber-500/40 shadow-xl">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <span class="text-xs sm:text-sm font-mono font-extrabold text-amber-300 uppercase tracking-wider">
                  INSTITUTIONAL BANK STATUS
                </span>
                <span class="self-start sm:self-center text-xs font-mono font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/50">
                  HOLD BYPASS: 100% SUCCESS
                </span>
              </div>
              <div class="text-lg sm:text-xl font-mono font-extrabold text-white flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span class="text-amber-300">${data.bankStatus}</span>
                <span class="text-xs font-mono text-emerald-400 font-bold">Settlement: Instant (0 Blocks Pending)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action -->
      <div class="p-4 sm:p-6 border-t border-slate-800 bg-slate-900/90 flex gap-3">
        <button id="modal-confetti-btn" class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs font-semibold">
          Blast Confetti
        </button>
        <button id="acknowledge-close-btn" class="flex-1 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-sm tracking-wider">
          ACKNOWLEDGE & CLOSE
        </button>
      </div>
    </div>
  </div>

  <script>
    // Background canvas animation for subtle fintech data streams & floating nodes
    (function initBackgroundCanvas() {
      const canvas = document.getElementById('bg-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      const particles = [];
      const colors = ['rgba(16, 185, 129, ', 'rgba(52, 211, 153, ', 'rgba(245, 158, 11, '];
      const count = Math.min(32, Math.floor(width / 36));

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.25 + 0.12
        });
      }

      const streams = [];
      const tokens = ['0x9F', 'SPENDY', 'TX99', 'BLK', '100%', '0.00', 'SEP15'];
      for (let i = 0; i < 7; i++) {
        streams.push({
          x: Math.floor((Math.random() * width) / 32) * 32 + 16,
          y: Math.random() * height,
          speed: Math.random() * 0.7 + 0.6,
          chars: [tokens[i % tokens.length], tokens[(i + 2) % tokens.length]],
          color: i % 2 === 0 ? '16, 185, 129' : '245, 158, 11'
        });
      }

      function animate() {
        ctx.clearRect(0, 0, width, height);
        ctx.font = '9px "JetBrains Mono", monospace';
        streams.forEach(s => {
          s.y += s.speed;
          if (s.y > height + 40) {
            s.y = -30;
            s.x = Math.floor((Math.random() * width) / 32) * 32 + 16;
          }
          s.chars.forEach((c, idx) => {
            const y = s.y - idx * 15;
            ctx.fillStyle = 'rgba(' + s.color + ', ' + (0.14 / (idx + 1)) + ')';
            ctx.fillText(c, s.x, y);
          });
        });

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 100) {
              ctx.strokeStyle = 'rgba(52, 211, 153, ' + ((1 - d / 100) * 0.06) + ')';
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }

          p1.x += p1.vx;
          p1.y += p1.vy;
          if (p1.x < 0) p1.x = width;
          if (p1.x > width) p1.x = 0;
          if (p1.y < 0) p1.y = height;
          if (p1.y > height) p1.y = 0;

          ctx.fillStyle = p1.color + p1.alpha + ')';
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        requestAnimationFrame(animate);
      }

      animate();
    })();

    // Mouse-Tracking Sparkle Effect on Execute Button
    (function initButtonSparkles() {
      const btn = document.getElementById('execute-btn');
      const canvas = document.getElementById('btn-sparkle-canvas');
      if (!btn || !canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let sparkles = [];
      const colors = ['#FFFFFF', '#34D399', '#FBBF24', '#6EE7B7', '#FDE047'];

      function resizeCanvas() {
        canvas.width = btn.offsetWidth;
        canvas.height = btn.offsetHeight;
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      function addSparkle(x, y, count = 2) {
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 1.8 + 0.5;
          sparkles.push({
            x: x + (Math.random() - 0.5) * 14,
            y: y + (Math.random() - 0.5) * 14,
            size: Math.random() * 6 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 90,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.7,
            opacity: 1
          });
        }
      }

      let lastEmit = 0;
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const now = Date.now();
        if (now - lastEmit > 40) {
          lastEmit = now;
          addSparkle(e.clientX - rect.left, e.clientY - rect.top, 2);
        }
      });

      btn.addEventListener('mouseenter', (e) => {
        const rect = btn.getBoundingClientRect();
        addSparkle(e.clientX - rect.left, e.clientY - rect.top, 4);
      });

      function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color, rotation, opacity) {
        let rot = Math.PI / 2 * 3 + rotation;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
          x = cx + Math.cos(rot) * outerRadius;
          y = cy + Math.sin(rot) * outerRadius;
          ctx.lineTo(x, y);
          rot += step;

          x = cx + Math.cos(rot) * innerRadius;
          y = cy + Math.sin(rot) * innerRadius;
          ctx.lineTo(x, y);
          rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.max(0, opacity);
        ctx.shadowColor = color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      function animateSparkles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = sparkles.length - 1; i >= 0; i--) {
          const sp = sparkles[i];
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.size *= 0.93;
          sp.rotation += 0.08;
          sp.opacity -= 0.025;

          if (sp.size < 0.6 || sp.opacity <= 0) {
            sparkles.splice(i, 1);
            continue;
          }
          drawStar(ctx, sp.x, sp.y, 4, sp.size, sp.size * 0.35, sp.color, sp.rotation, sp.opacity);
        }
        requestAnimationFrame(animateSparkles);
      }
      animateSparkles();
    })();

    function triggerCelebrationConfetti() {
      if (typeof confetti === 'undefined') return;
      const colors = ['#10B981', '#34D399', '#F59E0B', '#FBBF24', '#06B6D4', '#FFFFFF'];
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 }, colors: colors, zIndex: 99999 });
      setTimeout(() => { confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.75 }, colors: colors, zIndex: 99999 }); }, 160);
      setTimeout(() => { confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.75 }, colors: colors, zIndex: 99999 }); }, 320);
      setTimeout(() => { confetti({ particleCount: 90, spread: 120, origin: { y: 0.5 }, colors: ['#10B981', '#F59E0B', '#FFFFFF'], gravity: 0.85, zIndex: 99999 }); }, 480);
    }

    const receiptModal = document.getElementById('receipt-modal');
    const receiptCard = document.getElementById('receipt-card');
    const executeBtn = document.getElementById('execute-btn');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const acknowledgeCloseBtn = document.getElementById('acknowledge-close-btn');
    const modalConfettiBtn = document.getElementById('modal-confetti-btn');

    const countdownOverlay = document.getElementById('countdown-overlay');
    const countdownCard = document.getElementById('countdown-card');
    const countdownNum = document.getElementById('countdown-num');
    const countdownCircle = document.getElementById('countdown-circle');
    const countdownTitle = document.getElementById('countdown-title');
    const countdownSub = document.getElementById('countdown-sub');
    let isCountingDown = false;

    function updateCountdownPhase(sec) {
      countdownNum.textContent = sec;
      if (sec === 3) {
        countdownTitle.textContent = 'SYNCHRONIZING VERIFIED NODES';
        countdownSub.textContent = 'Initiating Age ${data.ageUnlocked} Level-Up Sequence...';
        countdownNum.className = 'text-6xl sm:text-7xl font-black font-mono tracking-tighter text-emerald-400 drop-shadow-[0_0_25px_currentColor]';
        countdownCircle.setAttribute('stroke', '#10B981');
        countdownCircle.style.strokeDashoffset = '176';
      } else if (sec === 2) {
        countdownTitle.textContent = 'OVERRIDING INSTITUTIONAL BANK HOLD';
        countdownSub.textContent = 'Zero-Block Settlement Verification Underway...';
        countdownNum.className = 'text-6xl sm:text-7xl font-black font-mono tracking-tighter text-amber-300 drop-shadow-[0_0_25px_currentColor]';
        countdownCircle.setAttribute('stroke', '#F59E0B');
        countdownCircle.style.strokeDashoffset = '88';
      } else if (sec === 1) {
        countdownTitle.textContent = 'DISPATCHING BIRTHDAY MESSAGE';
        countdownSub.textContent = 'Delivering VIP Drop from ${data.senderName || 'SPLENZZY'} to ${data.partnerName}...';
        countdownNum.className = 'text-6xl sm:text-7xl font-black font-mono tracking-tighter text-cyan-300 drop-shadow-[0_0_25px_currentColor]';
        countdownCircle.setAttribute('stroke', '#06B6D4');
        countdownCircle.style.strokeDashoffset = '15';
      }
    }

    function startCountdown() {
      if (isCountingDown) return;
      isCountingDown = true;
      executeBtn.disabled = true;

      countdownOverlay.classList.remove('hidden');
      countdownOverlay.classList.add('flex');
      requestAnimationFrame(() => {
        countdownCard.classList.remove('scale-95');
        countdownCard.classList.add('scale-100');
      });

      updateCountdownPhase(3);

      setTimeout(() => {
        updateCountdownPhase(2);
      }, 1000);

      setTimeout(() => {
        updateCountdownPhase(1);
      }, 2000);

      setTimeout(() => {
        countdownCard.classList.remove('scale-100');
        countdownCard.classList.add('scale-95');
        setTimeout(() => {
          countdownOverlay.classList.remove('flex');
          countdownOverlay.classList.add('hidden');
          isCountingDown = false;
          executeBtn.disabled = false;
          openModal();
        }, 300);
      }, 3000);
    }

    let hasCompletedProtocol = false;

    function openModal() {
      hasCompletedProtocol = true;
      triggerCelebrationConfetti();
      receiptModal.classList.remove('hidden');
      receiptModal.classList.add('flex');
      requestAnimationFrame(() => {
        receiptCard.classList.remove('scale-95', 'opacity-0');
        receiptCard.classList.add('scale-100', 'opacity-100');
      });
      addTerminalLog('SETTLED', 'SUCCESS', 'Block #240915 minted on-chain. Status: 200 OK. ${data.partnerName} Level ${data.ageUnlocked} Unlocked!');
    }

    function closeModal() {
      receiptCard.classList.remove('scale-100', 'opacity-100');
      receiptCard.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        receiptModal.classList.remove('flex');
        receiptModal.classList.add('hidden');
        showAchievementBadge();
      }, 200);
    }

    // Achievement Badge Logic
    const achievementBadge = document.getElementById('achievement-badge');
    const achievementCloseBtn = document.getElementById('achievement-close-btn');
    const achievementViewBtn = document.getElementById('achievement-view-btn');
    const achievementConfettiBtn = document.getElementById('achievement-confetti-btn');

    function showAchievementBadge() {
      if (!hasCompletedProtocol) return;
      achievementBadge.classList.remove('hidden');
      requestAnimationFrame(() => {
        achievementBadge.classList.remove('opacity-0', 'translate-y-8');
        achievementBadge.classList.add('opacity-100', 'translate-y-0');
      });
      addTerminalLog('ACHIEVEMENT', 'ACHIEVEMENT', '★ Protocol finalized: Level ${data.ageUnlocked} Unlocked badge awarded to ${data.partnerName}. Receipt verified.');
    }

    function hideAchievementBadge() {
      achievementBadge.classList.remove('opacity-100', 'translate-y-0');
      achievementBadge.classList.add('opacity-0', 'translate-y-8');
      setTimeout(() => {
        achievementBadge.classList.add('hidden');
      }, 400);
    }

    achievementCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hideAchievementBadge();
    });

    achievementViewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal();
    });

    achievementConfettiBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerCelebrationConfetti();
    });

    // Debug Terminal Engine
    const terminalLogs = document.getElementById('terminal-logs');
    const terminalExpandBtn = document.getElementById('terminal-expand-btn');
    const terminalChevron = document.getElementById('terminal-chevron');
    const terminalClearBtn = document.getElementById('terminal-clear-btn');
    const terminalAutoscrollBtn = document.getElementById('terminal-autoscroll-btn');
    const terminalToggleBar = document.getElementById('terminal-toggle-bar');
    let terminalAutoScroll = true;
    let terminalExpanded = true;

    function getNowTime() {
      const d = new Date();
      return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + ':' + String(d.getSeconds()).padStart(2, '0') + '.' + String(d.getMilliseconds()).padStart(3, '0');
    }

    function addTerminalLog(level, tag, message) {
      if (!terminalLogs) return;
      const row = document.createElement('div');
      let badgeClass = 'text-slate-400 bg-slate-800/40 border-slate-700/50';
      let rowHighlight = 'text-slate-400/90 hover:text-slate-200';
      if (level === 'TX') badgeClass = 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30';
      else if (level === 'ORACLE') badgeClass = 'text-cyan-300 bg-cyan-500/15 border-cyan-500/30';
      else if (level === 'MEMPOOL') badgeClass = 'text-amber-300 bg-amber-500/15 border-amber-500/30';
      else if (level === 'SETTLED') {
        badgeClass = 'text-emerald-300 bg-emerald-500/25 border-emerald-400 font-bold';
        rowHighlight = 'text-emerald-300 font-medium bg-emerald-500/[0.08] px-1.5 py-0.5 rounded';
      } else if (level === 'ACHIEVEMENT') {
        badgeClass = 'text-yellow-300 bg-yellow-500/20 border-yellow-400 font-bold';
        rowHighlight = 'text-yellow-300 font-semibold bg-yellow-500/[0.08] px-1.5 py-0.5 rounded';
      }

      row.className = 'flex items-start gap-2 text-[11px] leading-relaxed transition-opacity ' + rowHighlight;
      row.innerHTML = '<span class="text-slate-600 shrink-0 select-none">[' + getNowTime() + ']</span>' +
        '<span class="px-1 rounded text-[9px] font-bold border uppercase shrink-0 ' + badgeClass + '">' + tag + '</span>' +
        '<span class="break-all font-mono">' + message + '</span>';
      terminalLogs.appendChild(row);

      while (terminalLogs.children.length > 50) {
        terminalLogs.removeChild(terminalLogs.firstChild);
      }

      if (terminalAutoScroll) {
        terminalLogs.scrollTop = terminalLogs.scrollHeight;
      }
    }

    const seedLogs = [
      { l: 'INFO', t: 'NET', m: 'WebSocket connected to primary peer wss://mainnet.alchemy.io/v2/live-stream [Node #04]' },
      { l: 'ORACLE', t: '${data.partnerName}-ORACLE', m: 'Syncing honoree contract state: address 0x${data.partnerName}_SEP15 ... milestone age confirmed = ${data.ageUnlocked}' },
      { l: 'MEMPOOL', t: 'MEMPOOL', m: 'Scanned 2,491 pending mempool transactions. Zero slippage routing reserved for partner drop' },
      { l: 'TX', t: '${data.senderName || 'SPLENZZY'}-VAULT', m: 'Pre-authorizing Level ${data.ageUnlocked} Birthday Asset minted by ${data.senderName || 'SPLENZZY'}' },
      { l: 'INFO', t: 'BYPASS', m: 'Traditional ACH bank hold flag detected. Routing through zero-block bypass' },
      { l: 'ORACLE', t: 'CONSENSUS', m: '32/32 validator nodes synchronized. Awaiting execution trigger for ${data.partnerName}' }
    ];
    seedLogs.forEach(s => addTerminalLog(s.l, s.t, s.m));

    terminalAutoscrollBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      terminalAutoScroll = !terminalAutoScroll;
      terminalAutoscrollBtn.textContent = 'AUTO-SCROLL: ' + (terminalAutoScroll ? 'ON' : 'OFF');
      terminalAutoscrollBtn.className = 'px-1.5 py-0.5 rounded text-[10px] border cursor-pointer ' + (
        terminalAutoScroll
          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
          : 'bg-slate-900 border-slate-800 text-slate-500'
      );
    });

    terminalClearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      terminalLogs.innerHTML = '';
    });

    function toggleTerminal() {
      terminalExpanded = !terminalExpanded;
      if (terminalExpanded) {
        terminalLogs.classList.remove('hidden');
        terminalChevron.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
      } else {
        terminalLogs.classList.add('hidden');
        terminalChevron.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
      }
    }

    terminalToggleBar.addEventListener('click', toggleTerminal);

    executeBtn.addEventListener('click', startCountdown);
    modalCloseBtn.addEventListener('click', closeModal);
    acknowledgeCloseBtn.addEventListener('click', closeModal);
    modalConfettiBtn.addEventListener('click', triggerCelebrationConfetti);
  </script>
</body>
</html>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateHtmlCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generateHtmlCode()], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `level-up-protocol-${data.partnerName.toLowerCase().replace(/\s+/g, '-')}-birthday.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOpenStandalone = () => {
    window.open('/standalone.html', '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl text-slate-100 overflow-hidden my-auto"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90">
              <div className="flex items-center gap-2.5">
                <Code2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-mono font-bold text-base text-white">
                  Standalone Single-File HTML
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Here is the 100% self-contained HTML document configured with CDN links for Tailwind CSS and canvas-confetti. You can deploy this file directly to Vercel, Netlify, or send it directly to your business partner!
              </p>

              {/* Code preview window */}
              <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-3 font-mono text-xs text-slate-400 max-h-60 overflow-y-auto">
                <pre className="whitespace-pre-wrap select-all font-mono text-[11px] text-slate-300">
                  {generateHtmlCode().slice(0, 1200)}...
                </pre>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleCopyCode}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Full HTML</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownload}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download .html</span>
                </button>

                <button
                  onClick={handleOpenStandalone}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700"
                >
                  <ExternalLink className="w-4 h-4 text-teal-400" />
                  <span>Open Preview</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
