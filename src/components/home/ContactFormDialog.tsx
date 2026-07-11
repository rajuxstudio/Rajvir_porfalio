import { useState } from "react";
import { X, Send, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";

type ContactFormDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactFormDialog({
  open,
  onClose,
}: ContactFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    details: "",
  });

  const isMobile = useIsMobile();

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const formFields = (
    <>
      <p className="text-sm text-muted-foreground">
        Tell me a bit about your project — I'll get back with clarity,
        timelines, and next steps.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <Input
          placeholder="Your name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
        />
        <Input
          type="email"
          placeholder="you@email.com"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
      </div>

      <Input
        placeholder="e.g. Web Design, Branding"
        value={formData.service}
        onChange={(e) =>
          setFormData({ ...formData, service: e.target.value })
        }
      />

      <Textarea
        placeholder="Share your project vision..."
        value={formData.details}
        onChange={(e) =>
          setFormData({ ...formData, details: e.target.value })
        }
        className="min-h-[100px] resize-none"
      />

      <Button
        type="submit"
        className="w-full"
      >
        <Send size={15} /> Send Request
      </Button>
    </>
  );

  // ── MOBILE ──
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col justify-end">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Close */}
        <div className="relative z-10 flex justify-center mb-3">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full border bg-card"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sheet */}
        <div className="relative z-10 mx-6 mb-6 rounded-2xl p-6 pb-8 bg-card border max-h-[90vh] overflow-y-auto">

          {/* Drag */}
          <div className="flex justify-center mb-4">
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>

          {/* ✅ MOBILE HEADING ADDED */}
          <h2 className="text-3xl font-extrabold leading-tight mb-4">
            Let’s build something <br />
            <span   className="
    px-4 py-1 rounded-lg inline-block rotate-[-2deg]
    text-white font-semibold
    bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
    shadow-[0_4px_20px_rgba(168,85,247,0.5)]
  ">
              insanely cool ✦
            </span>
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {formFields}

            {/* Bottom Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Button asChild variant="default" className="w-full">
                <a href="tel:+918005883696">
                  <Phone size={16} /> Call
                </a>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <a href="mailto:rajuxstudio@gmail.com">
                  <Mail size={16} /> Email
                </a>
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ── DESKTOP ──
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* ✅ FIXED CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="fixed top-6 right-[calc(min(520px,_100vw-100vw/1.618)+16px)] z-20 w-10 h-10 flex items-center justify-center rounded-full border bg-card shadow-md"
      >
        <X size={16} />
      </button>

      {/* Panel */}
      <div
        className="relative z-10 h-full overflow-y-auto border-l bg-card"
        style={{
          width: "min(520px, calc(100vw - 100vw / 1.618))",
        }}
      >
        <div className="p-8 pt-10 flex flex-col gap-8">

          <h2 className="text-5xl font-extrabold leading-tight">
            Let’s build something <br />
            <span className="
    px-4 py-1 rounded-lg inline-block rotate-[-2deg]
    text-white font-semibold
    bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
    shadow-[0_4px_20px_rgba(168,85,247,0.5)]
  ">
              insanely cool ✦
            </span>
          </h2>

          <div className="flex flex-col gap-2 text-sm">
            <span className="flex items-center gap-2">
              <Phone size={14} /> +91 80058 83696
            </span>
            <span className="flex items-center gap-2">
              <Mail size={14} /> rajuxstudio@gmail.com
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {formFields}
          </form>
        </div>
      </div>
    </div>
  );
}