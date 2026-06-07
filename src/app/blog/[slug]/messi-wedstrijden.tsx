import Link from 'next/link';

export function MessiWedstrijdenContent() {
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

      <div className="my-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#141414]">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Messi&apos;s WK-wedstrijden per toernooi</p>
        </div>
        {([
          { year: '2006', matches: 5, result: 'Kwartfinale' },
          { year: '2010', matches: 5, result: 'Kwartfinale' },
          { year: '2014', matches: 7, result: 'Finale' },
          { year: '2018', matches: 4, result: 'Achtste finale' },
          { year: '2022', matches: 7, result: 'Kampioen' },
        ] as const).map(({ year, matches, result }) => (
          <div key={year} className="flex items-center gap-4 px-5 py-3 border-b border-[#0f0f0f] last:border-0">
            <span className="text-slate-500 text-sm w-10 font-tabular">{year}</span>
            <div className="flex gap-1">
              {Array.from({ length: matches }).map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-orange-500/60" />
              ))}
            </div>
            <span className="text-slate-400 text-xs ml-1">{matches} wedstrijden</span>
            <span className="ml-auto text-[10px] font-bold text-slate-600 uppercase tracking-widest">{result}</span>
          </div>
        ))}
        <div className="flex items-center gap-4 px-5 py-3 bg-[#0a0a0a]">
          <span className="text-white font-bold text-sm w-10">Tot.</span>
          <span className="font-display text-2xl text-orange-500">28</span>
          <span className="text-slate-400 text-sm">wedstrijden — meer dan wie ook ooit</span>
        </div>
      </div>

      <figure className="my-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6">
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
        <Link href="/blog/drie-legendes-wk-2026" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">zesde WK tegelijk</Link>
        {' '}— een historisch moment dat we nooit meer zullen meemaken.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Hoeveel wedstrijden speelt Messi in jouw bracket?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in en zie hoe ver Argentinië komt. Elke ronde die Messi speelt is nieuwe geschiedenis.
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

      <h2 className="font-display text-3xl text-white mb-4">Een getal dat groeit terwijl we kijken</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Matthäus bouwde zijn record op in een tijdperk zonder sociale media, zonder live statistieken en zonder de dagelijkse vraag: is dit zijn laatste WK? Messi speelt elke wedstrijd met die context op zijn schouders.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        En hij speelt toch. Dat is misschien wel het meest indrukwekkende van al.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-[#1a1a1a] p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Hoever komt Argentinië?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Simuleer elk scenario op ScorePath. Vul uitslagen in, zie live de standen en deel je bracket via één link.
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
