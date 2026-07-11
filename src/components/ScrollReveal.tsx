import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}

const directionMap = {
  up: { x: 0, y: 20 },
  left: { x: -30, y: 0 },
  right: { x: 30, y: 0 },
};

const ScrollReveal = ({ children, delay = 0, className = "", direction = "up" }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const offset = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offset.x, y: offset.y, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
