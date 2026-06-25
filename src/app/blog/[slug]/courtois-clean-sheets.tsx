import Link from 'next/link';

export function CourtoisCleanSheetsContent({ lang = 'nl' }: { lang?: string }) {
  const sim = `/${lang}/wk-2026`;
  const blogBase = `/${lang}/blog`;

  if (lang === 'en') {
    return (
      <article>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          A clean sheet at a World Cup is the most precious thing a goalkeeper can produce. Not because of the statistic itself, but because of what it takes: ninety minutes of concentration, a defence that holds its shape, and the discipline not to make a mistake in a tournament full of attackers. Thibaut Courtois has understood this system better than anyone.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          In 2026 he wants to put it in the history books.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">The value of zero</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          In a sport that revolves around scoring, goalkeepers are the only players whose best performance is a zero. No goals conceded. No marks on the scoreboard. It sounds passive, but it requires active intervention: a save in the 88th minute, good positioning at a dangerous set-piece, a voice that keeps the defensive line at the right distance.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          At a World Cup, where every opponent has quality players and every match can become a threat of elimination, a clean sheet run is even more valuable. The goalkeepers who did this most consistently in World Cup history are all legendary names.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Courtois wants his name in that group.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Courtois at the World Cup</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Courtois played his first World Cup in 2014 as a 22-year-old. Belgium reached the quarter-finals, Courtois performed strongly and left as one of the best-preserved goalkeepers of the tournament. In 2018 he added an individual World Cup trophy: the Golden Glove as best goalkeeper, with Belgium finishing third.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          In 2022 things went differently. Belgium, by then past its best as a generation, left the tournament early. Courtois played, but had little to add to his statistics.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          World Cup 2026 is his fourth. And with a new Belgian generation taking shape, he has for the first time in years a team that can go further than one round.
        </p>
        <div className="my-8 bg-[#0d0d0d] border border-themed rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-themed">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Courtois at the World Cup</p>
          </div>
          {([
            { year: '2014', result: 'Quarter-final', award: '' },
            { year: '2018', result: '3rd place', award: 'Golden Glove' },
            { year: '2022', result: 'Group stage', award: '' },
            { year: '2026', result: '?', award: 'Record in sight' },
          ] as const).map(({ year, result, award }) => (
            <div key={year} className="flex items-center gap-4 px-5 py-3 border-b border-themed last:border-0">
              <span className="text-slate-500 text-sm font-tabular w-10">{year}</span>
              <span className="text-white text-sm font-semibold flex-1">{result}</span>
              {award && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-widest">
                  {award}
                </span>
              )}
            </div>
          ))}
        </div>
        <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <blockquote className="mb-4">
            <p className="text-slate-200 text-lg leading-relaxed italic">
              &ldquo;The Golden Glove in 2018 was nice, but I want more. Reaching a World Cup final with Belgium — that&apos;s what I train for every day.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Thibaut Courtois, goalkeeper of Belgium and Real Madrid (freely quoted)
          </figcaption>
        </figure>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            A goalkeeper is remembered not by his saves, but by the scoreboard. Courtois wants to keep that scoreboard empty.
          </p>
        </blockquote>
        <h2 className="font-display text-3xl text-white mb-4">What Belgium needs</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          To give Courtois his shot at the record, Belgium needs to go deep. The group stage must be navigated without too much trouble. Then come the knockout rounds, where every match is potentially the last.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          The new generation around players like Théo Zirkzee, Amadou Onana and Arthur Vermeeren offers more dynamism than the Hazard, Lukaku and De Bruyne team at their best. Fitter, faster, physically more versatile. But the big tournament feeling is still missing.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Courtois has experienced that feeling four times himself. In 2026 he is the rock on which the younger generation can lean. And if his goal stays clean, he writes the statistics alongside them. He&apos;s not the only one with a record in his sights:{' '}
          <Link href={`${blogBase}/mbappe-jaagt-klose`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Mbappé chases Klose</Link>
          {' '}and{' '}
          <Link href={`${blogBase}/messi-vrije-trappen-rivelino`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi chases Rivelino&apos;s record</Link>
          . World Cup 2026 will be a tournament full of historic ambitions.
        </p>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simulate it yourself</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">How far does Belgium go in your scenario?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Fill in all group results and play through the bracket. How many clean sheets do you give Courtois?</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Open the simulator
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">A zero on the board, for ever</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Goalkeepers are rarely remembered in the same way strikers are. Messi has his goals, Mbappé his final hat-trick. But every goalkeeper who won a World Cup knows that his name remains tied to the number of times he kept his goal intact on the biggest stage in the world.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Courtois has everything it takes to claim that stage. Tall, dominant in the air, excellent with his feet and experienced enough not to give it away easily. In 2026 he gets his chance.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Let Belgium go far</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">Simulate all groups and the full bracket on ScorePath. Fill in results, see live standings and share your prediction with a single link.</p>
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
          Una portería a cero en un Mundial es lo más valioso que puede producir un portero. No por la estadística en sí, sino por lo que requiere: noventa minutos de concentración, una defensa que aguanta y la disciplina de no cometer errores en un torneo lleno de atacantes. Thibaut Courtois ha entendido este sistema mejor que nadie.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          En 2026 quiere pasar a los libros de historia.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">El valor del cero</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          En un deporte que gira en torno al gol, los porteros son los únicos jugadores cuya mejor actuación es un cero. Sin goles encajados. Sin marcas en el marcador. Suena pasivo, pero requiere intervención activa: una parada en el minuto 88, una buena posición en un córner peligroso, una voz que mantiene la línea defensiva a la distancia correcta.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          En un Mundial, donde cada rival tiene jugadores de calidad y cada partido puede convertirse en una amenaza de eliminación, una racha de porterías a cero es todavía más valiosa. Los porteros que lo hicieron de forma más consistente en la historia del Mundial son todos nombres legendarios.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Courtois quiere que su nombre figure en ese grupo.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Courtois en el Mundial</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Courtois jugó su primer Mundial en 2014 con 22 años. Bélgica llegó a cuartos, Courtois actuó con solidez y se fue como uno de los porteros más destacados del torneo. En 2018 añadió un trofeo individual: el Guante de Oro al mejor portero, con Bélgica en tercer lugar.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          En 2022 las cosas fueron diferentes. Bélgica, ya en decadencia como generación, abandonó pronto el torneo. Courtois jugó, pero poco pudo añadir a sus estadísticas.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          El Mundial 2026 es su cuarto. Y con una nueva generación belga tomando forma, tiene por primera vez en años un equipo capaz de ir más allá de una ronda.
        </p>
        <div className="my-8 bg-[#0d0d0d] border border-themed rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-themed">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Courtois en el Mundial</p>
          </div>
          {([
            { year: '2014', result: 'Cuartos de final', award: '' },
            { year: '2018', result: '3er puesto', award: 'Guante de Oro' },
            { year: '2022', result: 'Fase de grupos', award: '' },
            { year: '2026', result: '?', award: 'Récord en el horizonte' },
          ] as const).map(({ year, result, award }) => (
            <div key={year} className="flex items-center gap-4 px-5 py-3 border-b border-themed last:border-0">
              <span className="text-slate-500 text-sm font-tabular w-10">{year}</span>
              <span className="text-white text-sm font-semibold flex-1">{result}</span>
              {award && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-widest">
                  {award}
                </span>
              )}
            </div>
          ))}
        </div>
        <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <blockquote className="mb-4">
            <p className="text-slate-200 text-lg leading-relaxed italic">
              &ldquo;El Guante de Oro en 2018 estuvo bien, pero quiero más. Llegar a una final del Mundial con Bélgica — para eso entreno cada día.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Thibaut Courtois, portero de Bélgica y del Real Madrid (cita libre)
          </figcaption>
        </figure>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            A un portero no se le recuerda por sus paradas, sino por el marcador. Courtois quiere ese marcador en cero.
          </p>
        </blockquote>
        <h2 className="font-display text-3xl text-white mb-4">Lo que necesita Bélgica</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Para darle a Courtois su oportunidad de récord, Bélgica tiene que llegar lejos. La fase de grupos debe superarse sin demasiados problemas. Luego llegan las rondas eliminatorias, donde cada partido puede ser el último.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          La nueva generación en torno a jugadores como Théo Zirkzee, Amadou Onana y Arthur Vermeeren ofrece más dinamismo que el equipo de Hazard, Lukaku y De Bruyne en sus mejores días. Más en forma, más rápida, físicamente más versátil. Pero el gran feeling de torneo todavía falta.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Courtois ha vivido ese feeling cuatro veces. En 2026 es la roca sobre la que la generación más joven puede apoyarse. Y si su portería sigue a cero, escribe las estadísticas junto a ellos. No es el único con un récord en el punto de mira:{' '}
          <Link href={`${blogBase}/mbappe-jaagt-klose`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Mbappé persigue a Klose</Link>
          {' '}y{' '}
          <Link href={`${blogBase}/messi-vrije-trappen-rivelino`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi persigue el récord de Rivelino</Link>
          . El Mundial 2026 será un torneo lleno de ambiciones históricas.
        </p>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simúlalo tú mismo</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">¿Hasta dónde llega Bélgica en tu escenario?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Rellena todos los resultados de grupos y juega el bracket. ¿Cuántas porterías a cero le das a Courtois?</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Abrir el simulador
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">Un cero en el marcador, para siempre</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          A los porteros raramente se les recuerda como se recuerda a los delanteros. Messi tiene sus goles, Mbappé su hat-trick en la final. Pero cada portero que ganó un Mundial sabe que su nombre quedará ligado al número de veces que mantuvo su portería intacta en el escenario más grande del mundo.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Courtois tiene todo lo necesario para reclamar ese escenario. Alto, dominante en el juego aéreo, excelente con los pies y con suficiente experiencia para no regalarlo fácilmente. En 2026 llega su oportunidad.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Que Bélgica llegue lejos</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">Simula todos los grupos y el bracket completo en ScorePath. Rellena resultados, ve en directo las tablas y comparte tu predicción con un solo enlace.</p>
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
        Een clean sheet op een Wereldkampioenschap is het kostbaarste wat een keeper kan produceren. Niet vanwege de statistiek zelf, maar vanwege wat er voor nodig is: negentig minuten concentratie, een verdediging die staat, en de discipline om in een toernooi vol aanvallers geen fout te maken. Thibaut Courtois heeft dit systeem doorgezien als geen ander.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        In 2026 wil hij het voor de geschiedenisboeken doen.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">De waarde van nul</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        In een sport die draait om scoren, zijn keepers de enige spelers wiens beste prestatie een nul is. Geen goals toegestaan. Geen sporen op het scorebord. Het klinkt passief, maar het vergt actief ingrijpen: een redding in de 88e minuut, een goede positie bij een gevaarlijke standaardsituatie, een stem die de linie op de juiste afstand houdt.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Op een WK, waar elke tegenstander kwaliteitsspelers heeft en elke wedstrijd een eliminatiedreiging kan worden, is een clean sheet-reeks nog waardevoller. De keepers die dit het meest consistent deden in de WK-geschiedenis zijn stuk voor stuk legendarische namen.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Courtois wil zijn naam bij die groep voegen.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Courtois op het WK</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Courtois speelde zijn eerste WK in 2014 als 22-jarige. België reikte tot de kwartfinale, Courtois presteerde sterk en vertrok als een van de beter bewaard gebleven keepers van het toernooi. In 2018 voegde hij een individuele WK-trofee toe: de Gouden Handschoen als beste keeper, met België op de derde plaats.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        In 2022 liep het anders. België, inmiddels op zijn retour als generatie, verliet het toernooi vroeg. Courtois speelde, maar had weinig aan zijn statistieken toe te voegen.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        WK 2026 is zijn vierde. En met een nieuwe Belgische generatie in opbouw heeft hij voor het eerst in jaren weer een elftal dat meer dan één ronde ver kan komen.
      </p>

      <div className="my-8 bg-[#0d0d0d] border border-themed rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-themed">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Courtois op het WK</p>
        </div>
        {([
          { year: '2014', result: 'Kwartfinale', award: '' },
          { year: '2018', result: '3e plaats', award: 'Gouden Handschoen' },
          { year: '2022', result: 'Groepsfase', award: '' },
          { year: '2026', result: '?', award: 'Kans op record' },
        ] as const).map(({ year, result, award }) => (
          <div key={year} className="flex items-center gap-4 px-5 py-3 border-b border-themed last:border-0">
            <span className="text-slate-500 text-sm font-tabular w-10">{year}</span>
            <span className="text-white text-sm font-semibold flex-1">{result}</span>
            {award && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-widest">
                {award}
              </span>
            )}
          </div>
        ))}
      </div>

      <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
        <blockquote className="mb-4">
          <p className="text-slate-200 text-lg leading-relaxed italic">
            &ldquo;De Gouden Handschoen in 2018 was mooi, maar ik wil méér. Een WK-finale halen met België — dat is waarvoor ik elke dag train.&rdquo;
          </p>
        </blockquote>
        <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
          Thibaut Courtois, keeper van België en Real Madrid (vrij geciteerd)
        </figcaption>
      </figure>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Een keeper wordt niet herinnerd aan zijn reddingen, maar aan het scorebord. Courtois wil dat scorebord leeg houden.
        </p>
      </blockquote>

      <h2 className="font-display text-3xl text-white mb-4">Wat België nodig heeft</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Om Courtois zijn record-kans te geven, moet België diep gaan. De groepsfase moet zonder al te veel problemen worden doorstaan. Daarna volgen de knock-outronden, waar elke wedstrijd potentieel de laatste is.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        De nieuwe generatie rond spelers als Théo Zirkzee, Amadou Onana en Arthur Vermeeren biedt meer dynamiek dan de ploeg van Hazard, Lukaku en De Bruyne op hun beste dagen deed. Fitter, sneller, fysiek veelzijdiger. Maar het grote toernooigevoel ontbreekt nog.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        Courtois heeft dat gevoel vier keer aan den lijve ondervonden. In 2026 is hij de rots waarop de jongere generatie kan steunen. En als zijn doel schoon blijft, schrijft hij de statistieken mee. Hij is niet de enige met een record in het vizier:{' '}
        <Link href={`${blogBase}/mbappe-jaagt-klose`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Mbappé jaagt op Klose</Link>
        {' '}en{' '}
        <Link href={`${blogBase}/messi-vrije-trappen-rivelino`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi op het record van Rivelino</Link>
        . WK 2026 wordt een toernooi vol historische ambities.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Hoe ver komt België in jouw scenario?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in en speel de bracket door. Hoeveel clean sheets geef jij Courtois?
        </p>
        <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
          Open de simulator
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      <h2 className="font-display text-3xl text-white mb-4">Een nul op het bord, voor eeuwig</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Keepers worden zelden herinnerd op de manier die spitsen worden herinnerd. Messi heeft zijn goals, Mbappé zijn finalehat-trick. Maar elke keeper die een WK won, weet dat zijn naam verbonden blijft aan het aantal keren dat hij zijn doel ongeschonden hield op het grootste podium ter wereld.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Courtois heeft alles in huis om dat podium te claimen. Groot, dominant in de lucht, uitstekend met zijn voeten en ervaren genoeg om het niet zomaar weg te geven. In 2026 krijgt hij zijn kans.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Laat België ver komen
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Simuleer alle groepen en de volledige bracket op ScorePath. Vul uitslagen in, zie live de standen en deel je voorspelling via één link.
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
