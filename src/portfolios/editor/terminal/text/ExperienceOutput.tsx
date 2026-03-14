interface Job {
  position?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
}

interface ExperienceOutputProps {
  jobs: Job[];
  showCommand?: boolean; // ignored
}

export default function ExperienceOutput({ jobs }: ExperienceOutputProps) {
  const items = jobs.slice(0, 4);
  return (
    <div className="space-y-3 text-sm text-base-content/90">
      {items.map((job, i) => (
        <div key={i} className="border-l-2 border-primary/40 pl-3">
          <p>
            <span className="font-semibold">{job.position}</span>
            {job.name && <span className="text-base-content/70"> @ {job.name}</span>}
          </p>
          {(job.startDate || job.endDate) && (
            <p className="text-xs text-base-content/50">
              {job.startDate} {job.startDate && job.endDate ? '→' : ''} {job.endDate}
            </p>
          )}
          {job.summary && (
            <p className="mt-1 text-base-content/80 leading-relaxed">
              {job.summary}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}