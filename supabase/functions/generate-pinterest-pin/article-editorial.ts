export const ARTICLE_PIN_COUNT = 4;
export const ARTICLE_DAILY_LIMIT = 12;
export type PinArticle = { article_url: string; dzen_url?: string | null; title: string; description: string; content_kind: string; publication_day: string };
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
  { id: "celestial-engraving", prompt: "Esoteric celestial engraving, emerald velvet and silver foil, delicate zodiac symbols, intricate moon frame, elegant readable serif heading." },
  { id: "mystic-watercolor", prompt: "Esoteric watercolor, pearl paper, burgundy and jade accents, hand-painted celestial symbols and fine botanical framing, elegant readable serif heading." },
  { id: "astral-photography", prompt: "Esoteric still-life photography, polished crystals, brass astrolabe and symbolic celestial cards, wine-red textile with ivory accents, large readable editorial heading." },
  { id: "zodiac-collage", prompt: "Esoteric editorial collage, ivory and emerald with silver details, engraved stars, celestial motifs and layered translucent paper, spacious readable heading." },
] as const;
export function articlePinDays(day: string): string[] {
  return Array.from({ length: ARTICLE_PIN_COUNT }, (_, offset) => new Date(Date.parse(`${day}T12:00:00Z`) + offset * 86400000).toISOString().slice(0, 10));
}
export function articlePinContent(article: PinArticle, variant: number) {
  if (!articlePinEligible(article)) throw new Error("Article is not eligible for Pinterest pins");
  if (!Number.isInteger(variant) || variant < 0 || variant >= ARTICLE_PIN_COUNT) throw new Error("Invalid article pin variant");
  const source = new URL(article.article_url);
  if (source.origin !== "https://aidzen.ru" || !/^\/[a-z0-9][a-z0-9/-]*$/.test(source.pathname) || source.search || source.hash) throw new Error("Invalid article URL");
  const url = new URL(dzenArticleUrl(article.dzen_url));
  const seed = [...article.article_url].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const design = styles[(seed + variant) % styles.length];
  const title = article.title.trim();
  const invitations = ["Подробнее об этой теме рассказали в статье — переходите по ссылке.", "Разобрали эту тему подробнее в статье. Читайте полный материал по ссылке.", "Больше подробностей — в нашей статье на эту тему. Откройте её по ссылке.", "В статье рассказали подробнее: прочитайте полный разбор по ссылке."];
  // All topical claims come from the published article, never from an AI-authored forecast.
  const summary = article.description.replace(/https?:\/\/\S+/g, "").trim();
  const description = `${summary ? `${summary}\n` : ""}${invitations[variant]}\n${url.href}\n#астрология #нумерология #эзотерика`.slice(0, 800);
  const category = /numerology|нумеролог/i.test(article.content_kind + title) ? "numerology" : "astrology";
  return {
    pinterest_title: title.slice(0, 100), pinterest_description: description,
    style: design.id === "mystic-watercolor" || design.id === "zodiac-collage" ? "light" : "dark",
    design_id: design.id, topic: `${title} ::ARTICLE::${url.pathname} ::VARIANT::${variant} ::STYLE::${design.id}`,
    destination_url: url.href,
    astro_context: JSON.stringify({ article_url: article.article_url, dzen_url: url.href, title, variant }),
    image_prompt: `Create a premium vertical Pinterest image, 1024x1536, 2:3. ${design.prompt} Topic: ${title}. The illustration must specifically reflect this published ${category} article, not a generic unrelated forecast. Render ONLY these exact Russian Cyrillic texts: ${JSON.stringify([title, "Подробнее — в статье", "Нейродзен · aidzen.ru"])}. Make the full title clearly readable, wrapping as needed, with generous safe margins. Do not invent facts, dates, numbers, planetary positions or predictions. Dates in the supplied title must remain exactly unchanged. Celestial elements are decorative, not a chart claiming real planetary positions. No other labels, celebrity faces, watermarks or logos.`,
  };
}