import { Link } from "react-router-dom";
const links = [["Explore", "/explore"], ["Captions", "/captions"], ["Analysis", "/analysis"], ["Dashboard", "/dashboard"], ["Updates", "/updates"]];
export default function PageShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="dark min-h-screen text-[#f3f6ff]" style={{ background: "radial-gradient(ellipse at 6% 15%,#151e32 0%,#0d1526 50%,#101e38 100%)" }}>
      <header className="flex items-center justify-between px-[6.5%] py-6">
        <Link to="/" className="text-2xl font-semibold tracking-tight">orbit</Link>
        <nav className="flex items-center gap-8 text-sm text-[#becbe6]">
          {links.map(([l, p]) => <Link key={p} to={p} className="hover:text-[#8daaff]">{l}</Link>)}
          <Link to="/login" className="hover:text-[#8daaff]">Log in</Link>
          <Link to="/signup" className="rounded-md bg-[#4773ec] px-3 py-1.5 text-white hover:bg-[#4773ec]/90">Sign up</Link>
        </nav>
      </header>
      <main className="px-[6.5%] pb-10"><h1 className="mb-6 text-3xl font-medium">{title}</h1>{children}</main>
    </div>
  );
}
