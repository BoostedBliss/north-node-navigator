import React from 'react';
import { NodePosition, NatalProfile, TransitAspect } from '../types/astronomy';
import { getKarmicAxisInterpretation } from '../utils/astronomy';
import { Sparkles, ArrowRight, Compass, ShieldAlert, HeartHandshake, Award } from 'lucide-react';

interface KarmicInsightCardProps {
  transitNorth: NodePosition;
  transitSouth: NodePosition;
  natalNorth?: NodePosition | null;
  natalSouth?: NodePosition | null;
  aspect?: TransitAspect | null;
  natalProfile?: NatalProfile | null;
}

export const KarmicInsightCard: React.FC<KarmicInsightCardProps> = ({
  transitNorth,
  transitSouth,
  natalNorth: _natalNorth,
  aspect,
  natalProfile,
}) => {
  const interp = getKarmicAxisInterpretation(transitNorth.sign);

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-[#0c1017] border border-stone-800/80 shadow-2xl">
      {/* Title & Core Axis Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-300 font-mono">
              Active Karmic Life Path Axis
            </h2>
          </div>
          <p className="text-base font-bold text-white mt-0.5">
            {interp.axisTitle}
          </p>
        </div>

        {/* Speed / Retrograde Status */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-300 border border-emerald-800/50">
            Speed: {Math.abs(transitNorth.speedDegPerDay).toFixed(3)}°/day
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-700/40">
            {transitNorth.isRetrograde ? 'True Retrograde (℞)' : 'Direct Movement'}
          </span>
        </div>
      </div>

      {/* Transit vs Natal Aspect Banner (if natal chart entered) */}
      {natalProfile && aspect && aspect.aspectName !== 'None' && (
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/30 via-stone-900 to-amber-950/20 border border-emerald-600/35">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-200">
              Personal Soul Milestone: {aspect.aspectName} ({aspect.symbol}) · Orb: {aspect.orb}°
            </span>
          </div>
          <p className="text-xs text-stone-200 leading-relaxed font-medium">
            {aspect.theme}
          </p>
        </div>
      )}

      {/* Core Life Path Mission */}
      <div className="p-3.5 rounded-xl bg-[#101520] border border-stone-800">
        <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>Core Evolutionary Soul Mission</span>
        </div>
        <p className="text-sm text-stone-200 font-medium leading-relaxed">
          {interp.lifePathMission}
        </p>
      </div>

      {/* Side by side: Dharma to Embrace vs Karma to Release */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* North Node: Dharma */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-600/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base text-emerald-400 font-bold">☊</span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
                North Node in {transitNorth.sign}: Dharma to Embrace
              </span>
            </div>
            <ul className="space-y-2 text-xs text-stone-300">
              {interp.northNodeDharma.map((dharma, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{dharma}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-3 pt-2 border-t border-emerald-800/40 text-[11px] text-emerald-300/80 font-mono">
            Focus: High-vibrational soul evolution and unchartered growth.
          </div>
        </div>

        {/* South Node: Karma to Release */}
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-600/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base text-amber-400 font-bold">☋</span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
                South Node in {transitSouth.sign}: Karma to Release
              </span>
            </div>
            <ul className="space-y-2 text-xs text-stone-300">
              {interp.southNodeKarmaToRelease.map((karma, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{karma}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-3 pt-2 border-t border-amber-800/40 text-[11px] text-amber-300/80 font-mono">
            Caution: Comfort zones that drain vitality when over-relied upon.
          </div>
        </div>
      </div>

      {/* Collective Focus & Shadow Integration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
        <div className="p-3.5 rounded-xl bg-[#101520]/70 border border-stone-800 text-xs">
          <div className="flex items-center gap-1.5 text-stone-300 font-bold mb-1">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
            <span>Global Collective Focus</span>
          </div>
          <p className="text-stone-400 leading-relaxed text-[11px]">
            {interp.collectiveFocus}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#101520]/70 border border-stone-800 text-xs">
          <div className="flex items-center gap-1.5 text-stone-300 font-bold mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-stone-400" />
            <span>Karmic Shadow Pitfalls</span>
          </div>
          <p className="text-stone-400 leading-relaxed text-[11px]">
            {interp.shadowPitfalls.join(' · ')}
          </p>
        </div>
      </div>
    </div>
  );
};
