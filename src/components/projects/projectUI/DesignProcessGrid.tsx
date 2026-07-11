import { ReactNode } from "react";

interface ProcessStep {
  icon: ReactNode;
  title: string;
}

interface DesignProcessGridProps {
  title?: string;
  steps: ProcessStep[];
}

export default function DesignProcessGrid({ title = "Design Thinking Approach", steps }: DesignProcessGridProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-muted border border-border">
            <span className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              {item.icon}
            </span>
            <p className="text-xs font-semibold text-foreground leading-tight">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
