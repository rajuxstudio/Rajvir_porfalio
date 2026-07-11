import { motion } from "framer-motion";

const CodeGridBg = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" style={{ maxHeight: '88vh' }} aria-hidden>
      {/* Deep cinematic gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, hsla(38, 80%, 50%, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 30% 60%, hsla(220, 60%, 40%, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 70% 30%, hsla(280, 40%, 50%, 0.03) 0%, transparent 50%)
          `,
        }}
      />

      {/* Animated warm glow - center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full ambient-pulse"
        style={{
          background: "radial-gradient(circle, hsla(38, 92%, 50%, 0.07), transparent 65%)",
        }}
      />

      {/* Cool counter-glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
        className="absolute top-[55%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full ambient-pulse"
        style={{
          background: "radial-gradient(circle, hsla(220, 60%, 50%, 0.04), transparent 60%)",
          animationDelay: "3s",
        }}
      />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating geometric accents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.06, y: 0 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="absolute top-[15%] right-[12%] w-24 h-24 border border-primary/20 rounded-2xl float-slow"
        style={{ animationDelay: "0s" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.04, y: 0 }}
        transition={{ delay: 1.3, duration: 1.5 }}
        className="absolute bottom-[20%] left-[10%] w-16 h-16 border border-primary/15 rounded-xl float-slow"
        style={{ animationDelay: "3s" }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="absolute top-[25%] left-[15%] w-2 h-2 rounded-full bg-primary float-slow"
        style={{ animationDelay: "1.5s" }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ delay: 1.7, duration: 1.5 }}
        className="absolute bottom-[30%] right-[18%] w-1.5 h-1.5 rounded-full bg-primary float-slow"
        style={{ animationDelay: "5s" }}
      />

      {/* Horizontal light streak */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[48%] left-[10%] right-[10%] h-px origin-left"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsla(38, 80%, 55%, 0.08) 30%, hsla(38, 80%, 55%, 0.12) 50%, hsla(38, 80%, 55%, 0.08) 70%, transparent 100%)",
        }}
      />

      {/* Vignette edges */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 50%, hsl(var(--background)) 100%)",
        }}
      />
    </div>
  );
};

export default CodeGridBg;