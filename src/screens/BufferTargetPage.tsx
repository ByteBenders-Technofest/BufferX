import { useState } from 'react';
import { ArrowRight, Shield, Target, TrendingUp, TrendingDown, Info } from 'lucide-react';
import type { ScreenId } from '@/types';
import { Button, Card, SectionLabel, Badge, ProgressBar } from '@/components/ui';
import { ProtectionMeter } from '@/components/Charts';
import { AnimatedNumber } from '@/components/AnimatedNumber';
import { DEMO_USER, computeVolatility, computePredictive, computeBufferTarget, formatINR, protectionDays } from '@/lib/engine';

export function BufferTargetPage({ onNavigate }: { onNavigate: (s: ScreenId) => void }) {
  const vol = computeVolatility(DEMO_USER);
  const pred = computePredictive(DEMO_USER, vol);
  const target = computeBufferTarget(DEMO_USER, pred);
  const [simState, setSimState] = useState<'none' | 'down' | 'up'>('none');

  const simScenarios = {
    none: { days: target.recommendedDays, label: 'Current', level: vol.level },
    down: { days: 22, label: 'Medium', level: 'MODERATE' as const },
    up: { days: 45, label: 'Very High', level: 'VERY HIGH' as const },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <SectionLabel><Target className="w-3 h-3" /> Step 5 — Dynamic Buffer Target</SectionLabel>
        <h1 className="mt-5 text-4xl sm:text-5xl font-bold font-display text-ink-900">Your Financial Safety Target</h1>
        <p className="mt-3 text-lg text-ink-500 max-w-2xl">Your target is dynamic — it adapts as your income stability changes.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Protection Meter */}
        <Card glow="shield" className="p-8 flex flex-col items-center justify-center text-center">
          <Badge tone="shield"><Shield className="w-3 h-3" /> Current Protection</Badge>
          <div className="my-6">
            <ProtectionMeter current={target.currentProtectionDays} target={target.recommendedDays} size={220} />
          </div>
          <div className="text-lg font-semibold text-ink-700">
            {target.currentProtectionDays} / {target.recommendedDays} days protected
          </div>
        </Card>

        {/* Numbers */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-5">
              <div className="text-sm text-ink-400 font-medium">Current Buffer</div>
              <div className="text-2xl font-bold text-ink-900 mt-1">{formatINR(target.currentBuffer)}</div>
            </Card>
            <Card className="p-5">
              <div className="text-sm text-ink-400 font-medium">Current Protection</div>
              <div className="text-2xl font-bold text-vol-600 mt-1">{target.currentProtectionDays} days</div>
            </Card>
            <Card className="p-5 border-shield-200 bg-shield-50/50">
              <div className="text-sm text-shield-600 font-medium">Recommended Protection</div>
              <div className="text-2xl font-bold text-shield-600 mt-1">{target.recommendedDays} days</div>
            </Card>
            <Card className="p-5 border-shield-200 bg-shield-50/50">
              <div className="text-sm text-shield-600 font-medium">Target Buffer</div>
              <div className="text-2xl font-bold text-shield-600 mt-1">{formatINR(target.targetBuffer)}</div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-ink-600">Gap Remaining</span>
              <span className="text-2xl font-bold text-ink-900">{formatINR(target.gap)}</span>
            </div>
            <ProgressBar value={target.currentBuffer} max={target.targetBuffer} height="h-5" />
            <div className="flex justify-between mt-2 text-xs text-ink-400">
              <span>{formatINR(target.currentBuffer)} saved</span>
              <span>{formatINR(target.targetBuffer)} target</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Large progress bar */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-ink-900">Progress: {target.currentProtectionDays} / {target.recommendedDays} Days Protected</span>
          <span className="text-sm text-ink-400">{Math.round((target.currentProtectionDays / target.recommendedDays) * 100)}%</span>
        </div>
        <ProgressBar value={target.currentProtectionDays} max={target.recommendedDays} height="h-6" />
      </Card>

      <Card className="p-6 mb-6 border-shield-200 bg-shield-50/50">
        <div className="flex items-start gap-4">
          <Info className="w-5 h-5 text-shield-600 shrink-0 mt-0.5" />
          <p className="text-ink-700 leading-relaxed">
            Your target is not fixed forever. If your income becomes more stable, your recommended protection can <span className="font-semibold">decrease</span>. If your income becomes more unpredictable, it can <span className="font-semibold">increase</span>.
          </p>
        </div>
      </Card>

      {/* Simulation */}
      <Card className="p-6 mb-6">
        <h2 className="font-bold text-ink-900 text-lg mb-1">Volatility Simulation</h2>
        <p className="text-sm text-ink-500 mb-5">See how your target changes with different income volatility levels.</p>

        <div className="flex gap-3 mb-6">
          <Button size="sm" variant={simState === 'down' ? 'primary' : 'secondary'} onClick={() => setSimState('down')}>
            <TrendingDown className="w-4 h-4" /> If volatility falls
          </Button>
          <Button size="sm" variant={simState === 'up' ? 'shock' : 'secondary'} onClick={() => setSimState('up')}>
            <TrendingUp className="w-4 h-4" /> If volatility rises
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setSimState('none')}>Reset</Button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { state: 'down' as const, label: 'High → Medium', from: 30, to: 22, level: 'Medium', color: 'shield' },
            { state: 'none' as const, label: 'Current (High)', from: 30, to: 30, level: 'High', color: 'vol', highlight: true },
            { state: 'up' as const, label: 'High → Very High', from: 30, to: 45, level: 'Very High', color: 'shock' },
          ].map((s) => (
            <Card
              key={s.state}
              className={`p-5 transition-all ${simState === s.state ? 'ring-2 ' + (s.color === 'shield' ? 'ring-shield-400' : s.color === 'shock' ? 'ring-shock-400' : 'ring-vol-400') : ''} ${s.highlight && simState !== 'down' && simState !== 'up' ? 'ring-2 ring-vol-400' : ''}`}
            >
              <div className="text-xs text-ink-400 font-semibold uppercase tracking-wider">{s.label}</div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-ink-400 line-through">{s.from}</span>
                <span className="text-3xl font-bold font-display text-ink-900">→ {s.to}</span>
                <span className="text-sm text-ink-400">days</span>
              </div>
              <div className={`mt-2 text-sm font-semibold ${s.color === 'shield' ? 'text-shield-600' : s.color === 'shock' ? 'text-shock-600' : 'text-vol-600'}`}>
                {s.level} volatility
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <div className="text-center">
        <Button size="lg" onClick={() => onNavigate('contribution')}>
          Today's Smart Buffer Action <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
