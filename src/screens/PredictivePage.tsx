import { ArrowRight, TrendingDown, Calendar, Shield, Target, HelpCircle } from 'lucide-react';
import type { ScreenId } from '@/types';
import { Button, Card, SectionLabel, MetricCard } from '@/components/ui';
import { AnimatedNumber } from '@/components/AnimatedNumber';
import { DEMO_USER, computeVolatility, computePredictive, formatINR } from '@/lib/engine';

export function PredictivePage({ onNavigate }: { onNavigate: (s: ScreenId) => void }) {
  const vol = computeVolatility(DEMO_USER);
  const pred = computePredictive(DEMO_USER, vol);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <SectionLabel><TrendingDown className="w-3 h-3" /> Step 4 — Predictive Analytics</SectionLabel>
        <h1 className="mt-5 text-4xl sm:text-5xl font-bold font-display text-ink-900">Your Financial Risk Outlook</h1>
        <p className="mt-3 text-lg text-ink-500 max-w-2xl">BufferX predicts the likelihood of a financial shortfall — not the exact future income.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="Probability of Low-Income Period"
          value={<AnimatedNumber value={pred.shortfallProbability * 100} suffix="%" />}
          sublabel="in the next 30 days"
          tone="vol"
          icon={<TrendingDown className="w-5 h-5" />}
        />
        <MetricCard
          label="Expected Income Floor"
          value={<AnimatedNumber value={pred.expectedIncomeFloor} prefix="₹" />}
          sublabel="approximate minimum"
          tone="ink"
          icon={<Calendar className="w-5 h-5" />}
        />
        <MetricCard
          label="Essential Expense Requirement"
          value={<AnimatedNumber value={pred.essentialMonthly} prefix="₹" />}
          sublabel="per month"
          tone="default"
          icon={<Target className="w-5 h-5" />}
        />
        <MetricCard
          label="Recommended Safety Level"
          value={<AnimatedNumber value={pred.recommendedDays} suffix=" Days" />}
          sublabel="of protection"
          tone="shield"
          icon={<Shield className="w-5 h-5" />}
          delay={300}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Probability visualization */}
        <Card className="p-6">
          <h2 className="font-bold text-ink-900 text-lg mb-4">Shortfall Probability</h2>
          <div className="flex items-end gap-1 h-32 mb-4">
            {Array.from({ length: 20 }).map((_, i) => {
              const isActive = i < Math.round(pred.shortfallProbability * 20);
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t transition-all duration-300 ${isActive ? 'bg-gradient-to-t from-vol-500 to-vol-400' : 'bg-mist-200'}`}
                  style={{
                    height: `${isActive ? 30 + Math.random() * 70 : 20}%`,
                    animationDelay: `${i * 30}ms`,
                  }}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-500">Low risk</span>
            <span className="font-bold text-vol-600 text-lg">{Math.round(pred.shortfallProbability * 100)}% shortfall probability</span>
            <span className="text-ink-500">High risk</span>
          </div>
        </Card>

        {/* Why 30 days */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-shield-500" />
            <h2 className="font-bold text-ink-900 text-lg">Why {pred.recommendedDays} days?</h2>
          </div>
          <div className="space-y-3">
            {pred.reasons.map((r, i) => (
              <div key={i} className="flex items-start gap-3 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-6 h-6 rounded-full bg-shield-100 text-shield-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                <span className="text-ink-600 text-sm leading-relaxed">{r}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 border-blue-200 bg-blue-50/50 mb-6">
        <p className="text-ink-700 leading-relaxed">
          <span className="font-semibold">BufferX predicts the likelihood of a financial shortfall, not the exact future income.</span> Instead of saying "you will earn {formatINR(24324)} next month," it estimates how likely you are to face a gap between income and essential expenses.
        </p>
      </Card>

      <div className="text-center">
        <Button size="lg" onClick={() => onNavigate('buffer-target')}>
          See My Safety Target <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
