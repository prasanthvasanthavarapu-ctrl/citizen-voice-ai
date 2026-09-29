import { AIRecommendation, InfrastructureCategoryId, WhatIfSimulationParams } from '../types';

export interface PriorityWeights {
  demand: number;       // default 0.30
  gap: number;          // default 0.20
  population: number;   // default 0.20
  urgency: number;      // default 0.15
  vulnerability: number;// default 0.10
  investmentGap: number;// default 0.05
}

export const DEFAULT_WEIGHTS: PriorityWeights = {
  demand: 0.30,
  gap: 0.20,
  population: 0.20,
  urgency: 0.15,
  vulnerability: 0.10,
  investmentGap: 0.05,
};

export function calculatePriorityIndex(
  factors: {
    citizenDemand: number;
    infrastructureGap: number;
    populationImpact: number;
    urgency: number;
    vulnerability: number;
    investmentGap: number;
  },
  weights: PriorityWeights = DEFAULT_WEIGHTS
): number {
  const score =
    factors.citizenDemand * weights.demand +
    factors.infrastructureGap * weights.gap +
    factors.populationImpact * weights.population +
    factors.urgency * weights.urgency +
    factors.vulnerability * weights.vulnerability +
    factors.investmentGap * weights.investmentGap;

  return Number(score.toFixed(1));
}

export interface SimulationResult {
  fundedProjects: AIRecommendation[];
  unfundedProjects: AIRecommendation[];
  totalCostMillions: number;
  totalCitizensImpacted: number;
  gapReductionPercent: number;
  roiEfficiencyScore: number;
  summarySentence: string;
}

export function runPolicySimulation(
  allProjects: AIRecommendation[],
  params: WhatIfSimulationParams
): SimulationResult {
  // 1. Filter projects based on target region and categories
  let eligible = allProjects.filter((p) => {
    if (params.targetRegion && params.targetRegion !== 'ALL' && p.country !== params.targetRegion) {
      return false;
    }
    if (params.selectedCategories.length > 0 && !params.selectedCategories.includes(p.categoryId)) {
      return false;
    }
    if (p.factors.urgency < params.urgencyThreshold) {
      return false;
    }
    return true;
  });

  // 2. Score and rank eligible projects according to custom weights
  const customWeights: PriorityWeights = {
    demand: 0.25,
    gap: 0.20,
    population: params.populationPriorityWeight / 100 * 0.35 + 0.1,
    urgency: 0.15,
    vulnerability: 0.10,
    investmentGap: 0.05,
  };

  const ranked = [...eligible].sort((a, b) => {
    const scoreA = calculatePriorityIndex(a.factors, customWeights);
    const scoreB = calculatePriorityIndex(b.factors, customWeights);
    return scoreB - scoreA;
  });

  // 3. Greedily allocate available budget
  let currentBudgetRemaining = params.budgetMillions;
  const funded: AIRecommendation[] = [];
  const unfunded: AIRecommendation[] = [];

  let totalCitizensImpacted = 0;
  let totalCost = 0;

  for (const proj of ranked) {
    const neededCost = proj.fundingGapMillions; // or estimatedCostMillions
    if (neededCost <= currentBudgetRemaining) {
      currentBudgetRemaining -= neededCost;
      totalCost += neededCost;
      totalCitizensImpacted += proj.populationAffected;
      funded.push(proj);
    } else {
      unfunded.push(proj);
    }
  }

  // 4. Calculate gap reduction %
  const totalNeed = allProjects.reduce((acc, p) => acc + p.fundingGapMillions, 0);
  const gapReductionPercent = totalNeed > 0 ? Math.min(100, Number(((totalCost / totalNeed) * 100).toFixed(1))) : 0;
  const roiEfficiencyScore = totalCost > 0 ? Number((totalCitizensImpacted / totalCost / 10).toFixed(1)) : 0;

  const formattedCitizens = (totalCitizensImpacted / 1000000).toFixed(2);
  const summarySentence = totalCitizensImpacted > 0
    ? `With ${params.budgetMillions}M investment, approximately ${formattedCitizens}M citizens could gain improved access to essential infrastructure across ${funded.length} prioritized projects.`
    : `Increase allocated budget or adjust filtering criteria to fund high-impact projects.`;

  return {
    fundedProjects: funded,
    unfundedProjects: unfunded,
    totalCostMillions: totalCost,
    totalCitizensImpacted,
    gapReductionPercent,
    roiEfficiencyScore,
    summarySentence,
  };
}
