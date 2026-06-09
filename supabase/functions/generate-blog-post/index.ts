import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN")!;
const GITHUB_REPO = Deno.env.get("GITHUB_REPO")!; // "owner/repo"
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const DOMAIN = "https://aidzen.ru";
let BRANCH = "main"; // resolved at runtime from repo default_branch
const GH_API = `https://api.github.com/repos/${GITHUB_REPO}`;

// ============== Types ==============
interface Topic {
  id: string;
  topic: string;
  keywords: string;
  slug_hint: string;
  category: string;
}

interface ArticleSection {
  h2: string;
  paragraphs: string[];
  bulletList?: string[];
  example?: string;
  warning?: string;
}

interface GeneratedArticle {
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
const escAttr = (s: string) => s.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escJsx = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");

function pascalCase(slug: string): string {
  return slug
    .split(/[-_]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join("")
    .replace(/[^A-Za-z0-9]/g, "");
}

function ruDate(d = new Date()): string {
  const months = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
}

function isoDate(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function rfc822Date(d = new Date()): string {
  return d.toUTCString().replace("GMT", "+0300");
}

// ============== AI generation ==============
async function generateArticle(topic: Topic, existing: RelatedPost[]): Promise<GeneratedArticle> {
  const relatedHint = existing.slice(0, 30).map((p) => `- "${p.title}" → ${p.slug}`).join("\n");

  const systemPrompt = `Ты — главный редактор экспертного блога aidzen.ru об астрологии и нумерологии. Пишешь как опытный астролог-практик с 15-летним стажем для аудитории русскоязычных женщин 30-50 лет.

ЖЁСТКИЕ ПРАВИЛА КАЧЕСТВА:
1. Только конкретные факты, формулы, расчёты, примеры. НИКАКОЙ воды.
2. Запрещены клише: "в современном мире", "с давних времён", "наши предки", "испокон веков", "вселенная говорит", "вибрации", "тонкие энергии" без конкретики.
3. Каждое утверждение подкреплено: либо астрологическим/нумерологическим правилом, либо конкретным примером с цифрами/планетами/арканами.
4. Стиль — деловой, тёплый, без эзотерического пафоса. Без "дорогие читательницы". Обращение на "вы" со строчной.
5. Объём: 1800-2500 слов в сумме (intro + все sections + conclusion).
6. Структура секции: тезис → объяснение механики → пример с конкретикой → практический вывод/действие.
7. Если тема нумерологическая — приводи реальные формулы редукции (сложение цифр до однозначного числа).
8. Если астрологическая — упоминай конкретные планеты, дома, аспекты, знаки.
9. Избегай категоричных предсказаний и фатализма. Используй формулировки "сигнал", "тенденция", "склонность", "повышенная вероятность".
10. БЕЗ упоминания каких-либо AI, чата GPT, нейросетей.`;

  const userPrompt = `Тема статьи: "${topic.topic}"
Ключевые слова для SEO: ${topic.keywords}
Категория: ${topic.category}
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
- 5-7 разделов sections
- Минимум 3 раздела с bulletList или example
- 4-6 вопросов в faq (для FAQPage schema.org)
- relatedSlugs — ровно 3 slug из списка выше (без ведущего слэша)
- НЕ используй markdown (**, ##, ---) в значениях полей — только обычный текст`;

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${LOVABLE_API_KEY}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-pro",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI gateway ${res.status}: ${text.slice(0, 500)}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("AI returned empty content");

  const parsed = JSON.parse(content) as GeneratedArticle;
  if (!parsed.title || !parsed.slug || !parsed.sections?.length) {
    throw new Error("AI response missing required fields");
  }
  parsed.slug = parsed.slug.replace(/^\/+/, "").trim();
  return parsed;
}

// ============== TSX template ==============
function buildTsxPage(a: GeneratedArticle, relatedTitles: Map<string, string>): string {
  const dateRu = ruDate();
  const url = `${DOMAIN}/${a.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.metaDescription,
    image: `${DOMAIN}/favicon.svg`,
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
  const data = await ghJson(`/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}?ref=${BRANCH}`);
  // GitHub returns base64 with newlines
  const b64 = (data.content || "").replace(/\n/g, "");
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

async function createBlob(content: string): Promise<string> {
  // Encode UTF-8 safely to base64
  const utf8 = new TextEncoder().encode(content);
  let bin = "";
  for (let i = 0; i < utf8.length; i++) bin += String.fromCharCode(utf8[i]);
  const b64 = btoa(bin);
  const blob = await ghJson(`/git/blobs`, {
    method: "POST",
    body: JSON.stringify({ content: b64, encoding: "base64" }),
  });
  return blob.sha;
}

async function commitFiles(files: { path: string; content: string }[], message: string): Promise<{ sha: string; url: string }> {
  const ref = await ghJson(`/git/ref/heads/${BRANCH}`);
  const baseCommitSha: string = ref.object.sha;
  const baseCommit = await ghJson(`/git/commits/${baseCommitSha}`);
  const baseTreeSha: string = baseCommit.tree.sha;

  const treeItems = [] as { path: string; mode: string; type: string; sha: string }[];
  for (const f of files) {
    const blobSha = await createBlob(f.content);
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
  return current.replace(/(<atom:link[^/]*\/>)/, `$1${item}`);
}

// ============== Handler ==============
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  let topicId: string | null = null;

  try {
    // Required env check
    for (const [k, v] of [["LOVABLE_API_KEY", LOVABLE_API_KEY], ["GITHUB_TOKEN", GITHUB_TOKEN], ["GITHUB_REPO", GITHUB_REPO]]) {
      if (!v) throw new Error(`Missing env var: ${k}`);
    }

    // Resolve default branch
    const repoInfo = await ghJson("");
    BRANCH = repoInfo.default_branch || "main";

    // 1. Get next pending topic
    const { data: topics, error: tErr } = await supabase
      .from("blog_topics")
      .select("id, topic, keywords, slug_hint, category")
      .eq("status", "pending")
      .order("priority", { ascending: true })
      .order("created_at", { ascending: true })
      .limit(1);
    if (tErr) throw new Error("DB select topics: " + tErr.message);
    if (!topics || topics.length === 0) {
      return new Response(JSON.stringify({ ok: false, reason: "No pending topics" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
      });
    }
    const topic = topics[0] as Topic;
    topicId = topic.id;

    await supabase.from("blog_topics").update({ status: "generating" }).eq("id", topic.id);

    // 2. Read existing blog posts list for related linking and dedup
    const blogPostsTsRaw = await getFileContent("src/data/blogPosts.ts");
    const existing: RelatedPost[] = [];
    const re = /title:\s*'([^']+)'[\s\S]*?link:\s*'(\/[\w\-]+)'/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(blogPostsTsRaw)) !== null) {
      existing.push({ title: m[1], slug: m[2].replace(/^\//, "") });
    }
    // Dedup check
    if (existing.some((p) => p.slug === topic.slug_hint)) {
      throw new Error(`Slug ${topic.slug_hint} already exists in blog`);
    }

    // 3. Generate article via AI
    const article = await generateArticle(topic, existing);
    // Force slug from topic to avoid AI drift
    article.slug = topic.slug_hint;

    // Final dedup with AI-returned slug
    if (existing.some((p) => p.slug === article.slug)) {
      throw new Error(`Generated slug collision: ${article.slug}`);
    }

    // 4. Build related titles map
    const titleMap = new Map(existing.map((p) => [p.slug, p.title]));

    // 5. Build TSX page
    const compName = pascalCase(article.slug);
    const tsxContent = buildTsxPage(article, titleMap);

    // 6. Read other source files
    const [appTsxRaw, sitemapRaw, rssRaw] = await Promise.all([
      getFileContent("src/App.tsx"),
      getFileContent("public/sitemap.xml"),
      getFileContent("public/rss.xml"),
    ]);

    // 7. Compose updated files
    const newBlogPostsTs = updateBlogPostsTs(blogPostsTsRaw, article);
    const newAppTsx = updateAppTsx(appTsxRaw, article);
    const newSitemap = updateSitemap(sitemapRaw, article);
    const newRss = updateRss(rssRaw, article);

    // 8. Atomic commit
    const commit = await commitFiles([
      { path: `src/pages/blog-auto/${compName}.tsx`, content: tsxContent },
      { path: "src/data/blogPosts.ts", content: newBlogPostsTs },
      { path: "src/App.tsx", content: newAppTsx },
      { path: "public/sitemap.xml", content: newSitemap },
      { path: "public/rss.xml", content: newRss },
    ], `feat(blog): auto-publish "${article.title.slice(0, 60)}"`);

    // 9. Mark topic published, log
    const url = `${DOMAIN}/${article.slug}`;
    await supabase.from("blog_topics").update({
      status: "published",
      published_url: url,
      generated_at: new Date().toISOString(),
    }).eq("id", topic.id);

    await supabase.from("blog_generations").insert({
      topic_id: topic.id,
      status: "success",
      commit_sha: commit.sha,
      commit_url: commit.url,
      slug: article.slug,
      title: article.title,
    });

    return new Response(JSON.stringify({
      ok: true,
      slug: article.slug,
      title: article.title,
      url,
      commit: commit.url,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("generate-blog-post error:", msg);
    if (topicId) {
      await supabase.from("blog_topics").update({ status: "pending" }).eq("id", topicId);
      await supabase.from("blog_generations").insert({ topic_id: topicId, status: "failed", error_message: msg.slice(0, 2000) });
    }
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500,
    });
  }
});