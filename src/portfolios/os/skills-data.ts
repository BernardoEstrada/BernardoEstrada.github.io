export type SkillDomain = "frontend" | "backend" | "devops" | "data" | "product" | "other";

export type SkillOrigin = "self-taught" | "bootcamp" | "university" | "work" | "freelance" | "community";

export type SkillLevel = "dabbling" | "comfortable" | "strong" | "expert";

export interface Skill {
  name: string;
  type: "language" | "framework" | "tool" | "platform" | "concept";
  domain: SkillDomain;
  origin: SkillOrigin;
  level: SkillLevel;
  since: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  description?: string;
  skills: Skill[];
}

// Draft dataset — replace with your real skills later.
export const draftSkillGroups: SkillGroup[] = [
  {
    id: "frontend-core",
    label: "Frontend Core",
    description: "Languages and frameworks for building user interfaces.",
    skills: [
      {
        name: "TypeScript",
        type: "language",
        domain: "frontend",
        origin: "work",
        level: "strong",
        since: "2019",
      },
      {
        name: "React",
        type: "framework",
        domain: "frontend",
        origin: "work",
        level: "strong",
        since: "2018",
      },
      {
        name: "Tailwind CSS",
        type: "tool",
        domain: "frontend",
        origin: "self-taught",
        level: "comfortable",
        since: "2021",
      },
    ],
  },
  {
    id: "backend-runtime",
    label: "Backend & Runtime",
    description: "Services, APIs and scripting.",
    skills: [
      {
        name: "Node.js",
        type: "platform",
        domain: "backend",
        origin: "work",
        level: "comfortable",
        since: "2018",
      },
      {
        name: "PostgreSQL",
        type: "platform",
        domain: "backend",
        origin: "work",
        level: "comfortable",
        since: "2019",
      },
    ],
  },
  {
    id: "devops-ci",
    label: "DevOps & Delivery",
    description: "How code ships to production.",
    skills: [
      {
        name: "GitHub Actions",
        type: "tool",
        domain: "devops",
        origin: "work",
        level: "comfortable",
        since: "2020",
      },
    ],
  },
];

