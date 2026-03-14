import type { SkillType, SkillSource, SkillDomain, EnrichedSkill } from "@portfolios/types/resume";
import { SKILL_TYPES, SOURCES, DOMAINS } from "./constants";

interface SkillsScriptViewProps {
  typeFilter: SkillType | "";
  sourceFilter: SkillSource | "";
  domainFilter: SkillDomain | "";
  onTypeFilterChange: (v: SkillType | "") => void;
  onSourceFilterChange: (v: SkillSource | "") => void;
  onDomainFilterChange: (v: SkillDomain | "") => void;
  skills: EnrichedSkill[];
}

export default function SkillsScriptView({
  typeFilter,
  sourceFilter,
  domainFilter,
  onTypeFilterChange,
  onSourceFilterChange,
  onDomainFilterChange,
  skills,
}: SkillsScriptViewProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-shrink-0 flex-wrap items-center gap-2 border-b border-base-300 bg-base-300/50 px-4 py-3">
        <span className="text-success text-sm">$ ./skills</span>
        <select
          className="select select-bordered select-sm bg-base-100 text-sm"
          value={typeFilter}
          onChange={(e) => onTypeFilterChange((e.target.value || "") as SkillType | "")}
        >
          <option value="">--type=*</option>
          {SKILL_TYPES.map((t) => (
            <option key={t} value={t}>
              --type={t}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered select-sm bg-base-100 text-sm"
          value={sourceFilter}
          onChange={(e) => onSourceFilterChange((e.target.value || "") as SkillSource | "")}
        >
          <option value="">--source=*</option>
          {SOURCES.map((s) => (
            <option key={s} value={s}>
              --source={s}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered select-sm bg-base-100 text-sm"
          value={domainFilter}
          onChange={(e) => onDomainFilterChange((e.target.value || "") as SkillDomain | "")}
        >
          <option value="">--domain=*</option>
          {DOMAINS.map((d) => (
            <option key={d} value={d}>
              --domain={d}
            </option>
          ))}
        </select>
        <span className="text-base-content/50 text-xs">→ {skills.length} skills</span>
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-4">
        <pre className="text-base-content/80 text-sm">
          {skills.map((s, i) => (
            <span key={i} className="block py-0.5">
              <span className="text-primary">"{s.name}"</span>
              <span className="text-base-content/50">
                {" "}
                ({s.type} / {s.domain} / {s.source})
              </span>
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
}
