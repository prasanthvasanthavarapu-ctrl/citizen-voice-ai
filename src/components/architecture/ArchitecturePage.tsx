import React from 'react';
import {
  Layers,
  Cpu,
  Database,
  Globe2,
  Server,
  Sparkles,
  ArrowDown,
  ArrowRight,
  Shield,
  FileCode,
  HardDrive,
  GitBranch,
} from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  const architectureLayers = [
    {
      layer: '01. Ingestion & Omnichannel Boundary',
      color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300',
      badge: 'Edge Layer',
      components: [
        { title: 'Citizen Voice (IVR / WebRTC)', tech: 'Asterisk / FreeSWITCH / Web Audio' },
        { title: 'WhatsApp Business API Webhook', tech: 'Meta Cloud API / Node.js Proxy' },
        { title: 'National 2-Way SMS Gateway', tech: 'SMPP v3.4 / Kannel Gateway' },
        { title: 'Citizen Portal & Kiosks', tech: 'React 19 / Progressive Web App' },
      ],
    },
    {
      layer: '02. API Gateway & Security Perimeter',
      color: 'border-blue-500/40 bg-blue-950/20 text-blue-300',
      badge: 'Security & PII',
      components: [
        { title: 'Kong / Envoy API Gateway', tech: 'Rate Limiting / OAuth 2.0 / mTLS' },
        { title: 'Zero-Knowledge PII Scrubber', tech: 'Spacy NER / Presidio Anonymizer' },
        { title: 'Audit Logger & Cryptographic Hash', tech: 'WORM Storage / SHA-256 Ledger' },
      ],
    },
    {
      layer: '03. Multilingual Neural Intelligence Hub',
      color: 'border-purple-500/40 bg-purple-950/20 text-purple-300',
      badge: 'AI Core',
      components: [
        { title: 'Acoustic Dialect Classifier', tech: 'FastText / PyAnnote Audio' },
        { title: 'Phonetic Speech-to-Text', tech: 'Whisper Large v3 (Dialect Fine-tuned)' },
        { title: 'Cross-Lingual Normalizer', tech: 'NLLB-200 / OpenHathi Matrix' },
        { title: '16-Category Intent Classifier', tech: 'DistilBERT Multi-Label (TensorRT)' },
        { title: 'Urgency & Distress Scorer', tech: 'BiLSTM Audio Stress Embeddings' },
      ],
    },
    {
      layer: '04. Sovereign Data Lakehouse & GIS Storage',
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
      badge: 'Persistence',
      components: [
        { title: 'PostGIS Spatial Engine', tech: 'Spatial Indexing / GeoJSON Tiles' },
        { title: 'DuckDB Analytical Lakehouse', tech: 'Parquet / Census & Demographics' },
        { title: 'Redis In-Memory Cache', tech: 'Sub-second Tile & Session State' },
        { title: 'Vector Knowledge Base', tech: 'Qdrant / Milvus Semantic Cluster' },
      ],
    },
    {
      layer: '05. Decision Intelligence & AI Priority Engine',
      color: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
      badge: 'Analytics',
      components: [
        { title: 'Multi-Factor Priority Engine', tech: 'Explainable XAI (30/20/20/15/10/5)' },
        { title: 'Kernel Density Hotspot Clustering', tech: 'Scikit-learn DBSCAN / PySAL' },
        { title: 'What-If Infrastructure Simulator', tech: 'Linear Programming / Pareto ROI' },
        { title: 'Public Budget Reconciliation Bus', tech: 'Open Contracting Data Standard' },
      ],
    },
    {
      layer: '06. Presentation & Governance Studio',
      color: 'border-rose-500/40 bg-rose-950/20 text-rose-300',
      badge: 'Interfaces',
      components: [
        { title: 'National Government Dashboard', tech: 'React / Vite / Tailwind / Recharts' },
        { title: 'Interactive BRICS World Map', tech: 'Geospatial Vector / Leaflet SVG' },
        { title: 'Citizen Impact Public Tracker', tech: 'Ground-Verification Ledger' },
        { title: 'Floating CivicPulse Copilot', tech: 'Context-Aware RAG Assistant' },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          Digital Public Infrastructure Blueprint
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
          CivicPulse AI System Architecture
        </h1>
        <p className="text-slate-300 text-sm mt-2">
          End-to-end flow from edge voice intake across 100+ native dialects to national evidence-based capital investment decisions.
        </p>
      </div>

      {/* Layer-by-Layer Visual Stack */}
      <div className="space-y-4">
        {architectureLayers.map((layer, idx) => (
          <div key={idx} className="relative">
            <div className={`glass-card rounded-2xl p-5 border ${layer.color} shadow-lg`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800/80 mb-3 gap-2">
                <span className="font-bold text-sm text-white flex items-center space-x-2">
                  <span>{layer.layer}</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-slate-300 uppercase tracking-wider self-start sm:self-auto">
                  {layer.badge}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {layer.components.map((comp, ci) => (
                  <div key={ci} className="bg-navy-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-bold text-white text-xs block">{comp.title}</span>
                    <span className="font-mono text-[10px] text-cyan-400 block">{comp.tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connecting Flow Arrow */}
            {idx < architectureLayers.length - 1 && (
              <div className="flex justify-center my-2 text-cyan-500/50">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Technology Stack Matrix (Section 26) */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <FileCode className="w-5 h-5 text-cyan-400" />
          <span>Technology Stack Specifications (Section 26 Compliance)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-400 block uppercase tracking-wider text-[11px]">
              Frontend Stack
            </span>
            <ul className="space-y-1 text-slate-300 text-[11px]">
              <li>• React 19 / TypeScript 5.8</li>
              <li>• Vite 8 High-Performance Bundler</li>
              <li>• Tailwind CSS & Glassmorphism UI</li>
              <li>• Lucide Icons & Recharts</li>
              <li>• Web Speech API Native Integration</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
            <span className="font-bold text-purple-400 block uppercase tracking-wider text-[11px]">
              Backend & Services
            </span>
            <ul className="space-y-1 text-slate-300 text-[11px]">
              <li>• Python 3.13 / FastAPI Async REST</li>
              <li>• Pydantic v2 Schema Validation</li>
              <li>• OpenAPI 3.1 Contract Specification</li>
              <li>• Redis Tile Caching</li>
              <li>• Celery / RQ Task Distribution</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 block uppercase tracking-wider text-[11px]">
              Spatial Data & Analytics
            </span>
            <ul className="space-y-1 text-slate-300 text-[11px]">
              <li>• PostgreSQL 16 + PostGIS Extension</li>
              <li>• DuckDB Embedded Parquet Lake</li>
              <li>• Scikit-learn DBSCAN Clustering</li>
              <li>• Pandas / NumPy Vector Calculations</li>
              <li>• Open Contracting OCDS Schemas</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 block uppercase tracking-wider text-[11px]">
              Multilingual AI Core
            </span>
            <ul className="space-y-1 text-slate-300 text-[11px]">
              <li>• Whisper-v3 Speech-to-Text</li>
              <li>• Indic/BRICS Dialect Fine-Tuning</li>
              <li>• DistilBERT Intent Classifier</li>
              <li>• Explainable AI Transparent Factors</li>
              <li>• Microsoft Presidio PII Anonymizer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
