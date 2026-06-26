import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const TOKEN = Deno.env.get('THREADS_ACCESS_TOKEN')!;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const out: Record<string, unknown> = {};

  // 1) /me
  const me = await fetch(`https://graph.threads.net/v1.0/me?fields=id,username,threads_profile_picture_url&access_token=${TOKEN}`);
  out.me = { status: me.status, body: await me.json() };

  // 2) Try keyword_search with single keyword
  const ks = await fetch(`https://graph.threads.net/v1.0/keyword_search?q=astrology&search_type=TOP&fields=id,text,username&access_token=${TOKEN}`);
  out.keyword_search = { status: ks.status, body: await ks.json() };

  // 3) Token introspect (Threads endpoint)
  const insp = await fetch(`https://graph.threads.net/v1.0/me/threads_publishing_limit?fields=quota_usage,config&access_token=${TOKEN}`);
  out.publishing_limit = { status: insp.status, body: await insp.json() };

  return new Response(JSON.stringify(out, null, 2), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});