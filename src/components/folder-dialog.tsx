"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api, type ListItem } from "@/lib/library";
import { BusyLabel } from "@/components/ui/busy-label";

type Props = { open: boolean; onOpenChange: (o: boolean) => void; folder?: ListItem; onSaved: (f: ListItem) => void };

export function FolderDialog({ open, onOpenChange, folder, onSaved }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <FolderForm folder={folder} onClose={() => onOpenChange(false)} onSaved={onSaved} />
      </DialogContent>
    </Dialog>
  );
}

function FolderForm({ folder, onClose, onSaved }: { folder?: ListItem; onClose: () => void; onSaved: (f: ListItem) => void }) {
  const [name, setName] = useState(folder?.name ?? "");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Please give the folder a name.");
    setBusy(true);
    setError("");
    const r = folder
      ? await api<{ list: ListItem }>("PATCH", `/api/library/lists/${folder.id}`, { name: name.trim() })
      : await api<{ list: ListItem }>("POST", "/api/library/lists", { name: name.trim() });
    setBusy(false);
    if (!r.ok) return setError(r.status === 409 ? "You already have a folder with that name." : r.error);
    onSaved(r.data.list);
    onClose();
  };

  return (
    <form onSubmit={(e) => void submit(e)} className="grid gap-4">
      <DialogHeader>
        <DialogTitle>{folder ? "Rename folder" : "New folder"}</DialogTitle>
        <DialogDescription>{folder ? "Choose a new name for this folder." : "Folders keep related bookmarks together."}</DialogDescription>
      </DialogHeader>
      <div className="space-y-2">
        <Label htmlFor="folder-name">Folder name</Label>
        <Input id="folder-name" autoFocus className="rounded-lg border border-input focus-visible:ring-2 focus-visible:ring-ring" value={name} maxLength={60} placeholder="e.g. Flood zones" onChange={(e) => setName(e.target.value)} />
      </div>
      {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      <DialogFooter>
        <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
        <Button type="submit" disabled={busy}><BusyLabel busy={busy} busyText="Saving…">{folder ? "Rename" : "Create folder"}</BusyLabel></Button>
      </DialogFooter>
    </form>
  );
}
