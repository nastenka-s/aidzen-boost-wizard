import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const SEMRUSH_API_KEY = Deno.env.get("SEMRUSH_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const GATEWAY = "https://connector-gateway.lovable.dev/semrush";
const DATABASE = "ru";

// Базовые «семена» по нашей нише
const SEEDS: { phrase: string; category: string }[] = [
  { phrase: "натальная карта", category: "Астрология" },
  { phrase: "матрица судьбы", category: "Нумерология" },
  { phrase: "число судьбы", category: "Нумерология" },
  { phrase: "нумерология имени", category: "Нумерология" },
  { phrase: "лунный календарь", category: "Астрология" },
  { phrase: "совместимость знаков зодиака", category: "Астрология" },
  { phrase: "ретроградный меркурий", category: "Астрология" },
  { phrase: "число жизненного пути", category: "Нумерология" },
  { phrase: "асцендент", category: "Астрология" },
  { phrase: "лилит в натальной карте", category: "Астрология" },
  { phrase: "аркан матрицы судьбы", category: "Нумерология" },
  { phrase: "ретроградные планеты", category: "Астрология" },
];

// Фильтры качества для нашего низкого AS
const MAX_KD = 40;
const MIN_VOLUME = 100;
const TOP_PER_SEED = 8; // максимум новых тем с одного семени

// =============== Транслитерация для slug ===============
const TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};
function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[а-яё]/g, (c) => TRANSLIT[c] ?? "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// =============== Semrush gateway helpers ===============
interface SemrushRow { Ph: string; Nq: number; Kd: number; Cp?: number }

async function callSemrush(method: string, phrase: string, columns: string): Promise<SemrushRow[]> {
  const url = new URL(`${GATEWAY}/keywords/${method}`);
  url.searchParams.set("phrase", phrase);
  url.searchParams.set("database", DATABASE);
  url.searchParams.set("export_columns", columns);
  url.searchParams.set("display_limit", "25");
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": SEMRUSH_API_KEY,
      "Allow-Limit-Offset": "true",
    },
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Semrush ${method}/${phrase} ${res.status}: ${t.slice(0, 200)}`);
  }
  const data = await res.json();
  if (data?.error) {
    throw new Error(`Semrush error: ${data.error}`);
  }
  const cols: string[] = data?.data?.columnNames ?? [];
  const rows: any[][] = data?.data?.rows ?? [];
  return rows.map((r) => {
    const o: any = {};
    cols.forEach((c, i) => (o[c] = r[i]));
    return {
      Ph: String(o.Ph ?? ""),
      Nq: Number(o.Nq ?? 0),
      Kd: Number(o.Kd ?? 100),
      Cp: Number(o.Cp ?? 0),
    };
  });
}

// =============== Handler ===============
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Загрузим существующие slug-и/темы, чтобы не дублировать
    const { data: existing } = await supabase
      .from("blog_topics")
      .select("slug_hint, topic, keywords");
    const usedSlugs = new Set((existing ?? []).map((e: any) => e.slug_hint));
    const usedKeys = new Set(
      (existing ?? []).map((e: any) => String(e.keywords ?? "").toLowerCase().trim())
    );

    const candidates: Array<{
      topic: string;
      keywords: string;
      slug_hint: string;
      category: string;
      priority: number;
      score: number;
    }> = [];
    const errors: string[] = [];

    for (const seed of SEEDS) {
      for (const method of ["phrase_related", "phrase_questions"]) {
        try {
          const rows = await callSemrush(method, seed.phrase, "Ph,Nq,Cp,Kd");
          for (const r of rows) {
            if (!r.Ph || r.Nq < MIN_VOLUME || r.Kd > MAX_KD) continue;
            const key = r.Ph.toLowerCase().trim();
            if (usedKeys.has(key)) continue;
            const slug = slugify(r.Ph);
            if (!slug || usedSlugs.has(slug)) continue;
            usedKeys.add(key);
            usedSlugs.add(slug);
            const score = r.Nq / (r.Kd + 1);
            // Приоритет: чем выше score — тем меньше число (раньше в очереди)
            const priority = Math.max(1, Math.round(1000 - score));
            const topic = method === "phrase_questions"
              ? r.Ph.charAt(0).toUpperCase() + r.Ph.slice(1) + "?"
              : r.Ph.charAt(0).toUpperCase() + r.Ph.slice(1);
            candidates.push({
              topic,
              keywords: r.Ph,
              slug_hint: slug,
              category: seed.category,
              priority,
              score,
            });
          }
        } catch (e) {
          errors.push((e as Error).message);
          console.error(`[${seed.phrase}/${method}]`, (e as Error).message);
        }
        // лёгкая пауза, чтобы не упереться в rate-limit
        await new Promise((r) => setTimeout(r, 400));
      }
    }

    // Сортируем по score и оставляем top N per seed
    const perSeed: Record<string, number> = {};
    const finalRows = candidates
      .sort((a, b) => b.score - a.score)
      .filter((c) => {
        const k = `${c.category}::${c.slug_hint.split("-")[0]}`;
        perSeed[k] = (perSeed[k] ?? 0) + 1;
        return perSeed[k] <= TOP_PER_SEED;
      });

    let inserted = 0;
    if (finalRows.length) {
      const payload = finalRows.map((c) => ({
        topic: c.topic,
        keywords: c.keywords,
        slug_hint: c.slug_hint,
        category: c.category,
        priority: c.priority,
        status: "pending",
      }));
      const { error, count } = await supabase
        .from("blog_topics")
        .insert(payload, { count: "exact" });
      if (error) throw error;
      inserted = count ?? payload.length;
    }

    return new Response(
      JSON.stringify({
        ok: true,
        seeds: SEEDS.length,
        candidates: candidates.length,
        inserted,
        sample: finalRows.slice(0, 10).map((c) => ({
          topic: c.topic,
          score: Math.round(c.score),
          slug: c.slug_hint,
        })),
        errors: errors.slice(0, 5),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("seed-blog-topics fatal:", (e as Error).message);
    return new Response(
      JSON.stringify({ ok: false, error: (e as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});