import Link from 'next/link';

export function MbappeKloseContent({ lang = 'nl' }: { lang?: string }) {
  const sim = `/${lang}/wk-2026`;
  const blogBase = `/${lang}/blog`;

  if (lang === 'en') {
    return (
      <article>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          Miroslav Klose scored 16 times at a World Cup. That record has stood for over a decade, and nobody has come close. Until now. Kylian Mbappé enters the 2026 World Cup with 12 World Cup goals to his name. He is 27 years old, at his absolute peak and hungry for more.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          The question is no longer whether Mbappé can do it. The question is whether he does it at this tournament.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">What Klose did over 18 years</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Miroslav Klose played his first World Cup in 2002 for Germany and immediately scored five times. In 2006 he did it again: five goals, this time on home soil. In 2010 four goals, and in 2014, at his fourth and final World Cup, he scored two more — including his historic goal against Brazil in the semi-final.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Total: 16 goals. Spread across four tournaments, 18 years after his debut. Klose wasn&apos;t a sprinter or a technical wizard. He was a timing specialist, a header artist, a player who always found himself in the right place.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          After Klose, Ronaldo (8 goals) and Just Fontaine (13 in one tournament, 1958) stand in the history books. Messi finished on 13 — at his{' '}
          <Link href={`${blogBase}/drie-legendes-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">sixth World Cup</Link>
          {' '}he could still add to that tally. Nobody had seriously threatened the record until Mbappé appeared at Qatar 2022.
        </p>
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-themed">
                <th className="text-left text-[10px] font-bold text-slate-600 uppercase tracking-widest pb-3 pr-4">#</th>
                <th className="text-left text-[10px] font-bold text-slate-600 uppercase tracking-widest pb-3 pr-4">Player</th>
                <th className="text-left text-[10px] font-bold text-slate-600 uppercase tracking-widest pb-3 pr-4">Country</th>
                <th className="text-right text-[10px] font-bold text-slate-600 uppercase tracking-widest pb-3">Goals</th>
              </tr>
            </thead>
            <tbody>
              {([
                { rank: '1', name: 'Miroslav Klose', country: 'Germany', goals: '16', highlight: false },
                { rank: '2', name: 'Ronaldo Nazário', country: 'Brazil', goals: '15', highlight: false },
                { rank: '3', name: 'Gerd Müller', country: 'Germany', goals: '14', highlight: false },
                { rank: '4', name: 'Just Fontaine', country: 'France', goals: '13', highlight: false },
                { rank: '=4', name: 'Lionel Messi', country: 'Argentina', goals: '13', highlight: false },
                { rank: '6', name: 'Kylian Mbappé', country: 'France', goals: '12*', highlight: true },
              ] as const).map(({ rank, name, country, goals, highlight }) => (
                <tr key={name} className={`border-b border-themed ${highlight ? 'text-orange-400' : 'text-slate-300'}`}>
                  <td className="py-2.5 pr-4 text-slate-600 text-xs">{rank}</td>
                  <td className={`py-2.5 pr-4 font-semibold text-sm ${highlight ? 'text-orange-400' : 'text-white'}`}>{name}</td>
                  <td className="py-2.5 pr-4 text-slate-500 text-xs">{country}</td>
                  <td className={`py-2.5 text-right font-bold tabular-nums ${highlight ? 'text-orange-400' : 'text-slate-300'}`}>{goals}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-slate-700 mt-2">* after 2 World Cups, before the start of World Cup 2026</p>
        </div>
        <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <blockquote className="mb-4">
            <p className="text-slate-200 text-lg leading-relaxed italic">
              &ldquo;Records are there to be broken. That&apos;s the beauty of sport. If it&apos;s Mbappé who does it, then he has earned it.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Miroslav Klose, Germany&apos;s all-time World Cup top scorer
          </figcaption>
        </figure>
        <h2 className="font-display text-3xl text-white mb-4">Mbappé in Russia and Qatar</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          In 2018, aged 19, Mbappé scored four times for world champions France. In 2022 he improved dramatically: eight goals, earning the Golden Boot. Three in the final alone. Mbappé lost that final on penalties, but his personal performance was unprecedented.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Twelve goals in two World Cups. Only Klose stands higher on the all-time rankings with 16. And Klose achieved that over four tournaments.
        </p>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            Klose built his record over 18 years. Mbappé is already on 12 after two World Cups. The pace is unprecedented.
          </p>
        </blockquote>
        <h2 className="font-display text-3xl text-white mb-4">The maths for 2026</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Mbappé needs four goals to equal Klose. Five to break the record. If France reaches the semi-finals — which is achievable for a strong team like France — he plays a minimum of six matches. Averaging two goals per World Cup match in 2022: the probability is real.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          But records don&apos;t fall easily. Klose was never the fastest scorer, but he was the most consistent. It requires tournament luck, a good team around him and a goalkeeper having a bad day at the right moment. Mbappé can do it. But it&apos;s not guaranteed.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          What is certain: if he finishes as top scorer again in 2026 and France goes deep, the record is within reach. And he could still do it in 2030. Mbappé has time on his side.
        </p>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simulate it yourself</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">How far does France go in your scenario?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Fill in all group results, see live standings and play through the bracket. How many goals do you give Mbappé?</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Open the simulator
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">A record for the ages</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Klose&apos;s record seemed unbreakable. Not because better strikers didn&apos;t come along, but because the combination of quality, luck and tournament fate rarely all align simultaneously across multiple World Cups.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Mbappé is the first player in decades with the pace to do it. His first two World Cups were historic. His third could be legendary.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Write your scenario</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">How far does Mbappé take France? Simulate all groups and the bracket on ScorePath and share your prediction with a single link.</p>
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
      <article>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          Miroslav Klose marcó 16 goles en un Mundial. Ese récord lleva más de diez años en pie, y nadie se había acercado. Hasta ahora. Kylian Mbappé llega al Mundial 2026 con 12 goles en Mundiales a su nombre. Tiene 27 años, está en su mejor momento absoluto y con hambre de más.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          La pregunta ya no es si Mbappé puede hacerlo. La pregunta es si lo hace en este torneo.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Lo que Klose hizo en 18 años</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Miroslav Klose jugó su primer Mundial en 2002 con Alemania y marcó cinco goles de inmediato. En 2006 lo repitió: cinco goles, esta vez en casa. En 2010 cuatro goles más, y en 2014, en su cuarto y último Mundial, anotó dos más, incluido su histórico gol a Brasil en semifinales.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Total: 16 goles. Repartidos en cuatro torneos, 18 años después de su debut. Klose no era un velocista ni un virtuoso técnico. Era un especialista en el momento justo, un artista del cabezazo, un jugador que siempre aparecía en el sitio correcto.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Tras Klose, Ronaldo (8 goles) y Just Fontaine (13 en un torneo, 1958) figuran en los libros de historia. Messi cerró con 13 — en su{' '}
          <Link href={`${blogBase}/drie-legendes-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">sexto Mundial</Link>
          {' '}podría seguir sumando. Nadie había amenazado seriamente el récord hasta que Mbappé apareció en Qatar 2022.
        </p>
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-themed">
                <th className="text-left text-[10px] font-bold text-slate-600 uppercase tracking-widest pb-3 pr-4">#</th>
                <th className="text-left text-[10px] font-bold text-slate-600 uppercase tracking-widest pb-3 pr-4">Jugador</th>
                <th className="text-left text-[10px] font-bold text-slate-600 uppercase tracking-widest pb-3 pr-4">País</th>
                <th className="text-right text-[10px] font-bold text-slate-600 uppercase tracking-widest pb-3">Goles</th>
              </tr>
            </thead>
            <tbody>
              {([
                { rank: '1', name: 'Miroslav Klose', country: 'Alemania', goals: '16', highlight: false },
                { rank: '2', name: 'Ronaldo Nazário', country: 'Brasil', goals: '15', highlight: false },
                { rank: '3', name: 'Gerd Müller', country: 'Alemania', goals: '14', highlight: false },
                { rank: '4', name: 'Just Fontaine', country: 'Francia', goals: '13', highlight: false },
                { rank: '=4', name: 'Lionel Messi', country: 'Argentina', goals: '13', highlight: false },
                { rank: '6', name: 'Kylian Mbappé', country: 'Francia', goals: '12*', highlight: true },
              ] as const).map(({ rank, name, country, goals, highlight }) => (
                <tr key={name} className={`border-b border-themed ${highlight ? 'text-orange-400' : 'text-slate-300'}`}>
                  <td className="py-2.5 pr-4 text-slate-600 text-xs">{rank}</td>
                  <td className={`py-2.5 pr-4 font-semibold text-sm ${highlight ? 'text-orange-400' : 'text-white'}`}>{name}</td>
                  <td className="py-2.5 pr-4 text-slate-500 text-xs">{country}</td>
                  <td className={`py-2.5 text-right font-bold tabular-nums ${highlight ? 'text-orange-400' : 'text-slate-300'}`}>{goals}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-slate-700 mt-2">* tras 2 Mundiales, antes del inicio del Mundial 2026</p>
        </div>
        <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <blockquote className="mb-4">
            <p className="text-slate-200 text-lg leading-relaxed italic">
              &ldquo;Los récords están para batirse. Esa es la belleza del deporte. Si es Mbappé quien lo hace, se lo habrá ganado.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Miroslav Klose, máximo goleador histórico de Alemania en Mundiales
          </figcaption>
        </figure>
        <h2 className="font-display text-3xl text-white mb-4">Mbappé en Rusia y Catar</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          En 2018, con 19 años, Mbappé marcó cuatro goles con la Francia campeona del mundo. En 2022 se superó radicalmente: ocho goles, que le valieron la Bota de Oro. Tres solo en la final. Mbappé perdió esa final en los penaltis, pero su actuación personal fue sin precedentes.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Doce goles en dos Mundiales. Solo Klose está por encima con 16. Y Klose lo logró en cuatro torneos.
        </p>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            Klose construyó su récord en 18 años. Mbappé ya lleva 12 tras dos Mundiales. El ritmo no tiene precedentes.
          </p>
        </blockquote>
        <h2 className="font-display text-3xl text-white mb-4">Las cuentas para 2026</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Mbappé necesita cuatro goles para igualar a Klose. Cinco para batir el récord. Si Francia llega a semifinales — algo factible para un equipo fuerte — juega al menos seis partidos. Promediando dos goles por partido en 2022: la probabilidad es real.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Pero los récords no caen solos. Klose nunca fue el más rápido en marcar, sino el más constante. Requiere suerte en el torneo, un buen equipo alrededor y un portero con un mal día en el momento justo. Mbappé puede hacerlo. Pero no está garantizado.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Lo que sí es seguro: si vuelve a ser máximo goleador en 2026 y Francia llega lejos, el récord estará al alcance. Y todavía podría hacerlo en 2030. Mbappé tiene el tiempo a su favor.
        </p>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simúlalo tú mismo</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">¿Hasta dónde llega Francia en tu escenario?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Rellena todos los resultados de grupos, ve en directo las tablas y juega el bracket. ¿Cuántos goles le das a Mbappé?</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Abrir el simulador
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">Un récord para la eternidad</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          El récord de Klose parecía imbatible. No porque no surgieran delanteros mejores, sino porque la combinación de calidad, suerte y destino en el torneo raramente se alinea a lo largo de varios Mundiales.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Mbappé es el primer jugador en décadas con el ritmo necesario para lograrlo. Sus dos primeros Mundiales fueron históricos. El tercero podría ser legendario.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Escribe tu escenario</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">¿Hasta dónde lleva Mbappé a Francia? Simula todos los grupos y el bracket en ScorePath y comparte tu predicción con un solo enlace.</p>
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
    <article>

      <p className="text-slate-300 text-lg leading-relaxed mb-6">
        Miroslav Klose scoorde 16 keer op een Wereldkampioenschap. Dat record staat al meer dan tien jaar, en niemand is er in de buurt gekomen. Tot nu. Kylian Mbappé begint aan WK 2026 met 12 WK-doelpunten op zijn naam. Hij is 27 jaar oud, in zijn absolute top en hongerig voor meer.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        De vraag is niet meer of Mbappé het kan. De vraag is of hij het dit toernooi doet.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Wat Klose deed in 18 jaar</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Miroslav Klose speelde zijn eerste WK in 2002 voor Duitsland en scoorde meteen vijf keer. In 2006 deed hij het opnieuw: vijf goals, dit keer in eigen land. In 2010 vier doelpunten, en in 2014, op zijn vierde en laatste WK, scoorde hij er nog twee. Inclusief zijn historische goal tegen Brazilië in de halve finale.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Totaal: 16 goals. Verspreid over vier toernooien, 18 jaar na zijn debuut. Klose was geen sprinter, geen technisch wonderkind. Hij was een timing-specialist, een kopbalkunstenaar, een speler die zich altijd op de juiste plek bevond.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Na Klose staan Ronaldo (8 goals) en Just Fontaine (13 in één toernooi, 1958) in de geschiedenisboeken. Messi sloot af op 13 — op zijn{' '}
        <Link href={`${blogBase}/drie-legendes-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">zesde WK</Link>
        {' '}kan hij die teller nog ophogen. Niemand heeft het record serieus bedreigd, totdat Mbappé in Qatar 2022 verscheen.
      </p>

      <div className="my-8 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-themed">
              <th className="text-left text-[10px] font-bold text-slate-600 uppercase tracking-widest pb-3 pr-4">#</th>
              <th className="text-left text-[10px] font-bold text-slate-600 uppercase tracking-widest pb-3 pr-4">Speler</th>
              <th className="text-left text-[10px] font-bold text-slate-600 uppercase tracking-widest pb-3 pr-4">Land</th>
              <th className="text-right text-[10px] font-bold text-slate-600 uppercase tracking-widest pb-3">Goals</th>
            </tr>
          </thead>
          <tbody>
            {([
              { rank: '1', name: 'Miroslav Klose', country: 'Duitsland', goals: '16', highlight: false },
              { rank: '2', name: 'Ronaldo Nazário', country: 'Brazilië', goals: '15', highlight: false },
              { rank: '3', name: 'Gerd Müller', country: 'Duitsland', goals: '14', highlight: false },
              { rank: '4', name: 'Just Fontaine', country: 'Frankrijk', goals: '13', highlight: false },
              { rank: '=4', name: 'Lionel Messi', country: 'Argentinië', goals: '13', highlight: false },
              { rank: '6', name: 'Kylian Mbappé', country: 'Frankrijk', goals: '12*', highlight: true },
            ] as const).map(({ rank, name, country, goals, highlight }) => (
              <tr key={name} className={`border-b border-themed ${highlight ? 'text-orange-400' : 'text-slate-300'}`}>
                <td className="py-2.5 pr-4 text-slate-600 text-xs">{rank}</td>
                <td className={`py-2.5 pr-4 font-semibold text-sm ${highlight ? 'text-orange-400' : 'text-white'}`}>{name}</td>
                <td className="py-2.5 pr-4 text-slate-500 text-xs">{country}</td>
                <td className={`py-2.5 text-right font-bold tabular-nums ${highlight ? 'text-orange-400' : 'text-slate-300'}`}>{goals}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[10px] text-slate-700 mt-2">* na 2 WKs, voor aanvang WK 2026</p>
      </div>

      <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
        <blockquote className="mb-4">
          <p className="text-slate-200 text-lg leading-relaxed italic">
            &ldquo;Records zijn er om gebroken te worden. Dat is de schoonheid van sport. Als het Mbappé is die het doet, dan heeft hij het verdiend.&rdquo;
          </p>
        </blockquote>
        <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
          Miroslav Klose, meervoudig WK-topscorer Duitsland
        </figcaption>
      </figure>

      <h2 className="font-display text-3xl text-white mb-4">Mbappé in Rusland en Qatar</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        In 2018, als 19-jarige, scoorde Mbappé vier keer voor wereldkampioen Frankrijk. In 2022 verbeterde hij zichzelf radicaal: acht goals, goed voor de Gouden Schoen. In de finale alleen al drie. Mbappé verloor die finale op penalty&apos;s, maar zijn persoonlijke prestatie was ongekend.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Twaalf goals in twee WK&apos;s. Alleen Klose staat hoger op de historische ranglijst met zijn 16. En Klose bereikte dat over vier toernooien.
      </p>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Klose bouwde zijn record in 18 jaar op. Mbappé staat al op 12 na twee WK&apos;s. Het tempo is ongekend.
        </p>
      </blockquote>

      <h2 className="font-display text-3xl text-white mb-4">De rekensom voor 2026</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Mbappé heeft vier goals nodig om Klose te evenaren. Vijf om het record te breken. Als Frankrijk de halve finale haalt, wat voor een sterk elftal als Frankrijk haalbaar is, speelt hij minimaal zes wedstrijden. Gemiddeld twee goals per WK-wedstrijd in 2022: de kans is reëel.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Maar records breek je niet zomaar. Klose werd nooit de snelste scorer, maar wel de meest consistente. Het vergt toernooilot, een goed elftal om hem heen en een keeper die een slechte dag heeft op het juiste moment. Mbappé kan het. Maar het is geen garantie.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        Wat wél zeker is: als hij in 2026 opnieuw topscorer wordt en Frankrijk ver komt, staat het record binnen handbereik. En dan kan het ook in 2030 nog. Mbappé heeft de tijd mee.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Hoe ver komt Frankrijk in jouw scenario?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in, zie live de standen en speel de bracket door. Hoe ver scoor jij Mbappé?
        </p>
        <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
          Open de simulator
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      <h2 className="font-display text-3xl text-white mb-4">Een record voor de eeuwigheid</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Klose&apos;s record leek onbreekbaar. Niet omdat er geen betere spitsen kwamen, maar omdat de combinatie van kwaliteit, geluk en toernooilot zelden allemaal tegelijk klopt over meerdere WK&apos;s.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Mbappé is de eerste speler in decennia die het tempo heeft om dit te doen. Zijn eerste twee WK&apos;s waren historisch. Zijn derde kan legendarisch zijn.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Schrijf jouw scenario
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Hoe ver komt Mbappé met Frankrijk? Simuleer alle groepen en de bracket op ScorePath en deel je voorspelling via één link.
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
