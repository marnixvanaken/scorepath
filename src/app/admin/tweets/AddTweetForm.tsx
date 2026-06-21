'use client';

import { useState } from 'react';

export function AddTweetForm({ adminKey }: { adminKey: string }) {
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState('scorepath');
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!text.trim()) return;
    setBusy(true);
    try {
      const res = await fetch('/api/admin/tweets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', account, text, key: adminKey }),
      });
      if (res.ok) {
        setText('');
        setOpen(false);
        location.reload();
      }
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={{ ...btn('#1d4ed8'), marginBottom: 20 }}>
        ➕ Eigen tweet toevoegen
      </button>
    );
  }

  return (
    <div style={{ border: '1px solid #2563eb', borderRadius: 12, padding: 16, marginBottom: 20, background: '#0d1530' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <select value={account} onChange={(e) => setAccount(e.target.value)} style={select}>
          <option value="scorepath">@ScorepathEN (EN)</option>
          <option value="laasteman">@LaatsteMan1998 (NL)</option>
        </select>
        <span style={{ fontSize: 12, opacity: 0.6, alignSelf: 'center' }}>
          {280 - text.length} tekens over
        </span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Topical tweet — haak in op wat vandaag trendt…"
        rows={6}
        style={{ width: '100%', background: '#0a0a0a', border: '1px solid #333', borderRadius: 8, padding: 10, color: '#fff', fontSize: 14, fontFamily: 'system-ui', resize: 'vertical', boxSizing: 'border-box' }}
      />
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <button onClick={submit} disabled={busy || !text.trim()} style={btn('#15803d')}>
          {busy ? 'Bezig…' : 'Toevoegen aan wachtrij'}
        </button>
        <button onClick={() => setOpen(false)} style={btn('#444')}>Annuleren</button>
      </div>
    </div>
  );
}

function btn(bg: string): React.CSSProperties {
  return { background: bg, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 600 };
}
const select: React.CSSProperties = { background: '#141414', color: '#fff', border: '1px solid #333', borderRadius: 8, padding: '8px 12px', fontSize: 13 };
