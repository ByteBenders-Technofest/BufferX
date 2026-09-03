import { useEffect, useState } from 'react';
import { Brain, Cpu, ChevronDown, ChevronUp, ArrowRight, Activity, Shield, AlertTriangle, Layers } from 'lucide-react';
import type { ScreenId } from '@/types';
import { Button, Card, SectionLabel, RiskTag } from '@/components/ui';
import { ScoreGauge } from '@/components/Charts';
import { DEMO_USER, computeVolatility, formatINR } from '@/lib/engine';

export function VolatilityPage({ onNavigate }: { onNavigate: (s: ScreenId) => void }) {
  const [phase, setPhase] = useState<'processing' | 'result'>('processing');
  const [showCalc, setShowCalc] = useState(false);
  const vol = computeVolatility(DEMO_USER);

  useEffect(() => {
    const t = setTimeout(() => setPhase('result'), 3200);
    return () => clearTimeout(t);
  }, []);

  if (phase === 'processing') {
    return <ProcessingAnimation />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <SectionLabel><Cpu className="w-3 h-3" /> AI/ML Layer — Volatility Resilience Engine</SectionLabel>
        <h1 className="mt-5 text-4xl sm:text-5xl font-bold font-display text-ink-900">Volatility Resilience Engine</h1>
        <p className="mt-3 text-lg text-ink-500 max-w-2xl">The intelligence core of BufferX. AI identifies patterns — explainable financial rules determine the safety recommendation.</p>
      </div>

      {/* Score */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card glow="vol" className="p-8 flex flex-col items-center justify-center text-center">
          <span className="text-sm font-semibold text-ink-400 uppercase tracking-wider mb-4">VRI Score</span>
          <ScoreGauge score={vol.vriScore} size={260} />
          <div className="mt-4">
            <span className="inline-block px-4 py-2 rounded-xl bg-vol-100 text-vol-700 font-bold text-lg">
              {vol.riskLabel}
            </span>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6">
            <h2 className="font-bold text-ink-900 text-lg mb-4">Risk Factor Breakdown</h2>
            <div className="space-y-3">
              {vol.factors.map((f, i) => (
                <div key={f.label} className="flex items-center justify-between py-2 border-b border-mist-100 last:border-0 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <span className="text-ink-600 font-medium">{f.label}</span>
                  <RiskTag level={f.value} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-ink-900 border-ink-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-shield-500/20 text-shield-400 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-mist-200 font-semibold">AI identifies patterns. Explainable financial rules determine the safety recommendation.</p>
                <p className="text-mist-400 text-sm mt-1">No mysterious AI — every score is traceable to measurable income behaviour.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* See Calculation */}
      <Card className="p-6 mb-6">
        <button
          onClick={() => setShowCalc(!showCalc)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-bold text-ink-900 text-lg flex items-center gap-2">
            <Layers className="w-5 h-5 text-vol-500" /> See Calculation
          </span>
          {showCalc ? <ChevronUp className="w-5 h-5 text-ink-400" /> : <ChevronDown className="w-5 h-5 text-ink-400" />}
        </button>
        {showCalc && (
          <div className="mt-6 grid sm:grid-cols-2 gap-4 animate-slide-down">
            {[
              { label: 'Average Income', value: formatINR(vol.avgIncome), detail: 'Mean of 6 months' },
              { label: 'Standard Deviation', value: formatINR(vol.stdDev), detail: 'How far earnings deviate from average' },
              { label: 'Coefficient of Variation', value: vol.coefficientOfVariation.toFixed(2), detail: 'Std dev ÷ average = income volatility ratio' },
              { label: 'Downside Deviation', value: formatINR(vol.downsideDeviation), detail: 'Only measures drops below 75% of average' },
              { label: 'Low-Income Periods', value: `${vol.lowIncomePeriods} / 6 months`, detail: 'Months below 75% of average income' },
              { label: 'Income Floor', value: formatINR(vol.incomeFloor), detail: 'Lowest recorded monthly income' },
              { label: 'Expense Burden Ratio', value: `${Math.round(vol.expenseBurden * 100)}%`, detail: 'Essential expenses ÷ average income' },
              { label: 'Income Source Concentration', value: 'Single source', detail: 'All earnings from one platform' },
            ].map((c) => (
              <div key={c.label} className="bg-mist-50 rounded-xl p-4">
                <div className="text-xs text-ink-400 font-semibold uppercase tracking-wider">{c.label}</div>
                <div className="text-xl font-bold text-ink-900 mt-1">{c.value}</div>
                <div className="text-xs text-ink-400 mt-1">{c.detail}</div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-ink-900">AI/ML Layer</h3>
            <p className="text-sm text-ink-500">Pattern detection and risk estimation</p>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-shield-50 text-shield-600 flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-ink-900">Financial Safety Rules</h3>
            <p className="text-sm text-ink-500">Actual recommendation logic — explainable and transparent</p>
          </div>
        </Card>
      </div>

      <p className="text-center text-sm text-ink-400 mt-6 italic">AI predicts. Rules protect.</p>

      <div className="text-center mt-8">
        <Button size="lg" onClick={() => onNavigate('predictive')}>
          See Financial Risk Outlook <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

function ProcessingAnimation() {
  const steps = [
    'Loading income history...',
    'Computing standard deviation...',
    'Measuring downside deviation...',
    'Detecting low-income patterns...',
    'Analyzing expense burden...',
    'Calculating VRI Score...',
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((a) => Math.min(a + 1, steps.length - 1));
    }, 480);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
      <div className="text-center mb-12">
        <SectionLabel><Cpu className="w-3 h-3" /> Volatility Resilience Engine</SectionLabel>
        <h1 className="mt-5 text-4xl font-bold font-display text-ink-900">Analysing earning behaviour...</h1>
      </div>

      <Card className="p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-shield-50/50 to-transparent pointer-events-none" />
        <div className="relative">
          {/* Scanning animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-mist-200" />
              <div className="w-24 h-24 rounded-full border-4 border-shield-500 border-t-transparent animate-spin-slow absolute inset-0" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-10 h-10 text-shield-500" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-shield-400 animate-pulse-ring" />
            </div>
          </div>

          <div className="space-y-3">
            {steps.map((s, i) => (
              <div
                key={s}
                className={`flex items-center gap-3 py-2 px-4 rounded-xl transition-all duration-300 ${
                  i <= active ? 'bg-shield-50 opacity-100' : 'opacity-30'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i < active ? 'bg-shield-500 text-white' :
                  i === active ? 'bg-shield-100 text-shield-600' :
                  'bg-mist-200 text-mist-400'
                }`}>
                  {i < active ? '✓' : i + 1}
                </div>
                <span className={`text-sm font-medium ${i <= active ? 'text-ink-700' : 'text-ink-400'}`}>{s}</span>
                {i === active && (
                  <div className="ml-auto flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-shield-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-shield-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-shield-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
