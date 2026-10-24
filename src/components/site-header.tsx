import { Link, useLocation } from "react-router-dom";
import { BarChart3, Globe2, HelpCircle, Home, LayoutDashboard, MessageSquare } from "lucide-react";

const links = [
  ["Home", "/", Home],
  ["Explore", "/explore", Globe2],
  ["Captions", "/captions", MessageSquare],
  ["Analysis", "/analysis", BarChart3],
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["FAQ", "/faqs", HelpCircle],
] as const;

// One shared header for every page, so the navigation always looks the same.
export default function SiteHeader() {
  const { pathname } = useLocation();
  return (
    <header className="border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link to="/" className="flex items-center gap-3 text-lg font-medium text-[#f3f6ff]">
          <span className="grid size-9 place-items-center rounded-full bg-white text-black"><Globe2 className="size-5" /></span>
          Orbit EO
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([label, to, Icon]) => {
            const on = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm transition-colors ${on ? "bg-white/10 text-white" : "text-[#b0bed9] hover:bg-white/5 hover:text-white"}`}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/login" className="text-[#b0bed9] hover:text-white">Log in</Link>
          <Link to="/signup" className="rounded-lg bg-white px-3 py-1.5 font-medium text-black hover:opacity-90">Sign up</Link>
        </div>
      </div>
    </header>
  );
}
