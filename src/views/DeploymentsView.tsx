import { Building2, Calendar, CheckCircle2, GitBranch, MapPin } from 'lucide-react'
import Panel from '../components/Panel'
import { experience, type Experience } from '../data/portfolio'

export default function DeploymentsView() {
  return (
    <div className="space-y-4">
      <HeaderStrip />

      <div className="space-y-3">
        {experience.map((e) => (
          <DeploymentRow key={e.id} d={e} />
        ))}
      </div>

      {/* Pipeline timeline */}
      <Panel title="Deployment Pipeline" badge="chronological">
        <ol className="relative border-l border-panel-border pl-5">
          {experience.map((e) => (
            <li key={e.id} className="mb-4 last:mb-0">
              <span
                className={`absolute -left-[7px] mt-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-4 ring-ink-deep ${
                  e.status === 'running' ? 'bg-emerald-400' : 'bg-slate-500'
                }`}
              />
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-[13px] font-semibold text-slate-100">{e.company}</span>
                <span className="text-[12.5px] text-muted">— {e.role}</span>
              </div>
              <div className="mono text-[11px] text-muted">
                {e.duration} · {e.location}
              </div>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  )
}

function HeaderStrip() {
  const running = experience.filter((e) => e.status === 'running').length
  return (
    <div className="panel flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">
          // resume · experience
        </div>
        <h2 className="text-lg font-semibold text-slate-50">Deployments</h2>
        <p className="text-[12.5px] text-muted">
          Each tenure is modeled as a deployment with status, region, runtime stack and outcomes.
        </p>
      </div>
      <div className="flex items-center gap-3 mono text-[11px]">
        <span className="rounded border border-panel-border bg-panel-light/60 px-2 py-1 text-muted">
          total: <span className="text-slate-200">{experience.length}</span>
        </span>
        <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-emerald-300">
          running: {running}
        </span>
      </div>
    </div>
  )
}

function DeploymentRow({ d }: { d: Experience }) {
  const isRunning = d.status === 'running'
  return (
    <Panel
      title={`${d.company} · ${d.role}`}
      badge={d.id}
      right={
        <span
          className={`flex items-center gap-1.5 mono text-[10.5px] ${
            isRunning ? 'text-emerald-300' : 'text-muted'
          }`}
        >
          <span className={`status-dot ${isRunning ? 'running' : 'stopped'}`} />
          {isRunning ? 'RUNNING' : 'COMPLETED'}
        </span>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Meta column */}
        <div className="space-y-2 text-[12.5px] md:col-span-1">
          <Meta icon={Building2} label="Company" value={d.company} />
          <Meta icon={Calendar} label="Duration" value={d.duration} />
          <Meta icon={MapPin} label="Region" value={d.location} />
          <Meta icon={GitBranch} label="Runtime Stack" value={d.stack.join(' · ')} />
        </div>

        {/* Achievements column */}
        <div className="md:col-span-2">
          <div className="mono mb-2 text-[10.5px] uppercase tracking-[0.18em] text-muted">
            release notes
          </div>
          <ul className="space-y-2 text-[13px] leading-relaxed text-slate-200">
            {d.achievements.map((a, idx) => (
              <li key={idx} className="flex gap-2">
                <CheckCircle2 size={14} className="mt-1 shrink-0 text-emerald-400" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  )
}

function Meta({ icon: Icon, label, value }: { icon: typeof Building2; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 rounded border border-panel-border bg-panel-light/40 px-2.5 py-1.5">
      <Icon size={13} className="mt-0.5 shrink-0 text-muted" />
      <div className="min-w-0">
        <div className="mono text-[10px] uppercase tracking-wider text-muted">{label}</div>
        <div className="text-[12.5px] text-slate-100">{value}</div>
      </div>
    </div>
  )
}
