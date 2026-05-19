"use client";

import { useRef } from "react";

interface ColorInputProps {
  hex: string;
  onChange: (hex: string) => void;
  isError: boolean;
}

export function ColorInput({ hex, onChange, isError }: ColorInputProps) {
  const pickerRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-3">
      {/* Browser native color picker */}
      <button
        type="button"
        onClick={() => pickerRef.current?.click()}
        className="w-14 h-14 rounded-xl border-2 border-border shadow-sm shrink-0 transition-transform active:scale-95 overflow-hidden"
        style={{ backgroundColor: isError ? "#888888" : hex }}
        aria-label="Open color picker"
      >
        <input
          ref={pickerRef}
          type="color"
          value={isError ? "#888888" : hex}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
          tabIndex={-1}
        />
      </button>

      {/* HEX text input */}
      <div className="flex-1">
        <input
          type="text"
          value={hex}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          spellCheck={false}
          className={`
            w-full h-14 px-4 rounded-xl border-2 font-mono text-lg tracking-widest uppercase
            bg-background text-foreground outline-none transition-colors
            ${isError
              ? "border-destructive text-destructive placeholder:text-destructive/50"
              : "border-border focus:border-ring"
            }
          `}
        />
        {isError && (
          <p className="mt-1.5 text-xs text-destructive pl-1">
            Enter a valid HEX color (e.g. #FF5733)
          </p>
        )}
      </div>
    </div>
  );
}
