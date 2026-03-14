import type { WindowContentProps } from "./props";

export default function Contact({ resume }: WindowContentProps) {
  return (
    <div className="h-full p-3 text-[11px] overflow-auto">
      <h2 className="text-sm font-semibold mb-2">Contact</h2>
      {resume.basics.email && (
        <p className="mb-1">
          Email:{" "}
          <a href={`mailto:${resume.basics.email}`} className="underline text-secondary">
            {resume.basics.email}
          </a>
        </p>
      )}
      {resume.basics.profiles && resume.basics.profiles.length > 0 && (
        <ul className="mt-2 space-y-0.5">
          {resume.basics.profiles.map((p, idx) => (
            <li key={`${p.network}-${idx}`}>
              {p.network}:{" "}
              <a href={p.url} className="underline text-secondary">
                {p.username ?? p.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
