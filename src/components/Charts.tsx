import { useEffect, useState } from 'react';

/** Animated SVG bar chart for monthly income */
export function IncomeChart({
  data,
  height = 260,
  highlightVolatility = false,
}: {
  data: { month: string; amount: number }[];
  height?: number;
  highlightVolatility?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const max = Math.max(...data.map((d) => d.amount)) * 1.12;
  const min = Math.min(...data.map((d) => d.amount));
  const avg = data.reduce((a, b) => a + b.amount, 0) / data.length;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full" style={{ height }}>
      <svg viewBox="0 0 700 260" className="w-full h-full overflow-visible" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((p) => (
          <line key={p} x1="40" y1={220 - p * 200} x2="690" y2={220 - p * 200} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
        ))}
        {/* Average line */}
        <line
          x1="40"
          y1={220 - (avg / max) * 200}
          x2="690"
          y2={220 - (avg / max) * 200}
          stroke="#6b7592"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity={mounted ? 0.5 : 0}
          style={{ transition: 'opacity 0.8s 0.5s' }}
        />
        <text x="690" y={220 - (avg / max) * 200 - 6} textAnchor="end" fontSize="11" fill="#6b7592" fontWeight="600">
          Avg ₹{(avg / 1000).toFixed(1)}K
        </text>

        {/* Bars */}
        {data.map((d, i) => {
          const barW = 70;
          const gap = (620 - barW * data.length) / (data.length + 1);
          const x = 40 + gap + i * (barW + gap);
          const barH = (d.amount / max) * 200;
          const y = 220 - barH;
          const isLow = d.amount < avg * 0.75;
          const isHigh = d.amount > avg * 1.2;
          const color = isLow ? '#f59e0b' : isHigh ? '#10b981' : '#27314f';
          const animH = mounted ? barH : 0;
          const animY = 220 - animH;

          return (
            <g key={d.month}>
              <rect
                x={x}
                y={animY}
                width={barW}
                height={animH}
                rx="8"
                fill={color}
                opacity={0.9}
                style={{ transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s` }}
              />
              {highlightVolatility && isLow && (
                <text x={x + barW / 2} y={animY - 8} textAnchor="middle" fontSize="10" fill="#d97706" fontWeight="700">
                  ↓
                </text>
              )}
              <text x={x + barW / 2} y={animY - 16} textAnchor="middle" fontSize="12" fill="#0f1729" fontWeight="700">
                ₹{(d.amount / 1000).toFixed(0)}K
              </text>
              <text x={x + barW / 2} y="240" textAnchor="middle" fontSize="11" fill="#6b7592">
                {d.month}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Semi-circular gauge for VRI score */
export function ScoreGauge({ score, size = 220 }: { score: number; size?: number }) {
  const [animated, setAnimated] = useState(0);
  const radius = 90;
  const circumference = Math.PI * radius; // half circle
  const targetOffset = circumference - (animated / 100) * circumference;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 400);
    return () => clearTimeout(t);
  }, [score]);

  const color = score >= 70 ? '#ef4444' : score >= 50 ? '#f59e0b' : '#10b981';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size / 2 + 30 }}>
      <svg width={size} height={size / 2 + 30} viewBox="0 0 220 140">
        {/* Background arc */}
        <path
          d="M 20 120 A 90 90 0 0 1 200 120"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <path
          d="M 20 120 A 90 90 0 0 1 200 120"
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={targetOffset}
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.22,1,0.36,1)', filter: `drop-shadow(0 0 6px ${color}66)` }}
        />
        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((p) => {
          const angle = Math.PI - (p / 100) * Math.PI;
          const x1 = 110 + 78 * Math.cos(angle);
          const y1 = 120 - 78 * Math.sin(angle);
          const x2 = 110 + 96 * Math.cos(angle);
          const y2 = 120 - 96 * Math.sin(angle);
          return (
            <line key={p} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#cbd5e1" strokeWidth="1.5" />
          );
        })}
      </svg>
      <div className="absolute bottom-0 flex flex-col items-center">
        <span className="text-5xl font-bold font-display text-ink-900 tabular">{animated}</span>
        <span className="text-sm text-ink-400 font-medium">/ 100</span>
      </div>
    </div>
  );
}

/** Circular protection meter showing days protected */
export function ProtectionMeter({
  current,
  target,
  size = 200,
  tone = 'shield',
}: {
  current: number;
  target: number;
  size?: number;
  tone?: 'shield' | 'shock';
}) {
  const [animated, setAnimated] = useState(0);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(animated / target, 1);
  const targetOffset = circumference - pct * circumference;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(current), 400);
    return () => clearTimeout(t);
  }, [current]);

  const color = tone === 'shock' ? '#ef4444' : '#10b981';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 200 200" className="-rotate-90">
        <circle cx="100" cy="100" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="14" />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={targetOffset}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)', filter: `drop-shadow(0 0 8px ${color}55)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold font-display text-ink-900 tabular">{animated}</span>
        <span className="text-xs text-ink-400 font-semibold uppercase tracking-wider">/ {target} days</span>
      </div>
    </div>
  );
}
