import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { isPublicArticle, projectArticle, publicFields } from './policy.mjs';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const respond = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
    status, headers: { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': status === 200 ? 'public, max-age=60' : 'no-store' },
  });
  if (req.method !== 'GET') return respond({ error: 'Method not allowed' }, 405);
  const slug = new URL(req.url).searchParams.get('slug');
  if (slug !== null && (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 180)) return respond({ error: 'Invalid article address' }, 400);
  try {
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) throw new Error('Configuration missing');
    const client = createClient(url, key);
    let query = client.from('blog_topics').select(publicFields).eq('status', 'published')
      .not('dzen_html', 'is', null).not('cover_url', 'is', null).order('generated_at', { ascending: false });
    if (slug) query = query.eq('slug_hint', slug);
    const { data, error } = await query.limit(slug ? 1 : 500);
    if (error) throw error;
    const articles = (data ?? []).filter(row => isPublicArticle({ ...row, status: 'published' })).map(projectArticle);
    if (slug) return articles[0] ? respond({ article: articles[0] }) : respond({ error: 'Article not found' }, 404);
    return respond({ articles: articles.map(({ html, ...metadata }) => metadata) });
  } catch {
    return respond({ error: 'Articles temporarily unavailable' }, 503);
  }
});