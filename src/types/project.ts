export interface ProjectInfo {
  what: string;
  howItWorks: string[];
  codeExplanation: string[];
  howToRun: string[];
  howToTry: string[];
  techStack: string[];
  mockups: string[];
  caseStudy?: CaseStudy;
}

export type IconName =
  | "shield"
  | "users"
  | "zap"
  | "building"
  | "briefcase"
  | "scale"
  | "landmark"
  | "layout"
  | "layers"
  | "workflow"
  | "gauge"
  | "fileWarning"
  | "alert"
  | "search"
  | "pen"
  | "palette"
  | "testTube"
  | "repeat"
  | "sparkles"
  | "check"
  | "smartphone"
  | "monitor"
  | "type";

export interface IconItem {
  icon: IconName;
  label: string;
  body?: string;
}

export interface CaseStudy {
  badge?: string;
  headline: string;
  headlineAccent?: string;
  intro: string;
  heroImage: string;
  floatingStats?: { icon: IconName; label: string; value: string }[];
  meta: { label: string; value: string }[];
  about: {
    label: string;
    title: string;
    description: string;
    ecosystem: IconItem[];
    screens?: { image: string; alt: string }[];
    partners?: string[];
  };
  problem: {
    title: string;
    items: IconItem[];
    auditSummary?: { value: string; label: string };
    beforeImage?: string;
    quote?: { text: string; attribution: string };
  };
  roles: {
    title: string;
    items: IconItem[];
  };
  challenges: {
    title: string;
    items: IconItem[];
  };
  process: {
    title: string;
    steps: IconItem[];
    boardImage?: string;
  };
  beforeAfter?: {
    title: string;
    beforeImage: string;
    afterImage: string;
    improvements: string[];
  };
  designSystem?: {
    title: string;
    swatches: { name: string; hex: string }[];
    typography: { size: string; sample: string }[];
    statuses: { label: string; tone: "amber" | "emerald" | "rose" | "sky" }[];
  };
  workflow?: {
    title: string;
    steps: IconItem[];
    metrics: string[];
  };
  gallery?: { image: string; label: string; icon?: IconName; span?: string }[];
  impact?: {
    title: string;
    stats: { value: string; label: string; body: string }[];
  };
  reflection?: {
    title: string;
    items: string[];
  };
}

export interface Project {
  slug: string;
  title: string;
  tag: string;
  category: "build" | "design";
  role: string;
  date: string;
  image: string;
  avatar: string;
  info: ProjectInfo;
}
