import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "@/lib/auth";
import { MorphingSquare } from "@/components/ui/morphing-square";

// Where Google/GitHub sign-in lands. The server puts our login token after the "#" in the address,
// which browsers never send to any server. We keep it, wipe it from the address bar and move on.
const JWT_SHAPE = /^[\w-]+\.[\w-]+\.[\w-]+$/;

export default function AuthCallback() {
  const nav = useNavigate();
  useEffect(() => {
    const token = new URLSearchParams(window.location.hash.slice(1)).get("token") ?? "";
    window.history.replaceState(null, "", window.location.pathname);
    if (JWT_SHAPE.test(token)) {
      setToken(token);
      nav("/dashboard", { replace: true });
    } else {
      nav(`/login?oauth_error=${encodeURIComponent("Sign-in did not finish. Please try again.")}`, { replace: true });
    }
  }, [nav]);

  return (
    <div className="grid min-h-screen place-items-center bg-background text-ink-muted">
      <MorphingSquare className="h-8 w-8" message="Signing you in…" />
    </div>
  );
}
