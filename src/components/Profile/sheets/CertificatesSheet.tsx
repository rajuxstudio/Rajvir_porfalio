// "Certifications" bottom sheet: every certificate at once in a grid (no carousel), filterable
// by category with counts. Each card links to its online credential when one exists.
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, CheckCircle2, Code2, ExternalLink, FileCheck2, Palette, type LucideIcon } from "lucide-react";
import { CERTS, type CertificateCategory } from "@/lib/certificates";
import { SectionLabel, SkillChips, StatRow } from "./SheetParts";

type Filter = "all" | CertificateCategory;

const CATEGORY: Record<CertificateCategory, { label: string; icon: LucideIcon; tile: string }> = {
  dev: { label: "Dev", icon: Code2, tile: "from-sky-500 to-blue-600" },
  design: { label: "Design", icon: Palette, tile: "from-fuchsia-500 to-violet-600" },
};

const verifiable = (url: string) => !!url && url !== "#";

export default function CertificatesSheet() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = useMemo(() => (filter === "all" ? CERTS : CERTS.filter((c) => c.category === filter)), [filter]);
  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: CERTS.length },
    ...(Object.keys(CATEGORY) as CertificateCategory[]).map((k) => ({ key: k, label: CATEGORY[k].label, count: CERTS.filter((c) => c.category === k).length })),
  ];
  const years = CERTS.map((c) => Number(c.year)).filter(Boolean);

  return (
    <div>
      <StatRow
        stats={[
          { label: "Certificates", value: String(CERTS.length), icon: Award },
          { label: "Verifiable online", value: String(CERTS.filter((c) => verifiable(c.verifyUrl)).length), icon: CheckCircle2 },
          { label: "Latest", value: String(Math.max(...years)), icon: FileCheck2 },
        ]}
      />

      <SectionLabel
        aside={
          <div className="flex gap-1 rounded-full border border-border bg-muted/50 p-1" role="tablist" aria-label="Filter certificates">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                  filter === f.key ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
                <span className={`rounded-full px-1.5 text-[10px] ${filter === f.key ? "bg-background/20" : "bg-muted"}`}>{f.count}</span>
              </button>
            ))}
          </div>
        }
      >
        Credentials
      </SectionLabel>

      <motion.ul layout className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((c) => {
            const cat = CATEGORY[c.category];
            const Icon = cat.icon;
            return (
              <motion.li
                key={c.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col rounded-2xl border border-border/70 bg-card p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.tile} text-sm font-bold text-white shadow-sm`}>
                      {c.issuer.charAt(0)}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{c.issuer}</div>
                      <div className="text-xs text-muted-foreground">Issued {c.issued}</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    <Icon className="h-3 w-3" />
                    {cat.label}
                  </span>
                </div>

                <h4 className="mt-4 text-lg font-semibold leading-snug text-foreground">{c.title}</h4>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{c.description}</p>

                <div className="mt-4">
                  <SkillChips skills={c.skills} />
                </div>

                <div className="mt-auto pt-5">
                  {verifiable(c.verifyUrl) ? (
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Verify credential
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <FileCheck2 className="h-4 w-4" />
                      Credential on file
                    </span>
                  )}
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
