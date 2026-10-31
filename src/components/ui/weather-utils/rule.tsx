import * as React from "react";
import { cn } from "@/lib/utils";

export interface RuleProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

/** A thin dividing line. */
export function Rule({ orientation = "horizontal", className, ...props }: RuleProps) {
  return <div role="separator" aria-orientation={orientation} data-orientation={orientation} className={cn("mu-rule", className)} {...props} />;
}
