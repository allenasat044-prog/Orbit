import { Component, type ErrorInfo, type ReactNode } from "react";

// If one page crashes, show a message instead of a blank screen, and let people carry on.
export default class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Page crashed:", error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="grid min-h-screen place-items-center bg-background p-6 text-ink-soft">
        <div role="alert" className="max-w-md space-y-4 rounded-2xl border border-line bg-surface p-6 text-center">
          <h1 className="text-xl font-semibold text-ink">Something went wrong on this page</h1>
          <p className="text-sm text-ink-muted">The rest of Orbit EO is fine. Try the page again, or go back to the start.</p>
          <p className="break-words rounded-lg bg-sunk p-2 font-mono text-xs text-red-700 dark:text-red-300">{this.state.error.message}</p>
          <div className="flex justify-center gap-3">
            <button type="button" onClick={() => window.location.reload()} className="rounded-lg border border-line-strong px-4 py-2 text-sm hover:bg-wash">Reload page</button>
            <a href="/" className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">Go home</a>
          </div>
        </div>
      </div>
    );
  }
}
