import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { moscowDay } from "./editorial.ts";
import { articlePinDestination, articlePinEligible, type PinArticle } from "./article-editorial.ts";
import { extractPinSpec, GatewayError, gatewayPropose } from "./pin-extract.ts";
import { articlePlainText, pinDescription, pinPalette } from "./pin-spec.ts";
import { renderPinPng } from "./pin-render.ts";
import approvedArticles from "../_shared/approved-articles.json" with { type: "json" };

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY") ?? "";
const response = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { ...corsHeaders, "Content-Type": "application/json" },
});
const WASM_PATH = "assets/resvg-2.6.2.wasm";
// The renderer binary is kept in our own private storage; the public CDN only seeds it once.
// deno-lint-ignore no-explicit-any
async function loadWasm(supabase: any): Promise<ArrayBuffer> {
  const saved = await supabase.storage.from("pinterest").download(WASM_PATH);
  if (saved.data) return await saved.data.arrayBuffer();
  const res = await fetch("https://unpkg.com/@resvg/resvg-wasm@2.6.2/index_bg.wasm");
  if (!res.ok) throw new Error("Pin renderer unavailable");
  const bytes = await res.arrayBuffer();
  await supabase.storage.from("pinterest").upload(WASM_PATH, new Uint8Array(bytes), { contentType: "application/wasm", upsert: true });
  return bytes;
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
    const kind = (article as { pin_kind?: string }).pin_kind ?? "horoscope";
    if (!articlePinEligible({ title: article.topic, content_kind: kind })) continue;
    const { error } = await supabase.rpc("enqueue_pinterest_article", {
      p_url: article.published_url, p_title: article.topic, p_description: article.description,
      p_kind: kind, p_day: moscowDay(new Date(article.generated_at)),
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
    if (!articlePinEligible(article)) throw new Error("Article is not eligible for Pinterest pins");
    const { data: published, error: articleError } = await supabase.from("blog_topics")
      .select("dzen_html").eq("published_url", article.article_url).eq("status", "published").maybeSingle();
    if (articleError) throw new Error("Cannot read published article details");
    const manual = approvedArticles.find(item => item.published_url === article.article_url);
    const destination = articlePinDestination(article, variant);
    // A saved retry keeps the image and the copy that belong together.
    let content = claim.job.image_payload ?? null;
    if (!content) {
      if (!LOVABLE_API_KEY) throw new Error("AI gateway is not configured");
      const articleText = articlePlainText(published?.dzen_html ?? manual?.dzen_html ?? "");
      if (articleText.length < 600) throw new Error("Published article text is missing");
      let previous: { title: string; layout: string } | undefined;
      if (variant > 0) {
        const { data: earlier } = await supabase.from("pinterest_pins").select("astro_context").eq("article_url", article.article_url).lt("article_variant", variant).order("article_variant", { ascending: false }).limit(1).maybeSingle();
        try { const spec = JSON.parse(earlier?.astro_context ?? "{}").spec; if (spec?.title) previous = { title: spec.title, layout: spec.layout }; } catch { /* legacy pin without a spec */ }
      }
      const spec = await extractPinSpec({ title: article.title, articleText, variant, previous, propose: gatewayPropose(LOVABLE_API_KEY) });
      const bytes = await renderPinPng(spec, () => loadWasm(supabase));
      const palette = pinPalette(spec);
      const path = `articles/${crypto.randomUUID()}.png`;
      const { error: upErr } = await supabase.storage.from("pinterest").upload(path, bytes, { contentType: "image/png", upsert: false });
      if (upErr) throw upErr;
      content = {
        pinterest_title: spec.title.slice(0, 100), pinterest_description: pinDescription(spec, variant, article.content_kind),
        style: palette.dark ? "dark" : "light", destination_url: destination,
        topic: `${article.title} ::ARTICLE::${new URL(destination).pathname} ::VARIANT::${variant} ::LAYOUT::${spec.layout}`,
        // The editable fields the image was drawn from.
        astro_context: JSON.stringify({ article_url: article.article_url, title: article.title, variant, spec }),
        image_prompt: `programmatic:${spec.layout}:${palette.id}`,
        image_url: `${SUPABASE_URL}/functions/v1/pinterest-img/${path}`,
      };
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
    const status = e instanceof GatewayError ? e.status : 500;
    console.error("generate-pinterest-pin:", msg);
    if (status === 402 || status === 429) {
      // Only an account-wide gateway limit pauses the queue, and it always resumes by itself.
      await supabase.from("pinterest_generation_state").update({
        paused_reason: msg, resume_after: new Date(Date.now() + (status === 429 ? 1 : 6) * 3600000).toISOString(),
      }).eq("id", "daily").eq("lease_token", token);
    } else {
      // One article that cannot produce a valid pin must not block the others.
      await supabase.rpc("fail_pinterest_article", { p_url: article.article_url, p_variant: variant, p_error: msg.slice(0, 1000) });
    }
    return response({ ok: false, error: msg, variant }, status);
  } finally {
    const { error } = await supabase.from("pinterest_generation_state").update({ lease_token: null, lease_until: null }).eq("id", "daily").eq("lease_token", token);
    if (error) console.error("Pinterest lease release failed");
    if (!error) await supabase.rpc("dispatch_pinterest_articles");
  }
});
