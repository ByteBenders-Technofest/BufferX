export type ScreenId =
  | 'landing'
  | 'connect'
  | 'raw-data'
  | 'volatility'
  | 'predictive'
  | 'buffer-target'
  | 'contribution'
  | 'automation'
  | 'shock'
  | 'shock-mode'
  | 'debt-firewall'
  | 'recovery'
  | 'comparison';

export type VolatilityLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'VERY HIGH';
export type IncomeDayClass = 'WEAK' | 'NORMAL' | 'STRONG' | 'EXCEPTIONAL';

export interface MonthlyIncome {
  month: string;
  amount: number;
}

export interface IncomeDay {
  label: string;
  income: number;
  classification: IncomeDayClass;
  recommended: number;
  status: 'Protected' | 'No saving requested' | 'Pending';
}

export interface UserProfile {
  name: string;
  occupation: string;
  incomeHistory: MonthlyIncome[];
  essentialExpenses: number;
  currentBuffer: number;
}

export interface VolatilityResult {
  avgIncome: number;
  stdDev: number;
  coefficientOfVariation: number;
  downsideDeviation: number;
  lowIncomePeriods: number;
  incomeFloor: number;
  expenseBurden: number;
  sourceConcentration: number;
  vriScore: number;
  level: VolatilityLevel;
  riskLabel: string;
  factors: { label: string; value: string; level: 'low' | 'moderate' | 'high' | 'insufficient' }[];
}

export interface PredictiveResult {
  shortfallProbability: number;
  expectedIncomeFloor: number;
  essentialMonthly: number;
  recommendedDays: number;
  reasons: string[];
}

export interface BufferTarget {
  currentBuffer: number;
  currentProtectionDays: number;
  recommendedDays: number;
  targetBuffer: number;
  gap: number;
}

export interface ShockResult {
  essentialExpenses: number;
  incomeAvailable: number;
  shortfall: number;
  bufferUsed: number;
  remainingGap: number;
  debtAvoided: number;
  borrowingReduction: number;
}
