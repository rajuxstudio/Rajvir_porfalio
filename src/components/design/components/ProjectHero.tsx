import { motion } from "framer-motion";
import {
  ShieldCheck, Users, Zap, Building2, Briefcase, Scale, Landmark,
  Layout as LayoutIcon, Layers, Workflow, Gauge, FileWarning,
  AlertTriangle, Search, PenTool, Palette, TestTube2, Repeat,
  Sparkles, CheckCircle2, Smartphone, MonitorSmartphone, Type,
} from "lucide-react";
import type { IconName } from "@/types/project";

const iconMap: Record<IconName, React.ElementType> = {
  shield: ShieldCheck, users: Users, zap: Zap, building: Building2,
  briefcase: Briefcase, scale: Scale, landmark: Landmark,
  layout: LayoutIcon, layers: Layers, workflow: Workflow, gauge: Gauge,
  fileWarning: FileWarning, alert: AlertTriangle, search: Search,
  pen: PenTool, palette: Palette, testTube: TestTube2, repeat: Repeat,
  sparkles: Sparkles, check: CheckCircle2, smartphone: Smartphone,
  monitor: MonitorSmartphone, type: Type,
};

interface FloatingStat {
  icon: IconName;
  label: string;
  value: string;
}

interface ProjectHeroProps {
  image: string;
  title: string;
  floatingStats?: FloatingStat[];
}

const positions = [
  "left-4 top-6 md:left-10 md:top-10",
  "right-4 top-6 md:right-10 md:top-16",
  "left-4 bottom-6 md:left-12 md:bottom-12",
  "right-4 bottom-6 md:right-12 md:bottom-16",
];

const ProjectHero = ({ image, title, floatingStats }: ProjectHeroProps) => (
  <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden bg-gradient-to-br from-primary/20 via-primary/5 to-background">
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover  opacity-90"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
    {floatingStats?.map((s, i) => {
      const C = iconMap[s.icon];
      return (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
          className={`absolute hidden md:block ${positions[i] ?? positions[0]}`}
        >
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/95 p-3 pr-5 shadow-xl backdrop-blur">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-muted">
              <C className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
              <div className="text-sm font-semibold">{s.value}</div>
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
);

export default ProjectHero;
