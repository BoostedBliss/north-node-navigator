import React, { useState } from 'react';
import { NatalProfile } from '../types/astronomy';
import { X, Sparkles, User, MapPin, Calendar, Clock } from 'lucide-react';

interface NatalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: NatalProfile) => void;
  currentProfile: NatalProfile | null;
}

const PRESET_CITIES = [
  { name: 'New York, USA', lat: 40.7128, lng: -74.006 },
  { name: 'London, UK', lat: 51.5074, lng: -0.1278 },
  { name: 'Los Angeles, USA', lat: 34.0522, lng: -118.2437 },
  { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503 },
  { name: 'Paris, France', lat: 48.8566, lng: 2.3522 },
  { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093 },
  { name: 'Toronto, Canada', lat: 43.6532, lng: -79.3832 },
  { name: 'Berlin, Germany', lat: 52.52, lng: 13.405 },
  { name: 'Mumbai, India', lat: 19.076, lng: 72.8777 },
];

export const NatalModal: React.FC<NatalModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentProfile,
}) => {
  const [name, setName] = useState(currentProfile?.name || 'Seeker');
  const [birthDate, setBirthDate] = useState(currentProfile?.birthDate || '1995-04-15');
  const [birthTime, setBirthTime] = useState(currentProfile?.birthTime || '12:00');
  const [selectedCity, setSelectedCity] = useState(
    currentProfile ? `${currentProfile.birthCity}` : PRESET_CITIES[0].name
  );
  const [lat, setLat] = useState(currentProfile?.birthLat || PRESET_CITIES[0].lat);
  const [lng, setLng] = useState(currentProfile?.birthLng || PRESET_CITIES[0].lng);

  if (!isOpen) return null;

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    const found = PRESET_CITIES.find((c) => c.name === cityName);
    if (found) {
      setLat(found.lat);
      setLng(found.lng);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim() || 'Seeker',
      birthDate,
      birthTime,
      birthCity: selectedCity,
      birthLat: Number(lat),
      birthLng: Number(lng),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#0e141f] border border-stone-800 shadow-2xl text-stone-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-white tracking-wide font-mono uppercase">
            Natal Nodal Chart Setup
          </h2>
        </div>
        <p className="text-xs text-stone-400 mb-5">
          Enter your birth coordinates to compare transit nodes to your natal soul axis and calculate Nodal Returns.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-stone-400" />
              <span>Full Name or Alias</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Elena"
              className="w-full px-3 py-2 rounded-xl bg-[#131924] border border-stone-800 text-sm focus:border-emerald-400 focus:outline-none text-stone-100"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>Birth Date</span>
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#131924] border border-stone-800 text-xs font-mono focus:border-emerald-400 focus:outline-none text-stone-100"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>Birth Time (Local)</span>
              </label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#131924] border border-stone-800 text-xs font-mono focus:border-emerald-400 focus:outline-none text-stone-100"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>Birth City / Region</span>
            </label>
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#131924] border border-stone-800 text-xs focus:border-emerald-400 focus:outline-none text-stone-200"
            >
              {PRESET_CITIES.map((c) => (
                <option key={c.name} value={c.name} className="bg-[#131924] text-stone-200">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-stone-400 mb-1">Latitude</label>
              <input
                type="number"
                step="0.0001"
                value={lat}
                onChange={(e) => setLat(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 rounded-lg bg-[#131924] border border-stone-800 text-xs font-mono text-stone-300"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-stone-400 mb-1">Longitude</label>
              <input
                type="number"
                step="0.0001"
                value={lng}
                onChange={(e) => setLng(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 rounded-lg bg-[#131924] border border-stone-800 text-xs font-mono text-stone-300"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-stone-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-stone-950 font-bold text-xs shadow-lg transition cursor-pointer"
            >
              Calculate Karmic Chart
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};
