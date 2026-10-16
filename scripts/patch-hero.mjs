import fs from "fs";
const dir = "src/components/ui/";
const src = dir + "orbit-delivery-hero.original.tsx";
if (!fs.existsSync(src)) { console.error(`Missing ${src}. Save your original hero file there first.`); process.exit(1); }
let s = fs.readFileSync(src, "utf8");
const rep = (a, b) => { if (!s.includes(a)) { console.error("Patch target not found:\n" + a.slice(0, 90)); process.exit(1); } s = s.replace(a, () => b); };
rep("function App() {", `var NAV = [["Explore", "/explore"], ["Captions", "/captions"], ["Analysis", "/analysis"], ["Dashboard", "/dashboard"]];\nfunction App({ onNavigate }) {`);
rep(`<nav aria-label="Main navigation"><button onClick={explore}>Delivery</button>{["How it works", "For business", "Our story"].map((item) => <button key={item} onClick={() => setStory(item)}>{item}</button>)}</nav>`,
    `<nav aria-label="Main navigation">{NAV.map(([label, path]) => <button key={path} onClick={() => onNavigate?.(path)}>{label}</button>)}</nav>`);
rep(`<button className="header-cta" disabled>Meet your courier</button>`, `<button className="header-cta" onClick={() => onNavigate?.("/explore")}>Launch explorer</button>`);
rep(`<button className="explore-button" disabled>Meet your courier <Arrow /></button>`, `<button className="explore-button" onClick={() => onNavigate?.("/explore")}>Launch explorer <Arrow /></button>`);
s = s.replace(/function OrbitDeliveryHero\(\{ theme = "auto", assetBaseUrl = ("[^"]*") \}\)/, (_, u) => `function OrbitDeliveryHero({ theme = "auto", assetBaseUrl = ${u}, onNavigate })`);
rep("<App />", "<App onNavigate={onNavigate} />");
fs.writeFileSync(dir + "orbit-delivery-hero.tsx", s);
console.log("Hero patched -> " + dir + "orbit-delivery-hero.tsx");
