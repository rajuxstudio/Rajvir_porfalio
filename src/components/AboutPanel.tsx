import { User, MapPin, Mail, Linkedin, Github, Twitter, Instagram, Clock, FolderOpen, Users, Briefcase, Award, Cpu, Palette, Server, Dumbbell, GraduationCap, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ── Data ── */

const socialLinks = [
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "mailto:hello@example.com", icon: Mail, label: "Email" },
];

const stats = [
  { icon: Clock, label: "Years Experience", value: "3+" },
  { icon: FolderOpen, label: "Projects Done", value: "25+" },
  { icon: Users, label: "Clients", value: "15+" },
  { icon: Briefcase, label: "Companies", value: "4" },
];

const skills = [
  "UX Design", "UI Design", "Design Systems", "Product Thinking", "AI & Cloud Basics",
];

const experiences = [
  {
    title: "Freelance UX/UI Designer",
    company: "Self-employed",
    period: "Mar 2025 – Present",
    type: "Freelance",
    bullets: ["Designed product interfaces for startups", "Built scalable design systems", "Created user flows and interaction patterns"],
    skills: ["Figma", "Design Systems", "User Flows", "Prototyping"],
  },
  {
    title: "UX/UI Designer",
    company: "HummingWave Technologies Pvt. Ltd.",
    location: "Bangalore",
    period: "Aug 2025 – Sep 2025",
    type: "Part-time",
    bullets: ["Improved UX for product interfaces", "Executed interface design and conducted design QA", "Collaborated cross-functionally with engineering teams"],
    skills: ["UX Research", "Interface Design", "Collaboration"],
  },
  {
    title: "UX/UI Designer",
    company: "FusionStack LLC",
    location: "Pune (Hybrid)",
    period: "May 2022 – Mar 2025",
    type: "Full-time",
    bullets: ["Designed enterprise SaaS interfaces", "Built interaction systems and component libraries", "Created scalable product experiences", "Worked closely with engineering teams"],
    skills: ["SaaS", "Enterprise", "Design Systems", "Product Design"],
  },
  {
    title: "Freelance UX/UI Designer",
    company: "Self-employed",
    period: "Jan 2022 – May 2022",
    type: "Freelance",
    bullets: ["Designed interfaces for early-stage startups", "Conducted rapid prototyping and user testing"],
    skills: ["Startup Design", "Prototyping", "UI Design"],
  },
];

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Modi Institute of Management & Technology, Kota",
    period: "Jun 2024 – Jun 2026",
    skills: ["Programming", "DSA", "Cloud", "SQL", "AI/ML"],
  },
  {
    degree: "Master of Commerce (MCom)",
    institution: "Birla College, Kalyan",
    period: "Dec 2020 – May 2022",
  },
  {
    degree: "Bachelor of Commerce (BCom)",
    institution: "Govt. Commerce College, Kota",
    period: "Apr 2017 – Apr 2020",
  },
];

const certifications = [
  { name: "Google UX Design", org: "Google · Coursera", year: "2023" },
  { name: "Interaction Design Specialization", org: "UC San Diego · Coursera", year: "2023" },
  { name: "Advanced UI/UX Design", org: "Design Academy", year: "2022" },
  { name: "Responsive Web Design", org: "freeCodeCamp", year: "2022" },
];

const hobbies = [
  { icon: Cpu, label: "Exploring AI & Emerging Technologies" },
  { icon: Palette, label: "UI Exploration & Design Trends" },
  { icon: Server, label: "Learning System Architecture" },
  { icon: Dumbbell, label: "Fitness & Discipline" },
];

/* ── Page ── */

const Index = () => {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Cover + Profile Header ── */}
      <div className="relative">
        <div className="relative w-full h-[50vh] min-h-[320px] max-h-[480px] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 50%, hsl(var(--accent)) 100%)",
          }}
        >
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--accent-foreground)) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" style={{ top: "40%" }} />
        </div>

        <div className="relative -mt-32 z-10 max-w-2xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-full bg-card border-4 border-card shadow-xl flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Your Name</h1>
            <p className="text-muted-foreground text-lg mt-2">UX/UI Designer · Product Thinker</p>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-2">
              <MapPin className="w-4 h-4" />
              <span>India</span>
            </div>
            <div className="flex gap-3 mt-5">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent hover:scale-110 transition-all duration-200">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="max-w-[680px] mx-auto px-5 mt-10 pb-20">

        {/* Stats */}
        <section className="golden-section">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card rounded-2xl p-5 text-center border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="mx-auto w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="golden-section">
          <h2 className="text-xl font-semibold mb-5 text-center">Professional Skills</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <span key={skill} className="px-4 py-2 rounded-full bg-badge text-badge-foreground text-sm font-medium transition-all hover:scale-105 hover:shadow-sm cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="golden-section">
          <h2 className="text-xl font-semibold mb-5 text-center">Professional Experience</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {experiences.map((exp, i) => (
              <AccordionItem key={i} value={`exp-${i}`} className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <div className="flex flex-col items-start text-left gap-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-sm">{exp.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{exp.type}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {exp.company}{exp.location && `, ${exp.location}`} · {exp.period}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <ul className="space-y-1.5">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.skills.map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{s}</span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Education */}
        <section className="golden-section">
          <h2 className="text-xl font-semibold mb-5 text-center">Education</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {education.map((edu, i) => (
              <AccordionItem key={i} value={`edu-${i}`} className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-9 h-9 rounded-xl bg-teal/10 flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{edu.degree}</h3>
                      <p className="text-xs text-muted-foreground">{edu.institution} · {edu.period}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  {edu.skills ? (
                    <div className="flex flex-wrap gap-1.5 ml-12">
                      {edu.skills.map((s) => (
                        <span key={s} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{s}</span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground ml-12">Completed successfully.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Certifications */}
        <section className="golden-section">
          <h2 className="text-xl font-semibold mb-6 text-center">Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <div key={i} className="bg-card rounded-2xl p-5 border border-border shadow-sm flex items-start gap-3 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-coral" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{cert.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{cert.org} ({cert.year})</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hobbies */}
        <section className="golden-section">
          <h2 className="text-xl font-semibold mb-5 text-center">Hobbies & Interests</h2>
          <div className="grid grid-cols-2 gap-3">
            {hobbies.map((h, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <h.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{h.label}</span>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Index;
