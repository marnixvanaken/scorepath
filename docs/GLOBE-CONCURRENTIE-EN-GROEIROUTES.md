# ScorePath Globe — Concurrentieonderzoek & Groeiroutes

> **Wat is de Globe?** Een interactieve wereldkaart/globe waarop álle voetbal­clubs
> ter wereld geplot staan. Nieuw project (bestaat nog niet in de codebase — vandaar
> branch `claude/scorepath-globe-competition-*`). Doel van dit document: het
> concurrentieveld in kaart brengen, leren wat werkt, en concrete **routes met
> prioriteiten** neerzetten. Einddoel: **veel bezoekers → advertentie- + affiliate-
> inkomsten**.

> Zuster-feature ter referentie: `wk-geboorteplaats` (spelers op geboorteplaats).
> De Globe is een ánder ding: **clubs op locatie**, niet spelers op geboorteplaats.

Datum onderzoek: 2026-07-22 · Markt-timing: **WK 2026 is gaande** — piekvraag naar
alles rond voetbal + kaarten. Dit venster is de belangrijkste asset die we hebben.

---

## 1. Het concurrentieveld

### A. Directe concurrenten — clubs/stadions op een kaart

| Site | Omvang | Wat het is | Sterk | Zwak / gat |
|---|---|---|---|---|
| **footballclubsmap.com** | 18.677 clubs · 114 landen | Platte interactieve kaart, "constantly growing" | Breedste dekking, wereldwijd, voor fans + groundhoppers + reizigers | Platte kaart (geen wow-factor), Engels-only, weinig personalisatie/retentie |
| **footballgroundmap.com** | 35.000+ stadions | **De** groundhopping-community: bezoeken bijhouden, *92 Club*, "grounds near me", reisgidsen, reviews, foto's, accounts | Retentie (persoonlijke tracking), content/SEO (guides), community. ~#2.119 in Sports › Soccer | UI oogt gedateerd, Engels/UK-centrisch, geen 3D |
| **FindMyFC.org** | 216 clubs · 10 topcompetities | Curated kaart met clubstats + "find your nearest team" | Clean, topcompetitie-focus, "nearest team"-hook | Zeer beperkte dekking, geen retentie/tracking |
| **Club World Map (pwal.ch)** | wereldwijd, profclubs | Data-viz: toont per zoomniveau de top-30 clubs per regio | Slimme **dichtheids-rendering** (schaalt naar 30k+ punten) | Hobbyproject, kaal, geen monetisatie/SEO/retentie |
| **sportingmaps.com** | Europa/wereld | Clubkaart met crests, stadions, competities | Visuele crests, meerdere sporten | Generiek, weinig diepgang |
| **clubsfromabove.com** | Engeland | Stadions in satelliet-/luchtbeeld | Uniek visueel gimmick (van bovenaf) | Nichescope (alleen ENG) |
| **footbeen.com** · **footiemap.com** · **groundhopperguides.com** · **stadium-maps.com** · **myfootygrounds.co.uk** | wisselend | Varianten op groundhopping-kaart / team-finder | Elk 1 sterk idee | Gefragmenteerd, meestal EN/UK |

**Conclusie:** het veld is druk maar **gefragmenteerd**. Niemand combineert
*mooie globe + wereldwijde dekking + personalisatie + meertaligheid + deelbaarheid +
reis-monetisatie* in één product. Dat is precies de opening.

### B. Aangrenzende concurrenten — voetbal-engagement met veel verkeer

Niet dezelfde feature, maar wél waar ons publiek al zit én waar de
verkeers-/retentie-mechanieken vandaan komen die wij moeten kopiëren:

- **playfootball.games / "Who Are Ya"** — dagelijkse voetbalquiz, wereldwijd ~#6.700
  (Similarweb). ~50% *direct* verkeer = sterke terugkeer-loop.
- **footballwordle.com, footdle.com, gridsport.games, testfootball.com** — Wordle-
  achtige dagelijkse voetbalspellen. Les: *dagelijkse herhaalprikkel = retentie*.
- Monetisatie daar: vrijwel allemaal **display-ads (AdSense) + betting-ads +
  sponsoring**.

### C. Bredere kaart-/geo-wereld — kijk verder dan voetbal

- **GeoGuessr** (~#1.800 wereldwijd), **Worldle / Globle / Travle / Tradle** —
  dagelijkse geo-puzzels. Les: *één simpele dagelijkse geo-opgave bindt enorm*.
- **TikTok "distance map"-trend** (TravelBoast e.d.) — "hoe ver ben ik van X" ging
  meermaals viraal. Les: *persoonlijke afstand + deelbare afbeelding = virale motor*.
- **Barratt Homes "Sporting Hotspots"** — geboorteplaats-kaart als **digital-PR-
  campagne** (backlinks van pers). Les: *een data-verhaal levert gratis autoriteit*.
- **Tech-bouwstenen voor een échte globe**: `globe.gl` / `react-globe.gl`
  (ThreeJS/WebGL), **Mapbox GL globe-projectie**, CesiumJS, deck.gl, Flourish.
  (ScorePath draait nu op **2D Leaflet** in `wk-geboorteplaats` — een 3D-globe is
  meteen een visueel onderscheidend merkelement.)

---

## 2. Wat de concurrentie goed doet (te kopiëren lessen)

1. **Dekking wint** — footballclubsmap (18k) en footballgroundmap (35k) domineren
   op *volledigheid*. Dun beginnen mag, maar het groeipad moet "alles ter wereld" zijn.
2. **Personalisatie is de haak** — "nearest club to you" / "grounds near me"
   (geolocatie) is de meest gedeelde, meest gezochte interactie.
3. **Retentie via persoonlijke tracking** — bezoekte stadions, *92 Club*-challenges,
   je eigen kaart. Dit maakt footballgroundmap plakkerig → herhaalbezoek → meer
   ad-impressies.
4. **Content/SEO-motor** — per-club, per-stad, per-competitie pagina's + reisgidsen
   vangen long-tail organisch verkeer ("stadion X", "clubs in Y", "wedstrijd bezoeken").
5. **Community** — reviews, foto's, accounts → user-generated content = gratis SEO-
   content + binding.
6. **Dichtheids-rendering** — pwal.ch's "top-N per regio bij uitzoomen" is de juiste
   technische aanpak om 30k+ punten zonder performance-drama te tonen.
7. **Deelbaarheid** — de aangrenzende wereld (distance-map, share-cards) laat zien dat
   een deelbaar plaatje het verschil maakt tussen "leuk toolтje" en "viraal".

---

## 3. ScorePath's onderscheidende wig (waarom wij kunnen winnen)

| Asset die we al hebben | Waarom het telt |
|---|---|
| **Meertaligheid (nl/en/es)** | Vrijwel alle concurrenten zijn EN/UK-only. NL, ES en **LatAm** zijn onderbediend — grote, minder-competitieve markten. |
| **Share-card + OG-image infra** (`/api/og/*`, card-pagina's) | De virale haak die de kaart-concurrenten missen — hergebruiken voor "mijn dichtstbijzijnde club". |
| **WK 2026-publiek + timing** | Piekvraag nú; we hebben al verkeer via de simulator + geboorteplaats-tool om de Globe te lanceren. |
| **AdSense actief** (`pub-1392037508470232`) | Monetisatie-fundament staat al; hoeft alleen opgeschaald. |
| **Simulator/quiz-DNA** | Engagement-loop (spelen, delen) die pure kaart-sites niet hebben. |
| **Bestaande geodata-pijplijn** (geocode-API, 1248 spelers met lat/lon) | Technische basis om snel clubs te geocoden en te plotten. |

**De wig in één zin:** een **échte 3D-globe**, **wereldwijd**, **meertalig**, met
**"welke club is het dichtst bij jou"** + **deelbare kaart** + **reis-/shirt-affiliate**
op elke stadionpagina. Niemand heeft dat pakket compleet.

---

## 4. Monetisatie-landschap (het geld-deel, met NL/EU-nuance)

Gerangschikt op fit met een clubs-globe:

1. **Reis-affiliate = beste fit.** Groundhopping = mensen die *reizen* naar stadions.
   Op elke stadion-/clubpagina: hotels nabij het stadion (Booking/Expedia),
   vluchten/trein, **stadiontours** (hoogste commissie per sale), match-tickets/
   hospitality (o.a. via ticket-affiliateprogramma's). Hoge intentie = hoge conversie.
2. **Shirt-/merch-affiliate.** Per club een "koop het shirt"-link (Kitbag/Fanatics via
   Awin/Impact). Seizoenspiek rond **WK 2026**. Schoon en zeer relevant.
3. **Display-ads (fundament).** AdSense nu; bij schaal door naar **header bidding /
   Ezoic / Mediavine-tier** voor 2–5× hogere RPM. Verkeer-gedreven → routes 1–4 voeden dit.
4. **Sponsoring / directe deals.** Bij voldoende bereik: voetbalreisbureaus, brouwers,
   fan-merk. Later stadium.
5. **Betting-affiliate = lucratief maar oppassen.** CPA $50–200 per storting of
   RevShare 30–60%. **Maar**: in NL streng gereguleerd (Kansspelautoriteit / reclame-
   restricties, geen minderjarigen), en AdSense-beleid botst met gok-content. Alleen
   overwegen op aparte, gecontroleerde secties en per markt juridisch checken. Niet
   de startzet.

**Realiteit:** eerst **verkeer** (SEO + viraliteit + retentie), ads als basislaag,
affiliate gelaagd op hoog-intentie pagina's (stadion-reis, shirts). Per bezoeker
levert een groundhopper die een hotel boekt véél meer op dan een ad-impressie.

---

## 5. De routes & prioriteiten

Prioriteit: **P0** = fundament/nu · **P1** = kort daarna · **P2** = opschalen ·
**P3** = later/optie. Inschatting per route: *effort* (S/M/L) en *impact op
verkeer/omzet*.

| # | Route | Prio | Effort | Impact | Levert vooral |
|---|---|---|---|---|---|
| 1 | **Globe-MVP** (clubs plotten, zoom-dichtheid, klik→clubkaart, zoek) | **P0** | M | Hoog | Bestaansrecht + wow |
| 2 | **Programmatic SEO** (pagina per club/stad/land/competitie) | **P0/P1** | M–L | **Zeer hoog** | Bezoekers (long-tail) |
| 3 | **"Dichtst bij jou" + share-card** (geolocatie + deelbaar plaatje) | **P1** | S–M | Hoog | Viraliteit |
| 4 | **Retentie/groundhopping** (bezoekte stadions, challenges, eigen globe) | **P1** | M | Middel–hoog | Herhaalbezoek |
| 5 | **Affiliate-monetisatie** (reis/tickets/tours/shirts op stadionpagina's) | **P1/P2** | M | **Hoog (omzet)** | Geld |
| 6 | **Digital PR / dataverhaal** ("Sporting Hotspots"-stijl → backlinks) | **P2** | S–M | Middel (compound) | Autoriteit/SEO |
| 7 | **Dagelijks spel** ("raad de club", geo-quiz — Wordle-loop) | **P2** | M | Middel | Retentie/direct verkeer |
| 8 | **Verbreden buiten voetbal** (andere sporten/datasets op dezelfde globe) | **P3** | L | Optie | Nieuwe markten |

### Route 1 — Globe-MVP · **P0**
De kern: alle clubs op een interactieve globe. Beslissing vooraf: **3D-globe**
(`react-globe.gl`/Mapbox GL globe — visueel onderscheidend, past bij de merknaam
"Globe") of eerst **2D Leaflet** hergebruiken (sneller, al in de codebase). Advies:
begin technisch met wat het snelst een *volledige, snelle* kaart oplevert, maar
positioneer de 3D-globe als het vlaggenschip zodra de dataset staat.
**Must-haves:** clik→clubkaart (naam, crest, competitie, stadion, capaciteit),
zoek, **dichtheids-clustering** bij uitzoomen (pwal.ch-aanpak voor 10k+ punten),
meertalig vanaf dag 1. **Eerste stap:** dataset kiezen/bouwen (topcompetities eerst,
crest + lat/lon + stadion), geocoden via bestaande pijplijn.

### Route 2 — Programmatic SEO · **P0/P1** — *dé bezoekers-motor*
Elke club/stad/land/competitie een eigen, geïndexeerde pagina met de kaart ingebed
+ unieke tekst/stats. Dit is hoe je van "leuke tool" naar "tienduizenden
zoekingangen" gaat ("[club] stadion", "voetbalclubs in [stad]", "clubs in [land]").
Voeg ze toe aan de sitemap (nu staat alleen de losse pagina erin, prio 0,7 —
onderbenut). Meertalige varianten vermenigvuldigen het bereik ×3. **Grootste
hefboom op het doel "veel bezoekers".**

### Route 3 — "Dichtst bij jou" + share-card · **P1** — *de virale motor*
Geolocatie-knop ("gebruik mijn locatie" — bestaat nog niet) → dichtstbijzijnde club(s)
+ afstand → **deelbare kaart** via bestaande OG-infra ("Mijn club is X, op N km").
Leunt op de bewezen "distance map"-trend en op infra die we al hebben. Laag effort,
hoge virale bovenkant. Cross-promoot met de geboorteplaats-tool.

### Route 4 — Retentie / groundhopping · **P1**
Kopieer footballgroundmap's plakkerigheid: markeer bezoekte stadions, persoonlijke
globe, challenges ("alle clubs in je provincie", "een land compleet"). Herhaalbezoek
= meer ad-impressies + affiliate-touchpoints. Begin licht (localStorage, geen
verplicht account) om drempel laag te houden.

### Route 5 — Affiliate-monetisatie · **P1/P2** — *het geld*
Op elke stadion-/clubpagina contextuele affiliate-modules: **hotels nabij stadion**
(Booking/Expedia), **stadiontours** (hoogste marge), **tickets/hospitality**,
trein/vlucht, en **clubshirt** (Kitbag/Fanatics). Hoog-intentie plaatsing =
conversie. Start met 1–2 netwerken (Booking + shirt) en breid uit. Dit verzilvert
het verkeer uit routes 2–4.

### Route 6 — Digital PR / dataverhaal · **P2**
Publiceer deelbare data-stories uit de eigen dataset ("de dichtste voetbalstad ter
wereld", "meeste clubs per inwoner", "land met de meeste profclubs"). Barratt Homes
liet zien dat zo'n verhaal persdekking + **backlinks** trekt → domein-autoriteit →
alle SEO-routes profiteren. Goedkoop, compound-effect.

### Route 7 — Dagelijks spel · **P2**
Een dagelijkse geo-voetbalpuzzel op de globe ("raad de club bij deze locatie",
"welke club hoort bij dit stadion"). Steelt de Wordle-/GeoGuessr-terugkeerlus en
kruisbestuift met de simulator. Zorgt voor *direct* verkeer (bookmarks/herhaling).

### Route 8 — Verbreden buiten voetbal · **P3**
Zodra de globe-engine staat: hergebruik voor andere datasets (andere sporten,
WK-geboorteplaatsen al aanwezig, F1-circuits, etc.). Zo werd de vraag "kijk breder
dan football maps" beantwoord — de *engine* is het product, voetbal is de eerste
laag.

---

## 6. Aanbevolen volgorde (± 90 dagen, WK-2026-venster)

1. **Week 0–4 — Fundament + viraliteit.** Route 1 (Globe-MVP, topcompetities),
   Route 3 (geolocatie + share-card), begin Route 2 (eerste club-/stadpagina's).
   Mikpunt: iets deelbaars live vóór het WK-momentum wegebt.
2. **Week 4–8 — Bezoekers + eerste geld.** Route 2 volledig uitrollen (programmatic
   SEO, alle talen, sitemap), Route 5 starten (Booking + shirt-affiliate op
   stadionpagina's).
3. **Week 8–12 — Binding + autoriteit.** Route 4 (retentie/groundhopping), Route 6
   (PR-dataverhaal voor backlinks), Route 7 (dagelijks spel).
4. **Doorlopend.** Dataset verbreden richting "alle clubs ter wereld" (route 1's
   groeipad), ads opschalen van AdSense naar header bidding zodra verkeer het
   rechtvaardigt, Route 8 als de engine bewezen is.

---

## 7. KPI's om op te sturen

- **Verkeer:** unieke bezoekers, geïndexeerde pagina's, organisch aandeel, top-
  landingspagina's (per club/stad).
- **Viraliteit:** share-card-generaties, sociale referrals, terugkeerratio.
- **Retentie:** % terugkerende bezoekers, bezoekte-stadions per gebruiker.
- **Omzet:** ad-RPM, affiliate-CTR en EPC (earnings per click), omzet per 1.000
  bezoekers. Vergelijk ad-RPM vs. affiliate-EPC per pagina-type om plaatsing te
  optimaliseren.

---

## 8. Risico's / aandachtspunten

- **Datakwaliteit & onderhoud** — 10k+ clubs geocoden en actueel houden is de
  moeilijkste, maar meest verdedigbare, asset. Semi-automatiseren (Wikidata/OSM/
  Transfermarkt-achtige bronnen) + correctie-flow.
- **Performance bij schaal** — dichtheids-clustering/vector-tiles nodig vanaf ~duizenden
  punten (niet naïef alle markers renderen).
- **Betting-regelgeving (NL/EU)** — niet lichtvaardig instappen; juridisch per markt
  checken en gescheiden houden van AdSense-content.
- **Attributie/kaart-licenties** — OSM/Mapbox-voorwaarden respecteren (zoals nu al bij
  de geboorteplaats-kaart).

---

## Bronnen

**Directe concurrenten (clubs/stadions-kaarten)**
- [Football Clubs Map — 18.677 clubs / 114 landen](https://footballclubsmap.com/)
- [Football Ground Map — 35.000+ stadions, groundhopping](https://www.footballgroundmap.com/)
- [FindMyFC — 216 clubs / 10 competities](https://findmyfc.org/)
- [Club World Map (pwal.ch) — top-30 per regio](https://pwal.ch/projects/club-map/)
- [Sporting Maps — global soccer club map](https://www.sportingmaps.com/soccer/global_club_map)
- [Clubs From Above — stadions vanuit de lucht](https://www.clubsfromabove.com/map)
- [Footiemap — top-tier stadions](https://www.footiemap.com/)
- [Footbeen — stadium map / groundhopping](https://footbeen.com/stadium-map)
- [Groundhopper Soccer Guides — kaart + tickets/hospitality](https://groundhopperguides.com/)
- [Stadium Maps — 29 sporten wereldwijd](https://www.stadium-maps.com/)
- [FIFA26 World Cup Stadiums (mapme)](https://mapme.com/interactive-map-example/2026-world-cup-stadium-map/)
- [Football Ground Map — traffic/SEO (sitescorechecker)](https://footballgroundmap.com.sitescorechecker.com/)

**Aangrenzend (voetbal-engagement)**
- [playfootball.games — Similarweb traffic](https://www.similarweb.com/website/playfootball.games/)
- [Who Are Ya? — football guesser](https://playfootball.games/en-us/who-are-ya/)
- [GridSport Games — daily grid/quiz](https://gridsport.games/en)
- [Footdle](https://footdle.com/)

**Breder (geo/kaart, viraliteit, PR)**
- [GeoGuessr — Similarweb](https://www.similarweb.com/website/geoguessr.com/)
- [Beste dagelijkse geografie-games (EarthGuessr)](https://www.earthguessr.com/blog/best-daily-geography-games-wordle-style)
- [TikTok distance-map trend (Dexerto)](https://www.dexerto.com/tiktok/how-to-do-tiktoks-viral-distance-map-trend-1795886/)
- [Barratt Homes — Sporting Hotspots (digital PR)](https://www.barratthomes.co.uk/sporting-hotspots/)
- [The Making of Viral Maps (Penn State)](https://www.ems.psu.edu/alumni/stay-connected/issue/2/article/making-viral-maps)

**Tech voor een 3D-globe**
- [globe.gl (ThreeJS/WebGL)](https://globe.gl/)
- [Mapbox globe showcase](https://www.mapbox.com/blog/hundreds-of-earths-to-explore)
- [CesiumJS](https://cesium.com/platform/cesiumjs/)
- [Flourish — no-code maps/globes](https://flourish.studio/visualisations/maps/)

**Monetisatie**
- [Football betting affiliate marketing (Post Affiliate Pro)](https://www.postaffiliatepro.com/blog/football-betting-affiliate-marketing/)
- [Beste sports affiliate programma's 2026 (affninja)](https://affninja.com/sports-affiliate-programs/)
- [Event ticket affiliate programma's (uppromote)](https://uppromote.com/affiliate-programs/event-ticket/)
- [Travel affiliate programma's (Tapfiliate)](https://tapfiliate.com/blog/travel-affiliate-programs/)
- [Hotels & soccer fans 2026 (Expedia Group)](https://partner.expediagroup.com/en-us/resources/blog/how-hotels-can-score-bookings-from-soccer-fans-in-2026)
- [Website-monetisatie strategieën (MonetizeMore)](https://www.monetizemore.com/blog/website-monetization-strategies-for-publisher/)
