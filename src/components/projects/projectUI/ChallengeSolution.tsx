interface ChallengeSolutionProps {
  challenge: string;
  solution: string;
  gradient?: string;
}

export default function ChallengeSolution({ challenge, solution, gradient }: ChallengeSolutionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="rounded-xl p-5 bg-muted border border-border">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Challenge</h4>
        <p className="text-sm text-foreground">{challenge}</p>
      </div>
      {gradient ? (
        <div className="rounded-xl p-5 text-white" style={{ background: gradient }}>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Solution</h4>
          <p className="text-sm">{solution}</p>
        </div>
      ) : (
        <div className="rounded-xl p-5 bg-muted border border-border">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Solution</h4>
          <p className="text-sm text-foreground">{solution}</p>
        </div>
      )}
    </div>
  );
}
