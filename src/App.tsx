import { useState } from 'react'
import MobileNav from './components/MobileNav'
import Sidebar, { type ViewKey } from './components/Sidebar'
import StatusBar from './components/StatusBar'
import Terminal from './components/Terminal'
import TopBar from './components/TopBar'
import ContainersView from './views/ContainersView'
import DeploymentsView from './views/DeploymentsView'
import OverviewView from './views/OverviewView'
import ServicesView from './views/ServicesView'
import SystemConfigView from './views/SystemConfigView'

export default function App() {
  const [view, setView] = useState<ViewKey>('overview')
  const [terminalOpen, setTerminalOpen] = useState(true)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const renderView = () => {
    switch (view) {
      case 'overview':
        return <OverviewView onNavigate={setView} />
      case 'services':
        return <ServicesView />
      case 'deployments':
        return <DeploymentsView />
      case 'containers':
        return <ContainersView />
      case 'system':
        return <SystemConfigView />
      default:
        return <OverviewView onNavigate={setView} />
    }
  }

  return (
    <div className="flex h-full w-full flex-col bg-ink-deep text-slate-200">
      <TopBar onMenuClick={() => setMobileNavOpen(true)} />
      <div className="flex min-h-0 flex-1">
        <Sidebar active={view} onChange={setView} />
        <main className="relative flex min-w-0 flex-1 flex-col bg-grid">
          <div
            className="min-h-0 flex-1 overflow-y-scroll p-3 md:p-6"
            style={{ scrollbarGutter: 'stable' }}
          >
            {renderView()}
          </div>
          <Terminal
            open={terminalOpen}
            onToggle={() => setTerminalOpen((v) => !v)}
            onNavigate={setView}
          />
        </main>
      </div>
      <StatusBar view={view} />

      {/* Mobile navigation drawer */}
      <MobileNav
        open={mobileNavOpen}
        active={view}
        onChange={setView}
        onClose={() => setMobileNavOpen(false)}
      />
    </div>
  )
}
