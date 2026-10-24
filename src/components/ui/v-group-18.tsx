import { useState } from "react";
import { BorderBeam } from "@/components/ui/border-beam-search";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = ["All", "Location", "Imagery", "Captions", "Regions"];

function SearchIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, flexShrink: 0 }}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

// Same look as the 21st.dev "border-beam-search" demo, wired up as a real search form.
export default function SearchGroup({ onSearch }: { onSearch?: (q: string, category: string) => void }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  return (
    <BorderBeam size="line" colorVariant="colorful" duration={3.1} borderRadius={20}>
      <form
        onSubmit={(e) => { e.preventDefault(); onSearch?.(q, category); }}
        style={{ width: 440, maxWidth: "100%", height: 42, borderRadius: 64, overflow: "hidden", position: "relative", fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            background: "#1d1d1d",
            boxShadow: "inset 0 0 0 1px rgba(44,47,54,0.52), inset 0 0 50px 0 rgba(255,255,255,0.02)",
            display: "flex",
            alignItems: "center",
            padding: "0 13px",
            gap: 10,
            color: "#565656",
          }}
        >
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger
              aria-label="Search category"
              className="h-full w-auto shrink-0 gap-1.5 rounded-none border-0 bg-transparent p-0 pr-1 text-[13px] text-[#9a9a9a] shadow-none hover:text-white focus:ring-0 focus:ring-offset-0"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-[100]">
              {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <span aria-hidden="true" style={{ width: 1, height: 18, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
          <button type="submit" aria-label="Search" style={{ all: "unset", cursor: "pointer", display: "flex", color: "inherit" }}>
            <SearchIcon />
          </button>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            aria-label="Search"
            className="orbit-search-input"
            style={{ flex: 1, minWidth: 0, background: "transparent", border: 0, outline: "none", fontSize: 15, lineHeight: "18px", color: "#e8e8e8", fontFamily: "inherit" }}
          />
        </div>
      </form>
    </BorderBeam>
  );
}
