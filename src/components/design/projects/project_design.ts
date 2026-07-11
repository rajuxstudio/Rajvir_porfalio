export type TechStackItem = string | { name: string; icon: string };

import type { ComponentType } from "react";

export interface ProjectInfo {
  what: string;
  howItWorks: string[];
  codeExplanation: string[];
  howToRun: string[];
  howToTry: string[];
  techStack: TechStackItem[];
  mockups: string[];
  link: { name: string; link: string }[];
  Reflection: string[];
  floatingStats: { icon: string; label: string; value: string }[];
  meta: { label: string; value: string }[];
  impacts: { value: string; label: string; body: string }[];
  challenges: { icon: ComponentType<any>; title: string; body: string }[];
}

export interface Project {
  avatar: string;
  slug: string;
  title: string;
  tag: string;
  role: string;
  date: string;
  image: string;
  logo: string;
  info: ProjectInfo;
}
