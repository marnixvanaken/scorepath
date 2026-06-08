import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { SITE_URL, SITE_NAME } from '@/lib/siteConfig';
import { isLocale, DEFAULT_LOCALE, getMessages } from '@/i18n';

export async function generateMetadata(props: PageProps<'/[lang]/privacy'>): Promise<Metadata> {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const msg = getMessages(locale);
  return {
    title: msg.privacy.pageTitle,
    description: msg.privacy.pageDescription,
    alternates: {
      canonical: `${SITE_URL}/${locale}/privacy`,
      languages: {
        'nl-NL': `${SITE_URL}/nl/privacy`,
        'en-US': `${SITE_URL}/en/privacy`,
        'es-ES': `${SITE_URL}/es/privacy`,
      },
    },
  };
}

export default async function PrivacyPage(props: PageProps<'/[lang]/privacy'>) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 sm:px-10 py-5 border-b border-[#141414]">
        <div className="max-w-3xl mx-auto">
          <Link href={`/${lang}`}><Logo size="sm" /></Link>
        </div>
      </header>

      <main className="flex-1 px-6 sm:px-10 py-12">
        <div className="max-w-3xl mx-auto prose prose-invert prose-sm sm:prose-base">
          <PrivacyContent lang={lang} />
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

function PrivacyContent({ lang }: { lang: string }) {
  if (lang === 'en') return <PrivacyEn />;
  if (lang === 'es') return <PrivacyEs />;
  return <PrivacyNl />;
}

function PrivacyNl() {
  return (
    <>
      <h1 className="font-display text-3xl sm:text-4xl mb-2">Privacyverklaring</h1>
      <p className="c-fg-subtle text-sm mb-10">Laatst bijgewerkt: juni 2026</p>

      <h2>1. Verantwoordelijke</h2>
      <p>
        Deze website, <strong>{SITE_NAME}</strong> ({SITE_URL}), wordt beheerd door ScorePath.
        Voor vragen over privacy kun je contact opnemen via{' '}
        <a href="mailto:admin@scorepath.nl">admin@scorepath.nl</a>.
      </p>

      <h2>2. Welke gegevens verzamelen wij?</h2>
      <p>Wij verzamelen geen persoonsgegevens die je direct identificeren. Wel worden via cookies en vergelijkbare technologieën de volgende gegevens verwerkt:</p>
      <ul>
        <li><strong>Bezoekersstatistieken</strong> via Google Analytics 4 (GA4): bezochte pagina&apos;s, sessieduur, apparaattype en land. Deze gegevens zijn geanonimiseerd.</li>
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
      <p>Stuur een verzoek naar <a href="mailto:admin@scorepath.nl">admin@scorepath.nl</a>.</p>

      <h2>8. Wijzigingen</h2>
      <p>Wij behouden het recht deze privacyverklaring te wijzigen. De meest actuele versie staat altijd op deze pagina.</p>
    </>
  );
}

function PrivacyEn() {
  return (
    <>
      <h1 className="font-display text-3xl sm:text-4xl mb-2">Privacy Policy</h1>
      <p className="c-fg-subtle text-sm mb-10">Last updated: June 2026</p>

      <h2>1. Controller</h2>
      <p>
        This website, <strong>{SITE_NAME}</strong> ({SITE_URL}), is operated by ScorePath.
        For privacy-related questions, please contact us at{' '}
        <a href="mailto:admin@scorepath.nl">admin@scorepath.nl</a>.
      </p>

      <h2>2. What data do we collect?</h2>
      <p>We do not collect data that directly identifies you. However, the following data is processed via cookies and similar technologies:</p>
      <ul>
        <li><strong>Visitor statistics</strong> via Google Analytics 4 (GA4): pages visited, session duration, device type and country. This data is anonymised.</li>
        <li><strong>Advertising cookies</strong> via Google AdSense: to show relevant ads based on your browsing behaviour.</li>
      </ul>

      <h2>3. Legal basis</h2>
      <p>
        We process data on the basis of <strong>consent</strong> (Art. 6(1)(a) GDPR).
        On your first visit, we ask via a consent banner whether you agree to analytics and advertising cookies.
        You can change your choice at any time via the cookie settings at the bottom of the page.
      </p>

      <h2>4. Google Analytics 4</h2>
      <p>
        We use Google Analytics 4 to understand how visitors use the website.
        GA4 is configured with Consent Mode v2: if you decline analytics cookies, no identifying data is stored.
        Data processing is carried out by Google LLC (USA). Google is certified under the EU-US Data Privacy Framework.
        More information: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a>.
      </p>

      <h2>5. Google AdSense</h2>
      <p>
        We display advertisements via Google AdSense. Google may place cookies to personalise ads.
        This only happens after consent. You can disable ad personalisation via{' '}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener">Google Ad Settings</a>.
      </p>

      <h2>6. Retention periods</h2>
      <p>
        Google Analytics retains anonymised usage data for a maximum of 14 months.
        Google advertising cookies have a maximum retention period of 13 months.
      </p>

      <h2>7. Your rights</h2>
      <p>Under the GDPR, you have the following rights:</p>
      <ul>
        <li>Right of access to your data</li>
        <li>Right to rectification or erasure</li>
        <li>Right to restriction of processing</li>
        <li>Right to object</li>
        <li>Right to lodge a complaint with the <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener">Dutch Data Protection Authority</a></li>
      </ul>
      <p>Send a request to <a href="mailto:admin@scorepath.nl">admin@scorepath.nl</a>.</p>

      <h2>8. Changes</h2>
      <p>We reserve the right to amend this privacy policy. The most current version will always be available on this page.</p>
    </>
  );
}

function PrivacyEs() {
  return (
    <>
      <h1 className="font-display text-3xl sm:text-4xl mb-2">Política de privacidad</h1>
      <p className="c-fg-subtle text-sm mb-10">Última actualización: junio 2026</p>

      <h2>1. Responsable</h2>
      <p>
        Este sitio web, <strong>{SITE_NAME}</strong> ({SITE_URL}), está gestionado por ScorePath.
        Para preguntas sobre privacidad, puedes contactarnos en{' '}
        <a href="mailto:admin@scorepath.nl">admin@scorepath.nl</a>.
      </p>

      <h2>2. ¿Qué datos recopilamos?</h2>
      <p>No recopilamos datos que te identifiquen directamente. Sin embargo, se procesan los siguientes datos a través de cookies y tecnologías similares:</p>
      <ul>
        <li><strong>Estadísticas de visitas</strong> mediante Google Analytics 4 (GA4): páginas visitadas, duración de la sesión, tipo de dispositivo y país. Estos datos están anonimizados.</li>
        <li><strong>Cookies publicitarias</strong> mediante Google AdSense: para mostrar anuncios relevantes según tu comportamiento de navegación.</li>
      </ul>

      <h2>3. Base legal</h2>
      <p>
        Procesamos datos sobre la base del <strong>consentimiento</strong> (Art. 6(1)(a) RGPD).
        En tu primera visita, solicitamos mediante un banner de consentimiento si aceptas las cookies de análisis y publicidad.
        Puedes cambiar tu elección en cualquier momento a través de la configuración de cookies en la parte inferior de la página.
      </p>

      <h2>4. Google Analytics 4</h2>
      <p>
        Utilizamos Google Analytics 4 para entender cómo los visitantes usan el sitio web.
        GA4 está configurado con Consent Mode v2: si rechazas las cookies analíticas, no se almacenan datos identificativos.
        El procesamiento de datos lo realiza Google LLC (EE.UU.). Google está certificado bajo el Marco de Privacidad de Datos UE-EE.UU.
        Más información: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Política de privacidad de Google</a>.
      </p>

      <h2>5. Google AdSense</h2>
      <p>
        Mostramos anuncios a través de Google AdSense. Google puede colocar cookies para personalizar los anuncios.
        Esto solo ocurre después del consentimiento. Puedes desactivar la personalización de anuncios en{' '}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener">Configuración de anuncios de Google</a>.
      </p>

      <h2>6. Períodos de conservación</h2>
      <p>
        Google Analytics conserva los datos de uso anonimizados durante un máximo de 14 meses.
        Las cookies publicitarias de Google tienen un período máximo de conservación de 13 meses.
      </p>

      <h2>7. Tus derechos</h2>
      <p>Bajo el RGPD, tienes los siguientes derechos:</p>
      <ul>
        <li>Derecho de acceso a tus datos</li>
        <li>Derecho de rectificación o supresión</li>
        <li>Derecho a la limitación del tratamiento</li>
        <li>Derecho de oposición</li>
        <li>Derecho a presentar una reclamación ante la <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener">Autoridad de Protección de Datos holandesa</a></li>
      </ul>
      <p>Envía una solicitud a <a href="mailto:admin@scorepath.nl">admin@scorepath.nl</a>.</p>

      <h2>8. Cambios</h2>
      <p>Nos reservamos el derecho de modificar esta política de privacidad. La versión más actualizada estará siempre disponible en esta página.</p>
    </>
  );
}
