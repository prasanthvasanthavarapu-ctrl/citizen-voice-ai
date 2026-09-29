import React, { useState } from 'react';
import {
  Send,
  MessageCircle,
  Smartphone,
  CheckCheck,
  Sparkles,
  Bot,
  User,
  Paperclip,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InfrastructureCategoryId } from '../../types';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  badge?: string;
}

export const MessagingMock: React.FC = () => {
  const { addCitizenRequest, openPipelineModal } = useApp();
  const [platform, setPlatform] = useState<'whatsapp' | 'telegram' | 'sms' | 'gov'>('whatsapp');
  const [inputMessage, setInputMessage] = useState<string>('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Namaste! Welcome to CivicPulse AI GovAssist. You can send infrastructure issues in any language: Hindi, Telugu, Tamil, English, Portuguese, etc. What does your community need?',
      time: '10:00 AM',
      badge: 'CivicPulse DPI Bot',
    },
    {
      id: '2',
      sender: 'user',
      text: 'మా గ్రామంలో తాగునీటి సరఫరా సరిగ్గా లేదు, బోర్లు ఎండిపోయాయి. ట్యాంకర్లు రావడం లేదు.',
      time: '10:01 AM',
    },
    {
      id: '3',
      sender: 'bot',
      text: '✅ Language detected: Telugu (తెలుగు).\nCategorized: Drinking Water & Sanitation.\nYour need has been registered under Tracking ID: CP-IN-2026-8841.\nWe are combining this with satellite groundwater data and ongoing Jal Jeevan Mission funds.',
      time: '10:01 AM',
      badge: 'AI Pipeline Verified',
    },
  ]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: inputMessage,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    const originalText = inputMessage;
    setInputMessage('');

    // Simulate bot reply
    setTimeout(() => {
      const trackingCode = `CP-IN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const botReply: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: `✅ Request received and validated!\nTracking ID: ${trackingCode}\nTranslated to analytical core. Our AI Priority Engine has queued this region for gap analysis.`,
        time: 'Just now',
        badge: 'CivicPulse DPI Bot',
      };
      setMessages((prev) => [...prev, botReply]);

      addCitizenRequest({
        channel: platform === 'gov' ? 'portal' : platform,
        originalText,
        detectedLanguage: 'Auto-Detected',
        translatedText: `Citizen demand via ${platform}: ${originalText}`,
        categoryId: 'drinking_water' as InfrastructureCategoryId,
        urgency: 'high',
        urgencyScore: 88,
      });
    }, 1000);
  };

  const platformThemes = {
    whatsapp: {
      name: 'WhatsApp Business API',
      headerBg: 'bg-emerald-700',
      activeTab: 'bg-emerald-600 text-white',
      accent: 'text-emerald-400',
    },
    telegram: {
      name: 'Telegram GovBot',
      headerBg: 'bg-sky-700',
      activeTab: 'bg-sky-600 text-white',
      accent: 'text-sky-400',
    },
    sms: {
      name: 'National 2-Way SMS Gateway',
      headerBg: 'bg-purple-800',
      activeTab: 'bg-purple-600 text-white',
      accent: 'text-purple-400',
    },
    gov: {
      name: 'National Citizen Chatbot (DPI)',
      headerBg: 'bg-slate-900',
      activeTab: 'bg-cyan-600 text-slate-950 font-bold',
      accent: 'text-cyan-400',
    },
  };

  const currentTheme = platformThemes[platform];

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Platform Switcher Tabs */}
      <div className="flex items-center justify-center space-x-2 bg-navy-950/80 p-1.5 rounded-xl border border-slate-800">
        <button
          onClick={() => setPlatform('whatsapp')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            platform === 'whatsapp' ? platformThemes.whatsapp.activeTab : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          📱 WhatsApp Bot
        </button>
        <button
          onClick={() => setPlatform('telegram')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            platform === 'telegram' ? platformThemes.telegram.activeTab : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          ✈️ Telegram
        </button>
        <button
          onClick={() => setPlatform('sms')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            platform === 'sms' ? platformThemes.sms.activeTab : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          💬 2-Way SMS
        </button>
        <button
          onClick={() => setPlatform('gov')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            platform === 'gov' ? platformThemes.gov.activeTab : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🏛️ Gov Kiosk
        </button>
      </div>

      {/* Simulated Smartphone Container */}
      <div className="rounded-3xl border-4 border-slate-700 bg-navy-950 overflow-hidden shadow-2xl flex flex-col h-[520px]">
        {/* Phone Top Notch / Header */}
        <div className={`${currentTheme.headerBg} p-3.5 text-white flex items-center justify-between shadow-md`}>
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-xs flex items-center space-x-1.5">
                <span>CivicPulse GovAssist</span>
                <CheckCircle className="w-3.5 h-3.5 text-cyan-300" />
              </div>
              <div className="text-[10px] text-white/80">{currentTheme.name} • Verified</div>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-black/30 font-mono">24/7 AI DPI</span>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0a1120] text-xs">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
              >
                {m.badge && (
                  <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider px-1">
                    {m.badge}
                  </span>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm whitespace-pre-line leading-relaxed ${
                    isUser
                      ? 'bg-cyan-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700'
                  }`}
                >
                  {m.text}
                  <div
                    className={`text-[9px] mt-1 flex items-center justify-end space-x-1 ${
                      isUser ? 'text-cyan-200' : 'text-slate-400'
                    }`}
                  >
                    <span>{m.time}</span>
                    {isUser && <CheckCheck className="w-3 h-3 text-cyan-200" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-1.5 bg-navy-900 border-t border-slate-800 flex items-center space-x-1.5 overflow-x-auto scrollbar-none text-[11px]">
          <button
            onClick={() => setInputMessage('We need solar microgrid in Barmer district for our hospital.')}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap"
          >
            ⚡ Solar microgrid in Barmer
          </button>
          <button
            onClick={() => setInputMessage('Precisamos de saneamento básico nas favelas de Santos.')}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap"
          >
            🇧🇷 Saneamento em Santos
          </button>
          <button
            onClick={() => setInputMessage('Village school requires high speed fiber connection.')}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap"
          >
            🌐 Village School Fiber
          </button>
        </div>

        {/* Chat Input Bar */}
        <div className="p-2.5 bg-navy-900 border-t border-slate-800 flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your community need in any language..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-transform active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
