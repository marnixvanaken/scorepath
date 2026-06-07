import { createClient } from '@supabase/supabase-js';

export interface DynamicBlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  read_time: number;
  category: string;
  tags: string[];
  published: boolean;
  created_at: string;
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Supabase env vars ontbreken');
  return createClient(url, key);
}

export async function getDynamicBlogs(): Promise<DynamicBlogPost[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase fout bij ophalen blogs:', error.message);
    return [];
  }
  return data ?? [];
}

export async function getDynamicBlogBySlug(slug: string): Promise<DynamicBlogPost | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) return null;
  return data;
}

export async function insertBlogPost(
  post: Omit<DynamicBlogPost, 'id' | 'created_at'>
): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('SUPABASE_SERVICE_ROLE_KEY ontbreekt');

  const supabase = createClient(url, key);
  const { error } = await supabase.from('blog_posts').insert(post);
  if (error) throw new Error(`Supabase insert mislukt: ${error.message}`);
}
