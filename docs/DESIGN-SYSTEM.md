# ScorePath Design System

The single source of truth for visual consistency. If a value isn't here (or in
`src/app/globals.css`), it shouldn't be hardcoded in a component. This document
describes the **current** tokens and the **target** rules. Items marked 🔧 are
gaps to fix (see `docs/UI-UX-AUDIT-AND-PLAN.md`).

---

## 1. Principles

1. **Token-first.** Components reference tokens (CSS vars / themed utilities),
   never raw hex. One concept = one token.
2. **Theme-aware by default.** Every color works in dark **and** light. If you
   write a literal color, you must add a `[data-theme="light"]` override — or
   better, use a token that already has one.
3. **Localized by default.** No user-visible copy in components; everything via
   `useMessages()` / `getMessages()` across `nl`/`en`/`es`.
4. **Legible by default.** Min 11px for readable text, 12px+ for body. Contrast
   ≥ 4.5:1. Tap targets ≥ 44px.

---

## 2. Color tokens

Defined in `src/app/globals.css` as CSS variables on `:root` (dark) and
`[data-theme="light"]`. **Use these — do not hardcode the hex.**

| Token | Role | Dark | Light |
|---|---|---|---|
| `--bg` | App background | `#080808` | `#F2EDE4` |
| `--bg-card` | Card surface | `#0D0D0D` | `#FFFFFF` |
| `--bg-panel` | Panel/inset surface | `#0A0A0A` | `#EDE8DF` |
| `--border` | Default border/divider | `#1A1A1A` | `#E0D8CC` |
| `--border-strong` | Emphasis border | `#2A2A2A` | `#CFC5B5` |
| `--fg` | Primary text | `#F2F2F2` | `#0D0D0D` |
| `--fg-muted` | Secondary text | `#94A3B8` | `#6B6158` |
| `--fg-subtle` | Tertiary text | `#475569` | `#9B8E82` |
| `--cta` | Primary action (red) | `#D93B1F` | `#D93B1F` |
| `--cta-hover` | Primary action hover | `#E8351E` | `#C42F15` |
| `--gold` | Brand accent / highlight | `#C9A843` | `#A8852A` |
| `--gold-lt` | Gold (lighter) | `#E2C46A` | `#C9A843` |

**Themed utility classes** (equivalent, for `className` use):
`.c-fg`, `.c-fg-muted`, `.c-fg-subtle`, `.c-gold`, `.c-cta`, `.bg-themed`,
`.bg-panel`, `.bg-card`, `.border-themed`, `.border-themed-strong`.

### Semantic / status colors

| Meaning | Token (target) | Current usage |
|---|---|---|
| Advances / win | emerald | `bg-emerald-900/60`, `text-emerald-300/400` |
| On the bubble (3rd) | amber | `bg-amber-500/15`, `text-amber-400` |
| Eliminated / destructive | red | `bg-red-700`, `text-red-400` |
| Confirmed qualified | gold | `#C9A843` (use `--gold`) |

🔧 **Brand orange** `#FF6B00` (the logo mark) is used in 5 places but is not a
token. Add `--brand-orange: #FF6B00;` and reference it.

### Rules
- ❌ `text-[#C9A843]`, `border-[#1a1a1a]`, `bg-[#0D0D0D]` in components.
- ✅ `c-gold` / `style={{ color: 'var(--gold)' }}`, `border-themed`, `bg-card`.
- ❌ Leftover old palette: `#1A3050`, `#0B1628`, `#081020` (navy theme). Remove.
- CTA hover must use `var(--cta-hover)` (don't hardcode `#C42F15`, which is the
  *light*-only value).

---

## 3. Typography

**Families** (`globals.css` `@theme`):
- `--font-display` → **Bebas Neue** (`.font-display`) — headings, scores, numbers.
- `--font-ui` / `--font-sans` → **Barlow Condensed** — everything else.

**Type scale (target).** Replace arbitrary `text-[Npx]` with a fixed scale.
Minimum readable size is **11px**; `≤10px` only for non-essential dense metadata.

| Name | Size / line-height | Use |
|---|---|---|
| `display-hero` | `clamp(4.5rem, 14vw, 10rem)` | Home hero |
| `display-lg` | `clamp(2rem, 3.5vw, 2.75rem)` | Section numerals |
| `title` | 20px / 1.1 | Page/card titles (`text-xl`) |
| `body` | 14px / 1.5 | Default copy (`text-sm`) |
| `label` | 12px / 1.4, uppercase tracking | Buttons, table headers (`text-xs`) |
| `meta` | 11px | Secondary metadata (min for readable) |
| `micro` | 10px | Dense non-essential only — avoid |

🔧 Current reality: **125× `text-[10px]`, 3× `text-[9px]`** (incl. bracket meta
and `UCLBracket`). Audit each; promote to 11px where users must read it.

---

## 4. Spacing & radius

- **Spacing:** Tailwind scale (4px base). Standardize section padding
  (`px-6 sm:px-10`) and vertical rhythm; footers currently mix `py-4/5/6`.
- **Signature radius — the asymmetric "notch":** `border-radius: 0 R 0 R`.
  Tokenize:

| Token (target) | Value | Use |
|---|---|---|
| `--radius-sm` | `0 6px 0 6px` | Match boxes, chips |
| `--radius-md` | `0 10px 0 10px` | Buttons, banners |
| `--radius-lg` | `0 12px 0 12px` | CTAs, hero cards |

Define once; stop copy-pasting the literal in every component.

---

## 5. Component patterns

- **Primary CTA** — `bg-[var(--cta)]` hover `var(--cta-hover)`, white text,
  `font-display tracking-widest`, `--radius-lg`, arrow icon. (See `CTALink`.)
- **Secondary button** — transparent, `2px solid var(--cta)`, `--cta` text,
  `--radius-md`. (See `SecondaryLink`.)
- **Control button** (header) — `.ctrl-btn`, `min-h-[44px]`, `text-xs` semibold.
- **Card** — `.bg-card` + `.border-themed`, `--radius-*`.
- **Badge/pill** — `text-[11px] font-bold px-1 py-0.5 rounded`, semantic bg/fg
  at low alpha (e.g. `bg-amber-500/15 text-amber-400`).
- **Table** — `tabular-nums`, header `.bg-panel` `text-xs uppercase`, rows
  divided with `.border-themed`.
- 🔧 **Shared chrome (to build):** one `<SiteHeader>` (logo + nav + lang + theme)
  and one `<SiteFooter>` (logo + nav links + © + locale). Replace the 5 inline
  footers and per-page navs.

---

## 6. Theming checklist (every new UI)

- [ ] Colors from tokens; no raw hex.
- [ ] Looks correct in dark **and** light.
- [ ] All copy via i18n in `nl`/`en`/`es`.
- [ ] Text ≥ 11px; contrast ≥ 4.5:1.
- [ ] Tap targets ≥ 44px; focus states; aria labels on icon buttons.
- [ ] Radius/spacing from the scale.
- [ ] If it renders to an OG image, verified as a real PNG in nl + en.
