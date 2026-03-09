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
    <div>

      {/* ── Tech-Inspired Cover ── */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-secondary">
        {/* Base gradient */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(160deg, hsl(var(--secondary)) 0%, hsl(var(--accent) / 0.08) 50%, hsl(var(--muted)) 100%)`,
        }} />

        {/* Circuit board SVG pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07] text-accent" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              {/* Horizontal traces */}
              <line x1="0" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="1" />
              <line x1="45" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="1" />
              <line x1="0" y1="60" x2="25" y2="60" stroke="currentColor" strokeWidth="1" />
              <line x1="55" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="1" />
              {/* Vertical traces */}
              <line x1="40" y1="0" x2="40" y2="15" stroke="currentColor" strokeWidth="1" />
              <line x1="40" y1="25" x2="40" y2="55" stroke="currentColor" strokeWidth="1" />
              <line x1="40" y1="65" x2="40" y2="80" stroke="currentColor" strokeWidth="1" />
              <line x1="20" y1="20" x2="20" y2="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
              <line x1="60" y1="0" x2="60" y2="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
              {/* Circuit nodes */}
              <circle cx="40" cy="20" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="60" r="2" fill="currentColor" opacity="0.6" />
              <circle cx="20" cy="20" r="1.5" fill="currentColor" />
              <circle cx="60" cy="20" r="1.5" fill="currentColor" />
              <circle cx="20" cy="60" r="1.5" fill="currentColor" />
              {/* IC chip */}
              <rect x="33" y="14" width="14" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <line x1="35" y1="14" x2="35" y2="12" stroke="currentColor" strokeWidth="0.6" />
              <line x1="38" y1="14" x2="38" y2="12" stroke="currentColor" strokeWidth="0.6" />
              <line x1="41" y1="14" x2="41" y2="12" stroke="currentColor" strokeWidth="0.6" />
              <line x1="44" y1="14" x2="44" y2="12" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>

        {/* Floating binary strings */}
        <div className="absolute top-3 left-6 text-[10px] font-mono text-accent/15 animate-pulse" style={{ animationDuration: "3s" }}>01101001</div>
        <div className="absolute top-8 right-12 text-[10px] font-mono text-accent/12 animate-pulse" style={{ animationDuration: "4s" }}>10110100</div>
        <div className="absolute bottom-14 left-1/4 text-[10px] font-mono text-accent/10 animate-pulse" style={{ animationDuration: "5s" }}>{"{ design: true }"}</div>
        <div className="absolute top-5 left-1/3 text-[10px] font-mono text-accent/10 animate-pulse" style={{ animationDuration: "3.5s" }}>0xFF</div>
        <div className="absolute bottom-16 right-1/4 text-[10px] font-mono text-accent/8 animate-pulse" style={{ animationDuration: "4.5s" }}>sudo rm -rf</div>

        {/* Code syntax highlight snippet */}
        <div className="absolute top-6 right-6 text-[9px] font-mono leading-relaxed opacity-[0.06] text-foreground select-none">
          <div><span className="text-accent/30">const</span> designer = {"{"}</div>
          <div>&nbsp;&nbsp;name: <span className="text-accent/30">"Rajvir"</span>,</div>
          <div>&nbsp;&nbsp;role: <span className="text-accent/30">"UX/UI"</span>,</div>
          <div>&nbsp;&nbsp;passion: <span className="text-accent/30">∞</span></div>
          <div>{"};"}</div>
        </div>

        {/* Pulsing tech nodes */}
        <div className="absolute top-10 left-16 w-2 h-2 rounded-full bg-accent/20 animate-pulse" style={{ animationDuration: "2s" }} />
        <div className="absolute top-20 left-1/2 w-1.5 h-1.5 rounded-full bg-accent/15 animate-pulse" style={{ animationDuration: "2.5s" }} />
        <div className="absolute bottom-20 right-16 w-2.5 h-2.5 rounded-full bg-accent/10 animate-pulse" style={{ animationDuration: "3s" }} />

        {/* Fade to card */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-card" />
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
              <div key={i} className="relative p-4 rounded-sm bg-card border border-border overflow-hidden group hover:shadow-md transition-shadow">
                {/* Ornamental inner border */}
                <div className="absolute inset-[3px] rounded-sm border border-dashed border-accent/15 pointer-events-none" />
                {/* Corner ornaments */}
                <svg className="absolute top-1 left-1 w-4 h-4 text-accent/20" viewBox="0 0 16 16"><path d="M0 8 Q0 0 8 0" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                <svg className="absolute top-1 right-1 w-4 h-4 text-accent/20" viewBox="0 0 16 16"><path d="M8 0 Q16 0 16 8" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                <svg className="absolute bottom-1 left-1 w-4 h-4 text-accent/20" viewBox="0 0 16 16"><path d="M0 8 Q0 16 8 16" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                <svg className="absolute bottom-1 right-1 w-4 h-4 text-accent/20" viewBox="0 0 16 16"><path d="M8 16 Q16 16 16 8" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                {/* Seal */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full border-2 border-accent/25 flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm text-foreground truncate">{exp.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium shrink-0">{exp.type}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{exp.company}</p>
                    <div className="mx-0 mt-1.5 mb-1 w-6 h-px bg-accent/15" />
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground/70">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>
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
          <div className="grid grid-cols-2 gap-3">
            {certifications.map((cert, i) => (
              <div key={i} className="relative p-4 pt-5 rounded-sm bg-card border border-border text-center overflow-hidden group hover:shadow-md transition-shadow">
                {/* Certificate ornamental border */}
                <div className="absolute inset-[3px] rounded-sm border border-dashed border-accent/20 pointer-events-none" />
                {/* Corner ornaments */}
                <svg className="absolute top-1 left-1 w-4 h-4 text-accent/25" viewBox="0 0 16 16"><path d="M0 8 Q0 0 8 0" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                <svg className="absolute top-1 right-1 w-4 h-4 text-accent/25" viewBox="0 0 16 16"><path d="M8 0 Q16 0 16 8" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                <svg className="absolute bottom-1 left-1 w-4 h-4 text-accent/25" viewBox="0 0 16 16"><path d="M0 8 Q0 16 8 16" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                <svg className="absolute bottom-1 right-1 w-4 h-4 text-accent/25" viewBox="0 0 16 16"><path d="M8 16 Q16 16 16 8" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                {/* Ribbon/seal */}
                <div className="mx-auto w-7 h-7 rounded-full border-2 border-accent/30 flex items-center justify-center mb-2">
                  <Award className="w-3.5 h-3.5 text-accent" />
                </div>
                {/* Certificate text */}
                <p className="text-[8px] uppercase tracking-[0.15em] text-muted-foreground/50 mb-1">Certificate of Completion</p>
                <h4 className="font-semibold text-xs text-foreground leading-tight">{cert.name}</h4>
                <p className="text-[10px] text-muted-foreground mt-1.5">{cert.org}</p>
                {/* Decorative line */}
                <div className="mx-auto mt-2 mb-1.5 w-8 h-px bg-accent/20" />
                <span className="text-[10px] font-semibold text-accent">{cert.year}</span>
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
