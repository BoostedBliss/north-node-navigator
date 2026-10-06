/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useTransition, useRef } from 'react';
import {
  calculateLunarNodes,
  generateAstrocartographyLines,
  calculateNodalAspect,
  FAMOUS_VORTEXES,
  calculateDistanceToLine,
  calculateNatalPoints,
  detectExactTransitAlerts,
} from './utils/astronomy';
import { PowerLocation, NatalProfile, TransitAlert } from './types/astronomy';
import { AstroMap } from './components/AstroMap';
import { KarmicWheel } from './components/KarmicWheel';
import { TransitTimeline } from './components/TransitTimeline';
import { KarmicInsightCard } from './components/KarmicInsightCard';
import { NatalModal } from './components/NatalModal';
import { TransitAlertToast } from './components/TransitAlertToast';
import { TransitAlertsModal } from './components/TransitAlertsModal';
import { NodalLifespanGraph } from './components/NodalLifespanGraph';

import {
  Compass,
  Orbit,
  Sparkles,
  Calendar,
  Globe,
  Share2,
  User,
  Shield,
  Layers,
  Award,
  Download,
  Bell,
} from 'lucide-react';


export default function App() {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<PowerLocation | null>(() => FAMOUS_VORTEXES[0]);
  const [natalModalOpen, setNatalModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'map' | 'wheel' | 'cycles' | 'vortexes'>('map');
  const [alertsModalOpen, setAlertsModalOpen] = useState<boolean>(false);
  const [orbThreshold, setOrbThreshold] = useState<number>(0.5);
  const [dismissedAlertIds, setDismissedAlertIds] = useState<Set<string>>(() => new Set());
  const [activeToastAlert, setActiveToastAlert] = useState<TransitAlert | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('karmic_sound_alerts');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const prevAlertIdsRef = useRef<string>('');
  const [, startTransition] = useTransition();

  // Load saved Natal profile from localStorage
  const [natalProfile, setNatalProfile] = useState<NatalProfile | null>(() => {
    try {
      const saved = localStorage.getItem('karmic_natal_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return {
      name: 'Seeker',
      birthDate: '1995-04-15',
      birthTime: '12:00',
      birthCity: 'New York, USA',
      birthLat: 40.7128,
      birthLng: -74.006,
    };
  });

  // Calculate Natal Points (North Node, South Node, Sun, Moon, AC, MC)
  const natalPoints = useMemo(() => {
    if (!natalProfile) return [];
    return calculateNatalPoints(natalProfile);
  }, [natalProfile]);

  // Save natal profile when updated
  const handleSaveNatal = (profile: NatalProfile) => {
    setNatalProfile(profile);
    try {
      localStorage.setItem('karmic_natal_profile', JSON.stringify(profile));
    } catch {
      // Ignore
    }
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('karmic_sound_alerts', JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  // Auto-play animation progression timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      startTransition(() => {
        setCurrentDate((prev) => {
          const next = new Date(prev);
          next.setDate(next.getDate() + 5); // Advance 5 days per frame for smooth celestial drift
          return next;
        });
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Real-time lunar node coordinates
  const { northNode: transitNorth, southNode: transitSouth } = useMemo(() => {
    return calculateLunarNodes(currentDate);
  }, [currentDate]);

  // Real-time Astrocartography lines
  const astroLines = useMemo(() => {
    return generateAstrocartographyLines(currentDate);
  }, [currentDate]);

  // Natal node calculations
  const natalNodes = useMemo(() => {
    if (!natalProfile) return null;
    const [y, m, d] = natalProfile.birthDate.split('-').map(Number);
    const [hh, mm] = natalProfile.birthTime.split(':').map(Number);
    const bDate = new Date(Date.UTC(y, m - 1, d, hh, mm));
    return calculateLunarNodes(bDate);
  }, [natalProfile]);

  // Transit aspect to natal node
  const nodalAspect = useMemo(() => {
    if (!natalNodes) return null;
    return calculateNodalAspect(natalNodes.northNode.longitude, transitNorth.longitude);
  }, [natalNodes, transitNorth.longitude]);

  // Detect exact transit aspects within orbThreshold
  const exactAlerts = useMemo(() => {
    if (!natalPoints.length) return [];
    return detectExactTransitAlerts(transitNorth.longitude, transitSouth.longitude, natalPoints, orbThreshold);
  }, [transitNorth.longitude, transitSouth.longitude, natalPoints, orbThreshold]);

  // Trigger Toast when a new exact alert enters <= 0.5 degrees
  useEffect(() => {
    if (exactAlerts.length > 0) {
      // Find candidate alert not yet dismissed in current session
      const candidate = exactAlerts.find((a) => !dismissedAlertIds.has(a.id));
      const currentSignature = exactAlerts.map((a) => a.id).join(',');

      if (candidate && currentSignature !== prevAlertIdsRef.current) {
        setActiveToastAlert(candidate);
        prevAlertIdsRef.current = currentSignature;
      }
    } else {
      setActiveToastAlert(null);
    }
  }, [exactAlerts, dismissedAlertIds]);


  // Calculate Nodal Return ages and dates
  const nodalMilestones = useMemo(() => {
    if (!natalProfile) return [];
    const [y, m, d] = natalProfile.birthDate.split('-').map(Number);
    const bDate = new Date(Date.UTC(y, m - 1, d));
    const milestones = [];

    // Nodal return ~ 18.61295 years (6798 days)
    const returnYears = [9.3, 18.6, 27.9, 37.2, 46.5, 55.8, 65.1, 74.4, 83.7, 93.0];

    for (const age of returnYears) {
      const isFullReturn = age % 18.6 < 1;
      const targetDate = new Date(bDate.getTime() + age * 365.2425 * 86400000);
      milestones.push({
        age: age.toFixed(1),
        type: isFullReturn ? 'Nodal Return (☊ Conjunction)' : 'Nodal Reversal (☋ Opposition)',
        date: targetDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
        rawDate: targetDate,
        theme: isFullReturn
          ? 'Major destiny reboot, realignment with soul blueprint, shedding past karma.'
          : 'Half-cycle pivot: balancing accumulated mastery with emerging life direction.',
      });
    }

    return milestones;
  }, [natalProfile]);

  // Export dossier functionality
  const handleExportReport = () => {
    const reportData = {
      title: 'Karmic Nodal Transit & Astrocartography Dossier',
      timestamp: currentDate.toISOString(),
      transitNorthNode: `${transitNorth.sign} ${transitNorth.signDegree}°${transitNorth.signMinute}'`,
      transitSouthNode: `${transitSouth.sign} ${transitSouth.signDegree}°${transitSouth.signMinute}'`,
      natalProfile: natalProfile,
      activeAspect: nodalAspect?.aspectName,
      aspectTheme: nodalAspect?.theme,
      selectedLocation: selectedLocation?.name,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `karmic-nodes-${currentDate.toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-[#e5e9f0] flex flex-col selection:bg-emerald-500/20 selection:text-emerald-200">
      {/* Top Cosmic Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0e131d]/90 backdrop-blur-md border-b border-stone-800/80 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-700 to-stone-800 flex items-center justify-center shadow-lg shadow-emerald-950/50">
              <Orbit className="w-5 h-5 text-emerald-200 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm md:text-base font-extrabold tracking-wider text-white font-mono uppercase">
                  Karmic Nodes <span className="text-emerald-400">·</span> Astrocartography
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                  Zenith Ephemeris
                </span>
              </div>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                Real-Time Lunar Node Transit Engine & Jim Lewis Global Planetary Angle Projection
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Transit Alert Notification Bell */}
            <button
              onClick={() => setAlertsModalOpen(true)}
              className={`relative px-3 py-1.5 rounded-xl border text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
                exactAlerts.length > 0
                  ? 'bg-amber-950/40 text-amber-200 border-amber-600/50 shadow-sm shadow-amber-950/50'
                  : 'bg-[#141a24] hover:bg-[#1a2230] text-stone-300 border-stone-800'
              }`}
              title="Transit Aspect Alerts (Exact orbs <= 0.5°)"
            >
              <div className="relative">
                <Bell className={`w-3.5 h-3.5 ${exactAlerts.length > 0 ? 'text-amber-400' : 'text-stone-400'}`} />
                {exactAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Alerts</span>
              {exactAlerts.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
                  {exactAlerts.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setNatalModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#141a24] hover:bg-[#1a2230] text-stone-200 text-xs font-medium border border-stone-800 transition flex items-center gap-1.5 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>{natalProfile ? `${natalProfile.name}'s Chart` : 'Enter Natal Chart'}</span>
            </button>

            <button
              onClick={handleExportReport}
              className="px-3 py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-200 text-xs font-medium border border-emerald-700/50 transition flex items-center gap-1.5 cursor-pointer"
              title="Download Karmic Transit Dossier"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Export Dossier</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 flex flex-col gap-5">
        {/* Real-time Transit Telemetry Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {/* North Node Current */}
          <div className="p-3 rounded-xl bg-[#0c1619] border border-emerald-600/35 flex flex-col">
            <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 flex items-center gap-1">
              <span>☊ North Node (Dharma)</span>
            </span>
            <div className="text-base sm:text-lg font-bold text-white mt-1">
              {transitNorth.signDegree}° {transitNorth.sign}
            </div>
            <span className="text-[10px] font-mono text-stone-400">
              {transitNorth.signMinute}' {transitNorth.signSecond}" {transitNorth.isRetrograde ? '℞ True' : 'Direct'}
            </span>
          </div>

          {/* South Node Current */}
          <div className="p-3 rounded-xl bg-[#161210] border border-amber-600/35 flex flex-col">
            <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 flex items-center gap-1">
              <span>☋ South Node (Karma)</span>
            </span>
            <div className="text-base sm:text-lg font-bold text-white mt-1">
              {transitSouth.signDegree}° {transitSouth.sign}
            </div>
            <span className="text-[10px] font-mono text-stone-400">
              {transitSouth.signMinute}' {transitSouth.signSecond}" Opposite
            </span>
          </div>

          {/* Equatorial Coordinates */}
          <div className="p-3 rounded-xl bg-[#0e131d] border border-stone-800 flex flex-col">
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400">
              Right Ascension
            </span>
            <div className="text-base sm:text-lg font-bold text-stone-200 mt-1 font-mono">
              {transitNorth.rightAscension.toFixed(2)}°
            </div>
            <span className="text-[10px] font-mono text-stone-400">
              Decl: {transitNorth.declination > 0 ? '+' : ''}{transitNorth.declination.toFixed(2)}°
            </span>
          </div>

          {/* Daily Nodal Motion */}
          <div className="p-3 rounded-xl bg-[#0e131d] border border-stone-800 flex flex-col">
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400">
              Diurnal Motion
            </span>
            <div className="text-base sm:text-lg font-bold text-emerald-300 mt-1 font-mono">
              {transitNorth.speedDegPerDay.toFixed(4)}°
            </div>
            <span className="text-[10px] font-mono text-stone-400">Mean Cycle ~18.61 yrs</span>
          </div>

          {/* Active Aspect vs Natal Chart */}
          <div className="col-span-2 p-3 rounded-xl bg-[#0e131d] border border-stone-800 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Natal Aspect ({natalProfile?.name || 'Chart'})</span>
              </span>
              <span className="text-[10px] font-mono text-stone-400">
                Natal ☊: {natalNodes ? `${natalNodes.northNode.signDegree}° ${natalNodes.northNode.sign}` : '—'}
              </span>
            </div>
            <div className="text-sm font-bold text-white mt-1 flex items-center gap-2">
              <span>{nodalAspect?.aspectName || 'Harmonic Orbit'}</span>
              {nodalAspect && (
                <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Orb: {nodalAspect.orb}°
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-400 line-clamp-1">
              {nodalAspect?.theme || 'Calculating personal transit aspects...'}
            </p>
          </div>
        </div>

        {/* Time Scrubber & Nodal Eras Timeline */}
        <TransitTimeline
          currentDate={currentDate}
          onChangeDate={setCurrentDate}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
        />

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-600/40 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Astrocartography World Map</span>
            </button>

            <button
              onClick={() => setActiveTab('wheel')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'wheel'
                  ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-600/40 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>Celestial Wheel & Shifts</span>
            </button>

            <button
              onClick={() => setActiveTab('cycles')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'cycles'
                  ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-600/40 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Nodal Return Cycles (18.6y)</span>
            </button>

            <button
              onClick={() => setActiveTab('vortexes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'vortexes'
                  ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-600/40 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Power Vortexes</span>
            </button>
          </div>
        </div>


        {/* Tab View Contents */}
        {activeTab === 'map' && (
          <div className="flex flex-col gap-5">
            <AstroMap
              lines={astroLines}
              currentDate={currentDate}
              selectedLocation={selectedLocation}
              onSelectLocation={setSelectedLocation}
            />
            {/* Karmic Insight Card for the current era */}
            <KarmicInsightCard
              transitNorth={transitNorth}
              transitSouth={transitSouth}
              natalNorth={natalNodes?.northNode}
              natalSouth={natalNodes?.southNode}
              aspect={nodalAspect}
              natalProfile={natalProfile}
            />
          </div>
        )}

        {activeTab === 'wheel' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-5 flex justify-center">
              <KarmicWheel
                transitNorth={transitNorth}
                transitSouth={transitSouth}
                natalNorth={natalNodes?.northNode}
                natalSouth={natalNodes?.southNode}
                aspect={nodalAspect}
                natalProfile={natalProfile}
              />
            </div>
            <div className="lg:col-span-7">
              <KarmicInsightCard
                transitNorth={transitNorth}
                transitSouth={transitSouth}
                natalNorth={natalNodes?.northNode}
                natalSouth={natalNodes?.southNode}
                aspect={nodalAspect}
                natalProfile={natalProfile}
              />
            </div>
          </div>
        )}

        {activeTab === 'cycles' && (
          <div className="flex flex-col gap-5">
            {/* Lifespan Recharts Visual Graph */}
            {natalProfile && natalNodes && (
              <NodalLifespanGraph
                natalProfile={natalProfile}
                natalNorthNode={natalNodes.northNode}
                natalSouthNode={natalNodes.southNode}
                currentDate={currentDate}
                onSelectDate={setCurrentDate}
              />
            )}

            <div className="flex flex-col gap-4 p-5 rounded-2xl bg-[#0c1017] border border-stone-800/80 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-300 font-mono">
                    Karmic Nodal Milestones for {natalProfile?.name || 'Seeker'}
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    The Moon's nodes complete a full orbital revolution every 18.6 years. Each return or half-return triggers pivotal life-path redirections.
                  </p>
                </div>
                <button
                  onClick={() => setNatalModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#141a24] text-xs font-medium text-stone-200 hover:bg-[#1a2230] border border-stone-800 transition cursor-pointer"
                >
                  Change Birth Info
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {nodalMilestones.map((m, idx) => {
                  const isFull = m.type.includes('Conjunction');
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isFull
                          ? 'bg-emerald-950/20 border-emerald-600/30'
                          : 'bg-amber-950/20 border-amber-600/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs font-bold text-stone-200">
                          Age {m.age} ({m.date})
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            isFull
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {isFull ? 'Nodal Return' : 'Half-Return'}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-stone-200 mb-1">{m.type}</div>
                      <p className="text-[11px] text-stone-400 leading-relaxed">{m.theme}</p>
                      <button
                        onClick={() => setCurrentDate(m.rawDate)}
                        className="mt-2 text-[10px] font-mono text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                      >
                        Inspect transit on this date →
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}


        {activeTab === 'vortexes' && (
          <div className="flex flex-col gap-4 p-5 rounded-2xl bg-[#0c1017] border border-stone-800/80 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-300 font-mono">
                  Global Sacred Vortexes & Astrological Resonance
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Click any power location to map its proximity to the real-time North Node and South Node planetary angle lines.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {FAMOUS_VORTEXES.map((vortex) => {
                const isSelected = selectedLocation?.id === vortex.id;
                // Calculate distance to closest line
                let closestDistance = Infinity;
                let closestLine = astroLines[0];
                for (const line of astroLines) {
                  const { minDistanceKm } = calculateDistanceToLine(vortex.lat, vortex.lng, line);
                  if (minDistanceKm < closestDistance) {
                    closestDistance = minDistanceKm;
                    closestLine = line;
                  }
                }

                return (
                  <div
                    key={vortex.id}
                    onClick={() => {
                      setSelectedLocation(vortex);
                      setActiveTab('map');
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-950/30 border-emerald-400 shadow-md'
                        : 'bg-[#121722]/60 hover:bg-[#182030] border-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-white">{vortex.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#182030] text-stone-300">
                        {vortex.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 line-clamp-2 mb-2">
                      {vortex.resonanceNote}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-stone-800/80 text-[10px] font-mono">
                      <span className="text-stone-500">Closest: {closestLine?.name.slice(0, 16)}</span>
                      <span className="text-emerald-400 font-bold">{closestDistance} km</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800/80 bg-[#0e131d] py-4 px-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>
            Astronomical Algorithms based on Jean Meeus Astronomical Algorithms (IAU J2000 Ephemeris).
          </span>
          <span className="font-mono text-[11px] text-stone-400">
            Astrocartography Methodology: Jim Lewis Angular Lines (MC · IC · AC · DC)
          </span>
        </div>
      </footer>


      {/* Natal Chart Setup Modal */}
      <NatalModal
        isOpen={natalModalOpen}
        onClose={() => setNatalModalOpen(false)}
        onSave={handleSaveNatal}
        currentProfile={natalProfile}
      />

      {/* Transit Aspect Alert Toast (Orb <= 0.5°) */}
      <TransitAlertToast
        alert={activeToastAlert}
        onDismiss={() => {
          if (activeToastAlert) {
            setDismissedAlertIds((prev) => new Set(prev).add(activeToastAlert.id));
            setActiveToastAlert(null);
          }
        }}
        onViewDetails={() => {
          setAlertsModalOpen(true);
          setActiveToastAlert(null);
        }}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Transit Alerts Management Modal */}
      <TransitAlertsModal
        isOpen={alertsModalOpen}
        onClose={() => setAlertsModalOpen(false)}
        alerts={exactAlerts}
        natalPoints={natalPoints}
        orbThreshold={orbThreshold}
        onChangeOrbThreshold={setOrbThreshold}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onClearAlerts={() => {
          setDismissedAlertIds(new Set(exactAlerts.map((a) => a.id)));
          setActiveToastAlert(null);
        }}
      />
    </div>
  );
}

