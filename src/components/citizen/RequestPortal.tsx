import React, { useState } from 'react';
import {
  MessageSquare,
  Mic,
  Smartphone,
  Search,
  Sparkles,
  MapPin,
  Camera,
  Send,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INFRASTRUCTURE_CATEGORIES } from '../../data/categories';
import { InfrastructureCategoryId } from '../../types';
import { VoiceRecorder } from './VoiceRecorder';
import { MessagingMock } from './MessagingMock';
import { RequestTracker } from './RequestTracker';

export const RequestPortal: React.FC = () => {
  const { t, addCitizenRequest, openPipelineModal, activeCountry } = useApp();
  const [activeChannel, setActiveChannel] = useState<'text' | 'voice' | 'messaging' | 'track'>('voice');

  // Text Form States
  const [textNeed, setTextNeed] = useState<string>('');
  const [category, setCategory] = useState<InfrastructureCategoryId>('drinking_water');
  const [locationName, setLocationName] = useState<string>('');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high' | 'critical'>('high');
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textNeed.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addCitizenRequest({
        channel: 'text',
        originalText: textNeed,
        detectedLanguage: 'Auto-Detected Text',
        translatedText: textNeed,
        categoryId: category,
        region: locationName || 'Local Region',
        district: 'District 1',
        urgency,
        urgencyScore: urgency === 'critical' ? 95 : urgency === 'high' ? 82 : 65,
        imageUrl: hasPhoto ? 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=500&auto=format&fit=crop&q=60' : undefined,
      });

      setIsSubmitting(false);
      setTextNeed('');
      setLocationName('');
      setHasPhoto(false);
      openPipelineModal(1);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Page Title & Mission Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          Citizen Voice Gateway • Public Infrastructure Ingestion
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
          {t.citizen.title}
        </h1>
        <p className="text-slate-300 text-sm mt-2">
          {t.citizen.subtitle}
        </p>
      </div>

      {/* Primary Channel Selector Tabs */}
      <div className="flex items-center justify-center p-1.5 bg-navy-900 rounded-2xl border border-slate-800 max-w-2xl mx-auto">
        <button
          onClick={() => setActiveChannel('voice')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeChannel === 'voice'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>Voice Recording</span>
        </button>

        <button
          onClick={() => setActiveChannel('text')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeChannel === 'text'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Type Request</span>
        </button>

        <button
          onClick={() => setActiveChannel('messaging')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeChannel === 'messaging'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>WhatsApp / SMS</span>
        </button>

        <button
          onClick={() => setActiveChannel('track')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeChannel === 'track'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Track Status</span>
        </button>
      </div>

      {/* Render Active Channel UI */}
      {activeChannel === 'voice' && <VoiceRecorder />}

      {activeChannel === 'messaging' && <MessagingMock />}

      {activeChannel === 'track' && <RequestTracker />}

      {activeChannel === 'text' && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30">
          <form onSubmit={handleTextSubmit} className="space-y-6">
            {/* Textarea */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                What development does your community need?
              </label>
              <textarea
                rows={4}
                value={textNeed}
                onChange={(e) => setTextNeed(e.target.value)}
                placeholder="e.g. Our village needs a reliable drinking water supply as borewells have completely dried up and the primary school has no access..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                required
              />
            </div>

            {/* Quick helper prompts */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-400">Quick examples:</span>
              <button
                type="button"
                onClick={() => setTextNeed('Our village needs a reliable drinking water supply with piped connections.')}
                className="text-cyan-400 hover:underline"
              >
                “Reliable drinking water supply”
              </button>
              <span className="text-slate-600">•</span>
              <button
                type="button"
                onClick={() => setTextNeed('Primary health clinic has no electricity for newborn vaccines.')}
                className="text-cyan-400 hover:underline"
              >
                “Clinic power backup”
              </button>
              <span className="text-slate-600">•</span>
              <button
                type="button"
                onClick={() => setTextNeed('Road becomes completely inaccessible during monsoon flood season.')}
                className="text-cyan-400 hover:underline"
              >
                “Monsoon road wash-out”
              </button>
            </div>

            {/* Category and Location Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Select Infrastructure Category:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as InfrastructureCategoryId)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {INFRASTRUCTURE_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Location (District / Village / Province):
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="e.g. Anantapur, Andhra Pradesh"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Urgency and Photo Attachment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Urgency Level:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['low', 'medium', 'high', 'critical'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setUrgency(lvl)}
                      className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                        urgency === lvl
                          ? lvl === 'critical'
                            ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20'
                            : 'bg-cyan-500 text-slate-950 border-cyan-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Supporting Photo Evidence:
                </label>
                <button
                  type="button"
                  onClick={() => setHasPhoto(!hasPhoto)}
                  className={`w-full py-2.5 px-3 rounded-xl border flex items-center justify-center space-x-2 text-xs font-medium transition-all ${
                    hasPhoto
                      ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>{hasPhoto ? 'Photo Attached (broken_borewell.jpg)' : 'Attach Ground Evidence Photo'}</span>
                </button>
              </div>
            </div>

            {/* Privacy notice and Submit button */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[11px] text-slate-400 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Protected by DPI Privacy Framework. Personal identifiers stripped.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !textNeed.trim()}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2"
              >
                <span>{isSubmitting ? 'Ingesting into AI Core...' : 'Submit to CivicPulse AI'}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
