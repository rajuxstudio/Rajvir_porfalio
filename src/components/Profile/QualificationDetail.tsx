import { motion } from "framer-motion";
import { QUALIFICATIONS } from "@/lib/qualifications";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function QualificationDetail() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-6 sm:py-10">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Education
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
          Academic <span className="italic text-primary">journey.</span>
        </h2>
      </div>

      <motion.ol
        variants={container}
        initial="hidden"
        animate="show"
        className="relative space-y-5 border-l border-border pl-6"
      >
        {QUALIFICATIONS.map((q) => {
          const Icon = q.icon;
          return (
            <motion.li
              variants={item}
              key={q.degree}
              className="relative rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="absolute -left-[34px] top-5 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background">
                <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
              </span>

              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-lg font-semibold text-foreground">{q.degree}</h3>
                <span className="text-sm text-muted-foreground">{q.field}</span>
                {q.current && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-wider text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-300">
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                    Now
                  </span>
                )}
              </div>

              <div className="mt-0.5 text-xs text-muted-foreground">
                {q.institution} · {q.years}
              </div>

              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                {q.description}
              </p>
            </motion.li>
          );
        })}
      </motion.ol>
    </section>
  );
}
