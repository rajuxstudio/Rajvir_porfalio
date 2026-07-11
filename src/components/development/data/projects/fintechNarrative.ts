import type { Project } from "./project";

const fintechNarrative: Project = {
  slug: "fintech-narrative",
  title: "Fintech Narrative",
  date: "Edited 2 Feb 2026",
  tag: "React",
  role: "Full Stack Developer",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  avatar: "https://i.pravatar.cc/40?img=4",
  info: {
    what: "A financial storytelling platform that transforms complex market data into engaging, visual narratives for investors and analysts.",
    howItWorks: [
      "Connect financial data sources via API",
      "AI generates narrative summaries",
      "Interactive charts visualize trends",
      "Share reports with stakeholders",
    ],
    codeExplanation: [
      "React with D3.js for data visualization",
      "OpenAI API for narrative generation",
      "Express.js backend for data aggregation",
    ],
    howToRun: [
      "git clone https://github.com/example/fintech-narrative",
      "npm install",
      "npm run dev",
    ],
    howToTry: [
      "Visit fintech-narrative.app and connect a demo data source to see AI-generated market stories.",
    ],
    techStack: ["React", "D3.js", "Node.js", "OpenAI API"],
    mockups: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800",
    ],
  },
};

export default fintechNarrative;
