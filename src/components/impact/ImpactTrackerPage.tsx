import React, { useState } from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Star,
  MapPin,
  Camera,
  ArrowRight,
  ShieldCheck,
  Building2,
  ThumbsUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BRICS_COUNTRIES } from '../../data/bricsData';
import { getCategoryById } from '../../data/categories';
import { ImpactProject } from '../../types';

export const ImpactTrackerPage: React.FC = () => {
  const { impactProjects, activeCountry, setActiveCountry } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const currentCountry = BRICS_COUNTRIES[activeCountry];

  const filteredProjects = impactProjects.filter((p) => {
    if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
    return true;
  });

  const getStatusBadge = (status: ImpactProject['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'In Progress':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'Approved':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Planning':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Where Development Is Happening
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Verifiable public ledger tracking sanctioned infrastructure works from ground-breaking to physical citizen impact.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 p-1 bg-navy-950 rounded-xl border border-slate-800 text-xs">
          {(['ALL', 'Completed', 'In Progress', 'Approved', 'Planning'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                statusFilter === st
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Highlight Benchmark Project from Section 15 */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 uppercase">
              Completed Public Infrastructure Asset • Ground Verified
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Kurnool-Kadapa Rural Potable Water Scheme (Phase 1)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Andhra Pradesh, India • Delivered by Rural Water Supply & Sanitation (RWSS) Dept
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <div className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>4.8 / 5.0 (14,280 Verified Reviews)</span>
            </div>
          </div>
        </div>

        {/* Before vs After Indicators Box (Section 15 requirements) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Before Metric */}
          <div className="bg-rose-950/20 p-5 rounded-2xl border border-rose-500/30 text-center">
            <span className="text-[10px] uppercase font-bold text-rose-300 tracking-wider block mb-1">
              BEFORE INTERVENTION (Baseline)
            </span>
            <div className="text-4xl font-black font-mono text-rose-400 my-2">
              41%
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Household Potable Water Access
            </p>
            <span className="text-[10px] text-slate-500 block mt-1">Groundwater fluoride stress</span>
          </div>

          {/* Transition Arrow / Impact Delta */}
          <div className="flex flex-col items-center justify-center p-4 bg-navy-950/60 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
              Measurable Gain
            </span>
            <div className="text-2xl font-black text-emerald-400 my-1 font-mono">
              +53% Coverage
            </div>
            <p className="text-xs text-slate-300">
              142,000 Citizens Gained Clean Piped Water
            </p>
            <span className="text-[10px] text-cyan-400 font-mono mt-1">Completed under budget in 10 months</span>
          </div>

          {/* After Metric */}
          <div className="bg-emerald-950/20 p-5 rounded-2xl border border-emerald-500/30 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider block mb-1">
              AFTER CIVICPULSE PRIORITY ACTION
            </span>
            <div className="text-4xl font-black font-mono text-emerald-400 my-2">
              94%
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Household Potable Water Access
            </p>
            <span className="text-[10px] text-emerald-400 block mt-1">Zero water-borne diarrhea incidence</span>
          </div>
        </div>
      </div>

      {/* Grid of All Active & Completed Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => {
          const cat = getCategoryById(proj.categoryId);
          const badgeClass = getStatusBadge(proj.status);

          return (
            <div
              key={proj.id}
              className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border uppercase ${badgeClass}`}>
                    {proj.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-300">
                    {proj.currencySymbol}{proj.budgetMillions} {proj.currencyUnit}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-400 mb-3 flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{proj.location}</span>
                </p>

                {/* Progress bar */}
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Physical Milestone Progress</span>
                    <span className="font-mono font-bold text-cyan-400">{proj.completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        proj.completionPercentage === 100 ? 'bg-emerald-400' : 'bg-cyan-400'
                      }`}
                      style={{ width: `${proj.completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Before vs After Mini Grid */}
                <div className="grid grid-cols-2 gap-2 bg-navy-950/80 p-3 rounded-xl border border-slate-800 text-xs mb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Baseline (Before)</span>
                    <span className="font-mono font-bold text-rose-400 mt-0.5 block">
                      {proj.beforeIndicator.value}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate block">
                      {proj.beforeIndicator.label}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">Achieved (After)</span>
                    <span className="font-mono font-bold text-emerald-400 mt-0.5 block">
                      {proj.afterIndicator.value}
                    </span>
                    <span className="text-[10px] text-emerald-400 truncate block">
                      {proj.afterIndicator.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div>
                  <span className="block text-[10px]">Citizens Impacted</span>
                  <strong className="text-white font-mono">{proj.citizensImpacted.toLocaleString()}</strong>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-1 text-amber-300 font-bold">
                    <Star className="w-3 h-3 fill-current text-amber-400" />
                    <span>{proj.citizenSatisfactionScore} / 5.0</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    {proj.verifiedCitizenReviewsCount.toLocaleString()} citizen votes
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
