// import { createFileRoute, Link } from "@tanstack/react-router";
// import { motion } from "motion/react";
// import {
//   ArrowLeft,
//   ArrowRight,
//   ArrowUpRight,
//   Building2,
//   CheckCircle2,
//   ShieldCheck,
//   Users,
//   Zap,
//   Search,
//   Layers,
//   PenTool,
//   Palette,
//   TestTube2,
//   Repeat,
//   AlertTriangle,
//   Layout as LayoutIcon,
//   Workflow,
//   Gauge,
//   FileWarning,
//   Scale,
//   Gavel,
//   Briefcase,
//   Landmark,
//   Smartphone,
//   MonitorSmartphone,
//   Sparkles,
//   Type,
// } from "lucide-react";
// import { Reveal } from "@/components/portfolio/Reveal";
// import hero from "@/assets/cg-hero.jpg";
// import before from "@/assets/cg-before.jpg";
// import after from "@/assets/cg-after.jpg";
// import screen1 from "@/assets/cg-screen-1.jpg";
// import screen2 from "@/assets/cg-screen-2.jpg";
// import wireframe from "@/assets/cg-wireframe.jpg";

// export const Route = createFileRoute("/case/cloudgavel")({
//   component: CloudGavelCase,
//   head: () => ({
//     meta: [
//       { title: "CloudGavel — Enterprise UX Case Study · Rajvir" },
//       {
//         name: "description",
//         content:
//           "Modernizing operational UX for a cloud-based digital warrant platform used by 500+ law enforcement agencies, prosecutors and judges.",
//       },
//       { property: "og:title", content: "CloudGavel — Enterprise GovTech Case Study" },
//       {
//         property: "og:description",
//         content: "How we rebuilt the operational UX of a mission-critical digital warrant platform.",
//       },
//     ],
//   }),
// });

// /* ---------- Reusable bits ---------- */

// function SectionLabel({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
//       <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {children}
//     </div>
//   );
// }

// function LogoMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
//   const dim = size === "lg" ? "h-12 w-12" : size === "sm" ? "h-7 w-7" : "h-10 w-10";
//   const text = size === "lg" ? "text-lg" : size === "sm" ? "text-xs" : "text-sm";
//   return (
//     <div className="flex items-center gap-3">
//       <div className={`${dim} grid place-items-center rounded-xl bg-ink shadow-card`}>
//         <Gavel className="h-1/2 w-1/2 text-card-foreground" strokeWidth={2.2} />
//       </div>
//       <div className={`${text} font-semibold tracking-tight text-foreground`}>
//         Cloud<span className="text-primary">Gavel</span>
//       </div>
//     </div>
//   );
// }

// function PartnerLogo({ name }: { name: string }) {
//   return (
//     <div className="flex h-14 items-center justify-center rounded-xl border border-border bg-surface px-6 text-sm font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground">
//       <span className="mr-2 inline-block h-2 w-2 rounded-sm bg-foreground/40" />
//       {name}
//     </div>
//   );
// }

// /* ---------- Page ---------- */

// function CloudGavelCase() {
//   return (
//     <main className="relative min-h-screen bg-background text-foreground">
//       <TopBar />
//       <Hero />
//       <Meta />
//       <About />
//       <Problem />
//       <Roles />
//       <Challenges />
//       <Process />
//       <BeforeAfter />
//       <DesignSystem />
//       <WorkflowSection />
//       <Gallery />
//       <Impact />
//       <Reflection />
//       <CTA />
//     </main>
//   );
// }

// /* ---------- Top bar ---------- */

// function TopBar() {
//   return (
//     <div className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//         <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
//           <ArrowLeft className="h-4 w-4" /> Back to portfolio
//         </Link>
//         <LogoMark size="sm" />
//         <a
//           href="#prototype"
//           className="hidden items-center gap-1 rounded-full bg-ink px-4 py-1.5 text-xs font-medium text-card-foreground md:inline-flex"
//         >
//           View Prototype <ArrowUpRight className="h-3.5 w-3.5" />
//         </a>
//       </div>
//     </div>
//   );
// }

// /* ---------- 1. Hero ---------- */

// function Hero() {
//   return (
//     <section className="relative overflow-hidden border-b border-border px-6 pt-20 pb-24">
//       <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
//       <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

//       <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="lg:col-span-6"
//         >
//           <LogoMark size="lg" />

//           <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
//             <ShieldCheck className="h-3 w-3 text-primary" /> Enterprise GovTech Platform
//           </div>

//           <h1 className="mt-6 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.02] tracking-tight text-foreground">
//             Modernizing operational UX for a{" "}
//             <span className="italic text-gradient-blue">digital warrant</span> platform.
//           </h1>

//           <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
//             CloudGavel is a cloud-based electronic warrant management system used by law enforcement,
//             prosecutors and judges. As UX/UI Designer I led the modernization of mission-critical
//             workflows — turning a dense legacy interface into a calm, fast, compliance-ready product.
//           </p>

//           <div className="mt-9 flex flex-wrap items-center gap-3">
//             <a
//               href="#prototype"
//               className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-card-foreground shadow-card transition-transform hover:-translate-y-0.5"
//             >
//               View Prototype
//               <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//             </a>
//             <a
//               href="#workflow"
//               className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/20"
//             >
//               <Workflow className="h-4 w-4" /> Explore Workflow
//             </a>
//           </div>
//         </motion.div>

//         {/* hero mock with floating cards */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.96 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, delay: 0.1 }}
//           className="relative lg:col-span-6"
//         >
//           <div className="overflow-hidden rounded-2xl border border-border shadow-card">
//             <img src={hero} alt="CloudGavel dashboard" className="h-full w-full object-cover" width={1440} height={960} />
//           </div>

//           {/* floating cards */}
//           <FloatStat
//             icon={<Building2 className="h-4 w-4 text-primary" />}
//             label="Agencies"
//             value="500+"
//             className="-left-4 top-10 md:-left-10"
//             delay={0.4}
//           />
//           <FloatStat
//             icon={<Users className="h-4 w-4 text-accent" />}
//             label="Roles"
//             value="Multi-role workflows"
//             className="-right-4 top-32 md:-right-8"
//             delay={0.55}
//           />
//           <FloatStat
//             icon={<ShieldCheck className="h-4 w-4 text-success" />}
//             label="Compliance"
//             value="CJIS compliant"
//             className="-left-4 bottom-10 md:-left-12"
//             delay={0.7}
//           />
//           <FloatStat
//             icon={<Zap className="h-4 w-4 text-primary" />}
//             label="Approvals"
//             value="Real-time"
//             className="-right-4 bottom-20 md:-right-10"
//             delay={0.85}
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// function FloatStat({
//   icon,
//   label,
//   value,
//   className,
//   delay,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
//   className: string;
//   delay: number;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 14 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay }}
//       className={`absolute hidden md:block ${className}`}
//     >
//       <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/95 p-3 pr-5 shadow-float backdrop-blur">
//         <div className="grid h-9 w-9 place-items-center rounded-xl bg-secondary">{icon}</div>
//         <div>
//           <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
//           <div className="text-sm font-semibold text-foreground">{value}</div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// /* ---------- 2. Project meta ---------- */

// function Meta() {
//   const items = [
//     { label: "Role", value: "Lead UX/UI Designer" },
//     { label: "Team", value: "1 PM · 2 Eng · 1 Designer" },
//     { label: "Timeline", value: "9 months" },
//     { label: "Industry", value: "GovTech · Law Enforcement" },
//   ];
//   return (
//     <section className="border-b border-border bg-surface-muted">
//       <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4">
//         {items.map((i) => (
//           <div key={i.label}>
//             <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{i.label}</div>
//             <div className="mt-1 text-sm font-medium text-foreground">{i.value}</div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// /* ---------- 3. About ---------- */

// function About() {
//   const ecosystem = [
//     { icon: ShieldCheck, label: "Law Enforcement", role: "Submits warrants" },
//     { icon: Briefcase, label: "Prosecutors", role: "Reviews & approves" },
//     { icon: Scale, label: "Judges", role: "Signs digitally" },
//     { icon: Landmark, label: "Courts", role: "Files & archives" },
//   ];

//   return (
//     <section className="border-b border-border px-6 py-24">
//       <div className="mx-auto max-w-7xl">
//         <div className="grid gap-12 lg:grid-cols-12">
//           <Reveal className="lg:col-span-5">
//             <SectionLabel>About the platform</SectionLabel>
//             <h2 className="font-display text-4xl tracking-tight md:text-5xl">
//               A digital backbone for the entire warrant lifecycle.
//             </h2>
//             <p className="mt-5 text-muted-foreground">
//               CloudGavel replaces paper-based warrant processing with a single, auditable digital
//               system. Officers submit, prosecutors review, judges sign, and courts file — all in
//               minutes instead of hours, across hundreds of jurisdictions.
//             </p>
//           </Reveal>

//           <Reveal delay={0.1} className="lg:col-span-7">
//             <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft">
//               <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Ecosystem</div>
//               <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
//                 {ecosystem.map((e, i) => (
//                   <div key={e.label} className="relative">
//                     <div className="rounded-2xl border border-border bg-background p-4">
//                       <e.icon className="h-5 w-5 text-primary" />
//                       <div className="mt-3 text-sm font-semibold">{e.label}</div>
//                       <div className="text-xs text-muted-foreground">{e.role}</div>
//                     </div>
//                     {i < ecosystem.length - 1 && (
//                       <ArrowRight className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-border md:block" />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Reveal>
//         </div>

//         {/* product screenshots */}
//         <Reveal delay={0.15}>
//           <div className="mt-12 grid gap-5 md:grid-cols-2">
//             <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
//               <img src={screen1} alt="Warrant detail screen" className="w-full" loading="lazy" />
//             </div>
//             <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
//               <img src={screen2} alt="Mobile approval screen" className="w-full" loading="lazy" />
//             </div>
//           </div>
//         </Reveal>

//         {/* partner logos */}
//         <Reveal delay={0.2}>
//           <div className="mt-16">
//             <div className="mb-6 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
//               Trusted across jurisdictions
//             </div>
//             <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
//               {["Northgate PD", "Riverton DA", "Court of CA", "JustOps", "BlueShield", "FedCourt"].map((n) => (
//                 <PartnerLogo key={n} name={n} />
//               ))}
//             </div>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// /* ---------- 4. Problem ---------- */

// function Problem() {
//   const problems = [
//     { icon: LayoutIcon, title: "Outdated UI patterns", body: "Visuals rooted in 2008 desktop-era enterprise software." },
//     { icon: Layers, title: "Dense information hierarchy", body: "Screens that buried the one action that mattered." },
//     { icon: Workflow, title: "Complex workflows", body: "Cross-role steps with unclear ownership and status." },
//     { icon: Gauge, title: "Operational inefficiencies", body: "Repeated context switching and avoidable clicks." },
//     { icon: FileWarning, title: "Legacy inconsistencies", body: "Two button styles, three table styles, no system." },
//   ];

//   return (
//     <section className="border-b border-border bg-surface-muted px-6 py-24">
//       <div className="mx-auto max-w-7xl">
//         <Reveal>
//           <SectionLabel>Problem statement</SectionLabel>
//           <h2 className="max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
//             A mission-critical product fighting against its own interface.
//           </h2>
//         </Reveal>

//         <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
//           {problems.map((p, i) => (
//             <Reveal key={p.title} delay={i * 0.05}>
//               <div className="h-full rounded-2xl border border-border bg-background p-6 transition-shadow hover:shadow-soft">
//                 <div className="flex items-center gap-3">
//                   <div className="grid h-9 w-9 place-items-center rounded-lg bg-destructive/10">
//                     <p.icon className="h-4 w-4 text-destructive" />
//                   </div>
//                   <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Audit finding</div>
//                 </div>
//                 <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
//                 <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
//               </div>
//             </Reveal>
//           ))}

//           <Reveal delay={0.25}>
//             <div className="h-full overflow-hidden rounded-2xl border border-border bg-gradient-card p-6 text-card-foreground">
//               <div className="text-[10px] uppercase tracking-widest text-card-foreground/60">Audit summary</div>
//               <div className="mt-4 font-display text-5xl">37</div>
//               <div className="mt-1 text-sm text-card-foreground/70">critical usability issues identified across 14 core screens</div>
//             </div>
//           </Reveal>
//         </div>

//         {/* legacy preview */}
//         <Reveal delay={0.3}>
//           <div className="mt-14 grid gap-6 md:grid-cols-2">
//             <Annotated label="Before · Legacy interface" image={before} tone="warning" />
//             <div className="flex flex-col justify-center rounded-2xl border border-border bg-background p-7">
//               <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Field observation</div>
//               <p className="mt-3 text-lg font-medium text-foreground">
//                 &ldquo;Officers were printing screens to make sense of them. The product had become a
//                 source of friction in moments where seconds matter.&rdquo;
//               </p>
//               <div className="mt-4 text-xs text-muted-foreground">— shadowing session, county sheriff dept.</div>
//             </div>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// function Annotated({ label, image, tone = "default" }: { label: string; image: string; tone?: "default" | "warning" | "success" }) {
//   const dot = tone === "warning" ? "bg-destructive" : tone === "success" ? "bg-success" : "bg-primary";
//   return (
//     <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-soft">
//       <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
//         <div className="flex items-center gap-2 text-xs text-muted-foreground">
//           <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
//           {label}
//         </div>
//         <div className="flex gap-1">
//           <span className="h-2 w-2 rounded-full bg-border" />
//           <span className="h-2 w-2 rounded-full bg-border" />
//           <span className="h-2 w-2 rounded-full bg-border" />
//         </div>
//       </div>
//       <img src={image} alt={label} className="w-full" loading="lazy" />
//     </div>
//   );
// }

// /* ---------- 5. Roles & responsibilities ---------- */

// function Roles() {
//   const roles = [
//     { icon: Search, label: "UX Research", body: "Field interviews with officers, prosecutors and judges." },
//     { icon: Workflow, label: "Workflow Analysis", body: "Mapped 22 cross-role flows end-to-end." },
//     { icon: PenTool, label: "Wireframing", body: "Low-fi structure for 40+ screens prioritized by frequency." },
//     { icon: Sparkles, label: "UI Modernization", body: "Calm, light-mode default with semantic accents." },
//     { icon: Layers, label: "Design System", body: "Components, tokens and patterns adopted org-wide." },
//     { icon: CheckCircle2, label: "Usability Enhancements", body: "Removed 60% of clicks from the warrant submission flow." },
//   ];

//   return (
//     <section className="border-b border-border px-6 py-24">
//       <div className="mx-auto max-w-7xl">
//         <Reveal>
//           <SectionLabel>My role</SectionLabel>
//           <h2 className="max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
//             What I owned, end-to-end.
//           </h2>
//         </Reveal>

//         <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
//           {roles.map((r, i) => (
//             <Reveal key={r.label} delay={i * 0.05}>
//               <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:shadow-soft">
//                 <div className="flex items-center justify-between">
//                   <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10">
//                     <r.icon className="h-5 w-5 text-primary" />
//                   </div>
//                   <div className="text-[10px] uppercase tracking-widest text-muted-foreground">0{i + 1}</div>
//                 </div>
//                 <h3 className="mt-5 text-base font-semibold">{r.label}</h3>
//                 <p className="mt-1.5 text-sm text-muted-foreground">{r.body}</p>
//               </div>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ---------- 6. UX Challenges ---------- */

// function Challenges() {
//   const challenges = [
//     { icon: AlertTriangle, title: "High-stakes operational environment", body: "Mistakes have legal consequences. The interface had to make the safe path the easy path." },
//     { icon: Users, title: "Multi-user, multi-role workflows", body: "Three personas with different mental models needed a single product surface." },
//     { icon: Zap, title: "Speed-critical tasks", body: "Some warrants must be approved in under 10 minutes. Every screen had to be optimized for time-to-action." },
//     { icon: ShieldCheck, title: "Compliance-driven constraints", body: "CJIS rules dictate fields, audit trails and retention. Design had to absorb the rules invisibly." },
//     { icon: Layers, title: "Information-heavy dashboards", body: "30+ data points per case had to remain scannable, not noisy." },
//   ];

//   return (
//     <section className="border-b border-border bg-surface-muted px-6 py-24">
//       <div className="mx-auto max-w-7xl">
//         <Reveal>
//           <SectionLabel>UX challenges</SectionLabel>
//           <h2 className="max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
//             The constraints that shaped every decision.
//           </h2>
//         </Reveal>

//         <div className="mt-14 grid gap-5 lg:grid-cols-12">
//           {challenges.slice(0, 2).map((c, i) => (
//             <Reveal key={c.title} delay={i * 0.05} className="lg:col-span-6">
//               <ChallengeCard {...c} />
//             </Reveal>
//           ))}
//           {challenges.slice(2).map((c, i) => (
//             <Reveal key={c.title} delay={(i + 2) * 0.05} className="lg:col-span-4">
//               <ChallengeCard {...c} compact />
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function ChallengeCard({
//   icon: Icon,
//   title,
//   body,
//   compact,
// }: {
//   icon: React.ElementType;
//   title: string;
//   body: string;
//   compact?: boolean;
// }) {
//   return (
//     <div className="h-full rounded-2xl border border-border bg-background p-7 shadow-soft">
//       <div className="grid h-10 w-10 place-items-center rounded-xl bg-foreground/5">
//         <Icon className="h-5 w-5 text-foreground" />
//       </div>
//       <h3 className={`mt-5 font-display tracking-tight ${compact ? "text-xl" : "text-2xl"}`}>{title}</h3>
//       <p className="mt-3 text-sm text-muted-foreground">{body}</p>
//     </div>
//   );
// }

// /* ---------- 7. Process ---------- */

// function Process() {
//   const steps = [
//     { label: "Audit", body: "Heuristic review of 14 core screens.", icon: Search },
//     { label: "Research", body: "12 interviews across 3 personas.", icon: Users },
//     { label: "Wireframes", body: "40+ low-fi screens for review.", icon: PenTool },
//     { label: "UI System", body: "Tokens, components, patterns.", icon: Palette },
//     { label: "Testing", body: "5 moderated sessions per persona.", icon: TestTube2 },
//     { label: "Iteration", body: "3 rounds, shipped weekly.", icon: Repeat },
//   ];

//   return (
//     <section className="border-b border-border px-6 py-24">
//       <div className="mx-auto max-w-7xl">
//         <Reveal>
//           <SectionLabel>Design process</SectionLabel>
//           <h2 className="max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
//             From audit to iteration, in the open.
//           </h2>
//         </Reveal>

//         {/* timeline */}
//         <Reveal delay={0.1}>
//           <div className="relative mt-14 overflow-x-auto">
//             <div className="absolute left-0 right-0 top-[42px] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
//             <div className="relative flex min-w-[800px] gap-4">
//               {steps.map((s, i) => (
//                 <div key={s.label} className="flex-1">
//                   <div className="flex items-center gap-3">
//                     <div className="grid h-[22px] w-[22px] place-items-center rounded-full bg-background ring-4 ring-background">
//                       <span className="block h-3 w-3 rounded-full bg-primary shadow-[0_0_0_4px_oklch(0.55_0.22_265/0.15)]" />
//                     </div>
//                     <div className="h-px flex-1 bg-border" />
//                   </div>
//                   <div className="mt-5 rounded-2xl border border-border bg-surface p-5">
//                     <div className="flex items-center gap-2">
//                       <s.icon className="h-4 w-4 text-primary" />
//                       <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Step 0{i + 1}</div>
//                     </div>
//                     <div className="mt-3 text-base font-semibold">{s.label}</div>
//                     <div className="mt-1 text-sm text-muted-foreground">{s.body}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Reveal>

//         {/* design board */}
//         <Reveal delay={0.2}>
//           <div className="mt-12 overflow-hidden rounded-2xl border border-border shadow-soft">
//             <img src={wireframe} alt="Figma design board" className="w-full" loading="lazy" />
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// /* ---------- 8. Before / After ---------- */

// function BeforeAfter() {
//   const improvements = [
//     "Single primary action per screen",
//     "Consistent table & status patterns",
//     "Cleaner navigation hierarchy",
//     "Improved readability & contrast",
//   ];
//   return (
//     <section className="border-b border-border bg-surface-muted px-6 py-24">
//       <div className="mx-auto max-w-7xl">
//         <Reveal>
//           <SectionLabel>Before vs after</SectionLabel>
//           <h2 className="max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
//             The shift, side by side.
//           </h2>
//         </Reveal>

//         <Reveal delay={0.1}>
//           <div className="mt-14 grid gap-5 lg:grid-cols-2">
//             <Annotated label="Before — legacy" image={before} tone="warning" />
//             <Annotated label="After — CloudGavel 2.0" image={after} tone="success" />
//           </div>
//         </Reveal>

//         <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
//           {improvements.map((t, i) => (
//             <Reveal key={t} delay={i * 0.05}>
//               <div className="rounded-2xl border border-border bg-background p-5">
//                 <CheckCircle2 className="h-4 w-4 text-success" />
//                 <div className="mt-3 text-sm font-medium">{t}</div>
//               </div>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ---------- 9. Design system ---------- */

// function DesignSystem() {
//   const swatches = [
//     { name: "Slate 950", hex: "#0B1220" },
//     { name: "Slate 700", hex: "#334155" },
//     { name: "Primary", hex: "#2C5BFF" },
//     { name: "Surface", hex: "#F4F6FA" },
//     { name: "Success", hex: "#10B981" },
//     { name: "Alert", hex: "#E11D48" },
//   ];

//   const statuses = [
//     { label: "Pending", tone: "bg-amber-500/10 text-amber-700 ring-amber-600/20" },
//     { label: "Approved", tone: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20" },
//     { label: "Returned", tone: "bg-rose-500/10 text-rose-700 ring-rose-600/20" },
//     { label: "Filed", tone: "bg-sky-500/10 text-sky-700 ring-sky-600/20" },
//   ];

//   return (
//     <section className="border-b border-border px-6 py-24">
//       <div className="mx-auto max-w-7xl">
//         <Reveal>
//           <SectionLabel>UI modernization</SectionLabel>
//           <h2 className="max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
//             One system. Every screen.
//           </h2>
//         </Reveal>

//         <div className="mt-14 grid gap-5 lg:grid-cols-12">
//           {/* Typography */}
//           <Reveal className="lg:col-span-5">
//             <div className="h-full rounded-2xl border border-border bg-surface p-7">
//               <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
//                 <Type className="h-3.5 w-3.5" /> Typography
//               </div>
//               <div className="mt-6 space-y-4">
//                 <div>
//                   <div className="text-[10px] text-muted-foreground">Display · 48 / 1.05</div>
//                   <div className="font-display text-4xl tracking-tight">Operational clarity.</div>
//                 </div>
//                 <div>
//                   <div className="text-[10px] text-muted-foreground">Heading · 20 / 1.25</div>
//                   <div className="text-xl font-semibold">Warrant #4287 · Pending review</div>
//                 </div>
//                 <div>
//                   <div className="text-[10px] text-muted-foreground">Body · 14 / 1.55</div>
//                   <div className="text-sm text-muted-foreground">
//                     All officer narratives are auto-attached and timestamped to the case file.
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Reveal>

//           {/* Colors */}
//           <Reveal delay={0.05} className="lg:col-span-7">
//             <div className="h-full rounded-2xl border border-border bg-surface p-7">
//               <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
//                 <Palette className="h-3.5 w-3.5" /> Color · Spacing
//               </div>
//               <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
//                 {swatches.map((s) => (
//                   <div key={s.name}>
//                     <div className="aspect-square rounded-xl border border-border" style={{ background: s.hex }} />
//                     <div className="mt-2 text-xs font-medium">{s.name}</div>
//                     <div className="text-[10px] text-muted-foreground">{s.hex}</div>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-6 flex items-end gap-2">
//                 {[4, 8, 12, 16, 24, 32, 48].map((n) => (
//                   <div key={n} className="flex flex-col items-center gap-1">
//                     <div className="rounded bg-primary/20" style={{ width: 12, height: n }} />
//                     <div className="text-[10px] text-muted-foreground">{n}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Reveal>

//           {/* Buttons */}
//           <Reveal delay={0.1} className="lg:col-span-4">
//             <div className="h-full rounded-2xl border border-border bg-surface p-7">
//               <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Buttons</div>
//               <div className="mt-6 flex flex-col gap-3">
//                 <button className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-card-foreground">Approve warrant</button>
//                 <button className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium">Request changes</button>
//                 <button className="rounded-md px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5">View history</button>
//               </div>
//             </div>
//           </Reveal>

//           {/* Status */}
//           <Reveal delay={0.15} className="lg:col-span-4">
//             <div className="h-full rounded-2xl border border-border bg-surface p-7">
//               <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Status indicators</div>
//               <div className="mt-6 flex flex-wrap gap-2">
//                 {statuses.map((s) => (
//                   <span
//                     key={s.label}
//                     className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${s.tone}`}
//                   >
//                     <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                     {s.label}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </Reveal>

//           {/* Table */}
//           <Reveal delay={0.2} className="lg:col-span-4">
//             <div className="h-full overflow-hidden rounded-2xl border border-border bg-surface">
//               <div className="border-b border-border px-5 py-3 text-[10px] uppercase tracking-widest text-muted-foreground">Table component</div>
//               <table className="w-full text-xs">
//                 <thead className="text-muted-foreground">
//                   <tr className="border-b border-border">
//                     <th className="px-4 py-2 text-left font-medium">Case</th>
//                     <th className="px-4 py-2 text-left font-medium">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {[
//                     ["#4287", "Pending", "amber"],
//                     ["#4286", "Approved", "emerald"],
//                     ["#4285", "Filed", "sky"],
//                   ].map(([c, s, t]) => (
//                     <tr key={c} className="border-b border-border last:border-0">
//                       <td className="px-4 py-2.5 font-medium">{c}</td>
//                       <td className="px-4 py-2.5">
//                         <span className={`inline-flex items-center gap-1 rounded-full bg-${t}-500/10 px-2 py-0.5 text-[10px] text-${t}-700`}>
//                           <span className="h-1 w-1 rounded-full bg-current" />
//                           {s}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </Reveal>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ---------- 10. Workflow ---------- */

// function WorkflowSection() {
//   const flow = [
//     { label: "Officer submits", body: "Pre-filled forms with smart defaults.", icon: ShieldCheck },
//     { label: "Supervisor review", body: "One-screen approval with diff view.", icon: Briefcase },
//     { label: "Judge approval", body: "Mobile-first signing with biometric auth.", icon: Scale },
//     { label: "Digital completion", body: "Auto-filed with full audit trail.", icon: CheckCircle2 },
//   ];

//   return (
//     <section id="workflow" className="border-b border-border bg-ink px-6 py-24 text-card-foreground">
//       <div className="mx-auto max-w-7xl">
//         <Reveal>
//           <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-card-foreground/70">
//             <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Workflow optimization
//           </div>
//           <h2 className="max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
//             From hours of paperwork to minutes of clarity.
//           </h2>
//         </Reveal>

//         <div className="mt-14 grid gap-5 lg:grid-cols-4">
//           {flow.map((f, i) => (
//             <Reveal key={f.label} delay={i * 0.08}>
//               <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
//                 <div className="text-[10px] uppercase tracking-widest text-card-foreground/50">Stage 0{i + 1}</div>
//                 <div className="mt-4 grid h-10 w-10 place-items-center rounded-xl bg-primary/20">
//                   <f.icon className="h-5 w-5 text-primary-foreground" />
//                 </div>
//                 <div className="mt-4 text-base font-semibold">{f.label}</div>
//                 <div className="mt-1.5 text-sm text-card-foreground/70">{f.body}</div>
//                 {i < flow.length - 1 && (
//                   <ArrowRight className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-primary lg:block" />
//                 )}
//               </div>
//             </Reveal>
//           ))}
//         </div>

//         <Reveal delay={0.4}>
//           <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
//             {["Avg. submission: 3 min", "Avg. approval: 8 min", "Audit trail: 100%", "Offline support: yes"].map((s) => (
//               <div key={s} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-card-foreground/80">
//                 {s}
//               </div>
//             ))}
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// /* ---------- 11. Gallery ---------- */

// function Gallery() {
//   return (
//     <section id="prototype" className="border-b border-border px-6 py-24">
//       <div className="mx-auto max-w-7xl">
//         <Reveal>
//           <SectionLabel>Product screens</SectionLabel>
//           <h2 className="max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
//             A walk through the redesigned system.
//           </h2>
//         </Reveal>

//         <div className="mt-14 grid auto-rows-[260px] gap-5 md:grid-cols-6">
//           <GalleryItem image={hero} className="md:col-span-4 md:row-span-2" label="Operations dashboard" icon={MonitorSmartphone} />
//           <GalleryItem image={screen1} className="md:col-span-2" label="Warrant detail" />
//           <GalleryItem image={screen2} className="md:col-span-2" label="Mobile approval" icon={Smartphone} />
//           <GalleryItem image={after} className="md:col-span-3" label="Case overview" />
//           <GalleryItem image={wireframe} className="md:col-span-3" label="Process artefacts" />
//         </div>
//       </div>
//     </section>
//   );
// }

// function GalleryItem({
//   image,
//   className,
//   label,
//   icon: Icon,
// }: {
//   image: string;
//   className?: string;
//   label: string;
//   icon?: React.ElementType;
// }) {
//   return (
//     <div className={`group relative overflow-hidden rounded-2xl border border-border bg-surface shadow-soft ${className ?? ""}`}>
//       <img src={image} alt={label} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
//       <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl bg-background/80 px-3 py-1.5 text-xs font-medium backdrop-blur">
//         <span className="flex items-center gap-1.5">
//           {Icon && <Icon className="h-3.5 w-3.5 text-primary" />}
//           {label}
//         </span>
//         <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
//       </div>
//     </div>
//   );
// }

// /* ---------- 12. Impact ---------- */

// function Impact() {
//   const stats = [
//     { value: "62%", label: "Faster workflow completion", body: "Avg. warrant cycle dropped from 38m to 14m." },
//     { value: "−47%", label: "Fewer support tickets", body: "Self-explanatory UI reduced confusion-driven tickets." },
//     { value: "94%", label: "Task success rate", body: "Up from 71% in pre-redesign usability tests." },
//     { value: "4.7/5", label: "Operator satisfaction", body: "Across 280 surveyed officers and prosecutors." },
//   ];

//   return (
//     <section className="border-b border-border bg-surface-muted px-6 py-24">
//       <div className="mx-auto max-w-7xl">
//         <Reveal>
//           <SectionLabel>Impact</SectionLabel>
//           <h2 className="max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
//             Measurable outcomes, in the field.
//           </h2>
//         </Reveal>

//         <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
//           {stats.map((s, i) => (
//             <Reveal key={s.label} delay={i * 0.06}>
//               <div className="h-full rounded-2xl border border-border bg-background p-7 shadow-soft">
//                 <div className="font-display text-5xl tracking-tight text-foreground">{s.value}</div>
//                 <div className="mt-3 text-sm font-semibold text-foreground">{s.label}</div>
//                 <div className="mt-1.5 text-xs text-muted-foreground">{s.body}</div>
//               </div>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ---------- 13. Reflection ---------- */

// function Reflection() {
//   const items = [
//     "Designing for enterprise systems means earning trust before chasing novelty.",
//     "Operational UX is rhythm — every screen has to keep the user moving.",
//     "High-pressure workflows reward restraint; the boring choice is often the right one.",
//     "Government products live and die by compliance. Wrap rules in the UI, don't expose them.",
//     "Usability and compliance aren't trade-offs — they're the same north star, named differently.",
//   ];
//   return (
//     <section className="border-b border-border px-6 py-24">
//       <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
//         <Reveal className="lg:col-span-5">
//           <SectionLabel>Reflection</SectionLabel>
//           <h2 className="font-display text-4xl tracking-tight md:text-5xl">What I&apos;m taking forward.</h2>
//         </Reveal>
//         <Reveal delay={0.1} className="lg:col-span-7">
//           <ul className="space-y-4">
//             {items.map((t, i) => (
//               <li key={i} className="flex gap-4 rounded-2xl border border-border bg-surface p-5">
//                 <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
//                   {i + 1}
//                 </span>
//                 <span className="text-sm text-foreground">{t}</span>
//               </li>
//             ))}
//           </ul>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// /* ---------- Final CTA ---------- */

// function CTA() {
//   return (
//     <section className="px-6 py-24">
//       <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-gradient-card p-10 text-card-foreground shadow-card md:p-16">
//         <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
//         <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

//         <div className="relative grid gap-8 md:grid-cols-12 md:items-end">
//           <div className="md:col-span-8">
//             <div className="text-[10px] uppercase tracking-[0.3em] text-card-foreground/60">Next chapter</div>
//             <h2 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
//               Let&apos;s build better operational experiences.
//             </h2>
//             <p className="mt-5 max-w-xl text-card-foreground/70">
//               I partner with enterprise and GovTech teams shipping mission-critical software. If you
//               have a complex workflow worth simplifying — let&apos;s talk.
//             </p>
//           </div>
//           <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
//             <a
//               href="mailto:hello@rajvir.design"
//               className="inline-flex items-center gap-2 rounded-full bg-card-foreground px-6 py-3 text-sm font-medium text-ink"
//             >
//               Start a project <ArrowUpRight className="h-4 w-4" />
//             </a>
//             <Link
//               to="/"
//               className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-card-foreground"
//             >
//               Back to portfolio
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
