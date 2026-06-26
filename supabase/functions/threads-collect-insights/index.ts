// Daily job: fetches metrics for our recent posts and updates engagement_rate
// so the analyze step can use real performance data for the feedback loop.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const TOKEN = Deno.env.get('THREADS_ACCESS_TOKEN')!;
const METRICS = 'likes,replies,reposts,quotes,views';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  // Get posts published in last 30 days
  const since = new Date(Date.now() - 30 * 86400_000).toISOString();
  const { data: posts } = await supabase
    .from('threads_posts')
    .select('id,thread_id')
    .eq('status', 'published')
    .gte('posted_at', since)
    .not('thread_id', 'is', null);

  let updated = 0;
  for (const p of posts ?? []) {
    try {
      const r = await fetch(`https://graph.threads.net/v1.0/${p.thread_id}/insights?metric=${METRICS}&access_token=${TOKEN}`);
      if (!r.ok) continue;
      const j = await r.json();
      const m: Record<string, number> = {};
      for (const it of j.data ?? []) m[it.name] = it.values?.[0]?.value ?? 0;
      const views = m.views ?? 0;
      const er = views > 0 ? ((m.likes ?? 0) + (m.replies ?? 0) + (m.reposts ?? 0)) / views : 0;
      await supabase.from('threads_posts').update({
        likes: m.likes ?? 0,
        replies: m.replies ?? 0,
        reposts: m.reposts ?? 0,
        quotes: m.quotes ?? 0,
        views,
        engagement_rate: er,
        metrics_updated_at: new Date().toISOString(),
      }).eq('id', p.id);
      updated++;
    } catch (e) {
      console.error('insights failed', p.thread_id, e);
    }
  }

  return new Response(JSON.stringify({ updated }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});