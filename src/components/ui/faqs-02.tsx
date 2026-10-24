import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Github, Users } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// ✏️ Put each developer's GitHub username in `github`. Name and role are labels you control.
const TEAM = [
  { github: "allenasat044-prog", name: "Shashank Patel", role: "Linux System Administrator" },
  { github: "github-id-2", name: "Pankaj Pandurang", role: "Developer" },
  { github: "github-id-3", name: "Anmol Poddar", role: "Developer" },
  { github: "github-id-4", name: "Shikhar Srivastava", role: "Developer" },
];

const faqs = [
  {
    q: "What is Orbit EO?",
    a: "Orbit EO is a web app for exploring satellite imagery on a 3D globe. Drop a pin, find real Sentinel scenes covering that spot, preview them and have an AI model describe what it sees.",
  },
  {
    q: "Where does the imagery come from?",
    a: "Scenes come from the Copernicus Data Space Ecosystem (Sentinel satellites). Orbit EO lists only scenes whose footprint actually contains your pin, newest first, with cloud-cover filtering.",
  },
  {
    q: "How do I find imagery for a place?",
    a: "On the Explore page, search a place name, type coordinates such as 28.6129,77.2295, or click the globe. A red pin marks the spot and matching scenes are listed below.",
  },
  {
    q: "How big is the preview image?",
    a: "Pressing Preview cuts a north-up true-colour image centred exactly on your pin, 1.3, 2.6 or 5.1 km wide, and lays it on the globe at that spot.",
  },
  {
    q: "How do the AI captions work?",
    a: "Describe this image asks a vision-language model for a short, cautious caption. Every caption is labelled AI-generated and stored with the model, prompt and timing.",
  },
  {
    q: "Can I compare caption models?",
    a: "Yes. Compare models runs every available caption model on the same preview and shows scene tags and an image-to-caption match score next to each. Models that can't run on your machine are listed with the reason.",
  },
  {
    q: "Can I monitor a location over time?",
    a: "Save a pin as a monitored location, then run an update. Orbit EO looks for new scenes since the last check, and the Dashboard shows the history of runs.",
  },
  {
    q: "Do I need an account?",
    a: "Sign up with email and password to save captions and monitored locations. Saved captions live on the Captions page, where you can also delete them.",
  },
];

type GhProfile = { bio: string | null; public_repos: number; followers: number; avatar_url: string; html_url: string };

const serif = { fontFamily: '"Instrument Serif", Georgia, "Times New Roman", serif', fontWeight: 400 } as const;

function TeamCard({ member }: { member: (typeof TEAM)[number] }) {
  const [gh, setGh] = useState<GhProfile | null>(null);

  useEffect(() => {
    let live = true;
    setGh(null);
    fetch(`https://api.github.com/users/${member.github}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => live && d && setGh(d))
      .catch(() => {});
    return () => { live = false; };
  }, [member.github]);

  return (
    <div
      key={member.github}
      className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300 mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:flex-row sm:items-center"
    >
      <Avatar className="size-[88px] shrink-0 border border-white/10">
        <AvatarImage src={gh?.avatar_url ?? `https://github.com/${member.github}.png?size=200`} alt={member.name} />
        <AvatarFallback className="text-2xl">{member.name.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-col gap-1.5">
        <h3 className="text-2xl font-medium text-foreground">{member.name}</h3>
        <p className="text-sm text-muted-foreground">
          {member.role} · @{member.github}
        </p>
        {gh?.bio && <p className="mt-2 text-[15px] text-foreground">{gh.bio}</p>}
        {gh && (
          <p className="mt-1 flex gap-5 text-xs text-muted-foreground">
            <span>{gh.public_repos} repos</span>
            <span>{gh.followers} followers</span>
          </p>
        )}
        <a
          href={`https://github.com/${member.github}`}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
        >
          <Github className="size-4" />
          Open GitHub
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </div>
  );
}

export default function Faqs02() {
  const [active, setActive] = useState(0);

  return (
    <>
      <section id="faqs" className="mx-auto max-w-6xl px-6 pb-10 pt-10 sm:px-10 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.45fr] lg:items-start">
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs text-muted-foreground">
              FAQ
            </span>
            <h1
              className="text-balance text-foreground"
              style={{ ...serif, fontSize: "clamp(2.6rem, 5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              Frequently asked questions
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              Everything about how Orbit EO finds satellite imagery, describes it and keeps watch over the places you care about.
            </p>

            <div className="mt-2 flex max-w-md flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-3.5 px-1 pt-1">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-foreground">
                  <Users className="size-5" />
                </span>
                <div className="flex flex-col leading-snug">
                  <p className="font-medium text-foreground">Still have questions?</p>
                  <p className="text-sm text-muted-foreground">Reach the people who built it.</p>
                </div>
              </div>
              <a
                href="#team"
                className="grid h-11 place-items-center rounded-xl bg-white/[0.07] text-sm font-medium text-foreground transition-colors hover:bg-white/[0.12]"
              >
                Meet the team on GitHub
              </a>
            </div>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] px-7"
          >
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-white/10 last:border-b-0">
                <AccordionTrigger className="py-5 text-[17px] font-normal text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-[15px] leading-7">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="team" className="mx-auto max-w-6xl px-6 pb-24 pt-20 text-center sm:px-10">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs text-muted-foreground">
          Our group
        </span>
        <h2
          className="mb-10 mt-5 text-foreground"
          style={{ ...serif, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
        >
          Find us on GitHub
        </h2>

        <div className="mx-auto mb-6 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-2xl border border-white/10 bg-white/[0.02] p-1.5">
          {TEAM.map((m, i) => (
            <button
              key={m.github}
              onClick={() => setActive(i)}
              className={cn(
                "max-w-[11rem] truncate rounded-xl px-5 py-2.5 text-sm transition-colors",
                i === active ? "bg-white text-black" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m.name}
            </button>
          ))}
        </div>

        <div className="text-left">
          <TeamCard member={TEAM[active]} />
        </div>
      </section>
    </>
  );
}
