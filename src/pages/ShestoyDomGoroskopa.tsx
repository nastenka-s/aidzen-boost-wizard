import { Helmet } from 'react-helmet';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ShestoyDomGoroskopa = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>6-й дом гороскопа: здоровье, работа и привычки в натале | Нейродзен</title>
        <meta name="description" content="Что значит 6-й дом гороскопа, за что он отвечает в натальной карте, как его найти и читать. Разбираем здоровье, работу по найму, выгорание и бытовые привычки на простом языке." />
        <meta name="keywords" content="6-й дом гороскопа, 6 дом в натальной карте, значение 6 дома, 6 дом здоровье, 6 дом работа по найму, управитель 6 дома, планеты в 6 доме, дом гороскопа здоровье" />
        <link rel="canonical" href="https://aidzen.ru/shestoy-dom-goroskopa" />
        <meta property="og:title" content="6-й дом гороскопа: здоровье, работа и привычки в натале" />
        <meta property="og:description" content="Что значит 6-й дом гороскопа, за что он отвечает в натальной карте, как его найти и читать. Разбираем здоровье, работу по найму, выгорание и бытовые привычки." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://aidzen.ru/shestoy-dom-goroskopa" />
        <meta property="og:image" content="https://aidzen.ru/logo.png" />
        <meta property="article:published_time" content="2025-11-29" />
        <meta property="article:section" content="Астрология" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="6-й дом гороскопа: здоровье, работа и привычки в натале" />
        <meta name="twitter:description" content="Что значит 6-й дом гороскопа, за что он отвечает в натальной карте, как его найти и читать." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "6-й дом гороскопа: здоровье, работа и привычки в натале",
            "description": "Что значит 6-й дом гороскопа, за что он отвечает в натальной карте, как его найти и читать.",
            "author": { "@type": "Organization", "name": "Нейродзен" },
            "publisher": { "@type": "Organization", "name": "Нейродзен", "logo": { "@type": "ImageObject", "url": "https://aidzen.ru/logo.png" } },
            "datePublished": "2025-11-29",
            "mainEntityOfPage": { "@type": "WebPage", "@id": "https://aidzen.ru/shestoy-dom-goroskopa" }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://aidzen.ru" },
              { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://aidzen.ru/blog" },
              { "@type": "ListItem", "position": 3, "name": "6-й дом гороскопа", "item": "https://aidzen.ru/shestoy-dom-goroskopa" }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
          <article className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-6 text-foreground">6-й дом гороскопа: здоровье, работа и привычки в натальной карте</h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              В 6-м доме видно, как вы живете каждый день: режим, работа, быт, стресс и то, как тело на все это реагирует. В статье разберем, как найти 6-й дом на своей карте, что показывает знак и планеты в нем и как по этим данным вовремя увидеть риски выгорания и проблем со здоровьем.
            </p>

            <div className="my-8">
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">Время чтения: 10 минут</p>
                  <p className="text-sm text-muted-foreground">Опубликовано: 29 ноября, 2025</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Что такое 6-й дом и за что он отвечает</h2>
            
            <p className="mb-4 text-foreground">
              6-й дом - это зона повседневности. Не мечты и миссия, а то, как вы живете «с понедельника по пятницу»:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground">
              <li>ежедневные дела и рутина</li>
              <li>работа по найму, подработки, офис, сервис</li>
              <li>отношения с коллегами, начальством, подчиненными</li>
              <li>здоровье, особенно хронические моменты и психосоматика</li>
              <li>привычки, питание, режим сна, бытовые мелочи</li>
              <li>домашние животные и тема заботы о тех, кто слабее</li>
            </ul>

            <p className="mb-6 text-foreground">
              Если совсем просто: 6-й дом показывает, что с вами происходит, когда вы не на выходных и не в отпуске, а в обычный «рабочий» день. И именно через эти мелочи чаще всего вылезает и выгорание, и болезни.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Как найти 6-й дом в своей натальной карте</h2>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Шаг 1. Построить натальную карту</h3>
            <p className="mb-4 text-foreground">
              Найдите любой онлайн-сервис, который строит натальную карту по дате, времени и месту рождения. Введите данные рождения максимально точно по времени. Постройте карту в виде колеса с домами.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Шаг 2. Найти куспид 6-го дома</h3>
            <p className="mb-4 text-foreground">
              Куспид - это граница дома, обычно на карте она подписана цифрой. На внутреннем круге карты найдите цифру «6». На линии, которая от нее идет к внешнему кругу, будет указан знак зодиака. Этот знак и есть «знак на куспиде 6-го дома».
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Шаг 3. Определить управителя 6-го дома</h3>
            <p className="mb-4 text-foreground">
              Управитель 6-го дома = планета, управляющая знаком на куспиде 6-го дома.
            </p>

            <Card className="my-6 bg-secondary/20 border-secondary">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-foreground">Базовая связка «знак → управитель»:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-foreground">Овен → Марс</p>
                  <p className="text-foreground">Телец → Венера</p>
                  <p className="text-foreground">Близнецы → Меркурий</p>
                  <p className="text-foreground">Рак → Луна</p>
                  <p className="text-foreground">Лев → Солнце</p>
                  <p className="text-foreground">Дева → Меркурий</p>
                  <p className="text-foreground">Весы → Венера</p>
                  <p className="text-foreground">Скорпион → Марс/Плутон</p>
                  <p className="text-foreground">Стрелец → Юпитер</p>
                  <p className="text-foreground">Козерог → Сатурн</p>
                  <p className="text-foreground">Водолей → Сатурн/Уран</p>
                  <p className="text-foreground">Рыбы → Юпитер/Нептун</p>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Шаг 4. Проверить планеты в самом 6-м доме</h3>
            <p className="mb-6 text-foreground">
              Посмотрите, есть ли в 6-м доме планеты. Если дом пустой - это не значит, что «ничего не будет». Тогда сильнее работает сам знак на куспиде и управитель 6-го дома.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Сигналы 6-го дома: как читать и что делать</h2>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">1. Знак на куспиде 6-го дома</h3>

            <Card className="my-6 border-primary/30">
              <CardContent className="p-6 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-accent">Огненный знак (Овен, Лев, Стрелец)</h4>
                  <p className="text-sm mb-2 text-foreground"><strong>Сигнал:</strong> вам трудно сидеть в рутине, нужен драйв и движение.</p>
                  <p className="text-sm mb-2 text-foreground"><strong>Смысл:</strong> часто выбираете активную работу, быстро загораетесь и так же быстро выгораете.</p>
                  <p className="text-sm text-muted-foreground"><strong>Действие:</strong> встроить короткие перезагрузки, спорт, смену задач.</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-accent">Земной знак (Телец, Дева, Козерог)</h4>
                  <p className="text-sm mb-2 text-foreground"><strong>Сигнал:</strong> вы хорошо держите режим, можете долго терпеть.</p>
                  <p className="text-sm mb-2 text-foreground"><strong>Смысл:</strong> риск превращения в «рабочую лошадь» и хроническое напряжение в теле.</p>
                  <p className="text-sm text-muted-foreground"><strong>Действие:</strong> заранее планировать отдых, учиться делегировать.</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-accent">Воздушный знак (Близнецы, Весы, Водолей)</h4>
                  <p className="text-sm mb-2 text-foreground"><strong>Сигнал:</strong> работа головой, много общения, нестабильный режим.</p>
                  <p className="text-sm mb-2 text-foreground"><strong>Смысл:</strong> много переписок, звонков, отвлечений.</p>
                  <p className="text-sm text-muted-foreground"><strong>Действие:</strong> списки дел, ограничения по экранному времени, четкие границы.</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-accent">Водный знак (Рак, Скорпион, Рыбы)</h4>
                  <p className="text-sm mb-2 text-foreground"><strong>Сигнал:</strong> сильная эмоциональная вовлеченность в работу и быт.</p>
                  <p className="text-sm mb-2 text-foreground"><strong>Смысл:</strong> настроения отражаются на самочувствии, склонность «жить для других».</p>
                  <p className="text-sm text-muted-foreground"><strong>Действие:</strong> эмоциональная гигиена: дневник, психотерапия, личные ритуалы.</p>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">2. Планеты в 6-м доме</h3>

            <div className="space-y-6 my-6">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-foreground">Марс в 6-м доме</h4>
                  <p className="text-sm mb-2 text-foreground"><strong>Сигнал:</strong> работа в высоком темпе, возможны конфликты с коллегами.</p>
                  <p className="text-sm mb-2 text-foreground"><strong>Риски:</strong> травмы из-за спешки, воспалительные процессы.</p>
                  <p className="text-sm text-muted-foreground"><strong>Действие:</strong> спорт в безопасном формате, работа над коммуникацией.</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-foreground">Сатурн в 6-м доме</h4>
                  <p className="text-sm mb-2 text-foreground"><strong>Сигнал:</strong> ощущение долга, тяжелые обязанности, строгий график.</p>
                  <p className="text-sm mb-2 text-foreground"><strong>Смысл:</strong> вас ценят как ответственного сотрудника, но вы чувствуете «надо терпеть».</p>
                  <p className="text-sm text-muted-foreground"><strong>Действие:</strong> структурировать нагрузку, следить за костно-мышечной системой.</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-foreground">Венера в 6-м доме</h4>
                  <p className="text-sm mb-2 text-foreground"><strong>Сигнал:</strong> желание комфорта на работе, теплых отношений в коллективе.</p>
                  <p className="text-sm mb-2 text-foreground"><strong>Риск:</strong> соглашаться на неудобный график ради «хороших отношений».</p>
                  <p className="text-sm text-muted-foreground"><strong>Действие:</strong> учиться говорить «нет».</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-foreground">Нептун в 6-м доме</h4>
                  <p className="text-sm mb-2 text-foreground"><strong>Сигнал:</strong> размытый режим, путаница в обязанностях.</p>
                  <p className="text-sm mb-2 text-foreground"><strong>Риск:</strong> забывчивость, ошибки, психосоматические истории.</p>
                  <p className="text-sm text-muted-foreground"><strong>Действие:</strong> максимальная конкретика: списки, будильники, дневник самочувствия.</p>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">3. Управитель 6-го дома и его аспекты</h3>

            <Card className="my-6 bg-destructive/10 border-destructive/30">
              <CardContent className="p-6">
                <p className="text-sm mb-3 text-foreground">
                  <strong>Напряженные аспекты с Сатурном, Плутоном, Марсом:</strong> работа и здоровье становятся зоной испытаний. Возможно давление на работе, переработки.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Действие:</strong> не ждать «идеального момента» - сразу беречь себя: режим сна, питание, профилактика.
                </p>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Риски 6-го дома и как их обходить</h2>

            <div className="space-y-6 my-8">
              <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-foreground">Выгорание</h4>
                  <p className="text-sm mb-2 text-foreground">
                    Чаще всего видно по сильному 6-му дому с Марсом или Сатурном, множеству напряженных аспектов.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Обход:</strong> включать в жизнь отдых как обязательный пункт, а не награду.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-foreground">Хроническое здоровье</h4>
                  <p className="text-sm mb-2 text-foreground">
                    6-й дом показывает, через что тело чаще всего реагирует на стресс.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Обход:</strong> использовать карту как подсказку, где быть внимательной и вовремя идти к специалистам.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-foreground">Роль «служебного человека»</h4>
                  <p className="text-sm mb-2 text-foreground">
                    При сильном 6-м доме легко застрять в позиции вечной помощницы.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Обход:</strong> четкие границы и честный вопрос: «Это действительно моя зона ответственности?»
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="my-8 bg-primary/10 border-primary">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-foreground">Рекомендации:</h4>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-foreground">
                  <li>Регулярно пересматривать свой рабочий режим по факту, а не по идеальной картинке</li>
                  <li>Отслеживать, где тело сигналит о перегрузе и не игнорировать это</li>
                  <li>Переводить «я должна» в «я выбираю» и отпускать лишние обязанности</li>
                </ol>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Миникейсы: как 6-й дом работает в жизни</h2>

            <div className="space-y-6 my-8">
              <Card className="border-accent/30">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-accent">Кейc 1. Мария, 34 года, сильный 6-й дом с Сатурном</h4>
                  <p className="text-sm mb-3 text-foreground">
                    У Марии 6-й дом в Козероге, в нем Сатурн и Марс. Она 10 лет работала в крупной компании, постоянно брала сверхурочные, закрывала чужие задачи. Итог: хроническая усталость, проблемы со спиной, бессонница.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    После разбора карты первым шагом стало: перестать брать дополнительные смены и официально оформить отпуск. Потом она сменила формат работы и передала часть задач коллегам. Самочувствие постепенно стабилизировалось.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/30">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-accent">Кейc 2. Анна, 29 лет, Нептун в 6-м доме</h4>
                  <p className="text-sm mb-3 text-foreground">
                    У Анны 6-й дом в Рыбах, в нем Нептун. Постоянно опаздывала, путала дедлайны, забывала про прием лекарств, а врачи не могли точно поставить диагноз.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Она ввела строгие напоминания в телефоне, разделила задачи по цветам и стала вести дневник самочувствия. Это помогло заметить связи и вместе с врачом подобрать более подходящее лечение и режим.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">6-й дом у женщин 25–44: типичные темы</h2>

            <ul className="list-disc pl-6 mb-6 space-y-3 text-foreground">
              <li><strong>Карьера и материнство.</strong> Как совместить работу и детей так, чтобы не разрушить здоровье.</li>
              <li><strong>Смена профессии.</strong> Если управитель 6-го дома включается в транзитах, часто тянет менять тип занятости.</li>
              <li><strong>Выгорание на работе.</strong> Напряженные аспекты могут проявляться как ощущение, что вы «вкалываете и не видите смысла».</li>
              <li><strong>Тело и возраст.</strong> После 30 лет организм меньше прощает недосып и работу без отдыха.</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Выводы</h2>

            <Card className="my-8 bg-secondary/20">
              <CardContent className="p-6">
                <ul className="space-y-3 text-sm text-foreground">
                  <li>✓ 6-й дом гороскопа отвечает за повседневную работу, здоровье, привычки и то, как вы справляетесь с нагрузкой.</li>
                  <li>✓ Чтобы его прочитать, важно знать знак на куспиде, управителя 6-го дома и планеты в самом доме.</li>
                  <li>✓ По 6-му дому видно, в каком ритме вам жить легче, а где вы себя ломаете и ускоряете выгорание.</li>
                  <li>✓ Риски 6-го дома связаны с хронической усталостью, психосоматикой и ролью «вечной помощницы».</li>
                  <li>✓ Натальная карта не заменяет врачей - она показывает, где быть особенно внимательной к себе.</li>
                </ul>
              </CardContent>
            </Card>

            <div className="my-12 text-center">
              <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Получите 3 моментальных отчёта бесплатно</h3>
                  <p className="text-muted-foreground mb-6">Начните с готовых мини-результатов за пару минут</p>
                  <Button 
                    size="lg" 
                    asChild
                    className="bg-primary hover:bg-primary/90"
                  >
                    <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                      Получить 3 отчёта
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">FAQ про 6-й дом гороскопа</h2>

            <Accordion type="single" collapsible className="w-full mb-12">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Как посчитать, где у меня 6-й дом гороскопа?
                </AccordionTrigger>
                <AccordionContent>
                  Постройте натальную карту в любом онлайн-сервисе по дате, времени и месту рождения. Найдите цифру «6» на внутреннем круге и посмотрите, какой знак стоит на границе дома. Это и будет ваш 6-й дом по знаку, а его управитель - планета, управляющая этим знаком.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Что значит, если 6-й дом пустой, без планет?
                </AccordionTrigger>
                <AccordionContent>
                  Пустой дом не означает, что темы работы и здоровья не важны. Это значит, что проявляться они будут более «по умолчанию» через знак на куспиде и управителя 6-го дома. Внимательно смотрите, в каком доме и знаке стоит управитель и какие аспекты получает - там будет основная история.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Как 6-й дом связан с физическим здоровьем и болезнями?
                </AccordionTrigger>
                <AccordionContent>
                  6-й дом показывает, как ваше тело реагирует на повседневный стресс, режим, питание, рабочие нагрузки. Он не ставит диагнозы, но подсказывает, где вы склонны перегружаться и какие темы важнее не игнорировать. При любых симптомах опираемся на медицину, а карту используем как доп. ориентир по образу жизни.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Как по 6-му дому увидеть риск выгорания?
                </AccordionTrigger>
                <AccordionContent>
                  Сигналами могут быть сильный 6-й дом с Марсом или Сатурном, множественные напряженные аспекты к управителю 6-го, особенно с Плутоном и Сатурном. Это не приговор, а напоминание: вам жизненно важен режим, границы и осознанное распределение нагрузки. Чем раньше вы это встроите, тем меньше шансов уйти в тотальное истощение.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  Что значит «сильный 6-й дом» у женщины?
                </AccordionTrigger>
                <AccordionContent>
                  Обычно это или несколько планет в 6-м доме, или управитель 6-го в угловом доме с аспектами к личным планетам. Часто такие женщины много работают, хорошо организованы и берут на себя ответственность. Важно, чтобы сила 6-го дома не превращалась в роль вечной «рабочей единицы» без личной жизни и отдыха.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ShestoyDomGoroskopa;