import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "GET" && req.method !== "HEAD") return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  const path = new URL(req.url).searchParams.get("p") ?? "";
  if (!/^[a-z0-9-]+\.(png|jpg|jpeg)$/.test(path)) return new Response("Bad path", { status: 400, headers: corsHeaders });
  const client = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");
  // Only public editorial images live in this service-write-only bucket.
  const { data, error } = await client.storage.from("blog-covers").download(path);
  if (error || !data) return new Response("Not found", { status: 404, headers: corsHeaders });
  return new Response(req.method === "HEAD" ? null : await data.arrayBuffer(), { headers: {
    ...corsHeaders, "Content-Type": data.type || "image/png", "Cache-Control": "public, max-age=3600",
    "X-Content-Type-Options": "nosniff",
  } });
});