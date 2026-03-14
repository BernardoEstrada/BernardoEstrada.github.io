import { useEffect } from "react";

/**
 * Static viewport styles applied to html, body, and #root so the page is
 * non-scrollable and fixed in a webview (e.g. for full-screen app-like subpaths).
 */
const STATIC_STYLES = {
  height: "100%",
  overflow: "hidden",
  overscrollBehavior: "none",
} as const;

const STYLE_KEYS = Object.keys(STATIC_STYLES) as (keyof typeof STATIC_STYLES)[];

function getCssKey(jsKey: string): string {
  return jsKey
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
}

function captureAndApply(el: HTMLElement): Record<string, string> {
  const prev: Record<string, string> = {};

  for (const key of STYLE_KEYS) {
    const cssKey = getCssKey(key);
    prev[key] = el.style.getPropertyValue(cssKey) || "";
    el.style.setProperty(cssKey, STATIC_STYLES[key]);
  }
  return prev;
}

function restore(el: HTMLElement, prev: Record<string, string>): void {
  for (const key of STYLE_KEYS) {
    const cssKey = getCssKey(key);
    if (prev[key]) el.style.setProperty(cssKey, prev[key]);
    else el.style.removeProperty(cssKey);
  }
}

/**
 * Applies static viewport styles to html, body, and #root while the component
 * is mounted. Restores previous styles on unmount. Use in route-level components
 * when you want that subpath to be completely static in a webview (no scroll,
 * fixed viewport).
 *
 * @example
 * function OsPortfolio() {
 *   useStaticViewport();
 *   return <DesktopLayout />;
 * }
 */
export function useStaticViewport(): void {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById("root");

    const prevHtml = captureAndApply(html);
    const prevBody = captureAndApply(body);
    const prevRoot = root ? captureAndApply(root) : null;

    return () => {
      restore(html, prevHtml);
      restore(body, prevBody);
      if (root && prevRoot) restore(root, prevRoot);
    };
  }, []);
}
