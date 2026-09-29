import React, { useState } from 'react';
import {
  ShieldAlert,
  Cpu,
  Activity,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Users,
  Key,
  Database,
  Radio,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { citizenRequests, showToast } = useApp();
  const [activeAdminTab, setActiveAdminTab] = useState<'models' | 'pipelines' | 'moderation' | 'logs'>('models');

  const modelHealth = [
    { name: 'Speech-to-Text Whisper Fine-Tuned (Rayalaseema/Hindi/Portuguese)', type: 'Acoustic ASR', wer: '3.8%', latency: '140ms', status: 'Healthy', accuracy: '96.2%' },
    { name: 'Dialect Normalizer & Cross-Lingual Translation', type: 'Seq2Seq NMT', bleu: '42.4', latency: '95ms', status: 'Healthy', accuracy: '95.8%' },
    { name: 'Infrastructure 16-Category Multi-Label BERT', type: 'Classifier', f1: '96.4%', latency: '42ms', status: 'Healthy', accuracy: '96.5%' },
    { name: 'Urgency & Distress Sentiment Acoustic Scorer', type: 'BiLSTM Audio', auc: '0.94', latency: '58ms', status: 'Healthy', accuracy: '94.1%' },
    { name: 'Spatial Clustering & Hotspot Kernel Density', type: 'GeoSpatial GIS', eps: '0.04', latency: '210ms', status: 'Healthy', accuracy: '97.8%' },
  ];

  const pipelineStreams = [
    { name: 'WhatsApp Business API Webhook', throughput: '420 msg/sec', dropped: '0.0%', status: 'Active', latency: '45ms' },
    { name: 'National Voice IVR Telecom Gateway', throughput: '185 stream/sec', dropped: '0.01%', status: 'Active', latency: '120ms' },
    { name: '2-Way Rural SMS Bulk Ingest', throughput: '310 sms/sec', dropped: '0.0%', status: 'Active', latency: '80ms' },
    { name: 'Citizen Web Portal REST Endpoint', throughput: '95 req/sec', dropped: '0.0%', status: 'Active', latency: '28ms' },
    { name: 'Satellite GIS Copernicus Stream', throughput: '10 band/hr', dropped: '0.0%', status: 'Active', latency: '350ms' },
  ];

  const auditLogs = [
    { time: '20:58:14', level: 'INFO', module: 'Edge_PII_Scrubber', msg: 'Sanitized 14 requests. 0 raw names leaked to analytical lake.' },
    { time: '20:56:02', level: 'SUCCESS', module: 'AI_Priority_Engine', msg: 'Recomputed composite indices across 326 high-priority districts.' },
    { time: '20:51:40', level: 'INFO', module: 'Geo_Cluster_Daemon', msg: 'Aggregated 341 citizen voices into Hotspot #hs-in-01.' },
    { time: '20:47:19', level: 'WARN', module: 'Rate_Limiter', msg: 'Spike detected from regional IP cluster. Token bucket throttled.' },
    { time: '20:44:05', level: 'INFO', module: 'Model_Sync', msg: 'Hot-reloaded Telugu acoustic dictionary weights v2.6.4.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              DPI Administrator & Engineering Operations
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            System pipelines, AI model drift monitoring, data validation, and real-time security audit trails.
          </p>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>All 5 Core AI Models Online</span>
          </span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 text-xs">
        <button
          onClick={() => setActiveAdminTab('models')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            activeAdminTab === 'models'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          AI Model Health & Latency
        </button>

        <button
          onClick={() => setActiveAdminTab('pipelines')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            activeAdminTab === 'pipelines'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Data Pipeline Ingestion Bus
        </button>

        <button
          onClick={() => setActiveAdminTab('moderation')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            activeAdminTab === 'moderation'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Request Moderation Queue ({citizenRequests.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('logs')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            activeAdminTab === 'logs'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Live Security & Audit Logs
        </button>
      </div>

      {/* Models Tab */}
      {activeAdminTab === 'models' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white tracking-wide">
              Neural Network Runtime & Inference Metrics
            </h3>
            <span className="text-xs text-slate-400 font-mono">Quantized INT8 / TensorRT</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-navy-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Model Description</th>
                  <th className="py-3 px-4">Architecture</th>
                  <th className="py-3 px-4">Accuracy / Score</th>
                  <th className="py-3 px-4">p95 Latency</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {modelHealth.map((m, i) => (
                  <tr key={i} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white">{m.name}</td>
                    <td className="py-3 px-4 text-slate-400">{m.type}</td>
                    <td className="py-3 px-4 font-mono text-cyan-400">{m.accuracy}</td>
                    <td className="py-3 px-4 font-mono">{m.latency}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] border border-emerald-800">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pipelines Tab */}
      {activeAdminTab === 'pipelines' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white tracking-wide">
              Ingestion Stream Health & Webhook Queues
            </h3>
            <span className="text-xs text-emerald-400 font-mono">0 Dropped Packets</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pipelineStreams.map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{s.name}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-800 text-slate-400">
                  <div>
                    <span>Rate:</span>
                    <strong className="text-cyan-400 block font-mono">{s.throughput}</strong>
                  </div>
                  <div>
                    <span>Latency:</span>
                    <strong className="text-slate-200 block font-mono">{s.latency}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Moderation Queue Tab */}
      {activeAdminTab === 'moderation' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white tracking-wide">
              PII Sanitized Ingestion Queue
            </h3>
            <button
              onClick={() => showToast('All pending requests approved and committed to spatial layer.')}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-colors"
            >
              Approve All Clean Requests
            </button>
          </div>

          <div className="space-y-3">
            {citizenRequests.slice(0, 5).map((req) => (
              <div key={req.id} className="p-4 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between text-xs gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-cyan-400 font-bold">{req.trackingId}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {req.detectedLanguage}
                    </span>
                    <span className="text-emerald-400 text-[10px]">PII Scrubbed ✓</span>
                  </div>
                  <p className="text-slate-300 italic">“{req.originalText}”</p>
                  <p className="text-slate-400 text-[11px]">Translated: {req.translatedText}</p>
                </div>

                <div className="shrink-0 flex items-center space-x-2">
                  <button
                    onClick={() => showToast(`Request ${req.trackingId} approved!`)}
                    className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-medium"
                  >
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Audit Logs Tab */}
      {activeAdminTab === 'logs' && (
        <div className="bg-navy-950 rounded-2xl p-6 border border-slate-800 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-white font-bold">Immutable System Audit Logs (WORM Storage)</span>
            </div>
            <span>TLS 1.3 Audit Verified</span>
          </div>

          <div className="space-y-2 text-slate-300">
            {auditLogs.map((log, i) => (
              <div key={i} className="flex items-start space-x-3 p-2 rounded hover:bg-slate-900/60">
                <span className="text-slate-500 shrink-0">[{log.time}]</span>
                <span className={`shrink-0 font-bold ${log.level === 'SUCCESS' ? 'text-emerald-400' : log.level === 'WARN' ? 'text-amber-400' : 'text-cyan-400'}`}>
                  [{log.level}]
                </span>
                <span className="text-purple-400 shrink-0">[{log.module}]</span>
                <span className="text-slate-300">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
