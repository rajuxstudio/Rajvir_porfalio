import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolves a file in /public against the app's base path.
 *
 * Vite rewrites asset URLs it can see at build time, but not absolute paths
 * written as plain strings in JS/JSX. On GitHub Pages the app is served from
 * /Rajvir_porfalio/, so a hard-coded "/resume.pdf" would 404.
 */
export function publicUrl(file: string) {
  return `${import.meta.env.BASE_URL}${file.replace(/^\//, "")}`;
}
