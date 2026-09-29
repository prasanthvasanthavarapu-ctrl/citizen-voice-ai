import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';
import {
  Filter,
  Download,
  Sparkles,
  MapPin,
  TrendingDown,
  AlertTriangle,
  Layers,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BRICS_COUNTRIES } from '../../data/bricsData';
import { INFRASTRUCTURE_CATEGORIES } from '../../data/categories';
import { InfrastructureCategoryId } from '../../types';

export const NationalDashboard: React.FC = () => {
  const {
    activeCountry,
    setActiveCountry,
    hotspots,
    gaps,
    recommendations,
    selectedCategory,
    setSelectedCategory,
    selectedUrgency,
    setSelectedUrgency,
    setActiveTab,
    openExplainModal,
  } = useApp();

  const currentCountry = BRICS_COUNTRIES[activeCountry];

  // Filtered hotspots & gaps
  const countryHotspots = hotspots.filter((h) => h.country === activeCountry);
  const countryGaps = gaps.filter((g) => g.country === activeCountry);

  const filteredHotspots = countryHotspots.filter((h) => {
    if (selectedCategory !== 'ALL' && h.primaryCategoryId !== selectedCategory) return false;
    if (selectedUrgency !== 'ALL' && h.demandLevel !== selectedUrgency.toLowerCase()) return false;
    return true;
  });

  // Category demand vs budget gap chart data
  const demandVsGapData = [
    { category: 'Drinking Water', demand: 18430, fundingGap: 36, planned: 42 },
    { category: 'Renewable Microgrid', demand: 12150, fundingGap: 41, planned: 28 },
    { category: 'Flood Embankments', demand: 14890, fundingGap: 62, planned: 51 },
    { category: 'Rural Roads', demand: 16200, fundingGap: 34, planned: 48 },
    { category: 'Health Clinics', demand: 9640, fundingGap: 29, planned: 31 },
    { category: 'Digital Fiber', demand: 7850, fundingGap: 22, planned: 14 },
    { category: 'Sanitation', demand: 11420, fundingGap: 32, planned: 19 },
  ];

  // Radar multi-dimensional score data
  const radarData = [
    { subject: 'Citizen Demand', A: 92, fullMark: 100 },
    { subject: 'Physical Deficiency', A: 88, fullMark: 100 },
    { subject: 'Affected Population', A: 81, fullMark: 100 },
    { subject: 'Vulnerability Index', A: 86, fullMark: 100 },
    { subject: 'Investment Shortfall', A: 82, fullMark: 100 },
    { subject: 'Urgency Urgency', A: 89, fullMark: 100 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Dashboard Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{currentCountry.flag}</span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              BRICS Civic Infrastructure Intelligence — {currentCountry.name}
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Lead Authority: <span className="text-slate-200">{currentCountry.leadMinistry}</span> • Real-Time AI Consolidation
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Country Selector */}
          <div className="flex items-center bg-navy-900 border border-slate-700 rounded-xl p-1">
            {(['IN', 'BR', 'RU', 'CN', 'ZA'] as const).map((code) => (
              <button
                key={code}
                onClick={() => setActiveCountry(code)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeCountry === code
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {BRICS_COUNTRIES[code].flag} {code}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('policy-simulator')}
            className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-semibold transition-all flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Simulate Budget</span>
          </button>
        </div>
      </div>

      {/* Filter Bar (Section 8 & 9 requirements) */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 text-slate-400 font-semibold">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Filter By:</span>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">All 16 Categories</option>
            {INFRASTRUCTURE_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Urgency Filter */}
          <select
            value={selectedUrgency}
            onChange={(e) => setSelectedUrgency(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">All Urgency Levels</option>
            <option value="CRITICAL">🔴 Critical Only</option>
            <option value="HIGH">🟠 High Demand</option>
            <option value="MODERATE">🟡 Moderate</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
          <span>Displaying <strong>{filteredHotspots.length}</strong> active district hotspots</span>
          <span>•</span>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedUrgency('ALL');
            }}
            className="text-cyan-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bar Chart: Demand vs Capital Gap */}
        <div className="lg:col-span-8 glass-card rounded-2xl p-6 border border-cyan-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Citizen Demand vs Funding Gap by Category ({currentCountry.currencySymbol} Millions / Cr)
              </h3>
              <p className="text-xs text-slate-400">
                Identifies categories where citizen feedback volume diverges most from planned budgets
              </p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-mono">
              Live Ingestion Data
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandVsGapData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="planned" fill="#3B82F6" name="Planned Investment" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fundingGap" fill="#F43F5E" name="Unfunded Deficit Gap" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart: AI Multi-Dimensional Index */}
        <div className="lg:col-span-4 glass-card rounded-2xl p-6 border border-cyan-500/20 flex flex-col justify-between">
          <div className="pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white tracking-wide">
              Priority Engine Factor Radar
            </h3>
            <p className="text-xs text-slate-400">
              Composite weighting across rural benchmark indices
            </p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name="Deficiency Vector" dataKey="A" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Composite Priority Score:</span>
            <span className="text-cyan-300 font-bold font-mono text-sm">87.4 / 100</span>
          </div>
        </div>
      </div>

      {/* Critical Infrastructure Gaps Table */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              High-Priority Regional Gaps & Recommendations
            </h3>
            <p className="text-xs text-slate-400">
              Evidence-based prioritization ready for ministerial review
            </p>
          </div>

          <button
            onClick={() => setActiveTab('hotspots')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center space-x-1"
          >
            <span>Explore All Hotspots Heatmap</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-navy-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Region / District</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Citizen Demand</th>
                <th className="py-3 px-4">Current Access</th>
                <th className="py-3 px-4">Population Affected</th>
                <th className="py-3 px-4">Funding Gap</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {countryGaps.map((gap) => (
                <tr key={gap.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">
                    {gap.district}, {gap.region}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 text-[10px] capitalize">
                      {gap.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-cyan-400">
                    {gap.citizenRequests.toLocaleString()} requests
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full"
                          style={{ width: `${gap.currentAccessPercent}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-[11px]">{gap.currentAccessPercent}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    {gap.populationAffected.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">
                    {currentCountry.currencySymbol}{gap.fundingGap} {gap.currencyUnit}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setActiveTab('priority-engine')}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-semibold transition-all inline-flex items-center space-x-1"
                    >
                      <span>AI Brief</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
