import { useState } from "react";
import type { ChipInfo } from "@/lib/analysis-api";

/** The preview picture of a scene at the pin, with the pin marked by a red ring. */
export function ChipImage({ chip, onBroken }: { chip: ChipInfo; onBroken: () => void }) {
  const [broken, setBroken] = useState(false);
  const left = (chip.pin_px.x / chip.width_px) * 100;
  const top = (chip.pin_px.y / chip.height_px) * 100;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-xl border border-line bg-black/40">
      {broken ? (
        <p role="alert" className="grid h-full place-items-center p-6 text-center text-sm text-amber-800 dark:text-amber-200">
          This saved image could not be loaded. Press “Refresh image” to cut it again.
        </p>
      ) : (
        <>
          <img
            key={chip.rev}
            src={chip.display_url}
            alt="Satellite preview at the pin"
            className="h-full w-full object-cover"
            onError={() => {
              setBroken(true);
              onBroken();
            }}
          />
          <span aria-hidden className="pointer-events-none absolute size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-500 shadow-[0_0_0_1px_rgba(255,255,255,.6)]" style={{ left: `${left}%`, top: `${top}%` }} />
        </>
      )}
    </div>
  );
}
