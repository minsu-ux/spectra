# Spectra — Color Model Explorer

> Pick one color. See it everywhere.

**Spectra** is an interactive, single-page color picker that instantly converts any color into 7 color models — HEX, RGB, HSL, LCH, OKLCH, LAB, and XYZ — all synchronized in real time.

**Live site:** https://spectra-bice-nu.vercel.app

---

## Naming & Concept

The name **Spectra** comes from the visible light spectrum — one source of light, refracted into many wavelengths. That's exactly what this tool does: one color, expressed across every model. The concept is about clarity and translation: not just showing values, but making different color spaces feel approachable and tangible.

---

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Tech Stack

| Layer | Choice |
|---|---|
| Runtime | Bun |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | Shadcn UI + Tailwind CSS v4 |
| Color Engine | culori |
| Theming | next-themes |
| Deployment | Vercel |

---

## Development Notes

### Bun DX & Speed

Switching to Bun made a noticeable difference. Cold installs that took 40–60s with npm finished in under 3s with Bun. The `bun.lock` file is binary, keeping diffs clean in version control. `bun dev` startup is also faster — the dev server is ready almost instantly. Overall, Bun felt like the right choice for a project where iteration speed matters.

### Tailwind CSS v4 — What's Different

Tailwind v4 removes `tailwind.config.js` entirely. Configuration now lives in CSS via `@theme` and `@import "tailwindcss"` — no `content` glob arrays, no plugin config files. Design tokens are CSS custom properties by default. The migration required learning a new mental model, but the result is cleaner: styles and tokens coexist in one CSS file, and there's no build config to maintain. Shadcn's `--defaults` init worked cleanly with v4 out of the box.

### Scrollbar Design

Implemented using the [CSS Scrollbars Styling](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scrollbars_styling) specification — specifically `scrollbar-width: thin` and `scrollbar-color`. This is the modern, standards-based approach without relying on the legacy `::-webkit-scrollbar` pseudo-element. It's natively supported in Firefox and Chrome 121+. The color uses `oklch` with low opacity for a semi-transparent, non-intrusive look that adapts to both light and dark themes.

### Mobile Optimization & Font

The layout is a single column (`max-w-lg`) with generous padding, designed for one-handed use. All interactive elements — the color picker button, HEX input, and color model cards — are minimum 48×48px, following touch target guidelines. Geist Sans was chosen for its clean geometry and excellent legibility at small sizes on screen, which matters when displaying dense numeric values like `oklch(0.627 0.258 29.2)`.

### Deployment Platform

Vercel was the natural choice for a Next.js project — zero configuration, automatic preview deployments per branch, and a global edge network. The CLI (`bunx vercel --prod`) made the first deployment a single command.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout, ThemeProvider, metadata
│   ├── page.tsx           # Main page, state management
│   └── globals.css        # Tailwind v4 tokens, scrollbar styles
├── components/
│   ├── color-input.tsx    # HEX text input + native color picker
│   ├── color-card.tsx     # Per-model display card with copy
│   ├── theme-switcher.tsx # Dark/light toggle
│   └── ui/                # Shadcn components (card, badge, button)
└── lib/
    └── colors.ts          # culori conversion logic (Single Source of Truth)
```

## Data Flow

```
User Input (HEX / Picker)
        ↓
    React State (hex string)
        ↓
    culori converter()
        ↓
  7 color model values
        ↓
    ColorCard × 7
```
