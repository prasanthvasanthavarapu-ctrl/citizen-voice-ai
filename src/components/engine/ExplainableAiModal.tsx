import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Scale,
  FileText,
  Layers,
  ArrowRight,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AIRecommendation } from '../../types';
import { calculatePriorityIndex, DEFAULT_WEIGHTS } from '../../services/aiEngine';

export const ExplainableAiModal: React.FC = () => {
  const { selectedProjectForExplain, closeExplainModal, setActiveTab } = useApp();
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);

  if (!selectedProjectForExplain) return null;

  const project = selectedProjectForExplain;
  const currentScore = calculatePriorityIndex(project.factors, weights);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-navy-900 border border-purple-500/40 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl shadow-purple-950/80 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-navy-950/90">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/40">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Explainable AI (XAI) Audit Dossier
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  {project.id}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Transparent factor decomposition, input datasets, and trade-off analysis
              </p>
            </div>
          </div>

          <button
            onClick={closeExplainModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Human in the loop prominent alert (Section 33 requirements) */}
        <div className="bg-amber-950/30 border-b border-amber-500/30 px-6 py-2.5 flex items-center space-x-2 text-xs text-amber-300">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            <strong>Human Oversight Notice:</strong> AI-assisted recommendation for policymaker review. Never applied as an automatic government decision. Requires constitutional ministerial sign-off.
          </span>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Summary Banner */}
          <div className="glass-card rounded-2xl p-5 border border-purple-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                Recommended Public Infrastructure Project
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">
                {project.title}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {project.location} • Estimated Cost: {project.currencySymbol}{project.estimatedCostMillions} {project.currencyUnit}
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-navy-950 p-3 rounded-xl border border-slate-800 shrink-0">
              <div className="text-center">
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">Priority Index</span>
                <span className="text-2xl font-black font-mono text-cyan-400">{currentScore}</span>
                <span className="text-[10px] text-slate-500"> / 100</span>
              </div>
              <div className="h-8 w-px bg-slate-800"></div>
              <div className="text-center">
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">AI Confidence</span>
                <span className="text-xl font-black font-mono text-emerald-400">{project.confidenceLevel}%</span>
                <span className="text-[10px] text-emerald-500 block">High Certainty</span>
              </div>
            </div>
          </div>

          {/* Natural Language Reasoning: Why This Project? (Section 12 & 33) */}
          <div className="glass-panel rounded-xl p-5 border border-cyan-500/30">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center space-x-1.5">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Why Did AI Recommend This Project?</span>
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed bg-navy-950/80 p-3.5 rounded-xl border border-slate-800 italic">
              “{project.whyThisProject}”
            </p>
          </div>

          {/* Factor Breakdown (Section 12: 30%, 20%, 20%, 15%, 10%, 5%) */}
          <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center space-x-1.5">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>Transparent Factor Decomposition & Mathematical Weights</span>
            </h4>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Citizen Demand Ingestion (Weight: 30%)</span>
                  <span className="font-mono font-bold text-cyan-400">{project.factors.citizenDemand}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${project.factors.citizenDemand}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Physical Infrastructure Gap (Weight: 20%)</span>
                  <span className="font-mono font-bold text-rose-400">{project.factors.infrastructureGap}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-400 h-full rounded-full" style={{ width: `${project.factors.infrastructureGap}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Affected Population Size (Weight: 20%)</span>
                  <span className="font-mono font-bold text-purple-400">{project.factors.populationImpact}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-400 h-full rounded-full" style={{ width: `${project.factors.populationImpact}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Distress & Health Urgency (Weight: 15%)</span>
                  <span className="font-mono font-bold text-amber-400">{project.factors.urgency}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: `${project.factors.urgency}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Socio-Economic Vulnerability (Weight: 10%)</span>
                  <span className="font-mono font-bold text-emerald-400">{project.factors.vulnerability}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${project.factors.vulnerability}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Unfunded Investment Deficit Gap (Weight: 5%)</span>
                  <span className="font-mono font-bold text-blue-400">{project.factors.investmentGap}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full rounded-full" style={{ width: `${project.factors.investmentGap}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Projects Considered & Trade-Offs (Section 20 requirements) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Alternative Interventions Evaluated by Policy Engine:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.alternativeProjectsConsidered.map((alt, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">{alt.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      Score: {alt.score}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    <strong className="text-amber-400">Trade-Off Analysis:</strong> {alt.tradeOff}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Sources and Potential Limitations (Section 20 requirements) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-navy-950 border border-slate-800">
              <span className="text-slate-400 block font-bold mb-2">Input Datasets Utilized:</span>
              <ul className="space-y-1 text-slate-300">
                {project.dataSources.map((ds, idx) => (
                  <li key={idx} className="flex items-center space-x-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{ds}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-navy-950 border border-slate-800">
              <span className="text-slate-400 block font-bold mb-2">Potential Implementation Limitations:</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {project.potentialLimitations}
              </p>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-cyan-400">
                Estimated Delivery Window: {project.completionTimelineMonths} months
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-navy-950 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Exportable under Open Contracting Data Standard (OCDS)
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                closeExplainModal();
                setActiveTab('policy-simulator');
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors"
            >
              Test in What-If Simulator
            </button>

            <button
              onClick={closeExplainModal}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
