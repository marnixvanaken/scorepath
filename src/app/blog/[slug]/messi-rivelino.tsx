import Link from 'next/link';

export function MessiRivelinoContent() {
  return (
    <article>

      <p className="text-slate-300 text-lg leading-relaxed mb-6">
        Er zijn goals, en dan zijn er vrije trappen. Een vrije trap is meer dan een technisch moment: het is een stilstaand beeld in een wedstrijd die anders nooit stilstaat. Het publiek houdt de adem in. De muur staat. De keeper bereidt zich voor. En dan beslist één speler alles met zijn voet.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Rivelino was de eerste grote meester van die discipline op een WK. Messi is degene die zijn erfenis kan overnemen.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Rivelino: de explosie van links</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Roberto Rivelino speelde voor Brazilië op de WK&apos;s van 1970 en 1974. Hij was niet de snelste, niet de grootste. Maar zijn linkervoet was een wapen dat keepers van zijn generatie niet hadden gezien. De kracht waarmee hij de bal raak schoot, gecombineerd met een onverwachte rotatie, maakte zijn vrije trappen bijna onhoudbaar.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        In 1970 won hij de wereldtitel met Brazilië in de legendarische ploeg met Pelé, Jairzinho en Tostão. Zijn vrije trappen waren een vast onderdeel van het aanvallende arsenaal. In 1974 was Brazilië minder sterk, maar Rivelino bleef gevaarlijk vanuit standaardsituaties.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Zijn WK-record voor directe vrije trap doelpunten heeft decennialang standgehouden als referentie voor wie het beste was op stilstaande situaties op het grootste podium.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Messi en de vrije trap als kunstwerk</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Messi heeft zijn WK-vrije trappen lang laten liggen. In zijn beginjaren als WK-speler miste hij standaardsituaties waar anderen op rekenden. De vrije trap was niet zijn wapen van keuze, niet het moment waarop de ploeg hem opzocht.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Dat veranderde. Met de jaren werd Messi&apos;s vrije trap preciezer, gecontroleerder en gevaarlijker. In Qatar 2022 scoorde hij meerdere keren vanuit stilstand. Zijn techniek, een lage, gecurvde bal richting de verre hoek, paste perfect bij zijn stijl: schijnbaar rustig, dan onverdedigbaar.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
      <div className="my-8 grid grid-cols-3 gap-3">
        {([
          { num: '60+', label: 'vrije trap goals', sub: "Messi's carrière bij clubs" },
          { num: '1970', label: 'en 1974', sub: "Rivelino's WK-finales" },
          { num: '2022', label: 'Qatar finale', sub: 'Messi scoorde vrije trap' },
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
            &ldquo;Een vrije trap is een moment van stilte in een wedstrijd vol lawaai. Wie dat moment beheerst, beheerst het spel.&rdquo;
          </p>
        </blockquote>
        <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
          Roberto Rivelino, Braziliaans legende en WK-kampioen 1970
        </figcaption>
      </figure>

        Op zijn vijfde WK in 2022 begon het te komen. Op zijn zesde WK in 2026 heeft hij de kans om de statistieken definitief naar zich toe te trekken. En dat zesde WK is op zichzelf al historisch: lees waarom in{' '}
        <Link href="/blog/drie-legendes-wk-2026" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi, Ronaldo en Ochoa: drie legendes tegelijk</Link>.
      </p>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Rivelino schoot met kracht. Messi kurvt met precisie. Twee stijlen, één bestemming: de statistieken.
        </p>
      </blockquote>

      <h2 className="font-display text-3xl text-white mb-4">De kans in 2026</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Messi speelt zijn zesde WK. Als Argentinië diep gaat in het toernooi, speelt hij minimaal zes en mogelijk zeven wedstrijden. Bij elk duel liggen er vrije trappen te wachten, afhankelijk van hoe tegenstanders hem verdedigen.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Tegenstanders die Messi kennen, geven hem liever geen vrije trap in gevaarlijke posities. Maar zijn reputatie dwingt verdedigers tot fouten. Elke overtreding op hem buiten de zestien is een potentiële kans.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        Als hij scoort op WK 2026 vanuit een vrije trap, op zijn zesde toernooi, na een loopbaan die al tientallen directe vrije trap goals heeft opgeleverd in clubverband: dan is dat niet zomaar een goal. Dan is het een moment dat vijftig jaar na Rivelino de lijn trekt tussen twee generaties.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Hoe ver schieten Messi en Argentinië in 2026?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in en zie live wie de knock-outfase haalt. Elke ronde die Messi speelt is een nieuwe kans vanuit stilstand.
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

      <h2 className="font-display text-3xl text-white mb-4">De erfenis van de vrije trap</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Rivelino&apos;s naam wordt niet altijd als eerste genoemd als het over de grote Brazilianen gaat. Pelé, Ronaldo, Ronaldinho, Neymar: zij domineren de gesprekken. Maar onder keepers uit de jaren zeventig is Rivelino&apos;s naam een waarschuwing.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Messi is inmiddels die waarschuwing geworden. En in 2026 kan hij het bewijs leveren dat zijn vrije trap op het allerhoogste niveau, op het meest cruciale moment, het beste is dat de WK-geschiedenis heeft gezien.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-[#1a1a1a] p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Schrijf Argentinië&apos;s route
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Simuleer alle 12 groepen en de volledige bracket op ScorePath. Vul uitslagen in, zie live de standen en deel je voorspelling via één link.
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
