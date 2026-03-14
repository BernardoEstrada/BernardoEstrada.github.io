import { useEffect, useRef, useState } from 'react';
import type { Section } from './constants';
import { COMMANDS } from './constants';

const ANIMATION_DURATION_MS = 300;

interface CommandDrawerProps {
  open: boolean;
  onClose: () => void;
  section: Section;
  onSelect: (section: Section) => void;
}

export default function CommandDrawer({ open, onClose, section, onSelect }: CommandDrawerProps) {
  const [entered, setEntered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (open) {
      setEntered(false);
      setIsClosing(false);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setEntered(true));
      });
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  }, []);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      closeTimeoutRef.current = null;
      onClose();
      setIsClosing(false);
      setEntered(false);
    }, ANIMATION_DURATION_MS);
  };

  const handleSelect = (s: Section) => {
    onSelect(s);
    handleClose();
  };

  const visible = open || isClosing;
  const panelClosed = !entered || isClosing;

  if (!visible) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        className={`fixed inset-0 z-40 bg-base-100/80 backdrop-blur-sm transition-opacity duration-300 ease-out md:hidden ${
          entered && !isClosing ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 max-h-[70vh] overflow-auto rounded-t-2xl border border-b-0 border-base-300 bg-base-200 shadow-2xl pb-[env(safe-area-inset-bottom)] transition-transform duration-300 ease-out md:hidden ${
          panelClosed ? 'translate-y-full' : 'translate-y-0'
        }`}
        role="dialog"
        aria-label="Commands"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-base-300 bg-base-200/95 px-4 py-3">
          <span className="text-accent/90 text-xs font-medium uppercase tracking-wider">Commands</span>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-ghost btn-sm btn-square"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <nav className="space-y-0.5 p-3 pb-6">
          {COMMANDS.map(({ title, cmd, section: s }) => (
            <button
              key={cmd}
              type="button"
              onClick={() => handleSelect(s)}
              className={`flex w-full flex-col items-start rounded-lg px-3 py-3 text-left ${
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
      </div>
    </>
  );
}
