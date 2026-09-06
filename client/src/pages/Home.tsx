// Civic Systems Ledger style: Swiss editorial hierarchy, evidence-first copy, low-motion interactions, navy ink with Signal Orange accents.
import { useMemo, useState } from "react";
import { BarChart3, CheckCircle2, ChevronRight, ExternalLink, FileText, Gauge, Menu, ShieldAlert, X } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const findings = [
  { id: "F-01", title: "Initial render presents a blank black field", severity: "High", area: "Performance / UX", detail: "The browser capture showed an almost entirely black viewport with only the winter internship banner visible at first view. The page also exposed a horizontal scrollbar. This is a direct first-impression failure, not a cosmetic nit.", basis: "Observed in browser capture; user screenshot independently shows the same visual family of failure." },
  { id: "F-02", title: "Homepage HTML is heavy before assets are considered", severity: "Medium", area: "Performance", detail: "The saved homepage response was 93,691 bytes and references 9 stylesheets, 5 scripts, 14 images, multiple font families, Bootstrap, jQuery, Slick, and an external visitor-counter script. This is a risk profile for slow first render on constrained devices.", basis: "Static HTML and resource references from the public homepage." },
  { id: "F-03", title: "Nine of fourteen images lack useful alt text", severity: "Medium", area: "Accessibility", detail: "The passive HTML summary counted 14 image elements, 9 without non-empty alt text. Decorative images should be explicitly empty-alt; informative images need concise alternatives.", basis: "Static HTML inspection; not a substitute for a full accessibility audit." },
  { id: "F-04", title: "49 links resolve to empty or root placeholders", severity: "Medium", area: "Content QA", detail: "The homepage contains 93 anchors; 49 use an empty href, #, or /. This creates dead ends, misleading affordances, and unnecessary uncertainty for users navigating institutional information.", basis: "Static HTML inspection." },
  { id: "F-05", title: "Content and visual QA are visibly inconsistent", severity: "Medium", area: "Content / Design", detail: "The public copy includes apparent errors such as “Autonomus” and “Employement”. The supplied screenshot also shows a missing image marker, mixed visual treatments, oversized dead space, and inconsistent typography.", basis: "Homepage text plus user-supplied screenshot; screenshot defects are labelled as reported, not independently reproduced." },
  { id: "F-06", title: "No vulnerability claim is established", severity: "Info", area: "Scope boundary", detail: "This review did not test authentication, authorization, injection, file access, rate limits, APIs, or server configuration. Slow behavior and poor QA are quality findings, not proof of a security exploit.", basis: "Explicit methodological limitation." },
];

const resourceData = [
  { label: "HTML bytes", value: 93.7, unit: "KB", color: "#E45B35" },
  { label: "Stylesheets", value: 9, unit: "files", color: "#17324D" },
  { label: "Scripts", value: 5, unit: "files", color: "#5D7A92" },
  { label: "Images", value: 14, unit: "elements", color: "#9AA9B5" },
];

const evidence = [
  ["E-01", "Homepage HTML", "93,691 bytes saved from the public homepage."],
  ["E-02", "Image semantics", "14 images; 9 have empty or missing alt text."],
  ["E-03", "Navigation quality", "93 anchors; 49 empty, #, or root placeholders."],
  ["E-04", "Visual report", "User-supplied screenshot showing black viewport, horizontal overflow, and missing image marker."],
];

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [mobileOpen, setMobileOpen] = useState(false);
  const visible = useMemo(() => filter === "All" ? findings : findings.filter((f) => f.area.includes(filter)), [filter]);
  const filters = ["All", "Performance", "Accessibility", "Content", "Scope"];

  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#17324D] selection:bg-[#E45B35] selection:text-white">
      <header className="sticky top-0 z-40 border-b border-[#17324D]/15 bg-[#F4F0E8]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="ISL public web review home">
            <img src="/manus-storage/ledger-orbit-mark_732fe28f.png" alt="" className="h-8 w-8" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em]">ISL / PUBLIC WEB REVIEW</span>
          </a>
          <nav className="hidden items-center gap-7 text-[12px] font-semibold uppercase tracking-[0.13em] md:flex">
            <a href="#findings" className="hover:text-[#E45B35]">Findings</a><a href="#evidence" className="hover:text-[#E45B35]">Evidence</a><a href="#method" className="hover:text-[#E45B35]">Method</a><a href="#disclosure" className="hover:text-[#E45B35]">Disclosure</a>
          </nav>
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">{mobileOpen ? <X size={22}/> : <Menu size={22}/>}</button>
        </div>
        {mobileOpen && <div className="border-t border-[#17324D]/15 px-5 py-4 md:hidden"><div className="flex flex-col gap-4 text-sm font-semibold"><a href="#findings" onClick={() => setMobileOpen(false)}>Findings</a><a href="#evidence" onClick={() => setMobileOpen(false)}>Evidence</a><a href="#method" onClick={() => setMobileOpen(false)}>Method</a><a href="#disclosure" onClick={() => setMobileOpen(false)}>Disclosure</a></div></div>}
      </header>

      <main id="top" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[url('/manus-storage/paper-grid-texture_6acade66.png')] bg-cover opacity-25" />
        <section className="relative mx-auto max-w-[1440px] px-5 pb-20 pt-16 lg:px-10 lg:pb-28 lg:pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.18fr_.82fr] lg:items-end">
            <div>
              <div className="mb-7 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#E45B35]"><span className="h-px w-10 bg-[#E45B35]"/> CASE FILE 01 / PASSIVE REVIEW</div>
              <h1 className="max-w-4xl font-[Space_Grotesk] text-5xl font-bold leading-[0.94] tracking-[-0.055em] sm:text-7xl lg:text-[7.6rem]">The page is slow<br/><span className="text-[#E45B35]">before it is useful.</span></h1>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[#17324D]/75">A blunt, non-intrusive review of the public India Space Lab homepage. The record shows a heavy front end, weak content QA, accessibility debt, and a first-view failure that should have been caught before launch.</p>
              <div className="mt-10 flex flex-wrap gap-3"><a href="#findings" className="inline-flex items-center gap-2 bg-[#17324D] px-5 py-3 text-sm font-bold text-[#F4F0E8] transition hover:bg-[#E45B35]">Read the findings <ChevronRight size={16}/></a><a href="#method" className="inline-flex items-center gap-2 border border-[#17324D]/25 px-5 py-3 text-sm font-bold transition hover:border-[#E45B35] hover:text-[#E45B35]">Review method</a></div>
            </div>
            <div className="border-l-2 border-[#E45B35] pl-6 lg:mb-3"><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#17324D]/55">Bottom line</p><p className="mt-4 text-2xl font-semibold leading-tight">This is a quality and reliability problem first. It is not, on this evidence, a proven security breach.</p><p className="mt-5 text-sm leading-relaxed text-[#17324D]/70">That distinction matters. Responsible reporting improves the system; unauthorized exploitation creates a second problem.</p></div>
          </div>
        </section>

        <section className="relative border-y border-[#17324D]/15 bg-[#17324D] text-[#F4F0E8]"><div className="mx-auto grid max-w-[1440px] gap-0 md:grid-cols-3"><Metric number="93.7 KB" label="saved homepage HTML"/><Metric number="9 / 14" label="images without useful alt text"/><Metric number="49 / 93" label="placeholder or root links"/></div></section>

        <section id="findings" className="relative mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28"><div className="grid gap-12 lg:grid-cols-[.34fr_.66fr]"><aside><p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#E45B35]">01 / Findings</p><h2 className="mt-4 max-w-sm font-[Space_Grotesk] text-4xl font-bold leading-tight tracking-[-0.04em]">The defects are visible before the attack surface is even discussed.</h2><p className="mt-6 max-w-sm leading-relaxed text-[#17324D]/70">Filter the register by category. Severity describes user and maintenance impact, not exploitability.</p><div className="mt-8 flex flex-wrap gap-2">{filters.map((f) => <button key={f} onClick={() => setFilter(f)} className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition ${filter === f ? "border-[#E45B35] bg-[#E45B35] text-white" : "border-[#17324D]/20 hover:border-[#E45B35]"}`}>{f}</button>)}</div></aside><div className="space-y-3">{visible.map((f) => <article key={f.id} className="group border-t border-[#17324D]/20 py-6"><div className="grid gap-4 md:grid-cols-[80px_1fr_auto] md:items-start"><span className="font-mono text-xs text-[#E45B35]">{f.id}</span><div><div className="flex flex-wrap items-center gap-3"><h3 className="text-xl font-bold tracking-[-0.02em]">{f.title}</h3><span className={`font-mono text-[10px] uppercase tracking-widest ${f.severity === "High" ? "text-[#E45B35]" : "text-[#17324D]/50"}`}>{f.severity}</span></div><p className="mt-3 max-w-2xl leading-relaxed text-[#17324D]/75">{f.detail}</p><p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-[#17324D]/45">Basis — {f.basis}</p></div><span className="font-mono text-[10px] uppercase tracking-wide text-[#17324D]/45 md:text-right">{f.area}</span></div></article>)}</div></div></section>

        <section id="evidence" className="relative border-y border-[#17324D]/15 bg-[#E6EDF0] px-5 py-20 lg:px-10 lg:py-24"><div className="mx-auto max-w-[1440px]"><div className="grid gap-12 lg:grid-cols-[.38fr_.62fr]"><div><p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#E45B35]">02 / Evidence</p><h2 className="mt-4 font-[Space_Grotesk] text-4xl font-bold tracking-[-0.04em]">What was actually measured.</h2><p className="mt-5 max-w-md leading-relaxed text-[#17324D]/70">The resource profile below comes from a saved homepage document. It is a static signal, not a synthetic lab benchmark. The command-line header request timed out, so no server timing claim is made.</p></div><div><div className="h-[290px] w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={resourceData} margin={{top:10,right:10,left:-20,bottom:0}}><CartesianGrid strokeDasharray="3 3" stroke="#17324D" opacity={0.12}/><XAxis dataKey="label" tick={{fontSize:11, fill:'#17324D'}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10, fill:'#17324D'}} axisLine={false} tickLine={false}/><Tooltip cursor={{fill:'#17324D', opacity:.05}} contentStyle={{border:'1px solid #17324D22', borderRadius:0, background:'#F4F0E8', fontSize:12}} formatter={(value:number, _:string, item:any) => [`${value} ${item.payload.unit}`, 'Observed']}/><Bar dataKey="value" radius={[2,2,0,0]}>{resourceData.map((d) => <Cell key={d.label} fill={d.color}/>)}</Bar></BarChart></ResponsiveContainer></div><p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-[#17324D]/50">Hover bars for exact observed counts and size.</p></div></div><div className="mt-16 grid gap-3 md:grid-cols-2 lg:grid-cols-4">{evidence.map(([id,label,detail]) => <div key={id} className="border-t-2 border-[#17324D] pt-4"><p className="font-mono text-[10px] text-[#E45B35]">{id}</p><h3 className="mt-3 font-bold">{label}</h3><p className="mt-2 text-sm leading-relaxed text-[#17324D]/70">{detail}</p></div>)}</div></div></section>

        <section id="method" className="relative mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28"><div className="grid gap-12 lg:grid-cols-[.34fr_.66fr]"><div><p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#E45B35]">03 / Method</p><h2 className="mt-4 font-[Space_Grotesk] text-4xl font-bold tracking-[-0.04em]">Passive means passive.</h2></div><div className="grid gap-6 md:grid-cols-2"><Method icon={<Gauge size={20}/>} title="Included" text="One ordinary page load, public HTML inspection, visible rendering review, and counts of referenced resources, images, headings, anchors, and alt text."/><Method icon={<ShieldAlert size={20}/>} title="Excluded" text="No payloads, fuzzing, credential testing, endpoint enumeration, load testing, authentication bypass, data extraction, or attempts to alter service behavior."/><Method icon={<FileText size={20}/>} title="Confidence" text="High confidence for counted HTML facts. Medium confidence for visual defects shown in the supplied screenshot. No confidence claim for server timing because the direct header request timed out."/><Method icon={<CheckCircle2 size={20}/>} title="Next safe step" text="Send a private, evidence-backed report to the site owner. Give maintainers a reasonable response window before public discussion."/></div></div></section>

        <section id="disclosure" className="relative border-t border-[#17324D]/15 bg-[#17324D] px-5 py-20 text-[#F4F0E8] lg:px-10 lg:py-24"><div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.7fr_.3fr] lg:items-end"><div><p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#E45B35]">04 / Responsible disclosure</p><h2 className="mt-4 max-w-3xl font-[Space_Grotesk] text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-6xl">Report the flaw.<br/><span className="text-[#E45B35]">Do not weaponize it.</span></h2><p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#F4F0E8]/70">A strong report includes the URL, timestamp, browser/device context, reproducible visual evidence, measured counts, impact on users, and a concrete fix direction. Do not publish private data, do not stress the service, and do not claim “vulnerability” where the evidence only shows poor performance or QA.</p><a href="https://www.isl.ac.in/contact" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border border-[#F4F0E8]/40 px-5 py-3 text-sm font-bold transition hover:border-[#E45B35] hover:bg-[#E45B35]">Open public contact page <ExternalLink size={15}/></a></div><div className="border-t border-[#F4F0E8]/25 pt-5"><p className="font-mono text-[10px] uppercase tracking-widest text-[#F4F0E8]/50">Suggested subject</p><p className="mt-3 text-xl font-semibold">“Responsible report: homepage rendering, accessibility, and navigation defects”</p></div></div></section>
      </main>
      <footer className="bg-[#102538] px-5 py-8 text-[#F4F0E8]/60 lg:px-10"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 font-mono text-[10px] uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:justify-between"><span>Prepared as a passive public-web review · 06 SEP 2026</span><span>Source: isl.ac.in homepage · No exploitation performed</span></div></footer>
    </div>
  );
}

function Metric({ number, label }: { number: string; label: string }) { return <div className="border-r border-[#F4F0E8]/15 px-5 py-8 last:border-0 lg:px-10"><p className="font-[Space_Grotesk] text-4xl font-bold tracking-[-0.04em] text-[#F4F0E8]">{number}</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#F4F0E8]/55">{label}</p></div>; }
function Method({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="border-t border-[#17324D]/20 pt-4"><div className="flex items-center gap-3 text-[#E45B35]"><span>{icon}</span><h3 className="font-bold text-[#17324D]">{title}</h3></div><p className="mt-3 text-sm leading-relaxed text-[#17324D]/70">{text}</p></div>; }
