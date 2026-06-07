import Link from 'next/link';

export function VsIranContent() {
  return (
    <article>

      <p className="text-slate-300 text-lg leading-relaxed mb-6">
        Het is 21 juni 1998. Lyon, Stade de Gerland. De VS en Iran betreden het veld voor een wedstrijd die niets met voetbal te maken had. Of alles. De politieke spanning tussen de twee landen was op dat moment zo hoog dat het toernooi overwoog veiligheidsprotocollen op te voeren. Wat er daarna gebeurde, schreef de geschiedenis.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        In de zomer van 2026 kan het opnieuw. En dit keer speelt de VS thuis.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Lyon, 1998: bloemen en een winnaar</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Vóór de aftrap overhandigden de Iraanse spelers bloemen aan hun Amerikaanse tegenstanders. Een gebaar van vrede op een podium van politieke vijandschap. De beelden gingen de wereld over. Journalisten schreven columns. Diplomaten zeiden niets, maar iedereen keek.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Iran won met 2-1 via twee doelpunten van Estili en Mahdavikia. De Iraniërs vierden het als een nationale overwinning, ver buiten het voetbal. De Amerikanen, onder bondscoach Steve Sampson, vertrokken vroeg uit het toernooi. De wedstrijd bleef in het collectieve geheugen hangen als meer dan sport.
      </p>

      <div className="my-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-5">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">Wedstrijdgegevens · 21 juni 1998</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {([
            { label: 'Uitslag', value: 'Iran 2–1 VS' },
            { label: 'Locatie', value: 'Lyon, Frankrijk' },
            { label: 'Toeschouwers', value: '44.000' },
            { label: 'Doelpunten', value: "Estili 40', Mahdavikia 84', McBride 87'" },
          ] as const).map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">{label}</p>
              <p className="text-white text-sm font-semibold leading-snug">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <figure className="my-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6">
        <blockquote className="mb-4">
          <p className="text-slate-200 text-lg leading-relaxed italic">
            &ldquo;Je speelt voor je land, maar je weet dat de wereld kijkt om meer dan het voetbal. Toch is het veld de plek waar je gewoon mensen bent.&rdquo;
          </p>
        </blockquote>
        <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
          Alexi Lalas, VS-international 1998 (vrij geciteerd)
        </figcaption>
      </figure>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Bijna dertig jaar later zijn de politieke verhoudingen niet simpeler geworden.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">WK 2026: de VS is gastland én deelnemer</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het WK 2026 wordt gespeeld in de VS, Canada en Mexico. De drie gastlanden plaatsen zich automatisch voor het toernooi. Dat betekent dat de VS gegarandeerd speelt in volle Amerikaanse stadions, voor een thuispubliek dat na 1994 eindelijk weer een WK in eigen land beleeft.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Iran kwalificeert zich traditioneel via de Aziatische zone, en doet dat in de meeste cycli ook. Als ze in 2026 opnieuw deelnemen, bestaat de kans dat de loting hen en de VS in dezelfde groep plaatst.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        FIFA laat de loting in principe willekeurig verlopen. Maar er zijn procedures om bepaalde politiek gevoelige confrontaties in de groepsfase te vermijden. Of de VS en Iran daarvoor in aanmerking komen, is een vraag die FIFA liever niet publiekelijk beantwoordt.
      </p>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Voetbal trekt zich niets aan van buitenlandse politiek. Totdat de twee landen dezelfde groep delen.
        </p>
      </blockquote>

      <h2 className="font-display text-3xl text-white mb-4">Wat als het toch gebeurt</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Een VS-Iran in 2026 zou een andere lading hebben dan in 1998. De geopolitieke context is veranderd, maar het symbolische gewicht is misschien groter. Een volledig gevuld Amerikaanse stadion, tienduizenden fans, nationale vlaggen en spreekkoren: dit zou meer dan een voetbalwedstrijd zijn.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Tegelijkertijd laat de sportwereld keer op keer zien dat atleten de context kunnen overstijgen. In 1998 gaven Iraniërs en Amerikanen elkaar na de wedstrijd een hand. Sport lost conflicten niet op, maar het kan wel een ander gezicht tonen. Zulke momenten zijn ook de motor achter het verhaal van{' '}
        <Link href="/blog/tim-payne-viral-wk" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Tim Payne</Link>
        {' '}— een speler die van 4.000 naar een miljoen volgers ging, precies omdat het WK meer is dan een wedstrijd.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        En voetballend gezien? De VS heeft een talentvolle generatie klaar staan: McKennie, Pulisic, Weah, Reyna. Iran speelt compact en gevaarlijk op de counter. Tactisch zou het een interessante duelmatch zijn.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Beland de VS en Iran in dezelfde groep?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in en zie live welke landen de knock-outfase halen. Deel je bracket via één link.
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

      <h2 className="font-display text-3xl text-white mb-4">Meer dan een wedstrijd</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Of het nu in de groepsfase of de knock-outfase is: een VS-Iran op WK 2026 zou onmiddellijk de meest besproken wedstrijd van het toernooi zijn. Niet alleen omdat beide ploegen goed voetbal spelen, maar omdat de wereld ernaar kijkt met ogen die verder reiken dan het scorebord.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        In 1998 gaven Iraniërs bloemen. In 2026? We weten het niet. Maar we weten dat de wereld kijkt.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-[#1a1a1a] p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Schrijf jouw scenario
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Hoe ver komen de VS en Iran? Simuleer alle 12 groepen en zie live wie doorgaat naar de knock-outfase. Deel je bracket via één link.
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
