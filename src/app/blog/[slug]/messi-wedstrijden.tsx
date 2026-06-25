import Link from 'next/link';

export function MessiWedstrijdenContent({ lang = 'nl' }: { lang?: string }) {
  const sim = `/${lang}/wk-2026`;
  const blogBase = `/${lang}/blog`;

  if (lang === 'en') {
    return (
      <article>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          After the 2022 World Cup, Lionel Messi passed a record that had seemed untouchable for decades: the most World Cup matches ever played by a single player. The total set by Lothar Matthäus, built across five World Cups from 1982 to 1998, had long stood as a silent boundary in the statistics.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Messi broke it in Qatar. And in 2026, every minute he plays writes new history.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Matthäus and the five tournaments</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Lothar Matthäus debuted at the 1982 World Cup in Spain as a 21-year-old midfielder. He played in 1986, won the title in 1990, competed in 1994, and finally in 1998 in France, aged 37. Across those five tournaments he built his record: 25 World Cup matches.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          It seemed like a number that could never be equalled. Five World Cups require a career spanning nearly two decades, a body that keeps recovering, and a national team that keeps qualifying. Everything has to fall into place. Year after year.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Messi left all those fortunate circumstances behind him.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">From Germany 2006 to Qatar 2022</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Messi&apos;s first World Cup was 2006 in Germany. As an 18-year-old substitute he played in the shadow of Ronaldinho and Crespo. Argentina reached the quarter-finals, but Messi had already made his mark.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          In 2010 Argentina lost shamefully to Germany (4-0 in the quarter-finals). In 2014 Messi reached the final, lost it narrowly to Germany and still won the Golden Ball. In 2018, a disappointing exit in the round of 16. And then, 2022: the final, the trophy, the crown.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Match by match, a gap opened up in the statistics. After Argentina&apos;s seventh match in Qatar, Messi had broken Matthäus&apos;s record of 25. Every subsequent match was his own record.
        </p>
        <div className="my-8 bg-[#0d0d0d] border border-themed rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-themed">
            <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Messi&apos;s World Cup matches by tournament</p>
          </div>
          {([
            { year: '2006', matches: 5, result: 'Quarter-final' },
            { year: '2010', matches: 5, result: 'Quarter-final' },
            { year: '2014', matches: 7, result: 'Final' },
            { year: '2018', matches: 4, result: 'Round of 16' },
            { year: '2022', matches: 7, result: 'Champion' },
          ] as const).map(({ year, matches, result }) => (
            <div key={year} className="flex items-center gap-4 px-5 py-3 border-b border-themed last:border-0">
              <span className="text-slate-500 text-sm w-10 font-tabular">{year}</span>
              <div className="flex gap-1">
                {Array.from({ length: matches }).map((_, i) => (
                  <span key={i} className="w-2 h-2 rounded-full bg-orange-500/60" />
                ))}
              </div>
              <span className="text-slate-400 text-xs ml-1">{matches} matches</span>
              <span className="ml-auto text-[11px] font-bold text-slate-600 uppercase tracking-widest">{result}</span>
            </div>
          ))}
          <div className="flex items-center gap-4 px-5 py-3 bg-[#0a0a0a]">
            <span className="text-white font-bold text-sm w-10">Total</span>
            <span className="font-display text-2xl text-orange-500">28</span>
            <span className="text-slate-400 text-sm">matches — more than anyone else ever</span>
          </div>
        </div>
        <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <blockquote className="mb-4">
            <p className="text-slate-200 text-lg leading-relaxed italic">
              &ldquo;Messi is the best footballer I have ever seen. If he breaks my record, there is nobody who deserves it more.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Lothar Matthäus, former record holder
          </figcaption>
        </figure>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            Messi played his first World Cup match in 2006. In 2026 he may play his thirtieth. Twenty years later.
          </p>
        </blockquote>
        <h2 className="font-display text-3xl text-white mb-4">What 2026 adds</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          In 2026 Messi is 38 years old. Every match he plays is one no other footballer has ever played. The statistics grow, but it stopped being about the statistics long ago.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          It&apos;s about the presence. About the fact that he&apos;s still there. About a generation of football fans who watched him play when they were ten years old and can still see him on the highest stage.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Matthäus&apos;s record was untouchable for twenty years. It now stands in the name of someone who isn&apos;t done yet.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          And Messi doesn&apos;t stand alone: Ronaldo and Ochoa are also playing their{' '}
          <Link href={`${blogBase}/drie-legendes-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">sixth World Cup simultaneously</Link>
          {' '}— a historic moment we will never see again.
        </p>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simulate it yourself</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">How many matches does Messi play in your bracket?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Fill in all group results and see how far Argentina goes. Every round Messi plays is new history.</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Open the simulator
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">A number that grows as we watch</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Matthäus built his record in an era without social media, without live statistics and without the daily question: is this his last World Cup? Messi plays every match with that context on his shoulders.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          And he plays anyway. That is perhaps the most impressive thing of all.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">How far does Argentina go?</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">Simulate every scenario on ScorePath. Fill in results, see live standings and share your bracket with a single link.</p>
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
          Tras el Mundial 2022, Lionel Messi superó un récord que parecía intocable durante décadas: el de más partidos disputados en Mundiales por un solo jugador. El registro de Lothar Matthäus, acumulado en cinco Mundiales de 1982 a 1998, llevaba años como un límite silencioso en las estadísticas.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Messi lo rompió en Catar. Y en 2026, cada minuto que juega escribe nueva historia.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Matthäus y los cinco torneos</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Lothar Matthäus debutó en el Mundial 1982 de España como centrocampista de 21 años. Jugó en 1986, fue campeón del mundo en 1990, compitió en 1994 y finalmente en 1998 en Francia, con 37 años. En esos cinco torneos construyó su récord: 25 partidos en Mundiales.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Parecía un número que nunca podría igualarse. Cinco Mundiales exigen una carrera que abarca casi dos décadas, un cuerpo que se recupera una y otra vez y una selección que sigue clasificándose. Todo tiene que salir bien. Año tras año.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Messi dejó atrás toda esa suerte acumulada.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">De Alemania 2006 a Catar 2022</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          El primer Mundial de Messi fue 2006 en Alemania. Como suplente de 18 años jugó a la sombra de Ronaldinho y Crespo. Argentina llegó a cuartos, pero Messi ya había dejado su huella.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          En 2010 Argentina perdió de forma bochornosa ante Alemania (4-0 en cuartos). En 2014 Messi llegó a la final, la perdió por poco ante Alemania y aun así ganó el Balón de Oro. En 2018, una decepcionante eliminación en octavos. Y luego, 2022: la final, el trofeo, la corona.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Partido a partido se fue abriendo una brecha en las estadísticas. Tras el séptimo partido de Argentina en Catar, Messi había roto el récord de Matthäus, 25. Cada partido posterior era ya su propio récord.
        </p>
        <div className="my-8 bg-[#0d0d0d] border border-themed rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-themed">
            <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Partidos de Messi en el Mundial por torneo</p>
          </div>
          {([
            { year: '2006', matches: 5, result: 'Cuartos' },
            { year: '2010', matches: 5, result: 'Cuartos' },
            { year: '2014', matches: 7, result: 'Final' },
            { year: '2018', matches: 4, result: 'Octavos' },
            { year: '2022', matches: 7, result: 'Campeón' },
          ] as const).map(({ year, matches, result }) => (
            <div key={year} className="flex items-center gap-4 px-5 py-3 border-b border-themed last:border-0">
              <span className="text-slate-500 text-sm w-10 font-tabular">{year}</span>
              <div className="flex gap-1">
                {Array.from({ length: matches }).map((_, i) => (
                  <span key={i} className="w-2 h-2 rounded-full bg-orange-500/60" />
                ))}
              </div>
              <span className="text-slate-400 text-xs ml-1">{matches} partidos</span>
              <span className="ml-auto text-[11px] font-bold text-slate-600 uppercase tracking-widest">{result}</span>
            </div>
          ))}
          <div className="flex items-center gap-4 px-5 py-3 bg-[#0a0a0a]">
            <span className="text-white font-bold text-sm w-10">Total</span>
            <span className="font-display text-2xl text-orange-500">28</span>
            <span className="text-slate-400 text-sm">partidos — más que nadie jamás</span>
          </div>
        </div>
        <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <blockquote className="mb-4">
            <p className="text-slate-200 text-lg leading-relaxed italic">
              &ldquo;Messi es el mejor futbolista que he visto jamás. Si rompe mi récord, no hay nadie que lo merezca más.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Lothar Matthäus, exrecordman
          </figcaption>
        </figure>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            Messi jugó su primer partido en un Mundial en 2006. En 2026 puede que juegue el trigésimo. Veinte años después.
          </p>
        </blockquote>
        <h2 className="font-display text-3xl text-white mb-4">Lo que aporta 2026</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          En 2026 Messi tiene 38 años. Cada partido que juega es uno que ningún otro futbolista ha jugado jamás. Las estadísticas crecen, pero hace tiempo que no se trata de estadísticas.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Se trata de la presencia. Del hecho de que sigue ahí. De una generación de aficionados que le vieron jugar con diez años y todavía le ven en el escenario más grande.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          El récord de Matthäus fue intocable durante veinte años. Ahora está en manos de alguien que aún no ha terminado.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Y Messi no está solo: Ronaldo y Ochoa también juegan su{' '}
          <Link href={`${blogBase}/drie-legendes-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">sexto Mundial a la vez</Link>
          {' '}— un momento histórico que nunca volveremos a ver.
        </p>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simúlalo tú mismo</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">¿Cuántos partidos juega Messi en tu bracket?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Rellena todos los resultados de grupos y ve hasta dónde llega Argentina. Cada ronda que juega Messi es nueva historia.</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Abrir el simulador
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">Un número que crece mientras miramos</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Matthäus construyó su récord en una época sin redes sociales, sin estadísticas en tiempo real y sin la pregunta diaria: ¿es este su último Mundial? Messi juega cada partido con ese contexto sobre los hombros.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Y juega de todas formas. Eso es quizás lo más impresionante de todo.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">¿Hasta dónde llega Argentina?</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">Simula cada escenario en ScorePath. Rellena resultados, ve en directo las tablas y comparte tu bracket con un solo enlace.</p>
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
        Na het WK 2022 passeerde Lionel Messi een record dat decennialang onaantastbaar leek: de meeste WK-wedstrijden ooit gespeeld door één speler. Het getal van Lothar Matthäus, opgebouwd over vijf WK&apos;s van 1982 tot 1998, lag jarenlang als een stille grens in de statistieken.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Messi verbrak het in Qatar. En in 2026 schrijft hij bij elke minuut opnieuw geschiedenis.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Matthäus en de vijf toernooien</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Lothar Matthäus debuteerde op het WK van 1982 in Spanje als 21-jarige middenvelder. Hij speelde in 1986, 1990 als wereldkampioen, 1994 en tenslotte in 1998 in Frankrijk, toen hij 37 jaar oud was. Over die vijf toernooien bouwde hij zijn record op: 25 WK-wedstrijden.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het leek een aantal dat nooit meer geëvenaard zou worden. Vijf WK&apos;s vereisen een carrière die bijna twee decennia overbruggt, een lichaam dat telkens herstelt en een nationale ploeg die zich telkens kwalificeert. Alles moet meevallen. Jaar na jaar.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Messi liet al dat meevalzit achter zich.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Van Duitsland 2006 tot Qatar 2022</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Messi&apos;s eerste WK was 2006 in Duitsland. Als 18-jarige invaller liep hij in de schaduw van Ronaldinho en Crespo. Argentinië reikte tot de kwartfinale, maar Messi had zijn voet al gezet.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        In 2010 verloor Argentinië roemloos van Duitsland (4-0 kwartfinale). In 2014 reikte Messi tot de finale, verloor die nipt van Duitsland en won desondanks de Gouden Bal. In 2018 een teleurstellende exit in de achtste finale. En dan, 2022: de finale, de trofee, de kroon.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Wedstrijd voor wedstrijd opende zich een gat in de statistieken. Na Argentinië&apos;s zevende duel in Qatar had Messi Matthäus&apos; record van 25 gebroken. Elke volgende wedstrijd was voortaan zijn eigen record.
      </p>

      <div className="my-8 bg-[#0d0d0d] border border-themed rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-themed">
          <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Messi&apos;s WK-wedstrijden per toernooi</p>
        </div>
        {([
          { year: '2006', matches: 5, result: 'Kwartfinale' },
          { year: '2010', matches: 5, result: 'Kwartfinale' },
          { year: '2014', matches: 7, result: 'Finale' },
          { year: '2018', matches: 4, result: 'Achtste finale' },
          { year: '2022', matches: 7, result: 'Kampioen' },
        ] as const).map(({ year, matches, result }) => (
          <div key={year} className="flex items-center gap-4 px-5 py-3 border-b border-themed last:border-0">
            <span className="text-slate-500 text-sm w-10 font-tabular">{year}</span>
            <div className="flex gap-1">
              {Array.from({ length: matches }).map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-orange-500/60" />
              ))}
            </div>
            <span className="text-slate-400 text-xs ml-1">{matches} wedstrijden</span>
            <span className="ml-auto text-[11px] font-bold text-slate-600 uppercase tracking-widest">{result}</span>
          </div>
        ))}
        <div className="flex items-center gap-4 px-5 py-3 bg-[#0a0a0a]">
          <span className="text-white font-bold text-sm w-10">Tot.</span>
          <span className="font-display text-2xl text-orange-500">28</span>
          <span className="text-slate-400 text-sm">wedstrijden — meer dan wie ook ooit</span>
        </div>
      </div>

      <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
        <blockquote className="mb-4">
          <p className="text-slate-200 text-lg leading-relaxed italic">
            &ldquo;Messi is de beste voetballer die ik ooit heb gezien. Als hij mijn record breekt, is er niemand die dat meer verdient.&rdquo;
          </p>
        </blockquote>
        <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
          Lothar Matthäus, voormalig houder van het record
        </figcaption>
      </figure>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Messi speelde zijn eerste WK-wedstrijd in 2006. In 2026 speelt hij er misschien zijn dertigste. Twintig jaar later.
        </p>
      </blockquote>

      <h2 className="font-display text-3xl text-white mb-4">Wat 2026 toevoegt</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        In 2026 is Messi 38 jaar oud. Elke wedstrijd die hij speelt, is er eentje die geen andere voetballer ooit heeft gespeeld. De statistieken groeien, maar het gaat allang niet meer om de statistieken.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het gaat om de aanwezigheid. Om het feit dat hij er nog is. Om een generatie voetbalfans die hem al op hun tiende zagen spelen en hem nu nog steeds op het hoogste toneel zien staan.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het record van Matthäus was twintig jaar lang onaantastbaar. Het staat nu op naam van iemand die nog niet klaar is.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        En Messi staat er niet alleen voor: ook Ronaldo en Ochoa spelen in 2026 hun{' '}
        <Link href={`${blogBase}/drie-legendes-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">zesde WK tegelijk</Link>
        {' '}— een historisch moment dat we nooit meer zullen meemaken.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Hoeveel wedstrijden speelt Messi in jouw bracket?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in en zie hoe ver Argentinië komt. Elke ronde die Messi speelt is nieuwe geschiedenis.
        </p>
        <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
          Open de simulator
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      <h2 className="font-display text-3xl text-white mb-4">Een getal dat groeit terwijl we kijken</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Matthäus bouwde zijn record op in een tijdperk zonder sociale media, zonder live statistieken en zonder de dagelijkse vraag: is dit zijn laatste WK? Messi speelt elke wedstrijd met die context op zijn schouders.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        En hij speelt toch. Dat is misschien wel het meest indrukwekkende van al.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Hoever komt Argentinië?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Simuleer elk scenario op ScorePath. Vul uitslagen in, zie live de standen en deel je bracket via één link.
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
