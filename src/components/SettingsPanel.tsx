import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { X } from 'lucide-react';

const FONTS = [
  { name: 'Inter', value: "'Inter', sans-serif" },
  { name: 'Roboto', value: "'Roboto', sans-serif" },
  { name: 'Merriweather', value: "'Merriweather', serif" },
  { name: 'Open Sans', value: "'Open Sans', sans-serif" },
];

const CODE_FONTS = [
  { name: 'Fira Code', value: "'Fira Code', monospace" },
  { name: 'JetBrains Mono', value: "'JetBrains Mono', monospace" },
  { name: 'Source Code Pro', value: "'Source Code Pro', monospace" },
];

interface SettingsPanelProps {
  visible: boolean;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ visible, onClose }) => {
  const [settings, setSettings] = useState({
    textFont: "'Inter', sans-serif",
    codeFont: "'Fira Code', monospace",
    textColor: '#18181b',
    bgColor: '#ffffff',
    fontSize: '16px',
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      requestAnimationFrame(() => setIsAnimating(true));
    } else if (shouldRender) {
      setIsAnimating(false);
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [visible, shouldRender]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--md-font-text', settings.textFont);
    root.style.setProperty('--md-font-code', settings.codeFont);
    root.style.setProperty('--md-text-color', settings.textColor);
    root.style.setProperty('--md-bg-color', settings.bgColor);
    root.style.setProperty('--md-font-size', settings.fontSize);
  }, [settings]);

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 z-40",
          isAnimating ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        className={cn(
          "absolute top-0 right-0 w-80 h-full z-50",
          "bg-[rgb(var(--card))] border-l border-[rgb(var(--border))]",
          "shadow-xl transition-transform duration-300 ease-out",
          isAnimating ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[rgb(var(--border))]">
          <h2 className="font-semibold text-[rgb(var(--foreground))]">
            Markdown Settings
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-57px)]">
          {/* Text Font */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[rgb(var(--foreground))]">
              Text Font
            </label>
            <select
              value={settings.textFont}
              onChange={(e) => setSettings({ ...settings, textFont: e.target.value })}
              className={cn(
                "w-full h-9 px-3 rounded-md text-sm",
                "bg-[rgb(var(--background))] border border-[rgb(var(--border))]",
                "text-[rgb(var(--foreground))]",
                "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-1",
                "transition-colors"
              )}
            >
              {FONTS.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
            </select>
          </div>

          {/* Code Font */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[rgb(var(--foreground))]">
              Code Font
            </label>
            <select
              value={settings.codeFont}
              onChange={(e) => setSettings({ ...settings, codeFont: e.target.value })}
              className={cn(
                "w-full h-9 px-3 rounded-md text-sm",
                "bg-[rgb(var(--background))] border border-[rgb(var(--border))]",
                "text-[rgb(var(--foreground))]",
                "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-1",
                "transition-colors"
              )}
            >
              {CODE_FONTS.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
            </select>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[rgb(var(--foreground))]">
              Font Size
            </label>
            <select
              value={settings.fontSize}
              onChange={(e) => setSettings({ ...settings, fontSize: e.target.value })}
              className={cn(
                "w-full h-9 px-3 rounded-md text-sm",
                "bg-[rgb(var(--background))] border border-[rgb(var(--border))]",
                "text-[rgb(var(--foreground))]",
                "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-1",
                "transition-colors"
              )}
            >
              {['14px', '16px', '18px', '20px', '24px'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Colors Section */}
          <div className="pt-2 border-t border-[rgb(var(--border))]">
            <h3 className="text-sm font-medium text-[rgb(var(--muted-foreground))] mb-4">
              Colors
            </h3>
            
            {/* Text Color */}
            <div className="space-y-2 mb-4">
              <label className="text-sm font-medium text-[rgb(var(--foreground))]">
                Text Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.textColor}
                  onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
                  className="w-10 h-10 rounded-md border border-[rgb(var(--border))] cursor-pointer"
                />
                <span className="text-sm text-[rgb(var(--muted-foreground))] font-mono">
                  {settings.textColor}
                </span>
              </div>
            </div>

            {/* Background Color */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[rgb(var(--foreground))]">
                Background Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.bgColor}
                  onChange={(e) => setSettings({ ...settings, bgColor: e.target.value })}
                  className="w-10 h-10 rounded-md border border-[rgb(var(--border))] cursor-pointer"
                />
                <span className="text-sm text-[rgb(var(--muted-foreground))] font-mono">
                  {settings.bgColor}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
