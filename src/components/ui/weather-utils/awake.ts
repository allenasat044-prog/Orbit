import * as React from "react";

/**
 * Tells animations when to rest. Returns [watch, awake]: pass `watch` the element to observe;
 * `awake` is false while the element is off screen or the browser tab is hidden.
 */
export function useAwake(): [(el: HTMLElement | null) => void, boolean] {
  const [onScreen, setOnScreen] = React.useState(true);
  const [tabVisible, setTabVisible] = React.useState(true);
  const observer = React.useRef<IntersectionObserver | null>(null);

  const watch = React.useCallback((el: HTMLElement | null) => {
    observer.current?.disconnect();
    observer.current = null;
    if (!el || typeof IntersectionObserver === "undefined") return;
    observer.current = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0 });
    observer.current.observe(el);
  }, []);

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const update = () => setTabVisible(document.visibilityState !== "hidden");
    update();
    document.addEventListener("visibilitychange", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
      observer.current?.disconnect();
    };
  }, []);

  return [watch, onScreen && tabVisible];
}
