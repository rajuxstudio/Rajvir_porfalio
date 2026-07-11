import { lazy, Suspense, useState } from "react";
import ThemeToggle from "@/components/newUI/ThemeToggle";
import { MessageCircle } from "lucide-react";
import ContactFormDialog from "@/components/home/ContactFormDialog";

const Globe3D = lazy(() => import("@/components/newUI/Globe3D"));

// 🔹 Logo
const RLogo = () => (
  <div className="flex items-start gap-0 relative" aria-label="Website logo">
    <svg
      width="28"
      height="40"
      viewBox="0 0 50 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4.16663C28.3005 4.16663 48 23.8661 48 48.1666V95.8333H4V4.16663Z"
        fill="currentColor"
      />
    </svg>

    <Suspense fallback={<div style={{ width: 18, height: 18 }} />}>
      <Globe3D size={18} />
    </Suspense>
  </div>
);

// 🔹 Header
export default function Header() {
  // ✅ Chat state inside Header
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      {/* ✅ Chat Modal */}
      <ContactFormDialog
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-3">
        
        <RLogo />

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* ✅ Chat Button */}
          <button
            onClick={() => setContactOpen(true)}
            className="p-2 rounded-full bg-secondary/60 backdrop-blur-sm border border-border hover:bg-secondary transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Open chat"
          >
            <MessageCircle className="w-5 h-5 text-primary" />
          </button>
        </div>

      </header>
    </>
  );
}