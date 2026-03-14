import { useState, lazy, Suspense } from "react";

const TerminalLayout = lazy(() => import("./terminal/TerminalLayout"));

const THEMES = ["vsdark", "monokai", "nord", "githublight", "terminal"] as const;
type ThemeId = (typeof THEMES)[number];

export default function EditorPortfolio() {
  const [theme, setTheme] = useState<ThemeId>("vsdark");

  const applyTheme = (t: ThemeId) => {
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  };

  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-base-100">
      <header className="flex-shrink-0 border-b border-base-300 bg-base-200/95 backdrop-blur font-mono text-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-3 px-4 py-2">
          <span className="text-base-content/60">Theme:</span>
          <select
            value={theme}
            onChange={(e) => applyTheme(e.target.value as ThemeId)}
            className="select select-bordered select-sm bg-base-100"
          >
            {THEMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="min-h-0 flex-1">
        <Suspense fallback={null}>
          <TerminalLayout />
        </Suspense>
      </div>
    </div>
  );
}
