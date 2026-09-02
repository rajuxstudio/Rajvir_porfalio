import { useRef, useState, MouseEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, LayoutGrid, Palette, Sparkles, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "Understanding the problem, audience, and product vision.",
    Icon: Compass,
  },
  {
    num: "02",
    title: "Architect",
    desc: "Structuring flows, systems, and user journeys with clarity.",
    Icon: LayoutGrid,
  },
  {
    num: "03",
    title: "Craft",
    desc: "Designing interfaces, interactions, and visual language.",
    Icon: Palette,
  },
  {
    num: "04",
    title: "Refine",
    desc: "Improving usability, consistency, accessibility, and details.",
    Icon: Sparkles,
  },
  {
    num: "05",
    title: "Launch",
    desc: "Delivering scalable experiences ready for development and growth.",
    Icon: Rocket,
  },
];

const ProcessCard = ({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 1,
    });
  };

  const { Icon } = step;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, opacity: 0 }))}
      className="group relative rounded-2xl p-px overflow-hidden bg-gradient-to-b from-border/80 to-border/20 hover:from-primary/40 hover:to-primary/0 transition-all duration-500"
    >
      <div className="relative h-full rounded-2xl bg-card/60 backdrop-blur-xl border border-transparent p-6 md:p-7 overflow-hidden">
        {/* Cursor-follow glow */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glow.opacity * 0.6,
            background: `radial-gradient(280px circle at ${glow.x}% ${glow.y}%, hsl(var(--primary) / 0.18), transparent 60%)`,
          }}
        />

        <div className="relative flex items-center justify-between mb-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground tabular-nums">
            Step {step.num}
          </span>
          <div className="w-9 h-9 rounded-xl border border-border/60 bg-background/40 backdrop-blur flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/40 transition-colors">
            <Icon className="w-4 h-4" />
          </div>
        </div>

        <div className="relative">
          <div className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground/10 leading-none mb-3 select-none">
            {step.num}
          </div>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-2">
            {step.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {step.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function HowIDesign() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative px-6 md:px-12 lg:px-20 py-28 md:py-36"
    >
      {/* Soft ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Sticky heading */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-6 px-3 py-1 rounded-full border border-border/60 bg-card/40 backdrop-blur"
            >
              Design Process
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] text-foreground mb-6"
            >
              How I<br />Design
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base text-muted-foreground max-w-md leading-relaxed"
            >
              Transforming ideas into scalable digital experiences through
              strategy, systems, and visual storytelling.
            </motion.p>
          </div>
        </div>

        {/* Process steps */}
        <div className="lg:col-span-8 relative">
          {/* Animated connector line (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px overflow-hidden">
            <div className="absolute inset-0 bg-border/40" />
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: "top" }}
              className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-transparent"
            />
          </div>

          <div className="space-y-6 md:space-y-8">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`md:grid md:grid-cols-2 md:gap-10 items-center ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <ProcessCard step={step} index={i} />
                <div className="hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
