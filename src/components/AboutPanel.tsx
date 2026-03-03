import { User, MapPin, Mail, Linkedin, Github, Twitter, Instagram, Clock, FolderOpen, Users, Briefcase, Award, Cpu, Palette, Server, Dumbbell, GraduationCap, Building2, Calendar } from "lucide-react";

/* ── Data ── */

const socialLinks = [
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn", color: "bg-[#0A66C2]" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter", color: "bg-[#1DA1F2]" },
  { href: "https://github.com", icon: Github, label: "GitHub", color: "bg-foreground" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram", color: "bg-[#E4405F]" },
  { href: "mailto:hello@example.com", icon: Mail, label: "Email", color: "bg-accent" },
];

const stats = [
  { icon: Clock, label: "Years Exp.", value: "3+" },
  { icon: FolderOpen, label: "Projects", value: "25+" },
  { icon: Users, label: "Clients", value: "15+" },
  { icon: Briefcase, label: "Companies", value: "4" },
];

const skills = [
  "UX Design", "UI Design", "Design Systems", "Product Thinking", "Figma",
  "Prototyping", "User Research", "AI & Cloud",
];

const experiences = [
  {
    title: "Freelance UX/UI Designer",
    company: "Self-employed",
    period: "Mar 2025 – Present",
    type: "Freelance",
  },
  {
    title: "UX/UI Designer",
    company: "HummingWave Technologies",
    period: "Aug 2025 – Sep 2025",
    type: "Part-time",
  },
  {
    title: "UX/UI Designer",
    company: "FusionStack LLC",
    period: "May 2022 – Mar 2025",
    type: "Full-time",
  },
  {
    title: "Freelance UX/UI Designer",
    company: "Self-employed",
    period: "Jan 2022 – May 2022",
    type: "Freelance",
  },
];

const education = [
  {
    degree: "Master of Computer Applications",
    institution: "Modi Institute, Kota",
    period: "2024 – 2026",
    skills: ["Cloud", "AI/ML", "DSA"],
  },
  {
    degree: "Master of Commerce",
    institution: "Birla College, Kalyan",
    period: "2020 – 2022",
  },
  {
    degree: "Bachelor of Commerce",
    institution: "Govt. Commerce College, Kota",
    period: "2017 – 2020",
  },
];

const certifications = [
  { name: "Google UX Design", org: "Google · Coursera", year: "2023" },
  { name: "Interaction Design", org: "UC San Diego", year: "2023" },
  { name: "Advanced UI/UX", org: "Design Academy", year: "2022" },
  { name: "Responsive Web Design", org: "freeCodeCamp", year: "2022" },
];

const hobbies = [
  { icon: Cpu, label: "AI & Emerging Tech" },
  { icon: Palette, label: "Design Trends" },
  { icon: Server, label: "System Architecture" },
  { icon: Dumbbell, label: "Fitness" },
];

/* ── Component ── */

const AboutPanel = () => {
  return (
    <div className="-mx-8 -mt-10 sm:-mx-8 sm:-mt-10">

      {/* ── Gradient Cover ── */}
      <div className="relative h-44 sm:h-52 overflow-hidden">
        {/* Layered gradient background */}
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(135deg, 
              hsl(var(--accent)) 0%, 
              hsl(260 70% 55%) 30%, 
              hsl(280 60% 50%) 60%, 
              hsl(var(--accent)) 100%
            )`,
        }} />
        {/* Wave overlay */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: "60px" }}>
          <path d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z" fill="hsl(var(--card))" />
        </svg>
        {/* Decorative circles */}
        <div className="absolute top-6 right-10 w-20 h-20 rounded-full border border-white/10" />
        <div className="absolute top-12 right-20 w-32 h-32 rounded-full border border-white/5" />
        <div className="absolute -bottom-4 left-10 w-16 h-16 rounded-full bg-white/5" />
      </div>

      {/* ── Centered Avatar ── */}
      <div className="relative -mt-16 flex justify-center z-10">
        <div className="w-28 h-28 rounded-full bg-card border-4 border-card shadow-xl flex items-center justify-center ring-4 ring-accent/20">
          <User className="w-12 h-12 text-muted-foreground" />
        </div>
      </div>

      {/* ── Profile Info ── */}
      <div className="text-center mt-4 px-6">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Rajvir</h1>
        <p className="text-sm text-muted-foreground mt-1">Product UX/UI Designer</p>
        <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs mt-2">
          <MapPin className="w-3.5 h-3.5 text-accent" />
          <span>India</span>
        </div>
      </div>

      {/* ── Social Links ── */}
      <div className="flex justify-center gap-3 mt-5">
        {socialLinks.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
            className={`w-9 h-9 rounded-full ${s.color} flex items-center justify-center text-white shadow-sm hover:scale-110 hover:shadow-md transition-all duration-200`}>
            <s.icon className="w-4 h-4" />
          </a>
        ))}
      </div>

      {/* ── Stats Row ── */}
      <div className="mx-6 sm:mx-8 mt-6 grid grid-cols-4 gap-2 rounded-2xl bg-secondary/60 p-3">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center py-2">
            <stat.icon className="w-4 h-4 mx-auto text-accent mb-1" />
            <p className="text-lg font-bold text-foreground leading-none">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="px-6 sm:px-8 mt-6 pb-8 space-y-6">

        {/* Skills */}
        <div>
          <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border/50">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3 flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-accent" />
            Experience
          </h3>
          <div className="space-y-3">
            {experiences.map((exp, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/40 hover:bg-secondary/70 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm text-foreground truncate">{exp.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium shrink-0">{exp.type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{exp.company}</p>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground/70 mt-1">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3 flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-accent" />
            Education
          </h3>
          <div className="space-y-3">
            {education.map((edu, i) => (
              <div key={i} className="p-3 rounded-xl bg-secondary/40 hover:bg-secondary/70 transition-colors">
                <h4 className="font-medium text-sm text-foreground">{edu.degree}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{edu.institution}</p>
                <p className="text-[11px] text-muted-foreground/70 mt-1">{edu.period}</p>
                {edu.skills && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {edu.skills.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{s}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3 flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-accent" />
            Certifications
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {certifications.map((cert, i) => (
              <div key={i} className="p-3 rounded-xl bg-secondary/40 hover:bg-secondary/70 transition-colors text-center">
                <h4 className="font-medium text-xs text-foreground leading-tight">{cert.name}</h4>
                <p className="text-[10px] text-muted-foreground mt-1">{cert.org}</p>
                <span className="inline-block mt-1.5 text-[10px] font-semibold text-accent">{cert.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div>
          <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3 flex items-center gap-2">
            <Palette className="w-3.5 h-3.5 text-accent" />
            Beyond Work
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {hobbies.map((h, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/40 hover:bg-secondary/70 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <h.icon className="w-4 h-4 text-accent" />
                </div>
                <span className="text-xs font-medium text-foreground">{h.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPanel;
