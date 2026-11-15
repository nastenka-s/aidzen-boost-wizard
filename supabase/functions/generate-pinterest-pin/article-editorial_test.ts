import { assertEquals, assertThrows } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { ARTICLE_DAILY_LIMIT, ARTICLE_PIN_COUNT, articlePinContent, articlePinDays, articlePinDetails, articlePinEligible } from "./article-editorial.ts";
import { cleanPinterestDescription } from "../_shared/pinterest-description.ts";
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
  assertEquals(pins.map(p => p.destination_url), Array(4).fill(article.article_url));
});
Deno.test("no website fallback or channel destination for article pins", () => {
});
Deno.test("reject external destinations and fifth variant", () => {
  assertThrows(() => articlePinContent({ ...article, article_url: "https://example.com/article" }, 0));
  assertThrows(() => articlePinContent(article, 4));
});
Deno.test("pin details retain published claims rather than inventing teaser facts", () => {
  const description = "Число 11 в этой традиции не сокращают. Личный день рассчитывают по дате рождения. Результат не гарантирует события. https://aidzen.ru/article";
  const expected = ["Число 11 в этой традиции не сокращают.", "Личный день рассчитывают по дате рождения.", "Результат не гарантирует события."];
  assertEquals(articlePinDetails(description), expected);
  for (const variant of [0, 1, 2, 3]) {
    assertEquals(JSON.parse(articlePinContent({ ...article, description }, variant).astro_context).details, expected);
  }
});
Deno.test("pin details never truncate long source claims into misleading fragments", () => {
  assertEquals(articlePinDetails(`${"Слово ".repeat(100)}не гарантирует события. Краткое пояснение.`), ["Краткое пояснение."]);
});
Deno.test("article URLs stay in destinations but never in pin descriptions", () => {
  for (const variant of [0, 1, 2, 3]) {
    const pin = articlePinContent({ ...article, description: "Разбор пары. https://aidzen.ru/article www.dzen.ru/a/test aidzen.ru" }, variant);
    assertEquals(/https?:\/\/|aidzen\.ru|dzen\.ru/.test(pin.pinterest_description), false);
    assertEquals(pin.destination_url, "https://aidzen.ru/goroskop-na-noyabr-2026");
  }
});
Deno.test("existing RSS descriptions lose web addresses without losing article teaser", () => {
  assertEquals(cleanPinterestDescription("Разобрали подробнее в статье.\nhttps://aidzen.ru/article?utm_source=pinterest\nhttps://t.me/bot\n#астрология"), "Разобрали подробнее в статье.\n\n#астрология");
});