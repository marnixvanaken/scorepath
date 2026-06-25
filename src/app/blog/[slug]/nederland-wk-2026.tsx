import Link from 'next/link';

export function NederlandWk2026Content({ lang = 'nl' }: { lang?: string }) {
  const sim = `/${lang}/wk-2026`;
  const blogBase = `/${lang}/blog`;

  if (lang === 'en') {
    return (
      <article className="prose-blog">
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          The Netherlands missed the 2018 World Cup entirely — a low point in Dutch football history. In Qatar 2022 they returned and reached the quarter-finals, only to lose to Argentina on penalties in a thrilling match. Now, with a new generation maturing around Virgil van Dijk and Xavi Simons, the expectations for 2026 are high. But how realistic is the Dutch World Cup dream?
        </p>

        <div className="my-8 grid grid-cols-3 gap-3">
          {([
            { num: '3', label: 'Finals', sub: '1974, 1978, 2010' },
            { num: '0', label: 'World titles', sub: 'the dream lives on' },
            { num: '48', label: 'Teams', sub: 'more room in 2026' },
          ] as const).map(({ num, label, sub }) => (
            <div key={label} className="bg-[#0d0d0d] border border-themed rounded-xl p-4 text-center">
              <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
              <p className="text-white font-semibold text-xs">{label}</p>
              <p className="text-slate-600 text-[10px] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-3xl text-white mb-4">A squad in transition</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Ronald Koeman is building a team that bridges the gap between the golden generation of Robben and Sneijder, and the next wave of Dutch talent. Virgil van Dijk remains the cornerstone. At 35 during the tournament he is at an advanced age, but his leadership and reading of the game remain world-class.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          The new stars are emerging. Xavi Simons has developed rapidly in the Bundesliga and has the age (23) to make this World Cup his breakthrough moment on the global stage. Tijjani Reijnders has shown at AC Milan that he can handle the demands of Champions League football week in, week out. And Cody Gakpo, despite a difficult start at Liverpool, has the finishing ability to be decisive in big moments.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          The Dutch squad for 2026 is not the finished product yet — but it is genuinely talented. And with the expanded format, they have more room to find their rhythm.
        </p>

        <h2 className="font-display text-3xl text-white mb-4">The 2022 quarter-final as a springboard</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          In Qatar, the Netherlands lost to Argentina in the quarter-finals after one of the most dramatic matches of the tournament. It ended 2-2 after ninety minutes, went through extra time and was eventually decided on penalties. Wout Weghorst&apos;s late equaliser in that game became one of the moments of the tournament.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          That elimination was bitter, but it proved something important: Oranje has the quality to compete with the absolute best on the biggest stage. Argentina went on to win the title. The Netherlands came within a penalty shootout of the semi-finals.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          For 2026, the question is whether that level can be maintained and improved — and whether the young players can step up when it matters most.
        </p>

        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            The Netherlands came within a penalty shootout of the semi-finals in 2022. In 2026, with more experience and a broader squad, they can go further.
          </p>
        </blockquote>

        <h2 className="font-display text-3xl text-white mb-4">Strengths and weaknesses</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          The Netherlands at their best play an aggressive, high-pressing game that suffocates opponents. Van Dijk organises the defence, Simons and Reijnders control the midfield, and the attacking unit — when at full power — has pace and creativity.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          The Achilles heel is consistency. Dutch football has a well-documented tendency toward internal disagreement. The team can be brilliant one game and disorganised the next. Koeman has worked to bring more tactical discipline and stability — but it remains the area to watch.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Goalscoring production is also a question. Without a dominant striker who consistently delivers at the highest level, the Netherlands relies on collective output. When it clicks, it works. When it doesn&apos;t, they can struggle to break down defensive opponents.
        </p>

        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simulate it yourself</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">How far do you think the Netherlands go?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Fill in all group results and play out the knockout bracket. Does your Netherlands reach the final — or crash out early?</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Open the simulator
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <h2 className="font-display text-3xl text-white mb-4">The expanded format: more room</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          The{' '}
          <Link href={`${blogBase}/wk-2026-format`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">new 48-team format</Link>
          {' '}means the group stage is slightly more accessible. With 12 groups and a round of 32, even third-placed teams can advance. For the Netherlands, who should comfortably reach the top two in most conceivable groups, this means a guaranteed place in the knockout stage is realistic.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Once in the knockout stage, Dutch football history shows that anything is possible. In 1974 and 1978 they reached the final. In 2010 they did it again. The squad of 2026 is not that generation — but the potential is there.
        </p>

        <h2 className="font-display text-3xl text-white mb-4">Expectation: quarter-final or further</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Looking at the qualities on paper, the Netherlands should reach the quarter-finals. Beyond that, it depends on the draw, Van Dijk&apos;s fitness, and whether Simons can deliver in the biggest games.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          The dream of a first Dutch World Cup title remains alive. And with an expanded format offering more chances than ever, the summer of 2026 in North America could be the moment Oranje finally goes all the way.
        </p>

        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Write the Dutch fairy tale</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">Does the Netherlands reach the final in your scenario? Simulate all groups and the full bracket on ScorePath and share your prediction with one link.</p>
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
          Países Bajos no estuvo en el Mundial de 2018 — uno de los puntos más bajos de la historia del fútbol neerlandés. En Qatar 2022 regresaron y llegaron a cuartos, cayendo ante Argentina en los penaltis en un partido apasionante. Ahora, con una nueva generación madurando en torno a Van Dijk y Simons, las expectativas para 2026 son altas. ¿Pero cuán realista es el sueño mundialista de la Naranja?
        </p>

        <div className="my-8 grid grid-cols-3 gap-3">
          {([
            { num: '3', label: 'Finales', sub: '1974, 1978, 2010' },
            { num: '0', label: 'Títulos', sub: 'el sueño sigue vivo' },
            { num: '48', label: 'Equipos', sub: 'más margen en 2026' },
          ] as const).map(({ num, label, sub }) => (
            <div key={label} className="bg-[#0d0d0d] border border-themed rounded-xl p-4 text-center">
              <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
              <p className="text-white font-semibold text-xs">{label}</p>
              <p className="text-slate-600 text-[10px] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-3xl text-white mb-4">Un equipo en transición</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Ronald Koeman está construyendo un equipo que tiende el puente entre la generación dorada de Robben y Sneijder, y la nueva hornada de talento neerlandés. Virgil van Dijk sigue siendo la piedra angular. Con 35 años durante el torneo está en edad avanzada, pero su liderazgo y lectura del juego siguen siendo de nivel mundial.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Las nuevas estrellas emergen. Xavi Simons ha crecido rápidamente en la Bundesliga y tiene la edad (23 años) para hacer de este Mundial su gran momento de eclosión. Tijjani Reijnders ha demostrado en el AC Milan que puede con las exigencias de la Champions League semana tras semana. Y Cody Gakpo tiene la capacidad goleadora para ser decisivo en los momentos importantes.
        </p>

        <h2 className="font-display text-3xl text-white mb-4">El cuarto de final de 2022 como trampolín</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          En Catar, Países Bajos cayó ante Argentina en cuartos en uno de los partidos más dramáticos del torneo. Acabó 2-2 tras noventa minutos, fue a prórroga y se resolvió en penaltis. El gol tardío de Wout Weghorst fue uno de los momentos del torneo.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Esa eliminación fue amarga, pero demostró algo importante: la Naranja tiene nivel para competir con los mejores. Argentina se llevó el título. Países Bajos quedó a una tanda de penaltis de las semifinales.
        </p>

        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            Países Bajos quedó a una tanda de penaltis de las semifinales en 2022. En 2026, con más experiencia, pueden ir más lejos.
          </p>
        </blockquote>

        <h2 className="font-display text-3xl text-white mb-4">El formato ampliado: más margen</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          El{' '}
          <Link href={`${blogBase}/wk-2026-format`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">nuevo formato de 48 equipos</Link>
          {' '}significa que la fase de grupos es algo más accesible. Con 12 grupos y una ronda de 32, incluso los terceros pueden avanzar. Para Países Bajos, que debería acabar cómodamente en los dos primeros puestos en la mayoría de grupos, esto hace que asegurar un puesto en la fase eliminatoria sea realista.
        </p>

        <h2 className="font-display text-3xl text-white mb-4">Expectativa: cuartos o más lejos</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Mirando las calidades sobre el papel, Países Bajos debería llegar a cuartos. Más allá depende del sorteo, la forma física de Van Dijk y si Simons puede rendir en los partidos más importantes.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          El sueño del primer título mundialista neerlandés sigue vivo. Y con un formato ampliado que ofrece más oportunidades que nunca, el verano de 2026 en Norteamérica podría ser el momento en que la Naranja llegue hasta el final.
        </p>

        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Escribe el cuento de hadas neerlandés</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">¿Llega Países Bajos a la final en tu escenario? Simula todos los grupos y el cuadro completo en ScorePath y comparte tu predicción con un enlace.</p>
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
        Nederland miste het WK van 2018 volledig — een dieptepunt in de Nederlandse voetbalgeschiedenis. In Qatar 2022 keerden ze terug en bereikten de kwartfinale, maar verloren na een adembenemend duel op penalty&apos;s van Argentinië. Nu, met een nieuwe generatie die zich vormt rondom Van Dijk en Simons, zijn de verwachtingen voor 2026 hooggespannen. Maar hoe realistisch is de WK-droom van Oranje?
      </p>

      <div className="my-8 grid grid-cols-3 gap-3">
        {([
          { num: '3', label: 'Finales', sub: '1974, 1978, 2010' },
          { num: '0', label: 'Wereldtitels', sub: 'de droom leeft' },
          { num: '48', label: 'Teams', sub: 'meer speelruimte in 2026' },
        ] as const).map(({ num, label, sub }) => (
          <div key={label} className="bg-[#0d0d0d] border border-themed rounded-xl p-4 text-center">
            <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
            <p className="text-white font-semibold text-xs">{label}</p>
            <p className="text-slate-600 text-[10px] mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-3xl text-white mb-4">Een squad in wording</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Ronald Koeman bouwt aan een ploeg die de kloof overbrugt tussen de gouden generatie van Robben en Sneijder, en de nieuwe lichting Nederlands talent. Virgil van Dijk blijft de rots in de branding. Met 35 jaar tijdens het toernooi is hij op leeftijd, maar zijn leiderschap en spellezing blijven van wereldniveau.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        De nieuwe sterren zijn er. Xavi Simons heeft zich snel ontwikkeld in de Bundesliga en heeft de leeftijd (23) om dit WK zijn doorbraak op het wereldtoneel te maken. Tijjani Reijnders heeft bij AC Milan aangetoond dat hij de eisen van Champions League-voetbal week in week uit aankan. En Cody Gakpo, ondanks een moeizame start bij Liverpool, heeft het afmakingsvermogen om beslissend te zijn op grote momenten.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Het Nederlandse WK-elftal van 2026 is nog geen afgemaakt product — maar het heeft echt talent. En met het uitgebreide format is er meer ruimte om een ritme te vinden.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">De kwartfinale van 2022 als springplank</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        In Qatar verloor Nederland van Argentinië in de kwartfinale, na een van de meest dramatische wedstrijden van het toernooi. Het eindigde in 2-2 na negentig minuten, ging door naar verlengingen en werd uiteindelijk beslist op penalty&apos;s. De late gelijkmaker van Wout Weghorst in die wedstrijd werd één van de momenten van het toernooi.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Die uitschakeling was bitter, maar het bewees iets belangrijks: Oranje heeft de kwaliteit om op het grootste podium met de absolute top mee te doen. Argentinië won uiteindelijk de titel. Nederland miste de halve finale op penalty&apos;s.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Voor 2026 is de vraag of dat niveau gehandhaafd en uitgebouwd kan worden — en of de jonge spelers kunnen opstaan als het erop aankomt.
      </p>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Nederland miste de halve finale in 2022 op penalty&apos;s. In 2026, met meer ervaring en een bredere selectie, kunnen ze verder gaan.
        </p>
      </blockquote>

      <h2 className="font-display text-3xl text-white mb-4">Sterktes en zwaktes</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Nederland speelt op zijn best een agressief, hoog pressend spel dat tegenstanders verstikt. Van Dijk organiseert de defensie, Simons en Reijnders beheersen het middenveld, en de aanvalslinie heeft — op volle sterkte — snelheid en creativiteit.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        De achilleshiel is consistentie. Het Nederlandse voetbal heeft een welgedocumenteerde neiging tot interne onenigheid. Het team kan de ene wedstrijd briljant zijn en de volgende ongeorganiseerd. Koeman heeft gewerkt aan meer tactische discipline en stabiliteit — maar het blijft het aandachtspunt.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        De doelpuntenproductie is ook een vraagteken. Zonder een dominante spits die consistent presteert op het hoogste niveau, is Nederland afhankelijk van collectieve output. Als het klopt, werkt het. Als het niet klopt, kan het lastig zijn om defensieve tegenstanders te kraken.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Hoe ver denk jij dat Oranje komt?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in en speel het knock-outbracket door. Bereikt jouw Nederland de finale — of strandt het vroeg?
        </p>
        <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
          Open de simulator
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      <h2 className="font-display text-3xl text-white mb-4">Het uitgebreide format: meer speelruimte</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het{' '}
        <Link href={`${blogBase}/wk-2026-format`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">nieuwe format met 48 teams</Link>
        {' '}betekent dat de groepsfase iets toegankelijker is. Met 12 groepen en een ronde van 32 kunnen zelfs nummers drie nog doorgaan. Voor Nederland, dat in de meeste denkbare groepen comfortabel bij de eerste twee moet eindigen, is een gegarandeerde plek in de knock-outfase realistisch.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Eenmaal in de knock-outfase laat de Nederlandse voetbalgeschiedenis zien dat alles mogelijk is. In 1974 en 1978 bereikten ze de finale. In 2010 opnieuw. Het elftal van 2026 is niet die generatie — maar het potentieel is er.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Verwachting: kwartfinale of verder</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Als we naar de kwaliteiten op papier kijken, hoort Nederland de kwartfinale te halen. Of het verder gaat, hangt af van de loting, de fitheid van Van Dijk en of Simons kan leveren in de grootste wedstrijden.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        De droom van de eerste Nederlandse wereldtitel leeft. En met een uitgebreid format dat meer kansen biedt dan ooit, kan de zomer van 2026 in Noord-Amerika het moment zijn dat Oranje eindelijk helemaal doorgaat.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Schrijf het Oranje-sprookje
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Bereikt Nederland de finale in jouw scenario? Simuleer alle groepen en het volledige bracket op ScorePath en deel je voorspelling via één link.
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
