import type { ReactNode } from 'react';

export function Card({
  children,
  className = '',
  glow,
}: {
  children: ReactNode;
  className?: string;
  glow?: 'shield' | 'shock' | 'vol';
}) {
  const glowClass =
    glow === 'shield' ? 'shadow-glow-shield' :
    glow === 'shock' ? 'shadow-glow-shock' :
    glow === 'vol' ? 'shadow-glow-vol' : '';
  return (
    <div className={`bg-white rounded-2xl border border-mist-200 shadow-premium ${glowClass} ${className}`}>
      {children}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-shield-600 bg-shield-50 px-3 py-1.5 rounded-full">
      {children}
    </span>
  );
}

export function MetricCard({
  label,
  value,
  sublabel,
  tone = 'default',
  icon,
  delay = 0,
}: {
  label: string;
  value: ReactNode;
  sublabel?: string;
  tone?: 'default' | 'shield' | 'vol' | 'shock' | 'ink';
  icon?: ReactNode;
  delay?: number;
}) {
  const toneStyles = {
    default: 'text-ink-900',
    shield: 'text-shield-600',
    vol: 'text-vol-600',
    shock: 'text-shock-600',
    ink: 'text-ink-700',
  };
  const bgTone = {
    default: 'bg-mist-100',
    shield: 'bg-shield-50',
    vol: 'bg-vol-50',
    shock: 'bg-red-50',
    ink: 'bg-ink-900/5',
  };

  return (
    <Card className={`p-5 animate-fade-up`} >
      <div className="flex items-start justify-between mb-3" style={{ animationDelay: `${delay}ms` }}>
        <span className="text-sm font-medium text-ink-500">{label}</span>
        {icon && <span className={`${bgTone[tone]} ${toneStyles[tone]} p-2 rounded-lg`}>{icon}</span>}
      </div>
      <div className={`text-3xl font-bold font-display ${toneStyles[tone]} leading-tight`}>{value}</div>
      {sublabel && <div className="text-sm text-ink-400 mt-1">{sublabel}</div>}
    </Card>
  );
}

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'shield' | 'vol' | 'shock' | 'info';
}) {
  const styles = {
    neutral: 'bg-mist-100 text-ink-600',
    shield: 'bg-shield-100 text-shield-700',
    vol: 'bg-vol-100 text-vol-700',
    shock: 'bg-red-100 text-shock-700',
    info: 'bg-blue-50 text-blue-700',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${styles[tone]}`}>
      {children}
    </span>
  );
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'shock' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}) {
  const variants = {
    primary: 'bg-shield-500 text-white hover:bg-shield-600 shadow-premium',
    secondary: 'bg-white text-ink-700 border border-mist-300 hover:border-ink-400 hover:bg-mist-50',
    ghost: 'text-ink-600 hover:bg-mist-100',
    shock: 'bg-shock-500 text-white hover:bg-shock-600 shadow-premium',
    dark: 'bg-ink-900 text-white hover:bg-ink-800 shadow-premium',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

export function ProgressBar({
  value,
  max,
  tone = 'shield',
  height = 'h-4',
  showGlow = true,
}: {
  value: number;
  max: number;
  tone?: 'shield' | 'vol' | 'shock';
  height?: string;
  showGlow?: boolean;
}) {
  const pct = Math.min((value / max) * 100, 100);
  const toneGrad = {
    shield: 'from-shield-400 to-shield-600',
    vol: 'from-vol-400 to-vol-600',
    shock: 'from-shock-400 to-shock-600',
  };
  return (
    <div className={`w-full ${height} bg-mist-200 rounded-full overflow-hidden relative`}>
      <div
        className={`h-full bg-gradient-to-r ${toneGrad[tone]} rounded-full transition-all duration-1000 ease-out ${showGlow ? 'shadow-[0_0_12px_rgba(16,185,129,0.4)]' : ''}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function RiskTag({ level }: { level: 'LOW' | 'MODERATE' | 'HIGH' | 'VERY HIGH' | 'Insufficient' | 'Adequate' | string }) {
  const map: Record<string, { bg: string; text: string; dot: string }> = {
    LOW: { bg: 'bg-shield-100', text: 'text-shield-700', dot: 'bg-shield-500' },
    MODERATE: { bg: 'bg-vol-100', text: 'text-vol-700', dot: 'bg-vol-500' },
    HIGH: { bg: 'bg-vol-100', text: 'text-vol-700', dot: 'bg-vol-500' },
    'VERY HIGH': { bg: 'bg-red-100', text: 'text-shock-700', dot: 'bg-shock-500' },
    Insufficient: { bg: 'bg-red-100', text: 'text-shock-700', dot: 'bg-shock-500' },
    Adequate: { bg: 'bg-shield-100', text: 'text-shield-700', dot: 'bg-shield-500' },
  };
  const s = map[level] || map.MODERATE;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {level}
    </span>
  );
}
