import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import OrbitDeliveryHero from "@/components/ui/orbit-delivery-hero";
import Dashboard from "@/components/ui/dashboard-4";
import PageShell from "@/pages/PageShell";
import Explore from "@/pages/Explore";
import Captions from "@/pages/Captions";
import AuthPage from "@/pages/AuthPage";
import AuthCallback from "@/pages/AuthCallback";
import ContactWithGlobe from "@/components/ui/contact-with-globe";
import Faqs from "@/pages/Faqs";
import Library from "@/pages/Library";
import Analysis from "@/pages/Analysis";
import Profile from "@/pages/Profile";
import ErrorBoundary from "@/components/error-boundary";
import AppBackground from "@/components/app-background";
import { toggleTheme, useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/use-auth";

const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "?";

const Landing = () => {
  const nav = useNavigate();
  const theme = useTheme();
  const { signedIn, me, logout } = useAuth();
  const account = signedIn ? { name: me?.name ?? "Account", firstName: me?.firstName ?? "Account", avatar: me?.avatar ?? null, initials: initials(me?.name ?? "Account") } : null;
  return <OrbitDeliveryHero theme={theme} onNavigate={nav} account={account} onToggleTheme={toggleTheme} onLogout={logout} />;
};
const page = (title: string, el: React.ReactNode) => <PageShell title={title}>{el}</PageShell>;

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <AppBackground />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/contact" element={<ContactWithGlobe />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/explore" element={page("Explore", <Explore />)} />
        <Route path="/captions" element={page("Captions", <Captions />)} />
        <Route path="/library" element={page("Bookmarks", <Library />)} />
        <Route path="/profile" element={page("Profile", <Profile />)} />
        <Route path="/analysis" element={page("Analysis", <Analysis />)} />
        <Route path="/dashboard" element={page("Dashboard", <Dashboard />)} />
      </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
