import { useEffect, useRef, useState, useCallback } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

interface EditorProps {
  value?: string;
  theme?: 'classic' | 'dark';
}

export const Editor: React.FC<EditorProps> = ({ value, theme = 'classic' }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const vditorRef = useRef<Vditor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initEditor = useCallback(() => {
    if (!editorRef.current) return;

    // Clear any existing content
    editorRef.current.innerHTML = '';
    setIsLoading(true);
    setError(null);

    try {
      const vditorInstance = new Vditor(editorRef.current, {
        value: value || '# Welcome to MarkWebDown\n\nStart writing your Markdown here...',
        height: '100%',
        mode: 'sv',
        theme: theme,
        cache: {
          enable: false,
        },
        toolbarConfig: {
          pin: true,
        },
        preview: {
          markdown: {
            toc: true,
            mark: true,
            footnotes: true,
            autoSpace: true,
          },
          math: {
            engine: 'KaTeX',
          },
        },
        after: () => {
          vditorRef.current = vditorInstance;
          setIsLoading(false);
        },
      });
    } catch (err) {
      console.error('Failed to initialize Vditor:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize editor');
      setIsLoading(false);
    }

    return () => {
      if (vditorRef.current) {
        vditorRef.current.destroy();
        vditorRef.current = null;
      }
    };
  }, [value, theme]);

  useEffect(() => {
    const cleanup = initEditor();
    return cleanup;
  }, [initEditor]);

  // Update theme dynamically
  useEffect(() => {
    if (vditorRef.current) {
      vditorRef.current.setTheme(theme);
    }
  }, [theme]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
        <div className="text-center p-8 max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-lg font-semibold mb-2">Editor Loading Error</h2>
          <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
            {error}
          </p>
          <button 
            onClick={() => {
              setError(null);
              initEditor();
            }}
            className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded-md hover:opacity-90 transition-opacity cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[rgb(var(--background))] z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[rgb(var(--primary))] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-[rgb(var(--muted-foreground))]">Loading editor...</span>
          </div>
        </div>
      )}
      <div 
        ref={editorRef} 
        className="h-full w-full"
        style={{ 
          height: 'calc(100vh - 56px)',
          background: 'var(--md-bg-color)'
        }} 
      />
    </div>
  );
};
