import React from 'react';
import { ArrowRight, Shield, Heart, Globe, Cpu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="border-t border-slate-800 bg-navy-950/80 mt-16 text-slate-400 text-sm">
      {/* Call to action section */}
      <div className="max-w-7xl mx-auto px-4 py-12 border-b border-slate-800/60">
        <div className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden border border-cyan-500/20 text-center">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-4">
            BRICS Innovation Challenge 2026
          </span>

          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight mb-4">
            “Every Citizen Voice Can Become Development Intelligence.”
          </h2>

          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto mb-8">
            CivicPulse AI consolidates fragmented voices across portals, call centers, messaging apps, and audio recordings into actionable, evidence-based public infrastructure priorities.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('intelligence')}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-all shadow-lg shadow-cyan-500/25 flex items-center space-x-2"
            >
              <span>Explore the Intelligence Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('citizen-portal')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold border border-slate-600 transition-all flex items-center space-x-2"
            >
              <span>Submit a Development Request</span>
            </button>

            <button
              onClick={() => setActiveTab('hotspots')}
              className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-300 font-medium border border-cyan-500/30 transition-all flex items-center space-x-2"
            >
              <span>View Infrastructure Hotspots</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main footer directory */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
        <div className="flex flex-col items-center md:items-start space-y-2">
          <div className="flex items-center space-x-2 text-white font-bold text-base">
            <span>CivicPulse<span className="text-cyan-400">.AI</span></span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Open DPG</span>
          </div>
          <p className="text-slate-400">
            A Multilingual Digital Public Infrastructure Platform for Brazil 🇧🇷, Russia 🇷🇺, India 🇮🇳, China 🇨🇳, and South Africa 🇿🇦.
          </p>
          <p className="text-slate-500">
            Built as a Digital Public Good under Apache 2.0 Open Source License. Designed for interoperability with GovStack & MOSIP.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <button onClick={() => setActiveTab('dpg-principles')} className="hover:text-cyan-300 transition-colors">
            DPG Principles
          </button>
          <button onClick={() => setActiveTab('gap-analysis')} className="hover:text-cyan-300 transition-colors">
            Infrastructure Gaps
          </button>
          <button onClick={() => setActiveTab('policy-simulator')} className="hover:text-cyan-300 transition-colors">
            What-If Simulator
          </button>
          <button onClick={() => setActiveTab('architecture')} className="hover:text-cyan-300 transition-colors">
            System Architecture
          </button>
          <button onClick={() => setActiveTab('admin')} className="hover:text-cyan-300 transition-colors">
            Admin Console
          </button>
        </div>
      </div>
    </footer>
  );
};
