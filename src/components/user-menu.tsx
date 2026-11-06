import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookMarked, ChevronDown, LogOut, UserRound } from "lucide-react";
import { ProfileAvatar } from "@/components/profile-avatar";
import { useAuth } from "@/lib/use-auth";

/**
 * Shown instead of "Log in / Sign up" once someone is logged in: their picture, first name and a green
 * "signed in" dot, with a small menu for Profile, Bookmarks and Log out.
 */
export function UserMenu() {
  const { me, logout } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [open]);

  const item = "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-ink-soft transition-colors hover:bg-wash hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const name = me?.firstName ?? "Account";

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Account menu, signed in as ${name}`}
        className="flex items-center gap-2 rounded-full border border-line-strong py-1 pl-1 pr-2.5 text-sm text-ink transition-colors hover:bg-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="relative">
          <ProfileAvatar name={me?.name ?? name} image={me?.avatar} size={28} />
          <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-background bg-emerald-400" title="Signed in" aria-hidden />
        </span>
        <span className="hidden max-w-[7rem] truncate sm:inline">{name}</span>
        <ChevronDown className={`size-3.5 text-ink-muted transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-line-strong bg-popover p-1.5 text-popover-foreground shadow-xl">
          <p className="px-3 py-2 text-xs text-ink-muted">Signed in{me ? <> as <strong className="text-ink">@{me.username}</strong></> : null}</p>
          <Link role="menuitem" to="/profile" onClick={() => setOpen(false)} className={item}><UserRound className="size-4" aria-hidden />Profile</Link>
          <Link role="menuitem" to="/library" onClick={() => setOpen(false)} className={item}><BookMarked className="size-4" aria-hidden />Bookmarks</Link>
          <button role="menuitem" type="button" onClick={() => { setOpen(false); logout(); nav("/"); }} className={item}><LogOut className="size-4" aria-hidden />Log out</button>
        </div>
      )}
    </div>
  );
}
