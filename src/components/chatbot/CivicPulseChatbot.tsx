import React, { useState } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  HelpCircle,
  FileText,
  MapPin,
  TrendingDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BRICS_COUNTRIES } from '../../data/bricsData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  citations?: { label: string; actionTab: string }[];
  evidenceSnippet?: string;
}

export const CivicPulseChatbot: React.FC = () => {
  const { setActiveTab, activeCountry } = useApp();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hello, I am CivicPulse AI, your Digital Public Infrastructure intelligence copilot. Ask me anything regarding citizen demand hotspots, infrastructure gaps, capital allocations, or regional priorities across BRICS nations.',
      time: 'Just now',
      citations: [
        { label: 'View Demand Hotspots', actionTab: 'hotspots' },
        { label: 'What-If Simulator', actionTab: 'policy-simulator' },
      ],
    },
  ]);

  const presetQuestions = [
    'Which districts have the highest water infrastructure demand?',
    'Where should the government prioritize rural healthcare?',
    'How many people are affected by poor road connectivity?',
    'Which regions have the largest infrastructure funding gap?',
    'What projects could be funded with ₹1,000 crore?',
    'Which infrastructure problem should policymakers investigate in this region?',
  ];

  const handleAsk = (query: string) => {
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      time: 'Just now',
    };

    setChatLog((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let citations: { label: string; actionTab: string }[] = [];
      let evidenceSnippet = '';

      const q = query.toLowerCase();

      if (q.includes('water')) {
        replyText =
          'Citizen feedback indicates elevated demand for drinking water infrastructure concentrated in Anantapur (Andhra Pradesh, India), Baixada Santista (Brazil), and Alfred Nzo (Eastern Cape, South Africa). In Anantapur alone, 18,430 verified voice requests report that 72% of borewells have failed, creating an acute unfunded deficit of ₹36 Cr.';
        citations = [{ label: 'Inspect Anantapur Hotspot', actionTab: 'hotspots' }, { label: 'Water Gap Dossier', actionTab: 'gap-analysis' }];
        evidenceSnippet = 'Data Cross-Reference: 18,430 voice requests + CGWB Aquifer Depletion Index (86/100) + 61% baseline household access.';
      } else if (q.includes('healthcare') || q.includes('health') || q.includes('clinic')) {
        replyText =
          'Rural healthcare priority is concentrated in Kalahandi (Odisha, India) and Vhembe (Limpopo, South Africa). High maternal mortality (2.8x benchmark) and non-existent cold-chain storage affect 84,000 tribal citizens. AI recommends deploying 6 modular prefabricated PHCs with solar cold-chains.';
        citations = [{ label: 'View Healthcare Recommendations', actionTab: 'priority-engine' }];
        evidenceSnippet = 'NFHS-5 District Health Matrix: Maternal emergency transit time currently averages 3.5 hours.';
      } else if (q.includes('road') || q.includes('connectivity')) {
        replyText =
          'Over 412,000 citizens across Guizhou (China) and Barmer border zones (India) suffer severe economic isolation due to seasonal road washouts. Mountain unpaved gravel passes lead to a 65% loss in agricultural transit efficiency during wet monsoon seasons.';
        citations = [{ label: 'Inspect Highway Recommendations', actionTab: 'priority-engine' }];
        evidenceSnippet = 'GIS Asset Register: 48km mountain gravel road washed out in torrential mudslides.';
      } else if (q.includes('gap') || q.includes('funding')) {
        replyText =
          'The largest absolute infrastructure gaps are Majuli Island flood embankments (₹62 Cr deficit), Sakha Republic arctic heating boilers (48M ₽ gap), and Alfred Nzo water reticulation (39M ZAR deficit). These regions demonstrate extreme climatic vulnerability alongside high citizen demand.';
        citations = [{ label: 'Review Gap Analysis', actionTab: 'gap-analysis' }];
        evidenceSnippet = 'Open Contracting OCDS Register: Sanctioned capital expenditure falls 46% below engineering cost estimates.';
      } else if (q.includes('1,000') || q.includes('1000') || q.includes('crore') || q.includes('funded')) {
        replyText =
          'With ₹1,000 Crore allocated capital, CivicPulse AI What-If Simulator projects funding 6 major infrastructure projects simultaneously, benefiting approximately 4.85M citizens and reducing regional infrastructure gaps by 68.4%.';
        citations = [{ label: 'Test in Policy Simulator', actionTab: 'policy-simulator' }];
        evidenceSnippet = 'Simulation Algorithm: Greedy allocation across Pareto-optimal social return frontier.';
      } else {
        // Section 34 sample question fallback
        replyText =
          'Citizen feedback indicates elevated demand for drinking water infrastructure. This demand overlaps with lower infrastructure-access indicators and affects a substantial population. The system therefore flags the region for policymaker review.';
        citations = [{ label: 'Explore Evidence Brief', actionTab: 'priority-engine' }];
        evidenceSnippet = 'Multi-Factor Index: Citizen Demand (92%) + Infrastructure Gap (88%) + Population Impact (81%).';
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        time: 'Just now',
        citations,
        evidenceSnippet,
      };

      setChatLog((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-2xl shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-2 border-white/20 group"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-slate-950" />
        ) : (
          <div className="relative">
            <Bot className="w-6 h-6 text-slate-950" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse"></span>
          </div>
        )}
      </button>

      {/* Floating Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl bg-navy-950 border border-cyan-500/40 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-navy-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-md">
                <Sparkles className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <div className="font-bold text-white text-sm flex items-center space-x-1.5">
                  <span>CivicPulse Copilot</span>
                  <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-mono">
                    AI DPI
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Contextual BRICS Civic Intelligence</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-navy-950/80">
            {chatLog.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}>
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed ${
                      isUser
                        ? 'bg-cyan-500 text-slate-950 font-medium rounded-br-none shadow-md'
                        : 'bg-navy-900 text-slate-200 border border-slate-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Underlying Evidence Snippet */}
                    {msg.evidenceSnippet && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-cyan-300 bg-navy-950/60 p-2 rounded-lg">
                        <span className="text-slate-400 block font-semibold mb-0.5">Supporting Evidence:</span>
                        {msg.evidenceSnippet}
                      </div>
                    )}

                    {/* Citations / Navigation Buttons */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800 flex flex-wrap gap-1.5">
                        {msg.citations.map((c, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setActiveTab(c.actionTab);
                              setIsOpen(false);
                            }}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[10px] font-semibold transition-all flex items-center space-x-1"
                          >
                            <span>{c.label}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-500 px-1">{msg.time}</span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center space-x-1.5 bg-navy-900 border border-slate-800 p-3 rounded-2xl rounded-bl-none max-w-[120px] text-cyan-400 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[10px] text-slate-400 ml-1">Analyzing...</span>
              </div>
            )}
          </div>

          {/* Quick Preset Questions Scrollbar */}
          <div className="p-2 bg-navy-900 border-t border-slate-800 overflow-x-auto scrollbar-none flex items-center space-x-1.5 text-[10px]">
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleAsk(q)}
                className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-navy-900 border-t border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk(inputVal)}
              placeholder="Ask CivicPulse AI about infrastructure needs..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={() => handleAsk(inputVal)}
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-transform active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
