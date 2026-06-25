import Link from 'next/link';

export function VsIranContent({ lang = 'nl' }: { lang?: string }) {
  const sim = `/${lang}/wk-2026`;
  const blogBase = `/${lang}/blog`;

  if (lang === 'en') {
    return (
      <article>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          It&apos;s June 21, 1998. Lyon, Stade de Gerland. The USA and Iran take the field for a match that had nothing to do with football. Or everything. The political tension between the two countries was so high that the tournament considered ramping up security protocols. What happened next wrote history.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          In the summer of 2026, it could happen again. And this time, the USA plays at home.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Lyon, 1998: flowers and a winner</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Before kick-off, the Iranian players handed flowers to their American opponents. A gesture of peace on a stage of political hostility. The images went around the world. Journalists wrote columns. Diplomats said nothing, but everyone watched.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Iran won 2-1 through goals from Estili and Mahdavikia. The Iranians celebrated it as a national victory, far beyond football. The Americans, under coach Steve Sampson, left the tournament early. The match remained in collective memory as something greater than sport.
        </p>
        <div className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-5">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">Match data · June 21, 1998</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {([
              { label: 'Result', value: 'Iran 2–1 USA' },
              { label: 'Venue', value: 'Lyon, France' },
              { label: 'Attendance', value: '44,000' },
              { label: 'Goals', value: "Estili 40', Mahdavikia 84', McBride 87'" },
            ] as const).map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-white text-sm font-semibold leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <blockquote className="mb-4">
            <p className="text-slate-200 text-lg leading-relaxed italic">
              &ldquo;You play for your country, but you know the world is watching for more than just football. Yet the pitch is the place where you&apos;re simply human beings.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Alexi Lalas, USA international 1998 (freely quoted)
          </figcaption>
        </figure>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Nearly thirty years later, the political dynamics haven&apos;t gotten any simpler.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">World Cup 2026: the USA is host and participant</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          The 2026 World Cup is played in the USA, Canada and Mexico. The three host nations qualify automatically. That means the USA is guaranteed to play in packed American stadiums, before a home crowd experiencing a World Cup on home soil for the first time since 1994.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Iran traditionally qualifies through the Asian zone, and does so in most cycles. If they participate in 2026, the draw could place them in the same group as the USA.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          FIFA keeps the draw random in principle. But there are procedures to avoid certain politically sensitive matchups in the group stage. Whether the USA and Iran qualify for that consideration is a question FIFA prefers not to answer publicly.
        </p>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            Football ignores foreign policy. Until two countries share the same group.
          </p>
        </blockquote>
        <h2 className="font-display text-3xl text-white mb-4">What if it happens again</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          A USA-Iran match in 2026 would carry different weight than in 1998. The geopolitical context has changed, but the symbolic significance may be even greater. A sold-out American stadium, tens of thousands of fans, national flags and chants: this would be more than a football match.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          At the same time, the sporting world repeatedly shows that athletes can transcend the context. In 1998 Iranians and Americans shook hands after the match. Sport doesn&apos;t resolve conflicts, but it can show a different face. Such moments are also the engine behind the story of{' '}
          <Link href={`${blogBase}/tim-payne-viral-wk`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Tim Payne</Link>
          {' '}— a player who went from 4,000 to a million followers, precisely because the World Cup is more than just a game.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          And in footballing terms? The USA has a talented generation ready: McKennie, Pulisic, Weah, Reyna. Iran plays compact and dangerous on the counter. Tactically it would be a fascinating duel.
        </p>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simulate it yourself</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">Do the USA and Iran land in the same group?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Fill in all group results and see live which countries reach the knockout stage. Share your bracket with a single link.</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Open the simulator
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">More than a match</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Whether it&apos;s in the group stage or the knockout rounds: a USA-Iran at World Cup 2026 would immediately become the most talked-about match of the tournament. Not only because both teams play good football, but because the world watches with eyes that reach further than the scoreboard.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          In 1998 the Iranians brought flowers. In 2026? We don&apos;t know. But we know the world is watching.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Write your scenario</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">How far do the USA and Iran go? Simulate all 12 groups and see live who advances to the knockout stage. Share your bracket with a single link.</p>
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
          Es el 21 de junio de 1998. Lyon, Stade de Gerland. Estados Unidos e Irán saltan al campo para un partido que no tenía nada que ver con el fútbol. O todo. La tensión política entre los dos países era tan alta que el torneo se planteó reforzar los protocolos de seguridad. Lo que ocurrió después pasó a la historia.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          En el verano de 2026, podría repetirse. Y esta vez, Estados Unidos juega en casa.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Lyon, 1998: flores y un ganador</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Antes del saque inicial, los jugadores iraníes entregaron flores a sus rivales estadounidenses. Un gesto de paz en un escenario de hostilidad política. Las imágenes dieron la vuelta al mundo. Los periodistas escribieron columnas. Los diplomáticos no dijeron nada, pero todos miraban.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Irán ganó 2-1 con goles de Estili y Mahdavikia. Los iraníes lo celebraron como una victoria nacional, más allá del fútbol. Los estadounidenses, con el seleccionador Steve Sampson, abandonaron pronto el torneo. El partido quedó en la memoria colectiva como algo más que deporte.
        </p>
        <div className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-5">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">Datos del partido · 21 de junio de 1998</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {([
              { label: 'Resultado', value: 'Irán 2–1 EE.UU.' },
              { label: 'Sede', value: 'Lyon, Francia' },
              { label: 'Espectadores', value: '44.000' },
              { label: 'Goles', value: "Estili 40', Mahdavikia 84', McBride 87'" },
            ] as const).map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-white text-sm font-semibold leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <blockquote className="mb-4">
            <p className="text-slate-200 text-lg leading-relaxed italic">
              &ldquo;Juegas por tu país, pero sabes que el mundo te mira por algo más que el fútbol. Sin embargo, el campo es el lugar donde simplemente eres persona.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Alexi Lalas, internacional de EE.UU. 1998 (cita libre)
          </figcaption>
        </figure>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Casi treinta años después, las relaciones políticas no se han simplificado.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Mundial 2026: EE.UU. es anfitrión y participante</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          El Mundial 2026 se disputará en EE.UU., Canadá y México. Los tres países anfitriones se clasifican automáticamente. Eso significa que EE.UU. tiene garantizado jugar en estadios americanos llenos, ante un público local que por primera vez desde 1994 vive un Mundial en casa.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Irán se clasifica habitualmente por la zona asiática, y lo hace en la mayoría de los ciclos. Si participa en 2026, el sorteo podría colocarles en el mismo grupo que EE.UU.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          La FIFA mantiene el sorteo aleatorio en principio. Pero existen procedimientos para evitar ciertos enfrentamientos políticamente sensibles en la fase de grupos. Si EE.UU. e Irán cumplen los requisitos para ello es una pregunta que la FIFA prefiere no responder públicamente.
        </p>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            El fútbol no entiende de política exterior. Hasta que dos países comparten el mismo grupo.
          </p>
        </blockquote>
        <h2 className="font-display text-3xl text-white mb-4">Qué pasaría si ocurriera</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Un EE.UU.-Irán en 2026 tendría un peso diferente al de 1998. El contexto geopolítico ha cambiado, pero el significado simbólico puede ser incluso mayor. Un estadio americano a reventar, decenas de miles de aficionados, banderas nacionales y cánticos: esto sería más que un partido de fútbol.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Al mismo tiempo, el mundo del deporte demuestra una y otra vez que los atletas pueden trascender el contexto. En 1998 iraníes y americanos se estrecharon la mano tras el partido. El deporte no resuelve conflictos, pero puede mostrar otra cara. Esos momentos son también el motor detrás de la historia de{' '}
          <Link href={`${blogBase}/tim-payne-viral-wk`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Tim Payne</Link>
          {' '}— un jugador que pasó de 4.000 a un millón de seguidores, precisamente porque el Mundial es más que un partido.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          ¿Y futbolísticamente? EE.UU. tiene una generación talentosa lista: McKennie, Pulisic, Weah, Reyna. Irán juega compacto y peligroso al contragolpe. Tácticamente sería un duelo muy interesante.
        </p>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simúlalo tú mismo</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">¿Caen EE.UU. e Irán en el mismo grupo?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Rellena todos los resultados de grupos y ve en directo qué países pasan a la fase eliminatoria. Comparte tu bracket con un solo enlace.</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Abrir el simulador
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">Más que un partido</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Tanto en la fase de grupos como en la eliminatoria: un EE.UU.-Irán en el Mundial 2026 se convertiría inmediatamente en el partido más comentado del torneo. No solo porque ambos equipos juegan bien al fútbol, sino porque el mundo lo miraría con ojos que van más allá del marcador.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          En 1998 los iraníes trajeron flores. ¿En 2026? No lo sabemos. Pero sabemos que el mundo estará mirando.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Escribe tu escenario</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">¿Hasta dónde llegan EE.UU. e Irán? Simula los 12 grupos y ve en directo quién pasa a la eliminatoria. Comparte tu bracket con un solo enlace.</p>
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
        Het is 21 juni 1998. Lyon, Stade de Gerland. De VS en Iran betreden het veld voor een wedstrijd die niets met voetbal te maken had. Of alles. De politieke spanning tussen de twee landen was op dat moment zo hoog dat het toernooi overwoog veiligheidsprotocollen op te voeren. Wat er daarna gebeurde, schreef de geschiedenis.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        In de zomer van 2026 kan het opnieuw. En dit keer speelt de VS thuis.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Lyon, 1998: bloemen en een winnaar</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Vóór de aftrap overhandigden de Iraanse spelers bloemen aan hun Amerikaanse tegenstanders. Een gebaar van vrede op een podium van politieke vijandschap. De beelden gingen de wereld over. Journalisten schreven columns. Diplomaten zeiden niets, maar iedereen keek.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Iran won met 2-1 via twee doelpunten van Estili en Mahdavikia. De Iraniërs vierden het als een nationale overwinning, ver buiten het voetbal. De Amerikanen, onder bondscoach Steve Sampson, vertrokken vroeg uit het toernooi. De wedstrijd bleef in het collectieve geheugen hangen als meer dan sport.
      </p>

      <div className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-5">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">Wedstrijdgegevens · 21 juni 1998</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {([
            { label: 'Uitslag', value: 'Iran 2–1 VS' },
            { label: 'Locatie', value: 'Lyon, Frankrijk' },
            { label: 'Toeschouwers', value: '44.000' },
            { label: 'Doelpunten', value: "Estili 40', Mahdavikia 84', McBride 87'" },
          ] as const).map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">{label}</p>
              <p className="text-white text-sm font-semibold leading-snug">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
        <blockquote className="mb-4">
          <p className="text-slate-200 text-lg leading-relaxed italic">
            &ldquo;Je speelt voor je land, maar je weet dat de wereld kijkt om meer dan het voetbal. Toch is het veld de plek waar je gewoon mensen bent.&rdquo;
          </p>
        </blockquote>
        <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
          Alexi Lalas, VS-international 1998 (vrij geciteerd)
        </figcaption>
      </figure>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Bijna dertig jaar later zijn de politieke verhoudingen niet simpeler geworden.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">WK 2026: de VS is gastland én deelnemer</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het WK 2026 wordt gespeeld in de VS, Canada en Mexico. De drie gastlanden plaatsen zich automatisch voor het toernooi. Dat betekent dat de VS gegarandeerd speelt in volle Amerikaanse stadions, voor een thuispubliek dat na 1994 eindelijk weer een WK in eigen land beleeft.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Iran kwalificeert zich traditioneel via de Aziatische zone, en doet dat in de meeste cycli ook. Als ze in 2026 opnieuw deelnemen, bestaat de kans dat de loting hen en de VS in dezelfde groep plaatst.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        FIFA laat de loting in principe willekeurig verlopen. Maar er zijn procedures om bepaalde politiek gevoelige confrontaties in de groepsfase te vermijden. Of de VS en Iran daarvoor in aanmerking komen, is een vraag die FIFA liever niet publiekelijk beantwoordt.
      </p>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Voetbal trekt zich niets aan van buitenlandse politiek. Totdat de twee landen dezelfde groep delen.
        </p>
      </blockquote>

      <h2 className="font-display text-3xl text-white mb-4">Wat als het toch gebeurt</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Een VS-Iran in 2026 zou een andere lading hebben dan in 1998. De geopolitieke context is veranderd, maar het symbolische gewicht is misschien groter. Een volledig gevuld Amerikaanse stadion, tienduizenden fans, nationale vlaggen en spreekkoren: dit zou meer dan een voetbalwedstrijd zijn.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Tegelijkertijd laat de sportwereld keer op keer zien dat atleten de context kunnen overstijgen. In 1998 gaven Iraniërs en Amerikanen elkaar na de wedstrijd een hand. Sport lost conflicten niet op, maar het kan wel een ander gezicht tonen. Zulke momenten zijn ook de motor achter het verhaal van{' '}
        <Link href={`${blogBase}/tim-payne-viral-wk`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Tim Payne</Link>
        {' '}— een speler die van 4.000 naar een miljoen volgers ging, precies omdat het WK meer is dan een wedstrijd.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        En voetballend gezien? De VS heeft een talentvolle generatie klaar staan: McKennie, Pulisic, Weah, Reyna. Iran speelt compact en gevaarlijk op de counter. Tactisch zou het een interessante duelmatch zijn.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Beland de VS en Iran in dezelfde groep?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in en zie live welke landen de knock-outfase halen. Deel je bracket via één link.
        </p>
        <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
          Open de simulator
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      <h2 className="font-display text-3xl text-white mb-4">Meer dan een wedstrijd</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Of het nu in de groepsfase of de knock-outfase is: een VS-Iran op WK 2026 zou onmiddellijk de meest besproken wedstrijd van het toernooi zijn. Niet alleen omdat beide ploegen goed voetbal spelen, maar omdat de wereld ernaar kijkt met ogen die verder reiken dan het scorebord.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        In 1998 gaven Iraniërs bloemen. In 2026? We weten het niet. Maar we weten dat de wereld kijkt.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Schrijf jouw scenario
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Hoe ver komen de VS en Iran? Simuleer alle 12 groepen en zie live wie doorgaat naar de knock-outfase. Deel je bracket via één link.
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
