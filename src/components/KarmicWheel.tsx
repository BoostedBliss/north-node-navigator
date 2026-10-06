import React, { useState } from 'react';
import { NodePosition, ZodiacSignInfo, NatalProfile, TransitAspect } from '../types/astronomy';
import { ZODIAC_SIGNS } from '../utils/astronomy';
import { Orbit, Compass, Sparkles } from 'lucide-react';

interface KarmicWheelProps {
  transitNorth: NodePosition;
  transitSouth: NodePosition;
  natalNorth?: NodePosition | null;
  natalSouth?: NodePosition | null;
  aspect?: TransitAspect | null;
  natalProfile?: NatalProfile | null;
}

export const KarmicWheel: React.FC<KarmicWheelProps> = ({
  transitNorth,
  transitSouth,
  natalNorth,
  natalSouth,
  aspect,
  natalProfile,
}) => {
  const [hoveredSign, setHoveredSign] = useState<ZodiacSignInfo | null>(null);

  // Center & radius
  const size = 360;
  const center = size / 2;
  const outerR = 160;
  const innerR = 125;
  const trackR = 95;
  const hubR = 55;

  // Converts ecliptic longitude (0-360) to SVG coordinates on wheel
  // In astrology wheels, 0° Aries is typically on the left (East / 180° in standard polar coords) or 9 o'clock.
  // Standard astronomical/astrological chart convention: Aries starts at 180° SVG (9 o'clock) and rotates counter-clockwise.
  const degToSvg = (deg: number, radius: number): [number, number] => {
    // 0 deg Aries at 180 deg (left), counter-clockwise
    const angleRad = ((180 - deg) * Math.PI) / 180;
    const x = center + radius * Math.cos(angleRad);
    const y = center - radius * Math.sin(angleRad);
    return [x, y];
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4 rounded-2xl bg-[#0c1017] border border-stone-800/80 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center gap-2">
          <Orbit className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-xs tracking-wider text-stone-200 uppercase font-mono">
            Celestial Karmic Wheel (360°)
          </span>
        </div>
        <div className="text-[11px] font-mono text-stone-400">
          {transitNorth.sign} {transitNorth.signDegree}°{transitNorth.signMinute}' ℞
        </div>
      </div>

      {/* SVG Wheel */}
      <div className="relative w-[320px] h-[320px] sm:w-[350px] sm:h-[350px]">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full select-none">
          <defs>
            <radialGradient id="wheelCenter" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#141c28" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0b0e15" stopOpacity="0.95" />
            </radialGradient>
          </defs>

          {/* Outer Ring & Zodiac 12 Segments */}
          <circle cx={center} cy={center} r={outerR} fill="#0e131c" stroke="#1d2636" strokeWidth="1.5" />
          <circle cx={center} cy={center} r={innerR} fill="#0b0e15" stroke="#2a364d" strokeWidth="1" />
          <circle cx={center} cy={center} r={trackR} fill="none" stroke="#1d2636" strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx={center} cy={center} r={hubR} fill="url(#wheelCenter)" stroke="#34d399" strokeWidth="1" strokeOpacity="0.25" />

          {/* 12 Zodiac Sign Segments */}
          {ZODIAC_SIGNS.map((sign, index) => {
            const startAngle = (180 - sign.startDegree) * (Math.PI / 180);
            const endAngle = (180 - (sign.startDegree + 30)) * (Math.PI / 180);

            const x1Outer = center + outerR * Math.cos(startAngle);
            const y1Outer = center - outerR * Math.sin(startAngle);
            const x2Outer = center + outerR * Math.cos(endAngle);
            const y2Outer = center - outerR * Math.sin(endAngle);

            const x1Inner = center + innerR * Math.cos(startAngle);
            const y1Inner = center - innerR * Math.sin(startAngle);
            const x2Inner = center + innerR * Math.cos(endAngle);
            const y2Inner = center - innerR * Math.sin(endAngle);

            // Arc path for the sign
            const d = `M ${x1Inner} ${y1Inner} L ${x1Outer} ${y1Outer} A ${outerR} ${outerR} 0 0 1 ${x2Outer} ${y2Outer} L ${x2Inner} ${y2Inner} A ${innerR} ${innerR} 0 0 0 ${x1Inner} ${y1Inner} Z`;

            // Sign midpoint for label
            const midAngle = (180 - (sign.startDegree + 15)) * (Math.PI / 180);
            const labelR = (outerR + innerR) / 2;
            const lx = center + labelR * Math.cos(midAngle);
            const ly = center - labelR * Math.sin(midAngle);

            const isCurrentTransitSign = transitNorth.sign === sign.name;
            const isSouthTransitSign = transitSouth.sign === sign.name;
            const isHovered = hoveredSign?.name === sign.name;

            return (
              <g
                key={sign.name}
                className="cursor-pointer transition-colors"
                onMouseEnter={() => setHoveredSign(sign)}
                onMouseLeave={() => setHoveredSign(null)}
              >
                <path
                  d={d}
                  fill={
                    isHovered
                      ? '#1d2638'
                      : isCurrentTransitSign
                      ? '#062d24'
                      : isSouthTransitSign
                      ? '#2d1e14'
                      : index % 2 === 0
                      ? '#0c1017'
                      : '#10151f'
                  }
                  stroke="#1b2433"
                  strokeWidth="0.8"
                />
                <text
                  x={lx}
                  y={ly + 4}
                  fill={isCurrentTransitSign ? '#34d399' : isSouthTransitSign ? '#d4a373' : sign.color}
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none drop-shadow"
                >
                  {sign.symbol}
                </text>
              </g>
            );
          })}


          {/* Natal vs Transit Aspect Lines */}
          {natalNorth && (
            <g>
              {/* Line between Natal North and Natal South */}
              {(() => {
                const [nnx, nny] = degToSvg(natalNorth.longitude, innerR - 5);
                const [nsx, nsy] = degToSvg((natalNorth.longitude + 180) % 360, innerR - 5);
                return (
                  <line
                    x1={nnx}
                    y1={nny}
                    x2={nsx}
                    y2={nsy}
                    stroke="#a855f7"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                    opacity="0.6"
                  />
                );
              })()}

              {/* Chord connecting Natal North to Transit North */}
              {(() => {
                const [nnx, nny] = degToSvg(natalNorth.longitude, trackR);
                const [tnx, tny] = degToSvg(transitNorth.longitude, trackR);
                const aspectColor =
                  aspect?.aspectName === 'Conjunction'
                    ? '#fbbf24'
                    : aspect?.aspectName === 'Opposition'
                    ? '#f43f5e'
                    : aspect?.aspectName === 'Square'
                    ? '#f97316'
                    : aspect?.aspectName === 'Trine'
                    ? '#34d399'
                    : '#38bdf8';

                return (
                  <g>
                    <line
                      x1={nnx}
                      y1={nny}
                      x2={tnx}
                      y2={tny}
                      stroke={aspectColor}
                      strokeWidth="2"
                      strokeOpacity="0.8"
                      strokeDasharray={aspect?.aspectName === 'Square' ? '4 2' : undefined}
                    />
                  </g>
                );
              })()}
            </g>
          )}

          {/* Transit Nodal Axis Diameter Line */}
          {(() => {
            const [tnx, tny] = degToSvg(transitNorth.longitude, trackR + 10);
            const [tsx, tsy] = degToSvg(transitSouth.longitude, trackR + 10);
            return (
              <line
                x1={tnx}
                y1={tny}
                x2={tsx}
                y2={tsy}
                stroke="#34d399"
                strokeWidth="1.8"
                strokeOpacity="0.4"
              />
            );
          })()}

          {/* Transit North Node Marker ☊ */}
          {(() => {
            const [nx, ny] = degToSvg(transitNorth.longitude, trackR);
            return (
              <g transform={`translate(${nx}, ${ny})`} className="cursor-pointer">
                <circle r="14" fill="#059669" fillOpacity="0.25" className="animate-pulse" />
                <circle r="10" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
                <text
                  y="4"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  ☊
                </text>
              </g>
            );
          })()}

          {/* Transit South Node Marker ☋ */}
          {(() => {
            const [sx, sy] = degToSvg(transitSouth.longitude, trackR);
            return (
              <g transform={`translate(${sx}, ${sy})`} className="cursor-pointer">
                <circle r="14" fill="#d97706" fillOpacity="0.25" className="animate-pulse" />
                <circle r="10" fill="#b45309" stroke="#fcd34d" strokeWidth="1.5" />
                <text
                  y="4"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  ☋
                </text>
              </g>
            );
          })()}


          {/* Natal North Node Marker (if set) */}
          {natalNorth && (() => {
            const [nx, ny] = degToSvg(natalNorth.longitude, innerR - 15);
            return (
              <g transform={`translate(${nx}, ${ny})`} className="cursor-pointer">
                <circle r="8" fill="#7e22ce" stroke="#c084fc" strokeWidth="1.5" />
                <text
                  y="3"
                  fill="#ffffff"
                  fontSize="9"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  N☊
                </text>
              </g>
            );
          })()}

          {/* Natal South Node Marker (if set) */}
          {natalSouth && (() => {
            const [sx, sy] = degToSvg(natalSouth.longitude, innerR - 15);
            return (
              <g transform={`translate(${sx}, ${sy})`} className="cursor-pointer">
                <circle r="8" fill="#581c87" stroke="#e879f9" strokeWidth="1.5" />
                <text
                  y="3"
                  fill="#ffffff"
                  fontSize="9"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  N☋
                </text>
              </g>
            );
          })()}

          {/* Center Cosmic Hub */}
          <g transform={`translate(${center}, ${center})`}>
            <text y="-8" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">
              NODAL AXIS
            </text>
            <text y="7" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="serif">
              ☊ ☋
            </text>
            <text y="20" fill="#38bdf8" fontSize="8" textAnchor="middle" fontFamily="monospace">
              REAL-TIME
            </text>
          </g>
        </svg>
      </div>

      {/* Wheel Legend / Sign Detail */}
      <div className="w-full mt-2 pt-2 border-t border-slate-800/80 text-[11px]">
        {hoveredSign ? (
          <div className="flex items-center justify-between text-slate-300">
            <span className="font-semibold text-white">
              {hoveredSign.symbol} {hoveredSign.name} ({hoveredSign.element} / {hoveredSign.modality})
            </span>
            <span className="text-slate-400">Ruler: {hoveredSign.ruler}</span>
          </div>
        ) : aspect && aspect.aspectName !== 'None' ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-amber-300 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                Active Aspect: {aspect.aspectName} ({aspect.orb}° orb)
              </span>
            </div>
            <span className="text-slate-400 font-mono text-[10px]">
              {natalProfile ? `vs Natal (${natalProfile.name})` : ''}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between text-slate-400">
            <span>☊ North: {transitNorth.sign} (Dharma)</span>
            <span>☋ South: {transitSouth.sign} (Karma)</span>
          </div>
        )}
      </div>
    </div>
  );
};
