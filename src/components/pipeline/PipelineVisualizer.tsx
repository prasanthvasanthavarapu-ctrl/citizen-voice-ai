import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Database,
  FileCode,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { PIPELINE_STAGES } from '../../data/mockPipeline';
import { useApp } from '../../context/AppContext';

export const PipelineVisualizer: React.FC = () => {
  const { isPipelineOpen, closePipelineModal, activePipelineStage } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(activePipelineStage || 1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    setCurrentStep(activePipelineStage || 1);
  }, [activePipelineStage]);

  // Automated step animation
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= PIPELINE_STAGES.length) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1600);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  if (!isPipelineOpen) return null;

  const activeStageData = PIPELINE_STAGES.find((s) => s.step === currentStep) || PIPELINE_STAGES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-navy-900 border border-cyan-500/40 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl shadow-cyan-950/80 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-navy-950/80">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  CivicPulse Multilingual AI Pipeline Inspector
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Step {currentStep} of {PIPELINE_STAGES.length}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                End-to-end transparent transformation from Citizen Voice to Policy Recommendation
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (currentStep >= PIPELINE_STAGES.length) setCurrentStep(1);
                setIsPlaying(!isPlaying);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 border border-cyan-500/40 text-xs font-medium transition-all"
            >
              {isPlaying ? <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span> : <Play className="w-3 h-3 fill-current" />}
              <span>{isPlaying ? 'Simulating Pipeline...' : 'Auto-Run Pipeline'}</span>
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStep(1);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Reset to Step 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={closePipelineModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pipeline Horizontal Stepper */}
        <div className="px-6 py-4 bg-navy-950/40 border-b border-slate-800/80 overflow-x-auto scrollbar-none">
          <div className="flex items-center space-x-2 min-w-max">
            {PIPELINE_STAGES.map((stg) => {
              const isPast = stg.step < currentStep;
              const isCurrent = stg.step === currentStep;

              return (
                <button
                  key={stg.step}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStep(stg.step);
                  }}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs transition-all ${
                    isCurrent
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30 scale-105'
                      : isPast
                      ? 'bg-slate-800/80 text-cyan-300 border border-cyan-800/40 hover:bg-slate-800'
                      : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:bg-slate-800/40'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isCurrent ? 'bg-slate-950 text-cyan-400 font-extrabold' : isPast ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isPast ? '✓' : stg.step}
                  </span>
                  <span>{stg.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body: Active Stage Details & Payload Inspector */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Stage Overview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card rounded-xl p-5 border border-cyan-500/30">
              <span className="text-xs uppercase font-semibold text-cyan-400 tracking-wider">
                Stage {activeStageData.step} Execution Detail
              </span>
              <h4 className="text-xl font-bold text-white mt-1 mb-2">
                {activeStageData.name}
              </h4>
              <p className="text-sm text-slate-300 mb-4">
                {activeStageData.shortDesc}
              </p>

              <div className="bg-navy-950/70 rounded-lg p-3 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Confidence Rating:</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {( (activeStageData.confidence || 0.95) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(activeStageData.confidence || 0.95) * 100}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400">Processing Latency:</span>
                  <span className="text-slate-200 font-mono">38ms</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">PII Compliance:</span>
                  <span className="text-cyan-400 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Anonymized</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Explainability note */}
            <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
              <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-300 mb-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>AI Explainability Note</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeStageData.explanation}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentStep <= 1}
                onClick={() => setCurrentStep((p) => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-xs font-medium text-slate-300 transition-colors"
              >
                Previous Step
              </button>

              <button
                disabled={currentStep >= PIPELINE_STAGES.length}
                onClick={() => setCurrentStep((p) => Math.min(PIPELINE_STAGES.length, p + 1))}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold text-slate-950 transition-colors flex items-center space-x-1"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* JSON Payload Inspector */}
          <div className="lg:col-span-7 flex flex-col h-full min-h-[300px]">
            <div className="bg-navy-950 rounded-xl border border-slate-800 p-4 flex-1 flex flex-col font-mono text-xs overflow-hidden shadow-inner">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
                <div className="flex items-center space-x-2">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-200 font-semibold">Live Stage Output Schema (JSON)</span>
                </div>
                <span className="text-[11px] text-cyan-400">REST / OpenAPI 3.1</span>
              </div>

              <div className="flex-1 overflow-y-auto bg-slate-950/80 p-3 rounded-lg border border-slate-900 text-emerald-400">
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed text-[11px]">
                  {JSON.stringify(activeStageData.samplePayload, null, 2)}
                </pre>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Verification Hash: SHA256:{Math.random().toString(16).substring(2, 10)}...</span>
                <span className="text-emerald-400">Status: PASS (0 Errors)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
