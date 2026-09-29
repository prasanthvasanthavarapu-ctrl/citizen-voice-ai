import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  ThumbsUp,
  MapPin,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getCategoryById } from '../../data/categories';
import { RequestStatus } from '../../types';

export const RequestTracker: React.FC = () => {
  const { citizenRequests, activeCountry, openPipelineModal } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTrackingId, setSelectedTrackingId] = useState<string>(
    citizenRequests[0]?.trackingId || 'CP-IN-2026-8841'
  );

  const matchedRequest = citizenRequests.find(
    (r) =>
      r.trackingId.toLowerCase() === selectedTrackingId.toLowerCase() ||
      r.trackingId.toLowerCase().includes(searchQuery.toLowerCase().trim())
  ) || citizenRequests[0];

  const milestones: { status: RequestStatus; label: string; desc: string }[] = [
    { status: 'under_review', label: '1. Ingested & Scrubbed', desc: 'Audio transcribed, language detected, PII removed' },
    { status: 'gap_identified', label: '2. Gap Identified', desc: 'Cross-referenced with GIS asset layer & demographics' },
    { status: 'project_formulated', label: '3. Project Formulated', desc: 'Synthesized into AI project recommendation brief' },
    { status: 'budget_allocated', label: '4. Budget Sanctioned', desc: 'Capital allocated in state/national infrastructure budget' },
    { status: 'in_execution', label: '5. In Execution', desc: 'Civil works under construction on site' },
    { status: 'completed', label: '6. Ground Verified', desc: 'Citizen verified before vs after impact metrics' },
  ];

  const getStatusIndex = (st: RequestStatus) => {
    switch (st) {
      case 'analyzing':
      case 'under_review':
        return 0;
      case 'gap_identified':
        return 1;
      case 'project_formulated':
        return 2;
      case 'budget_allocated':
        return 3;
      case 'in_execution':
        return 4;
      case 'completed':
        return 5;
      default:
        return 1;
    }
  };

  const currentIndex = getStatusIndex(matchedRequest?.status || 'gap_identified');

  return (
    <div className="space-y-8">
      {/* Tracking Search Bar */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20">
        <h3 className="text-base font-bold text-white mb-2 flex items-center space-x-2">
          <span>Search Request by Tracking Number</span>
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Every citizen request receives a transparent cryptographic tracking identifier registered on the Digital Public Good ledger.
        </p>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter ID (e.g. CP-IN-2026-8841)"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={() => {
              if (searchQuery.trim()) setSelectedTrackingId(searchQuery.trim());
            }}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
          >
            Track Status
          </button>
        </div>
      </div>

      {/* Matched Request Milestone Card */}
      {matchedRequest && (
        <div className="glass-card rounded-2xl p-6 border border-cyan-500/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-black text-white font-mono">
                  {matchedRequest.trackingId}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase">
                  {matchedRequest.channel} channel
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{matchedRequest.district}, {matchedRequest.region}</span>
                <span>•</span>
                <span>Submitted {matchedRequest.timestamp}</span>
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => openPipelineModal(1)}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-medium transition-all flex items-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Full AI Processing Pipeline</span>
              </button>
            </div>
          </div>

          {/* Citizen Quote */}
          <div className="bg-navy-950/80 rounded-xl p-4 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">
              Transcribed Native Request:
            </span>
            <p className="text-xs text-slate-200 italic mb-2">
              “{matchedRequest.originalText}”
            </p>
            <div className="text-[11px] text-cyan-300">
              <span className="text-slate-400 font-semibold">Analytical Translation: </span>
              {matchedRequest.translatedText}
            </div>
          </div>

          {/* Stepper Milestones */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
              Lifecycle Progress on Digital Public Infrastructure:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3">
              {milestones.map((m, idx) => {
                const isPast = idx <= currentIndex;
                const isCurrent = idx === currentIndex;

                return (
                  <div
                    key={m.status}
                    className={`rounded-xl p-3 border transition-all ${
                      isCurrent
                        ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                        : isPast
                        ? 'bg-slate-900/60 border-emerald-500/30 text-slate-300'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-cyan-400 text-slate-950'
                          : isPast
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isPast ? '✓' : idx + 1}
                      </span>
                      {isCurrent && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                      )}
                    </div>
                    <div className="font-bold text-xs">{m.label}</div>
                    <div className="text-[10px] text-slate-400 mt-1 leading-tight">{m.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Community Feed */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Nearby Community Voices Feed
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {citizenRequests.map((req) => {
            const cat = getCategoryById(req.categoryId);
            return (
              <div
                key={req.id}
                onClick={() => setSelectedTrackingId(req.trackingId)}
                className="glass-card rounded-xl p-4 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">
                      {req.trackingId}
                    </span>
                    <span
                      style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold"
                    >
                      {cat.name}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 line-clamp-2 mb-2">
                    “{req.originalText}”
                  </p>

                  <p className="text-[11px] text-slate-400">
                    <span className="text-slate-300 font-medium">{req.district}, {req.region}</span> • {req.detectedLanguage}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[10px] capitalize text-amber-400 font-medium">
                    Status: {req.status.replace('_', ' ')}
                  </span>
                  <div className="flex items-center space-x-1 text-slate-300">
                    <ThumbsUp className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[11px]">{req.upvotes}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
