import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
} from 'recharts';
import {
  Scale,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BRICS_COUNTRIES } from '../../data/bricsData';

export const GapAnalysisPage: React.FC = () => {
  const { gaps, activeCountry, setActiveCountry, setActiveTab } = useApp();
  const currentCountry = BRICS_COUNTRIES[activeCountry];
  const countryGaps = gaps.filter((g) => g.country === activeCountry);

  // Comparative data for chart
  const comparativeChartData = countryGaps.map((g) => ({
    name: g.district.split(' ')[0],
    planned: g.plannedInvestment,
    required: g.estimatedRequirement,
    fundingGap: g.fundingGap,
    accessPercent: g.currentAccessPercent,
    requests: g.citizenRequests,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <Scale className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Infrastructure Gap Analysis — {currentCountry.name}
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Reconciling Citizen Demand vs Physical Baseline Access vs Planned Capex vs True Capital Requirement.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('policy-simulator')}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center space-x-1.5 shadow-lg shadow-cyan-500/20"
        >
          <span>Run What-If Capital Allocation Simulator</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Featured Highlight Card from Prompt Specification (Section 11) */}
      <div className="glass-panel rounded-2xl p-6 border-2 border-cyan-500/40 relative overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wide">
              Critical Priority Gap Identified
            </span>
            <span className="text-xs text-slate-400">Section 11 Reference Case Study</span>
          </div>
          <span className="text-xs font-mono text-cyan-400">District Code: AP-ANAT-RURAL</span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 text-xs">
          <div className="bg-navy-950/80 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Region & Sector</span>
            <span className="text-sm font-bold text-white block mt-1">Rural District A</span>
            <span className="text-[11px] text-cyan-400">Drinking Water Network</span>
          </div>

          <div className="bg-navy-950/80 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Citizen Water Requests</span>
            <span className="text-xl font-bold font-mono text-cyan-400 block mt-1">18,430</span>
            <span className="text-[10px] text-emerald-400">Verified Voice/Text</span>
          </div>

          <div className="bg-navy-950/80 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Current Water Access</span>
            <span className="text-xl font-bold font-mono text-amber-400 block mt-1">61%</span>
            <span className="text-[10px] text-rose-400">39% Unserved Deficit</span>
          </div>

          <div className="bg-navy-950/80 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Population Affected</span>
            <span className="text-xl font-bold font-mono text-slate-100 block mt-1">142,000</span>
            <span className="text-[10px] text-slate-400">Across 48 Panchayats</span>
          </div>

          <div className="bg-navy-950/80 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Planned vs Requirement</span>
            <span className="text-sm font-bold font-mono text-blue-400 block mt-1">
              Planned: ₹42 Cr
            </span>
            <span className="text-sm font-bold font-mono text-purple-400 block">
              Required: ₹78 Cr
            </span>
          </div>

          <div className="bg-rose-950/30 p-4 rounded-xl border border-rose-500/40">
            <span className="text-[10px] text-rose-300 block font-bold">Unfunded Deficit Gap</span>
            <span className="text-2xl font-black font-mono text-rose-400 block mt-0.5">₹36 Cr</span>
            <span className="text-[10px] text-rose-300 font-semibold">Flagged for Priority Grant</span>
          </div>
        </div>
      </div>

      {/* Visual Chart: Planned vs Required vs Funding Gap */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">
              Planned Capital Outlays vs Required Expenditure ({currentCountry.currencySymbol} Millions / Cr)
            </h3>
            <p className="text-xs text-slate-400">
              Bar chart highlighting the fiscal gap across active priority districts
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">Data Source: Open Budget Registry</span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparativeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="planned" fill="#3B82F6" name="Planned Investment" radius={[4, 4, 0, 0]} />
              <Bar dataKey="required" fill="#8B5CF6" name="Required Capital" radius={[4, 4, 0, 0]} />
              <Bar dataKey="fundingGap" fill="#F43F5E" name="Funding Gap Shortfall" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4-Way Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div className="glass-card rounded-xl p-4 border border-cyan-500/20">
          <span className="text-cyan-400 font-bold block mb-1">1. Citizen Demand Ingestion</span>
          <p className="text-slate-300 leading-relaxed">
            Measures spontaneous community requests filtered for duplicate clusters, dialect nuances, and distress urgency.
          </p>
        </div>

        <div className="glass-card rounded-xl p-4 border border-amber-500/20">
          <span className="text-amber-400 font-bold block mb-1">2. Physical Infrastructure Baseline</span>
          <p className="text-slate-300 leading-relaxed">
            Geo-tagged asset registers showing existing functional taps, microgrids, paved roads, and clinic beds per 1,000 residents.
          </p>
        </div>

        <div className="glass-card rounded-xl p-4 border border-blue-500/20">
          <span className="text-blue-400 font-bold block mb-1">3. Planned Fiscal Budgets</span>
          <p className="text-slate-300 leading-relaxed">
            Existing government capital outlays already committed in national or state medium-term expenditure frameworks.
          </p>
        </div>

        <div className="glass-card rounded-xl p-4 border border-rose-500/20">
          <span className="text-rose-400 font-bold block mb-1">4. Unfunded Priority Deficit</span>
          <p className="text-slate-300 leading-relaxed">
            The actionable gap that AI surfaces directly to ministerial review boards to prevent regional neglect.
          </p>
        </div>
      </div>
    </div>
  );
};
