import Link from 'next/link';

export function TimPayneContent() {
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
        <Link href="/blog/vs-iran-wk-2026" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">VS en Iran een wedstrijd</Link>
        {' '}die de rest van het toernooi overschaduwde — niet vanwege de score, maar vanwege wat er buiten het veld speelde.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Niemand van hen was op het moment van het incident de beroemdste naam op het veld. Maar ze werden het gespreksonderwerp. Het WK trekt de spotlight op wie het verdient, ongeacht de vorige vier jaar.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        Tim Payne is de versie van 2026 van dat fenomeen. En hij zal niet de laatste zijn.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Welk land verrast jou op WK 2026?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in en zie live wie de knock-outfase haalt. Welke underdog geef jij de meeste kans?
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

      <div className="rounded-2xl bg-[#0d0d0d] border border-[#1a1a1a] p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Welke underdog pik jij?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Simuleer alle groepen en de bracket op ScorePath. Vul uitslagen in, zie live de standen en deel je scenario via één link.
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
