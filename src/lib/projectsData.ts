import cloudgavelMockup from "@/assets/cloudgavel-mockup.png";

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  industryDomain?: string;
  applications?: ("web" | "mobile" | "tablet")[];
  projectType?: ("design" | "code")[];
  description: string;
  color: string;
  link: string;
  isViewAll?: boolean;
  mockup?: string;
  // Extended info for detail pages
  overview?: string;
  techStack?: string[];
  features?: string[];
  challenge?: string;
  solution?: string;
}

export const googleColors = [
  "linear-gradient(135deg, #9BCF7A 0%, #F28C28 100%)",
  "linear-gradient(135deg, #FFA24C 0%, #E56A2E 100%)",
  "linear-gradient(135deg, #6FA8FF 0%, #2E5AAC 100%)",
  "linear-gradient(135deg, #E7C15A 0%, #9C7A1E 100%)",
  "linear-gradient(135deg, #0F2A44 0%, #5F87A8 100%)",
  "linear-gradient(135deg, #8B5CF6 0%, #F472B6 100%)",
];

export const projects: Project[] = [
  {
    id: 1,
    slug: "utility-plus",
    title: "Utility Plus",
    category: "SaaS",
    industryDomain: "Public Utilities / Government",
    applications: ["web", "mobile", "tablet"],
    projectType: ["design"],
    description: "Help agencies manage billing, track records, and streamline user data efficiently.",
    color: googleColors[2],
    link: "#",
    mockup: "/placeholder.svg",
    overview: "Utility Plus is a comprehensive SaaS platform built for public utility agencies. It digitizes billing workflows, automates record keeping, and provides real-time dashboards for operational insights.",
    techStack: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "AWS"],
    features: [
      "Automated billing & invoicing",
      "Customer record management",
      "Usage analytics dashboard",
      "Multi-tenant architecture",
      "Role-based access control",
    ],
    challenge: "Government agencies relied on legacy systems with fragmented data, leading to billing errors and slow customer service.",
    solution: "We built a unified platform that consolidates all utility data into a single dashboard, automating billing cycles and reducing errors by 85%.",
  },
  {
    id: 2,
    slug: "cloudgavel",
    title: "CloudGavel",
    category: "SaaS",
    industryDomain: "Law Enforcement / Justice",
    applications: ["web", "mobile"],
    projectType: ["design"],
    description: "An innovative eWarrant solution that streamlines the warrant approval process.",
    color: googleColors[1],
    link: "#",
    mockup: cloudgavelMockup,
    overview: "CloudGavel is an eWarrant platform that digitizes the entire warrant lifecycle — from creation and submission to judicial review and approval — reducing turnaround from days to minutes.",
    techStack: ["React", "Python", "Django", "PostgreSQL", "Docker"],
    features: [
      "Digital warrant creation & submission",
      "Real-time judicial review workflow",
      "Secure document management",
      "Audit trail & compliance logging",
      "Mobile-first officer interface",
    ],
    challenge: "Law enforcement officers spent hours on paper-based warrant processes, causing delays in time-sensitive investigations.",
    solution: "CloudGavel provides a fully digital workflow that connects officers directly with judges, enabling warrant approvals in under 15 minutes.",
  },
  {
    id: 3,
    slug: "echelon-constructors",
    title: "Echelon Constructors",
    category: "ERP",
    industryDomain: "Construction",
    applications: ["web"],
    projectType: ["design"],
    description: "Construction Project Management Software for planning, scheduling, and resource management.",
    color: googleColors[0],
    link: "#",
    mockup: "/placeholder.svg",
    overview: "Echelon Constructors is an ERP solution tailored for the construction industry, enabling end-to-end project management from bidding to completion.",
    techStack: ["React", "Node.js", "MongoDB", "Material UI", "Azure"],
    features: [
      "Project planning & Gantt charts",
      "Resource allocation & tracking",
      "Budget management & forecasting",
      "Subcontractor management",
      "Daily logs & progress reporting",
    ],
    challenge: "Construction firms struggled with scattered spreadsheets and disconnected tools, leading to cost overruns and missed deadlines.",
    solution: "A centralized ERP that brings all project data together, providing real-time visibility into budgets, timelines, and resources.",
  },
  {
    id: 4,
    slug: "captable",
    title: "Captable",
    category: "Fintech",
    industryDomain: "Finance / Investment",
    applications: ["web"],
    projectType: ["design", "code"],
    description: "Manage equity, track cap tables, and streamline investment workflows.",
    color: googleColors[4],
    link: "#",
    mockup: "/placeholder.svg",
    overview: "Captable is a fintech platform that simplifies equity management for startups and investors, providing clear visibility into ownership structures and funding rounds.",
    techStack: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    features: [
      "Cap table visualization",
      "Funding round modeling",
      "Equity grant management",
      "Investor reporting",
      "409A valuation support",
    ],
    challenge: "Startups managed cap tables in error-prone spreadsheets, creating compliance risks and investor confusion.",
    solution: "An intuitive platform that automates cap table calculations and provides real-time reporting to all stakeholders.",
  },
  {
    id: 5,
    slug: "bumper-mandi",
    title: "Bumper Mandi",
    category: "AgriTech",
    industryDomain: "Agriculture",
    applications: ["mobile", "web"],
    projectType: ["design", "code"],
    description: "A digital mandi app that helps farmers sell grain securely and transparently.",
    color: googleColors[3],
    link: "#",
    mockup: "/placeholder.svg",
    overview: "Bumper Mandi is an AgriTech marketplace that connects farmers directly with buyers, eliminating middlemen and ensuring fair pricing through transparent bidding.",
    techStack: ["React Native", "Node.js", "Firebase", "Google Maps API"],
    features: [
      "Live auction & bidding system",
      "Price discovery & market rates",
      "Secure payment processing",
      "Quality grading system",
      "Logistics coordination",
    ],
    challenge: "Farmers were exploited by middlemen, receiving only a fraction of the market price for their produce.",
    solution: "A transparent digital marketplace with real-time bidding, helping farmers earn 20-30% more by selling directly to buyers.",
  },
  {
    id: 6,
    slug: "react-portfolio",
    title: "React Portfolio",
    category: "Web Development",
    industryDomain: "Personal / Creative",
    applications: ["web"],
    projectType: ["code"],
    description: "A modern, responsive portfolio website using React with smooth navigation and clean UI.",
    color: googleColors[5],
    link: "#",
    mockup: "/placeholder.svg",
    overview: "A beautifully crafted developer portfolio showcasing projects, skills, and experience with smooth animations and an interactive 3D carousel.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: [
      "Interactive 3D project carousel",
      "Smooth scroll animations",
      "Dark/light theme toggle",
      "Responsive design",
      "Contact form integration",
    ],
    challenge: "Needed a portfolio that stands out from generic templates while maintaining fast performance.",
    solution: "Custom-built React app with unique visual elements like a 3D carousel and scroll-driven animations.",
  },
  {
    id: 7,
    slug: "all",
    title: "View All Projects",
    category: "Projects",
    description: "Explore my complete collection of design and development work.",
    color: "linear-gradient(135deg, hsl(var(--accent)), hsl(280 80% 60%))",
    link: "/projects",
    isViewAll: true,
  },
];
