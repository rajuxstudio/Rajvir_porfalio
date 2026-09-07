import { Gamepad2 } from "lucide-react";
import type { Project } from "@/components/development/data/projects/project";
import SnakeWaterGunGame from "@/components/development/games/SnakeWaterGunGame";
import SnakeWaterGunIntro from "@/components/development/games/SnakeWaterGunIntro";
import coverImage from "@/assets/devIcon/snake-water-gun-cover.svg";

const snakeWaterGun: Project = {
  slug: "snake-water-gun",
  title: "Snake Water Gun",
  date: "Edited 4 Sep 2026",
  tag: "Python",
  role: "Python Developer",
  image: coverImage,
  icon: Gamepad2,
  info: {
    what: "A Python implementation of Snake, Water, Gun — a Rock-Paper-Scissors variant popular in India — playable either from the terminal or through a Tkinter GUI, against a randomly-choosing computer opponent.",
    howItWorks: [
      "Player picks Snake, Water, or Gun — via terminal input in the CLI version, or by clicking a button in the GUI version",
      "The computer picks randomly from the same three options using random.choice()",
      "Snake drinks Water, Water short-circuits Gun, Gun kills Snake — those three rules decide the winner",
      "The GUI version shows both picks with emoji and updates the result live, with no need to rerun the script",
    ],
    codeExplanation: [
      "snake_water_gun.py (CLI): maps each choice to a numeric value (snake=1, water=-1, gun=0) and compares the two picks with a single conditional to decide the outcome",
      "UI.py (GUI): rebuilds the same three rules as string comparisons, triggered by three tkinter.Button commands instead of input()",
      "Both versions share the same characterList mapping and random.choice(list(characterList.keys())) logic for the computer's move",
    ],
    howToRun: [
      "git clone <this-repo>",
      "python snake_water_gun.py   # terminal version",
      "python UI.py                # Tkinter GUI version",
    ],
    howToTry: [
      "Play it right below — same rules as UI.py, rebuilt as a React component.",
    ],
    techStack: ["Python", "Tkinter", "random (stdlib)"],
    mockups: [],
  },
  customContent: SnakeWaterGunGame,
  customIntro: SnakeWaterGunIntro,
};

export default snakeWaterGun;
