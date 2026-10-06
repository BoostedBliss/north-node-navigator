import React, { useState } from 'react';
import { TransitAlert, NatalPoint } from '../types/astronomy';
import { X, Bell, Sparkles, Volume2, VolumeX, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { playCelestialChime } from '../utils/audioChime';

interface TransitAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: TransitAlert[];
  natalPoints: NatalPoint[];
  orbThreshold: number;
  onChangeOrbThreshold: (orb: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onClearAlerts: () => void;
}

export const TransitAlertsModal: React.FC<TransitAlertsModalProps> = ({
  isOpen,
  onClose,
  alerts,
  natalPoints,
  orbThreshold,
  onChangeOrbThreshold,
  soundEnabled,
  onToggleSound,
  onClearAlerts,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0e141f] border border-stone-800 shadow-2xl text-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#0a0f16]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                  Transit Aspect Alerts Monitor
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                  {alerts.length} Active (&le;{orbThreshold}°)
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Live monitoring of transit lunar nodes crossing natal planets and angles.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onToggleSound();
                if (!soundEnabled) playCelestialChime();
              }}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                soundEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-stone-800 text-stone-500 border-stone-700'
              }`}
              title={soundEnabled ? 'Chime sound active' : 'Chime sound muted'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>


        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Threshold adjustment toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
            <div>
              <span className="font-semibold text-slate-200">Alert Orb Tolerance:</span>
              <span className="font-mono text-amber-400 ml-1.5 font-bold">{orbThreshold}°</span>
              <span className="text-slate-400 ml-2 hidden sm:inline">(Exact triggers at &le;0.5°)</span>
            </div>

            <div className="flex items-center gap-1.5">
              {[0.25, 0.5, 1.0, 1.5].map((val) => (
                <button
                  key={val}
                  onClick={() => onChangeOrbThreshold(val)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition cursor-pointer ${
                    orbThreshold === val
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  &le;{val}°
                </button>
              ))}
            </div>
          </div>

          {/* Active Alerts List */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">
                Triggered Exact Aspects
              </span>
              {alerts.length > 0 && (
                <button
                  onClick={onClearAlerts}
                  className="text-xs text-slate-400 hover:text-rose-400 cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {alerts.length === 0 ? (
              <div className="p-8 rounded-xl bg-slate-900/40 border border-slate-800/80 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
                <h4 className="text-sm font-bold text-slate-300">No aspects within &le;{orbThreshold}° right now</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Scrub time or wait as transit nodes approach your natal points. You will be alerted the moment an orb drops below {orbThreshold}°.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3.5 rounded-xl bg-[#0e1628] border border-amber-500/40 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-xs">
                          {alert.transitPointName}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">
                          {alert.aspectName} {alert.symbol}
                        </span>
                        <span className="font-bold text-purple-300 text-xs">
                          {alert.natalPointName}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-200 font-bold border border-amber-400/30">
                        Exact Orb: {alert.orb}°
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      {alert.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Natal Points Reference Table */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400 block mb-2.5">
              Monitored Natal Points & Angles
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {natalPoints.map((pt) => (
                <div
                  key={pt.id}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex flex-col"
                >
                  <div className="flex items-center justify-between text-slate-300 font-semibold mb-1">
                    <span>{pt.name}</span>
                    <span className="font-mono text-amber-400">{pt.symbol}</span>
                  </div>
                  <span className="font-mono text-slate-400 text-[11px]">
                    {pt.signDegree}° {pt.sign} {pt.signMinute}'
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#090d18] flex items-center justify-between text-xs text-slate-400">
          <span>Orb tolerance threshold: &le;{orbThreshold}°</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
