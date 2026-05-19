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

### Bun — Why It Feels Faster

Bun is a newer JavaScript runtime, similar to Node.js, but built for speed. Think of it like switching from a regular printer to a laser printer — it does the same job, just much faster. When setting up a project, developers first need to "install" all the tools and libraries the project depends on. With the traditional tool (npm), this took about 40–60 seconds. With Bun, the exact same step finished in under 3 seconds. The dev server (the local preview you use while building) also starts almost instantly. For a project like this where you're constantly tweaking and checking the result, that speed adds up.

### Tailwind CSS v4 — What Changed

Tailwind CSS is a tool that makes it easy to style a website without writing raw CSS from scratch — it provides a library of pre-built style "building blocks." Version 4 is a significant update that changed how the tool is configured. In the older version, you had to maintain a separate configuration file (`tailwind.config.js`) telling Tailwind which files to scan and what custom values to use. In v4, all of that moves directly into the CSS file itself using a new `@theme` syntax. The result: one less file to manage, and the design tokens (colors, spacing, fonts) live right next to the styles that use them. It's a cleaner mental model, similar to how Figma keeps styles and components in the same file rather than a separate style guide document.

### Scrollbar Design

Browsers have traditionally had their own scrollbar styles, and customizing them required using browser-specific hacks that weren't part of any official standard. The modern approach — which this project uses — relies on two official CSS properties: `scrollbar-width` (controls thickness) and `scrollbar-color` (controls the color). These are now part of the web standard, documented on MDN (Mozilla's official web reference). The scrollbar here is intentionally thin and semi-transparent so it doesn't distract from the color content, and it automatically adjusts for dark and light mode.

### Mobile Optimization & Font

The entire layout is a single vertical column, designed to be comfortable with one thumb on a phone screen. Every tappable element — the color swatch button, the text input, and each color card — is at least 48×48 pixels. This follows Apple and Google's touch target guidelines, which recommend that minimum size to prevent accidental taps. The font is Geist Sans, designed by Vercel. It was chosen because it renders the dense numerical values (like `oklch(0.627 0.258 29.2)`) clearly and crisply even at small sizes — readability was the priority over personality here.

### Deployment Platform

Vercel is the company behind Next.js, so deploying a Next.js project there requires zero extra configuration — it already knows how to build and serve it. Once the GitHub repository is connected, every time new code is pushed, Vercel automatically rebuilds and redeploys the site within about a minute. It also runs on a global network, meaning the site loads fast regardless of where the visitor is located. The first deployment was done entirely from the terminal in a single command.

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
