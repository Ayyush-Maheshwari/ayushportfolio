import {
  Cloud,
  Code2,
  Database,
  Network,
  Settings2,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import Panel from '../components/Panel';
import { skills, softSkills, type Skill } from '../data/portfolio';

const CATEGORY_META: Record<
  Skill['category'],
  { label: string; icon: LucideIcon; accent: string; description: string }
> = {
  cloud: {
    label: 'Cloud Platforms',
    icon: Cloud,
    accent: '#3b82f6',
    description: 'Provisioning & administering cloud / virtualization stacks',
  },
  devops: {
    label: 'DevOps & Automation',
    icon: Wrench,
    accent: '#06b6d4',
    description: 'CI/CD, IaC, containers and orchestration',
  },
  development: {
    label: 'Application Stack',
    icon: Code2,
    accent: '#10b981',
    description: 'Full-stack web development services',
  },
  systems: {
    label: 'Systems & Servers',
    icon: Database,
    accent: '#f59e0b',
    description: 'Server administration & data services',
  },
  networking: {
    label: 'Networking',
    icon: Network,
    accent: '#a855f7',
    description: 'Network administration & enterprise gear',
  },
  soft: {
    label: 'Soft Skills',
    icon: Sparkles,
    accent: '#ec4899',
    description: 'Collaboration & system-thinking attributes',
  },
}

const ORDER: Skill['category'][] = ['cloud', 'devops', 'development', 'systems', 'networking']

export default function ServicesView() {
  return (
    <div className="space-y-4">
      <HeaderStrip />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {ORDER.map((cat) => {
          const items = skills.filter((s) => s.category === cat)
          if (items.length === 0) return null
          const meta = CATEGORY_META[cat]
          return (
            <Panel
              key={cat}
              title={meta.label}
              badge={`${items.length} svc`}
              right={
                <span className="flex items-center gap-1.5 mono text-[10px] text-emerald-300">
                  <span className="status-dot running" /> RUNNING
                </span>
              }
            >
              <p className="mb-3 text-[12px] text-muted">{meta.description}</p>
              <ul className="space-y-1.5">
                {items.map((s) => (
                  <ServiceRow key={s.name} name={s.name} accent={meta.accent} icon={meta.icon} />
                ))}
              </ul>
            </Panel>
          )
        })}

        <Panel
          title={CATEGORY_META.soft.label}
          badge={`${softSkills.length} attr`}
          right={
            <span className="flex items-center gap-1.5 mono text-[10px] text-muted">
              <Sparkles size={11} /> attributes
            </span>
          }
        >
          <p className="mb-3 text-[12px] text-muted">{CATEGORY_META.soft.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {softSkills.map((s) => (
              <span
                key={s}
                className="rounded-md border border-panel-border bg-panel-light/60 px-2 py-1 text-[12px] text-slate-200"
              >
                {s}
              </span>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}

function HeaderStrip() {
  return (
    <div className="panel flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">
          // resume · skills
        </div>
        <h2 className="text-lg font-semibold text-slate-50">Services</h2>
        <p className="text-[12.5px] text-muted">
          Each running service maps to a skill from the resume. Grouped by stack.
        </p>
      </div>
      <div className="flex items-center gap-2 mono text-[11px] text-muted">
        <Settings2 size={13} />
        cluster: ayush-prod · namespace: default
      </div>
    </div>
  )
}

function ServiceRow({ name, accent, icon: Icon }: { name: string; accent: string; icon: LucideIcon }) {
  return (
    <li className="flex items-center justify-between rounded-md border border-panel-border bg-panel-light/40 px-2.5 py-1.5 transition hover:border-accent-blue/30 hover:bg-panel-light/70">
      <span className="flex items-center gap-2">
        <span
          className="flex h-6 w-6 items-center justify-center rounded ring-1"
          style={{ background: `${accent}1A`, borderColor: accent, color: accent }}
        >
          <Icon size={12} />
        </span>
        <span className="text-[13px] text-slate-100">{name}</span>
      </span>
      <span className="flex items-center gap-3 mono text-[10.5px] text-muted">
        <span className="flex items-center gap-1">
          <span className="status-dot running" />
          running
        </span>
        <span className="hidden sm:inline">v.stable</span>
      </span>
    </li>
  )
}
