import type { Section } from './constants';

/** All runnable commands for autocomplete and execution */
export const TERMINAL_COMMANDS = [
  'clear',
  'help',
  'ls',
  'ls experience/',
  'cat about.txt',
  './skills',
  'cat welcome.txt',
  './contact.sh',
] as const;

export type TerminalCommand = (typeof TERMINAL_COMMANDS)[number];

/**
 * Parse and run a command line.
 * Commands are matched by the first token (the "command") and the rest are treated as arguments.
 * Returns the section to show, or null for clear/welcome/unknown.
 */
export function runCommand(line: string): Section {
  const trimmed = line.trim();
  if (!trimmed) return null;

  const lower = trimmed.toLowerCase();
  const [cmd, ...args] = lower.split(/\s+/);

  // basic commands without arguments
  if (cmd === 'clear') return null;
  if (cmd === 'help') return 'help';

  if (cmd === 'ls') {
    if (args.length === 0) return 'ls';
    const path = args.join(' ').replace(/\/$/, '');
    if (path === 'experience') return 'experience';
    return null;
  }

  if (cmd === 'cat') {
    if (args.length === 0) return null;
    const target = args.join(' ');
    const normalized = target.replace(/\.txt$/, '');
    if (normalized === 'about') return 'about';
    if (normalized === 'welcome') return null; // cat welcome.txt -> welcome.txt content
    return null;
  }

  if (cmd === './skills' || cmd === 'skills') return 'skills';
  if (cmd === './contact.sh' || cmd === 'contact.sh' || cmd === 'contact') return 'contact';

  return null;
}

/**
 * Get command suggestions for autocomplete. Matches from the start (case-insensitive).
 */
const MAX_SUGGESTIONS = 8;

export function getSuggestions(partial: string): string[] {
  const p = partial.trim().toLowerCase();
  if (!p) return TERMINAL_COMMANDS.slice(0, MAX_SUGGESTIONS);
  const startsWith = TERMINAL_COMMANDS.filter((c) => c.startsWith(p));
  const includes = TERMINAL_COMMANDS.filter((c) => !c.startsWith(p) && c.includes(p));
  return [...startsWith, ...includes].slice(0, MAX_SUGGESTIONS);
}

/**
 * Get the single best completion for the current partial (first suggestion that starts with partial).
 * Returns the completed string or null if no match.
 */
export function getCompletion(partial: string): string | null {
  const p = partial.trim().toLowerCase();
  if (!p) return null;
  const match = TERMINAL_COMMANDS.find((c) => c.startsWith(p));
  return match ?? null;
}
