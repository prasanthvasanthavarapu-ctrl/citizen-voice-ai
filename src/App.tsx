import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { RoleBanner } from './components/layout/RoleBanner';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { RequestPortal } from './components/citizen/RequestPortal';
import { NationalDashboard } from './components/dashboard/NationalDashboard';
import { HotspotsPage } from './components/hotspots/HotspotsPage';
import { GapAnalysisPage } from './components/gaps/GapAnalysisPage';
import { PriorityEnginePage } from './components/engine/PriorityEnginePage';
import { PolicySimulatorPage } from './components/simulator/PolicySimulatorPage';
import { ImpactTrackerPage } from './components/impact/ImpactTrackerPage';
import { DpgPrivacyPage } from './components/dpg/DpgPrivacyPage';
import { ArchitecturePage } from './components/architecture/ArchitecturePage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PipelineVisualizer } from './components/pipeline/PipelineVisualizer';
import { ExplainableAiModal } from './components/engine/ExplainableAiModal';
import { CivicPulseChatbot } from './components/chatbot/CivicPulseChatbot';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, toastMessage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-md p-3.5 rounded-xl bg-navy-900 border border-cyan-400 text-white shadow-2xl flex items-center space-x-2.5 animate-fadeIn">
          <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Dynamic Role Banner */}
      <RoleBanner />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {activeTab === 'overview' && <HeroSection />}
        {activeTab === 'citizen-portal' && <RequestPortal />}
        {activeTab === 'intelligence' && <NationalDashboard />}
        {activeTab === 'hotspots' && <HotspotsPage />}
        {activeTab === 'gap-analysis' && <GapAnalysisPage />}
        {activeTab === 'priority-engine' && <PriorityEnginePage />}
        {activeTab === 'policy-simulator' && <PolicySimulatorPage />}
        {activeTab === 'impact-tracker' && <ImpactTrackerPage />}
        {activeTab === 'dpg-principles' && <DpgPrivacyPage />}
        {activeTab === 'architecture' && <ArchitecturePage />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Modals & Overlays */}
      <PipelineVisualizer />
      <ExplainableAiModal />

      {/* Floating AI Assistant */}
      <CivicPulseChatbot />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
