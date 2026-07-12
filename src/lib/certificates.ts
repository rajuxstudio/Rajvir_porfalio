export type Certificate = {
  title: string;
  org: string;
  year: string;
  issuer: string;
  issued: string;
  description: string;
  skills: string[];
  verifyUrl: string;
  accent: string;
};

export const CERTS: Certificate[] = [
  {
    title: "Introduction to JavaScript",
    org: "SoloLearn",
    year: "2024",
    issuer: "SoloLearn",
    issued: "May 2024",
    description:
      "Learned JavaScript fundamentals including variables, functions, loops, arrays and modern ES6 concepts.",
    skills: ["JavaScript", "ES6", "Logic"],
    verifyUrl: "https://www.sololearn.com/en/certificates/CC-CK836PN6",
    accent: "from-fuchsia-500/20 to-violet-500/10",
  },
  {
    title: "UIUX Design",
    org: "Internshala",
    year: "2022",
    issuer: "Internshala",
    issued: "Apr 2022",
    description:
      "Covered UI design, UX principles, wireframing, user flows and visual hierarchy.",
    skills: ["UI", "UX", "Figma"],
    verifyUrl: "#",
    accent: "from-sky-500/20 to-cyan-500/10",
  },
  {
    title: "Product Design",
    org: "Google",
    year: "2022",
    issuer: "Google",
    issued: "Mar 2022",
    description:
      "Foundation in product thinking, usability, interaction design and design process.",
    skills: ["Product", "UX", "Research"],
    verifyUrl: "#",
    accent: "from-blue-500/20 to-indigo-500/10",
  },
  {
    title: "User Experience",
    org: "Accenture",
    year: "2022",
    issuer: "Accenture",
    issued: "Jan 2022",
    description:
      "Focused on user-centered design, accessibility and digital experiences.",
    skills: ["UX", "Accessibility", "Design"],
    verifyUrl: "https://www.futurelearn.com/certificates/calbigj",
    accent: "from-violet-500/20 to-purple-500/10",
  },
];
