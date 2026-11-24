// Figures for the New Profile UI, all derived from the real About-page data sources.
import { useMemo } from "react";
import { experiences } from "@/components/about/AboutExperience";
import { education } from "@/components/about/AboutEducation";
import { CERTS } from "@/lib/certificates";
import { durationOf, isOngoing, monthsOf, parseWhen, splitPeriod } from "@/components/Profile/sheets/SheetParts";

export const shortCo = (c: string) => (c === "Self-employed" ? "Freelance" : c.split(/\s+/)[0]);

export function useProfileStats() {
  return useMemo(() => {
    const roles = experiences.map((e) => ({ ...e, start: parseWhen(splitPeriod(e.period)[0]), months: monthsOf(e.period), duration: durationOf(e.period) }));
    const chrono = [...roles].sort((a, b) => a.start.getTime() - b.start.getTime());
    const current = roles.find((r) => isOngoing(r.period)) ?? chrono[chrono.length - 1];
    const companies = new Set(roles.map((r) => r.company)).size;
    const skills = [...new Set(roles.flatMap((r) => r.skills))];
    const verified = CERTS.filter((c) => c.verifyUrl && c.verifyUrl !== "#").length;
    const latestDegree = education[0];
    const firstDegree = education[education.length - 1];
    const learningSince = splitPeriod(firstDegree.period)[0]; // e.g. "Apr 2017"
    return { roles, chrono, current, companies, skills, verified, certs: CERTS.length, degrees: education.length, latestDegree, learningSince };
  }, []);
}
