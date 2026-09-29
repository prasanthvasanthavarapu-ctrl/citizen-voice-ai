import { LanguageCode } from './index';

export interface LanguageMeta {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export interface TranslationDictionary {
  nav: {
    overview: string;
    citizenPortal: string;
    intelligence: string;
    hotspots: string;
    gapAnalysis: string;
    priorityEngine: string;
    policySimulator: string;
    impactTracker: string;
    dpgPrinciples: string;
    architecture: string;
    admin: string;
    launchDemo: string;
    role: string;
  };
  hero: {
    headline: string;
    subtitle: string;
    exploreBtn: string;
    submitBtn: string;
    livePdpBadge: string;
  };
  stats: {
    requests: string;
    gaps: string;
    regions: string;
    aiRecommendations: string;
    completed: string;
    citizensImpacted: string;
  };
  citizen: {
    title: string;
    subtitle: string;
    textTab: string;
    voiceTab: string;
    chatTab: string;
    textPlaceholder: string;
    submitText: string;
    recording: string;
    startRecording: string;
    stopRecording: string;
    detectedLanguage: string;
    translatedForAnalysis: string;
    categoryDetected: string;
    locationPlaceholder: string;
    trackTitle: string;
    trackPlaceholder: string;
    recentNeeds: string;
  };
  engine: {
    title: string;
    subtitle: string;
    scoreLabel: string;
    whyThisProject: string;
    humanReviewNote: string;
    factors: {
      demand: string;
      gap: string;
      population: string;
      urgency: string;
      vulnerability: string;
      investmentGap: string;
    };
  };
  simulator: {
    title: string;
    subtitle: string;
    availableBudget: string;
    estimatedCitizens: string;
    gapReduction: string;
    projectsFunded: string;
  };
}
