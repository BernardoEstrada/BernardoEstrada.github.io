export default function TerminalTitleBar() {
  return (
    <div className="flex flex-shrink-0 items-center gap-2 border-b border-base-300 bg-base-300/80 px-3 py-2">
      <span className="h-3 w-3 rounded-full bg-error/80" />
      <span className="h-3 w-3 rounded-full bg-warning/80" />
      <span className="h-3 w-3 rounded-full bg-success/80" />
      <span className="ml-2 text-base-content/70 text-sm">portfolio — zsh</span>
    </div>
  );
}
