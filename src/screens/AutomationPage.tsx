import { ArrowRight, Zap, Check, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import type { ScreenId, IncomeDay } from '@/types';
import { Button, Card, SectionLabel, Badge } from '@/components/ui';
import { AUTOMATION_LOG, formatINR } from '@/lib/engine';

const classConfig: Record<IncomeDay['classification'], { label: string; tone: 'shield' | 'vol' | 'shock' | 'neutral' }> = {
  WEAK: { label: 'Low earning day', tone: 'vol' },
  NORMAL: { label: 'Normal earning day', tone: 'neutral' },
  STRONG: { label: 'Above-average day', tone: 'shield' },
  EXCEPTIONAL: { label: 'Strong earning day', tone: 'shield' },
};

export function AutomationPage({ onNavigate }: { onNavigate: (s: ScreenId) => void }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <SectionLabel><Zap className="w-3 h-3" /> Step 7 — Buffer Automation</SectionLabel>
        <h1 className="mt-5 text-4xl sm:text-5xl font-bold font-display text-ink-900">Buffer Automation</h1>
        <p className="mt-3 text-lg text-ink-500">Recent automated decisions — BufferX saves when you can afford to save, not because the calendar says so.</p>
      </div>

      {/* Activity log */}
      <div className="space-y-3 mb-6">
        {AUTOMATION_LOG.map((entry, i) => {
          const config = classConfig[entry.classification];
          const isProtected = entry.status === 'Protected';
          const isWeak = entry.classification === 'WEAK';
          const icon = entry.income > 850 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;

          return (
            <Card
              key={i}
              className={`p-5 flex items-center gap-4 animate-fade-up ${i === 0 ? 'ring-2 ring-shield-300' : ''}`}
            >
              {/* Date */}
              <div className="shrink-0 w-20">
                <div className="text-sm font-bold text-ink-900">{entry.label}</div>
              </div>

              {/* Income */}
              <div className="shrink-0 w-24 text-right">
                <div className="text-xs text-ink-400">Income</div>
                <div className="text-lg font-bold text-ink-900 tabular">{formatINR(entry.income)}</div>
              </div>

              {/* Decision */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge tone={config.tone}>{icon} {config.label}</Badge>
                </div>
                <div className="text-sm text-ink-500 mt-1">
                  {entry.recommended > 0 ? (
                    <>Recommended contribution: <span className="font-semibold text-ink-700">{formatINR(entry.recommended)}</span></>
                  ) : (
                    <>No saving requested</>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="shrink-0">
                {isProtected ? (
                  <div className="flex items-center gap-2 text-shield-600">
                    <div className="w-7 h-7 rounded-full bg-shield-100 flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold hidden sm:inline">Protected</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-ink-400">
                    <div className="w-7 h-7 rounded-full bg-mist-100 flex items-center justify-center">
                      <Activity className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold hidden sm:inline">Skipped</span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 border-shield-200 bg-shield-50/50 mb-6 text-center">
        <p className="text-lg text-ink-700 font-medium">
          "BufferX saves when you can afford to save, not simply because the calendar says so."
        </p>
      </Card>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-5 text-center">
          <div className="text-3xl font-bold text-shield-600">{AUTOMATION_LOG.filter(e => e.recommended > 0).length}</div>
          <div className="text-xs text-ink-400 mt-1">Protected days</div>
        </Card>
        <Card className="p-5 text-center">
          <div className="text-3xl font-bold text-ink-400">{AUTOMATION_LOG.filter(e => e.recommended === 0).length}</div>
          <div className="text-xs text-ink-400 mt-1">Skipped (weak days)</div>
        </Card>
        <Card className="p-5 text-center">
          <div className="text-3xl font-bold text-ink-900">{formatINR(AUTOMATION_LOG.reduce((a, b) => a + b.recommended, 0))}</div>
          <div className="text-xs text-ink-400 mt-1">Total contributed</div>
        </Card>
      </div>

      <div className="text-center">
        <Button size="lg" variant="shock" onClick={() => onNavigate('shock')}>
          Simulate 50% Income Drop <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
