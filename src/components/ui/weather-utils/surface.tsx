import * as React from "react";
import { cn } from "@/lib/utils";

export interface SurfaceProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  material?: "raise" | "flat";
  radius?: "card" | "tile" | "none";
}

/** A slab with a material (raise = a soft raised plate) and a corner radius. */
export const Surface = React.forwardRef<HTMLElement, SurfaceProps>(function Surface(
  { as: Tag = "div", material = "raise", radius = "card", className, ...props },
  ref,
) {
  const Comp = Tag as React.ElementType;
  return <Comp ref={ref} data-material={material} data-radius={radius} className={cn("mu-surface", className)} {...props} />;
});
