import heroPhoto from "@/assets/hero-photo.png";
import { Award, Cpu, Palette, Server, Dumbbell, Linkedin, Twitter, Github, Instagram, Mail, Briefcase, GraduationCap } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const skills = ["UX Design", "UI Design", "Design Systems", "Product Thinking", "AI & Cloud Basics"];

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "25+", label: "Projects Delivered" },
  { value: "SaaS", label: "& Product Focus" },
];

const experiences = [
  {
    period: "Mar 2025 – Present",
    title: "Freelance UX/UI Designer",
    company: "Self-employed",
    type: "Freelance",
    points: ["Designing product interfaces for startups", "Building scalable design systems", "Creating user flows and interaction patterns"],
    skills: ["Figma", "Design Systems", "User Flows", "Prototyping"],
  },
  {
    period: "Aug 2025 – Sep 2025",
    title: "UX/UI Designer",
    company: "HummingWave Technologies Pvt. Ltd.",
    type: "Part-time",
    location: "Bangalore",
    points: ["UX improvements for product interfaces", "Interface execution and design QA", "Cross-functional collaboration with engineering"],
    skills: ["UX Research", "Interface Design", "Collaboration"],
  },
  {
    period: "May 2022 – Mar 2025",
    title: "UX/UI Designer",
    company: "FusionStack LLC",
    type: "Full-time",
    location: "Hybrid · Pune",
    points: ["Enterprise SaaS interface design", "Built interaction systems and component libraries", "Designed scalable product experiences", "Worked closely with engineering teams"],
    skills: ["SaaS", "Enterprise", "Design Systems", "Product Design"],
  },
  {
    period: "Jan 2022 – May 2022",
    title: "Freelance UX/UI Designer",
    company: "Self-employed",
    type: "Freelance",
    points: ["Designed interfaces for early-stage startups", "Rapid prototyping and user testing"],
    skills: ["Startup Design", "Prototyping", "UI Design"],
  },
];

const education = [
  { degree: "Master of Computer Applications (MCA)", institution: "Modi Institute of Management & Technology, Kota", period: "Jun 2024 – Jun 2026", skills: ["Programming", "DSA", "Cloud", "SQL", "AI/ML"] },
  { degree: "Master of Commerce (MCom)", institution: "Birla College, Kalyan", period: "Dec 2020 – May 2022", skills: [] },
  { degree: "Bachelor of Commerce (BCom)", institution: "Govt. Commerce College, Kota", period: "Apr 2017 – Apr 2020", skills: [] },
];

const certifications = [
  { title: "Google UX Design", org: "Google · Coursera", year: "2023" },
  { title: "Interaction Design Specialization", org: "UC San Diego · Coursera", year: "2023" },
  { title: "Advanced UI/UX Design", org: "Design Academy", year: "2022" },
  { title: "Responsive Web Design", org: "freeCodeCamp", year: "2022" },
];

const hobbies = [
  { icon: Cpu, title: "Exploring AI & Emerging Tech" },
  { icon: Palette, title: "UI Exploration & Trends" },
  { icon: Server, title: "Learning System Architecture" },
  { icon: Dumbbell, title: "Fitness & Discipline" },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Mail, label: "Email", href: "mailto:hello@example.com" },
];

export default function AboutPanel() {
  return (
    <div className="flex flex-col">
      {/* Cover Section */}
      <div className="relative -mx-6 -mt-6 sm:-mx-10 sm:-mt-10 overflow-hidden">
        {/* Design-related background */}
        <div className="h-48 sm:h-56 w-full relative">
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.6) 40%, hsl(var(--primary) / 0.3) 100%)
              `,
            }}
          />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--background)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--background)) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
            }}
          />
          {/* Floating design elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-8 right-12 w-20 h-20 rounded-2xl border border-background/20 rotate-12 opacity-30" />
            <div className="absolute bottom-10 right-32 w-14 h-14 rounded-full border-2 border-background/15 opacity-25" />
            <div className="absolute top-16 left-[40%] w-24 h-1 bg-background/10 rounded-full rotate-[-20deg]" />
            <div className="absolute bottom-6 left-[20%] w-10 h-10 rounded-lg border border-background/15 rotate-45 opacity-20" />
          </div>
          {/* Social links row at top */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-background/25 text-background/80 hover:text-background"
              >
                <Icon size={14} strokeWidth={1.8} />
              </a>
            ))}
          </div>
          {/* "About Me" heading */}
          <div className="absolute bottom-6 left-6 sm:left-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-background tracking-tight">About Me</h2>
          </div>
        </div>
      </div>

      {/* Profile + Intro */}
      <div className="flex flex-col sm:flex-row gap-5 items-start mt-6">
        <img
          src={heroPhoto}
          alt="Rajvir — Product UX/UI Designer"
          className="w-18 h-18 rounded-2xl object-cover border-2 border-border shadow-sm shrink-0 -mt-12 relative z-10"
        />
        <div className="pt-1">
          <h3 className="text-lg font-bold text-foreground mb-1">Designing Scalable Digital Experiences.</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            UX/UI Designer with 3+ years of experience designing SaaS and enterprise platforms. Currently pursuing MCA to strengthen technical expertise in cloud, AI, and systems.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-5 mt-5">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col">
            <span className="text-lg font-black text-accent">{s.value}</span>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mt-5">
        {skills.map((s) => (
          <span key={s} className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-border bg-secondary text-muted-foreground">
            {s}
          </span>
        ))}
      </div>

      {/* Clean Accordion sections */}
      <Accordion type="multiple" className="w-full mt-6">
        {/* Experience */}
        <AccordionItem value="experience" className="border-b border-border">
          <AccordionTrigger className="hover:no-underline py-5">
            <div className="flex items-center gap-2.5">
              <Briefcase size={15} className="text-accent" />
              <span className="text-sm font-semibold text-foreground">Experience</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-5 pb-2">
              {experiences.map((exp) => (
                <div key={exp.period + exp.company}>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[11px] font-semibold text-accent">{exp.period}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-border text-muted-foreground">{exp.type}</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground">{exp.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {exp.company}{exp.location && ` · ${exp.location}`}
                  </p>
                  <ul className="space-y-1">
                    {exp.points.map((p) => (
                      <li key={p} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {exp.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-border text-muted-foreground">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Education */}
        <AccordionItem value="education" className="border-b border-border">
          <AccordionTrigger className="hover:no-underline py-5">
            <div className="flex items-center gap-2.5">
              <GraduationCap size={15} className="text-accent" />
              <span className="text-sm font-semibold text-foreground">Education</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-5 pb-2">
              {education.map((edu) => (
                <div key={edu.degree}>
                  <span className="text-[11px] font-semibold text-accent">{edu.period}</span>
                  <h4 className="text-sm font-bold text-foreground mt-0.5">{edu.degree}</h4>
                  <p className="text-xs text-muted-foreground">{edu.institution}</p>
                  {edu.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {edu.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-border text-muted-foreground">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Certifications */}
        <AccordionItem value="certifications" className="border-b border-border">
          <AccordionTrigger className="hover:no-underline py-5">
            <div className="flex items-center gap-2.5">
              <Award size={15} className="text-accent" />
              <span className="text-sm font-semibold text-foreground">Certifications</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pb-2">
              {certifications.map((cert) => (
                <div key={cert.title}>
                  <h4 className="text-sm font-bold text-foreground">{cert.title}</h4>
                  <p className="text-xs text-muted-foreground">{cert.org}</p>
                  <span className="text-[10px] font-semibold text-accent mt-0.5 inline-block">{cert.year}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Hobbies */}
        <AccordionItem value="hobbies" className="border-none">
          <AccordionTrigger className="hover:no-underline py-5">
            <span className="text-sm font-semibold text-foreground">Beyond Work</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 pb-2">
              {hobbies.map((h) => {
                const Icon = h.icon;
                return (
                  <div key={h.title} className="flex items-center gap-2.5 py-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-accent" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{h.title}</span>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Philosophy */}
      <blockquote className="border-l-2 border-accent pl-4 py-2 mt-6">
        <p className="text-base font-bold text-foreground italic">
          "I design systems that scale — not just screens."
        </p>
      </blockquote>
    </div>
  );
}
