import type { EnrichedSkill, ResumeSchema } from "@portfolios/types/resume";

export interface WindowContentProps {
  resume: ResumeSchema;
}

export interface SkillsProps extends WindowContentProps {
  groupedSkills: Record<string, EnrichedSkill[]>;
}
