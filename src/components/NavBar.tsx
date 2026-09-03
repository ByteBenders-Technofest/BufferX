import { Shield } from 'lucide-react';
import type { ScreenId } from '@/types';
import { Button } from './ui';

const FLOW_SCREENS: ScreenId[] = [
  'landing',
  'connect',
  'raw-data',
  'volatility',
  'predictive',
  'buffer-target',
  'contribution',
  'automation',
  'shock',
  'shock-mode',
  'debt-firewall',
  'recovery',
  'comparison',
];

const SCREEN_LABELS: Record<ScreenId, string> = {
  landing: 'Home',
  connect: 'Connect',
  'raw-data': 'Income',
  volatility: 'VRI Engine',
  predictive: 'Outlook',
  'buffer-target': 'Target',
  contribution: 'Smart Save',
  automation: 'Automation',
  shock: 'Shock',
  'shock-mode': 'Shock Mode',
  'debt-firewall': 'Debt Firewall',
  recovery: 'Recovery',
  comparison: 'Compare',
};

export function NavBar({
  current,
  onNavigate,
  shockActive,
}: {
  current: ScreenId;
  onNavigate: (s: ScreenId) => void;
  shockActive: boolean;
}) {
  const currentIdx = FLOW_SCREENS.indexOf(current);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${shockActive ? 'bg-shock-600' : 'bg-white/85 backdrop-blur-md'} border-b ${shockActive ? 'border-shock-700' : 'border-mist-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 shrink-0">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${shockActive ? 'bg-white' : 'bg-ink-900'}`}>
            <Shield className={`w-5 h-5 ${shockActive ? 'text-shock-600' : 'text-shield-400'}`} fill="currentColor" />
          </div>
          <div className="hidden sm:block text-left">
            <div className={`font-bold font-display text-lg leading-none ${shockActive ? 'text-white' : 'text-ink-900'}`}>BufferX</div>
            <div className={`text-[10px] ${shockActive ? 'text-red-100' : 'text-ink-400'} leading-none mt-0.5`}>Financial Shock Absorber</div>
          </div>
        </button>

        {/* Progress dots */}
        <div className="hidden lg:flex items-center gap-1.5 flex-1 max-w-2xl mx-4">
          {FLOW_SCREENS.map((s, i) => (
            <button
              key={s}
              onClick={() => onNavigate(s)}
              className={`group relative flex-1 transition-all duration-200 ${i <= currentIdx ? '' : 'opacity-40 hover:opacity-80'}`}
              title={SCREEN_LABELS[s]}
            >
              <div className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIdx ? 'bg-shield-500 h-2' : i < currentIdx ? 'bg-shield-400' : shockActive ? 'bg-red-300' : 'bg-mist-300'}`} />
              <span className={`absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap px-2 py-0.5 rounded ${i === currentIdx ? (shockActive ? 'bg-white text-shock-700' : 'bg-ink-900 text-white') : 'opacity-0 group-hover:opacity-100 bg-ink-900 text-white'} transition-opacity`}>
                {SCREEN_LABELS[s]}
              </span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <span className={`hidden sm:inline text-sm font-medium ${shockActive ? 'text-red-100' : 'text-ink-500'}`}>Demo: Arun Kumar</span>
          <Button size="sm" variant={shockActive ? 'secondary' : 'dark'} onClick={() => onNavigate('shock')}>
            {shockActive ? 'Shock Active' : 'Simulate Shock'}
          </Button>
        </div>
      </div>
    </header>
  );
}
