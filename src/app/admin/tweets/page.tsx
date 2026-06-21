import { getQueue, type QueuedTweet } from '@/lib/tweets-queue';
import { TweetRow } from './TweetRow';

export const dynamic = 'force-dynamic';

export default async function AdminTweetsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await props.searchParams;
  const key = typeof sp.key === 'string' ? sp.key : '';
  const secret = process.env.CRON_SECRET;

  if (!secret || key !== secret) {
    return (
      <main style={{ padding: 40, fontFamily: 'system-ui', color: '#fff', background: '#0a0a0a', minHeight: '100vh' }}>
        <h1>403 — Geen toegang</h1>
        <p style={{ opacity: 0.6 }}>Voeg <code>?key=JOUW_CRON_SECRET</code> toe aan de URL.</p>
      </main>
    );
  }

  let tweets: QueuedTweet[] = [];
  let error = '';
  try {
    tweets = await getQueue(true);
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  const pending = tweets.filter((t) => !t.posted);
  const posted = tweets.filter((t) => t.posted);

  // ScorepathEN (hoofdaccount) eerst, dan LaatsteMan1998
  const order = (t: QueuedTweet) => (t.account === 'scorepath' ? 0 : 1);
  pending.sort((a, b) => order(a) - order(b) || a.scheduled_for.localeCompare(b.scheduled_for));

  return (
    <main style={{ padding: '32px 20px', fontFamily: 'system-ui', color: '#fff', background: '#0a0a0a', minHeight: '100vh', maxWidth: 820, margin: '0 auto' }}>
      <h1 style={{ fontSize: 24, marginBottom: 4 }}>Tweet-wachtrij</h1>
      <p style={{ opacity: 0.6, marginBottom: 24, fontSize: 14 }}>
        {pending.length} klaar om te plaatsen · {posted.length} geplaatst.
        Kopieer de tekst, plaats op X, en vink af.
      </p>

      {error && <p style={{ color: '#f87171' }}>Fout: {error}</p>}

      {pending.length === 0 && !error && (
        <p style={{ opacity: 0.5 }}>Geen openstaande tweets. De cron vult deze dagelijks aan.</p>
      )}

      {pending.map((t) => (
        <TweetRow key={t.id} tweet={t} adminKey={key} />
      ))}

      {posted.length > 0 && (
        <>
          <h2 style={{ fontSize: 16, marginTop: 40, opacity: 0.6 }}>Geplaatst</h2>
          {posted.map((t) => (
            <TweetRow key={t.id} tweet={t} adminKey={key} />
          ))}
        </>
      )}
    </main>
  );
}
