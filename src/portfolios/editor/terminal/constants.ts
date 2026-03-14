import type { SkillType, SkillSource, SkillDomain } from "@portfolios/types/resume";

export type Section = "about" | "experience" | "skills" | "contact" | "help" | "ls" | null;

export const COMMANDS: { title: string; cmd: string; section: Section }[] = [
  { title: "About", cmd: "cat about.txt", section: "about" },
  { title: "Experience", cmd: "ls experience/", section: "experience" },
  { title: "Skills", cmd: "./skills", section: "skills" },
  { title: "Contact", cmd: "./contact.sh", section: "contact" },
];

export const SKILL_TYPES: SkillType[] = ["language", "framework", "tool", "methodology", "soft", "other"];
export const SOURCES: SkillSource[] = ["work", "education", "cert", "self", "various"];
export const DOMAINS: SkillDomain[] = ["backend", "frontend", "devops", "data", "general"];
