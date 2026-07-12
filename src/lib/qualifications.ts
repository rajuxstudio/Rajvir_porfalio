import { GraduationCap, Award, BookOpen, School, type LucideIcon } from "lucide-react";

export type Qualification = {
  degree: string;
  field: string;
  years: string;
  institution: string;
  description: string;
  icon: LucideIcon;
  current?: boolean;
};

export const QUALIFICATIONS: Qualification[] = [
  {
    degree: "MCA",
    field: "Master of Computer Applications",
    years: "2024 – 26",
    institution: "Bharati Vidyapeeth University",
    description:
      "Advanced coursework in software engineering, data structures, cloud computing and modern web systems.",
    icon: GraduationCap,
    current: true,
  },
  {
    degree: "M.Com",
    field: "Master of Commerce",
    years: "2020 – 22",
    institution: "University of Pune",
    description:
      "Specialised in advanced accounting, business strategy and financial management.",
    icon: Award,
  },
  {
    degree: "B.Com",
    field: "Bachelor of Commerce",
    years: "2017 – 20",
    institution: "University of Pune",
    description:
      "Foundation in accounting, economics, business law and taxation.",
    icon: BookOpen,
  },
  {
    degree: "12th",
    field: "Higher Secondary — Commerce",
    years: "2017",
    institution: "Maharashtra State Board",
    description: "Higher secondary schooling with a commerce specialisation.",
    icon: School,
  },
];
