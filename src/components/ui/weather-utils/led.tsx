import * as React from "react";
import { cn } from "@/lib/utils";

export interface LedProps extends React.HTMLAttributes<HTMLSpanElement> {
  kind?: "live" | "off";
}

/** A small status light. */
export function Led({ kind = "live", className, ...props }: LedProps) {
  return <span aria-hidden data-kind={kind} className={cn("mu-led", className)} {...props} />;
}
