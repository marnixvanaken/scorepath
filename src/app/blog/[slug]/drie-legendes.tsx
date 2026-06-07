import Link from 'next/link';

export function DrieLegendesContent() {
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
          <div key={label} className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-4 text-center">
            <p className="font-display text-4xl text-orange-500 leading-none mb-1">{num}</p>
            <p className="text-white font-semibold text-xs">{label}</p>
            <p className="text-slate-600 text-[10px] mt-0.5">{sub}</p>
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
        <Link href="/blog/messi-meeste-wk-wedstrijden" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi en het record van Matthäus</Link>.
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

      <figure className="my-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6">
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
        <Link href="/blog/messi-vrije-trappen-rivelino" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">jaagt op het record van Rivelino</Link>.
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
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Hoe ver komen Argentinië, Portugal en Mexico?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in en zie live wie de knock-outfase haalt. Deel je bracket via één link.
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

      <div className="rounded-2xl bg-[#0d0d0d] border border-[#1a1a1a] p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Schrijf zelf de geschiedenis
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Strandt Messi in de groepsfase of bereikt hij de finale? Simuleert Ochoa Mexico naar de kwartfinale? Simuleer alle scenario&apos;s op ScorePath en deel je bracket via één link.
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
