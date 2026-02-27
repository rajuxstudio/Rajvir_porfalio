import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Github, Instagram, Mail } from "lucide-react";

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Mail, label: "Email", href: "mailto:hello@example.com" },
];

export default function AboutCTA() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="py-24 sm:py-32 px-6 bg-background">
      <div
        className="max-w-2xl mx-auto text-center rounded-2xl border border-border bg-card p-10 sm:p-14 shadow-sm"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Let's build meaningful products.
        </h2>
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed max-w-md mx-auto">
          Always open to conversations about product design, systems thinking, or collaboration opportunities.
        </p>

        {/* Social links */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-accent"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              <Icon size={16} strokeWidth={1.8} />
            </a>
          ))}
        </div>

        <Button
          className="rounded-full px-8 py-6 text-base font-semibold shadow-md hover:scale-[1.03] transition-transform duration-200"
          style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}
        >
          Schedule a Conversation
        </Button>
      </div>
    </section>
  );
}
