import React from 'react';
import {
  Radio,
  Layers,
  Flame,
  Scale,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  FileSpreadsheet,
  Globe2,
} from 'lucide-react';

export const Storytelling: React.FC = () => {
  const narrativeSteps = [
    {
      num: '01',
      title: 'Fragmented Voices',
      badge: 'The Crisis',
      desc: 'Citizen requests are fragmented across call centers, paper petitions, WhatsApp chats, local offices, and community meetings. Crucial rural needs remain invisible.',
      icon: Radio,
      accent: 'text-rose-400',
      border: 'border-rose-500/20',
      bg: 'bg-rose-950/20',
      subIcons: ['📞 Call Centers', '📱 WhatsApp', '📝 Petitions', '🗣️ Meetings'],
    },
    {
      num: '02',
      title: 'AI Consolidation',
      badge: 'Multilingual NLP',
      desc: 'CivicPulse AI unifies inputs across 100+ native dialects, auto-detects language, transcribes audio, normalizes intents, and scrubs personal citizen data.',
      icon: Layers,
      accent: 'text-cyan-400',
      border: 'border-cyan-500/20',
      bg: 'bg-cyan-950/20',
      subIcons: ['🌐 Speech-to-Text', '🔄 Dialect Translation', '🔒 PII Strip', '🏷️ 16 Categories'],
    },
    {
      num: '03',
      title: 'Demand Intelligence',
      badge: 'Hotspot Mapping',
      desc: 'Clusters citizen feedback spatially to identify critical infrastructure demand hotspots and prevent duplicate grievance tickets.',
      icon: Flame,
      accent: 'text-amber-400',
      border: 'border-amber-500/20',
      bg: 'bg-amber-950/20',
      subIcons: ['🔴 Critical Demand', '📍 Geospatial GIS', '👥 Population Matrix', '⚠️ Urgency Index'],
    },
    {
      num: '04',
      title: 'Policy Intelligence',
      badge: 'Multi-Factor Gap',
      desc: 'Cross-references raw citizen demand with physical infrastructure asset registers, demographic vulnerability, and ongoing municipal budgets.',
      icon: Scale,
      accent: 'text-purple-400',
      border: 'border-purple-500/20',
      bg: 'bg-purple-950/20',
      subIcons: ['📊 Census Overlay', '💰 Budget Tracking', '📉 Physical Deficits', '⚖️ Transparent Weights'],
    },
    {
      num: '05',
      title: 'Evidence-Based Action',
      badge: 'Decision Support',
      desc: 'Policymakers receive transparent, auditable AI project recommendations with trade-off analysis, rather than black-box automated commands.',
      icon: Sparkles,
      accent: 'text-blue-400',
      border: 'border-blue-500/20',
      bg: 'bg-blue-950/20',
      subIcons: ['📑 Policy Briefs', '🎛️ What-If Simulator', '🤝 Human Oversight', '🎯 Viability Gap Sanction'],
    },
    {
      num: '06',
      title: 'Measurable Impact',
      badge: 'Public Accountability',
      desc: 'Public tracking ledger verifies before vs. after service metrics (e.g. water access 41% to 94%), restoring trust between citizens and state.',
      icon: CheckCircle2,
      accent: 'text-emerald-400',
      border: 'border-emerald-500/20',
      bg: 'bg-emerald-950/20',
      subIcons: ['📈 Verified Indicators', '⭐ Citizen Ratings', '📷 Geotagged Proof', '🔄 Closed Loop'],
    },
  ];

  return (
    <div className="my-16">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30">
          How CivicPulse Solves Public Sector Blind Spots
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-3 tracking-tight">
          From Fragmented Grievances to Strategic Infrastructure
        </h2>
        <p className="text-slate-300 text-sm mt-2">
          Governments spend billions on capital infrastructure, yet rural communities often remain without essentials. Here is how CivicPulse AI bridges the divide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {narrativeSteps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className={`rounded-2xl p-6 glass-card border ${step.border} flex flex-col justify-between hover:scale-[1.02] transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${step.bg} ${step.accent} flex items-center justify-center border ${step.border}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    PHASE {step.num}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    {step.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              {/* Sub features tags */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                {step.subIcons.map((sub, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-800"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
