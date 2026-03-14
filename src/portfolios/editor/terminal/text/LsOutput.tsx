
export default function LsOutput() {
  const entries = [
    { name: 'about.txt', type: 'file' },
    { name: 'experience/', type: 'dir' },
    { name: 'skills', type: 'file' },
    { name: 'contact.sh', type: 'file' },
    { name: 'welcome.txt', type: 'file' },
  ];

  return (
    <div className="text-sm text-base-content/90">
      {entries.map((e) => (
        <span key={e.name} className="inline-block mr-6 mb-0.5">
          {e.type === 'dir'
            ? <span className="text-accent">{e.name}</span>
            : <span className="text-base-content/80">{e.name}</span>}
        </span>
      ))}
    </div>
  );
}