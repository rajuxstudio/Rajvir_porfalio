import { useState } from "react";
import {
  User,
  MessageCircle,
  Palette,
  Code,
  ArrowUp,
} from "lucide-react";
import ContactFormDialog from "./ContactFormDialog";
import SidePanel from "./SidePanel";
import AboutPanel from "./AboutPanel";
import ProjectListPanel from "./ProjectListPanel";

type PanelType = "about" | "design" | "code" | null;

type ActionItem = {
  icon: React.ElementType;
  label: string;
  panel?: PanelType;
  onClick?: () => void;
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export default function QuickActionPanel() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelType>(null);

  const actions: ActionItem[] = [
    { icon: User,          label: "About",       panel: "about" },
    { icon: MessageCircle, label: "Let's Chat",  onClick: () => setContactOpen(true) },
    { icon: Palette,       label: "Design",      panel: "design" },
    { icon: Code,          label: "Code",         panel: "code" },
  ];

  const resolvedActions = actions.map((a) => ({
    ...a,
    onClick: a.panel ? () => setActivePanel(a.panel!) : a.onClick,
  }));

  const panelTitles: Record<string, string> = {
    about: "About Me",
    design: "Design Projects",
    code: "Development Projects",
  };

  return (
    <>
      <ContactFormDialog open={contactOpen} onClose={() => setContactOpen(false)} />

      <SidePanel
        open={!!activePanel}
        onClose={() => setActivePanel(null)}
        title={activePanel ? panelTitles[activePanel] : ""}
      >
        {activePanel === "about" && <AboutPanel />}
        {activePanel === "design" && <ProjectListPanel filterType="design" />}
        {activePanel === "code" && <ProjectListPanel filterType="code" />}
      </SidePanel>

      {/* ── Desktop: fixed left panel ── */}
      <aside
        className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-1 py-3 px-1.5"
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderLeft: "none",
          borderRadius: "0 12px 12px 0",
          boxShadow: "4px 0 24px hsl(var(--foreground) / 0.06)",
        }}
      >
        {resolvedActions.map(({ icon: Icon, label, onClick }) => (
          <div key={label} className="relative group flex items-center">
            {activeTooltip === label && (
              <div
                className="absolute left-full ml-3 whitespace-nowrap text-xs font-medium px-2.5 py-1 rounded-md pointer-events-none z-50 animate-fade-in"
                style={{
                  background: "hsl(var(--foreground))",
                  color: "hsl(var(--background))",
                }}
              >
                {label}
                <span
                  className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent"
                  style={{ borderRightColor: "hsl(var(--foreground))" }}
                />
              </div>
            )}

            <button
              onClick={onClick}
              onMouseEnter={() => setActiveTooltip(label)}
              onMouseLeave={() => setActiveTooltip(null)}
              aria-label={label}
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 outline-none focus-visible:ring-2"
              style={
                {
                  color: activeTooltip === label
                    ? "hsl(var(--accent))"
                    : "hsl(var(--muted-foreground))",
                  background: activeTooltip === label
                    ? "hsl(var(--accent) / 0.10)"
                    : "transparent",
                  "--tw-ring-color": "hsl(var(--ring))",
                } as React.CSSProperties
              }
            >
              <Icon size={17} strokeWidth={1.8} />
            </button>
          </div>
        ))}

        {/* Divider + scroll-to-top */}
        <div className="w-5 my-1" style={{ height: "1px", background: "hsl(var(--border))" }} />
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          onMouseEnter={() => setActiveTooltip("Back to top")}
          onMouseLeave={() => setActiveTooltip(null)}
          className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 outline-none focus-visible:ring-2"
          style={
            {
              color: activeTooltip === "Back to top"
                ? "hsl(var(--accent))"
                : "hsl(var(--muted-foreground))",
              background: activeTooltip === "Back to top"
                ? "hsl(var(--accent) / 0.10)"
                : "transparent",
              "--tw-ring-color": "hsl(var(--ring))",
            } as React.CSSProperties
          }
        >
          <ArrowUp size={17} strokeWidth={1.8} />
        </button>
      </aside>

      {/* ── Mobile: fixed bottom bar ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2"
        style={{
          background: "hsl(var(--card))",
          borderTop: "1px solid hsl(var(--border))",
          boxShadow: "0 -4px 24px hsl(var(--foreground) / 0.07)",
        }}
      >
        {resolvedActions.map(({ icon: Icon, label, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            aria-label={label}
            className="flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-200 active:scale-90"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            <Icon size={18} strokeWidth={1.7} />
            <span className="text-[9px] font-medium tracking-wide">{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
