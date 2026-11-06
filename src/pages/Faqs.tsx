import SiteHeader from "@/components/site-header";
import Faqs02 from "@/components/ui/faqs-02";
import { useTheme } from "@/lib/theme";

// The FAQ page keeps its own plain grid background (no contour lines), in both themes.
const GRID = {
  dark: { backgroundColor: "#0a0a0b", line: "rgba(255,255,255,0.025)", glow: "rgba(255,255,255,0.05)" },
  light: { backgroundColor: "#f6f7fb", line: "rgba(15,23,42,0.045)", glow: "rgba(58,91,217,0.07)" },
};

export default function Faqs() {
  const g = GRID[useTheme()];
  return (
    <div
      className="relative z-10 min-h-screen text-foreground"
      style={{
        backgroundColor: g.backgroundColor,
        backgroundImage: `linear-gradient(${g.line} 1px, transparent 1px), linear-gradient(90deg, ${g.line} 1px, transparent 1px), radial-gradient(ellipse at 85% 40%, ${g.glow}, transparent 55%)`,
        backgroundSize: "64px 64px, 64px 64px, 100% 100%",
      }}
    >
      <SiteHeader />
      <Faqs02 />
    </div>
  );
}
