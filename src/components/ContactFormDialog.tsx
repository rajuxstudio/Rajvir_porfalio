import { useState } from "react";
import { X, Send, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";

type ContactFormDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactFormDialog({ open, onClose }: ContactFormDialogProps) {
  const [formData, setFormData] = useState({ name: "", email: "", service: "", details: "" });
  const isMobile = useIsMobile();

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
        Tell me a bit about your project — I'll get back with clarity, timelines, and next steps.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: "hsl(var(--foreground))" }}>Name</label>
          <Input placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required maxLength={100} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: "hsl(var(--foreground))" }}>Email</label>
          <Input type="email" placeholder="you@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required maxLength={255} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium" style={{ color: "hsl(var(--foreground))" }}>Service Needed</label>
        <Input placeholder="e.g. Web Design, Branding" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} maxLength={200} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium" style={{ color: "hsl(var(--foreground))" }}>Project Details</label>
        <Textarea placeholder="Share your project vision..." value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} className="min-h-[100px] resize-none" maxLength={1000} />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
        style={{ background: "linear-gradient(135deg, hsl(var(--accent)), hsl(280 80% 60%))", color: "white" }}
      >
        <Send size={15} /> Send Request
      </button>
      <p className="text-xs text-center" style={{ color: "hsl(var(--muted-foreground))" }}>Or reach out directly via email</p>
    </form>
  );

  // ── Mobile: Bottom Sheet ──
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col justify-end">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      {/* Close button above the sheet */}
      <div className="relative z-10 flex justify-center mb-3">
        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md" style={{ background: "hsl(var(--card) / 0.8)", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }} aria-label="Close">
          <X size={18} />
        </button>
      </div>
      <div
          className="relative z-10 w-full rounded-t-2xl p-6 pb-8 animate-slide-up max-h-[85vh] overflow-y-auto"
          style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderBottom: "none" }}
        >
          {/* Drag handle */}
          <div className="flex justify-center mb-4">
            <div className="w-10 h-1 rounded-full" style={{ background: "hsl(var(--border))" }} />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold" style={{ color: "hsl(var(--accent))" }}>Let's Chat</h2>
          </div>
          <div className="flex gap-4 text-xs mb-5" style={{ color: "hsl(var(--foreground))" }}>
            <span className="flex items-center gap-1.5"><Phone size={12} style={{ color: "hsl(var(--muted-foreground))" }} /> +91 80058 83696</span>
            <span className="flex items-center gap-1.5"><Mail size={12} style={{ color: "hsl(var(--muted-foreground))" }} /> rajuxstudio@gmail.com</span>
          </div>
          {formContent}
        </div>
      </div>
    );
  }

  // ── Desktop: Left Side Panel ──
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      {/* Close button on the left border */}
      <button
        onClick={onClose}
        className="absolute z-20 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
        style={{ right: "calc(100vw - 100vw / 1.618 + 12px)", color: "hsl(var(--muted-foreground))", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", boxShadow: "0 2px 12px hsl(var(--foreground) / 0.1)" }}
        aria-label="Close"
      >
        <X size={16} />
      </button>
      <div
        className="relative z-10 h-full animate-slide-left overflow-y-auto"
        style={{ width: "calc(100vw - 100vw / 1.618)", background: "hsl(var(--card))", borderLeft: "1px solid hsl(var(--border))", boxShadow: "-8px 0 30px hsl(var(--foreground) / 0.08)" }}
      >

        <div className="p-8 pt-10 flex flex-col gap-8 h-full">
          {/* Header */}
          <div>
            <h2 className="text-4xl font-extrabold leading-tight mb-3" style={{ color: "hsl(var(--accent))" }}>
              Ready<br />to get<br />started?
            </h2>
            <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
              All project details shared through this form are reviewed personally.
            </p>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-2 text-sm" style={{ color: "hsl(var(--foreground))" }}>
            <span className="flex items-center gap-2"><Phone size={14} style={{ color: "hsl(var(--muted-foreground))" }} /> +91 80058 83696</span>
            <span className="flex items-center gap-2"><Mail size={14} style={{ color: "hsl(var(--muted-foreground))" }} /> rajuxstudio@gmail.com</span>
          </div>

          {/* Form */}
          {formContent}
        </div>
      </div>
    </div>
  );
}
