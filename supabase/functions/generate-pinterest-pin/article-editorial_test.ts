import { assertEquals, assertThrows } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { ARTICLE_DAILY_LIMIT, ARTICLE_PIN_COUNT, articlePinContent, articlePinDays, articlePinEligible } from "./article-editorial.ts";
const article = { article_url: "https://aidzen.ru/goroskop-na-noyabr-2026", dzen_url: "https://dzen.ru/a/test_verified_article", title: "Гороскоп на ноябрь 2026", description: "Гороскоп для всех знаков зодиака.", content_kind: "horoscope", publication_day: "2026-10-27" };
Deno.test("daily forecasts cannot generate pins", () => {
  const daily = { ...article, title: "Гороскоп на завтра, 29 октября 2026", content_kind: "tomorrow_horoscope" };
  assertEquals(articlePinEligible(daily), false);
  assertThrows(() => articlePinContent(daily, 0));
  assertEquals(articlePinEligible({ ...daily, content_kind: "horoscope" }), false);
  assertEquals(articlePinEligible({ ...daily, title: "Гороскоп на 2026-10-29", content_kind: "horoscope" }), false);
});
Deno.test("monthly forecasts remain eligible", () => assertEquals(articlePinEligible(article), true));
Deno.test("informational astrology and numerology remain eligible", () => {
  assertEquals(articlePinEligible({ title: "Дома натальной карты", content_kind: "astrology_education" }), true);
  assertEquals(articlePinEligible({ title: "Совместимость в Матрице судьбы", content_kind: "numerology_education" }), true);
});
Deno.test("four article pins across publication day and next three days", () => {
  assertEquals(ARTICLE_PIN_COUNT, 4);
  assertEquals(articlePinDays("2026-10-30"), ["2026-10-30", "2026-10-31", "2026-11-01", "2026-11-02"]);
});
Deno.test("approved global daily cap is twelve pins", () => assertEquals(ARTICLE_DAILY_LIMIT, 12));
Deno.test("all four pins retain exact article destination and distinct visuals", () => {
  const pins = [0, 1, 2, 3].map(v => articlePinContent(article, v));
  assertEquals(new Set(pins.map(p => p.design_id)).size, 4);
  assertEquals(pins.map(p => JSON.parse(p.astro_context).article_url), Array(4).fill(article.article_url));
  assertEquals(pins.map(p => p.destination_url), Array(4).fill(article.dzen_url));
});
Deno.test("no website fallback or channel destination for article pins", () => {
  assertThrows(() => articlePinContent({ ...article, dzen_url: null }, 0));
  assertThrows(() => articlePinContent({ ...article, dzen_url: article.article_url }, 0));
  assertThrows(() => articlePinContent({ ...article, dzen_url: "https://dzen.ru/astroneironka" }, 0));
});
Deno.test("reject external destinations and fifth variant", () => {
  assertThrows(() => articlePinContent({ ...article, article_url: "https://example.com/article" }, 0));
  assertThrows(() => articlePinContent(article, 4));
});