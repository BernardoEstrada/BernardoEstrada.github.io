import { useEffect, useRef, useState } from 'react';

interface TerminalPromptProps {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
  suggestions: string[];
  history: string[];
}

export default function TerminalPrompt({ value, onChange, onRun, suggestions, history }: TerminalPromptProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const draftRef = useRef('');

  useEffect(() => {
    setSelectedIndex(0);
  }, [value, suggestions]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onRun();
      setHistoryIndex(-1);
      return;
    }
    const hasText = value.trim() !== '';
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex >= 0 || (!hasText && history.length > 0)) {
        if (history.length === 0) return;
        if (historyIndex < 0) draftRef.current = value;
        const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        onChange(history[nextIndex] ?? '');
        return;
      }
      if (hasText && suggestions.length > 0) {
        const nextIndex = (selectedIndex - 1 + suggestions.length) % suggestions.length;
        setSelectedIndex(nextIndex);
        onChange(suggestions[nextIndex] ?? '');
        return;
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0 && history.length > 0) {
        if (historyIndex >= history.length - 1) {
          setHistoryIndex(-1);
          onChange(draftRef.current);
          return;
        }
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        onChange(history[nextIndex] ?? '');
        return;
      }
      if (hasText && suggestions.length > 0) {
        const nextIndex = (selectedIndex + 1) % suggestions.length;
        setSelectedIndex(nextIndex);
        onChange(suggestions[nextIndex] ?? '');
        return;
      }
      return;
    }
    if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      const next = suggestions[selectedIndex % suggestions.length];
      if (next) {
        onChange(next);
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
      }
      return;
    }
    if (e.key === 'Escape') {
      setHistoryIndex(-1);
      return;
    }
    setHistoryIndex(-1);
  };

  const showSuggestionsList = value.trim() !== '' && suggestions.length > 0;
  const limitedSuggestions = showSuggestionsList ? suggestions.slice(0, 6) : [];

  return (
    <div className="relative flex-shrink-0 border-t border-base-300 bg-base-200">
      {limitedSuggestions.length > 0 && (
        <ul
          className="absolute bottom-full left-0 right-0 max-h-40 overflow-auto border border-b-0 border-base-300 bg-base-200 py-1 text-sm"
          role="listbox"
        >
          {limitedSuggestions.map((s, i) => (
            <li
              key={s}
              role="option"
              aria-selected={i === selectedIndex}
              className={`cursor-pointer px-4 py-1.5 ${
                i === selectedIndex ? 'bg-primary/20 text-primary' : 'text-base-content/80 hover:bg-base-300/80'
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(s);
                setSelectedIndex(0);
              }}
            >
              <span className="text-success">$</span> {s}
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center gap-2 px-4 py-2">
        <span className="text-success">$</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder=" type a command (try 'help' or 'ls')..."
          className="flex-1 bg-transparent outline-none placeholder:opacity-50"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-autocomplete="list"
        />
      </div>
    </div>
  );
}
