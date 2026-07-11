import type { Project } from "@/components/development/data/projects/project";
const warmFlow: Project = {
  slug: "warm-flow",
  title: "Warm Flow Interactive",
  date: "Edited 16 Feb 2026",
  tag: "Next",
  role: "Frontend Developer",
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  avatar: "https://i.pravatar.cc/40?img=2",
  info: {
    what: "An interactive onboarding flow builder that lets product teams create warm, engaging user experiences without writing code.",
    howItWorks: [
      "Drag and drop to build onboarding steps",
      "Customize animations and transitions",
      "Preview flows in real-time",
      "Deploy with a single click",
    ],
    codeExplanation: [
      "Next.js for server-side rendering and API routes",
      "Framer Motion for smooth animations",
      "Zustand for lightweight state management",
    ],
    howToRun: [
      "git clone https://github.com/example/warm-flow",
      "npm install",
      "npm run dev",
    ],
    howToTry: [
      "Check out the builder at warmflow.io and create your first onboarding flow.",
    ],
    techStack: ["Next.js", "Framer Motion", "Zustand", "Tailwind CSS"],
    mockups: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800",
    ],
  },
};

export default warmFlow;
