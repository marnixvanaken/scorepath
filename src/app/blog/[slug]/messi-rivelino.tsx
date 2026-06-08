import Link from 'next/link';

export function MessiRivelinoContent({ lang = 'nl' }: { lang?: string }) {
  const sim = `/${lang}/wk-2026`;
  const blogBase = `/${lang}/blog`;

  if (lang === 'en') {
    return (
      <article>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          There are goals, and then there are free kicks. A free kick is more than a technical moment: it&apos;s a still image in a match that otherwise never stands still. The crowd holds its breath. The wall forms. The goalkeeper prepares. And then one player decides everything with his foot.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Rivelino was the first great master of that discipline at a World Cup. Messi is the one who can take over his legacy.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Rivelino: the explosion from the left</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Roberto Rivelino played for Brazil at the 1970 and 1974 World Cups. He wasn&apos;t the fastest or the biggest. But his left foot was a weapon his generation of goalkeepers had never encountered. The power with which he struck the ball, combined with unexpected rotation, made his free kicks almost unstoppable.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          In 1970 he won the world title with Brazil in the legendary squad featuring Pelé, Jairzinho and Tostão. His free kicks were a fixed feature of the attacking arsenal. In 1974 Brazil were less strong, but Rivelino remained dangerous from set-pieces.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          His World Cup record for direct free-kick goals stood for decades as the reference point for whoever was best at dead-ball situations on the biggest stage.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Messi and the free kick as art form</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Messi had long let his World Cup free kicks go. In his early years as a World Cup player he missed set-pieces that the team relied on. The free kick wasn&apos;t his weapon of choice, not the moment his team sought him out.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          That changed. Over the years Messi&apos;s free kick became more precise, more controlled and more dangerous. At Qatar 2022 he scored multiple times from a standing position. His technique — a low, curved ball towards the far corner — fitted perfectly with his style: deceptively calm, then undefendable.
        </p>
        <div className="my-8 grid grid-cols-3 gap-3">
          {([
            { num: '60+', label: 'free kick goals', sub: "Messi's career at clubs" },
            { num: '1970', label: 'and 1974', sub: "Rivelino's World Cup finals" },
            { num: '2022', label: 'Qatar final', sub: 'Messi scored a free kick' },
          ] as const).map(({ num, label, sub }) => (
            <div key={label} className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-4 text-center">
              <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
              <p className="text-white font-semibold text-xs">{label}</p>
              <p className="text-slate-600 text-[10px] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
        <figure className="my-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6">
          <blockquote className="mb-4">
            <p className="text-slate-200 text-lg leading-relaxed italic">
              &ldquo;A free kick is a moment of silence in a match full of noise. Whoever controls that moment controls the game.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Roberto Rivelino, Brazilian legend and 1970 World Cup champion
          </figcaption>
        </figure>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          At his fifth World Cup in 2022 it started to come together. At his sixth in 2026, he has the chance to definitively claim the statistics. And that sixth World Cup is historic in its own right: read why in{' '}
          <Link href={`${blogBase}/drie-legendes-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi, Ronaldo and Ochoa: three legends at once</Link>.
        </p>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            Rivelino struck with power. Messi curves with precision. Two styles, one destination: the history books.
          </p>
        </blockquote>
        <h2 className="font-display text-3xl text-white mb-4">The opportunity in 2026</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Messi plays his sixth World Cup. If Argentina goes deep, he plays a minimum of six and possibly seven matches. In each match free kicks are waiting, depending on how opponents defend against him.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Opponents who know Messi prefer not to give him a free kick in dangerous positions. But his reputation forces defenders into mistakes. Every foul on him outside the penalty area is a potential chance.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          If he scores from a free kick at World Cup 2026, at his sixth tournament, after a career that has already produced dozens of direct free-kick goals in club football: that&apos;s not just a goal. That&apos;s a moment that, fifty years after Rivelino, draws a line between two generations.
        </p>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simulate it yourself</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">How far do Messi and Argentina shoot in 2026?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Fill in all group results and see live who reaches the knockout stage. Every round Messi plays is another chance from a dead ball.</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Open the simulator
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">The legacy of the free kick</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Rivelino&apos;s name isn&apos;t always the first mentioned when discussing the great Brazilians. Pelé, Ronaldo, Ronaldinho, Neymar: they dominate conversations. But among goalkeepers from the seventies, Rivelino&apos;s name is a warning.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Messi has become that warning. And in 2026 he can provide proof that his free kick at the highest level, at the most crucial moment, is the best the World Cup has ever seen.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-[#1a1a1a] p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Write Argentina&apos;s route</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">Simulate all 12 groups and the full bracket on ScorePath. Fill in results, see live standings and share your prediction with a single link.</p>
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
          Hay goles, y luego están los tiros libres. Un tiro libre es más que un momento técnico: es una imagen fija en un partido que por lo demás nunca se detiene. El público aguanta la respiración. La barrera se forma. El portero se prepara. Y entonces un jugador lo decide todo con su pie.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Rivelino fue el primer gran maestro de esa disciplina en un Mundial. Messi es quien puede hacerse con su legado.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Rivelino: la explosión desde la izquierda</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Roberto Rivelino jugó para Brasil en los Mundiales de 1970 y 1974. No era el más rápido ni el más alto. Pero su pie izquierdo era un arma que los porteros de su generación nunca habían visto. La potencia con que golpeaba el balón, combinada con una rotación inesperada, hacía sus tiros libres casi imparables.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          En 1970 ganó el título mundial con Brasil en el legendario equipo con Pelé, Jairzinho y Tostão. Sus tiros libres eran un elemento fijo del arsenal ofensivo. En 1974 Brasil fue menos fuerte, pero Rivelino seguía siendo peligroso en las jugadas a balón parado.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Su récord en Mundiales de goles directos de falta estuvo durante décadas como referente de quién era el mejor en las jugadas a balón parado en el mayor escenario.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Messi y el tiro libre como obra de arte</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Messi había dejado pasar durante mucho tiempo sus tiros libres en Mundiales. En sus primeros años como jugador de Copa del Mundo fallaba jugadas a balón parado en las que el equipo confiaba. El tiro libre no era su arma preferida, no era el momento en que el equipo le buscaba.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Eso cambió. Con los años el tiro libre de Messi se volvió más preciso, más controlado y más peligroso. En Catar 2022 marcó varias veces desde parado. Su técnica — un balón bajo y curvado hacia el palo largo — encajaba perfectamente con su estilo: aparentemente tranquilo, luego imparable.
        </p>
        <div className="my-8 grid grid-cols-3 gap-3">
          {([
            { num: '60+', label: 'goles de falta', sub: 'carrera de Messi en clubes' },
            { num: '1970', label: 'y 1974', sub: 'los Mundiales de Rivelino' },
            { num: '2022', label: 'final de Catar', sub: 'Messi marcó de falta' },
          ] as const).map(({ num, label, sub }) => (
            <div key={label} className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-4 text-center">
              <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
              <p className="text-white font-semibold text-xs">{label}</p>
              <p className="text-slate-600 text-[10px] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
        <figure className="my-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6">
          <blockquote className="mb-4">
            <p className="text-slate-200 text-lg leading-relaxed italic">
              &ldquo;Un tiro libre es un momento de silencio en un partido lleno de ruido. Quien domina ese momento domina el juego.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Roberto Rivelino, leyenda brasileña y campeón del mundo 1970
          </figcaption>
        </figure>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          En su quinto Mundial en 2022 empezó a cuajar. En su sexto en 2026 tiene la oportunidad de apropiarse definitivamente de las estadísticas. Y ese sexto Mundial es histórico por sí solo: léelo en{' '}
          <Link href={`${blogBase}/drie-legendes-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi, Ronaldo y Ochoa: tres leyendas a la vez</Link>.
        </p>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            Rivelino golpeaba con potencia. Messi curva con precisión. Dos estilos, un destino: los libros de historia.
          </p>
        </blockquote>
        <h2 className="font-display text-3xl text-white mb-4">La oportunidad en 2026</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Messi juega su sexto Mundial. Si Argentina llega lejos, juega un mínimo de seis y posiblemente siete partidos. En cada partido hay tiros libres esperando, según cómo le defiendan los rivales.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Los rivales que conocen a Messi prefieren no darle un tiro libre en posiciones peligrosas. Pero su reputación fuerza errores en los defensas. Cada falta sobre él fuera del área es una oportunidad potencial.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Si marca de falta en el Mundial 2026, en su sexto torneo, tras una carrera que ya ha acumulado decenas de goles directos de falta en el fútbol de clubes: eso no es solo un gol. Es un momento que, cincuenta años después de Rivelino, traza una línea entre dos generaciones.
        </p>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simúlalo tú mismo</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">¿Hasta dónde llegan Messi y Argentina en 2026?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Rellena todos los resultados de grupos y ve en directo quién pasa a la eliminatoria. Cada ronda que juega Messi es una nueva oportunidad desde parado.</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Abrir el simulador
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">El legado del tiro libre</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          El nombre de Rivelino no es siempre el primero que sale al hablar de los grandes brasileños. Pelé, Ronaldo, Ronaldinho, Neymar: ellos dominan las conversaciones. Pero entre los porteros de los años setenta, el nombre de Rivelino es una advertencia.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Messi se ha convertido en esa advertencia. Y en 2026 puede demostrar que su tiro libre al máximo nivel, en el momento más decisivo, es lo mejor que ha visto la historia del Mundial.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-[#1a1a1a] p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Escribe la ruta de Argentina</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">Simula los 12 grupos y el bracket completo en ScorePath. Rellena resultados, ve en directo las tablas y comparte tu predicción con un solo enlace.</p>
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
        Er zijn goals, en dan zijn er vrije trappen. Een vrije trap is meer dan een technisch moment: het is een stilstaand beeld in een wedstrijd die anders nooit stilstaat. Het publiek houdt de adem in. De muur staat. De keeper bereidt zich voor. En dan beslist één speler alles met zijn voet.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Rivelino was de eerste grote meester van die discipline op een WK. Messi is degene die zijn erfenis kan overnemen.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Rivelino: de explosie van links</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Roberto Rivelino speelde voor Brazilië op de WK&apos;s van 1970 en 1974. Hij was niet de snelste, niet de grootste. Maar zijn linkervoet was een wapen dat keepers van zijn generatie niet hadden gezien. De kracht waarmee hij de bal raak schoot, gecombineerd met een onverwachte rotatie, maakte zijn vrije trappen bijna onhoudbaar.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        In 1970 won hij de wereldtitel met Brazilië in de legendarische ploeg met Pelé, Jairzinho en Tostão. Zijn vrije trappen waren een vast onderdeel van het aanvallende arsenaal. In 1974 was Brazilië minder sterk, maar Rivelino bleef gevaarlijk vanuit standaardsituaties.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Zijn WK-record voor directe vrije trap doelpunten heeft decennialang standgehouden als referentie voor wie het beste was op stilstaande situaties op het grootste podium.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Messi en de vrije trap als kunstwerk</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Messi heeft zijn WK-vrije trappen lang laten liggen. In zijn beginjaren als WK-speler miste hij standaardsituaties waar anderen op rekenden. De vrije trap was niet zijn wapen van keuze, niet het moment waarop de ploeg hem opzocht.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Dat veranderde. Met de jaren werd Messi&apos;s vrije trap preciezer, gecontroleerder en gevaarlijker. In Qatar 2022 scoorde hij meerdere keren vanuit stilstand. Zijn techniek, een lage, gecurvde bal richting de verre hoek, paste perfect bij zijn stijl: schijnbaar rustig, dan onverdedigbaar.
      </p>

      <div className="my-8 grid grid-cols-3 gap-3">
        {([
          { num: '60+', label: 'vrije trap goals', sub: "Messi's carrière bij clubs" },
          { num: '1970', label: 'en 1974', sub: "Rivelino's WK-finales" },
          { num: '2022', label: 'Qatar finale', sub: 'Messi scoorde vrije trap' },
        ] as const).map(({ num, label, sub }) => (
          <div key={label} className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-4 text-center">
            <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
            <p className="text-white font-semibold text-xs">{label}</p>
            <p className="text-slate-600 text-[10px] mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      <figure className="my-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6">
        <blockquote className="mb-4">
          <p className="text-slate-200 text-lg leading-relaxed italic">
            &ldquo;Een vrije trap is een moment van stilte in een wedstrijd vol lawaai. Wie dat moment beheerst, beheerst het spel.&rdquo;
          </p>
        </blockquote>
        <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
          Roberto Rivelino, Braziliaans legende en WK-kampioen 1970
        </figcaption>
      </figure>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Op zijn vijfde WK in 2022 begon het te komen. Op zijn zesde WK in 2026 heeft hij de kans om de statistieken definitief naar zich toe te trekken. En dat zesde WK is op zichzelf al historisch: lees waarom in{' '}
        <Link href={`${blogBase}/drie-legendes-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi, Ronaldo en Ochoa: drie legendes tegelijk</Link>.
      </p>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Rivelino schoot met kracht. Messi kurvt met precisie. Twee stijlen, één bestemming: de statistieken.
        </p>
      </blockquote>

      <h2 className="font-display text-3xl text-white mb-4">De kans in 2026</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Messi speelt zijn zesde WK. Als Argentinië diep gaat in het toernooi, speelt hij minimaal zes en mogelijk zeven wedstrijden. Bij elk duel liggen er vrije trappen te wachten, afhankelijk van hoe tegenstanders hem verdedigen.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Tegenstanders die Messi kennen, geven hem liever geen vrije trap in gevaarlijke posities. Maar zijn reputatie dwingt verdedigers tot fouten. Elke overtreding op hem buiten de zestien is een potentiële kans.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        Als hij scoort op WK 2026 vanuit een vrije trap, op zijn zesde toernooi, na een loopbaan die al tientallen directe vrije trap goals heeft opgeleverd in clubverband: dan is dat niet zomaar een goal. Dan is het een moment dat vijftig jaar na Rivelino de lijn trekt tussen twee generaties.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Hoe ver schieten Messi en Argentinië in 2026?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in en zie live wie de knock-outfase haalt. Elke ronde die Messi speelt is een nieuwe kans vanuit stilstand.
        </p>
        <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
          Open de simulator
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      <h2 className="font-display text-3xl text-white mb-4">De erfenis van de vrije trap</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Rivelino&apos;s naam wordt niet altijd als eerste genoemd als het over de grote Brazilianen gaat. Pelé, Ronaldo, Ronaldinho, Neymar: zij domineren de gesprekken. Maar onder keepers uit de jaren zeventig is Rivelino&apos;s naam een waarschuwing.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Messi is inmiddels die waarschuwing geworden. En in 2026 kan hij het bewijs leveren dat zijn vrije trap op het allerhoogste niveau, op het meest cruciale moment, het beste is dat de WK-geschiedenis heeft gezien.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-[#1a1a1a] p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Schrijf Argentinië&apos;s route
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Simuleer alle 12 groepen en de volledige bracket op ScorePath. Vul uitslagen in, zie live de standen en deel je voorspelling via één link.
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
