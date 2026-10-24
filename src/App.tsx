import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import OrbitDeliveryHero from "@/components/ui/orbit-delivery-hero";
import Dashboard from "@/components/ui/dashboard-4";
import PageShell from "@/pages/PageShell";
import Explore from "@/pages/Explore";
import ComingSoon from "@/pages/ComingSoon";
import Captions from "@/pages/Captions";
import AuthPage from "@/pages/AuthPage";
import ContactWithGlobe from "@/components/ui/contact-with-globe";
import Faqs from "@/pages/Faqs";

const Landing = () => { const nav = useNavigate(); return <OrbitDeliveryHero theme="dark" onNavigate={nav} />; };
const page = (title: string, el: React.ReactNode) => <PageShell title={title}>{el}</PageShell>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/contact" element={<div className="dark"><ContactWithGlobe /></div>} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/explore" element={page("Explore", <Explore />)} />
        <Route path="/captions" element={page("Captions", <Captions />)} />
        <Route path="/analysis" element={page("Analysis", <ComingSoon api="POST /api/analysis/compare" />)} />
        <Route path="/updates" element={page("Updates", <ComingSoon api="GET /api/updates/status, /api/updates/history" />)} />
        <Route path="/dashboard" element={page("Dashboard", <Dashboard />)} />
      </Routes>
    </BrowserRouter>
  );
}
