import { useEffect, useState } from "react";
import { Box, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

/** True while any dialog / drawer / modal is open on the page (Radix, vaul, or our own role="dialog" popups). */
function useAnyDialogOpen() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const check = () => setOpen(!!document.querySelector('[role="dialog"]:not([data-state="closed"]), [role="alertdialog"]:not([data-state="closed"])'));
    check();
    const mo = new MutationObserver(check);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-state", "role"] });
    return () => mo.disconnect();
  }, []);
  return open;
}

type View = "page" | "room";

const VIEWS: { id: View; label: string; path: string; Icon: typeof Box }[] = [
  { id: "page", label: "Page", path: "/about", Icon: FileText },
  { id: "room", label: "Room", path: "/room", Icon: Box },
];

// warm the 3D room's code while the visitor hovers "Room", so the switch feels instant
const preloadRoom = () => {
  void import("@/pages/RoomPage");
};

/**
 * Segmented "Page | Room" switch for the Profile section, pinned top-centre. The profile can be
 * viewed as the regular web page (/about) or as the explorable 3D room (/room).
 */
export default function ProfileViewSwitch({ current, glass }: { current: View; glass?: "dark" }) {
  const navigate = useNavigate();
  const dark = glass === "dark";
  const hidden = useAnyDialogOpen(); // step out of the way while a popup is open
  return (
    <div
      className={`fixed left-1/2 top-3 z-[60] -translate-x-1/2 transition-all duration-200 ${hidden ? "pointer-events-none -translate-y-2 opacity-0" : "opacity-100"}`}
      role="tablist"
      aria-label="Profile view"
      aria-hidden={hidden || undefined}
    >
      <div
        className={`flex items-center gap-1 rounded-full border p-1 shadow-lg backdrop-blur-xl ${
          dark ? "border-white/15 bg-[rgba(14,15,19,0.28)] backdrop-saturate-150" : "border-border/60 bg-card/80"
        }`}
      >
        {VIEWS.map(({ id, label, path, Icon }) => {
          const active = id === current;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={active}
              onClick={() => !active && navigate(path)}
              onMouseEnter={id === "room" ? preloadRoom : undefined}
              onFocus={id === "room" ? preloadRoom : undefined}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 sm:px-4 sm:py-1.5 sm:text-sm ${
                dark
                  ? active
                    ? "bg-white/90 text-[#14161c] shadow"
                    : "text-white/65 hover:text-white"
                  : active
                    ? "bg-foreground text-background shadow"
                    : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={15} strokeWidth={1.8} className="hidden sm:block" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
