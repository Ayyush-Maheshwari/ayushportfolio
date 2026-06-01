import { Box, CheckCircle2, Cpu, HardDrive, MemoryStick, Tag } from 'lucide-react'
import MetricChart from '../components/MetricChart'
import Panel from '../components/Panel'
import { projects, type Project } from '../data/portfolio'

export default function ContainersView() {
  return (
    <div className="space-y-4">
      <div className="panel flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">
            // resume · projects
          </div>
          <h2 className="text-lg font-semibold text-slate-50">Containers</h2>
          <p className="text-[12.5px] text-muted">
            Each project is modeled as a deployed container with image, stack, and runtime stats.
          </p>
        </div>
        <div className="flex items-center gap-3 mono text-[11px]">
          <span className="rounded border border-panel-border bg-panel-light/60 px-2 py-1 text-muted">
            images: <span className="text-slate-200">{projects.length}</span>
          </span>
          <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-emerald-300">
            running: {projects.filter((p) => p.status === 'running').length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {projects.map((p, i) => (
          <ContainerCard key={p.id} p={p} idx={i} />
        ))}
      </div>
    </div>
  )
}

function ContainerCard({ p, idx }: { p: Project; idx: number }) {
  const colors = ['#3b82f6', '#06b6d4', '#10b981', '#a855f7']
  const accent = colors[idx % colors.length]

  return (
    <Panel
      title={p.name}
      badge={p.id}
      right={
        <span className="flex items-center gap-1.5 mono text-[10.5px] text-emerald-300">
          <span className="status-dot running" /> RUNNING
        </span>
      }
    >
      <div className="space-y-3">
        {/* Top row: identity + spec */}
        <div className="flex items-start gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md ring-1"
            style={{ background: `${accent}1A`, borderColor: accent, color: accent }}
          >
            <Box size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mono text-[10.5px] uppercase tracking-wider text-muted">
              image: <span className="text-slate-300">{p.id}:latest</span>
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-200">{p.description}</p>
          </div>
        </div>

        {/* Resource spec */}
        <div className="grid grid-cols-3 gap-2">
          <Spec icon={Cpu} label="vCPU" value={`${p.vcpu} cores`} />
          <Spec icon={MemoryStick} label="vRAM" value={p.vram} />
          <Spec icon={HardDrive} label="Storage" value={p.storage} />
        </div>

        {/* Live mini chart */}
        <div className="h-24 rounded border border-panel-border bg-ink/40 p-2">
          <MetricChart
            label="container CPU"
            color={accent}
            base={28 + idx * 8}
            amp={14}
            seed={idx + 7}
          />
        </div>

        {/* Stack tags */}
        <div>
          <div className="mono mb-1.5 flex items-center gap-1.5 text-[10.5px] uppercase tracking-wider text-muted">
            <Tag size={11} /> stack
          </div>
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-panel-border bg-panel-light/60 px-2 py-0.5 text-[11.5px] text-slate-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div>
          <div className="mono mb-1.5 text-[10.5px] uppercase tracking-wider text-muted">
            highlights
          </div>
          <ul className="space-y-1.5 text-[12.5px] text-slate-200">
            {p.highlights.map((h, idx2) => (
              <li key={idx2} className="flex gap-2">
                <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-400" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  )
}

function Spec({ icon: Icon, label, value }: { icon: typeof Cpu; label: string; value: string }) {
  return (
    <div className="rounded border border-panel-border bg-panel-light/40 px-2.5 py-1.5">
      <div className="mono flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted">
        <Icon size={11} /> {label}
      </div>
      <div className="mono text-[12.5px] text-slate-100">{value}</div>
    </div>
  )
}
