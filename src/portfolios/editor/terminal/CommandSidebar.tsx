import type { Section } from './constants';
import { COMMANDS } from './constants';

interface CommandSidebarProps {
  section: Section;
  onSelect: (section: Section) => void;
}

export default function CommandSidebar({ section, onSelect }: CommandSidebarProps) {
  return (
    <aside className="hidden w-56 flex-shrink-0 border-r border-base-300 bg-base-200/80 p-3 md:block">
      <div className="text-accent/80 mb-2 px-2 text-xs uppercase tracking-wider">Commands</div>
      <nav className="space-y-0.5">
        {COMMANDS.map(({ title, cmd, section: s }) => (
          <button
            key={cmd}
            type="button"
            onClick={() => onSelect(s)}
            className={`flex w-full flex-col items-start rounded px-2 py-1.5 text-left ${
              section === s ? 'bg-primary/20 text-primary' : 'text-base-content/80 hover:bg-base-300/80'
            }`}
          >
            <span className="text-sm font-medium">{title}</span>
            <span className="text-xs opacity-70">
              <span className="text-success">$</span> {cmd}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
