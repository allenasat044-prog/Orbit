import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Link as LinkIcon, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/spotlight-card";
import { getToken } from "@/lib/auth";
import { notifyProfileChanged } from "@/lib/use-auth";
import { api, type Profile as ProfileData, type Records } from "@/lib/library";
import { EditProfileDialog } from "@/components/edit-profile-dialog";
import { fullName, ProfileAvatar } from "@/components/profile-avatar";
import { MorphingSquare } from "@/components/ui/morphing-square";

const STATS: [keyof Records["counts"], string][] = [
  ["bookmarks", "Bookmarks"], ["lists", "Folders"], ["captions", "AI captions"], ["monitored_locations", "Monitored locations"],
];

export default function Profile() {
  const token = getToken();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [counts, setCounts] = useState<Records["counts"] | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!token) return;
    void api<{ profile: ProfileData }>("GET", "/api/library/profile").then((r) => (r.ok ? setProfile(r.data.profile) : setError(r.error)));
    void api<Records>("GET", "/api/library/records").then((r) => { if (r.ok) setCounts(r.data.counts); });
  }, [token]);

  if (!token) {
    return (
      <p className="text-muted-foreground">
        <Link to="/login" className="text-link hover:underline">Log in</Link> or <Link to="/signup" className="text-link hover:underline">sign up</Link> to see your profile.
      </p>
    );
  }
  if (error) return <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>;
  if (!profile) return <div className="grid min-h-[30vh] place-items-center"><MorphingSquare message="Loading your profile…" /></div>;

  const name = fullName(profile);
  const site = profile.website && /^https?:\/\//i.test(profile.website) ? profile.website : "";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Panel as="section" className="p-0">
        <div className="h-36 overflow-hidden rounded-t-[14px] bg-gradient-to-r from-[#1c2a4a] via-[#243a6b] to-[#4773ec]/50 sm:h-44">
          {profile.cover_image && <img src={profile.cover_image} alt="Cover" className="h-full w-full object-cover" />}
        </div>
        <div className="px-6 pb-6">
          <div className="-mt-12 flex items-end justify-between gap-4">
            <ProfileAvatar name={name} image={profile.avatar_image} size={96} className="border-4 border-background" />
            <Button variant="outline" onClick={() => setEditing(true)}>Edit profile</Button>
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-ink">{name}</h2>
          <p className="text-ink-muted">@{profile.username}</p>
          {profile.bio ? (
            <p className="mt-4 whitespace-pre-wrap text-ink-soft">{profile.bio}</p>
          ) : (
            <p className="mt-4 text-sm text-ink-muted">No biography yet. Press “Edit profile” to add one.</p>
          )}
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            <li className="flex items-center gap-1.5"><Mail className="size-4" />{profile.email}</li>
            {profile.location && <li className="flex items-center gap-1.5"><MapPin className="size-4" />{profile.location}</li>}
            {site && <li><a href={site} target="_blank" rel="noopener noreferrer nofollow" className="flex items-center gap-1.5 text-link hover:underline"><LinkIcon className="size-4" />{site.replace(/^https?:\/\//i, "")}</a></li>}
            <li className="flex items-center gap-1.5"><CalendarDays className="size-4" />Joined {new Date(profile.joined_at).toISOString().slice(0, 10)}</li>
          </ul>
        </div>
      </Panel>

      <section aria-label="Your activity" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map(([k, label]) => (
          <Panel key={k} className="p-4">
            <p className="text-3xl font-semibold text-ink">{counts ? counts[k] : "–"}</p>
            <p className="text-sm text-ink-muted">{label}</p>
          </Panel>
        ))}
      </section>

      <p className="text-sm text-ink-muted">Your saved places live in <Link to="/library" className="text-link hover:underline">Library → Bookmarks</Link>.</p>

      <EditProfileDialog profile={profile} open={editing} onOpenChange={setEditing} onSaved={(p) => { setProfile(p); notifyProfileChanged(); }} />
    </div>
  );
}
