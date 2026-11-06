import { useState } from "react";

type Props = { beforeUrl: string; afterUrl: string; beforeLabel: string; afterLabel: string; overlayUrl?: string | null; showChanges: boolean };

/** Drag the slider to wipe between the earlier and the later picture. The change overlay sits on the later one. */
export function BeforeAfter({ beforeUrl, afterUrl, beforeLabel, afterLabel, overlayUrl, showChanges }: Props) {
  const [pos, setPos] = useState(50);
  return (
    <div className="space-y-2">
      <div className="relative mx-auto aspect-square w-full max-w-xl select-none overflow-hidden rounded-xl border border-line bg-black">
        <img src={afterUrl} alt={`After: ${afterLabel}`} className="absolute inset-0 h-full w-full object-cover" />
        {overlayUrl && showChanges && <img src={overlayUrl} alt="Areas flagged as changed" className="absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={beforeUrl} alt={`Before: ${beforeLabel}`} className="h-full w-full object-cover" />
        </div>
        <span aria-hidden className="absolute inset-y-0 w-0.5 bg-white/90 shadow" style={{ left: `${pos}%` }} />
        <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">Before · {beforeLabel}</span>
        <span className="absolute right-2 top-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">After · {afterLabel}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Slide between the before and after pictures"
        className="mx-auto block w-full max-w-xl accent-[#8daaff]"
      />
    </div>
  );
}
