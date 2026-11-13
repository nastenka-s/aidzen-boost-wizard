import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const Page = () => {
  return (
    <>
      <Helmet>
        <title>Натальная карта бесплатно: онлайн-расчёт и расшифровка | НейроДзен</title>
        <meta name="description" content="Узнайте, как составить натальную карту бесплатно. Разбираем, какие данные нужны для расчёта онлайн и что показывает точная персональная расшифровка." />
        <meta name="keywords" content="натальная карта бесплатно, рассчитать натальную карту онлайн, расшифровка натальной карты" />
        <link rel="canonical" href="https://aidzen.ru/natalnaya-karta-besplatno-kak-rasschitat" />

        <meta property="og:title" content="Натальная карта бесплатно: как рассчитать и получить персональную расшифровку онлайн" />
        <meta property="og:description" content="Узнайте, как составить натальную карту бесплатно. Разбираем, какие данные нужны для расчёта онлайн и что показывает точная персональная расшифровка." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://aidzen.ru/natalnaya-karta-besplatno-kak-rasschitat" />
        <meta property="og:image" content="https://rhksexmodcihbasgohvb.supabase.co/functions/v1/blog-cover-img?p=natalnaya-karta-besplatno-kak-rasschitat.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Натальная карта бесплатно: как рассчитать и получить персональную расшифровку онлайн" />
        <meta name="twitter:description" content="Узнайте, как составить натальную карту бесплатно. Разбираем, какие данные нужны для расчёта онлайн и что показывает точная персональная расшифровка." />

        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"Article","headline":"Натальная карта бесплатно: как рассчитать и получить персональную расшифровку онлайн","description":"Узнайте, как составить натальную карту бесплатно. Разбираем, какие данные нужны для расчёта онлайн и что показывает точная персональная расшифровка.","image":"https://rhksexmodcihbasgohvb.supabase.co/functions/v1/blog-cover-img?p=natalnaya-karta-besplatno-kak-rasschitat.png","author":{"@type":"Organization","name":"НейроДзен","url":"https://aidzen.ru"},"publisher":{"@type":"Organization","name":"НейроДзен","url":"https://aidzen.ru","logo":{"@type":"ImageObject","url":"https://aidzen.ru/favicon.svg"}},"datePublished":"2026-11-12T17:00:36.166Z","dateModified":"2026-11-12T17:00:36.166Z","mainEntityOfPage":{"@type":"WebPage","@id":"https://aidzen.ru/natalnaya-karta-besplatno-kak-rasschitat"}}`}</script>
        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[]}`}</script>
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
                <Badge variant="secondary">Расчёт</Badge>
                <Badge variant="outline">10 минут чтения</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Натальная карта бесплатно: как рассчитать и получить персональную расшифровку онлайн
              </h1>
              <p className="text-muted-foreground text-lg">12 ноября 2026 г.</p>
            </div>

            <a href="https://chat.aidzen.ru/login" className="block mb-8">
              <img src="https://rhksexmodcihbasgohvb.supabase.co/functions/v1/blog-cover-img?p=natalnaya-karta-besplatno-kak-rasschitat.png" alt="Натальная карта бесплатно: как рассчитать и получить персональную расшифровку онлайн" width="1536" height="1024" fetchPriority="high" className="w-full h-auto rounded-lg" />
            </a>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">Натальная карта бесплатно доступна каждому, кто хочет глубже изучить свой потенциал и особенности характера без шаблонных гороскопов. Это индивидуальная астрологическая схема, отражающая точное состояние звёздного неба в момент вашего появления на свет.</p>

              <p className="mb-6 leading-relaxed">Чтобы рассчитать натальную карту онлайн и получить полезную информацию, важно заранее подготовить исходные данные и понимать, из каких базовых элементов складывается картина.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Какие данные нужны для точного расчёта</h2>

              <p className="mb-4 leading-relaxed">Для натальной карты нужны дата, точное время и место рождения. В астрологической традиции географическая точка и минуты имеют ключевое значение, так как задают индивидуальную сетку координат.</p>

              <p className="mb-4 leading-relaxed">Без времени рождения нельзя достоверно определить асцендент и дома; знак Луны может быть неточным, если Луна меняла знак в этот день. В таком случае картина остаётся обобщённой, а глубинные слои анализа оказываются недоступными.</p>

              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Дата рождения фиксирует базовые координаты планет</li>
                <li>Место рождения привязывает расчёт к географической широте и долготе</li>
                <li>Точное время рождения позволяет определить асцендент и дома</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6">Что показывает персональный разбор</h2>

              <p className="mb-4 leading-relaxed">Карта показывает положения Солнца, Луны и планет по знакам и домам и аспекты между ними. Каждое небесное тело отвечает за определённую сферу восприятия и действия, а дома отражают конкретные области жизненного опыта.</p>

              <p className="mb-4 leading-relaxed">Грамотная расшифровка натальной карты связывает эти показатели воедино. В астрологической традиции положение планет трактуется как врождённые склонности, которые могут указывать на особенности темперамента, способы взаимодействия с миром и возможные точки роста.</p>


              <h2 className="text-3xl font-bold mt-12 mb-6">Частые вопросы</h2>
              <Accordion type="single" collapsible className="mb-8">
              </Accordion>

              <h2 className="text-3xl font-bold mt-12 mb-6">Заключение</h2>
              <p className="mb-6 leading-relaxed">Подходите к разбору осознанно: любые показатели карты стоит воспринимать как подсказки для самопознания, а не жесткие ограничения. Обязательно проверьте точность времени рождения по документам или бирке, чтобы трактовка домов была достоверной. Персональный расчёт можно сделать в Нейродзене — первые 3 расчёта бесплатно. <a href="https://aidzen.ru" className="text-primary underline">Рассчитать личный прогноз: aidzen.ru</a></p>

              <Card className="p-6 my-8 bg-primary/5 border-primary/20">
                <p className="font-semibold mb-3">Нейродзен: три бесплатных расчёта</p>
                <p className="mb-4">Нейродзен — ИИ-астролог и нумеролог, который строит натальную карту, Матрицу судьбы и личные прогнозы по вашей дате, времени и месту рождения. Первые три расчёта бесплатны.</p>
                <p className="font-medium mb-3">Запустите три бесплатных анализа</p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://t.me/matricasudbyaibot" target="_blank" rel="noopener noreferrer">
                    <Button>В Telegram боте</Button>
                  </a>
                  <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">На сайте</Button>
                  </a>
                </div>
              </Card>

              <h2 className="text-3xl font-bold mt-12 mb-6">Читайте также</h2>
              <div className="grid gap-3 mb-8">
              </div>
            </div>
          </article>
        </main>
      </div>
    </>
  );
};

export default Page;
