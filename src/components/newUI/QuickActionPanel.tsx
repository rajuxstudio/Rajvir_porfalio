import {
  Home,
  Palette,
  Code,
  User,
  ArrowUp,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

type ActionItem = {
  icon: React.ElementType;
  label: string;
  path: string;
};

const scrollToTop = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });

export default function QuickActionPanel() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 NAV ITEMS
  const actions: ActionItem[] = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Palette, label: "Design", path: "/design" },
    { icon: Code, label: "Dev", path: "/dev" },
    { icon: User, label: "Profile", path: "/about" },
  ];

  // 🔹 ACTIVE TAB
  const isActive = (path: string) => location.pathname === path;

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
        className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-2 p-2 backdrop-blur-xl rounded-2xl border border-border/50 shadow-xl"
        style={{ background: "hsl(var(--card) / 0.6)" }}
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
                style={{
                  color: active
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground))",
                }}
              >
                {renderIcon(icon, active)}
              </button>
            </div>
          );
        })}

        {/* Divider */}
        <div className="w-6 h-[1px] bg-border my-1" />

        {/* Scroll */}
        <button
          onClick={scrollToTop}
          className="w-11 h-11 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
        >
          <ArrowUp size={18} />
        </button>
      </aside>

      {/* ───────── MOBILE ───────── */}
      <nav className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <div
          className="flex items-center gap-2 px-2 py-2 rounded-full border border-border/50 shadow-lg backdrop-blur-xl"
          style={{ background: "hsl(var(--card) / 0.9)" }}
        >
          {actions.map(({ icon, label, path }) => {
            const active = isActive(path);

            return (
              <button
                key={label}
                onClick={() => handleClick(path)}
                className={`flex items-center justify-center transition-all duration-300 active:scale-95
                  ${active ? "px-4 py-2" : "w-10 h-10"}`}
                style={{
                  color: active
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground))",
                }}
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