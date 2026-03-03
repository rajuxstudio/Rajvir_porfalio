import { User, MapPin, Mail, Linkedin, Github, Twitter, Instagram, Clock, FolderOpen, Users, Briefcase, Award, Cpu, Palette, Server, Dumbbell, GraduationCap } from "lucide-react";
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

/* ── Component ── */

const AboutPanel = () => {
  return (
    <div className="-mx-8 -mt-10 sm:-mx-8 sm:-mt-10">

      {/* ── Cover ── */}
      <div className="relative h-40 sm:h-48 overflow-hidden bg-secondary">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 0.5px, transparent 0)",
          backgroundSize: "24px 24px",
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" style={{ top: "50%" }} />
        {/* Social links in cover */}
        <div className="absolute top-4 right-5 flex gap-2">
          {socialLinks.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
              className="w-8 h-8 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all duration-200">
              <s.icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </div>

      {/* ── Profile ── */}
      <div className="relative -mt-14 px-6 sm:px-8">
        <div className="flex items-end gap-4">
          <div className="w-24 h-24 rounded-2xl bg-card border-4 border-card shadow-lg flex items-center justify-center shrink-0">
            <User className="w-10 h-10 text-muted-foreground" />
          </div>
          <div className="pb-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight leading-tight">Your Name</h1>
            <p className="text-muted-foreground text-sm">UX/UI Designer · Product Thinker</p>
            <div className="flex items-center gap-1 text-muted-foreground text-xs mt-0.5">
              <MapPin className="w-3 h-3" />
              <span>India</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="px-6 sm:px-8 mt-6 pb-8 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center py-3">
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
              {skill}
            </span>
          ))}
        </div>

        {/* Accordion sections */}
        <Accordion type="multiple" className="w-full">

          {/* Experience */}
          <AccordionItem value="experience" className="border-border">
            <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-accent" />
                Experience
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-4">
                {experiences.map((exp, i) => (
                  <div key={i} className="relative pl-4 border-l-2 border-border">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-medium text-sm">{exp.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{exp.type}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {exp.company}{exp.location && `, ${exp.location}`} · {exp.period}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-accent/40 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {exp.skills.map((s) => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Education */}
          <AccordionItem value="education" className="border-border">
            <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-accent" />
                Education
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3">
                {education.map((edu, i) => (
                  <div key={i} className="pl-4 border-l-2 border-border">
                    <h3 className="font-medium text-sm">{edu.degree}</h3>
                    <p className="text-xs text-muted-foreground">{edu.institution} · {edu.period}</p>
                    {edu.skills && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {edu.skills.map((s) => (
                          <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Certifications */}
          <AccordionItem value="certifications" className="border-border">
            <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                Certifications
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {certifications.map((cert, i) => (
                  <div key={i} className="p-3 rounded-xl bg-secondary/50">
                    <h3 className="font-medium text-xs">{cert.name}</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{cert.org} ({cert.year})</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Hobbies */}
          <AccordionItem value="hobbies" className="border-b-0">
            <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-accent" />
                Beyond Work
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="grid grid-cols-2 gap-2">
                {hobbies.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/50">
                    <h.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-xs font-medium">{h.label}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  );
};

export default AboutPanel;
