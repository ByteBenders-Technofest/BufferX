import { ArrowRight, TrendingUp, TrendingDown, Shield, Cpu, Brain, Database, Zap, Eye, Webhook } from 'lucide-react';
import type { ScreenId } from '@/types';
import { Button, Card, SectionLabel, Badge } from '@/components/ui';
import { WORKER_COMPARISON, classifyVolatility, recommendedProtectionDays, formatINR } from '@/lib/engine';

export function ComparisonPage({ onNavigate }: { onNavigate: (s: ScreenId) => void }) {
  const { stable, irregular } = WORKER_COMPARISON;

  const calcAvg = (arr: number[]) => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  const stableAvg = calcAvg(stable.income);
  const irregularAvg = calcAvg(irregular.income);

  const TechLayer = [
    { icon: Brain, title: 'AI/ML', desc: 'Income-risk pattern detection' },
    { icon: TrendingUp, title: 'Predictive Analytics', desc: 'Financial shortfall probability and recovery estimates' },
    { icon: Database, title: 'Open Banking / AA APIs', desc: 'Consent-based financial data access' },
    { icon: Zap, title: 'Automation', desc: 'Adaptive savings and Shock Mode' },
    { icon: Eye, title: 'Explainable AI', desc: 'Every protection decision includes a reason' },
    { icon: Webhook, title: 'Event-Driven Banking', desc: 'Income events automatically trigger buffer decisions' },
  ];

  const APIIntegration = [
    {
      title: 'Account Aggregator / Banking API',
      desc: 'Provides transaction history, account inflows, recurring expenses, balance information',
      badge: 'Demo API',
    },
    {
      title: 'Gig Earnings API',
      desc: 'Provides daily gig earnings, work frequency, earning source, platform payouts',
      badge: 'Demo API',
    },
    {
      title: 'Payment / Savings API',
      desc: 'Future integration: moves approved buffer contributions into a protected savings account. Simulated for prototype.',
      badge: 'Future',
    },
    {
      title: 'Responsible Credit API',
      desc: 'Future lender integration activated ONLY when Income + Buffer < Essential Expenses. Sends only residual gap (e.g. ₹400). Never auto-offers large loans.',
      badge: 'Future',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8 text-center">
        <SectionLabel><Shield className="w-3 h-3" /> The Core Innovation</SectionLabel>
        <h1 className="mt-5 text-4xl sm:text-5xl font-bold font-display text-ink-900">Volatility Comparison</h1>
      </div>

      {/* Comparison cards */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Worker A - Stable */}
        <Card className="p-6 border-shield-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-ink-900 text-xl">{stable.name} — Stable</h2>
              <div className="text-sm text-ink-400">Predictable monthly income</div>
            </div>
            <Badge tone="shield"><TrendingUp className="w-3 h-3" /> {stable.volatility}</Badge>
          </div>

          {/* Mini chart */}
          <div className="flex items-end gap-3 h-32 mb-4">
            {stable.income.map((val, i) => {
              const max = Math.max(...stable.income);
              const h = (val / max) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-shield-400 rounded-t-md transition-all duration-700" style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }} />
                  <span className="text-xs text-ink-400 font-medium">₹{val / 1000}K</span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-mist-50 rounded-lg p-3 text-center">
              <div className="text-xs text-ink-400">Average</div>
              <div className="font-bold text-ink-900">{formatINR(stableAvg)}</div>
            </div>
            <div className="bg-mist-50 rounded-lg p-3 text-center">
              <div className="text-xs text-ink-400">Volatility</div>
              <div className="font-bold text-shield-600">Low</div>
            </div>
            <div className="bg-shield-50 rounded-lg p-3 text-center">
              <div className="text-xs text-shield-600">Protection</div>
              <div className="font-bold text-shield-600 text-lg">{stable.protection}d</div>
            </div>
          </div>
        </Card>

        {/* Worker B - Irregular */}
        <Card className="p-6 border-vol-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-ink-900 text-xl">{irregular.name} — Irregular</h2>
              <div className="text-sm text-ink-400">Unpredictable monthly income</div>
            </div>
            <Badge tone="vol"><TrendingDown className="w-3 h-3" /> {irregular.volatility}</Badge>
          </div>

          {/* Mini chart */}
          <div className="flex items-end gap-3 h-32 mb-4">
            {irregular.income.map((val, i) => {
              const max = Math.max(...irregular.income);
              const h = (val / max) * 100;
              const isLow = val < irregularAvg * 0.7;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className={`w-full rounded-t-md transition-all duration-700 ${isLow ? 'bg-vol-500' : 'bg-vol-400'}`} style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }} />
                  <span className="text-xs text-ink-400 font-medium">₹{val / 1000}K</span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-mist-50 rounded-lg p-3 text-center">
              <div className="text-xs text-ink-400">Average</div>
              <div className="font-bold text-ink-900">{formatINR(irregularAvg)}</div>
            </div>
            <div className="bg-mist-50 rounded-lg p-3 text-center">
              <div className="text-xs text-ink-400">Volatility</div>
              <div className="font-bold text-vol-600">High</div>
            </div>
            <div className="bg-vol-50 rounded-lg p-3 text-center">
              <div className="text-xs text-vol-600">Protection</div>
              <div className="font-bold text-vol-600 text-lg">{irregular.protection}d</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Key message */}
      <Card className="p-8 mb-8 bg-gradient-to-br from-ink-900 to-ink-800 border-ink-800 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
          Same average income does not mean the same financial risk.
        </h2>
        <p className="text-mist-300 mt-3 max-w-xl mx-auto">
          Worker A and Worker B earn similar averages — but Worker B needs <span className="text-vol-400 font-bold">2× the protection</span> because income arrives unpredictably.
        </p>
      </Card>

      {/* Technology layer */}
      <div className="mb-8">
        <SectionLabel><Cpu className="w-3 h-3" /> Technology Behind BufferX</SectionLabel>
        <h2 className="mt-4 text-2xl font-bold font-display text-ink-900 mb-5">Emerging Technology Layer</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TechLayer.map((t) => (
            <Card key={t.title} className="p-5 hover:shadow-premium-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-ink-900/5 text-ink-700 flex items-center justify-center shrink-0">
                  <t.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-ink-900">{t.title}</h3>
                  <p className="text-sm text-ink-500 mt-1">{t.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* API architecture */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold font-display text-ink-900 mb-5">API Integration Architecture</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {APIIntegration.map((api) => (
            <Card key={api.title} className="p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-ink-900">{api.title}</h3>
                <Badge tone={api.badge === 'Demo API' ? 'info' : 'vol'}>{api.badge}</Badge>
              </div>
              <p className="text-sm text-ink-500">{api.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Final message */}
      <Card glow="shield" className="p-10 sm:p-14 bg-gradient-to-br from-ink-900 to-ink-800 border-ink-800 text-center relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-shield-500/10 rounded-full blur-3xl" />
        <div className="relative">
          <Shield className="w-14 h-14 text-shield-400 mx-auto mb-6" fill="currentColor" />
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white leading-tight">
            Gig workers don't need another budgeting app.
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-shield-400 mt-3">
            They need a financial shock absorber.
          </h3>
          <p className="text-mist-300 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            BufferX dynamically builds that shock absorber based on how unpredictable each worker's income actually is.
          </p>
        </div>
      </Card>

      <div className="text-center">
        <Button size="lg" onClick={() => onNavigate('landing')}>
          Back to Start <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
