import type { RateHistoryPoint } from '@/lib/types';
import styles from './CurrencyConverter.module.css';

interface RateChartProps {
  points: RateHistoryPoint[];
  from: string;
  to: string;
}

const W = 560;
const H = 180;
const PAD = { top: 16, right: 16, bottom: 28, left: 60 };

function formatRate(rate: number): string {
  const digits = rate >= 100 ? 0 : rate >= 10 ? 2 : 4;
  return rate.toLocaleString('ja-JP', { maximumFractionDigits: digits });
}

export function RateChart({ points, from, to }: RateChartProps) {
  if (points.length < 2) return null;

  const rates = points.map((p) => p.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const range = maxRate - minRate || 1;

  const cw = W - PAD.left - PAD.right;
  const ch = H - PAD.top - PAD.bottom;

  const px = (i: number) => PAD.left + (i / (points.length - 1)) * cw;
  const py = (rate: number) => PAD.top + ch - ((rate - minRate) / range) * ch;

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${px(i)},${py(p.rate)}`)
    .join(' ');

  const areaPath =
    linePath +
    ` L${px(points.length - 1)},${PAD.top + ch} L${PAD.left},${PAD.top + ch} Z`;

  const labelIndices = [0, Math.floor((points.length - 1) / 2), points.length - 1];
  const yTicks = [0, 0.5, 1];

  return (
    <div className={styles.chart}>
      <div className={styles.chartTitle}>
        {from} / {to} レート推移（過去30日）
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={styles.chartSvg}
        role="img"
        aria-label={`${from}/${to} 過去30日間のレート推移グラフ`}
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>

        {yTicks.map((t) => {
          const yPos = PAD.top + ch * (1 - t);
          return (
            <g key={t}>
              <line
                x1={PAD.left} y1={yPos}
                x2={PAD.left + cw} y2={yPos}
                stroke="#e5e7eb" strokeWidth="1"
              />
              <text
                x={PAD.left - 6} y={yPos}
                textAnchor="end" dominantBaseline="middle"
                className={styles.chartLabel}
              >
                {formatRate(minRate + range * t)}
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill="url(#areaGrad)" />
        <path d={linePath} fill="none" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />

        {[0, points.length - 1].map((i) => (
          <circle key={i} cx={px(i)} cy={py(points[i].rate)} r="3.5" fill="#2563eb" />
        ))}

        {labelIndices.map((i) => (
          <text
            key={i}
            x={px(i)} y={H - 4}
            textAnchor={i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'}
            className={styles.chartLabel}
          >
            {points[i].date}
          </text>
        ))}
      </svg>
    </div>
  );
}
