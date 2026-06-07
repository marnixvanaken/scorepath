import Link from 'next/link';

export function CourtoisCleanSheetsContent() {
  return (
    <article>

      <p className="text-slate-300 text-lg leading-relaxed mb-6">
        Een clean sheet op een Wereldkampioenschap is het kostbaarste wat een keeper kan produceren. Niet vanwege de statistiek zelf, maar vanwege wat er voor nodig is: negentig minuten concentratie, een verdediging die staat, en de discipline om in een toernooi vol aanvallers geen fout te maken. Thibaut Courtois heeft dit systeem doorgezien als geen ander.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        In 2026 wil hij het voor de geschiedenisboeken doen.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">De waarde van nul</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        In een sport die draait om scoren, zijn keepers de enige spelers wiens beste prestatie een nul is. Geen goals toegestaan. Geen sporen op het scorebord. Het klinkt passief, maar het vergt actief ingrijpen: een redding in de 88e minuut, een goede positie bij een gevaarlijke standaardsituatie, een stem die de linie op de juiste afstand houdt.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Op een WK, waar elke tegenstander kwaliteitsspelers heeft en elke wedstrijd een eliminatiedreiging kan worden, is een clean sheet-reeks nog waardevoller. De keepers die dit het meest consistent deden in de WK-geschiedenis zijn stuk voor stuk legendarische namen.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Courtois wil zijn naam bij die groep voegen.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Courtois op het WK</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Courtois speelde zijn eerste WK in 2014 als 22-jarige. België reikte tot de kwartfinale, Courtois presteerde sterk en vertrok als een van de beter bewaard gebleven keepers van het toernooi. In 2018 voegde hij een individuele WK-trofee toe: de Gouden Handschoen als beste keeper, met België op de derde plaats.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        In 2022 liep het anders. België, inmiddels op zijn retour als generatie, verliet het toernooi vroeg. Courtois speelde, maar had weinig aan zijn statistieken toe te voegen.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        WK 2026 is zijn vierde. En met een nieuwe Belgische generatie in opbouw heeft hij voor het eerst in jaren weer een elftal dat meer dan één ronde ver kan komen.
      </p>

      <div className="my-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#141414]">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Courtois op het WK</p>
        </div>
        {([
          { year: '2014', result: 'Kwartfinale', award: '' },
          { year: '2018', result: '3e plaats', award: 'Gouden Handschoen' },
          { year: '2022', result: 'Groepsfase', award: '' },
          { year: '2026', result: '?', award: 'Kans op record' },
        ] as const).map(({ year, result, award }) => (
          <div key={year} className="flex items-center gap-4 px-5 py-3 border-b border-[#0f0f0f] last:border-0">
            <span className="text-slate-500 text-sm font-tabular w-10">{year}</span>
            <span className="text-white text-sm font-semibold flex-1">{result}</span>
            {award && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-widest">
                {award}
              </span>
            )}
          </div>
        ))}
      </div>

      <figure className="my-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6">
        <blockquote className="mb-4">
          <p className="text-slate-200 text-lg leading-relaxed italic">
            &ldquo;De Gouden Handschoen in 2018 was mooi, maar ik wil méér. Een WK-finale halen met België — dat is waarvoor ik elke dag train.&rdquo;
          </p>
        </blockquote>
        <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
          Thibaut Courtois, keeper van België en Real Madrid (vrij geciteerd)
        </figcaption>
      </figure>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Een keeper wordt niet herinnerd aan zijn reddingen, maar aan het scorebord. Courtois wil dat scorebord leeg houden.
        </p>
      </blockquote>

      <h2 className="font-display text-3xl text-white mb-4">Wat België nodig heeft</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Om Courtois zijn record-kans te geven, moet België diep gaan. De groepsfase moet zonder al te veel problemen worden doorstaan. Daarna volgen de knock-outronden, waar elke wedstrijd potentieel de laatste is.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        De nieuwe generatie rond spelers als Théo Zirkzee, Amadou Onana en Arthur Vermeeren biedt meer dynamiek dan de ploeg van Hazard, Lukaku en De Bruyne op hun beste dagen deed. Fitter, sneller, fysiek veelzijdiger. Maar het grote toernooigevoel ontbreekt nog.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        Courtois heeft dat gevoel vier keer aan den lijve ondervonden. In 2026 is hij de rots waarop de jongere generatie kan steunen. En als zijn doel schoon blijft, schrijft hij de statistieken mee. Hij is niet de enige met een record in het vizier:{' '}
        <Link href="/blog/mbappe-jaagt-klose" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Mbappé jaagt op Klose</Link>
        {' '}en{' '}
        <Link href="/blog/messi-vrije-trappen-rivelino" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi op het record van Rivelino</Link>
        . WK 2026 wordt een toernooi vol historische ambities.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Hoe ver komt België in jouw scenario?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in en speel de bracket door. Hoeveel clean sheets geef jij Courtois?
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

      <h2 className="font-display text-3xl text-white mb-4">Een nul op het bord, voor eeuwig</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Keepers worden zelden herinnerd op de manier die spitsen worden herinnerd. Messi heeft zijn goals, Mbappé zijn finalehat-trick. Maar elke keeper die een WK won, weet dat zijn naam verbonden blijft aan het aantal keren dat hij zijn doel ongeschonden hield op het grootste podium ter wereld.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Courtois heeft alles in huis om dat podium te claimen. Groot, dominant in de lucht, uitstekend met zijn voeten en ervaren genoeg om het niet zomaar weg te geven. In 2026 krijgt hij zijn kans.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-[#1a1a1a] p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Laat België ver komen
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Simuleer alle groepen en de volledige bracket op ScorePath. Vul uitslagen in, zie live de standen en deel je voorspelling via één link.
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
