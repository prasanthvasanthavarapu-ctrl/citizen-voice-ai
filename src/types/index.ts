export type UserRole = 'citizen' | 'official' | 'policymaker' | 'admin';

export type BricsCountryCode = 'IN' | 'BR' | 'RU' | 'CN' | 'ZA';

export type LanguageCode = 'en' | 'hi' | 'te' | 'kn' | 'ta' | 'bn' | 'pt' | 'ru' | 'zh' | 'zu';

export interface BricsCountry {
  code: BricsCountryCode;
  name: string;
  nativeName: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  totalPopulation: string;
  totalRequests: number;
  activeGaps: number;
  highPriorityRegions: number;
  recommendedProjects: number;
  completedProjects: number;
  citizensImpacted: string;
  capital: string;
  leadMinistry: string;
}

export type InfrastructureCategoryId =
  | 'drinking_water'
  | 'roads'
  | 'electricity'
  | 'healthcare'
  | 'education'
  | 'public_transport'
  | 'internet_connectivity'
  | 'sanitation'
  | 'waste_management'
  | 'housing'
  | 'agriculture'
  | 'public_safety'
  | 'flood_management'
  | 'renewable_energy'
  | 'digital_infrastructure'
  | 'employment_infrastructure';

export interface InfrastructureCategory {
  id: InfrastructureCategoryId;
  name: string;
  iconName: string;
  color: string;
  description: string;
  defaultWeight: number;
}

export type RequestChannel = 'voice' | 'text' | 'whatsapp' | 'telegram' | 'sms' | 'portal';

export type RequestStatus = 
  | 'analyzing'
  | 'under_review' 
  | 'gap_identified' 
  | 'project_formulated' 
  | 'budget_allocated' 
  | 'in_execution' 
  | 'completed';

export interface CitizenRequest {
  id: string;
  trackingId: string;
  country: BricsCountryCode;
  region: string;
  district: string;
  channel: RequestChannel;
  originalText: string;
  detectedLanguage: string;
  translatedText: string;
  responseLanguage: string;
  categoryId: InfrastructureCategoryId;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  urgencyScore: number; // 0-100
  sentiment: 'positive' | 'neutral' | 'urgent' | 'distressed';
  status: RequestStatus;
  timestamp: string;
  populationAffectedEst: number;
  upvotes: number;
  imageUrl?: string;
  audioDurationSec?: number;
  confidenceScore: number; // e.g. 0.94
}

export interface DemandHotspot {
  id: string;
  country: BricsCountryCode;
  locationName: string;
  region: string;
  coordinates: [number, number]; // [lat, lng]
  requestCount: number;
  populationAffected: number;
  primaryCategoryId: InfrastructureCategoryId;
  existingInfraScore: number; // 0-100 (lower = worse infrastructure)
  averageUrgency: number; // 0-100
  currentInvestmentMillions: number;
  estimatedGapMillions: number;
  demandLevel: 'critical' | 'high' | 'moderate' | 'low';
  recentCitizenQuote: string;
  vulnerabilityIndex: number; // 0-100
}

export interface InfrastructureGap {
  id: string;
  country: BricsCountryCode;
  region: string;
  district: string;
  category: InfrastructureCategoryId;
  citizenRequests: number;
  currentAccessPercent: number;
  populationAffected: number;
  plannedInvestment: number; // in millions or Crores/Reais/Rubles/Yuan/Rand
  estimatedRequirement: number;
  fundingGap: number;
  currencyUnit: string;
  urgencyLevel: 'Critical' | 'High' | 'Medium';
}

export interface AIRecommendation {
  id: string;
  title: string;
  country: BricsCountryCode;
  location: string;
  region: string;
  categoryId: InfrastructureCategoryId;
  problemStatement: string;
  citizenRequestsCount: number;
  populationAffected: number;
  estimatedCostMillions: number;
  currencySymbol: string;
  currencyUnit: string;
  expectedImpact: string;
  priorityScore: number; // 0-100
  factors: {
    citizenDemand: number;     // 30%
    infrastructureGap: number; // 20%
    populationImpact: number;  // 20%
    urgency: number;           // 15%
    vulnerability: number;     // 10%
    investmentGap: number;     // 5%
  };
  existingInvestmentMillions: number;
  fundingGapMillions: number;
  completionTimelineMonths: number;
  recommendedAction: string;
  whyThisProject: string;
  confidenceLevel: number; // e.g. 94.6%
  dataSources: string[];
  alternativeProjectsConsidered: { title: string; score: number; tradeOff: string }[];
  potentialLimitations: string;
  requiresHumanReview: boolean;
  status: 'recommended' | 'under_simulation' | 'approved' | 'in_progress';
}

export interface ImpactProject {
  id: string;
  title: string;
  country: BricsCountryCode;
  location: string;
  region: string;
  categoryId: InfrastructureCategoryId;
  status: 'Planning' | 'Approved' | 'In Progress' | 'Completed';
  budgetMillions: number;
  currencySymbol: string;
  currencyUnit: string;
  completionPercentage: number;
  citizensImpacted: number;
  citizenSatisfactionScore: number; // out of 5.0
  verifiedCitizenReviewsCount: number;
  beforeIndicator: { label: string; value: string; num: number };
  afterIndicator: { label: string; value: string; num: number };
  coordinates: [number, number];
  startDate: string;
  expectedCompletionDate: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  leadAgency: string;
}

export interface PipelineStage {
  step: number;
  name: string;
  shortDesc: string;
  status: 'idle' | 'processing' | 'completed';
  samplePayload?: Record<string, any>;
  confidence?: number;
  explanation?: string;
}

export interface DataSourceItem {
  id: string;
  name: string;
  category: string;
  provider: string;
  lastUpdated: string;
  coverage: string;
  qualityScore: number; // 0-100%
  refreshFrequency: string;
  format: string;
  isSimulatedDemo: boolean;
  description: string;
}

export interface WhatIfSimulationParams {
  budgetMillions: number;
  targetRegion: string;
  selectedCategories: InfrastructureCategoryId[];
  populationPriorityWeight: number; // 0-100
  urgencyThreshold: number; // 0-100
}
