import React, { useEffect, useRef, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import "./spotlight-card.css";

/**
 * Spotlight card (21st.dev, by @jahed), adapted for Orbit EO:
 *  - customSize makes it a normal content-sized card (use the Panel shortcut below); without it you get the
 *    original fixed-size tile.
 *  - `as` picks the HTML element (section, li, article ...), and other HTML attributes pass through.
 *  - cards can be nested, and every card shares one pointer listener that updates once per frame.
 *  - no touch-action lock (it would stop touch scrolling) and no glow on touch screens.
 */
interface GlowCardProps extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  children?: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  /** Content-sized card: no fixed size, ratio or grid. */
  customSize?: boolean;
  as?: ElementType;
  /** Corner radius in px, used by the glow. Keep it equal to the card's rounded-* class (16 = rounded-2xl). */
  radius?: number;
  /** Width in px of the lit border. */
  borderSize?: number;
  /** Fill behind the content, as any CSS colour. */
  backdrop?: string;
  style?: CSSProperties;
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

// One listener for every card on the page, and one update per animation frame.
const tracked = new Set<HTMLElement>();
let pending: { x: number; y: number } | null = null;
let frame = 0;

function flush() {
  frame = 0;
  if (!pending) return;
  const { x, y } = pending;
  pending = null;
  const values = [x.toFixed(2), (x / window.innerWidth).toFixed(2), y.toFixed(2), (y / window.innerHeight).toFixed(2)];
  tracked.forEach((el) => {
    el.style.setProperty("--x", values[0]);
    el.style.setProperty("--xp", values[1]);
    el.style.setProperty("--y", values[2]);
    el.style.setProperty("--yp", values[3]);
  });
}

function onMove(e: PointerEvent) {
  pending = { x: e.clientX, y: e.clientY };
  if (!frame) frame = requestAnimationFrame(flush);
}

function track(el: HTMLElement) {
  if (tracked.size === 0) document.addEventListener("pointermove", onMove, { passive: true });
  tracked.add(el);
  return () => {
    tracked.delete(el);
    if (tracked.size === 0) {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      pending = null;
    }
  };
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "blue",
  size = "md",
  width,
  height,
  customSize = false,
  as,
  radius = 16,
  borderSize = 2,
  backdrop = "var(--glow-backdrop, hsl(0 0% 60% / 0.08))",
  style,
  ...rest
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const Tag: ElementType = as ?? "div";

  useEffect(() => (cardRef.current ? track(cardRef.current) : undefined), []);

  const { base, spread } = glowColorMap[glowColor];

  const inline = {
    "--base": base,
    "--spread": spread,
    "--radius": radius,
    "--border": borderSize,
    "--backdrop": backdrop,
    "--backup-border": "var(--glow-border, hsl(0 0% 60% / 0.16))",
    "--size": "200",
    "--outer": "1",
    "--border-size": "calc(var(--border, 2) * 1px)",
    "--spotlight-size": "calc(var(--size, 150) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
    )`,
    backgroundColor: "var(--backdrop, transparent)",
    backgroundSize: "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    backgroundAttachment: "fixed",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative",
    ...(width !== undefined ? { width: typeof width === "number" ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === "number" ? `${height}px` : height } : {}),
    ...style,
  } as CSSProperties;

  return (
    <Tag
      ref={cardRef}
      data-glow
      style={inline}
      className={cn(
        "relative rounded-2xl shadow-[0_1rem_2rem_-1rem_var(--glow-shadow,black)] backdrop-blur-[5px]",
        customSize ? "p-5" : cn(sizeMap[size], "aspect-[3/4] grid grid-rows-[1fr_auto] gap-4 p-4"),
        className,
      )}
      {...rest}
    >
      <div data-glow-halo aria-hidden="true" />
      {children}
    </Tag>
  );
};

/** A content-sized spotlight card. The everyday choice for panels, tiles and list cards. */
const Panel: React.FC<GlowCardProps> = (props) => <GlowCard customSize {...props} />;

export { GlowCard, Panel };
