import {
  ZodiacSignName,
  ZodiacSignInfo,
  NodePosition,
  AstrocartographyLine,
  KarmicShiftInterpretation,
  TransitAspect,
  PowerLocation,
  NatalProfile,
  NatalPoint,
  TransitAlert,
} from '../types/astronomy';


export const ZODIAC_SIGNS: ZodiacSignInfo[] = [
  { name: 'Aries', symbol: '♈', element: 'Fire', modality: 'Cardinal', ruler: 'Mars', startDegree: 0, color: '#f87171', oppositeSign: 'Libra' },
  { name: 'Taurus', symbol: '♉', element: 'Earth', modality: 'Fixed', ruler: 'Venus', startDegree: 30, color: '#4ade80', oppositeSign: 'Scorpio' },
  { name: 'Gemini', symbol: '♊', element: 'Air', modality: 'Mutable', ruler: 'Mercury', startDegree: 60, color: '#facc15', oppositeSign: 'Sagittarius' },
  { name: 'Cancer', symbol: '♋', element: 'Water', modality: 'Cardinal', ruler: 'Moon', startDegree: 90, color: '#38bdf8', oppositeSign: 'Capricorn' },
  { name: 'Leo', symbol: '♌', element: 'Fire', modality: 'Fixed', ruler: 'Sun', startDegree: 120, color: '#fb923c', oppositeSign: 'Aquarius' },
  { name: 'Virgo', symbol: '♍', element: 'Earth', modality: 'Mutable', ruler: 'Mercury', startDegree: 150, color: '#34d399', oppositeSign: 'Pisces' },
  { name: 'Libra', symbol: '♎', element: 'Air', modality: 'Cardinal', ruler: 'Venus', startDegree: 180, color: '#e879f9', oppositeSign: 'Aries' },
  { name: 'Scorpio', symbol: '♏', element: 'Water', modality: 'Fixed', ruler: 'Pluto / Mars', startDegree: 210, color: '#a855f7', oppositeSign: 'Taurus' },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire', modality: 'Mutable', ruler: 'Jupiter', startDegree: 240, color: '#f43f5e', oppositeSign: 'Gemini' },
  { name: 'Capricorn', symbol: '♑', element: 'Earth', modality: 'Cardinal', ruler: 'Saturn', startDegree: 270, color: '#a3e635', oppositeSign: 'Cancer' },
  { name: 'Aquarius', symbol: '♒', element: 'Air', modality: 'Fixed', ruler: 'Uranus / Saturn', startDegree: 300, color: '#06b6d4', oppositeSign: 'Leo' },
  { name: 'Pisces', symbol: '♓', element: 'Water', modality: 'Mutable', ruler: 'Neptune / Jupiter', startDegree: 330, color: '#818cf8', oppositeSign: 'Virgo' },
];

export const FAMOUS_VORTEXES: PowerLocation[] = [
  { id: 'sedona', name: 'Sedona, Arizona', country: 'United States', lat: 34.8697, lng: -111.761, category: 'Spiritual Vortex', resonanceNote: 'Amplified electromagnetic nodal grid; accelerates kundalini awakening and karmic clearing.' },
  { id: 'glastonbury', name: 'Glastonbury (Avalon)', country: 'United Kingdom', lat: 51.145, lng: -2.716, category: 'Sacred Site', resonanceNote: 'Heart chakra ley line intersection; ancestral past-life memory reactivation.' },
  { id: 'kyoto', name: 'Kyoto Temples', country: 'Japan', lat: 35.0116, lng: 135.768, category: 'Ancient Temple', resonanceNote: 'Zen dharma grounding; anchors high-frequency spiritual discipline and clarity.' },
  { id: 'machu-picchu', name: 'Machu Picchu', country: 'Peru', lat: -13.1631, lng: -72.545, category: 'Sacred Site', resonanceNote: 'Solar gateway at high altitude; bridges collective soul purpose with ancient celestial wisdom.' },
  { id: 'varanasi', name: 'Varanasi (Kashi)', country: 'India', lat: 25.3176, lng: 82.9739, category: 'Sacred Site', resonanceNote: 'Primary Ketu/Rahu moksha portal; facilitates the dissolution of heavy past karmic debts.' },
  { id: 'cairo', name: 'Giza Pyramids, Cairo', country: 'Egypt', lat: 29.9792, lng: 31.1342, category: 'Ancient Temple', resonanceNote: 'Prime meridian of ancient initiation; activates soul codes of sovereignty and leadership.' },
  { id: 'reykjavik', name: 'Reykjavik Geothermal Fields', country: 'Iceland', lat: 64.1466, lng: -21.9426, category: 'Spiritual Vortex', resonanceNote: 'Earth elemental crucible; facilitates rapid emotional purification and rebirth.' },
  { id: 'ubud', name: 'Ubud, Bali', country: 'Indonesia', lat: -8.5069, lng: 115.2625, category: 'Spiritual Vortex', resonanceNote: 'Kundalini earth chakra; harmonizes sacred feminine devotion and artistic rebirth.' },
  { id: 'delphi', name: 'Delphi Oracle', country: 'Greece', lat: 38.4824, lng: 22.501, category: 'Ancient Temple', resonanceNote: 'Navel of the ancient world; prophetic vision and cosmic alignment.' },
  { id: 'shasta', name: 'Mount Shasta, California', country: 'United States', lat: 41.4092, lng: -122.1949, category: 'Spiritual Vortex', resonanceNote: 'Root chakra vortex; anchors multidimensional soul purpose and dharma downloads.' },
  { id: 'nyc', name: 'New York City', country: 'United States', lat: 40.7128, lng: -74.006, category: 'Metropolis', resonanceNote: 'Collective karma crucible; intensifies worldly ambitions, public visibility, and velocity of fate.' },
  { id: 'london', name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, category: 'Metropolis', resonanceNote: 'Global institutional hub; tests ethical power structures and contractual karmic agreements.' },
  { id: 'paris', name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, category: 'Metropolis', resonanceNote: 'Aesthetic and heart-centered refinement; calls forth cultural mastery and romantic destiny.' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, category: 'Metropolis', resonanceNote: 'Technological futurism meets sacred discipline; accelerates North Node evolution.' },
  { id: 'sydney', name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, category: 'Metropolis', resonanceNote: 'Oceanic horizon gateway; unlocks expansive cross-cultural destiny opportunities.' },
  { id: 'cape-town', name: 'Table Mountain, Cape Town', country: 'South Africa', lat: -33.9575, lng: 18.4131, category: 'Sacred Site', resonanceNote: 'Earth earth-wheel portal; facilitates profound physical grounding and ancestral release.' },
];

/**
 * Computes Julian Date from JavaScript Date (UTC)
 */
export function dateToJulianDate(date: Date): number {
  const time = date.getTime();
  return time / 86400000 + 2440587.5;
}

/**
 * Calculates mean obliquity of the ecliptic in degrees
 */
export function getMeanObliquity(T: number): number {
  // T in Julian centuries from J2000.0
  const eps0 = 23.43929111 - 0.013004167 * T - 0.000000164 * T * T + 0.0000005036 * T * T * T;
  return eps0;
}

/**
 * Greenwich Mean Sidereal Time in degrees (0 - 360)
 */
export function getGMST(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000.0;
  gmst = ((gmst % 360) + 360) % 360;
  return gmst;
}

/**
 * Calculates high-precision Mean and True Lunar Node longitude (Meeus algorithm)
 */
export function calculateLunarNodes(date: Date): { northNode: NodePosition; southNode: NodePosition } {
  const jd = dateToJulianDate(date);
  const T = (jd - 2451545.0) / 36525.0;

  // Mean Longitude of Moon's Ascending Node (Omega) in degrees
  let omegaMean = 125.044555 - 1934.1361849 * T + 0.0020762 * T * T + 0.000002139 * T * T * T - 0.0000000165 * T * T * T * T;
  omegaMean = ((omegaMean % 360) + 360) % 360;

  // Fundamental arguments for true node perturbations (in radians)
  const deg2rad = Math.PI / 180;
  const D = (297.85036 + 445267.11148 * T) * deg2rad; // Moon's mean elongation
  const M = (357.52772 + 35999.05034 * T) * deg2rad;  // Sun's mean anomaly
  const Mprime = (134.96298 + 477198.867398 * T) * deg2rad; // Moon's mean anomaly
  const F = (93.27191 + 483202.017538 * T) * deg2rad;  // Moon's argument of latitude

  // Periodic corrections to derive True Node from Mean Node
  const dOmega =
    -1.4979 * Math.sin(2 * (D - F)) -
    0.1500 * Math.sin(M) -
    0.1226 * Math.sin(2 * D) +
    0.1176 * Math.sin(2 * F) -
    0.0801 * Math.sin(2 * (D - M));

  let omegaTrue = omegaMean + dOmega;
  omegaTrue = ((omegaTrue % 360) + 360) % 360;

  const southOmega = (omegaTrue + 180) % 360;

  // Obliquity
  const eps = getMeanObliquity(T) * deg2rad;

  // Convert ecliptic longitude to Equatorial coordinates (Right Ascension & Declination)
  const toEquatorial = (eclipticLngDeg: number) => {
    const lambda = eclipticLngDeg * deg2rad;
    const sinAlpha = Math.sin(lambda) * Math.cos(eps);
    const cosAlpha = Math.cos(lambda);
    let alphaRad = Math.atan2(sinAlpha, cosAlpha);
    if (alphaRad < 0) alphaRad += 2 * Math.PI;
    const alphaDeg = alphaRad * (180 / Math.PI);

    const sinDelta = Math.sin(eps) * Math.sin(lambda);
    const deltaDeg = Math.asin(sinDelta) * (180 / Math.PI);
    return { ra: alphaDeg, dec: deltaDeg };
  };

  const northEquat = toEquatorial(omegaTrue);
  const southEquat = toEquatorial(southOmega);

  // Speed estimation (degrees per day)
  const dtDays = 0.05;
  const jdNext = jd + dtDays;
  const TNext = (jdNext - 2451545.0) / 36525.0;
  let omegaMeanNext = 125.044555 - 1934.1361849 * TNext;
  omegaMeanNext = ((omegaMeanNext % 360) + 360) % 360;
  let speed = (omegaMeanNext - omegaMean) / dtDays;
  if (speed > 180) speed -= 360;
  if (speed < -180) speed += 360;

  const buildNodePos = (lng: number, ra: number, dec: number): NodePosition => {
    const signIndex = Math.floor(lng / 30);
    const sign = ZODIAC_SIGNS[signIndex].name;
    const degInSign = lng % 30;
    const signDegree = Math.floor(degInSign);
    const signMinute = Math.floor((degInSign - signDegree) * 60);
    const signSecond = Math.floor(((degInSign - signDegree) * 60 - signMinute) * 60);

    return {
      longitude: lng,
      sign,
      signDegree,
      signMinute,
      signSecond,
      rightAscension: ra,
      declination: dec,
      isRetrograde: speed < 0,
      speedDegPerDay: speed,
    };
  };

  return {
    northNode: buildNodePos(omegaTrue, northEquat.ra, northEquat.dec),
    southNode: buildNodePos(southOmega, southEquat.ra, southEquat.dec),
  };
}

/**
 * Generates the 4 Jim Lewis Astrocartography lines (MC, IC, AC, DC) for both nodes
 */
export function generateAstrocartographyLines(date: Date): AstrocartographyLine[] {
  const jd = dateToJulianDate(date);
  const gmst = getGMST(jd);
  const { northNode, southNode } = calculateLunarNodes(date);

  const lines: AstrocartographyLine[] = [];

  const createLinesForNode = (
    nodeName: 'north' | 'south',
    raDeg: number,
    decDeg: number,
    baseColor: string,
    accentColor: string
  ) => {
    // 1. Midheaven (MC) Line - Vertical Meridian where Local Sidereal Time = RA
    // LST = GMST + Longitude => Longitude = RA - GMST
    let mcLng = raDeg - gmst;
    mcLng = ((mcLng + 180) % 360) - 180; // normalize to -180 .. +180

    const mcPoints: [number, number][] = [];
    for (let lat = -80; lat <= 80; lat += 2) {
      mcPoints.push([mcLng, lat]);
    }

    lines.push({
      id: `${nodeName}-MC`,
      node: nodeName,
      type: 'MC',
      name: `${nodeName === 'north' ? 'North Node' : 'South Node'} Midheaven (MC)`,
      description:
        nodeName === 'north'
          ? 'Peak Karmic Dharma Culmination: Public calling, career destiny, executive visibility, and recognized life mission.'
          : 'Ancestral Career Mastery & Past Repertoire: Where past-life skills come easily, but risk career stagnancy if not evolved.',
      color: baseColor,
      points: mcPoints,
    });

    // 2. Imum Coeli (IC) Line - Nadir Meridian: MC ± 180
    let icLng = mcLng > 0 ? mcLng - 180 : mcLng + 180;
    const icPoints: [number, number][] = [];
    for (let lat = -80; lat <= 80; lat += 2) {
      icPoints.push([icLng, lat]);
    }

    lines.push({
      id: `${nodeName}-IC`,
      node: nodeName,
      type: 'IC',
      name: `${nodeName === 'north' ? 'North Node' : 'South Node'} Nadir (IC)`,
      description:
        nodeName === 'north'
          ? 'Deep Soul Roots & Vocation: Inner foundation, psychological belonging, building a sacred home, and generational healing.'
          : 'Ancestral Lineage Release: Karmic baggage within family roots; feeling tied to old family obligations.',
      color: accentColor,
      points: icPoints,
    });

    // 3 & 4. Ascendant (AC) and Descendant (DC) curves
    // Horizon formula: sin(alt) = sin(lat)*sin(dec) + cos(lat)*cos(dec)*cos(H) = 0
    // => cos(H) = -tan(lat)*tan(dec)
    const decRad = (decDeg * Math.PI) / 180;
    const tanDec = Math.tan(decRad);

    const acPoints: [number, number][] = [];
    const dcPoints: [number, number][] = [];

    // Calculate within reachable latitudes
    for (let lat = -75; lat <= 75; lat += 1) {
      const latRad = (lat * Math.PI) / 180;
      const tanLat = Math.tan(latRad);
      const cosH = -tanLat * tanDec;

      if (Math.abs(cosH) <= 1.0) {
        const Hdeg = Math.acos(cosH) * (180 / Math.PI);

        // Ascendant: Rising on eastern horizon (H < 0)
        let acLng = raDeg - gmst - Hdeg;
        acLng = ((acLng + 180) % 360 + 360) % 360 - 180;
        acPoints.push([acLng, lat]);

        // Descendant: Setting on western horizon (H > 0)
        let dcLng = raDeg - gmst + Hdeg;
        dcLng = ((dcLng + 180) % 360 + 360) % 360 - 180;
        dcPoints.push([dcLng, lat]);
      }
    }

    // Sort rising/setting curves smoothly by latitude
    acPoints.sort((a, b) => a[1] - b[1]);
    dcPoints.sort((a, b) => a[1] - b[1]);

    lines.push({
      id: `${nodeName}-AC`,
      node: nodeName,
      type: 'AC',
      name: `${nodeName === 'north' ? 'North Node' : 'South Node'} Ascendant (AC)`,
      description:
        nodeName === 'north'
          ? 'Karmic Rebirth & Vital Persona: Powerful personal transformation, awakening new leadership, physical magnetism, and direct alignment with destiny.'
          : 'Comfort-Zone Identity: Relying on old habits, past-life persona defaults, and resisting radical self-reinvention.',
      color: '#f6ad55',
      points: acPoints,
    });

    lines.push({
      id: `${nodeName}-DC`,
      node: nodeName,
      type: 'DC',
      name: `${nodeName === 'north' ? 'North Node' : 'South Node'} Descendant (DC)`,
      description:
        nodeName === 'north'
          ? 'Destined Soul Partnerships: Meeting key karmic teachers, life-altering romantic contracts, and collaborative evolutionary unions.'
          : 'Past-Life Relationship Contracts: Entangled karmic relationships, recurring co-dependencies, or debts needing forgiveness.',
      color: '#b794f4',
      points: dcPoints,
    });
  };

  createLinesForNode('north', northNode.rightAscension, northNode.declination, '#34d399', '#6ee7b7');
  createLinesForNode('south', southNode.rightAscension, southNode.declination, '#d4a373', '#e79c72');

  return lines;
}

/**
 * Calculates shortest spherical distance from point to an Astrocartography line (in km)
 */
export function calculateDistanceToLine(
  lat: number,
  lng: number,
  line: AstrocartographyLine
): { minDistanceKm: number; closestPoint: [number, number] } {
  let minDistance = Infinity;
  let closest: [number, number] = [0, 0];

  const R = 6371; // Earth radius in km
  const lat1 = (lat * Math.PI) / 180;
  const lon1 = (lng * Math.PI) / 180;

  for (const pt of line.points) {
    const lon2 = (pt[0] * Math.PI) / 180;
    const lat2 = (pt[1] * Math.PI) / 180;

    const dLat = lat2 - lat1;
    let dLon = lon2 - lon1;
    // Account for wrap-around longitude
    if (dLon > Math.PI) dLon -= 2 * Math.PI;
    if (dLon < -Math.PI) dLon += 2 * Math.PI;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    if (d < minDistance) {
      minDistance = d;
      closest = pt;
    }
  }

  return { minDistanceKm: Math.round(minDistance), closestPoint: closest };
}

/**
 * Karmic axis deep interpretation
 */
export function getKarmicAxisInterpretation(northSign: ZodiacSignName): KarmicShiftInterpretation {
  const southSign = ZODIAC_SIGNS.find((z) => z.name === northSign)?.oppositeSign || 'Virgo';

  const interpretations: Record<ZodiacSignName, KarmicShiftInterpretation> = {
    Pisces: {
      axisTitle: 'Pisces North Node (☊) / Virgo South Node (☋)',
      northNodeDharma: [
        'Surrender into divine trust, mystical faith, and emotional intuition',
        'Embrace visionary creativity, forgiveness, and universal compassion',
        'Release over-intellectualizing in favor of soul-led flow states',
      ],
      southNodeKarmaToRelease: [
        'Anxious micromanagement, perfectionistic paralysis, and hypochondria',
        'Over-reliance on rigid systems, hyper-criticism of self and others',
        'Believing you must carry the weight of fixing every flawed detail',
      ],
      lifePathMission:
        'Shift from obsessive micro-control and anxiety to spiritual surrender, artistic transcendence, and boundaryless empathy.',
      shadowPitfalls: ['Escapism into illusion versus grounded mystical practice', 'Spiritual bypassing'],
      collectiveFocus:
        'The collective is learning that ultimate healing arises from unconditional love, spiritual connection, and letting go of mechanistic rigidity.',
    },
    Aries: {
      axisTitle: 'Aries North Node (☊) / Libra South Node (☋)',
      northNodeDharma: [
        'Cultivate fierce self-sovereignty, courage, and decisive pioneering leadership',
        'Trust personal gut instincts without waiting for consensus or external approval',
        'Channel healthy boundary defense and raw authentic expression',
      ],
      southNodeKarmaToRelease: [
        'Codependent peacekeeping, excessive people-pleasing, and fear of conflict',
        'Outsourcing identity to partners or waiting endlessly for others to validate you',
        'Passive-aggressive indecisiveness cloaked as diplomacy',
      ],
      lifePathMission:
        'Reclaim your autonomous fire and boldly pioneer your authentic path without apologizing for taking up space.',
      shadowPitfalls: ['Reckless aggression or disregard for essential allies', 'Burnout from solitary combat'],
      collectiveFocus:
        'A global awakening of authentic individuality and self-determination over hollow treaties and superficial harmony.',
    },
    Taurus: {
      axisTitle: 'Taurus North Node (☊) / Scorpio South Node (☋)',
      northNodeDharma: [
        'Ground into self-worth, organic simplicity, sensual peace, and embodied wealth',
        'Build patient, enduring values rooted in stability, nature, and peaceful contentment',
        'Cultivate emotional tranquility and physical nourishment',
      ],
      southNodeKarmaToRelease: [
        'Addiction to emotional crisis, psychological power struggles, and catastrophic paranoia',
        'Obsession with controlling shared resources or obsessing over betrayals',
        'Trauma-bonding and testing loved ones through manufactured drama',
      ],
      lifePathMission:
        'Transform intense psychological turmoil into grounded somatic peace, sustainable creation, and unshakeable inner security.',
      shadowPitfalls: ['Stubborn complacency and material greed', 'Resistance to necessary evolutionary endings'],
      collectiveFocus:
        'A return to Earth regeneration, regenerative finance, tangible values, and physical wellness.',
    },
    Gemini: {
      axisTitle: 'Gemini North Node (☊) / Sagittarius South Node (☋)',
      northNodeDharma: [
        'Embrace curiosity, local community, active listening, and multifaceted questions',
        'Learn to see multiple viewpoints without dogmatic fundamentalism',
        'Communicate with nuance, adaptability, and childlike wonder',
      ],
      southNodeKarmaToRelease: [
        'Righteous dogma, philosophical arrogance, and intellectual superiority',
        'Preaching theoretical universal truths while failing practical daily communication',
        'Restless avoidance of immediate responsibilities in search of far-flung escapes',
      ],
      lifePathMission:
        'Evolve from an ivory-tower zealot into an open-minded student of life who listens deeply to diverse human perspectives.',
      shadowPitfalls: ['Superficial gossip and indecisive mental scattering', 'Information addiction without depth'],
      collectiveFocus:
        'Decentralized grassroots dialogue, local connection, and dismantlement of rigid ideological orthodoxy.',
    },
    Cancer: {
      axisTitle: 'Cancer North Node (☊) / Capricorn South Node (☋)',
      northNodeDharma: [
        'Honor emotional vulnerability, maternal nurturing, and heartfelt belonging',
        'Build a sanctuary for emotional intimacy, inner child healing, and community care',
        'Value feelings and subjective well-being as equal to material achievement',
      ],
      southNodeKarmaToRelease: [
        'Cold workaholism, emotional suppression, and measuring worth strictly through worldly status',
        'Rigid emotional walls and fear of being seen as weak or needing support',
        'Sacrificing family and inner peace on the altar of corporate prestige',
      ],
      lifePathMission:
        'Shift from cold institutional endurance to soulful emotional nourishment, welcoming vulnerability as true strength.',
      shadowPitfalls: ['Emotional moodiness, clutching defensiveness, and regression into helplessness'],
      collectiveFocus:
        'Humanizing societies, prioritizing mental health, ancestral repair, and restoring domestic equilibrium.',
    },
    Leo: {
      axisTitle: 'Leo North Node (☊) / Aquarius South Node (☋)',
      northNodeDharma: [
        'Radiate authentic joyful self-expression, creative drama, and warm-hearted courage',
        'Step onto center stage and own your divine sparkle without false modesty',
        'Lead from the heart with generosity, romance, and artistic passion',
      ],
      southNodeKarmaToRelease: [
        'Hiding in impersonal crowds or intellectual detachment to avoid standing out',
        'Cool, aloof cynicism and fear of subjective vulnerability',
        'Prioritizing theoretical collective ideals while neglecting individual human warmth',
      ],
      lifePathMission:
        'Ignite your unique creative sovereignty, inspiring the world not through detachment, but through radiant heartfelt presence.',
      shadowPitfalls: ['Ego-driven narcissism, arrogance, and demand for constant applause'],
      collectiveFocus:
        'Reclaiming heart-centered artistry, romantic reverence, and honoring visionary individual leaders.',
    },
    Virgo: {
      axisTitle: 'Virgo North Node (☊) / Pisces South Node (☋)',
      northNodeDharma: [
        'Anchor daily sacred craft, practical discernment, and functional health routines',
        'Ground spiritual ideals into useful, meticulous service and real-world results',
        'Establish healthy emotional and physical boundaries',
      ],
      southNodeKarmaToRelease: [
        'Martyr complex, victimhood narratives, and nebulous boundary confusion',
        'Dissolving into foggy escapism, substance dependence, or saviour illusions',
        'Passive avoidance of necessary physical organization and accountability',
      ],
      lifePathMission:
        'Translate high-dimensional spiritual visions into tangible, disciplined, healing service on the physical plane.',
      shadowPitfalls: ['Hypercritical nitpicking, hypochondria, and sterile perfectionism'],
      collectiveFocus:
        'Practical ecological stewardship, scientific precision in wellness, and functional integrity.',
    },
    Libra: {
      axisTitle: 'Libra North Node (☊) / Aries South Node (☋)',
      northNodeDharma: [
        'Master conscious collaboration, empathetic listening, and mutual negotiation',
        'Build harmonious partnerships where both parties blossom in beauty and peace',
        'Learn the high art of tactful diplomacy and aesthetic grace',
      ],
      southNodeKarmaToRelease: [
        'Impulsive aggression, me-first selfishness, and reactive defensiveness',
        'Burning bridges in stubborn refusal to consider others’ perspectives',
        'Dominating conversations and treating life as a solitary zero-sum war',
      ],
      lifePathMission:
        'Softening individual combativeness into refined, compassionate collaboration, creating harmonious union.',
      shadowPitfalls: ['Losing oneself in codependency or fear of taking a clear stance'],
      collectiveFocus:
        'Restoring international diplomacy, reciprocal contracts, and equitable justice.',
    },
    Scorpio: {
      axisTitle: 'Scorpio North Node (☊) / Taurus South Node (☋)',
      northNodeDharma: [
        'Embrace deep psychological regeneration, courageous intimacy, and sacred alchemy',
        'Dare to release comfortable stagnation to undergo profound emotional rebirth',
        'Master the depths of metaphysical power and shared energetic vulnerability',
      ],
      southNodeKarmaToRelease: [
        'Clinging to stubborn material comfort zones and hoarding possessions',
        'Fear of emotional truth, pretending everything is fine while rot festers underneath',
        'Sensory inertia and spiritual laziness disguised as stability',
      ],
      lifePathMission:
        'Willingly shed old skins in the crucible of truth to unlock unbreakable spiritual power and intimate communion.',
      shadowPitfalls: ['Paranoid obsession, manipulation, and self-destructive scorched-earth retaliation'],
      collectiveFocus:
        'Systemic purgation of corruption, honest financial restructuring, and radical shadow integration.',
    },
    Sagittarius: {
      axisTitle: 'Sagittarius North Node (☊) / Gemini South Node (☋)',
      northNodeDharma: [
        'Synthesize raw data into expansive philosophical wisdom, vision, and meaning',
        'Dare to embark on grand spiritual quests, cross-cultural adventures, and big-picture truth',
        'Cultivate infectious optimism, moral integrity, and boundless faith',
      ],
      southNodeKarmaToRelease: [
        'Trivial gossip, endless analysis paralysis, and drowning in superficial contradictory facts',
        'Non-committal fence-sitting and cynical skepticism of higher meaning',
        'Distracting yourself with busywork to avoid answering your higher calling',
      ],
      lifePathMission:
        'Elevate fragmented curiosity into an integrated, inspiring cosmic philosophy that guides your soul journey.',
      shadowPitfalls: ['Self-righteous zealotry and ignoring practical grounded facts'],
      collectiveFocus:
        'Expanding higher education, global spiritual synthesis, and rediscovering authentic meaning.',
    },
    Capricorn: {
      axisTitle: 'Capricorn North Node (☊) / Cancer South Node (☋)',
      northNodeDharma: [
        'Embody mature self-responsibility, emotional sovereignty, and enduring legacy',
        'Build structured, ethical structures that support the community for generations',
        'Cultivate patient mastery, self-discipline, and earned authority',
      ],
      southNodeKarmaToRelease: [
        'Emotional infantilism, retreat into helpless comfort, and mood-driven paralysis',
        'Expecting the world to coddle you or manipulating others through guilt',
        'Clinging to nostalgic childhood patterns and fear of adult responsibility',
      ],
      lifePathMission:
        'Step out of the emotional nest into majestic, self-accountable stewardship, anchoring a pillar of strength for all.',
      shadowPitfalls: ['Cold emotional detachment and ruthless ambition at the cost of empathy'],
      collectiveFocus:
        'Rebuilding transparent civic institutions, ethical long-term governance, and sustainable elderhood.',
    },
    Aquarius: {
      axisTitle: 'Aquarius North Node (☊) / Leo South Node (☋)',
      northNodeDharma: [
        'Serve the humanitarian collective, visionary innovation, and egalitarian brotherhood',
        'Champion progressive causes that uplift all beings without demanding royal privilege',
        'Channel authentic, non-conformist genius for the evolution of the species',
      ],
      southNodeKarmaToRelease: [
        'Arrogant entitlement, royal drama, and needing to be the center of attention',
        'Measuring worth through vanity, royal favors, and superficial flattery',
        'Throwing tantrums when the spotlight shifts to community collaboration',
      ],
      lifePathMission:
        'Transmute individual royal pride into visionary grassroots emancipation, democratizing light for everyone.',
      shadowPitfalls: ['Cold, dogmatic rebellion and theoretical detachment from actual humans'],
      collectiveFocus:
        'Technological and social renaissance, decentralized community empowerment, and collective equality.',
    },
  };

  return interpretations[northSign];
}

/**
 * Calculates aspect between transit node and natal node
 */
export function calculateNodalAspect(natalLng: number, transitLng: number): TransitAspect {
  let diff = Math.abs(transitLng - natalLng) % 360;
  if (diff > 180) diff = 360 - diff;

  // Check Conjunction (0° - Nodal Return)
  if (diff <= 8) {
    return {
      aspectName: 'Conjunction',
      symbol: '☌',
      orb: Number(diff.toFixed(2)),
      isExact: diff <= 1.5,
      theme: 'Nodal Return (~18.6 Year Milestone): A major karmic reset and acceleration of destiny. Realigning directly with your highest soul mission.',
    };
  }

  // Check Opposition (180° - Nodal Reversal / Half-Return)
  const oppDiff = Math.abs(diff - 180);
  if (oppDiff <= 8) {
    return {
      aspectName: 'Opposition',
      symbol: '☍',
      orb: Number(oppDiff.toFixed(2)),
      isExact: oppDiff <= 1.5,
      theme: 'Nodal Reversal (~9.3 Year Half-Cycle): Karmic pivot point. Past achievements are audited; you are challenged to integrate what you have mastered with your emerging destiny.',
    };
  }

  // Check Square (90° - Karmic Crossroads / At The Bending)
  const sqDiff = Math.abs(diff - 90);
  if (sqDiff <= 6) {
    return {
      aspectName: 'Square',
      symbol: '□',
      orb: Number(sqDiff.toFixed(2)),
      isExact: sqDiff <= 1.5,
      theme: 'Nodes at the Bending (90° Square): A fateful crossroads demanding active course-correction and breaking old comfort-zone patterns.',
    };
  }

  // Check Trine (120°)
  const trDiff = Math.abs(diff - 120);
  if (trDiff <= 6) {
    return {
      aspectName: 'Trine',
      symbol: '△',
      orb: Number(trDiff.toFixed(2)),
      isExact: trDiff <= 1.5,
      theme: 'Harmonic Karmic Flow (120° Trine): Effortless spiritual insights, serendipitous synchronicities, and ancestral blessings supporting your growth.',
    };
  }

  // Check Sextile (60°)
  const sxDiff = Math.abs(diff - 60);
  if (sxDiff <= 4) {
    return {
      aspectName: 'Sextile',
      symbol: '⚹',
      orb: Number(sxDiff.toFixed(2)),
      isExact: sxDiff <= 1.5,
      theme: 'Karmic Opportunity Gateway (60° Sextile): Productive doors open through study, mentors, and collaborative outreach.',
    };
  }

  return {
    aspectName: 'None',
    symbol: '—',
    orb: Number(diff.toFixed(2)),
    isExact: false,
    theme: `Degrees Separation: ${diff.toFixed(1)}°. Navigating steady karmic maturation and steady progress along the soul path.`,
  };
}

/**
 * Historical and future Nodal transit ingress milestones
 */
export interface IngressMilestone {
  axis: string;
  startDate: string;
  endDate: string;
  theme: string;
}

export const NODAL_INGRESS_PERIODS: IngressMilestone[] = [
  { axis: 'Pisces ☊ / Virgo ☋', startDate: '2025-01-12', endDate: '2026-07-27', theme: 'Spiritual faith over mechanistic anxiety; divine surrender meets somatic healing' },
  { axis: 'Aries ☊ / Libra ☋', startDate: '2023-07-17', endDate: '2025-01-11', theme: 'Sovereign courage & authentic leadership over codependent peacekeeping' },
  { axis: 'Taurus ☊ / Scorpio ☋', startDate: '2022-01-18', endDate: '2023-07-16', theme: 'Material self-worth & bodily grounding over traumatic power struggles' },
  { axis: 'Gemini ☊ / Sagittarius ☋', startDate: '2020-05-05', endDate: '2022-01-17', theme: 'Local community & open curiosity over dogmatic ideological righteousness' },
  { axis: 'Cancer ☊ / Capricorn ☋', startDate: '2018-11-06', endDate: '2020-05-04', theme: 'Emotional vulnerability & home sanctuary over cold institutional status' },
  { axis: 'Leo ☊ / Aquarius ☋', startDate: '2017-05-09', endDate: '2018-11-05', theme: 'Heartfelt creative sovereignty over detached social conformity' },
  { axis: 'Aquarius ☊ / Leo ☋', startDate: '2026-07-28', endDate: '2028-02-14', theme: 'Collective humanitarian liberation & decentralized renaissance' },
  { axis: 'Capricorn ☊ / Cancer ☋', startDate: '2028-02-15', endDate: '2029-09-02', theme: 'Mature self-accountability & ethical elderhood over nostalgic retreat' },
];

/**
 * Calculates Natal Chart core points (North Node, South Node, Sun, Moon, Ascendant, Midheaven)
 */
export function calculateNatalPoints(profile: NatalProfile): NatalPoint[] {
  const [y, m, d] = profile.birthDate.split('-').map(Number);
  const [hh, mm] = profile.birthTime.split(':').map(Number);
  const birthDate = new Date(Date.UTC(y, m - 1, d, hh, mm));

  const jd = dateToJulianDate(birthDate);
  const T = (jd - 2451545.0) / 36525.0;
  const deg2rad = Math.PI / 180;
  const rad2deg = 180 / Math.PI;

  const toSignInfo = (lng: number) => {
    const norm = ((lng % 360) + 360) % 360;
    const signIdx = Math.floor(norm / 30);
    const sign = ZODIAC_SIGNS[signIdx].name;
    const degInSign = norm % 30;
    const signDegree = Math.floor(degInSign);
    const signMinute = Math.floor((degInSign - signDegree) * 60);
    return { norm, sign, signDegree, signMinute };
  };

  // 1. Lunar Nodes
  const { northNode, southNode } = calculateLunarNodes(birthDate);
  const nnInfo = toSignInfo(northNode.longitude);
  const snInfo = toSignInfo(southNode.longitude);

  // 2. Solar Longitude (Jean Meeus algorithm)
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M_sun = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) * deg2rad;
  const C_sun = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M_sun) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M_sun) +
    0.000289 * Math.sin(3 * M_sun);
  const sunLng = (L0 + C_sun) % 360;
  const sunInfo = toSignInfo(sunLng);

  // 3. Lunar Longitude (Low-order Meeus approximation ~1° accuracy)
  const L_moon = 218.316 + 481267.8813 * T;
  const M_moon = (134.963 + 477198.8676 * T) * deg2rad;
  const F_moon = (93.272 + 483202.0175 * T) * deg2rad;
  const moonLng = L_moon + 6.289 * Math.sin(M_moon) - 1.274 * Math.sin(2 * (L_moon * deg2rad) - M_moon) + 0.658 * Math.sin(2 * F_moon);
  const moonInfo = toSignInfo(moonLng);

  // 4. Ascendant & Midheaven
  const gmst = getGMST(jd);
  let ramc = (gmst + profile.birthLng) % 360; // Local Sidereal Time in degrees
  if (ramc < 0) ramc += 360;
  const eps = getMeanObliquity(T) * deg2rad;

  // Midheaven (MC)
  const mcRad = Math.atan2(Math.sin(ramc * deg2rad), Math.cos(ramc * deg2rad) * Math.cos(eps));
  let mcLng = mcRad * rad2deg;
  if (mcLng < 0) mcLng += 360;
  const mcInfo = toSignInfo(mcLng);

  // Ascendant (AC)
  const latRad = profile.birthLat * deg2rad;
  const ramcRad = ramc * deg2rad;
  const yAsc = -Math.cos(ramcRad);
  const xAsc = Math.sin(ramcRad) * Math.cos(eps) + Math.tan(latRad) * Math.sin(eps);
  let ascLng = Math.atan2(yAsc, xAsc) * rad2deg;
  if (ascLng < 0) ascLng += 360;
  const ascInfo = toSignInfo(ascLng);

  return [
    { id: 'nn', name: 'Natal North Node', symbol: '☊', longitude: nnInfo.norm, sign: nnInfo.sign, signDegree: nnInfo.signDegree, signMinute: nnInfo.signMinute },
    { id: 'sn', name: 'Natal South Node', symbol: '☋', longitude: snInfo.norm, sign: snInfo.sign, signDegree: snInfo.signDegree, signMinute: snInfo.signMinute },
    { id: 'sun', name: 'Natal Sun', symbol: '☉', longitude: sunInfo.norm, sign: sunInfo.sign, signDegree: sunInfo.signDegree, signMinute: sunInfo.signMinute },
    { id: 'moon', name: 'Natal Moon', symbol: '☽', longitude: moonInfo.norm, sign: moonInfo.sign, signDegree: moonInfo.signDegree, signMinute: moonInfo.signMinute },
    { id: 'ac', name: 'Natal Ascendant (AC)', symbol: 'Asc', longitude: ascInfo.norm, sign: ascInfo.sign, signDegree: ascInfo.signDegree, signMinute: ascInfo.signMinute },
    { id: 'mc', name: 'Natal Midheaven (MC)', symbol: 'MC', longitude: mcInfo.norm, sign: mcInfo.sign, signDegree: mcInfo.signDegree, signMinute: mcInfo.signMinute },
  ];
}

/**
 * Detects exact transit aspects (orb <= maxOrb, default 0.5 degrees)
 */
export function detectExactTransitAlerts(
  transitNorthLng: number,
  transitSouthLng: number,
  natalPoints: NatalPoint[],
  maxOrb = 0.5
): TransitAlert[] {
  const alerts: TransitAlert[] = [];


  const aspectTargets: { name: 'Conjunction' | 'Opposition' | 'Square' | 'Trine' | 'Sextile'; angle: number; symbol: string }[] = [
    { name: 'Conjunction', angle: 0, symbol: '☌' },
    { name: 'Opposition', angle: 180, symbol: '☍' },
    { name: 'Square', angle: 90, symbol: '□' },
    { name: 'Trine', angle: 120, symbol: '△' },
    { name: 'Sextile', angle: 60, symbol: '⚹' },
  ];

  const transitNodes = [
    { name: 'Transit North Node (☊)', lng: transitNorthLng },
    { name: 'Transit South Node (☋)', lng: transitSouthLng },
  ];

  for (const tNode of transitNodes) {
    for (const nPoint of natalPoints) {
      let sep = Math.abs(tNode.lng - nPoint.longitude) % 360;
      if (sep > 180) sep = 360 - sep;

      for (const asp of aspectTargets) {
        const diff = Math.abs(sep - asp.angle);
        if (diff <= maxOrb) {
          const orbRounded = Number(diff.toFixed(2));
          const alertId = `${tNode.name}-${nPoint.id}-${asp.name}`;

          let message = `${tNode.name} forms an exact ${asp.name} (${asp.symbol}) with your ${nPoint.name} (${nPoint.symbol}) within ${orbRounded}°.`;
          if (nPoint.id === 'nn' && asp.name === 'Conjunction') {
            message = `Exact Nodal Return! Destiny reset and major karmic acceleration within ${orbRounded}°.`;
          } else if (nPoint.id === 'nn' && asp.name === 'Opposition') {
            message = `Exact Nodal Reversal! Karmic crossroads and mastery audit within ${orbRounded}°.`;
          } else if (nPoint.id === 'sun' && asp.name === 'Conjunction') {
            message = `Solar Destiny Conjunction! Profound illumination of your authentic soul purpose within ${orbRounded}°.`;
          } else if (nPoint.id === 'moon' && asp.name === 'Conjunction') {
            message = `Lunar Karmic Alignment! Deep emotional and instinctual karmic awakening within ${orbRounded}°.`;
          } else if (nPoint.id === 'ac' && asp.name === 'Conjunction') {
            message = `Ascendant Karmic Activation! New physical vitality, personal reinvention, and fateful beginnings within ${orbRounded}°.`;
          } else if (nPoint.id === 'mc' && asp.name === 'Conjunction') {
            message = `Midheaven Culmination! Highest public recognition, career milestone, and legacy activation within ${orbRounded}°.`;
          }

          alerts.push({
            id: alertId,
            transitPointName: tNode.name,
            natalPointName: `${nPoint.name} (${nPoint.symbol})`,
            aspectName: asp.name,
            symbol: asp.symbol,
            orb: orbRounded,
            message,
            triggeredAt: new Date().toISOString(),
            isRead: false,
          });
        }
      }
    }
  }

  return alerts;
}

