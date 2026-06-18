import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { isLocale, getMessages } from '@/i18n';
import { SITE_NAME } from '@/lib/siteConfig';
import { birthplacePath } from '@/lib/routes';
import { BirthplaceCardActions } from '@/app/wk-geboorteplaats/BirthplaceCardActions';
import { players as allPlayers } from '@/data/players';
import { FLAG_CODE } from '@/data/flags';

function FlagImg({ teamCode }: { teamCode: string }) {
  const code = FLAG_CODE[teamCode];
  if (!code) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w80/${code}.png`}
      alt={teamCode}
      width={32}
      height={21}
      style={{ borderRadius: '0 4px 0 4px', border: '1px solid var(--border)', objectFit: 'cover' }}
    />
  );
}

function posLabel(pos: string, lang: string): string {
  switch (pos) {
    case 'GK': return lang === 'nl' ? 'Keeper' : lang === 'es' ? 'Portero' : 'Goalkeeper';
    case 'DF': return lang === 'nl' ? 'Verdediger' : lang === 'es' ? 'Defensa' : 'Defender';
    case 'MF': return lang === 'nl' ? 'Middenvelder' : lang === 'es' ? 'Centrocampista' : 'Midfielder';
    case 'FW': return lang === 'nl' ? 'Aanvaller' : lang === 'es' ? 'Delantero' : 'Forward';
    default: return pos;
  }
}

export default async function BirthplaceCardPage(
  props: PageProps<'/[lang]/wk-geboorteplaats/card'> & {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const msg = getMessages(lang);
  const m = msg.birthplace;

  const params = await props.searchParams;
  function getParam(key: string): string {
    const v = params[key];
    return (Array.isArray(v) ? v[0] : v) ?? '';
  }

  const playerIds = Array.from({ length: 10 }, (_, i) => getParam(`p${i + 1}`)).filter(Boolean);
  if (playerIds.length === 0) redirect(birthplacePath(lang));

  const ogParams = new URLSearchParams();
  Array.from({ length: 10 }, (_, i) => i + 1).forEach((i) => {
    const pid = getParam(`p${i}`);
    const dist = getParam(`d${i}`);
    if (pid) { ogParams.set(`p${i}`, pid); ogParams.set(`d${i}`, dist || '0'); }
  });
  ogParams.set('lang', lang);
  const ogUrl = `/api/og/birthplace?${ogParams.toString()}`;

  const playerRows = Array.from({ length: 10 }, (_, i) => {
    const pid = getParam(`p${i + 1}`);
    const dist = parseInt(getParam(`d${i + 1}`) || '0', 10);
    if (!pid) return null;
    const player = allPlayers.find((p) => p.id === pid);
    if (!player) return null;
    return { player, distance: dist, rank: i + 1 };
  }).filter(Boolean) as { player: typeof allPlayers[0]; distance: number; rank: number }[];

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <nav className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href={`/${lang}`}><Logo size="sm" /></Link>
          <ThemeToggle />
        </div>
      </nav>

      <section className="flex-1 flex flex-col items-center px-4 pt-10 pb-10">
        <div className="w-full max-w-lg">

          {/* Tagline */}
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-6 text-center" style={{ color: 'var(--fg-subtle)' }}>
            {m.cardTagline}
          </p>

          {/* Card image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ogUrl}
            alt={m.cardTagline}
            className="w-full rounded-xl shadow-2xl mb-6"
            style={{ border: '1px solid var(--border)' }}
          />

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <BirthplaceCardActions ogUrl={ogUrl} />
            <Link
              href={birthplacePath(lang)}
              className="px-6 py-3 text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-70"
              style={{ border: '1px solid var(--border)', color: 'var(--fg-subtle)', borderRadius: '0 8px 0 8px' }}
            >
              {msg.card.back}
            </Link>
          </div>

          {/* Player list */}
          {playerRows.length > 0 && (
            <div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase mb-3" style={{ color: 'var(--fg-subtle)' }}>
                {m.top5}
              </p>
              <ol className="space-y-2">
                {playerRows.map(({ player, distance, rank }) => (
                  <li
                    key={player.id}
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                      background: rank === 1 ? 'var(--bg-panel)' : 'var(--bg-card)',
                      border: rank === 1 ? '1px solid var(--cta)' : '1px solid var(--border)',
                    }}
                  >
                    {/* Rank */}
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        background: rank === 1 ? '#10b981' : 'var(--border)',
                        color: rank === 1 ? 'white' : 'var(--fg-subtle)',
                      }}
                    >
                      {rank}
                    </span>

                    {/* Flag */}
                    <span className="shrink-0"><FlagImg teamCode={player.teamCode} /></span>

                    {/* Name + meta */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold leading-tight truncate" style={{ color: 'var(--fg)' }}>{player.name}</p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--fg-subtle)' }}>
                        {player.team} · {posLabel(player.position, lang)}
                      </p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--fg-subtle)', opacity: 0.75 }}>
                        {player.birthplace}
                      </p>
                    </div>

                    {/* Distance */}
                    <div className="text-right shrink-0">
                      <p
                        className="text-base font-bold tabular-nums leading-tight"
                        style={{ color: rank === 1 ? 'var(--cta)' : 'var(--fg)' }}
                      >
                        {distance.toLocaleString()}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--fg-subtle)' }}>{m.distanceKm}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>

      <footer className="px-6 py-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--fg-subtle)' }}>
            {SITE_NAME.toLowerCase()}.nl
          </p>
        </div>
      </footer>
    </div>
  );
}
