interface TechStackSectionProps {
  stack: string[];
}

export default function TechStackSection({ stack }: TechStackSectionProps) {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Tech Stack</h4>
      <div className="flex flex-wrap gap-2">
        {stack.map((t) => (
          <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-background text-foreground border border-border">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
