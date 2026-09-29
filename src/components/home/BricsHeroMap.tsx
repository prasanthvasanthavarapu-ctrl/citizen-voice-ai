import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BRICS_COUNTRIES } from '../../data/bricsData';
import { BricsCountryCode } from '../../types';
import { MapPin, Sparkles, TrendingUp, Users, AlertTriangle } from 'lucide-react';

interface MapCountryNode {
  code: BricsCountryCode;
  name: string;
  flag: string;
  x: number; // SVG percentage 0-100
  y: number; // SVG percentage 0-100
  hotspotsCount: number;
  criticalCategory: string;
  topGap: string;
  pathData: string;
}

export const BricsHeroMap: React.FC = () => {
  const { activeCountry, setActiveCountry, setActiveTab } = useApp();
  const [hoveredCountry, setHoveredCountry] = useState<BricsCountryCode | null>(null);

  // SVG coordinates for BRICS countries on an equirectangular world projection
  const countryNodes: MapCountryNode[] = [
    {
      code: 'BR',
      name: 'Brazil',
      flag: '🇧🇷',
      x: 32,
      y: 65,
      hotspotsCount: 42,
      criticalCategory: 'Sanitation & Clean Water',
      topGap: 'R$ 32M Favelas Drainage Gap',
      pathData: 'M 28 55 Q 35 55 36 68 Q 32 80 28 72 Z',
    },
    {
      code: 'RU',
      name: 'Russia',
      flag: '🇷🇺',
      x: 68,
      y: 25,
      hotspotsCount: 68,
      criticalCategory: 'Heating & Microgrid Resilience',
      topGap: '48M ₽ Arctic Boiler Deficit',
      pathData: 'M 50 18 L 88 18 L 86 35 L 55 32 Z',
    },
    {
      code: 'IN',
      name: 'India',
      flag: '🇮🇳',
      x: 67,
      y: 52,
      hotspotsCount: 142,
      criticalCategory: 'Drinking Water & Rural Broadband',
      topGap: '₹36 Cr Drought Belt Pipeline Gap',
      pathData: 'M 64 45 L 70 45 L 68 60 L 64 54 Z',
    },
    {
      code: 'CN',
      name: 'China',
      flag: '🇨🇳',
      x: 77,
      y: 44,
      hotspotsCount: 96,
      criticalCategory: 'Mountain Highway & Ag Logistics',
      topGap: '34M ¥ Karst Paved Corridor Gap',
      pathData: 'M 72 38 L 84 38 L 82 52 L 72 50 Z',
    },
    {
      code: 'ZA',
      name: 'South Africa',
      flag: '🇿🇦',
      x: 54,
      y: 78,
      hotspotsCount: 38,
      criticalCategory: 'Drinking Water & Rural Clinics',
      topGap: '39M R Piped Water Standpipe Deficit',
      pathData: 'M 52 74 L 57 74 L 56 82 L 52 80 Z',
    },
  ];

  const selectedCountry = hoveredCountry || activeCountry;
  const currentData = BRICS_COUNTRIES[selectedCountry];

  return (
    <div className="relative w-full rounded-2xl glass-panel p-6 border border-cyan-500/30 overflow-hidden shadow-2xl">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-cyan-950/20 via-blue-900/10 to-indigo-950/20 pointer-events-none"></div>

      {/* Header bar over map */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
          <h3 className="text-sm font-bold text-white tracking-wide uppercase">
            Interactive BRICS Infrastructure Intelligence Map
          </h3>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-slate-300">
          <span className="text-slate-500">Active Node:</span>
          <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40">
            {currentData.flag} {currentData.name} ({currentData.code})
          </span>
        </div>
      </div>

      {/* Interactive Map Visual Stage */}
      <div className="relative w-full h-[320px] sm:h-[400px] my-4 select-none">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full opacity-60"
        >
          {/* Subtle World Map Grid Lines */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="0.5" />
            </pattern>
            {/* Animated Gradient for Connection Arcs */}
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          <rect width="100" height="100" fill="url(#grid)" />

          {/* Continents Outline Silhouette (Stylized vectors) */}
          {/* Americas */}
          <path
            d="M 20 20 Q 25 25 23 45 Q 26 50 32 60 Q 35 70 28 85 Q 22 75 25 55 Z"
            fill="rgba(30, 41, 59, 0.4)"
            stroke="rgba(100, 116, 139, 0.25)"
            strokeWidth="0.4"
          />
          {/* Eurasia & Africa */}
          <path
            d="M 45 25 Q 60 15 85 20 Q 92 35 85 55 Q 70 50 65 60 Q 55 50 50 35 Z"
            fill="rgba(30, 41, 59, 0.4)"
            stroke="rgba(100, 116, 139, 0.25)"
            strokeWidth="0.4"
          />
          <path
            d="M 48 40 Q 58 45 55 65 Q 56 80 50 82 Q 45 65 48 40 Z"
            fill="rgba(30, 41, 59, 0.4)"
            stroke="rgba(100, 116, 139, 0.25)"
            strokeWidth="0.4"
          />

          {/* Connecting Data Arcs between BRICS countries */}
          {/* India to Brazil */}
          <path
            d="M 67 52 Q 50 35 32 65"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="0.6"
            strokeDasharray="2,2"
            className="animate-pulse"
          />
          {/* India to South Africa */}
          <path
            d="M 67 52 Q 62 68 54 78"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="0.6"
            strokeDasharray="2,2"
          />
          {/* India to China */}
          <path
            d="M 67 52 Q 72 46 77 44"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="0.8"
            strokeDasharray="1,1.5"
          />
          {/* India to Russia */}
          <path
            d="M 67 52 Q 66 38 68 25"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="0.6"
            strokeDasharray="2,2"
          />
          {/* Russia to China */}
          <path
            d="M 68 25 Q 74 32 77 44"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="0.6"
            strokeDasharray="2,2"
          />
          {/* South Africa to Brazil */}
          <path
            d="M 54 78 Q 42 75 32 65"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="0.6"
            strokeDasharray="2,2"
          />
        </svg>

        {/* Pulsing Interactive Geographic Markers for each BRICS Country */}
        {countryNodes.map((node) => {
          const isSelected = selectedCountry === node.code;

          return (
            <div
              key={node.code}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              onMouseEnter={() => setHoveredCountry(node.code)}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => {
                setActiveCountry(node.code);
                setActiveTab('intelligence');
              }}
            >
              {/* Pulsing concentric rings */}
              <div className="relative flex items-center justify-center">
                <span className={`absolute w-10 h-10 rounded-full animate-ping opacity-60 ${
                  isSelected ? 'bg-cyan-400' : 'bg-blue-500'
                }`}></span>
                <span className={`absolute w-6 h-6 rounded-full opacity-40 ${
                  isSelected ? 'bg-cyan-300 animate-pulse' : 'bg-blue-400'
                }`}></span>

                {/* Center marker badge */}
                <div className={`relative px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 transition-transform group-hover:scale-110 shadow-lg ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 ring-2 ring-white shadow-cyan-500/50'
                    : 'bg-navy-900/90 text-white border border-cyan-500/40 hover:border-cyan-400'
                }`}>
                  <span>{node.flag}</span>
                  <span className="hidden sm:inline font-mono">{node.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1"></span>
                </div>
              </div>

              {/* Tooltip on hover */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-30 w-52 p-2.5 rounded-xl bg-navy-900/95 border border-cyan-500/40 shadow-xl text-left pointer-events-none">
                <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                  <span>{node.flag} {node.name}</span>
                  <span className="text-[10px] text-cyan-400">{node.hotspotsCount} Hotspots</span>
                </div>
                <div className="text-[11px] text-slate-300 space-y-0.5">
                  <p><span className="text-slate-400">Demand:</span> {node.criticalCategory}</p>
                  <p><span className="text-rose-400 font-semibold">Priority Gap:</span> {node.topGap}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Country Interactive Snapshot Drawer */}
      <div className="bg-navy-950/90 rounded-xl p-4 border border-cyan-500/20 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-xs">
        <div>
          <span className="text-slate-400 block text-[11px]">Selected Nation</span>
          <span className="text-white font-bold text-sm flex items-center space-x-1 mt-0.5">
            <span>{currentData.flag}</span>
            <span>{currentData.name}</span>
          </span>
        </div>

        <div>
          <span className="text-slate-400 block text-[11px]">Citizen Requests</span>
          <span className="text-cyan-400 font-mono font-bold text-sm mt-0.5 block">
            {(currentData.totalRequests / 1000000).toFixed(2)}M
          </span>
        </div>

        <div>
          <span className="text-slate-400 block text-[11px]">Active Infra Gaps</span>
          <span className="text-rose-400 font-mono font-bold text-sm mt-0.5 block">
            {currentData.activeGaps.toLocaleString()}
          </span>
        </div>

        <div>
          <span className="text-slate-400 block text-[11px]">High-Priority Regions</span>
          <span className="text-amber-400 font-mono font-bold text-sm mt-0.5 block">
            {currentData.highPriorityRegions}
          </span>
        </div>

        <div>
          <span className="text-slate-400 block text-[11px]">AI Recommendations</span>
          <span className="text-purple-400 font-mono font-bold text-sm mt-0.5 block">
            {currentData.recommendedProjects}
          </span>
        </div>

        <div className="flex items-center justify-end col-span-2 sm:col-span-4 md:col-span-1">
          <button
            onClick={() => setActiveTab('intelligence')}
            className="w-full py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all text-center"
          >
            Explore →
          </button>
        </div>
      </div>
    </div>
  );
};
