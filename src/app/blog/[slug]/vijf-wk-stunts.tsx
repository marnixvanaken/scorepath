import Link from 'next/link';

export function VijfWkStuntsContent({ lang = 'nl' }: { lang?: string }) {
  const sim = `/${lang}/wk-2026`;
  const blogBase = `/${lang}/blog`;

  if (lang === 'en') {
    return (
      <article className="prose-blog">
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          The World Cup has a long tradition of producing moments nobody saw coming. Small nations defeating giants, tournament favourites crashing out in the group stage, scorelines that defy belief. These are the five biggest upsets in World Cup history — and a reminder of what the expanded 2026 format might have in store.
        </p>

        <h2 className="font-display text-3xl text-white mb-4">1. North Korea beat Italy — 1966</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          The 1966 World Cup in England produced one of the most shocking results in tournament history. North Korea, making their first ever World Cup appearance, faced Italy in the group stage. Italy were two-time world champions and heavy favourites. North Korea were largely unknown.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Pak Doo-ik scored the only goal of the game in the 42nd minute, and North Korea held on for a 1-0 win that sent shockwaves through the football world. It was the first time an Asian nation had beaten a European or South American opponent at a World Cup. Italy were eliminated in the group stage. North Korea reached the quarter-finals.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          The scenes at Middlesbrough&apos;s Ayresome Park that day became legend. Italy&apos;s players reportedly needed police protection on their return home. Pak Doo-ik became a national hero.
        </p>

        <div className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm font-semibold">North Korea</span>
            <span className="font-display text-3xl text-orange-500">1 – 0</span>
            <span className="text-slate-400 text-sm font-semibold">Italy</span>
          </div>
          <p className="text-slate-600 text-[11px] text-center">Group stage · 1966 World Cup · Middlesbrough</p>
        </div>

        <h2 className="font-display text-3xl text-white mb-4">2. Senegal beat France — 2002</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          France entered the 2002 World Cup in Japan and South Korea as defending world champions and heavy favourites to retain the title. They had Zidane, Trezeguet, Henry, Vieira — arguably the strongest squad in the world. Their opening match was against Senegal, who were making their World Cup debut.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Senegal won 1-0 through a Papa Bouba Diop goal, and France were bundled out of the tournament without scoring a single goal. Zidane never appeared due to injury. The defending champions were eliminated in the group stage — one of the most stunning collapses in tournament history.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Senegal went on to reach the quarter-finals in 2002. Twenty years later, in Qatar 2022, they went one better and reached the round of 16. African football has never looked back.
        </p>

        <div className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm font-semibold">Senegal</span>
            <span className="font-display text-3xl text-orange-500">1 – 0</span>
            <span className="text-slate-400 text-sm font-semibold">France</span>
          </div>
          <p className="text-slate-600 text-[11px] text-center">Group stage · 2002 World Cup · Seoul</p>
        </div>

        <h2 className="font-display text-3xl text-white mb-4">3. Cameroon beat Argentina — 1990</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          The 1990 World Cup opened with a sensation. Defending champions Argentina, captained by Diego Maradona, faced Cameroon in the opening match of the tournament. Argentina were clear favourites. Cameroon had two players sent off during the game.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Omam-Biyik headed in the only goal, and Cameroon — finishing with nine men — held on for a famous 1-0 victory. It was a turning point for African football and one of the most dramatic opening matches in World Cup history.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Cameroon went on to reach the quarter-finals, where they lost narrowly to England. Roger Milla, at 38 years old, became the tournament&apos;s unlikely star. The image of Milla dancing at the corner flag became one of football&apos;s most iconic sights.
        </p>

        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            Nine men. Defending champions. One goal. Cameroon&apos;s 1990 upset changed how the world saw African football.
          </p>
        </blockquote>

        <h2 className="font-display text-3xl text-white mb-4">4. South Korea reach the semi-finals — 2002</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Co-hosting the 2002 World Cup with Japan, South Korea produced the most sustained upset run in tournament history. They beat Spain in the quarter-finals and Italy in the round of 16 — both on penalties, both in circumstances that sparked worldwide debate about refereeing decisions.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Whatever the controversy, the result stands in the books: South Korea became the first Asian nation to reach a World Cup semi-final. The entire country was gripped by football fever. Their run ended against Germany in the semis, and they lost the third-place match to Turkey.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Two decades later, the question remains: was it the greatest achievement of an underdog in World Cup history, or the most aided? Probably a bit of both.
        </p>

        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simulate the upsets yourself</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">Which giant falls in your scenario?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">With 48 teams and a round of 32, the 2026 World Cup has more room for surprises than any edition before. Fill in all 104 matches on ScorePath and see what unfolds.</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Open the simulator
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <h2 className="font-display text-3xl text-white mb-4">5. Germany humiliate Brazil — 2014</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          The most famous result of the modern era. Brazil, playing at home, faced Germany in the semi-final of the 2014 World Cup. Neymar was injured. Thiago Silva was suspended. The host nation needed a miracle.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          What they got was a nightmare. Germany scored five goals in the first 29 minutes. By half-time it was 5-0. The final score: 7-1. The Mineirão stadium fell silent. Brazilian fans in tears. The images of grown men and women sobbing in the stands became some of the most powerful in football history.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          It was not an underdog defeating a favourite — it was a top nation dismantling another top nation in a way that had simply never happened before at this stage of a World Cup. The &apos;Mineirazo&apos; entered football vocabulary permanently.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          In 2026, with{' '}
          <Link href={`${blogBase}/wk-2026-format`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">48 teams and a round of 32</Link>
          , more matches mean more opportunities for drama. Which team creates the next moment that enters the history books?
        </p>

        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Write your own upset</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">Who falls in your World Cup 2026? Simulate all groups and the full knockout bracket on ScorePath and share your scenario with a single link.</p>
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
          El Mundial tiene una larga tradición de producir momentos que nadie veía venir. Naciones pequeñas derrotando a gigantes, favoritos eliminados en la fase de grupos, resultados que desafían toda lógica. Estos son los cinco mayores batacazos de la historia del Mundial — y un recordatorio de lo que el formato ampliado de 2026 podría deparar.
        </p>

        <h2 className="font-display text-3xl text-white mb-4">1. Corea del Norte vence a Italia — 1966</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          El Mundial de 1966 en Inglaterra produjo uno de los resultados más impactantes de la historia del torneo. Corea del Norte, en su primera participación mundialista, se enfrentó a Italia en la fase de grupos. Italia era bicampeona del mundo y gran favorita. Corea del Norte era prácticamente desconocida.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Pak Doo-ik marcó el único gol en el minuto 42, y Corea del Norte aguantó para una victoria de 1-0 que sacudió el mundo del fútbol. Fue la primera vez que una nación asiática derrotaba a un rival europeo o sudamericano en un Mundial. Italia quedó eliminada en la fase de grupos. Corea del Norte llegó a cuartos de final.
        </p>

        <div className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm font-semibold">Corea del Norte</span>
            <span className="font-display text-3xl text-orange-500">1 – 0</span>
            <span className="text-slate-400 text-sm font-semibold">Italia</span>
          </div>
          <p className="text-slate-600 text-[11px] text-center">Fase de grupos · Mundial 1966 · Middlesbrough</p>
        </div>

        <h2 className="font-display text-3xl text-white mb-4">2. Senegal vence a Francia — 2002</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Francia llegó al Mundial 2002 en Japón y Corea del Sur como campeona defensora y gran favorita. Tenían a Zidane, Trezeguet, Henry, Vieira. Su primer partido era contra Senegal, que debutaba en un Mundial.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Senegal ganó 1-0 con un gol de Papa Bouba Diop, y Francia fue eliminada sin marcar un solo gol. Los campeones defensores quedaron fuera en la fase de grupos — uno de los derrumbes más impactantes de la historia del torneo.
        </p>

        <div className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm font-semibold">Senegal</span>
            <span className="font-display text-3xl text-orange-500">1 – 0</span>
            <span className="text-slate-400 text-sm font-semibold">Francia</span>
          </div>
          <p className="text-slate-600 text-[11px] text-center">Fase de grupos · Mundial 2002 · Seúl</p>
        </div>

        <h2 className="font-display text-3xl text-white mb-4">3. Camerún vence a Argentina — 1990</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          El Mundial de 1990 arrancó con una sensación. La campeona defensora Argentina, capitaneada por Maradona, se enfrentó a Camerún en el partido inaugural. Argentina era la clara favorita. Camerún acabó con dos jugadores expulsados.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Omam-Biyik cabeceó el único gol, y Camerún — con nueve hombres — aguantó para una histórica victoria por 1-0. Fue un punto de inflexión para el fútbol africano.
        </p>

        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            Nueve hombres. Campeones defensores. Un gol. El batacazo de Camerún en 1990 cambió la percepción del fútbol africano en el mundo.
          </p>
        </blockquote>

        <h2 className="font-display text-3xl text-white mb-4">4. Corea del Sur llega a semifinales — 2002</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Co-anfitriona del Mundial 2002 junto a Japón, Corea del Sur protagonizó la racha de sorpresas más sostenida de la historia del torneo. Eliminó a España en cuartos y a Italia en octavos — ambas en penaltis, ambas en circunstancias que desataron debates mundiales sobre las decisiones arbitrales.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Sea como fuere, el resultado es histórico: Corea del Sur se convirtió en la primera nación asiática en llegar a unas semifinales del Mundial. Su aventura terminó ante Alemania en semis y perdió el partido por el tercer puesto ante Turquía.
        </p>

        <h2 className="font-display text-3xl text-white mb-4">5. Alemania humilla a Brasil — 2014</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          El resultado más famoso de la era moderna. Brasil, jugando en casa, se enfrentó a Alemania en las semifinales del Mundial 2014. Neymar estaba lesionado. Thiago Silva, sancionado. El anfitrión necesitaba un milagro.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Lo que vivió fue una pesadilla. Alemania marcó cinco goles en los primeros 29 minutos. En el descanso, 5-0. El resultado final: 7-1. El estadio Mineirão se quedó en silencio. Aficionados brasileños llorando. Las imágenes de adultos sollozando en las gradas se convirtieron en algunas de las más poderosas de la historia del fútbol.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          En 2026, con{' '}
          <Link href={`${blogBase}/wk-2026-format`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">48 equipos y una ronda de 32</Link>
          , más partidos significan más oportunidades para el drama. ¿Qué equipo crea el próximo momento que pase a la historia?
        </p>

        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Escribe tu propio batacazo</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">¿Quién cae en tu Mundial 2026? Simula todos los grupos y el cuadro eliminatorio en ScorePath y comparte tu escenario con un enlace.</p>
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
        Het WK heeft een lange traditie van momenten die niemand zag aankomen. Kleine naties die reuzen versloegen, toernooidavorieten die in de groepsfase stranden, uitslagen die het geloof tarten. Dit zijn de vijf grootste stunts in de WK-geschiedenis — en een herinnering aan wat het uitgebreide format van 2026 in petto kan hebben.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">1. Noord-Korea verslaat Italië — 1966</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het WK 1966 in Engeland leverde een van de meest schokkende resultaten in de toernooigeschiedenis op. Noord-Korea, bij hun allereerste WK-deelname, trof Italië in de groepsfase. Italië was tweevoudig wereldkampioen en grote favoriet. Noord-Korea was vrijwel onbekend.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Pak Doo-ik scoorde het enige doelpunt in de 42e minuut, en Noord-Korea hield stand voor een 1-0 overwinning die de voetbalwereld op zijn kop zette. Het was de eerste keer dat een Aziatisch land een Europese of Zuid-Amerikaanse tegenstander versloeg op een WK. Italië werd uitgeschakeld in de groepsfase. Noord-Korea bereikte de kwartfinale.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        De taferelen in het Ayresome Park in Middlesbrough werden legendarisch. Pak Doo-ik werd een nationale held. En Italië had naar verluidt politiebescherming nodig bij hun terugkomst thuis.
      </p>

      <div className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm font-semibold">Noord-Korea</span>
          <span className="font-display text-3xl text-orange-500">1 – 0</span>
          <span className="text-slate-400 text-sm font-semibold">Italië</span>
        </div>
        <p className="text-slate-600 text-[11px] text-center">Groepsfase · WK 1966 · Middlesbrough</p>
      </div>

      <h2 className="font-display text-3xl text-white mb-4">2. Senegal verslaat Frankrijk — 2002</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Frankrijk begon het WK 2002 in Japan en Zuid-Korea als regerend wereldkampioen en grote favoriet om de titel te prolongeren. Ze hadden Zidane, Trezeguet, Henry, Vieira — wellicht de sterkste selectie ter wereld. Hun openingswedstrijd was tegen Senegal, dat debuteerde op het WK.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Senegal won met 1-0 dankzij een doelpunt van Papa Bouba Diop, en Frankrijk werd het toernooi uitgestuurd zonder één goal te scoren. Zidane speelde door een blessure nooit mee. De regerend kampioen werd uitgeschakeld in de groepsfase — een van de meest verbluffende instortingen in de toernooigeschiedenis.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Senegal bereikte in 2002 de kwartfinale. Twintig jaar later, in Qatar 2022, deed Marokko dat nog beter door de halve finale te halen. Het Afrikaanse voetbal heeft zich nooit meer omgekeken.
      </p>

      <div className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm font-semibold">Senegal</span>
          <span className="font-display text-3xl text-orange-500">1 – 0</span>
          <span className="text-slate-400 text-sm font-semibold">Frankrijk</span>
        </div>
        <p className="text-slate-600 text-[11px] text-center">Groepsfase · WK 2002 · Seoul</p>
      </div>

      <h2 className="font-display text-3xl text-white mb-4">3. Kameroen verslaat Argentinië — 1990</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het WK 1990 opende met een sensatie. Regerend kampioen Argentinië, aangevoerd door Diego Maradona, trof Kameroen in de openingswedstrijd van het toernooi. Argentinië was duidelijk favoriet. Kameroen kreeg twee spelers van het veld gestuurd tijdens de wedstrijd.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Omam-Biyik kopte het enige doelpunt binnen, en Kameroen — met negen man — hield stand voor een historische 1-0 overwinning. Het was een kantelpunt voor het Afrikaanse voetbal en een van de meest dramatische openingswedstrijden in WK-geschiedenis.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Kameroen bereikte de kwartfinale, waar ze nipt verloren van Engeland. Roger Milla, op 38-jarige leeftijd, werd de onwaarschijnlijke ster van het toernooi. Het beeld van Milla die danst bij de cornervlag werd een van de meest iconische beelden in het voetbal.
      </p>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Negen man. Regerend kampioen. Eén goal. De stunt van Kameroen in 1990 veranderde hoe de wereld naar het Afrikaanse voetbal keek.
        </p>
      </blockquote>

      <h2 className="font-display text-3xl text-white mb-4">4. Zuid-Korea bereikt de halve finale — 2002</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Als co-gastland van het WK 2002 samen met Japan realiseerde Zuid-Korea de meest volgehouden stuntreeks in de toernooigeschiedenis. Ze versloegen Spanje in de kwartfinale en Italië in de ronde van 16 — beide op penalty&apos;s, beide onder omstandigheden die wereldwijd discussie opwekten over scheidsrechtersbeslissingen.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Wat de controverse ook zij: het resultaat staat in de boeken. Zuid-Korea werd het eerste Aziatische land dat een WK-halve finale bereikte. Het hele land was in de greep van voetbalkoorts. Hun reeks eindigde in de halve finale tegen Duitsland, en ze verloren de wedstrijd om de derde plaats van Turkije.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Twee decennia later blijft de vraag: was dit de grootste prestatie van een underdog in de WK-geschiedenis, of de meest gefaciliteerde? Waarschijnlijk een beetje van beide.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer de stunts zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Welke reus valt in jouw scenario?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Met 48 teams en een ronde van 32 heeft het WK 2026 meer ruimte voor verrassingen dan ooit. Vul alle 104 wedstrijden in op ScorePath en zie wat er ontvouwt.
        </p>
        <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
          Open de simulator
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      <h2 className="font-display text-3xl text-white mb-4">5. Duitsland vernedert Brazilië — 2014</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het beroemdste resultaat van de moderne tijd. Brazilië, thuis spelend, trof Duitsland in de halve finale van het WK 2014. Neymar was geblesseerd. Thiago Silva was geschorst. Het gastland had een wonder nodig.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Wat ze kregen was een nachtmerrie. Duitsland scoorde vijf goals in de eerste 29 minuten. Bij rust stond het 5-0. De eindstand: 7-1. Het Mineirão-stadion viel stil. Braziliaanse fans in tranen. De beelden van huilende mensen op de tribunes werden sommige van de krachtigste in de voetbalgeschiedenis.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het was geen underdog die een favoriet versloeg — het was een topland dat een ander topland volledig van de mat speelde op een manier die nooit eerder was gezien in dit stadium van een WK. De &apos;Mineirazo&apos; is sindsdien vast onderdeel van het voetbalvocabulaire.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        In 2026, met{' '}
        <Link href={`${blogBase}/wk-2026-format`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">48 teams en een ronde van 32</Link>
        , betekenen meer wedstrijden meer kansen op drama. Welk team schrijft het volgende moment dat de geschiedenisboeken ingaat?
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Schrijf je eigen stunt
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Wie valt er in jouw WK 2026? Simuleer alle groepen en het volledige knock-outbracket op ScorePath en deel je scenario via één link.
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
