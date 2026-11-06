import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, BookmarkPlus, ExternalLink, FolderPlus, Merge, Pencil, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileTree, type FileNode } from "@/components/ui/file-tree";
import { Panel } from "@/components/ui/spotlight-card";
import { BookmarkDialog } from "@/components/bookmark-dialog";
import { FolderDialog } from "@/components/folder-dialog";
import { getToken } from "@/lib/auth";
import { api, type Bookmark, type ListItem } from "@/lib/library";
import { MorphingSquare } from "@/components/ui/morphing-square";

const day = (iso: string) => new Date(iso).toISOString().slice(0, 10);

export default function Library() {
  const token = getToken();
  const [folders, setFolders] = useState<ListItem[]>([]);
  const [items, setItems] = useState<Bookmark[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<string | null>(null); // "f:<folder id>" or "b:<bookmark id>"
  const [bookmarkDialog, setBookmarkDialog] = useState<{ bookmark?: Bookmark; listId?: string } | null>(null);
  const [folderDialog, setFolderDialog] = useState<{ folder?: ListItem } | null>(null);

  const load = useCallback(async () => {
    const [a, b] = await Promise.all([
      api<{ items: ListItem[] }>("GET", "/api/library/lists"),
      api<{ items: Bookmark[] }>("GET", "/api/library/bookmarks"),
    ]);
    if (!a.ok) return setError(a.error);
    if (!b.ok) return setError(b.error);
    setError("");
    setFolders(a.data.items);
    setItems(b.data.items);
    setLoaded(true);
  }, []);

  useEffect(() => { if (token) void load(); }, [token, load]);

  const tree = useMemo<FileNode[]>(() => {
    const needle = q.trim().toLowerCase();
    const matches = (b: Bookmark) => !needle || b.title.toLowerCase().includes(needle) || b.note.toLowerCase().includes(needle);
    const toNode = (b: Bookmark): FileNode => ({ id: `b:${b.id}`, name: b.title, type: "file", extension: b.caption ? "caption" : "pin" });
    const out: FileNode[] = [];
    for (const f of folders) {
      const inside = items.filter((b) => b.list_id === f.id && matches(b));
      if (needle && inside.length === 0 && !f.name.toLowerCase().includes(needle)) continue;
      out.push({ id: `f:${f.id}`, name: f.name, type: "folder", badge: String(items.filter((b) => b.list_id === f.id).length), children: inside.map(toNode) });
    }
    for (const b of items) if (!b.list_id && matches(b)) out.push(toNode(b));
    return out;
  }, [folders, items, q]);

  const selFolder = sel?.startsWith("f:") ? folders.find((f) => `f:${f.id}` === sel) : undefined;
  const selBookmark = sel?.startsWith("b:") ? items.find((b) => `b:${b.id}` === sel) : undefined;
  const folderName = (id: string | null) => folders.find((f) => f.id === id)?.name;

  const removeBookmark = async (b: Bookmark) => {
    if (!window.confirm(`Delete the bookmark “${b.title}”?`)) return;
    const r = await api("DELETE", `/api/library/bookmarks/${b.id}`);
    if (!r.ok) return setError(r.error);
    setSel(null);
    void load();
  };
  const mergeDuplicates = async () => {
    const r = await api<{ removed: number; places: number }>("POST", "/api/library/bookmarks/merge-duplicates");
    if (!r.ok) return setError(r.error);
    setNotice(r.data.removed ? `Merged ${r.data.removed} duplicate bookmark${r.data.removed === 1 ? "" : "s"} into ${r.data.places} place${r.data.places === 1 ? "" : "s"}.` : "No duplicate places found. Every place is bookmarked once.");
    void load();
  };
  const removeFolder = async (f: ListItem) => {
    if (!window.confirm(`Delete the folder “${f.name}”? Its bookmarks are kept and moved to Unsorted.`)) return;
    const r = await api("DELETE", `/api/library/lists/${f.id}`);
    if (!r.ok) return setError(r.error);
    setSel(null);
    void load();
  };
  const move = async (b: Bookmark, listId: string) => {
    const r = await api("PATCH", `/api/library/bookmarks/${b.id}`, { list_id: listId || null });
    if (!r.ok) return setError(r.error);
    void load();
  };

  if (!token) {
    return (
      <p className="text-muted-foreground">
        <Link to="/login" className="text-link hover:underline">Log in</Link> or <Link to="/signup" className="text-link hover:underline">sign up</Link> to keep bookmarks.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input aria-label="Search bookmarks" className="rounded-lg border border-input pl-9 focus-visible:ring-2 focus-visible:ring-ring" placeholder="Search bookmarks…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" onClick={() => void mergeDuplicates()} title="One bookmark per place: merge bookmarks that are at the same place"><Merge className="size-4" />Merge duplicates</Button>
          <Button variant="outline" onClick={() => setFolderDialog({})}><FolderPlus className="size-4" />New folder</Button>
          <Button onClick={() => setBookmarkDialog({ listId: selFolder?.id })}><BookmarkPlus className="size-4" />Add bookmark</Button>
        </div>
      </div>
      {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      {notice && <p role="status" className="text-sm text-emerald-700 dark:text-emerald-400">{notice}</p>}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,380px)_1fr]">
        <FileTree
          title="bookmarks"
          data={tree}
          selectedId={sel}
          onSelect={(n) => setSel(n.id ?? null)}
          emptyText={!loaded ? <MorphingSquare className="h-4 w-4" message="Loading…" messagePlacement="right" /> : q ? "Nothing matches your search." : "No bookmarks yet. Press “Add bookmark”, or bookmark a caption or a pin on the map."}
          className="self-start"
        />

        <Panel as="section" aria-live="polite">
          {selBookmark ? (
            <div className="space-y-4">
              {selBookmark.caption?.image_url && <img key={selBookmark.id} src={selBookmark.caption.image_url} alt="Satellite preview (image file missing? open Explore and press Refresh image)" className="max-h-64 w-full rounded-xl object-cover" />}
              <div>
                <h2 className="text-xl font-semibold text-ink">{selBookmark.title}</h2>
                <p className="text-xs text-ink-muted">Saved {day(selBookmark.created_at)}</p>
              </div>
              {selBookmark.note && <p className="whitespace-pre-wrap text-ink-soft">{selBookmark.note}</p>}
              {selBookmark.caption && <p className="rounded-lg border border-line bg-sunk p-3 text-sm text-ink-muted"><span className="mr-1 text-xs uppercase tracking-wide text-link">AI caption</span>{selBookmark.caption.text}</p>}
              <p className="text-sm text-ink-muted">
                {selBookmark.location ? (
                  <>
                    {selBookmark.location.lat.toFixed(4)}, {selBookmark.location.lon.toFixed(4)}{" "}
                    <a className="ml-2 inline-flex items-center gap-1 text-link hover:underline" target="_blank" rel="noopener noreferrer" href={`https://www.openstreetmap.org/?mlat=${selBookmark.location.lat}&mlon=${selBookmark.location.lon}#map=12/${selBookmark.location.lat}/${selBookmark.location.lon}`}>
                      Open map <ExternalLink className="size-3.5" />
                    </a>
                  </>
                ) : "No location"}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-ink-muted">
                  Folder
                  <select value={selBookmark.list_id ?? ""} onChange={(e) => void move(selBookmark, e.target.value)} className="h-9 rounded-lg border border-input bg-background px-2 text-sm text-foreground">
                    <option value="">Unsorted</option>
                    {folders.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
                  </select>
                </label>
                {selBookmark.location && (
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/analysis?lat=${selBookmark.location.lat}&lon=${selBookmark.location.lon}&name=${encodeURIComponent(selBookmark.title)}`}><BarChart3 className="size-4" />Analyse this place</Link>
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => setBookmarkDialog({ bookmark: selBookmark })}><Pencil className="size-4" />Edit</Button>
                <Button variant="outline" size="sm" onClick={() => void removeBookmark(selBookmark)}><Trash2 className="size-4" />Delete</Button>
              </div>
            </div>
          ) : selFolder ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-ink">{selFolder.name}</h2>
                <p className="text-sm text-ink-muted">{items.filter((b) => b.list_id === selFolder.id).length} bookmark(s) in this folder</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="sm" onClick={() => setBookmarkDialog({ listId: selFolder.id })}><BookmarkPlus className="size-4" />Add bookmark here</Button>
                <Button variant="outline" size="sm" onClick={() => setFolderDialog({ folder: selFolder })}><Pencil className="size-4" />Rename</Button>
                <Button variant="outline" size="sm" onClick={() => void removeFolder(selFolder)}><Trash2 className="size-4" />Delete folder</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-ink-muted">
              <h2 className="text-lg font-semibold text-ink">Your bookmarks</h2>
              <p className="text-sm">Pick a folder or a bookmark on the left to see it here. Folders keep related places together, just like in your browser.</p>
              <p className="text-sm">Tip: press “Bookmark” under any caption on the <Link to="/captions" className="text-link hover:underline">Captions</Link> page, or on a pin in the Explore map, and choose which folder to save it in.</p>
            </div>
          )}
        </Panel>
      </div>

      {bookmarkDialog && (
        <BookmarkDialog
          open
          onOpenChange={(o) => !o && setBookmarkDialog(null)}
          bookmark={bookmarkDialog.bookmark}
          defaults={bookmarkDialog.bookmark ? undefined : { title: "", list_id: bookmarkDialog.listId }}
          onSaved={(b) => { void load(); setSel(`b:${b.id}`); }}
        />
      )}
      {folderDialog && (
        <FolderDialog
          open
          onOpenChange={(o) => !o && setFolderDialog(null)}
          folder={folderDialog.folder}
          onSaved={(f) => { void load(); setSel(`f:${f.id}`); }}
        />
      )}
    </div>
  );
}
