import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { SITE_URL, SITE_NAME } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Privacyverklaring',
  description: `Privacyverklaring van ${SITE_NAME} — hoe wij omgaan met persoonsgegevens en cookies.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 sm:px-10 py-5 border-b border-[#141414]">
        <div className="max-w-3xl mx-auto">
          <Link href="/"><Logo size="sm" /></Link>
        </div>
      </header>

      <main className="flex-1 px-6 sm:px-10 py-12">
        <div className="max-w-3xl mx-auto prose prose-invert prose-sm sm:prose-base">
          <h1 className="font-display text-3xl sm:text-4xl mb-2">Privacyverklaring</h1>
          <p className="c-fg-subtle text-sm mb-10">Laatst bijgewerkt: juni 2026</p>

          <h2>1. Verantwoordelijke</h2>
          <p>
            Deze website, <strong>{SITE_NAME}</strong> ({SITE_URL}), wordt beheerd door Marnix van Aken.
            Voor vragen over privacy kun je contact opnemen via{' '}
            <a href="mailto:marnixvanaken@gmail.com">marnixvanaken@gmail.com</a>.
          </p>

          <h2>2. Welke gegevens verzamelen wij?</h2>
          <p>Wij verzamelen geen persoonsgegevens die je direct identificeren. Wel worden via cookies en vergelijkbare technologieën de volgende gegevens verwerkt:</p>
          <ul>
            <li><strong>Bezoekersstatistieken</strong> via Google Analytics 4 (GA4): bezochte pagina's, sessieduur, apparaattype en land. Deze gegevens zijn geanonimiseerd.</li>
            <li><strong>Advertentiecookies</strong> via Google AdSense: om relevante advertenties te tonen op basis van jouw surfgedrag.</li>
          </ul>

          <h2>3. Rechtsgrond</h2>
          <p>
            Wij verwerken gegevens op basis van <strong>toestemming</strong> (Art. 6 lid 1 sub a AVG).
            Bij je eerste bezoek vragen wij via een toestemmingsbanner of je akkoord gaat met analytics- en advertentiecookies.
            Je kunt je keuze op elk moment wijzigen via de cookieinstellingen onderaan de pagina.
          </p>

          <h2>4. Google Analytics 4</h2>
          <p>
            Wij gebruiken Google Analytics 4 om te begrijpen hoe bezoekers de website gebruiken.
            GA4 is geconfigureerd met Consent Mode v2: bij het weigeren van analytische cookies worden geen identificerende gegevens opgeslagen.
            De gegevensverwerking vindt plaats door Google LLC (VS). Google is gecertificeerd onder het EU-VS Data Privacy Framework.
            Meer informatie: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacybeleid</a>.
          </p>

          <h2>5. Google AdSense</h2>
          <p>
            Wij tonen advertenties via Google AdSense. Google kan hiervoor cookies plaatsen om advertenties te personaliseren.
            Dit gebeurt alleen na toestemming. Je kunt advertentiepersonalisatie uitschakelen via{' '}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener">Google Advertentie-instellingen</a>.
          </p>

          <h2>6. Bewaartermijnen</h2>
          <p>
            Google Analytics bewaart geanonimiseerde gebruiksdata maximaal 14 maanden.
            Advertentiecookies van Google hebben een bewaartermijn van maximaal 13 maanden.
          </p>

          <h2>7. Jouw rechten</h2>
          <p>Op grond van de AVG heb je de volgende rechten:</p>
          <ul>
            <li>Recht op inzage in je gegevens</li>
            <li>Recht op correctie of verwijdering</li>
            <li>Recht op beperking van de verwerking</li>
            <li>Recht om bezwaar te maken</li>
            <li>Recht om een klacht in te dienen bij de <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener">Autoriteit Persoonsgegevens</a></li>
          </ul>
          <p>Stuur een verzoek naar <a href="mailto:marnixvanaken@gmail.com">marnixvanaken@gmail.com</a>.</p>

          <h2>8. Wijzigingen</h2>
          <p>
            Wij behouden het recht deze privacyverklaring te wijzigen. De meest actuele versie staat altijd op deze pagina.
          </p>
        </div>
      </main>

      <footer className="border-t border-[#141414] px-6 py-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <p className="text-[11px] text-slate-700">© {new Date().getFullYear()} {SITE_NAME}</p>
        </div>
      </footer>
    </div>
  );
}
