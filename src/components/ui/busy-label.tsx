import type { ReactNode } from "react";
import { MorphingSquare } from "@/components/ui/morphing-square";

/**
 * The label of a button that can be busy: shows the morphing square and a busy message while `busy`, the normal label otherwise.
 * The square is decoration here (the busy text next to it already says what is happening).
 */
export function BusyLabel({ busy, busyText, children, size = "h-3.5 w-3.5" }: { busy: boolean; busyText: string; children: ReactNode; size?: string }) {
  if (!busy) return <>{children}</>;
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="inline-flex"><MorphingSquare className={`${size} bg-current`} /></span>
      {busyText}
    </span>
  );
}
