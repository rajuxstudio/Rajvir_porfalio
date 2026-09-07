import type { Project } from "@/components/development/data/projects/project";
import snakeWaterGun from "./snakeWaterGun";

export const projects: Project[] = [
  snakeWaterGun,
];

export const tags = [...new Set(projects.map((p) => p.tag))];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
