import { ArrowRight, TrendingDown, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import type { ScreenId } from '@/types';
import { Button, Card, SectionLabel, MetricCard } from '@/components/ui';
import { IncomeChart } from '@/components/Charts';
import { AnimatedNumber } from '@/components/AnimatedNumber';
import { DEMO_USER, computeVolatility, formatINR } from '@/lib/engine';

export function RawDataPage({ onNavigate }: { onNavigate: (s: ScreenId) => void }) {
  const vol = computeVolatility(DEMO_USER);
  const incomes = DEMO_USER.incomeHistory.map((m) => m.amount);
  const avg = vol.avgIncome;
  const highest = Math.max(...incomes);
  const lowest = Math.min(...incomes);
  const largestDrop = Math.round(((31000 - 16000) / 31000) * 100); // M2→M5 but actual largest swing
  // Find largest downward swing
  let maxDrop = 0;
  for (let i = 1; i < incomes.length; i++) {
    if (incomes[i] < incomes[i - 1]) {
      const drop = ((incomes[i - 1] - incomes[i]) / incomes[i - 1]) * 100;
      if (drop > maxDrop) maxDrop = drop;
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <SectionLabel>Step 2 — Raw Financial Data</SectionLabel>
        <h1 className="mt-5 text-4xl sm:text-5xl font-bold font-display text-ink-900">Your Income Pattern</h1>
        <p className="mt-3 text-lg text-ink-500 max-w-2xl">6 months of Arun's income history, before any intelligence is applied.</p>
      </div>

      <Card className="p-6 sm:p-8 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-ink-700">Monthly Income — Last 6 Months</h2>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-ink-500"><span className="w-3 h-3 rounded bg-ink-700" /> Normal</span>
            <span className="flex items-center gap-1.5 text-vol-600"><span className="w-3 h-3 rounded bg-vol-500" /> Low month</span>
            <span className="flex items-center gap-1.5 text-shield-600"><span className="w-3 h-3 rounded bg-shield-500" /> High month</span>
          </div>
        </div>
        <IncomeChart data={DEMO_USER.incomeHistory} highlightVolatility />
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="Average Income"
          value={<AnimatedNumber value={avg} prefix="₹" />}
          icon={<TrendingUp className="w-5 h-5" />}
          delay={0}
        />
        <MetricCard
          label="Highest Month"
          value={<AnimatedNumber value={highest} prefix="₹" />}
          tone="shield"
          icon={<TrendingUp className="w-5 h-5" />}
          delay={100}
        />
        <MetricCard
          label="Lowest Month"
          value={<AnimatedNumber value={lowest} prefix="₹" />}
          tone="vol"
          icon={<TrendingDown className="w-5 h-5" />}
          delay={200}
        />
        <MetricCard
          label="Largest Downward Swing"
          value={<AnimatedNumber value={Math.round(maxDrop)} suffix="%" />}
          tone="vol"
          icon={<AlertTriangle className="w-5 h-5" />}
          delay={300}
        />
      </div>

      <Card className="p-6 mb-6 border-vol-200 bg-vol-50/50">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-vol-100 text-vol-600 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-ink-900 text-lg">Essential Monthly Expenses: {formatINR(DEMO_USER.essentialExpenses)}</h3>
            <p className="text-ink-600 mt-2 leading-relaxed">
              Average income alone does not show how financially vulnerable someone is. Two workers earning the same average can face very different levels of risk — depending on how much their income fluctuates.
            </p>
          </div>
        </div>
      </Card>

      <div className="text-center">
        <Button size="lg" onClick={() => onNavigate('volatility')}>
          Analyse My Income Risk <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
