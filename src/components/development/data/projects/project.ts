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
  avatar: string;
  info: ProjectInfo;
}
