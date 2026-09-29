import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Play,
  Globe2,
  Users,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Cpu,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BricsHeroMap } from './BricsHeroMap';
import { FeedbackLoop } from './FeedbackLoop';
import { Storytelling } from './Storytelling';

export const HeroSection: React.FC = () => {
  const { t, setActiveTab, triggerDemoSimulation, activeCountry } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
      {/* Hero Header & CTAs */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.hero.livePdpBadge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
          Listen to Citizens.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            Understand Communities.
          </span>{' '}
          Build What Matters.
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => setActiveTab('intelligence')}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/30 flex items-center space-x-2 group"
          >
            <span>{t.hero.exploreBtn}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => setActiveTab('citizen-portal')}
            className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 hover:border-slate-500 transition-all flex items-center space-x-2"
          >
            <span>{t.hero.submitBtn}</span>
          </button>

          <button
            onClick={triggerDemoSimulation}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600/30 to-blue-600/30 hover:from-purple-600/40 hover:to-blue-600/40 text-purple-200 border border-purple-500/40 font-semibold text-sm transition-all flex items-center space-x-2 shadow-sm"
          >
            <Play className="w-4 h-4 fill-current text-purple-400" />
            <span>Launch Live Demo</span>
          </button>
        </div>
      </div>

      {/* Hero Visual: Interactive BRICS Map with Glowing Hotspots */}
      <BricsHeroMap />

      {/* Top KPI Cards (Section 8) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 my-10">
        <div className="glass-card rounded-xl p-4 border border-cyan-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium">{t.stats.requests}</span>
            <Users className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">2.84M</div>
          <div className="text-[10px] text-emerald-400 flex items-center space-x-1 mt-1 font-medium">
            <span>+18.4k this week</span>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-rose-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium">{t.stats.gaps}</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400 font-mono">18,420</div>
          <div className="text-[10px] text-slate-400 mt-1 font-medium">
            Across 16 categories
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-amber-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium">{t.stats.regions}</span>
            <Globe2 className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">326</div>
          <div className="text-[10px] text-slate-400 mt-1 font-medium">
            Critical deficiency
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-purple-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium">{t.stats.aiRecommendations}</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-300 font-mono">1,284</div>
          <div className="text-[10px] text-purple-400 mt-1 font-medium">
            Explainable XAI briefs
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-emerald-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium">{t.stats.completed}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">742</div>
          <div className="text-[10px] text-emerald-300 mt-1 font-medium">
            Citizen verified
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-blue-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium">{t.stats.citizensImpacted}</span>
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-cyan-300 font-mono">41.7M</div>
          <div className="text-[10px] text-cyan-400 mt-1 font-medium">
            Direct public benefit
          </div>
        </div>
      </div>

      {/* Visual Feedback Loop (Section 16 & 32) */}
      <FeedbackLoop />

      {/* Visual Storytelling (Section 31) */}
      <Storytelling />
    </div>
  );
};
