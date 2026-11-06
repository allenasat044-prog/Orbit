import * as React from "react";
import { MotionConfig, useReducedMotion } from "motion/react";

// Small stand-ins for the helpers the 21st.dev topography background takes from @animate-ui/react,
// so the project needs no extra package.

/** True when the person asked their system for less motion. */
export function useShouldReduceMotion() {
  return Boolean(useReducedMotion());
}

/** Makes every motion component in the tree respect the "reduce motion" setting. */
export function ReducedMotionConfig({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** False while the browser tab is hidden, so animations can stop and save battery. */
export function usePageVisible() {
  const [visible, setVisible] = React.useState(() => typeof document === "undefined" || document.visibilityState !== "hidden");
  React.useEffect(() => {
    const update = () => setVisible(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return visible;
}
