"use client";

import { useState, useMemo } from "react";
import { ColorInput } from "@/components/color-input";
import { ColorCard } from "@/components/color-card";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hexToModels, isValidHex, type ColorModels } from "@/lib/colors";

const DEFAULT_HEX = "#3B82F6";

const MODEL_LABELS: Array<{ key: keyof ColorModels; label: string }> = [
  { key: "hex", label: "HEX" },
  { key: "rgb", label: "RGB" },
  { key: "hsl", label: "HSL" },
  { key: "lch", label: "LCH" },
  { key: "oklch", label: "OKLCH" },
  { key: "lab", label: "LAB" },
  { key: "xyz", label: "XYZ" },
];

export default function Home() {
  const [hex, setHex] = useState(DEFAULT_HEX);

  const isError = !isValidHex(hex);
  const models = useMemo(() => (isError ? null : hexToModels(hex)), [hex, isError]);

  const previewColor = isError ? "#888888" : hex;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full shrink-0 transition-colors duration-300"
            style={{ backgroundColor: previewColor }}
          />
          <span className="font-semibold text-sm tracking-tight">Spectra</span>
        </div>
        <ThemeSwitcher />
      </header>

      <main className="flex-1 max-w-lg w-full mx-auto px-5 py-8 flex flex-col gap-8">
        {/* Color preview swatch */}
        <div
          className="w-full h-36 rounded-2xl border border-border transition-colors duration-300 shadow-sm"
          style={{ backgroundColor: previewColor }}
        />

        {/* Input */}
        <ColorInput hex={hex} onChange={setHex} isError={isError} />

        {/* Color model cards */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest px-1">
            Color Models
          </p>
          {MODEL_LABELS.map(({ key, label }) => (
            <ColorCard
              key={key}
              label={label}
              value={models ? models[key] : "—"}
            />
          ))}
        </div>
      </main>

      <footer className="text-center py-5 text-xs text-muted-foreground">
        Click any card to copy its value
      </footer>
    </div>
  );
}
