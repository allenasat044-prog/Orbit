import type { ReactNode } from "react";

/**
 * Small, safe Markdown renderer for profile READMEs.
 * It builds React elements directly (never innerHTML), so raw HTML in a README is shown as plain text
 * and cannot run scripts. Links and images only allow http(s) (plus mailto, "/" and "#" for links).
 *
 * Supported: headings, paragraphs, **bold**, *italic*, ~~strike~~, `code`, fenced code, links, images
 * (badges too, including [![badge](img)](url)), lists (nested, numbered, task lists), blockquotes,
 * tables, horizontal rules, and centred/right-aligned blocks with  :::center ... :::
 */

const SAFE_LINK = /^(https?:\/\/|mailto:|\/(?!\/)|#)/i;
const SAFE_IMG = /^https?:\/\//i;

type Rule = { re: RegExp; render: (m: RegExpExecArray, key: string) => ReactNode };

const LINK_TEXT = String.raw`((?:!\[[^\]]*\]\([^)]*\)|[^\]])+)`;

const rules: Rule[] = [
  { re: /\\([\\`*_{}[\]()#+\-.!~|>])/, render: (m) => m[1] },
  { re: /`([^`]+)`/, render: (m, k) => <code key={k} className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-[#cfe0ff]">{m[1]}</code> },
  {
    re: /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/,
    render: (m, k) =>
      SAFE_IMG.test(m[2]) ? (
        <img key={k} src={m[2]} alt={m[1]} title={m[3]} loading="lazy" referrerPolicy="no-referrer" className="inline-block max-w-full align-middle" />
      ) : (
        m[0]
      ),
  },
  {
    re: new RegExp(String.raw`\[${LINK_TEXT}\]\(([^)\s]+)(?:\s+"([^"]*)")?\)`),
    render: (m, k) =>
      SAFE_LINK.test(m[2]) ? (
        <a key={k} href={m[2]} title={m[3]} target={m[2].startsWith("#") || m[2].startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer nofollow" className="text-[#8daaff] hover:underline">
          {inline(m[1], k)}
        </a>
      ) : (
        m[0]
      ),
  },
  { re: /\*\*(.+?)\*\*|__(.+?)__/, render: (m, k) => <strong key={k} className="font-semibold text-white">{inline(m[1] ?? m[2], k)}</strong> },
  { re: /~~(.+?)~~/, render: (m, k) => <del key={k}>{inline(m[1], k)}</del> },
  { re: /\*([^*\s][^*]*?)\*|(?<![A-Za-z0-9])_([^_\s][^_]*?)_(?![A-Za-z0-9])/, render: (m, k) => <em key={k}>{inline(m[1] ?? m[2], k)}</em> },
  {
    re: /https?:\/\/[^\s<]+[^\s<.,;:!?)]/,
    render: (m, k) => <a key={k} href={m[0]} target="_blank" rel="noopener noreferrer nofollow" className="text-[#8daaff] hover:underline">{m[0]}</a>,
  },
];

function inline(text: string, kp: string): ReactNode[] {
  const out: ReactNode[] = [];
  let rest = text;
  let n = 0;
  while (rest) {
    let best: { rule: Rule; m: RegExpExecArray } | null = null;
    for (const rule of rules) {
      const m = rule.re.exec(rest);
      if (m && (!best || m.index < best.m.index)) best = { rule, m };
    }
    if (!best) {
      out.push(rest);
      break;
    }
    if (best.m.index > 0) out.push(rest.slice(0, best.m.index));
    out.push(best.rule.render(best.m, `${kp}.${n++}`));
    rest = rest.slice(best.m.index + best.m[0].length);
  }
  return out;
}

const FENCE = /^\s*(```|~~~)\s*([\w+-]*)\s*$/;
const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
const HR = /^\s{0,3}([-*_])(\s*\1){2,}\s*$/;
const QUOTE = /^\s{0,3}>\s?/;
const ITEM = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
const CONTAINER = /^:::\s*(center|right)\s*$/;
const TABLE_SEP = /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/;

const startsBlock = (l: string) => FENCE.test(l) || HEADING.test(l) || HR.test(l) || QUOTE.test(l) || ITEM.test(l) || CONTAINER.test(l);
const indentOf = (l: string) => l.length - l.trimStart().length;
const cells = (row: string) => row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());

const headingCls = [
  "",
  "mt-2 border-b border-white/10 pb-2 text-3xl font-semibold text-white",
  "mt-2 border-b border-white/10 pb-2 text-2xl font-semibold text-white",
  "text-xl font-semibold text-white",
  "text-lg font-semibold text-white",
  "text-base font-semibold text-white",
  "text-sm font-semibold uppercase tracking-wide text-[#b0bed9]",
];

function blocks(src: string, kp: string): ReactNode[] {
  const lines = src.split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  let n = 0;
  const key = () => `${kp}-${n++}`;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    let m = FENCE.exec(line);
    if (m) {
      const body: string[] = [];
      i++;
      while (i < lines.length && !new RegExp(`^\\s*${m[1]}\\s*$`).test(lines[i])) body.push(lines[i++]);
      i++;
      out.push(<pre key={key()} className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-[13px] leading-6 text-[#cfe0ff]"><code>{body.join("\n")}</code></pre>);
      continue;
    }

    m = CONTAINER.exec(line);
    if (m) {
      const body: string[] = [];
      i++;
      while (i < lines.length && !/^:::\s*$/.test(lines[i])) body.push(lines[i++]);
      i++;
      out.push(<div key={key()} style={{ textAlign: m[1] === "center" ? "center" : "right" }} className="space-y-4">{blocks(body.join("\n"), key())}</div>);
      continue;
    }

    m = HEADING.exec(line);
    if (m) {
      const level = m[1].length;
      const Tag = `h${level}` as "h1";
      out.push(<Tag key={key()} className={headingCls[level]}>{inline(m[2], key())}</Tag>);
      i++;
      continue;
    }

    if (HR.test(line)) { out.push(<hr key={key()} className="border-white/10" />); i++; continue; }

    if (QUOTE.test(line)) {
      const body: string[] = [];
      while (i < lines.length && QUOTE.test(lines[i])) body.push(lines[i++].replace(QUOTE, ""));
      out.push(<blockquote key={key()} className="space-y-3 border-l-4 border-white/20 pl-4 text-[#b0bed9]">{blocks(body.join("\n"), key())}</blockquote>);
      continue;
    }

    if (line.includes("|") && i + 1 < lines.length && TABLE_SEP.test(lines[i + 1]) && lines[i + 1].includes("|")) {
      const head = cells(line);
      const align = cells(lines[i + 1]).map((c) => (c.startsWith(":") && c.endsWith(":") ? "center" : c.endsWith(":") ? "right" : "left"));
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim() && lines[i].includes("|")) rows.push(cells(lines[i++]));
      out.push(
        <div key={key()} className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead><tr>{head.map((h, c) => <th key={c} style={{ textAlign: align[c] as "left" }} className="border border-white/10 bg-white/5 px-3 py-2 font-semibold text-white">{inline(h, key())}</th>)}</tr></thead>
            <tbody>{rows.map((r, ri) => <tr key={ri}>{head.map((_, c) => <td key={c} style={{ textAlign: align[c] as "left" }} className="border border-white/10 px-3 py-2">{inline(r[c] ?? "", key())}</td>)}</tr>)}</tbody>
          </table>
        </div>,
      );
      continue;
    }

    m = ITEM.exec(line);
    if (m) {
      const base = m[1].length;
      const ordered = /\d/.test(m[2]);
      const block: string[] = [];
      while (i < lines.length) {
        const l = lines[i];
        if (!l.trim()) {
          const next = lines.slice(i + 1).find((x) => x.trim());
          if (next && (ITEM.test(next) || indentOf(next) > base)) { block.push(l); i++; continue; }
          break;
        }
        if (indentOf(l) < base || (indentOf(l) === base && !ITEM.test(l))) break;
        block.push(l);
        i++;
      }
      const items: { text: string; kids: string[] }[] = [];
      for (const l of block) {
        const im = ITEM.exec(l);
        if (im && im[1].length === base) items.push({ text: im[3], kids: [] });
        else if (items.length) items[items.length - 1].kids.push(l);
      }
      const List = ordered ? "ol" : "ul";
      out.push(
        <List key={key()} className={`space-y-1.5 pl-6 ${ordered ? "list-decimal" : "list-disc"} marker:text-[#8daaff]`}>
          {items.map((it, idx) => {
            const task = /^\[( |x|X)\]\s+(.*)$/.exec(it.text);
            const min = Math.min(...it.kids.filter((k) => k.trim()).map(indentOf), Infinity);
            const kids = it.kids.length && Number.isFinite(min) ? it.kids.map((k) => k.slice(min)).join("\n") : "";
            return (
              <li key={idx} className={task ? "-ml-6 list-none" : undefined}>
                {task ? (
                  <label className="flex items-start gap-2">
                    <input type="checkbox" checked={task[1] !== " "} readOnly disabled className="mt-2 accent-[#8daaff]" />
                    <span>{inline(task[2], key())}</span>
                  </label>
                ) : (
                  inline(it.text, key())
                )}
                {kids && <div className="mt-1.5 space-y-2">{blocks(kids, key())}</div>}
              </li>
            );
          })}
        </List>,
      );
      continue;
    }

    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && (para.length === 0 || !startsBlock(lines[i]))) para.push(lines[i++]);
    const parts: ReactNode[] = [];
    para.forEach((l, idx) => {
      parts.push(...inline(l.replace(/\s+$/, ""), `${key()}`));
      if (idx < para.length - 1) parts.push(/( {2,}|\\)$/.test(l) ? <br key={key()} /> : " ");
    });
    out.push(<p key={key()}>{parts}</p>);
  }
  return out;
}

export function Markdown({ source, className = "" }: { source: string; className?: string }) {
  const text = source.replace(/\r\n?/g, "\n");
  return <div className={`space-y-4 break-words text-[15px] leading-7 text-[#dbe4f7] ${className}`}>{blocks(text, "md")}</div>;
}

export const STARTER_README = `:::center
# Hi, I'm a satellite-image explorer 🛰️
*Watching the Earth change, one pin at a time.*
:::

## About me
- 🌍 I explore **Sentinel** imagery with Orbit EO
- 🔭 Currently watching: _add your favourite places_
- 💬 Ask me about: remote sensing, floods, farmland, cities

## My toolkit
| Area | What I use |
|---|---|
| Imagery | Sentinel-2, Sentinel-1 |
| Analysis | Change maps, AI captions |

## Currently working on
- [x] Set up my Orbit EO profile
- [ ] Build my first bookmark list
- [ ] Track a place over time

> Tip: you can add badges, images, tables, task lists and more. This README is yours.
`;
