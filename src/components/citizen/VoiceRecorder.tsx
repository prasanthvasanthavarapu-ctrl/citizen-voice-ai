import React, { useState, useEffect } from 'react';
import {
  Mic,
  Square,
  Sparkles,
  Volume2,
  CheckCircle2,
  Languages,
  ArrowRight,
  RefreshCw,
  Cpu,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { speechService, SAMPLE_VOICE_DEMOS } from '../../services/speechService';
import { getCategoryById } from '../../data/categories';
import { InfrastructureCategoryId } from '../../types';

export const VoiceRecorder: React.FC = () => {
  const { addCitizenRequest, openPipelineModal, activeCountry } = useApp();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [transcript, setTranscript] = useState<string>('');
  const [detectedLanguage, setDetectedLanguage] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [detectedCategory, setDetectedCategory] = useState<InfrastructureCategoryId>('drinking_water');
  const [confidence, setConfidence] = useState<number>(0.96);
  const [selectedDemoIndex, setSelectedDemoIndex] = useState<number>(0);
  const [isProcessed, setIsProcessed] = useState<boolean>(false);

  // Timer while recording
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    setIsProcessed(false);
    setTranscript('');

    const demo = SAMPLE_VOICE_DEMOS[selectedDemoIndex % SAMPLE_VOICE_DEMOS.length];

    // Try web speech or simulate progressively
    if (speechService.isSupported()) {
      speechService.startListening(
        (text, isFinal) => {
          setTranscript(text);
          if (isFinal) {
            handleStopRecording();
          }
        },
        (err) => {
          console.warn('Mic error, using preset fallback:', err);
        }
      );
    }

    // Auto simulate typing out transcript
    setTimeout(() => {
      setTranscript(demo.sampleSpeech);
    }, 1800);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    speechService.stopListening();

    const demo = SAMPLE_VOICE_DEMOS[selectedDemoIndex % SAMPLE_VOICE_DEMOS.length];
    setTranscript(demo.sampleSpeech);
    setDetectedLanguage(demo.languageName);
    setTranslatedText(demo.translation);
    setDetectedCategory(demo.category as InfrastructureCategoryId);
    setConfidence(0.96);
    setIsProcessed(true);
  };

  const handleSubmitVoiceRequest = () => {
    const demo = SAMPLE_VOICE_DEMOS[selectedDemoIndex % SAMPLE_VOICE_DEMOS.length];
    addCitizenRequest({
      country: demo.country,
      region: demo.region,
      district: 'Rural Mandal',
      channel: 'voice',
      originalText: transcript || demo.sampleSpeech,
      detectedLanguage: detectedLanguage || demo.languageName,
      translatedText: translatedText || demo.translation,
      responseLanguage: detectedLanguage || demo.languageName,
      categoryId: detectedCategory,
      urgency: 'critical',
      urgencyScore: 92,
      sentiment: 'distressed',
      audioDurationSec: recordingSeconds || 14,
      populationAffectedEst: 6400,
    });

    openPipelineModal(1);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const categoryMeta = getCategoryById(detectedCategory);

  return (
    <div className="space-y-6">
      {/* Sample Voice Presets Selector */}
      <div className="glass-card rounded-xl p-4 border border-cyan-500/20">
        <div className="flex items-center justify-between text-xs text-slate-300 mb-2.5">
          <span className="font-semibold text-cyan-400 flex items-center space-x-1.5">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Select Demo Citizen Voice Dialect:</span>
          </span>
          <span className="text-[11px] text-slate-400">100+ BRICS dialects supported</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {SAMPLE_VOICE_DEMOS.map((d, idx) => (
            <button
              key={d.languageName}
              onClick={() => {
                setSelectedDemoIndex(idx);
                setIsProcessed(false);
                setTranscript('');
              }}
              className={`p-2 rounded-lg text-left text-xs transition-all border ${
                selectedDemoIndex === idx
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold'
                  : 'bg-navy-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-[11px] text-slate-400">{d.region.split(',')[0]}</div>
              <div className="truncate font-semibold">{d.languageName.split(' ')[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Microphone Stage */}
      <div className="flex flex-col items-center justify-center p-8 glass-panel rounded-2xl border border-cyan-500/30 text-center relative overflow-hidden">
        {/* Pulsing ring during recording */}
        {isRecording && (
          <>
            <div className="absolute w-44 h-44 rounded-full bg-cyan-500/10 animate-ping pointer-events-none"></div>
            <div className="absolute w-60 h-60 rounded-full bg-cyan-400/5 animate-pulse pointer-events-none"></div>
          </>
        )}

        {/* Microphone Button */}
        <button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 ${
            isRecording
              ? 'bg-rose-600 hover:bg-rose-500 text-white scale-110 ring-4 ring-rose-400/40 shadow-rose-600/50'
              : 'bg-gradient-to-tr from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 hover:scale-105 shadow-cyan-500/30 ring-4 ring-cyan-500/20'
          }`}
        >
          {isRecording ? (
            <Square className="w-8 h-8 fill-current text-white" />
          ) : (
            <Mic className="w-9 h-9 text-slate-950" />
          )}
          <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">
            {isRecording ? 'Stop' : 'Speak'}
          </span>
        </button>

        {/* Timer & Waveform */}
        <div className="mt-5">
          <div className="font-mono text-lg font-bold text-cyan-300">
            {isRecording ? formatTime(recordingSeconds) : '00:00'}
          </div>

          <div className="flex items-center justify-center space-x-1 h-8 mt-2">
            {[24, 45, 18, 60, 32, 50, 20, 68, 40, 28, 55, 30].map((h, i) => (
              <span
                key={i}
                style={{
                  height: isRecording ? `${h}%` : '15%',
                  animationDelay: `${i * 0.1}s`,
                }}
                className={`w-1 rounded-full transition-all duration-200 ${
                  isRecording ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'
                }`}
              ></span>
            ))}
          </div>

          <p className="text-xs text-slate-400 mt-2">
            {isRecording
              ? 'Listening to speech in real-time... Tap STOP when done.'
              : 'Tap microphone to speak in Telugu, Hindi, Portuguese, Russian, Mandarin or Zulu.'}
          </p>
        </div>
      </div>

      {/* Voice Processing Results (Section 5 requirements) */}
      {isProcessed && (
        <div className="glass-card rounded-2xl p-6 border border-cyan-500/40 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Real-Time Speech-to-Text & AI Normalization</span>
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{(confidence * 100).toFixed(0)}% Transcription Confidence</span>
            </span>
          </div>

          {/* Original Transcribed Text */}
          <div className="bg-navy-950/80 rounded-xl p-4 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">
              Raw Transcribed Audio:
            </span>
            <p className="text-sm font-medium text-white italic">
              “{transcript}”
            </p>
          </div>

          {/* 3 AI Detection Badges from Section 5 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Language Detected</span>
              <span className="text-xs font-bold text-cyan-300 font-mono mt-0.5 block">
                {detectedLanguage}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">AI Category</span>
              <span className="text-xs font-bold text-amber-300 font-mono mt-0.5 block">
                {categoryMeta.name}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Urgency Score</span>
              <span className="text-xs font-bold text-rose-400 font-mono mt-0.5 block">
                Critical (92 / 100)
              </span>
            </div>
          </div>

          {/* Analytical Translation (Common Schema) */}
          <div className="bg-cyan-950/30 rounded-xl p-4 border border-cyan-500/20">
            <span className="text-[11px] font-semibold text-cyan-400 block mb-1">
              Translated for Analytical Engine (Common Representation):
            </span>
            <p className="text-xs text-slate-200">
              “{translatedText}”
            </p>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSubmitVoiceRequest}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center space-x-2"
            >
              <span>Submit to AI Processing Pipeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
