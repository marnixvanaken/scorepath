import Link from 'next/link';

export function MbappeKloseContent() {
  return (
    <article>

      <p className="text-slate-300 text-lg leading-relaxed mb-6">
        Miroslav Klose scoorde 16 keer op een Wereldkampioenschap. Dat record staat al meer dan tien jaar, en niemand is er in de buurt gekomen. Tot nu. Kylian Mbappé begint aan WK 2026 met 12 WK-doelpunten op zijn naam. Hij is 27 jaar oud, in zijn absolute top en hongerig voor meer.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        De vraag is niet meer of Mbappé het kan. De vraag is of hij het dit toernooi doet.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Wat Klose deed in 18 jaar</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Miroslav Klose speelde zijn eerste WK in 2002 voor Duitsland en scoorde meteen vijf keer. In 2006 deed hij het opnieuw: vijf goals, dit keer in eigen land. In 2010 vier doelpunten, en in 2014, op zijn vierde en laatste WK, scoorde hij er nog twee. Inclusief zijn historische goal tegen Brazilië in de halve finale.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Totaal: 16 goals. Verspreid over vier toernooien, 18 jaar na zijn debuut. Klose was geen sprinter, geen technisch wonderkind. Hij was een timing-specialist, een kopbalkunstenaar, een speler die zich altijd op de juiste plek bevond.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Na Klose staan Ronaldo (8 goals) en Just Fontaine (13 in één toernooi, 1958) in de geschiedenisboeken. Messi sloot af op 13 — op zijn{' '}
        <Link href="/blog/drie-legendes-wk-2026" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">zesde WK</Link>
        {' '}kan hij die teller nog ophogen. Niemand heeft het record serieus bedreigd, totdat Mbappé in Qatar 2022 verscheen.
      </p>

      <div className="my-8 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#1a1a1a]">
              <th className="text-left text-[10px] font-bold text-slate-600 uppercase tracking-widest pb-3 pr-4">#</th>
              <th className="text-left text-[10px] font-bold text-slate-600 uppercase tracking-widest pb-3 pr-4">Speler</th>
              <th className="text-left text-[10px] font-bold text-slate-600 uppercase tracking-widest pb-3 pr-4">Land</th>
              <th className="text-right text-[10px] font-bold text-slate-600 uppercase tracking-widest pb-3">Goals</th>
            </tr>
          </thead>
          <tbody>
            {([
              { rank: '1', name: 'Miroslav Klose', country: 'Duitsland', goals: '16', highlight: false },
              { rank: '2', name: 'Ronaldo Nazário', country: 'Brazilië', goals: '15', highlight: false },
              { rank: '3', name: 'Gerd Müller', country: 'Duitsland', goals: '14', highlight: false },
              { rank: '4', name: 'Just Fontaine', country: 'Frankrijk', goals: '13', highlight: false },
              { rank: '=4', name: 'Lionel Messi', country: 'Argentinië', goals: '13', highlight: false },
              { rank: '6', name: 'Kylian Mbappé', country: 'Frankrijk', goals: '12*', highlight: true },
            ] as const).map(({ rank, name, country, goals, highlight }) => (
              <tr key={name} className={`border-b border-[#141414] ${highlight ? 'text-orange-400' : 'text-slate-300'}`}>
                <td className="py-2.5 pr-4 text-slate-600 text-xs">{rank}</td>
                <td className={`py-2.5 pr-4 font-semibold text-sm ${highlight ? 'text-orange-400' : 'text-white'}`}>{name}</td>
                <td className="py-2.5 pr-4 text-slate-500 text-xs">{country}</td>
                <td className={`py-2.5 text-right font-bold tabular-nums ${highlight ? 'text-orange-400' : 'text-slate-300'}`}>{goals}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[10px] text-slate-700 mt-2">* na 2 WKs, voor aanvang WK 2026</p>
      </div>

      <figure className="my-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6">
        <blockquote className="mb-4">
          <p className="text-slate-200 text-lg leading-relaxed italic">
            &ldquo;Records zijn er om gebroken te worden. Dat is de schoonheid van sport. Als het Mbappé is die het doet, dan heeft hij het verdiend.&rdquo;
          </p>
        </blockquote>
        <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
          Miroslav Klose, meervoudig WK-topscorer Duitsland
        </figcaption>
      </figure>

      <h2 className="font-display text-3xl text-white mb-4">Mbappé in Rusland en Qatar</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        In 2018, als 19-jarige, scoorde Mbappé vier keer voor wereldkampioen Frankrijk. In 2022 verbeterde hij zichzelf radicaal: acht goals, goed voor de Gouden Schoen. In de finale alleen al drie. Mbappé verloor die finale op penalty&apos;s, maar zijn persoonlijke prestatie was ongekend.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Twaalf goals in twee WK&apos;s. Alleen Klose staat hoger op de historische ranglijst met zijn 16. En Klose bereikte dat over vier toernooien.
      </p>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Klose bouwde zijn record in 18 jaar op. Mbappé staat al op 12 na twee WK&apos;s. Het tempo is ongekend.
        </p>
      </blockquote>

      <h2 className="font-display text-3xl text-white mb-4">De rekensom voor 2026</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Mbappé heeft vier goals nodig om Klose te evenaren. Vijf om het record te breken. Als Frankrijk de halve finale haalt, wat voor een sterk elftal als Frankrijk haalbaar is, speelt hij minimaal zes wedstrijden. Gemiddeld twee goals per WK-wedstrijd in 2022: de kans is reëel.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Maar records breek je niet zomaar. Klose werd nooit de snelste scorer, maar wel de meest consistente. Het vergt toernooilot, een goed elftal om hem heen en een keeper die een slechte dag heeft op het juiste moment. Mbappé kan het. Maar het is geen garantie.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        Wat wél zeker is: als hij in 2026 opnieuw topscorer wordt en Frankrijk ver komt, staat het record binnen handbereik. En dan kan het ook in 2030 nog. Mbappé heeft de tijd mee.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Hoe ver komt Frankrijk in jouw scenario?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in, zie live de standen en speel de bracket door. Hoe ver scoor jij Mbappé?
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

      <h2 className="font-display text-3xl text-white mb-4">Een record voor de eeuwigheid</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Klose&apos;s record leek onbreekbaar. Niet omdat er geen betere spitsen kwamen, maar omdat de combinatie van kwaliteit, geluk en toernooilot zelden allemaal tegelijk klopt over meerdere WK&apos;s.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Mbappé is de eerste speler in decennia die het tempo heeft om dit te doen. Zijn eerste twee WK&apos;s waren historisch. Zijn derde kan legendarisch zijn.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-[#1a1a1a] p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Schrijf jouw scenario
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Hoe ver komt Mbappé met Frankrijk? Simuleer alle groepen en de bracket op ScorePath en deel je voorspelling via één link.
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
