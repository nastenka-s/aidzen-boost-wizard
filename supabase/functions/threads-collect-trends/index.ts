// Collects viral competitor posts from Threads API via keyword search.
// Runs daily (cron). Saves posts with engagement_rate > threshold.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const TOKEN = Deno.env.get('THREADS_ACCESS_TOKEN')!;

const THREADS_FIELDS = 'id,media_type,text,permalink,username,timestamp';
const METRICS_FIELDS = 'likes,replies,reposts,quotes,views';
const MIN_VIEWS_FOR_VIRAL = 1000;

async function fetchKeywordPosts(keyword: string, language: string) {
  // Threads Keyword Search API (beta): graph.threads.net/v1.0/keyword_search
  const url = new URL('https://graph.threads.net/v1.0/keyword_search');
  url.searchParams.set('q', keyword);
  url.searchParams.set('search_type', 'TOP');
  url.searchParams.set('fields', THREADS_FIELDS);
  url.searchParams.set('access_token', TOKEN);
  const res = await fetch(url.toString());
  if (!res.ok) {
    console.error(`keyword_search failed [${res.status}]`, await res.text());
    return [];
  }
  const data = await res.json();
  return data.data ?? [];
}

async function fetchInsights(mediaId: string) {
  const url = `https://graph.threads.net/v1.0/${mediaId}/insights?metric=${METRICS_FIELDS}&access_token=${TOKEN}`;
  const res = await fetch(url);
  if (!res.ok) return {};
  const data = await res.json();
  const out: Record<string, number> = {};
  for (const m of data.data ?? []) {
    out[m.name] = m.values?.[0]?.value ?? 0;
  }
  return out;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  const { data: keywords } = await supabase
    .from('threads_keywords')
    .select('*')
    .eq('enabled', true);

  let inserted = 0, skipped = 0;

  for (const kw of keywords ?? []) {
    try {
      const posts = await fetchKeywordPosts(kw.keyword, kw.language);
      for (const p of posts.slice(0, 25)) {
        const metrics = await fetchInsights(p.id);
        const views = metrics.views ?? 0;
        if (views < MIN_VIEWS_FOR_VIRAL) { skipped++; continue; }
        const er = views > 0
          ? ((metrics.likes ?? 0) + (metrics.replies ?? 0) + (metrics.reposts ?? 0)) / views
          : 0;

        const { error } = await supabase.from('threads_competitor_posts').upsert({
          external_id: p.id,
          permalink: p.permalink,
          username: p.username,
          text: p.text ?? '',
          media_type: p.media_type,
          likes: metrics.likes ?? 0,
          replies: metrics.replies ?? 0,
          reposts: metrics.reposts ?? 0,
          quotes: metrics.quotes ?? 0,
          views,
          engagement_rate: er,
          source_keyword: kw.keyword,
          language: kw.language,
          segment: kw.segment,
          posted_at: p.timestamp,
        }, { onConflict: 'external_id' });
        if (!error) inserted++;
      }
    } catch (e) {
      console.error('keyword failed', kw.keyword, e);
    }
  }

  return new Response(JSON.stringify({ inserted, skipped }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});