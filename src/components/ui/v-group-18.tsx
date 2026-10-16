import { useState } from "react";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["All", "Location", "Imagery", "Captions", "Regions"];

export default function SearchGroup({ onSearch }: { onSearch?: (q: string, category: string) => void }) {
  const [category, setCategory] = useState("All");
  const [q, setQ] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSearch?.(q, category); }}
      className="flex w-full max-w-md items-stretch overflow-hidden rounded-lg border border-input bg-background">
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="h-10 w-auto gap-2 rounded-none border-0 border-r focus:ring-0"><SelectValue /></SelectTrigger>
        <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
      </Select>
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="h-10 flex-1 rounded-none border-0" />
      <Button type="submit" variant="ghost" size="icon" className="rounded-none border-l" aria-label="Search"><Search className="h-4 w-4" /></Button>
    </form>
  );
}
