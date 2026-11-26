export const ARTICLE_PIN_COUNT = 2;
export const ARTICLE_DAILY_LIMIT = 5;
export type PinArticle = { article_url: string; dzen_url?: string | null; title: string; description: string; content_kind: string; publication_day: string };
export function articlePinEligible(article: Pick<PinArticle, "content_kind" | "title">): boolean {
  const kind = article.content_kind.toLowerCase();
  const title = article.title.toLowerCase();
  if (/daily|tomorrow/.test(kind) || /на завтра|на сегодня|на день|\d{4}-\d{2}-\d{2}/.test(title)) return false;
  if (/^(astrology_education|numerology_education|astrology|numerology|informational)$/.test(kind)) return true;
  return /^(horoscope|monthly_horoscope)$/.test(kind) && /январ|феврал|март|апрел|ма[йя]|июн|июл|август|сентябр|октябр|ноябр|декабр|на месяц/.test(title);
}
export function articlePinDays(day: string): string[] {
  return Array.from({ length: ARTICLE_PIN_COUNT }, (_, offset) => new Date(Date.parse(`${day}T12:00:00Z`) + offset * 86400000).toISOString().slice(0, 10));
}
/** The pin always opens the website article it was built from. */
export function articlePinDestination(article: PinArticle, variant: number): string {
  if (!articlePinEligible(article)) throw new Error("Article is not eligible for Pinterest pins");
  if (!Number.isInteger(variant) || variant < 0 || variant >= ARTICLE_PIN_COUNT) throw new Error("Invalid article pin variant");
  const url = new URL(article.article_url);
  if (url.origin !== "https://aidzen.ru" || !/^\/[a-z0-9][a-z0-9/-]*$/.test(url.pathname) || url.search || url.hash) throw new Error("Invalid article URL");
  return url.href;
}
