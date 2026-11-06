import SiteHeader from "@/components/site-header";

// The shared page background (AppBackground) sits behind this, so the shell itself has no background.
export default function PageShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative z-10 min-h-screen text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-8 sm:px-10">{title && <h1 className="mb-6 text-3xl font-medium">{title}</h1>}{children}</main>
    </div>
  );
}
