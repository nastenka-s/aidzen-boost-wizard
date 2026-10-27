import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { moscowDay } from "./editorial.ts";
import { articlePinContent, type PinArticle } from "./article-editorial.ts";
import approvedArticles from "../dzen-rss/approved-articles.json" with { type: "json" };

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY") ?? "";
const KIE_AI_API_KEY = (Deno.env.get("KIE_AI_API_KEY") ?? "").trim();
class ProviderError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
const response = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { ...corsHeaders, "Content-Type": "application/json" },
});


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
  if (req.method !== "POST") return response({ error: "Method not allowed" }, 405);
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
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: authorized, error: authError } = await supabase.rpc("authorize_blog_scheduler", { p_secret: req.headers.get("x-blog-scheduler-secret") ?? "" });
  if (authError || !authorized) return response({ error: "Unauthorized scheduler" }, 401);
  // Manual approved articles live outside blog_topics; the unique article URL makes syncing safe.
  for (const article of approvedArticles) {
    const { error } = await supabase.rpc("enqueue_pinterest_article", {
      p_url: article.published_url, p_title: article.topic, p_description: article.description,
      p_kind: "horoscope", p_day: moscowDay(new Date(article.generated_at)),
    });
    if (error) return response({ error: "Cannot sync approved article" }, 500);
  }
  const { data: claim, error: claimError } = await supabase.rpc("claim_pinterest_article");
  if (claimError) return response({ error: "Cannot reserve generation" }, 500);
  if (!claim?.token) return response({ ok: true, ...claim });
  const token: string = claim.token;
  const article: PinArticle = claim.article;
  const variant: number = claim.job.variant;
  try {
    let content = claim.job.image_payload;
    if (!content) {
      if (!KIE_AI_API_KEY) throw new Error("Image provider is not configured");
      const copy = articlePinContent(article, variant);
      const imageUrl = await kieGenerateImage(copy.image_prompt);
      const imgRes = await fetch(imageUrl);
      if (!imgRes.ok) throw new Error(`download image ${imgRes.status}`);
      const bytes = new Uint8Array(await imgRes.arrayBuffer());
      const path = `articles/${crypto.randomUUID()}.png`;
      const { error: upErr } = await supabase.storage.from("pinterest").upload(path, bytes, { contentType: "image/png", upsert: false });
      if (upErr) throw upErr;
      content = { ...copy, image_url: `${SUPABASE_URL}/functions/v1/pinterest-img/${path}` };
      const { error: savedError } = await supabase.from("pinterest_article_jobs").update({ image_payload: content }).eq("article_url", article.article_url).eq("variant", variant).eq("status", "pending");
      if (savedError) throw savedError;
    }
    // Never publish after losing the lease or crossing the Moscow day boundary.
    const { data: state, error: stateError } = await supabase.from("pinterest_generation_state").select("lease_token, lease_until").eq("id", "daily").single();
    if (stateError || state?.lease_token !== token || Date.parse(state?.lease_until ?? "") <= Date.now() || moscowDay(now) !== moscowDay(new Date())) throw new Error("Generation lease expired");
    const { data: pinId, error: insErr } = await supabase.rpc("finish_pinterest_article", {
      p_token: token, p_day: claim.day, p_url: article.article_url, p_variant: variant, p_content: content,
    });
    if (insErr) throw insErr;
    return response({ ok: true, variant, article_url: article.article_url, pin_id: pinId });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const status = e instanceof ProviderError ? e.status : 500;
    console.error("generate-pinterest-pin:", msg);
    if ([402, 403, 429].includes(status)) {
      await supabase.from("pinterest_generation_state").update({
        paused_reason: msg, resume_after: status === 429 ? new Date(Date.now()+6*3600000).toISOString() : null,
      }).eq("id", "daily").eq("lease_token", token);
    }
    await supabase.from("pinterest_article_jobs").update({ last_error: msg.slice(0,1000) }).eq("article_url", article.article_url).eq("variant", variant);
    return response({ ok: false, error: msg, variant }, status);
  } finally {
    const { error } = await supabase.from("pinterest_generation_state").update({ lease_token: null, lease_until: null }).eq("id", "daily").eq("lease_token", token);
    if (error) console.error("Pinterest lease release failed");
  }
});
