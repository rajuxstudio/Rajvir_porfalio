import type { Project } from "@/components/design/projects/project_design";
import warmFlow from "./warm-flow";
import cloudGavel from "./cloudGavel";

export const projects: Project[] = [
  cloudGavel,
];

export const tags = [...new Set(projects.map((p) => p.tag))];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
