import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { chooseBrief, DISCLAIMER, moscowDay, pickSlot, visualStyle, type Brief } from "./editorial.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY") ?? "";
const KIE_AI_API_KEY = (Deno.env.get("KIE_AI_API_KEY") ?? "").trim();
const SITE_URL = "https://chat.aidzen.ru/login";
const BOT_URL = "https://t.me/matricasudbyaibot";
class ProviderError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
const response = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { ...corsHeaders, "Content-Type": "application/json" },
});

// AI may select copy variants, but cannot author facts, dates, meanings or lists.
async function generateContent(brief: Brief, design: ReturnType<typeof visualStyle>, target: string) {
  const variants = [brief.title, `${brief.title}: памятка`];
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-pro",
      messages: [
        { role: "system", content: 'You select a Russian Pinterest heading from an approved list. Return only JSON {"variant":0} or {"variant":1}. Never add text or facts.' },
        { role: "user", content: JSON.stringify({ variants, list: brief.bullets, style: design.id, category: brief.category }) },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) throw new ProviderError(res.status, `Lovable AI ${res.status}`);
  const j = await res.json();
  const message = j?.choices?.[0]?.message;
  if (message?.refusal || !message?.content) throw new ProviderError(403, "AI content refusal or empty response");
  const selected = JSON.parse(message.content);
  if (selected.variant !== 0 && selected.variant !== 1) throw new Error("Invalid AI heading selection");
  const title = variants[selected.variant];
  const interpretation = brief.category === "events" ? "" : ` ${DISCLAIMER}`;
  const cta = target === "site" ? "Персональный разбор — Нейродзен. Нажми на пин." : "Персональный разбор — в Telegram. Нажми на пин.";
  const description = `${brief.subtitle}. ${brief.bullets.join("; ")}.${interpretation}\nИсточники: ${brief.sources}\n${cta} #астрология #нумерология #натальнаякарта`;
  const texts = [title, brief.subtitle, ...brief.bullets, ...(interpretation ? ["Символические трактовки · не научный прогноз"] : []), "Нейродзен · aidzen.ru"];
  return {
    pinterest_title: title,
    pinterest_description: description,
    image_prompt: `Create a premium vertical Pinterest infographic, 1024x1536, 2:3. ${design.prompt} Render ONLY these exact Russian Cyrillic texts: ${JSON.stringify(texts)}. Heading at top, subtitle below, ${brief.bullets.length} clearly separated numbered rows, source note at bottom. Show ALL rows in full, use large readable type, generous safe margins, no clipped text. Do not invent dates, numbers, claims or labels. Illustration must be relevant to ${brief.category}; no celebrity faces, logos or watermarks.`,
  };
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
  if (!create.ok) throw new ProviderError(create.status, `Image provider ${create.status}`);
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
      throw new ProviderError(403, "Image provider denied or refused the task");
    }
  }
  throw new Error("kie.ai polling timeout");
}

// One item per invocation, protected by a database lease and a hard daily cap.
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST" && req.method !== "GET") return response({ error: "Method not allowed" }, 405);
  let body: Record<string, unknown> = {};
  try {
    if (req.method === "POST") {
      const parsed = await req.json();
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return response({ error: "Invalid request" }, 400);
      body = parsed;
    }
  } catch { return response({ error: "Invalid JSON" }, 400); }
  if (body.slot !== undefined && (typeof body.slot !== "number" || !Number.isInteger(body.slot) || body.slot < 0 || body.slot > 2)) return response({ error: "slot must be 0, 1 or 2" }, 400);
  const now = new Date();
  const { idx: slotIdx, slot } = pickSlot(now, typeof body.slot === "number" ? body.slot : undefined);
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: claim, error: claimError } = await supabase.rpc("claim_pinterest_generation", { p_slot: slotIdx });
  if (claimError) return response({ error: "Cannot reserve generation" }, 500);
  if (!claim?.token) return response({ ok: true, ...claim, slotIdx });
  const token: string = claim.token;
  try {
    const { data: recent, error: recentError } = await supabase.from("pinterest_pins")
      .select("topic").eq("status", "published").order("created_at", { ascending: false }).limit(30);
    if (recentError) throw recentError;
    const brief = chooseBrief(now, slotIdx, (recent ?? []).map(r => r.topic ?? ""));
    const design = visualStyle(moscowDay(now), slotIdx);
    const content = await generateContent(brief, design, slot.target);
    const imageUrl = await kieGenerateImage(content.image_prompt);
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) throw new Error(`download image ${imgRes.status}`);
    const bytes = new Uint8Array(await imgRes.arrayBuffer());
    const path = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${crypto.randomUUID()}.png`;
    const { error: upErr } = await supabase.storage.from("pinterest").upload(path, bytes, { contentType: "image/png", upsert: false });
    if (upErr) throw upErr;
    // Never publish after losing the lease or crossing the Moscow day boundary.
    const { data: state, error: stateError } = await supabase.from("pinterest_generation_state").select("lease_token, lease_until").eq("id", "daily").single();
    if (stateError || state?.lease_token !== token || Date.parse(state?.lease_until ?? "") <= Date.now() || moscowDay(now) !== moscowDay(new Date())) throw new Error("Generation lease expired");
    const { data: row, error: insErr } = await supabase.from("pinterest_pins").insert({
      title: content.pinterest_title,
      description: content.pinterest_description,
      image_url: `${SUPABASE_URL}/functions/v1/pinterest-img/${path}`,
      link_url: slot.target === "site" ? SITE_URL : BOT_URL,
      style: slot.style, link_target: slot.target,
      topic: `${brief.title} ::KEY::${brief.key} ::CAT::${brief.category} ::STYLE::${design.id}`,
      astro_context: JSON.stringify(brief), image_prompt: content.image_prompt, status: "published",
    }).select("id, title, topic").single();
    if (insErr) throw insErr;
    return response({ ok: true, slotIdx, visualStyle: design.id, category: brief.category, pin: row });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const status = e instanceof ProviderError ? e.status : 500;
    console.error("generate-pinterest-pin:", msg);
    if ([402, 403, 429].includes(status)) {
      await supabase.from("pinterest_generation_state").update({
        paused_reason: msg, resume_after: status === 429 ? new Date(Date.now()+6*3600000).toISOString() : null,
      }).eq("id", "daily").eq("lease_token", token);
    }
    await supabase.from("pinterest_pins").insert({
      title: "[failed]", description: msg.slice(0,500), image_url: "", link_url: SITE_URL,
      style: slot.style, link_target: slot.target, status: "failed", error_message: msg.slice(0,1000),
    });
    return response({ ok: false, error: msg, slotIdx }, status);
  } finally {
    const { error } = await supabase.from("pinterest_generation_state").update({ lease_token: null, lease_until: null }).eq("id", "daily").eq("lease_token", token);
    if (error) console.error("Pinterest lease release failed");
  }
});
