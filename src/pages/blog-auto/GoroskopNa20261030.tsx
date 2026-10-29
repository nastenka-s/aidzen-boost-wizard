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
        <title>Гороскоп на 30 октября 2026 г. для всех знаков зодиака | НейроДзен</title>
        <meta name="description" content="Гороскоп на 30 октября 2026 г.: символические рекомендации для всех знаков по рассчитанным положениям планет и аспектам дня." />
        <meta name="keywords" content="гороскоп на завтра, гороскоп для всех знаков зодиака" />
        <link rel="canonical" href="https://aidzen.ru/goroskop-na-2026-10-30" />

        <meta property="og:title" content="Гороскоп на 30 октября 2026 г. для всех знаков зодиака" />
        <meta property="og:description" content="Гороскоп на 30 октября 2026 г.: символические рекомендации для всех знаков по рассчитанным положениям планет и аспектам дня." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://aidzen.ru/goroskop-na-2026-10-30" />
        <meta property="og:image" content="https://rhksexmodcihbasgohvb.supabase.co/functions/v1/blog-cover-img?p=goroskop-na-2026-10-30.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Гороскоп на 30 октября 2026 г. для всех знаков зодиака" />
        <meta name="twitter:description" content="Гороскоп на 30 октября 2026 г.: символические рекомендации для всех знаков по рассчитанным положениям планет и аспектам дня." />

        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"Article","headline":"Гороскоп на 30 октября 2026 г. для всех знаков зодиака","description":"Гороскоп на 30 октября 2026 г.: символические рекомендации для всех знаков по рассчитанным положениям планет и аспектам дня.","image":"https://rhksexmodcihbasgohvb.supabase.co/functions/v1/blog-cover-img?p=goroskop-na-2026-10-30.png","author":{"@type":"Organization","name":"НейроДзен","url":"https://aidzen.ru"},"publisher":{"@type":"Organization","name":"НейроДзен","url":"https://aidzen.ru","logo":{"@type":"ImageObject","url":"https://aidzen.ru/favicon.svg"}},"datePublished":"2026-10-29T06:00:20.371Z","dateModified":"2026-10-29T06:00:20.371Z","mainEntityOfPage":{"@type":"WebPage","@id":"https://aidzen.ru/goroskop-na-2026-10-30"}}`}</script>
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
                Гороскоп на 30 октября 2026 г. для всех знаков зодиака
              </h1>
              <p className="text-muted-foreground text-lg">29 октября 2026 г.</p>
            </div>

            <a href="https://chat.aidzen.ru/login" className="block mb-8">
              <img src="https://rhksexmodcihbasgohvb.supabase.co/functions/v1/blog-cover-img?p=goroskop-na-2026-10-30.png" alt="Гороскоп на 30 октября 2026 г. для всех знаков зодиака" width="1536" height="1024" fetchPriority="high" className="w-full h-auto rounded-lg" />
            </a>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">Астрология и нумерология — символические традиции, а не научно подтверждённые прогнозы. Общий гороскоп не заменяет индивидуальную натальную карту.</p>

              <p className="mb-6 leading-relaxed">Хороший план не обязан быть грандиозным. Иногда он начинается с ясной просьбы, свободного вечера или отказа от лишней задачи. Ниже — ориентиры для каждого знака, которые стоит примерить к своей жизни.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Главное в небе завтра</h2>

              <p className="mb-4 leading-relaxed">На 30 октября 2026 г. Луна находится в знаке Рак, Солнце — в знаке Скорпион.</p>

              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Меркурий — Марс: квадрат. В астрологической традиции это тема «напряжение и поиск решения».</li>
                <li>Солнце — Луна: трин. В астрологической традиции это тема «согласованность».</li>
                <li>Луна — Венера: трин. В астрологической традиции это тема «согласованность».</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6">Овен</h2>

              <p className="mb-4 leading-relaxed">С близкими полезно говорить о конкретном: какой помощи вы хотите и что готовы сделать сами. Фраза «ты же понимаешь» редко заменяет ясную просьбу.</p>

              <p className="mb-4 leading-relaxed">Если дело связано с общими деньгами, лучше уточнить условия до начала. Кто оплачивает расходы, что считается помощью, а что предполагает возврат?</p>

              <p className="mb-4 leading-relaxed">Солнце и Луна связывают темы «совместные ресурсы» и «дом и близкие». Не усложняйте работающий план только ради более эффектного результата.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Телец</h2>

              <p className="mb-4 leading-relaxed">Не проверяйте близость угадыванием мыслей. Если нужна определённая реакция, можно сказать об этом прямо и дать другому человеку возможность ответить.</p>

              <p className="mb-4 leading-relaxed">Длинная переписка не всегда означает, что вы договорились. Можно коротко уточнить главное: что делаем, кто отвечает и какой результат нужен.</p>

              <p className="mb-4 leading-relaxed">Луна и Венера связывают темы «общение и обучение» и «повседневные задачи». Попробуйте перенести знакомый удачный подход в другую задачу без ожидания автоматического успеха.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Близнецы</h2>

              <p className="mb-4 leading-relaxed">Цена вашего времени — не только сумма в договоре. Если просьба съедает весь вечер, стоит заранее решить, сколько сил вы готовы на неё потратить.</p>

              <p className="mb-4 leading-relaxed">Плотное расписание красиво выглядит на бумаге. Оставьте между делами запас времени: обычная жизнь редко соблюдает план с точностью до минуты.</p>

              <p className="mb-4 leading-relaxed">Луна и Нептун связывают темы «собственные ресурсы» и «сообщества и общие планы». Если желания спорят с обязанностями, уменьшите масштаб задачи, а не требуйте от себя невозможного.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Рак</h2>

              <p className="mb-4 leading-relaxed">Увлечение не обязано сразу приносить пользу или доход. Можно вернуться к нему просто потому, что вам нравится сам процесс.</p>

              <p className="mb-4 leading-relaxed">Попробуйте выбрать дело, за которое хочется взяться без зрителей и похвалы. Такой интерес — более надёжная опора, чем желание всех впечатлить.</p>

              <p className="mb-4 leading-relaxed">Луна и Сатурн связывают темы «личные приоритеты» и «общественные обязанности». Полезно заметить, где вы обещаете больше, чем можете выполнить, и пересмотреть условия.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Лев</h2>

              <p className="mb-4 leading-relaxed">Не каждой мысли нужно сразу становиться публичным планом. Дайте себе возможность спокойно разобраться, прежде чем обсуждать идею со всеми.</p>

              <p className="mb-4 leading-relaxed">Чтобы почувствовать себя дома удобнее, не обязательно затевать ремонт. Иногда достаточно освободить место для отдыха и договориться, когда вас не отвлекают.</p>

              <p className="mb-4 leading-relaxed">Луна и Юпитер связывают темы «отдых и уединение» и «личные приоритеты». Обсудите вариант сотрудничества, в котором понятен вклад каждого.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Дева</h2>

              <p className="mb-4 leading-relaxed">Попробуйте убрать из разговора лишние объяснения. Назовите просьбу прямо — так другому человеку будет проще ответить, а вам не придётся расшифровывать намёки.</p>

              <p className="mb-4 leading-relaxed">Вернуться к старому коллективному плану стоит не только из ностальгии. Вам всё ещё интересно, понятно ли распределение дел, есть ли время на участие?</p>

              <p className="mb-4 leading-relaxed">Солнце и Луна связывают темы «общение и обучение» и «сообщества и общие планы». Опирайтесь на то, что уже получается, но всё равно проверяйте реальные условия.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Весы</h2>

              <p className="mb-4 leading-relaxed">Если хочется показать свою работу, выберите то, что уже можно объяснить ясно. Громкое обещание не заменяет понятного результата.</p>

              <p className="mb-4 leading-relaxed">Загляните в свои расходы без привычного «ну зачем я опять». Что действительно делает жизнь удобнее, а что покупается просто по инерции?</p>

              <p className="mb-4 leading-relaxed">Луна и Венера связывают темы «общественные обязанности» и «личные приоритеты». Не усложняйте работающий план только ради более эффектного результата.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Скорпион</h2>

              <p className="mb-4 leading-relaxed">Прежде чем отвечать на очередное предложение, оставьте себе паузу. Вам действительно это интересно или неудобно отказаться?</p>

              <p className="mb-4 leading-relaxed">Среди интересных тем выберите ту, которую хочется понять глубже. Записаться сразу на всё проще, чем найти время на настоящую учёбу.</p>

              <p className="mb-4 leading-relaxed">Луна и Нептун связывают темы «мировоззрение и обучение» и «повседневные задачи». Не превращайте разницу приоритетов в повод для ссоры: сначала назовите, что важно каждой стороне.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Стрелец</h2>

              <p className="mb-4 leading-relaxed">Согласие на совместный проект не означает согласие на любые дополнительные обязанности. Назовите границы участия, пока обсуждение ещё остаётся спокойным.</p>

              <p className="mb-4 leading-relaxed">Попробуйте закончить небольшое дело без зрителей и лишних сообщений. Иногда внимание возвращается не после нового вдохновения, а когда становится меньше шума.</p>

              <p className="mb-4 leading-relaxed">Луна и Сатурн связывают темы «совместные ресурсы» и «творчество и удовольствие». Если желания спорят с обязанностями, уменьшите масштаб задачи, а не требуйте от себя невозможного.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Козерог</h2>

              <p className="mb-4 leading-relaxed">Чужой энтузиазм не обязан становиться вашим обязательством. В общей идее сначала найдите свою роль, а уже потом соглашайтесь участвовать.</p>

              <p className="mb-4 leading-relaxed">Совместный план становится проще, когда у обоих есть право предложить свой вариант. Договорённость — не соревнование за последнее слово.</p>

              <p className="mb-4 leading-relaxed">Луна и Юпитер связывают темы «партнёрство» и «совместные ресурсы». Посмотрите, какая поддержка уже доступна, прежде чем усложнять задачу.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Водолей</h2>

              <p className="mb-4 leading-relaxed">Посмотрите на список дел как на реальную нагрузку, а не экзамен на собранность. Что можно упростить, перенести или вовсе не делать?</p>

              <p className="mb-4 leading-relaxed">Надёжность не означает готовность постоянно брать на себя лишнее. Перед обещанием полезно уточнить объём задачи и поддержку, на которую вы можете рассчитывать.</p>

              <p className="mb-4 leading-relaxed">Солнце и Луна связывают темы «общественные обязанности» и «повседневные задачи». Попробуйте перенести знакомый удачный подход в другую задачу без ожидания автоматического успеха.</p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Рыбы</h2>

              <p className="mb-4 leading-relaxed">Большая идея полезнее, когда понятно, как её применить. Попробуйте сформулировать, что именно изменится в ваших действиях после нового знания.</p>

              <p className="mb-4 leading-relaxed">В расписании легко находится место для необходимого, а интересное остаётся на потом. Попробуйте выделить ему небольшой отрезок времени, не дожидаясь идеального вечера.</p>

              <p className="mb-4 leading-relaxed">Луна и Венера связывают темы «творчество и удовольствие» и «совместные ресурсы». Опирайтесь на то, что уже получается, но всё равно проверяйте реальные условия.</p>


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
              <p className="mb-6 leading-relaxed">Выберите из своего раздела мысль, которая действительно относится к вашей жизни. Общий гороскоп не знает ваших обстоятельств — личный прогноз по положениям планет в натальной карте помогает посмотреть на них подробнее, но решения остаются за вами.</p>

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
              <div className="grid gap-3 mb-8">
                <Link to="/uchebnik-matrica-metody" className="block p-4 rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-colors">
                  <p className="font-medium text-foreground">Матрица судьбы по дате рождения: методы и ограничения</p>
                </Link>
                <Link to="/uchebnik-znaki" className="block p-4 rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-colors">
                  <p className="font-medium text-foreground">Знаки в астрологии: тропический зодиак и символы</p>
                </Link>
                <Link to="/goroskop-na-2026-10-29" className="block p-4 rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-colors">
                  <p className="font-medium text-foreground">Гороскоп на 29 октября 2026 г. для всех знаков зодиака</p>
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
