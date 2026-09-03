import { ArrowRight, Bike, Car, Laptop, Scissors, GraduationCap, Wrench, Shirt, User, Shield, ShieldCheck, Zap, Activity, Sparkles } from 'lucide-react';
import type { ScreenId } from '@/types';
import { Button, Card, SectionLabel } from '@/components/ui';

const WORKERS = [
  { icon: Bike, label: 'Delivery Partner' },
  { icon: Car, label: 'Driver' },
  { icon: Laptop, label: 'Freelancer' },
  { icon: Scissors, label: 'Beautician' },
  { icon: GraduationCap, label: 'Tutor' },
  { icon: Wrench, label: 'Technician' },
  { icon: Shirt, label: 'Tailor' },
  { icon: User, label: 'Independent Worker' },
];

const FLOW_STEPS = [
  { icon: Activity, label: 'Connect Income', color: 'text-blue-600 bg-blue-50' },
  { icon: Zap, label: 'Measure Risk', color: 'text-vol-600 bg-vol-50' },
  { icon: Shield, label: 'Build Buffer', color: 'text-shield-600 bg-shield-50' },
  { icon: ShieldCheck, label: 'Absorb Shock', color: 'text-ink-700 bg-ink-900/5' },
];

export function LandingPage({ onNavigate }: { onNavigate: (s: ScreenId) => void }) {
  return (
    <div className="bg-mist-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-mist-50" />
        <div className="absolute top-20 -right-20 w-96 h-96 bg-shield-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 -left-20 w-80 h-80 bg-vol-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24">
          <div className="max-w-3xl">
            <SectionLabel>
              <Sparkles className="w-3 h-3" /> AI-Driven Financial Resilience for Irregular Earners
            </SectionLabel>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold font-display text-ink-900 leading-[1.05] tracking-tight text-balance animate-fade-up">
              Your income changes.
              <br />
              <span className="text-shield-600">Your financial protection</span> should too.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-500 leading-relaxed max-w-2xl animate-fade-up" style={{ animationDelay: '100ms' }}>
              BufferX uses income data, AI-driven volatility analysis, automation and predictive analytics to build the right financial safety buffer for irregular earners.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <Button size="lg" onClick={() => onNavigate('connect')}>
                Check My Financial Safety <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                See How It Works
              </Button>
            </div>
          </div>

          {/* Flow animation */}
          <div id="how-it-works" className="mt-20 scroll-mt-24">
            <Card className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                {FLOW_STEPS.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-4 lg:flex-1 w-full">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${step.color} shrink-0`}>
                        <step.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-xs text-ink-400 font-semibold">Step {i + 1}</div>
                        <div className="text-lg font-bold text-ink-900">{step.label}</div>
                      </div>
                    </div>
                    {i < FLOW_STEPS.length - 1 && (
                      <div className="hidden lg:flex items-center w-12 shrink-0">
                        <div className="h-0.5 flex-1 bg-gradient-to-r from-mist-300 to-mist-300 relative overflow-hidden">
                          <div className="absolute inset-0 bg-shield-400 animate-flow-pulse origin-left" />
                        </div>
                        <ArrowRight className="w-4 h-4 text-mist-400 -ml-1" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* WORKER TYPES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink-900">Built for every irregular earner</h2>
          <p className="mt-3 text-ink-500">If your income changes from week to week, BufferX adapts your protection to match.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {WORKERS.map((w, i) => (
            <Card key={w.label} className="p-5 flex flex-col items-center text-center gap-3 hover:shadow-premium-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer animate-fade-up" >
              <div className="w-12 h-12 rounded-xl bg-mist-100 flex items-center justify-center group-hover:bg-shield-50 transition-colors" style={{ animationDelay: `${i * 50}ms` }}>
                <w.icon className="w-6 h-6 text-ink-600" />
              </div>
              <span className="text-sm font-semibold text-ink-700">{w.label}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* CORE INNOVATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <Card glow="shield" className="p-8 lg:p-10">
            <SectionLabel>The Core Innovation</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold font-display text-ink-900 leading-tight">
              The more unpredictable your income, the more protection BufferX builds.
            </h2>
            <p className="mt-4 text-ink-500 leading-relaxed">
              Traditional savings systems tell everyone "save 10%." BufferX doesn't. It measures how volatile your income actually is, calculates how many days of essential expenses you need to protect, and saves more aggressively during strong-income periods — automatically.
            </p>
            <Button className="mt-6" onClick={() => onNavigate('comparison')}>
              See the Comparison <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>

          <div className="space-y-4">
            {[
              { q: 'How unpredictable is this income?', a: 'Volatility Resilience Index analyzes standard deviation, downside risk, and income frequency.' },
              { q: 'How many days should be protected?', a: 'Dynamic target scales from 15 days (stable) to 45 days (very volatile).' },
              { q: 'When should savings activate?', a: 'Only on strong and exceptional earning days. Never on weak days.' },
              { q: 'When should the buffer release?', a: 'Automatically when income falls below essential expenses — Shock Mode.' },
            ].map((item, i) => (
              <Card key={i} className="p-5 animate-fade-up" >
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-shield-100 text-shield-600 flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                  <div>
                    <h3 className="font-semibold text-ink-900">{item.q}</h3>
                    <p className="text-sm text-ink-500 mt-1">{item.a}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <Card className="p-10 sm:p-14 bg-gradient-to-br from-ink-900 to-ink-800 border-ink-800 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-shield-500/10 rounded-full blur-3xl" />
          <div className="relative">
            <Shield className="w-12 h-12 text-shield-400 mx-auto mb-4" fill="currentColor" />
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">Start Arun's Demo Journey</h2>
            <p className="mt-3 text-lg text-mist-300 max-w-xl mx-auto">See how BufferX analyses 6 months of irregular income and builds a personalized safety buffer.</p>
            <Button size="lg" className="mt-8" onClick={() => onNavigate('connect')}>
              Check My Financial Safety <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
