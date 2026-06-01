import { useEffect, useState } from 'react'
import type { ViewKey } from './Sidebar'

const VIEW_LABEL: Record<ViewKey, string> = {
  overview: '/overview',
  services: '/services',
  deployments: '/deployments',
  containers: '/containers',
  system: '/system-config',
}

export default function StatusBar({ view }: { view: ViewKey }) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 2000)
    return () => clearInterval(t)
  }, [])

  // synthetic, stable-ish metrics for visual flavor
  const cpu = 18 + ((tick * 7) % 22)
  const mem = 42 + ((tick * 11) % 16)
  const net = 4 + ((tick * 3) % 9)

  return (
    <footer className="flex h-7 shrink-0 items-center justify-between border-t border-panel-border bg-panel-light/70 px-3 mono text-[11px] text-muted">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="live-dot" />
          <span className="text-emerald-300">CONNECTED</span>
        </span>
        <span>path: <span className="text-slate-300">{VIEW_LABEL[view]}</span></span>
        <span className="hidden sm:inline">cluster: <span className="text-slate-300">ayush-prod</span></span>
      </div>
      <div className="flex items-center gap-4">
        <span>CPU <span className="text-slate-300">{cpu}%</span></span>
        <span>MEM <span className="text-slate-300">{mem}%</span></span>
        <span>NET <span className="text-slate-300">{net} MB/s</span></span>
        <span className="hidden md:inline">build <span className="text-slate-300">v1.0.0</span></span>
      </div>
    </footer>
  )
}
