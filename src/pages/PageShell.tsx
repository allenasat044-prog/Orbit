import SiteHeader from "@/components/site-header";
export default function PageShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="dark min-h-screen text-[#f3f6ff]" style={{ background: "radial-gradient(ellipse at 6% 15%,#151e32 0%,#0d1526 50%,#101e38 100%)" }}>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-8 sm:px-10">{title && <h1 className="mb-6 text-3xl font-medium">{title}</h1>}{children}</main>
    </div>
  );
}
