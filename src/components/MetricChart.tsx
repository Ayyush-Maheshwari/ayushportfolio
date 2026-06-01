import { useEffect, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';

type Point = { i: number; v: number }

function genSeries(seed: number, base: number, amp: number, len = 30): Point[] {
  const out: Point[] = []
  let v = base
  for (let i = 0; i < len; i++) {
    v += (Math.sin((i + seed) * 0.7) * amp) / 4 + (Math.random() - 0.5) * amp * 0.4
    v = Math.max(2, Math.min(98, v))
    out.push({ i, v: Math.round(v) })
  }
  return out
}

export default function MetricChart({
  label,
  unit = '%',
  color = '#3b82f6',
  base = 35,
  amp = 12,
  seed = 1,
}: {
  label: string
  unit?: string
  color?: string
  base?: number
  amp?: number
  seed?: number
}) {
  const [data, setData] = useState<Point[]>(() => genSeries(seed, base, amp))

  useEffect(() => {
    const t = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1]?.v ?? base
        const next = Math.max(
          2,
          Math.min(98, last + (Math.random() - 0.5) * amp * 1.4),
        )
        return [...prev.slice(1), { i: (prev[prev.length - 1]?.i ?? 0) + 1, v: Math.round(next) }]
      })
    }, 1500)
    return () => clearInterval(t)
  }, [amp, base])

  const current = data[data.length - 1]?.v ?? 0
  const gradId = `g-${label.replace(/\s+/g, '-')}`

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-baseline justify-between px-1 pb-1">
        <span className="text-[11px] uppercase tracking-wider text-muted">{label}</span>
        <span className="mono text-sm font-semibold text-slate-100">
          {current}
          <span className="ml-0.5 text-[11px] text-muted">{unit}</span>
        </span>
      </div>
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.45} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis hide domain={[0, 100]} />
            <Area
              type="monotone"
              dataKey="v"
              stroke={color}
              strokeWidth={1.5}
              fill={`url(#${gradId})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
