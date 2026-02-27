import { Monitor, Palette, Zap, Moon, Smartphone as Responsive, Mail } from "lucide-react";

const highlights = [
  { icon: <Palette size={16} />, label: "3D Carousel" },
  { icon: <Zap size={16} />, label: "Smooth Animations" },
  { icon: <Moon size={16} />, label: "Dark/Light Theme" },
  { icon: <Responsive size={16} />, label: "Responsive" },
  { icon: <Mail size={16} />, label: "Contact Form" },
];

const techStack = ["React", "TypeScript", "Tailwind CSS", "Framer Motion"];

export default function ReactPortfolioDetail() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-accent/15 text-accent">Web Development</span>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground">Personal / Creative</span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        A beautifully crafted developer portfolio showcasing projects, skills, and experience with smooth animations and an interactive 3D carousel.
      </p>

      {/* Visual highlight banner */}
      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #F472B6 100%)" }}>
        <p className="text-lg font-bold text-white mb-1">Custom-Built, Not Templated</p>
        <p className="text-sm text-white/80">Every element hand-crafted for a unique developer identity.</p>
      </div>

      {/* Highlights */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-3">Highlights</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {highlights.map((h) => (
            <div key={h.label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted border border-border text-center">
              <span className="text-accent">{h.icon}</span>
              <span className="text-xs font-medium text-foreground">{h.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-muted text-foreground border border-border">
          <Monitor size={14} /> Web
        </span>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-background text-foreground border border-border">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
