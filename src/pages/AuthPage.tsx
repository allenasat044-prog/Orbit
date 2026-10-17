import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { login, signup } from "@/lib/auth";
import { GlobeWireframe, FormDots } from "@/components/ui/contact-with-globe";

type Mode = "login" | "signup";

const labelCls = "text-xs font-semibold uppercase tracking-widest text-muted-foreground";
const field = "rounded-xl border border-input focus-visible:ring-2 focus-visible:ring-ring";
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function AuthPage({ mode }: { mode: Mode }) {
  const isSignup = mode === "signup";
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
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
      className="dark relative flex min-h-screen flex-col overflow-hidden text-[#f3f6ff]"
      style={{ background: "radial-gradient(ellipse at 6% 15%,#151e32 0%,#0d1526 50%,#101e38 100%)" }}
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
          <span className="mb-4 inline-flex items-center rounded-full border border-[#4773ec]/30 bg-[#4773ec]/10 px-4 py-1.5 text-sm font-medium text-[#8daaff]">
            {isSignup ? "Join orbit" : "Welcome back"}
          </span>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            {isSignup ? "Start exploring Earth from orbit" : "Log in to orbit"}
          </h1>
          <p className="mt-4 max-w-md text-base text-[#b0bed9]">
            Search satellite imagery, generate captions and compare changes over time, all in one place.
          </p>
          <div className="relative mt-8 h-64 w-full max-w-md overflow-hidden text-[#becbe6]">
            <GlobeWireframe
              className="absolute left-0 top-0 aspect-square w-full max-w-full"
              variant="wireframesolid"
              autoRotate
              autoRotateSpeed={0.45}
              strokeWidth={0.6}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0d1526] to-transparent" />
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
                {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
                <Button type="submit" className="group h-11 w-full rounded-xl font-semibold" disabled={busy}>
                  {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isSignup ? "Sign up" : "Log in"}
                  {!busy && <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />}
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                {isSignup ? "Already have an account? " : "New to orbit? "}
                <Link to={isSignup ? "/login" : "/signup"} className="text-[#8daaff] hover:underline">
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
