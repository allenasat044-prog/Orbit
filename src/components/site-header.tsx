import { Link, useLocation } from "react-router-dom";
import { BarChart3, BookMarked, Globe2, HelpCircle, Home, LayoutDashboard, MessageSquare, UserRound } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { useAuth } from "@/lib/use-auth";

const links = [
  ["Home", "/", Home],
  ["Explore", "/explore", Globe2],
  ["Captions", "/captions", MessageSquare],
  ["Library", "/library", BookMarked],
  ["Analysis", "/analysis", BarChart3],
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["FAQ", "/faqs", HelpCircle],
] as const;

// One shared header for every page, so the navigation always looks the same.
export default function SiteHeader() {
  const { pathname } = useLocation();
  const { signedIn } = useAuth();
  const navLink = (on: boolean) =>
    `flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${on ? "bg-wash-strong text-ink" : "text-ink-muted hover:bg-wash hover:text-ink"}`;
  return (
    <header className="relative z-20 border-b border-line bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-4 px-6 sm:px-10">
        <Link to="/" className="flex shrink-0 items-center gap-3 text-lg font-medium text-ink">
          <span className="grid size-9 place-items-center rounded-full bg-foreground text-background"><Globe2 className="size-5" /></span>
          Orbit EO
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {links.map(([label, to, Icon]) => (
            <Link key={to} to={to} className={navLink(pathname === to)}>
              <Icon className="hidden size-4 2xl:block" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2 text-sm">
          <ThemeToggle />
          <Link
            to="/profile"
            aria-label="Profile"
            className={`flex h-9 items-center gap-2 rounded-lg border px-3 transition-colors ${pathname === "/profile" ? "border-line-strong bg-wash-strong text-ink" : "border-line-strong text-ink-soft hover:bg-wash hover:text-ink"}`}
          >
            <UserRound className="size-4" />
            <span className="hidden xl:inline">Profile</span>
          </Link>
          {signedIn ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/login" className="hidden px-2 text-ink-muted hover:text-ink xl:inline">Log in</Link>
              <Link to="/signup" className="rounded-lg bg-foreground px-3 py-1.5 font-medium text-background hover:opacity-90">Sign up</Link>
            </>
          )}
        </div>
      </div>
      {/* Smaller screens: the same links in a scrollable row */}
      <nav className="flex gap-1 overflow-x-auto px-4 pb-2 lg:hidden" aria-label="Main navigation (compact)">
        {links.map(([label, to, Icon]) => (
          <Link key={to} to={to} className={navLink(pathname === to)}>
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
        <Link to="/profile" className={navLink(pathname === "/profile")}><UserRound className="size-4" />Profile</Link>
      </nav>
    </header>
  );
}
