import type { ResumeSchema, EnrichedSkill, SkillType, SkillSource, SkillDomain } from "@portfolios/types/resume";
import resumeJson from "@assets/BernardoEstrada.resume.json";

const resume = resumeJson as unknown as ResumeSchema;

const TYPE_KEYWORDS: Record<SkillType, string[]> = {
  language: ["javascript", "typescript", "node", "react", "python", "c++", "c#", "php", "dart"],
  framework: ["react", "nestjs", "nx", "vue", "express", "django", "flutter", "next"],
  tool: ["docker", "kubernetes", "k8s", "storybook", "git", "terraform", "webpack", "pm2", "grpc", "websocket", "cqrs"],
  methodology: ["ddd", "domain-driven", "agile", "cmmi", "rpa", "automation"],
  soft: ["problem solving", "analytical", "peer mentoring", "programming"],
  other: [],
};

const DOMAIN_GROUPS: Record<string, SkillDomain> = {
  devops: "devops",
  backend: "backend",
  frontend: "frontend",
  data: "data",
  general: "general",
};

function inferType(name: string): SkillType {
  const lower = name.toLowerCase();
  for (const [type, keywords] of Object.entries(TYPE_KEYWORDS) as [SkillType, string[]][]) {
    if (keywords.some((k) => lower.includes(k))) return type;
  }
  if (lower.includes("network") || lower.includes("vlan") || lower.includes("routing") || lower.includes("cisco"))
    return "tool";
  if (lower.includes("design") || lower.includes("analytical") || lower.includes("mentoring")) return "methodology";
  return "other";
}

function inferSource(_skill: { name?: string }, index: number): SkillSource {
  // Placeholder: could map to work/education/cert by parsing resume later
  return index % 4 === 0 ? "work" : index % 4 === 1 ? "education" : index % 4 === 2 ? "cert" : "various";
}

export function getEnrichedSkills(): EnrichedSkill[] {
  const raw = resume.skills ?? [];
  return raw
    .filter((s) => s.name && s.name.length < 60) // filter long "skills" that look like course outcomes
    .slice(0, 35)
    .map((s, i) => ({
      name: s.name ?? "",
      shortName: s.shortName,
      group: s.group,
      level: s.level,
      type: inferType(s.name ?? ""),
      source: inferSource(s, i),
      domain: (s.group ? DOMAIN_GROUPS[s.group.toLowerCase()] : undefined) ?? "general",
    }));
}

export { resume };
