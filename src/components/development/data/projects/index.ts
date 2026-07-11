import type { Project } from "@/components/development/data/projects/project";
import fintechNarrative from "./fintechNarrative";
import warmFlow from "./warm-flow";

export const projects: Project[] = [
  fintechNarrative,
  warmFlow,
];

export const tags = [...new Set(projects.map((p) => p.tag))];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
