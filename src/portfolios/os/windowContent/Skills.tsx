import type { SkillsProps } from "./props";

export default function Skills({ groupedSkills }: SkillsProps) {
  return (
    <div className="flex h-full flex-col p-3 text-[11px]">
      <p className="mb-2">Skills grouped by domain, noting where they were learned and since when.</p>
      <div className="grid flex-1 grid-cols-1 gap-2 overflow-auto">
        {Object.entries(groupedSkills).map(([domain, domainSkills]) => (
          <div key={domain} className="border border-base-300 bg-base-100 p-2">
            <p className="font-semibold mb-1">{domain}</p>
            <ul className="space-y-0.5">
              {domainSkills?.map((skill) => {
                if (!skill) return null;
                if (typeof skill.type !== "string") return null;
                if (typeof skill.source !== "string") return null;
                if (typeof skill.domain !== "string") return null;
                return (
                  <li key={skill.name}>
                    <span>{skill.name}</span>{" "}
                    <span className="text-secondary">
                      ({skill.type} · {skill.source} · {skill.domain})
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
