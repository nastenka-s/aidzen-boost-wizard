import { cleanPinterestDescription } from "../_shared/pinterest-description.ts";

export const ARTICLE_PIN_COUNT = 4;
export const ARTICLE_DAILY_LIMIT = 5;
export type PinArticle = { article_url: string; dzen_url?: string | null; title: string; description: string; article_html?: string; content_kind: string; publication_day: string; pin_design?: string };
export function dzenArticleUrl(value: string | null | undefined): string {
  if (!value || !/^https:\/\/dzen\.ru\/a\/[A-Za-z0-9_-]+$/.test(value)) throw new Error("Verified Dzen article URL required");
  return value;
}
export function articlePinEligible(article: Pick<PinArticle, "content_kind" | "title">): boolean {
  const kind = article.content_kind.toLowerCase();
  const title = article.title.toLowerCase();
  if (/daily|tomorrow/.test(kind) || /на завтра|на сегодня|на день|\d{4}-\d{2}-\d{2}/.test(title)) return false;
  if (/^(astrology_education|numerology_education|astrology|numerology|informational)$/.test(kind)) return true;
  return /^(horoscope|monthly_horoscope)$/.test(kind) && /январ|феврал|март|апрел|ма[йя]|июн|июл|август|сентябр|октябр|ноябр|декабр|на месяц/.test(title);
}
const styles = [
  { id: "celestial-engraving", prompt: "A modern esoteric reference sheet: clean white background, deep emerald type, restrained silver engraved accents. Stack numbered editorial notes separated by thin rules, not ornate frames. One small topic-specific engraving." },
  { id: "mystic-watercolor", prompt: "A readable editorial explainer on white paper, burgundy headings and charcoal body type, restrained jade watercolor. An open asymmetric layout with spacious supporting notes and a small topic-matched illustration; no textured text backgrounds." },
  { id: "astral-photography", prompt: "A modern photographic explainer: white text area, charcoal type and wine-red accents. One beautiful topic-specific photograph occupies at most a quarter of the composition. Relationship themes show a romantic couple, learning themes show relevant objects; avoid unrelated crystals and tarot. The remaining space is structured readable notes." },
  { id: "zodiac-collage", prompt: "A contemporary esoteric magazine fact sheet: white and emerald with small silver accents. A small meaningful collage illustrates the exact subject; most of the composition is an open numbered list with strong typographic hierarchy, not an ornate poster." },
  { id: "wish-board-collage", prompt: "A soft vision-board collage in the style of a viral Pinterest wish map: blush pink, beige and cream pastel palette, dreamy warm sunlit lifestyle photographs (sea-view interior, peony bouquet, happy family on a beach, sunset villa, yoga by the sea) in a tidy grid, a pink velvet heart pillow with glowing golden '2027'. Supporting notes sit in rounded pale lavender and cream speech-bubble cards over the collage, dark warm-brown readable type." },
] as const;
export function articlePinDays(day: string): string[] {
  return Array.from({ length: ARTICLE_PIN_COUNT }, (_, offset) => new Date(Date.parse(`${day}T12:00:00Z`) + offset * 86400000).toISOString().slice(0, 10));
}
export function articlePinDetails(description: string, variant = 0): string[] {
  const plain = cleanPinterestDescription(description.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
  // Keep complete source sentences: cutting a claim midway can change its meaning.
  const sentences = plain.match(/[^.!?]+(?:[.!?]+|$)/gu) ?? [];
  const details: string[] = [];
  let length = 0;
  const offset = sentences.length > 3 ? (variant * 3) % sentences.length : 0;
  const rotated = [...sentences.slice(offset), ...sentences.slice(0, offset)];
  for (const sentence of rotated) {
    const detail = sentence.trim();
    if (!detail || length + detail.length > 480) continue;
    details.push(detail);
    length += detail.length;
    if (details.length === 3) break;
  }
  return details;
}
// Extract only complete published paragraphs/list items. Headings, service footers,
// promotions and dates embedded in URLs must not become invented teaser claims.
export function articleBodyDetails(html: string, variant: number): string[] {
  const blocks = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .match(/<(p|li)\b[^>]*>[\s\S]*?<\/\1>/gi) ?? [];
  const sentences: string[] = [];
  for (const block of blocks) {
    const plain = cleanPinterestDescription(block.replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;|&#160;/g, " ").replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
      .replace(/&lt;/g, "<").replace(/&gt;/g, ">"))
      .replace(/\s+/g, " ").trim();
    if (/нейродзен|бесплатн|расч[её]т.*онлайн|переходите|на нашем сайте|в этой статье|в статье разбер|только факты/i.test(plain)) continue;
    const complete = plain.match(/[^.!?]+[.!?]+(?=\s|$)/gu) ?? [];
    for (const raw of complete) {
      const sentence = raw.trim();
      if (sentence.length < 35 || sentence.length > 210 || sentences.includes(sentence)) continue;
      sentences.push(sentence);
    }
  }
  // Prefer definitions, required inputs, examples and limitations over opening
  // promises. Every selected sentence still remains an exact published quote.
  const usefulness = (sentence: string) => {
    let score = 0;
    if (/называют|означает|необходим|нужно знать|рассчитыва|складыва|сопостав|определени|время рождения|место рождения|по системе|например|к примеру|если|не гарант|не замен|не стоит|важно не|не означает|может быть неточ/i.test(sentence)) score += 3;
    if (/позволяет заглянуть|вы получаете|помогает совместимость|разбер[её]м|узнайте|потенциал отношений|понятную систему ориентиров/i.test(sentence)) score -= 4;
    return score;
  };
  const ranked = sentences.map((sentence, index) => ({ sentence, index, score: usefulness(sentence) }))
    .sort((a, b) => b.score - a.score || a.index - b.index).map(item => item.sentence);
  const offset = (variant * 3) % Math.max(ranked.length, 1);
  const rotated = [...ranked.slice(offset), ...ranked.slice(0, offset)];
  const selected: string[] = [];
  let total = 0;
  for (const sentence of rotated) {
    if (total + sentence.length > 600) continue;
    selected.push(sentence);
    total += sentence.length;
    if (selected.length === 4) break;
  }
  return selected;
}
export function articlePinContent(article: PinArticle, variant: number) {
  if (!articlePinEligible(article)) throw new Error("Article is not eligible for Pinterest pins");
  if (!Number.isInteger(variant) || variant < 0 || variant >= ARTICLE_PIN_COUNT) throw new Error("Invalid article pin variant");
  const source = new URL(article.article_url);
  if (source.origin !== "https://aidzen.ru" || !/^\/[a-z0-9][a-z0-9/-]*$/.test(source.pathname) || source.search || source.hash) throw new Error("Invalid article URL");
  const url = source;
  const seed = [...article.article_url].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const design = styles.find(style => style.id === article.pin_design) ?? styles[(seed + variant) % (styles.length - 1)];
  const title = article.title.trim();
  const invitations = ["Подробнее об этой теме рассказали в статье — переходите по ссылке.", "Разобрали эту тему подробнее в статье. Читайте полный материал по ссылке.", "Больше подробностей — в нашей статье на эту тему. Откройте её по ссылке.", "В статье рассказали подробнее: прочитайте полный разбор по ссылке."];
  // All topical claims come from the published article, never from an AI-authored forecast.
  const summary = cleanPinterestDescription(article.description);
  const bodyDetails = articleBodyDetails(article.article_html ?? "", variant);
  const details = bodyDetails.length ? bodyDetails : articlePinDetails(article.description, variant);
  const excerpt = bodyDetails.length ? bodyDetails.join(" ") : summary;
  const categoryTags = /numerology|нумеролог/i.test(article.content_kind + title) ? "#нумерология" : "#астрология";
  const description = `${excerpt ? `${excerpt}\n` : ""}${invitations[variant]}\n${categoryTags} #нейродзен`.slice(0, 800);
  const category = /numerology|нумеролог/i.test(article.content_kind + title) ? "numerology" : "astrology";
  return {
    pinterest_title: title.slice(0, 100), pinterest_description: description,
    style: design.id === "mystic-watercolor" || design.id === "zodiac-collage" || design.id === "wish-board-collage" ? "light" : "dark",
    design_id: design.id, topic: `${title} ::ARTICLE::${url.pathname} ::VARIANT::${variant} ::STYLE::${design.id}`,
    destination_url: url.href,
    astro_context: JSON.stringify({ article_url: article.article_url, title, variant, details }),
    image_prompt: `Create a premium informative vertical Pinterest image, 1024x1536, 2:3. ${design.prompt} Topic: ${title}. The imagery must specifically reflect this published ${category} article. Render ONLY these exact Russian Cyrillic texts: ${JSON.stringify([title, ...details, "Полный разбор — в статье", "Нейродзен"])}. This is a useful mini-lesson, not an advertisement or a title-only cover. Give supporting details the largest share of the canvas, approximately 55–65%; keep headline within the top 25%, topic imagery at most 25% and a discreet footer. Each supplied sentence is a separate prominent numbered note, with large straightforward sans-serif body text. Keep source qualifications and negations exactly. No promises of accuracy, guaranteed outcomes or free offers. No fake button or excessive gold, stars, crystals, frames, flourishes or busy galaxy backgrounds. Use the full vertical composition, never a central square crop. At a 375px-wide display all text must remain readable: body type equivalent to at least 18px, ample line spacing, safe margins of 6% and no overlaps. Wrap the full headline and sentences rather than shrinking or dropping words. Dates must remain unchanged. Celestial motifs are decorative, never a factual chart. No extra claims, dates, numbers, labels, URLs, celebrity faces, watermarks or logos.`,
  };
}