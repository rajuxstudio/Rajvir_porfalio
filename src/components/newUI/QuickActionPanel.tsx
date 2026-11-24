import {
  Home,
  Palette,
  Code,
  User,
  ArrowUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

type ActionItem = {
  icon: React.ElementType;
  label: string;
  path: string;
};

const scrollToTop = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });

/**
 * glass="dark": transparent dark-glass look for dark scenes (the 3D room); the default is the
 * site's light card glass.
 */
export default function QuickActionPanel({ glass }: { glass?: "dark" } = {}) {
  const dark = glass === "dark";
  const panelBg = dark ? "rgba(14, 15, 19, 0.28)" : "hsl(var(--card) / 0.6)";
  const mobileBg = dark ? "rgba(14, 15, 19, 0.4)" : "hsl(var(--card) / 0.9)";
  const panelBorder = dark ? "border-white/15" : "border-border/50";
  const iconColor = (active: boolean) =>
    dark
      ? active ? "#ffffff" : "rgba(255,255,255,0.6)"
      : active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))";
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Scroll-to-top button only appears once the page has been scrolled
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // 🔹 NAV ITEMS
  const actions: ActionItem[] = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Palette, label: "Design", path: "/design" },
    { icon: Code, label: "Dev", path: "/dev" },
    { icon: User, label: "Profile", path: "/about" },
  ];

  // 🔹 ACTIVE TAB (the 3D room is the Profile section's second view, so it lights Profile too)
  const isActive = (path: string) =>
    location.pathname === path || (path === "/about" && location.pathname === "/room");

  // 🔹 CLICK
  const handleClick = (path: string) => {
    navigate(path);
    scrollToTop();
  };

  // 🔥 ICON (color comes from parent)
  const renderIcon = (
    Icon: React.ElementType,
    active: boolean,
    strokeWidth = 1.5
  ) => (
    <Icon
      size={18}
      strokeWidth={strokeWidth}
      fill={active ? "currentColor" : "none"}
      className="transition-all duration-300"
    />
  );

  return (
    <>
      {/* ───────── DESKTOP ───────── */}
      <aside
        className={`hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-2 p-2 backdrop-blur-xl backdrop-saturate-150 rounded-2xl border ${panelBorder} shadow-xl`}
        style={{ background: panelBg }}
      >
        {actions.map(({ icon, label, path }) => {
          const active = isActive(path);

          return (
            <div key={label} className="relative group flex items-center">
              {/* Tooltip */}
              <div
                className="absolute left-full ml-3 px-3 py-1.5 text-xs rounded-md whitespace-nowrap
                transition-all duration-200 pointer-events-none bg-foreground text-background
                opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              >
                {label}
              </div>

              {/* Button */}
              <button
                onClick={() => handleClick(path)}
                className="w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
                style={{ color: iconColor(active) }}
              >
                {renderIcon(icon, active)}
              </button>
            </div>
          );
        })}

        {scrolled && (
          <>
            {/* Divider */}
            <div className="w-6 h-[1px] bg-border my-1" />

            {/* Scroll */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-11 h-11 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 animate-fade-in"
            >
              <ArrowUp size={18} />
            </button>
          </>
        )}
      </aside>

      {/* ───────── MOBILE ───────── */}
      <nav className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <div
          className={`flex items-center gap-2 px-2 py-2 rounded-full border ${panelBorder} shadow-lg backdrop-blur-xl`}
          style={{ background: mobileBg }}
        >
          {actions.map(({ icon, label, path }) => {
            const active = isActive(path);

            return (
              <button
                key={label}
                onClick={() => handleClick(path)}
                className={`flex items-center justify-center transition-all duration-300 active:scale-95
                  ${active ? "px-4 py-2" : "w-10 h-10"}`}
                style={{ color: iconColor(active) }}
              >
                {renderIcon(icon, active, 1.8)}

                {active && (
                  <span className="ml-2 text-sm font-medium">
                    {label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Gesture bar */}
        <div className="mt-2 flex justify-center">
          <div className="w-24 h-1.5 rounded-full bg-muted-foreground/30" />
        </div>
      </nav>
    </>
  );
}