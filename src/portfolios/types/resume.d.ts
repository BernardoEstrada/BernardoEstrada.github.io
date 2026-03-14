export type Iso8601 = string;

export interface ResumeSchema {
  $schema?: string;
  basics: {
    name?: string;
    label?: string;
    image?: string;
    email?: string;
    phone?: string;
    url?: string;
    headline?: string;
    summary?: string;
    location?: {
      address?: string;
      postalCode?: string;
      city?: string;
      countryCode?: string;
      region?: string;
      [k: string]: unknown;
    };
    profiles?: { network?: string; username?: string; url?: string; [k: string]: unknown }[];
    [k: string]: unknown;
  };
  work?: {
    name?: string;
    location?: string;
    position?: string;
    url?: string;
    startDate?: Iso8601;
    endDate?: Iso8601;
    summary?: string;
    highlights?: string[];
    [k: string]: unknown;
  }[];
  education?: {
    institution?: string;
    area?: string;
    studyType?: string;
    startDate?: Iso8601;
    endDate?: Iso8601;
    [k: string]: unknown;
  }[];
  skills?: {
    name?: string;
    shortName?: string;
    group?: string;
    level?: string;
    keywords?: string[];
    [k: string]: unknown;
  }[];
  certificates?: { name?: string; issuer?: string; date?: string; [k: string]: unknown }[];
  [k: string]: unknown;
}

export type SkillType = "language" | "framework" | "tool" | "methodology" | "soft" | "other";
export type SkillSource = "work" | "education" | "cert" | "self" | "various";
export type SkillDomain = "backend" | "frontend" | "devops" | "data" | "general";

export interface EnrichedSkill {
  name: string;
  shortName?: string;
  group?: string;
  level?: string;
  type: SkillType;
  source: SkillSource;
  domain: SkillDomain;
}
