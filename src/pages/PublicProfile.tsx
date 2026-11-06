import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, type Profile } from "@/lib/library";
import { ProfileHeader, ReadmeCard } from "@/components/profile-view";

export default function PublicProfile() {
  const { username = "" } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    setProfile(null);
    setError("");
    void api<{ profile: Profile }>("GET", `/api/profiles/${encodeURIComponent(username)}`, undefined, false).then((r) => {
      if (!live) return;
      if (r.ok) setProfile(r.data.profile);
      else setError(r.status === 404 ? "This profile doesn't exist or is private." : r.error);
    });
    return () => { live = false; };
  }, [username]);

  if (error) return <p className="text-[#b0bed9]">{error} <Link to="/" className="text-[#8daaff] hover:underline">Back home</Link></p>;
  if (!profile) return <p className="text-[#b0bed9]">Loading…</p>;
  return (
    <div className="space-y-6">
      <ProfileHeader profile={profile} />
      <ReadmeCard profile={profile} />
    </div>
  );
}
