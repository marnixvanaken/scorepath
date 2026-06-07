import Link from 'next/link';

export function YamalDubbelContent() {
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
        <Link
          href="/wk-2026"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
        >
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
        <Link href="/blog/drie-legendes-wk-2026" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi en Ronaldo</Link>
        {' '}— die in 2026 allebei hun zesde WK spelen — legden de lat voor longeviteit ongelooflijk hoog. Yamal heeft de aanleg om dat ook te doen. Maar eerst: de zomer van 2026. Eerst: de kans op een record dat niemand hem kan afpakken.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-[#1a1a1a] p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Schrijf Yamal&apos;s verhaal
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Hoe ver komt Spanje in jouw WK 2026? Simuleer alle groepen en de bracket op ScorePath. Deel je voorspelling via één link.
        </p>
        <Link
          href="/wk-2026"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm"
        >
          Start de simulator
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

    </article>
  );
}
