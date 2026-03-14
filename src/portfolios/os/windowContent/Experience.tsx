import type { WindowContentProps } from "./props";

export default function Experience({ resume }: WindowContentProps) {
  return (
    <div className="h-full p-3 text-[11px] overflow-auto">
      <h2 className="text-sm font-semibold mb-2">Experience</h2>
      <ul className="space-y-1.5">
        {resume.work?.map((job, idx) => (
          <li key={`${job.name}-${idx}`} className="border-b border-base-300 pb-1 last:border-b-0">
            <p className="font-semibold">
              {job.position} @ {job.name}
            </p>
            <p className="text-[10px] text-secondary">
              {job.startDate} - {job.endDate ?? "Present"} · {job.location}
            </p>
            {job.summary && <p className="mt-0.5">{job.summary}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
