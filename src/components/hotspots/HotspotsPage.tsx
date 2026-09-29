import React, { useState } from 'react';
import {
  Flame,
  Filter,
  MapPin,
  TrendingDown,
  DollarSign,
  Users,
  AlertTriangle,
  Quote,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BRICS_COUNTRIES } from '../../data/bricsData';
import { getCategoryById } from '../../data/categories';
import { DemandHotspot, InfrastructureCategoryId } from '../../types';

export const HotspotsPage: React.FC = () => {
  const { hotspots, activeCountry, setActiveCountry, setActiveTab, openExplainModal, recommendations } = useApp();
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [selectedHotspot, setSelectedHotspot] = useState<DemandHotspot>(hotspots[0]);

  const currentCountry = BRICS_COUNTRIES[activeCountry];
  const countryHotspots = hotspots.filter((h) => h.country === activeCountry);

  const filtered = countryHotspots.filter((h) => {
    if (filterLevel !== 'ALL' && h.demandLevel !== filterLevel.toLowerCase()) return false;
    return true;
  });

  const getDemandColor = (level: DemandHotspot['demandLevel']) => {
    switch (level) {
      case 'critical':
        return { badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40', dot: 'bg-rose-500', text: 'Critical Demand (Urgency > 85%)' };
      case 'high':
        return { badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40', dot: 'bg-amber-500', text: 'High Demand' };
      case 'moderate':
        return { badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40', dot: 'bg-yellow-400', text: 'Moderate Demand' };
      case 'low':
        return { badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', dot: 'bg-emerald-500', text: 'Low Demand / Serviced' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
              <Flame className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Infrastructure Demand Hotspots — {currentCountry.name}
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Spatial clustering of unaddressed citizen development requests with GIS and demographic vulnerability overlay.
          </p>
        </div>

        {/* Demand Concentration Legend (Section 10 requirements) */}
        <div className="flex flex-wrap items-center gap-2 p-2 bg-navy-950 rounded-xl border border-slate-800 text-[11px]">
          <span className="text-slate-400 font-semibold px-1">Demand Concentration:</span>
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>Critical</span>
          </span>
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>High</span>
          </span>
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            <span>Moderate</span>
          </span>
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Low</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Hotspot List & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Hotspots Cards Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
            <span>Showing {filtered.length} active demand hotspots</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFilterLevel('ALL')}
                className={`px-2 py-1 rounded ${filterLevel === 'ALL' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilterLevel('CRITICAL')}
                className={`px-2 py-1 rounded ${filterLevel === 'CRITICAL' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400'}`}
              >
                Critical
              </button>
              <button
                onClick={() => setFilterLevel('HIGH')}
                className={`px-2 py-1 rounded ${filterLevel === 'HIGH' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
              >
                High
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((hotspot) => {
              const cat = getCategoryById(hotspot.primaryCategoryId);
              const demandStyle = getDemandColor(hotspot.demandLevel);
              const isSelected = selectedHotspot?.id === hotspot.id;

              return (
                <div
                  key={hotspot.id}
                  onClick={() => setSelectedHotspot(hotspot)}
                  className={`cursor-pointer rounded-2xl p-5 transition-all border ${
                    isSelected
                      ? 'bg-navy-900 border-cyan-400 shadow-xl shadow-cyan-950 ring-1 ring-cyan-400'
                      : 'glass-card border-slate-800 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800/80 gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-bold text-white">
                          {hotspot.locationName}
                        </h3>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${demandStyle.badge}`}>
                          {hotspot.demandLevel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 flex items-center space-x-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{hotspot.region}, {currentCountry.name}</span>
                        <span>•</span>
                        <span style={{ color: cat.color }} className="font-semibold">{cat.name}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-mono font-black text-cyan-400">
                        {hotspot.requestCount.toLocaleString()} requests
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Pop. Affected: {hotspot.populationAffected.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Citizen Voice Quote */}
                  <div className="mt-3 text-xs text-slate-300 italic flex items-start space-x-2 bg-navy-950/60 p-3 rounded-xl border border-slate-800/60">
                    <Quote className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>“{hotspot.recentCitizenQuote}”</span>
                  </div>

                  {/* 4 Key Indicators from Section 10 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Existing Infra Score</span>
                      <span className="text-amber-400 font-mono font-bold">{hotspot.existingInfraScore} / 100</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">Avg Urgency Index</span>
                      <span className="text-rose-400 font-mono font-bold">{hotspot.averageUrgency}%</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">Current Investment</span>
                      <span className="text-slate-200 font-mono font-semibold">
                        {currentCountry.currencySymbol}{hotspot.currentInvestmentMillions}M
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">Estimated Gap</span>
                      <span className="text-rose-400 font-mono font-bold">
                        {currentCountry.currencySymbol}{hotspot.estimatedGapMillions}M
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Hotspot Intelligence Inspector */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 glass-panel rounded-2xl p-6 border border-cyan-500/30 space-y-6 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Hotspot Intelligence Dossier</span>
                </span>
                <span className="font-mono text-xs text-slate-400">{selectedHotspot.id}</span>
              </div>

              <h2 className="text-xl font-black text-white mt-3 mb-1">
                {selectedHotspot.locationName}
              </h2>
              <p className="text-xs text-slate-300">
                {selectedHotspot.region}, {currentCountry.name} • Coordinates: [{selectedHotspot.coordinates[0]}, {selectedHotspot.coordinates[1]}]
              </p>
            </div>

            {/* Deficiency Progress Gauges */}
            <div className="space-y-3 bg-navy-950/80 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400">Citizen Demand Volume:</span>
                  <span className="text-cyan-400 font-mono font-bold">
                    {selectedHotspot.requestCount.toLocaleString()} requests
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400">Demographic Vulnerability Index:</span>
                  <span className="text-rose-400 font-mono font-bold">
                    {selectedHotspot.vulnerabilityIndex} / 100
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: `${selectedHotspot.vulnerabilityIndex}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400">Existing Infrastructure Health:</span>
                  <span className="text-amber-400 font-mono font-bold">
                    {selectedHotspot.existingInfraScore} / 100 (Severe Deficit)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: `${selectedHotspot.existingInfraScore}%` }}></div>
                </div>
              </div>
            </div>

            {/* Financial Overview */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Sanctioned Outlay</span>
                <span className="text-sm font-mono font-bold text-slate-200 mt-0.5 block">
                  {currentCountry.currencySymbol}{selectedHotspot.currentInvestmentMillions}M
                </span>
              </div>

              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30">
                <span className="text-[10px] text-rose-300 block">Unfunded Capital Gap</span>
                <span className="text-sm font-mono font-bold text-rose-400 mt-0.5 block">
                  {currentCountry.currencySymbol}{selectedHotspot.estimatedGapMillions}M
                </span>
              </div>
            </div>

            {/* AI Policy Recommendation Link */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-blue-950/40 border border-purple-500/30 text-xs space-y-2">
              <div className="flex items-center space-x-1.5 text-purple-300 font-bold">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI Recommended Action</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Hotspot matches priority criteria for Viability Gap Funding under National Infrastructure Pipeline.
              </p>
              <button
                onClick={() => {
                  const rec = recommendations[0];
                  openExplainModal(rec);
                }}
                className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>Examine Supporting AI Evidence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
