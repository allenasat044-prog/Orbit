import * as React from "react";
import { cn } from "@/lib/utils";

export interface WellProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "field" | "plain";
}

/** A sunken panel the scene sits in. Children are positioned inside it. */
export const Well = React.forwardRef<HTMLElement, WellProps>(function Well({ variant = "field", className, ...props }, ref) {
  return <div ref={ref as React.Ref<HTMLDivElement>} data-variant={variant} className={cn("mu-well", className)} {...props} />;
});
