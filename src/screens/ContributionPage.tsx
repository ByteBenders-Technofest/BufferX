import { useState } from 'react';
import { ArrowRight, ArrowDown, Wallet, Shield, TrendingUp, Settings2, Check } from 'lucide-react';
import type { ScreenId } from '@/types';
import { Button, Card, SectionLabel, Badge } from '@/components/ui';
import { ProtectionMeter } from '@/components/Charts';
import { AnimatedNumber } from '@/components/AnimatedNumber';
import { DEMO_USER, computeVolatility, computePredictive, computeBufferTarget, recommendContribution, formatINR, protectionDays } from '@/lib/engine';

export function ContributionPage({
  onNavigate,
  bufferContribution,
  setBufferContribution,
}: {
  onNavigate: (s: ScreenId) => void;
  bufferContribution: number;
  setBufferContribution: (n: number) => void;
}) {
  const vol = computeVolatility(DEMO_USER);
  const pred = computePredictive(DEMO_USER, vol);
  const target = computeBufferTarget(DEMO_USER, pred);

  const todayIncome = 1800;
  const typical = 850;
  const recommended = recommendContribution(
    todayIncome,
    typical,
    vol.level,
    target.gap,
    DEMO_USER.currentBuffer + bufferContribution,
    DEMO_USER.essentialExpenses
  );
  const recommendation = recommended > 0 ? recommended : 250;

  const [amount, setAmount] = useState(recommendation);
  const [protected_, setProtected] = useState(false);
  const [showAdjust, setShowAdjust] = useState(false);

  const newBuffer = DEMO_USER.currentBuffer + bufferContribution + (protected_ ? amount : 0);
  const newDays = protectionDays(newBuffer, DEMO_USER.essentialExpenses);

  const handleProtect = () => {
    setProtected(true);
    setBufferContribution(bufferContribution + amount);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <SectionLabel><Wallet className="w-3 h-3" /> Step 6 — Automated Smart Contribution</SectionLabel>
        <h1 className="mt-5 text-4xl sm:text-5xl font-bold font-display text-ink-900">Today's Smart Buffer Action</h1>
      </div>

      {/* Today's income */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-6 text-center">
          <div className="text-sm text-ink-400 font-medium">Today's Income</div>
          <div className="text-4xl font-bold font-display text-ink-900 mt-2">
            <AnimatedNumber value={todayIncome} prefix="₹" />
          </div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-sm text-ink-400 font-medium">Typical Daily Income</div>
          <div className="text-4xl font-bold font-display text-ink-500 mt-2">
            <AnimatedNumber value={typical} prefix="₹" />
          </div>
        </Card>
        <Card glow="shield" className="p-6 text-center">
          <div className="text-sm text-ink-400 font-medium">Classification</div>
          <div className="mt-2">
            <Badge tone="shield"><TrendingUp className="w-3 h-3" /> Very Strong Income Day</Badge>
          </div>
        </Card>
      </div>

      {/* Recommendation */}
      {!protected_ ? (
        <Card glow="shield" className="p-8 mb-6">
          <div className="text-center">
            <div className="text-sm text-ink-400 font-semibold uppercase tracking-wider mb-2">System Recommendation</div>
            <div className="text-5xl font-bold font-display text-shield-600 mb-2">
              Move <AnimatedNumber value={recommendation} prefix="₹" /> to Buffer
            </div>
            <div className="text-sm text-ink-500">Based on today's income being 2.1× your typical daily earnings</div>
          </div>

          {/* Flow diagram */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Card className="p-4 flex-1 max-w-xs text-center">
              <Wallet className="w-8 h-8 text-ink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-ink-900">{formatINR(todayIncome)}</div>
              <div className="text-xs text-ink-400">received today</div>
            </Card>
            <ArrowDown className="w-6 h-6 text-ink-400 sm:rotate-[-90deg]" />
            <Card className="p-4 flex-1 max-w-xs text-center border-shield-300 bg-shield-50">
              <Shield className="w-8 h-8 text-shield-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-shield-600">{formatINR(amount)}</div>
              <div className="text-xs text-shield-600">→ Financial Buffer</div>
            </Card>
            <ArrowDown className="w-6 h-6 text-ink-400 sm:rotate-[-90deg]" />
            <Card className="p-4 flex-1 max-w-xs text-center">
              <Wallet className="w-8 h-8 text-ink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-ink-900">{formatINR(todayIncome - amount)}</div>
              <div className="text-xs text-ink-400">available to Arun</div>
            </Card>
          </div>

          {/* Current protection */}
          <div className="mt-6 flex items-center justify-between bg-mist-50 rounded-xl p-4">
            <span className="text-sm font-medium text-ink-600">Current protection: {target.currentProtectionDays + protectionDays(bufferContribution, DEMO_USER.essentialExpenses)} / {target.recommendedDays} days</span>
          </div>

          {showAdjust && (
            <div className="mt-4 animate-slide-down">
              <div className="flex items-center gap-4 max-w-md mx-auto">
                <span className="text-sm text-ink-400">₹0</span>
                <input
                  type="range"
                  min={0}
                  max={Math.min(todayIncome, 500)}
                  step={10}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="flex-1 accent-shield-500"
                />
                <span className="text-sm font-bold text-ink-900 w-16 text-right">{formatINR(amount)}</span>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={handleProtect}>
              <Shield className="w-5 h-5" /> Protect {formatINR(amount)}
            </Button>
            <Button size="lg" variant="secondary" onClick={() => setShowAdjust(!showAdjust)}>
              <Settings2 className="w-4 h-4" /> Adjust Amount
            </Button>
          </div>
        </Card>
      ) : (
        <Card glow="shield" className="p-8 mb-6 animate-scale-in">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-shield-100 text-shield-600 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-display text-ink-900">Protected Successfully!</h2>
            <p className="text-ink-500 mt-2">{formatINR(amount)} moved to your financial buffer.</p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-mist-50 rounded-xl">
                <span className="text-sm text-ink-500">Buffer</span>
                <span className="font-bold text-ink-900">
                  {formatINR(DEMO_USER.currentBuffer + bufferContribution - amount)} → <span className="text-shield-600">{formatINR(DEMO_USER.currentBuffer + bufferContribution)}</span>
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-shield-50 rounded-xl">
                <span className="text-sm text-shield-600">Protection</span>
                <span className="font-bold text-shield-600">
                  {target.currentProtectionDays + protectionDays(bufferContribution - amount, DEMO_USER.essentialExpenses)} → {newDays} days
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <ProtectionMeter current={newDays} target={target.recommendedDays} size={180} />
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button size="lg" onClick={() => onNavigate('automation')}>
              View Automation Activity <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      )}

      {/* Automation rules */}
      <Card className="p-6">
        <h2 className="font-bold text-ink-900 text-lg mb-4">Adaptive Automation Rules</h2>
        <p className="text-sm text-ink-500 mb-4">BufferX doesn't recommend the same savings percentage every day. It adapts to your income.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Weak Day', desc: 'Income significantly below usual', amount: '₹0', color: 'text-ink-400' },
            { label: 'Normal Day', desc: 'Income near typical range', amount: 'Small', color: 'text-ink-600' },
            { label: 'Strong Day', desc: 'Income clearly above typical', amount: 'Moderate', color: 'text-shield-600' },
            { label: 'Exceptional Day', desc: 'Income significantly above normal', amount: 'Higher', color: 'text-shield-600' },
          ].map((r) => (
            <div key={r.label} className="bg-mist-50 rounded-xl p-4">
              <div className={`font-bold ${r.color}`}>{r.label}</div>
              <div className="text-xs text-ink-400 mt-1">{r.desc}</div>
              <div className={`text-lg font-bold mt-2 ${r.color}`}>{r.amount}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-ink-400">
          Recommendation depends on: today's income, normal daily income, current volatility, remaining protection gap, existing buffer, and essential expenses. If the buffer target is fully funded, recommendations reduce or pause.
        </div>
      </Card>
    </div>
  );
}
