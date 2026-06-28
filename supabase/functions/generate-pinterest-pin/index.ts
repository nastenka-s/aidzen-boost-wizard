import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const KIE_AI_API_KEY = (Deno.env.get("KIE_AI_API_KEY") ?? "").trim();

const SITE_URL = "https://aidzen.ru";
const BOT_URL = "https://t.me/Neurodzenaibot";
const CTA_LINE_SITE = "Узнай, что значит это событие лично для тебя — рассчитай свою натальную карту бесплатно в Астронейронке Нейродзен. Нажми на пин.";
const CTA_LINE_BOT = "Получи персональный разбор события у Астронейронки Нейродзен в Telegram — бесплатно. Нажми на пин.";

type Slot = { hour: number; style: "dark" | "light"; target: "site" | "bot" };
// 4 слота за сутки (UTC). Итого: 2 dark + 2 light, 2 site + 2 bot
const SLOTS: Slot[] = [
  { hour: 6,  style: "dark",  target: "site" }, // 09:00 МСК
  { hour: 10, style: "light", target: "bot"  }, // 13:00 МСК
  { hour: 14, style: "dark",  target: "bot"  }, // 17:00 МСК
  { hour: 18, style: "light", target: "site" }, // 21:00 МСК
];

function pickSlot(now: Date, forceSlotIdx?: number): { idx: number; slot: Slot } {
  if (typeof forceSlotIdx === "number" && SLOTS[forceSlotIdx]) {
    return { idx: forceSlotIdx, slot: SLOTS[forceSlotIdx] };
  }
  const h = now.getUTCHours();
  // ближайший слот, у которого hour <= h
  let chosen = 0;
  for (let i = 0; i < SLOTS.length; i++) if (SLOTS[i].hour <= h) chosen = i;
  return { idx: chosen, slot: SLOTS[chosen] };
}

const STYLE_PROMPTS: Record<"dark" | "light", string> = {
  dark:
    "Глубокий тёмно-синий и фиолетовый фон, мерцающие звёзды и созвездия, тонкие неоновые акценты — лиловый, золотой. " +
    "Эстетика мистической инфографики: чёткие карточки, читаемая типографика, акцент на астрологических символах " +
    "(зодиак, луна, планеты, ретроградность). Премиальный современный стиль, кинематографичные блики.",
  light:
    "Светлый кремово-бежевый фон с лёгкой текстурой винтажной бумаги, нежные акварельные иллюстрации, " +
    "золотая обводка, ботанические и зодиакальные мотивы. Спокойная пастельная палитра, классическая засечная типографика. " +
    "Тёплая, женственная, эзотерическая эстетика — как в журналах об астрологии.",
};

// =============== Astro context (вычисляем грубо, без эфемерид) ===============
function moonPhase(date: Date): { phase: string; illumination: number } {
  // Conway's algorithm, погрешность ~1 день — достаточно для контекста
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  let r = y % 100;
  r %= 19;
  if (r > 9) r -= 19;
  r = ((r * 11) % 30) + (m < 3 ? m + 2 : m) + d;
  if (m < 3) r += 2;
  r -= y < 2000 ? 4 : 8.3;
  r = Math.floor(r + 0.5) % 30;
  const age = (r + 30) % 30;
  const illum = Math.round((1 - Math.cos((age / 29.53) * 2 * Math.PI)) * 50);
  let phase = "Растущая Луна";
  if (age < 1.5 || age > 28.5) phase = "Новолуние";
  else if (age < 7) phase = "Молодая Луна (растущий серп)";
  else if (age < 8.5) phase = "Первая четверть";
  else if (age < 14) phase = "Растущая Луна (горб)";
  else if (age < 15.5) phase = "Полнолуние";
  else if (age < 21) phase = "Убывающая Луна (горб)";
  else if (age < 22.5) phase = "Последняя четверть";
  else phase = "Убывающая Луна (старый серп)";
  return { phase, illumination: illum };
}

function sunSign(date: Date): string {
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  const ranges: Array<[string, [number, number], [number, number]]> = [
    ["Козерог",   [12, 22], [1, 19]],
    ["Водолей",   [1, 20],  [2, 18]],
    ["Рыбы",      [2, 19],  [3, 20]],
    ["Овен",      [3, 21],  [4, 19]],
    ["Телец",     [4, 20],  [5, 20]],
    ["Близнецы",  [5, 21],  [6, 20]],
    ["Рак",       [6, 21],  [7, 22]],
    ["Лев",       [7, 23],  [8, 22]],
    ["Дева",      [8, 23],  [9, 22]],
    ["Весы",      [9, 23],  [10, 22]],
    ["Скорпион",  [10, 23], [11, 21]],
    ["Стрелец",   [11, 22], [12, 21]],
  ];
  for (const [name, from, to] of ranges) {
    if ((m === from[0] && d >= from[1]) || (m === to[0] && d <= to[1])) return name;
  }
  return "Козерог";
}

function astroContext(now: Date, excludeTitles: string[] = []): { text: string; primaryEvent: AstroEvent | null } {
  const { phase, illumination } = moonPhase(now);
  const sign = sunSign(now);
  const dateStr = now.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Moscow" });
  const { events, primary, lunar } = upcomingEvents(now, 60, excludeTitles);
  const eventLines = [
    ...events.map((e) => `- ${formatEventLine(e, now)} | угол: ${e.theme}`),
    ...lunar.map((l) => `- ${l}`),
  ];
  const eventsBlock = eventLines.length
    ? `\nБлижайшие астрособытия (бери даты и углы ТОЛЬКО отсюда):\n${eventLines.join("\n")}`
    : "";
  const primaryBlock = primary
    ? `\nГЛАВНОЕ СОБЫТИЕ ДНЯ для пина: ${formatEventLine(primary, now)}. Триггерный угол: ${primary.theme}`
    : "";
  return {
    text: `Сегодня ${dateStr}. Солнце в знаке ${sign}. ${phase}, освещённость ~${illumination}%.${primaryBlock}${eventsBlock}`,
    primaryEvent: primary,
  };
}

function formatEventLine(e: AstroEvent, now: Date): string {
  const [Y, M, D] = e.date.split("-").map(Number);
  const start = new Date(Date.UTC(Y, M - 1, D));
  const ru = start.toLocaleDateString("ru-RU", { day: "numeric", month: "long", timeZone: "Europe/Moscow" });
  const todayStr = ymd(now);
  const status = e.date === todayStr ? " (СЕГОДНЯ!)" : (e.date > todayStr ? "" : " (идёт сейчас)");
  return `${ru}${status} — ${e.title}`;
}

// =============== Верифицированные астрособытия 2026 (по Cafe Astrology) ===============
// date в формате YYYY-MM-DD. Дата — по Eastern Time, разница в часах для контента не важна.
// theme — «триггерный угол», который AI должен использовать в заголовке.
type AstroEvent = {
  date: string;
  endDate?: string;       // для длительных периодов (ретроградность, сезон)
  title: string;          // что именно происходит
  theme: string;          // о чём говорить, чтобы вызвать клик (любовь/деньги/судьба и т.д.)
};
const ASTRO_EVENTS_2026: AstroEvent[] = [
  // ===== Затмения — самые «кликовые» события =====
  { date: "2026-08-12", title: "Полное солнечное затмение во Льве 12 августа", theme: "Поворотная дата года: судьбоносные перемены, новые главы в жизни, кому ждать встречи и кому — расставания" },
  { date: "2026-08-28", title: "Частичное лунное затмение в Рыбах 28 августа", theme: "Эмоциональное освобождение: что отпустить, чтобы пришло новое; чего нельзя делать в день затмения" },

  // ===== Юпитер в Леве — главный финансовый/удачный транзит года =====
  { date: "2026-06-30", title: "Юпитер переходит в знак Льва — на 13 месяцев", theme: "Кому Юпитер во Льве принесёт деньги, славу и любовь: топ знаков-везунчиков на ближайший год" },
  { date: "2026-07-20", title: "Юпитер в оппозиции к Плутону", theme: "Финансовая трансформация: большие деньги или большие перемены — кого затронет сильнее всего" },
  { date: "2026-07-21", title: "Юпитер в секстиле к Урану", theme: "Окно неожиданной удачи и денежных прорывов — 3 дня, в которые надо действовать" },
  { date: "2026-08-31", title: "Юпитер в трине к Сатурну", theme: "Редкий аспект стабильного успеха: как закрепить карьерный и финансовый рост на годы вперёд" },
  { date: "2026-12-12", title: "Юпитер становится ретроградным во Льве", theme: "Пауза в удаче: как не потерять то, что Юпитер дал летом — стратегия до апреля 2027" },

  // ===== Меркурий ретроградный (3 раза в году) =====
  { date: "2026-06-29", endDate: "2026-07-23", title: "Меркурий ретроградный в Раке: 29 июня — 23 июля", theme: "Чего нельзя делать в эти 25 дней: контракты, переезды, признания — список запретов и что разрешено" },
  { date: "2026-10-24", endDate: "2026-11-13", title: "Меркурий ретроградный в Скорпионе: 24 октября — 13 ноября", theme: "Тайны вылезут наружу: бывшие, секреты, недосказанное — к чему готовиться каждому знаку" },

  // ===== Венера ретроградная — большое событие для отношений и финансов =====
  { date: "2026-10-03", endDate: "2026-11-13", title: "Венера ретроградная в Скорпионе и Весах: 3 октября — 13 ноября", theme: "Возвращение бывших, проверка отношений и финансов: главные 41 день года для личной жизни" },

  // ===== Сатурн ретроградный =====
  { date: "2026-07-26", endDate: "2026-12-10", title: "Сатурн ретроградный в Овне: 26 июля — 10 декабря", theme: "Карма возвращается: какие уроки придётся пересдать и кому Сатурн откроет двери" },

  // ===== Внешние планеты ретроградные =====
  { date: "2026-07-07", endDate: "2026-12-12", title: "Нептун ретроградный в Овне с 7 июля", theme: "Время сбросить иллюзии: распадутся ложные мечты, обнажится правда в отношениях" },
  { date: "2026-09-10", title: "Уран ретроградный в Близнецах с 10 сентября", theme: "5 месяцев неожиданных перемен: где жизнь развернётся на 180°" },
  { date: "2026-10-15", title: "Плутон становится директным в Водолее", theme: "Завершается полугодовая трансформация: какие изменения станут окончательными" },

  // ===== Сезоны Солнца (тригер для каждого знака) =====
  { date: "2026-07-22", title: "Сезон Льва: 22 июля — 22 августа", theme: "Месяц яркости, любви и денег: главные удачные даты сезона Льва для каждого знака" },
  { date: "2026-08-23", title: "Сезон Девы: 23 августа — 22 сентября", theme: "Время навести порядок: финансы, здоровье и привычки — план на месяц" },
  { date: "2026-09-22", title: "Сезон Весов: 22 сентября — 23 октября", theme: "Месяц любви и решений: к чему готовиться знакам-одиночкам и парам" },
  { date: "2026-10-23", title: "Сезон Скорпиона: 23 октября — 22 ноября", theme: "Самый трансформирующий месяц года: тайны, страсти, деньги — кого ждёт перерождение" },
  { date: "2026-11-22", title: "Сезон Стрельца: 22 ноября — 21 декабря", theme: "Месяц возможностей и переездов: куда стоит вкладываться и кому — рискнуть" },
  { date: "2026-12-21", title: "Зимнее солнцестояние, Солнце в Козероге", theme: "Закрытие года: подведение итогов и формирование намерений на 2027" },

  // ===== Венера — любовь и деньги по знакам =====
  { date: "2026-07-09", title: "Венера переходит в Деву 9 июля", theme: "3 недели практичной любви и финансов: знаки, кому Венера в Деве даст крепкие отношения" },
  { date: "2026-08-06", title: "Венера переходит в Весы — в свой знак, 6 августа", theme: "Венера дома: лучшее окно года для отношений, свадеб и красоты — даты, которые нельзя пропустить" },
  { date: "2026-09-10", title: "Венера переходит в Скорпион 10 сентября", theme: "Страсть и ревность: знаки, кого ждут самые горячие 3 недели — и кому стоит быть осторожнее" },
  { date: "2026-12-04", title: "Венера возвращается в Скорпион 4 декабря", theme: "Финал года для отношений: что осталось от ретро-Венеры и кого ждёт встреча перед НГ" },

  // ===== Марс — энергия, действия, конфликты =====
  { date: "2026-06-28", title: "Марс переходит в Близнецы 28 июня", theme: "6 недель быстрых решений: знаки, которым Марс даст драйв, и кому — конфликты" },
  { date: "2026-08-11", title: "Марс переходит в Рак 11 августа", theme: "Семья vs карьера: где ждать эмоциональных всплесков и как ими управлять" },
  { date: "2026-09-27", title: "Марс переходит в Лев 27 сентября", theme: "Время заявить о себе: знаки, кому Марс во Льве откроет дорогу к славе и деньгам" },
  { date: "2026-11-25", title: "Марс переходит в Деву 25 ноября", theme: "Финансовый рывок перед НГ: знаки, которые могут закрыть год большим заработком" },

  // ===== Меркурий (быстрые переходы — для дневных тем) =====
  { date: "2026-08-09", title: "Меркурий переходит в Лев 9 августа", theme: "Месяц громких заявлений и творческих идей: что объявить именно сейчас" },
  { date: "2026-09-30", title: "Меркурий переходит в Скорпион 30 сентября", theme: "Время глубоких разговоров: на чистоту с близкими — даты для откровений" },
  { date: "2026-12-06", title: "Меркурий переходит в Стрелец 6 декабря", theme: "Окно для планов на 2027: лучшие даты, чтобы загадать большое" },
];

function ymd(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

function ruDate(d: Date): string {
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", timeZone: "Europe/Moscow" });
}

function nextLunarMilestones(now: Date, daysAhead: number): string[] {
  // Идём по дням вперёд и фиксируем ближайшие Новолуние и Полнолуние
  const out: string[] = [];
  let foundNew = false;
  let foundFull = false;
  for (let i = 0; i <= daysAhead && (!foundNew || !foundFull); i++) {
    const d = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const { phase } = moonPhase(d);
    if (!foundNew && phase === "Новолуние") {
      out.push(`${ruDate(d)} — Новолуние (момент для намерений и начинаний)`);
      foundNew = true;
    }
    if (!foundFull && phase === "Полнолуние") {
      out.push(`${ruDate(d)} — Полнолуние (пик энергии, время отпускать)`);
      foundFull = true;
    }
  }
  return out;
}

function upcomingEvents(now: Date, daysAhead: number): {
  events: AstroEvent[];
  primary: AstroEvent | null;
  lunar: string[];
} {
  const horizon = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
  const todayStr = ymd(now);
  const horizonStr = ymd(horizon);
  // Активные периоды (ретрограды/сезоны), идущие прямо сейчас
  const ongoing = ASTRO_EVENTS_2026.filter(
    (e) => e.endDate && e.date <= todayStr && e.endDate >= todayStr,
  );
  // События в окне ближайших N дней
  const upcoming = ASTRO_EVENTS_2026.filter(
    (e) => e.date >= todayStr && e.date <= horizonStr,
  );
  const events = [...ongoing, ...upcoming];
  // Приоритет для главного события: ближайшее в течение 7 дней, иначе идущий ретроград, иначе ближайшее
  const soon = upcoming.find((e) => {
    const diff = (new Date(e.date).getTime() - new Date(todayStr).getTime()) / 86400000;
    return diff <= 7;
  });
  const primary = soon ?? ongoing[0] ?? upcoming[0] ?? null;
  return { events, primary, lunar: nextLunarMilestones(now, daysAhead) };
}

// =============== Lovable AI (контент) ===============
async function generateContent(slot: Slot, astro: string) {
  const cta = slot.target === "site" ? CTA_LINE_SITE : CTA_LINE_BOT;
  const sys = `Ты — астролог-эксперт и Pinterest-копирайтер уровня вирусных пинов на русском.
ТВОЯ ЦЕЛЬ: максимальная кликабельность пина и переход в ${slot.target === "site" ? "сайт aidzen.ru" : "телеграм-бот @Neurodzenaibot"}.
ПРАВИЛА:
- Опирайся ТОЛЬКО на астрособытия из присланного контекста — даты, планеты, знаки нельзя выдумывать.
- В заголовке ОБЯЗАТЕЛЬНО используй триггер: "кому повезёт", "что будет", "знаки, которым", "топ-3", "чего нельзя делать", "что значит для тебя", "судьбоносная дата", "окно возможностей", "к чему готовиться".
- Никакого канцелярита, никакой воды. Конкретика, цифры, имена знаков и планет.
- Не обещай гороскопа на год для одного знака целиком — обещай ответ на конкретный вопрос (любовь, деньги, дата, перемены, совместимость).
Возвращай строго валидный JSON без пояснений.`;

  const usr = `Астроконтекст:
${astro}

Сгенерируй один пин для Pinterest. Стиль визуала: ${slot.style === "dark" ? "тёмный мистический космос" : "светлый винтажный пастель"}.

Требования:
1) "topic" — триггерная тема: совместимость, любовь, финансовое окно, успешные даты, изменения в жизни, кому повезёт, чего нельзя делать. ПРИВЯЖИ к ГЛАВНОМУ СОБЫТИЮ из контекста, обязательно с КОНКРЕТНОЙ ДАТОЙ.
2) "pin_title" — кричащий заголовок на картинку, до 55 символов. Должен содержать число, дату ИЛИ имя знака/планеты. Примеры формы:
   - "3 знака, кого ждёт богатство с 30 июня"
   - "Венера ретро: бывшие вернутся 3 октября"
   - "Затмение 12 августа: кому ждать перемен"
   ВЕРХНИЙ РЕГИСТР если стиль тёмный, обычный если светлый. Без эмодзи.
3) "pin_subtitle" — обостряющая подводка, до 75 символов. Создаёт интригу ("узнай, относишься ли ты к ним").
4) "bullet_points" — 3–4 пункта по 60 символов: конкретные знаки / даты / действия. Никакой воды. Фактически верны (опираются на контекст).
5) "pinterest_title" — SEO-заголовок пина в Pinterest, до 95 символов. Включи: ключевое слово (астрология/нумерология/гороскоп/совместимость/ретроградный Меркурий и т.п.), год 2026, число/дату.
6) "pinterest_description" — описание пина, 250–450 символов. Структура: интригующий первый абзац (2–3 предложения с фактами и датой) → перечисление пользы (для каких знаков, что узнаешь) → отдельным последним предложением призыв: "${cta}" Хэштеги в самом конце, 5–7 штук, на русском (#астрология2026 #гороскоп #нумерология #ретроградныймеркурий #совместимость и т.п.).
7) "image_prompt" — детальный английский промпт для GPT-Image-2 на ВЕРТИКАЛЬНУЮ Pinterest-картинку 1024x1536 (соотношение 2:3). Включи:
   - "${STYLE_PROMPTS[slot.style]}"
   - Точный русский текст заголовка ("${"<pin_title>"}"), подзаголовка и пунктов так, чтобы он был ЧИТАЕМО отрисован на картинке (укажи Cyrillic Russian text, exact spelling).
   - Маленькую подпись внизу: "Астронейронка Нейродзен · aidzen.ru".
   - Без водяных знаков, без логотипов брендов, без лиц знаменитостей.

Верни JSON со строго этими ключами: topic, pin_title, pin_subtitle, bullet_points, pinterest_title, pinterest_description, image_prompt.`;

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-pro",
      messages: [
        { role: "system", content: sys },
        { role: "user", content: usr },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) throw new Error(`Lovable AI ${res.status}: ${await res.text()}`);
  const j = await res.json();
  const raw = j?.choices?.[0]?.message?.content;
  if (!raw) throw new Error("Empty AI response");
  return JSON.parse(raw);
}

// =============== kie.ai GPT-Image-2 ===============
async function kieGenerateImage(prompt: string): Promise<string> {
  const create = await fetch("https://api.kie.ai/api/v1/jobs/createTask", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KIE_AI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-2-text-to-image",
      input: {
        prompt,
        size: "2:3",
        nVariants: 1,
        quality: "high",
      },
    }),
  });
  const ctext = await create.text();
  if (!create.ok) throw new Error(`kie.ai createTask ${create.status}: ${ctext}`);
  const cjson = JSON.parse(ctext);
  const taskId = cjson?.data?.taskId ?? cjson?.data?.task_id ?? cjson?.taskId;
  if (!taskId) throw new Error(`kie.ai no taskId: ${ctext}`);

  // Poll up to ~5 min
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const info = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
      headers: { Authorization: `Bearer ${KIE_AI_API_KEY}` },
    });
    const itext = await info.text();
    if (!info.ok) {
      console.warn(`recordInfo ${info.status}: ${itext}`);
      continue;
    }
    const ij = JSON.parse(itext);
    const state: string = ij?.data?.state ?? ij?.data?.status ?? "";
    if (state === "success" || state === "succeeded" || state === "completed") {
      const resultJson = ij?.data?.resultJson ?? ij?.data?.response ?? ij?.data;
      const parsedResult = typeof resultJson === "string" ? JSON.parse(resultJson) : resultJson;
      const urls: string[] =
        parsedResult?.resultUrls ??
        parsedResult?.result_urls ??
        parsedResult?.images ??
        parsedResult?.output ??
        [];
      const url = Array.isArray(urls) ? urls[0] : urls;
      if (typeof url === "string" && url.startsWith("http")) return url;
      throw new Error(`kie.ai success but no url: ${itext}`);
    }
    if (state === "fail" || state === "failed" || state === "error") {
      throw new Error(`kie.ai task failed: ${itext}`);
    }
  }
  throw new Error("kie.ai polling timeout");
}

// =============== Main ===============
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  let body: any = {};
  try { body = req.method === "POST" ? await req.json() : {}; } catch { /* noop */ }

  const now = new Date();
  const { idx: slotIdx, slot } = pickSlot(now, body?.slot);

  // Guard: один пин на слот в сутки
  if (!body?.force) {
    const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const { count } = await supabase
      .from("pinterest_pins")
      .select("id", { count: "exact", head: true })
      .eq("style", slot.style)
      .eq("link_target", slot.target)
      .gte("created_at", startOfDay.toISOString());
    if ((count ?? 0) > 0) {
      return new Response(JSON.stringify({ ok: true, skipped: "slot_already_done", slotIdx, slot }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  try {
    const astro = astroContext(now);
    const content = await generateContent(slot, astro.text);

    const imageUrl = await kieGenerateImage(content.image_prompt);

    // Скачиваем картинку и кладём в наш bucket
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) throw new Error(`download image ${imgRes.status}`);
    const bytes = new Uint8Array(await imgRes.arrayBuffer());
    const path = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${crypto.randomUUID()}.png`;
    const { error: upErr } = await supabase.storage.from("pinterest").upload(path, bytes, {
      contentType: "image/png",
      upsert: false,
    });
    if (upErr) throw new Error(`storage upload: ${upErr.message}`);

    // 10 лет signed URL — Pinterest скачивает картинку при первом краулинге
    const { data: signed, error: signErr } = await supabase.storage
      .from("pinterest")
      .createSignedUrl(path, 60 * 60 * 24 * 3650);
    if (signErr || !signed?.signedUrl) throw new Error(`sign url: ${signErr?.message}`);

    const linkUrl = slot.target === "site" ? SITE_URL : BOT_URL;

    const { data: row, error: insErr } = await supabase
      .from("pinterest_pins")
      .insert({
        title: content.pinterest_title,
        description: content.pinterest_description,
        image_url: signed.signedUrl,
        link_url: linkUrl,
        style: slot.style,
        link_target: slot.target,
        topic: content.topic,
        astro_context: astro.text,
        image_prompt: content.image_prompt,
        status: "published",
      })
      .select()
      .single();
    if (insErr) throw insErr;

    return new Response(JSON.stringify({ ok: true, slotIdx, slot, pin: row }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("generate-pinterest-pin error:", msg);
    await supabase.from("pinterest_pins").insert({
      title: "[failed]",
      description: msg.slice(0, 500),
      image_url: "",
      link_url: SITE_URL,
      style: slot.style,
      link_target: slot.target,
      status: "failed",
      error_message: msg.slice(0, 1000),
    });
    return new Response(JSON.stringify({ ok: false, error: msg, slotIdx, slot }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});