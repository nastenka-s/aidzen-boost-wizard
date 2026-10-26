import * as Astronomy from "npm:astronomy-engine@2.1.19";

export const SLOTS = [
  { hour: 6, style: "dark", target: "site" },
  { hour: 12, style: "light", target: "bot" },
  { hour: 18, style: "dark", target: "bot" },
] as const;
export type Slot = typeof SLOTS[number];
export const DAILY_LIMIT = 3;
export const DISCLAIMER = "Астрология и нумерология — традиционные символические трактовки, не научные прогнозы.";
export function moscowDay(now: Date): string {
  return new Date(now.getTime() + 3 * 3600000).toISOString().slice(0, 10);
}
export function pickSlot(now: Date, index?: number) {
  const idx = index ?? (now.getUTCHours() >= 18 ? 2 : now.getUTCHours() >= 12 ? 1 : 0);
  if (!Number.isInteger(idx) || idx < 0 || idx >= SLOTS.length) throw new Error("slot must be 0, 1 or 2");
  return { idx, slot: SLOTS[idx] };
}
const STYLES = [
  { id: "observatory", tone: "dark", prompt: "Black and silver observatory chart, precise astronomical diagrams, modern sans serif, emerald accents, clean numbered list. No mystical glow." },
  { id: "swiss", tone: "light", prompt: "White Swiss editorial poster, bold red and charcoal typography, oversized numbers, strict grid, diagram illustrations." },
  { id: "engraving", tone: "dark", prompt: "Forest green and ivory antique scientific engraving, copperplate planet drawings, elegant serif headings, clearly spaced list." },
  { id: "watercolor", tone: "light", prompt: "White watercolor field notebook, coral and sage illustrations, hand painted planet motifs, highly legible printed typography, numbered entries." },
  { id: "constructivist", tone: "dark", prompt: "Charcoal constructivist poster with vermilion and pale yellow geometric planetary diagrams, bold typography, asymmetric numbered list." },
  { id: "collage", tone: "light", prompt: "White magazine collage with teal and red cut-paper astronomical illustrations, editorial serif headlines, generous spacing, tidy numbered list." },
  { id: "blueprint", tone: "dark", prompt: "Deep teal scientific blueprint, ivory line diagrams of orbits, monospaced labels and bold sans headings, ordered list, no gradients." },
  { id: "botanical", tone: "light", prompt: "Pale pink illustrated botanical almanac, burgundy typography and emerald leaves framing accurate planet symbols, elegant readable list." },
] as const;
export function visualStyle(day: string, slot: number) {
  const dayNumber = Math.floor(Date.parse(day) / 86400000);
  return STYLES[((dayNumber % 8) * SLOTS.length + slot + 8) % 8];
}
const SIGNS = ["Овен", "Телец", "Близнецы", "Рак", "Лев", "Дева", "Весы", "Скорпион", "Стрелец", "Козерог", "Водолей", "Рыбы"];
const BODIES = [Astronomy.Body.Sun, Astronomy.Body.Moon, Astronomy.Body.Mercury, Astronomy.Body.Venus, Astronomy.Body.Mars, Astronomy.Body.Jupiter, Astronomy.Body.Saturn];
const NAMES = ["Солнце", "Луна", "Меркурий", "Венера", "Марс", "Юпитер", "Сатурн"];
const MEANINGS = ["самовыражение", "эмоциональные потребности", "мышление и общение", "ценности и симпатии", "инициатива", "рост и мировоззрение", "границы и ответственность"];
export function longitude(body: Astronomy.Body, date: Date): number {
  if (body === Astronomy.Body.Sun) return Astronomy.SunPosition(date).elon;
  if (body === Astronomy.Body.Moon) return Astronomy.EclipticGeoMoon(date).lon;
  return Astronomy.Ecliptic(Astronomy.GeoVector(body, date, true)).elon;
}
export const ASPECTS = [
  { name: "Соединение", angle: 0, meaning: "объединение принципов планет" },
  { name: "Секстиль", angle: 60, meaning: "возможность сотрудничества" },
  { name: "Квадрат", angle: 90, meaning: "напряжение и поиск решения" },
  { name: "Трин", angle: 120, meaning: "согласованность и лёгкость" },
  { name: "Оппозиция", angle: 180, meaning: "полярность и поиск баланса" },
];
export const NUMBERS = ["инициатива и самостоятельность", "партнёрство и дипломатия", "творчество и выражение", "структура и устойчивость", "перемены и свобода", "забота и ответственность", "анализ и самопознание", "управление и ресурсы", "сочувствие и завершение"];
const SOURCES = {
  astronomy: "https://github.com/cosinekitty/astronomy/tree/v2.1.19 — Astronomy Engine 2.1.19; геоцентрическая тропическая эклиптика даты; время МСК (UTC+3).",
  astrology: "https://www.astro.com/astrowiki/en/Aspect ; https://www.astro.com/astrowiki/en/Planet — справочник традиционных трактовок.",
  numerology: "https://www.numerology.com/articles/about-numerology/single-digit-numbers-in-numerology/ — современная западная нумерология (символическая система).",
};
export type Brief = { key: string; category: string; title: string; subtitle: string; bullets: string[]; sources: string; dateLabel?: string };
export function briefs(now: Date): Brief[] {
  const day = moscowDay(now);
  const date = new Date(`${day}T12:00:00+03:00`);
  const label = date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Moscow" });
  const events: Array<{ at: Date; text: string }> = [];
  for (const [angle, name] of [[0, "Новолуние"], [90, "Первая четверть"], [180, "Полнолуние"], [270, "Последняя четверть"]] as const) {
    const found = Astronomy.SearchMoonPhase(angle, now, 35);
    if (found) events.push({ at: found.date, text: `${name} — ${found.date.toLocaleString("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Moscow" })} МСК` });
  }
  const result: Brief[] = [{ key: `events:${day}`, category: "events", title: "4 ближайшие фазы Луны", subtitle: "Календарь по астрономическим расчётам · МСК", bullets: events.sort((a,b) => a.at.getTime()-b.at.getTime()).map(e=>e.text), sources: SOURCES.astronomy, dateLabel: label }];
  result.push({ key: "aspects:major", category: "aspects", title: "5 основных аспектов", subtitle: "Углы точного аспекта и традиционные значения", bullets: ASPECTS.map(a=>`${a.name} ${a.angle}° — ${a.meaning}`), sources: SOURCES.astrology });
  for (let start = 0; start < 9; start += 3) result.push({ key: `numbers:${start+1}`, category: "numerology", title: `Числа ${start+1}, ${start+2}, ${start+3}: значения`, subtitle: "Современная западная нумерология", bullets: NUMBERS.slice(start,start+3).map((m,i)=>`${start+i+1} — ${m}`), sources: SOURCES.numerology });
  for (let start = 0; start < BODIES.length; start += 3) result.push({ key: `positions:${day}:${start}`, category: "positions", title: "Где планеты сегодня", subtitle: `${label} · 12:00 МСК · тропический зодиак`, bullets: BODIES.slice(start,start+3).map((body,i)=>{ const j=start+i; const lon=longitude(body,date); return `${NAMES[j]}: ${SIGNS[Math.floor(lon/30)]}, ${Math.floor(lon%30)}° — ${MEANINGS[j]}`; }), sources: `${SOURCES.astronomy}\n${SOURCES.astrology}`, dateLabel: label });
  for (let start = 0; start < NAMES.length; start += 3) result.push({ key: `planet-meanings:${start}`, category: "planet-meanings", title: "Планеты в натальной карте", subtitle: "Что символизируют планеты в западной астрологии", bullets: NAMES.slice(start,start+3).map((n,i)=>`${n} — ${MEANINGS[start+i]}`), sources: SOURCES.astrology });
  const qualities = ["инициативность", "устойчивость", "любознательность", "забота", "самовыражение", "практичность", "диалог", "глубина", "поиск смысла", "дисциплина", "независимость", "сочувствие"];
  for (const j of [2, 3, 4]) for (let start = 0; start < 12; start += 3) result.push({
    key: `placements:${j}:${start}`, category: "planet-meanings", title: `${NAMES[j]} в знаках: значения`, subtitle: "Натальные положения · символика западной астрологии",
    bullets: SIGNS.slice(start,start+3).map((sign,i)=>`${sign} — ${qualities[start+i]} в сфере: ${MEANINGS[j]}`),
    sources: `${SOURCES.astrology}\nhttps://www.skyscript.co.uk/begin8.html — символика знаков.`,
  });
  return result;
}
export function chooseBrief(now: Date, slot: number, history: string[]): Brief {
  const pool = briefs(now);
  const categories = ["events", "aspects", "numerology", "positions", "planet-meanings"];
  const dayNumber = Math.floor(Date.parse(moscowDay(now))/86400000);
  const preferred = categories[(dayNumber*SLOTS.length+slot)%categories.length];
  const recentKeys = history.map(h=>h.match(/KEY::(\S+)/)?.[1]);
  const lastCategory = history[0]?.match(/CAT::(\S+)/)?.[1];
  const fresh = pool.filter(b=>!recentKeys.includes(b.key) && b.category!==lastCategory);
  return fresh.find(b=>b.category===preferred) ?? fresh[0] ?? pool.find(b=>b.category===preferred) ?? pool[0];
}