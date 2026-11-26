import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { ELEMENTS, PALETTES, PIN_HEIGHT, PIN_WIDTH, pinDescription, pinPalette, validatePinSpec, type PinSpec } from "./pin-spec.ts";
import { extractPinSpec, GatewayError } from "./pin-extract.ts";
const jupiter: PinSpec = { layout: "groups", title: "Где тебе всегда везёт?", hint: "Найди стихию знака, в котором стоит твой Юпитер", cta: "Разбор Юпитера по знакам — в статье",
  groups: [{ element: "fire", text: "Удача приходит через смелый шаг и собственные проекты." }, { element: "earth", text: "Везёт там, где нужны терпение и точный расчёт." }, { element: "air", text: "Шансы появляются в общении и учёбе." }, { element: "water", text: "Помогают интуиция и доверие близким." }] };
const numbers: PinSpec = { layout: "table", title: "Твой талант по дате рождения", hint: "Сложи все цифры даты рождения до одной цифры", cta: "Разбор каждого числа — в статье",
  table: { key_label: "Найди своё число", formula: "Сложи цифры дня, месяца и года", example: "14.03.1990: 1+4+0+3+1+9+9+0 = 27, 2+7 = 9", rows: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => ({ key: String(n), text: `Качество числа ${n}` })) } };
const moon: PinSpec = { layout: "calendar", title: "Лунный календарь на декабрь", hint: "Сверь дату с фазой Луны", cta: "Все лунные дни — в статье",
  calendar: { period: "Декабрь 2026", rows: [{ date: "9 декабря", label: "Новолуние в Стрельце" }, { date: "10–16 декабря", label: "Растущая Луна" }, { date: "17 декабря", label: "Первая четверть в Рыбах" }, { date: "24 декабря", label: "Полнолуние в Раке" }] } };
const matrix: PinSpec = { layout: "scheme", title: "Гид по матрице судьбы", hint: "Цифра на схеме — номер зоны в списке ниже", cta: "Как рассчитать точки — в статье",
  scheme: { diagram: "matrix", rows: [{ point: "left", name: "Портрет личности", text: "Аркан дня рождения" }, { point: "top", name: "Таланты", text: "Аркан месяца рождения" }, { point: "center", name: "Зона комфорта", text: "Центр матрицы" }] } };
const moonArticle = "В декабре 2026 года новолуние 9 декабря, растущая Луна 10–16 декабря, первая четверть 17 декабря, полнолуние 24 декабря.";

Deno.test("pins are exported at 1000 by 1500", () => assertEquals([PIN_WIDTH, PIN_HEIGHT], [1000, 1500]));
Deno.test("each element owns its three correct signs", () => {
  assertEquals(ELEMENTS.fire.signs, ["Овен", "Лев", "Стрелец"]);
  assertEquals(ELEMENTS.earth.signs, ["Телец", "Дева", "Козерог"]);
  assertEquals(ELEMENTS.air.signs, ["Близнецы", "Весы", "Водолей"]);
  assertEquals(ELEMENTS.water.signs, ["Рак", "Скорпион", "Рыбы"]);
});
Deno.test("the four acceptance topics pass the checks", () => {
  assertEquals(validatePinSpec(jupiter, "Юпитер в знаках"), []);
  assertEquals(validatePinSpec(numbers, "Пример: 14.03.1990"), []);
  assertEquals(validatePinSpec(moon, moonArticle), []);
  assertEquals(validatePinSpec(matrix, "Матрица судьбы"), []);
});
Deno.test("a sign under the wrong element or a missing element is rejected", () => {
  const wrong = { ...jupiter, groups: jupiter.groups!.map(g => g.element === "earth" ? { ...g, text: "Ракам везёт там, где нужен расчёт и терпение." } : g) };
  assert(validatePinSpec(wrong, "").some(e => e.includes("Рак не относится")));
  assert(validatePinSpec({ ...jupiter, groups: jupiter.groups!.slice(0, 3) }, "").some(e => e.includes("Вода")));
  assertEquals(validatePinSpec(jupiter, "").some(e => e.includes("не относится")), false);
});
Deno.test("formula, example and table must use one method", () => {
  const t = numbers.table!;
  assert(validatePinSpec({ ...numbers, table: { ...t, example: "14.03.1990: 1+4+0+3+1+9+9+0 = 28, 2+8 = 10" } }, "1990").some(e => e.includes("Неверная сумма")));
  assert(validatePinSpec({ ...numbers, table: { ...t, example: "29.12.1999: 2+9+1+2+1+9+9+9 = 42" } }, "1999").some(e => e.includes("одной из строк")));
  assert(validatePinSpec({ ...numbers, table: { ...t, formula: undefined } }, "1990").some(e => e.includes("формула")));
  const grouped = { ...numbers, table: { ...t, example: "Родился 19 числа: 1+9 = 10, 1+0 = 1", rows: [{ key: "1, 10, 19, 28", text: "Лидер и первопроходец" }, { key: "2, 11, 20, 29", text: "Дипломат и партнёр" }, { key: "3, 12, 21, 30", text: "Творец и рассказчик" }] } };
  assertEquals(validatePinSpec(grouped, ""), []);
});
Deno.test("calendar dates must exist in the article and periods are not exact phases", () => {
  assert(validatePinSpec(moon, "Новолуние 8 декабря 2026").some(e => e.includes("нет в статье")));
  const mixed = { ...moon, calendar: { ...moon.calendar!, rows: [...moon.calendar!.rows.slice(0, 3), { date: "10–16 декабря", label: "Полнолуние в Раке" }] } };
  assert(validatePinSpec(mixed, moonArticle).some(e => e.includes("период")));
  const timed = { ...moon, calendar: { ...moon.calendar!, rows: [{ date: "9 декабря", label: "Новолуние в 03:52" }, ...moon.calendar!.rows.slice(1)] } };
  assert(validatePinSpec(timed, moonArticle + " 03:52").some(e => e.includes("часовой пояс")));
  assertEquals(validatePinSpec({ ...timed, hint: "Сверь дату с фазой Луны, время московское" }, moonArticle + " 03:52"), []);
});
Deno.test("scheme captions must point at real diagram elements", () => {
  const bad = { ...matrix, scheme: { diagram: "matrix" as const, rows: [...matrix.scheme!.rows.slice(0, 2), { point: "nowhere", name: "Зона", text: "Пояснение зоны" }] } };
  assert(validatePinSpec(bad, "").some(e => e.includes("не привязана")));
  assert(validatePinSpec({ ...matrix, scheme: { diagram: "wheel", rows: matrix.scheme!.rows } }, "").some(e => e.includes("не привязана")));
});
Deno.test("the call to action promises the article only", () => {
  assert(validatePinSpec({ ...jupiter, cta: "Получи бесплатный расчёт в статье" }, "").some(e => e.includes("Бесплатный")));
  assert(validatePinSpec({ ...jupiter, cta: "Узнай знак своего Юпитера" }, "").some(e => e.includes("в статью")));
  assert(validatePinSpec({ ...jupiter, cta: "Посмотри все 12 знаков в статье" }, "Овен и Телец").some(e => e.includes("12 знаков")));
});
Deno.test("overflowing text is rejected instead of being shrunk", () => {
  const long = { ...numbers, table: { ...numbers.table!, rows: numbers.table!.rows.map(r => ({ ...r, text: "Очень длинная трактовка, которая займёт две полные строки" })) } };
  assert(validatePinSpec(long, "1990").some(e => e.includes("не помещается")));
});
Deno.test("palettes follow the brief", () => {
  assertEquals(pinPalette(moon), PALETTES.navy);
  assertEquals(pinPalette(jupiter), PALETTES.burgundy);
  assertEquals(pinPalette(numbers), PALETTES.marble);
  assertEquals(pinPalette(matrix), PALETTES.ink);
  assertEquals(pinPalette({ ...jupiter, title: "Что тебе важно в любви?", hint: "Найди стихию знака своей Венеры" }), PALETTES.lilac);
});
Deno.test("descriptions carry no links and name the article", () => {
  const d = pinDescription(jupiter, 0, "astrology");
  assertEquals(/https?:|aidzen/.test(d), false);
  assert(d.includes("в статье") && d.includes("Огонь (Овен, Лев, Стрелец)"));
});
Deno.test("rejected proposals are sent back with the reasons, and no credits stops the attempt", async () => {
  const prompts: string[] = [];
  const answers: unknown[] = [{ ...jupiter, cta: "Бесплатный расчёт в статье", table: null }, { ...jupiter, table: null, grid: null }];
  const propose = (_: string, prompt: string) => { prompts.push(prompt); return Promise.resolve(answers.shift()); };
  assertEquals(await extractPinSpec({ title: "Юпитер", articleText: "Юпитер", variant: 0, propose }), jupiter);
  assert(prompts[1].includes("Бесплатный расчёт нельзя упоминать"));
  let status = 0, calls = 0;
  try { await extractPinSpec({ title: "Юпитер", articleText: "", variant: 0, propose: () => { calls++; return Promise.reject(new GatewayError(402, "AI credits exhausted")); } }); } catch (e) { status = (e as GatewayError).status; }
  assertEquals([status, calls], [402, 1]);
});
