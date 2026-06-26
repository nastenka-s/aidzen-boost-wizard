// Generates one viral post using extracted patterns + astro context,
// self-critiques, and auto-publishes to Threads. Runs 5x/day via cron.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const LOVABLE_KEY = Deno.env.get('LOVABLE_API_KEY')!;
const THREADS_TOKEN = Deno.env.get('THREADS_ACCESS_TOKEN')!;
const THREADS_USER_ID = Deno.env.get('THREADS_USER_ID')!;

const SITE_LINK = 'https://aidzen.ru';
const BOT_LINK = 'https://t.me/matricasudbyaibot';

// Astro context (truncated; can be extended)
const ASTRO_2026: Record<string, string> = {
  '2026-01-03': 'Меркурий ретроградный начинается',
  '2026-01-23': 'Меркурий стационарен директ',
  '2026-02-17': 'Юпитер входит во Льва — год силы и творчества',
  '2026-03-14': 'Полнолуние в Деве — финал старого цикла',
  '2026-03-29': 'Новолуние в Овне с затмением',
  '2026-04-12': 'Венера соединяется с Юпитером — деньги/любовь',
  '2026-05-26': 'Меркурий ретроградный в Близнецах',
  '2026-06-25': 'Сатурн ретроградный в Овне',
  '2026-07-08': 'Полнолуние в Козероге — кармический рубеж',
  '2026-08-13': 'Юпитер тригон Уран — финансовый прорыв',
  '2026-09-22': 'Равноденствие — точка перезагрузки',
  '2026-10-04': 'Лилит в Скорпионе — теневая работа',
  '2026-11-11': 'Портал 11.11 — кодирование намерений',
  '2026-12-21': 'Зимнее солнцестояние — соединение Юпитера и Сатурна',
};

function pickAstroEvent(): string {
  const today = new Date();
  const isoToday = today.toISOString().slice(0, 10);
  // Find nearest upcoming event
  const dates = Object.keys(ASTRO_2026).sort();
  const upcoming = dates.find(d => d >= isoToday) ?? dates[0];
  return `${upcoming}: ${ASTRO_2026[upcoming]}`;
}

function pickLinkTarget(): { target: 'site' | 'bot'; url: string } {
  // Rotate by hour of day to ensure mix
  const h = new Date().getUTCHours();
  return h % 2 === 0
    ? { target: 'site', url: SITE_LINK }
    : { target: 'bot', url: BOT_LINK };
}

async function callAI(messages: any[], json = false) {
  const res = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${LOVABLE_KEY}` },
    body: JSON.stringify({
      model: 'google/gemini-2.5-pro',
      messages,
      ...(json ? { response_format: { type: 'json_object' } } : {}),
    }),
  });
  if (!res.ok) throw new Error(`AI ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

async function publishToThreads(text: string): Promise<{ thread_id: string; permalink: string }> {
  // 2-step: create container, then publish
  const createUrl = `https://graph.threads.net/v1.0/${THREADS_USER_ID}/threads`;
  const createBody = new URLSearchParams({
    media_type: 'TEXT',
    text,
    access_token: THREADS_TOKEN,
  });
  const created = await fetch(createUrl, { method: 'POST', body: createBody });
  if (!created.ok) throw new Error(`create ${created.status}: ${await created.text()}`);
  const { id: containerId } = await created.json();

  // Threads requires ~30s wait, but TEXT is usually instant; try once, then retry once
  const publishUrl = `https://graph.threads.net/v1.0/${THREADS_USER_ID}/threads_publish`;
  const publishBody = new URLSearchParams({
    creation_id: containerId,
    access_token: THREADS_TOKEN,
  });
  let pubRes = await fetch(publishUrl, { method: 'POST', body: publishBody });
  if (!pubRes.ok) {
    await new Promise(r => setTimeout(r, 5000));
    pubRes = await fetch(publishUrl, { method: 'POST', body: publishBody });
  }
  if (!pubRes.ok) throw new Error(`publish ${pubRes.status}: ${await pubRes.text()}`);
  const { id: threadId } = await pubRes.json();

  // Fetch permalink
  const meta = await fetch(`https://graph.threads.net/v1.0/${threadId}?fields=permalink&access_token=${THREADS_TOKEN}`);
  const metaJson = meta.ok ? await meta.json() : {};

  return { thread_id: threadId, permalink: metaJson.permalink ?? '' };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  // 1) Load active patterns
  const { data: patterns } = await supabase
    .from('threads_virality_patterns')
    .select('*')
    .eq('active', true)
    .limit(40);

  // 2) Pull 5 top viral examples for style anchoring
  const { data: examples } = await supabase
    .from('threads_competitor_posts')
    .select('text,engagement_rate')
    .order('engagement_rate', { ascending: false })
    .limit(5);

  const astroEvent = pickAstroEvent();
  const link = pickLinkTarget();

  const systemPrompt = `Ты — топ-копирайтер виральных постов в Threads для русскоязычной эзо-аудитории.
Бренд: НейроДзен — AI для астрологии и матрицы судьбы.
ЦЕЛЬ: максимум сохранений + переходов по ссылке ${link.url}.

ПРАВИЛА:
- Длина 300-450 символов (оптимум для Threads).
- Первая строка — ХУК (обрыв, цифра, вопрос, шок). Без воды.
- Дальше — конкретика (даты, знаки, действия).
- Без агрессии и FOMO-таймеров. Магия + забота.
- В конце мягкий CTA с ссылкой ${link.url}.
- Эмодзи 2-4 шт, не больше. Без хэштегов в конце.
- Факты должны быть КОРРЕКТНЫ.

КОНТЕКСТ ДНЯ: ${astroEvent}

ПАТТЕРНЫ ВИРАЛЬНОСТИ (используй):
${(patterns ?? []).map(p => `- [${p.pattern_type}] ${p.name}: ${p.description}`).join('\n')}

ОБРАЗЦЫ ВИРАЛЬНЫХ ПОСТОВ КОНКУРЕНТОВ (стиль/тон, НЕ КОПИРОВАТЬ):
${(examples ?? []).map((e, i) => `[${i + 1}] ${e.text}`).join('\n\n')}`;

  // 3) Generate (3 candidates, pick best)
  const draftsRaw = await callAI([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: 'Сгенерируй 3 варианта поста. Верни JSON: {"variants":[{"text":"...","hook":"...","topic":"..."}]}' },
  ], true);
  const drafts = JSON.parse(draftsRaw).variants ?? [];
  if (drafts.length === 0) {
    return new Response(JSON.stringify({ error: 'no drafts' }), { status: 500, headers: corsHeaders });
  }

  // 4) Self-critique: pick best
  const critiqueRaw = await callAI([
    { role: 'system', content: 'Ты строгий редактор виральных постов. Оцени каждый по 10 критериям (hook, ясность, эмоция, конкретика, длина, CTA, факты, оригинальность, ритм, шанс репоста) — каждый 0-10. Верни JSON.' },
    { role: 'user', content: `Варианты:\n${drafts.map((d: any, i: number) => `[${i}] ${d.text}`).join('\n\n')}\n\nВерни {"best_index":N,"score":0-100,"reasoning":"..."}.` },
  ], true);
  const critique = JSON.parse(critiqueRaw);
  const best = drafts[critique.best_index ?? 0];
  const score = critique.score ?? 0;

  // 5) Ensure link is in text
  let finalText: string = best.text;
  if (!finalText.includes(link.url)) {
    finalText = `${finalText.trim()}\n\n${link.url}`;
  }
  if (finalText.length > 500) finalText = finalText.slice(0, 497) + '...';

  // 6) Publish
  const draftRow = await supabase.from('threads_posts').insert({
    text: finalText,
    hook: best.hook,
    topic: best.topic,
    link_target: link.target,
    link_url: link.url,
    predicted_score: score,
    status: 'scheduled',
  }).select('id').single();

  try {
    const { thread_id, permalink } = await publishToThreads(finalText);
    await supabase.from('threads_posts').update({
      thread_id, permalink, status: 'published', posted_at: new Date().toISOString(),
    }).eq('id', draftRow.data!.id);
    return new Response(JSON.stringify({ ok: true, thread_id, permalink, score }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    await supabase.from('threads_posts').update({
      status: 'failed', error_message: String(e),
    }).eq('id', draftRow.data!.id);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});