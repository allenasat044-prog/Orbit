"use client";

import { useId, useState } from "react";
import { Check, ImagePlus, X } from "lucide-react";
import { useCharacterLimit } from "@/components/ui/dialog-utils/use-character-limit";
import { useImageUpload } from "@/components/ui/dialog-utils/use-image-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api, type Profile } from "@/lib/library";
import { fullName, ProfileAvatar } from "@/components/profile-avatar";
import { BusyLabel } from "@/components/ui/busy-label";

const field = "rounded-lg border border-input shadow-sm shadow-black/5 focus-visible:ring-2 focus-visible:ring-ring";
const USERNAME = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])$/;
const roundBtn =
  "z-50 flex cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70";

type Props = { profile: Profile; open: boolean; onOpenChange: (open: boolean) => void; onSaved: (p: Profile) => void };

export function EditProfileDialog({ profile, open, onOpenChange, onSaved }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <ProfileForm profile={profile} onClose={() => onOpenChange(false)} onSaved={onSaved} />
      </DialogContent>
    </Dialog>
  );
}

// Mounted only while the dialog is open, so every opening starts from the saved profile.
function ProfileForm({ profile, onClose, onSaved }: { profile: Profile; onClose: () => void; onSaved: (p: Profile) => void }) {
  const id = useId();
  const formId = `${id}-profile-form`;
  const [first, setFirst] = useState(profile.first_name ?? "");
  const [last, setLast] = useState(profile.last_name ?? "");
  const [username, setUsername] = useState(profile.username);
  const [website, setWebsite] = useState((profile.website ?? "").replace(/^https?:\/\//i, ""));
  const [location, setLocation] = useState(profile.location ?? "");
  const [avatar, setAvatar] = useState<string | null>(profile.avatar_image);
  const [cover, setCover] = useState<string | null>(profile.cover_image);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const maxLength = 300;
  const { value: bio, characterCount, handleChange, maxLength: limit } = useCharacterLimit({ maxLength, initialValue: profile.bio ?? "" });

  const usernameOk = USERNAME.test(username);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!first.trim()) return setError("Please enter your first name.");
    if (!usernameOk) return setError("Username: 3-30 letters, numbers or hyphens, not starting or ending with a hyphen.");
    setBusy(true);
    const site = website.trim().replace(/^https?:\/\//i, "");
    const r = await api<{ profile: Profile }>("PUT", "/api/library/profile", {
      first_name: first.trim(),
      last_name: last.trim(),
      username,
      website: site ? `https://${site}` : "",
      location: location.trim(),
      bio: bio.trim(),
      avatar_image: avatar,
      cover_image: cover,
    });
    setBusy(false);
    if (!r.ok) return setError(r.error);
    onSaved(r.data.profile);
    onClose();
  };

  return (
    <>
      <DialogHeader className="contents space-y-0 text-left">
        <DialogTitle className="border-b border-border px-6 py-4 text-base">Edit profile</DialogTitle>
      </DialogHeader>
      <DialogDescription className="sr-only">Change your photo, name, username, website, location and biography.</DialogDescription>
      <div className="overflow-y-auto">
        <ProfileBg image={cover} onChange={setCover} />
        <AvatarPicker image={avatar} name={fullName({ first_name: first, last_name: last, username })} onChange={setAvatar} />
        <div className="px-6 pb-6 pt-4">
          <form id={formId} onSubmit={(e) => void submit(e)} className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`${id}-first-name`}>First name</Label>
                <Input id={`${id}-first-name`} className={field} placeholder="First name" value={first} maxLength={50} onChange={(e) => setFirst(e.target.value)} type="text" required />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor={`${id}-last-name`}>Last name</Label>
                <Input id={`${id}-last-name`} className={field} placeholder="Last name" value={last} maxLength={50} onChange={(e) => setLast(e.target.value)} type="text" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-username`}>Username</Label>
              <div className="relative">
                <Input id={`${id}-username`} className={`${field} peer pe-9`} placeholder="Username" value={username} maxLength={30} onChange={(e) => setUsername(e.target.value.toLowerCase())} type="text" required aria-invalid={!usernameOk} />
                <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  {usernameOk ? <Check size={16} strokeWidth={2} className="text-emerald-500" aria-label="Username looks good" /> : <X size={16} strokeWidth={2} className="text-red-600 dark:text-red-400" aria-label="Username not valid yet" />}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">3-30 letters, numbers or hyphens.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input id={`${id}-email`} className={field} value={profile.email} disabled readOnly type="email" />
              <p className="text-xs text-muted-foreground">This is your sign-in email. It can't be changed here.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-location`}>Location</Label>
              <Input id={`${id}-location`} className={field} placeholder="City, Country" value={location} maxLength={80} onChange={(e) => setLocation(e.target.value)} type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-website`}>Website</Label>
              <div className="flex rounded-lg shadow-sm shadow-black/5">
                <span className="-z-10 inline-flex items-center rounded-s-lg border border-input bg-background px-3 text-sm text-muted-foreground">https://</span>
                <Input id={`${id}-website`} className={`${field} -ms-px rounded-s-none shadow-none`} placeholder="yourwebsite.com" value={website} maxLength={190} onChange={(e) => setWebsite(e.target.value)} type="text" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-bio`}>Biography</Label>
              <Textarea id={`${id}-bio`} placeholder="Write a few sentences about yourself" value={bio} maxLength={maxLength} onChange={handleChange} aria-describedby={`${id}-description`} />
              <p id={`${id}-description`} className="mt-2 text-right text-xs text-muted-foreground" role="status" aria-live="polite">
                <span className="tabular-nums">{limit - characterCount}</span> characters left
              </p>
            </div>
            {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          </form>
        </div>
      </div>
      <DialogFooter className="border-t border-border px-6 py-4">
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" form={formId} disabled={busy}><BusyLabel busy={busy} busyText="Saving…">Save changes</BusyLabel></Button>
      </DialogFooter>
    </>
  );
}

function ProfileBg({ image, onChange }: { image: string | null; onChange: (v: string | null) => void }) {
  const { fileInputRef, handleThumbnailClick, handleFileChange, error } = useImageUpload({ width: 1200, height: 300, quality: 0.8, onImage: onChange });
  return (
    <div className="h-32">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-r from-[#1c2a4a] via-[#243a6b] to-[#4773ec]/50">
        {image && <img className="h-full w-full object-cover" src={image} alt="Cover preview" width={512} height={128} />}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <button type="button" className={`${roundBtn} size-10`} onClick={handleThumbnailClick} aria-label={image ? "Change cover image" : "Upload cover image"}>
            <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
          </button>
          {image && (
            <button type="button" className={`${roundBtn} size-10`} onClick={() => onChange(null)} aria-label="Remove cover image">
              <X size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>
        {error && <p role="alert" className="absolute bottom-1 left-2 rounded bg-black/70 px-2 py-0.5 text-xs text-red-700 dark:text-red-300">{error}</p>}
      </div>
      <input type="file" ref={fileInputRef} onChange={(e) => void handleFileChange(e)} className="hidden" accept="image/*" aria-label="Upload cover image file" />
    </div>
  );
}

function AvatarPicker({ image, name, onChange }: { image: string | null; name: string; onChange: (v: string | null) => void }) {
  const { fileInputRef, handleThumbnailClick, handleFileChange, error } = useImageUpload({ width: 256, height: 256, quality: 0.85, onImage: onChange });
  return (
    <div className="-mt-10 flex items-end gap-3 px-6">
      <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10">
        <ProfileAvatar name={name} image={image} size={72} />
        <button type="button" className={`${roundBtn} absolute size-8`} onClick={handleThumbnailClick} aria-label="Change profile picture">
          <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
        </button>
        <input type="file" ref={fileInputRef} onChange={(e) => void handleFileChange(e)} className="hidden" accept="image/*" aria-label="Upload profile picture" />
      </div>
      {image && <button type="button" onClick={() => onChange(null)} className="pb-1 text-xs text-muted-foreground hover:text-foreground">Remove photo</button>}
      {error && <p role="alert" className="pb-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
