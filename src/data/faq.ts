import { isLocale, DEFAULT_LOCALE } from '@/i18n';

export interface FaqItem {
  q: string;
  a: string;
}

// 5-6 veelgestelde vragen per taal. Wordt zowel in de UI (FaqSection) als in het
// FAQPage-JSON-LD op de simulatorpagina gebruikt — houd vraag/antwoord identiek.
const FAQ: Record<string, FaqItem[]> = {
  nl: [
    {
      q: 'Hoe werkt de ronde van 32?',
      a: 'Het WK 2026 heeft 48 teams in 12 groepen van 4. De nummers 1 en 2 van elke groep gaan door (24 teams), aangevuld met de 8 beste nummers drie. Samen vormen die 32 teams de nieuwe ronde van 32, het eerste knock-outduel.',
    },
    {
      q: 'Hoeveel nummers drie gaan door?',
      a: 'De 8 beste nummers drie van de 12 groepen plaatsen zich. De simulator zet ze automatisch op een ranglijst op basis van punten, doelsaldo en gemaakte doelpunten en trekt de streep na de 8e plek.',
    },
    {
      q: 'Hoe werken de FIFA-tiebreakers?',
      a: 'Bij gelijk aantal punten beslist achtereenvolgens: doelsaldo, daarna meeste gemaakte doelpunten. De simulator past deze volgorde (punten → doelsaldo → doelpunten) automatisch toe; bij een exacte gelijkstand op de grens kun je de volgorde zelf bepalen.',
    },
    {
      q: 'Is de simulator gratis?',
      a: 'Ja, ScorePath is volledig gratis en je hoeft geen account aan te maken. Je kunt zo vaak naspelen als je wilt.',
    },
    {
      q: 'Hoe deel ik mijn scenario?',
      a: 'Klik op "Deel link". Je volledige invulling — groepsuitslagen en knock-outschema — wordt in de URL gecodeerd, zodat anderen exact jouw scenario zien als ze de link openen.',
    },
    {
      q: 'Wat is het verschil tussen de modi EXACT, 1X2 en VOLGORDE?',
      a: 'EXACT: vul de precieze uitslag per wedstrijd in (bijv. 2-1) voor het nauwkeurigste doelsaldo. 1X2: kies alleen winst, gelijk of verlies — snel op mobiel. VOLGORDE: sleep of tik de teams in je eindstand per groep, zonder scores. In alle modi zie je live wie doorgaat.',
    },
    {
      q: 'Hoeveel wedstrijden telt het WK 2026?',
      a: 'Het WK 2026 telt in totaal 104 wedstrijden: 72 in de groepsfase (12 groepen × 6 wedstrijden) en 32 in de knock-outfase (ronde van 32, ronde van 16, kwartfinale, halve finale, troostfinale en finale).',
    },
    {
      q: 'Kan ik mijn simulatie opslaan?',
      a: 'Jouw invulling wordt automatisch bewaard via de URL. Klik op "Deel link" om een link te kopiëren die jouw volledige scenario bevat — inclusief alle groepsuitslagen en knock-outkeuzes. Die link kun je later zelf weer openen of met anderen delen.',
    },
    {
      q: 'Welke 48 landen doen mee aan het WK 2026?',
      a: 'De 48 deelnemers zijn verdeeld over 12 groepen. De gastlanden VS, Canada en Mexico zijn direct geplaatst. De overige 45 plekken zijn verdeeld via de continentale kwalificatiereeksen van UEFA (Europa), CONMEBOL (Zuid-Amerika), CAF (Afrika), AFC (Azië), CONCACAF en OFC.',
    },
    {
      q: 'Waar wordt het WK 2026 gespeeld?',
      a: 'Het WK 2026 wordt gespeeld in drie gastlanden: de VS, Canada en Mexico. De stadions liggen onder andere in New York/New Jersey, Los Angeles, Dallas, Miami, Atlanta, Seattle, Boston, San Francisco, Guadalajara, Mexico-Stad en Toronto. De finale is op 19 juli 2026 in het MetLife Stadium in New Jersey.',
    },
  ],
  en: [
    {
      q: 'How does the round of 32 work?',
      a: 'The 2026 World Cup has 48 teams in 12 groups of 4. The top two from each group advance (24 teams), joined by the 8 best third-placed teams. Together these 32 teams make up the new round of 32, the first knockout round.',
    },
    {
      q: 'How many third-placed teams advance?',
      a: 'The 8 best third-placed teams out of the 12 groups qualify. The simulator automatically ranks them by points, goal difference and goals scored, and draws the cut-off line after 8th place.',
    },
    {
      q: 'How do the FIFA tiebreakers work?',
      a: 'When teams are level on points, the order is: goal difference, then most goals scored. The simulator applies this order (points → goal difference → goals) automatically; if there is an exact tie on the cut-off line you can set the order yourself.',
    },
    {
      q: 'Is the simulator free?',
      a: 'Yes, ScorePath is completely free and you do not need an account. You can replay it as often as you like.',
    },
    {
      q: 'How do I share my scenario?',
      a: 'Click "Share link". Your full bracket — group results and knockout picks — is encoded in the URL, so anyone who opens the link sees exactly your scenario.',
    },
    {
      q: 'What is the difference between EXACT, 1X2 and ORDER modes?',
      a: 'EXACT: enter the precise score per match (e.g. 2-1) for the most accurate goal difference. 1X2: just pick win, draw or loss — fast on mobile. ORDER: drag or tap the teams into your final standing per group, without scores. In every mode you see live who advances.',
    },
    {
      q: 'How many matches does the 2026 World Cup have?',
      a: 'The 2026 World Cup has 104 matches in total: 72 in the group stage (12 groups × 6 matches) and 32 in the knockout phase (round of 32, round of 16, quarter-finals, semi-finals, third-place match and final).',
    },
    {
      q: 'Can I save my simulation?',
      a: 'Your bracket is automatically saved in the URL. Click "Share link" to copy a link that contains your complete scenario — including all group results and knockout choices. You can reopen that link yourself later or share it with others.',
    },
    {
      q: 'Which 48 countries are in the 2026 World Cup?',
      a: 'The 48 participants are split across 12 groups. Host nations USA, Canada and Mexico qualify automatically. The remaining 45 spots are distributed through continental qualifying from UEFA (Europe), CONMEBOL (South America), CAF (Africa), AFC (Asia), CONCACAF and OFC.',
    },
    {
      q: 'Where is the 2026 World Cup played?',
      a: 'The 2026 World Cup is played across three host nations: the USA, Canada and Mexico. Venues include New York/New Jersey, Los Angeles, Dallas, Miami, Atlanta, Seattle, Boston, San Francisco, Guadalajara, Mexico City and Toronto. The final is on 19 July 2026 at MetLife Stadium in New Jersey.',
    },
  ],
  es: [
    {
      q: '¿Cómo funciona la ronda de 32?',
      a: 'El Mundial 2026 tiene 48 selecciones en 12 grupos de 4. Los dos primeros de cada grupo avanzan (24 equipos), junto con los 8 mejores terceros. Esos 32 equipos forman la nueva ronda de 32, la primera eliminatoria.',
    },
    {
      q: '¿Cuántos terceros se clasifican?',
      a: 'Se clasifican los 8 mejores terceros de los 12 grupos. El simulador los ordena automáticamente por puntos, diferencia de goles y goles marcados, y traza el corte tras el 8.º puesto.',
    },
    {
      q: '¿Cómo funcionan los desempates de la FIFA?',
      a: 'Con igualdad de puntos, el orden es: diferencia de goles y luego más goles marcados. El simulador aplica este orden (puntos → diferencia de goles → goles) automáticamente; si hay un empate exacto en el corte, puedes fijar tú el orden.',
    },
    {
      q: '¿El simulador es gratis?',
      a: 'Sí, ScorePath es totalmente gratuito y no necesitas cuenta. Puedes simular tantas veces como quieras.',
    },
    {
      q: '¿Cómo comparto mi escenario?',
      a: 'Haz clic en "Compartir enlace". Todo tu cuadro — resultados de grupo y eliminatorias — queda codificado en la URL, de modo que quien abra el enlace verá exactamente tu escenario.',
    },
    {
      q: '¿Qué diferencia hay entre los modos EXACTO, 1X2 y ORDEN?',
      a: 'EXACTO: introduce el marcador exacto por partido (p. ej. 2-1) para la diferencia de goles más precisa. 1X2: elige solo victoria, empate o derrota — rápido en el móvil. ORDEN: arrastra o toca los equipos en tu clasificación final por grupo, sin marcadores. En todos los modos ves en directo quién avanza.',
    },
    {
      q: '¿Cuántos partidos tiene el Mundial 2026?',
      a: 'El Mundial 2026 tiene un total de 104 partidos: 72 en la fase de grupos (12 grupos × 6 partidos) y 32 en la fase eliminatoria (ronda de 32, octavos de final, cuartos de final, semifinales, partido por el tercer puesto y final).',
    },
    {
      q: '¿Puedo guardar mi simulación?',
      a: 'Tu cuadro se guarda automáticamente en la URL. Haz clic en "Compartir enlace" para copiar un enlace que contiene tu escenario completo — con todos los resultados de grupo y las elecciones eliminatorias. Puedes volver a abrirlo más tarde o compartirlo con otros.',
    },
    {
      q: '¿Qué 48 países participan en el Mundial 2026?',
      a: 'Los 48 participantes están divididos en 12 grupos. Los países anfitriones EE.UU., Canadá y México se clasifican automáticamente. Los 45 puestos restantes se reparten mediante la clasificación continental de UEFA (Europa), CONMEBOL (Sudamérica), CAF (África), AFC (Asia), CONCACAF y OFC.',
    },
    {
      q: '¿Dónde se juega el Mundial 2026?',
      a: 'El Mundial 2026 se disputa en tres países anfitriones: EE.UU., Canadá y México. Las sedes incluyen Nueva York/Nueva Jersey, Los Ángeles, Dallas, Miami, Atlanta, Seattle, Boston, San Francisco, Guadalajara, Ciudad de México y Toronto. La final es el 19 de julio de 2026 en el MetLife Stadium de Nueva Jersey.',
    },
  ],
};

export function getFaq(locale: string): FaqItem[] {
  return FAQ[isLocale(locale) ? locale : DEFAULT_LOCALE] ?? FAQ.nl;
}
