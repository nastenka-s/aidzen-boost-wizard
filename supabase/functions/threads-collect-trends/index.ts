// Collects viral competitor posts from Threads API via keyword search.
// Runs daily (cron). Saves posts with engagement_rate > threshold.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const TOKEN = Deno.env.get('THREADS_ACCESS_TOKEN')!;

const THREADS_FIELDS = 'id,media_type,text,permalink,username,timestamp';
const PUBLIC_METRIC_FIELDS = 'like_count,reply_count,repost_count,quote_count';
const MIN_LIKES_FOR_VIRAL = 20;
const ALWAYS_KEEP_TOP_N = 5;
const OWN_USERNAME = 'astroneironka';

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

// Public engagement counts for any post (not insights — those are owner-only).
async function fetchPublicMetrics(mediaId: string) {
  const url = `https://graph.threads.net/v1.0/${mediaId}?fields=${PUBLIC_METRIC_FIELDS}&access_token=${TOKEN}`;
  const res = await fetch(url);
  if (!res.ok) return {};
  const data = await res.json();
  return {
    likes: data.like_count ?? 0,
    replies: data.reply_count ?? 0,
    reposts: data.repost_count ?? 0,
    quotes: data.quote_count ?? 0,
  };
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
      const slice = posts.slice(0, 25);
      for (let i = 0; i < slice.length; i++) {
        const p = slice[i];
        if (p.username === OWN_USERNAME) { skipped++; continue; }
        const metrics = await fetchPublicMetrics(p.id);
        const likes = metrics.likes ?? 0;
        const isTop = i < ALWAYS_KEEP_TOP_N;
        if (likes < MIN_LIKES_FOR_VIRAL && !isTop) { skipped++; continue; }
        const engagement = likes + (metrics.replies ?? 0) + (metrics.reposts ?? 0) + (metrics.quotes ?? 0);

        const { error } = await supabase.from('threads_competitor_posts').upsert({
          external_id: p.id,
          permalink: p.permalink,
          username: p.username,
          text: p.text ?? '',
          media_type: p.media_type,
          likes,
          replies: metrics.replies ?? 0,
          reposts: metrics.reposts ?? 0,
          quotes: metrics.quotes ?? 0,
          views: 0,
          engagement_rate: engagement,
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