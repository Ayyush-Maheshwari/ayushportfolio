import {
  Activity,
  Box,
  Cpu,
  GitBranch,
  HardDrive,
  Layers,
  type LucideIcon,
} from 'lucide-react'
import {
  certifications,
  contact,
  experience,
  projects,
  skills,
} from '../data/portfolio'

export type ViewKey = 'overview' | 'services' | 'deployments' | 'containers' | 'system'

export interface NavItem {
  key: ViewKey
  label: string
  icon: LucideIcon
  count?: number
  resumeRef: string
}

export const NAV: NavItem[] = [
  { key: 'overview', label: 'Overview', icon: Activity, resumeRef: 'Professional Summary' },
  { key: 'services', label: 'Services', icon: Layers, count: 0, resumeRef: 'Skills' },
  { key: 'deployments', label: 'Deployments', icon: GitBranch, count: 0, resumeRef: 'Work Experience' },
  { key: 'containers', label: 'Containers', icon: Box, count: 0, resumeRef: 'Projects' },
  { key: 'system', label: 'System Config', icon: HardDrive, count: 0, resumeRef: 'Education + Certifications' },
]

export function useNavCounts(): Record<ViewKey, number> {
  return {
    overview: 1,
    services: skills.length,
    deployments: experience.length,
    containers: projects.length,
    system: certifications.length + 2,
  }
}

export default function Sidebar({
  active,
  onChange,
}: {
  active: ViewKey
  onChange: (v: ViewKey) => void
}) {
  const counts: Record<ViewKey, number> = {
    overview: 1,
    services: skills.length,
    deployments: experience.length,
    containers: projects.length,
    system: certifications.length + 2, // certs + 2 edu entries
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-panel-border bg-panel-light/60 md:flex">
      {/* Node identity card */}
      <div className="border-b border-panel-border px-4 py-4">
        <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Active Node
        </div>
        <div className="mt-1 text-sm font-semibold text-slate-100">
          {contact.name}
        </div>
        <div className="mono mt-0.5 text-[11px] text-muted">
          node-01 · {contact.location.toLowerCase()}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/5 px-2 py-1.5">
          <span className="status-dot running" />
          <span className="mono text-[11px] text-emerald-300">SYSTEM HEALTHY</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <div className="mono px-2 pb-2 text-[10px] uppercase tracking-[0.18em] text-muted">
          Control Plane
        </div>
        <ul className="space-y-1.5">
          {NAV.map((item) => {
            const Icon = item.icon
            const isActive = item.key === active
            return (
              <li key={item.key}>
                <button
                  onClick={() => onChange(item.key)}
                  className={`group flex w-full flex-col rounded-md px-2.5 py-2 text-left transition ${
                    isActive
                      ? 'bg-accent-blue/15 ring-1 ring-accent-blue/30'
                      : 'hover:bg-panel'
                  }`}
                >
                  <span className="flex w-full items-center justify-between">
                    <span className="flex items-center gap-2.5">
                      <Icon
                        size={15}
                        className={
                          isActive
                            ? 'text-accent-blue'
                            : 'text-muted group-hover:text-slate-200'
                        }
                      />
                      <span
                        className={`text-[13px] font-medium ${
                          isActive ? 'text-slate-50' : 'text-slate-300 group-hover:text-slate-100'
                        }`}
                      >
                        {item.label}
                      </span>
                    </span>
                    <span
                      className={`mono text-[10px] ${
                        isActive ? 'text-accent-cyan' : 'text-muted'
                      }`}
                    >
                      {counts[item.key]}
                    </span>
                  </span>
                  <span
                    className={`mono mt-0.5 pl-[1.55rem] text-[10px] transition-colors ${
                      isActive
                        ? 'text-cyan-200'
                        : 'text-cyan-400/70 group-hover:text-cyan-200'
                    }`}
                  >
                    {item.resumeRef}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {/* Mini system metrics */}
        <div className="mono mt-6 px-2 pb-2 text-[10px] uppercase tracking-[0.18em] text-muted">
          Node Stats
        </div>
        <div className="space-y-2 px-2">
          <MiniStat icon={Cpu} label="vCPU" value={`${skills.length} cores`} />
          <MiniStat icon={Layers} label="Services" value={String(skills.length)} />
          <MiniStat icon={Box} label="Containers" value={String(projects.length)} />
          <MiniStat icon={GitBranch} label="Deployments" value={String(experience.length)} />
        </div>
      </nav>

      {/* Footer build tag */}
      <div className="border-t border-panel-border px-4 py-2.5">
        <div className="mono text-[10px] text-muted">
          build · v1.0.0 · {new Date().getFullYear()}
        </div>
      </div>
    </aside>
  )
}

function MiniStat({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-panel-border bg-panel/60 px-2.5 py-1.5">
      <span className="flex items-center gap-2 text-[11px] text-muted">
        <Icon size={12} />
        {label}
      </span>
      <span className="mono text-[11px] text-slate-200">{value}</span>
    </div>
  )
}
