import { GraduationCap, BookOpen, School, Award } from "lucide-react";
import TimelineCard, { type TimelineCardProps } from "@/components/TimelineCard";

const educationData: Omit<TimelineCardProps, "index" | "isLeft">[] = [
  {
    year: "Jul 2024 – Present",
    title: "MCA (Master of Computer Application)",
    subtitle: "Modi Institute of Technology",
    description:
      "Studying advanced software engineering, data structures, algorithms, web technologies, and database management systems with hands-on project-based learning.",
    type: "education",
    icon: GraduationCap,
    city: "Kota",
    skills: ["Development", "Web Design", "Innovation", "Design Systems"],
  },
  {
    year: "2020 – 2022",
    title: "M.Com (Master of Commerce)",
    subtitle: "BK Birla College",
    description:
      "Focused on advanced accounting, business analytics, financial management, and corporate governance with research methodology.",
    type: "education",
    icon: BookOpen,
    city: "Kalyan",
    skills: ["User Research", "Innovation", "Creative"],
  },
  {
    year: "2017 – 2020",
    title: "B.Com (Bachelor of Commerce)",
    subtitle: "Government Commerce College",
    description:
      "Built a strong foundation in accounting, economics, business law, and taxation with practical exposure to financial tools.",
    type: "education",
    icon: Award,
    city: "Kota",
    skills: ["Innovation", "Creative"],
  },
  {
    year: "2017",
    title: "12th Grade – Science (PCM)",
    subtitle: "Rajasthan Board of Secondary Education",
    description:
      "Completed senior secondary with Physics, Chemistry, and Mathematics, developing strong analytical and problem-solving skills.",
    type: "education",
    icon: School,
    skills: ["Innovation"],
  },
];

export default function EducationTimeline() {
  return (
    <section id="education" className="w-full max-w-5xl mx-auto px-4 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-display">
          Education
        </h2>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-px w-16 bg-border" />
          <GraduationCap className="w-5 h-5 text-muted-foreground" />
          <div className="h-px w-16 bg-border" />
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
        <div className="space-y-12">
          {educationData.map((item, i) => (
            <TimelineCard key={i} {...item} index={i} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
