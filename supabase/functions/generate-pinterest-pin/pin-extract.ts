// The model only proposes structure and short wording from the published article.
// Everything it returns passes validatePinSpec before anything is drawn.
import { createOpenAI } from "npm:@ai-sdk/openai@3";
import { jsonSchema, Output, streamText } from "npm:ai@6";
import { validatePinSpec, type PinSpec } from "./pin-spec.ts";

export class GatewayError extends Error { constructor(public status: number, message: string) { super(message); } }
const text = { type: "string" };
const optional = { type: ["string", "null"] };
const obj = (properties: Record<string, unknown>) => ({ type: "object", properties, required: Object.keys(properties), additionalProperties: false });
const rows = (item: Record<string, unknown>) => ({ type: "array", items: obj(item) });
const nullable = (schema: Record<string, unknown>) => ({ anyOf: [schema, { type: "null" }] });
// Strict structured output: every property required, unused layouts are null.
export const PIN_SCHEMA = obj({
  layout: { type: "string", enum: ["groups", "table", "calendar", "grid", "scheme"] },
  title: text, hint: text, cta: text,
  groups: nullable(rows({ element: { type: "string", enum: ["fire", "earth", "air", "water"] }, text })),
  table: nullable(obj({ key_label: text, formula: optional, example: optional, rows: rows({ key: text, text }) })),
  calendar: nullable(obj({ period: text, rows: rows({ date: text, label: text }) })),
  grid: nullable(obj({ cells: rows({ name: text, text }) })),
  scheme: nullable(obj({ diagram: { type: "string", enum: ["matrix", "wheel"] }, rows: rows({ point: text, name: text, text }) })),
});
export const PIN_SYSTEM = `Ты редактор Pinterest-инфографики проекта «Нейродзен». Из статьи нужно сделать один вертикальный пин, по которому читатель сразу находит свой вариант, делает расчёт или сверяется с датой. Заполни поле выбранного макета, остальные макеты оставь null.

Выбери макет по содержанию статьи:
- groups — планеты в знаках и стихиях: личный вопрос и четыре блока по стихиям (fire, earth, air, water) с короткой трактовкой. Сами знаки не перечисляй — они добавятся автоматически.
- table — нумерология и справочники «число/признак — значение»: key_label говорит, по какому числу или признаку искать строку; для числовой таблицы обязательны formula и один example из статьи, результат примера должен быть одной из строк.
- calendar — лунные календари и периоды: period — крупный месяц или год; от 4 до 9 строк «дата — подпись». Дата строго «9 декабря» или «9–12 декабря». Период и точную фазу не смешивай.
- grid — значения планет, знаков, арканов, программ: от 4 до 12 ячеек «название — значение». Для статьи про 12 знаков — 12 ячеек с названиями знаков.
- scheme — матрица судьбы (diagram matrix; point: center, left, top, right, bottom, top-left, top-right, bottom-right, bottom-left) или натальная карта (diagram wheel; point — номер дома 1–12): от 3 до 5 подписей к выделенным зонам.

Правила:
1. Используй только факты, числа, даты и трактовки из статьи. Ничего не добавляй от себя, не обещай результата и не упоминай бесплатные расчёты.
2. Если статья широкая — возьми один вопрос с законченным ответом.
3. title — до 56 знаков, конкретный вопрос или название справочника («Где тебе всегда везёт?», «Твой талант по дате рождения», «Лунный календарь на декабрь»).
4. hint — до 95 знаков: где искать ответ (по знаку какой планеты, по числу, по дате). Если на пине есть время — укажи «время московское».
5. cta — до 52 знаков, обещает то, что есть в статье, и содержит слово «статье» («Посмотри все 12 знаков в статье»).
6. Формулировки короткие: groups до 105 знаков; table: ключ до 14, трактовка до 62 (при 8–9 строках до 42); calendar: подпись до 58; grid: название до 14, значение до 46; scheme: название до 22, пояснение до 70.
7. Обращайся на «ты». Без эмодзи, стрелок, ссылок и хэштегов.`;

export function pinUserPrompt(title: string, articleText: string, variant: number, previous?: { title: string; layout: string }, feedback?: string[]): string {
  const angle = variant === 0
    ? "Подача: личный вопрос к читателю («Где тебе…?», «Твой…»)."
    : `Подача: справочник или шпаргалка. ${previous ? `Первый пин по этой статье уже вышел: «${previous.title}» (макет ${previous.layout}). Сделай другой заголовок и, если материал позволяет, другой макет или другую подтему.` : ""}`;
  return `${angle}\n${feedback?.length ? `Предыдущий вариант отклонён проверкой. Исправь:\n- ${feedback.join("\n- ")}\n` : ""}\nСтатья: ${title}\n\n${articleText.slice(0, 16000)}`;
}
const RUN_ID = "X-Lovable-AIG-Run-ID";
function runIdFetch() {
  let runId: string | undefined;
  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    if (runId && !headers.has(RUN_ID)) headers.set(RUN_ID, runId);
    const response = await fetch(input, { ...init, headers });
    runId ??= response.headers.get(RUN_ID)?.trim() || undefined;
    return response;
  };
}
export type Propose = (system: string, prompt: string) => Promise<unknown>;
/** One structured proposal from the Lovable AI Gateway (Responses API, streamed). */
export function gatewayPropose(apiKey: string): Propose {
  const provider = createOpenAI({ baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" }, fetch: runIdFetch() });
  return async (system, prompt) => {
    let failure: unknown;
    const result = streamText({
      model: provider.responses("openai/gpt-6.1-sol"), system, messages: [{ role: "user", content: prompt }],
      output: Output.object({ schema: jsonSchema(PIN_SCHEMA as never) }),
      providerOptions: { openai: { forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", store: false, include: ["reasoning.encrypted_content"] } },
      onError: ({ error }) => { failure = error; },
    });
    try { return await result.output; } catch (error) {
      const status = Number((failure as { statusCode?: number } | undefined)?.statusCode ?? (error as { statusCode?: number }).statusCode ?? 0);
      if (status === 402 || status === 429) throw new GatewayError(status, status === 402 ? "AI credits exhausted" : "AI rate limited");
      throw failure ?? error;
    }
  };
}
/** Up to three proposals; validation errors are returned to the model as feedback. */
export async function extractPinSpec(input: { title: string; articleText: string; variant: number; previous?: { title: string; layout: string }; propose: Propose }): Promise<PinSpec> {
  let feedback: string[] | undefined;
  let last = "no valid proposal";
  for (let attempt = 0; attempt < 3; attempt++) {
    let spec: PinSpec;
    try {
      spec = await input.propose(PIN_SYSTEM, pinUserPrompt(input.title, input.articleText, input.variant, input.previous, feedback)) as PinSpec;
      if (!spec || typeof spec !== "object") throw new Error("empty proposal");
    } catch (error) {
      if (error instanceof GatewayError) throw error;
      last = error instanceof Error ? error.message : String(error);
      continue;
    }
    for (const key of ["groups", "table", "calendar", "grid", "scheme"] as const) if (key !== spec.layout || spec[key] == null) delete spec[key];
    if (spec.table) for (const key of ["formula", "example"] as const) if (spec.table[key] == null) delete spec.table[key];
    const errors = validatePinSpec(spec, input.articleText);
    if (!errors.length) return spec;
    feedback = errors.slice(0, 8);
    last = feedback.join("; ");
  }
  throw new Error(`Pin data failed checks: ${last}`.slice(0, 900));
}
