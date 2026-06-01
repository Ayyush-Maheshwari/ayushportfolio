import { Server, X } from 'lucide-react'
import { useEffect } from 'react'
import { contact } from '../data/portfolio'
import { NAV, useNavCounts, type ViewKey } from './Sidebar'

interface MobileNavProps {
  open: boolean
  active: ViewKey
  onChange: (v: ViewKey) => void
  onClose: () => void
}

export default function MobileNav({ open, active, onChange, onClose }: MobileNavProps) {
  const counts = useNavCounts()

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer */}
      <aside
        className={`absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-panel-border bg-ink-deep shadow-2xl transition-transform duration-200 ease-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-panel-border px-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-blue/15 ring-1 ring-accent-blue/30">
              <Server size={14} className="text-accent-blue" />
            </div>
            <div className="leading-tight">
              <div className="text-[12.5px] font-semibold tracking-wide text-slate-100">
                Ayush-Portfolio<span className="text-accent-cyan">@datacenter</span>
              </div>
              <div className="mono text-[9.5px] uppercase tracking-[0.18em] text-muted">
                control plane
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-panel hover:text-slate-100"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Node card */}
        <div className="border-b border-panel-border px-4 py-3.5">
          <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Active Node
          </div>
          <div className="mt-1 text-sm font-semibold text-slate-100">{contact.name}</div>
          <div className="mono mt-0.5 text-[11px] text-muted">
            node-01 · {contact.location.toLowerCase()}
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/5 px-2 py-1.5">
            <span className="status-dot running" />
            <span className="mono text-[11px] text-emerald-300">SYSTEM HEALTHY</span>
          </div>
        </div>

        {/* Nav */}
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
                    onClick={() => {
                      onChange(item.key)
                      onClose()
                    }}
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
                            isActive ? 'text-accent-blue' : 'text-muted group-hover:text-slate-200'
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
                        isActive ? 'text-cyan-200' : 'text-cyan-400/70 group-hover:text-cyan-200'
                      }`}
                    >
                      {item.resumeRef}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-panel-border px-4 py-2.5">
          <div className="mono text-[10px] text-muted">
            build · v1.0.0 · {new Date().getFullYear()}
          </div>
        </div>
      </aside>
    </div>
  )
}
