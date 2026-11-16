import { assertEquals, assertThrows } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { ARTICLE_DAILY_LIMIT, ARTICLE_PIN_COUNT, articleBodyDetails, articlePinContent, articlePinDays, articlePinDetails, articlePinEligible } from "./article-editorial.ts";
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
Deno.test("informative details use published body rather than promotional description", () => {
  const facts = ["Для расчёта Асцендента нужно знать точное время рождения.", "Место рождения необходимо для определения местного горизонта.", "Без времени рождения положение домов может быть неточным.", "Синастрия сопоставляет положения планет в двух натальных картах.", "Нумерологические интерпретации не гарантируют будущих событий."];
  const article_html = `<h2>Не использовать заголовок</h2>${facts.map(f => `<p>${f}</p>`).join("")}<p>Нейродзен предлагает три бесплатных расчёта.</p>`;
  const pin = articlePinContent({ ...article, article_html }, 0);
  assertEquals(JSON.parse(pin.astro_context).details, facts.slice(0, 4));
  assertEquals(articleBodyDetails(article_html, 1), [facts[3], facts[4], facts[0], facts[1]]);
  assertEquals(pin.pinterest_description.includes(facts[0]), true);
  assertEquals(pin.pinterest_description.includes("бесплатных"), false);
});
Deno.test("body extraction preserves negations and complete sentences without cutting claims", () => {
  const sentence = "Совместимость по дате рождения не гарантирует счастливых отношений.";
  assertEquals(articleBodyDetails(`<p>${sentence}</p><p>${"Слово ".repeat(80)}конец.</p><p>Оборванное утверждение без точки</p>`, 0), [sentence]);
});
Deno.test("article details omit scripts, promotional blocks and web addresses", () => {
  const sentence = "Для определения домов карты необходимо точное время рождения.";
  assertEquals(articleBodyDetails(`<script><p>Неверное утверждение из скрипта.</p></script><p>В этой статье разберём все ваши вопросы подробно.</p><p>${sentence} https://aidzen.ru/article</p>`, 0), [sentence]);
});
Deno.test("practical definitions and limitations precede generic opening promises", () => {
  const definition = "В астрологической традиции сравнение двух натальных карт называют синастрией.";
  const caution = "Синастрия не гарантирует счастливых отношений и не заменяет диалог.";
  const html = `<p>Этот метод позволяет заглянуть в особенности отношений и понять их потенциал.</p><p>${definition}</p><p>${caution}</p>`;
  assertEquals(articleBodyDetails(html, 0).slice(0, 2), [definition, caution]);
});