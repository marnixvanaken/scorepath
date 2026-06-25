// Localization for the UCL-2027 draw/bracket UI. These strings live partly in
// data structures (round/stage names, KNOCKOUT_TITLES) and partly inline in the
// interactive components, so we translate by the Dutch source string via uclT().
// One-time localization of a stable feature; keyed by NL source for simplicity.

type Locale = { en: string; es: string };

const UCL_TR: Record<string, Locale> = {
  // ── Club picker ──
  'Kies jouw club': { en: 'Choose your club', es: 'Elige tu club' },
  'Je stapt in op de ronde waar jouw club begint. Alle eerdere rondes worden automatisch gesimuleerd. Kies bijvoorbeeld een Q1-club voor de hele weg, of een league-phase-club om meteen bij de 36 te beginnen.':
    {
      en: 'You enter at the round where your club starts. All earlier rounds are simulated automatically. Pick a Q1 club for the full run, or a league-phase club to start straight at the 36.',
      es: 'Entras en la ronda donde empieza tu club. Todas las rondas anteriores se simulan automáticamente. Elige un club de Q1 para el recorrido completo, o un club de fase de liga para empezar directamente en los 36.',
    },
  'Instappen bij': { en: 'Enter at', es: 'Entrar en' },
  'Kwalificatie': { en: 'Qualifying', es: 'Clasificación' },

  // ── Stages / rounds ──
  'Automatisch gesimuleerd': { en: 'Simulated automatically', es: 'Simulado automáticamente' },
  'Eerste kwalificatieronde': { en: 'First qualifying round', es: 'Primera ronda de clasificación' },
  'Champions Path': { en: 'Champions Path', es: 'Vía de campeones' },
  'League Path': { en: 'League Path', es: 'Vía de liga' },
  'Play-off': { en: 'Play-off', es: 'Play-off' },
  'League phase': { en: 'League phase', es: 'Fase de liga' },

  // ── Pots / draw ──
  'Geseed': { en: 'Seeded', es: 'Cabezas de serie' },
  'Ongeseed': { en: 'Unseeded', es: 'No cabezas de serie' },
  'duels': { en: 'ties', es: 'eliminatorias' },
  'clubs': { en: 'clubs', es: 'clubes' },
  'Loting per pad, politieke restricties worden automatisch gerespecteerd.':
    { en: 'Draw per path; political restrictions are applied automatically.', es: 'Sorteo por vía; las restricciones políticas se aplican automáticamente.' },
  'Loting uitvoeren': { en: 'Run draw', es: 'Realizar sorteo' },
  'Officiële loting': { en: 'Official draw', es: 'Sorteo oficial' },
  'duels — klik op de winnaar': { en: 'ties — click the winner', es: 'eliminatorias — haz clic en el ganador' },
  'Simuleer': { en: 'Simulate', es: 'Simular' },
  'jouw club': { en: 'your club', es: 'tu club' },

  // ── League phase ──
  '36 clubs — 4 potten': { en: '36 clubs — 4 pots', es: '36 clubes — 4 bombos' },
  'Pot': { en: 'Pot', es: 'Bombo' },
  'Elke club speelt 8 wedstrijden (2 per pot). Landenrestricties worden afgedwongen.':
    { en: 'Each club plays 8 matches (2 per pot). Country restrictions are enforced.', es: 'Cada club juega 8 partidos (2 por bombo). Se aplican las restricciones por país.' },
  'League Phase loting uitvoeren': { en: 'Run league phase draw', es: 'Realizar sorteo de fase de liga' },
  'Eindstand league phase': { en: 'League phase standings', es: 'Clasificación de la fase de liga' },
  'Toon knockout →': { en: 'Show knockout →', es: 'Ver eliminatorias →' },
  'Naar de knockout →': { en: 'To the knockout →', es: 'A las eliminatorias →' },
  'Opnieuw simuleren': { en: 'Resimulate', es: 'Volver a simular' },
  'Club': { en: 'Club', es: 'Club' },
  'Ptn': { en: 'Pts', es: 'Pts' },
  'jij': { en: 'you', es: 'tú' },
  'Thuis': { en: 'Home', es: 'Local' },
  'Uit': { en: 'Away', es: 'Visitante' },

  // ── Knockout round names (KNOCKOUT_TITLES + bracket columns) ──
  'Knockout play-offs': { en: 'Knockout play-offs', es: 'Play-offs eliminatorios' },
  'Achtste finales': { en: 'Round of 16', es: 'Octavos de final' },
  'Kwartfinales': { en: 'Quarter-finals', es: 'Cuartos de final' },
  'Halve finales': { en: 'Semi-finals', es: 'Semifinales' },
  'Finale': { en: 'Final', es: 'Final' },
  'Uitgeschakeld': { en: 'Eliminated', es: 'Eliminado' },

  // ── Bracket ──
  'Eindstand': { en: 'Standings', es: 'Clasificación' },
  '— winnaars stromen door naar de achtste finales':
    { en: '— winners advance to the Round of 16', es: '— los ganadores avanzan a octavos de final' },
  'uit': { en: 'away', es: 'fuera' },
  'Winnaar Champions League 2026/27': { en: 'Champions League 2026/27 winner', es: 'Ganador de la Champions League 2026/27' },
  'Europacup I/CL-titel': { en: 'European Cup/CL title', es: 'título de Copa de Europa/CL' },
  'Europacup I/CL-titels': { en: 'European Cup/CL titles', es: 'títulos de Copa de Europa/CL' },
  'Mijn kaart': { en: 'My card', es: 'Mi tarjeta' },
  'Deel link': { en: 'Share link', es: 'Compartir' },
};

/** Translate a Dutch UCL UI string to the given locale (falls back to NL). */
export function uclT(nl: string, lang: string): string {
  if (lang === 'en') return UCL_TR[nl]?.en ?? nl;
  if (lang === 'es') return UCL_TR[nl]?.es ?? nl;
  return nl;
}
