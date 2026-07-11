import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import CodeGridBg from "@/components/newUI/CodeGridBg";

// ✅ Correct imports
import ProjectBottomSheet from "@/components/development/ProjectBottomSheet";
import { getProjectBySlug } from "./data/projects";
import { projects, tags } from "./data/projects";
import RotatingToolsPill from "../newUI/RotatingToolsPill";

// const tags = ["React", "Next", "Python"];

export default function DevPageUI() {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const filtered = projects.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchTag = selectedTags.length === 0 || selectedTags.includes(p.tag);
    return matchSearch && matchTag;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="text-black dark:text-white">
      <CodeGridBg />

      {/* 🌈 BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />

        <div className="absolute inset-0 dark:hidden">
          <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-blue-400/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-purple-400/10 blur-[120px] rounded-full" />
        </div>

        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-blue-500/10 blur-[140px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[140px] rounded-full" />
        </div>
      </div>

      {/* 🔥 HERO */}
      <section className="h-[64vh] md:h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <RotatingToolsPill page="dev" />
        {/* <p className="section-label mb-8">Development Portfolio</p> */}

        <h1 className="hero-heading mb-6">
          What I <span className="text-gradient text-shimmer">BUILD</span>
        </h1>

        <p className="text-muted-foreground max-w-lg mx-auto mb-12">
          Systems, scripts, and tools built with modern technologies.
        </p>

        {/* SEARCH */}
        <div className="max-w-sm mx-auto">
          <div className="flex items-center gap-3 border border-border rounded-full px-5 py-3 bg-card/60 backdrop-blur">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dev projects..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>
      </section>

      {/* 🔽 SCROLL */}
      <div className="h-[8vh] flex flex-col items-center justify-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
          Scroll
        </span>

        <div className="relative flex flex-col items-center">
          <div className="w-px h-6 bg-gradient-to-b from-gray-400/40 to-transparent dark:from-white/30" />

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="absolute top-0 w-1.5 h-1.5 rounded-full bg-black dark:bg-white"
          />
        </div>
      </div>

      {/* 💼 PROJECT SECTION */}
      <section className="min-h-[12vh] px-0 md:px-8 lg:px-8 pb-20">
        <div className="bg-card rounded-3xl p-6 shadow-xl border border-border">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-3 flex-wrap text-sm">
              <button
                onClick={() => setSelectedTags([])}
                className={`px-3 py-1 rounded-full transition ${selectedTags.length === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
                  }`}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full transition ${selectedTags.includes(tag)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Browse all →
            </button>
          </div>

          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
                onClick={() => setSelectedSlug(project.slug)}
              >
                <div className="rounded-2xl overflow-hidden border border-border bg-card transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-xl">
                  <div className="relative overflow-hidden aspect-[4/5]">
                    <motion.img
                      src={project.image}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition">
                      <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center shadow-lg">
                        <span className="text-foreground text-sm">↗</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={project.avatar} className="w-8 h-8 rounded-full border border-border" />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold leading-tight truncate">{project.title}</h3>
                        <p className="text-xs text-muted-foreground">{project.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[10px] text-muted-foreground">Project</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.1em] bg-muted text-muted-foreground">
                        {project.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground mt-10">No projects found 👀</p>
          )}
        </div>
      </section>

      {/* ✅ MODAL */}
      <ProjectBottomSheet
        project={selectedSlug ? getProjectBySlug(selectedSlug) ?? null : null}
        onClose={() => setSelectedSlug(null)}
        onProjectClick={(slug) => setSelectedSlug(slug)}
      />
    </div>
  );
}