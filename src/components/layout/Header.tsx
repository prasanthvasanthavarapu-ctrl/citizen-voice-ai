import React from 'react';
import {
  Activity,
  Layers,
  Sparkles,
  MapPin,
  Bot,
  UserCheck,
  ChevronDown,
  Globe2,
  Play,
  Shield,
  Sliders,
  TrendingUp,
  Cpu,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BRICS_COUNTRIES } from '../../data/bricsData';
import { SUPPORTED_LANGUAGES } from '../../data/translations';
import { BricsCountryCode, LanguageCode, UserRole } from '../../types';

export const Header: React.FC = () => {
  const {
    activeRole,
    setActiveRole,
    activeCountry,
    setActiveCountry,
    activeLanguage,
    setActiveLanguage,
    t,
    activeTab,
    setActiveTab,
    triggerDemoSimulation,
    openPipelineModal,
  } = useApp();

  const currentCountry = BRICS_COUNTRIES[activeCountry];

  const roleLabels: Record<UserRole, { title: string; desc: string; badgeColor: string }> = {
    citizen: { title: 'Citizen View', desc: 'Submit voice/text & track local needs', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    official: { title: 'Government Official', desc: 'National dashboards & regional demand', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
    policymaker: { title: 'Policymaker', desc: 'What-If simulation & AI priority engine', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    admin: { title: 'Administrator', desc: 'Pipelines, models & DPG audit logs', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  };

  return (
    <header className="sticky top-0 z-50 bg-navy-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Banner / Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between text-xs border-b border-slate-800/40 text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-medium text-slate-300">BRICS Digital Public Infrastructure</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-400 font-mono">DPI Protocol v2.6</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">UN Digital Public Good (DPG) Certified</span>
        </div>

        <div className="flex items-center space-x-4 mt-1 sm:mt-0">
          {/* Quick Pipeline Trigger */}
          <button
            onClick={() => openPipelineModal(1)}
            className="flex items-center space-x-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Pipeline Inspector</span>
          </button>

          {/* Launch Demo Button */}
          <button
            onClick={triggerDemoSimulation}
            className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/30 text-cyan-300 border border-cyan-500/40 hover:from-cyan-500/30 hover:to-blue-600/40 transition-all font-medium shadow-sm hover:shadow-cyan-500/20"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{t.nav.launchDemo}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Tagline */}
        <div
          onClick={() => setActiveTab('overview')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform border border-cyan-400/30">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                CivicPulse<span className="text-cyan-400">.AI</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
                BRICS DPI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">
              Turning Citizen Voices into Smarter Infrastructure Decisions
            </p>
          </div>
        </div>

        {/* Global Selectors: Persona, Country, Language */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Persona / Role Selector */}
          <div className="relative group">
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value as UserRole)}
              className="appearance-none bg-slate-900 text-slate-200 text-xs font-medium pl-8 pr-7 py-1.5 rounded-lg border border-slate-700 hover:border-cyan-500 focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
            >
              <option value="citizen">👤 Citizen Mode</option>
              <option value="official">🏛️ Govt Official</option>
              <option value="policymaker">📊 Policymaker</option>
              <option value="admin">⚙️ Administrator</option>
            </select>
            <UserCheck className="w-3.5 h-3.5 text-cyan-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* BRICS Country Selector */}
          <div className="relative">
            <select
              value={activeCountry}
              onChange={(e) => setActiveCountry(e.target.value as BricsCountryCode)}
              className="appearance-none bg-slate-900 text-slate-200 text-xs font-semibold pl-8 pr-7 py-1.5 rounded-lg border border-slate-700 hover:border-cyan-500 focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
            >
              <option value="IN">🇮🇳 India</option>
              <option value="BR">🇧🇷 Brazil</option>
              <option value="RU">🇷🇺 Russia</option>
              <option value="CN">🇨🇳 China</option>
              <option value="ZA">🇿🇦 South Africa</option>
            </select>
            <span className="text-sm absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              {currentCountry.flag}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* 10-Language Selector */}
          <div className="relative">
            <select
              value={activeLanguage}
              onChange={(e) => setActiveLanguage(e.target.value as LanguageCode)}
              className="appearance-none bg-slate-900 text-slate-200 text-xs font-medium pl-8 pr-7 py-1.5 rounded-lg border border-slate-700 hover:border-cyan-500 focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeName} ({l.code.toUpperCase()})
                </option>
              ))}
            </select>
            <Globe2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Primary Sub-Navigation Bar */}
      <div className="bg-navy-900/60 border-t border-slate-800/60 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center space-x-1 py-1.5 min-w-max">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {t.nav.overview}
          </button>

          <button
            onClick={() => setActiveTab('citizen-portal')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'citizen-portal'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>🗣️</span>
            <span>{t.nav.citizenPortal}</span>
          </button>

          <button
            onClick={() => setActiveTab('intelligence')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'intelligence'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>📊</span>
            <span>{t.nav.intelligence}</span>
          </button>

          <button
            onClick={() => setActiveTab('hotspots')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'hotspots'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>{t.nav.hotspots}</span>
          </button>

          <button
            onClick={() => setActiveTab('gap-analysis')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'gap-analysis'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {t.nav.gapAnalysis}
          </button>

          <button
            onClick={() => setActiveTab('priority-engine')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'priority-engine'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.nav.priorityEngine}</span>
          </button>

          <button
            onClick={() => setActiveTab('policy-simulator')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'policy-simulator'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.nav.policySimulator}</span>
          </button>

          <button
            onClick={() => setActiveTab('impact-tracker')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'impact-tracker'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.nav.impactTracker}</span>
          </button>

          <button
            onClick={() => setActiveTab('dpg-principles')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'dpg-principles'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.nav.dpgPrinciples}</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'architecture'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {t.nav.architecture}
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'admin'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {t.nav.admin}
          </button>
        </div>
      </div>
    </header>
  );
};
