import { useEffect, useRef, useState } from "react";
import { Viewer, ImageryLayer, UrlTemplateImageryProvider } from "cesium";
import SearchGroup from "@/components/ui/v-group-18";

export default function Explore() {
  const el = useRef<HTMLDivElement>(null);
  const viewer = useRef<Viewer>();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    viewer.current = new Viewer(el.current!, {
      baseLayer: new ImageryLayer(new UrlTemplateImageryProvider({ url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png", maximumLevel: 19, credit: "© OpenStreetMap contributors" })),
      baseLayerPicker: false, geocoder: false, timeline: false, animation: false,
    });
    return () => viewer.current?.destroy();
  }, []);

  const onSearch = async (q: string, category: string) => {
    setMsg("Searching…");
    try {
      const res = await fetch(`/api/imagery/search?q=${encodeURIComponent(q)}&type=${encodeURIComponent(category)}`);
      if (!res.ok) throw new Error(String(res.status));
      const { items } = await res.json();
      setMsg(`${items?.length ?? 0} results`);
      // TODO: draw item footprints with GeoJsonDataSource.load(...)
    } catch (e) { setMsg(`Search unavailable (backend not reachable: ${(e as Error).message})`); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4"><SearchGroup onSearch={onSearch} /><span className="text-sm text-muted-foreground">{msg}</span></div>
      <div ref={el} className="h-[70vh] w-full overflow-hidden rounded-2xl border border-white/10" />
    </div>
  );
}
