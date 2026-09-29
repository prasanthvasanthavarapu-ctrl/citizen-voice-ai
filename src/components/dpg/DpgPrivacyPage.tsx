import React from 'react';
import {
  Shield,
  Lock,
  Globe2,
  Users,
  Cpu,
  BarChart4,
  Layers,
  CheckCircle2,
  FileCheck,
  AlertCircle,
  Database,
  ExternalLink,
} from 'lucide-react';
import { DATA_SOURCES_CATALOGUE } from '../../data/projects';

export const DpgPrivacyPage: React.FC = () => {
  const dpgPrinciples = [
    {
      title: 'Open & Interoperable',
      icon: '🌍',
      desc: 'Built on open APIs, standard geospatial schemas (GeoJSON/PostGIS), and aligned with GovStack and MOSIP Digital Public Infrastructure specifications.',
    },
    {
      title: 'Radically Inclusive',
      icon: '🤝',
      desc: 'Multilingual support for 100+ native dialects, voice IVR for non-literate citizens, and multi-channel intake via WhatsApp, SMS, and simple kiosks.',
    },
    {
      title: 'Privacy-Preserving',
      icon: '🔐',
      desc: 'Zero personal data exposed on public dashboards. Automated boundary PII tokenization, end-to-end TLS 1.3 encryption, and differential privacy aggregation.',
    },
    {
      title: 'Responsible AI & Auditability',
      icon: '🧠',
      desc: 'Advisory-only AI engine with full mathematical factor transparency (30/20/20/15/10/5%). Constant bias drift monitoring and strict human oversight.',
    },
    {
      title: 'Evidence-Based Governance',
      icon: '📊',
      desc: 'Eliminates political guesswork by fusing spontaneous citizen voices with physical asset registers, census demographics, and approved capital budgets.',
    },
    {
      title: 'Scalable Architecture',
      icon: '🚀',
      desc: 'Cloud-native, containerized microservices engineered to adapt across India, Brazil, Russia, China, South Africa and global south partners.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          Trust, Security & Global Standards
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
          Built as a Digital Public Good (DPG)
        </h1>
        <p className="text-slate-300 text-sm mt-2">
          Designed in accordance with the United Nations Digital Public Goods Alliance standard. Committed to radical transparency, strict citizen privacy, and algorithmic accountability.
        </p>
      </div>

      {/* 6 DPG Principles Grid (Section 22) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dpgPrinciples.map((p, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-800/80 text-[10px] text-cyan-400 font-mono">
              DPG Standard 54 CFR Compliance
            </div>
          </div>
        ))}
      </div>

      {/* Privacy & Trust Architecture (Section 21) */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              <span>Citizen Privacy & Data Protection Framework</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Personal citizen data is strictly confidential and never displayed on public analytics screens.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
            Zero PII Leakage
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1.5">
            <span className="font-bold text-cyan-400 block">1. Edge PII Scrubbing</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Names, phone numbers, and IP addresses are stripped at the API boundary before storing or feeding to LLMs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1.5">
            <span className="font-bold text-emerald-400 block">2. Encryption Standards</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              All audio streams and texts are protected by TLS 1.3 in-transit and AES-256 at-rest with FIPS 140-3 HSM key storage.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1.5">
            <span className="font-bold text-purple-400 block">3. Role-Based Access (RBAC)</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Government officials access aggregated statistical spatial demand only; raw individual voices are segregated.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-400 block">4. Algorithmic Bias Audit</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Quarterly automated parity tests ensure rural, tribal, and minority dialect requests receive equal priority weighting.
            </p>
          </div>
        </div>
      </div>

      {/* Data Sources Catalogue (Section 19) */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>National Data Sources Catalogue</span>
            </h3>
            <p className="text-xs text-slate-400">
              Complete inventory of feeds and analytical matrices powering CivicPulse AI
            </p>
          </div>
          <span className="text-xs text-slate-400">
            Open Data Registry Standard v1.2
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-navy-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Data Source Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Provider / Authority</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4">Coverage</th>
                <th className="py-3 px-4 text-center">Quality Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {DATA_SOURCES_CATALOGUE.map((ds) => (
                <tr key={ds.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{ds.name}</div>
                    <div className="text-[10px] text-slate-400">{ds.description}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      {ds.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{ds.provider}</td>
                  <td className="py-3 px-4 font-mono text-cyan-400">{ds.lastUpdated}</td>
                  <td className="py-3 px-4 text-slate-400">{ds.coverage}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      {ds.qualityScore}%
                    </span>
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
