import React, { createContext, useContext, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  UserRole,
  BricsCountryCode,
  LanguageCode,
  CitizenRequest,
  DemandHotspot,
  InfrastructureGap,
  AIRecommendation,
  ImpactProject,
  InfrastructureCategoryId,
} from '../types';
import { BRICS_COUNTRIES, INITIAL_DEMAND_HOTSPOTS, INITIAL_INFRASTRUCTURE_GAPS, INITIAL_CITIZEN_REQUESTS } from '../data/bricsData';
import { AI_PROJECT_RECOMMENDATIONS, IMPACT_PROJECTS } from '../data/projects';
import { TRANSLATIONS } from '../data/translations';
import { TranslationDictionary } from '../types/i18n';

interface AppContextType {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeCountry: BricsCountryCode;
  setActiveCountry: (code: BricsCountryCode) => void;
  activeLanguage: LanguageCode;
  setActiveLanguage: (lang: LanguageCode) => void;
  t: TranslationDictionary;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  citizenRequests: CitizenRequest[];
  hotspots: DemandHotspot[];
  gaps: InfrastructureGap[];
  recommendations: AIRecommendation[];
  impactProjects: ImpactProject[];
  addCitizenRequest: (req: Partial<CitizenRequest>) => CitizenRequest;
  triggerDemoSimulation: () => void;
  isPipelineOpen: boolean;
  activePipelineStage: number;
  openPipelineModal: (stage?: number) => void;
  closePipelineModal: () => void;
  selectedProjectForExplain: AIRecommendation | null;
  openExplainModal: (project: AIRecommendation) => void;
  closeExplainModal: () => void;
  selectedCategory: InfrastructureCategoryId | 'ALL';
  setSelectedCategory: (cat: InfrastructureCategoryId | 'ALL') => void;
  selectedUrgency: string;
  setSelectedUrgency: (urg: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('official');
  const [activeCountry, setActiveCountry] = useState<BricsCountryCode>('IN');
  const [activeLanguage, setActiveLanguage] = useState<LanguageCode>('en');
  const [activeTab, setActiveTab] = useState<string>('overview');

  const [citizenRequests, setCitizenRequests] = useState<CitizenRequest[]>(INITIAL_CITIZEN_REQUESTS);
  const [hotspots] = useState<DemandHotspot[]>(INITIAL_DEMAND_HOTSPOTS);
  const [gaps] = useState<InfrastructureGap[]>(INITIAL_INFRASTRUCTURE_GAPS);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>(AI_PROJECT_RECOMMENDATIONS);
  const [impactProjects] = useState<ImpactProject[]>(IMPACT_PROJECTS);

  // Modals & Inspection
  const [isPipelineOpen, setIsPipelineOpen] = useState<boolean>(false);
  const [activePipelineStage, setActivePipelineStage] = useState<number>(1);
  const [selectedProjectForExplain, setSelectedProjectForExplain] = useState<AIRecommendation | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<InfrastructureCategoryId | 'ALL'>('ALL');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('ALL');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const t = TRANSLATIONS[activeLanguage] || TRANSLATIONS.en;

  const addCitizenRequest = (reqData: Partial<CitizenRequest>): CitizenRequest => {
    const trackingNum = Math.floor(1000 + Math.random() * 9000);
    const newReq: CitizenRequest = {
      id: `req-${Date.now()}`,
      trackingId: `CP-${activeCountry}-2026-${trackingNum}`,
      country: reqData.country || activeCountry,
      region: reqData.region || 'Regional District',
      district: reqData.district || 'Rural Center',
      channel: reqData.channel || 'portal',
      originalText: reqData.originalText || '',
      detectedLanguage: reqData.detectedLanguage || 'Auto-Detected',
      translatedText: reqData.translatedText || reqData.originalText || '',
      responseLanguage: reqData.responseLanguage || 'English',
      categoryId: reqData.categoryId || 'drinking_water',
      urgency: reqData.urgency || 'high',
      urgencyScore: reqData.urgencyScore || 85,
      sentiment: reqData.sentiment || 'urgent',
      status: 'analyzing',
      timestamp: 'Just now',
      populationAffectedEst: reqData.populationAffectedEst || 5000,
      upvotes: 1,
      imageUrl: reqData.imageUrl,
      audioDurationSec: reqData.audioDurationSec,
      confidenceScore: 0.96,
    };

    setCitizenRequests((prev) => [newReq, ...prev]);
    showToast(`Request registered: ${newReq.trackingId}. Fed into AI Processing Pipeline!`);

    // Celebrate and trigger visual pipeline
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (e) {
      // ignore
    }

    return newReq;
  };

  const triggerDemoSimulation = () => {
    const demoItems = [
      {
        text: 'మా గ్రామంలో పారిశుధ్య డ్రైనేజీ లేక రోడ్డుపై మురుగునీరు పారుతోంది. వెంటనే అండర్‌గ్రౌండ్ డ్రైనేజీ అవసరం.',
        lang: 'Telugu (తెలుగు)',
        trans: 'Our village lacks sewage drainage, causing wastewater to flood roads. Underground drainage required urgently.',
        cat: 'sanitation' as InfrastructureCategoryId,
        region: 'Andhra Pradesh',
        country: 'IN' as BricsCountryCode,
      },
      {
        text: 'A ponte de madeira que liga nossa vila agrícola caiu durante a cheia do rio. Precisamos de ponte de concreto.',
        lang: 'Portuguese (Português)',
        trans: 'The wooden bridge connecting our farming village collapsed during the river flood. Concrete bridge required.',
        cat: 'roads' as InfrastructureCategoryId,
        region: 'Bahia',
        country: 'BR' as BricsCountryCode,
      },
      {
        text: 'В нашей районной больнице отсутствует резервный генератор электроэнергии. Просим выделить средства.',
        lang: 'Russian (Русский)',
        trans: 'Our district hospital lacks emergency backup power generator. Urgent funding allocation requested.',
        cat: 'healthcare' as InfrastructureCategoryId,
        region: 'Krasnoyarsk',
        country: 'RU' as BricsCountryCode,
      },
    ];

    const randomPick = demoItems[Math.floor(Math.random() * demoItems.length)];
    addCitizenRequest({
      country: randomPick.country,
      region: randomPick.region,
      district: 'Priority Ward',
      channel: 'voice',
      originalText: randomPick.text,
      detectedLanguage: randomPick.lang,
      translatedText: randomPick.trans,
      responseLanguage: randomPick.lang,
      categoryId: randomPick.cat,
      urgency: 'critical',
      urgencyScore: 92,
      sentiment: 'distressed',
      populationAffectedEst: 8200,
    });

    setIsPipelineOpen(true);
    setActivePipelineStage(1);
  };

  const openPipelineModal = (stage: number = 1) => {
    setActivePipelineStage(stage);
    setIsPipelineOpen(true);
  };

  const closePipelineModal = () => {
    setIsPipelineOpen(false);
  };

  const openExplainModal = (project: AIRecommendation) => {
    setSelectedProjectForExplain(project);
  };

  const closeExplainModal = () => {
    setSelectedProjectForExplain(null);
  };

  return (
    <AppContext.Provider
      value={{
        activeRole,
        setActiveRole,
        activeCountry,
        setActiveCountry,
        activeLanguage,
        setActiveLanguage,
        t,
        activeTab,
        setActiveTab,
        citizenRequests,
        hotspots,
        gaps,
        recommendations,
        impactProjects,
        addCitizenRequest,
        triggerDemoSimulation,
        isPipelineOpen,
        activePipelineStage,
        openPipelineModal,
        closePipelineModal,
        selectedProjectForExplain,
        openExplainModal,
        closeExplainModal,
        selectedCategory,
        setSelectedCategory,
        selectedUrgency,
        setSelectedUrgency,
        selectedRegion,
        setSelectedRegion,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
