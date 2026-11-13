import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useLiveArticles } from '@/hooks/useLiveArticles';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import NotFound from './NotFound';

export default function LiveArticle() {
  const { slug } = useParams();
  const { data, isPending, isError, refetch } = useLiveArticles(slug);
  if (isPending || isError) return <div className="min-h-screen bg-background"><Header /><main className="container mx-auto px-4 py-16" aria-live="polite">
    {isPending ? <p>Загружаем статью…</p> : <><p className="mb-4">Не удалось загрузить статью. Попробуйте ещё раз.</p><Button onClick={() => refetch()}>Повторить</Button></>}
  </main><Footer /></div>;
  const article = data?.article;
  if (!article) return <NotFound />;
  const url = `https://aidzen.ru/${article.slug}`;
  // Preserve stored prose; remove only the separately rendered cover and legacy service footer.
  const document = new DOMParser().parseFromString(DOMPurify.sanitize(article.html ?? '', {
    ALLOWED_TAGS: ['p', 'h2', 'h3', 'h4', 'a', 'b', 'strong', 'i', 'em', 'ul', 'ol', 'li', 'blockquote', 'img', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'br'],
    ALLOWED_ATTR: ['href', 'src', 'alt'],
  }), 'text/html');
  const first = document.body.firstElementChild;
  if (first?.tagName === 'IMG' && first.getAttribute('src') === article.cover) first.remove();
  const last = document.body.lastElementChild;
  if (last?.tagName === 'P' && last.textContent?.startsWith('Бесплатный расчёт натальной карты и матрицы судьбы:')) last.remove();
  // Make plain-text URLs (e.g. the conclusion CTA) clickable.
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const texts: Text[] = [];
  while (walker.nextNode()) { const n = walker.currentNode as Text; if (!n.parentElement?.closest('a') && /https?:\/\//.test(n.data)) texts.push(n); }
  for (const n of texts) {
    const frag = document.createDocumentFragment();
    n.data.split(/(https?:\/\/[^\s<]+[^\s<.,;:!?)])/).forEach((part, i) => {
      if (i % 2) { const a = document.createElement('a'); a.href = part; a.textContent = part; a.className = 'underline'; frag.append(a); }
      else if (part) frag.append(part);
    });
    n.replaceWith(frag);
  }
  const date = new Date(article.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Moscow' });
  return <div className="min-h-screen bg-background">
    <Helmet>
      <title>{article.title} | НейроДзен</title>
      <meta name="description" content={article.description} />
      <meta name="keywords" content={`${article.category}, ${article.title}`} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={article.title} /><meta property="og:description" content={article.description} />
      <meta property="og:type" content="article" /><meta property="og:url" content={url} /><meta property="og:image" content={article.cover} />
      <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={article.title} /><meta name="twitter:description" content={article.description} />
      <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.description, image: article.cover, datePublished: article.publishedAt, mainEntityOfPage: url, author: { '@type': 'Organization', name: 'НейроДзен', url: 'https://aidzen.ru' } })}</script>
    </Helmet>
    <Header />
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <article>
        <Link to="/blog" className="text-primary">Блог</Link>
        <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-4 break-words">{article.title}</h1>
        <p className="text-muted-foreground mb-8">{date}</p>
        <a href="https://chat.aidzen.ru/login" className="block mb-8"><img src={article.cover} alt={article.title} width="1024" height="1024" fetchPriority="high" className="w-full h-auto rounded-lg" /></a>
        <div className="prose prose-lg max-w-none break-words [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-6 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_a]:text-primary" dangerouslySetInnerHTML={{ __html: document.body.innerHTML }} />
        <Card className="p-6 my-8 bg-primary/5 border-primary/20">
          <p className="font-semibold mb-3">Нейродзен: три бесплатных расчёта</p>
          <p className="mb-4">Нейродзен — ИИ-астролог и нумеролог, который строит натальную карту, Матрицу судьбы и личные прогнозы по вашей дате, времени и месту рождения. Первые три расчёта бесплатны.</p>
          <p className="font-medium mb-3">Запустите три бесплатных анализа</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild><a href="https://t.me/matricasudbyaibot" target="_blank" rel="noopener noreferrer">В Telegram боте</a></Button>
            <Button asChild variant="outline"><a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">На сайте</a></Button>
          </div>
        </Card>
      </article>
    </main><Footer />
  </div>;
}