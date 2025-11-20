import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const SeventhHouse = () => {
  return (
    <>
      <Helmet>
        <title>7 дом в натальной карте: как он показывает отношения и разрывы | НейроДзен</title>
        <meta name="description" content="Что значит 7 дом в натальной карте для любви, брака и расставаний. Простое объяснение, как читать дом партнёрства и не загонять себя в судьбоносные страшилки." />
        <meta name="keywords" content="7 дом в натальной карте, седьмой дом отношения, седьмой дом разрыв, астрология 7 дом, 7 дом в гороскопе, дом партнёрства в натале, аспекты 7 дома, транзиты через 7 дом" />
        <link rel="canonical" href="https://aidzen.ru/7-dom-v-natalnoj-karte-otnosheniya-i-razryvy" />
        
        <meta property="og:title" content="7 дом в натальной карте: как он показывает отношения и разрывы" />
        <meta property="og:description" content="Что значит 7 дом в натальной карте для любви, брака и расставаний. Простое объяснение, как читать дом партнёрства и не загонять себя в судьбоносные страшилки." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://aidzen.ru/7-dom-v-natalnoj-karte-otnosheniya-i-razryvy" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="7 дом в натальной карте: как он показывает отношения и разрывы" />
        <meta name="twitter:description" content="Что значит 7 дом в натальной карте для любви, брака и расставаний. Простое объяснение, как читать дом партнёрства и не загонять себя в судьбоносные страшилки." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-primary/5">
        <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold">
                  Н
                </div>
                <span className="font-semibold text-foreground">НейроДзен</span>
              </Link>
              <div className="flex gap-4">
                <Link to="/blog">
                  <Button variant="ghost">Блог</Button>
                </Link>
                <Link to="/#services">
                  <Button variant="ghost">Расчёты</Button>
                </Link>
              </div>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <article>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">Астрология</Badge>
                <Badge variant="outline">10-12 минут</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                7 дом в натальной карте: отношения и разрывы
              </h1>
              <p className="text-muted-foreground text-lg">
                20 ноября, 2025
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                В астрологии 7 дом считается главным домом партнёрства. Через него видно, какие люди приходят к нам в близкие связи, почему отношения клеятся или разваливаются, и какие сценарии расставаний чаще всего повторяются. В этой статье разберём, как по шагам прочитать свой 7 дом, на что смотреть, если вы переживали болезненные разрывы, и как не загонять себя в фатализм.
              </p>

              <p className="mb-6">
                Вы сможете самостоятельно выделить ключевые сигналы в карте и перевести их в понятные действия: как строить диалог, как выбирать партнёров и какие риски по отношениям лучше учитывать заранее.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Что такое 7 дом и как он работает в жизни</h2>

              <p className="mb-4">
                Если 1 дом — это «я», то 7 дом — это «ты».
              </p>

              <p className="mb-4">Он описывает несколько важных тем:</p>

              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>брачные и длительные партнёрства</li>
                <li>серьёзные союзы один на один — деловые, клиентские, рабочие</li>
                <li>открытых оппонентов — конфликты, разводы, суды</li>
              </ul>

              <Card className="p-6 my-8 bg-primary/5 border-primary/20">
                <p className="font-semibold mb-2">Главный смысл 7 дома:</p>
                <p>как я встречаюсь с другим человеком на равных. Не про влюблённость как в 5 доме, а про договор, ожидания, ответственность.</p>
              </Card>

              <div className="bg-destructive/10 border-l-4 border-destructive p-6 my-8">
                <p className="font-semibold mb-2">Типичная ошибка.</p>
                <p>
                  Смотреть на 7 дом как на приговор вроде «У меня здесь Сатурн — значит, обречена на одиночество». На самом деле это не запрет, а стиль. Сатурн даёт серьёзное, ответственное отношение к браку, но может проявляться как поздний союз или высокие требования к партнёру.
                </p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Как по шагам прочитать свой 7 дом</h2>

              <p className="mb-6">
                Чтобы не утонуть в деталях, разберём понятный алгоритм из четырёх шагов.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Шаг 1. Найдите знак на куспиде 7 дома</h3>

              <p className="mb-4">
                Куспид 7 дома — это линия, противоположная асценденту. Часто она помечена как «Desc» или «DC».
              </p>

              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li>Постройте натальную карту на любом онлайн-сервисе по дате, времени и месту рождения.</li>
                <li>Найдите линию, которая стоит напротив асцендента. Посмотрите, в каком знаке она начинается.</li>
              </ol>

              <Card className="p-6 my-8 border-primary/30">
                <p className="font-semibold mb-3">Пример.</p>
                <p className="mb-2"><strong>Куспид 7 дома в Овне.</strong> Это уже сигнал.</p>
                <p className="mb-2"><strong>Смысл.</strong> В партнёрстве много темы инициативы, прямоты, иногда конфликтности. Притягиваются активные, волевые, иногда резкие партнёры.</p>
                <p><strong>Действие.</strong> Сразу учиться экологично выражать недовольство, не копить обиды и не играть в пассивную жертву возле сильного человека.</p>
              </Card>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Шаг 2. Определите управителя 7 дома</h3>

              <p className="mb-4">
                Каждый знак имеет планету-управителя. Она считается «главным представителем» вашего партнёрства.
              </p>

              <div className="bg-muted/30 p-6 rounded-lg my-6">
                <p className="font-semibold mb-4">Простая таблица для ориентира:</p>
                <ul className="space-y-2">
                  <li>• Овен → Марс</li>
                  <li>• Телец и Весы → Венера</li>
                  <li>• Близнецы и Дева → Меркурий</li>
                  <li>• Рак → Луна</li>
                  <li>• Лев → Солнце</li>
                  <li>• Скорпион → Плутон, дополнительно Марс</li>
                  <li>• Стрелец → Юпитер</li>
                  <li>• Козерог → Сатурн</li>
                  <li>• Водолей → Уран, дополнительно Сатурн</li>
                  <li>• Рыбы → Нептун, дополнительно Юпитер</li>
                </ul>
              </div>

              <p className="mb-4">Шаги:</p>

              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li>Смотрите знак на куспиде 7 дома.</li>
                <li>Определяете его управителя по списку.</li>
                <li>Находите в карте, в каком доме и знаке стоит этот управитель и какие получает аспекты.</li>
              </ol>

              <p className="mb-6">
                Управитель показывает: где и через что вы чаще всего входите в отношения и где в итоге «болит» при разрывах.
              </p>

              <Card className="p-6 my-8 border-primary/30">
                <p className="font-semibold mb-3">Пример.</p>
                <p className="mb-2">7 дом в Близнецах. Управитель — Меркурий.</p>
                <p className="mb-2">Меркурий стоит в 11 доме, в аспекте с Ураном.</p>
                <p className="mb-2"><strong>Сигнал.</strong> Связи часто начинаются через друзей, интернет, общение. Могут быть внезапные знакомства и такие же внезапные разрывы.</p>
                <p className="mb-2"><strong>Смысл.</strong> Партнёрства строятся на общих взглядах, интересах, дружбе. При потере общих тем или свободы связь рушится.</p>
                <p><strong>Действие.</strong> Важно поддерживать живое общение, не застревать в быту, давать друг другу пространство для роста и новых впечатлений.</p>
              </Card>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Шаг 3. Посмотрите планеты в 7 доме</h3>

              <p className="mb-6">
                Планеты в 7 доме усиливают тему отношений и добавляют конкретные сценарии.
              </p>

              <p className="mb-4">Коротко по основным:</p>

              <div className="space-y-4 mb-8">
                <div className="bg-muted/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Солнце в 7 доме</p>
                  <p>нужен сильный партнёр, отражающий ваше «я». Риск — раствориться в его целях.</p>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Луна</p>
                  <p>эмоциональная зависимость, потребность в заботе, семья через партнёрство. Риск — обид и детских сценариев в ссорах.</p>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Венера</p>
                  <p>романтика, стремление к гармонии, часто несколько значимых союзов. Риск — идеализировать партнёра и уходить из реальности в «красивую картинку».</p>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Марс</p>
                  <p>напряжение и страсть, отношения как борьба и секс. Риск — конфликтных разрывов и импульсивных решений.</p>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Сатурн</p>
                  <p>серьёзность, долг, страхи «я никому не нужна». Риск — затянутых, но выматывающих союзов или долгого одиночества из-за завышенной планки.</p>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Уран</p>
                  <p>потребность в свободе. Риск — неожиданных разрывов и резких поворотов сюжета.</p>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Нептун</p>
                  <p>идеализация, кармическое ощущение «я его/ее уже где-то знала». Риск — разочарований, треугольников и самообмана.</p>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Плутон</p>
                  <p>очень сильная зависимость, трансформации через отношения. Риск — болезненных разрывов, когда обоих «ломает» и тянет обратно.</p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Шаг 4. Учтите аспекты к управителю и планетам 7 дома</h3>

              <p className="mb-4">
                Здесь мы уже смотрим, с чем «связаны» ваши отношения в карте:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>гармоничные аспекты с Венерой, Юпитером, Солнцем — упрощают построение союза</li>
                <li>напряжённые аспекты от Урана, Плутона, Сатурна — часто говорят о кризисах, разрывах, задержках</li>
              </ul>

              <Card className="p-6 my-8 bg-accent/10 border-accent/30">
                <p className="font-semibold mb-3">Мини-формула.</p>
                <p className="mb-2">Напряжённый аспект управителя 7 дома с Ураном:</p>
                <p className="mb-2"><strong>Сигнал.</strong> Тема свободы, резких перемен, неожиданностей в отношениях.</p>
                <p className="mb-2"><strong>Смысл.</strong> Партнёрства не терпят рутины, контроля и жёстких рамок.</p>
                <p><strong>Действие.</strong> Строить союз, где допускается личное пространство, отдельные интересы и живое обновление формата отношений.</p>
              </Card>

              <div className="bg-primary/10 border-l-4 border-primary p-6 my-8">
                <p className="font-semibold mb-2">Рекомендации:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Не выдёргивайте один фактор, оценивайте 7 дом в связке: знак → управитель → планеты → аспекты.</li>
                  <li>Все «сложные» показатели переводите в конкретные навыки, а не в страхи.</li>
                  <li>Сравнивайте карту не с идеалом, а с реальными сценариями из своей жизни.</li>
                </ol>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">7 дом и сценарии отношений: как это проявляется</h2>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Сатурн и тема «позднего» или тяжёлого брака</h3>

              <p className="mb-4">
                <strong>Сигнал.</strong> Сатурн в 7 доме или в напряжённом аспекте к управителю 7.
              </p>

              <p className="mb-4">
                <strong>Смысл.</strong> Отношения воспринимаются как ответственность. Человек может бояться ошибиться, тянуть с официальным оформлением, долго «примеряться» к партнёру.
              </p>

              <p className="mb-4">
                <strong>Действие.</strong> Осознанно учиться проговаривать ожидания, не тянуть с решениями годами, работать с внутренним критиком, который говорит «я недостаточно хороша для нормального союза».
              </p>

              <p className="mb-4">
                <strong>Риск.</strong> Оставаться в тяжёлом союзе «ради долга», терпя разрушение самооценки.
              </p>

              <p className="mb-6">
                <strong>Как обойти.</strong> Отдельно для себя прописать границы того, что для вас недопустимо, и не оправдывать насилие или унижение «кармическим браком».
              </p>

              <Card className="p-6 my-8 bg-muted/30">
                <p className="font-semibold mb-3">Миникейс.</p>
                <p>
                  Женщина, 38 лет, Сатурн в 7 доме. Первый брак в 24 закончился быстрым разводом, потому что пошла «по инерции» и скорее из чувства долга. Второй раз замуж вышла в 34, уже после осознанной работы с темой границ. Итог: Сатурн сработал как «мало, но качественно», а не как «никогда».
                </p>
              </Card>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Уран и неожиданные разрывы</h3>

              <p className="mb-4">
                <strong>Сигнал.</strong> Уран в 7 доме или в сильном аспекте к управителю 7.
              </p>

              <p className="mb-4">
                <strong>Смысл.</strong> В отношениях много темы свободы, нестандартности, иногда дистанции. Партнёр может часто менять планы, работу, место жительства.
              </p>

              <p className="mb-4">
                <strong>Действие.</strong> Признать, что вам нужен не «идеально стабильный», а живой, меняющийся союз. Придумать свои правила безопасности — свободные рамки, но честность и договорённости на берегу.
              </p>

              <p className="mb-4">
                <strong>Риск.</strong> Жить в постоянном ощущении, что всё вот-вот рухнет, и из-за этого ускорять разрыв самой.
              </p>

              <p className="mb-6">
                <strong>Как обойти.</strong> Не принимать каждый кризис как конец, а использовать для перезагрузки формата отношений. Например, разъехаться на время, но не рвать окончательно.
              </p>

              <Card className="p-6 my-8 bg-muted/30">
                <p className="font-semibold mb-3">Миникейс.</p>
                <p>
                  Женщина, 32 года, Уран в 7 доме. В трёх первых отношениях инициатором разрыва была она, устала от ощущения «меня душат». Когда поняла, что ей нужен формат с большей свободой, а не «классический брак», смогла построить союз, где у каждого свой график, свои проекты и путешествия, но есть общая база.
                </p>
              </Card>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Нептун и болезненные иллюзии</h3>

              <p className="mb-4">
                <strong>Сигнал.</strong> Нептун в 7 доме или сильный аспект к Венере и управителю 7.
              </p>

              <p className="mb-4">
                <strong>Смысл.</strong> Склонность идеализировать партнёра, видеть в нём спасителя, жить в мечте. Часто тема треугольников, тайных связей, «невозможной любви».
              </p>

              <p className="mb-4">
                <strong>Действие.</strong> Проверять слова делами, не строить отношения на фантазии «он изменится», фиксировать фактами, что человек реально делает для союза.
              </p>

              <p className="mb-4">
                <strong>Риск.</strong> Затяжные истории «ни вместе, ни врозь», где вас держат на ожидании.
              </p>

              <p className="mb-6">
                <strong>Как обойти.</strong> Ставить себе сроки, после которых вы прекращаете «ждать, пока он решит» и уходите из туманных сценариев.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Что в натальной карте намекает на разрывы</h2>

              <div className="bg-accent/10 border-l-4 border-accent p-6 my-8">
                <p className="font-semibold mb-2">Важно.</p>
                <p>Ни один показатель сам по себе не гарантирует расставание. Он лишь показывает, где чаще всего возникают кризисы и что их запускает.</p>
              </div>

              <p className="mb-4 font-semibold">Частые сигналы:</p>

              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Напряжённые аспекты к управителю 7 дома от Урана, Плутона, Сатурна.</li>
                <li>Планеты в 7 доме в напряжённых аспектах к Марсу, Плутону, Урану.</li>
                <li>Повторяющаяся тема свободы, контроля или зависимости в нескольких показателях сразу.</li>
              </ul>

              <p className="mb-6">
                Разберём в формате «сигнал → смысл → действие».
              </p>

              <div className="space-y-6 mb-8">
                <Card className="p-6 border-primary/30">
                  <p className="mb-2"><strong>Сигнал.</strong> Управитель 7 дома в соединении с Плутоном.</p>
                  <p className="mb-2"><strong>Смысл.</strong> Отношения по принципу «всё или ничего», склонность к зависимости, борьбе за власть, драмам. Разрыв часто ощущается как «меня половину оторвали».</p>
                  <p><strong>Действие.</strong> С самого начала отслеживать, где вы уже перестаёте быть собой ради союза. Учиться выходить из созависимости не через взрыв, а по шагам: терапия, поддержка, план выхода.</p>
                </Card>

                <Card className="p-6 border-primary/30">
                  <p className="mb-2"><strong>Сигнал.</strong> Управитель 7 дома в аспекте с Ураном плюс Уран транзитом идёт по 7 дому.</p>
                  <p className="mb-2"><strong>Смысл.</strong> Период, когда тема свободы обостряется, старый формат союза может не выдерживать.</p>
                  <p><strong>Действие.</strong> Заранее обсуждать с партнёром возможные изменения — переезды, смену формата, разделение быта. Не делать резких шагов «сгоряча», дать себе время на тест нового формата.</p>
                </Card>

                <Card className="p-6 border-primary/30">
                  <p className="mb-2"><strong>Сигнал.</strong> Сатурн делает напряжённый аспект к управителю 7 дома транзитом.</p>
                  <p className="mb-2"><strong>Смысл.</strong> Проверка отношений на зрелость. Всё, что держалось на иллюзиях и привычке, может треснуть.</p>
                  <p><strong>Действие.</strong> Вместо «значит, нам не судьба» честно смотреть: можно ли перераспределить обязанности, выстроить границы, договориться заново. Разрыв, если он происходит, часто освобождает от давно назревшей тяжести.</p>
                </Card>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Основные риски по 7 дому и как их обойти</h2>

              <div className="space-y-6 mb-8">
                <div className="bg-muted/20 p-6 rounded-lg">
                  <p className="font-semibold mb-2">Фатализм.</p>
                  <p>
                    «У меня Уран в 7 доме, значит, никогда не будет стабильных отношений». На практике это чаще про форму союза и ваши потребности, а не запрет. Можно выстроить стабильный союз, если дать место свободе.
                  </p>
                </div>

                <div className="bg-muted/20 p-6 rounded-lg">
                  <p className="font-semibold mb-2">Игнорирование своих границ.</p>
                  <p>
                    Люди с сильным Нептуном или Плутоном в 7 доме часто терпят слишком долго, оправдывая партнёра «кармой» или «особой связью». Здесь важно помнить, что никакая карта не отменяет базовую безопасность и уважение.
                  </p>
                </div>

                <div className="bg-muted/20 p-6 rounded-lg">
                  <p className="font-semibold mb-2">Повторение сценариев семьи.</p>
                  <p>
                    Управитель 7 дома, связанный с 4 домом, часто показывает, что мы воссоздаём сценарий родительских отношений. Это риск бегать по кругу «как у мамы», если не осознавать, что именно повторяется.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Выводы</h2>

              <ul className="list-disc pl-6 mb-8 space-y-3">
                <li>7 дом показывает не только «будет брак или нет», а весь стиль ваших серьёзных партнёрств и сценарии расставаний.</li>
                <li>Чтобы понять 7 дом, важно смотреть связку: знак на куспиде, управитель, планеты внутри и аспекты к ним.</li>
                <li>«Сложные» планеты в 7 доме и напряжённые аспекты — не приговор, а подсказка, какие навыки в отношениях вам особенно важны.</li>
                <li>Разрывы чаще происходят, когда потенциал 7 дома проживается в тени — через страхи, контроль, зависимость, а не через осознанные договорённости.</li>
                <li>Транзиты к управителю 7 дома и планетам в нём показывают периоды кризисов и решений, но ваш выбор, расстаться или перестроить союз, всегда остаётся за вами.</li>
              </ul>

              <Card className="p-8 my-12 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                <h3 className="text-2xl font-bold mb-4">Получите 3 моментальных отчёта бесплатно</h3>
                <p className="mb-6 text-muted-foreground">
                  Начните с готовых результатов за пару минут
                </p>
                <Link to="/#services">
                  <Button size="lg" className="w-full sm:w-auto">
                    Получить 3 отчёта
                  </Button>
                </Link>
              </Card>

              <h2 className="text-3xl font-bold mt-12 mb-6">FAQ по 7 дому: как считать и как не загонять себя в страхи</h2>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq1">
                  <AccordionTrigger className="text-left">
                    Как узнать, в каком знаке мой 7 дом и кто его управитель?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Постройте натальную карту по точным дате, времени и месту рождения. Найдите линию Desc или 7 дом — напротив асцендента и посмотрите, в каком она знаке. Затем определите планету-управителя этого знака и найдите её положение по дому и аспектам.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq2">
                  <AccordionTrigger className="text-left">
                    Что значит, если 7 дом пустой, без планет — это плохо для отношений?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Пустой 7 дом не значит отсутствие брака. Это показывает, что тема отношений не занимает всю вашу жизнь, а проживается через управителя 7 дома. Важно внимательно смотреть, где стоит эта планета и с чем связана — так вы поймёте, через какие сферы приходят партнёры и где возможны кризисы.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq3">
                  <AccordionTrigger className="text-left">
                    Как по 7 дому понять, почему у меня повторяются похожие разрывы?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Сравните несколько своих историй и посмотрите, что было общим в момент расставаний: тема свободы, ревности, долгов, бытового давления. Затем найдите в карте показатели, которые с этим связаны — управитель 7 дома, его аспекты, транзиты к ним. Это поможет увидеть, какую одну и ту же задачу 7 дом снова ставит перед вами и что можно изменить в своём поведении.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq4">
                  <AccordionTrigger className="text-left">
                    Может ли сложный 7 дом означать, что мне лучше не вступать в отношения вообще?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Нет. Сложный 7 дом означает, что отношения — это ваша зона роста, а не то, от чего надо отказаться. Там, где карта показывает напряжение, обычно скрыт большой потенциал для зрелости, силы и глубины. Ваша задача — не избегать связей, а учиться строить их по-взрослому, учитывая свои слабые места.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq5">
                  <AccordionTrigger className="text-left">
                    Как учитывать риски по 7 дому, чтобы не притянуть разрыв «по карте»?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Не надо ждать беды. Переведите риски в конкретные действия. Например, при Уране в 7 доме заранее договаривайтесь о свободе и честности, при Сатурне — распределяйте ответственность и не тащите всё на себе, при Нептуне — проверяйте фактами, а не фантазиями. Тогда карта станет не прогнозом разрыва, а инструкцией по его профилактике.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </article>

          <div className="mt-16 pt-8 border-t border-border/40">
            <Link to="/blog">
              <Button variant="outline" className="mb-8">
                ← Вернуться в блог
              </Button>
            </Link>
          </div>
        </main>

        <footer className="border-t border-border/40 mt-20 py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2025 НейроДзен. Все права защищены.
              </p>
              <div className="flex gap-6">
                <Link to="/dataprocessingpolicy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Политика обработки данных
                </Link>
                <Link to="/publicoffer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Публичная оферта
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SeventhHouse;