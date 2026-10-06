import React, { useEffect } from 'react';
import { TransitAlert } from '../types/astronomy';
import { Sparkles, Bell, X, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { playCelestialChime } from '../utils/audioChime';

interface TransitAlertToastProps {
  alert: TransitAlert | null;
  onDismiss: () => void;
  onViewDetails: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const TransitAlertToast: React.FC<TransitAlertToastProps> = ({
  alert,
  onDismiss,
  onViewDetails,
  soundEnabled,
  onToggleSound,
}) => {
  useEffect(() => {
    if (alert && soundEnabled) {
      playCelestialChime();
    }
  }, [alert?.id, soundEnabled]);

  if (!alert) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-[calc(100vw-2.5rem)] animate-fadeIn">
      <div className="relative overflow-hidden rounded-2xl bg-[#0e141f]/95 backdrop-blur-md border border-emerald-600/40 shadow-2xl shadow-emerald-950/40 p-4 text-stone-100">
        {/* Glowing top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 animate-pulse" />

        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Exact Nodal Transit Alert (&le;0.5°)</span>
            </div>
          </div>


          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleSound}
              className="p-1 rounded-md text-slate-400 hover:text-white transition cursor-pointer"
              title={soundEnabled ? 'Disable celestial chime' : 'Enable celestial chime'}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              )}
            </button>
            <button
              onClick={onDismiss}
              className="p-1 rounded-md text-slate-400 hover:text-white transition cursor-pointer"
              title="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Aspect Header */}
        <div className="flex items-baseline justify-between gap-2 mt-1 mb-1.5">
          <div className="text-sm font-bold text-white flex items-center gap-1.5 flex-wrap">
            <span className="text-sky-300 font-mono">{alert.transitPointName}</span>
            <span className="text-amber-400 font-bold px-1.5 py-0.5 rounded bg-amber-400/10 text-xs">
              {alert.aspectName} {alert.symbol}
            </span>
            <span className="text-purple-300 font-mono">{alert.natalPointName}</span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/40 shrink-0 font-bold">
            Orb: {alert.orb}°
          </span>
        </div>

        {/* Karmic message */}
        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          {alert.message}
        </p>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
          <span className="text-[10px] text-slate-400 font-mono">
            Direct Karmic Threshold Active
          </span>
          <button
            onClick={onViewDetails}
            className="flex items-center gap-1 text-amber-300 hover:text-amber-200 font-medium cursor-pointer"
          >
            <span>View All Active Aspects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
