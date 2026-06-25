import Link from 'next/link';

export function Wk2026FormatContent({ lang = 'nl' }: { lang?: string }) {
  const sim = `/${lang}/wk-2026`;
  const blogBase = `/${lang}/blog`;

  if (lang === 'en') {
    return (
      <article className="prose-blog">
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          The 2026 World Cup is unlike any previous edition. For the first time in history, 48 nations compete instead of 32. That expansion changes everything: the groups, the bracket, the qualification system — and the chances for smaller footballing nations. Here is everything you need to know about the new format.
        </p>

        <div className="my-8 grid grid-cols-3 gap-3">
          {([
            { num: '48', label: 'Teams', sub: 'vs 32 at previous editions' },
            { num: '12', label: 'Groups', sub: 'of 4 teams each' },
            { num: '104', label: 'Matches', sub: 'from group stage to final' },
          ] as const).map(({ num, label, sub }) => (
            <div key={label} className="bg-[#0d0d0d] border border-themed rounded-xl p-4 text-center">
              <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
              <p className="text-white font-semibold text-xs">{label}</p>
              <p className="text-slate-600 text-[10px] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-3xl text-white mb-4">From 32 to 48 teams: why?</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          FIFA voted for the expansion in 2017. The idea: involve more countries in the biggest football event in the world, represent more continents, and make the sport more global. Africa gets 9 spots instead of 5, Asia gets 8 instead of 4, and CONCACAF gets 6 instead of 3.5.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Critics feared quality giving way to quantity. But supporters point out that expanding from 16 to 24 teams in 1982, and from 24 to 32 in 1998, also produced memorable tournaments with no quality loss.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          The result for 2026: 12 groups of 4 teams, 104 matches in total, spread across three host nations: the United States, Canada and Mexico.
        </p>

        <h2 className="font-display text-3xl text-white mb-4">The group stage: 12 groups of 4</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          At previous World Cups there were 8 groups of 4 teams. In 2026 there are 12. That sounds like a minor adjustment, but the impact is significant.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Each group still plays 6 matches. Each team still plays 3 group games. But because there are now 12 groups instead of 8, many more nations get a chance to compete at the group stage. And the ranking system for who advances has changed fundamentally.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          The top two from each group advance automatically. That gives us 24 teams. But that only fills 24 of the 32 slots in the knockout bracket.
        </p>

        <h2 className="font-display text-3xl text-white mb-4">The round of 32: a completely new phase</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          This is where the 2026 format really differs from before. After the 24 group winners and runners-up are known, the 8 best third-placed teams from all 12 groups are also selected. Together they form 32 teams who play the round of 32 — the first knockout round.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          The round of 32 is new in World Cup history. Previously there was a round of 16 as the first knockout round. Now there is an extra round, which means more teams stay in the tournament longer — and more potential for surprises.
        </p>

        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            The round of 32 is completely new in World Cup history — more matches, more drama, more chances for upsets.
          </p>
        </blockquote>

        <h2 className="font-display text-3xl text-white mb-4">How are the best third-placed teams ranked?</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Out of 12 groups, 12 teams finish third. Only 8 of them advance. The ranking is determined by:
        </p>
        <ol className="list-decimal list-inside text-slate-300 text-lg leading-relaxed mb-5 space-y-2 pl-2">
          <li>Points (3 for a win, 1 for a draw)</li>
          <li>Goal difference</li>
          <li>Goals scored</li>
          <li>Fair play (fewer yellow and red cards)</li>
        </ol>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          The{' '}
          <Link href={sim} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">ScorePath simulator</Link>
          {' '}calculates this ranking automatically and in real time as you fill in match results.
        </p>

        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simulate it yourself</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">See the round of 32 come together live</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Fill in all 104 match results and watch who reaches the knockout bracket. The simulator applies all FIFA tiebreaker rules automatically.</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Open the simulator
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <h2 className="font-display text-3xl text-white mb-4">What does this mean for smaller nations?</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          With a 32-team World Cup it was already hard for smaller footballing nations to reach the knockout stage. With 48 teams the bar is lower. One bad day in the group stage no longer automatically ends a tournament.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Nations like Morocco (2022 semi-finalists), Japan, Saudi Arabia, and CONCACAF nations have more room to manoeuvre. Third place in a group is no longer a death sentence — it might still be enough to advance.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Read about the{' '}
          <Link href={`${blogBase}/vijf-wk-stunts`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">five biggest World Cup upsets ever</Link>
          {' '}— and imagine which new surprises the expanded 2026 format might produce.
        </p>

        <h2 className="font-display text-3xl text-white mb-4">The host nation advantage</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          It is well known that hosts benefit at World Cups. The USA reached the round of 16 in 1994, South Korea reached the semi-finals in 2002, and Brazil reached the semi-finals in 2014 — all helped by home crowd support. In 2026 that advantage is split across three nations: the USA, Canada and Mexico.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Whether the host advantage gets diluted across three countries remains to be seen. But with major stadiums in Dallas, New York, Los Angeles, Toronto and Mexico City, the atmosphere is guaranteed.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          The final will be played on 19 July 2026 at MetLife Stadium in New Jersey. 104 matches. 48 teams. One trophy. The biggest World Cup ever.
        </p>

        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Simulate the full tournament</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">Fill in all group results, see who advances through the round of 32, and play out the knockout bracket all the way to the final. Share your scenario with a single link.</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm">
            Start the simulator
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </article>
    );
  }

  if (lang === 'es') {
    return (
      <article className="prose-blog">
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          El Mundial 2026 es diferente a todas las ediciones anteriores. Por primera vez en la historia, 48 naciones compiten en lugar de 32. Esa expansión lo cambia todo: los grupos, el cuadro, el sistema de clasificación y las oportunidades para las naciones futbolísticas más pequeñas. Aquí tienes todo lo que necesitas saber sobre el nuevo formato.
        </p>

        <div className="my-8 grid grid-cols-3 gap-3">
          {([
            { num: '48', label: 'Equipos', sub: 'vs 32 en ediciones anteriores' },
            { num: '12', label: 'Grupos', sub: 'de 4 equipos cada uno' },
            { num: '104', label: 'Partidos', sub: 'de la fase de grupos a la final' },
          ] as const).map(({ num, label, sub }) => (
            <div key={label} className="bg-[#0d0d0d] border border-themed rounded-xl p-4 text-center">
              <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
              <p className="text-white font-semibold text-xs">{label}</p>
              <p className="text-slate-600 text-[10px] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-3xl text-white mb-4">De 32 a 48 equipos: ¿por qué?</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          La FIFA votó a favor de la expansión en 2017. La idea: implicar a más países en el mayor evento futbolístico del mundo, representar a más continentes y hacer el deporte más global. África pasa de 5 a 9 plazas, Asia de 4 a 8, y la CONCACAF de 3,5 a 6.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Los críticos temían que la calidad cediera ante la cantidad. Pero los defensores señalan que ampliar de 16 a 24 equipos en 1982, y de 24 a 32 en 1998, también produjo torneos memorables sin pérdida de calidad.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          El resultado para 2026: 12 grupos de 4 equipos, 104 partidos en total, repartidos entre tres países anfitriones: Estados Unidos, Canadá y México.
        </p>

        <h2 className="font-display text-3xl text-white mb-4">La fase de grupos: 12 grupos de 4</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          En los Mundiales anteriores había 8 grupos de 4 equipos. En 2026 hay 12. Puede parecer un ajuste menor, pero el impacto es significativo.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Cada grupo sigue jugando 6 partidos. Cada equipo sigue jugando 3 partidos de grupo. Pero al haber ahora 12 grupos en lugar de 8, muchas más naciones tienen la oportunidad de competir en la fase de grupos. Y el sistema de clasificación para saber quién avanza ha cambiado fundamentalmente.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Los dos primeros de cada grupo avanzan automáticamente. Eso nos da 24 equipos. Pero solo cubre 24 de los 32 puestos en el cuadro eliminatorio.
        </p>

        <h2 className="font-display text-3xl text-white mb-4">La ronda de 32: una fase completamente nueva</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Aquí es donde el formato de 2026 realmente se diferencia del anterior. Tras conocerse los 24 primeros y segundos de grupo, también se seleccionan los 8 mejores terceros de los 12 grupos. Juntos forman 32 equipos que disputan la ronda de 32, la primera ronda eliminatoria.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          La ronda de 32 es nueva en la historia del Mundial. Antes, los octavos de final eran la primera ronda eliminatoria. Ahora hay una ronda extra, lo que significa que más equipos permanecen en el torneo más tiempo — y más posibilidades de sorpresas.
        </p>

        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            La ronda de 32 es completamente nueva en la historia del Mundial — más partidos, más drama, más posibilidades de sorpresas.
          </p>
        </blockquote>

        <h2 className="font-display text-3xl text-white mb-4">¿Cómo se clasifican los mejores terceros?</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          De 12 grupos, 12 equipos quedan terceros. Solo 8 de ellos avanzan. La clasificación se determina por:
        </p>
        <ol className="list-decimal list-inside text-slate-300 text-lg leading-relaxed mb-5 space-y-2 pl-2">
          <li>Puntos (3 por victoria, 1 por empate)</li>
          <li>Diferencia de goles</li>
          <li>Goles marcados</li>
          <li>Fair play (menos tarjetas amarillas y rojas)</li>
        </ol>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          El{' '}
          <Link href={sim} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">simulador de ScorePath</Link>
          {' '}calcula esta clasificación automáticamente y en tiempo real a medida que rellenas los resultados.
        </p>

        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simúlalo tú mismo</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">Ve cómo se forma la ronda de 32 en directo</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Rellena los 104 resultados y observa quién llega al cuadro eliminatorio. El simulador aplica automáticamente todas las reglas de desempate de la FIFA.</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Abrir el simulador
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <h2 className="font-display text-3xl text-white mb-4">¿Qué significa esto para las naciones más pequeñas?</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Con un Mundial de 32 equipos ya era difícil para las naciones futbolísticas más pequeñas llegar a la fase eliminatoria. Con 48 equipos el listón es más bajo. Un mal día en la fase de grupos ya no termina automáticamente un torneo.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Naciones como Marruecos (semifinalista en 2022), Japón, Arabia Saudí y las naciones de la CONCACAF tienen más margen de maniobra. El tercer puesto en un grupo ya no es una sentencia de muerte — podría ser suficiente para avanzar.
        </p>

        <h2 className="font-display text-3xl text-white mb-4">La ventaja del país anfitrión</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Es bien sabido que los anfitriones se benefician en los Mundiales. En 2026 esa ventaja se reparte entre tres países: EE.UU., Canadá y México. Con estadios importantes en Dallas, Nueva York, Los Ángeles, Toronto y Ciudad de México, el ambiente está garantizado.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          La final se jugará el 19 de julio de 2026 en el MetLife Stadium de Nueva Jersey. 104 partidos. 48 equipos. Un trofeo. El mayor Mundial de la historia.
        </p>

        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Simula el torneo completo</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">Rellena todos los resultados de grupos, ve quién avanza en la ronda de 32 y juega el cuadro eliminatorio hasta la final. Comparte tu escenario con un solo enlace.</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm">
            Iniciar el simulador
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </article>
    );
  }

  // NL default
  return (
    <article className="prose-blog">
      <p className="text-slate-300 text-lg leading-relaxed mb-6">
        Het WK 2026 is anders dan alle eerdere edities. Voor het eerst in de geschiedenis doen 48 landen mee in plaats van 32. Die uitbreiding verandert alles: de groepen, het bracket, het kwalificatiesysteem én de kansen voor kleinere voetbalnaties. Dit is alles wat je moet weten over het nieuwe format.
      </p>

      <div className="my-8 grid grid-cols-3 gap-3">
        {([
          { num: '48', label: 'Teams', sub: 'vs 32 bij vorige edities' },
          { num: '12', label: 'Groepen', sub: 'van elk 4 teams' },
          { num: '104', label: 'Wedstrijden', sub: 'van groepsfase tot finale' },
        ] as const).map(({ num, label, sub }) => (
          <div key={label} className="bg-[#0d0d0d] border border-themed rounded-xl p-4 text-center">
            <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
            <p className="text-white font-semibold text-xs">{label}</p>
            <p className="text-slate-600 text-[10px] mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-3xl text-white mb-4">Van 32 naar 48 teams: waarom?</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        FIFA stemde in 2017 voor de uitbreiding. De gedachte: meer landen betrekken bij het grootste voetbalevenement ter wereld, meer continenten vertegenwoordigen, en de sport globaler maken. Afrika krijgt 9 plekken in plaats van 5, Azië 8 in plaats van 4, en CONCACAF 6 in plaats van 3,5.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Critici vrezen dat kwaliteit inboet aan kwantiteit. Maar voorstanders wijzen erop dat de uitbreiding van 16 naar 24 teams in 1982, en van 24 naar 32 in 1998, ook memorabele toernooien opleverde zonder kwaliteitsverlies.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Het resultaat voor 2026: 12 groepen van 4 teams, 104 wedstrijden in totaal, verdeeld over drie gastlanden: de VS, Canada en Mexico.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">De groepsfase: 12 groepen van 4</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Bij eerdere WK&apos;s waren er 8 groepen van 4 teams. In 2026 zijn dat er 12. Dat klinkt als een kleine aanpassing, maar de impact is groot.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Elke groep speelt nog steeds 6 wedstrijden. Elk team speelt nog steeds 3 groepswedstrijden. Maar omdat er nu 12 groepen zijn in plaats van 8, krijgen veel meer naties de kans om mee te doen aan de groepsfase. En het systeem voor wie doorgaat is fundamenteel veranderd.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        De nummers 1 en 2 van elke groep gaan automatisch door. Dat geeft ons 24 teams. Maar daarmee zijn slechts 24 van de 32 plekken in het knock-outbracket gevuld.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">De ronde van 32: een geheel nieuwe fase</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Hier verschilt het WK 2026 format echt van voorheen. Naast de 24 groepswinnaars en nummers twee worden ook de 8 beste nummers drie uit alle 12 groepen geselecteerd. Samen vormen zij 32 teams die de ronde van 32 spelen — het eerste knock-outduel.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        De ronde van 32 is nieuw in de WK-geschiedenis. Voorheen was de ronde van 16 de eerste knock-outronde. Nu is er een extra ronde, wat betekent dat meer teams langer in het toernooi blijven — en meer kansen voor verrassingen.
      </p>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          De ronde van 32 is volledig nieuw in de WK-geschiedenis — meer wedstrijden, meer drama, meer kansen voor stunts.
        </p>
      </blockquote>

      <h2 className="font-display text-3xl text-white mb-4">Hoe worden de beste nummers drie bepaald?</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Van 12 groepen eindigen 12 teams op de derde plek. Slechts 8 van hen gaan door. De ranglijst wordt bepaald op basis van:
      </p>

      <ol className="list-decimal list-inside text-slate-300 text-lg leading-relaxed mb-5 space-y-2 pl-2">
        <li>Punten (3 voor winst, 1 voor gelijkspel)</li>
        <li>Doelsaldo</li>
        <li>Gemaakte doelpunten</li>
        <li>Fair play (minder gele en rode kaarten)</li>
      </ol>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        De{' '}
        <Link href={sim} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">ScorePath-simulator</Link>
        {' '}berekent deze ranglijst automatisch en in real time terwijl je de uitslagen invult.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Zie de ronde van 32 live samenkomen
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle 104 uitslagen in en zie live wie het knock-outbracket bereikt. De simulator past alle FIFA-tiebreakers automatisch toe.
        </p>
        <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
          Open de simulator
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      <h2 className="font-display text-3xl text-white mb-4">Wat betekent dit voor kleinere landen?</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Bij een WK met 32 teams was het al moeilijk voor kleinere voetbalnaties om de knock-outfase te halen. Bij 48 teams is de drempel lager. Eén slechte dag in de groepsfase betekent niet automatisch het einde van het toernooi.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Landen als Marokko (halvefinalist in 2022), Japan, Saoedi-Arabië en CONCACAF-naties hebben meer speelruimte. Een derde plek in de groep is geen doodsvonnis meer — het kan nog genoeg zijn om door te gaan. Lees over de{' '}
        <Link href={`${blogBase}/vijf-wk-stunts`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">vijf grootste WK-stunts ooit</Link>
        {' '}en stel je voor welke verrassingen het uitgebreide 2026-format kan opleveren.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Het gastlandvoordeel</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het is bekend dat gastlanden een voordeel hebben op het WK. De VS haalde de ronde van 16 in 1994, Zuid-Korea bereikte de halve finale in 2002 en Brazilië haalde de halve finale in 2014. In 2026 is dat voordeel verdeeld over drie landen: de VS, Canada en Mexico.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        Of het gastlandvoordeel verdund raakt over drie landen, moet nog blijken. Maar met grote stadions in Dallas, New York, Los Angeles, Toronto en Mexico-Stad is de sfeer gegarandeerd. De finale wordt op 19 juli 2026 gespeeld in het MetLife Stadium in New Jersey. 104 wedstrijden. 48 teams. Één trofee. Het grootste WK ooit.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Simuleer het volledige toernooi
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Vul alle groepsuitslagen in, zie wie er via de ronde van 32 doorgaat en speel het knock-outbracket door tot de finale. Deel je scenario via één link.
        </p>
        <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm">
          Start de simulator
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </article>
  );
}
