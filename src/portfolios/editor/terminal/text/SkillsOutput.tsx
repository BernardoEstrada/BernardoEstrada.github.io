import type { SkillType, SkillSource, SkillDomain, EnrichedSkill } from "@portfolios/types/resume";

interface SkillsOutputProps {
  typeFilter: SkillType | "";
  sourceFilter: SkillSource | "";
  domainFilter: SkillDomain | "";
  onTypeFilterChange: (v: SkillType | "") => void;
  onSourceFilterChange: (v: SkillSource | "") => void;
  onDomainFilterChange: (v: SkillDomain | "") => void;
  skills: EnrichedSkill[];
  showCommand?: boolean; // ignored
}

export default function SkillsOutput({ typeFilter, sourceFilter, domainFilter, skills }: SkillsOutputProps) {
  return (
    <div className="space-y-1 text-sm text-base-content/90">
      <p className="text-base-content/70">
        Skills (type={typeFilter || "*"}, source={sourceFilter || "*"}, domain={domainFilter || "*"})
      </p>
      <pre className="mt-1 text-base-content/80">
        {skills.map((s, i) => (
          <span key={i} className="block">
            <span className="text-primary">"{s.name}"</span>
            <span className="text-base-content/50">
              {" "}
              ({s.type} / {s.domain} / {s.source})
            </span>
          </span>
        ))}
      </pre>
      <p className="text-xs text-base-content/50">→ {skills.length} skills</p>
    </div>
  );
}
