import React from 'react';
import { UserCheck, Sparkles, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const RoleBanner: React.FC = () => {
  const { activeRole, setActiveRole, setActiveTab } = useApp();

  const roleMeta: Record<
    UserRole,
    { title: string; desc: string; icon: string; border: string; bg: string; buttonAction?: { text: string; tab: string } }
  > = {
    citizen: {
      title: 'Citizen Experience Active',
      desc: 'Multilingual voice recording, text input, and WhatsApp messaging flow enabled. Experience how everyday community needs reach policymakers.',
      icon: '🗣️',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-950/20 text-emerald-300',
      buttonAction: { text: 'Record Voice Need', tab: 'citizen-portal' },
    },
    official: {
      title: 'Government Official View Active',
      desc: 'National infrastructure intelligence, live demand heatmaps, and cross-district funding deficits across 16 critical sectors.',
      icon: '🏛️',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-950/20 text-cyan-300',
      buttonAction: { text: 'View Demand Hotspots', tab: 'hotspots' },
    },
    policymaker: {
      title: 'Policymaker Studio Active',
      desc: 'Evidence-backed capital planning, explainable AI factor breakdowns (30/20/20/15/10/5%), and dynamic "What-If" budget simulator.',
      icon: '📊',
      border: 'border-purple-500/30',
      bg: 'bg-purple-950/20 text-purple-300',
      buttonAction: { text: 'Launch Budget Simulator', tab: 'policy-simulator' },
    },
    admin: {
      title: 'DPI Administrator Console Active',
      desc: 'Multimodal ingestion stream health, AI speech recognition WER, translation BLEU scores, moderation queues, and privacy audit logs.',
      icon: '⚙️',
      border: 'border-amber-500/30',
      bg: 'bg-amber-950/20 text-amber-300',
      buttonAction: { text: 'Inspect Model Health', tab: 'admin' },
    },
  };

  const current = roleMeta[activeRole];

  return (
    <div className={`border-b ${current.border} ${current.bg} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2.5">
          <span className="text-base">{current.icon}</span>
          <div>
            <span className="font-semibold tracking-wide uppercase text-[11px] mr-2">
              {current.title}
            </span>
            <span className="text-slate-300 hidden md:inline">{current.desc}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-end sm:self-auto">
          {current.buttonAction && (
            <button
              onClick={() => setActiveTab(current.buttonAction!.tab)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-medium transition-all"
            >
              <span>{current.buttonAction.text}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

          {/* Quick role tabs */}
          <div className="flex items-center bg-black/30 rounded p-0.5 border border-white/10">
            {(['citizen', 'official', 'policymaker', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setActiveRole(r)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium capitalize transition-all ${
                  activeRole === r ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r === 'official' ? 'Govt' : r}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
