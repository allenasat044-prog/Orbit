import { Link } from "react-router-dom";
import { ChevronRight, Globe2, Captions, GitCompare, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemGroup } from "@/components/ui/item";

const actions = [
  ["Explore globe", "Search and view imagery.", "/explore", Globe2],
  ["Generate captions", "Run a model on an image.", "/captions", Captions],
  ["Compare dates", "Change analysis.", "/analysis", GitCompare],
  ["Update history", "Weekly job runs.", "/updates", RefreshCw],
] as const;

export function QuickActions() {
  return (
    <Card className="md:col-span-2">
      <CardHeader><CardTitle className="text-base">Quick actions</CardTitle><CardDescription>Shortcuts to common destinations.</CardDescription></CardHeader>
      <CardContent><ItemGroup>{actions.map(([t, d, to, Icon]) => (
        <Item key={to} asChild size="sm"><Link to={to}>
          <ItemMedia variant="icon"><Icon /></ItemMedia>
          <ItemContent><ItemTitle>{t}</ItemTitle><ItemDescription>{d}</ItemDescription></ItemContent>
          <ItemActions><ChevronRight className="size-4" /></ItemActions>
        </Link></Item>
      ))}</ItemGroup></CardContent>
    </Card>
  );
}
