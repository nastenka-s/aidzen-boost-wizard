import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { KINDS, lessons, skyBrief, validateArticle, horoscopeArticle, dateLabel, type Kind } from "./editorial.ts";
import { coverPrompt } from "./cover-policy.mjs";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY") ?? "";
const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN") ?? "";
const GITHUB_REPO = Deno.env.get("GITHUB_REPO") ?? ""; // "owner/repo"
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const DOMAIN = "https://aidzen.ru";
let BASE_SHA = "";
let BRANCH = "main"; // resolved at runtime from repo default_branch
const GH_API = `https://api.github.com/repos/${GITHUB_REPO}`;

// ============== Types ==============
interface Topic {
  id: string;
  topic: string;
  keywords: string;
  slug_hint: string;
  category: string;
  content_kind: Kind;
  editorial_brief: any;
}

interface ArticleSection {
  h2: string;
  paragraphs: string[];
  bulletList?: string[];
  example?: string;
  warning?: string;
}

interface GeneratedArticle {
  category?: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  keywords: string;
  readingMinutes: number;
  intro: string[];
  sections: ArticleSection[];
  faq: { question: string; answer: string }[];
  conclusion: string;
  relatedSlugs: string[];
}

interface RelatedPost { title: string; slug: string; }

// ============== Utilities ==============
const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
const escAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escJsx = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");

// ============== Dzen-ready HTML builder ==============
// Only tags allowed by Dzen RSS: p, h2, h3, b, i, ul, ol, li, blockquote, a, img
function escHtml(s: string): string {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildDzenHtml(a: GeneratedArticle, coverUrl: string): string {
  const parts: string[] = [];
  if (coverUrl) {
    parts.push(`<img src="${coverUrl}" alt="${escHtml(a.title)}" />`);
  }
  for (const p of a.intro ?? []) {
    parts.push(`<p>${escHtml(p)}</p>`);
  }
  for (const s of a.sections ?? []) {
    parts.push(`<h2>${escHtml(s.h2)}</h2>`);
    for (const p of s.paragraphs ?? []) parts.push(`<p>${escHtml(p)}</p>`);
    if (s.bulletList && s.bulletList.length) {
      parts.push("<ul>" + s.bulletList.map((li) => `<li>${escHtml(li)}</li>`).join("") + "</ul>");
    }
    if (s.example) {
      parts.push(`<blockquote><b>Пример.</b> ${escHtml(s.example)}</blockquote>`);
    }
    if (s.warning) {
      parts.push(`<blockquote><b>Важно.</b> ${escHtml(s.warning)}</blockquote>`);
    }
  }
  if (a.faq && a.faq.length) {
    parts.push(`<h2>Частые вопросы</h2>`);
    for (const q of a.faq) {
      parts.push(`<h3>${escHtml(q.question)}</h3>`);
      parts.push(`<p>${escHtml(q.answer)}</p>`);
    }
  }
  if (a.conclusion) {
    parts.push(`<h2>Заключение</h2>`);
    parts.push(`<p>${escHtml(a.conclusion)}</p>`);
  }
  parts.push(`<p><b>Бесплатный расчёт натальной карты и матрицы судьбы:</b> <a href="https://chat.aidzen.ru/login">chat.aidzen.ru</a></p>`);
  return parts.join("\n");
}

function buildDzenDescription(a: GeneratedArticle): string {
  // Short snippet for Dzen card, max ~200 chars
  let s = (a.metaDescription || a.intro?.[0] || a.title).replace(/\s+/g, " ").trim();
  if (s.length > 200) s = s.slice(0, 197).trimEnd() + "…";
  return s;
}

// ============== AI cover image generation ==============
async function generateCoverImage(title: string, kind: Kind, targetDate?: string): Promise<string> {
  // Returns base64 PNG (no data: prefix)
  const prompt = coverPrompt(title, kind, targetDate);
  const res = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${LOVABLE_API_KEY}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image",
      messages: [{ role: "user", content: prompt }],
      modalities: ["image", "text"],
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new ProviderError(res.status, `Image gateway ${res.status}: ${t.slice(0, 300)}`);
  }
  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) throw new Error("Image gen: no b64_json in response");
  return b64;
}

function pascalCase(slug: string): string {
  return slug
    .split(/[-_]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join("")
    .replace(/[^A-Za-z0-9]/g, "");
}

function ruDate(d = new Date()): string {
 return d.toLocaleDateString("ru-RU", {day:"numeric",month:"long",year:"numeric",timeZone:"Europe/Moscow"});
}
function isoDate(d = new Date()): string { return d.toISOString().slice(0,10); }
function rfc822Date(d = new Date()): string { return d.toUTCString(); }
class ProviderError extends Error {
 constructor(public status: number,message: string) { super(message); }
}

// ============== AI generation ==============
async function generateArticle(topic: Topic, existing: RelatedPost[]): Promise<GeneratedArticle> {
  const relatedHint = existing.slice(0, 30).map((p) => `- "${p.title}" → ${p.slug}`).join("\n");

  const systemPrompt = `Ты — главный редактор экспертного блога aidzen.ru об астрологии и нумерологии. Пишешь образовательные материалы без вымышленного стажа и неподтверждённых утверждений для аудитории русскоязычных женщин 30-50 лет.

ЖЁСТКИЕ ПРАВИЛА КАЧЕСТВА:
1. Только конкретные факты, формулы, расчёты, примеры. НИКАКОЙ воды.
2. Запрещены клише: "в современном мире", "с давних времён", "наши предки", "испокон веков", "вселенная говорит", "вибрации", "тонкие энергии" без конкретики.
3. Каждое утверждение подкреплено: либо астрологическим/нумерологическим правилом, либо конкретным примером с цифрами/планетами/арканами.
4. Стиль — деловой, тёплый, без эзотерического пафоса. Без "дорогие читательницы". Обращение на "вы" со строчной.
5. Объём: 1800-2500 слов в сумме (intro + все sections + conclusion).
6. Структура секции: тезис → объяснение механики → пример с конкретикой → практический вывод/действие.
7. Не смешивай нумерологию 1–9 и Матрицу судьбы 22 арканов. Не добавляй формулы или значения позиций, отсутствующие в источниковом брифе.
8. Если астрологическая — упоминай конкретные планеты, дома, аспекты, знаки.
9. Избегай категоричных предсказаний и фатализма. Используй формулировки "сигнал", "тенденция", "склонность", "повышенная вероятность".
10. БЕЗ упоминания каких-либо AI, чата GPT, нейросетей.
11. Источниковый бриф — единственная основа знаний. Объясняй только его положения. Не добавляй неподтверждённые события, даты, формулы, авторов, цитаты и медицинские/финансовые обещания. Различай расчётные факты и символические традиции.
12. Гороскоп — строго символические рекомендации по рассчитанному брифу, без обещаний событий. Числа, даты, градусы и факты неба будут вставлены программой отдельно.
13. Не используй HTML, фигурные скобки, JSX, backticks или markdown в текстовых полях.`;

  const userPrompt = `Тема статьи: "${topic.topic}"
Ключевые слова для SEO: ${topic.keywords}
Категория: ${topic.category}
Тип материала: ${topic.content_kind}
Проверенная основа и методика: ${JSON.stringify(topic.editorial_brief)}
Желаемый slug: ${topic.slug_hint}

Существующие статьи блога (для перекрёстных ссылок — выбери 3 наиболее релевантных):
${relatedHint}

Сгенерируй экспертную статью. Верни JSON со следующей структурой:

{
  "title": "Заголовок H1 на странице (50-70 символов, читабельный)",
  "metaTitle": "<title> для SEO (до 60 символов, с главным ключом)",
  "metaDescription": "<meta description> (140-160 символов, с призывом и ключом)",
  "slug": "${topic.slug_hint}",
  "keywords": "${topic.keywords}",
  "readingMinutes": число от 7 до 14,
  "intro": ["абзац 1 вступления", "абзац 2 вступления (опционально)"],
  "sections": [
    {
      "h2": "Заголовок раздела",
      "paragraphs": ["абзац 1", "абзац 2", "..."],
      "bulletList": ["опциональный пункт списка", "..."],
      "example": "опциональный конкретный пример с расчётом/планетами/арканом",
      "warning": "опциональное предупреждение об ошибке интерпретации"
    }
  ],
  "faq": [
    {"question": "Вопрос", "answer": "Краткий точный ответ 2-4 предложения"}
  ],
  "conclusion": "Финальный абзац с обобщением и мягким призывом обратиться к расчётам на сайте",
  "relatedSlugs": ["slug-1", "slug-2", "slug-3"]
}

Требования к структуре:
- Для образовательных статей 5-7 разделов sections.
- Для tomorrow_horoscope — РОВНО 12 разделов с h2 строго: Овен, Телец, Близнецы, Рак, Лев, Дева, Весы, Скорпион, Стрелец, Козерог, Водолей, Рыбы. Метод: знак читателя как первый солнечный цельнознаковый дом, не индивидуальный асцендент. Опирайся на темы планет и аспектов из брифа, НЕ вводи другие аспекты. В paragraphs/bulletList/example/warning/intro/faq/conclusion не должно быть цифр, дат, градусов и заявлений о ретроградности, затмениях, фазах Луны и переходах знака. Все такие факты добавит программа.
- Минимум 3 раздела с bulletList или example
- 4-6 вопросов в faq (для FAQPage schema.org)
- relatedSlugs — ровно 3 slug из списка выше (без ведущего слэша)
- НЕ используй markdown (**, ##, ---) в значениях полей — только обычный текст`;

  // Try several models with retries — Gemini 2.5 Pro occasionally returns empty content.
  const attempts: { model: string; label: string }[] = [
    { model: "google/gemini-2.5-pro", label: "pro#1" },
    { model: "google/gemini-2.5-pro", label: "pro#2" },
    { model: "google/gemini-2.5-flash", label: "flash#1" },
    { model: "google/gemini-2.5-flash", label: "flash#2" },
  ];
  let content = "";
  let lastError = "";
  for (const attempt of attempts) {
    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        },
        body: JSON.stringify({
          model: attempt.model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        lastError = `AI gateway ${res.status}: ${text.slice(0, 300)}`;
        console.error(`[${attempt.label}] ${lastError}`);
        if (res.status !== 429 && res.status < 500) throw new ProviderError(res.status,lastError);
        if (attempt === attempts[attempts.length-1]) throw new ProviderError(res.status,lastError);
        const retryAfter = Number(res.headers.get('Retry-After'));
        await new Promise((r) => setTimeout(r, retryAfter > 0 ? retryAfter * 1000 : 1500 * 2 ** attempts.indexOf(attempt)));
        continue;
      }
      const data = await res.json();
      const c = data.choices?.[0]?.message?.content;
      if (data.choices?.[0]?.message?.refusal || !c) {
        throw new ProviderError(403,"AI content refusal or empty response");
      }
      const candidate = JSON.parse(c.replace(/^```(?:json)?\s*/i," ").replace(/```\s*$/i," ").trim());
      validateArticle(candidate,topic.content_kind,topic.editorial_brief,existing.map(p=>p.slug));
      content = JSON.stringify(candidate);
      console.log(`[${attempt.label}] success, length=${c.length}`);
      break;
    } catch (e) {
      if (e instanceof ProviderError) throw e;
      lastError = (e as Error).message;
      console.error(`[${attempt.label}] exception: ${lastError}`);
      await new Promise((r) => setTimeout(r, 1500));
    }
  }
  if (!content) {
    throw new Error(`AI failed after ${attempts.length} attempts: ${lastError}`);
  }

  // Strip markdown code fences if present
  let cleaned = content.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  }
  // Extract first {...} block if model added prose around it
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace > 0 || lastBrace < cleaned.length - 1) {
    if (firstBrace >= 0 && lastBrace > firstBrace) cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  let parsed: GeneratedArticle;
  try {
    parsed = JSON.parse(cleaned) as GeneratedArticle;
  } catch (e) {
    console.error("AI content (first 1500 chars):", cleaned.slice(0, 1500));
    throw new Error(`AI JSON parse failed: ${(e as Error).message}`);
  }
  if (!parsed.title || !parsed.slug || !parsed.sections?.length) {
    throw new Error("AI response missing required fields");
  }
  parsed.slug = parsed.slug.replace(/^\/+/, "").trim();
  return parsed;
}

// ============== TSX template ==============
function buildTsxPage(a: GeneratedArticle, relatedTitles: Map<string, string>, coverUrl: string): string {
  const dateRu = ruDate();
  const url = `${DOMAIN}/${a.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.metaDescription,
    image: coverUrl,
    author: { "@type": "Organization", name: "НейроДзен", url: DOMAIN },
    publisher: { "@type": "Organization", name: "НейроДзен", url: DOMAIN, logo: { "@type": "ImageObject", url: `${DOMAIN}/favicon.svg` } },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: a.faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };

  const sectionsJsx = a.sections.map((s) => {
    let body = "";
    body += `\n              <h2 className="text-3xl font-bold mt-12 mb-6">${escJsx(s.h2)}</h2>\n`;
    for (const p of s.paragraphs ?? []) {
      body += `\n              <p className="mb-4 leading-relaxed">${escJsx(p)}</p>\n`;
    }
    if (s.bulletList && s.bulletList.length) {
      body += `\n              <ul className="list-disc pl-6 mb-6 space-y-2">\n`;
      for (const li of s.bulletList) body += `                <li>${escJsx(li)}</li>\n`;
      body += `              </ul>\n`;
    }
    if (s.example) {
      body += `\n              <Card className="p-6 my-8 border-primary/30">\n                <p className="font-semibold mb-2">Пример.</p>\n                <p>${escJsx(s.example)}</p>\n              </Card>\n`;
    }
    if (s.warning) {
      body += `\n              <div className="bg-destructive/10 border-l-4 border-destructive p-6 my-8">\n                <p className="font-semibold mb-2">Важно учесть.</p>\n                <p>${escJsx(s.warning)}</p>\n              </div>\n`;
    }
    return body;
  }).join("");

  const introJsx = (a.intro ?? []).map((p, i) =>
    `\n              <p className="${i === 0 ? "text-lg leading-relaxed mb-6" : "mb-6 leading-relaxed"}">${escJsx(p)}</p>\n`
  ).join("");

  const faqJsx = a.faq.map((q, i) => `
                <AccordionItem value="q-${i}">
                  <AccordionTrigger className="text-left">${escJsx(q.question)}</AccordionTrigger>
                  <AccordionContent>${escJsx(q.answer)}</AccordionContent>
                </AccordionItem>`).join("");

  const relatedJsx = a.relatedSlugs.slice(0, 3).map((slug) => {
    const title = relatedTitles.get(slug) || slug;
    return `
                <Link to="/${slug}" className="block p-4 rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-colors">
                  <p className="font-medium text-foreground">${escJsx(title)}</p>
                </Link>`;
  }).join("");

  return `import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const Page = () => {
  return (
    <>
      <Helmet>
        <title>${escAttr(a.metaTitle)} | НейроДзен</title>
        <meta name="description" content="${escAttr(a.metaDescription)}" />
        <meta name="keywords" content="${escAttr(a.keywords)}" />
        <link rel="canonical" href="${url}" />

        <meta property="og:title" content="${escAttr(a.title)}" />
        <meta property="og:description" content="${escAttr(a.metaDescription)}" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="${url}" />
        <meta property="og:image" content="${escAttr(coverUrl)}" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${escAttr(a.title)}" />
        <meta name="twitter:description" content="${escAttr(a.metaDescription)}" />

        <script type="application/ld+json">{${"`"}${esc(JSON.stringify(articleSchema))}${"`"}}</script>
        <script type="application/ld+json">{${"`"}${esc(JSON.stringify(faqSchema))}${"`"}}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-primary/5">
        <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold">Н</div>
                <span className="font-semibold text-foreground">НейроДзен</span>
              </Link>
              <div className="flex gap-4">
                <Link to="/blog"><Button variant="ghost">Блог</Button></Link>
                <Link to="/natal-chart-calculator"><Button variant="ghost">Натальная карта</Button></Link>
              </div>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <article>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">${escJsx(a.category || "Астрология")}</Badge>
                <Badge variant="outline">${a.readingMinutes || 10} минут чтения</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                ${escJsx(a.title)}
              </h1>
              <p className="text-muted-foreground text-lg">${dateRu}</p>
            </div>

            <div className="prose prose-lg max-w-none">${introJsx}${sectionsJsx}

              <h2 className="text-3xl font-bold mt-12 mb-6">Частые вопросы</h2>
              <Accordion type="single" collapsible className="mb-8">${faqJsx}
              </Accordion>

              <h2 className="text-3xl font-bold mt-12 mb-6">Заключение</h2>
              <p className="mb-6 leading-relaxed">${escJsx(a.conclusion)}</p>

              <Card className="p-6 my-8 bg-primary/5 border-primary/20">
                <p className="font-semibold mb-3">Хотите глубже разобрать свой случай?</p>
                <p className="mb-4">Сделайте бесплатный расчёт натальной карты или Матрицы судьбы и получите персональную расшифровку с экспертным разбором.</p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                    <Button>Начать расчёт</Button>
                  </a>
                  <Link to="/blog"><Button variant="outline">Все статьи блога</Button></Link>
                </div>
              </Card>

              <h2 className="text-3xl font-bold mt-12 mb-6">Читайте также</h2>
              <div className="grid gap-3 mb-8">${relatedJsx}
              </div>
            </div>
          </article>
        </main>
      </div>
    </>
  );
};

export default Page;
`;
}

// ============== GitHub Git Data API ==============
const ghHeaders = {
  "Authorization": `Bearer ${GITHUB_TOKEN}`,
  "Accept": "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "aidzen-blog-generator",
};

async function ghJson(path: string, init?: RequestInit): Promise<any> {
  const res = await fetch(`${GH_API}${path}`, { ...init, headers: { ...ghHeaders, ...(init?.headers || {}) } });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`GitHub ${init?.method || "GET"} ${path} → ${res.status}: ${t.slice(0, 400)}`);
  }
  return await res.json();
}

async function getFileContent(path: string): Promise<string> {
  const data = await ghJson(`/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}?ref=${BASE_SHA || BRANCH}`);
  // GitHub returns base64 with newlines
  const b64 = (data.content || "").replace(/\n/g, "");
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

async function createBlob(content: string, isBase64 = false): Promise<string> {
  let b64: string;
  if (isBase64) {
    b64 = content;
  } else {
    // Encode UTF-8 safely to base64
    const utf8 = new TextEncoder().encode(content);
    let bin = "";
    for (let i = 0; i < utf8.length; i++) bin += String.fromCharCode(utf8[i]);
    b64 = btoa(bin);
  }
  const blob = await ghJson(`/git/blobs`, {
    method: "POST",
    body: JSON.stringify({ content: b64, encoding: "base64" }),
  });
  return blob.sha;
}

async function commitFiles(files: { path: string; content: string; isBase64?: boolean }[], message: string): Promise<{ sha: string; url: string }> {
  const baseCommitSha = BASE_SHA;
  if (!baseCommitSha) throw new Error("Missing pinned GitHub base");
  const baseCommit = await ghJson(`/git/commits/${baseCommitSha}`);
  const baseTreeSha: string = baseCommit.tree.sha;

  const treeItems = [] as { path: string; mode: string; type: string; sha: string }[];
  for (const f of files) {
    const blobSha = await createBlob(f.content, f.isBase64 === true);
    treeItems.push({ path: f.path, mode: "100644", type: "blob", sha: blobSha });
  }

  const newTree = await ghJson(`/git/trees`, {
    method: "POST",
    body: JSON.stringify({ base_tree: baseTreeSha, tree: treeItems }),
  });

  const newCommit = await ghJson(`/git/commits`, {
    method: "POST",
    body: JSON.stringify({ message, tree: newTree.sha, parents: [baseCommitSha] }),
  });

  await ghJson(`/git/refs/heads/${BRANCH}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: newCommit.sha, force: false }),
  });

  return { sha: newCommit.sha, url: newCommit.html_url };
}

// ============== File mutators ==============
function updateBlogPostsTs(current: string, a: GeneratedArticle): string {
  const entry = `  {
    title: ${JSON.stringify(a.title)},
    desc: ${JSON.stringify(a.metaDescription)},
    date: ${JSON.stringify(ruDate())},
    link: ${JSON.stringify("/" + a.slug)}
  },
`;
  const marker = "export const blogPosts: BlogPost[] = [\n";
  const idx = current.indexOf(marker);
  if (idx < 0) throw new Error("blogPosts.ts marker not found");
  return current.slice(0, idx + marker.length) + entry + current.slice(idx + marker.length);
}

function updateAppTsx(current: string, a: GeneratedArticle): string {
  const compName = pascalCase(a.slug);
  // Insert import
  const importMarker = "// __AUTOGEN_IMPORTS__";
  const importIdx = current.indexOf(importMarker);
  if (importIdx < 0) throw new Error("App.tsx import marker not found");
  const importLine = `import ${compName} from "./pages/blog-auto/${compName}";\n`;
  let next = current.slice(0, importIdx) + importLine + current.slice(importIdx);

  // Insert route
  const routeMarker = "{/* __AUTOGEN_ROUTES__ (do not remove — used by generate-blog-post edge function) */}";
  const routeIdx = next.indexOf(routeMarker);
  if (routeIdx < 0) throw new Error("App.tsx route marker not found");
  const after = routeIdx + routeMarker.length;
  const routeLine = `\n          <Route path="/${a.slug}" element={<${compName} />} />`;
  next = next.slice(0, after) + routeLine + next.slice(after);
  return next;
}

function updateSitemap(current: string, a: GeneratedArticle): string {
  const block = `  <url>\n    <loc>${DOMAIN}/${a.slug}</loc>\n    <lastmod>${isoDate()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  return current.replace(/<urlset([^>]*)>\n/, (m, attrs) => `<urlset${attrs}>\n${block}`);
}

function updateRss(current: string, a: GeneratedArticle): string {
  const item = `\n    <item>
      <title>${escAttr(a.title)}</title>
      <link>${DOMAIN}/${a.slug}</link>
      <description>${escAttr(a.metaDescription)}</description>
      <pubDate>${rfc822Date()}</pubDate>
      <guid>${DOMAIN}/${a.slug}</guid>
    </item>
`;
  // Insert after <atom:link ... />
  if (!/<atom:link[^>]*\/>/.test(current)) throw new Error('RSS insertion marker missing');
  return current.replace(/(<atom:link[^>]*\/>)/, `$1${item}`);
}

// ============== Handler ==============
Deno.serve(async (req) => {
 if(req.method === "OPTIONS") return new Response("ok",{headers:corsHeaders});
 const respond=(data:unknown,status=200)=>new Response(JSON.stringify(data),{status,headers:{...corsHeaders,"Content-Type":"application/json"}});
 if(req.method!=="POST")return respond({error:"POST required"},405);
 const supabase=createClient(SUPABASE_URL,SUPABASE_SERVICE_ROLE_KEY);
 const check=(result:any)=>{if(result.error)throw new Error(result.error.message);return result.data;};
 let token:string|undefined, day:string|undefined,kind:Kind|undefined,topicId:string|undefined;
 try {
  const secret=req.headers.get("x-blog-scheduler-secret")??"";
  const authorized=check(await supabase.rpc("authorize_blog_scheduler",{p_secret:secret}));
  if(!authorized)return respond({error:"Unauthorized scheduler"},401);
  let body:any;try{body=await req.json();}catch{return respond({error:"Invalid JSON"},400);}
  if(body.kind!==undefined && !KINDS.includes(body.kind))return respond({error:"Invalid kind"},400);
  for(const [k,v] of [["LOVABLE_API_KEY",LOVABLE_API_KEY],["GITHUB_TOKEN",GITHUB_TOKEN],["GITHUB_REPO",GITHUB_REPO]])if(!v)throw new Error(`Missing env var: ${k}`);
  const claim=check(await supabase.rpc("claim_blog_daily",{p_kind:body.kind??null}));
  if(claim.skipped)return respond({ok:true,...claim});
  token=claim.token;day=claim.day;kind=claim.kind;
  if(!token||!day||!kind)throw new Error("Invalid claim");
  const repo=await ghJson("");BRANCH=repo.default_branch||"main";
  const ref=await ghJson(`/git/ref/heads/${BRANCH}`);BASE_SHA=ref.object.sha;
  const blogRaw=await getFileContent("src/data/blogPosts.ts");
  const existing:RelatedPost[]=[];
  const pattern=/title:\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')[\s\S]*?link:\s*["'](\/[\w-]+)["']/g;
  for(const match of blogRaw.matchAll(pattern)){let title=match[1].slice(1,-1);if(match[1][0]==='"')title=JSON.parse(match[1]);existing.push({title,slug:match[2].slice(1)});}
  let topic:Topic;
  if(claim.slot.topic_id){
   topic=check(await supabase.from("blog_topics").select("*").eq("id",claim.slot.topic_id).single());
  }else if(kind==='tomorrow_horoscope'){
   const brief=skyBrief(day),slug=`goroskop-na-${brief.target}`;
   const row=check(await supabase.from("blog_topics").select("*").eq("slug_hint",slug).limit(1));
   topic=row[0]??check(await supabase.from("blog_topics").insert({topic:`Гороскоп на ${dateLabel(brief.target)} для всех знаков зодиака`,keywords:`гороскоп на завтра, гороскоп на ${dateLabel(brief.target)}, гороскоп для всех знаков зодиака`,slug_hint:slug,category:'Гороскоп',content_kind:kind,editorial_brief:brief,target_date:brief.target}).select().single());
  }else{
   const pool=lessons().filter(l=>l.kind===kind);
   const known=check(await supabase.from("blog_topics").select("slug_hint,status").in("slug_hint",pool.map(l=>l.slug)));
   const lesson=pool.find(l=>!existing.some(p=>p.slug===l.slug)&&!known.some((p:any)=>p.slug_hint===l.slug&&p.status==='published'));
   if(!lesson)throw new Error(`No remaining source-grounded lessons for ${kind}`);
   const rows=check(await supabase.from("blog_topics").select("*").eq("slug_hint",lesson.slug).limit(1));
   topic=rows[0]??check(await supabase.from("blog_topics").insert({topic:lesson.title,keywords:lesson.keywords,slug_hint:lesson.slug,category:kind==='astrology_education'?'Астрология':'Нумерология',content_kind:kind,editorial_brief:lesson}).select().single());
  }
  topicId=topic.id;
  check(await supabase.from("blog_daily_slots").update({topic_id:topicId,status:'generating'}).eq('publication_day',day).eq('content_kind',kind));
  check(await supabase.from("blog_topics").update({status:'generating'}).eq('id',topicId));
  let payload=claim.slot.payload;
  if(!payload){
   if(existing.some(p=>p.slug===topic.slug_hint))throw new Error('Existing article without recoverable payload');
   const article=kind==='tomorrow_horoscope' ? horoscopeArticle(topic.editorial_brief,existing.map(p=>p.slug)) : await generateArticle(topic,existing);article.slug=topic.slug_hint;article.category=topic.category;
   if(!/^[a-z][a-z0-9-]*$/.test(article.slug))throw new Error('Unsafe slug');
   const coverB64=await generateCoverImage(article.title,topic.category);
   const coverUrl=`${DOMAIN}/blog-covers/${article.slug}.png`;
   payload={article,coverB64,coverUrl,dzenHtml:buildDzenHtml(article,coverUrl)};
   check(await supabase.from('blog_daily_slots').update({payload}).eq('publication_day',day).eq('content_kind',kind));
  }
  const {article,coverB64,coverUrl,dzenHtml}=payload;
  let commit={sha:BASE_SHA,url:`https://github.com/${GITHUB_REPO}/commit/${BASE_SHA}`};
  if(!existing.some(p=>p.slug===article.slug)){
   const [appRaw,sitemapRaw,rssRaw]=await Promise.all([getFileContent('src/App.tsx'),getFileContent('public/sitemap.xml'),getFileContent('public/rss.xml')]);
   const files=[{path:`src/pages/blog-auto/${pascalCase(article.slug)}.tsx`,content:buildTsxPage(article,new Map(existing.map(p=>[p.slug,p.title])))},{path:'src/data/blogPosts.ts',content:updateBlogPostsTs(blogRaw,article)},{path:'src/App.tsx',content:updateAppTsx(appRaw,article)},{path:'public/sitemap.xml',content:updateSitemap(sitemapRaw,article)},{path:'public/rss.xml',content:updateRss(rssRaw,article)},{path:`public/blog-covers/${article.slug}.png`,content:coverB64,isBase64:true}];
   commit=await commitFiles(files,`feat(blog): publish ${kind} ${day}: ${article.title.slice(0,60)}`);
  }
  check(await supabase.rpc('finish_blog_daily',{p_token:token,p_day:day,p_kind:kind,p_topic:topicId,p_article:article,p_cover:coverUrl,p_html:dzenHtml,p_commit:commit}));
  return respond({ok:true,kind,day,title:article.title,url:`${DOMAIN}/${article.slug}`,commit:commit.url});
 }catch(err){
  const msg=err instanceof Error?err.message:String(err),status=err instanceof ProviderError?err.status:500;
  console.error('generate-blog-post:',msg);
  if(token){
   const paused=err instanceof ProviderError&&(status===402||status===403||status===429);
   const release=await supabase.from('blog_job_state').update({lease_token:null,lease_until:null,...(paused?{paused_reason:msg,resume_after:status===429?new Date(Date.now()+3600000).toISOString():null}:{})}).eq('id','daily').eq('lease_token',token);
   if(release.error)console.error('Release blog lease:',release.error.message);
   if(day&&kind)await supabase.from('blog_daily_slots').update({status:'pending',error_message:msg.slice(0,2000)}).eq('publication_day',day).eq('content_kind',kind);
   if(topicId){await supabase.from('blog_topics').update({status:'pending'}).eq('id',topicId);await supabase.from('blog_generations').insert({topic_id:topicId,status:'failed',error_message:msg.slice(0,2000)});}
  }
  return respond({ok:false,error:msg},status);
 }
});
