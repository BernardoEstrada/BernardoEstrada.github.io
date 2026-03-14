export enum Themes {
  DEVICE_SETTINGS = "device-settings",
  // DaisyUI built-in themes
  LIGHT = "light",
  DARK = "dark",
  CUPCAKE = "cupcake",
  BUMBLEBEE = "bumblebee",
  EMERALD = "emerald",
  CORPORATE = "corporate",
  SYNTHWAVE = "synthwave",
  RETRO = "retro",
  CYBERPUNK = "cyberpunk",
  VALENTINE = "valentine",
  HALLOWEEN = "halloween",
  GARDEN = "garden",
  FOREST = "forest",
  AQUA = "aqua",
  LOFI = "lofi",
  PASTEL = "pastel",
  FANTASY = "fantasy",
  WIREFRAME = "wireframe",
  BLACK = "black",
  LUXURY = "luxury",
  DRACULA = "dracula",
  CMYK = "cmyk",
  AUTUMN = "autumn",
  BUSINESS = "business",
  ACID = "acid",
  LEMONADE = "lemonade",
  NIGHT = "night",
  COFFEE = "coffee",
  WINTER = "winter",

  // Custom themes from tailwind.config.js
  VSDARK = "vsdark",
  MONOKAI = "monokai",
  NORD = "nord",
  GITHUBLIGHT = "githublight",
  TERMINAL = "terminal",
  CRT1990 = "crt1990",
  WIN95 = "win95",
  MACCLASSIC = "macclassic",
}

export const DEFAULT_DARK = Themes.NIGHT;
export const DEFAULT_LIGHT = Themes.WINTER;

export function applyTheme(theme: Themes | string) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
}
