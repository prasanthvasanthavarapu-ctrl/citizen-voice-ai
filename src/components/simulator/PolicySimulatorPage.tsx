import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import {
  Sliders,
  DollarSign,
  Users,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Bookmark,
  Share2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BRICS_COUNTRIES } from '../../data/bricsData';
import { INFRASTRUCTURE_CATEGORIES } from '../../data/categories';
import { runPolicySimulation } from '../../services/aiEngine';
import { InfrastructureCategoryId, WhatIfSimulationParams } from '../../types';

export const PolicySimulatorPage: React.FC = () => {
  const { recommendations, activeCountry, setActiveCountry, openExplainModal } = useApp();
  const currentCountry = BRICS_COUNTRIES[activeCountry];

  // Simulator Interactive Parameters
  const [budgetMillions, setBudgetMillions] = useState<number>(500); // 500 Cr
  const [targetRegion, setTargetRegion] = useState<string>('ALL');
  const [selectedCategories, setSelectedCategories] = useState<InfrastructureCategoryId[]>([]);
  const [populationPriorityWeight, setPopulationPriorityWeight] = useState<number>(50);
  const [urgencyThreshold, setUrgencyThreshold] = useState<number>(75);

  const simParams: WhatIfSimulationParams = {
    budgetMillions,
    targetRegion,
    selectedCategories,
    populationPriorityWeight,
    urgencyThreshold,
  };

  const simResult = useMemo(() => {
    return runPolicySimulation(recommendations, simParams);
  }, [budgetMillions, targetRegion, selectedCategories, populationPriorityWeight, urgencyThreshold, recommendations]);

  // Efficiency curve dataset: Shows how population impact scales with incremental budget
  const curveData = useMemo(() => {
    const steps = [100, 250, 500, 750, 1000, 1500, 2000, 3000];
    return steps.map((b) => {
      const res = runPolicySimulation(recommendations, { ...simParams, budgetMillions: b });
      return {
        budget: `${currentCountry.currencySymbol}${b}M`,
        citizens: Number((res.totalCitizensImpacted / 1000000).toFixed(2)),
        projects: res.fundedProjects.length,
      };
    });
  }, [simParams, recommendations, currentCountry.currencySymbol]);

  const toggleCategory = (catId: InfrastructureCategoryId) => {
    if (selectedCategories.includes(catId)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== catId));
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <Sliders className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              “What-If” Infrastructure Policy Simulator
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic capital sandbox. Model the social ROI of public capital allocations before sanctioning fiscal outlays.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setBudgetMillions(500);
              setSelectedCategories([]);
              setPopulationPriorityWeight(50);
              setUrgencyThreshold(75);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
          >
            Reset Simulator
          </button>
        </div>
      </div>

      {/* Simulator Control Board & Dynamic Impact Headline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-purple-500/30 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Investment Parameters</span>
            </h3>
            <span className="text-[10px] text-purple-300 font-mono">Live Recalculation</span>
          </div>

          {/* Budget Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300">
                Available Budget Allocation:
              </label>
              <span className="text-lg font-black font-mono text-cyan-400">
                {currentCountry.currencySymbol}{budgetMillions} {currentCountry.code === 'IN' ? 'Crore' : 'Million'}
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="2500"
              step="50"
              value={budgetMillions}
              onChange={(e) => setBudgetMillions(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>{currentCountry.currencySymbol}50M</span>
              <span>{currentCountry.currencySymbol}1,250M</span>
              <span>{currentCountry.currencySymbol}2,500M</span>
            </div>
          </div>

          {/* Target Region */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Target Country / Region Focus:</label>
            <select
              value={targetRegion}
              onChange={(e) => setTargetRegion(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="ALL">All BRICS Nations Combined</option>
              <option value="IN">🇮🇳 India Focus</option>
              <option value="BR">🇧🇷 Brazil Focus</option>
              <option value="RU">🇷🇺 Russia Focus</option>
              <option value="CN">🇨🇳 China Focus</option>
              <option value="ZA">🇿🇦 South Africa Focus</option>
            </select>
          </div>

          {/* Urgency Threshold */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Urgency Threshold Filter:</span>
              <span className="font-mono text-rose-400 font-bold">&gt; {urgencyThreshold}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={urgencyThreshold}
              onChange={(e) => setUrgencyThreshold(Number(e.target.value))}
              className="w-full accent-rose-400 cursor-pointer"
            />
          </div>

          {/* Population Priority Weight */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Population Reach Weighting:</span>
              <span className="font-mono text-purple-400 font-bold">{populationPriorityWeight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="5"
              value={populationPriorityWeight}
              onChange={(e) => setPopulationPriorityWeight(Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Prioritize Specific Categories (Optional):
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 bg-navy-950/60 rounded-xl border border-slate-800">
              {INFRASTRUCTURE_CATEGORIES.slice(0, 8).map((cat) => {
                const isSelected = selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all border ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Simulation Output & ROI Frontier */}
        <div className="lg:col-span-7 space-y-6">
          {/* Dynamic Impact Statement (Section 14 requirement) */}
          <div className="glass-panel rounded-2xl p-6 border-2 border-cyan-500/40 bg-gradient-to-br from-cyan-950/30 via-navy-950 to-blue-950/30 shadow-2xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
              AI Simulation Outcome Projection
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug mb-3">
              “{simResult.summarySentence}”
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs">
              <div className="bg-navy-950/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Funded Projects</span>
                <span className="text-xl font-bold font-mono text-cyan-400 mt-0.5 block">
                  {simResult.fundedProjects.length}
                </span>
                <span className="text-[10px] text-slate-400">Within budget cap</span>
              </div>

              <div className="bg-navy-950/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Citizens Impacted</span>
                <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5 block">
                  {(simResult.totalCitizensImpacted / 1000000).toFixed(2)}M
                </span>
                <span className="text-[10px] text-slate-400">Direct beneficiaries</span>
              </div>

              <div className="bg-navy-950/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Gap Reduction</span>
                <span className="text-xl font-bold font-mono text-purple-400 mt-0.5 block">
                  {simResult.gapReductionPercent}%
                </span>
                <span className="text-[10px] text-slate-400">Fiscal gap closed</span>
              </div>

              <div className="bg-navy-950/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Capital Efficiency</span>
                <span className="text-xl font-bold font-mono text-amber-400 mt-0.5 block">
                  {simResult.roiEfficiencyScore}x
                </span>
                <span className="text-[10px] text-slate-400">Social return index</span>
              </div>
            </div>
          </div>

          {/* Social ROI Frontier Chart */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">
                  Capital Allocation Frontier Curve (Social Return on Public Investment)
                </h4>
                <p className="text-xs text-slate-400">
                  Pareto-optimal curve showing population reach as budget scales
                </p>
              </div>
              <span className="text-[10px] font-mono text-purple-400">Pareto Optimal</span>
            </div>

            <div className="h-60 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={curveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="popGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="budget" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="citizens"
                    name="Citizens Impacted (Millions)"
                    stroke="#06B6D4"
                    fillOpacity={1}
                    fill="url(#popGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Funded Projects List Under Current Scenario */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Prioritized Interventions Fully Funded Under Current Scenario ({simResult.fundedProjects.length})
            </h3>
            <p className="text-xs text-slate-400">
              Ranked in descending order of social return and urgency
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-bold">
            Total Allocated: {currentCountry.currencySymbol}{simResult.totalCostMillions}M
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {simResult.fundedProjects.map((proj, idx) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 hover:border-cyan-500/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>FUNDED #{idx + 1}</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {proj.currencySymbol}{proj.fundingGapMillions} {proj.currencyUnit}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1">
                  {proj.title}
                </h4>
                <p className="text-[11px] text-slate-400 mb-2">
                  {proj.location}
                </p>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {proj.problemStatement}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">
                  Reach: <strong className="text-white">{proj.populationAffected.toLocaleString()}</strong>
                </span>

                <button
                  onClick={() => openExplainModal(proj)}
                  className="text-cyan-400 hover:underline font-semibold"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
