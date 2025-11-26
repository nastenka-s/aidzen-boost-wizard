import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Smartphone, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "@/assets/logo.png";

const TalentsInHoroscope = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Таланты в гороскопе: технарь или гуманитарий | НейроДзен</title>
        <meta name="description" content="Как по натальной карте понять, к чему есть врождённые таланты. Разбираем, где в гороскопе видно, технарь вы или гуманитарий, как считать стихии и положения Меркурия и не ошибиться с выбором дела." />
        <meta name="keywords" content="технарь или гуманитарий по гороскопу, таланты в гороскопе, гороскоп профессии технарь гуманитарий, астрология и выбор профессии, стихии в натальной карте, меркурий в гороскопе, как узнать склонности по гороскопу, технарь или гуманитарий по дате рождения" />
        <link rel="canonical" href="https://aidzen.ru/talanty-v-goroskope-tehnar-ili-gumanitarij" />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="НейроДзен" className="w-10 h-10" />
            <span className="text-lg font-semibold tracking-tight">НЕЙРОДЗЕН</span>
          </Link>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
              <Link to="/#pricing">ЦЕНЫ</Link>
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
              <a href="https://aidzen.app" target="_blank" rel="noopener noreferrer">ВХОД</a>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
              <a href="https://t.me/Neurodzenaibot" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Telegram Бот</span>
              </a>
            </Button>
            <Button size="sm" variant="outline" className="border-primary/30" asChild>
              <a href="https://aidzen.app" target="_blank" rel="noopener noreferrer">
                <Smartphone className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">RuStore</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Вернуться к блогу
        </Link>

        <div className="space-y-8">
          <div className="space-y-4">
            <Badge variant="outline" className="border-primary/30 text-primary font-medium">
              Астрология профессии
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Таланты в гороскопе: технарь или гуманитарий
            </h1>
            <p className="text-muted-foreground">17 ноября, 2025 • 9 мин чтения</p>
          </div>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <p className="text-lg leading-relaxed">
              По гороскопу можно довольно чётко увидеть, к чему человеку проще: к формулам и схемам или к словам и смыслам. В этой статье разберём, где в натальной карте искать ответ на вопрос "технарь или гуманитарий", как это посчитать по шагам и каких ошибок важно не допустить, чтобы не сломать себе или ребёнку профессиональный путь.
            </p>
          </Card>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Что в астрологии значит "технарь" и "гуманитарий"</h2>
              <Card className="p-6 bg-card/30 border-border/50">
                <p className="leading-relaxed mb-4">
                  В жизни мы называем технарём того, кто легче схватывает логику, цифры, систему, работает с устройствами и структурами. Гуманитарий же мыслит через истории, людей, смыслы, образы, тексты.
                </p>
                <p className="leading-relaxed mb-4">
                  В астрологии это отражается так:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">технарский тип:</strong> сильная логика, структурность, внимание к деталям, интерес к системам и механизмам;</li>
                  <li><strong className="text-foreground">гуманитарный тип:</strong> чувствительность к словам и людям, метафоричное мышление, воображение, интерес к темам отношений, творчества, психологии, языков.</li>
                </ul>
                <p className="leading-relaxed mt-4 text-sm text-muted-foreground italic">
                  Важно: в чистом виде тип встречается редко. Гораздо чаще карта показывает "смесь", когда технические навыки нужны для реализации гуманитарной темы, и наоборот. Наша задача не повесить ярлык, а увидеть сильные полюса.
                </p>
              </Card>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Основные точки в гороскопе, которые смотрим</h2>
              <Card className="p-6 bg-card/30 border-border/50">
                <p className="leading-relaxed mb-4">
                  Чтобы оценить, технарь вы или гуманитарий, достаточно базового набора:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Стихии в карте: Огонь, Земля, Воздух, Вода.</li>
                  <li>Положение и аспекты Меркурия.</li>
                  <li>Дома знаний и работы: 3, 6, 9, 10.</li>
                  <li>Общий "сюжет" карты: какие сферы реально тянут.</li>
                </ol>
              </Card>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Шаг 1. Стихии: где больше всего энергии</h2>
              <Card className="p-6 bg-card/30 border-border/50 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Как посчитать стихии в натальной карте</h3>
                  <p className="leading-relaxed mb-4">
                    Берём основные точки карты:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                    <li>Солнце</li>
                    <li>Луна</li>
                    <li>Асцендент</li>
                    <li>Меркурий</li>
                    <li>Венера</li>
                    <li>Марс</li>
                    <li>МС (куспид 10 дома)</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    У каждой точки есть знак. Знак принадлежит стихии:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong className="text-foreground">Огонь:</strong> Овен, Лев, Стрелец</li>
                    <li><strong className="text-foreground">Земля:</strong> Телец, Дева, Козерог</li>
                    <li><strong className="text-foreground">Воздух:</strong> Близнецы, Весы, Водолей</li>
                    <li><strong className="text-foreground">Вода:</strong> Рак, Скорпион, Рыбы</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Для каждой стихии считаем, сколько раз она повторяется.
                  </p>
                  <div className="bg-primary/10 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium">
                      Формула простая: Количество планет и углов в стихии = сила этой стихии в карте.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Как стихии подсказывают тип</h3>
                  <p className="leading-relaxed mb-4">
                    Очень грубое, но рабочее правило:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong className="text-foreground">много Земли и Воздуха:</strong> чаще технарские склонности</li>
                    <li><strong className="text-foreground">много Огня и Воды:</strong> чаще гуманитарные наклонности, творчество, работа с людьми</li>
                    <li><strong className="text-foreground">баланс Земля + Вода:</strong> интерес к помогающим профессиям, психологии, медицине, но с практическим уклоном</li>
                    <li><strong className="text-foreground">переизбыток одной стихии:</strong> риск профессиональных перекосов</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6 bg-primary/5 border-primary/30">
                <h3 className="text-lg font-semibold mb-3">Рекомендации</h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Сначала посчитайте стихии по ключевым точкам;</li>
                  <li>Выпишите 2 самые сильные стихии и сопоставьте с вашим опытом;</li>
                  <li>Не делайте вывод только по Солнцу, смотрите всю картину.</li>
                </ol>
              </Card>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Шаг 2. Меркурий как главный маркер мышления</h2>
              <Card className="p-6 bg-card/30 border-border/50">
                <p className="leading-relaxed mb-6">
                  Меркурий в карте отвечает за то, как вы думаете, обучаетесь и обрабатываете информацию. Это ключевой показатель, технарь вы или гуманитарий.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Технарский Меркурий</h3>
                    <p className="leading-relaxed mb-4">
                      Чаще всего технарские наклонности проявляются, когда:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                      <li>Меркурий в знаках Земли (Телец, Дева, Козерог) или Воздуха (Близнецы, Весы, Водолей);</li>
                      <li>есть гармоничные аспекты к Сатурну (структура, дисциплина) или Урану (техника, технологии);</li>
                      <li>Меркурий расположен в 6 или 10 доме, особенно в земных знаках.</li>
                    </ul>
                    <div className="bg-secondary/30 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">Сигнал → смысл → действие:</p>
                      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                        <li><strong className="text-foreground">Сигнал:</strong> Меркурий в Деве в тригоне к Сатурну.</li>
                        <li><strong className="text-foreground">Смысл:</strong> мышление точное, структурное, устойчивое, хорошо для аналитики, учёта, инженерии, программирования.</li>
                        <li><strong className="text-foreground">Действие:</strong> выбирать обучение и работу, где ценится системность и внимательность: аналитика, финансы, инженерные специальности, техподдержка, IT.</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Гуманитарный Меркурий</h3>
                    <p className="leading-relaxed mb-4">
                      Гуманитарные таланты часто видны, когда:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                      <li>Меркурий в знаках Воды (Рак, Скорпион, Рыбы) или Огня (Овен, Лев, Стрелец);</li>
                      <li>есть аспекты с Луной или Нептуном (образность, воображение, эмпатия);</li>
                      <li>Меркурий в 3, 5, 9 доме, особенно в водных или огненных знаках.</li>
                    </ul>
                    <div className="bg-secondary/30 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">Сигнал → смысл → действие:</p>
                      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                        <li><strong className="text-foreground">Сигнал:</strong> Меркурий в Рыбах в аспекте к Луне.</li>
                        <li><strong className="text-foreground">Смысл:</strong> мышление образное, интуитивное, сильное воображение, чувствительность к настроениям и подтекстам.</li>
                        <li><strong className="text-foreground">Действие:</strong> развивать навыки письма, работы с людьми, психологии, языков, творчества, вместо того чтобы ломать себя через сухую математику.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Шаг 3. Дома знаний и профессии</h2>
              <Card className="p-6 bg-card/30 border-border/50">
                <p className="leading-relaxed mb-6">
                  Даже если по стихиям и Меркурию всё ясно, важно проверить, куда это на самом деле встроено в жизнь. За это отвечают дома.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">3 дом: базовое обучение и навыки</h3>
                    <p className="leading-relaxed mb-4">
                      3 дом показывает, как вы учитесь в школе, как усваиваете информацию, какой стиль обучения комфортнее.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Планеты и знак на куспиде 3 дома подсказывают, что легче: точные науки или языки, общение, гуманитарные предметы.</li>
                      <li>Земные и воздушные акценты в 3 доме поддерживают технарский подход.</li>
                      <li>Водные и огненные акценты усиливают гуманитарную, творческую составляющую.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">9 дом: высшее образование и мировоззрение</h3>
                    <p className="leading-relaxed mb-4">
                      9 дом связан с вузом, расширением кругозора, сложными знаниями.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Сильный 9 дом в знаках Земли и Воздуха: юриспруденция, точные науки, прикладные направления, преподавание структурных знаний.</li>
                      <li>Сильный 9 дом в Воде и Огне: филология, журналистика, психология, международные отношения, творчество, духовные практики.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">6 и 10 дом: повседневная работа и карьерный вектор</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                      <li>6 дом показывает стиль ежедневной работы, чем вы реально занимаетесь по факту.</li>
                      <li>10 дом и его управитель показывают долгосрочные амбиции и "тему профессии".</li>
                    </ul>
                    <p className="leading-relaxed mb-2">
                      Если:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>6 и 10 дома под управлением земных или воздушных знаков, с участием Сатурна, Меркурия, Урана: склонность к практичным, техническим, управленческим сферам.</li>
                      <li>Там много водных и огненных показателей, плюс Луна, Венера, Нептун: профессии про людей, творчество, помощь, коммуникации.</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Как это выглядит в жизни: два миникейса</h2>
              
              <Card className="p-6 bg-card/30 border-border/50">
                <h3 className="text-xl font-semibold mb-3">Кейс 1. "Бухгалтер-гуманитарий"</h3>
                <p className="leading-relaxed mb-4">
                  Женщина 38 лет. Много земных знаков: Солнце в Деве, Асцендент в Козероге, Марс в Тельце. По логике, технарь. Пошла в бухгалтерию, отработала 10 лет и выгорела.
                </p>
                <p className="leading-relaxed mb-4 font-medium">
                  Что показывает карта глубже:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li>Меркурий в Рыбах в 3 доме, в аспекте к Луне.</li>
                  <li>10 дом в Близнецах, управитель Меркурий в водном знаке.</li>
                  <li>Сильный 3 и 9 дома, интерес к словам и историям.</li>
                </ul>
                <p className="leading-relaxed text-sm italic text-muted-foreground">
                  Смысл: структура есть, но мышление мягкое, образное, человеку тесно в строгих регламентах. В итоге она ушла в редактуру и работу с текстами, где земная часть отвечает за дисциплину, а Меркурий в Рыбах даёт глубину и эмпатию. Технарские навыки остались, но работают внутри гуманитарной профессии.
                </p>
              </Card>

              <Card className="p-6 bg-card/30 border-border/50">
                <h3 className="text-xl font-semibold mb-3">Кейс 2. "Гуманитарий в аналитике"</h3>
                <p className="leading-relaxed mb-4">
                  Парень 19 лет. В школе любил литературу и историю, мечтал о филфаке, считал себя "чистым гуманитарием".
                </p>
                <p className="leading-relaxed mb-4 font-medium">
                  Карта:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li>Много Огня и Воздуха, Меркурий в Водолее.</li>
                  <li>3 дом в Деве, 6 дом в Козероге.</li>
                  <li>Управитель 10 дома в земном знаке с аспектом к Урану.</li>
                </ul>
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed mb-2"><strong>Сигнал:</strong> Меркурий в Водолее плюс сильная Земля в рабочих домах.</p>
                  <p className="text-sm leading-relaxed mb-2"><strong>Смысл:</strong> нестандартное мышление плюс способность к аналитике и работе с данными.</p>
                  <p className="text-sm leading-relaxed"><strong>Действие:</strong> он пошёл на направление "маркетинг и аналитика", сочетая творческое видение с цифрами. В итоге "гуманитарий" реализовался в профессии, где много техники и аналитики.</p>
                </div>
              </Card>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Основные риски и как их обойти</h2>
              
              <Card className="p-6 bg-card/30 border-border/50">
                <h3 className="text-xl font-semibold mb-3">Риск 1. Делать вывод только по знаку Солнца</h3>
                <p className="leading-relaxed mb-4">
                  "Я Лев, значит, я гуманитарий" или "я Дева, значит технарь" - так не работает. Солнце показывает ядро личности, но не всю структуру мышления и профессиональные задачи.
                </p>
                <p className="leading-relaxed font-medium mb-2">Как обойти:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>всегда смотрите минимум: стихии по ключевым точкам + Меркурий + 10 дом;</li>
                  <li>не ставьте окончательный диагноз "технарь/гуманитарий" по одному показателю.</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card/30 border-border/50">
                <h3 className="text-xl font-semibold mb-3">Риск 2. Игнорировать реальные интересы и опыт</h3>
                <p className="leading-relaxed mb-4">
                  Иногда карта показывает технарский потенциал, а человек искренне ненавидит математику. Или наоборот: всё говорит о гуманитарном типе, а вам нравятся схемы и устройства.
                </p>
                <p className="leading-relaxed font-medium mb-2">Как обойти:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>воспринимайте карту как подсказку, а не приговор;</li>
                  <li>сравнивайте астрологический анализ с вашим реальным опытом: где вы чувствуете лёгкость и интерес, а где постоянное насилие над собой.</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card/30 border-border/50">
                <h3 className="text-xl font-semibold mb-3">Риск 3. Навешивать ярлык ребёнку слишком рано</h3>
                <p className="leading-relaxed mb-4">
                  Фраза "ты у нас технарь, не лезь в рисование" легко обрубает важную часть личности. И наоборот, "наш ребёнок гуманитарий, не мучайте его математикой" может закрыть дорогу к карьере в IT или аналитике.
                </p>
                <p className="leading-relaxed font-medium mb-2">Как обойти:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>используйте карту ребёнка, чтобы расширить возможности, а не сузить;</li>
                  <li>давайте попробовать разные форматы: и творческие, и логические, и технические кружки;</li>
                  <li>смотрите, где ребёнок оживает, а не только где "должен".</li>
                </ul>
              </Card>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Как сложить всё вместе: мини-чеклист</h2>
              <Card className="p-6 bg-primary/5 border-primary/30">
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                  <li>Посчитайте стихии по ключевым точкам: Солнце, Луна, Асцендент, Меркурий, Венера, Марс, МС.</li>
                  <li>Определите, какие 2 стихии самые сильные.</li>
                  <li>Посмотрите знак и дом Меркурия, его основные аспекты.</li>
                  <li>Оцените 3, 6, 9 и 10 дом: знаки, планеты, управители.</li>
                  <li>Сопоставьте это с реальными интересами, школьным опытом, тем, за что вас чаще всего хвалят.</li>
                  <li>Сформулируйте для себя не "я технарь/гуманитарий", а "мне легче вот такой формат задач".</li>
                </ol>
                <div className="bg-secondary/30 p-4 rounded-lg mt-6">
                  <p className="text-sm font-medium mb-2">Пример итоговой формулировки:</p>
                  <p className="text-sm italic">
                    "У меня сильные Земля и Воздух, Меркурий в Деве, 10 дом в Козероге. Мне проще задачи, где нужно анализировать, структурировать и доводить до результата. Это больше технарский тип с возможностью уйти в управленческую или аналитическую деятельность".
                  </p>
                </div>
              </Card>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Выводы</h2>
              <Card className="p-6 bg-card/30 border-border/50">
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                  <li>Деление на "технаря" и "гуманитария" в астрологии связано не с одним знаком, а с комбинацией стихий, Меркурия и домов, связанных с обучением и профессией.</li>
                  <li>Сильная Земля и Воздух при подчёркнутом Меркурии обычно дают технарский, аналитический тип мышления, а Вода и Огонь с акцентом на Луне, Венере, Нептуне усиливают гуманитарные и творческие таланты.</li>
                  <li>Меркурий показывает стиль мышления, 3 и 9 дома - формат обучения, а 6 и 10 дома - где это реально реализуется в работе.</li>
                  <li>Главное в работе с гороскопом не повесить жёсткий ярлык, а увидеть, где человеку легче, а где он постоянно ломает себя.</li>
                  <li>Карта помогает расширить выбор и подобрать "свою" профессию, но решение всегда за вами и вашим реальным опытом.</li>
                </ol>
              </Card>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">FAQ</h2>
              <div className="space-y-4">
                <Card className="p-6 bg-card/30 border-border/50">
                  <h3 className="text-lg font-semibold mb-3">Как по одной только дате рождения понять, технарь я или гуманитарий?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    По одной дате можно увидеть только знак Солнца, этого мало. Нужно строить натальную карту с временем и местом рождения и уже в ней смотреть стихии, Меркурий и дома, связанные с обучением и профессией. Без этого вывод будет слишком грубым и часто ошибочным.
                  </p>
                </Card>

                <Card className="p-6 bg-card/30 border-border/50">
                  <h3 className="text-lg font-semibold mb-3">На какие показатели в гороскопе сначала смотреть, если я совсем новичок?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Начните со стихий по основным точкам: Солнце, Луна, Асцендент, Меркурий, Марс. Потом посмотрите знак Меркурия и в каком он доме. Уже этого хватит, чтобы понять, к какому типу мышления вы ближе, а детальные дома можно добавить постепенно.
                  </p>
                </Card>

                <Card className="p-6 bg-card/30 border-border/50">
                  <h3 className="text-lg font-semibold mb-3">Что значит, если карта показывает смесь технаря и гуманитария?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Это не проблема, а ресурс. Обычно такие люди хорошо чувствуют и людей, и систему: из них получаются сильные менеджеры, аналитики в гуманитарных сферах, специалисты по продукту, маркетологи, психологи, работающие с тестами и методиками. Важно искать профессии, где обе части могут работать вместе, а не выбирать "или - или".
                  </p>
                </Card>

                <Card className="p-6 bg-card/30 border-border/50">
                  <h3 className="text-lg font-semibold mb-3">А если я уже выбрала "не тот" путь, а гороскоп говорит другое?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Значит, вы получили подсказку, где можно снять напряжение. Не обязательно всё бросать: иногда достаточно сместить специализацию внутри профессии. Например, бухгалтер с гуманитарным Меркурием может уйти в финансовое консультирование и объяснения людям, а не в чистые цифры. Карта показывает направление, как повернуть путь ближе к себе.
                  </p>
                </Card>

                <Card className="p-6 bg-card/30 border-border/50">
                  <h3 className="text-lg font-semibold mb-3">Можно ли по гороскопу ребёнка заранее решить, в какой вуз ему идти?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Желательно так не делать. Гороскоп ребёнка лучше использовать для понимания его стиля мышления и того, какие форматы обучения ему проще. А вот конкретный вуз и специальность стоит выбирать уже вместе с подростком, опираясь и на карту, и на реальные интересы, успеваемость и опыт.
                  </p>
                </Card>

                <Card className="p-6 bg-card/30 border-border/50">
                  <h3 className="text-lg font-semibold mb-3">Как учитывать риски, если в гороскопе много Воды и слабая Земля?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Много Воды даёт чувствительность и эмпатию, но при слабой Земле может быть мало структуры и устойчивости. Для гуманитарных профессий это сильный ресурс, но важно осознанно развивать навыки организации, планирования и финансовой грамотности, чтобы не "плыть" и не выгорать. Карта показывает, где нужна дополнительная опора, а не запрещает вам идти в любимую сферу.
                  </p>
                </Card>
              </div>
            </section>

            <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 text-center">
              <h3 className="text-2xl font-bold mb-4">Получите 3 моментальных отчёта бесплатно</h3>
              <p className="text-muted-foreground mb-6">
                Начните с готовых мини-результатов за пару минут
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
                <a href="https://t.me/Neurodzenaibot" target="_blank" rel="noopener noreferrer">
                  Получить 3 отчёта
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src={logo} alt="НейроДзен" className="w-10 h-10" />
                <span className="text-lg font-semibold">НЕЙРОДЗЕН</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Ваш персональный ИИ-наставник по эзотерике
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Документы</h3>
              <div className="space-y-2 text-sm">
                <Link to="/dataprocessingpolicy" className="block text-muted-foreground hover:text-primary transition-colors">
                  Политика конфиденциальности
                </Link>
                <Link to="/dataprocessing" className="block text-muted-foreground hover:text-primary transition-colors">
                  Обработка персональных данных
                </Link>
                <Link to="/publicoffer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Публичная оферта
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Контакты</h3>
              <div className="flex gap-3">
                <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                  <a href="https://t.me/Neurodzenaibot" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </Button>
                <Button size="sm" variant="outline" className="border-primary/30" asChild>
                  <a href="https://aidzen.app" target="_blank" rel="noopener noreferrer">
                    <Smartphone className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 НейроДзен. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TalentsInHoroscope;
