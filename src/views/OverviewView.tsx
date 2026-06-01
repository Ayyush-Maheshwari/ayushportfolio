import {
  Activity,
  ArrowRight,
  Box,
  CheckCircle2,
  Cpu,
  GitBranch,
  HardDrive,
  Layers,
  Shield,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import MetricChart from '../components/MetricChart'
import Panel from '../components/Panel'
import type { ViewKey } from '../components/Sidebar'
import {
  certifications,
  contact,
  experience,
  projects,
  skills,
  summary,
} from '../data/portfolio'

const RUNNING = experience.filter((e) => e.status === 'running').length

const LOG_TEMPLATES = [
  '[ INFO ] cluster=ayush-prod  node=node-01  status=ready',
  '[ INFO ] svc/azure-iam        reconcile OK   (RBAC sync)',
  '[ INFO ] svc/jenkins-pipeline  build #482   passed',
  '[ INFO ] ctr/ctr-vapt-001     health-check  OK',
  '[ INFO ] ctr/ctr-mobcloud-002 tunnel.up      OK',
  '[ WARN ] svc/log-analytics    backlog=124   (within limits)',
  '[ INFO ] iac/terraform        plan applied   modules=net,storage',
  '[ INFO ] deploy/LTIMindtree   sync 100%      MTTR -50%',
  '[ INFO ] svc/docker           image cached   layers=12',
  '[ INFO ] svc/kubernetes       pods=running   ready=1/1',
]

export default function OverviewView({ onNavigate }: { onNavigate: (v: ViewKey) => void }) {
  const [logs, setLogs] = useState<string[]>(() => LOG_TEMPLATES.slice(0, 6))

  useEffect(() => {
    const t = setInterval(() => {
      setLogs((prev) => {
        const next = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)]
        const ts = new Date().toISOString().slice(11, 19)
        return [...prev.slice(-8), `${ts}  ${next}`]
      })
    }, 1800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="space-y-4">
      {/* Header strip */}
      <div className="panel glow-border flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">
            // professional summary
          </div>
          <h1 className="text-xl font-semibold text-slate-50">
            {contact.name}
            <span className="ml-2 mono text-[12px] font-normal text-muted">
              — Cloud &amp; Infrastructure Engineer · Full-Stack Developer
            </span>
          </h1>
          <p className="max-w-3xl text-[13px] leading-relaxed text-slate-300">{summary}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="status-dot running" />
          <span className="mono text-[11px] uppercase tracking-wider text-emerald-300">
            SYSTEM OPERATIONAL
          </span>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi
          icon={Layers}
          label="Services Running"
          value={skills.length}
          sub="technical skills"
          accent="#3b82f6"
          onClick={() => onNavigate('services')}
        />
        <Kpi
          icon={GitBranch}
          label="Active Deployments"
          value={`${RUNNING}/${experience.length}`}
          sub="experience tenures"
          accent="#10b981"
          onClick={() => onNavigate('deployments')}
        />
        <Kpi
          icon={Box}
          label="Containers"
          value={projects.length}
          sub="projects deployed"
          accent="#06b6d4"
          onClick={() => onNavigate('containers')}
        />
        <Kpi
          icon={Shield}
          label="Compliance"
          value={certifications.length}
          sub="certifications"
          accent="#f59e0b"
          onClick={() => onNavigate('system')}
        />
      </div>

      {/* Telemetry */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <Panel title="CPU Utilization" badge="node-01" bodyClass="h-40 p-3">
          <MetricChart label="vCPU usage" color="#3b82f6" base={32} amp={14} seed={1} />
        </Panel>
        <Panel title="Memory Pressure" badge="node-01" bodyClass="h-40 p-3">
          <MetricChart label="memory" color="#10b981" base={58} amp={10} seed={3} />
        </Panel>
        <Panel title="Network Throughput" badge="ingress" bodyClass="h-40 p-3">
          <MetricChart label="net I/O" unit=" MB/s" color="#06b6d4" base={22} amp={18} seed={5} />
        </Panel>
      </div>

      {/* Quick map + log stream */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
        <Panel
          title="Resume Map"
          badge="1:1 resume → infra"
          className="lg:col-span-2"
        >
          <ul className="space-y-2 text-[13px]">
            <ResumeRow icon={Activity} label="Professional Summary" maps="Overview" onClick={() => onNavigate('overview')} />
            <ResumeRow icon={Layers} label="Skills" maps="Services" onClick={() => onNavigate('services')} />
            <ResumeRow icon={GitBranch} label="Experience" maps="Deployments" onClick={() => onNavigate('deployments')} />
            <ResumeRow icon={Box} label="Projects" maps="Containers" onClick={() => onNavigate('containers')} />
            <ResumeRow icon={HardDrive} label="Education + Certifications" maps="System Config" onClick={() => onNavigate('system')} />
          </ul>
        </Panel>

        <Panel
          title="Live Telemetry"
          badge="stdout · stream"
          right={<span className="flex items-center gap-1.5 mono text-[10px] text-muted"><span className="live-dot" /> LIVE</span>}
          className="lg:col-span-3"
          bodyClass="p-0"
        >
          <div className="mono max-h-64 overflow-hidden bg-ink-deep px-4 py-2 text-[12px] leading-relaxed">
            {logs.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.includes('WARN')
                    ? 'text-amber-300'
                    : line.includes('ERROR')
                      ? 'text-rose-400'
                      : 'text-slate-300'
                }
              >
                {line}
              </div>
            ))}
            <div className="text-accent-cyan caret">{`${contact.handle}:~$ tail -f /var/log/portfolio.log`}</div>
          </div>
        </Panel>
      </div>
    </div>
  )
}

function Kpi({
  icon: Icon,
  label,
  value,
  sub,
  accent,
  onClick,
}: {
  icon: typeof Activity
  label: string
  value: number | string
  sub: string
  accent: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="panel group flex items-center justify-between gap-3 p-4 text-left transition hover:border-accent-blue/40 hover:bg-panel-light/70"
    >
      <div>
        <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted">{label}</div>
        <div className="mt-1 text-2xl font-semibold text-slate-50">{value}</div>
        <div className="mono text-[11px] text-muted">{sub}</div>
      </div>
      <div
        className="flex h-10 w-10 items-center justify-center rounded-md ring-1"
        style={{ background: `${accent}1A`, borderColor: accent, color: accent, boxShadow: `0 0 12px ${accent}33` }}
      >
        <Icon size={18} />
      </div>
    </button>
  )
}

function ResumeRow({
  icon: Icon,
  label,
  maps,
  onClick,
}: {
  icon: typeof CheckCircle2
  label: string
  maps: string
  onClick: () => void
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="group flex w-full items-center justify-between rounded-md border border-transparent px-2 py-1.5 hover:border-panel-border hover:bg-panel-light/60"
      >
        <span className="flex items-center gap-2.5">
          <Icon size={14} className="text-muted" />
          <span className="text-slate-200">{label}</span>
        </span>
        <span className="flex items-center gap-2 mono text-[11px] text-muted group-hover:text-accent-cyan">
          → {maps}
          <ArrowRight size={12} />
        </span>
      </button>
    </li>
  )
}

// Avoid unused import warning for Cpu icon
void Cpu
