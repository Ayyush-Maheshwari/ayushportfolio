import { Award, GraduationCap, ShieldCheck } from 'lucide-react';
import Panel from '../components/Panel';
import { certifications, contact, education } from '../data/portfolio';

export default function SystemConfigView() {
  return (
    <div className="space-y-4">
      <div className="panel flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">
            // resume · education + certifications
          </div>
          <h2 className="text-lg font-semibold text-slate-50">System Configuration</h2>
          <p className="text-[12.5px] text-muted">
            Node specifications (education) and compliance attestations (certifications).
          </p>
        </div>
        <div className="mono text-[11px] text-muted">
          node: <span className="text-slate-200">{contact.handle}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {/* Education */}
        <Panel
          title="Node Specifications"
          badge="education"
          right={
            <span className="flex items-center gap-1.5 mono text-[10.5px] text-muted">
              <GraduationCap size={12} /> base image
            </span>
          }
        >
          <ul className="space-y-3">
            {education.map((e) => (
              <li
                key={e.id}
                className="rounded border border-panel-border bg-panel-light/40 p-3"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent-blue/15 ring-1 ring-accent-blue/30">
                    <GraduationCap size={16} className="text-accent-blue" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13.5px] font-medium text-slate-100">{e.degree}</div>
                    <div className="text-[12.5px] text-slate-300">{e.institution}</div>
                    <div className="mono mt-1 text-[11px] text-muted">{e.duration}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Certifications */}
        <Panel
          title="Security & Compliance"
          badge="certifications"
          right={
            <span className="flex items-center gap-1.5 mono text-[10.5px] text-emerald-300">
              <ShieldCheck size={12} /> attested
            </span>
          }
        >
          <ul className="space-y-2">
            {certifications.map((c) => (
              <li
                key={c.id}
                className="flex items-start gap-3 rounded border border-panel-border bg-panel-light/40 p-2.5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-500/15 ring-1 ring-amber-500/30">
                  <Award size={14} className="text-amber-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] text-slate-100">{c.title}</div>
                  <div className="mono text-[11px] text-muted">
                    issuer:&nbsp;<span className="text-slate-300">{c.issuer}</span>
                  </div>
                </div>
                <span className="mono text-[10px] text-emerald-300">VALID</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Node info block */}
      <Panel title="Identity & Contact" badge="control-plane">
        <div className="grid grid-cols-1 gap-2 mono text-[12.5px] md:grid-cols-2">
          <InfoLine k="name" v={contact.name} />
          <InfoLine k="handle" v={contact.handle} />
          <InfoLine k="email" v={contact.email} href={`mailto:${contact.email}`} />
          <InfoLine k="phone" v={contact.phone} href={`tel:${contact.phone}`} />
          <InfoLine k="linkedin" v={contact.linkedin} href={contact.linkedin} />
          <InfoLine k="github" v={contact.github} href={contact.github} />
        </div>
      </Panel>
    </div>
  )
}

function InfoLine({ k, v, href }: { k: string; v: string; href?: string }) {
  return (
    <div className="flex items-center justify-between rounded border border-panel-border bg-panel-light/40 px-3 py-1.5">
      <span className="text-muted">{k}</span>
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer noopener"
          className="truncate pl-3 text-slate-100 hover:text-accent-cyan"
        >
          {v}
        </a>
      ) : (
        <span className="truncate pl-3 text-slate-100">{v}</span>
      )}
    </div>
  )
}
