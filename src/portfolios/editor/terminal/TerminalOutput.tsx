import type { Section } from "./constants";
import type { SkillType, SkillSource, SkillDomain } from "@portfolios/types/resume";
import type { ResumeSchema } from "@portfolios/types/resume";
import type { EnrichedSkill } from "@portfolios/types/resume";
import WelcomeOutput from "./text/WelcomeOutput";
import AboutOutput from "./text/AboutOutput";
import ExperienceOutput from "./text/ExperienceOutput";
import SkillsOutput from "./text/SkillsOutput";
import ContactOutput from "./text/ContactOutput";
import HelpOutput from "./text/HelpOutput";
import LsOutput from "./text/LsOutput";
import ErrorOutput from "./text/ErrorOutput";

interface TerminalOutputProps {
  section: Section;
  resume: ResumeSchema;
  filteredSkills: EnrichedSkill[];
  typeFilter: SkillType | "";
  sourceFilter: SkillSource | "";
  domainFilter: SkillDomain | "";
  onTypeFilterChange: (v: SkillType | "") => void;
  onSourceFilterChange: (v: SkillSource | "") => void;
  onDomainFilterChange: (v: SkillDomain | "") => void;
  /** When true, null section renders nothing instead of welcome (for log entries) */
  inline?: boolean;
}

export default function TerminalOutput({
  section,
  resume,
  filteredSkills,
  typeFilter,
  sourceFilter,
  domainFilter,
  onTypeFilterChange,
  onSourceFilterChange,
  onDomainFilterChange,
  inline = false,
}: TerminalOutputProps) {
  if (section === null) {
    if (inline) return <ErrorOutput command="" />;
    return <WelcomeOutput name={resume.basics?.name ?? ""} />;
  }
  const noCmd = inline;
  if (section === "about") {
    return (
      <AboutOutput
        name={resume.basics?.name}
        label={resume.basics?.label}
        headline={resume.basics?.headline}
        summary={resume.basics?.summary}
        showCommand={!noCmd}
      />
    );
  }
  if (section === "experience") {
    return <ExperienceOutput jobs={resume.work ?? []} showCommand={!noCmd} />;
  }
  if (section === "skills") {
    return (
      <SkillsOutput
        typeFilter={typeFilter}
        sourceFilter={sourceFilter}
        domainFilter={domainFilter}
        onTypeFilterChange={onTypeFilterChange}
        onSourceFilterChange={onSourceFilterChange}
        onDomainFilterChange={onDomainFilterChange}
        skills={filteredSkills}
        showCommand={!noCmd}
      />
    );
  }
  if (section === "contact") {
    return <ContactOutput email={resume.basics?.email} profiles={resume.basics?.profiles} showCommand={!noCmd} />;
  }
  if (section === "help") return <HelpOutput />;
  if (section === "ls") return <LsOutput />;
  return <ErrorOutput />;
}
