import type { Project } from "@/components/design/projects/types";
import warmFlow from "./warmFlow";
import cloudGavel from "./cloudGavel";
import bumperMandi from "./bumperMandi";
import echelonConstructors from "./echelonConstructors";
import lenss from "./lenss";
import utilityPlus from "./utilityPlus";
import caraStone from "./caraStone";

export const projects: Project[] = [
  cloudGavel,
  bumperMandi,
  echelonConstructors,
  lenss,
  utilityPlus,
  caraStone,
];

export const tags = [...new Set(projects.map((p) => p.tag))];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
