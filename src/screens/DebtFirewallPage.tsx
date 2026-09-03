import { ArrowRight, Shield, X, TrendingDown, Check } from 'lucide-react';
import type { ScreenId } from '@/types';
import { Button, Card, SectionLabel, Badge } from '@/components/ui';
import { AnimatedNumber } from '@/components/AnimatedNumber';
import { DEMO_USER, computeShock, formatINR } from '@/lib/engine';

export function DebtFirewallPage({
  onNavigate,
  bufferContribution,
}: {
  onNavigate: (s: ScreenId) => void;
  bufferContribution: number;
}) {
  const shock = computeShock(DEMO_USER, bufferContribution);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8 text-center">
        <SectionLabel><Shield className="w-3 h-3" /> Debt Firewall</SectionLabel>
        <h1 className="mt-5 text-4xl sm:text-5xl font-bold font-display text-ink-900">Borrow Only What Is Actually Missing</h1>
        <p className="mt-3 text-lg text-ink-500 max-w-2xl mx-auto">BufferX uses the worker's own financial protection before recommending external credit.</p>
      </div>

      {/* Comparison */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* WITHOUT BUFFERX */}
        <Card className="p-6 border-red-200 bg-red-50/30">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-shock-600 flex items-center justify-center">
              <X className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-ink-900 text-lg">WITHOUT BufferX</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-red-100">
              <span className="text-ink-600">Income</span>
              <span className="font-bold text-ink-900">{formatINR(shock.incomeAvailable)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-red-100">
              <span className="text-ink-600">Essential expenses</span>
              <span className="font-bold text-ink-900">{formatINR(shock.essentialExpenses)}</span>
            </div>
            <div className="flex justify-between items-center py-4 bg-red-100 rounded-xl px-4">
              <span className="text-shock-700 font-semibold">Emergency borrowing needed</span>
              <span className="text-3xl font-bold text-shock-600">
                <AnimatedNumber value={shock.shortfall} prefix="₹" />
              </span>
            </div>
          </div>
        </Card>

        {/* WITH BUFFERX */}
        <Card glow="shield" className="p-6 border-shield-300 bg-shield-50/30">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-shield-100 text-shield-600 flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-ink-900 text-lg">WITH BufferX</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-shield-100">
              <span className="text-ink-600">Income</span>
              <span className="font-bold text-ink-900">{formatINR(shock.incomeAvailable)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-shield-100">
              <span className="text-ink-600">Own Buffer</span>
              <span className="font-bold text-shield-600">{formatINR(shock.bufferUsed)}</span>
            </div>
            <div className="flex justify-between items-center py-4 bg-shield-100 rounded-xl px-4">
              <span className="text-shield-700 font-semibold">Remaining gap</span>
              <span className="text-3xl font-bold text-shield-700">
                <AnimatedNumber value={shock.remainingGap} prefix="₹" />
              </span>
            </div>
          </div>
          <div className="mt-3 text-xs text-ink-400">Potential responsible credit requirement: {formatINR(shock.remainingGap)}</div>
        </Card>
      </div>

      {/* Big impact */}
      <Card glow="shield" className="p-10 mb-6 bg-gradient-to-br from-ink-900 to-ink-800 border-ink-800 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-shield-500/15 rounded-full blur-3xl" />
        <div className="relative">
          <Shield className="w-12 h-12 text-shield-400 mx-auto mb-3" fill="currentColor" />
          <div className="text-6xl font-bold font-display text-shield-400 mb-2">
            <AnimatedNumber value={shock.debtAvoided} prefix="₹" />
          </div>
          <div className="text-2xl font-bold text-white mb-4">DEBT AVOIDED</div>
          <div className="inline-block px-6 py-3 rounded-xl bg-shield-500/20 text-shield-300 font-bold text-lg">
            <AnimatedNumber value={shock.borrowingReduction} suffix="% Less Emergency Borrowing" />
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6 text-center border-shield-200 bg-shield-50/50">
        <h2 className="text-2xl font-bold font-display text-ink-900">Debt Firewall</h2>
        <p className="text-ink-600 mt-2 max-w-xl mx-auto">"BufferX uses the worker's own financial protection before recommending external credit."</p>
        <div className="mt-4">
          <Badge tone="vol">Credit Recommendation — Prototype Only</Badge>
        </div>
      </Card>

      <div className="text-center">
        <Button size="lg" onClick={() => onNavigate('recovery')}>
          See Recovery Plan <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
