// Shared daisyUI custom themes for Bernardo's portfolios.
// You can copy this file into other projects and import `customThemes`
// from your Tailwind config to reuse the same look & feel.

export const vsdark = {
  // VS Code Dark+
  primary: "#569cd6",
  secondary: "#4ec9b0",
  accent: "#c586c0",
  neutral: "#1e1e1e",
  "base-100": "#1e1e1e",
  "base-200": "#252526",
  "base-300": "#2d2d30",
  info: "#569cd6",
  success: "#4ec9b0",
  warning: "#dcdcaa",
  error: "#f48771",
};

export const monokai = {
  primary: "#a6e22e",
  secondary: "#66d9ef",
  accent: "#ae81ff",
  neutral: "#272822",
  "base-100": "#272822",
  "base-200": "#3e3d32",
  "base-300": "#49483e",
  info: "#66d9ef",
  success: "#a6e22e",
  warning: "#e6db74",
  error: "#f92672",
};

export const nord = {
  primary: "#88c0d0",
  secondary: "#8fbcbb",
  accent: "#b48ead",
  neutral: "#2e3440",
  "base-100": "#2e3440",
  "base-200": "#3b4252",
  "base-300": "#434c5e",
  info: "#88c0d0",
  success: "#a3be8c",
  warning: "#ebcb8b",
  error: "#bf616a",
};

export const githublight = {
  primary: "#0969da",
  secondary: "#0550ae",
  accent: "#8250df",
  neutral: "#f6f8fa",
  "base-100": "#ffffff",
  "base-200": "#f6f8fa",
  "base-300": "#eaeef2",
  info: "#0969da",
  success: "#1a7f37",
  warning: "#9a6700",
  error: "#cf222e",
};

export const terminal = {
  primary: "#00ff41",
  secondary: "#39ff14",
  accent: "#7fff00",
  neutral: "#0d1117",
  "base-100": "#0d1117",
  "base-200": "#161b22",
  "base-300": "#21262d",
  info: "#58a6ff",
  success: "#00ff41",
  warning: "#d29922",
  error: "#f85149",
};

export const crt1990 = {
  primary: "#ffdd73",
  secondary: "#f4a261",
  accent: "#e76f51",
  neutral: "#2b1b12",
  "base-100": "#3b2617",
  "base-200": "#2b1b12",
  "base-300": "#1a0f09",
  info: "#ffdd73",
  success: "#b4f8c8",
  warning: "#f4a261",
  error: "#f94144",
};

export const win95 = {
  primary: "#000080",
  secondary: "#008080",
  accent: "#c0c0c0",
  neutral: "#808080",
  "base-100": "#c0c0c0",
  "base-200": "#a0a0a0",
  "base-300": "#808080",
  info: "#000080",
  success: "#008000",
  warning: "#d4aa00",
  error: "#800000",
};

export const macclassic = {
  primary: "#000000",
  secondary: "#4d4d4d",
  accent: "#0000aa",
  neutral: "#808080",
  "base-100": "#d9d9d9",
  "base-200": "#c0c0c0",
  "base-300": "#a3a3a3",
  info: "#0000aa",
  success: "#007200",
  warning: "#a06000",
  error: "#aa0000",
};

// daisyUI expects an array of theme objects
export const customThemes = [
  { vsdark },
  { monokai },
  { nord },
  { githublight },
  { terminal },
  { crt1990 },
  { win95 },
  { macclassic },
];

