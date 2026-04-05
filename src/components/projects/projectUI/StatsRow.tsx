interface Stat {
  val: string;
  label: string;
}

interface StatsRowProps {
  stats: Stat[];
}

export default function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className={`grid grid-cols-${stats.length} gap-3`}>
      {stats.map((s) => (
        <div key={s.label} className="text-center p-4 rounded-xl bg-muted border border-border">
          <p className="text-lg font-extrabold text-accent">{s.val}</p>
          <p className="text-xs text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
