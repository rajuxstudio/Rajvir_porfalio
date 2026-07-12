
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { CERTS } from "@/lib/certificates";

export default function Certifications() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % CERTS.length);
  const prev = () =>
    setIndex((i) => (i - 1 + CERTS.length) % CERTS.length);

  const item = CERTS[index];

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="uppercase tracking-[0.3em] text-xs text-muted-foreground">
            Certifications
          </p>
          <h2 className="text-5xl font-bold mt-2">
            Always <span className="italic text-primary">Learning.</span>
          </h2>
        </div>

        <div className="flex gap-3">
          <button
            onClick={prev}
            className="h-11 w-11 rounded-full border hover:bg-accent transition"
          >
            <ChevronLeft className="mx-auto h-5 w-5" />
          </button>

          <button
            onClick={next}
            className="h-11 w-11 rounded-full border hover:bg-accent transition"
          >
            <ChevronRight className="mx-auto h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={index}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-[32px] border bg-card shadow-xl p-10"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.accent} pointer-events-none`}
          />

          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{item.issuer}</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-xs uppercase tracking-wider">
                    Verified Certificate
                  </span>
                </div>
              </div>

              <span className="text-sm text-muted-foreground">
                Issued {item.issued}
              </span>
            </div>

            <h3 className="text-5xl font-bold mt-10 max-w-3xl">
              {item.title}
            </h3>

            <p className="mt-6 max-w-2xl text-muted-foreground leading-7">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-8">
              {item.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="rounded-full border px-3 py-1 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            <a
              href={item.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-10 rounded-full bg-primary text-primary-foreground px-6 py-3 hover:scale-105 transition"
            >
              Show Credential
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.article>
      </AnimatePresence>

      <div className="flex justify-center gap-2 mt-8">
        {CERTS.map((_, i: number) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-primary" : "w-2 bg-muted"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
