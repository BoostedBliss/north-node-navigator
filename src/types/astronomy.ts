export type ZodiacSignName =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

export interface ZodiacSignInfo {
  name: ZodiacSignName;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  modality: 'Cardinal' | 'Fixed' | 'Mutable';
  ruler: string;
  startDegree: number;
  color: string;
  oppositeSign: ZodiacSignName;
}

export interface NodePosition {
  longitude: number; // 0 - 360
  sign: ZodiacSignName;
  signDegree: number;
  signMinute: number;
  signSecond: number;
  rightAscension: number; // in degrees (0 - 360)
  declination: number; // in degrees (-90 to +90)
  isRetrograde: boolean;
  speedDegPerDay: number;
}

export interface AstrocartographyLine {
  id: string;
  node: 'north' | 'south';
  type: 'MC' | 'IC' | 'AC' | 'DC';
  name: string;
  description: string;
  color: string;
  points: [number, number][]; // [longitude, latitude]
}

export interface PowerLocation {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  category: 'Spiritual Vortex' | 'Metropolis' | 'Sacred Site' | 'Ancient Temple';
  resonanceNote: string;
}

export interface NatalProfile {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  birthCity: string;
  birthLat: number;
  birthLng: number;
}

export interface KarmicShiftInterpretation {
  axisTitle: string;
  northNodeDharma: string[];
  southNodeKarmaToRelease: string[];
  lifePathMission: string;
  shadowPitfalls: string[];
  collectiveFocus: string;
}

export interface TransitAspect {
  aspectName: 'Conjunction' | 'Opposition' | 'Square' | 'Trine' | 'Sextile' | 'None';
  symbol: string;
  orb: number;
  isExact: boolean;
  theme: string;
}

export interface NatalPoint {
  id: string;
  name: string;
  symbol: string;
  longitude: number;
  sign: ZodiacSignName;
  signDegree: number;
  signMinute: number;
}

export interface TransitAlert {
  id: string;
  transitPointName: string; // e.g. "Transit North Node (☊)"
  natalPointName: string;   // e.g. "Natal Sun (☉)"
  aspectName: 'Conjunction' | 'Opposition' | 'Square' | 'Trine' | 'Sextile';
  symbol: string;
  orb: number;             // in degrees <= 0.5°
  message: string;
  triggeredAt: string;
  isRead: boolean;
}

