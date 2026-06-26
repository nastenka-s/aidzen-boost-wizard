// Weekly job: pulls top viral posts, asks Gemini to extract reusable patterns
// (hooks, structures, tones, topics, CTAs), upserts them into threads_virality_patterns.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const LOVABLE_KEY = Deno.env.get('LOVABLE_API_KEY')!;

const SYSTEM = `Ты — аналитик виральности в Threads для эзо-ниши (астрология, нумерология, матрица, таро).
Тебе дадут топ-100 виральных постов на русском/английском. Извлеки переиспользуемые ПАТТЕРНЫ.

Верни строго JSON:
{
  "patterns": [
    { "pattern_type": "hook|structure|tone|topic|cta",
      "name": "короткое название",
      "description": "когда и как применять, 1-2 предложения",
      "example": "образцовая строка/пост на русском",
      "avg_engagement": 0.0,
      "sample_size": 0 }
  ]
}

Найди минимум 15 паттернов. Покрой:
- HOOKS: вопрос, цифра/дата, шок, предупреждение, личный инсайт, FOMO
- STRUCTURE: длина, абзацы, эмодзи, списки, нумерация
- TONE: мистический, дружеский, экспертный, провокационный
- TOPIC: какие темы залетают чаще
- CTA: как подводить к подписке/переходу не агрессивно`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  const { data: posts } = await supabase
    .from('threads_competitor_posts')
    .select('text,likes,replies,reposts,views,engagement_rate,language,segment')
    .order('engagement_rate', { ascending: false })
    .limit(100);

  if (!posts || posts.length < 5) {
    return new Response(JSON.stringify({ error: 'not enough data', count: posts?.length ?? 0 }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const corpus = posts.map((p, i) =>
    `#${i + 1} [ER ${(p.engagement_rate * 100).toFixed(2)}% / views ${p.views}]\n${p.text}`
  ).join('\n\n---\n\n');

  const aiRes = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LOVABLE_KEY}`,
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-pro',
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: corpus },
      ],
      response_format: { type: 'json_object' },
    }),
  });

  if (!aiRes.ok) {
    const t = await aiRes.text();
    return new Response(JSON.stringify({ error: 'AI failed', detail: t }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const aiJson = await aiRes.json();
  const raw = aiJson.choices?.[0]?.message?.content ?? '{}';
  const parsed = JSON.parse(raw);
  const patterns = parsed.patterns ?? [];

  // Soft refresh: deactivate previous patterns, insert new (keeps history)
  await supabase.from('threads_virality_patterns').update({ active: false }).eq('active', true);

  let inserted = 0;
  for (const p of patterns) {
    const { error } = await supabase.from('threads_virality_patterns').insert({
      pattern_type: p.pattern_type,
      name: p.name,
      description: p.description,
      example: p.example,
      avg_engagement: p.avg_engagement ?? 0,
      sample_size: p.sample_size ?? 0,
      active: true,
    });
    if (!error) inserted++;
  }

  return new Response(JSON.stringify({ inserted, total: patterns.length }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});