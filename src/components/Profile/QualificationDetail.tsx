import { QUALIFICATIONS } from "@/lib/qualifications";

export default function QualificationDetail() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          Education
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-neutral-900 sm:text-4xl">
          Academic <span className="italic text-blue-600">journey.</span>
        </h2>
      </div>

      <ol className="relative border-l border-neutral-200 pl-6">
        {QUALIFICATIONS.map((q) => {
          const Icon = q.icon;
          return (
            <li key={q.degree} className="mb-8 last:mb-0">
              <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-white ring-1 ring-neutral-200">
                <Icon className="h-4 w-4 text-blue-700" strokeWidth={2} />
              </span>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-lg font-semibold text-neutral-900">
                  {q.degree}
                </h3>
                <span className="text-sm text-neutral-500">{q.field}</span>
                {q.current && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-100">
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                    Now
                  </span>
                )}
              </div>
              <div className="mt-0.5 text-xs text-neutral-500">
                {q.institution} · {q.years}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {q.description}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}