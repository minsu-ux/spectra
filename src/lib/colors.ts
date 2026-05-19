import { converter, formatHex, parse } from "culori";

const toRgb = converter("rgb");
const toHsl = converter("hsl");
const toLch = converter("lch");
const toOklch = converter("oklch");
const toLab = converter("lab");
const toXyz65 = converter("xyz65");

export interface ColorModels {
  hex: string;
  rgb: string;
  hsl: string;
  lch: string;
  oklch: string;
  lab: string;
  xyz: string;
}

function r(n: number | undefined, decimals = 2): number {
  if (n === undefined || isNaN(n)) return 0;
  return Math.round(n * 10 ** decimals) / 10 ** decimals;
}

export function hexToModels(hex: string): ColorModels | null {
  const parsed = parse(hex);
  if (!parsed) return null;

  const rgb = toRgb(parsed);
  const hsl = toHsl(parsed);
  const lch = toLch(parsed);
  const oklch = toOklch(parsed);
  const lab = toLab(parsed);
  const xyz = toXyz65(parsed);

  return {
    hex: formatHex(parsed).toUpperCase(),
    rgb: `rgb(${r((rgb?.r ?? 0) * 255, 0)}, ${r((rgb?.g ?? 0) * 255, 0)}, ${r((rgb?.b ?? 0) * 255, 0)})`,
    hsl: `hsl(${r(hsl?.h ?? 0, 1)}, ${r((hsl?.s ?? 0) * 100, 1)}%, ${r((hsl?.l ?? 0) * 100, 1)}%)`,
    lch: `lch(${r(lch?.l, 1)} ${r(lch?.c, 2)} ${r(lch?.h ?? 0, 1)})`,
    oklch: `oklch(${r(oklch?.l, 3)} ${r(oklch?.c, 3)} ${r(oklch?.h ?? 0, 1)})`,
    lab: `lab(${r(lab?.l, 1)} ${r(lab?.a, 2)} ${r(lab?.b, 2)})`,
    xyz: `xyz(${r(xyz?.x, 4)} ${r(xyz?.y, 4)} ${r(xyz?.z, 4)})`,
  };
}

export function isValidHex(value: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);
}
