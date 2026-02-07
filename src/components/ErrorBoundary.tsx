import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Editor Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center h-full bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
          <div className="text-center p-8 max-w-md">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-lg font-semibold mb-2">Editor Loading Error</h2>
            <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
              Unable to load the Markdown editor. This might be due to network issues or blocked resources.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded-md hover:opacity-90 transition-opacity"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
