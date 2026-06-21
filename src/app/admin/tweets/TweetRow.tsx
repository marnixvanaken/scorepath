'use client';

import { useState } from 'react';
import type { QueuedTweet } from '@/lib/tweets-queue';

const accountColor: Record<string, string> = {
  scorepath: '#3AB8BF',
  laasteman: '#E8923A',
};

export function TweetRow({ tweet, adminKey }: { tweet: QueuedTweet; adminKey: string }) {
  const [posted, setPosted] = useState(tweet.posted);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState(tweet.tweet_url ?? '');

  const copy = async () => {
    await navigator.clipboard.writeText(tweet.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const toggle = async () => {
    setBusy(true);
    try {
      const res = await fetch('/api/admin/tweets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: tweet.id, posted: !posted, tweetUrl: url || undefined, key: adminKey }),
      });
      if (res.ok) setPosted(!posted);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        border: '1px solid #262626',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        background: posted ? '#0f0f0f' : '#141414',
        opacity: posted ? 0.55 : 1,
      }}
    >
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10, fontSize: 12 }}>
        <span style={{ color: accountColor[tweet.account] ?? '#888', fontWeight: 600 }}>{tweet.handle}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ opacity: 0.6 }}>{tweet.type}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ opacity: 0.6 }}>{tweet.scheduled_for}</span>
      </div>

      <pre
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontFamily: 'system-ui',
          fontSize: 15,
          lineHeight: 1.5,
          margin: '0 0 12px',
        }}
      >
        {tweet.text}
      </pre>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={copy} style={btnStyle('#1d4ed8')}>
          {copied ? '✓ Gekopieerd' : 'Kopieer'}
        </button>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Plak hier de tweet-URL (optioneel)"
          style={{
            flex: 1,
            minWidth: 200,
            background: '#0a0a0a',
            border: '1px solid #333',
            borderRadius: 8,
            padding: '8px 10px',
            color: '#fff',
            fontSize: 13,
          }}
        />
        <button onClick={toggle} disabled={busy} style={btnStyle(posted ? '#444' : '#15803d')}>
          {posted ? 'Ongedaan maken' : '✓ Geplaatst'}
        </button>
      </div>
    </div>
  );
}

function btnStyle(bg: string): React.CSSProperties {
  return {
    background: bg,
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '8px 14px',
    fontSize: 13,
    cursor: 'pointer',
    fontWeight: 600,
  };
}
