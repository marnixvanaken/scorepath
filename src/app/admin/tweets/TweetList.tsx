'use client';

import { useMemo, useState } from 'react';
import type { QueuedTweet } from '@/lib/tweets-queue';
import { TweetRow } from './TweetRow';

const ACCOUNTS = [
  { value: 'all', label: 'Alle accounts' },
  { value: 'scorepath', label: '@ScorepathEN' },
  { value: 'laasteman', label: '@LaatsteMan1998' },
];

export function TweetList({ tweets, adminKey }: { tweets: QueuedTweet[]; adminKey: string }) {
  const [account, setAccount] = useState('all');
  const [date, setDate] = useState('all');
  const [showPosted, setShowPosted] = useState(false);

  const dates = useMemo(
    () => [...new Set(tweets.map((t) => t.scheduled_for))].sort().reverse(),
    [tweets]
  );

  const filtered = useMemo(() => {
    const order = (t: QueuedTweet) => (t.account === 'scorepath' ? 0 : 1);
    return tweets
      .filter((t) => (account === 'all' ? true : t.account === account))
      .filter((t) => (date === 'all' ? true : t.scheduled_for === date))
      .filter((t) => (showPosted ? true : !t.posted))
      .sort(
        (a, b) =>
          Number(a.posted) - Number(b.posted) ||
          order(a) - order(b) ||
          b.scheduled_for.localeCompare(a.scheduled_for)
      );
  }, [tweets, account, date, showPosted]);

  return (
    <>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        <select value={account} onChange={(e) => setAccount(e.target.value)} style={selectStyle}>
          {ACCOUNTS.map((a) => (
            <option key={a.value} value={a.value}>{a.label}</option>
          ))}
        </select>
        <select value={date} onChange={(e) => setDate(e.target.value)} style={selectStyle}>
          <option value="all">Alle datums</option>
          {dates.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, opacity: 0.8 }}>
          <input type="checkbox" checked={showPosted} onChange={(e) => setShowPosted(e.target.checked)} />
          Toon geplaatste
        </label>
      </div>

      <p style={{ opacity: 0.5, fontSize: 13, marginBottom: 16 }}>{filtered.length} tweets</p>

      {filtered.length === 0 && <p style={{ opacity: 0.5 }}>Niets gevonden met deze filters.</p>}

      {filtered.map((t) => (
        <TweetRow key={t.id} tweet={t} adminKey={adminKey} />
      ))}
    </>
  );
}

const selectStyle: React.CSSProperties = {
  background: '#141414',
  color: '#fff',
  border: '1px solid #333',
  borderRadius: 8,
  padding: '8px 12px',
  fontSize: 13,
};
