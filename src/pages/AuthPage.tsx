import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { login, signup } from "@/lib/auth";
import { GlobeWireframe, FormDots } from "@/components/ui/contact-with-globe";
import { BusyLabel } from "@/components/ui/busy-label";

type Mode = "login" | "signup";

const labelCls = "text-xs font-semibold uppercase tracking-widest text-muted-foreground";
const field = "rounded-xl border border-input focus-visible:ring-2 focus-visible:ring-ring";
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// A plain link, not a fetch: the browser leaves for Google/GitHub and comes back to /auth/callback.
function SocialButton({ provider, label, icon }: { provider: "google" | "github"; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={`/api/auth/oauth/${provider}`}
      className="inline-flex h-11 items-center justify-center gap-2.5 rounded-xl border border-input bg-background text-sm font-medium text-foreground transition-colors hover:bg-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {icon}
      Continue with {label}
    </a>
  );
}

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
    <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

export default function AuthPage({ mode }: { mode: Mode }) {
  const isSignup = mode === "signup";
  const nav = useNavigate();
  const [params] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  // Google/GitHub send people back here with a message when something went wrong.
  const [error, setError] = useState(params.get("oauth_error") ?? "");
  const [busy, setBusy] = useState(false);

  const validate = () => {
    if (isSignup && !name.trim()) return "Enter your name.";
    if (!emailOk(email)) return "Enter a valid email address.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (isSignup && password !== confirm) return "Passwords do not match.";
    return "";
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const problem = validate();
    if (problem) return setError(problem);
    setError("");
    setBusy(true);
    const res = isSignup ? await signup(name.trim(), email, password) : await login(email, password);
    setBusy(false);
    if (!res.ok) return setError(res.error ?? "Something went wrong.");
    nav("/dashboard");
  };

  return (
    <div
      className="relative z-10 flex min-h-screen flex-col overflow-hidden text-ink"
    >
      <header className="relative z-10 px-[6.5%] py-6">
        <Link to="/" className="text-2xl font-semibold tracking-tight">orbit</Link>
      </header>

      <main className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-10 px-4 pb-16 lg:grid-cols-2">
        {/* Left: globe hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <span className="mb-4 inline-flex items-center rounded-full border border-[#4773ec]/30 bg-[#4773ec]/10 px-4 py-1.5 text-sm font-medium text-link">
            {isSignup ? "Join orbit" : "Welcome back"}
          </span>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            {isSignup ? "Start exploring Earth from orbit" : "Log in to orbit"}
          </h1>
          <p className="mt-4 max-w-md text-base text-ink-muted">
            Search satellite imagery, generate captions and compare changes over time, all in one place.
          </p>
          <div className="relative mt-8 h-64 w-full max-w-md overflow-hidden text-ink-muted">
            <GlobeWireframe
              className="absolute left-0 top-0 aspect-square w-full max-w-full"
              variant="wireframesolid"
              autoRotate
              autoRotateSpeed={0.45}
              strokeWidth={0.6}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
          </div>
        </motion.div>

        {/* Right: form card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-md justify-self-center lg:justify-self-end"
        >
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl">{isSignup ? "Create your account" : "Sign in to your account"}</CardTitle>
              <CardDescription>
                {isSignup ? "Sign up to start exploring Earth observation data." : "Log in to continue to your dashboard."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormDots className="-mt-2 mb-3" />
              <div className="grid gap-3 sm:grid-cols-2">
                <SocialButton provider="google" label="Google" icon={<GoogleIcon />} />
                <SocialButton provider="github" label="GitHub" icon={<GitHubIcon />} />
              </div>
              <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground" aria-hidden>
                <span className="h-px flex-1 bg-wash-strong" />or with email<span className="h-px flex-1 bg-wash-strong" />
              </div>
              <form onSubmit={onSubmit} className="space-y-4" noValidate>
                {isSignup && (
                  <div className="space-y-1.5">
                    <label htmlFor="name" className={labelCls}>Full name</label>
                    <Input id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={field} />
                  </div>
                )}
                <div className="space-y-1.5">
                  <label htmlFor="email" className={labelCls}>Email address</label>
                  <Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={field} />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="password" className={labelCls}>Password</label>
                  <Input id="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className={field} />
                </div>
                {isSignup && (
                  <div className="space-y-1.5">
                    <label htmlFor="confirm" className={labelCls}>Confirm password</label>
                    <Input id="confirm" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat password" className={field} />
                  </div>
                )}
                {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
                {error === "Invalid email or password." && !isSignup && (
                  <p className="text-xs text-muted-foreground">Signed up with Google or GitHub? Use the buttons above instead.</p>
                )}
                <Button type="submit" className="group h-11 w-full rounded-xl font-semibold" disabled={busy}>
                  <BusyLabel busy={busy} busyText={isSignup ? "Creating your account…" : "Logging in…"} size="h-4 w-4">{isSignup ? "Sign up" : "Log in"}</BusyLabel>
                  {!busy && <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />}
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                {isSignup ? "Already have an account? " : "New to orbit? "}
                <Link to={isSignup ? "/login" : "/signup"} className="text-link hover:underline">
                  {isSignup ? "Log in" : "Create an account"}
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
