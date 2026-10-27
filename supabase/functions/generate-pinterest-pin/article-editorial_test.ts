import { assertEquals, assertThrows } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { ARTICLE_DAILY_LIMIT, ARTICLE_PIN_COUNT, articlePinContent, articlePinDays } from "./article-editorial.ts";
const article = { article_url: "https://aidzen.ru/goroskop-na-noyabr-2026", title: "Гороскоп на ноябрь 2026", description: "Гороскоп для всех знаков зодиака.", content_kind: "horoscope", publication_day: "2026-10-27" };
Deno.test("four article pins across publication day and next three days", () => {
  assertEquals(ARTICLE_PIN_COUNT, 4);
  assertEquals(articlePinDays("2026-10-30"), ["2026-10-30", "2026-10-31", "2026-11-01", "2026-11-02"]);
});
Deno.test("approved global daily cap is twelve pins", () => assertEquals(ARTICLE_DAILY_LIMIT, 12));
Deno.test("all four pins retain exact article destination and distinct visuals", () => {
  const pins = [0, 1, 2, 3].map(v => articlePinContent(article, v));
  assertEquals(new Set(pins.map(p => p.design_id)).size, 4);
  assertEquals(pins.map(p => JSON.parse(p.astro_context).article_url), Array(4).fill(article.article_url));
});
Deno.test("reject external destinations and fifth variant", () => {
  assertThrows(() => articlePinContent({ ...article, article_url: "https://example.com/article" }, 0));
  assertThrows(() => articlePinContent(article, 4));
});