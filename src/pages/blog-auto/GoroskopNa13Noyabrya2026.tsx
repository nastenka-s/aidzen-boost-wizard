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
        <title>Гороскоп на пятницу, 13 ноября: что ждёт каждый знак зодиака | НейроДзен</title>
        <meta name="description" content="Гороскоп на 13 ноября 2026 г.: символические рекомендации для всех знаков по рассчитанным положениям планет и аспектам дня." />
        <meta name="keywords" content="гороскоп на 13 ноября, гороскоп на пятницу, гороскоп для всех знаков зодиака" />
        <link rel="canonical" href="https://aidzen.ru/goroskop-na-13-noyabrya-2026" />

        <meta property="og:title" content="Гороскоп на пятницу, 13 ноября: что ждёт каждый знак зодиака" />
        <meta property="og:description" content="Гороскоп на 13 ноября 2026 г.: символические рекомендации для всех знаков по рассчитанным положениям планет и аспектам дня." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://aidzen.ru/goroskop-na-13-noyabrya-2026" />
        <meta property="og:image" content="https://rhksexmodcihbasgohvb.supabase.co/functions/v1/blog-cover-img?p=goroskop-na-13-noyabrya-2026.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Гороскоп на пятницу, 13 ноября: что ждёт каждый знак зодиака" />
        <meta name="twitter:description" content="Гороскоп на 13 ноября 2026 г.: символические рекомендации для всех знаков по рассчитанным положениям планет и аспектам дня." />

        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"Article","headline":"Гороскоп на пятницу, 13 ноября: что ждёт каждый знак зодиака","description":"Гороскоп на 13 ноября 2026 г.: символические рекомендации для всех знаков по рассчитанным положениям планет и аспектам дня.","image":"https://rhksexmodcihbasgohvb.supabase.co/functions/v1/blog-cover-img?p=goroskop-na-13-noyabrya-2026.png","author":{"@type":"Organization","name":"НейроДзен","url":"https://aidzen.ru"},"publisher":{"@type":"Organization","name":"НейроДзен","url":"https://aidzen.ru","logo":{"@type":"ImageObject","url":"https://aidzen.ru/favicon.svg"}},"datePublished":"2026-11-12T04:00:19.788Z","dateModified":"2026-11-12T04:00:19.788Z","mainEntityOfPage":{"@type":"WebPage","@id":"https://aidzen.ru/goroskop-na-13-noyabrya-2026"}}`}</script>
        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Это мой личный прогноз?","acceptedAnswer":{"@type":"Answer","text":"Нет. Люди одного знака живут в разных обстоятельствах. Личная карта учитывает дату, время и место рождения, а не только знак Солнца."}},{"@type":"Question","name":"Что делать, если совет мне не подходит?","acceptedAnswer":{"@type":"Answer","text":"Не подгоняйте жизнь под гороскоп. Возьмите только то, что помогает яснее увидеть вашу ситуацию, а остальное спокойно оставьте."}},{"@type":"Question","name":"Можно ли читать раздел партнёра?","acceptedAnswer":{"@type":"Answer","text":"Можно, но не стоит использовать его как объяснение чужих поступков. Прямой разговор даёт больше ясности, чем догадки по знаку."}},{"@type":"Question","name":"Стоит ли откладывать важное решение?","acceptedAnswer":{"@type":"Answer","text":"Решайте по готовности, условиям и реальным рискам. Общий прогноз не заменяет проверки документов, бюджета или профессиональной консультации."}}]}`}</script>
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
                <Badge variant="secondary">Гороскоп</Badge>
                <Badge variant="outline">7 минут чтения</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Гороскоп на пятницу, 13 ноября: что ждёт каждый знак зодиака
              </h1>
              <p className="text-muted-foreground text-lg">12 ноября 2026 г.</p>
            </div>

            <a href="https://chat.aidzen.ru/login" className="block mb-8">
              <img src="https://rhksexmodcihbasgohvb.supabase.co/functions/v1/blog-cover-img?p=goroskop-na-13-noyabrya-2026.png" alt="Гороскоп на пятницу, 13 ноября: что ждёт каждый знак зодиака" width="1536" height="1024" fetchPriority="high" className="w-full h-auto rounded-lg" />
            </a>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">Астрология и нумерология — символические традиции, а не научно подтверждённые прогнозы. Общий гороскоп не заменяет индивидуальную натальную карту.</p>

              <p className="mb-6 leading-relaxed">У обычного дня есть много небольших развилок: ответить сразу или уточнить, взяться за новое или закончить начатое. Посмотрим, какие темы выделяет небо завтра и как их можно применить без громких обещаний.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Главное в небе завтра</h2>

              <p className="mb-4 leading-relaxed">На 13 ноября 2026 г. Луна находится в знаке Козерог, Солнце — в знаке Скорпион.</p>

              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Луна — Сатурн: квадрат. В астрологической традиции это тема «напряжение и поиск решения».</li>
                <li>Луна — Нептун: квадрат. В астрологической традиции это тема «напряжение и поиск решения».</li>
                <li>Луна — Меркурий: секстиль. В астрологической традиции это тема «возможность сотрудничества».</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6">Овен</h2>

              <p className="mb-4 leading-relaxed">Надёжность не означает готовность постоянно брать на себя лишнее. Перед обещанием полезно уточнить объём задачи и поддержку, на которую вы можете рассчитывать.</p>

              <p className="mb-4 leading-relaxed">Понятные правила не мешают доверию. Можно отдельно обсудить, чем вы распоряжаетесь вместе и какие решения каждый принимает самостоятельно.</p>

              <p className="mb-4 leading-relaxed">Луна и Сатурн связывают темы «общественные обязанности» и «личные приоритеты». Не превращайте разницу приоритетов в повод для ссоры: сначала назовите, что важно каждой стороне.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Телец</h2>

              <p className="mb-4 leading-relaxed">Вы одинаково понимаете слово «поддержка»? В отношениях полезно обсуждать не только чувства, но и то, как помощь выглядит на практике.</p>

              <p className="mb-4 leading-relaxed">Большая идея полезнее, когда понятно, как её применить. Попробуйте сформулировать, что именно изменится в ваших действиях после нового знания.</p>

              <p className="mb-4 leading-relaxed">Луна и Нептун связывают темы «мировоззрение и обучение» и «отдых и уединение». Если желания спорят с обязанностями, уменьшите масштаб задачи, а не требуйте от себя невозможного.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Близнецы</h2>

              <p className="mb-4 leading-relaxed">Если дело связано с общими деньгами, лучше уточнить условия до начала. Кто оплачивает расходы, что считается помощью, а что предполагает возврат?</p>

              <p className="mb-4 leading-relaxed">Если задача требует слишком много переписки, попробуйте изменить сам процесс. Хорошо организованное дело не должно каждый раз держаться на вашем героизме.</p>

              <p className="mb-4 leading-relaxed">Луна и Меркурий связывают темы «совместные ресурсы» и «повседневные задачи». Посмотрите, какая поддержка уже доступна, прежде чем усложнять задачу.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Рак</h2>

              <p className="mb-4 leading-relaxed">Если хочется попробовать что-то новое, начните с посильной версии. Не нужно покупать всё оборудование, прежде чем понять, нравится ли вам занятие.</p>

              <p className="mb-4 leading-relaxed">Не проверяйте близость угадыванием мыслей. Если нужна определённая реакция, можно сказать об этом прямо и дать другому человеку возможность ответить.</p>

              <p className="mb-4 leading-relaxed">Луна и Сатурн связывают темы «партнёрство» и «общественные обязанности». Не превращайте разницу приоритетов в повод для ссоры: сначала назовите, что важно каждой стороне.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Лев</h2>

              <p className="mb-4 leading-relaxed">Плотное расписание красиво выглядит на бумаге. Оставьте между делами запас времени: обычная жизнь редко соблюдает план с точностью до минуты.</p>

              <p className="mb-4 leading-relaxed">Домашние договорённости часто держатся на привычке. Если одно дело постоянно оказывается на вас, его можно обсудить спокойно, не собирая список старых обид.</p>

              <p className="mb-4 leading-relaxed">Луна и Нептун связывают темы «повседневные задачи» и «мировоззрение и обучение». Если желания спорят с обязанностями, уменьшите масштаб задачи, а не требуйте от себя невозможного.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Дева</h2>

              <p className="mb-4 leading-relaxed">Если слова собеседника допускают несколько толкований, не выбирайте самое тревожное. Простой уточняющий вопрос полезнее разговора, который происходит только в вашей голове.</p>

              <p className="mb-4 leading-relaxed">Увлечение не обязано сразу приносить пользу или доход. Можно вернуться к нему просто потому, что вам нравится сам процесс.</p>

              <p className="mb-4 leading-relaxed">Луна и Меркурий связывают темы «творчество и удовольствие» и «общение и обучение». Посмотрите, какая поддержка уже доступна, прежде чем усложнять задачу.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Весы</h2>

              <p className="mb-4 leading-relaxed">Чтобы почувствовать себя дома удобнее, не обязательно затевать ремонт. Иногда достаточно освободить место для отдыха и договориться, когда вас не отвлекают.</p>

              <p className="mb-4 leading-relaxed">Перед покупкой полезно спросить себя: мне нужна сама вещь или ощущение, которое она обещает? Ответ поможет выбрать без самокритики и лишней спешки.</p>

              <p className="mb-4 leading-relaxed">Луна и Сатурн связывают темы «дом и близкие» и «партнёрство». Не превращайте разницу приоритетов в повод для ссоры: сначала назовите, что важно каждой стороне.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Скорпион</h2>

              <p className="mb-4 leading-relaxed">Не обязательно начинать новую жизнь. Иногда достаточно честно ответить, что вы делаете по собственному желанию, а что — чтобы никого не расстроить.</p>

              <p className="mb-4 leading-relaxed">Попробуйте убрать из разговора лишние объяснения. Назовите просьбу прямо — так другому человеку будет проще ответить, а вам не придётся расшифровывать намёки.</p>

              <p className="mb-4 leading-relaxed">Луна и Нептун связывают темы «общение и обучение» и «повседневные задачи». Если желания спорят с обязанностями, уменьшите масштаб задачи, а не требуйте от себя невозможного.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Стрелец</h2>

              <p className="mb-4 leading-relaxed">Загляните в свои расходы без привычного «ну зачем я опять». Что действительно делает жизнь удобнее, а что покупается просто по инерции?</p>

              <p className="mb-4 leading-relaxed">Если хочется тишины, не обязательно оправдывать её полезной задачей. Отдых без отчёта о продуктивности тоже имеет место в нормальном расписании.</p>

              <p className="mb-4 leading-relaxed">Луна и Меркурий связывают темы «собственные ресурсы» и «отдых и уединение». Посмотрите, какая поддержка уже доступна, прежде чем усложнять задачу.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Козерог</h2>

              <p className="mb-4 leading-relaxed">Можно поддерживать людей и при этом не соглашаться на каждый проект. Честный ответ лучше участия, которое вскоре начнёт раздражать.</p>

              <p className="mb-4 leading-relaxed">Прежде чем отвечать на очередное предложение, оставьте себе паузу. Вам действительно это интересно или неудобно отказаться?</p>

              <p className="mb-4 leading-relaxed">Луна и Сатурн связывают темы «личные приоритеты» и «дом и близкие». Не превращайте разницу приоритетов в повод для ссоры: сначала назовите, что важно каждой стороне.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Водолей</h2>

              <p className="mb-4 leading-relaxed">Попробуйте закончить небольшое дело без зрителей и лишних сообщений. Иногда внимание возвращается не после нового вдохновения, а когда становится меньше шума.</p>

              <p className="mb-4 leading-relaxed">Формулировка «хочу большего» легко вдохновляет и плохо помогает действовать. Назовите результат, который вы сможете заметить в своей работе.</p>

              <p className="mb-4 leading-relaxed">Луна и Нептун связывают темы «отдых и уединение» и «общение и обучение». Если желания спорят с обязанностями, уменьшите масштаб задачи, а не требуйте от себя невозможного.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Рыбы</h2>

              <p className="mb-4 leading-relaxed">Вернитесь к убеждению, которое давно не проверяли. На каких фактах оно держится, а что вы приняли на веру просто потому, что объяснение звучало красиво?</p>

              <p className="mb-4 leading-relaxed">Чужой энтузиазм не обязан становиться вашим обязательством. В общей идее сначала найдите свою роль, а уже потом соглашайтесь участвовать.</p>

              <p className="mb-4 leading-relaxed">Луна и Меркурий связывают темы «сообщества и общие планы» и «мировоззрение и обучение». Посмотрите, какая поддержка уже доступна, прежде чем усложнять задачу.</p>


              <h2 className="text-3xl font-bold mt-12 mb-6">Частые вопросы</h2>
              <Accordion type="single" collapsible className="mb-8">
                <AccordionItem value="q-0">
                  <AccordionTrigger className="text-left">Это мой личный прогноз?</AccordionTrigger>
                  <AccordionContent>Нет. Люди одного знака живут в разных обстоятельствах. Личная карта учитывает дату, время и место рождения, а не только знак Солнца.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="q-1">
                  <AccordionTrigger className="text-left">Что делать, если совет мне не подходит?</AccordionTrigger>
                  <AccordionContent>Не подгоняйте жизнь под гороскоп. Возьмите только то, что помогает яснее увидеть вашу ситуацию, а остальное спокойно оставьте.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="q-2">
                  <AccordionTrigger className="text-left">Можно ли читать раздел партнёра?</AccordionTrigger>
                  <AccordionContent>Можно, но не стоит использовать его как объяснение чужих поступков. Прямой разговор даёт больше ясности, чем догадки по знаку.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="q-3">
                  <AccordionTrigger className="text-left">Стоит ли откладывать важное решение?</AccordionTrigger>
                  <AccordionContent>Решайте по готовности, условиям и реальным рискам. Общий прогноз не заменяет проверки документов, бюджета или профессиональной консультации.</AccordionContent>
                </AccordionItem>
              </Accordion>

              <h2 className="text-3xl font-bold mt-12 mb-6">Заключение</h2>
              <p className="mb-6 leading-relaxed">Выберите из своего раздела мысль, которая действительно относится к вашей жизни. Общий гороскоп не знает ваших обстоятельств — личный прогноз по положениям планет в натальной карте помогает посмотреть на них подробнее, но решения остаются за вами. <a href="https://aidzen.ru" className="text-primary underline">Рассчитать личный прогноз: aidzen.ru</a></p>

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
                <Link to="/uchebnik-dom-8" className="block p-4 rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-colors">
                  <p className="font-medium text-foreground">8 дом в астрологии: значение, правила чтения и анализ</p>
                </Link>
                <Link to="/goroskop-na-2026-11-12" className="block p-4 rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-colors">
                  <p className="font-medium text-foreground">Гороскоп на 12 ноября 2026 г. для всех знаков зодиака</p>
                </Link>
                <Link to="/uchebnik-arkan-18" className="block p-4 rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-colors">
                  <p className="font-medium text-foreground">18 аркан в Матрице судьбы: символика и границы трактовки</p>
                </Link>
              </div>
            </div>
          </article>
        </main>
      </div>
    </>
  );
};

export default Page;
