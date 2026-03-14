
export default function HelpOutput() {
  return (
    <div className="space-y-1 text-sm text-base-content/90">
      <p className="text-base-content/70 font-medium">Available commands:</p>
      <ul className="list-disc list-inside space-y-0.5">
        <li><span className="text-primary">clear</span> — clear screen</li>
        <li><span className="text-primary">help</span> — show this help</li>
        <li><span className="text-primary">ls</span> — list files and directories</li>
        <li><span className="text-primary">ls experience/</span> — list experience</li>
        <li><span className="text-primary">cat about.txt</span> — about me</li>
        <li><span className="text-primary">./skills</span> — skills (full-screen, filterable)</li>
        <li><span className="text-primary">cat welcome.txt</span> — welcome message</li>
        <li><span className="text-primary">./contact.sh</span> — contact info</li>
      </ul>
      <p className="mt-2 text-xs text-base-content/60">Tab — autocomplete commands</p>
    </div>
  );
}