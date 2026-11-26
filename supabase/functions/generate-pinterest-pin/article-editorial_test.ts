import { assertEquals, assertThrows } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { ARTICLE_DAILY_LIMIT, ARTICLE_PIN_COUNT, articlePinDays, articlePinDestination, articlePinEligible } from "./article-editorial.ts";
import { cleanPinterestDescription } from "../_shared/pinterest-description.ts";
const article = { article_url: "https://aidzen.ru/goroskop-na-noyabr-2026", title: "Гороскоп на ноябрь 2026", description: "Гороскоп для всех знаков зодиака.", content_kind: "horoscope", publication_day: "2026-10-27" };
Deno.test("daily forecasts cannot generate pins", () => {
  const daily = { ...article, title: "Гороскоп на завтра, 29 октября 2026", content_kind: "tomorrow_horoscope" };
  assertEquals(articlePinEligible(daily), false);
  assertThrows(() => articlePinDestination(daily, 0));
  assertEquals(articlePinEligible({ ...daily, content_kind: "horoscope" }), false);
  assertEquals(articlePinEligible({ ...daily, title: "Гороскоп на 2026-10-29", content_kind: "horoscope" }), false);
});
Deno.test("monthly forecasts remain eligible", () => assertEquals(articlePinEligible(article), true));
Deno.test("informational astrology and numerology remain eligible", () => {
  assertEquals(articlePinEligible({ title: "Дома натальной карты", content_kind: "astrology_education" }), true);
  assertEquals(articlePinEligible({ title: "Совместимость в Матрице судьбы", content_kind: "numerology_education" }), true);
});
Deno.test("two article pins: publication day and the next day", () => {
  assertEquals(ARTICLE_PIN_COUNT, 2);
  assertEquals(articlePinDays("2026-10-30"), ["2026-10-30", "2026-10-31"]);
});
Deno.test("approved global daily cap is five pins", () => assertEquals(ARTICLE_DAILY_LIMIT, 5));
Deno.test("both pins open the article; external destinations and a third variant are rejected", () => {
  assertEquals([0, 1].map(v => articlePinDestination(article, v)), Array(2).fill(article.article_url));
  assertThrows(() => articlePinDestination({ ...article, article_url: "https://example.com/article" }, 0));
  assertThrows(() => articlePinDestination(article, 2));
});
Deno.test("existing RSS descriptions lose web addresses without losing article teaser", () => {
  assertEquals(cleanPinterestDescription("Разобрали подробнее в статье.\nhttps://aidzen.ru/article?utm_source=pinterest\nhttps://t.me/bot"), "Разобрали подробнее в статье.");
});
