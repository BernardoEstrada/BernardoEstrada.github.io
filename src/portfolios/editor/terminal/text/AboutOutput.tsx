interface AboutOutputProps {
  name?: string;
  label?: string;
  headline?: string;
  summary?: string;
  showCommand?: boolean; // accepted but ignored, wrapper handles "$ cmd"
}

export default function AboutOutput({ name, label, headline, summary }: AboutOutputProps) {
  return (
    <div className="space-y-1 text-sm text-base-content/90">
      {(name || label) && (
        <p className="font-semibold text-base-content">
          {name}
          {label ? <span className="text-base-content/70"> — {label}</span> : null}
        </p>
      )}
      {headline && <p className="text-base-content/80">{headline}</p>}
      {summary && <p className="text-base-content/80 leading-relaxed">{summary}</p>}
    </div>
  );
}