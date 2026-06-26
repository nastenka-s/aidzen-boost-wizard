import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const DOMAIN = "https://aidzen.ru";
const FEED_SELF_URL = `${DOMAIN}/pinterest-rss.xml`;

function esc(s: string): string {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(d: Date): string {
  return d.toUTCString().replace("GMT", "+0000");
}

Deno.serve(async () => {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data, error } = await supabase
      .from("pinterest_pins")
      .select("id, title, description, image_url, link_url, created_at")
      .eq("status", "published")
      .neq("image_url", "")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw error;

    const items = (data ?? []).map((row) => {
      const guid = `${DOMAIN}/pin/${row.id}`;
      const pub = rfc822(new Date(row.created_at));
      return `
    <item>
      <title>${esc(row.title)}</title>
      <link>${esc(row.link_url)}</link>
      <guid isPermaLink="false">${esc(guid)}</guid>
      <pubDate>${pub}</pubDate>
      <description>${esc(row.description)}</description>
      <enclosure url="${esc(row.image_url)}" type="image/png" />
      <media:content url="${esc(row.image_url)}" medium="image" />
    </item>`;
    }).join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Астронейронка Нейродзен — Pinterest</title>
    <link>${DOMAIN}</link>
    <description>Ежедневные пины об астрологии и нумерологии от Астронейронки Нейродзен. Рассчитай свою натальную карту бесплатно.</description>
    <language>ru</language>
    <atom:link href="${FEED_SELF_URL}" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=600",
      },
      status: 200,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(`<?xml version="1.0"?><error>${esc(msg)}</error>`, {
      headers: { "Content-Type": "application/xml" },
      status: 500,
    });
  }
});