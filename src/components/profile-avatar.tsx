const palette = ["#8daaff", "#7ee0c3", "#f5b86b", "#f08fb0", "#b79cff", "#6fd0f0"];
const colorFor = (s: string) => palette[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length];

export const fullName = (p: { first_name?: string | null; last_name?: string | null; username: string }) =>
  [p.first_name, p.last_name].filter(Boolean).join(" ") || p.username;

/** Round profile picture, or coloured initials when there is no picture yet. */
export function ProfileAvatar({ name, image, size = 80, className = "" }: { name: string; image?: string | null; size?: number; className?: string }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "?";
  return image ? (
    <img src={image} alt={`${name}'s profile picture`} width={size} height={size} className={`shrink-0 rounded-full object-cover ${className}`} style={{ width: size, height: size }} />
  ) : (
    <div className={`grid shrink-0 place-items-center rounded-full font-semibold text-[#0d1526] ${className}`} style={{ width: size, height: size, background: colorFor(name), fontSize: size / 2.6 }} aria-label={name}>
      {initials}
    </div>
  );
}
