import { useLocation } from "react-router-dom";
import { TopographyBackground } from "@/components/ui/backgrounds-topography";
import { useTheme } from "@/lib/theme";

// Pages that keep their own background: the landing page has its own animated scene, and the FAQ page stays plain.
const PLAIN = new Set(["/faqs"]);
const OWN_SCENE = new Set(["/"]);

/**
 * The page background behind every screen: a soft gradient with slowly moving contour lines (the topography
 * background from 21st.dev) that rise under the mouse and ripple when you click empty space. One instance stays
 * mounted while you move between pages, drawn at a light frame rate and resolution to be easy on laptops.
 */
export default function AppBackground() {
  const { pathname } = useLocation();
  const theme = useTheme();
  if (OWN_SCENE.has(pathname)) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" style={{ background: "var(--page-bg)" }}>
      {!PLAIN.has(pathname) && (
        <TopographyBackground
          listenOn="window"
          maxFps={30}
          maxDpr={1.25}
          levels={14}
          lineColor={theme === "dark" ? "#8da3d9" : "#5b6b94"}
          className="absolute inset-0"
          style={{ opacity: theme === "dark" ? 0.42 : 0.5 }}
        />
      )}
    </div>
  );
}
