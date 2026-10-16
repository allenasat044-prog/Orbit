export default function ComingSoon({ api }: { api: string }) {
  return <p className="text-muted-foreground">Not built yet. Backed by <code>{api}</code>.</p>;
}
