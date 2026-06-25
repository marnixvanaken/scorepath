import Link from 'next/link';

export function DrieLegendesContent({ lang = 'nl' }: { lang?: string }) {
  const sim = `/${lang}/wk-2026`;
  const blogBase = `/${lang}/blog`;

  if (lang === 'en') {
    return (
      <article className="prose-blog">
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          On June 11, 2026, the World Cup kicks off simultaneously across three countries: the USA, Canada and Mexico. As the world prepares for the biggest football tournament ever, something unfolds that will go down in the history books. Three players who have stood at the absolute summit of world football for more than twenty years step onto the World Cup stage for the sixth time. Lionel Messi. Cristiano Ronaldo. Guillermo Ochoa.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          This has never happened before. And it will never happen again.
        </p>
        <div className="my-8 grid grid-cols-3 gap-3">
          {([
            { num: '6', label: 'World Cups', sub: 'per player, each' },
            { num: '20', label: 'years', sub: '2006 to 2026' },
            { num: '3', label: 'legends', sub: 'together, for the first time' },
          ] as const).map(({ num, label, sub }) => (
            <div key={label} className="bg-[#0d0d0d] border border-themed rounded-xl p-4 text-center">
              <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
              <p className="text-white font-semibold text-xs">{label}</p>
              <p className="text-slate-600 text-[11px] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
        <h2 className="font-display text-3xl text-white mb-4">The impossible number: six</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Six World Cups. Anyone hearing this for the first time thinks it&apos;s a typo. But it&apos;s true. Messi and Ronaldo played their first World Cup in 2006: Messi as an 18-year-old star in the making, Ronaldo as a 21-year-old who drove Portugal to third place. Ochoa debuted that same year as a 20-year-old goalkeeper for Mexico.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">Twenty years later, they&apos;re still there.</p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Historically, playing multiple World Cups is exceptional. Lothar Matthäus played five, as did Antonio Carbajal, coincidentally also a Mexican goalkeeper. Cafu and Paolo Maldini reached four. Nobody in the modern era, nobody in the era of heavy match schedules and high pressing intensity, had reached this level for a sixth time.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">Until now.</p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Messi also holds the record for the most World Cup matches ever played — read about it in{' '}
          <Link href={`${blogBase}/messi-meeste-wk-wedstrijden`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi and Matthäus&apos;s record</Link>.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Messi: the story that won&apos;t let itself end</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          After the final in Lusail, after that penalty against Mbappé, after he finally lifted that trophy: everyone thought it was over. Not officially, but the energy was there. The story was complete. The great white spot had been filled in.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">But Messi didn&apos;t stop.</p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          In 2026 he is 38 years old. No sprinter at this level performs at 38. But Messi isn&apos;t a sprinter. He&apos;s a footballer who controls space, reads the game like a chess master thinking three moves ahead. And that kind of intelligence doesn&apos;t rot away with the years.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          The question isn&apos;t whether Messi can handle it mentally. The question is whether Argentina, without the same generation of teammates as in 2022, can perform again. And whether his body can survive the toughest duels, the knockout stage, possible extra time.
        </p>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">If it works, we&apos;ll be telling a fairy tale for generations.</p>
        </blockquote>
        <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <blockquote className="mb-4">
            <p className="text-slate-200 text-lg leading-relaxed italic">
              &ldquo;This is the most beautiful thing I&apos;ve ever experienced in football. I dreamed of this for so long. Now I just want to enjoy it.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Lionel Messi, after winning the 2022 World Cup in Qatar
          </figcaption>
        </figure>
        <h2 className="font-display text-3xl text-white mb-4">Ronaldo: the eternal resistance</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Cristiano Ronaldo has one greatest enemy: the finitude of everything. While the world wrote him off step by step, he kept scoring. In Saudi Arabia, for Al-Nassr, he shattered records nobody was keeping track of anymore. Not for glory, but for the statistics. And for the refusal to leave.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          For Portugal the situation is interesting. The new generation is there: Félix, Leão, Vitinha, Conceição. They&apos;re good. Perhaps even better than the generation of Moutinho and Nani. But Ronaldo always draws the team toward himself. He demands possession, he demands position, he demands the narrative.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Whether that&apos;s a burden or a gift for Portugal at World Cup 2026 depends on the draw, the opponents, and how manager Martinez handles it. In an easy group Ronaldo can function at his own pace. In a tough group, against teams that press high and transition quickly, it gets harder.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          But don&apos;t be fooled: if there&apos;s one player who can still score a goal in a decisive moment, it&apos;s Ronaldo. Those reflexes don&apos;t fade quickly, not even at 41. And his direct free kick? Read how Messi{' '}
          <Link href={`${blogBase}/messi-vrije-trappen-rivelino`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">chases Rivelino&apos;s record</Link>.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Ochoa: the indestructible guardian</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Of the three, Ochoa is perhaps the most poetic presence at this World Cup. No world champion, no Ballon d&apos;Or. But for Mexico he is something that Messi and Ronaldo perhaps never became for their countries: a constant. A rock.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          In 2014 in Natal he saved a shot from Neymar that nobody expected him to reach, and Mexico escaped with a 0-0 draw against hosts Brazil. The internet exploded. Ochoa became a meme, a hero, an icon. In 2018 he was there again. In 2022 too.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          If he&apos;s fit enough to play in 2026, Ochoa will be 40 years old. A 40-year-old goalkeeper at a World Cup sounds impossible, but goalkeepers can go on a long time. Edwin van der Sar continued until he was 41. Dino Zoff won the world championship at 40.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Ochoa is more than a goalkeeper for Mexico. He is continuity in a squad that was always inconsistent. His name alone on the team sheet brings the team calm.
        </p>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">Ochoa is a constant in a squad that was always inconsistent. A rock.</p>
        </blockquote>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simulate it yourself</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">How far do Argentina, Portugal and Mexico go?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Fill in all group results and see live who reaches the knockout stage. Share your bracket with a single link.</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Open the simulator
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">What we&apos;ll never see again</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          There is a generation of football fans who have always known Messi and Ronaldo. They were there before the smartphone, before social media, before the time when every goal went viral within three seconds. They were so self-evidently present that the end always seemed postponed.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">That postponement is now running out.</p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          After World Cup 2026 it&apos;s definitively over. No seventh time. No reunion. What we see in the summer of 2026 is the last time these three men stand at the same tournament. Together. In the same weeks.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          That&apos;s something to reflect on. Not as grief, but as awareness: we are living in the middle of a historic moment. No documentary afterwards, no nostalgia. Now, live, as it happens.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          On July 19, 2026 the winner will be crowned at MetLife Stadium in New Jersey. Whether Messi, Ronaldo and Ochoa are still competing or already at home: it doesn&apos;t matter. What counts is that they were there. Six times. We witnessed that.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Write history yourself</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">Does Messi crash out in the group stage or reach the final? Does Ochoa guide Mexico to the quarter-finals? Simulate all scenarios on ScorePath and share your bracket with a single link.</p>
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
          El 11 de junio de 2026 arranca el Mundial en tres países a la vez: Estados Unidos, Canadá y México. Mientras el mundo se prepara para el torneo de fútbol más grande de la historia, ocurre algo que quedará para los libros de historia. Tres jugadores que llevan más de veinte años en la cima absoluta del fútbol mundial pisan el escenario del Mundial por sexta vez. Lionel Messi. Cristiano Ronaldo. Guillermo Ochoa.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Esto no ha ocurrido nunca. Y no volverá a ocurrir jamás.
        </p>
        <div className="my-8 grid grid-cols-3 gap-3">
          {([
            { num: '6', label: 'Mundiales', sub: 'por jugador, cada uno' },
            { num: '20', label: 'años', sub: 'de 2006 a 2026' },
            { num: '3', label: 'leyendas', sub: 'juntos, por primera vez' },
          ] as const).map(({ num, label, sub }) => (
            <div key={label} className="bg-[#0d0d0d] border border-themed rounded-xl p-4 text-center">
              <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
              <p className="text-white font-semibold text-xs">{label}</p>
              <p className="text-slate-600 text-[11px] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
        <h2 className="font-display text-3xl text-white mb-4">El número imposible: seis</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Seis Mundiales. Quien lo escucha por primera vez piensa que hay un error tipográfico. Pero es verdad. Messi y Ronaldo jugaron su primer Mundial en 2006: Messi como estrella emergente de 18 años, Ronaldo como el de 21 años que llevó a Portugal hasta el tercer puesto. Ochoa debutó ese mismo año como portero de México con 20 años.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">Veinte años después, siguen ahí.</p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Históricamente, jugar varios Mundiales es excepcional. Lothar Matthäus jugó cinco, igual que Antonio Carbajal, curiosamente también portero mexicano. Cafu y Paolo Maldini llegaron a cuatro. Nadie en la era moderna, nadie en la era de calendarios sobrecargados y alta presión, había alcanzado este nivel por sexta vez.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">Hasta ahora.</p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Messi también ostenta el récord de más partidos disputados en Mundiales — léelo en{' '}
          <Link href={`${blogBase}/messi-meeste-wk-wedstrijden`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi y el récord de Matthäus</Link>.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Messi: la historia que no se deja cerrar</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Después de la final en Lusail, después de ese penalti contra Mbappé, después de levantar por fin ese trofeo: todos pensaron que había terminado. No oficialmente, pero la energía estaba ahí. La historia estaba completa. El gran hueco en blanco había sido llenado.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">Pero Messi no paró.</p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          En 2026 tiene 38 años. Ningún velocista a este nivel rinde con 38. Pero Messi no es un velocista. Es un futbolista que domina el espacio, lee el juego como un maestro de ajedrez que piensa tres movimientos por adelantado. Y ese tipo de inteligencia no se oxida con los años.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          La pregunta no es si Messi puede con ello mentalmente. La pregunta es si Argentina, sin la misma generación de compañeros que en 2022, puede volver a rendir. Y si su cuerpo aguanta los duelos más duros, la fase eliminatoria, las posibles prórrogas.
        </p>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">Si funciona, contaremos un cuento de hadas durante generaciones.</p>
        </blockquote>
        <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
          <blockquote className="mb-4">
            <p className="text-slate-200 text-lg leading-relaxed italic">
              &ldquo;Esto es lo más bonito que he vivido en el fútbol. Lo soñé tanto tiempo. Ahora solo quiero disfrutarlo.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
            Lionel Messi, tras ganar el Mundial 2022 en Catar
          </figcaption>
        </figure>
        <h2 className="font-display text-3xl text-white mb-4">Ronaldo: la resistencia eterna</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Cristiano Ronaldo tiene un único gran enemigo: la finitud de todo. Mientras el mundo le fue descartando poco a poco, él siguió marcando. En Arabia Saudí, con el Al-Nassr, pulverizó récords que nadie seguía ya. No por la gloria, sino por las estadísticas. Y por la negativa a marcharse.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Para Portugal la situación es interesante. La nueva generación está ahí: Félix, Leão, Vitinha, Conceição. Son buenos. Quizás incluso mejores que la generación de Moutinho y Nani. Pero Ronaldo siempre atrae el equipo hacia sí. Exige posesión, exige posición, exige el protagonismo.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Si eso es una carga o un regalo para Portugal en el Mundial 2026 depende del sorteo, de los rivales, de cómo lo gestione el seleccionador Martínez. En un grupo fácil Ronaldo puede funcionar a su ritmo. En uno duro, contra equipos que presionan alto y transicionan rápido, se complica.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Pero no te equivoques: si hay un jugador que todavía puede marcar en un momento decisivo, ese es Ronaldo. Esos reflejos no desaparecen rápido, ni siquiera a los 41. ¿Y su tiro libre directo? Lee cómo Messi{' '}
          <Link href={`${blogBase}/messi-vrije-trappen-rivelino`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">persigue el récord de Rivelino</Link>.
        </p>
        <h2 className="font-display text-3xl text-white mb-4">Ochoa: el guardián indestructible</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          De los tres, Ochoa es quizás la presencia más poética en este Mundial. Sin título mundial, sin Balón de Oro. Pero para México es algo que Messi y Ronaldo quizás nunca llegaron a ser para sus países: una constante. Una roca.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          En 2014 en Natal detuvo un disparo de Neymar que nadie esperaba, y México escapó con un 0-0 ante el Brasil anfitrión. Internet explotó. Ochoa se convirtió en meme, en héroe, en ícono. En 2018 volvió a estar. En 2022 también.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Si está en forma para jugar en 2026, Ochoa tendrá 40 años. Un portero de 40 en un Mundial suena imposible, pero los porteros pueden durar mucho. Edwin van der Sar siguió hasta los 41. Dino Zoff se proclamó campeón del mundo con 40.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Ochoa es más que un portero para México. Es continuidad en un equipo que siempre fue irregular. Solo su nombre en la convocatoria da calma al equipo.
        </p>
        <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
          <p className="text-slate-200 text-xl font-semibold leading-snug italic">Ochoa es una constante en un equipo que siempre fue irregular. Una roca.</p>
        </blockquote>
        <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
          <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-3">Simúlalo tú mismo</p>
          <p className="text-white font-bold text-xl leading-snug mb-2">¿Hasta dónde llegan Argentina, Portugal y México?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">Rellena todos los resultados de grupos y ve en directo quién pasa a la fase eliminatoria. Comparte tu bracket con un solo enlace.</p>
          <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
            Abrir el simulador
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <h2 className="font-display text-3xl text-white mb-4">Lo que nunca volveremos a ver</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Hay una generación de aficionados al fútbol que siempre ha conocido a Messi y Ronaldo. Estaban ahí antes del smartphone, antes de las redes sociales, antes de que cada gol se hiciera viral en tres segundos. Estaban tan presentes que el final siempre parecía aplazado.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">Ese aplazamiento se acaba ahora.</p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Después del Mundial 2026 se acabó definitivamente. No habrá séptima vez. No habrá reencuentro. Lo que vemos en el verano de 2026 es la última vez que estos tres hombres coinciden en el mismo torneo. Juntos. En las mismas semanas.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          Eso merece una reflexión. No como tristeza, sino como conciencia: estamos viviendo en medio de un momento histórico. Sin documental posterior, sin nostalgia. Ahora, en directo, mientras ocurre.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          El 19 de julio de 2026 se coronará al campeón en el MetLife Stadium de Nueva Jersey. Que Messi, Ronaldo y Ochoa sigan participando o ya estén en casa: da igual. Lo que importa es que estuvieron ahí. Seis veces. Fuimos testigos de ello.
        </p>
        <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
          <p className="font-display text-3xl text-white mb-3">Escribe la historia tú mismo</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">¿Messi cae en la fase de grupos o llega a la final? ¿Ochoa lleva a México a cuartos? Simula todos los escenarios en ScorePath y comparte tu bracket con un solo enlace.</p>
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
        Op 11 juni 2026 gaat het WK van start in drie landen tegelijk: de VS, Canada en Mexico. Terwijl de wereld zich opmaakt voor het grootste voetbaltoernooi ooit, speelt zich iets af wat de geschiedenisboeken ingaat. Drie spelers die al meer dan twintig jaar aan de absolute wereldtop staan, betreden voor de zesde keer het WK-podium. Lionel Messi. Cristiano Ronaldo. Guillermo Ochoa.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        Dit heeft zich nog nooit voorgedaan. En het zal zich nooit meer voordoen.
      </p>

      <div className="my-8 grid grid-cols-3 gap-3">
        {([
          { num: '6', label: 'WKs', sub: 'per speler, elk' },
          { num: '20', label: 'jaar', sub: '2006 tot 2026' },
          { num: '3', label: 'legendes', sub: 'tegelijk, voor het eerst' },
        ] as const).map(({ num, label, sub }) => (
          <div key={label} className="bg-[#0d0d0d] border border-themed rounded-xl p-4 text-center">
            <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
            <p className="text-white font-semibold text-xs">{label}</p>
            <p className="text-slate-600 text-[11px] mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-3xl text-white mb-4">Het onmogelijke getal: zes</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Zes Wereldkampioenschappen. Wie dit voor het eerst hoort, denkt aan een typfout. Maar het klopt. Messi en Ronaldo speelden hun eerste WK in 2006: Messi als 18-jarige ster in wording, Ronaldo als 21-jarige die Portugal naar de derde plaats stuwde. Ochoa debuteerde datzelfde jaar als 20-jarige keeper voor Mexico.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Twintig jaar later staan ze er nog steeds.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Historisch gezien is het spelen van meerdere WK&apos;s uitzonderlijk. Lothar Matthäus speelde er vijf, net als Antonio Carbajal, toevallig ook een Mexicaanse keeper. Cafu en Paolo Maldini bereikten er vier. Niemand in de moderne era, niemand in het tijdperk van zware competitieschema&apos;s en hoge pressing-intensiteit, bereikte dit niveau voor een zesde keer.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Tot nu.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Dat Messi daarbij ook het record voor meeste WK-wedstrijden ooit op zijn naam heeft, lees je in{' '}
        <Link href={`${blogBase}/messi-meeste-wk-wedstrijden`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi en het record van Matthäus</Link>.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Messi: het verhaal dat zichzelf niet laat afsluiten</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Na de finale in Lusail, na die penalty tegen Mbappé, na die trofee die hij eindelijk omhooghield: iedereen dacht dat het af was. Niet officieel, maar de energie was er. Het verhaal was compleet. De grote witte vlek was ingevuld.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Maar Messi stopte niet.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        In 2026 is hij 38 jaar oud. Geen enkele sprinter op dit niveau presteert nog op 38. Maar Messi is geen sprinter. Hij is een voetballer die de ruimte beheert, het spel leest als een schaakmeester die drie zetten vooruitdenkt. En dat soort intelligentie rot niet weg met de jaren.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        De vraag is niet of Messi het mentaal aankan. De vraag is of Argentinië, zonder dezelfde generatie ploeggenoten als in 2022, opnieuw kan presteren. En of zijn lichaam de zwaarste duels, de knock-outfase, eventuele verlengingen, kan overleven.
      </p>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Als het lukt, schrijven we een sprookje dat we generaties lang navertellen.
        </p>
      </blockquote>

      <figure className="my-8 bg-[#0d0d0d] border border-themed rounded-xl p-6">
        <blockquote className="mb-4">
          <p className="text-slate-200 text-lg leading-relaxed italic">
            &ldquo;Dit is het mooiste wat ik ooit heb meegemaakt in het voetbal. Ik heb er zo lang van gedroomd. Nu wil ik er gewoon van genieten.&rdquo;
          </p>
        </blockquote>
        <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
          Lionel Messi, na het winnen van het WK 2022 in Qatar
        </figcaption>
      </figure>

      <h2 className="font-display text-3xl text-white mb-4">Ronaldo: het eeuwige verzet</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Cristiano Ronaldo heeft één grootste vijand: de eindigheid van alles. Terwijl de wereld hem stap voor stap afschreef, bleef hij scoren. In Saudi-Arabië, voor Al-Nassr, verpulverde hij records die niemand meer bijhield. Niet voor de roem, maar voor de statistieken. En voor de weigering om weg te gaan.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Voor Portugal is de situatie interessant. De nieuwe generatie is er: Félix, Leão, Vitinha, Conceição. Ze zijn goed. Misschien wel beter dan de generatie van Moutinho en Nani. Maar Ronaldo trekt het team altijd naar zich toe. Hij eist balbezit, hij eist positie, hij eist het verhaal.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Of dat een last of een cadeau is voor Portugal op WK 2026? Dat hangt af van de loting, van de tegenstanders, van hoe Bondscoach Martinez het aanpakt. In een lichte groep kan Ronaldo in zijn eigen tempo functioneren. In een zware groep, tegen landen die hoog drukken en snel schakelen, wordt het lastiger.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Maar vergis je niet: als er één speler is die in een beslissend moment nog altijd een goal kan maken, is het Ronaldo. Dat reflexen vervagen niet snel, ook niet op 41. En zijn directe vrije trap? Lees hoe Messi{' '}
        <Link href={`${blogBase}/messi-vrije-trappen-rivelino`} className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">jaagt op het record van Rivelino</Link>.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Ochoa: de onverwoestbare bewaarder</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Van de drie is Ochoa misschien wel de meest poëtische aanwezigheid op dit WK. Geen wereldkampioen, geen Ballon d&apos;Or. Maar voor Mexico is hij iets wat Messi en Ronaldo voor hun landen misschien nooit werden: een constante. Een rots.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        In 2014 stopte hij in Natal een schot van Neymar dat niemand miste, en Mexico ontsnapte met 0-0 tegen gastland Brazilië. Het internet barstte los. Ochoa werd een meme, een held, een icoon. In 2018 was hij er weer. In 2022 ook.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Als hij fit genoeg is om te spelen in 2026, is Ochoa 40 jaar oud. Een doelman van 40 op een WK klinkt onmogelijk, maar doelmannen kunnen lang door. Edwin van der Sar hield door tot zijn 41e. Dino Zoff werd wereldkampioen op zijn 40e.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        Ochoa is meer dan een keeper voor Mexico. Hij is continuïteit in een ploeg die altijd wisselvallig was. Zijn naam alleen al op de teamlijst geeft het team rust.
      </p>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Ochoa is een constante in een ploeg die altijd wisselvallig was. Een rots.
        </p>
      </blockquote>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Hoe ver komen Argentinië, Portugal en Mexico?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in en zie live wie de knock-outfase haalt. Deel je bracket via één link.
        </p>
        <Link href={sim} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm">
          Open de simulator
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      <h2 className="font-display text-3xl text-white mb-4">Wat we nooit meer zullen zien</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Er is een generatie voetbalfans die Messi en Ronaldo altijd heeft gekend. Ze waren er al vóór de smartphone, vóór sociale media, vóór de tijd dat elke goal al na drie seconden viral ging. Ze waren zo vanzelfsprekend aanwezig dat het einde altijd leek te zijn uitgesteld.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Dat uitstel loopt nu af.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Na WK 2026 is het definitief voorbij. Geen zevende keer. Geen reünie. Wat we in de zomer van 2026 zien, is de laatste keer dat deze drie mannen op hetzelfde toernooi staan. Tegelijk. In dezelfde weken.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Dat is iets om bij stil te staan. Niet als verdriet, maar als bewustwording: we leven midden in een historisch moment. Geen documentaire achteraf, geen nostalgie. Nu, live, terwijl het gebeurt.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Op 19 juli 2026 wordt de winnaar gekroond in het MetLife Stadium in New Jersey. Of Messi, Ronaldo en Ochoa dan nog meedoen of al thuis zitten: het doet er niet toe. Wat telt, is dat ze er waren. Zes keer. Dat hebben we meegemaakt.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-themed p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Schrijf zelf de geschiedenis
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Strandt Messi in de groepsfase of bereikt hij de finale? Simuleert Ochoa Mexico naar de kwartfinale? Simuleer alle scenario&apos;s op ScorePath en deel je bracket via één link.
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
