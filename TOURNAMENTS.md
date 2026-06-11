# Nieuw toernooi toevoegen

Elk toernooi krijgt een eigen databestand in `tournaments/[slug].md`.
Dit bestand is de generieke checklist voor het aanmaken van een nieuwe simulator.

Zie ook: [tournaments/ucl-2027.md](tournaments/ucl-2027.md) als ingevuld voorbeeld.

---

## Toernooiformaten

| Formaat | Voorbeelden | Kernkenmerk |
|---|---|---|
| **Groepsfase + knockout** | WK, EK, Copa América | X groepen × Y teams, top-N door |
| **League phase + knockout** | UCL 2024/25+ | 1 grote competitie, 36 clubs, 8 wedstr. elk |
| **Pure knockout** | FA Cup, EK kwalificatie (play-offs) | Alleen duels, geen groepen |

---

## Checklist — wat je aanlevert

### 1. Basisinfo

```
Naam NL:          ...
Naam EN:          ...
Naam ES:          ...
URL-slug:         ...          (bijv. ucl-2027, ek-2028)
Primaire kleur:   #......      (hoofdkleur van het toernooi)
Accentkleur:      #......      (bijv. goud)
```

### 2. Teams

Per team één rij:

| Veld | Uitleg | Voorbeeld nationaal | Voorbeeld club |
|---|---|---|---|
| `id` | Max 4 tekens, uniek | `NED` | `PSV` |
| `name` | Naam NL | `Nederland` | `PSV Eindhoven` |
| `nameEn` | Naam EN | `Netherlands` | `PSV Eindhoven` |
| `nameEs` | Naam ES | `Países Bajos` | `PSV Eindhoven` |
| `group` | Groep/pot | `F` | `A` |
| `strength` | Elo-getal ~1600–2100 | `1950` | `1880` |
| `flag` | ISO-landcode voor vlag | `nl` | `nl` (= land van de club) |

**Vlaggen:** gebruik [flagcdn.com](https://flagcdn.com) codes.
- Nationaal: `nl`, `de`, `fr`, `es`, `it`, `pt`, `be`, `tr`, `ua` …
- Engeland/Schotland/Wales/Noord-Ierland: `gb-eng`, `gb-sct`, `gb-wls`, `gb-nir`
- Kosovo: `xk`, Gibraltar: `gi`, Faroer: `fo`

**Sterktecijfers:**
- Clubs: [ClubElo](http://clubelo.com) of UEFA-coëfficiënten omzetten (~CC × 14 + 650)
- Landen: [eloratings.net](https://www.eloratings.net)

### 3. Toernooiformat

```
Type:             groepen | league-phase | knockout
Aantal groepen:   ...     (alleen bij groepen)
Teams per groep:  ...     (alleen bij groepen)
Doorstromers:     ...     (bijv. "top 2 + beste 4× nummers 3")
```

### 4. Knockout-ronden

```
Ronden (in volgorde): ...
Voorbeeld WK:   R32 → R16 → KW → HF → Finale
Voorbeeld UCL:  KO play-off → R16 → KW → HF → Finale
Voorbeeld EK:   R16 → KW → HF → Finale
```

### 5. Kwalificatieronden (optioneel)

Lever per ronde aan:
- Aantal duels
- Welke teams direct instappen (met vlagcode)
- Welke teams de winnaars zijn van de vorige ronde
- Losse of gegroepeerde paden (bijv. Champions Path / League Path)
- Datums van de loting

### 6. Afwijkende i18n-strings (optioneel)

Alleen opgeven wat afwijkt van de WK-standaard:

```
header.title:       ...
header.subtitle:    ...
completion.winner:  ...
thirds.title:       ...    (of: weglaten)
```

### 7. Live data (optioneel)

```
football-data.org code:  ...   (bijv. CL, WC, EL)
Seizoen:                 ...   (bijv. 2026)
```

---

## Bestandsoverzicht per toernooi

```
tournaments/[slug].md          ← databestand (dit vul jij in)
src/
  data/[slug].ts               ← teams, vlaggen, sterktecijfers, potten
  app/[lang]/[slug]/page.tsx   ← i18n-wrapper
  app/[slug]/
    SimulatorClient.tsx        ← hoofdcomponent
    page.tsx                   ← SEO metadata
    opengraph-image.tsx        ← OG-afbeelding
```

---

## Bestaande toernooien

| Slug | Status | Bestand |
|---|---|---|
| `wk-2026` | Live | [src/data/worldcup2026.ts](src/data/worldcup2026.ts) |
| `ucl-2027` | In voorbereiding | [tournaments/ucl-2027.md](tournaments/ucl-2027.md) |
