import React, { useState, useRef, useMemo } from 'react';
import { AstrocartographyLine, PowerLocation } from '../types/astronomy';
import { CONTINENT_POLYGONS, geoToSvgCoords, svgCoordsToGeo } from '../data/worldMapData';
import { calculateDistanceToLine, FAMOUS_VORTEXES } from '../utils/astronomy';
import { Compass, ZoomIn, ZoomOut, RotateCcw, MapPin, Eye, Info, Sparkles } from 'lucide-react';

interface AstroMapProps {
  lines: AstrocartographyLine[];
  currentDate: Date;
  selectedLocation: PowerLocation | null;
  onSelectLocation: (loc: PowerLocation | null) => void;
}

export const AstroMap: React.FC<AstroMapProps> = ({
  lines,
  currentDate: _currentDate,
  selectedLocation,
  onSelectLocation,
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredLine, setHoveredLine] = useState<AstrocartographyLine | null>(null);

  // Line display filters
  const [showNorth, setShowNorth] = useState(true);
  const [showSouth, setShowSouth] = useState(true);
  const [showMC, setShowMC] = useState(true);
  const [showIC, setShowIC] = useState(true);
  const [showAC, setShowAC] = useState(true);
  const [showDC, setShowDC] = useState(true);
  const [showVortexes, setShowVortexes] = useState(true);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const filteredLines = useMemo(() => {
    return lines.filter((l) => {
      if (l.node === 'north' && !showNorth) return false;
      if (l.node === 'south' && !showSouth) return false;
      if (l.type === 'MC' && !showMC) return false;
      if (l.type === 'IC' && !showIC) return false;
      if (l.type === 'AC' && !showAC) return false;
      if (l.type === 'DC' && !showDC) return false;
      return true;
    });
  }, [lines, showNorth, showSouth, showMC, showIC, showAC, showDC]);

  // Handle Pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Click on map to drop custom pin
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculate relative svg position
    const clickX = (e.clientX - rect.left - pan.x) / zoom;
    const clickY = (e.clientY - rect.top - pan.y) / zoom;

    // Viewbox is 0 0 1000 500
    const [lng, lat] = svgCoordsToGeo(clickX, clickY, 1000, 500);

    // Clamp coordinates
    const clampedLat = Math.max(-85, Math.min(85, lat));
    let clampedLng = ((lng + 180) % 360 + 360) % 360 - 180;

    const customLoc: PowerLocation = {
      id: `custom-${Date.now()}`,
      name: `Coordinates (${clampedLat.toFixed(2)}°, ${clampedLng.toFixed(2)}°)`,
      country: 'Global Grid',
      lat: Number(clampedLat.toFixed(2)),
      lng: Number(clampedLng.toFixed(2)),
      category: 'Spiritual Vortex',
      resonanceNote: 'Custom geographical anchor point on the planetary nodal matrix.',
    };

    onSelectLocation(customLoc);
  };

  // Convert continent polygons to SVG path string
  const renderContinents = () => {
    return CONTINENT_POLYGONS.map((cont) => {
      const pathD = cont.coordinates
        .map((coord, idx) => {
          const [x, y] = geoToSvgCoords(coord[0], coord[1], 1000, 500);
          return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join(' ') + ' Z';

      return (
        <path
          key={cont.id}
          d={pathD}
          fill="#161d2a"
          stroke="#242e42"
          strokeWidth="0.8"
          className="transition-colors hover:fill-[#1c2536]"
        />
      );
    });
  };



  // Render astrocartography line
  const renderLinePath = (line: AstrocartographyLine) => {
    if (line.points.length === 0) return null;

    // Break lines when crossing the -180/180 date line
    const segments: [number, number][][] = [];
    let currentSegment: [number, number][] = [];

    for (let i = 0; i < line.points.length; i++) {
      const pt = line.points[i];
      if (currentSegment.length > 0) {
        const prev = currentSegment[currentSegment.length - 1];
        if (Math.abs(pt[0] - prev[0]) > 100) {
          // Wrap around boundary detected
          segments.push(currentSegment);
          currentSegment = [];
        }
      }
      currentSegment.push(pt);
    }
    if (currentSegment.length > 0) segments.push(currentSegment);

    const isHovered = hoveredLine?.id === line.id;
    const isNorth = line.node === 'north';

    return (
      <g key={line.id} onMouseEnter={() => setHoveredLine(line)} onMouseLeave={() => setHoveredLine(null)}>
        {segments.map((seg, sIdx) => {
          const d = seg
            .map((pt, pIdx) => {
              const [x, y] = geoToSvgCoords(pt[0], pt[1], 1000, 500);
              return `${pIdx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
            })
            .join(' ');

          return (
            <React.Fragment key={sIdx}>
              {/* Glow filter background path */}
              <path
                d={d}
                fill="none"
                stroke={line.color}
                strokeWidth={isHovered ? 4.5 : 2.2}
                strokeOpacity={isHovered ? 0.9 : 0.65}
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-200"
              />
              {/* High contrast sharp foreground line */}
              <path
                d={d}
                fill="none"
                stroke={isNorth ? '#ffffff' : '#ffd4a8'}
                strokeWidth={isHovered ? 1.5 : 0.8}
                strokeDasharray={line.type === 'IC' ? '4 3' : line.type === 'DC' ? '6 3' : undefined}
                className="pointer-events-none"
              />
            </React.Fragment>
          );
        })}
      </g>
    );
  };

  // Find nearest lines to current selected location
  const nearestLines = useMemo(() => {
    if (!selectedLocation) return [];
    return lines
      .map((line) => {
        const { minDistanceKm } = calculateDistanceToLine(selectedLocation.lat, selectedLocation.lng, line);
        return {
          line,
          distanceKm: minDistanceKm,
          distanceMiles: Math.round(minDistanceKm * 0.621371),
        };
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [lines, selectedLocation]);

  return (
    <div className="relative flex flex-col w-full rounded-2xl bg-[#0c1017] border border-stone-800/80 shadow-2xl overflow-hidden">
      {/* Top Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#10151f] border-b border-stone-800/80 text-xs">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-200 uppercase tracking-wider font-mono text-[11px]">
            Global Nodal Astrocartography Grid (A*C*G)
          </span>
          <span className="hidden sm:inline-block text-slate-600">·</span>
          <span className="hidden sm:inline-block text-slate-400">Jim Lewis Celestial Angular Projection</span>
        </div>

        {/* Filter Badges & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* North Node toggle */}
          <button
            onClick={() => setShowNorth(!showNorth)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition flex items-center gap-1.5 cursor-pointer ${
              showNorth ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-600/40' : 'bg-slate-900/60 text-slate-500 border border-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            ☊ North Node Lines
          </button>

          {/* South Node toggle */}
          <button
            onClick={() => setShowSouth(!showSouth)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition flex items-center gap-1.5 cursor-pointer ${
              showSouth ? 'bg-amber-950/40 text-amber-200 border border-amber-600/40' : 'bg-slate-900/60 text-slate-500 border border-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            ☋ South Node Lines
          </button>

          {/* Line Type toggles */}
          <div className="flex items-center rounded-lg bg-slate-900/90 border border-slate-800 p-0.5">
            <button
              onClick={() => setShowMC(!showMC)}
              title="Midheaven (Zenith / Career Destiny)"
              className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer ${showMC ? 'bg-stone-700/50 text-slate-200' : 'text-slate-500'}`}
            >
              MC
            </button>
            <button
              onClick={() => setShowIC(!showIC)}
              title="Imum Coeli (Nadir / Soul Roots)"
              className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer ${showIC ? 'bg-teal-950/60 text-teal-300' : 'text-slate-500'}`}
            >
              IC
            </button>
            <button
              onClick={() => setShowAC(!showAC)}
              title="Ascendant (Rising / Vital Awakening)"
              className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer ${showAC ? 'bg-amber-950/60 text-amber-300' : 'text-slate-500'}`}
            >
              AC
            </button>
            <button
              onClick={() => setShowDC(!showDC)}
              title="Descendant (Setting / Soul Contracts)"
              className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer ${showDC ? 'bg-purple-950/60 text-purple-300' : 'text-slate-500'}`}
            >
              DC
            </button>
          </div>


          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5 ml-1">
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.3, 3.5))}
              className="p-1 hover:text-white text-slate-400 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.3, 0.8))}
              className="p-1 hover:text-white text-slate-400 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setZoom(1);
                setPan({ x: 0, y: 0 });
              }}
              className="p-1 hover:text-white text-slate-400 cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main SVG Interactive Map Viewport */}
      <div
        className="relative w-full h-[440px] md:h-[520px] bg-[#060911] overflow-hidden select-none cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 1000 500"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          onClick={handleSvgClick}
        >
          <defs>
            <pattern id="grid" width="55.55" height="50" patternUnits="userSpaceOnUse">
              <path d="M 55.55 0 L 0 0 0 50" fill="none" stroke="#141c28" strokeWidth="0.5" strokeDasharray="2 4" />
            </pattern>
            {/* Equator & Prime Meridian highlight */}
            <radialGradient id="oceanGlow" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#0f141f" />
              <stop offset="100%" stopColor="#080b11" />
            </radialGradient>
          </defs>

          {/* Ocean Background */}
          <rect width="1000" height="500" fill="url(#oceanGlow)" />
          {/* Graticule Grid */}
          <rect width="1000" height="500" fill="url(#grid)" opacity="0.6" />

          {/* Tropic & Equator reference lines */}
          <g opacity="0.3">
            {/* Equator */}
            <line x1="0" y1="250" x2="1000" y2="250" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" />
            {/* Tropic of Cancer (23.5 N) */}
            <line x1="0" y1="184.7" x2="1000" y2="184.7" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 3" />
            {/* Tropic of Capricorn (23.5 S) */}
            <line x1="0" y1="315.3" x2="1000" y2="315.3" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 3" />
            {/* Prime Meridian */}
            <line x1="500" y1="0" x2="500" y2="500" stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="4 4" />
          </g>

          {/* Transformed Layer for Zoom & Pan */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* World Landmass Continents */}
            {renderContinents()}

            {/* Astrocartography Planetary Node Lines */}
            {filteredLines.map(renderLinePath)}

            {/* Sacred Vortexes & Major Cities */}
            {showVortexes &&
              FAMOUS_VORTEXES.map((vortex) => {
                const [cx, cy] = geoToSvgCoords(vortex.lng, vortex.lat, 1000, 500);
                const isSelected = selectedLocation?.id === vortex.id;

                return (
                  <g
                    key={vortex.id}
                    className="cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLocation(vortex);
                    }}
                  >
                    {/* Pulsing ring on selection */}
                    {isSelected && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="8"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="1.5"
                        className="animate-ping opacity-60"
                      />
                    )}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 4.5 : 2.8}
                      fill={
                        isSelected
                          ? '#fbbf24'
                          : vortex.category === 'Spiritual Vortex'
                          ? '#38bdf8'
                          : vortex.category === 'Sacred Site'
                          ? '#c084fc'
                          : '#94a3b8'
                      }
                      stroke="#060911"
                      strokeWidth="1.2"
                    />
                    {/* Hover text label */}
                    <text
                      x={cx + 5}
                      y={cy - 5}
                      fill="#e2e8f0"
                      fontSize="7"
                      fontFamily="monospace"
                      className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none drop-shadow"
                    >
                      {vortex.name}
                    </text>
                  </g>
                );
              })}

            {/* Selected Location Pin */}
            {selectedLocation && (
              <g>
                {(() => {
                  const [px, py] = geoToSvgCoords(selectedLocation.lng, selectedLocation.lat, 1000, 500);
                  return (
                    <g transform={`translate(${px}, ${py})`}>
                      <circle r="12" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" className="animate-spin" />
                      <circle r="4" fill="#fbbf24" stroke="#000" strokeWidth="1.5" />
                      {/* 500km Orb radius circle approximate */}
                      <circle r="22" fill="#fbbf24" fillOpacity="0.08" stroke="#fbbf24" strokeWidth="0.5" />
                    </g>
                  );
                })()}
              </g>
            )}
          </g>
        </svg>

        {/* Floating Line Hover Detail */}
        {hoveredLine && (
          <div className="absolute top-4 left-4 z-20 max-w-sm p-3 rounded-xl bg-slate-900/95 backdrop-blur border border-slate-700/80 shadow-xl text-xs pointer-events-none transition-all">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: hoveredLine.color }}
              ></span>
              <span className="font-bold text-white tracking-wide">{hoveredLine.name}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                {hoveredLine.type}
              </span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">{hoveredLine.description}</p>
          </div>
        )}

        {/* Legend Overlay */}
        <div className="absolute bottom-3 left-3 z-10 hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-900/85 backdrop-blur border border-slate-800 text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            <span>☊ North Node (Dharma / Purpose)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            <span>☋ South Node (Karma / Release)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>MC Zenith</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>AC Rising</span>
          </div>
        </div>

        {/* Click anywhere instruction */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/80 backdrop-blur border border-slate-800 text-[10px] text-slate-400">
          <MapPin className="w-3 h-3 text-amber-400" />
          <span>Click anywhere or choose power spot</span>
        </div>
      </div>

      {/* Selected Location Astrocartography Breakdown Panel */}
      {selectedLocation && (
        <div className="p-4 bg-[#0e131c] border-t border-stone-800/80">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white tracking-wide">
                  {selectedLocation.name}
                  <span className="text-slate-400 font-normal ml-1.5 text-xs">({selectedLocation.country})</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  {selectedLocation.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">{selectedLocation.resonanceNote}</p>
            </div>

            <button
              onClick={() => onSelectLocation(null)}
              className="text-slate-500 hover:text-slate-300 text-xs cursor-pointer"
            >
              Clear Pin
            </button>
          </div>

          {/* Nearest Nodal Lines Resonance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {nearestLines.slice(0, 4).map(({ line, distanceKm, distanceMiles }) => {
              const isDirectOrb = distanceKm <= 550; // Jim Lewis standard ACG orb ~ 500-700km
              const isNorth = line.node === 'north';

              return (
                <div
                  key={line.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isDirectOrb
                      ? isNorth
                        ? 'bg-emerald-950/25 border-emerald-600/40 shadow-sm shadow-emerald-950/30'
                        : 'bg-amber-950/25 border-amber-600/40 shadow-sm shadow-amber-950/30'
                      : 'bg-[#121722]/60 border-stone-800/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: line.color }}
                      ></span>
                      <span className="font-semibold text-xs text-slate-200">
                        {isNorth ? '☊' : '☋'} {line.type}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isDirectOrb
                          ? 'bg-emerald-400/20 text-emerald-300 font-bold'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {distanceKm} km ({distanceMiles} mi)
                    </span>
                  </div>


                  <p className="text-[11px] text-slate-300 leading-tight mb-2 font-medium">
                    {line.name}
                  </p>

                  <div className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-1.5">
                    {isDirectOrb ? (
                      <span className="text-amber-200 font-medium">
                        ★ Strong Angular Power Orb: Direct karmic resonance active in this territory.
                      </span>
                    ) : (
                      <span className="text-slate-400">Ambient Regional Influence.</span>
                    )}
                    <span className="block mt-1 text-slate-300">{line.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
