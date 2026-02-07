import { useState, useEffect } from 'react'
import { Editor } from './components/Editor'
import { SettingsPanel } from './components/SettingsPanel'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Button } from './components/ui/button'
import { Settings, FileDown, Moon, Sun } from 'lucide-react'
import './styles/main.css'

function App() {
  const [theme, setTheme] = useState<'classic' | 'dark'>('classic')
  const [showSettings, setShowSettings] = useState(false)

  // Apply dark class to html for Tailwind dark mode
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="flex flex-col h-full bg-[rgb(var(--background))]">
      {/* Header */}
      <header className="h-14 px-4 flex items-center justify-between border-b border-[rgb(var(--border))] bg-[rgb(var(--card))] shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-semibold text-lg text-[rgb(var(--foreground))]">
            MarkWebDown
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.print()}
          >
            <FileDown className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(t => t === 'classic' ? 'dark' : 'classic')}
          >
            {theme === 'classic' ? (
              <>
                <Moon className="w-4 h-4" />
                <span className="hidden sm:inline">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4" />
                <span className="hidden sm:inline">Light</span>
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        <main className="h-full">
          <ErrorBoundary>
            <Editor theme={theme} />
          </ErrorBoundary>
        </main>
        
        <SettingsPanel 
          visible={showSettings} 
          onClose={() => setShowSettings(false)} 
        />
      </div>
    </div>
  )
}

export default App
