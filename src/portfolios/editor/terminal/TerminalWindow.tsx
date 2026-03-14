import { useEffect, useRef } from "react";
import type { Section } from "./constants";
import type { SkillType, SkillSource, SkillDomain, ResumeSchema, EnrichedSkill } from "@portfolios/types/resume";
import TerminalTitleBar from "./TerminalTitleBar";
import TerminalOutput from "./TerminalOutput";
import TerminalPrompt from "./TerminalPrompt";
import WelcomeOutput from "./text/WelcomeOutput";
import SkillsScriptView from "./SkillsScriptView";

interface LogEntry {
  command: string;
  section: Section;
}

interface TerminalWindowProps {
  log: LogEntry[];
  currentSection: Section;
  resume: ResumeSchema;
  filteredSkills: EnrichedSkill[];
  typeFilter: SkillType | "";
  sourceFilter: SkillSource | "";
  domainFilter: SkillDomain | "";
  onTypeFilterChange: (v: SkillType | "") => void;
  onSourceFilterChange: (v: SkillSource | "") => void;
  onDomainFilterChange: (v: SkillDomain | "") => void;
  cmd: string;
  onCmdChange: (v: string) => void;
  onRunCmd: () => void;
  suggestions: string[];
  history: string[];
}

export default function TerminalWindow({
  log,
  currentSection: _currentSection,
  resume,
  filteredSkills,
  typeFilter,
  sourceFilter,
  domainFilter,
  onTypeFilterChange,
  onSourceFilterChange,
  onDomainFilterChange,
  cmd,
  onCmdChange,
  onRunCmd,
  suggestions,
  history,
}: TerminalWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const isSkillsHijack = log.length > 0 && log[log.length - 1].section === "skills";

  useEffect(() => {
    if (!isSkillsHijack) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [log.length, isSkillsHijack]);

  return (
    <div className="flex min-h-0 flex-1 flex-col min-w-0 p-4 md:p-6">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-base-300 bg-base-200 shadow-xl">
        <TerminalTitleBar />

        <div
          ref={scrollRef}
          className={`min-h-0 flex-1 ${isSkillsHijack ? "flex flex-col overflow-hidden p-0" : "overflow-auto p-4"}`}
        >
          {isSkillsHijack ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <SkillsScriptView
                typeFilter={typeFilter}
                sourceFilter={sourceFilter}
                domainFilter={domainFilter}
                onTypeFilterChange={onTypeFilterChange}
                onSourceFilterChange={onSourceFilterChange}
                onDomainFilterChange={onDomainFilterChange}
                skills={filteredSkills}
              />
            </div>
          ) : log.length === 0 ? (
            <WelcomeOutput name={resume.basics?.name ?? ""} />
          ) : (
            <div className="space-y-4">
              {log.map((entry, i) => (
                <div key={i}>
                  <div className="text-success">$ {entry.command}</div>
                  <div className="mt-1">
                    <TerminalOutput
                      section={entry.section}
                      resume={resume}
                      filteredSkills={filteredSkills}
                      typeFilter={typeFilter}
                      sourceFilter={sourceFilter}
                      domainFilter={domainFilter}
                      onTypeFilterChange={onTypeFilterChange}
                      onSourceFilterChange={onSourceFilterChange}
                      onDomainFilterChange={onDomainFilterChange}
                      inline
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex-shrink-0">
          <TerminalPrompt
            value={cmd}
            onChange={onCmdChange}
            onRun={onRunCmd}
            suggestions={suggestions}
            history={history}
          />
        </div>
      </div>
    </div>
  );
}
