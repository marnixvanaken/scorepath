export interface ViralTopic {
  title: string;
  source: string;
}

async function fetchRedditTopics(): Promise<ViralTopic[]> {
  try {
    const res = await fetch(
      'https://www.reddit.com/r/soccer/hot.json?limit=10&t=day',
      { headers: { 'User-Agent': 'ScorePath-BlogBot/1.0' }, next: { revalidate: 0 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data?.children ?? [])
      .map((c: { data: { title: string } }) => ({ title: c.data.title, source: 'Reddit r/soccer' }))
      .slice(0, 5);
  } catch {
    return [];
  }
}

async function fetchGoogleTrendsTopics(): Promise<ViralTopic[]> {
  try {
    // Google Trends dagelijkse trending RSS (Nederland)
    const res = await fetch(
      'https://trends.google.com/trending/rss?geo=NL&hl=nl',
      { next: { revalidate: 0 } }
    );
    if (!res.ok) return [];
    const xml = await res.text();
    const titles = [...xml.matchAll(/<title><!\[CDATA\[([^\]]+)\]\]><\/title>/g)]
      .map((m) => m[1])
      .filter((t) => !t.includes('Google'))
      .slice(0, 8);
    return titles.map((title) => ({ title, source: 'Google Trends NL' }));
  } catch {
    return [];
  }
}

async function fetchNewsRssTopics(): Promise<ViralTopic[]> {
  const feeds = [
    { url: 'https://feeds.bbci.co.uk/sport/football/rss.xml', source: 'BBC Sport' },
    { url: 'https://www.goal.com/feeds/nl/news', source: 'Goal.com NL' },
  ];

  const results: ViralTopic[] = [];
  for (const feed of feeds) {
    try {
      const res = await fetch(feed.url, { next: { revalidate: 0 } });
      if (!res.ok) continue;
      const xml = await res.text();
      const titles = [...xml.matchAll(/<title>(?:<!\[CDATA\[)?([^<\]]+)(?:\]\]>)?<\/title>/g)]
        .map((m) => m[1].trim())
        .filter((t) => t.length > 10 && !t.toLowerCase().includes('rss'))
        .slice(0, 4);
      results.push(...titles.map((title) => ({ title, source: feed.source })));
    } catch {
      continue;
    }
  }
  return results;
}

function filterWkRelevant(topics: ViralTopic[]): ViralTopic[] {
  const wkKeywords = [
    'world cup', 'wk', 'fifa', 'messi', 'ronaldo', 'mbappe', 'mbappé',
    'yamal', 'courtois', 'netherlands', 'nederland', 'spain', 'spanje',
    'brazil', 'brazilië', 'argentina', 'argentinië', 'france', 'frankrijk',
    'england', 'engeland', 'germany', 'duitsland', 'portugal', 'morocco',
    'maroc', 'soccer', 'football', 'voetbal', 'goal', 'transfer',
    'usa', 'canada', 'mexico', '2026',
  ];

  const relevant = topics.filter((t) =>
    wkKeywords.some((kw) => t.title.toLowerCase().includes(kw))
  );

  // Als er te weinig WK-relevante topics zijn, neem gewoon de eerste topics
  return relevant.length >= 3 ? relevant : topics.slice(0, 6);
}

export async function getViralTopics(): Promise<ViralTopic[]> {
  const [reddit, trends, news] = await Promise.all([
    fetchRedditTopics(),
    fetchGoogleTrendsTopics(),
    fetchNewsRssTopics(),
  ]);

  const all = [...reddit, ...trends, ...news];
  const filtered = filterWkRelevant(all);

  // Max 10 topics doorgeven aan de generator
  return filtered.slice(0, 10);
}
