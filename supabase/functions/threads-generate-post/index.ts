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

const ZODIAC = [
  '♈ Овен','♉ Телец','♊ Близнецы','♋ Рак','♌ Лев','♍ Дева',
  '♎ Весы','♏ Скорпион','♐ Стрелец','♑ Козерог','♒ Водолей','♓ Рыбы',
];

const LENGTH_BUCKETS = [
  { id: 'short', range: '80-150 символов' },
  { id: 'medium', range: '250-350 символов' },
  { id: 'long', range: '400-500 символов' },
];

function weightedPick<T extends { weight: number }>(items: T[]): T {
  const total = items.reduce((s, x) => s + x.weight, 0);
  let r = Math.random() * total;
  for (const it of items) { r -= it.weight; if (r <= 0) return it; }
  return items[0];
}

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

function pickLinkTarget(): { target: 'none' | 'bot'; url: string | null } {
  // Safer mode after unban: no site link in posts at all.
  // Bot link only in CTA replies of daily_forecast.
  return { target: 'none', url: null };
}

async function callAI(messages: any[], json = false) {
  const models = ['google/gemini-2.5-pro', 'google/gemini-2.5-flash', 'google/gemini-2.5-flash'];
  let lastErr = '';
  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${LOVABLE_KEY}` },
          body: JSON.stringify({
            model,
            messages,
            ...(json ? { response_format: { type: 'json_object' } } : {}),
          }),
        });
        if (!res.ok) { lastErr = `AI ${res.status}: ${await res.text()}`; continue; }
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content ?? '';
        if (!content || !content.trim()) { lastErr = 'empty AI content'; continue; }
        return content;
      } catch (e) { lastErr = String(e); }
    }
  }
  throw new Error(`callAI failed: ${lastErr}`);
}

function safeJSON(raw: string): any {
  const cleaned = raw.replace(/^```(?:json)?/i, '').replace(/```\s*$/, '').trim();
  try { return JSON.parse(cleaned); }
  catch {
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (m) { try { return JSON.parse(m[0]); } catch {} }
    return {};
  }
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

async function publishReply(text: string, replyToId: string): Promise<{ thread_id: string }> {
  const createUrl = `https://graph.threads.net/v1.0/${THREADS_USER_ID}/threads`;
  const body = new URLSearchParams({
    media_type: 'TEXT',
    text,
    reply_to_id: replyToId,
    access_token: THREADS_TOKEN,
  });
  const created = await fetch(createUrl, { method: 'POST', body });
  if (!created.ok) throw new Error(`reply-create ${created.status}: ${await created.text()}`);
  const { id: containerId } = await created.json();

  const publishUrl = `https://graph.threads.net/v1.0/${THREADS_USER_ID}/threads_publish`;
  const publishBody = new URLSearchParams({ creation_id: containerId, access_token: THREADS_TOKEN });
  let res = await fetch(publishUrl, { method: 'POST', body: publishBody });
  if (!res.ok) {
    await new Promise(r => setTimeout(r, 5000));
    res = await fetch(publishUrl, { method: 'POST', body: publishBody });
  }
  if (!res.ok) throw new Error(`reply-publish ${res.status}: ${await res.text()}`);
  const { id: threadId } = await res.json();
  return { thread_id: threadId };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  let forceFormat: string | null = null;
  if (req.method === 'POST') {
    try { const b = await req.json(); forceFormat = b?.force_format ?? null; } catch {}
  }

  // 0) Pick format + length
  const { data: formats } = await supabase
    .from('threads_formats').select('*').eq('active', true);
  if (!formats || formats.length === 0) {
    return new Response(JSON.stringify({ error: 'no formats' }), { status: 500, headers: corsHeaders });
  }
  const format = forceFormat
    ? (formats as any[]).find(f => f.id === forceFormat) ?? weightedPick(formats as any[])
    : weightedPick(formats as any[]);
  const lengthBucket = LENGTH_BUCKETS[Math.floor(Math.random() * LENGTH_BUCKETS.length)];

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

  // ============ DAILY FORECAST THREAD ============
  if (format.is_thread && format.id === 'daily_forecast') {
    const today = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    const GROUPS = [
      { name: 'Огонь', signs: ['♈ Овен','♌ Лев','♐ Стрелец'] },
      { name: 'Земля', signs: ['♉ Телец','♍ Дева','♑ Козерог'] },
      { name: 'Воздух', signs: ['♊ Близнецы','♎ Весы','♒ Водолей'] },
      { name: 'Вода',  signs: ['♋ Рак','♏ Скорпион','♓ Рыбы'] },
    ];
    const sysThread = `Ты — астролог НейроДзен. Сделай прогноз на ${today}.
КОНТЕКСТ ДНЯ: ${astroEvent}.

Верни строго JSON:
{
  "intro": "пост-хедер 220-300 символов: триггер дня + анонс 'Ниже — прогноз по стихиям'. Тепло, без агрессии. В конце строка 'Твоя стихия ниже 👇'. 1-2 эмодзи.",
  "groups": [
${GROUPS.map(g => `    {"name":"${g.name}","signs":[${g.signs.map(s => `{"sign":"${s}","text":"60-100 символов: 1 конкретный совет/предупреждение"}`).join(',')}]}`).join(',\n')}
  ]
}

Длина каждого group-поста (после склейки знаков) ≤ 450 символов. Без хэштегов.`;

    const raw = await callAI([
      { role: 'system', content: sysThread },
      { role: 'user', content: 'Сгенерируй прогноз сегодняшнего дня по 4 стихиям.' },
    ], true);
    const parsed = safeJSON(raw);
    const intro: string = parsed.intro;
    const groups: Array<{ name: string; signs: Array<{ sign: string; text: string }> }> = parsed.groups ?? [];

    // Publish parent
    const parentRow = await supabase.from('threads_posts').insert({
      text: intro, hook: 'daily_forecast_intro', topic: 'forecast',
      link_target: link.target, link_url: link.url,
      format_id: format.id, length_bucket: 'medium', status: 'scheduled',
    }).select('id').single();

    let parentThreadId = '';
    try {
      const pub = await publishToThreads(intro);
      parentThreadId = pub.thread_id;
      await supabase.from('threads_posts').update({
        thread_id: pub.thread_id, permalink: pub.permalink, status: 'published',
        posted_at: new Date().toISOString(),
      }).eq('id', parentRow.data!.id);
    } catch (e) {
      await supabase.from('threads_posts').update({ status: 'failed', error_message: String(e) })
        .eq('id', parentRow.data!.id);
      return new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 500, headers: corsHeaders });
    }

    // Build child posts: 4 group posts + 1 CTA post → bot
    const childTexts: Array<{ text: string; hook: string; isCta?: boolean }> = [];
    for (const g of groups) {
      const body = g.signs.map(s => `${s.sign}\n${s.text}`).join('\n\n');
      childTexts.push({ text: `🔥 Стихия ${g.name}\n\n${body}`, hook: `group_${g.name}` });
    }
    const ctaText =
      `Это общий прогноз по стихиям 🌙\n\n` +
      `Хочешь точный личный прогноз — по твоей дате рождения, с учётом транзитов именно к твоей натальной карте?\n\n` +
      `Бесплатно в боте 👉 ${BOT_LINK}`;
    childTexts.push({ text: ctaText, hook: 'cta_bot', isCta: true });

    // Publish replies sequentially
    const replies: string[] = [];
    let lastReplyId = parentThreadId;
    for (let i = 0; i < childTexts.length; i++) {
      const c = childTexts[i];
      const replyText = c.text;
      const childRow = await supabase.from('threads_posts').insert({
        text: replyText, hook: c.hook, topic: 'forecast',
        link_target: c.isCta ? 'bot' : link.target,
        link_url: c.isCta ? BOT_LINK : link.url,
        format_id: format.id, length_bucket: c.isCta ? 'medium' : 'medium',
        parent_post_id: parentRow.data!.id, reply_index: i + 1, status: 'scheduled',
      }).select('id').single();
      try {
        const r = await publishReply(replyText, lastReplyId);
        await supabase.from('threads_posts').update({
          thread_id: r.thread_id, status: 'published', posted_at: new Date().toISOString(),
        }).eq('id', childRow.data!.id);
        lastReplyId = r.thread_id;
        replies.push(r.thread_id);
        await new Promise(r => setTimeout(r, 1500));
      } catch (e) {
        await supabase.from('threads_posts').update({ status: 'failed', error_message: String(e) })
          .eq('id', childRow.data!.id);
      }
    }
    return new Response(JSON.stringify({ ok: true, mode: 'thread', parent: parentThreadId, replies: replies.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // ============ SINGLE POST (10 other formats) ============
  const systemPrompt = `Ты — топ-копирайтер виральных постов в Threads для русскоязычной эзо-аудитории.
Бренд: НейроДзен — AI для астрологии и матрицы судьбы.
ЦЕЛЬ: максимум сохранений и комментариев.

ФОРМАТ ПОСТА: ${format.name} — ${format.description}
ДЛИНА: ${lengthBucket.range} (строго!)

ПРАВИЛА:
- Первая строка — ХУК (обрыв, цифра, вопрос, шок). Без воды.
- Дальше — конкретика (даты, знаки, действия).
- Без агрессии и FOMO-таймеров. Магия + забота.
- В конце мягкий CTA в виде вопроса или приглашения к обсуждению (БЕЗ ссылок и БЕЗ URL).
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
  const drafts = safeJSON(draftsRaw).variants ?? [];
  if (drafts.length === 0) {
    return new Response(JSON.stringify({ error: 'no drafts' }), { status: 500, headers: corsHeaders });
  }

  // 4) Self-critique: pick best
  const critiqueRaw = await callAI([
    { role: 'system', content: 'Ты строгий редактор виральных постов. Оцени каждый по 10 критериям (hook, ясность, эмоция, конкретика, длина, CTA, факты, оригинальность, ритм, шанс репоста) — каждый 0-10. Верни JSON.' },
    { role: 'user', content: `Варианты:\n${drafts.map((d: any, i: number) => `[${i}] ${d.text}`).join('\n\n')}\n\nВерни {"best_index":N,"score":0-100,"reasoning":"..."}.` },
  ], true);
  const critique = safeJSON(critiqueRaw);
  const best = drafts[critique.best_index ?? 0];
  const score = critique.score ?? 0;

  // 5) Strip any URLs AI may have added (safer-mode: no links in single posts)
  let finalText: string = best.text.replace(/https?:\/\/\S+/g, '').replace(/\n{3,}/g, '\n\n').trim();
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
    format_id: format.id,
    length_bucket: lengthBucket.id,
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