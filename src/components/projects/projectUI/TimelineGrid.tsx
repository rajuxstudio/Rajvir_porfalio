interface TimelineStep {
  step: string;
  title: string;
  desc: string;
}

interface TimelineGridProps {
  title?: string;
  steps: TimelineStep[];
}

export default function TimelineGrid({ title = "How It Works", steps }: TimelineGridProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {steps.map((t) => (
          <div key={t.step} className="flex items-start gap-4 p-4 rounded-xl bg-muted border border-border">
            <span className="text-2xl font-black text-accent/30">{t.step}</span>
            <div>
              <p className="text-sm font-semibold text-foreground">{t.title}</p>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
