import { useEffect, useState } from 'react';
import { AlertTriangle, ArrowRight, Activity, TrendingDown, Zap } from 'lucide-react';
import type { ScreenId } from '@/types';
import { Button, Card } from '@/components/ui';
import { AnimatedNumber } from '@/components/AnimatedNumber';
import { DEMO_USER, computeShock, formatINR } from '@/lib/engine';

export function ShockPage({
  onNavigate,
  bufferContribution,
}: {
  onNavigate: (s: ScreenId) => void;
  bufferContribution: number;
}) {
  const [triggered, setTriggered] = useState(false);
  const shock = computeShock(DEMO_USER, bufferContribution);

  useEffect(() => {
    if (triggered) {
      const t = setTimeout(() => onNavigate('shock-mode'), 2200);
      return () => clearTimeout(t);
    }
  }, [triggered, onNavigate]);

  if (!triggered) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-shock-600 bg-red-50 px-3 py-1.5 rounded-full mb-5">
            <Activity className="w-3 h-3" /> Hero Demo — Shock Detection Engine
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-ink-900">Shock Detection</h1>
          <p className="mt-3 text-lg text-ink-500">BufferX continuously monitors cash flow. When income drops significantly below your historical baseline, Shock Mode activates automatically.</p>
        </div>

        <Card className="p-10 text-center border-shock-200 bg-gradient-to-br from-red-50 to-white">
          <div className="w-20 h-20 rounded-full bg-shock-100 text-shock-600 flex items-center justify-center mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full border-2 border-shock-400 animate-pulse-ring" />
            <TrendingDown className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-ink-900 mb-2">Ready to simulate an income shock?</h2>
          <p className="text-ink-500 mb-8 max-w-md mx-auto">This will simulate a 50% drop in Arun's income and show how BufferX automatically responds.</p>
          <Button size="lg" variant="shock" onClick={() => setTriggered(true)} className="animate-shake-x">
            <Zap className="w-5 h-5" /> Simulate 50% Income Drop
          </Button>
        </Card>
      </div>
    );
  }

  // Triggered state — animated detection
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Card glow="shock" className="p-8 border-shock-400 bg-red-50 animate-shake-x">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-shock-600 text-sm font-bold uppercase tracking-wider mb-4">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
            Income Shock Detected
          </div>
          <h1 className="text-5xl font-bold font-display text-shock-600 mb-4">🚨 Income Shock Detected</h1>
          <p className="text-ink-700 text-lg mb-6">Detected through AI/ML cash-flow monitoring</p>
          <p className="text-ink-500 mb-8">Income has fallen significantly below Arun's historical baseline.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-xs text-ink-400 font-semibold uppercase">Expected Expenses</div>
            <div className="text-2xl font-bold text-ink-900 mt-1">{formatINR(shock.essentialExpenses)}</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-xs text-ink-400 font-semibold uppercase">Income Available</div>
            <div className="text-2xl font-bold text-ink-900 mt-1">{formatINR(shock.incomeAvailable)}</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border-2 border-shock-300">
            <div className="text-xs text-shock-600 font-semibold uppercase">Financial Shortfall</div>
            <div className="text-3xl font-bold text-shock-600 mt-1">
              <AnimatedNumber value={shock.shortfall} prefix="₹" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block px-6 py-3 rounded-xl bg-shock-600 text-white font-bold text-xl animate-pulse">
            Activating SHOCK MODE...
          </div>
        </div>
      </Card>
    </div>
  );
}
