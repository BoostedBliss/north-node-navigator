import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ReferenceDot,
} from 'recharts';
import { NatalProfile, NodePosition } from '../types/astronomy';
import { calculateLunarNodes } from '../utils/astronomy';
import { Activity, ArrowUpRight } from 'lucide-react';


interface NodalLifespanGraphProps {
  natalProfile: NatalProfile;
  natalNorthNode: NodePosition;
  natalSouthNode: NodePosition;
  currentDate: Date;
  onSelectDate: (date: Date) => void;
}

export const NodalLifespanGraph: React.FC<NodalLifespanGraphProps> = ({
  natalProfile,
  natalNorthNode,
  natalSouthNode,
  currentDate,
  onSelectDate,
}) => {
  const [viewMode, setViewMode] = useState<'separation' | 'ecliptic'>('separation');

  const [bYear, bMonth, bDay] = useMemo(
    () => natalProfile.birthDate.split('-').map(Number),
    [natalProfile.birthDate]
  );

  const birthDateObj = useMemo(
    () => new Date(Date.UTC(bYear, bMonth - 1, bDay)),
    [bYear, bMonth, bDay]
  );

  // Current age in years relative to selected currentDate
  const currentAge = useMemo(() => {
    const diffMs = currentDate.getTime() - birthDateObj.getTime();
    return Math.max(0, Number((diffMs / (365.2425 * 86400000)).toFixed(1)));
  }, [currentDate, birthDateObj]);

  // Generate 91 sample points (Age 0 to 90 at 1-year intervals + 0.5-year around returns)
  const chartData = useMemo(() => {
    const points = [];
    const maxAge = 90;

    for (let age = 0; age <= maxAge; age += 1) {
      const pointDate = new Date(birthDateObj.getTime() + age * 365.2425 * 86400000);
      const { northNode } = calculateLunarNodes(pointDate);

      // Angular distance from Natal North Node (0 to 180 degrees)
      let diff = Math.abs(northNode.longitude - natalNorthNode.longitude) % 360;
      if (diff > 180) diff = 360 - diff;

      // Identify major harmonic phase
      let phase = 'Maturation';
      if (diff <= 8) phase = '☊ Nodal Return';
      else if (Math.abs(diff - 180) <= 8) phase = '☋ Nodal Reversal';
      else if (Math.abs(diff - 90) <= 6) phase = '□ Nodal Square';

      points.push({
        age,
        year: bYear + age,
        rawDate: pointDate,
        transitLongitude: Number(northNode.longitude.toFixed(1)),
        separationDeg: Number(diff.toFixed(1)),
        natalNNLongitude: Number(natalNorthNode.longitude.toFixed(1)),
        natalSNLongitude: Number(natalSouthNode.longitude.toFixed(1)),
        sign: northNode.sign,
        degree: northNode.signDegree,
        phase,
      });
    }

    return points;
  }, [birthDateObj, bYear, natalNorthNode.longitude, natalSouthNode.longitude]);

  // Find exact Nodal Returns points for highlight dots
  const returnMilestones = useMemo(() => {
    return [
      { age: 18.6, label: '1st Return (18.6y)' },
      { age: 37.2, label: '2nd Return (37.2y)' },
      { age: 55.8, label: '3rd Return (55.8y)' },
      { age: 74.4, label: '4th Return (74.4y)' },
    ];
  }, []);

  return (
    <div className="flex flex-col gap-3 p-5 rounded-2xl bg-[#0c1017] border border-stone-800/80 shadow-2xl">
      {/* Header and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
              Lifespan Nodal Transit Wave (Age 0 – 90)
            </h3>
            <p className="text-[11px] text-stone-400">
              Harmonic 18.6-year cycle plotted against {natalProfile.name}'s natal nodes ({natalNorthNode.signDegree}° {natalNorthNode.sign}).
            </p>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#121722] border border-stone-800 text-xs">
          <button
            onClick={() => setViewMode('separation')}
            className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
              viewMode === 'separation'
                ? 'bg-emerald-600 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Karmic Oscillation Wave (0°–180°)
          </button>
          <button
            onClick={() => setViewMode('ecliptic')}
            className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
              viewMode === 'ecliptic'
                ? 'bg-emerald-600 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            360° Ecliptic Longitude
          </button>
        </div>
      </div>

      {/* Graph Description Legend */}
      <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-stone-400 px-1">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-emerald-400 rounded-full"></span>
            <span>Transit North Node</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-amber-400 border-t border-dashed border-amber-400"></span>
            <span>Natal North Node Reference</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span>Current Age: {currentAge}y ({currentDate.getFullYear()})</span>
          </span>
        </div>
        <span className="text-stone-500 hidden sm:inline">Click any node to scrub timeline</span>
      </div>

      {/* Main Recharts Container */}
      <div className="w-full h-[280px] sm:h-[320px] select-none pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 15, right: 25, left: -10, bottom: 5 }}
            onClick={(e: unknown) => {
              const eventPayload = e as { activePayload?: Array<{ payload?: { rawDate?: Date } }> } | null;
              if (eventPayload?.activePayload?.[0]?.payload?.rawDate) {
                onSelectDate(eventPayload.activePayload[0].payload.rawDate);
              }
            }}

          >
            <CartesianGrid strokeDasharray="3 3" stroke="#161e2c" vertical={false} />
            <XAxis
              dataKey="age"
              stroke="#52525b"
              tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'monospace' }}
              tickLine={{ stroke: '#27272a' }}
              label={{ value: 'Lifespan Age (Years)', position: 'insideBottomRight', offset: -5, fill: '#71717a', fontSize: 10 }}
            />
            <YAxis
              stroke="#52525b"
              tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'monospace' }}
              tickLine={{ stroke: '#27272a' }}
              domain={viewMode === 'separation' ? [0, 180] : [0, 360]}
              ticks={viewMode === 'separation' ? [0, 45, 90, 135, 180] : [0, 90, 180, 270, 360]}
              unit="°"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-3 rounded-xl bg-[#0e141f]/95 backdrop-blur-md border border-stone-700/80 shadow-2xl text-xs space-y-1">
                      <div className="flex items-center justify-between gap-4 font-mono">
                        <span className="font-bold text-white">Age {data.age} ({data.year})</span>
                        <span className="text-emerald-300 font-semibold">{data.phase}</span>
                      </div>
                      <div className="text-stone-300 text-[11px]">
                        Transit ☊: <span className="font-semibold text-white">{data.degree}° {data.sign}</span> ({data.transitLongitude}°)
                      </div>
                      <div className="text-stone-400 text-[11px] font-mono">
                        Separation from Natal ☊: <span className="text-amber-300">{data.separationDeg}°</span>
                      </div>
                      <div className="pt-1 text-[10px] text-emerald-400 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>Click to jump to this year</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Current Age Vertical Reference Line */}
            {currentAge <= 90 && (
              <ReferenceLine
                x={Math.round(currentAge)}
                stroke="#14b8a6"
                strokeWidth={1.5}
                strokeDasharray="4 2"
                label={{
                  value: `Now (${currentAge}y)`,
                  fill: '#2dd4bf',
                  fontSize: 10,
                  position: 'top',
                }}
              />
            )}

            {/* In Separation Mode: 0° is Nodal Return, 180° is Nodal Reversal */}
            {viewMode === 'separation' ? (
              <>
                <ReferenceLine
                  y={0}
                  stroke="#34d399"
                  strokeWidth={1}
                  strokeOpacity={0.6}
                  label={{ value: 'Exact Return (0°)', fill: '#34d399', fontSize: 9, position: 'insideTopLeft' }}
                />
                <ReferenceLine
                  y={90}
                  stroke="#a1a1aa"
                  strokeWidth={0.8}
                  strokeDasharray="2 3"
                  strokeOpacity={0.3}
                  label={{ value: 'Karmic Crossroads (90°)', fill: '#71717a', fontSize: 9, position: 'insideTopLeft' }}
                />
                <ReferenceLine
                  y={180}
                  stroke="#fb923c"
                  strokeWidth={1}
                  strokeOpacity={0.6}
                  label={{ value: 'Half-Cycle Pivot (180°)', fill: '#fb923c', fontSize: 9, position: 'insideBottomLeft' }}
                />
                <Line
                  type="monotone"
                  dataKey="separationDeg"
                  stroke="#34d399"
                  strokeWidth={2.2}
                  dot={false}
                  activeDot={{ r: 5, fill: '#34d399', stroke: '#ffffff', strokeWidth: 2 }}
                />
              </>
            ) : (
              <>
                {/* Ecliptic 0-360 Mode */}
                <ReferenceLine
                  y={natalNorthNode.longitude}
                  stroke="#34d399"
                  strokeWidth={1}
                  strokeDasharray="4 3"
                  label={{
                    value: `Natal ☊ (${natalNorthNode.signDegree}° ${natalNorthNode.sign})`,
                    fill: '#34d399',
                    fontSize: 9,
                    position: 'insideTopLeft',
                  }}
                />
                <ReferenceLine
                  y={natalSouthNode.longitude}
                  stroke="#fb923c"
                  strokeWidth={1}
                  strokeDasharray="4 3"
                  label={{
                    value: `Natal ☋ (${natalSouthNode.signDegree}° ${natalSouthNode.sign})`,
                    fill: '#fb923c',
                    fontSize: 9,
                    position: 'insideBottomLeft',
                  }}
                />
                <Line
                  type="linear"
                  dataKey="transitLongitude"
                  stroke="#34d399"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, fill: '#34d399', stroke: '#ffffff', strokeWidth: 2 }}
                />
              </>
            )}

            {/* Dots on Exact 18.6-year milestones */}
            {returnMilestones.map((m) => (
              <ReferenceDot
                key={m.age}
                x={Math.round(m.age)}
                y={viewMode === 'separation' ? 0 : natalNorthNode.longitude}
                r={4}
                fill="#10b981"
                stroke="#0f172a"
                strokeWidth={1.5}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
