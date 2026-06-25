import Link from 'next/link';

export function OudsteCoachContent({ lang = 'nl' }: { lang?: string }) {
  const sim = `/${lang}/wk-2026`;
  const blogBase = `/${lang}/blog`;

  if (lang === 'en') {
    return (
      <article>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          While the debate always centres on players, there is another age boundary rarely discussed: that of coaches. At what age does a man sign off on the tactical lineup of a national team at a World Cup for the last time? And who is aiming for the record of oldest coach ever in 2026?
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          The question throws up surprising names. And a few coaches who prove that football intelligence doesn&apos;t expire.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Oscar Tabárez: the benchmark</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Oscar Tabárez, former manager of Uruguay, is the yardstick. He coached his country at the 2018 World Cup in Russia aged 71, while battling a progressive neurological condition that forced him to enter the technical zone with a walker. Uruguay reached the quarter-finals.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Tabárez remained active as national coach for years afterwards, until his dismissal in 2021. His presence at the 2018 World Cup was admired worldwide: not as a curiosity, but as proof that tactical insight and leadership qualities have no expiry date.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          His age at that World Cup is the informal bar. In 2026 there are coaches who could approach or surpass it.
        </p>
        <div className="my-8 grid grid-cols-3 gap-3">
          {([
            { num: '71', label: 'years old', sub: 'Tabárez in 2018' },
            { num: '4', label: 'World Cups', sub: 'as Uruguay manager' },
            { num: '16', label: 'years', sub: 'his time as national coach' },
          ] as const).map(({ num, label, sub }) => (
            <div key={label} className="bg-[#0d0d0d] border border-themed rounded-xl p-4 text-center">
              <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
              <p className="text-white font-semibold text-xs">{label}</p>
              <p className="text-slate-600 text-[11px] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
        <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <blockquote className="mb-4">
            <p className="text-slate-200 text-lg leading-relaxed italic">
              &ldquo;Age is a number. The passion for the game and the will to keep learning determine whether you&apos;re ready — not the years.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Oscar Tabárez, Uruguay manager 2006–2021
          </figcaption>
        </figure>
        <h2 className="font-display text-3xl text-white mb-4">What older coaches do differently</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Young coaches bring energy, modern pressing and data-driven preparation. Older coaches bring something else: experience with players who panic, with boards who intervene, with journalists who try to destabilise the dressing room. They&apos;ve seen it all before. Multiple times.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          At a tournament like the World Cup, where the pressure rises exponentially with each match and every decision becomes national news, that composure is worth more than any tactical system. A coach who already knows how to deal with a dressing room after a lost semi-final has an advantage over someone experiencing it for the first time.
        </p>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            Winning a World Cup as a coach at an advanced age isn&apos;t a miracle. It&apos;s the result of decades learning how people function under pressure.
          </p>
        </blockquote>
        <h2 className="font-display text-3xl text-white mb-4">Who could challenge the record in 2026</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          The field of candidates for oldest coach at World Cup 2026 depends on who is appointed in the build-up to the tournament. National team managers change quickly, especially after failed qualifying campaigns. But some nations have a habit of appointing experienced coaches already well into their sixties.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          African and Asian federations do this regularly: a European or South American veteran as project manager for four years, with the goal of reaching the tournament and building prestige. Those coaches are sometimes already past seventy when the World Cup actually begins.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Tabárez&apos;s record is only in genuine danger if a major football nation decides to appoint an older name. And that is historically rare — but not impossible.
        </p>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simulate it yourself</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">Which countries reach the knockout stage?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Fill in all group results and see live who advances. Which manager do you give the best chance?</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Open the simulator
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">Age as a story</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          The World Cup always produces stories beyond the pitch. Not only coaches defy the boundaries of age:{' '}
          <Link href={`${blogBase}/drie-legendes-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi, Ronaldo and Ochoa are playing their sixth World Cup</Link>
          {' '}and setting an unparalleled record. The oldest coach is another story from this phenomenon. Not because of the age itself, but because of what that age represents: decades of football intelligence, condensed into ninety minutes of decision-making per match.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          If in 2026 a coach steps into the technical zone who is older than Tabárez was in 2018, that is the story of the tournament. And the statistic associated with them: not the system, not the formation, but their age on the day of the final.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Which coach wins World Cup 2026?</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">Simulate all groups and the bracket on ScorePath. Fill in results, see live standings and share your prediction.</p>
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
          Mientras el debate siempre gira en torno a los jugadores, hay otro límite de edad que raramente se discute: el de los entrenadores. ¿A qué edad firma un hombre por última vez la alineación táctica de una selección nacional en un Mundial? ¿Y quién apunta al récord del entrenador más veterano de la historia en 2026?
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          La pregunta arroja nombres sorprendentes. Y algunos entrenadores que demuestran que la inteligencia futbolística no caduca.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Óscar Tabárez: el referente</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Óscar Tabárez, exseleccionador de Uruguay, es el referente. Dirigió a su país en el Mundial 2018 de Rusia con 71 años, mientras luchaba contra una enfermedad neurológica progresiva que le obligaba a entrar en el área técnica con un andador. Uruguay llegó a cuartos de final.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Tabárez siguió activo como seleccionador durante años después, hasta su destitución en 2021. Su presencia en el Mundial 2018 fue admirada en todo el mundo: no como curiosidad, sino como prueba de que el criterio táctico y la capacidad de liderazgo no tienen fecha de caducidad.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Su edad en ese Mundial es el listón informal. En 2026 hay entrenadores que podrían acercarse o superarlo.
        </p>
        <div className="my-8 grid grid-cols-3 gap-3">
          {([
            { num: '71', label: 'años', sub: 'Tabárez en 2018' },
            { num: '4', label: 'Mundiales', sub: 'como seleccionador de Uruguay' },
            { num: '16', label: 'años', sub: 'su etapa como seleccionador' },
          ] as const).map(({ num, label, sub }) => (
            <div key={label} className="bg-[#0d0d0d] border border-themed rounded-xl p-4 text-center">
              <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
              <p className="text-white font-semibold text-xs">{label}</p>
              <p className="text-slate-600 text-[11px] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
        <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <blockquote className="mb-4">
            <p className="text-slate-200 text-lg leading-relaxed italic">
              &ldquo;La edad es un número. La pasión por el juego y la voluntad de seguir aprendiendo determinan si estás preparado, no los años.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Óscar Tabárez, seleccionador de Uruguay 2006-2021
          </figcaption>
        </figure>
        <h2 className="font-display text-3xl text-white mb-4">Lo que hacen diferente los entrenadores mayores</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Los entrenadores jóvenes aportan energía, presión moderna y preparación basada en datos. Los mayores aportan algo diferente: experiencia con jugadores que entran en pánico, con directivas que interfieren, con periodistas que intentan desestabilizar el vestuario. Ya lo han visto todo antes. Varias veces.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          En un torneo como el Mundial, donde la presión sube exponencialmente con cada partido y cada decisión se convierte en noticia nacional, esa calma vale más que cualquier sistema táctico. Un entrenador que ya sabe cómo gestionar un vestuario tras una semifinal perdida tiene ventaja sobre quien lo vive por primera vez.
        </p>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            Ganar un Mundial como entrenador a una edad avanzada no es un milagro. Es el resultado de décadas aprendiendo cómo funcionan las personas bajo presión.
          </p>
        </blockquote>
        <h2 className="font-display text-3xl text-white mb-4">Quién podría desafiar el récord en 2026</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          El campo de candidatos al entrenador más veterano del Mundial 2026 depende de quién sea nombrado en la antesala del torneo. Los seleccionadores cambian rápido, especialmente tras campañas de clasificación fallidas. Pero algunas naciones tienen la costumbre de nombrar entrenadores experimentados ya bien entrados en los sesenta.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Las federaciones africanas y asiáticas lo hacen con frecuencia: un veterano europeo o sudamericano como director de proyecto durante cuatro años, con el objetivo de clasificarse y ganar prestigio. Esos entrenadores a veces ya superan los setenta cuando el Mundial comienza.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          El récord de Tabárez solo está en peligro real si una gran potencia futbolística decide nombrar a un nombre veterano. Y eso es históricamente raro, pero no imposible.
        </p>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simúlalo tú mismo</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">¿Qué países llegan a la fase eliminatoria?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Rellena todos los resultados de grupos y ve en directo quién pasa. ¿A qué seleccionador le das más posibilidades?</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Abrir el simulador
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">La edad como historia</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          El Mundial siempre genera historias más allá del campo. No solo los entrenadores desafían los límites de la edad:{' '}
          <Link href={`${blogBase}/drie-legendes-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi, Ronaldo y Ochoa juegan su sexto Mundial</Link>
          {' '}estableciendo un récord sin parangón. El entrenador más veterano es otra historia de este fenómeno. No por la edad en sí, sino por lo que representa: décadas de inteligencia futbolística, condensadas en noventa minutos de toma de decisiones por partido.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Si en 2026 un entrenador entra en el área técnica con más edad que Tabárez en 2018, esa será la historia del torneo. Y la estadística que todos asociarán con él: no su sistema, no su formación, sino su edad el día de la final.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">¿Qué entrenador gana el Mundial 2026?</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">Simula todos los grupos y el bracket en ScorePath. Rellena resultados, ve en directo las tablas y comparte tu predicción.</p>
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
        Terwijl het debat altijd gaat over spelers, is er een andere leeftijdsgrens die zelden wordt besproken: die van de coaches. Op welke leeftijd zet een man voor het laatst zijn handtekening onder de tactische opstelling van een nationaal elftal op een Wereldkampioenschap? En wie mikt er in 2026 op het record van oudste coach ooit?
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        De vraag levert verrassende namen op. En een paar coaches die bewijzen dat voetbalintelligentie niet vervalt.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Oscar Tabárez: de standaard</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Oscar Tabárez, oud-bondscoach van Uruguay, is de maatstaf. Hij coachte zijn land op het WK van 2018 in Rusland op 71-jarige leeftijd, terwijl hij kampte met een progressieve neurologische aandoening die hem verplichtte op een rollator de technische zone te betreden. Uruguay reikte tot de kwartfinale.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Tabárez bleef daarna nog jaren actief als bondscoach, tot zijn ontslag in 2021. Zijn aanwezigheid op het WK van 2018 werd wereldwijd bewonderd: niet als curiositeit, maar als bewijs dat tactisch inzicht en leiderschapskwaliteit geen vervaldatum hebben.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Zijn leeftijd op dat WK is de informele lat. In 2026 zijn er coaches die hem kunnen benaderen of overstijgen.
      </p>

      <div className="my-8 grid grid-cols-3 gap-3">
        {([
          { num: '71', label: 'jaar', sub: 'Tabárez in 2018' },
          { num: '4', label: 'WKs', sub: 'als Uruguay-bondscoach' },
          { num: '16', label: 'jaar', sub: 'zijn bondscoach-periode' },
        ] as const).map(({ num, label, sub }) => (
          <div key={label} className="bg-[#0d0d0d] border border-themed rounded-xl p-4 text-center">
            <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
            <p className="text-white font-semibold text-xs">{label}</p>
            <p className="text-slate-600 text-[11px] mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
        <blockquote className="mb-4">
          <p className="text-slate-200 text-lg leading-relaxed italic">
            &ldquo;Leeftijd is een getal. De passie voor het spel en de wil om te leren bepalen of je klaar bent, niet het aantal jaren.&rdquo;
          </p>
        </blockquote>
        <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
          Oscar Tabárez, bondscoach Uruguay 2006–2021
        </figcaption>
      </figure>

      <h2 className="font-display text-3xl text-white mb-4">Wat oudere coaches anders doen</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Jonge coaches brengen energie, moderne persdruk en data-gedreven voorbereiding. Oudere coaches brengen iets anders: ervaring met spelers die in paniek raken, met besturen die ingrijpen, met journalisten die de kleedkamer proberen te destabiliseren. Ze hebben dit al gezien. Meerdere keren.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Op een toernooi als het WK, waar de druk per wedstrijd exponentieel stijgt en elke beslissing nationaal nieuws wordt, is die rust meer waard dan welk tactisch systeem dan ook. Een coach die al weet hoe hij omgaat met een kleedkamer na een verloren halve finale, heeft een voorsprong op iemand die het voor het eerst meemaakt.
      </p>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Een WK winnen als coach op hoge leeftijd is geen wonder. Het is het resultaat van tientallen jaren leren hoe mensen werken onder druk.
        </p>
      </blockquote>

      <h2 className="font-display text-3xl text-white mb-4">Wie in 2026 het record kan aanvechten</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het veld van kandidaten voor oudste coach op WK 2026 hangt af van wie er wordt aangesteld in de aanloop naar het toernooi. Bondscoaches wisselen snel, zeker na mislukte kwalificatiecampagnes. Maar enkele landen hebben de gewoonte om ervaren coaches aan te stellen die al ver in de zestig zijn.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Afrikaanse en Aziatische federaties doen dit regelmatig: een Europese of Zuid-Amerikaanse veteraan als projectmanager voor vier jaar, met als doel het toernooi halen en prestige opbouwen. Die coaches zijn soms al over de zeventig als het WK daadwerkelijk begint.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        Het record van Tabárez staat echter pas echt in gevaar als een grote voetbalnatie besluit een oudere naam aan te stellen. En dat is historisch gezien zeldzaam, maar niet onmogelijk.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Welke landen halen de knock-outfase?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in en zie live wie doorgaat. Welke bondscoach geef jij de meeste kans?
        </p>
        <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
          Open de simulator
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      <h2 className="font-display text-3xl text-white mb-4">Leeftijd als verhaal</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het WK levert altijd verhalen op buiten het veld. Niet alleen coaches tarten de grenzen van leeftijd: ook{' '}
        <Link href={`${blogBase}/drie-legendes-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi, Ronaldo en Ochoa spelen hun zesde WK</Link>
        {' '}en zetten daarmee een ongeëvenaard record neer. De oudste coach is er een ander verhaal uit. Niet vanwege de leeftijd zelf, maar vanwege wat die leeftijd vertegenwoordigt: decennia van voetbalintelligentie, gecondenseerd in negentig minuten besluitvorming per wedstrijd.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Als er in 2026 een coach de technische zone instapt die ouder is dan Tabárez was in 2018, is dat het verhaal van het toernooi. En de statistiek die iedereen met hem verbindt: niet zijn systeem, niet zijn formatie, maar zijn leeftijd op de dag van de finale.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Welke coach wint WK 2026?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Simuleer alle groepen en de bracket op ScorePath. Vul uitslagen in, zie live de standen en deel je voorspelling.
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
