import { useState } from "react";
import { Link2, MapPin, Link as LinkIcon } from "lucide-react";
import { Markdown } from "@/lib/markdown";
import type { Profile } from "@/lib/library";

const palette = ["#8daaff", "#7ee0c3", "#f5b86b", "#f08fb0", "#b79cff", "#6fd0f0"];
const colorFor = (s: string) => palette[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length];

export function Avatar({ name, size = 96 }: { name: string; size?: number }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "?";
  const c = colorFor(name);
  return (
    <div className="grid shrink-0 place-items-center rounded-full font-semibold text-[#0d1526]" style={{ width: size, height: size, background: c, fontSize: size / 2.6 }} aria-hidden>
      {initials}
    </div>
  );
}

export const profileUrl = (username: string) => `${window.location.origin}/u/${username}`;

export function ProfileHeader({ profile, actions }: { profile: Profile; actions?: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const name = profile.display_name || profile.username;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl(profile.username));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard blocked: ignore */ }
  };
  const site = profile.website && /^https?:\/\//i.test(profile.website) ? profile.website : "";
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
      <Avatar name={name} />
      <div className="min-w-0 flex-1 space-y-2">
        <div>
          <h2 className="text-2xl font-semibold text-white">{name}</h2>
          <p className="text-[#b0bed9]">@{profile.username}</p>
        </div>
        {profile.headline && <p className="text-[#dbe4f7]">{profile.headline}</p>}
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#b0bed9]">
          {profile.location && <span className="flex items-center gap-1.5"><MapPin className="size-4" />{profile.location}</span>}
          {site && <a href={site} target="_blank" rel="noopener noreferrer nofollow" className="flex items-center gap-1.5 text-[#8daaff] hover:underline"><LinkIcon className="size-4" />{site.replace(/^https?:\/\//i, "")}</a>}
          {profile.joined_at && <span>Joined {new Date(profile.joined_at).toISOString().slice(0, 10)}</span>}
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1 text-sm">
          {profile.is_public && (
            <button type="button" onClick={() => void copy()} className="flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1 text-[#8daaff] hover:bg-white/5">
              <Link2 className="size-4" />{copied ? "Copied!" : `Copy profile link`}
            </button>
          )}
          {actions}
        </div>
      </div>
    </div>
  );
}

export function ReadmeCard({ profile, onEdit }: { profile: Profile; onEdit?: () => void }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm">
        <span className="font-mono text-[#b0bed9]">{profile.username} / README.md</span>
        {onEdit && <button type="button" onClick={onEdit} className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-[#8daaff] hover:bg-white/5">Edit README</button>}
      </div>
      <div className="p-6">
        {profile.readme.trim() ? <Markdown source={profile.readme} /> : <p className="text-[#b0bed9]">{onEdit ? "Your README is empty. Press “Edit README” to write one — you can start from a template." : "This profile has no README yet."}</p>}
      </div>
    </section>
  );
}
