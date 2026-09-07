import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Gamepad2 } from "lucide-react";
import PythonCodeViewer from "./PythonCodeViewer";

/**
 * A web port of the Tkinter game in UI.py — same rules, same three choices,
 * same random.choice()-driven computer opponent, just rebuilt as a playable
 * React component instead of a static screenshot. Also ships the real source
 * of both Python files so it can be read alongside the playable version.
 *
 *   snake drinks water -> snake wins
 *   water kills gun    -> water wins
 *   gun kills snake    -> gun wins
 */

type Choice = "s" | "w" | "g";
type Outcome = "draw" | "user" | "computer";

const CHOICES: { key: Choice; label: string; emoji: string }[] = [
  { key: "s", label: "Snake", emoji: "🐍" },
  { key: "w", label: "Water", emoji: "💧" },
  { key: "g", label: "Gun", emoji: "🔫" },
];

const LABEL: Record<Choice, string> = { s: "Snake", w: "Water", g: "Gun" };
const EMOJI: Record<Choice, string> = { s: "🐍", w: "💧", g: "🔫" };

// Same three rules as snake_water_gun.py / UI.py.
const REASON: Record<string, string> = {
  "s>w": "Snake drinks the water.",
  "w>g": "Water kills the gun.",
  "g>s": "Gun kills the snake.",
};

function decide(user: Choice, computer: Choice): { outcome: Outcome; reason: string | null } {
  if (user === computer) return { outcome: "draw", reason: null };
  const userWins =
    (user === "s" && computer === "w") ||
    (user === "w" && computer === "g") ||
    (user === "g" && computer === "s");
  const winner = userWins ? user : computer;
  const loser = userWins ? computer : user;
  return { outcome: userWins ? "user" : "computer", reason: REASON[`${winner}>${loser}`] ?? null };
}

interface Round {
  user: Choice;
  computer: Choice;
  outcome: Outcome;
}

const CLI_SOURCE = `"""
Snake Water Gun Game

Rules:
snake drinks water -> snake wins
water kills gun -> water wins
gun kills snake -> gun wins
"""

import random

# Player Profile
UserName = input("username: ")
print("Player Name:", UserName)

# Mapping choices to values
characterList = {
    "s": 1,   # snake
    "w": -1,  # water
    "g": 0    # gun
}

# Input User Value
def userValue():
    user_choice = input("choose s for snake, w for water, g for gun: ")
    print("user choose:", user_choice)
    return characterList[user_choice]   # return mapped value

# Computer choice
def computerValue():
    random_choice = random.choice(list(characterList.keys()))
    print("computer choose:", random_choice)
    return characterList[random_choice]  # return mapped value

# Win/Lose logic
def win_lose():
    user = userValue()
    computer = computerValue()
    if computer == user:
        print("Match Draw!")
    elif (computer == 1 and user == -1) or (computer == -1 and user == 0) or (computer == 0 and user == 1):
        print("Computer Wins!")
    else:
        print("User Wins!")

# Run the game
win_lose()
`;

const GUI_SOURCE = `import tkinter as tk
from tkinter import messagebox
import random

# Mapping choices
characterList = {
    "s": "Snake",
    "w": "Water",
    "g": "Gun"
}

# Game logic
def play(user_choice):
    computer_choice = random.choice(list(characterList.keys()))

    # Update labels with icons/text
    user_icon.config(text=f"🧑 {characterList[user_choice]}")
    computer_icon.config(text=f"💻 {characterList[computer_choice]}")

    # Decide outcome
    if user_choice == computer_choice:
        outcome = "Match Draw!"
    elif (user_choice == "s" and computer_choice == "w") or \\
         (user_choice == "w" and computer_choice == "g") or \\
         (user_choice == "g" and computer_choice == "s"):
        outcome = "User Wins!"
    else:
        outcome = "Computer Wins!"

    result_label.config(text=outcome, fg="blue", font=("Arial", 16, "bold"))

# Tkinter window
root = tk.Tk()
root.title("Snake Water Gun Game")
root.geometry("400x400")
root.config(bg="#f0f0f0")

# Player name entry
tk.Label(root, text="Enter your name:", bg="#f0f0f0", font=("Arial", 12)).pack(pady=5)
name_entry = tk.Entry(root, font=("Arial", 12))
name_entry.pack(pady=5)

# Choices section
tk.Label(root, text="Choose your move:", bg="#f0f0f0", font=("Arial", 14, "bold")).pack(pady=10)

button_frame = tk.Frame(root, bg="#f0f0f0")
button_frame.pack(pady=10)

tk.Button(button_frame, text="🐍 Snake", width=10, command=lambda: play("s")).grid(row=0, column=0, padx=10)
tk.Button(button_frame, text="💧 Water", width=10, command=lambda: play("w")).grid(row=0, column=1, padx=10)
tk.Button(button_frame, text="🔫 Gun", width=10, command=lambda: play("g")).grid(row=0, column=2, padx=10)

# Icons for user and computer
user_icon = tk.Label(root, text="🧑 User", bg="#f0f0f0", font=("Arial", 12))
user_icon.pack(pady=5)

computer_icon = tk.Label(root, text="💻 Computer", bg="#f0f0f0", font=("Arial", 12))
computer_icon.pack(pady=5)

# Result display
result_label = tk.Label(root, text="", bg="#f0f0f0", font=("Arial", 14))
result_label.pack(pady=20)

root.mainloop()
`;

const FILES = [
  { name: "snake_water_gun.py", source: CLI_SOURCE },
  { name: "UI.py", source: GUI_SOURCE },
];

const SnakeWaterGunGame = () => {
  const [tab, setTab] = useState<"play" | "code">("play");

  const [username, setUsername] = useState("");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [reason, setReason] = useState<string | null>(null);

  const score = rounds.reduce(
    (acc, r) => ({
      user: acc.user + (r.outcome === "user" ? 1 : 0),
      computer: acc.computer + (r.outcome === "computer" ? 1 : 0),
      draw: acc.draw + (r.outcome === "draw" ? 1 : 0),
    }),
    { user: 0, computer: 0, draw: 0 },
  );
  const last = rounds[0] ?? null;
  const displayName = username.trim() || "you";

  const play = (choice: Choice) => {
    const computer = CHOICES[Math.floor(Math.random() * CHOICES.length)].key;
    const { outcome, reason } = decide(choice, computer);
    setReason(reason);
    setRounds((r) => [{ user: choice, computer, outcome }, ...r].slice(0, 6));
  };

  const reset = () => {
    setRounds([]);
    setReason(null);
  };

  // Keyboard shortcuts — s / w / g — matching the CLI's own prompt, ignored
  // while typing in the username field.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;
      const key = e.key.toLowerCase();
      if (key === "s" || key === "w" || key === "g") play(key as Choice);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-4 border-t border-border/50">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h3 className="text-lg font-bold tracking-tight text-foreground">Play It</h3>
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setTab("play")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              tab === "play" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            Play
          </button>
          <button
            type="button"
            onClick={() => setTab("code")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              tab === "code" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            View Code
          </button>
        </div>
      </div>

      {tab === "play" ? (
        <div className="overflow-hidden rounded-xl border border-border/50 bg-card">
          {/* File-name bar + reset */}
          <div className="flex items-center justify-between border-b border-border/50 px-5 py-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wide text-primary">snake_water_gun.py</span>
            <button type="button" onClick={reset} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              reset
            </button>
          </div>

          {/* Scoreboard */}
          <div className="grid grid-cols-3 divide-x divide-border/50 border-b border-border/50">
            {[
              { value: score.user, label: displayName },
              { value: score.draw, label: "draws" },
              { value: score.computer, label: "computer" },
            ].map((s) => (
              <div key={s.label} className="px-4 py-4 text-center">
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="p-5 space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5" htmlFor="swg-username">username:</label>
              <input
                id="swg-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="you"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Choices */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">choose s for snake, w for water, g for gun:</p>
              <div className="grid grid-cols-3 gap-3">
                {CHOICES.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => play(c.key)}
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md active:translate-y-0"
                  >
                    <span className="text-3xl">{c.emoji}</span>
                    <span className="text-sm font-semibold text-foreground">{c.label}</span>
                    <span className="text-[10px] text-muted-foreground">[{c.key}]</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            <AnimatePresence mode="wait">
              {last ? (
                <motion.div
                  key={rounds.length}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`rounded-xl border p-5 text-center ${
                    last.outcome === "user"
                      ? "border-emerald-500/30 bg-emerald-500/10"
                      : last.outcome === "computer"
                        ? "border-red-500/30 bg-red-500/10"
                        : "border-border bg-muted/40"
                  }`}
                >
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-3xl">{EMOJI[last.user]}</span>
                    <span className="text-xs font-bold text-muted-foreground/60">vs</span>
                    <span className="text-3xl">{EMOJI[last.computer]}</span>
                  </div>
                  <p
                    className={`mt-3 text-base font-bold ${
                      last.outcome === "user" ? "text-emerald-600 dark:text-emerald-400" : last.outcome === "computer" ? "text-red-600 dark:text-red-400" : "text-foreground"
                    }`}
                  >
                    {last.outcome === "draw" ? "Draw!" : last.outcome === "user" ? `${displayName} wins!` : "Computer wins!"}
                  </p>
                  {reason && <p className="mt-1 text-xs text-muted-foreground">{reason}</p>}
                </motion.div>
              ) : (
                <p className="rounded-xl border border-dashed border-border py-8 text-center text-xs text-muted-foreground">
                  Pick Snake, Water, or Gun — or press s / w / g — to play a round.
                </p>
              )}
            </AnimatePresence>

            {/* Recent rounds */}
            {rounds.length > 1 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">recent rounds</p>
                <div className="space-y-1.5">
                  {rounds.slice(1).map((r, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
                      <span className="flex items-center gap-2 text-sm">
                        <span>{EMOJI[r.user]}</span>
                        <span className="text-[10px] text-muted-foreground">vs</span>
                        <span>{EMOJI[r.computer]}</span>
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wide ${
                          r.outcome === "user" ? "text-emerald-600 dark:text-emerald-400" : r.outcome === "computer" ? "text-red-600 dark:text-red-400" : "text-muted-foreground"
                        }`}
                      >
                        {r.outcome === "draw" ? "draw" : r.outcome === "user" ? displayName : "computer"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <PythonCodeViewer files={FILES} />
      )}

      <p className="mt-3 text-[11px] text-muted-foreground">
        Same rules as the original <code className="font-mono">UI.py</code> Tkinter app — snake drinks water, water
        kills gun, gun kills snake — rebuilt here as a React component so you can play it right in the browser.
      </p>
    </div>
  );
};

export default SnakeWaterGunGame;
