"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ColorCardProps {
  label: string;
  value: string;
}

export function ColorCard({ label, value }: ColorCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Card
      onClick={handleCopy}
      className="cursor-pointer select-none transition-all active:scale-[0.98] hover:shadow-md min-h-[72px] flex items-center justify-between gap-4 px-5 py-4"
    >
      <div className="flex items-center gap-3 min-w-0">
        <Badge variant="secondary" className="shrink-0 text-xs font-mono uppercase tracking-wider">
          {label}
        </Badge>
        <span className="font-mono text-sm text-foreground truncate">{value}</span>
      </div>
      <span className="text-xs text-muted-foreground shrink-0 transition-opacity">
        {copied ? "Copied!" : "Copy"}
      </span>
    </Card>
  );
}
