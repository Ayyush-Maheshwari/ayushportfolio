import { Bell, Github, Linkedin, Mail, Menu, Phone, Server } from 'lucide-react'
import { useEffect, useState } from 'react'
import { contact } from '../data/portfolio'

export default function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const timeStr = time.toISOString().replace('T', ' ').slice(0, 19) + ' UTC'

  return (
    <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-panel-border bg-panel-light/80 px-3 backdrop-blur md:px-4">
      {/* Left – brand */}
      <div className="flex min-w-0 items-center gap-2 md:gap-3">
        {/* Mobile menu button */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="-ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-200 hover:bg-panel md:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        )}

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent-blue/15 ring-1 ring-accent-blue/30">
          <Server size={14} className="text-accent-blue" />
        </div>
        <div className="min-w-0 leading-tight">
          <div className="truncate text-[12.5px] font-semibold tracking-wide text-slate-100 md:text-[13px]">
            Ayush-Portfolio<span className="text-accent-cyan">@datacenter</span>
          </div>
          <div className="mono hidden truncate text-[10px] uppercase tracking-[0.18em] text-muted sm:block">
            {contact.handle} · region: ap-south-1
          </div>
        </div>
      </div>

      {/* Right – contact actions */}
      <div className="flex shrink-0 items-center gap-0.5 md:gap-1">
        <span className="mono mr-3 hidden text-[11px] text-muted lg:inline">
          {timeStr}
        </span>
        <ActionBtn href={`mailto:${contact.email}`} label="Email" icon={<Mail size={14} />} />
        <ActionBtn href={`tel:${contact.phone}`} label="Phone" icon={<Phone size={14} />} />
        <ActionBtn href={contact.linkedin} label="LinkedIn" icon={<Linkedin size={14} />} external />
        <ActionBtn href={contact.github} label="GitHub" icon={<Github size={14} />} external />
        <button
          className="ml-1 hidden h-7 w-7 items-center justify-center rounded-md text-muted hover:bg-panel hover:text-slate-200 sm:flex"
          title="Notifications"
        >
          <Bell size={14} />
        </button>
      </div>
    </header>
  )
}

function ActionBtn({
  href,
  label,
  icon,
  external,
}: {
  href: string
  label: string
  icon: React.ReactNode
  external?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      title={label}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition hover:bg-panel hover:text-slate-100 md:w-auto md:gap-1.5 md:px-2 md:text-[12px]"
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </a>
  )
}
