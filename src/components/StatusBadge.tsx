import React from 'react';
import { Activity } from 'lucide-react';

interface StatusBadgeProps {
  networkName?: string;
  pingMs?: number;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  networkName = 'MAINNET PROTOCOL',
  pingMs = 14,
}) => {
  return (
    <div
      id="status-badge"
      className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 shadow-lg shadow-black/40 backdrop-blur-md"
    >
      {/* Green pulsing status dot with radar ping */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-radar-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10B981]"></span>
      </span>

      {/* Primary Status Text */}
      <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
        INCOMING TRANSACTION READY
      </span>

      <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-700"></span>

      {/* Network stats / telemetry */}
      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-slate-400">
        <Activity className="w-3 h-3 text-emerald-500/70" />
        <span>{networkName}</span>
        <span className="text-slate-600">•</span>
        <span className="text-emerald-500/80">{pingMs}ms</span>
      </span>
    </div>
  );
};
