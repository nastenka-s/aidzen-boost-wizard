import { Helmet } from 'react-helmet';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const TretiDomGoroskopa = () => {
  return (
    <>
      <Helmet>
        <title>3 дом гороскопа: общение, обучение и окружение | Нейродзен</title>
        <meta name="description" content="Третий дом гороскопа отвечает за общение, обучение и близкое окружение. Разбираем, как читать 3 дом в натальной карте, управителя, планеты и транзиты." />
        <meta name="keywords" content="третий дом гороскопа, 3 дом гороскопа, 3 дом в натальной карте, третий дом в астрологии, третий дом значение, управитель 3 дома, планеты в 3 доме, транзиты по 3 дому, дом общения в гороскопе" />
        <link rel="canonical" href="https://aidzen.ru/3-dom-goroskopa" />
        <meta property="og:title" content="3 дом гороскопа: общение, обучение и окружение" />
        <meta property="og:description" content="Третий дом гороскопа отвечает за общение, обучение и близкое окружение. Разбираем, как читать 3 дом в натальной карте." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://aidzen.ru/3-dom-goroskopa" />
        <meta property="og:image" content="https://aidzen.ru/logo.png" />
        <meta property="article:published_time" content="2025-11-24" />
        <meta property="article:section" content="Астрология" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="3 дом гороскопа: общение, обучение и окружение" />
        <meta name="twitter:description" content="Третий дом гороскопа отвечает за общение, обучение и близкое окружение." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "3 дом гороскопа: общение, обучение и окружение",
            "description": "Третий дом гороскопа отвечает за общение, обучение и близкое окружение. Разбираем, как читать 3 дом в натальной карте.",
            "author": { "@type": "Organization", "name": "Нейродзен" },
            "publisher": { "@type": "Organization", "name": "Нейродзен", "logo": { "@type": "ImageObject", "url": "https://aidzen.ru/logo.png" } },
            "datePublished": "2025-11-24",
            "mainEntityOfPage": { "@type": "WebPage", "@id": "https://aidzen.ru/3-dom-goroskopa" }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://aidzen.ru" },
              { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://aidzen.ru/blog" },
              { "@type": "ListItem", "position": 3, "name": "3 дом гороскопа", "item": "https://aidzen.ru/3-dom-goroskopa" }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <article>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                3 дом гороскопа: как он говорит о вашем мышлении и общении
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <time dateTime="2025-11-24">24 ноября, 2025</time>
                <span>•</span>
                <span>11 мин чтения</span>
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Третий дом гороскопа показывает, как вы думаете, общаетесь, учитесь и выстраиваете контакт с близким окружением. По нему видно, где вы перегружаете голову, с кем больше всего конфликтуете и как перерабатывать информацию без выгорания. В этой статье разберем 3 дом в натальной карте по шагам и посмотрим, какие риски он несет и как их обойти.
              </p>

              <Card className="my-8">
                <CardHeader>
                  <CardTitle>Третий дом: о чем он на самом деле</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>3 дом часто называют домом общения, но тема намного шире.</p>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Главные сферы 3 дома:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Мышление, речь, стиль общения</li>
                      <li>Школа, базовое образование, курсы, навыки</li>
                      <li>Братья и сестры, соседи, коллеги "рядом"</li>
                      <li>Переписки, соцсети, телефон, короткие поездки</li>
                      <li>Документы, договоры, повседневная информация</li>
                    </ul>
                  </div>

                  <p className="text-muted-foreground italic">
                    Если 1 дом говорит "кто я", 2 дом "чем я располагаю", то 3 дом отвечает "как я это все обрабатываю, кому рассказываю и как договариваюсь".
                  </p>

                  <p className="font-semibold text-destructive">
                    Риск 3 дома: жить в информационном шуме, сливать энергию в пустые разговоры и сплетни, вместо того чтобы использовать голову и связи осознанно.
                  </p>
                </CardContent>
              </Card>

              <section className="my-12">
                <h2 className="text-3xl font-bold mb-6">Как найти свой 3 дом: простая инструкция</h2>
                
                <p className="mb-6">Открываем натальную карту в любом сервисе и двигаемся по шагам.</p>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">1. Найдите куспид 3 дома</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p><strong>Сигнал:</strong> граница с пометкой 3 и значок знака Зодиака.</p>
                      <p><strong>Смысл:</strong> знак на куспиде показывает базовый стиль общения и мышления.</p>
                      <p><strong>Действие:</strong> запишите этот знак, он нам еще понадобится.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">2. Определите управителя 3 дома</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p><strong>Сигнал:</strong> каждая стихия имеет своего управителя. Например, Близнецы - Меркурий, Лев - Солнце, Скорпион - Марс или Плутон в современной школе.</p>
                      <p><strong>Смысл:</strong> управитель 3 дома показывает, где разворачивается ваш главный сценарий общения и учебы.</p>
                      <p><strong>Действие:</strong> найдите в карте, в каком доме и знаке стоит управитель, и отметьте его аспекты.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">3. Посмотрите планеты в 3 доме</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p><strong>Сигнал:</strong> планеты, стоящие внутри сектора 3 дома.</p>
                      <p><strong>Смысл:</strong> каждая планета добавляет свою "историю" общения, учебы, контактов.</p>
                      <p><strong>Действие:</strong> отдельно разберите каждую планету по схеме "сигнал. смысл. действие."</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">4. Проверьте аспекты</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p><strong>Сигнал:</strong> линии от управителя 3 дома к другим планетам.</p>
                      <p><strong>Смысл:</strong> аспекты показывают, кто помогает вам думать и общаться, а кто создает напряжение.</p>
                      <p><strong>Действие:</strong> гармоничные аспекты используем как ресурс, напряженные переводим в конкретные правила безопасности.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="my-12">
                <h2 className="text-3xl font-bold mb-6">Знак на куспиде 3 дома: стиль общения и мышления</h2>
                
                <p className="mb-6">Знак на начале 3 дома показывает, как вы обычно формулируете мысли, в каком стиле разговариваете и учитесь.</p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="fire">
                    <AccordionTrigger>Огненные знаки на 3 доме (Овен, Лев, Стрелец)</AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <p><strong>Сигнал:</strong> активный, прямой, иногда резкий стиль.</p>
                      <p><strong>Смысл:</strong> человек говорит быстро, часто первым, любит спорить, убеждать, вдохновлять.</p>
                      <p><strong>Действие:</strong> учиться дозировать импульс. Не отвечать в конфликтных переписках "сразу", а брать паузу хотя бы 10 минут.</p>
                      <p className="text-destructive"><strong>Риск:</strong> сжечь отношения резкими словами.</p>
                      <p className="text-muted-foreground"><strong>Обход:</strong> правило "не писать и не звонить, пока киплю". Можно сначала выписать эмоции в черновик.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="earth">
                    <AccordionTrigger>Земные знаки (Телец, Дева, Козерог)</AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <p><strong>Сигнал:</strong> практичное, структурное мышление, спокойная речь.</p>
                      <p><strong>Смысл:</strong> человек говорит по делу, любит понятные инструкции, учится через практику. Может быть излишне критичен.</p>
                      <p><strong>Действие:</strong> следить, чтобы "конструктив" не превращался в придирки, особенно к близким.</p>
                      <p className="text-destructive"><strong>Риск:</strong> заглушить живое общение сухостью и критикой.</p>
                      <p className="text-muted-foreground"><strong>Обход:</strong> задавать уточняющий вопрос вместо оценки. Например, "что ты имела в виду" вместо "это ерунда".</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="air">
                    <AccordionTrigger>Воздушные знаки (Близнецы, Весы, Водолей)</AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <p><strong>Сигнал:</strong> легкая речь, любопытство, многозадачность.</p>
                      <p><strong>Смысл:</strong> много переписок, звонков, интересов. Опасность разбросанности.</p>
                      <p><strong>Действие:</strong> учиться фильтровать информацию: не подписываться на лишнее, ограничивать экранное время, выделять "окна" для соцсетей.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="water">
                    <AccordionTrigger>Водные знаки (Рак, Скорпион, Рыбы)</AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <p><strong>Сигнал:</strong> эмоциональная речь, чувствительное мышление.</p>
                      <p><strong>Смысл:</strong> человек сильно считывает тон, намеки, интонацию. Может додумывать, обижаться, ранясь о слова.</p>
                      <p><strong>Действие:</strong> разделять факты и интерпретации. При непонимании задавать вопрос, а не накручивать.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>

              <section className="my-12">
                <h2 className="text-3xl font-bold mb-6">Управитель 3 дома: где разворачивается ваша история общения</h2>
                
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <p className="font-semibold text-lg">Формула:</p>
                    <p className="text-muted-foreground">Управитель 3 дома в доме N = основная сцена, где вы думаете, говорите и решаете.</p>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Управитель 3 дома в 7 доме</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>Сигнал:</strong> связь общения с партнерством.</p>
                      <p><strong>Смысл:</strong> ключевые разговоры проходят в паре, в союзе, в консультациях, переговорах.</p>
                      <p><strong>Действие:</strong> учиться говорить честно и прямо в отношениях, а не копить недосказанность.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Управитель 3 дома в 10 доме</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>Сигнал:</strong> мышление и речь завязаны на карьеру, статус, профессию.</p>
                      <p><strong>Смысл:</strong> человек много думает о работе, говорит "на публику", может учить других.</p>
                      <p><strong>Действие:</strong> развивать публичные навыки, ораторство, деловую переписку. Следить, чтобы работа не вытесняла личное общение.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Управитель 3 дома в 12 доме</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>Сигнал:</strong> внутренняя, скрытая работа ума.</p>
                      <p><strong>Смысл:</strong> богатый внутренний диалог, интерес к психологии, тайнам, духовным темам. Есть риск уходить в себя.</p>
                      <p><strong>Действие:</strong> искать безопасные форматы выговаривания: терапия, дневник, доверенный человек.</p>
                    </CardContent>
                  </Card>
                </div>

                <p className="mt-6 text-muted-foreground italic">
                  <strong>Риск:</strong> смотреть только дом и игнорировать аспекты. <strong>Обход:</strong> всегда добавляйте к трактовке управителя его связи с другими планетами.
                </p>
              </section>

              <section className="my-12">
                <h2 className="text-3xl font-bold mb-6">Планеты в 3 доме: как вы говорите и с кем</h2>
                
                <p className="mb-6">Планеты в 3 доме усиливают тему общения и учебы.</p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="sun">
                    <AccordionTrigger>Солнце в 3 доме</AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <p><strong>Сигнал:</strong> личность встроена в тему общения и информации.</p>
                      <p><strong>Смысл:</strong> человеку важно быть услышанной. Часто учит других, ведет блоги, много пишет.</p>
                      <p><strong>Действие:</strong> направить эту энергию в полезные форматы: обучающие посты, курсы, выступления, а не в бесконечные споры в комментариях.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="moon">
                    <AccordionTrigger>Луна в 3 доме</AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <p><strong>Сигнал:</strong> эмоции сильно включены в общение.</p>
                      <p><strong>Смысл:</strong> настроение напрямую влияет на переписки и разговоры. Возможны частые смены интересов, эмоциональные сообщения.</p>
                      <p><strong>Действие:</strong> не принимать важных решений по переписке в моменты сильных чувств. Давать себе время "переспать с этим".</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="mercury">
                    <AccordionTrigger>Меркурий в 3 доме</AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <p><strong>Сигнал:</strong> типичный "дитя информации".</p>
                      <p><strong>Смысл:</strong> быстрое мышление, любовь к учебе, курсам, текстам, подкастам. Опасность перегруза.</p>
                      <p><strong>Действие:</strong> выбирать качество, а не количество. Не записываться сразу на пять курсов, а взять один и пройти до конца.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="saturn">
                    <AccordionTrigger>Сатурн в 3 доме</AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <p><strong>Сигнал:</strong> строгий, структурный подход к словам.</p>
                      <p><strong>Смысл:</strong> человек может говорить мало, бояться ошибиться, но при этом уважает знания и серьезные темы. Склонность к самоцензуре.</p>
                      <p><strong>Действие:</strong> работать над уверенностью в своей речи. Позволить себе учиться через практику, а не ждать "идеального момента".</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="neptune">
                    <AccordionTrigger>Нептун в 3 доме</AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-4">
                      <p><strong>Сигнал:</strong> интуитивное, образное мышление.</p>
                      <p><strong>Смысл:</strong> богатое воображение, талант к историям, но и риск путаницы, недопонимания, иллюзий в общении.</p>
                      <p><strong>Действие:</strong> в важных вопросах закреплять договоренности письменно. Переспрашивать: "правильно ли я поняла, что…"</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Card className="mt-6 border-destructive">
                  <CardContent className="pt-6">
                    <p className="text-destructive"><strong>Риск планет в 3 доме:</strong> застрять в голове и переписках, не доходя до реальных действий.</p>
                    <p className="text-muted-foreground mt-2"><strong>Обход:</strong> вводить правило "за информацией всегда идет шаг". Прочитала статью по теме - сразу что-то применяю.</p>
                  </CardContent>
                </Card>
              </section>

              <section className="my-12">
                <h2 className="text-3xl font-bold mb-6">Транзиты по 3 дому: периоды разговоров и новостей</h2>
                
                <p className="mb-6">3 дом очень чувствителен к транзитам быстрых планет и Меркурия.</p>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Быстрые планеты по 3 дому</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Солнце по 3 дому</h4>
                        <p className="text-sm"><strong>Сигнал:</strong> раз в год на 3-4 недели фокус на общении, поездках, документах.</p>
                        <p className="text-sm"><strong>Смысл:</strong> время активных контактов, переговоров, поездок по делам.</p>
                        <p className="text-sm"><strong>Действие:</strong> планировать важные разговоры, обучение, собеседования именно на этот период.</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Меркурий по 3 дому</h4>
                        <p className="text-sm"><strong>Сигнал:</strong> усиление ментальной активности.</p>
                        <p className="text-sm"><strong>Смысл:</strong> много переписок, идей, предложений.</p>
                        <p className="text-sm"><strong>Действие:</strong> сразу выстраивать систему: списки задач, папки в почте, конкретное время на ответы.</p>
                        <p className="text-sm text-muted-foreground mt-2">Отдельная история ретроградного Меркурия по 3 дому. Это время пересмотра общения, повторных поездок, возврата старых тем и людей.</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Медленные планеты по 3 дому</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Сатурн по 3 дому</h4>
                        <p className="text-sm"><strong>Сигнал:</strong> несколько лет проверки в теме общения и обучения.</p>
                        <p className="text-sm"><strong>Смысл:</strong> фильтрация контактов, сокращение бессмысленных разговоров, серьезное отношение к словам.</p>
                        <p className="text-sm"><strong>Действие:</strong> учиться говорить точно, брать на себя ответственность за сказанное, не разбрасываться обещаниями.</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Уран по 3 дому</h4>
                        <p className="text-sm"><strong>Сигнал:</strong> период резких изменений в образе мышления.</p>
                        <p className="text-sm"><strong>Смысл:</strong> смена окружения, неожиданные поездки, новые форматы общения, технологии.</p>
                        <p className="text-sm"><strong>Действие:</strong> оставлять себе свободу маневра, не забивать график под завязку, учиться новому формату коммуникаций.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6 border-destructive">
                  <CardContent className="pt-6">
                    <p className="text-destructive"><strong>Риск транзитов по 3 дому:</strong> информационное выгорание, особенно при избытке соцсетей и чатов.</p>
                    <p className="text-muted-foreground mt-2"><strong>Обход:</strong> цифровой детокс, ограничения по времени и осознанный выбор, кому и на что отвечать.</p>
                  </CardContent>
                </Card>
              </section>

              <section className="my-12">
                <h2 className="text-3xl font-bold mb-6">Выводы</h2>
                
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      <li>✓ Третий дом гороскопа отвечает за мышление, общение, повседневные контакты и базовое обучение.</li>
                      <li>✓ Знак на куспиде 3 дома показывает стиль речи и восприятия информации, управитель 3 дома показывает, в какой сфере все это особенно активно.</li>
                      <li>✓ Планеты в 3 доме усиливают тему общения, каждая со своим характером и рисками, особенно Сатурн, Марс, Нептун и Уран.</li>
                      <li>✓ Аспекты к управителю 3 дома и планетам внутри показывают, что помогает вам учиться и договариваться, а где вы сами себе создаете конфликты.</li>
                      <li>✓ Транзиты по 3 дому дают периоды активных новостей, переговоров и учебы, и важно не уходить в информационное выгорание.</li>
                      <li>✓ Осознанная работа с 3 домом помогает построить экологичный стиль общения и перестать тратить жизнь на пустые разговоры и хаос в голове.</li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              <section className="my-12 bg-muted/50 p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Получите 3 моментальных отчёта бесплатно</h2>
                <p className="mb-6 text-muted-foreground">Начните с готовых мини-результатов за пару минут</p>
                <Button size="lg" className="text-lg px-8" asChild><a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">Получить 3 отчёта</a></Button>
              </section>

              <section className="my-12">
                <h2 className="text-3xl font-bold mb-6">FAQ по 3 дому гороскопа</h2>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq1">
                    <AccordionTrigger>Как посчитать, какой у меня управитель 3 дома?</AccordionTrigger>
                    <AccordionContent className="pt-4">
                      Сначала найдите знак на куспиде 3 дома, затем определите его управителя по классике. Например, Близнецы и Дева под Меркурием, Телец и Весы под Венерой, Лев под Солнцем, Рак под Луной. После этого смотрите, где стоит эта планета и какие аспекты имеет.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq2">
                    <AccordionTrigger>Что значит, если третий дом пустой?</AccordionTrigger>
                    <AccordionContent className="pt-4">
                      Пустой 3 дом не говорит "у меня нет общения". Это значит, что тема не требует отдельного акцента через планеты. В таком случае мы особенно внимательно смотрим знак на куспиде 3 дома, управителя и его аспекты. Планеты в других домах все равно будут включать тему общения.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq3">
                    <AccordionTrigger>Как учитывать риски при напряженных аспектах к 3 дому?</AccordionTrigger>
                    <AccordionContent className="pt-4">
                      Сначала переводим аспект на простой язык. Марс - резкость и импульс, Сатурн - страх и зажим, Нептун - путаница, Уран - резкость и внезапность. Затем вводим конкретные правила: не пишем сообщения в гневе, проговариваем важное голосом, закрепляем договоренности письменно, ограничиваем количество чатов.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq4">
                    <AccordionTrigger>Как понять, когда транзит по 3 дому опасен для нервной системы?</AccordionTrigger>
                    <AccordionContent className="pt-4">
                      Обратите внимание на периоды, когда по 3 дому идут сразу несколько планет или тяжелые аспекты от Урана, Плутона, Сатурна. Если в это время вы ощущаете перегруз, важно сократить информационный поток, отменить лишние созвоны и заложить время на отдых.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq5">
                    <AccordionTrigger>Чем третий дом отличается от девятого?</AccordionTrigger>
                    <AccordionContent className="pt-4">
                      3 дом отвечает за ближний круг, базовое обучение и повседневное общение. 9 дом связан с высшим образованием, дальними поездками, мировоззрением и смыслами. Проще говоря, 3 дом: "как я думаю каждый день", 9 дом: "во что я верю и на что опираюсь в целом".
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq6">
                    <AccordionTrigger>Влияет ли 3 дом на отношения с братьями и сестрами?</AccordionTrigger>
                    <AccordionContent className="pt-4">
                      Да, братья и сестры входят в сферу 3 дома. По нему видно общий сценарий контакта: поддержка, конкуренция, дистанция. Напряженные аспекты могут говорить о сложных отношениях, но это не приговор, а повод осознанно выстраивать границы и не переносить старые детские сценарии в взрослую жизнь.
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

export default TretiDomGoroskopa;
