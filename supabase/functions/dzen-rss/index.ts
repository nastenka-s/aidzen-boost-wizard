import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const DOMAIN = "https://aidzen.ru";
const FEED_SELF_URL = `${SUPABASE_URL}/functions/v1/dzen-rss`;

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

Deno.serve(async (_req) => {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    // Last 20 published auto-articles that have Dzen-ready content
    const { data, error } = await supabase
      .from("blog_topics")
      .select("topic, slug_hint, description, dzen_html, cover_url, generated_at, published_url, category")
      .eq("status", "published")
      .not("dzen_html", "is", null)
      .not("cover_url", "is", null)
      .order("generated_at", { ascending: false })
      .limit(20);
    if (error) throw error;

    const items = (data ?? []).map((row) => {
      const url = row.published_url || `${DOMAIN}/${row.slug_hint}`;
      const pubDate = row.generated_at ? rfc822(new Date(row.generated_at)) : rfc822(new Date());
      const cover = row.cover_url || "";
      // Убираем дублирующую обложку из начала content:encoded — она уже отдается через <enclosure>
      let body = row.dzen_html || "";
      if (cover) {
        const coverImgRe = new RegExp(
          `^\\s*<img[^>]*src=["']${cover.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}["'][^>]*\\/?>\\s*`,
          "i",
        );
        body = body.replace(coverImgRe, "");
      }
      return `
    <item>
      <title>${esc(row.topic)}</title>
      <link>${esc(url)}</link>
      <guid isPermaLink="true">${esc(url)}</guid>
      <pdalink>${esc(url)}</pdalink>
      <pubDate>${pubDate}</pubDate>
      <author>НейроДзен</author>
      <category>native-content</category>
      <category>format-article</category>
      <category>index</category>
      <category>comment-all</category>
      <description>${esc(row.description || row.topic)}</description>
      <enclosure url="${esc(cover)}" type="image/png" length="0" />
      <content:encoded><![CDATA[${body}]]></content:encoded>
    </item>`;
    }).join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>НейроДзен — астрология и нумерология</title>
    <link>${DOMAIN}/blog</link>
    <description>Экспертный блог об астрологии, нумерологии и эзотерике. Натальные карты, матрица судьбы, число судьбы, совместимость.</description>
    <language>ru</language>
    <atom:link href="${FEED_SELF_URL}" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=900",
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