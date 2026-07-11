import { Award, BookOpen, GraduationCap, School } from "lucide-react";

export interface InfoCard {
  id: string;
  icon: typeof GraduationCap;
  stat: string;
  statLabel: string;
  title: string;
  description: string;
}

export const infoCards: InfoCard[] = [
  {
    id: "certificates",
    icon: Award,
    stat: "5+",
    statLabel: "Certifications",
    title: "Certified Skills",
    description: "Continuously learning and earning certifications in design and development.",
  },
  {
    id: "projects",
    icon: GraduationCap,
    stat: "20+",
    statLabel: "Projects",
    title: "Portfolio Projects",
    description: "Full-stack projects across design, development, and product management.",
  },
  {
    id: "experience",
    icon: BookOpen,
    stat: "3+",
    statLabel: "Years",
    title: "Work Experience",
    description: "Professional experience in UX/UI design and frontend development.",
  },
  {
    id: "education",
    icon: School,
    stat: "4",
    statLabel: "Degrees",
    title: "Educational Background",
    description: "Strong foundation in commerce and computer science education.",
  },
];
