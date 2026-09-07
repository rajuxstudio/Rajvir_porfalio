const RULES = [
  { winner: "🐍", loser: "💧", text: "Snake drinks water → snake wins" },
  { winner: "💧", loser: "🔫", text: "Water kills gun → water wins" },
  { winner: "🔫", loser: "🐍", text: "Gun kills snake → gun wins" },
];

const SnakeWaterGunIntro = () => (
  <div>
    <p className="text-sm md:text-base leading-relaxed text-indigo-600 dark:text-indigo-400">
      A twist on Rock Paper Scissors with three moves — Snake, Water, Gun. You pick one, the computer picks one at
      random, and the rules decide the round:
    </p>

    <div className="mt-5 space-y-3">
      {RULES.map((r) => (
        <div
          key={r.text}
          className="flex items-center gap-4 rounded-xl border border-border/50 bg-card px-5 py-4"
        >
          <span className="flex shrink-0 items-center gap-1.5 text-xl">
            <span>{r.winner}</span>
            <span>{r.loser}</span>
          </span>
          <span className="text-sm font-medium text-foreground">{r.text}</span>
        </div>
      ))}
    </div>

    <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
      How It Works
    </p>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
      Each choice maps to a number — snake = 1, water = -1, gun = 0 — so a single comparison chain decides the
      winner. The original ran in the terminal; the second version used Tkinter buttons and labels. The browser
      version below uses the exact same logic.
    </p>
  </div>
);

export default SnakeWaterGunIntro;
