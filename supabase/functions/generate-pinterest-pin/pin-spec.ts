// Structured Pinterest infographic: AI proposes the structure from the published
// article, this module owns the facts that can be checked or derived deterministically.
export const PIN_WIDTH = 1000;
export const PIN_HEIGHT = 1500;
export const SIGNS = ["Овен", "Телец", "Близнецы", "Рак", "Лев", "Дева", "Весы", "Скорпион", "Стрелец", "Козерог", "Водолей", "Рыбы"] as const;
export const SIGN_GLYPHS: Record<string, string> = Object.fromEntries(SIGNS.map((s, i) => [s, String.fromCodePoint(0x2648 + i)]));
export const PLANET_GLYPHS: Record<string, string> = { "Луна": "\u263D", "Меркурий": "\u263F", "Венера": "\u2640", "Марс": "\u2642", "Юпитер": "\u2643", "Сатурн": "\u2644", "Уран": "\u2645", "Нептун": "\u2646", "Плутон": "\u2647" };
// Inflected forms as whole words, so "расчёт" is never read as "Рак".
const B = "(?![а-яё])";
export const SIGN_PATTERNS: Record<string, RegExp> = Object.fromEntries(Object.entries({
  "Овен": `ов(ен|н[аыуео][вм]?)${B}`, "Телец": `тел(ец|ьц[аыуео][вм]?)${B}`, "Близнецы": `близнец(ы|ов|ам|а)?${B}`, "Рак": `рак(а|и|ов|ам|у)?${B}`,
  "Лев": `(лев|льв[аыуео][вм]?)${B}`, "Дева": `дев(а|ы|е|у|ам)?${B}`, "Весы": `вес(ы|ов|ам)${B}`, "Скорпион": `скорпион(а|ы|ов|ам|у)?${B}`,
  "Стрелец": `стрел(ец|ьц[аыуео][вм]?)${B}`, "Козерог": `козерог(а|и|ов|ам|у)?${B}`, "Водолей": `водоле(й|я|и|ев|ям|ю)${B}`, "Рыбы": `рыб(ы|ам)?${B}`,
}).map(([sign, source]) => [sign, new RegExp(`(^|[^а-яё])${source}`, "i")]));
export const ELEMENTS = {
  fire: { label: "Огонь", signs: ["Овен", "Лев", "Стрелец"], color: "#E8623D" },
  earth: { label: "Земля", signs: ["Телец", "Дева", "Козерог"], color: "#5E9E55" },
  air: { label: "Воздух", signs: ["Близнецы", "Весы", "Водолей"], color: "#D9A62E" },
  water: { label: "Вода", signs: ["Рак", "Скорпион", "Рыбы"], color: "#3F8FD0" },
} as const;
export type ElementId = keyof typeof ELEMENTS;
export const MATRIX_POINTS = ["center", "left", "top", "right", "bottom", "top-left", "top-right", "bottom-right", "bottom-left"] as const;
export type PinLayout = "groups" | "table" | "calendar" | "grid" | "scheme";
export type PinSpec = {
  layout: PinLayout; title: string; hint: string; cta: string;
  groups?: { element: ElementId; text: string }[];
  table?: { key_label: string; formula?: string; example?: string; rows: { key: string; text: string }[] };
  calendar?: { period: string; rows: { date: string; label: string }[] };
  grid?: { cells: { name: string; text: string }[] };
  scheme?: { diagram: "matrix" | "wheel"; rows: { point: string; name: string; text: string }[] };
};
export const PALETTES = {
  navy: { id: "navy", dark: true, bg: ["#0A1238", "#18245E"], text: "#F6EFD9", muted: "#C9C3AE", accent: "#E2BD62", card: "rgba(255,255,255,0.07)", line: "rgba(226,189,98,0.45)" },
  burgundy: { id: "burgundy", dark: true, bg: ["#3A0A17", "#6B1626"], text: "#FBF0DC", muted: "#DCC7AE", accent: "#E8B95A", card: "rgba(255,255,255,0.08)", line: "rgba(232,185,90,0.45)" },
  marble: { id: "marble", dark: false, bg: ["#FBF8F3", "#EFE9DF"], text: "#2A211B", muted: "#5E5348", accent: "#A9812B", card: "#FFFFFF", line: "rgba(169,129,43,0.5)" },
  lilac: { id: "lilac", dark: false, bg: ["#F1EAFA", "#E2D6F3"], text: "#2A1E42", muted: "#56476F", accent: "#6A48A8", card: "#FFFFFF", line: "rgba(106,72,168,0.35)" },
  ink: { id: "ink", dark: true, bg: ["#0D0D14", "#1A1826"], text: "#F4F3F8", muted: "#BDBBCB", accent: "#C8A8FF", card: "rgba(255,255,255,0.07)", line: "rgba(200,168,255,0.4)" },
} as const;
export type Palette = typeof PALETTES[keyof typeof PALETTES];
// Palette follows the brief: calendars navy/gold, Mars and Jupiter burgundy/gold,
// numeric tables marble/gold, lists lilac, schemes and grids near-black.
export function pinPalette(spec: PinSpec): Palette {
  if (spec.layout === "calendar") return PALETTES.navy;
  if (/марс|юпитер/i.test(spec.title + " " + spec.hint)) return PALETTES.burgundy;
  if (spec.layout === "table") return /^\d/.test(spec.table?.rows[0]?.key ?? "") ? PALETTES.marble : PALETTES.lilac;
  if (spec.layout === "groups") return PALETTES.lilac;
  return PALETTES.ink;
}
const LIMITS = {
  title: 56, hint: 95, cta: 52,
  groups: { rows: [4, 4], text: 105 },
  table: { rows: [3, 9], key: 14, text: 62, formula: 85, example: 95, key_label: 40 },
  calendar: { rows: [4, 9], date: 18, text: 58, period: 22 },
  grid: { rows: [4, 12], name: 14, text: 46 },
  scheme: { rows: [3, 5], name: 22, text: 70 },
} as const;
const MONTHS = "январ|феврал|март|апрел|ма[йя]|июн|июл|август|сентябр|октябр|ноябр|декабр";
const norm = (v: string) => v.toLowerCase().replace(/ё/g, "е").replace(/[\u00a0\s]+/g, " ");
export function articlePlainText(html: string): string {
  return html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&laquo;/g, "«").replace(/&raquo;/g, "»").replace(/&mdash;/g, "—").replace(/&ndash;/g, "–")
    .replace(/\s+/g, " ").trim();
}
// Every "a + b + c = n" written on the pin must be arithmetically true.
export function arithmeticErrors(text: string): string[] {
  const errors: string[] = [];
  for (const m of text.matchAll(/(\d+(?:\s*\+\s*\d+)+)\s*=\s*(\d+)/g)) {
    const sum = m[1].split("+").reduce((a, b) => a + Number(b.trim()), 0);
    if (sum !== Number(m[2])) errors.push(`Неверная сумма: ${m[0]}`);
  }
  return errors;
}
function expandKeys(key: string): number[] {
  const out: number[] = [];
  for (const part of key.split(/[,;/]|\sи\s/)) {
    const range = part.match(/(\d+)\s*[–—-]\s*(\d+)/);
    if (range) { for (let n = Number(range[1]); n <= Number(range[2]) && n - Number(range[1]) < 60; n++) out.push(n); continue; }
    const single = part.match(/\d+/);
    if (single) out.push(Number(single[0]));
  }
  return out;
}
// Sizes shared with the renderer, so the fit check below measures the real layout.
export const titleSize = (title: string) => title.length <= 22 ? 86 : title.length <= 34 ? 74 : 62;
export const tableSizing = (n: number) => ({ size: n <= 5 ? 35 : n <= 7 ? 32 : 30, pad: n <= 5 ? 20 : n <= 7 ? 15 : 11 });
export const calendarSizing = (n: number) => ({ size: n <= 4 ? 40 : n <= 6 ? 34 : 31, pad: n <= 4 ? 30 : n <= 6 ? 18 : 11 });
export const gridSizing = (rows: number) => ({ size: rows <= 4 ? 32 : 28, pad: rows <= 4 ? 18 : 10 });
export const schemeSizing = (n: number) => ({ diagram: n >= 5 ? 400 : n === 4 ? 430 : 460 });
const INNER_HEIGHT = PIN_HEIGHT - 92, INNER_WIDTH = PIN_WIDTH - 104;
// Conservative line count: average glyph advance as a share of the font size.
const lines = (text: string, width: number, size: number, factor = 0.52) => Math.max(1, Math.ceil((text.trim().length * size * factor) / width));
/** Estimated height in px of everything on the pin; above PIN_HEIGHT - 92 it would overflow. */
export function estimatePinHeight(spec: PinSpec): number {
  const ts = titleSize(spec.title);
  let total = 8 + lines(spec.title, INNER_WIDTH, ts, 0.56) * ts * 1.08 + 50 + lines(spec.hint, INNER_WIDTH - 40, 33) * 41 + 30 + 138;
  if (spec.layout === "groups" && spec.groups) total += spec.groups.reduce((sum, g) => sum + 48 + 50 + 10 + lines(g.text, INNER_WIDTH - 74, 33) * 43, 0) + 20 * (spec.groups.length - 1);
  if (spec.layout === "table" && spec.table) {
    const t = spec.table, { size, pad } = tableSizing(t.rows.length);
    const wide = Math.max(...t.rows.map(r => r.key.trim().length)) > 5;
    if (t.formula || t.example) total += 40 + 18 + (t.formula ? lines(t.formula, INNER_WIDTH - 60, 32, 0.58) * 40 : 0) + (t.example ? 6 + lines(`Пример: ${t.example}`, INNER_WIDTH - 60, 30) * 38 : 0);
    total += 34 + 18 + 16 + t.rows.reduce((sum, r) => sum + 2 * pad + 2 + Math.max(lines(r.text, INNER_WIDTH - 56 - 22 - (wide ? 250 : 120), size) * size * 1.25, wide ? lines(r.key, 250, size, 0.58) * size * 1.1 : (size + 14) * 1.1), 0);
  }
  if (spec.layout === "calendar" && spec.calendar) {
    const { size, pad } = calendarSizing(spec.calendar.rows.length);
    total += lines(spec.calendar.period, INNER_WIDTH, 92, 0.56) * 97 + 18 + 16 + spec.calendar.rows.reduce((sum, r) => sum + 2 * pad + 2 + Math.max(54, lines(r.label, INNER_WIDTH - 60 - 54 - 250 - 44, size) * size * 1.25, lines(r.date, 250, size, 0.58) * size * 1.15), 0);
  }
  if (spec.layout === "grid" && spec.grid) {
    const cells = spec.grid.cells, rows = Math.ceil(cells.length / 2), { size, pad } = gridSizing(rows);
    for (let i = 0; i < cells.length; i += 2) total += 2 * pad + 4 + (size + 5) * 1.3 + 4 + Math.max(...cells.slice(i, i + 2).map(c => lines(c.text, 442 - 48, size))) * size * 1.22;
    total += 16 * (rows - 1);
  }
  if (spec.layout === "scheme" && spec.scheme) total += schemeSizing(spec.scheme.rows.length).diagram + 18 + spec.scheme.rows.reduce((sum, r) => sum + 28 + lines(r.name, INNER_WIDTH - 130, 31, 0.58) * 36 + lines(r.text, INNER_WIDTH - 130, 29) * 36, 0) + 12 * (spec.scheme.rows.length - 1);
  return Math.ceil(total);
}
/** Returns human-readable problems; an empty list means the pin may be rendered. */
export function validatePinSpec(spec: PinSpec, articleText: string): string[] {
  const errors: string[] = [];
  const article = norm(articleText);
  const need = (value: unknown, max: number, name: string, min = 2) => {
    if (typeof value !== "string" || value.trim().length < min) { errors.push(`Заполните поле: ${name}`); return ""; }
    if (value.trim().length > max) errors.push(`${name}: сократите до ${max} знаков (сейчас ${value.trim().length})`);
    return value.trim();
  };
  const title = need(spec.title, LIMITS.title, "заголовок", 8);
  need(spec.hint, LIMITS.hint, "подсказка, как найти свой вариант", 12);
  const cta = need(spec.cta, LIMITS.cta, "призыв", 8);
  const texts: string[] = [title, spec.hint ?? "", cta];
  const count = (n: number, [min, max]: readonly [number, number], name: string) => { if (n < min || n > max) errors.push(`${name}: нужно от ${min} до ${max} строк (сейчас ${n})`); };
  const body = (spec as Record<string, unknown>)[spec.layout];
  if (!body) errors.push(`Нет данных для макета ${spec.layout}`);
  if (spec.layout === "groups" && spec.groups) {
    count(spec.groups.length, LIMITS.groups.rows, "стихии");
    const seen = new Set(spec.groups.map(g => g.element));
    for (const id of Object.keys(ELEMENTS)) if (!seen.has(id as ElementId)) errors.push(`Нет блока стихии: ${ELEMENTS[id as ElementId].label}`);
    for (const g of spec.groups) {
      if (!ELEMENTS[g.element]) { errors.push("Неизвестная стихия"); continue; }
      texts.push(need(g.text, LIMITS.groups.text, `трактовка, ${ELEMENTS[g.element].label}`, 15));
      // A sign named inside a block must belong to that element.
      for (const sign of SIGNS) if (SIGN_PATTERNS[sign].test(g.text) && !(ELEMENTS[g.element].signs as readonly string[]).includes(sign)) errors.push(`${sign} не относится к стихии ${ELEMENTS[g.element].label}`);
    }
  }
  if (spec.layout === "table" && spec.table) {
    const t = spec.table;
    count(t.rows.length, LIMITS.table.rows, "таблица");
    texts.push(need(t.key_label, LIMITS.table.key_label, "подпись: по какому числу или признаку искать строку", 3));
    if (t.formula) texts.push(need(t.formula, LIMITS.table.formula, "формула"));
    if (t.example) texts.push(need(t.example, LIMITS.table.example, "пример"));
    for (const r of t.rows) texts.push(need(r.key, LIMITS.table.key, "ключ строки", 1), need(r.text, LIMITS.table.text, `трактовка ${r.key}`, 6));
    if (new Set(t.rows.map(r => r.key.trim())).size !== t.rows.length) errors.push("Ключи строк таблицы повторяются");
    const numeric = t.rows.every(r => /^\d/.test(r.key.trim()));
    if (numeric) {
      // Formula, example and table must describe one method: the example's
      // final number has to be a row of this very table.
      if (!t.formula) errors.push("Заполните поле: формула расчёта");
      if (!t.example) errors.push("Заполните поле: пример расчёта");
      const result = t.example?.match(/(\d+)\s*[.!]?\s*$/) ?? t.example?.match(/=\s*(\d+)(?![\s\S]*=)/);
      const keys = new Set(t.rows.flatMap(r => expandKeys(r.key)));
      if (t.example && (!result || !keys.has(Number(result[1])))) errors.push("Результат примера должен совпадать с одной из строк таблицы");
    }
  }
  if (spec.layout === "calendar" && spec.calendar) {
    const c = spec.calendar;
    count(c.rows.length, LIMITS.calendar.rows, "календарь");
    texts.push(need(c.period, LIMITS.calendar.period, "месяц или год", 4));
    for (const r of c.rows) {
      const date = need(r.date, LIMITS.calendar.date, "дата", 1);
      texts.push(need(r.label, LIMITS.calendar.text, `подпись даты ${date}`, 4));
      const dated = [...date.matchAll(new RegExp(`(\\d{1,2})(?:\\s*[–—-]\\s*(\\d{1,2}))?\\s+(${MONTHS})`, "gi"))];
      if (!dated.length) errors.push(`Дата «${date}» должна быть в формате «9 декабря» или «9–12 декабря»`);
      for (const d of dated) for (const day of [d[1], d[2]].filter(Boolean)) {
        if (!new RegExp(`(^|\\D)${day}(\\s*[–—-]\\s*\\d{1,2})?\\s+${norm(d[3])}`).test(article) && !new RegExp(`(^|\\D)\\d{1,2}\\s*[–—-]\\s*${day}\\s+${norm(d[3])}`).test(article)) errors.push(`Даты «${day} ${d[3]}…» нет в статье`);
      }
      // A range is a period, a single day is an exact phase: the caption must not mix them.
      if (/[–—-]/.test(date) && /^(новолуние|полнолуние)/i.test(r.label.trim())) errors.push(`«${date}» — период, а подпись называет точную фазу`);
    }
  }
  if (spec.layout === "grid" && spec.grid) {
    count(spec.grid.cells.length, LIMITS.grid.rows, "сетка");
    for (const cell of spec.grid.cells) texts.push(need(cell.name, LIMITS.grid.name, "название ячейки", 2), need(cell.text, LIMITS.grid.text, `значение: ${cell.name}`, 4));
    if (new Set(spec.grid.cells.map(c => c.name.trim())).size !== spec.grid.cells.length) errors.push("Ячейки сетки повторяются");
  }
  if (spec.layout === "scheme" && spec.scheme) {
    const s = spec.scheme;
    count(s.rows.length, LIMITS.scheme.rows, "легенда схемы");
    for (const r of s.rows) {
      texts.push(need(r.name, LIMITS.scheme.name, "название зоны", 2), need(r.text, LIMITS.scheme.text, `пояснение: ${r.name}`, 6));
      const ok = s.diagram === "matrix" ? (MATRIX_POINTS as readonly string[]).includes(r.point) : /^([1-9]|1[0-2])$/.test(r.point);
      if (!ok) errors.push(`Зона «${r.name}» не привязана к элементу схемы`);
    }
    if (new Set(s.rows.map(r => r.point)).size !== s.rows.length) errors.push("Две подписи указывают на один элемент схемы");
  }
  if (!errors.length && estimatePinHeight(spec) > INNER_HEIGHT) errors.push("Текст не помещается на пин: сократите формулировки или оставьте меньше строк");
  const all = texts.join(" \n ");
  errors.push(...arithmeticErrors(all));
  if (/https?:|www\.|\.ru\b/i.test(all)) errors.push("На пине не должно быть ссылок");
  if (/[^\u0000-\u024F\u0400-\u04FF\u2010-\u2026\u00AB\u00BB\u2116\u00D7]/.test(all)) errors.push("Недопустимые символы: используйте буквы, цифры и обычную пунктуацию");
  if (/гарант|100\s*%|точно сбуд/i.test(all)) errors.push("Нельзя обещать гарантированный результат");
  // The link opens the article: promise only what it contains and no free offers.
  if (/бесплатн/i.test(all)) errors.push("Бесплатный расчёт нельзя упоминать: ссылка ведёт на статью");
  if (!/стать/i.test(cta)) errors.push("Призыв должен вести в статью");
  if (/12 знак|все знаки|всех знаков/i.test(cta) && !SIGNS.every(s => SIGN_PATTERNS[s].test(article))) errors.push("В статье нет всех 12 знаков, обещанных в призыве");
  // Years and clock times shown on the pin must come from the article itself.
  for (const m of all.matchAll(/\b(19|20)\d{2}\b|\b\d{1,2}:\d{2}\b/g)) if (!article.includes(m[0])) errors.push(`«${m[0]}» нет в статье`);
  if (/\b\d{1,2}:\d{2}\b/.test(all) && !/мск|моск/i.test(all)) errors.push("Укажите часовой пояс для времени");
  return [...new Set(errors)];
}
export function pinDescription(spec: PinSpec, variant: number, kind: string): string {
  const lines: string[] = [];
  if (spec.groups) for (const g of spec.groups) lines.push(`${ELEMENTS[g.element].label} (${ELEMENTS[g.element].signs.join(", ")}): ${g.text}`);
  if (spec.table) { if (spec.table.formula) lines.push(spec.table.formula); for (const r of spec.table.rows.slice(0, 4)) lines.push(`${r.key} — ${r.text}`); }
  if (spec.calendar) for (const r of spec.calendar.rows.slice(0, 5)) lines.push(`${r.date} — ${r.label}`);
  if (spec.grid) for (const c of spec.grid.cells.slice(0, 5)) lines.push(`${c.name} — ${c.text}`);
  if (spec.scheme) for (const r of spec.scheme.rows) lines.push(`${r.name} — ${r.text}`);
  const tag = /numerology|нумеролог|матриц/i.test(kind + spec.title) ? "#нумерология" : "#астрология";
  const invite = ["Полный разбор — в статье по ссылке.", "Подробности и примеры — в статье по ссылке."][variant % 2];
  let text = spec.hint.trim();
  for (const line of lines) { if ((text + "\n" + line).length > 620) break; text += "\n" + line; }
  return `${text}\n${invite}\n${tag} #нейродзен`;
}
