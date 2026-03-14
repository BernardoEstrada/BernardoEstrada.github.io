import hslToHex from "hsl-to-hex";

const availableColors = [
  "p",
  "pf",
  "pc",
  "s",
  "sf",
  "sc",
  "a",
  "af",
  "ac",
  "n",
  "nf",
  "nc",
  "b1",
  "b2",
  "b3",
  "bc",
  "in",
  "inc",
  "su",
  "suc",
  "wa",
  "wac",
  "er",
  "erc",
] as const;

export type Colors = (typeof availableColors)[number];

const getHexFrom = (variable: string) => {
  const hslStr = getComputedStyle(document.documentElement).getPropertyValue(variable);
  const hslArr = hslStr.match(/[\d]+/g)?.map((v) => parseInt(v));
  if (!hslArr) return "#000000";
  return hslToHex(hslArr[0], hslArr[1], hslArr[2]);
};

export const getThemeColors = (): Record<Colors, string> => {
  return availableColors.reduce(
    (prev, curr) => {
      prev[curr] = getHexFrom(`--${curr}`);
      return prev;
    },
    {} as Record<Colors, string>,
  );
};
