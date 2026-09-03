import type {
  UserProfile,
  IncomeDay,
  VolatilityResult,
  PredictiveResult,
  BufferTarget,
  ShockResult,
  VolatilityLevel,
} from './types';

export const DEMO_USER: UserProfile = {
  name: 'Arun Kumar',
  occupation: 'Delivery Partner',
  incomeHistory: [
    { month: 'Month 1', amount: 18000 },
    { month: 'Month 2', amount: 31000 },
    { month: 'Month 3', amount: 21000 },
    { month: 'Month 4', amount: 27000 },
    { month: 'Month 5', amount: 16000 },
    { month: 'Month 6', amount: 34000 },
  ],
  essentialExpenses: 13500,
  currentBuffer: 5200,
};

export const TYPICAL_DAILY_INCOME = 850;
export const STRONG_DAY_INCOME = 1800;

export const AUTOMATION_LOG: IncomeDay[] = [
  {
    label: 'Today',
    income: 1800,
    classification: 'EXCEPTIONAL',
    recommended: 250,
    status: 'Protected',
  },
  {
    label: 'Yesterday',
    income: 420,
    classification: 'WEAK',
    recommended: 0,
    status: 'No saving requested',
  },
  {
    label: '2 Days Ago',
    income: 1150,
    classification: 'STRONG',
    recommended: 90,
    status: 'Protected',
  },
  {
    label: '3 Days Ago',
    income: 880,
    classification: 'NORMAL',
    recommended: 40,
    status: 'Protected',
  },
  {
    label: '4 Days Ago',
    income: 2100,
    classification: 'EXCEPTIONAL',
    recommended: 320,
    status: 'Protected',
  },
  {
    label: '5 Days Ago',
    income: 300,
    classification: 'WEAK',
    recommended: 0,
    status: 'No saving requested',
  },
];

export const WORKER_COMPARISON = {
  stable: {
    name: 'Worker A',
    label: 'Stable',
    income: [28000, 29000, 30000, 29000],
    volatility: 'LOW' as VolatilityLevel,
    protection: 15,
  },
  irregular: {
    name: 'Worker B',
    label: 'Irregular',
    income: [12000, 30000, 18000, 35000],
    volatility: 'HIGH' as VolatilityLevel,
    protection: 30,
  },
};

function stdDev(values: number[]): number {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

function downsideDeviation(values: number[], floor: number): number {
  const downsides = values.map((v) => (v < floor ? floor - v : 0));
  const mean = downsides.reduce((a, b) => a + b, 0) / downsides.length;
  return Math.sqrt(mean);
}

export function classifyVolatility(cv: number): VolatilityLevel {
  if (cv < 0.15) return 'LOW';
  if (cv < 0.3) return 'MODERATE';
  if (cv < 0.5) return 'HIGH';
  return 'VERY HIGH';
}

export function recommendedProtectionDays(level: VolatilityLevel): number {
  switch (level) {
    case 'LOW': return 15;
    case 'MODERATE': return 22;
    case 'HIGH': return 30;
    case 'VERY HIGH': return 45;
  }
}

export function computeVolatility(user: UserProfile): VolatilityResult {
  const incomes = user.incomeHistory.map((m) => m.amount);
  const avg = incomes.reduce((a, b) => a + b, 0) / incomes.length;
  const sd = stdDev(incomes);
  const cv = sd / avg;
  const floor = Math.min(...incomes);
  const dd = downsideDeviation(incomes, avg * 0.75);
  const lowPeriods = incomes.filter((v) => v < avg * 0.75).length;
  const expenseBurden = user.essentialExpenses / avg;
  const protectionDays = user.currentBuffer / (user.essentialExpenses / 30);

  // Explainable VRI scoring (0-100, higher = more protection needed)
  const cvScore = Math.min(cv * 100, 40);
  const ddScore = Math.min((dd / avg) * 60, 25);
  const expenseScore = expenseBurden > 0.55 ? 15 : expenseBurden > 0.4 ? 10 : 5;
  const bufferScore = protectionDays < 15 ? 15 : protectionDays < 30 ? 10 : 5;
  const concentrationScore = 8; // single source
  const vriScore = Math.round(cvScore + ddScore + expenseScore + bufferScore + concentrationScore);

  const level = classifyVolatility(cv);
  const riskLabel =
    vriScore >= 70 ? 'HIGH PROTECTION NEEDED' :
    vriScore >= 50 ? 'MODERATE PROTECTION NEEDED' :
    'LOW PROTECTION NEEDED';

  return {
    avgIncome: Math.round(avg),
    stdDev: Math.round(sd),
    coefficientOfVariation: Math.round(cv * 100) / 100,
    downsideDeviation: Math.round(dd),
    lowIncomePeriods: lowPeriods,
    incomeFloor: floor,
    expenseBurden: Math.round(expenseBurden * 100) / 100,
    sourceConcentration: 1,
    vriScore,
    level,
    riskLabel,
    factors: [
      { label: 'Income variation', value: level, level: level === 'LOW' ? 'low' : level === 'MODERATE' ? 'moderate' : 'high' },
      { label: 'Downside income risk', value: dd > avg * 0.2 ? 'High' : 'Moderate', level: dd > avg * 0.2 ? 'high' : 'moderate' },
      { label: 'Essential expense dependency', value: expenseBurden > 0.5 ? 'High' : expenseBurden > 0.35 ? 'Moderate' : 'Low', level: expenseBurden > 0.5 ? 'high' : expenseBurden > 0.35 ? 'moderate' : 'low' },
      { label: 'Current buffer', value: protectionDays < 15 ? 'Insufficient' : 'Adequate', level: protectionDays < 15 ? 'insufficient' : 'low' },
      { label: 'Income-source concentration', value: 'High', level: 'high' },
    ],
  };
}

export function computePredictive(user: UserProfile, vol: VolatilityResult): PredictiveResult {
  const level = vol.level;
  const prob =
    level === 'VERY HIGH' ? 0.52 :
    level === 'HIGH' ? 0.38 :
    level === 'MODERATE' ? 0.22 : 0.1;

  return {
    shortfallProbability: prob,
    expectedIncomeFloor: Math.round(vol.incomeFloor * 1.03),
    essentialMonthly: user.essentialExpenses,
    recommendedDays: recommendedProtectionDays(level),
    reasons: [
      'Large historical income drops detected',
      'High downside volatility in earnings',
      'Essential expenses continue even when income falls',
      'Current income source is concentrated in one platform',
      'Existing protection is below recommended level',
    ],
  };
}

export function computeBufferTarget(user: UserProfile, pred: PredictiveResult): BufferTarget {
  const dailyExpense = user.essentialExpenses / 30;
  const currentProtectionDays = Math.round(user.currentBuffer / dailyExpense);
  const targetBuffer = Math.round(pred.recommendedDays * dailyExpense);
  return {
    currentBuffer: user.currentBuffer,
    currentProtectionDays,
    recommendedDays: pred.recommendedDays,
    targetBuffer,
    gap: Math.max(targetBuffer - user.currentBuffer, 0),
  };
}

export function computeShock(user: UserProfile, postContribution: number): ShockResult {
  const buffer = user.currentBuffer + postContribution;
  const dailyExpense = user.essentialExpenses / 30;
  const essentialExpenses = Math.round(dailyExpense * 16); // ~half month shock window
  const incomeAvailable = 2800;
  const shortfall = Math.max(essentialExpenses - incomeAvailable, 0);
  const bufferUsed = Math.min(buffer, shortfall);
  const remainingGap = Math.max(shortfall - bufferUsed, 0);
  const debtAvoided = bufferUsed;
  const borrowingReduction = shortfall > 0 ? Math.round((debtAvoided / shortfall) * 100) : 0;

  return {
    essentialExpenses,
    incomeAvailable,
    shortfall,
    bufferUsed,
    remainingGap,
    debtAvoided,
    borrowingReduction,
  };
}

export function classifyDay(income: number, typical: number): 'WEAK' | 'NORMAL' | 'STRONG' | 'EXCEPTIONAL' {
  if (income < typical * 0.6) return 'WEAK';
  if (income > typical * 1.8) return 'EXCEPTIONAL';
  if (income > typical * 1.2) return 'STRONG';
  return 'NORMAL';
}

export function recommendContribution(
  income: number,
  typical: number,
  volatility: VolatilityLevel,
  gap: number,
  buffer: number,
  essential: number
): number {
  if (gap <= 0) return 0;
  const cls = classifyDay(income, typical);
  if (cls === 'WEAK') return 0;

  const volMultiplier = volatility === 'VERY HIGH' ? 1.3 : volatility === 'HIGH' ? 1.15 : volatility === 'MODERATE' ? 1 : 0.85;
  const basePct =
    cls === 'EXCEPTIONAL' ? 0.16 :
    cls === 'STRONG' ? 0.08 :
    0.04;

  const surplus = Math.max(income - essential / 30, 0);
  const raw = surplus * basePct * volMultiplier;
  const capped = Math.min(raw, gap, income * 0.2);
  return Math.round(Math.max(capped, 0) / 10) * 10;
}

export function formatINR(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}

export function protectionDays(buffer: number, essentialMonthly: number): number {
  return Math.round((buffer / essentialMonthly) * 30);
}
