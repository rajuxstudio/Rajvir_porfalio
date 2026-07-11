import { useState } from "react";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import CodeGridBg from "@/components/newUI/CodeGridBg";
import HowIdesign from "@/components/design/Component/HowIdesign";
import { getProjectBySlug } from "./projects/index_design";
import ProjectBottomSheet from "./ProjectBottomSheet";
import RotatingToolsPill from "../newUI/RotatingToolsPill";
import HowIDesign from "@/components/design/Component/HowIdesign";
import { projects, tags } from "./projects/index_design";

export default function DesignPageUI() {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const [designOpen, setDesignOpen] = useState(false);

  const filtered = projects.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchTag =
      selectedTags.length === 0 || selectedTags.includes(p.tag);
    return matchSearch && matchTag;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="text-black dark:text-white">
      <CodeGridBg />

      {/* 🌈 IMPROVED BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        {/* Base */}
        <div className="absolute inset-0 bg-background" />

        {/* Light Theme Glow */}
        <div className="absolute inset-0 dark:hidden">
          <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-blue-400/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-purple-400/10 blur-[120px] rounded-full" />
        </div>

        {/* Dark Theme Glow */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-blue-500/10 blur-[140px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[140px] rounded-full" />
        </div>
      </div>

      {/* 🔥 HERO */}
      <section className="h-[64vh] md:h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <RotatingToolsPill page="design" />
        {/* <p className="section-label mb-8">UX/UI - PRODUCT DESIGNER</p> */}

        <h1 className="hero-heading mb-6">
          What I <span className="text-gradient text-shimmer">DESIGN</span>
        </h1>

        <p className="text-muted-foreground max-w-lg mx-auto mb-12">
          UX • UI • Design Systems • Prototyping • Interface Design • Print & Packaging • Market & Communication • Identity & Branding
        </p>

        {/* SEARCH */}
        <div className="max-w-sm mx-auto">
          <div className="flex items-center gap-3 border border-border rounded-full px-5 py-3 bg-card/60 backdrop-blur">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search design projects..."
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
      <section className="min-h-[12vh] px-0 md:px-12 lg:px-12 pb-12">
        <div className="bg-white dark:bg-[#0b0b0f] rounded-3xl p-6 shadow-xl border border-black/10 dark:border-white/5">

          {/* FILTER */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-3 flex-wrap text-sm">
              <button
                onClick={() => setSelectedTags([])}
                className={`px-3 py-1 rounded-full transition ${selectedTags.length === 0
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-black/5 text-black dark:bg-white/10 dark:text-white"
                  }`}
              >
                All
              </button>

              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full transition ${selectedTags.includes(tag)
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-black/5 text-black dark:bg-white/10 dark:text-white"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <button
              onClick={() => setDesignOpen(true)}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
              Design Process ?
            </button>
          </div>

          {/* 🔥 IMPROVED CARDS */}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
                onClick={() => setSelectedSlug(project.slug)}
              >
                <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/5 bg-white dark:bg-black transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-xl group-hover:shadow-black/10 dark:group-hover:shadow-white/5">

                  {/* IMAGE */}
                  <div className="relative overflow-hidden aspect-[4/3] group">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                    {/* Hover Content */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-between">

                      {/* Project Slug */}
                      <span className="text-white text-xs px-3 py-1 font-medium">
                        {project.slug}
                      </span>

                      {/* Arrow Button */}
                      <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-white flex items-center justify-center shadow-lg">
                        <span className="text-black text-sm leading-none">↗</span>
                      </div>

                    </div>
                  </div>


                  {/* CONTENT */}
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={project.logo}
                        className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10"
                      />

                      <div className="flex-1">
                        <h3 className="text-sm font-semibold leading-tight truncate">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {project.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[10px] text-gray-400">
                        Tags:
                      </span>

                      <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.1em] bg-black/5 text-black dark:bg-white/10 dark:text-white">
                        {project.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* EMPTY */}
          {filtered.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No projects found 👀
            </p>
          )}
        </div>
      </section>
      <AnimatePresence>
        {designOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setDesignOpen(false)}
            />
            <div
              className="relative flex items-center justify-center flex-shrink-0"
              style={{ height: "12vh" }}
            >
              <motion.button
                onClick={() => setDesignOpen(false)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.1 }}
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-lg z-10"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative flex-1 bg-background rounded-t-3xl overflow-y-auto shadow-2xl border-t border-border"
            >
              <HowIDesign />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ✅ MODAL */}
      <ProjectBottomSheet
        project={
          selectedSlug
            ? (() => {
                const p = getProjectBySlug(selectedSlug);
                return p ? ({ ...p, avatar: (p as any).avatar ?? "" } as any) : null;
              })()
            : null
        }
        onClose={() => setSelectedSlug(null)}
        onProjectClick={(slug) => setSelectedSlug(slug)}
      />

    </div>
  );
}