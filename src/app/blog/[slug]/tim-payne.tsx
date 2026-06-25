import Link from 'next/link';

export function TimPayneContent({ lang = 'nl' }: { lang?: string }) {
  const sim = `/${lang}/wk-2026`;
  const blogBase = `/${lang}/blog`;

  if (lang === 'en') {
    return (
      <article>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          At the start of June 2026, Tim Payne had 4,000 followers on Instagram. A month later the counter stood at more than a million. Not because he scored a goal of the century or a press conference went viral. But because the World Cup does what no marketing agency can: it turns anonymous athletes into global icons in 90 minutes.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          The Payne curve isn&apos;t unique. The World Cup produces it every four years. But this time it was him.
        </p>
        <div className="my-8 grid grid-cols-3 gap-3">
          {([
            { num: '4K', label: 'followers', sub: 'before the tournament' },
            { num: '1M+', label: 'followers', sub: 'six weeks later' },
            { num: '250×', label: 'growth', sub: 'in one tournament' },
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
              &ldquo;I had no idea that people outside my city knew my name. The World Cup changes everything — in ninety minutes.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Tim Payne, after World Cup 2026
          </figcaption>
        </figure>
        <h2 className="font-display text-3xl text-white mb-4">4,000 to a million</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Tim Payne played his group matches without great expectations. His name was on the team sheet, but wasn&apos;t the topic of conversation in the build-up. Commentators rarely mentioned him first. He was the player you looked up when the final score was already on the board.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          And then he did something. An action, a moment, a match that won&apos;t be forgotten. And the internet did the rest.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          His Instagram profile, just a few months before the tournament still a page with training clips and family holidays, transformed into a portal for millions of people who wanted to know: who is this man, and how has nobody seen him before?
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          That&apos;s the Payne question. And the answer is always the same: the World Cup did see him. The World Cup always does.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">The World Cup as discoverer of the unknown</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          The World Cup is the only tournament in the world where players from lesser-known leagues, smaller countries and lower divisions stand alongside the absolute world elite. Messi and Ronaldo play against goalkeepers who normally play in front of 5,000 spectators. Mbappé shoots at defenders who compete in national leagues only followed regionally.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          And sometimes the unknown defender wins the duel. Sometimes the goalkeeper saves the penalty. Sometimes the substitute scores in the 87th minute and runs into the corner while 80,000 people chant his name — a name they didn&apos;t know that week.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          That moment isn&apos;t plannable. It&apos;s not the result of a marketing strategy. It&apos;s pure sport.
        </p>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            The World Cup makes people world-famous in 90 minutes. No other tournament does that. No other stage either.
          </p>
        </blockquote>
        <h2 className="font-display text-3xl text-white mb-4">Previous Tim Paynes of World Cup history</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Roger Milla danced at the corner flag in 1990 and became a symbol at 38. Essam El-Hadary saved a penalty for Egypt at 45 in 2018. Robbie Rensenbrink hit the post in the 1978 final and has forever lived in the collective memory of everyone who saw it. And in 1998,{' '}
          <Link href={`${blogBase}/vs-iran-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">the USA and Iran played a match</Link>
          {' '}that overshadowed the rest of the tournament — not because of the score, but because of what happened off the pitch.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          None of them were the biggest name on the pitch at the moment of the incident. But they became the talking point. The World Cup shines its spotlight on whoever deserves it, regardless of the previous four years.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Tim Payne is the 2026 version of that phenomenon. And he won&apos;t be the last.
        </p>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simulate it yourself</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">Which country surprises you at World Cup 2026?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Fill in all group results and see live who reaches the knockout stage. Which underdog do you give the best chance?</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Open the simulator
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">What 4,000 followers says about football</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          In the era of personal branding, of academies that teach social media alongside football technique, Tim Payne was simply a footballer. No content strategy, no brand deals in the build-up. Just a player, a team, and the World Cup pitch.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          That his Instagram exploded afterwards isn&apos;t his achievement. That&apos;s the achievement of the moment. His achievement was on the pitch.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          And that is exactly what makes the World Cup so unique. In a world where fame is carefully built over years, there is still one tournament where it can happen in 90 minutes. That&apos;s the promise of the World Cup. Tim Payne is the proof.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Which underdog do you pick?</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">Simulate all groups and the bracket on ScorePath. Fill in results, see live standings and share your scenario with a single link.</p>
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
          A principios de junio de 2026, Tim Payne tenía 4.000 seguidores en Instagram. Un mes después el contador marcaba más de un millón. No porque marcara el gol del siglo ni porque una rueda de prensa se hiciera viral. Sino porque el Mundial hace lo que ninguna agencia de marketing puede: convierte a atletas anónimos en íconos mundiales en 90 minutos.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          La curva Payne no es única. El Mundial la produce cada cuatro años. Pero esta vez le tocó a él.
        </p>
        <div className="my-8 grid grid-cols-3 gap-3">
          {([
            { num: '4K', label: 'seguidores', sub: 'antes del torneo' },
            { num: '1M+', label: 'seguidores', sub: 'seis semanas después' },
            { num: '250×', label: 'crecimiento', sub: 'en un torneo' },
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
              &ldquo;No tenía idea de que la gente fuera de mi ciudad conociera mi nombre. El Mundial lo cambia todo, en noventa minutos.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Tim Payne, tras el Mundial 2026
          </figcaption>
        </figure>
        <h2 className="font-display text-3xl text-white mb-4">De 4.000 a un millón</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Tim Payne jugó sus partidos de grupo sin grandes expectativas. Su nombre figuraba en la convocatoria, pero no era el tema de conversación en la previa. Los comentaristas raramente le mencionaban primero. Era el jugador que buscabas cuando el marcador final ya estaba en el tablero.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Y entonces hizo algo. Una acción, un momento, un partido que no se olvidará. E internet hizo el resto.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Su perfil de Instagram, unos meses antes del torneo todavía una página con imágenes de entrenamiento y vacaciones en familia, se convirtió en un portal para millones de personas que querían saber: ¿quién es este hombre, y cómo es que nadie le había visto antes?
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Esa es la pregunta Payne. Y la respuesta siempre es la misma: el Mundial sí le vio. El Mundial siempre ve.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">El Mundial como descubridor de desconocidos</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          El Mundial es el único torneo del mundo donde jugadores de competiciones menos conocidas, países más pequeños y divisiones inferiores están junto a la élite mundial absoluta. Messi y Ronaldo juegan contra porteros que normalmente actúan ante 5.000 espectadores. Mbappé dispara contra defensas que compiten en ligas nacionales que solo se siguen a nivel regional.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Y a veces el defensa desconocido gana el duelo. A veces el portero para el penalti. A veces el suplente marca en el minuto 87 y corre hacia el banderín de córner mientras 80.000 personas cantan su nombre, un nombre que esa semana no conocían.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Ese momento no se puede planificar. No es el resultado de una estrategia de marketing. Es deporte puro.
        </p>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            El Mundial hace mundialmente famosas a personas en 90 minutos. Ningún otro torneo hace eso. Ningún otro escenario tampoco.
          </p>
        </blockquote>
        <h2 className="font-display text-3xl text-white mb-4">Los Tim Payne anteriores de la historia del Mundial</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Roger Milla bailó junto al banderín de córner en 1990 y se convirtió en símbolo con 38 años. Essam El-Hadary paró un penalti por Egipto con 45 años en 2018. Robbie Rensenbrink golpeó el palo en la final de 1978 y vive para siempre en la memoria colectiva de quien lo vio. Y en 1998,{' '}
          <Link href={`${blogBase}/vs-iran-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">EE.UU. e Irán jugaron un partido</Link>
          {' '}que eclipsó al resto del torneo, no por el resultado, sino por lo que ocurrió fuera del campo.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Ninguno de ellos era el nombre más famoso del campo en el momento del incidente. Pero se convirtieron en el tema de conversación. El Mundial dirige el foco hacia quien se lo merece, independientemente de los cuatro años anteriores.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Tim Payne es la versión 2026 de ese fenómeno. Y no será el último.
        </p>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simúlalo tú mismo</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">¿Qué país te sorprende en el Mundial 2026?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Rellena todos los resultados de grupos y ve en directo quién pasa a la eliminatoria. ¿A qué sorpresa le das más posibilidades?</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Abrir el simulador
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">Lo que dicen 4.000 seguidores sobre el fútbol</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          En la era del personal branding, de las academias que enseñan redes sociales junto a la técnica futbolística, Tim Payne era simplemente un futbolista. Sin estrategia de contenidos, sin acuerdos de marca en la previa del torneo. Solo un jugador, un equipo y el césped del Mundial.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Que su Instagram explotara después no es su mérito. Ese es el mérito del momento. Su mérito fue en el campo.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Y eso es exactamente lo que hace al Mundial tan único. En un mundo donde la fama se construye cuidadosamente a lo largo de años, sigue existiendo un torneo donde puede ocurrir en 90 minutos. Esa es la promesa del Mundial. Tim Payne es la prueba.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">¿A qué sorpresa apuestas tú?</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">Simula todos los grupos y el bracket en ScorePath. Rellena resultados, ve en directo las tablas y comparte tu escenario con un solo enlace.</p>
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
        Begin juni 2026 had Tim Payne 4.000 volgers op Instagram. Een maand later stond de teller op meer dan een miljoen. Niet omdat hij een goal van de eeuw scoorde of een persconferentie viraal ging. Maar omdat het WK doet wat geen marketingbureau kan: het maakt van anonieme atleten mondiale iconen in 90 minuten.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        De Payne-curve is niet uniek. Het WK produceert hem elke vier jaar. Maar dit keer was het hem.
      </p>

      <div className="my-8 grid grid-cols-3 gap-3">
        {([
          { num: '4K', label: 'volgers', sub: 'voor het toernooi' },
          { num: '1M+', label: 'volgers', sub: 'zes weken later' },
          { num: '250×', label: 'groei', sub: 'in één toernooi' },
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
            &ldquo;Ik had geen idee dat mensen buiten mijn stad mijn naam kenden. Het WK verandert alles — in negentig minuten.&rdquo;
          </p>
        </blockquote>
        <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
          Tim Payne, na WK 2026
        </figcaption>
      </figure>

      <h2 className="font-display text-3xl text-white mb-4">4.000 naar een miljoen</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Tim Payne speelde zijn groepswedstrijden zonder grote verwachtingen. Zijn naam stond in de teamlijst, maar was niet het gespreksonderwerp in de aanloop. Commentatoren noemden hem zelden als eerste. Hij was de speler die je opzoekt als het eindstand er al op staat.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        En toen deed hij iets. Een actie, een moment, een wedstrijd die niet vergeten wordt. En het internet deed de rest.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Zijn Instagramprofiel, een paar maanden voor het toernooi nog een pagina met trainingsbeelden en familievacaties, veranderde in een portaal voor miljoenen mensen die wilden weten: wie is deze man, en hoe heeft niemand hem eerder gezien?
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Dat is de Payne-vraag. En het antwoord is altijd hetzelfde: het WK zag hem wel. Het WK ziet altijd.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Het WK als onbekende ontdekker</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het Wereldkampioenschap is het enige toernooi ter wereld waar spelers van minder bekende competities, kleinere landen en lagere divisies naast de absolute wereldtop staan. Messi en Ronaldo spelen against keepers die normaal voor een club met 5.000 toeschouwers staan. Mbappé schiet op verdedigers die in nationale competities spelen die slechts regionaal worden gevolgd.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        En soms wint de onbekende verdediger het duel. Soms stopt de keeper de penalty. Soms scoort de invaller in de 87e minuut en loopt hij de hoek in terwijl 80.000 mensen zijn naam roepen die ze voor die week niet kenden.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Dat moment is niet planbaar. Het is niet het resultaat van een marketingstrategie. Het is puur sport.
      </p>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Het WK maakt mensen wereldberoemd in 90 minuten. Geen ander toernooi doet dat. Geen ander podium evenmin.
        </p>
      </blockquote>

      <h2 className="font-display text-3xl text-white mb-4">Voorgaande Tim Paynes van de WK-geschiedenis</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Roger Milla danste in 1990 bij de cornervlag en werd op zijn 38e een symbool. Essam El-Hadary stopte in 2018 als 45-jarige doelman een penalty voor Egypte. Robbie Rensenbrink trof de paal in de finale van 1978 en bleef voor altijd leven in het collectieve geheugen van wie het zag. En in 1998 speelden de{' '}
        <Link href={`${blogBase}/vs-iran-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">VS en Iran een wedstrijd</Link>
        {' '}die de rest van het toernooi overschaduwde — niet vanwege de score, maar vanwege wat er buiten het veld speelde.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Niemand van hen was op het moment van het incident de beroemdste naam op het veld. Maar ze werden het gespreksonderwerp. Het WK trekt de spotlight op wie het verdient, ongeacht de vorige vier jaar.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        Tim Payne is de versie van 2026 van dat fenomeen. En hij zal niet de laatste zijn.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Welk land verrast jou op WK 2026?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in en zie live wie de knock-outfase haalt. Welke underdog geef jij de meeste kans?
        </p>
        <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
          Open de simulator
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      <h2 className="font-display text-3xl text-white mb-4">Wat 4.000 volgers zegt over voetbal</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        In de era van persoonlijke branding, van academies die sociale media trainen naast voetbaltechnieken, was Tim Payne nog gewoon een voetballer. Geen content-strategie, geen branddeals in de aanloop naar het toernooi. Gewoon een speler, een team, en de WK-weide.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Dat zijn Instagram daarna explodeerde, is niet zijn prestatie. Dat is de prestatie van het moment. Zijn prestatie was op het veld.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        En dat is precies wat het WK zo uniek maakt. In een wereld waar roem zorgvuldig wordt opgebouwd over jaren, is er nog steeds één toernooi waar het in 90 minuten kan. Dat is de belofte van het WK. Tim Payne is het bewijs.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Welke underdog pik jij?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Simuleer alle groepen en de bracket op ScorePath. Vul uitslagen in, zie live de standen en deel je scenario via één link.
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
