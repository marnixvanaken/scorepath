import Anthropic from '@anthropic-ai/sdk';
import type { ViralTopic } from './virality';
import type { DynamicBlogPost } from './supabase';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 200));
}

const SYSTEM_PROMPT = `Je bent een enthousiaste Nederlandstalige sportjournalist die schrijft voor ScorePath, een WK 2026 simulator-website.

Schrijfstijl:
- Gedreven, energiek en vlot leesbaar
- Feitelijk correct maar met een verhalend element
- Geen AI-clichés ("In de wereld van...", "In dit artikel...", "Conclusie:")
- Korte, krachtige zinnen. Varieer in lengte.
- Nooit meer dan 4 regels per alinea

Structuur van elke blogpost (markdown):
- Begin direct met de eerste alinea, geen inleiding-headers
- Gebruik ## voor secties (2-4 secties)
- Eindig met een vooruitblik of prikkelende vraag

Schrijf ALLEEN de markdown content, geen frontmatter, geen title (die staat los).`;

interface GeneratedBlog {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  read_time: number;
}

export async function generateBlogPost(topics: ViralTopic[]): Promise<GeneratedBlog> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY ontbreekt');

  const client = new Anthropic({ apiKey });

  const topicList = topics
    .map((t) => `- "${t.title}" (${t.source})`)
    .join('\n');

  const metaResponse = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Trending topics van vandaag:\n${topicList}\n\nKies het meest interessante WK 2026-gerelateerde onderwerp en geef terug als JSON:\n{"title": "...", "description": "...", "category": "Records|Analyse|Verhalen|Legendes|Tactiek", "tags": ["tag1","tag2","tag3"]}`,
      },
    ],
  });

  const metaText = metaResponse.content[0].type === 'text' ? metaResponse.content[0].text : '';
  const jsonMatch = metaText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Ongeldige JSON van meta-stap');

  const meta = JSON.parse(jsonMatch[0]) as {
    title: string;
    description: string;
    category: string;
    tags: string[];
  };

  const contentResponse = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1200,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Schrijf een blogpost voor ScorePath over: "${meta.title}"\n\nContext (trending vandaag):\n${topicList}\n\nGeschreven in het Nederlands, ~600-800 woorden. Geef alleen de markdown body terug.`,
      },
    ],
  });

  const content =
    contentResponse.content[0].type === 'text' ? contentResponse.content[0].text.trim() : '';

  return {
    slug: slugify(meta.title),
    title: meta.title,
    description: meta.description,
    content,
    category: meta.category,
    tags: meta.tags,
    read_time: estimateReadTime(content),
  };
}

export function toBlogPostRecord(
  generated: GeneratedBlog
): Omit<DynamicBlogPost, 'id' | 'created_at'> {
  const today = new Date().toISOString().split('T')[0];
  return {
    slug: generated.slug,
    title: generated.title,
    description: generated.description,
    content: generated.content,
    date: today,
    read_time: generated.read_time,
    category: generated.category,
    tags: generated.tags,
    published: false,
  };
}
