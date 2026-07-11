import { CheckCircle2 } from "lucide-react";

interface OutcomeSectionProps {
  outcomes: string[];
}

export default function OutcomeSection({ outcomes }: OutcomeSectionProps) {
  return (
    <div className="rounded-xl p-6 text-center" style={{
      background: "linear-gradient(135deg, hsl(var(--accent) / 0.08) 0%, hsl(var(--muted)) 100%)",
    }}>
      <h3 className="text-lg font-bold text-foreground mb-4">Outcome</h3>
      <div className="flex flex-col gap-2 max-w-md mx-auto">
        {outcomes.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 size={14} className="text-accent shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
