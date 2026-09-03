import { useEffect, useState } from 'react';
import { ArrowRight, Pause, Check, Shield, AlertTriangle, Lock } from 'lucide-react';
import type { ScreenId } from '@/types';
import { Button, Card } from '@/components/ui';
import { AnimatedNumber } from '@/components/AnimatedNumber';
import { DEMO_USER, computeShock, formatINR } from '@/lib/engine';

export function ShockModePage({
  onNavigate,
  bufferContribution,
}: {
  onNavigate: (s: ScreenId) => void;
  bufferContribution: number;
}) {
  const shock = computeShock(DEMO_USER, bufferContribution);
  const [visibleSteps, setVisibleSteps] = useState(0);

  const steps = [
    { label: 'Buffer Contributions', action: 'Paused', icon: Pause },
    { label: 'Optional Savings', action: 'Paused', icon: Pause },
    { label: 'Essential Expenses', action: 'Prioritized', icon: Check },
    { label: 'Financial Buffer', action: 'Available for release', icon: Shield },
    { label: 'Debt Firewall', action: 'Activated', icon: Lock },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSteps((s) => Math.min(s + 1, steps.length));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Banner */}
      <Card glow="shock" className="p-6 mb-6 bg-shock-600 border-shock-700 text-center">
        <div className="flex items-center justify-center gap-3">
          <AlertTriangle className="w-7 h-7 text-white animate-pulse" />
          <h1 className="text-3xl font-bold font-display text-white">SHOCK MODE ACTIVATED</h1>
        </div>
        <p className="text-red-100 mt-2">System priorities have automatically shifted to protect essential expenses.</p>
      </Card>

      {/* Steps */}
      <div className="space-y-3 mb-6">
        {steps.map((step, i) => (
          <Card
            key={step.label}
            className={`p-4 flex items-center gap-4 transition-all duration-500 ${
              i < visibleSteps ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            } ${step.action === 'Paused' ? 'border-mist-200' : step.action === 'Activated' ? 'border-shock-300 bg-red-50' : 'border-shield-300 bg-shield-50'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              step.action === 'Paused' ? 'bg-mist-100 text-ink-400' :
              step.action === 'Activated' ? 'bg-shock-100 text-shock-600' :
              'bg-shield-100 text-shield-600'
            }`}>
              <step.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-ink-900">{i + 1}. {step.label}</div>
            </div>
            <div className={`font-bold text-sm ${
              step.action === 'Paused' ? 'text-ink-400' :
              step.action === 'Activated' ? 'text-shock-600' :
              'text-shield-600'
            }`}>
              {step.action} {i < visibleSteps && <Check className="w-4 h-4 inline ml-1" />}
            </div>
          </Card>
        ))}
      </div>

      {/* Financial breakdown */}
      <Card className="p-6 mb-6">
        <h2 className="font-bold text-ink-900 text-lg mb-4">Shock Mode Financial Breakdown</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-mist-50 rounded-xl p-4">
            <div className="text-xs text-ink-400 font-semibold uppercase">Income</div>
            <div className="text-2xl font-bold text-ink-900 mt-1">{formatINR(shock.incomeAvailable)}</div>
          </div>
          <div className="bg-mist-50 rounded-xl p-4">
            <div className="text-xs text-ink-400 font-semibold uppercase">Essential Requirement</div>
            <div className="text-2xl font-bold text-ink-900 mt-1">{formatINR(shock.essentialExpenses)}</div>
          </div>
          <div className="bg-red-50 rounded-xl p-4">
            <div className="text-xs text-shock-600 font-semibold uppercase">Shortfall</div>
            <div className="text-2xl font-bold text-shock-600 mt-1">{formatINR(shock.shortfall)}</div>
          </div>
          <div className="bg-shield-50 rounded-xl p-4">
            <div className="text-xs text-shield-600 font-semibold uppercase">Available Buffer Used</div>
            <div className="text-2xl font-bold text-shield-600 mt-1">
              <AnimatedNumber value={shock.bufferUsed} prefix="₹" />
            </div>
          </div>
        </div>
        <div className="bg-shock-600 text-white rounded-xl p-5 text-center">
          <div className="text-sm font-semibold uppercase tracking-wider">Remaining Gap</div>
          <div className="text-4xl font-bold font-display mt-1">
            <AnimatedNumber value={shock.remainingGap} prefix="₹" />
          </div>
        </div>
      </Card>

      <div className="text-center">
        <Button size="lg" variant="shock" onClick={() => onNavigate('debt-firewall')}>
          See Debt Firewall <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
