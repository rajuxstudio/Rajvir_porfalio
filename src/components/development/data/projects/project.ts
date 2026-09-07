import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

export interface ProjectInfo {
  what: string;
  howItWorks: string[];
  codeExplanation: string[];
  howToRun: string[];
  howToTry: string[];
  techStack: string[];
  mockups: string[];
}

export interface Project {
  slug: string;
  title: string;
  tag: string;
  role: string;
  date: string;
  image: string;
  /** Card badge icon — shown instead of a person avatar since these are solo
   *  code projects, not client work with a stakeholder to credit. */
  icon: LucideIcon;
  info: ProjectInfo;
  /** Renders in place of the Mockups gallery when set — e.g. a playable
   *  web port of the project instead of a static screenshot. */
  customContent?: ComponentType;
  /** Renders in place of the generic Description + How It Works blocks when set. */
  customIntro?: ComponentType;
}
