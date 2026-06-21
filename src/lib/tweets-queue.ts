import { createClient } from '@supabase/supabase-js';

export interface QueuedTweet {
  id: string;
  account: string;
  handle: string;
  lang: string;
  type: string;
  text: string;
  scheduled_for: string;
  posted: boolean;
  posted_at: string | null;
  tweet_url: string | null;
  tweet_id: string | null;
  dedupe_key: string;
  created_at: string;
}

// Haalt de tweet-ID uit een x.com/twitter.com status-URL.
export function parseTweetId(url: string): string | null {
  const m = url.match(/status\/(\d+)/);
  return m ? m[1] : null;
}

export type NewTweet = Omit<
  QueuedTweet,
  'id' | 'posted' | 'posted_at' | 'created_at' | 'tweet_url' | 'tweet_id'
>;

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('SUPABASE_SERVICE_ROLE_KEY ontbreekt');
  return createClient(url, key);
}

// Voegt tweets toe en slaat bestaande (zelfde dedupe_key) over.
// Geeft het aantal nieuw toegevoegde rijen terug.
export async function enqueueTweets(tweets: NewTweet[]): Promise<number> {
  if (tweets.length === 0) return 0;
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from('tweets_queue')
    .upsert(tweets, { onConflict: 'dedupe_key', ignoreDuplicates: true })
    .select('id');
  if (error) throw new Error(`Queue insert mislukt: ${error.message}`);
  return data?.length ?? 0;
}

export async function getQueue(includePosted = false): Promise<QueuedTweet[]> {
  const supabase = getServiceClient();
  let query = supabase
    .from('tweets_queue')
    .select('*')
    .order('scheduled_for', { ascending: true })
    .order('account', { ascending: true });
  if (!includePosted) query = query.eq('posted', false);

  const { data, error } = await query;
  if (error) throw new Error(`Queue ophalen mislukt: ${error.message}`);
  return data ?? [];
}

export async function markPosted(id: string, posted: boolean, tweetUrl?: string): Promise<void> {
  const supabase = getServiceClient();
  const update: Record<string, unknown> = {
    posted,
    posted_at: posted ? new Date().toISOString() : null,
  };
  if (posted && tweetUrl) {
    update.tweet_url = tweetUrl;
    update.tweet_id = parseTweetId(tweetUrl);
  }
  if (!posted) {
    update.tweet_url = null;
    update.tweet_id = null;
  }
  const { error } = await supabase.from('tweets_queue').update(update).eq('id', id);
  if (error) throw new Error(`Status bijwerken mislukt: ${error.message}`);
}
