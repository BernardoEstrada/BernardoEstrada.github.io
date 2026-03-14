import type { WindowContentProps } from "./props";

export default function Profile({ resume }: WindowContentProps) {
  return (
    <div className="p-3 text-[11px]">
      <h2 className="text-sm font-semibold mb-2">Profile</h2>
      <p className="mb-1">
        {resume.basics.headline ?? "Software engineer focused on web, internal tools and developer experience."}
      </p>
      <p>Player: {resume.basics.name ?? "Bernardo"} · Level: 29 · Class: full‑stack‑ish web dev</p>
    </div>
  );
}
