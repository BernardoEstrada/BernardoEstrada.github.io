import React, { lazy, Suspense } from "react";
import type { Section } from "./constants";
import type { SkillType, SkillSource, SkillDomain } from "@portfolios/types/resume";
import type { ResumeSchema } from "@portfolios/types/resume";
import type { EnrichedSkill } from "@portfolios/types/resume";

const WelcomeOutput = lazy(() => import("./text/WelcomeOutput"));
const AboutOutput = lazy(() => import("./text/AboutOutput"));
const ExperienceOutput = lazy(() => import("./text/ExperienceOutput"));
const SkillsOutput = lazy(() => import("./text/SkillsOutput"));
const ContactOutput = lazy(() => import("./text/ContactOutput"));
const HelpOutput = lazy(() => import("./text/HelpOutput"));
const LsOutput = lazy(() => import("./text/LsOutput"));
const ErrorOutput = lazy(() => import("./text/ErrorOutput"));

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
  const wrap = (node: React.ReactNode) => <Suspense fallback={null}>{node}</Suspense>;

  if (section === null) {
    if (inline) return wrap(<ErrorOutput command="" />);
    return wrap(<WelcomeOutput name={resume.basics?.name ?? ""} />);
  }
  const noCmd = inline;
  if (section === "about") {
    return wrap(
      <AboutOutput
        name={resume.basics?.name}
        label={resume.basics?.label}
        headline={resume.basics?.headline}
        summary={resume.basics?.summary}
        showCommand={!noCmd}
      />,
    );
  }
  if (section === "experience") {
    return wrap(<ExperienceOutput jobs={resume.work ?? []} showCommand={!noCmd} />);
  }
  if (section === "skills") {
    return wrap(
      <SkillsOutput
        typeFilter={typeFilter}
        sourceFilter={sourceFilter}
        domainFilter={domainFilter}
        onTypeFilterChange={onTypeFilterChange}
        onSourceFilterChange={onSourceFilterChange}
        onDomainFilterChange={onDomainFilterChange}
        skills={filteredSkills}
        showCommand={!noCmd}
      />,
    );
  }
  if (section === "contact") {
    return wrap(
      <ContactOutput email={resume.basics?.email} profiles={resume.basics?.profiles} showCommand={!noCmd} />,
    );
  }
  if (section === "help") return wrap(<HelpOutput />);
  if (section === "ls") return wrap(<LsOutput />);
  return wrap(<ErrorOutput />);
}
