import { getQueue, type QueuedTweet } from '@/lib/tweets-queue';
import { TweetList } from './TweetList';
import { AddTweetForm } from './AddTweetForm';

export const dynamic = 'force-dynamic';

export default async function AdminTweetsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await props.searchParams;
  const key = typeof sp.key === 'string' ? sp.key : '';
  const secret = process.env.CRON_SECRET;

  if (!secret || key !== secret) {
    return (
      <main style={pageStyle}>
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

  const pendingCount = tweets.filter((t) => !t.posted).length;

  return (
    <main style={pageStyle}>
      <h1 style={{ fontSize: 24, marginBottom: 4 }}>Tweet-wachtrij</h1>
      <p style={{ opacity: 0.6, marginBottom: 24, fontSize: 14 }}>
        {pendingCount} klaar om te plaatsen. Kopieer de tekst, plaats op X, plak de tweet-URL terug en vink af.
      </p>

      {error && <p style={{ color: '#f87171' }}>Fout: {error}</p>}
      {!error && (
        <>
          <AddTweetForm adminKey={key} />
          <TweetList tweets={tweets} adminKey={key} />
        </>
      )}
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  padding: '32px 20px',
  fontFamily: 'system-ui',
  color: '#fff',
  background: '#0a0a0a',
  minHeight: '100vh',
  maxWidth: 820,
  margin: '0 auto',
};
