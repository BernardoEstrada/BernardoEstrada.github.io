interface CommandsMenuButtonProps {
  onClick: () => void;
}

export default function CommandsMenuButton({ onClick }: CommandsMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-24 left-4 z-30 flex items-center gap-2 rounded-lg border border-base-300 bg-base-200 px-3 py-2 text-sm shadow-lg md:hidden"
      aria-label="Open commands"
    >
      <span className="text-success">$</span>
      <span>Commands</span>
    </button>
  );
}
