---
name: ui-ux-pro-max
description: >-
  Opinionated UI/UX, i18n, accessibility and design-consistency review playbook
  for this repo (Next.js 16 App Router, Tailwind v4, CSS-variable theming,
  nl/en/es locales). Use when asked to audit the UI/UX, hunt for inconsistencies
  (wrong translations, mismatched headers/footers, font sizes, colors, contrast),
  enforce the design system, or review a page/component before shipping. Produces
  evidence-based findings (file:line), severity, and concrete fixes.
---

# UI/UX Pro Max

A repeatable, evidence-first review process. **Never hand-wave.** Every finding
must cite `file:line` and propose a concrete fix. Prefer running the real app and
rendering real output (incl. OG images) over reasoning from memory.

## 0. Ground rules

- **Single source of truth for design tokens.** Colors, type scale, spacing and
  radius live in `src/app/globals.css` and `docs/DESIGN-SYSTEM.md`. Flag any
  hardcoded hex (`#C9A843`, `border-[#1a1a1a]`, …) in components — it should be a
  CSS var (`var(--gold)`, `var(--border)`) or a themed utility (`.c-gold`,
  `.border-themed`).
- **Theme-aware or it's a bug.** Anything that sets a raw dark color
  (`border-[#1a1a1a]`, `text-slate-700`, `bg-[#0D0D0D]`) must have a matching
  `[data-theme="light"]` override, or use a themed token. Test both themes.
- **i18n is total.** No user-visible string may be hardcoded in a component. All
  three locales (`nl`, `en`, `es`) must exist, be correct, and use **consistent
  terminology** across the live UI, the cards, and the OG images.
- **Legibility floor.** Body/interactive text ≥ 12px; never below 11px for
  anything a user must read; ≤10px only for non-essential metadata, and even then
  prefer 11px. Contrast ≥ 4.5:1 (normal) / 3:1 (large/≥18px bold).

## 1. Inventory every surface first

Enumerate before judging. Cover **all pages × all locales × both themes × mobile+desktop**.

```bash
# All routes
find src/app -name page.tsx | sort
# Which top-level routes redirect vs render (duplication check)
grep -rln "redirect(" src/app/*/page.tsx
# Locales
grep -n "LOCALES" src/i18n/index.ts
```

Build the matrix: for each route, visit `/nl/…`, `/en/…`, `/es/…` in light and
dark, at 375px and 1280px. The shared chrome (header, nav, footer) must be
identical in structure across pages — if it's re-implemented per page, that's a
finding.

## 2. Translation & terminology audit

1. Read `src/i18n/{nl,en,es}.ts` in full, side by side. Check:
   - **Key parity** — same keys in all three (TS `Messages` type enforces shape,
     but values can still be wrong/empty/placeholder).
   - **Mixed-language values** — e.g. an English term inside a Dutch string
     (`grep -nE "Round of|Group|Quarter" src/i18n/nl.ts`).
   - **Terminology consistency across contexts.** The same concept must use the
     same word in the live UI (`bracket.*`), the share card (`ogCard.*`), and any
     hardcoded component. Round-of-16 in Dutch is **"Achtste finale"** (1/8), NOT
     "1/16e finale" (that's the Round of 32). Build a term table and diff it.
2. **Hunt hardcoded strings** in components/pages (outside `src/i18n` and blog content):
   ```bash
   grep -rnE "'[A-Z][a-zé]{3,}( [a-zé]+)*'" src/components src/app/[lang] \
     --include=*.tsx | grep -ivE "className|aria-|svg|stroke|fill|import|msg\.|t\.|oc\."
   ```
   Any match that is user-visible copy is a bug (e.g. `UCLBracket` desktop column
   labels, `DrawClient` tooltips).
3. **Per-locale hero/brand checks.** Search for `lang === ` ternaries that only
   handle a subset of locales (a missing branch silently falls back to the wrong
   language — e.g. an English page rendering the Dutch "WK").

## 3. Header / nav / footer consistency

- There should be **one** `<Header>`/`<Nav>` and **one** `<Footer>` component,
  reused everywhere. Inline per-page footers drift.
  ```bash
  grep -rn "<footer" src/app/[lang] --include=*.tsx   # count distinct implementations
  ```
- Diff: border treatment (`border-themed` vs hardcoded `border-[#141414]`),
  padding (`py-4/5/6`), link set, contrast, and locale links.

## 4. Color / theme audit

```bash
grep -rhoE "#[0-9A-Fa-f]{6}" src/components src/app/[lang] --include=*.tsx | sort | uniq -c | sort -rn
grep -rnE "(text|bg|border)-\[#" src --include=*.tsx        # raw arbitrary colors
grep -rn "1A3050|0B1628|081020" src --include=*.tsx --include=*.css   # old-palette leftovers
```
Flag: hardcoded hex that duplicates a token; raw colors with no light override;
leftover palette values; >1 source of truth for the same color (CSS var **and**
`.c-*` utility **and** inline hex).

## 5. Typography & spacing audit

```bash
grep -rohE "text-\[[0-9.]+px\]" src --include=*.tsx | sort | uniq -c | sort -rn
```
Flag everything `≤10px` for review; anything `≤9px` is almost always too small.
Recommend a named scale (see design system) instead of arbitrary px. Check radius
(`borderRadius: '0 6px 0 6px'`-style) is tokenized, not copy-pasted.

## 6. Accessibility pass

- Tap targets ≥ 44×44 (`min-h-[44px]`).
- Interactive elements are real `<button>`/`<a>` with `aria-label` when icon-only.
- Visible focus states; `aria-pressed`/`aria-current` on toggles.
- Don't kill contrast with `opacity-40` on text links.
- Color is never the only signal (pair with ✓/✗/text).

## 7. Render the real thing

- Run the app: `PORT=<p> npm start` after `npm run build`. Curl pages, `grep` SSR
  HTML for the strings you expect per locale.
- For OG/share images (`/api/og/*`): generate a real PNG and **view it** —
  Satori ≠ browser CSS (no `gap` in some flex cases, needs explicit `display:flex`,
  limited absolute positioning). Verify both `?lang=nl` and `?lang=en`, with and
  without a champion/result.

## 8. Output format

Produce findings as a table: **Severity** (P0 broken / P1 inconsistent / P2 polish)
· **Area** · **Evidence (`file:line`)** · **Fix**. Then a phased plan
(tokens → shared components → i18n → polish). Keep `docs/DESIGN-SYSTEM.md` as the
canonical rulebook and update it when tokens change. Verify with `npm run build`
and `npm test` before claiming done.
