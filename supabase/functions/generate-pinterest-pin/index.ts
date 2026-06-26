import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const KIE_AI_API_KEY = (Deno.env.get("KIE_AI_API_KEY") ?? "").trim();

const SITE_URL = "https://aidzen.ru";
const BOT_URL = "https://t.me/Neurodzenaibot";
const CTA_LINE = "Рассчитай свою натальную карту в Астронейронке Нейродзен бесплатно — нажми на пин.";

type Slot = { hour: number; style: "dark" | "light"; target: "site" | "bot" };
// 4 слота за сутки (UTC). Итого: 2 dark + 2 light, 2 site + 2 bot
const SLOTS: Slot[] = [
  { hour: 6,  style: "dark",  target: "site" }, // 09:00 МСК
  { hour: 10, style: "light", target: "bot"  }, // 13:00 МСК
  { hour: 14, style: "dark",  target: "bot"  }, // 17:00 МСК
  { hour: 18, style: "light", target: "site" }, // 21:00 МСК
];

function pickSlot(now: Date, forceSlotIdx?: number): { idx: number; slot: Slot } {
  if (typeof forceSlotIdx === "number" && SLOTS[forceSlotIdx]) {
    return { idx: forceSlotIdx, slot: SLOTS[forceSlotIdx] };
  }
  const h = now.getUTCHours();
  // ближайший слот, у которого hour <= h
  let chosen = 0;
  for (let i = 0; i < SLOTS.length; i++) if (SLOTS[i].hour <= h) chosen = i;
  return { idx: chosen, slot: SLOTS[chosen] };
}

const STYLE_PROMPTS: Record<"dark" | "light", string> = {
  dark:
    "Глубокий тёмно-синий и фиолетовый фон, мерцающие звёзды и созвездия, тонкие неоновые акценты — лиловый, золотой. " +
    "Эстетика мистической инфографики: чёткие карточки, читаемая типографика, акцент на астрологических символах " +
    "(зодиак, луна, планеты, ретроградность). Премиальный современный стиль, кинематографичные блики.",
  light:
    "Светлый кремово-бежевый фон с лёгкой текстурой винтажной бумаги, нежные акварельные иллюстрации, " +
    "золотая обводка, ботанические и зодиакальные мотивы. Спокойная пастельная палитра, классическая засечная типографика. " +
    "Тёплая, женственная, эзотерическая эстетика — как в журналах об астрологии.",
};

// =============== Astro context (вычисляем грубо, без эфемерид) ===============
function moonPhase(date: Date): { phase: string; illumination: number } {
  // Conway's algorithm, погрешность ~1 день — достаточно для контекста
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  let r = y % 100;
  r %= 19;
  if (r > 9) r -= 19;
  r = ((r * 11) % 30) + (m < 3 ? m + 2 : m) + d;
  if (m < 3) r += 2;
  r -= y < 2000 ? 4 : 8.3;
  r = Math.floor(r + 0.5) % 30;
  const age = (r + 30) % 30;
  const illum = Math.round((1 - Math.cos((age / 29.53) * 2 * Math.PI)) * 50);
  let phase = "Растущая Луна";
  if (age < 1.5 || age > 28.5) phase = "Новолуние";
  else if (age < 7) phase = "Молодая Луна (растущий серп)";
  else if (age < 8.5) phase = "Первая четверть";
  else if (age < 14) phase = "Растущая Луна (горб)";
  else if (age < 15.5) phase = "Полнолуние";
  else if (age < 21) phase = "Убывающая Луна (горб)";
  else if (age < 22.5) phase = "Последняя четверть";
  else phase = "Убывающая Луна (старый серп)";
  return { phase, illumination: illum };
}

function sunSign(date: Date): string {
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  const ranges: Array<[string, [number, number], [number, number]]> = [
    ["Козерог",   [12, 22], [1, 19]],
    ["Водолей",   [1, 20],  [2, 18]],
    ["Рыбы",      [2, 19],  [3, 20]],
    ["Овен",      [3, 21],  [4, 19]],
    ["Телец",     [4, 20],  [5, 20]],
    ["Близнецы",  [5, 21],  [6, 20]],
    ["Рак",       [6, 21],  [7, 22]],
    ["Лев",       [7, 23],  [8, 22]],
    ["Дева",      [8, 23],  [9, 22]],
    ["Весы",      [9, 23],  [10, 22]],
    ["Скорпион",  [10, 23], [11, 21]],
    ["Стрелец",   [11, 22], [12, 21]],
  ];
  for (const [name, from, to] of ranges) {
    if ((m === from[0] && d >= from[1]) || (m === to[0] && d <= to[1])) return name;
  }
  return "Козерог";
}

function astroContext(now: Date): string {
  const { phase, illumination } = moonPhase(now);
  const sign = sunSign(now);
  const dateStr = now.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Moscow" });
  return `Сегодня ${dateStr}. Солнце в знаке ${sign}. ${phase}, освещённость ~${illumination}%.`;
}

// =============== Lovable AI (контент) ===============
async function generateContent(slot: Slot, astro: string) {
  const sys = `Ты — астролог-эксперт и SMM-копирайтер для Pinterest на русском.
Создавай ТОЧНЫЙ по фактам, актуальный контент для пина в стиле "Астронейронки Нейродзен".
Не выдумывай астрономические события — опирайся на присланный астроконтекст.
Возвращай строго валидный JSON без пояснений.`;

  const usr = `Астроконтекст: ${astro}

Сгенерируй один пин для Pinterest. Стиль визуала: ${slot.style === "dark" ? "тёмный мистический космос" : "светлый винтажный пастель"}.

Требования:
1) "topic" — короткая, цепляющая тема (астрология ИЛИ нумерология), уместная сегодня. Может опираться на фазу Луны, знак Солнца, время года.
2) "pin_title" — заголовок, который пойдёт на саму картинку, до 60 символов, ВЕРХНИМ РЕГИСТРОМ если стиль тёмный, в обычном если светлый. Без эмоджи.
3) "pin_subtitle" — короткий подзаголовок на картинке, до 80 символов.
4) "bullet_points" — массив из 3–4 коротких пунктов (до 70 символов каждый), которые тоже пойдут на саму картинку. Должны быть фактически верными для астрологии/нумерологии.
5) "pinterest_title" — заголовок пина в Pinterest, до 95 символов, с ключевыми словами.
6) "pinterest_description" — описание пина, 200–450 символов. ОБЯЗАТЕЛЬНО заканчивается отдельным предложением-призывом: "${CTA_LINE}" Используй 4–6 хэштегов в конце (#астрология #нумерология и т.п.).
7) "image_prompt" — детальный английский промпт для GPT-Image-2 на ВЕРТИКАЛЬНУЮ Pinterest-картинку 1024x1536 (соотношение 2:3). Включи:
   - "${STYLE_PROMPTS[slot.style]}"
   - Точный русский текст заголовка ("${"<pin_title>"}"), подзаголовка и пунктов так, чтобы он был ЧИТАЕМО отрисован на картинке (укажи Cyrillic Russian text, exact spelling).
   - Маленькую подпись внизу: "Астронейронка Нейродзен · aidzen.ru".
   - Без водяных знаков, без логотипов брендов, без лиц знаменитостей.

Верни JSON со строго этими ключами: topic, pin_title, pin_subtitle, bullet_points, pinterest_title, pinterest_description, image_prompt.`;

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-pro",
      messages: [
        { role: "system", content: sys },
        { role: "user", content: usr },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) throw new Error(`Lovable AI ${res.status}: ${await res.text()}`);
  const j = await res.json();
  const raw = j?.choices?.[0]?.message?.content;
  if (!raw) throw new Error("Empty AI response");
  return JSON.parse(raw);
}

// =============== kie.ai GPT-Image-2 ===============
async function kieGenerateImage(prompt: string): Promise<string> {
  const create = await fetch("https://api.kie.ai/api/v1/jobs/createTask", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KIE_AI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-2-text-to-image",
      input: {
        prompt,
        size: "2:3",
        nVariants: 1,
        quality: "high",
      },
    }),
  });
  const ctext = await create.text();
  if (!create.ok) throw new Error(`kie.ai createTask ${create.status}: ${ctext}`);
  const cjson = JSON.parse(ctext);
  const taskId = cjson?.data?.taskId ?? cjson?.data?.task_id ?? cjson?.taskId;
  if (!taskId) throw new Error(`kie.ai no taskId: ${ctext}`);

  // Poll up to ~5 min
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const info = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
      headers: { Authorization: `Bearer ${KIE_AI_API_KEY}` },
    });
    const itext = await info.text();
    if (!info.ok) {
      console.warn(`recordInfo ${info.status}: ${itext}`);
      continue;
    }
    const ij = JSON.parse(itext);
    const state: string = ij?.data?.state ?? ij?.data?.status ?? "";
    if (state === "success" || state === "succeeded" || state === "completed") {
      const resultJson = ij?.data?.resultJson ?? ij?.data?.response ?? ij?.data;
      const parsedResult = typeof resultJson === "string" ? JSON.parse(resultJson) : resultJson;
      const urls: string[] =
        parsedResult?.resultUrls ??
        parsedResult?.result_urls ??
        parsedResult?.images ??
        parsedResult?.output ??
        [];
      const url = Array.isArray(urls) ? urls[0] : urls;
      if (typeof url === "string" && url.startsWith("http")) return url;
      throw new Error(`kie.ai success but no url: ${itext}`);
    }
    if (state === "fail" || state === "failed" || state === "error") {
      throw new Error(`kie.ai task failed: ${itext}`);
    }
  }
  throw new Error("kie.ai polling timeout");
}

// =============== Main ===============
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  let body: any = {};
  try { body = req.method === "POST" ? await req.json() : {}; } catch { /* noop */ }

  const now = new Date();
  const { idx: slotIdx, slot } = pickSlot(now, body?.slot);

  // Guard: один пин на слот в сутки
  if (!body?.force) {
    const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const { count } = await supabase
      .from("pinterest_pins")
      .select("id", { count: "exact", head: true })
      .eq("style", slot.style)
      .eq("link_target", slot.target)
      .gte("created_at", startOfDay.toISOString());
    if ((count ?? 0) > 0) {
      return new Response(JSON.stringify({ ok: true, skipped: "slot_already_done", slotIdx, slot }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  try {
    const astro = astroContext(now);
    const content = await generateContent(slot, astro);

    const imageUrl = await kieGenerateImage(content.image_prompt);

    // Скачиваем картинку и кладём в наш bucket
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) throw new Error(`download image ${imgRes.status}`);
    const bytes = new Uint8Array(await imgRes.arrayBuffer());
    const path = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${crypto.randomUUID()}.png`;
    const { error: upErr } = await supabase.storage.from("pinterest").upload(path, bytes, {
      contentType: "image/png",
      upsert: false,
    });
    if (upErr) throw new Error(`storage upload: ${upErr.message}`);

    // 10 лет signed URL — Pinterest скачивает картинку при первом краулинге
    const { data: signed, error: signErr } = await supabase.storage
      .from("pinterest")
      .createSignedUrl(path, 60 * 60 * 24 * 3650);
    if (signErr || !signed?.signedUrl) throw new Error(`sign url: ${signErr?.message}`);

    const linkUrl = slot.target === "site" ? SITE_URL : BOT_URL;

    const { data: row, error: insErr } = await supabase
      .from("pinterest_pins")
      .insert({
        title: content.pinterest_title,
        description: content.pinterest_description,
        image_url: signed.signedUrl,
        link_url: linkUrl,
        style: slot.style,
        link_target: slot.target,
        topic: content.topic,
        astro_context: astro,
        image_prompt: content.image_prompt,
        status: "published",
      })
      .select()
      .single();
    if (insErr) throw insErr;

    return new Response(JSON.stringify({ ok: true, slotIdx, slot, pin: row }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("generate-pinterest-pin error:", msg);
    await supabase.from("pinterest_pins").insert({
      title: "[failed]",
      description: msg.slice(0, 500),
      image_url: "",
      link_url: SITE_URL,
      style: slot.style,
      link_target: slot.target,
      status: "failed",
      error_message: msg.slice(0, 1000),
    });
    return new Response(JSON.stringify({ ok: false, error: msg, slotIdx, slot }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});