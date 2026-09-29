import React, { useState } from 'react';
import {
  Sparkles,
  Scale,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Layers,
  FileText,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BRICS_COUNTRIES } from '../../data/bricsData';
import { getCategoryById } from '../../data/categories';
import { calculatePriorityIndex, DEFAULT_WEIGHTS, PriorityWeights } from '../../services/aiEngine';
import { AIRecommendation } from '../../types';

export const PriorityEnginePage: React.FC = () => {
  const { recommendations, activeCountry, openExplainModal, setActiveTab } = useApp();
  const currentCountry = BRICS_COUNTRIES[activeCountry];

  // Customizable weights in UI
  const [weights, setWeights] = useState<PriorityWeights>(DEFAULT_WEIGHTS);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('ALL');

  // Recalculate priority scores for all recommendations
  const scoredRecommendations = recommendations.map((rec) => ({
    ...rec,
    calculatedScore: calculatePriorityIndex(rec.factors, weights),
  })).sort((a, b) => b.calculatedScore - a.calculatedScore);

  const filteredRecs = scoredRecommendations.filter((r) => {
    if (selectedFilterCategory !== 'ALL' && r.categoryId !== selectedFilterCategory) return false;
    return true;
  });

  const featured = scoredRecommendations[0];
  const featuredCat = getCategoryById(featured.categoryId);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              AI Development Priority Engine
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Transparent, multi-factor algorithmic prioritization. Zero black-box decisions. Fully auditable for policymakers.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('policy-simulator')}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors flex items-center space-x-1.5 shadow-lg shadow-purple-600/20"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulate Allocation</span>
          </button>
        </div>
      </div>

      {/* Human in the loop prominent banner */}
      <div className="bg-navy-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Human Governance Protocol:</strong> Every AI recommendation is an advisory evidence package. Policymakers and ministerial review boards retain sole final authority.
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 hidden sm:inline">
          ISO/IEC 42001 AI Trust Aligned
        </span>
      </div>

      {/* Benchmark Spec Card: Rural Drinking Water Network (Section 12 reference case) */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border-2 border-cyan-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase">
                #1 Recommended Project
              </span>
              <span className="text-xs text-slate-400">Section 12 Benchmark Standard</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              {featured.title}
            </h2>
            <p className="text-xs text-slate-300 flex items-center space-x-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{featured.location}</span>
              <span>•</span>
              <span style={{ color: featuredCat.color }} className="font-semibold">{featuredCat.name}</span>
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-navy-950 p-3 rounded-xl border border-slate-800 self-start sm:self-auto">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">AI Priority Index</span>
              <span className="text-3xl font-black font-mono text-cyan-400">{featured.calculatedScore}</span>
              <span className="text-[10px] text-slate-500"> / 100</span>
            </div>
          </div>
        </div>

        {/* Factors Breakdown with exact prompt visualization (Section 12) */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Factor Weighting Breakdown:
            </h4>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Citizen Demand (Weight: {(weights.demand * 100).toFixed(0)}%)</span>
                  <span className="font-mono font-bold text-cyan-400">{featured.factors.citizenDemand}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${featured.factors.citizenDemand}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Infrastructure Gap (Weight: {(weights.gap * 100).toFixed(0)}%)</span>
                  <span className="font-mono font-bold text-rose-400">{featured.factors.infrastructureGap}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-400 h-full rounded-full" style={{ width: `${featured.factors.infrastructureGap}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Population Impact (Weight: {(weights.population * 100).toFixed(0)}%)</span>
                  <span className="font-mono font-bold text-purple-400">{featured.factors.populationImpact}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-400 h-full rounded-full" style={{ width: `${featured.factors.populationImpact}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Urgency Level (Weight: {(weights.urgency * 100).toFixed(0)}%)</span>
                  <span className="font-mono font-bold text-amber-400">{featured.factors.urgency}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: `${featured.factors.urgency}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Existing Investment Coverage (Weight: 5%)</span>
                  <span className="font-mono font-bold text-slate-300">{featured.factors.investmentGap}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full rounded-full" style={{ width: `${featured.factors.investmentGap}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Reasoning & Evidence Callout */}
          <div className="flex flex-col justify-between bg-navy-950/80 p-5 rounded-xl border border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block mb-1">
                Why this project?
              </span>
              <p className="text-sm text-slate-200 leading-relaxed italic mb-4">
                “{featured.whyThisProject}”
              </p>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-slate-800">
                <div>
                  <span className="text-slate-400 block">Citizen Requests</span>
                  <span className="text-white font-mono font-bold">{featured.citizenRequestsCount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Population Benefited</span>
                  <span className="text-white font-mono font-bold">{featured.populationAffected.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Estimated Cost</span>
                  <span className="text-cyan-400 font-mono font-bold">{featured.currencySymbol}{featured.estimatedCostMillions} {featured.currencyUnit}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Funding Gap</span>
                  <span className="text-rose-400 font-mono font-bold">{featured.currencySymbol}{featured.fundingGapMillions} {featured.currencyUnit}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Confidence: {featured.confidenceLevel}%</span>
              </span>

              <button
                onClick={() => openExplainModal(featured)}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center space-x-1"
              >
                <span>Explore Full Evidence & Trade-Offs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Weight Adjustment Sandbox */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              Policymaker Factor Weight Customizer (Live Recalculation)
            </h3>
          </div>
          <button
            onClick={() => setWeights(DEFAULT_WEIGHTS)}
            className="text-xs text-cyan-400 hover:underline"
          >
            Reset Default (30/20/20/15/10/5)
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-xs">
          <div>
            <label className="text-slate-400 block text-[11px] mb-1">
              Demand: {(weights.demand * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.05"
              max="0.60"
              step="0.05"
              value={weights.demand}
              onChange={(e) => setWeights({ ...weights, demand: parseFloat(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-slate-400 block text-[11px] mb-1">
              Gap: {(weights.gap * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.05"
              max="0.50"
              step="0.05"
              value={weights.gap}
              onChange={(e) => setWeights({ ...weights, gap: parseFloat(e.target.value) })}
              className="w-full accent-rose-400 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-slate-400 block text-[11px] mb-1">
              Population: {(weights.population * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.05"
              max="0.50"
              step="0.05"
              value={weights.population}
              onChange={(e) => setWeights({ ...weights, population: parseFloat(e.target.value) })}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-slate-400 block text-[11px] mb-1">
              Urgency: {(weights.urgency * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.05"
              max="0.40"
              step="0.05"
              value={weights.urgency}
              onChange={(e) => setWeights({ ...weights, urgency: parseFloat(e.target.value) })}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-slate-400 block text-[11px] mb-1">
              Vulnerability: {(weights.vulnerability * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.05"
              max="0.30"
              step="0.05"
              value={weights.vulnerability}
              onChange={(e) => setWeights({ ...weights, vulnerability: parseFloat(e.target.value) })}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-slate-400 block text-[11px] mb-1">
              Budget Gap: {(weights.investmentGap * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.02"
              max="0.25"
              step="0.01"
              value={weights.investmentGap}
              onChange={(e) => setWeights({ ...weights, investmentGap: parseFloat(e.target.value) })}
              className="w-full accent-blue-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* All AI Recommendations Cards Grid (Section 13) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-base font-bold text-white tracking-wide">
            Ranked Development Recommendations ({filteredRecs.length} Projects)
          </h3>
          <span className="text-xs text-slate-400">Dynamically sorted by composite score</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecs.map((rec, idx) => {
            const cat = getCategoryById(rec.categoryId);

            return (
              <div
                key={rec.id}
                className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">
                      RANK #{idx + 1}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                      Score: {rec.calculatedScore}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-slate-400 mb-3 flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{rec.location}</span>
                  </p>

                  <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                    {rec.problemStatement}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Requests</span>
                      <span className="text-white font-mono font-bold">{rec.citizenRequestsCount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Population</span>
                      <span className="text-white font-mono font-bold">{rec.populationAffected.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Estimated Cost</span>
                      <span className="text-cyan-400 font-mono font-bold">{rec.currencySymbol}{rec.estimatedCostMillions} {rec.currencyUnit}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-400">
                      Timeline: {rec.completionTimelineMonths} months
                    </span>

                    <button
                      onClick={() => openExplainModal(rec)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all flex items-center space-x-1"
                    >
                      <span>Why this project?</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
