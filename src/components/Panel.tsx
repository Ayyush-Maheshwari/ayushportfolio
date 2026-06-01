import type { ReactNode } from 'react'

export default function Panel({
  title,
  badge,
  right,
  children,
  className = '',
  bodyClass = 'p-4',
}: {
  title: string
  badge?: string
  right?: ReactNode
  children: ReactNode
  className?: string
  bodyClass?: string
}) {
  return (
    <section className={`panel ${className}`}>
      <header className="panel-header">
        <span className="flex items-center gap-2">
          <span className="text-slate-200">{title}</span>
          {badge && (
            <span className="rounded border border-panel-border bg-panel px-1.5 py-px text-[10px] tracking-wider text-muted">
              {badge}
            </span>
          )}
        </span>
        {right}
      </header>
      <div className={bodyClass}>{children}</div>
    </section>
  )
}
