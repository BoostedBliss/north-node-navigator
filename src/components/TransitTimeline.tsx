import React from 'react';
import { Play, Pause, RotateCcw, FastForward, Rewind, Calendar, Clock } from 'lucide-react';
import { NODAL_INGRESS_PERIODS } from '../utils/astronomy';

interface TransitTimelineProps {
  currentDate: Date;
  onChangeDate: (date: Date) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const TransitTimeline: React.FC<TransitTimelineProps> = ({
  currentDate,
  onChangeDate,
  isPlaying,
  onTogglePlay,
}) => {
  const currentIsoDate = currentDate.toISOString().slice(0, 10);
  const currentYear = currentDate.getFullYear();

  // Jump helpers
  const jumpMonths = (months: number) => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + months);
    onChangeDate(next);
  };

  const jumpYears = (years: number) => {
    const next = new Date(currentDate);
    next.setFullYear(next.getFullYear() + years);
    onChangeDate(next);
  };

  const jumpToNow = () => {
    onChangeDate(new Date());
  };

  // Nodal return cycle jump (+18.61 years)
  const jumpNodalCycle = (direction: 1 | -1) => {
    const next = new Date(currentDate);
    const days = 6793.5 * direction; // ~18.6 years
    next.setTime(next.getTime() + days * 86400000);
    onChangeDate(next);
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl bg-[#0c1017] border border-stone-800/80 shadow-2xl">
      {/* Top Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-xs text-stone-200 tracking-wider uppercase font-mono">
            Karmic Time Scrubber & Ingress Timeline
          </span>
        </div>

        {/* Date Display & Jump To Real Time */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#101520] border border-stone-800 font-mono text-xs text-emerald-300">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <input
              type="date"
              value={currentIsoDate}
              onChange={(e) => {
                if (e.target.value) {
                  const [y, m, d] = e.target.value.split('-').map(Number);
                  const newD = new Date(currentDate);
                  newD.setFullYear(y, m - 1, d);
                  onChangeDate(newD);
                }
              }}
              className="bg-transparent text-emerald-300 focus:outline-none cursor-pointer"
            />
          </div>

          <button
            onClick={jumpToNow}
            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#141a24] hover:bg-[#1a2230] text-stone-200 border border-stone-800 transition flex items-center gap-1 cursor-pointer"
            title="Reset to Real-Time Now"
          >
            <RotateCcw className="w-3 h-3 text-emerald-400" />
            <span>Now</span>
          </button>
        </div>
      </div>

      {/* Scrub Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#0e131d] p-2.5 rounded-xl border border-stone-800/80">
        <div className="flex items-center gap-1.5">
          {/* Play / Pause auto advance */}
          <button
            onClick={onTogglePlay}
            className={`p-2 rounded-lg transition cursor-pointer ${
              isPlaying
                ? 'bg-emerald-600 text-stone-950 font-bold'
                : 'bg-[#151c28] hover:bg-[#1c2536] text-emerald-400'
            }`}
            title={isPlaying ? 'Pause auto transit progression' : 'Play transit progression'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Step buttons */}
          <button
            onClick={() => jumpMonths(-1)}
            className="px-2 py-1 rounded bg-[#151c28] hover:bg-[#1c2536] text-stone-300 text-xs font-mono cursor-pointer"
          >
            -1 Mo
          </button>
          <button
            onClick={() => jumpYears(-1)}
            className="px-2 py-1 rounded bg-[#151c28] hover:bg-[#1c2536] text-stone-300 text-xs font-mono cursor-pointer"
          >
            -1 Yr
          </button>
          <button
            onClick={() => jumpNodalCycle(-1)}
            className="px-2.5 py-1 rounded bg-teal-950/50 hover:bg-teal-900/70 border border-teal-700/50 text-teal-300 text-xs font-mono cursor-pointer"
            title="Step back 1 Nodal Cycle (~18.6 years)"
          >
            -18.6y
          </button>
        </div>

        {/* Year Slider */}
        <div className="flex items-center gap-3 flex-1 min-w-[200px] max-w-md mx-2">
          <span className="text-[10px] font-mono text-stone-500">1960</span>
          <input
            type="range"
            min={1960}
            max={2050}
            value={currentYear}
            onChange={(e) => {
              const yr = Number(e.target.value);
              const next = new Date(currentDate);
              next.setFullYear(yr);
              onChangeDate(next);
            }}
            className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
          <span className="text-[10px] font-mono text-stone-500">2050</span>
          <span className="font-mono text-xs font-bold text-emerald-300 min-w-[42px]">{currentYear}</span>
        </div>


        <div className="flex items-center gap-1.5">
          <button
            onClick={() => jumpNodalCycle(1)}
            className="px-2.5 py-1 rounded bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-700/50 text-indigo-300 text-xs font-mono cursor-pointer"
            title="Step forward 1 Nodal Cycle (~18.6 years)"
          >
            +18.6y
          </button>
          <button
            onClick={() => jumpYears(1)}
            className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-mono cursor-pointer"
          >
            +1 Yr
          </button>
          <button
            onClick={() => jumpMonths(1)}
            className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-mono cursor-pointer"
          >
            +1 Mo
          </button>
        </div>
      </div>

      {/* Historical & Upcoming Ingress Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none text-[11px]">
        <span className="text-[10px] uppercase font-mono text-slate-500 shrink-0">
          Nodal Eras:
        </span>
        {NODAL_INGRESS_PERIODS.map((period) => {
          const isActive =
            currentIsoDate >= period.startDate && currentIsoDate <= period.endDate;

          return (
            <button
              key={period.axis}
              onClick={() => {
                const [y, m, d] = period.startDate.split('-').map(Number);
                const next = new Date(currentDate);
                next.setFullYear(y, m - 1, d);
                onChangeDate(next);
              }}
              title={period.theme}
              className={`px-2.5 py-1 rounded-lg shrink-0 transition flex items-center gap-1.5 font-medium cursor-pointer ${
                isActive
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50 font-bold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-amber-400 animate-pulse' : 'bg-slate-600'}`}></span>
              <span>{period.axis}</span>
              <span className="text-[10px] text-slate-500 font-mono">({period.startDate.slice(0, 4)})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
