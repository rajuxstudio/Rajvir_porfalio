import { Lock } from "lucide-react";

interface ConfidentialityNoteProps {
  text?: string;
}

export default function ConfidentialityNote({ text = "This case study presents design contributions and workflow improvements. Specific operational data and proprietary information have been omitted for confidentiality purposes." }: ConfidentialityNoteProps) {
  return (
    <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-xl p-4 border border-border">
      <Lock size={12} className="shrink-0 mt-0.5" />
      <p>{text}</p>
    </div>
  );
}
