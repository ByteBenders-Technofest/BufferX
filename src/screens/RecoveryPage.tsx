import { ArrowRight, Clock, TrendingUp, Shield, Activity, RotateCcw } from 'lucide-react';
import type { ScreenId } from '@/types';
import { Button, Card, SectionLabel, Badge, ProgressBar } from '@/components/ui';
import { AnimatedNumber } from '@/components/AnimatedNumber';
import { DEMO_USER, computeShock, computeVolatility, computePredictive, computeBufferTarget, formatINR, protectionDays } from '@/lib/engine';

export function RecoveryPage({
  onNavigate,
  bufferContribution,
}: {
  onNavigate: (s: ScreenId) => void;
  bufferContribution: number;
}) {
  const shock = computeShock(DEMO_USER, bufferContribution);
  const vol = computeVolatility(DEMO_USER);
  const pred = computePredictive(DEMO_USER, vol);
  const target = computeBufferTarget(DEMO_USER, pred);

  const remainingBuffer = Math.max(DEMO_USER.currentBuffer + bufferContribution - shock.bufferUsed, 0);
  const remainingDays = protectionDays(remainingBuffer, DEMO_USER.essentialExpenses);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <SectionLabel><RotateCcw className="w-3 h-3" /> Step 12 — Predictive Recovery</SectionLabel>
        <h1 className="mt-5 text-4xl sm:text-5xl font-bold font-display text-ink-900">Recovery Plan</h1>
        <p className="mt-3 text-lg text-ink-500 max-w-2xl">After Shock Mode, BufferX adapts — no aggressive savings until earnings return above baseline.</p>
      </div>

      {/* Status */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-5 text-center">
          <div className="text-xs text-ink-400 font-semibold uppercase">Remaining Buffer</div>
          <div className="text-2xl font-bold text-ink-900 mt-1">
            <AnimatedNumber value={remainingBuffer} prefix="₹" />
          </div>
        </Card>
        <Card className="p-5 text-center">
          <div className="text-xs text-ink-400 font-semibold uppercase">Protection Remaining</div>
          <div className="text-2xl font-bold text-vol-600 mt-1">{remainingDays} days</div>
        </Card>
        <Card className="p-5 text-center">
          <div className="text-xs text-ink-400 font-semibold uppercase">Income Status</div>
          <div className="mt-1">
            <Badge tone="vol"><Activity className="w-3 h-3" /> Recovering</Badge>
          </div>
        </Card>
        <Card className="p-5 text-center border-shield-200 bg-shield-50/50">
          <div className="text-xs text-shield-600 font-semibold uppercase">Target to Restore</div>
          <div className="text-2xl font-bold text-shield-600 mt-1">{target.recommendedDays} days</div>
        </Card>
      </div>

      {/* System behavior */}
      <Card className="p-6 mb-6">
        <h2 className="font-bold text-ink-900 text-lg mb-4">System Behavior During Recovery</h2>
        <div className="space-y-3">
          {[
            { icon: Shield, text: 'No aggressive savings immediately', tone: 'vol' },
            { icon: Clock, text: 'Wait until earnings return above historical baseline', tone: 'ink' },
            { icon: TrendingUp, text: 'Gradually rebuild buffer through smart contributions', tone: 'shield' },
            { icon: Activity, text: 'Dynamically restore target protection level', tone: 'shield' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-mist-50 rounded-xl animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                item.tone === 'vol' ? 'bg-vol-100 text-vol-600' :
                item.tone === 'shield' ? 'bg-shield-100 text-shield-600' :
                'bg-mist-200 text-ink-500'
              }`}>
                <item.icon className="w-4 h-4" />
              </div>
              <span className="text-ink-700 font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recovery estimate */}
      <Card glow="shield" className="p-8 text-center mb-6">
        <div className="text-sm text-ink-400 font-semibold uppercase tracking-wider mb-3">Estimated Buffer Recovery</div>
        <div className="text-5xl font-bold font-display text-shield-600 mb-2">
          ~5 <span className="text-3xl text-ink-700">strong-income weeks</span>
        </div>
        <div className="mt-6 max-w-md mx-auto">
          <div className="flex justify-between text-sm text-ink-500 mb-2">
            <span>Current: {remainingDays} days</span>
            <span>Target: {target.recommendedDays} days</span>
          </div>
          <ProgressBar value={remainingDays} max={target.recommendedDays} height="h-4" />
        </div>
        <div className="mt-6">
          <Badge tone="vol">Predictive estimate based on historical earnings patterns — not guaranteed.</Badge>
        </div>
      </Card>

      <div className="text-center">
        <Button size="lg" onClick={() => onNavigate('comparison')}>
          See Volatility Comparison <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
