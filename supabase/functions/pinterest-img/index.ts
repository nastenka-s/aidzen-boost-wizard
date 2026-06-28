import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = new URL(req.url);
  // Path is everything after /pinterest-img/ OR ?p=
  let path = url.searchParams.get("p") ?? "";
  if (!path) {
    const m = url.pathname.match(/pinterest-img\/(.+)$/);
    if (m) path = decodeURIComponent(m[1]);
  }
  if (!path || path.includes("..")) {
    return new Response("bad path", { status: 400, headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data, error } = await supabase.storage.from("pinterest").download(path);
  if (error || !data) {
    return new Response("not found", { status: 404, headers: corsHeaders });
  }

  const bytes = new Uint8Array(await data.arrayBuffer());
  return new Response(bytes, {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": data.type || "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
});