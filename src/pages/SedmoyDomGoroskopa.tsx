import { Helmet } from 'react-helmet';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SedmoyDomGoroskopa = () => {
  return (
    <>
      <Helmet>
        <title>7 дом гороскопа: брак, партнёрства и ваши «зеркала» | Нейродзен</title>
        <meta name="description" content="Что значит 7 дом в натальной карте: брак, партнёрство, клиенты. Как найти свой 7 дом по шагам, разобрать сигналы и обойти риски в отношениях." />
        <meta name="keywords" content="7 дом гороскопа, 7 дом в натале, 7 дом что значит, 7 дом брака, 7 дом партнерства, 7 дом без планет, планеты в 7 доме, 7 дом отношения" />
        <link rel="canonical" href="https://aidzen.ru/7-dom-goroskopa" />
        <meta property="og:title" content="7 дом гороскопа: брак, партнёрства и ваши «зеркала»" />
        <meta property="og:description" content="Что значит 7 дом в натальной карте: брак, партнёрство, клиенты. Как найти свой 7 дом по шагам, разобрать сигналы и обойти риски в отношениях." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://aidzen.ru/7-dom-goroskopa" />
        <meta property="og:image" content="https://aidzen.ru/logo.png" />
        <meta property="article:published_time" content="2025-11-29" />
        <meta property="article:section" content="Астрология" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="7 дом гороскопа: брак, партнёрства и ваши «зеркала»" />
        <meta name="twitter:description" content="Что значит 7 дом в натальной карте: брак, партнёрство, клиенты. Как найти свой 7 дом по шагам, разобрать сигналы и обойти риски в отношениях." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "7 дом гороскопа: брак, партнёрства и ваши «зеркала»",
            "description": "Что значит 7 дом в натальной карте: брак, партнёрство, клиенты. Как найти свой 7 дом по шагам, разобрать сигналы и обойти риски в отношениях.",
            "author": { "@type": "Organization", "name": "Нейродзен" },
            "publisher": { "@type": "Organization", "name": "Нейродзен", "logo": { "@type": "ImageObject", "url": "https://aidzen.ru/logo.png" } },
            "datePublished": "2025-11-29",
            "mainEntityOfPage": { "@type": "WebPage", "@id": "https://aidzen.ru/7-dom-goroskopa" }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://aidzen.ru" },
              { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://aidzen.ru/blog" },
              { "@type": "ListItem", "position": 3, "name": "7 дом гороскопа", "item": "https://aidzen.ru/7-dom-goroskopa" }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-12 mt-20">
          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                7 дом гороскопа: как ваш гороскоп показывает брак и партнёрства
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <time dateTime="2025-11-29">29 ноября, 2025</time>
                <span>•</span>
                <span>9 минут чтения</span>
              </div>
            </header>

            <div className="prose prose-lg max-w-none space-y-8">
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
                <p className="text-lg leading-relaxed text-foreground">
                  В 7 доме гороскопа зашиты ваши сценарии брака и серьёзных союзов. По нему видно, каких партнёров вы притягиваете, что вас разрушает в отношениях и где ваши сильные стороны в паре. В этой статье разберём, как найти свой 7 дом по шагам, что значит знак и планеты в нём, и какие ошибки в личной жизни и деловых партнёрствах можно заранее обойти.
                </p>
              </Card>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Что такое 7 дом и за что он отвечает</h2>
                <p className="text-foreground/90 mb-4">
                  В классической астрологии 7 дом называют домом брака и открытых партнёров. Это точка напротив 1 дома. 1 дом — вы и ваше «я». 7 дом — другой человек напротив вас.
                </p>
                <p className="text-foreground/90 mb-4">Через 7 дом мы смотрим:</p>
                <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
                  <li>официальный брак и серьёзные союзы</li>
                  <li>долговременные отношения, даже если без штампа</li>
                  <li>деловые партнёрства и совместный бизнес</li>
                  <li>клиентов и людей, с которыми вы работаете один на один</li>
                  <li>открытых противников — тех, с кем конфликт виден явно</li>
                </ul>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="text-foreground/90">
                    <strong>Важно:</strong> 7 дом не показывает «люблю или не люблю». Он показывает форму союза, сценарий, ожидания и тип партнёра. Чувства больше по 5 дому и Венере, а вот кто в итоге становится вашим постоянным человеком — это как раз 7 дом.
                  </p>
                </Card>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Как найти свой 7 дом по шагам</h2>
                <p className="text-foreground/90 mb-4">
                  Чтобы работать с 7 домом, нужен гороскоп, построенный на точное время рождения. Без этого домовая сетка будет смещена.
                </p>

                <div className="space-y-6">
                  <Card className="p-6 border-l-4 border-primary">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Шаг 1. Постройте натальную карту</h3>
                    <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                      <li>Возьмите дату, место и точное время рождения. Желательно с бирки или из записей родителей.</li>
                      <li>Зайдите в любой онлайн-сервис расчёта натальной карты.</li>
                      <li>Выберите систему домов Плацидус или Кох. Для бытового разбора подойдут обе. Главное — дальше использовать одну и ту же.</li>
                      <li>На круге вы увидите 12 секторов. Это дома. Каждый дом начинается с куспида — границы дома.</li>
                    </ul>
                  </Card>

                  <Card className="p-6 border-l-4 border-primary">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Шаг 2. Найдите Асцендент и точку напротив</h3>
                    <p className="text-foreground/90 mb-3">
                      Асцендент — это куспид 1 дома, обычно подписан как ASC. 7 дом — ровно напротив него.
                    </p>
                    <Card className="p-4 bg-secondary/20">
                      <p className="text-foreground font-medium mb-2">Формула простая:</p>
                      <p className="text-foreground/90">знак 7 дома = знак, противоположный вашему Асценденту.</p>
                    </Card>
                    <div className="mt-4 p-4 bg-accent/10 rounded-lg">
                      <p className="text-sm font-medium text-foreground mb-2">Пример:</p>
                      <ul className="text-sm text-foreground/90 space-y-1">
                        <li>Если у вас Асцендент в Овне — 7 дом будет в Весах.</li>
                        <li>Асцендент в Раке — 7 дом в Козероге.</li>
                        <li>Асцендент в Деве — 7 дом в Рыбах.</li>
                      </ul>
                    </div>
                  </Card>

                  <Card className="p-6 border-l-4 border-primary">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Шаг 3. Посмотрите, есть ли в 7 доме планеты</h3>
                    <p className="text-foreground/90 mb-3">Внимательно посмотрите сектор 7 дома.</p>
                    <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                      <li>Есть ли в нём планеты</li>
                      <li>Какие именно — личные (Солнце, Луна, Меркурий, Венера, Марс) или тяжёлые (Сатурн, Уран, Нептун, Плутон)</li>
                      <li>Стоят ли они прямо на куспиде 7 дома или глубже в доме</li>
                    </ul>
                    <p className="text-foreground/90 mt-3">
                      Если в 7 доме нет планет — это тоже сигнал, не «пустота». Тогда сильнее играет знак 7 дома и управитель этого знака.
                    </p>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Основные сигналы 7 дома: что он говорит об отношениях</h2>
                <p className="text-foreground/90 mb-6">
                  Давайте переведём абстрактную астрологию в понятный язык — «сигнал → смысл → действие».
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-foreground">Стихия знака 7 дома</h3>
                
                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="fire" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline">
                      Огненные знаки (Овен, Лев, Стрелец)
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/90 space-y-3 pt-2">
                      <p><strong>Сигнал:</strong> 7 дом в огненных знаках.</p>
                      <p><strong>Смысл:</strong> отношения строятся через яркость, страсть и вовлечённость. Часто важно ощущение «искра есть». Много импульсивности, быстрые начинания и быстрые решения.</p>
                      <p><strong>Действие:</strong> не торопитесь в серьёзные обязательства после первых сильных эмоций. Дайте себе время увидеть партнёра в быту и в конфликте.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="earth" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline">
                      Земные знаки (Телец, Дева, Козерог)
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/90 space-y-3 pt-2">
                      <p><strong>Сигнал:</strong> 7 дом в земных знаках.</p>
                      <p><strong>Смысл:</strong> партнёрство часто связывается с бытом, стабильностью, деньгами, долгом. Важны надёжность и действие, а не слова.</p>
                      <p><strong>Действие:</strong> следите, чтобы отношения не превращались только в проект «общий бюджет и ипотека». Добавляйте осознанно романтику и личные желания.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="air" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline">
                      Воздушные знаки (Близнецы, Весы, Водолей)
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/90 space-y-3 pt-2">
                      <p><strong>Сигнал:</strong> 7 дом в воздушных знаках.</p>
                      <p><strong>Смысл:</strong> важен диалог, интерес, общие идеи. Союзы часто строятся через общение, переписки, совместные проекты.</p>
                      <p><strong>Действие:</strong> учитесь идти в глубину и проговаривать чувства, а не только мыслить и обсуждать. Иначе будет ощущение «мы как друзья».</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="water" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline">
                      Водные знаки (Рак, Скорпион, Рыбы)
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/90 space-y-3 pt-2">
                      <p><strong>Сигнал:</strong> 7 дом в водных знаках.</p>
                      <p><strong>Смысл:</strong> сильная эмоциональная вовлечённость, слияние, иногда драматичность. Партнёр может становиться «всей жизнью».</p>
                      <p><strong>Действие:</strong> держите опору на себя. Отслеживайте, когда жертвуете собой и интересами ради сохранения связи.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Планеты в 7 доме: где тонко и где опора</h2>
                <p className="text-foreground/90 mb-6">
                  Посмотрим несколько частых вариантов. Именно здесь сильнее проявляется логика «сигнал → смысл → действие».
                </p>

                <div className="space-y-4">
                  <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Венера в 7 доме</h3>
                    <div className="space-y-2 text-foreground/90">
                      <p><strong className="text-primary">Сигнал:</strong> Венера стоит в 7 доме.</p>
                      <p><strong className="text-primary">Смысл:</strong> тема отношений для вас естественная. Умение договариваться, стремление к гармонии. Партнёры часто симпатичные, приятные, с чувством вкуса. Для многих с такой Венерой отношения становятся важнейшей жизненной темой.</p>
                      <p><strong className="text-primary">Действие:</strong> учитесь говорить «нет» и не соглашаться на всё ради мира. Ловите моменты, когда вы сглаживаете острые углы ценой себя.</p>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-secondary/5 to-accent/5">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Сатурн в 7 доме</h3>
                    <div className="space-y-2 text-foreground/90">
                      <p><strong className="text-primary">Сигнал:</strong> Сатурн в 7 доме или на куспиде.</p>
                      <p><strong className="text-primary">Смысл:</strong> серьёзный подход к отношениям. Либо ранняя ответственность и тяжёлые союзы, либо поздний, но очень устойчивый брак. Часто отношения ощущаются как «работа» или «обязанность».</p>
                      <p><strong className="text-primary">Действие:</strong> не задерживайтесь в откровенно тяжёлом союзе «из долга». Признавайте свои границы. Учитесь строить отношения не только на обязанности, но и на взаимном удовольствии.</p>
                    </div>
                    <Card className="mt-4 p-4 bg-accent/20 border-accent/30">
                      <p className="text-sm font-medium text-foreground mb-2">Миникейс:</p>
                      <p className="text-sm text-foreground/90">
                        Марина, 38 лет. Сатурн в 7 доме в Козероге. Первый гражданский брак с 20 до 30 лет — много быта, общий бизнес, но чувства давно остыли, расстаться было «некогда». В 34 она решилась на развод, спустя пару лет вышла замуж снова. Второй союз менее «идеальный на бумаге», но более живой. Сатурн здесь про урок — выстраивать партнёрство не как каторгу, а как союз взрослых людей.
                      </p>
                    </Card>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Уран в 7 доме</h3>
                    <div className="space-y-2 text-foreground/90">
                      <p><strong className="text-primary">Сигнал:</strong> Уран в 7 доме.</p>
                      <p><strong className="text-primary">Смысл:</strong> нестандартные союзы — внезапные встречи, резкие расставания, необычные форматы. может быть гражданский брак, гостевые отношения, большой возрастной разрыв.</p>
                      <p><strong className="text-primary">Действие:</strong> лучше честно признавать своё стремление к свободе. Проговаривать с партнёром рамки и договорённости. Если пытаться жить «как положено», судьба всё равно будет выбивать привычные сценарии.</p>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-secondary/5 to-accent/5">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Нептун в 7 доме</h3>
                    <div className="space-y-2 text-foreground/90">
                      <p><strong className="text-primary">Сигнал:</strong> Нептун стоит в 7 доме.</p>
                      <p><strong className="text-primary">Смысл:</strong> склонность идеализировать партнёра, не видеть реальность, путать жалость и любовь. Часты истории про «спасаю, вытаскиваю, терплю».</p>
                      <p><strong className="text-primary">Действие:</strong> любые серьёзные решения по отношению принимайте не только сердцем, но и головой. Проверяйте факты, включайте наблюдательность. Полезно иметь «друга-реалиста», с которым можно обсудить начало романа.</p>
                    </div>
                    <Card className="mt-4 p-4 bg-accent/20 border-accent/30">
                      <p className="text-sm font-medium text-foreground mb-2">Миникейс:</p>
                      <p className="text-sm text-foreground/90">
                        Анна, 32 года. Нептун в 7 доме в Рыбах. Снова и снова выбирала мужчин с проблемами — долги, алкоголь, нестабильный заработок. Каждый раз казалось, что «в этот раз он точно изменится». Прорыв случился, когда она честно признала в себе сценарий спасателя и начала встречаться только с теми, у кого базово всё в порядке. Часть «волшебства» в отношениях ушла, зато появился покой.
                      </p>
                    </Card>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">7 дом без планет</h3>
                    <div className="space-y-2 text-foreground/90">
                      <p><strong className="text-primary">Сигнал:</strong> в 7 доме нет планет.</p>
                      <p><strong className="text-primary">Смысл:</strong> тема отношений не забирает всё внимание. Часто союз складывается чуть спокойнее, чем у людей с «загруженным» 7 домом. Но тут важен знак и управитель этого знака.</p>
                      <p><strong className="text-primary">Действие:</strong> посмотрите, в каком знаке стоит куспид 7 дома, и где в карте стоит управитель этого знака. Там будет расшифровка. Пример: куспид 7 дома в Весах, управитель Венера, а Венера в 10 доме — отношения тесно связаны с карьерой и статусом.</p>
                    </div>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Риски 7 дома и как их обойти</h2>
                <p className="text-foreground/90 mb-6">
                  У каждого положения есть слабые места. Важно не пугаться, а видеть «грабли» заранее.
                </p>

                <Card className="p-6 bg-destructive/5 border-destructive/20 mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Частые риски по 7 дому:</h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                    <li><strong>Слияние и потеря себя</strong> — особенно при водных знаках, Нептуне, Луне в 7 доме</li>
                    <li><strong>Созависимость</strong> — «я без него никто», терпение ради статуса или общей квартиры</li>
                    <li><strong>Повторение одного и того же типа партнёра</strong> — просто в новой обёртке</li>
                    <li><strong>Смещение фокуса только на брак и партнёра</strong> — когда всё остальное обесценивается</li>
                  </ul>
                </Card>

                <Card className="p-6 bg-primary/5 border-primary/20">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Как обходить:</h3>
                  <ul className="space-y-3 text-foreground/90">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">1.</span>
                      <span>Держать фокус на 1 доме — помнить про свои желания, тело, здоровье, самомнение.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">2.</span>
                      <span>Вводить правило «3 конфликтов» — если в первые месяцы общения нельзя конструктивно прожить даже небольшие разногласия, это тревожный сигнал.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">3.</span>
                      <span>Периодически задавать себе вопрос: «в этом союзе я жива или только функционирую».</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-4 bg-accent/10 border-accent/30 mt-6">
                  <p className="text-sm text-foreground/90">
                    <strong>Рекомендации:</strong> 1) Всегда смотрите на знак и планеты 7 дома, а не только «описание в интернете». 2) Анализируйте не партнёра, а свои реакции и сценарии. 3) Не делайте выводы по одному показателю, смотрите на карту в целом.
                  </p>
                </Card>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-foreground">7 дом: не только про брак, но и про клиентов и партнёрства</h2>
                <p className="text-foreground/90 mb-4">
                  7 дом — это любые «я и другой». Поэтому сюда попадают:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-6">
                  <li>клиенты, с которыми вы работаете лично</li>
                  <li>деловые партнёры и сооснователи</li>
                  <li>люди, с которыми заключаете договор</li>
                </ul>

                <Card className="p-6 bg-secondary/10">
                  <p className="text-sm font-medium text-foreground mb-3">Пример:</p>
                  <div className="space-y-3 text-sm text-foreground/90">
                    <p>
                      Если 7 дом в Деве, управитель Меркурий, и он в 6 доме — вам может быть комфортно работать с клиентами в формате «я специалист, вы заказчик», с чёткими регламентами и задачами.
                    </p>
                    <p>
                      Если 7 дом в Близнецах, а Меркурий в 3 доме — больше подойдут партнёрства по обучению, информации, медиа.
                    </p>
                  </div>
                </Card>

                <Card className="p-6 bg-destructive/5 border-destructive/20 mt-4">
                  <p className="text-foreground/90 mb-2">
                    <strong className="text-destructive">Сигнал:</strong> много тяжёлых планет в 7 доме, а вы постоянно вписываетесь в совместный бизнес.
                  </p>
                  <p className="text-foreground/90 mb-2">
                    <strong className="text-destructive">Смысл:</strong> партнёрства могут быть источником испытаний.
                  </p>
                  <p className="text-foreground/90">
                    <strong className="text-destructive">Действие:</strong> прописывать все договорённости на бумаге, не вести большие деньги «на доверии» и отдельно считать, что вы вкладываете и что получаете.
                  </p>
                </Card>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Как использовать знание о 7 доме в реальной жизни</h2>
                <p className="text-foreground/90 mb-6">
                  Вот как можно внедрить это не «для интереса», а по делу.
                </p>

                <div className="space-y-4">
                  <Card className="p-6 border-l-4 border-primary">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Шаг 1. Выпишите основные факты</h3>
                    <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                      <li>знак на куспиде 7 дома</li>
                      <li>планеты в 7 доме</li>
                      <li>управитель 7 дома и дом, где он стоит</li>
                    </ul>
                    <p className="text-foreground/90 mt-3">
                      Сделайте себе маленькую таблицу «сигнал → смысл → действие». Прямо в блокнот.
                    </p>
                  </Card>

                  <Card className="p-6 border-l-4 border-secondary">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Шаг 2. Сверьте с прошлым опытом</h3>
                    <p className="text-foreground/90 mb-3">
                      Вспомните 2–3 ваших важных союза. Не только браки, но и серьёзные отношения, совместные проекты.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                      <li>Что в них было общего</li>
                      <li>Как вы заходили в отношения</li>
                      <li>На чём чаще всего ломалось</li>
                    </ul>
                    <p className="text-foreground/90 mt-3">
                      Отметьте галочкой, где вы уже видите прямую связь с 7 домом.
                    </p>
                  </Card>

                  <Card className="p-6 border-l-4 border-accent">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Шаг 3. Примите решение, что меняете</h3>
                    <p className="text-foreground/90 mb-4">
                      Астрология не про «так написано, так и будет». Она про подсказки.
                    </p>
                    <div className="space-y-2 text-sm text-foreground/90 bg-accent/5 p-4 rounded-lg">
                      <p className="font-medium text-foreground">Примеры действий:</p>
                      <p>• при Нептуне в 7 доме — не принимать решения о совместной ипотеке в первые месяцы романа</p>
                      <p>• при Сатурне в 7 доме — не вешать на себя партнёра «по обязанности», если союза уже нет</p>
                      <p>• при огненном 7 доме — тренировать выдержку и не рушить всё в первый же конфликт</p>
                    </div>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Выводы</h2>
                <Card className="p-6 bg-primary/5 border-primary/20">
                  <ul className="space-y-3 text-foreground/90">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">✓</span>
                      <span>7 дом гороскопа отвечает за брак, серьёзные отношения, деловые союзы и клиентов, с которыми вы взаимодействуете напрямую.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">✓</span>
                      <span>Чтобы прочитать свой 7 дом, важно знать время рождения, знак на куспиде и управителя этого знака.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">✓</span>
                      <span>Стихия знака 7 дома показывает стиль отношений, а планеты в 7 доме подчёркивают ваши сильные и слабые сценарии.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">✓</span>
                      <span>Риски часто связаны с идеализацией, слиянием и готовностью терпеть слишком много ради сохранения формы союза.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">✓</span>
                      <span>Зная сигналы 7 дома, можно заранее выстраивать здоровые договорённости, не попадать в повторяющиеся истории и бережнее относиться к себе.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">✓</span>
                      <span>Астрологическая карта описывает тенденции, а не приговор. Ваша задача — переводить сигналы в осознанное действие.</span>
                    </li>
                  </ul>
                </Card>
              </section>

              <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 text-center">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Получите 3 моментальных отчёта бесплатно
                </h2>
                <p className="text-foreground/90 mb-6">
                  Начните с готовых мини-результатов за пару минут
                </p>
                <Link to="/natal-chart-calculator">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Получить 3 отчёта
                  </Button>
                </Link>
              </Card>

              <section>
                <h2 className="text-3xl font-bold mb-6 text-foreground">FAQ по 7 дому гороскопа</h2>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="q1" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline">
                      Как посчитать знак 7 дома, если я не знаю точное время рождения?
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/90 pt-2">
                      Без времени рождения домовая сетка плавает, и знак 7 дома может смещаться. Можно ориентироваться на примерный промежуток, но это уже неточно. Если хотите серьёзно работать с 7 домом, лучше восстанавливать время рождения через родителей, документы или ректификацию у астролога.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q2" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline">
                      Что значит «управитель 7 дома» и как его найти?
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/90 pt-2">
                      Смотрите, в каком знаке стоит куспид 7 дома. У каждого знака есть планета-управитель. Например, Весы — Венера, Козерог — Сатурн, Рыбы — традиционно Юпитер плюс современный Нептун. Потом найдите эту планету в карте — знак и дом её положения покажут, через какие темы и как именно реализуется ваш 7 дом.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q3" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline">
                      Если 7 дом пустой, значит ли это, что у меня не будет брака?
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/90 pt-2">
                      Нет. Пустой 7 дом не отменяет отношений. Он лишь говорит, что тема партнёрства не перегружена, и сценарий считывается через знак 7 дома и управляющую планету. Часто у людей с пустым 7 домом браки вполне обычные, без крайностей и «американских горок».
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q4" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline">
                      Как учитывать риски по 7 дому, чтобы не повторять одни и те же ошибки?
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/90 pt-2">
                      Сначала честно зафиксируйте свои типичные сценарии — кого выбираете и как ведёте себя в отношениях. Потом посмотрите, как это отражено в знаке и планетах 7 дома. Для каждого рискованного сигнала придумайте конкретное правило — например, «не живём вместе раньше полугода», «не делаем общий кредит до года отношений». Это и есть перевод астрологии в практику.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q5" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline">
                      Можно ли по 7 дому понять, когда будет брак?
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/90 pt-2">
                      Точная дата брака — это уже работа с прогностикой, транзитами и дирекциями, а не только с наталом. 7 дом показывает готовность и сценарий — а вот время включения смотрится в динамике. Важно сначала понять свои установки и риски, а уже потом смотреть сроки, чтобы не «вбежать» в очередной знакомый, но токсичный сценарий.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SedmoyDomGoroskopa;
