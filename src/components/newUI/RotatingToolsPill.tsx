import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FramerIcon from "@/assets/designIcon/framer.svg";
import CanvaIcon from "@/assets/designIcon/canva.svg";
import FigmaIcon from "@/assets/designIcon/figma.svg";
import WordpressIcon from "@/assets/designIcon/wordpress.svg";
import PhotoshopIcon from "@/assets/designIcon/photoshop.svg";
import python from "@/assets/buildIcon/python.svg";
import github from "@/assets/buildIcon/github.svg";
import javascript from "@/assets/buildIcon/javascript.svg";
import mysql from "@/assets/buildIcon/mysql.svg";
import react from "@/assets/buildIcon/react.svg";
import angular from "@/assets/buildIcon/angular.svg";

const Designtools = [
  {
    name: "Framer",
    icon: FramerIcon,
  },

  {
    name: "Canva",
    icon: CanvaIcon,
  },

  {
    name: "Figma",
    icon: FigmaIcon,
  },

  {
    name: "WordPress",
    icon: WordpressIcon,
  },

  {
    name: "Photoshop",
    icon: PhotoshopIcon,
  },
];
const Buildtools = [
  {
    name: "github",
    icon: github,
  },
  {
    name: "mysql",
    icon: mysql,
  },

  {
    name: "python",
    icon: python,
  },

  {
    name: "javascript",
    icon: javascript,
  },

  {
    name: "react",
    icon: react,
  },

  {
    name: "angular",
    icon: angular,
  },
];

type Props = {
  page?: "design" | "dev";
};

export default function RotatingToolsPill({ page = "design" }: Props) {
  const [index, setIndex] = useState(0);
  const tools = page === "design"
    ? Designtools
    : Buildtools;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % tools.length);
    }, 2400);

    return () => clearInterval(id);
  }, []);

  const visibleTools = [
    tools[index % tools.length],
    tools[(index + 1) % tools.length],
    tools[(index + 2) % tools.length],
  ];

  return (
    <motion.div

    >
      
      {/* Icons */}
      <div className="flex -space-x-2 py-4">
        {tools.map((t, i) => (
          <div
            key={t.name}
            className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center overflow-hidden"
            style={{ zIndex: tools.length - i }}
          >
              <img
                src={t.icon}
                alt={t.name}
                className="w-4 h-4 object-contain"
              />
          </div>
        ))}
      </div>
      
    </motion.div>
  );
}