import * as React from "react";
import { X } from "lucide-react";
import "@/components/ui/weather.css";
import { Weather, type WeatherProps } from "@/components/ui/weather";

export interface WeatherPopupProps {
  open: boolean;
  onClose: () => void;
  loading?: boolean;
  error?: string | null;
  widget?: WeatherProps | null;
  attribution?: { text: string; url: string } | null;
}

/** A pop-up window that shows the weather widget. Closes with Esc, the X, or a click outside. */
export function WeatherPopup({ open, onClose, loading, error, widget, attribution }: WeatherPopupProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose} data-testid="weather-overlay">
      <div role="dialog" aria-modal="true" aria-label="Weather forecast" className="relative max-h-[94vh] max-w-full overflow-y-auto rounded-[24px]" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Close weather" className="absolute right-3 top-3 z-10 rounded-md p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
          <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
        </button>
        {loading && <div className="flex h-40 w-[360px] max-w-full items-center justify-center rounded-[22px] bg-[#232427] text-sm text-white/70">Loading the forecast…</div>}
        {!loading && error && <div className="w-[360px] max-w-full rounded-[22px] bg-[#232427] p-6 text-sm text-white/80">{error}</div>}
        {!loading && !error && widget && <Weather {...widget} />}
        {!loading && !error && widget && attribution && (
          <p className="mt-2 text-center text-xs text-white/60">
            <a href={attribution.url} target="_blank" rel="noreferrer" className="underline">{attribution.text}</a> (CC BY 4.0). Model forecast, not a measurement.
          </p>
        )}
      </div>
    </div>
  );
}
