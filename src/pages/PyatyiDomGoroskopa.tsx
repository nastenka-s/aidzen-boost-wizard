import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const PyatyiDomGoroskopa = () => {
  return (
    <>
      <Helmet>
        <title>5 дом гороскопа: дети, любовь и самореализация | Нейродзен</title>
        <meta name="description" content="Что значит 5 дом гороскопа в астрологии. Как он описывает детей, любовь, творчество, хобби и риск. Простое объяснение, примеры и разбор рисков." />
        <meta name="keywords" content="5 дом гороскопа, пятый дом гороскопа, 5 дом в натальной карте, дом детей и любви, астрология домов, как трактовать 5 дом, 5 дом зодиака, управитель 5 дома" />
        <link rel="canonical" href="https://neurodzen.ru/5-dom-goroskopa" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <article>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                5 дом гороскопа: дети, любовь и самореализация
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <time>27 ноября, 2025</time>
                <span>•</span>
                <span>8 минут чтения</span>
              </div>
            </header>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed">
                  В этой статье разберём <strong>5 дом гороскопа</strong> так, чтобы вы могли сами посмотреть свою карту и сделать первые выводы. Поймёте, как 5 дом описывает детей, романтические отношения, творчество и удовольствие от жизни. А ещё разберём типичные ошибки: где здесь риск обжечься в любви, попасть в азарт или выгореть от хобби и самореализации.
                </p>
              </CardContent>
            </Card>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Что такое 5 дом гороскопа простыми словами</h2>
              <div className="prose prose-lg max-w-none space-y-4">
                <p>
                  <strong>5 дом в натальной карте</strong> отвечает за всё, что даёт чувство искренней радости: любовь, свидания, дети, творчество, хобби, игра, риск и сцена.
                </p>
                <p>
                  Если совсем по-человечески: это зона "я хочу и мне кайфово".
                </p>
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <p className="font-semibold mb-3">Через 5 дом мы смотрим:</p>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>как человек флиртует и влюбляется</li>
                      <li>отношение к беременности и детям</li>
                      <li>актёрские, творческие, художественные способности</li>
                      <li>хобби, спорт, сцена, самовыражение</li>
                      <li>склонность к риску и азарту</li>
                    </ul>
                  </CardContent>
                </Card>
                <p className="text-muted-foreground italic">
                  Важно: 5 дом не показывает официальные браки. Это больше про роман, конфетно-букетный период, влюблённость, любовников, любовные истории.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Как найти 5 дом в своей натальной карте</h2>
              <div className="prose prose-lg max-w-none space-y-4">
                <p>Чтобы говорить предметно, надо один раз разобраться, где он у вас и кто им управляет.</p>
                
                <h3 className="text-2xl font-semibold mt-8 mb-4">Шаг 1. Постройте натальную карту</h3>
                <p>Сделайте карту в Нейродзен (бесплатно!). Важно:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>введите точное время рождения</li>
                  <li>и город рождения</li>
                </ul>
                <p>В результате вы увидите круг с делением на 12 секторов – это дома.</p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Шаг 2. Найдите сектор с цифрой 5</h3>
                <p>На круге дома подписаны цифрами от 1 до 12.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Найдите число 5</li>
                  <li>Посмотрите, какой знак Зодиака стоит на границе этого дома (на куспиде)</li>
                </ul>
                
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <p className="font-semibold">Формула:</p>
                    <p className="mt-2">Знак на куспиде 5 дома = стиль вашей радости и творчества.</p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50 mt-6">
                  <CardContent className="pt-6">
                    <p className="font-semibold mb-2">Пример:</p>
                    <p>На куспиде 5 дома стоит Лев.</p>
                    <p><strong>Сигнал:</strong> вам важны сцена, внимание и признание.</p>
                    <p><strong>Смысл:</strong> радость включается, когда вы сияете, выступаете, ведёте, создаёте что-то яркое.</p>
                    <p><strong>Действие:</strong> добавьте в жизнь публичность хотя бы в мягком формате: блог, выступления, сторис, творческие проекты.</p>
                  </CardContent>
                </Card>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Шаг 3. Определите управителя 5 дома</h3>
                <p>Каждым знаком управляет своя планета. Она и будет управителем 5 дома.</p>
                
                <Card>
                  <CardContent className="pt-6">
                    <p className="font-semibold mb-3">Краткая шпаргалка:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <p>Овен: Марс</p>
                      <p>Телец: Венера</p>
                      <p>Близнецы: Меркурий</p>
                      <p>Рак: Луна</p>
                      <p>Лев: Солнце</p>
                      <p>Дева: Меркурий</p>
                      <p>Весы: Венера</p>
                      <p>Скорпион: Плутон</p>
                      <p>Стрелец: Юпитер</p>
                      <p>Козерог: Сатурн</p>
                      <p>Водолей: Уран</p>
                      <p>Рыбы: Нептун</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">5 дом: дети, любовь, творчество</h2>
              
              <h3 className="text-2xl font-semibold mt-8 mb-4">Дети и беременность</h3>
              <div className="prose prose-lg max-w-none space-y-4">
                <p>5 дом показывает:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>отношение к материнству</li>
                  <li>сколько энергии идёт на тему детей</li>
                  <li>как вы ведёте себя как мама</li>
                  <li>какие дети по характеру</li>
                </ul>
                <p className="text-muted-foreground italic">
                  Важно: 5 дом не даёт прямых медицинских прогнозов "будут/не будут дети". Это уже область медицины, а не астрологии.
                </p>

                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <p className="font-semibold mb-3">Примеры сигналов:</p>
                    <div className="space-y-4">
                      <div>
                        <p><strong>Сильный 5 дом:</strong> много планет внутри, яркий знак.</p>
                        <p><strong>Смысл:</strong> дети и тема материнства занимают важное место в жизни.</p>
                        <p><strong>Действие:</strong> заранее думать, как не раствориться полностью в детях, оставить себе пространство.</p>
                      </div>
                      <div>
                        <p><strong>Сатурн в 5 доме:</strong></p>
                        <p><strong>Смысл:</strong> серьёзное отношение к детям, позднее материнство или ощущение ответственности, жёсткие требования к себе как к маме.</p>
                        <p><strong>Действие:</strong> работать с чувством вины и завышенными стандартами, учиться давать себе право на ошибку.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Любовь и романтика</h3>
              <div className="prose prose-lg max-w-none space-y-4">
                <p>5 дом показывает, как вы влюбляетесь и что для вас "конфетно-букетный" период.</p>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="font-semibold mb-2">Овен на куспиде 5 дома</p>
                      <p><strong>Сигнал:</strong> быстрое загорание, инициатива в любви.</p>
                      <p><strong>Смысл:</strong> вы не любите долго ждать, можете первая писать, действовать, признавать симпатию.</p>
                      <p><strong>Действие:</strong> контролировать импульсивность, не бросаться в отношения без проверки ценностей партнёра.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <p className="font-semibold mb-2">Рак на куспиде 5 дома</p>
                      <p><strong>Сигнал:</strong> чувствительная, мягкая романтика, привязка к теме семьи.</p>
                      <p><strong>Смысл:</strong> вы влюбляетесь через заботу, домашность, душевность.</p>
                      <p><strong>Действие:</strong> следить, чтобы не "усыновлять" партнёра и не тащить всё на себе.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Творчество, хобби, сцена</h3>
              <div className="prose prose-lg max-w-none space-y-4">
                <p>5 дом описывает любые формы самовыражения:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>рисование, пение, танцы</li>
                  <li>блогинг, выступления, актёрство</li>
                  <li>спорт, где есть элемент игры и шоу</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">5 дом в разных знаках</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="oven">
                  <AccordionTrigger>5 дом в Овне</AccordionTrigger>
                  <AccordionContent>
                    <p>Импульсивная любовь, быстрые влюблённости, спортивные хобби, дети активные, шумные. <strong>Риск:</strong> поспешные романы, конфликты.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="telec">
                  <AccordionTrigger>5 дом в Тельце</AccordionTrigger>
                  <AccordionContent>
                    <p>Любовь через телесность, вкусную еду, комфорт, стабильные романы. Творчество материальное: декор, дизайн, рукоделие. <strong>Риск:</strong> застревание в зоне комфорта, ревность.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="bliznecy">
                  <AccordionTrigger>5 дом в Близнецах</AccordionTrigger>
                  <AccordionContent>
                    <p>Флирт словами, переписками, одновременно несколько интересов. Дети любопытные, болтливые. <strong>Риск:</strong> отношенческий хаос, поверхностность.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="rak">
                  <AccordionTrigger>5 дом в Раке</AccordionTrigger>
                  <AccordionContent>
                    <p>Романтика через заботу, дом, кухню. Сильный материнский инстинкт. <strong>Риск:</strong> эмоциональная зависимость, обиды, страх отпускать детей.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="lev">
                  <AccordionTrigger>5 дом во Льве</AccordionTrigger>
                  <AccordionContent>
                    <p>История про сцену, драму, большие чувства. Любовь как фильм. <strong>Риск:</strong> завышенные ожидания, "должны восхищаться мной".</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="deva">
                  <AccordionTrigger>5 дом в Деве</AccordionTrigger>
                  <AccordionContent>
                    <p>Рациональный подход к любви, чувство долга по отношению к детям. Хобби связаны со структурой, порядком. <strong>Риск:</strong> критика, включая детей и партнёров.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="vesy">
                  <AccordionTrigger>5 дом в Весах</AccordionTrigger>
                  <AccordionContent>
                    <p>Романтика, эстетика, красивые отношения. Любовь как партнёрство и красота. <strong>Риск:</strong> зависимость от оценки, страх одиночества, треугольники.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="skorpion">
                  <AccordionTrigger>5 дом в Скорпионе</AccordionTrigger>
                  <AccordionContent>
                    <p>Глубокие, интенсивные чувства, драматичный романтизм. Тяга к табуированным темам. <strong>Риск:</strong> ревность, эмоциональные качели.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="strelec">
                  <AccordionTrigger>5 дом в Стрельце</AccordionTrigger>
                  <AccordionContent>
                    <p>Любовь через свободу, путешествия, обучение. Дети яркие, независимые. <strong>Риск:</strong> обещаний больше, чем реальных действий.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="kozerog">
                  <AccordionTrigger>5 дом в Козероге</AccordionTrigger>
                  <AccordionContent>
                    <p>Серьёзное отношение к детям и любви, всё "по правилам". Радость через достижение. <strong>Риск:</strong> задержка удовольствий "потом", жёсткость.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="vodoley">
                  <AccordionTrigger>5 дом в Водолее</AccordionTrigger>
                  <AccordionContent>
                    <p>Необычные романы, нестандартные хобби, дети оригиналы. <strong>Риск:</strong> нестабильность, резкие повороты в любви.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ryby">
                  <AccordionTrigger>5 дом в Рыбах</AccordionTrigger>
                  <AccordionContent>
                    <p>Романтика, как в песнях и кино, сильная эмпатия, творческие способности. <strong>Риск:</strong> иллюзии, идеализация партнёров, уход в фантазии.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Планеты в 5 доме</h2>
              <div className="prose prose-lg max-w-none space-y-4">
                <p>Планета в 5 доме работает как прожектор: туда идёт внимание и энергия.</p>
                
                <div className="grid gap-4 mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-bold mb-2">Солнце в 5 доме</h4>
                      <p><strong>Сигнал:</strong> ярко выраженная творческая натура.</p>
                      <p><strong>Смысл:</strong> человеку важно сиять, быть в центре внимания, реализовываться через творчество и детей.</p>
                      <p><strong>Действие:</strong> обязательно находить сцену, пусть даже микро: рабочие презентации, блог, курсы.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-bold mb-2">Луна в 5 доме</h4>
                      <p><strong>Сигнал:</strong> сильные эмоции в теме детей и любви.</p>
                      <p><strong>Смысл:</strong> настроение сильно зависит от отношений, от того, как складывается контакт с ребёнком или партнёром.</p>
                      <p><strong>Действие:</strong> учиться эмоциональной гигиене, не делать детей единственным источником радости.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-bold mb-2">Венера в 5 доме</h4>
                      <p><strong>Сигнал:</strong> лёгкий флирт, привлекательность, вкус к удовольствиям.</p>
                      <p><strong>Смысл:</strong> человек притягателен, любит всё красивое, ему важно наслаждаться.</p>
                      <p><strong>Действие:</strong> следить за балансом "кайф – последствия": финансы, верность, здоровье.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-bold mb-2">Марс в 5 доме</h4>
                      <p><strong>Сигнал:</strong> страстные романы, азарт, активные виды спорта.</p>
                      <p><strong>Смысл:</strong> любовь как борьба, игра, соревнование.</p>
                      <p><strong>Действие:</strong> направлять энергию в спорт и проекты, а не в ненужные драмы.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Риски 5 дома и как их обойти</h2>
              <div className="prose prose-lg max-w-none space-y-4">
                <p>У любой сильной зоны есть теневая сторона. 5 дом связан с риском, азартом и эмоциональными качелями.</p>

                <Card className="bg-destructive/5 border-destructive/20 mt-6">
                  <CardContent className="pt-6">
                    <h4 className="font-bold mb-3">Типичные риски:</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold">1. Азартные игры и финансовые риски</p>
                        <p><strong>Сигнал:</strong> Юпитер, Марс, Уран в 5 доме, напряжённые аспекты к ним.</p>
                        <p><strong>Действие:</strong> заранее задать личный лимит на риск в деньгах и эмоциях, отделить игру от реальной финансовой стратегии.</p>
                      </div>
                      <div>
                        <p className="font-semibold">2. Любовные треугольники и бурные романы</p>
                        <p><strong>Сигнал:</strong> сильный 5 дом при слабом 7 доме партнёрства, Венера с аспектами к Урану, Нептуну, Плутону.</p>
                        <p><strong>Действие:</strong> честно себе признаться, чего вы хотите: стабильного союза или эмоций. И не путать одно с другим.</p>
                      </div>
                      <div>
                        <p className="font-semibold">3. Растворение в детях</p>
                        <p><strong>Сигнал:</strong> Луна, Солнце, Юпитер в 5 доме, особенно в водных знаках.</p>
                        <p><strong>Действие:</strong> оставлять себе личное пространство, хобби, работу, взрослые отношения, а не жить только ролью мамы.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Выводы</h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li>✓ 5 дом гороскопа показывает, как вы любите, творите, относитесь к детям и удовольствиям.</li>
                    <li>✓ Знак на куспиде 5 дома описывает стиль вашей радости, а управитель дома показывает, через какие сферы она реализуется.</li>
                    <li>✓ Планеты в 5 доме усиливают темы детей, творчества, любви и одновременно добавляют свои риски.</li>
                    <li>✓ Сильный 5 дом требует особого внимания к балансу: между романом и устойчивыми отношениями, между детьми и собственной жизнью.</li>
                    <li>✓ Риски 5 дома чаще всего связаны с азартом, любовными драмами и растворением в детях, но ими можно управлять, если понимать свои астрологические сигналы.</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6 text-center">
                  <h3 className="text-2xl font-bold mb-4">Получите 3 моментальных отчёта бесплатно</h3>
                  <p className="mb-6">Начните с готовых мини-результатов за пару минут</p>
                  <Button asChild size="lg">
                    <Link to="/natal-chart-calculator">Получить 3 отчёта</Link>
                  </Button>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">FAQ про 5 дом гороскопа</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq1">
                  <AccordionTrigger>Как посчитать, в каком знаке у меня 5 дом?</AccordionTrigger>
                  <AccordionContent>
                    Постройте натальную карту по дате, времени и месту рождения. На круге найдите сектор с цифрой 5 и посмотрите знак на его границе. Этот знак и будет положением 5 дома.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq2">
                  <AccordionTrigger>Что значит, если 5 дом пустой, без планет?</AccordionTrigger>
                  <AccordionContent>
                    Это не "нет детей" и не "нет любви". Это значит, что тема работает более спокойно, без сильных перегибов. Для трактовки смотрим знак на куспиде 5 дома и положение его управителя по дому и знаку.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq3">
                  <AccordionTrigger>Как по 5 дому понять отношение к детям?</AccordionTrigger>
                  <AccordionContent>
                    Сначала анализируем знак 5 дома, затем планеты внутри дома, потом управителя 5 дома. Важно смотреть общий контекст карты: аспекты к Луне, Солнцу и 4 дому. 5 дом даёт стиль и эмоциональный фон, а не медицинский прогноз.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq4">
                  <AccordionTrigger>Как по 5 дому оценить риски в любви и азарте?</AccordionTrigger>
                  <AccordionContent>
                    Обращайте внимание на напряжённые аспекты к планетам в 5 доме и управителю 5 дома, особенно от Марса, Урана, Нептуна, Плутона. Если таких много, полезно заранее установить свои правила безопасности в деньгах и отношениях.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq5">
                  <AccordionTrigger>Можно ли по 5 дому понять творческие способности?</AccordionTrigger>
                  <AccordionContent>
                    Да, 5 дом показывает, в чём вам легче всего самовыражаться. Смотрим знак, планеты и управителя. Но важно не ждать "официального разрешения от космоса", а пробовать разные форматы творчества и отслеживать, где есть живой интерес и энергия.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PyatyiDomGoroskopa;
