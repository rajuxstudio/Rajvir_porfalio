export type TechStackItem = string | { name: string; icon: string };
/** Device classes the product itself was designed/built for (not the design tools used). */
export type DevicePlatform = "mobile" | "web" | "tablet";

import type { ComponentType } from "react";
import type { MockupItem } from "../components/MockupGallery";

export interface ProjectInfo {
  what: string;
  howItWorks: string[];
  codeExplanation: string[];
  howToRun: string[];
  howToTry: string[];
  techStack: TechStackItem[];
  /** Which device classes this product ships on — rendered as icons in the sticky header. */
  platforms?: DevicePlatform[];
  mockups: MockupItem[];
  link: { name: string; link: string }[];
  Reflection: string[];
  floatingStats: { icon: string; label: string; value: string }[];
  meta: { label: string; value: string }[];
  impacts: { value: string; label: string; body: string }[];
  challenges: { icon: ComponentType<any>; title: string; body: string }[];
}

/** Optional device-switch wiring passed into a project's customContent, so the
 *  bottom sheet's section nav can drive that page's mockup gallery the same way
 *  it drives the generic ProjectContentSections layout. Safe to ignore. */
export interface CaseStudyContentProps {
  activePlatform?: DevicePlatform;
  onPlatformChange?: (platform: DevicePlatform) => void;
}

export interface Project {
  avatar: string;
  slug: string;
  title: string;
  tag: string;
  role: string;
  date: string;
  image: string;
  logo: string;
  info: ProjectInfo;
  /** When set, renders instead of the generic ProjectContentSections inside the bottom sheet. */
  customContent?: ComponentType<CaseStudyContentProps>;
}
