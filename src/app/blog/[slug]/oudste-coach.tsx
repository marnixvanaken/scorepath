import Link from 'next/link';

export function OudsteCoachContent() {
  return (
    <article>

      <p className="text-slate-300 text-lg leading-relaxed mb-6">
        Terwijl het debat altijd gaat over spelers, is er een andere leeftijdsgrens die zelden wordt besproken: die van de coaches. Op welke leeftijd zet een man voor het laatst zijn handtekening onder de tactische opstelling van een nationaal elftal op een Wereldkampioenschap? En wie mikt er in 2026 op het record van oudste coach ooit?
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        De vraag levert verrassende namen op. En een paar coaches die bewijzen dat voetbalintelligentie niet vervalt.
      </p>

      <h2 className="font-display text-3xl text-white mb-4">Oscar Tabárez: de standaard</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Oscar Tabárez, oud-bondscoach van Uruguay, is de maatstaf. Hij coachte zijn land op het WK van 2018 in Rusland op 71-jarige leeftijd, terwijl hij kampte met een progressieve neurologische aandoening die hem verplichtte op een rollator de technische zone te betreden. Uruguay reikte tot de kwartfinale.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Tabárez bleef daarna nog jaren actief als bondscoach, tot zijn ontslag in 2021. Zijn aanwezigheid op het WK van 2018 werd wereldwijd bewonderd: niet als curiositeit, maar als bewijs dat tactisch inzicht en leiderschapskwaliteit geen vervaldatum hebben.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Zijn leeftijd op dat WK is de informele lat. In 2026 zijn er coaches die hem kunnen benaderen of overstijgen.
      </p>

      <div className="my-8 grid grid-cols-3 gap-3">
        {([
          { num: '71', label: 'jaar', sub: 'Tabárez in 2018' },
          { num: '4', label: 'WKs', sub: 'als Uruguay-bondscoach' },
          { num: '16', label: 'jaar', sub: 'zijn bondscoach-periode' },
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
            &ldquo;Leeftijd is een getal. De passie voor het spel en de wil om te leren bepalen of je klaar bent, niet het aantal jaren.&rdquo;
          </p>
        </blockquote>
        <figcaption className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="w-4 h-px bg-slate-700 block flex-shrink-0" />
          Oscar Tabárez, bondscoach Uruguay 2006–2021
        </figcaption>
      </figure>

      <h2 className="font-display text-3xl text-white mb-4">Wat oudere coaches anders doen</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Jonge coaches brengen energie, moderne persdruk en data-gedreven voorbereiding. Oudere coaches brengen iets anders: ervaring met spelers die in paniek raken, met besturen die ingrijpen, met journalisten die de kleedkamer proberen te destabiliseren. Ze hebben dit al gezien. Meerdere keren.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Op een toernooi als het WK, waar de druk per wedstrijd exponentieel stijgt en elke beslissing nationaal nieuws wordt, is die rust meer waard dan welk tactisch systeem dan ook. Een coach die al weet hoe hij omgaat met een kleedkamer na een verloren halve finale, heeft een voorsprong op iemand die het voor het eerst meemaakt.
      </p>

      <blockquote className="border-l-2 border-orange-500 pl-5 my-8">
        <p className="text-slate-200 text-xl font-semibold leading-snug italic">
          Een WK winnen als coach op hoge leeftijd is geen wonder. Het is het resultaat van tientallen jaren leren hoe mensen werken onder druk.
        </p>
      </blockquote>

      <h2 className="font-display text-3xl text-white mb-4">Wie in 2026 het record kan aanvechten</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het veld van kandidaten voor oudste coach op WK 2026 hangt af van wie er wordt aangesteld in de aanloop naar het toernooi. Bondscoaches wisselen snel, zeker na mislukte kwalificatiecampagnes. Maar enkele landen hebben de gewoonte om ervaren coaches aan te stellen die al ver in de zestig zijn.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Afrikaanse en Aziatische federaties doen dit regelmatig: een Europese of Zuid-Amerikaanse veteraan als projectmanager voor vier jaar, met als doel het toernooi halen en prestige opbouwen. Die coaches zijn soms al over de zeventig als het WK daadwerkelijk begint.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-8">
        Het record van Tabárez staat echter pas echt in gevaar als een grote voetbalnatie besluit een oudere naam aan te stellen. En dat is historisch gezien zeldzaam, maar niet onmogelijk.
      </p>

      <div className="my-10 rounded-2xl bg-[#0d0d0d] border border-orange-500/20 p-7">
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
          Simuleer het zelf
        </p>
        <p className="text-white font-bold text-xl leading-snug mb-2">
          Welke landen halen de knock-outfase?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Vul alle groepsuitslagen in en zie live wie doorgaat. Welke bondscoach geeft jij de meeste kans?
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

      <h2 className="font-display text-3xl text-white mb-4">Leeftijd als verhaal</h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-5">
        Het WK levert altijd verhalen op buiten het veld. Niet alleen coaches tarten de grenzen van leeftijd: ook{' '}
        <Link href="/blog/drie-legendes-wk-2026" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">Messi, Ronaldo en Ochoa spelen hun zesde WK</Link>
        {' '}en zetten daarmee een ongeëvenaard record neer. De oudste coach is er een ander verhaal uit. Niet vanwege de leeftijd zelf, maar vanwege wat die leeftijd vertegenwoordigt: decennia van voetbalintelligentie, gecondenseerd in negentig minuten besluitvorming per wedstrijd.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        Als er in 2026 een coach de technische zone instapt die ouder is dan Tabárez was in 2018, is dat het verhaal van het toernooi. En de statistiek die iedereen met hem verbindt: niet zijn systeem, niet zijn formatie, maar zijn leeftijd op de dag van de finale.
      </p>

      <div className="rounded-2xl bg-[#0d0d0d] border border-[#1a1a1a] p-7 text-center">
        <p className="font-display text-3xl text-white mb-3">
          Welke coach wint WK 2026?
        </p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Simuleer alle groepen en de bracket op ScorePath. Vul uitslagen in, zie live de standen en deel je voorspelling.
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
