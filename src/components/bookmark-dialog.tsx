"use client";

import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api, type Bookmark, type ListItem } from "@/lib/library";
import { BusyLabel } from "@/components/ui/busy-label";

export type BookmarkDefaults = {
  title: string;
  note?: string;
  lat?: number | null;
  lon?: number | null;
  caption_id?: string;
  list_id?: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Pass a bookmark to edit it; leave out to add a new one. */
  bookmark?: Bookmark;
  defaults?: BookmarkDefaults;
  onSaved?: (b: Bookmark) => void;
};

const field = "rounded-lg border border-input focus-visible:ring-2 focus-visible:ring-ring";
const NEW_FOLDER = "__new__";

/**
 * Add or edit a bookmark. Like a browser's bookmark box, it asks where to save it.
 * There is one bookmark per place: if this place is already bookmarked, the existing one opens for editing
 * (and gets this caption, if it had none) instead of making a second one.
 */
export function BookmarkDialog({ open, onOpenChange, bookmark, defaults, onSaved }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <BookmarkForm bookmark={bookmark} defaults={defaults} onClose={() => onOpenChange(false)} onSaved={onSaved} />
      </DialogContent>
    </Dialog>
  );
}

const coord = (n: number | null | undefined) => (n == null ? "" : String(n));

function BookmarkForm({ bookmark, defaults, onClose, onSaved }: { bookmark?: Bookmark; defaults?: BookmarkDefaults; onClose: () => void; onSaved?: (b: Bookmark) => void }) {
  const id = useId();
  // The bookmark being edited. For "Add", it becomes the existing bookmark if this place is already saved.
  const [target, setTarget] = useState<Bookmark | undefined>(bookmark);
  const [notice, setNotice] = useState("");
  const [folders, setFolders] = useState<ListItem[]>([]);
  const [foldersLoaded, setFoldersLoaded] = useState(false);
  const [title, setTitle] = useState(bookmark?.title ?? defaults?.title ?? "");
  const [note, setNote] = useState(bookmark?.note ?? defaults?.note ?? "");
  const [lat, setLat] = useState(bookmark?.location ? String(bookmark.location.lat) : coord(defaults?.lat));
  const [lon, setLon] = useState(bookmark?.location ? String(bookmark.location.lon) : coord(defaults?.lon));
  const [folder, setFolder] = useState(bookmark?.list_id ?? defaults?.list_id ?? "");
  const [newFolder, setNewFolder] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const editing = Boolean(target);
  const caption = target?.caption ?? null;
  const addingCaption = Boolean(defaults?.caption_id && target && !target.caption);
  const hasCaption = Boolean(caption || defaults?.caption_id);

  // Switch to the bookmark that is already at this place.
  const adopt = (b: Bookmark) => {
    setTarget(b);
    setTitle(b.title);
    setNote([b.note, defaults?.note && !b.note.includes(defaults.note) ? defaults.note : ""].filter(Boolean).join("\n\n"));
    setLat(b.location ? String(b.location.lat) : "");
    setLon(b.location ? String(b.location.lon) : "");
    setFolder(defaults?.list_id || b.list_id || "");
    const parts = [`You already bookmarked this place as “${b.title}”, so you are editing that bookmark instead of making a second one.`];
    if (defaults?.caption_id) parts.push(b.caption ? "It already has a caption, which is kept." : "This caption will be added to it.");
    setNotice(parts.join(" "));
  };

  useEffect(() => {
    let live = true;
    void api<{ items: ListItem[] }>("GET", "/api/library/lists").then((r) => {
      if (!live) return;
      if (r.ok) setFolders(r.data.items);
      else setError(r.error);
      setFoldersLoaded(true);
    });
    // Adding a bookmark at a known place: is it already saved?
    if (!bookmark && defaults?.lat != null && defaults?.lon != null) {
      void api<{ bookmark: Bookmark | null }>("GET", `/api/library/bookmarks/nearby?lat=${defaults.lat}&lon=${defaults.lon}`).then((r) => {
        if (live && r.ok && r.data.bookmark) adopt(r.data.bookmark);
      });
    }
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) return setError("Please give the bookmark a name.");
    let latN: number | null = null;
    let lonN: number | null = null;
    if (lat.trim() || lon.trim()) {
      latN = Number(lat);
      lonN = Number(lon);
      if (!lat.trim() || !lon.trim() || Number.isNaN(latN) || Number.isNaN(lonN)) return setError("Enter both latitude and longitude as numbers, or leave both empty.");
      if (latN < -90 || latN > 90) return setError("Latitude must be between -90 and 90.");
      if (lonN < -180 || lonN > 180) return setError("Longitude must be between -180 and 180.");
    }
    if (folder === NEW_FOLDER && !newFolder.trim()) return setError("Type a name for the new folder.");

    setBusy(true);
    let listId: string | null = folder && folder !== NEW_FOLDER ? folder : null;
    if (folder === NEW_FOLDER) {
      const f = await api<{ list: ListItem }>("POST", "/api/library/lists", { name: newFolder.trim() });
      if (!f.ok) { setBusy(false); return setError(f.status === 409 ? "You already have a folder with that name. Pick it from the list instead." : f.error); }
      listId = f.data.list.id;
    }

    const r = target
      ? await api<{ bookmark: Bookmark }>("PATCH", `/api/library/bookmarks/${target.id}`, {
          title: title.trim(), note, lat: latN, lon: lonN, list_id: listId,
          ...(addingCaption ? { caption_id: defaults!.caption_id } : {}),
        })
      : await api<{ bookmark: Bookmark }>("POST", "/api/library/bookmarks", {
          title: title.trim(), note, list_id: listId,
          ...(latN != null ? { lat: latN, lon: lonN } : {}),
          ...(defaults?.caption_id ? { caption_id: defaults.caption_id } : {}),
        });
    setBusy(false);
    if (!r.ok) {
      // Someone (or another tab) saved this place meanwhile, or the typed coordinates are an existing place.
      if (r.status === 409 && r.body?.bookmark) { adopt(r.body.bookmark as Bookmark); return; }
      return setError(r.error);
    }
    onSaved?.(r.data.bookmark);
    onClose();
  };

  return (
    <form onSubmit={(e) => void submit(e)} className="grid gap-4">
      <DialogHeader>
        <DialogTitle>{editing ? "Edit bookmark" : "Add bookmark"}</DialogTitle>
        <DialogDescription>{editing ? "Change the details or move it to another folder." : "Choose where to save it."}</DialogDescription>
      </DialogHeader>

      {notice && <p role="status" className="rounded-lg border border-link/30 bg-link/10 p-3 text-xs text-link">{notice}</p>}

      <div className="space-y-2">
        <Label htmlFor={`${id}-title`}>Name</Label>
        <Input id={`${id}-title`} className={field} value={title} maxLength={120} autoFocus onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${id}-folder`}>Folder</Label>
        <select
          id={`${id}-folder`}
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          className={`${field} h-10 w-full bg-background px-3 text-sm`}
          disabled={!foldersLoaded}
        >
          <option value="">Unsorted (no folder)</option>
          {folders.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
          <option value={NEW_FOLDER}>＋ New folder…</option>
        </select>
        {folder === NEW_FOLDER && (
          <Input aria-label="New folder name" className={field} placeholder="New folder name" value={newFolder} maxLength={60} autoFocus onChange={(e) => setNewFolder(e.target.value)} />
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor={`${id}-lat`}>Latitude</Label>
          <Input id={`${id}-lat`} className={field} inputMode="decimal" placeholder="28.6129" value={lat} onChange={(e) => setLat(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-lon`}>Longitude</Label>
          <Input id={`${id}-lon`} className={field} inputMode="decimal" placeholder="77.2295" value={lon} onChange={(e) => setLon(e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${id}-note`}>Note</Label>
        <Textarea id={`${id}-note`} value={note} maxLength={2000} placeholder="Optional" onChange={(e) => setNote(e.target.value)} />
      </div>

      {hasCaption && <p className="text-xs text-muted-foreground">{caption ? "This place keeps its satellite preview and AI caption." : "Saved together with its satellite preview and AI caption."}</p>}
      {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <DialogFooter>
        <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
        <Button type="submit" disabled={busy}><BusyLabel busy={busy} busyText="Saving…">{editing ? "Save changes" : "Save"}</BusyLabel></Button>
      </DialogFooter>
    </form>
  );
}
