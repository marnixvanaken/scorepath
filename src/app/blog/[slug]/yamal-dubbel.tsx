import Link from 'next/link';

export function YamalDubbelContent({ lang = 'nl' }: { lang?: string }) {
  const sim = `/${lang}/wk-2026`;
  const blogBase = `/${lang}/blog`;

  if (lang === 'en') {
    return (
      <article>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          On July 14, 2024, Lamine Yamal lifted the European trophy in Berlin. He was 16 years old. The youngest player ever to win the European Championship with his country. Two years later he plays his first World Cup, with Spain as one of the favourites. If he wins, he writes history again.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Because nobody has ever won both the Euros and the World Cup at such a young age. That record is open. And Yamal is the only candidate.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Berlin, 2024: the beginning of something great</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Yamal had only just turned 17 when he scored a world-class goal in the Euro 2024 semi-final against France. A free kick from the left corner, curled to the far post. The internet exploded. Clips collected hundreds of millions of views. His name was everywhere.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          In the final, three days later, he played ninety minutes again. Spain beat England. Yamal was named the tournament&apos;s best young player. At 17.
        </p>
        <div className="my-8 grid grid-cols-3 gap-3">
          {([
            { num: '16', label: 'years old', sub: 'in the Euro 2024 final' },
            { num: '17', label: 'years', sub: 'two days after the final' },
            { num: '18-19', label: 'years', sub: 'during World Cup 2026' },
          ] as const).map(({ num, label, sub }) => (
            <div key={label} className="bg-[#0d0d0d] border border-themed rounded-xl p-4 text-center">
              <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
              <p className="text-white font-semibold text-xs">{label}</p>
              <p className="text-slate-600 text-[10px] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
        <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <blockquote className="mb-4">
            <p className="text-slate-200 text-lg leading-relaxed italic">
              &ldquo;I&apos;m living a dream. This is the beginning, not the end. I want to win so much more.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Lamine Yamal, after winning Euro 2024 with Spain
          </figcaption>
        </figure>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          That was twelve months ago. Now he&apos;s about to play his first World Cup.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">The record nobody holds</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Who has ever won both the European Championship and the world title? The list is shorter than you think. Zidane did it with France in 1998 and 2000, but was 26 and 28 years old. Iniesta, Xavi, Silva, Torres: all world champions and European champions, but each at least 24 when they won their first major international trophy.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Yamal won the Euros at 16. If Spain wins the 2026 World Cup, he would have won both titles before his twentieth birthday. Nobody has ever done that.
        </p>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            Zidane won the double at 26 and 28. Yamal could do it at 16 and 18. A generation earlier.
          </p>
        </blockquote>
        <h2 className="font-display text-3xl text-white mb-4">Spain as World Cup favourites</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Spain is one of the strong contenders going into World Cup 2026. The generation around Yamal, Pedri, Gavi and Nico Williams is young, attacking and technically superior. Manager Luis de la Fuente has built a style that fits their profile: dominant possession, high pressing, dangerous from the flanks.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          In the current system Yamal is the key player on the right. His direct 1v1 qualities and his ability to operate in tight spaces make him undefendable at his best. Opponents put two men on him. That opens space for Nico Williams on the left, for Pedri in central areas.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          If Spain reaches the final, Yamal has already shown that age sets no limits. The question isn&apos;t whether he&apos;s good enough. The question is whether fortune is on his side.
        </p>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simulate it yourself</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">Does Spain reach the final in your scenario?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Fill in all group results and play through the bracket. Give Yamal his shot at the grand double.</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Open the simulator
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">A career that&apos;s just beginning</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          The most dizzying thing about Yamal is not what he has already won. It&apos;s that in 2026 he is only 18 years old. His best years lie ahead. If he wins the World Cup, this isn&apos;t the crowning achievement of his career. It&apos;s the beginning of it.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Players like{' '}
          <Link href={`${blogBase}/drie-legendes-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi and Ronaldo</Link>
          {' '}— both playing their sixth World Cup in 2026 — set the bar for longevity unimaginably high. Yamal has the makings to do the same. But first: the summer of 2026. First: the chance at a record nobody can take from him.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Write Yamal&apos;s story</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">How far does Spain go in your World Cup 2026? Simulate all groups and the bracket on ScorePath. Share your prediction with a single link.</p>
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
          El 14 de julio de 2024, Lamine Yamal alzó el trofeo europeo en Berlín. Tenía 16 años. El jugador más joven de la historia en ganar el Campeonato de Europa con su selección. Dos años después juega su primer Mundial, con España como una de las favoritas. Si gana, vuelve a escribir historia.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Porque nadie ha ganado jamás la Eurocopa y el Mundial a una edad tan temprana. Ese récord está abierto. Y Yamal es el único candidato.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Berlín, 2024: el comienzo de algo grande</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Yamal acababa de cumplir 17 años cuando marcó un gol de categoría mundial en la semifinal de la Euro 2024 contra Francia. Un tiro libre desde la esquina izquierda, curvado al palo largo. Internet estalló. Los clips acumularon cientos de millones de reproducciones. Su nombre estaba en todas partes.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          En la final, tres días después, volvió a jugar noventa minutos. España ganó a Inglaterra. Yamal fue elegido mejor jugador joven del torneo. Con 17 años.
        </p>
        <div className="my-8 grid grid-cols-3 gap-3">
          {([
            { num: '16', label: 'años', sub: 'en la final de la Euro 2024' },
            { num: '17', label: 'años', sub: 'dos días después de la final' },
            { num: '18-19', label: 'años', sub: 'durante el Mundial 2026' },
          ] as const).map(({ num, label, sub }) => (
            <div key={label} className="bg-[#0d0d0d] border border-themed rounded-xl p-4 text-center">
              <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
              <p className="text-white font-semibold text-xs">{label}</p>
              <p className="text-slate-600 text-[10px] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
        <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <blockquote className="mb-4">
            <p className="text-slate-200 text-lg leading-relaxed italic">
              &ldquo;Vivo un sueño. Esto es el principio, no el final. Quiero ganar mucho más.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Lamine Yamal, tras ganar la Euro 2024 con España
          </figcaption>
        </figure>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Eso fue hace doce meses. Ahora está a punto de jugar su primer Mundial.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">El récord que nadie tiene</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          ¿Quién ha ganado alguna vez la Eurocopa y el título mundial? La lista es más corta de lo que piensas. Zidane lo hizo con Francia en 1998 y 2000, pero tenía 26 y 28 años. Iniesta, Xavi, Silva, Torres: todos campeones del mundo y de Europa, pero todos con al menos 24 años cuando ganaron su primer gran trofeo internacional.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Yamal ganó la Euro con 16. Si España gana el Mundial 2026, habrá conquistado ambos títulos antes de los veinte. Eso no lo ha hecho nadie jamás.
        </p>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">
            Zidane ganó el doblete con 26 y 28 años. Yamal podría hacerlo con 16 y 18. Una generación antes.
          </p>
        </blockquote>
        <h2 className="font-display text-3xl text-white mb-4">España como favorita al Mundial</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          España es uno de los grandes candidatos al entrar en el Mundial 2026. La generación de Yamal, Pedri, Gavi y Nico Williams es joven, ofensiva y técnicamente superior. El seleccionador Luis de la Fuente ha construido un estilo que encaja con su perfil: posesión dominante, presión alta, peligroso por las bandas.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          En el sistema actual Yamal es la clave por la derecha. Sus cualidades en el uno contra uno y su capacidad para actuar en espacios reducidos lo hacen indefendible en sus mejores momentos. Los rivales le ponen dos hombres. Eso abre espacio para Nico Williams por la izquierda, para Pedri en el centro.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Si España llega a la final, Yamal ya habrá demostrado que la edad no pone límites. La pregunta no es si está a la altura. La pregunta es si el destino le acompaña.
        </p>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simúlalo tú mismo</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">¿Llega España a la final en tu escenario?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Rellena todos los resultados de grupos y juega el bracket. Dale a Yamal su oportunidad en el gran doblete.</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Abrir el simulador
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">Una carrera que acaba de empezar</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Lo más vertiginoso de Yamal no es lo que ya ha ganado. Es que en 2026 solo tiene 18 años. Sus mejores años están por venir. Si gana el Mundial, esto no es la corona de su carrera. Es el comienzo.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Jugadores como{' '}
          <Link href={`${blogBase}/drie-legendes-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi y Ronaldo</Link>
          {' '}— que en 2026 juegan ambos su sexto Mundial — pusieron el listón de la longevidad increíblemente alto. Yamal tiene la capacidad para hacer lo mismo. Pero primero: el verano de 2026. Primero: la oportunidad de un récord que nadie le pueda quitar.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Escribe la historia de Yamal</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">¿Hasta dónde llega España en el Mundial 2026? Simula todos los grupos y el bracket en ScorePath. Comparte tu predicción con un solo enlace.</p>
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
        Op 14 juli 2024 hief Lamine Yamal de Europese trofee omhoog in Berlijn. Hij was 16 jaar oud. De jongste speler ooit die de Europese titel won met zijn land. Twee jaar later speelt hij zijn eerste Wereldkampioenschap, met Spanje als een van de favorieten. Als hij wint, schrijft hij opnieuw geschiedenis.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Want niemand heeft ooit de Euro én het WK gewonnen op zo&apos;n jonge leeftijd. Dat record staat open. En Yamal is de enige kandidaat.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Berlijn, 2024: het begin van iets groots</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Yamal was nog geen week eerder 17 geworden toen hij in de halve finale van Euro 2024 een wereldgoal scoorde tegen Frankrijk. Een vrije trap vanuit de linkerhoek, gekruld naar de verre paal. Het internet barstte los. Clips scoorden honderden miljoenen views. Zijn naam stond overal.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        In de finale, drie dagen later, speelde hij alweer negentig minuten. Spanje won van Engeland. Yamal werd uitgeroepen tot beste jonge speler van het toernooi. Op zijn 17e.
      </p>

      <div className="my-8 grid grid-cols-3 gap-3">
        {([
          { num: '16', label: 'jaar oud', sub: 'in de Euro 2024 finale' },
          { num: '17', label: 'jaar', sub: 'twee dagen na de finale' },
          { num: '18-19', label: 'jaar', sub: 'tijdens WK 2026' },
        ] as const).map(({ num, label, sub }) => (
          <div key={label} className="bg-[#0d0d0d] border border-themed rounded-xl p-4 text-center">
            <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
            <p className="text-white font-semibold text-xs">{label}</p>
            <p className="text-slate-600 text-[10px] mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
        <blockquote className="mb-4">
          <p className="text-slate-200 text-lg leading-relaxed italic">
            &ldquo;Ik leef in een droom. Dit is het begin, niet het einde. Ik wil nog zoveel meer winnen.&rdquo;
          </p>
        </blockquote>
        <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
          Lamine Yamal, na het winnen van Euro 2024 met Spanje
        </figcaption>
      </figure>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Dat was twaalf maanden geleden. Nu staat hij op het punt zijn eerste WK te spelen.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Het record dat niemand heeft</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Wie heeft ooit de Europese titel én de wereldtitel gewonnen? De lijst is korter dan je denkt. Zidane deed het met Frankrijk in 1998 en 2000, maar was 26 en 28 jaar oud. Iniesta, Xavi, Silva, Torres: stuk voor stuk wereldkampioenen én Europees kampioen, maar allen minstens 24 jaar bij hun eerste grote internationale trofee.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Yamal won de Euro op 16. Als Spanje WK 2026 wint, zou hij beide titels hebben gewonnen voor zijn twintigste. Dat heeft nog nooit iemand gedaan.
      </p>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Zidane won de dubbel als 26 en 28-jarige. Yamal kan het doen op 16 en 18. Een generatie eerder.
        </p>
      </blockquote>

      <h2 className="font-display text-3xl text-white mb-4">Spanje als WK-favoriet</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Spanje is bij aanvang van WK 2026 een van de sterke kanshebbers. De generatie rond Yamal, Pedri, Gavi en Nico Williams is jong, aanvallend en technisch superieur. Bondscoach Luis de la Fuente bouwt een stijl die past bij hun profiel: dominant balbezit, hoge pressing, gevaarlijk van de flanken.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        In het huidige systeem is Yamal de sleutel aan de rechterkant. Zijn directe één-op-één kwaliteiten en zijn vermogen om in kleine ruimtes te acteren maken hem onverdedigbaar op zijn beste momenten. Tegenstanders zetten er twee man op. Dan opent er ruimte voor Nico Williams links, voor Pedri centraal.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        Als Spanje de finale haalt, heeft Yamal al getoond dat leeftijd geen grenzen trekt. De vraag is niet of hij goed genoeg is. De vraag is of het lot meezit.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Haalt Spanje de finale in jouw scenario?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in en speel de bracket door. Geef Yamal zijn kans op de grote dubbel.
        </p>
        <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
          Open de simulator
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      <h2 className="font-display text-3xl text-white mb-4">Een carrière die net begint</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het meest duizelingwekkende aan Yamal is niet wat hij al heeft gewonnen. Het is dat hij in 2026 pas 18 jaar oud is. Zijn beste jaren liggen nog voor hem. Als hij het WK wint, is dit niet de kroon op zijn carrière. Het is het begin ervan.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Spelers als{' '}
        <Link href={`${blogBase}/drie-legendes-wk-2026`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi en Ronaldo</Link>
        {' '}— die in 2026 allebei hun zesde WK spelen — legden de lat voor longeviteit ongelooflijk hoog. Yamal heeft de aanleg om dat ook te doen. Maar eerst: de zomer van 2026. Eerst: de kans op een record dat niemand hem kan afpakken.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Schrijf Yamal&apos;s verhaal
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Hoe ver komt Spanje in jouw WK 2026? Simuleer alle groepen en de bracket op ScorePath. Deel je voorspelling via één link.
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
