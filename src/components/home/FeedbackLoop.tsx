import React, { useState } from 'react';
import {
  MessageSquare,
  Cpu,
  TrendingDown,
  Sparkles,
  DollarSign,
  Hammer,
  CheckCircle,
  BarChart3,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface LoopStep {
  id: number;
  label: string;
  tagline: string;
  icon: any;
  color: string;
  detail: string;
}

export const FeedbackLoop: React.FC = () => {
  const { setActiveTab } = useApp();
  const [activeStep, setActiveStep] = useState<number>(1);

  const loopSteps: LoopStep[] = [
    {
      id: 1,
      label: 'Citizen Voice',
      tagline: 'Multilingual Ingestion',
      icon: MessageSquare,
      color: '#06B6D4',
      detail: 'Citizens articulate real community deprivations in Telugu, Hindi, Portuguese, Russian, Mandarin or Zulu via Voice, WhatsApp, SMS, or Web.',
    },
    {
      id: 2,
      label: 'AI Analysis',
      tagline: 'NLP & Normalization',
      icon: Cpu,
      color: '#3B82F6',
      detail: 'Speech-to-text, acoustic language detection, translation to analytical schemas, and categorization into 16 standardized infrastructure categories.',
    },
    {
      id: 3,
      label: 'Infrastructure Gap',
      tagline: 'Geospatial Overlay',
      icon: TrendingDown,
      color: '#EF4444',
      detail: 'Citizen demand density is cross-referenced with GIS infrastructure assets, census demographics, and municipal access indices.',
    },
    {
      id: 4,
      label: 'Policy Priority',
      tagline: 'Evidence-Based Ranking',
      icon: Sparkles,
      color: '#8B5CF6',
      detail: 'Transparent multi-factor priority index (30% demand, 20% gap, 20% population, 15% urgency, 10% vulnerability, 5% investment gap).',
    },
    {
      id: 5,
      label: 'Project Investment',
      tagline: 'Capital Budgeting',
      icon: DollarSign,
      color: '#10B981',
      detail: 'Policymakers simulate capital scenarios, sanction viability gap funds, and link public expenditures to verified hotspot needs.',
    },
    {
      id: 6,
      label: 'Implementation',
      tagline: 'Execution & Ground Reality',
      icon: Hammer,
      color: '#F59E0B',
      detail: 'Infrastructure pipelines, clinics, roads, and microgrids are constructed with milestone progress tracked in public ledger.',
    },
    {
      id: 7,
      label: 'Citizen Feedback',
      tagline: 'Ground Verification',
      icon: CheckCircle,
      color: '#14B8A6',
      detail: 'Local communities verify physical delivery through geotagged photos, voice surveys, and satisfaction ratings.',
    },
    {
      id: 8,
      label: 'Impact Measurement',
      tagline: 'Before vs After Indicators',
      icon: BarChart3,
      color: '#EC4899',
      detail: 'Physical indicators are re-measured (e.g. Water access 61% -> 94%), updating national baseline indicators and completing the loop.',
    },
  ];

  const current = loopSteps.find((s) => s.id === activeStep) || loopSteps[0];

  return (
    <div className="w-full glass-panel rounded-2xl p-6 md:p-10 border border-cyan-500/20 my-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          The CivicPulse Core Innovation
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-3 tracking-tight">
          Closed-Loop Digital Public Infrastructure
        </h2>
        <p className="text-slate-300 text-sm mt-2">
          We do not simply collect complaints. We transform citizen voice into infrastructure intelligence, transparent capital investment, and verifiable ground impact.
        </p>
      </div>

      {/* Interactive Loop Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Step Nodes Grid */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {loopSteps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = step.id === activeStep;

            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`cursor-pointer rounded-xl p-3.5 transition-all flex flex-col justify-between border relative group ${
                  isCurrent
                    ? 'bg-navy-900 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105 ring-1 ring-cyan-400'
                    : 'bg-navy-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${step.color}20`, color: step.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">0{step.id}</span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {step.label}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{step.tagline}</p>
                </div>

                {/* Arrow connector to next step */}
                {idx < loopSteps.length - 1 ? (
                  <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 text-slate-600 z-10 pointer-events-none">
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                  </div>
                ) : (
                  <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 text-cyan-400 z-10 pointer-events-none" title="Loops back to Citizen Voice">
                    <RotateCcw className="w-3 h-3 text-cyan-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Step Spotlight Detail */}
        <div className="lg:col-span-4 bg-navy-950 rounded-2xl p-6 border border-cyan-500/30 flex flex-col justify-between shadow-xl min-h-[280px]">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
              <span className="font-mono text-cyan-400">Step 0{current.id} of 08</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-semibold uppercase">
                {current.tagline}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 flex items-center space-x-2">
              <span>{current.label}</span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {current.detail}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setActiveStep((p) => (p === 1 ? 8 : p - 1))}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Prev
            </button>

            <button
              onClick={() => {
                if (current.id === 1) setActiveTab('citizen-portal');
                else if (current.id === 3) setActiveTab('gap-analysis');
                else if (current.id === 4) setActiveTab('priority-engine');
                else if (current.id === 5) setActiveTab('policy-simulator');
                else setActiveTab('impact-tracker');
              }}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center space-x-1"
            >
              <span>Explore Module</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveStep((p) => (p === 8 ? 1 : p + 1))}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
