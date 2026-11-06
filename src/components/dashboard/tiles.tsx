"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { Bookmark, MapPin, RefreshCw, Sparkles } from "lucide-react";
import { EASE, Pills, Tile, cx, smooth, useCountUp, useMounted } from "@/components/ui/bento";
import { useTheme } from "@/lib/theme";
import { MorphingSquare } from "@/components/ui/morphing-square";
import type { DayOutlook } from "@/lib/cloud-outlook";
import type { Records } from "@/lib/library";
import {
  axisLabels, coord, cumulative, dailySeries, freshness, inWindow, pctChange, relativeTime, successRate, sum, type Run,
} from "@/components/dashboard/data";
import type { Personal, Region, Status, System } from "@/components/dashboard/use-dashboard";

type Colors = { accent: string; accent2: string };
const INK = "oklch(0.22 0.06 265)";
const num = (v: number) => Math.round(v).toLocaleString("en-US");
const shortDate = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

const Loading = ({ text = "Loading…" }: { text?: string }) => (
  <div className="grid flex-1 place-items-center py-6 text-sm text-muted-foreground">
    <MorphingSquare className="size-6" message={text} />
  </div>
);

function Message({ children, to, link }: { children: React.ReactNode; to?: string; link?: string }) {
  return (
    <div className="flex flex-1 flex-col items-start justify-center gap-2 text-sm text-muted-foreground">
      <p>{children}</p>
      {to && <Link to={to} className="font-medium text-foreground underline underline-offset-4 hover:opacity-80">{link}</Link>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero: welcome, new scenes this month, daily strip                  */
/* ------------------------------------------------------------------ */

export function HeroTile({ name, runs, accent, accent2, reduced }: Colors & { name: string; runs: Run[]; reduced: boolean }) {
  const mounted = useMounted();
  const series = dailySeries(runs, 30);
  const total = series.reduce((a, d) => a + d.scenes, 0);
  const change = pctChange(total, sum(inWindow(runs, 60, 30), "new_acquisitions"));
  const shown = useCountUp(total, !reduced);
  const max = Math.max(...series.map((d) => d.scenes), 0);
  const [hover, setHover] = React.useState<number | null>(null);

  return (
    <Tile className="sm:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-start-1" label="Overview">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[34px]">
            Welcome back, <span style={{ color: accent }}>{name}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Here’s what your satellites found this month.</p>
        </div>
        <div className="text-right">
          <p className="text-[12px] text-muted-foreground">New scenes found</p>
          <p className="font-mono text-[34px] font-semibold leading-none tracking-[-0.04em] tabular-nums sm:text-[40px]">{num(shown)}</p>
          <p className="mt-1.5 font-mono text-[12px] tabular-nums">
            <span style={{ color: change === null || change >= 0 ? accent : accent2 }}>
              {change === null ? "new this period" : `${change >= 0 ? "+" : "−"}${Math.abs(change).toFixed(0)}% vs prior 30d`}
            </span>
            <span className="text-muted-foreground"> · 30d</span>
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <div className="flex flex-1 items-end gap-[3px]" style={{ minHeight: 64 }} onPointerLeave={() => setHover(null)}>
          {series.map((d, i) => {
            const h = max === 0 ? 10 : 12 + (d.scenes / max) * 88;
            return (
              <button
                key={d.date}
                type="button"
                onPointerEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                aria-label={`${shortDate(d.date)}: ${d.scenes} new scene${d.scenes === 1 ? "" : "s"}`}
                className="relative flex-1 rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{
                  height: mounted ? `${h}%` : "6%",
                  background: d.scenes > 0 ? accent : "var(--color-muted-foreground)",
                  opacity: hover === null ? (d.scenes > 0 ? 0.45 + (d.scenes / max) * 0.55 : 0.18) : hover === i ? 1 : 0.2,
                  transition: `height 900ms ${EASE} ${i * 18}ms, opacity 200ms ease`,
                }}
              />
            );
          })}
        </div>
        <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
          <span>{shortDate(series[0].date)}</span>
          <span className="text-foreground" aria-live="polite">
            {hover !== null ? `${shortDate(series[hover].date)} · ${series[hover].scenes} new scene${series[hover].scenes === 1 ? "" : "s"}` : "Daily new scenes"}
          </span>
          <span>Today</span>
        </div>
      </div>
    </Tile>
  );
}

/* ------------------------------------------------------------------ */
/*  Locations: fanned stack of monitored places                        */
/* ------------------------------------------------------------------ */

const FACES = [
  { color: "oklch(0.72 0.14 265)", color2: "oklch(0.52 0.18 275)", ink: "oklch(0.98 0.01 265)" },
  { color: "oklch(0.82 0.11 195)", color2: "oklch(0.62 0.13 215)", ink: "oklch(0.2 0.05 225)" },
  { color: "oklch(0.84 0.11 80)", color2: "oklch(0.7 0.15 50)", ink: "oklch(0.25 0.05 50)" },
  { color: "oklch(0.8 0.1 320)", color2: "oklch(0.62 0.16 300)", ink: "oklch(0.2 0.06 300)" },
  { color: "oklch(0.84 0.13 150)", color2: "oklch(0.68 0.14 165)", ink: "oklch(0.22 0.06 150)" },
];

function Globe() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </svg>
  );
}

function Face({ r, i, glare }: { r: Region; i: number; glare: number }) {
  const f = FACES[i % FACES.length];
  return (
    <>
      <span
        aria-hidden
        className="absolute inset-0 overflow-hidden rounded-[12px]"
        style={{
          backgroundImage: [
            "linear-gradient(180deg, oklch(1 0 0 / 0.3) 0%, transparent 34%)",
            `radial-gradient(110% 90% at 100% 0%, ${f.color2} 0%, transparent 60%)`,
            `linear-gradient(135deg, ${f.color} 0%, ${f.color2} 100%)`,
          ].join(", "),
          boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.5), inset 0 0 0 1px oklch(1 0 0 / 0.16)",
        }}
      >
        <span
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(115deg, transparent 18%, oklch(0.9 0.12 350 / 0.5) 32%, oklch(0.92 0.1 220 / 0.5) 42%, oklch(0.94 0.14 130 / 0.45) 52%, oklch(0.92 0.12 60 / 0.4) 62%, transparent 78%)",
            backgroundSize: "260% 100%",
            backgroundPosition: `${glare}% 0`,
            mixBlendMode: "soft-light",
            transition: "background-position 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </span>
      <span className="relative flex items-center justify-between gap-3 px-4 pt-4" style={{ color: f.ink }}>
        <span className="flex min-w-0 items-center gap-2.5">
          <Globe />
          <span className="truncate text-[13px] font-bold tracking-tight">{r.name}</span>
        </span>
        <span className="shrink-0 font-mono text-[12px] font-semibold tabular-nums">{r.location.lat.toFixed(2)}°</span>
      </span>
    </>
  );
}

export function LocationsTile({ personal, reduced }: { personal: Personal | null | undefined; reduced: boolean }) {
  const regions = personal?.regions ?? [];
  const title = (
    <span>
      Locations {personal && <sup className="font-mono text-[10px]">{regions.length}</sup>}
    </span>
  );
  if (personal === undefined) return <Tile title={title} className="lg:col-start-3 lg:row-start-1"><Loading /></Tile>;
  if (personal === null) return <Tile title={title} className="lg:col-start-3 lg:row-start-1"><Message to="/login" link="Log in">Log in to see the places you monitor.</Message></Tile>;
  if (regions.length === 0) {
    return (
      <Tile title={title} className="lg:col-start-3 lg:row-start-1">
        <Message to="/explore" link="Open Explore">No monitored locations yet. Drop a pin and press “Monitor this location”.</Message>
      </Tile>
    );
  }
  return <LocationStack key={regions.map((r) => r.id).join()} regions={regions.slice(0, 5)} total={regions.length} title={title} reduced={reduced} />;
}

function LocationStack({ regions, total, title, reduced }: { regions: Region[]; total: number; title: React.ReactNode; reduced: boolean }) {
  const [order, setOrder] = React.useState(() => regions.map((r) => r.id).reverse());
  const mounted = useMounted();
  const PEEK = 46;
  const depth = order.length - 1;
  const front = regions.find((r) => r.id === order[order.length - 1])!;
  const [glare, setGlare] = React.useState(30);
  const pointerGlare = React.useRef(false);
  React.useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      setGlare((g) => (pointerGlare.current ? g : 30 + Math.sin((now - t0) / 2600) * 30));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <Tile title={title} className="lg:col-start-3 lg:row-start-1" action={total > regions.length ? <span className="font-mono text-[11px] text-muted-foreground">+{total - regions.length} more</span> : undefined}>
      <div
        className="relative -mx-5 -mb-5 flex flex-1 flex-col justify-end overflow-hidden pt-1"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          pointerGlare.current = true;
          setGlare(((e.clientX - r.left) / r.width) * 100);
        }}
        onPointerLeave={() => { pointerGlare.current = false; }}
      >
        <div className="relative">
          {order.map((id, pos) => {
            const r = regions.find((x) => x.id === id)!;
            const i = regions.indexOf(r);
            const fromFront = order.length - 1 - pos;
            const isFront = fromFront === 0;
            return (
              <button
                key={id}
                type="button"
                onClick={() => !isFront && setOrder((o) => [...o.filter((x) => x !== id), id])}
                aria-label={`${r.name}${isFront ? ", selected" : ", bring to front"}`}
                aria-pressed={isFront}
                className="group absolute left-1/2 block w-[calc(100%-32px)] max-w-[300px] rounded-[12px] p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{
                  top: (depth - fromFront) * PEEK,
                  zIndex: pos + 1,
                  transform: `translateX(-50%) scale(${1 - fromFront * 0.055}) translateY(${mounted ? 0 : 20}px)`,
                  transformOrigin: "top center",
                  opacity: mounted ? 1 : 0,
                  boxShadow: "0 -10px 28px -14px oklch(0 0 0 / 0.75)",
                  transition: reduced ? "none" : `top 650ms cubic-bezier(0.34, 1.35, 0.64, 1), transform 650ms cubic-bezier(0.34, 1.35, 0.64, 1), opacity 500ms ease ${pos * 90}ms`,
                  cursor: isFront ? "default" : "pointer",
                }}
              >
                <span className="relative block w-full" style={{ paddingTop: "63.08%" }}>
                  <span className="absolute inset-0 block"><Face r={r} i={i} glare={glare + fromFront * 18} /></span>
                </span>
              </button>
            );
          })}
          <div aria-hidden className="invisible mx-auto w-[calc(100%-32px)] max-w-[300px] shrink-0" style={{ marginTop: depth * PEEK }}>
            <div style={{ paddingTop: "30%" }} />
          </div>
        </div>

        <div
          className="relative z-10 flex shrink-0 items-end justify-between gap-3 px-5 pb-4"
          style={{
            height: 88,
            background: "color-mix(in oklch, var(--color-card) 72%, transparent)",
            backdropFilter: "blur(18px) saturate(1.3)",
            WebkitBackdropFilter: "blur(18px) saturate(1.3)",
            borderTop: "1px solid color-mix(in oklch, var(--color-foreground) 10%, transparent)",
          }}
          aria-live="polite"
        >
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold tracking-tight">{front.name}</p>
            <p className="mt-1 truncate font-mono text-[11px] text-muted-foreground">
              {coord(front.location.lat, front.location.lon)} · checked {relativeTime(front.last_checked_at)}
            </p>
          </div>
          <p className="shrink-0 rounded-full border border-border px-2 py-0.5 font-mono text-[11px] font-semibold">{front.active ? "Active" : "Paused"}</p>
        </div>
      </div>
    </Tile>
  );
}

/* ------------------------------------------------------------------ */
/*  Sky: cloud cover gauge for the first monitored place               */
/* ------------------------------------------------------------------ */

const TONES = {
  dark: { good: "#6ee7b7", fair: "#fcd34d", poor: "#fca5a5", unknown: "var(--color-muted-foreground)" },
  light: { good: "#0f9d77", fair: "#c98a00", poor: "#d64545", unknown: "var(--color-muted-foreground)" },
} as const;
const DAYS = ["Today", "Tomorrow", "Day 3"] as const;

export function SkyTile({ days, place, personal, forecast }: { days: DayOutlook[]; place: string; personal: Personal | null | undefined; forecast: unknown }) {
  const [day, setDay] = React.useState<(typeof DAYS)[number]>("Today");
  const theme = useTheme();
  const title = place ? `Sky · ${place}` : "Sky";
  const cls = "lg:col-start-4 lg:row-start-1";
  if (personal === undefined || (personal && personal.regions.length > 0 && forecast === undefined)) return <Tile title={title} className={cls}><Loading /></Tile>;
  if (!personal) return <Tile title={title} className={cls}><Message to="/login" link="Log in">Log in to see the sky over your places.</Message></Tile>;
  if (personal.regions.length === 0) return <Tile title={title} className={cls}><Message>Monitor a location to see its cloud forecast here.</Message></Tile>;
  if (days.length === 0) return <Tile title={title} className={cls}><Message>The forecast is not available right now.</Message></Tile>;

  const options = DAYS.slice(0, days.length) as unknown as (typeof DAYS)[number][];
  const d = days[Math.min(DAYS.indexOf(day), days.length - 1)];
  const t = d.avg == null ? 0 : d.avg / 100;
  const R = 62;
  const len = Math.PI * R;
  const angle = -90 + t * 180;
  const color = TONES[theme][d.tone];

  return (
    <Tile title={title} className={cls} action={<span className="font-mono text-[11px] text-muted-foreground">forecast</span>}>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative" style={{ width: 150, height: 86 }}>
          <svg width="150" height="86" viewBox="0 0 150 86" aria-hidden>
            <path d="M 13 78 A 62 62 0 0 1 137 78" fill="none" strokeWidth="10" strokeLinecap="round" style={{ stroke: "var(--color-muted)" }} />
            <path d="M 13 78 A 62 62 0 0 1 137 78" fill="none" strokeWidth="10" strokeLinecap="round" strokeDasharray={len} style={{ stroke: color, strokeDashoffset: len * (1 - t), transition: `stroke-dashoffset 900ms ${EASE}, stroke 400ms ease` }} />
            <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "75px 78px", transition: `transform 900ms ${EASE}` }}>
              <line x1="75" y1="78" x2="75" y2="30" strokeWidth="2.5" strokeLinecap="round" style={{ stroke: "var(--color-foreground)" }} />
            </g>
            <circle cx="75" cy="78" r="5" style={{ fill: "var(--color-foreground)" }} />
          </svg>
        </div>
        <p className="mt-2 font-mono text-[26px] font-semibold leading-none tabular-nums">
          {d.avg == null ? "–" : d.avg} <span className="text-sm text-muted-foreground">% cloud</span>
        </p>
        <p className="mt-1 font-mono text-[11px] text-muted-foreground">{d.label} · 9-12 h</p>
      </div>
      <div className="mt-4 flex justify-center">
        <Pills label="Day" value={day} options={options} onChange={(v) => setDay(v as (typeof DAYS)[number])} />
      </div>
    </Tile>
  );
}

/* ------------------------------------------------------------------ */
/*  Trend: scenes found vs captions made                               */
/* ------------------------------------------------------------------ */

type Range = "1W" | "1M" | "3M";
const RANGE_DAYS: Record<Range, number> = { "1W": 7, "1M": 30, "3M": 90 };

export function TrendTile({ runs, accent, reduced }: { runs: Run[]; accent: string; reduced: boolean }) {
  const uid = React.useId().replace(/:/g, "");
  const [range, setRange] = React.useState<Range>("1M");
  const [hover, setHover] = React.useState<number | null>(null);
  const mounted = useMounted();
  const series = dailySeries(runs, RANGE_DAYS[range]);
  const a = cumulative(series.map((d) => d.scenes));
  const b = cumulative(series.map((d) => d.captions));
  const W = 640;
  const H = 220;
  const hi = Math.max(...a, ...b, 1);
  const y = (v: number) => H - 16 - (v / hi) * (H - 40);
  const x = (i: number) => (i / (series.length - 1)) * W;
  const pa = a.map((v, i) => [x(i), y(v)] as const);
  const pb = b.map((v, i) => [x(i), y(v)] as const);
  const la = smooth(pa);
  const lb = smooth(pb);
  const idx = hover ?? series.length - 1;
  const empty = a[a.length - 1] === 0 && b[b.length - 1] === 0;
  const captioned = a[a.length - 1] ? Math.round((b[b.length - 1] / a[a.length - 1]) * 100) : null;
  const left = `${(pa[idx][0] / W) * 100}%`;

  return (
    <Tile
      title="Scenes found vs captions made"
      className="sm:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-2"
      action={<Pills label="Chart range" value={range} options={["1W", "1M", "3M"]} onChange={(v) => setRange(v as Range)} />}
    >
      <div className="flex flex-wrap items-end gap-x-8 gap-y-2">
        <div>
          <p className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <span className="h-[3px] w-4 rounded-full" style={{ background: accent }} aria-hidden />
            New scenes
          </p>
          <p className="mt-1 font-mono text-[22px] font-semibold tabular-nums">{num(a[idx])}</p>
        </div>
        <div>
          <p className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <span className="h-0 w-4 border-t-2 border-dashed border-muted-foreground" aria-hidden />
            AI captions
          </p>
          <p className="mt-1 font-mono text-[22px] font-semibold tabular-nums text-muted-foreground">{num(b[idx])}</p>
        </div>
        <span className="ml-auto rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold tabular-nums" style={{ background: `color-mix(in oklch, ${accent} 18%, transparent)`, color: accent }}>
          {hover !== null ? `${shortDate(series[idx].date)} · running total` : captioned === null ? "no scenes yet" : `${captioned}% captioned`}
        </span>
      </div>

      <div
        className="relative mt-4 flex-1 touch-pan-y"
        style={{ minHeight: 220 }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setHover(Math.max(0, Math.min(series.length - 1, Math.round(((e.clientX - r.left) / r.width) * (series.length - 1)))));
        }}
        onPointerLeave={() => setHover(null)}
        role="img"
        aria-label={`Over the last ${RANGE_DAYS[range]} days: ${a[a.length - 1]} new scenes found and ${b[b.length - 1]} AI captions made`}
      >
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id={`${uid}-f`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" style={{ stopColor: accent, stopOpacity: 0.28 }} />
              <stop offset="1" style={{ stopColor: accent, stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1={0} x2={W} y1={H * f} y2={H * f} vectorEffect="non-scaling-stroke" strokeDasharray="1 5" style={{ stroke: "var(--color-border)" }} />
          ))}
          <path d={`${la} L ${W} ${H} L 0 ${H} Z`} fill={`url(#${uid}-f)`} style={{ opacity: mounted ? 1 : 0, transition: "opacity 900ms ease 400ms" }} />
          <path d={lb} fill="none" strokeWidth={1.5} strokeDasharray="4 5" vectorEffect="non-scaling-stroke" style={{ stroke: "var(--color-muted-foreground)" }} />
          <path
            key={range}
            d={la}
            fill="none"
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            style={{ stroke: accent, strokeDasharray: 1, strokeDashoffset: mounted || reduced ? 0 : 1, transition: reduced ? "none" : `stroke-dashoffset 1300ms ${EASE}` }}
          />
        </svg>
        {empty && <p className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-muted-foreground">No update runs in this period yet. Press “Check for new scenes now” to start.</p>}
        <span aria-hidden className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-border" style={{ left, opacity: hover !== null ? 1 : 0 }} />
        <span aria-hidden className="pointer-events-none absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-card" style={{ left, top: `${(pa[idx][1] / H) * 100}%`, background: accent, opacity: empty ? 0 : 1 }} />
        <span aria-hidden className="pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card bg-muted-foreground" style={{ left, top: `${(pb[idx][1] / H) * 100}%`, opacity: hover !== null && !empty ? 1 : 0 }} />
      </div>
      <div className="mt-3 flex justify-between font-mono text-[11px] text-muted-foreground" aria-hidden>
        {axisLabels(series.map((d) => d.date), 5).map((l, i) => <span key={i}>{l}</span>)}
      </div>
    </Tile>
  );
}

/* ------------------------------------------------------------------ */
/*  Library: what you have saved                                       */
/* ------------------------------------------------------------------ */

export function LibraryTile({ personal, accent, accent2 }: Colors & { personal: Personal | null | undefined }) {
  const mounted = useMounted();
  const [hover, setHover] = React.useState<number | null>(null);
  const cls = "lg:col-start-3 lg:row-start-2";
  if (personal === undefined) return <Tile title="Your library" className={cls}><Loading /></Tile>;
  if (personal === null) return <Tile title="Your library" className={cls}><Message to="/login" link="Log in">Log in to see what you have saved.</Message></Tile>;
  const c = personal.records?.counts;
  const items: { label: string; value: number; to: string }[] = [
    { label: "Captions", value: c?.captions ?? 0, to: "/captions" },
    { label: "Bookmarks", value: c?.bookmarks ?? 0, to: "/library" },
    { label: "Folders", value: c?.lists ?? 0, to: "/library" },
    { label: "Locations", value: personal.regions.length, to: "/explore" },
  ];
  const colors = [accent, accent2, "oklch(0.78 0.04 280)", "oklch(0.55 0.03 280)"];
  const total = items.reduce((s, i) => s + i.value, 0);

  return (
    <Tile title="Your library" className={cls}>
      <p className="font-mono text-[22px] font-semibold tabular-nums">{num(total)} <span className="text-sm font-normal text-muted-foreground">saved items</span></p>
      <div className="mt-4 flex h-9 gap-1" onPointerLeave={() => setHover(null)} aria-hidden>
        {items.map((it, i) => (
          <span
            key={it.label}
            onPointerEnter={() => setHover(i)}
            className="rounded-[8px]"
            style={{
              flexBasis: mounted ? `${total === 0 ? 25 : Math.max((it.value / total) * 100, it.value > 0 ? 6 : 0)}%` : "25%",
              background: total === 0 ? "var(--color-muted)" : colors[i],
              opacity: hover === null || hover === i ? 1 : 0.3,
              transition: `flex-basis 1000ms ${EASE} ${200 + i * 60}ms, opacity 200ms ease`,
            }}
          />
        ))}
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
        {items.map((it, i) => (
          <li key={it.label} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}>
            <Link to={it.to} className="flex items-center justify-between gap-2 rounded text-[12px] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ background: colors[i] }} aria-hidden />{it.label}</span>
              <span className="font-mono tabular-nums text-muted-foreground">{it.value}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Tile>
  );
}

/* ------------------------------------------------------------------ */
/*  Monitoring: solid accent tile with the "check now" button          */
/* ------------------------------------------------------------------ */

export function MonitoringTile({
  accent, runs, status, locations, signedIn, checking, onCheck,
}: { accent: string; runs: Run[]; status: Status | null; locations: number | null; signedIn: boolean; checking: boolean; onCheck: () => Promise<string | null> }) {
  const cur = inWindow(runs, 30);
  const rate = successRate(cur);
  const last = status?.last_run ?? runs[0] ?? null;
  const running = checking || Boolean(status?.running);
  const lastAt = last?.finished_at ?? last?.started_at ?? null;
  const fresh = freshness(lastAt);
  const recent = runs.slice(0, 10).reverse();
  const maxScenes = Math.max(...recent.map((r) => r.new_acquisitions), 1);
  const [msg, setMsg] = React.useState("");
  const badge = running ? "Checking…" : !last ? "No runs yet" : last.status === "failed" ? "Last run failed" : "Healthy";
  const soft = "oklch(0.22 0.06 265 / 0.1)";

  return (
    <section aria-label="Monitoring" className="relative flex min-w-0 flex-col overflow-hidden rounded-[26px] p-5 lg:col-start-4 lg:row-span-2 lg:row-start-2" style={{ background: accent, color: INK }}>
      <header className="flex items-center justify-between gap-2">
        <h3 className="text-[13px] font-semibold opacity-75">Monitoring</h3>
        <span className="flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold" style={{ background: "oklch(0.22 0.06 265 / 0.12)" }}>
          <span className={cx("size-1.5 rounded-full", running && "animate-pulse")} style={{ background: INK }} aria-hidden />
          {badge}
        </span>
      </header>

      <p className="mt-5 font-mono text-[52px] font-semibold leading-none tracking-[-0.05em] tabular-nums">
        {rate === null ? "–" : Math.round(rate)}
        <span className="text-[22px]">%</span>
      </p>
      <p className="mt-1 text-[12px] font-medium opacity-70">Run success rate · last 30 days</p>

      <div className="mt-5 rounded-2xl p-3" style={{ background: soft }}>
        <div className="flex items-baseline justify-between text-[12px] font-semibold">
          <span className="opacity-70">Last check</span>
          <span className="font-mono tabular-nums">{running ? "running now" : relativeTime(lastAt)}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full" style={{ background: "oklch(0.22 0.06 265 / 0.14)" }}>
          <div className={cx("h-full rounded-full", running && "animate-pulse")} style={{ width: `${running ? 100 : fresh * 100}%`, background: INK, transition: "width 1s ease" }} />
        </div>
        <p className="mt-2 text-[11px] opacity-65">{status?.schedule.mode === "manual" ? "Checks are manual. Weekly automatic runs arrive in a later stage." : "Checks run on a schedule."}</p>
      </div>
      <dl className="mt-3 space-y-1.5 text-[12px]">
        {[
          ["Locations watched", locations === null ? "–" : String(locations)],
          ["Failed tasks · 30d", String(sum(cur, "failed_tasks"))],
          ["Runs all time", String(runs.length)],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between">
            <dt className="opacity-70">{k}</dt>
            <dd className="font-mono font-semibold tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto pt-6">
        <p className="text-[12px] font-semibold opacity-70">New scenes · last 30 days</p>
        <p className="mt-1 font-mono text-[20px] font-semibold tabular-nums">{num(sum(cur, "new_acquisitions"))}</p>
        <p className="font-mono text-[12px] tabular-nums opacity-70">{num(sum(cur, "captions_created"))} AI captions made</p>

        <div className="mt-5 flex h-12 items-end gap-1" aria-hidden>
          {recent.length === 0 && <span className="text-[11px] opacity-60">No runs yet</span>}
          {recent.map((r, i) => (
            <span
              key={r.id}
              className="flex-1 rounded-[4px]"
              style={{
                height: `${18 + (r.new_acquisitions / maxScenes) * 82}%`,
                background: r.status === "failed" ? "transparent" : INK,
                border: r.status === "failed" ? `1.5px dashed ${INK}` : undefined,
                opacity: 0.12 + ((i + 1) / recent.length) * 0.5 + (r.status === "failed" ? 0.3 : 0),
              }}
            />
          ))}
        </div>
        <p className="mt-1.5 font-mono text-[10px] opacity-60">Last {recent.length || 10} runs · dashed = failed</p>

        {signedIn ? (
          <button
            type="button"
            disabled={running}
            onClick={async () => { setMsg(""); setMsg((await onCheck()) ?? ""); }}
            className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-2xl py-3 text-sm font-semibold transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-wait"
            style={{ background: INK, color: accent, opacity: running ? 0.8 : 1 }}
          >
            {running ? <><MorphingSquare className="h-4 w-4 bg-current" /><span>Checking for new scenes…</span></> : <><RefreshCw className="size-4" aria-hidden />Check for new scenes now</>}
          </button>
        ) : (
          <Link to="/login" className="mt-4 block w-full rounded-2xl py-3 text-center text-sm font-semibold" style={{ background: INK, color: accent }}>Log in to check for scenes</Link>
        )}
        {msg && <p role="alert" className="mt-2 text-[12px] font-medium">{msg}</p>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  System status                                                      */
/* ------------------------------------------------------------------ */

export function SystemTile({ system, accent, accent2, onRefresh }: Colors & { system: System | null; onRefresh: () => void }) {
  const cls = "lg:col-start-3 lg:row-start-3";
  if (!system) return <Tile title="System status" className={cls}><Loading /></Tile>;
  const rows: { name: string; ok: boolean; ms: number | null }[] = [
    { name: "Orbit API", ok: system.health !== null, ms: null },
    { name: "Database", ok: system.health?.components.database?.status === "ok", ms: system.health?.components.database?.latency_ms ?? null },
    { name: "AI models", ok: system.health?.components.ml_service?.status === "ok", ms: system.health?.components.ml_service?.latency_ms ?? null },
    ...system.providers.map((p) => ({ name: p.name, ok: p.status === "ok", ms: p.latency_ms })),
  ];
  const allOk = rows.every((r) => r.ok);
  return (
    <Tile
      title="System status"
      className={cls}
      action={
        <span className="rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold" style={{ background: `color-mix(in oklch, ${allOk ? accent : accent2} 18%, transparent)`, color: allOk ? accent : accent2 }}>
          {allOk ? "All up" : "Degraded"}
        </span>
      }
    >
      <ul className="space-y-2.5">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between gap-3 text-[13px]">
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="size-2 shrink-0 rounded-full" style={{ background: r.ok ? accent : accent2 }} aria-hidden />
              <span className="truncate">{r.name}</span>
            </span>
            <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">{r.ok ? (r.ms === null ? "up" : `${r.ms} ms`) : "down"}</span>
          </li>
        ))}
      </ul>
      <button type="button" onClick={onRefresh} className="mt-auto self-start pt-4 text-[12px] text-muted-foreground underline underline-offset-4 hover:text-foreground">Check again</button>
    </Tile>
  );
}

/* ------------------------------------------------------------------ */
/*  Runs stream                                                        */
/* ------------------------------------------------------------------ */

export function RunsTile({ runs, accent, accent2, reduced }: Colors & { runs: Run[]; reduced: boolean }) {
  const ordered = runs.slice(0, 42).reverse();
  const last = runs[0] ?? null;
  const max = Math.max(...ordered.map((r) => r.new_acquisitions), 1);
  const avg = runs.length ? runs.reduce((a, r) => a + r.new_acquisitions, 0) / runs.length : 0;
  const rate = successRate(runs);

  return (
    <Tile title="Update runs" className="sm:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-start-4" action={<span className="font-mono text-[11px] text-muted-foreground">{last ? relativeTime(last.started_at) : "none yet"}</span>}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[22px] font-semibold tabular-nums">{runs.length ? `${num(runs.length)} runs` : "No runs yet"}</p>
          <p className="font-mono text-[11px] tabular-nums text-muted-foreground">
            {last ? `latest: ${last.new_acquisitions} new scene${last.new_acquisitions === 1 ? "" : "s"} · ${last.captions_created} caption${last.captions_created === 1 ? "" : "s"}` : "Run a check from Explore to start"}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-1 items-end gap-[3px]" style={{ minHeight: 64 }} aria-hidden>
        {ordered.length === 0 && <span className="m-auto text-sm text-muted-foreground">Nothing to show yet</span>}
        {ordered.map((r, i) => {
          const isLast = i === ordered.length - 1;
          return (
            <span
              key={r.id}
              className="flex-1 rounded-[3px]"
              style={{
                height: `${18 + (r.new_acquisitions / max) * 82}%`,
                background: r.status === "failed" ? accent2 : isLast ? accent : "var(--color-muted-foreground)",
                opacity: isLast || r.status === "failed" ? 1 : 0.15 + (i / ordered.length) * 0.45,
                animation: isLast && !reduced ? "orbit-pop 500ms cubic-bezier(.3,1.5,.6,1)" : undefined,
                transformOrigin: "bottom",
              }}
            />
          );
        })}
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-3">
        {[
          ["Avg scenes per run", avg.toFixed(1)],
          ["Success rate", rate === null ? "–" : `${Math.round(rate)}%`],
          ["Locations checked", last ? String(last.regions_checked) : "–"],
        ].map(([k, v]) => (
          <div key={k} className="min-w-0">
            <dt className="truncate text-[11px] text-muted-foreground">{k}</dt>
            <dd className="mt-0.5 font-mono text-[13px] font-semibold tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
    </Tile>
  );
}

/* ------------------------------------------------------------------ */
/*  Activity                                                           */
/* ------------------------------------------------------------------ */

type Activity = { id: string; kind: "caption" | "location" | "run" | "bookmark"; title: string; detail: string; amount: string; status: "done" | "running" | "failed"; time: string };

export function activityFrom(records: Records | null | undefined, runs: Run[], now = Date.now()): Activity[] {
  if (records && records.recent.length > 0) {
    return records.recent.slice(0, 4).map((r) => {
      const time = relativeTime(r.at, now);
      if (r.kind === "update_run") {
        const [state, rest = ""] = r.title.split(": ");
        const found = rest.match(/\d+/)?.[0] ?? "0";
        return { id: `${r.kind}-${r.id}`, kind: "run" as const, title: "Update run", detail: state, amount: `${found} new scene${found === "1" ? "" : "s"}`, status: state === "failed" ? "failed" as const : state === "running" ? "running" as const : "done" as const, time };
      }
      if (r.kind === "caption") return { id: `${r.kind}-${r.id}`, kind: "caption" as const, title: "Caption saved", detail: r.title, amount: "+1 caption", status: "done" as const, time };
      if (r.kind === "monitored_location") return { id: `${r.kind}-${r.id}`, kind: "location" as const, title: "Location monitored", detail: r.title, amount: "+1 location", status: "done" as const, time };
      return { id: `${r.kind}-${r.id}`, kind: "bookmark" as const, title: "Bookmark added", detail: r.title, amount: "+1 bookmark", status: "done" as const, time };
    });
  }
  return runs.slice(0, 4).map((r) => ({
    id: r.id,
    kind: "run" as const,
    title: "Update run",
    detail: `${r.regions_checked} location${r.regions_checked === 1 ? "" : "s"} checked`,
    amount: `${r.new_acquisitions} new scene${r.new_acquisitions === 1 ? "" : "s"}`,
    status: r.status === "succeeded" ? "done" as const : r.status,
    time: relativeTime(r.started_at, now),
  }));
}

const KIND_ICON = { caption: Sparkles, location: MapPin, run: RefreshCw, bookmark: Bookmark };

export function ActivityTile({ items, accent, accent2, signedIn }: Colors & { items: Activity[]; signedIn: boolean }) {
  const mounted = useMounted();
  return (
    <Tile title="Recent activity" className="sm:col-span-2 lg:col-span-2 lg:col-start-3 lg:row-start-4" action={!signedIn ? <span className="font-mono text-[11px] text-muted-foreground">public runs</span> : undefined}>
      {items.length === 0 ? (
        <Message to="/explore" link="Open Explore">Nothing here yet. Your captions, bookmarks and update runs will appear as you use Orbit EO.</Message>
      ) : (
        <ul className="-mx-2 -my-1">
          {items.map((a, i) => {
            const Icon = KIND_ICON[a.kind];
            return (
              <li
                key={a.id}
                className="flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors hover:bg-muted/50"
                style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(6px)", transition: `opacity 500ms ease ${300 + i * 70}ms, transform 500ms ${EASE} ${300 + i * 70}ms` }}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-muted text-foreground"><Icon className="size-4" aria-hidden /></span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{a.title}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{a.detail} · {a.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[13px] font-medium tabular-nums">{a.amount}</p>
                  <p className="mt-0.5 flex items-center justify-end gap-1 font-mono text-[10px] font-semibold" style={{ color: a.status === "running" ? accent : a.status === "failed" ? accent2 : "var(--color-muted-foreground)" }}>
                    {a.status === "running" && <MorphingSquare className="h-2.5 w-2.5 bg-current" />}
                    {a.status}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Tile>
  );
}
