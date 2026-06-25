# ScorePath — UI/UX Audit & Improvement Plan

Evidence-based review of the whole site across **all routes, all locales
(nl/en/es), both themes**. Produced with the `ui-ux-pro-max` skill. Companion:
`docs/DESIGN-SYSTEM.md`.

Severity: **P0** = visibly broken/wrong · **P1** = inconsistent/theming/i18n gap
· **P2** = polish/cleanup.

---

## 1. Scope & method

- Read all of `src/i18n/{nl,en,es}.ts` and compared values + terminology.
- Enumerated every route; checked the top-level (non-`[lang]`) routes redirect
  (no duplicate render): ✅ all of `/`, `/start`, `/privacy`, `/blog`,
  `/wk-2026`, `/ucl-2027`, `/wk-geboorteplaats` call `redirect()`.
- Grepped fonts, colors, hardcoded strings, footers; read shared chrome
  (`SimulatorHeader`, `globals.css`) and key pages.
- Rendered the OG bracket image as a real PNG (nl + en) during prior work.

### Route inventory (all under `/[lang]`, lang ∈ {nl,en,es})

| Route | Surface | Notes |
|---|---|---|
| `/[lang]` | Home | own `<nav>` + own `<footer>` |
| `/[lang]/start` | Onboarding (2 steps) | own chrome |
| `/[lang]/wk-2026` | WC Simulator | `SimulatorHeader` (client) |
| `/[lang]/wk-2026/card` | Share card | own footer |
| `/[lang]/ucl-2027` | UCL draw/bracket | **hardcoded NL** (see B) |
| `/[lang]/ucl-2027/card` | UCL card | — |
| `/[lang]/wk-geboorteplaats` | Birthplace tool | own footer |
| `/[lang]/wk-geboorteplaats/card` | Birthplace card | own footer |
| `/[lang]/blog` + `/blog/[slug]` | Blog | own footer (hardcoded border) |
| `/[lang]/about` | About | own footer |
| `/[lang]/privacy` | Privacy | own footer (low contrast) |
| OG: `/api/og`, `/api/og/bracket`, `/api/og/ucl`, `/api/og/birthplace` | Images | Satori |

---

## 2. Findings

### A. Translations & terminology (i18n)

| # | Sev | Evidence | Issue → Fix |
|---|---|---|---|
| A1 | **P0** | `src/i18n/nl.ts:192` | NL `bracket.r16: '1/16e finale'` is **wrong terminology** — "1/16-finale" = Round of **32**. R16 in Dutch is **"Achtste finale"**. Fix the term and align with the card ("Laatste 16"). |
| A2 | P1 | `src/i18n/nl.ts:51` | `thirds.subtitle` mixes English into Dutch: "…gaan door naar de **Round of 32**". → "…naar de **Ronde van 32**". |
| A3 | P1 | `bracket.*` vs `ogCard.wc.result.*` vs `lib/route.ts` | Round-of-16/32 naming differs by context. NL: live "1/16e finale" vs card "Laatste 16". ES: live `r32 'Ronda de 32'` (`es.ts:191`) vs card `'Dieciseisavos'` (`es.ts:257`). Pick **one** term per concept per language; centralize. |
| A4 | P2 | `nl.ts:224-227` (+ en/es) | Keys `top5`/`showTop5`/`hideTop5` but values say "Top **10**". Rename keys to `topN` (or fix copy) — confusing for maintainers. |
| A5 | P2 | `nl.ts:119` | NL `home.openBirthplace: 'OPEN CHECKER'` — English "checker" in Dutch UI. Consider "OPEN TOOL"/"OPEN ZOEKER". |

### B. Hardcoded / non-localized strings

| # | Sev | Evidence | Issue → Fix |
|---|---|---|---|
| B1 | **P0** | `src/app/[lang]/page.tsx:113` | Home hero: `{lang === 'es' ? 'MUNDIAL' : 'WK'}` → **English homepage shows "WK 2026"**. `SimulatorHeader` already does nl/en/es ("World Cup"). Add the `en` branch. |
| B2 | P1 | `src/components/UCLBracket.tsx:154` | `desktopCols = ['Achtste finales','Kwartfinales','Halve finales','Finale']` hardcoded NL → en/es see Dutch. Localize via `ogCard.ucl.round`/new keys. |
| B3 | P1 | `src/app/ucl-2027/DrawClient.tsx:481,840,842` | Hardcoded NL: `'Automatisch gesimuleerd'`, `'Achtste finales'`, `'Uitgeschakeld'`. The whole UCL-2027 feature is effectively NL-only across locales. |
| B4 | P2 | `src/app/[lang]/page.tsx:171` | "Nieuw/Nuevo/New" badge is an inline ternary; move to i18n (`home.newBadge`). |

> Note B1/B2 are the same class of bug as the round-term one: brand/round copy
> handled inconsistently between the localized header and ad-hoc ternaries.

### C. Header / nav / footer consistency

| # | Sev | Evidence | Issue → Fix |
|---|---|---|---|
| C1 | P1 | 5 inline footers | No shared `<SiteFooter>`. Implementations diverge: home `page.tsx:189` (no border, `py-5`); about `:93` (`border-themed`, `py-6`); blog `:165` & blog/[slug]`:285` (`border-[#141414]`, `py-6`); privacy `:38` (`border-[#141414]` + `text-slate-700`); birthplace/cards (`var(--border)`, `py-4`). → one component. |
| C2 | P1 | blog/privacy footers | `border-[#141414]` is **not theme-aware** → wrong border in light mode. Use `border-themed`. |
| C3 | P2 | `privacy/page.tsx:41` | Footer `text-slate-700` (very low contrast in dark). Use `c-fg-subtle`. |
| C4 | P2 | `page.tsx:89,95` | Home nav links at `opacity-40` — low contrast/legibility. Raise baseline (e.g. `c-fg-muted`, hover `c-fg`). |
| C5 | P2 | home nav vs SimulatorHeader vs blog header | No shared `<SiteHeader>`; each page rebuilds logo+nav+lang+theme. Extract one. |

### D. Color & theming

| # | Sev | Evidence | Issue → Fix |
|---|---|---|---|
| D1 | P1 | grep: **109× `border-[#1a1a1a]`**, 18× `border-[#141414]`, 6× `border-[#0f0f0f]` | Raw dark borders bypass `.border-themed` → no light-theme override. Replace with `border-themed` / `var(--border)`. |
| D2 | P1 | `src/components/Tooltip.tsx:11` | Uses **old navy palette** `border-[#1A3050]` + `bg-slate-800` `text-slate-300`. Re-token to `--border`/`--bg-panel`/`--fg`. |
| D3 | P1 | grep: 31× `#C9A843`, 8× `#D93B1F`, 6× `#E2C46A` | Hardcoded hex duplicating tokens (multiple sources of truth). Replace with `var(--gold)`/`var(--cta)` or `.c-*`. |
| D4 | P2 | `globals.css:12-14` | Dead old-palette `@theme` tokens (`--color-wk-card #0B1628`, `--color-wk-panel #081020`, `--color-wk-border #1A3050`) overridden by `:root`. Remove. |
| D5 | P2 | `page.tsx:236` | CTA hover hardcodes `#C42F15` (the **light**-only value) for both themes. Use `var(--cta-hover)`. |
| D6 | P2 | 5× `#FF6B00` (logo) | Brand orange isn't a token. Add `--brand-orange`. |

### E. Typography (font sizes)

| # | Sev | Evidence | Issue → Fix |
|---|---|---|---|
| E1 | P1 | grep: **125× `text-[10px]`**, **3× `text-[9px]`** | Below the legibility floor on mobile, esp. bracket meta and `UCLBracket`. Introduce a named scale (design system §3); promote readable text to ≥11px. **Note:** the `BracketView` schedule meta I recently added uses `text-[9px]`/`text-[10px]` — include it in this pass (bump to 10/11px). |
| E2 | P2 | arbitrary `text-[Npx]` everywhere | No type scale; sizes chosen ad hoc (9–14px). Standardize. |

### F. Accessibility & contrast

| # | Sev | Evidence | Issue → Fix |
|---|---|---|---|
| F1 | P2 | `page.tsx:89,95`; `privacy:41` | `opacity-40` text links and `text-slate-700` fail contrast. |
| F2 | P2 | global | Audit focus-visible states on custom buttons; ensure icon-only buttons have `aria-label` (header ✓, verify others). |
| F3 | ✅ | StandingsTable, bracket | Status uses ✓/?/✗ **and** color (not color-only) — good; keep this pattern. |

### G. Maintainability / dead code

| # | Sev | Evidence | Issue → Fix |
|---|---|---|---|
| G1 | P2 | `src/lib/route.ts:28-35,154-163` | `ROUND_LABELS` & `resultLabel()` are **hardcoded Dutch** and only used by tests; the OG card (`api/og/route.tsx:73-79`) correctly uses localized `oc.wc.round.*`. Dead/misleading — remove or localize + repoint tests. |
| G2 | P2 | i18n key naming | See A4 (top5 → topN). |

---

## 3. Per-locale spot check

- **nl** — base language, most complete; main issues A1/A2 (round terms) + the
  NL-hardcoded UCL feature reads fine here.
- **en** — B1 (home hero "WK 2026"), B2/B3 (UCL bracket/draw show Dutch). Round
  terms OK in en.
- **es** — A3 (Ronda de 32 vs Dieciseisavos), B2/B3 (UCL Dutch). Otherwise solid.

---

## 4. Prioritized plan

### Phase 0 — Correctness quick wins (P0, ~½ day)
1. **B1** Home hero `en` branch → "WORLD CUP"/"WC" (match `SimulatorHeader`).
2. **A1** NL `bracket.r16` → "Achtste finale" (or "Laatste 16" to match the card).
3. **A2** NL `thirds.subtitle` → "Ronde van 32".

> Low-risk i18n/string edits, no structural change. Ship first.

### Phase 1 — Consistency foundation (P1, ~2–3 days)
4. **Tokenize colors:** codemod `border-[#1a1a1a]`/`#141414`/`#0f0f0f` →
   `border-themed`; `text-[#C9A843]`/`#D93B1F` → `c-gold`/`c-cta` or `var()`.
   Re-token `Tooltip` (D2).
5. **Shared chrome:** build `<SiteHeader>` + `<SiteFooter>`; replace the 5 inline
   footers and per-page navs (C1–C5, C2 fixes light-mode borders).
6. **Localize UCL-2027** (`UCLBracket`, `DrawClient`) — B2/B3.
7. **Unify round terminology** across `bracket.*`, `ogCard.*`, UCL — A3 (one
   canonical term per concept per language; consider a single `roundName(key,lang)`
   helper).

### Phase 2 — Typography & a11y (P1/P2, ~1–2 days)
8. Add the type scale (design system §3); promote `text-[9/10px]` to ≥11px where
   read (incl. the bracket schedule meta) — E1/E2.
9. Contrast fixes: home nav `opacity-40`, privacy footer `text-slate-700` — F1.
10. Focus-visible + icon-button aria sweep — F2.

### Phase 3 — Cleanup (P2, ~½ day)
11. Remove dead `route.ts` Dutch labels (or localize + repoint tests) — G1.
12. Remove old-palette `@theme` tokens; add `--brand-orange`, `--radius-*`,
    CTA-hover token usage — D4/D5/D6.
13. Rename `top5`→`topN` keys; `openBirthplace` copy; "New" badge → i18n — A4/A5/B4.

### Verification (every phase)
`npm run build` + `npm test`; visit `/{nl,en,es}/…` in light+dark at 375/1280px;
re-render OG images (nl+en) as real PNGs.

---

## 5. Quick-reference: highest-impact first

1. **B1** EN home hero says "WK 2026" — *wrong language, front door.*
2. **A1** NL Round-of-16 mislabeled "1/16e finale".
3. **D1** 109 non-theme-aware borders — light mode looks off.
4. **C1/C2** Five drifting footers; some break in light mode.
5. **B2/B3** UCL-2027 is Dutch-only in en/es.
6. **E1** Pervasive 10px (and 9px) text.
