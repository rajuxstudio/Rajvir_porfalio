import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Code2,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { CERTS, type CertificateCategory } from "@/lib/certificates";

type Filter = "all" | CertificateCategory;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "design", label: "Design" },
  { key: "dev", label: "Dev" },
];

const CATEGORY_THEME: Record<CertificateCategory, { gradient: string; icon: LucideIcon; label: string }> = {
  dev: { gradient: "from-blue-500/20 to-cyan-500/10", icon: Code2, label: "Dev" },
  design: { gradient: "from-fuchsia-500/20 to-violet-500/10", icon: Palette, label: "Design" },
};

export default function Certifications() {
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState(0);

  const filtered = useMemo(
    () => (filter === "all" ? CERTS : CERTS.filter((c) => c.category === filter)),
    [filter],
  );

  const changeFilter = (f: Filter) => {
    setFilter(f);
    setIndex(0);
  };

  const next = () => setIndex((i) => (i + 1) % filtered.length);
  const prev = () => setIndex((i) => (i - 1 + filtered.length) % filtered.length);

  const item = filtered[index];
  const theme = item ? CATEGORY_THEME[item.category] : null;
  const Icon = theme?.icon ?? Code2;

  return (
    <section className="mx-auto max-w-3xl px-6 py-6 sm:py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Certifications
          </p>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            Always <span className="italic text-primary">learning.</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 rounded-full border border-border bg-muted/50 p-1">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => changeFilter(f.key)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                  filter === f.key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filtered.length > 1 && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:bg-accent"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:bg-accent"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {item && theme ? (
        <>
          <AnimatePresence mode="wait">
            <motion.article
              key={filter + item.title}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-[28px] border border-border bg-card p-8 shadow-xl sm:p-10"
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background/80 text-primary ring-1 ring-border">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.org}</p>
                      <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        Verified · {theme.label}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">Issued {item.issued}</span>
                </div>

                <h3 className="mt-8 max-w-xl text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-xl leading-7 text-muted-foreground">{item.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-background/60 px-3 py-1 text-sm text-foreground/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href={item.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground transition hover:scale-105"
                >
                  Show Credential
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-6 flex justify-center gap-2">
            {filtered.map((c, i) => (
              <button
                key={c.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${c.title}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No certificates in this category yet.
        </p>
      )}
    </section>
  );
}
