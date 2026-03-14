interface Profile {
  network?: string;
  url?: string;
}

interface ContactOutputProps {
  email?: string;
  profiles?: Profile[];
  showCommand?: boolean; // ignored
}

export default function ContactOutput({ email, profiles = [] }: ContactOutputProps) {
  return (
    <div className="space-y-1 text-sm text-base-content/90">
      {email && (
        <p>
          <span className="text-base-content/70">Email: </span>
          <a href={`mailto:${email}`} className="link link-primary">
            {email}
          </a>
        </p>
      )}
      {profiles.map((p, i) => (
        <p key={i}>
          <span className="text-base-content/70">{p.network}:</span>{' '}
          {p.url ? (
            <a href={p.url} target="_blank" rel="noreferrer" className="link link-secondary">
              {p.url}
            </a>
          ) : null}
        </p>
      ))}
    </div>
  );
}