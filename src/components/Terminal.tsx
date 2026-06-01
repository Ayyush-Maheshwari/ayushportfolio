import { ChevronDown, ChevronUp, TerminalSquare } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  certifications,
  contact,
  education,
  experience,
  projects,
  skills,
  softSkills,
  summary,
} from '../data/portfolio'
import type { ViewKey } from './Sidebar'

interface Line {
  kind: 'prompt' | 'out' | 'err' | 'info'
  text: string
}

const BANNER = `ayush-ctl v1.0.0  —  type 'help' to list commands`

const HELP = [
  'Available commands:',
  '  help                show this help',
  '  whoami              display contact info',
  '  summary             professional summary',
  '  ls                  list portfolio sections',
  '  skills [--soft]     list technical / soft skills',
  '  experience          list deployments (experience)',
  '  projects            list containers (projects)',
  '  education           list education entries',
  '  certs               list certifications',
  '  cd <section>        navigate (overview/services/deployments/containers/system)',
  '  open <link>         open email | linkedin | github',
  '  clear               clear the terminal',
]

const SECTIONS: Record<string, ViewKey> = {
  overview: 'overview',
  services: 'services',
  skills: 'services',
  deployments: 'deployments',
  experience: 'deployments',
  containers: 'containers',
  projects: 'containers',
  system: 'system',
  config: 'system',
}

export default function Terminal({
  open,
  onToggle,
  onNavigate,
}: {
  open: boolean
  onToggle: () => void
  onNavigate: (v: ViewKey) => void
}) {
  const [lines, setLines] = useState<Line[]>([
    { kind: 'info', text: BANNER },
    { kind: 'info', text: "Tip: run 'ls' to see sections, 'cd containers' to view projects." },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState<number>(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const push = (l: Line | Line[]) => {
    setLines((prev) => [...prev, ...(Array.isArray(l) ? l : [l])])
  }

  const exec = (raw: string) => {
    const cmd = raw.trim()
    push({ kind: 'prompt', text: `${contact.handle}:~$ ${cmd}` })
    if (!cmd) return
    setHistory((h) => [...h, cmd])
    setHistIdx(-1)

    const [base, ...rest] = cmd.split(/\s+/)
    const arg = rest.join(' ')

    switch (base) {
      case 'help':
        push(HELP.map((t) => ({ kind: 'out', text: t }) as Line))
        break
      case 'clear':
        setLines([])
        break
      case 'whoami':
        push([
          { kind: 'out', text: `${contact.name}` },
          { kind: 'out', text: `handle:   ${contact.handle}` },
          { kind: 'out', text: `location: ${contact.location}` },
          { kind: 'out', text: `email:    ${contact.email}` },
          { kind: 'out', text: `phone:    ${contact.phone}` },
          { kind: 'out', text: `linkedin: ${contact.linkedin}` },
          { kind: 'out', text: `github:   ${contact.github}` },
        ])
        break
      case 'summary':
        push({ kind: 'out', text: summary })
        break
      case 'ls':
        push([
          { kind: 'out', text: 'overview/        # professional summary' },
          { kind: 'out', text: 'services/        # skills' },
          { kind: 'out', text: 'deployments/     # experience' },
          { kind: 'out', text: 'containers/      # projects' },
          { kind: 'out', text: 'system-config/   # education + certifications' },
        ])
        break
      case 'skills': {
        if (arg.includes('--soft')) {
          push(softSkills.map((s) => ({ kind: 'out', text: `• ${s}` }) as Line))
        } else {
          push(skills.map((s) => ({ kind: 'out', text: `• [${s.category}] ${s.name}` }) as Line))
        }
        break
      }
      case 'experience':
        push(
          experience.flatMap((e) => [
            { kind: 'out', text: `▸ ${e.company} — ${e.role}` } as Line,
            { kind: 'out', text: `  ${e.duration} · ${e.location} · status=${e.status}` } as Line,
          ]),
        )
        break
      case 'projects':
        push(
          projects.flatMap((p) => [
            { kind: 'out', text: `▸ ${p.id}  ${p.name}` } as Line,
            { kind: 'out', text: `  ${p.description}` } as Line,
          ]),
        )
        break
      case 'education':
        push(
          education.map(
            (e) => ({ kind: 'out', text: `• ${e.degree} — ${e.institution} (${e.duration})` }) as Line,
          ),
        )
        break
      case 'certs':
      case 'certifications':
        push(certifications.map((c) => ({ kind: 'out', text: `• [${c.issuer}] ${c.title}` }) as Line))
        break
      case 'cd': {
        const target = SECTIONS[arg as keyof typeof SECTIONS]
        if (target) {
          onNavigate(target)
          push({ kind: 'info', text: `→ navigated to /${target}` })
        } else {
          push({ kind: 'err', text: `cd: no such section: ${arg || '(empty)'}` })
        }
        break
      }
      case 'open': {
        const map: Record<string, string> = {
          email: `mailto:${contact.email}`,
          linkedin: contact.linkedin,
          github: contact.github,
        }
        const url = map[arg]
        if (url) {
          window.open(url, '_blank', 'noopener,noreferrer')
          push({ kind: 'info', text: `→ opened ${arg}` })
        } else {
          push({ kind: 'err', text: `open: unknown target: ${arg}` })
        }
        break
      }
      case 'echo':
        push({ kind: 'out', text: arg })
        break
      default:
        push({ kind: 'err', text: `command not found: ${base} — try 'help'` })
    }
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      exec(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const next = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(next)
      setInput(history[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx === -1) return
      const next = histIdx + 1
      if (next >= history.length) {
        setHistIdx(-1)
        setInput('')
      } else {
        setHistIdx(next)
        setInput(history[next])
      }
    }
  }

  return (
    <div
      className="shrink-0 border-t-2 border-accent-blue/40 bg-ink/95 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.6)]"
    >
      {/* Header bar – clearly separated from the page above */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between border-b border-panel-border bg-panel-light/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-muted transition hover:bg-panel-light/80"
      >
        <span className="flex items-center gap-2">
          <span className="flex h-1.5 w-1.5 rounded-full bg-accent-blue shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
          <TerminalSquare size={13} className="text-accent-cyan" />
          <span className="mono text-slate-200">terminal — ayush-ctl</span>
        </span>
        <span className="flex items-center gap-1.5 mono text-accent-cyan/80">
          {open ? 'collapse' : 'expand'}
          {open ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
        </span>
      </button>

      {open && (
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="mono h-[32vh] min-h-[9rem] max-h-[22rem] overflow-y-auto bg-ink-deep px-3 pb-2 pt-1.5 text-[12.5px] leading-relaxed sm:h-[36vh] md:h-[38vh]"
        >
          {lines.map((l, i) => (
            <div
              key={i}
              className={
                l.kind === 'err'
                  ? 'text-rose-400'
                  : l.kind === 'info'
                    ? 'text-accent-cyan'
                    : l.kind === 'prompt'
                      ? 'text-slate-300'
                      : 'text-slate-200'
              }
            >
              {l.kind === 'prompt' ? l.text : l.text}
            </div>
          ))}
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="text-accent-green">{contact.handle}</span>
            <span className="text-slate-400">:~$</span>
            <input
              ref={inputRef}
              className="flex-1 bg-transparent text-slate-100 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              spellCheck={false}
              autoComplete="off"
              placeholder="type a command…"
            />
          </div>
        </div>
      )}
    </div>
  )
}
