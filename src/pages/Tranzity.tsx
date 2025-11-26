import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Orbit, MessageCircle, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "@/assets/logo.png";

const Tranzity = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Транзиты к натальной карте и их влияние: простое объяснение | НейроДзен</title>
        <meta name="description" content="Что такое транзиты к натальной карте, как они влияют на события и решения, как читать транзиты по шагам и не попасть в ловушку фатализма." />
        <meta name="keywords" content="транзиты к натальной карте, транзиты планет, влияние транзитов, астрология транзиты, прогноз по транзитам, как читать транзиты, транзиты домов, аспекты транзитов, натальная карта онлайн бесплатно" />
        <link rel="canonical" href="https://aidzen.ru/tranzity-k-natalnoj-karte-i-ih-vliyanie" />
        <meta property="og:title" content="Транзиты к натальной карте и их влияние: простое объяснение" />
        <meta property="og:description" content="Что такое транзиты к натальной карте, как они влияют на события и решения, как читать транзиты по шагам и не попасть в ловушку фатализма." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://aidzen.ru/tranzity-k-natalnoj-karte-i-ih-vliyanie" />
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
              <a href="https://chat.aidzen.ru" target="_blank" rel="noopener noreferrer">ВХОД</a>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
              <a href="https://t.me/Neurodzenaibot" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Telegram Бот</span>
              </a>
            </Button>
            <Button size="sm" variant="outline" className="border-primary/30" asChild>
              <a href="https://chat.aidzen.ru" target="_blank" rel="noopener noreferrer">
                <Smartphone className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">RuStore</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Article Header */}
          <div className="mb-12 space-y-6">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-primary/30 text-primary font-medium">
                <Orbit className="w-3 h-3 mr-1" />
                Астрология
              </Badge>
              <span className="text-sm text-muted-foreground">Время чтения: 9 мин</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Транзиты к натальной карте и их влияние: как понимать, что с вами происходит
            </h1>
            <p className="text-xl text-muted-foreground">
              16 января, 2025
            </p>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              В этой статье разберем, что такое транзиты к натальной карте простым языком. Вы поймете, почему в одни периоды "все само складывается", а в другие будто тормозит. Я дам пошаговый алгоритм, как читать транзиты, покажу типичные ошибки и помогу не превращать астрологию в фатализм.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Что такое транзиты простыми словами</h2>
            <p className="leading-relaxed mb-4">
              <strong>Натальная карта</strong> - это "фото" неба в момент вашего рождения.<br />
              <strong>Транзиты</strong> - это текущие движения планет по небу относительно вашей натальной карты.
            </p>
            <p className="leading-relaxed mb-4">
              Представьте, что у вас есть дом (натальная карта), а по улице перед домом постоянно ходят разные люди (планеты). Иногда кто-то заходит в гости, стучится в дверь, делает вам предложение, иногда просто проходит мимо. Вот это и есть транзиты.
            </p>
            <Card className="p-6 bg-primary/5 border-primary/20 my-8">
              <p className="leading-relaxed mb-2">
                <strong>Важно помнить:</strong>
              </p>
              <ul className="space-y-2">
                <li>Планеты в натале показывают ваш характер и базовые сценарии.</li>
                <li>Транзиты включают эти сценарии "по времени".</li>
                <li>Транзит ничего не заставляет вас делать, он только создаёт фон и темы.</li>
              </ul>
            </Card>

            <h2 className="text-3xl font-bold mt-12 mb-6">Быстрые и медленные транзиты: кто на что влияет</h2>
            <p className="leading-relaxed mb-4">
              Не все транзиты равны по силе. Есть быстрые, есть медленные.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Быстрые транзиты</h3>
            <p className="leading-relaxed mb-4">
              Это Луна, Меркурий, Венера, Солнце.
            </p>
            <ul className="space-y-2 mb-6">
              <li><strong>Луна</strong> - меняет фон каждый день, влияет на настроение, быт.</li>
              <li><strong>Меркурий</strong> - тема общения, документов, учёбы.</li>
              <li><strong>Венера</strong> - приятное, деньги, отношения, покупки.</li>
              <li><strong>Солнце</strong> - общий фокус внимания, энергия, "куда светим".</li>
            </ul>
            <p className="leading-relaxed mb-6">
              Их транзиты ощущаются на уровне дня - недели. Это как погода: сегодня дождь, завтра солнце.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Медленные транзиты</h3>
            <p className="leading-relaxed mb-4">
              Марс, Юпитер, Сатурн, Уран, Нептун, Плутон.
            </p>
            <ul className="space-y-2 mb-6">
              <li><strong>Марс</strong> - действия, конфликты, энергия.</li>
              <li><strong>Юпитер</strong> - расширение, возможности, обучение, переезды.</li>
              <li><strong>Сатурн</strong> - ограничения, ответственность, проверки.</li>
              <li><strong>Уран</strong> - резкие перемены, свобода, неожиданности.</li>
              <li><strong>Нептун</strong> - размывание границ, вдохновение, иллюзии.</li>
              <li><strong>Плутон</strong> - глубокие трансформации, кризисы, сила.</li>
            </ul>
            <p className="leading-relaxed mb-6">
              Их транзиты могут ощущаться месяцами и годами. Это уже не "погода", а целый сезон вашей жизни.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Аспекты транзитов к натальной карте: куда "бьёт" энергия</h2>
            <p className="leading-relaxed mb-4">
              Чтобы понять влияние транзита, важно:
            </p>
            <ol className="space-y-2 mb-6 list-decimal list-inside">
              <li>Какая планета идёт по транзиту.</li>
              <li>К какой натальной планете или точке она делает аспект.</li>
              <li>Какой именно аспект (соединение, квадрат, оппозиция, тригон, секстиль).</li>
              <li>В каких домах это происходит.</li>
            </ol>
            <Card className="p-6 bg-secondary/5 border-secondary/20 my-8">
              <p className="leading-relaxed mb-2">
                <strong>Очень кратко:</strong>
              </p>
              <ul className="space-y-2">
                <li><strong>Соединение</strong> - включение темы на максимум.</li>
                <li><strong>Квадрат</strong> - напряжение, конфликт, необходимость выбора.</li>
                <li><strong>Оппозиция</strong> - полярность, отношения, внешние люди.</li>
                <li><strong>Тригон</strong> - лёгкость, поддержка, "само приходит".</li>
                <li><strong>Секстиль</strong> - мягкая возможность, шанс при действии.</li>
              </ul>
            </Card>

            <h2 className="text-3xl font-bold mt-12 mb-6">Как читать транзит к вашей натальной карте по шагам</h2>
            <p className="leading-relaxed mb-6">
              Давайте разложим по полочкам, чтобы вы могли использовать это самостоятельно.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Шаг 1. Определите транзитную планету</h3>
            <p className="leading-relaxed mb-4">
              Посмотрите, какая планета сейчас делает аспект к вашей натальной карте.<br />
              Например: транзитный Сатурн делает квадрат к вашему Солнцу.
            </p>
            <p className="leading-relaxed mb-4">
              Сразу задаём себе вопросы:
            </p>
            <ul className="space-y-2 mb-6">
              <li>Что символизирует эта планета вообще.</li>
              <li>Как вы обычно проживаете её в своей жизни (по наталу).</li>
            </ul>
            <p className="leading-relaxed mb-6">
              Сатурн - структура, ответственность, границы, время, проверки.<br />
              Солнце - я, личность, жизненная энергия, самореализация.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Шаг 2. Найдите натальную точку и её дом</h3>
            <p className="leading-relaxed mb-4">
              Где стоит ваше натальное Солнце? В каком знаке и доме.<br />
              Например: Солнце в Овне в 10 доме.
            </p>
            <p className="leading-relaxed mb-4">
              Это добавляет смысла:
            </p>
            <ul className="space-y-2 mb-6">
              <li>Овен - про инициативу, лидерство, начало.</li>
              <li>10 дом - карьера, статус, цели, признание.</li>
            </ul>
            <p className="leading-relaxed mb-6">
              Значит транзит Сатурна будет связан с темой работы, статуса, ответственности в карьере.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Шаг 3. Учтите дом транзитной планеты</h3>
            <p className="leading-relaxed mb-4">
              В каком доме вашей карты сейчас идёт транзитный Сатурн.
            </p>
            <p className="leading-relaxed mb-4">
              Например: Сатурн идёт по 7 дому.
            </p>
            <p className="leading-relaxed mb-4">
              7 дом - партнёрство, брак, клиенты, открытые союзы.<br />
              Итак, у вас уже есть формула:
            </p>
            <Card className="p-6 bg-accent/10 border-accent/30 my-8">
              <ul className="space-y-2">
                <li>Сатурн (ответственность, ограничения, проверки)</li>
                <li>квадрат к Солнцу (я, самореализация)</li>
                <li>Солнце в 10 доме (карьера)</li>
                <li>Сатурн в 7 доме (партнёрство, отношения, клиенты)</li>
              </ul>
            </Card>
            <p className="leading-relaxed mb-4">
              <strong>Смысл:</strong> период проверки и взросления в теме карьеры через партнёрства и отношения.
            </p>
            <p className="leading-relaxed mb-6">
              Могут быть:
            </p>
            <ul className="space-y-2 mb-6">
              <li>жёсткие условия от партнёров или руководства;</li>
              <li>необходимость брать больше ответственности;</li>
              <li>ощущение, что "меня ограничивают", "от меня требуют слишком много".</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Шаг 4. Определите временной коридор</h3>
            <p className="leading-relaxed mb-6">
              Медленные планеты действуют не один день. Сатурн, Уран, Нептун, Плутон могут держать аспект несколько месяцев, с фазой "входа", "точного удара" и "выхода".
            </p>
            <Card className="p-6 bg-primary/5 border-primary/20 my-8">
              <p className="leading-relaxed">
                <strong>Запомните:</strong> чем медленнее планета и чем точнее аспект, тем ощутимее влияние.
              </p>
            </Card>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Шаг 5. Переведите в язык действий</h3>
            <p className="leading-relaxed mb-4">
              Это ключевой момент. Транзит - это не приговор, а тема, с которой лучше работать.
            </p>
            <p className="leading-relaxed mb-4">
              Спросите себя:
            </p>
            <ul className="space-y-2 mb-6">
              <li>Что жизнь показывает сейчас через этот транзит.</li>
              <li>Где я сопротивляюсь, а где могу взять ответственность.</li>
              <li>Какие решения я могу принять осознанно, чтобы использовать этот период.</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6">Сигнал → смысл → действие: как использовать транзиты на практике</h2>
            <p className="leading-relaxed mb-6">
              Разберём несколько типичных транзитов.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Пример 1. Транзитный Сатурн в квадрате к Солнцу</h3>
            <Card className="p-6 bg-muted/50 my-6">
              <p className="font-semibold mb-3">Сигнал:</p>
              <p className="leading-relaxed mb-4">
                Усталость, ощущение тяжести, больше обязанностей; на работе могут "закручивать гайки", критика руководства, сомнения в себе.
              </p>
              <p className="font-semibold mb-3">Смысл:</p>
              <p className="leading-relaxed mb-4">
                Период взросления в теме самореализации. Проверка, насколько вы готовы подтянуть дисциплину, системность и ответственность в карьере и в образе себя.
              </p>
              <p className="font-semibold mb-3">Действие:</p>
              <ul className="space-y-2">
                <li>Пересмотреть цели и реальный объём задач.</li>
                <li>Ввести чёткий режим, расставить приоритеты, убрать лишнее.</li>
                <li>Учиться говорить "нет" лишним нагрузкам и "да" стратегическим шагам.</li>
              </ul>
            </Card>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Пример 2. Транзитный Юпитер в тригоне к Венере</h3>
            <Card className="p-6 bg-muted/50 my-6">
              <p className="font-semibold mb-3">Сигнал:</p>
              <p className="leading-relaxed mb-4">
                Больше приятных встреч, подарков, приглашений, возможностей в деньгах и отношениях.
              </p>
              <p className="font-semibold mb-3">Смысл:</p>
              <p className="leading-relaxed mb-4">
                Период расширения и удач в теме любви, денег, удовольствий. Жизнь даёт бонусы и поддержку.
              </p>
              <p className="font-semibold mb-3">Действие:</p>
              <ul className="space-y-2">
                <li>Планировать важные переговоры, знакомства, запуск проектов.</li>
                <li>Позволить себе больше, но не уходить в излишества.</li>
                <li>Расширять круг общения, учиться принимать.</li>
              </ul>
            </Card>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Пример 3. Транзитный Уран к Луне</h3>
            <Card className="p-6 bg-muted/50 my-6">
              <p className="font-semibold mb-3">Сигнал:</p>
              <p className="leading-relaxed mb-4">
                Внезапные изменения в быту, семье, месте проживания; эмоциональные всплески, желание свободы.
              </p>
              <p className="font-semibold mb-3">Смысл:</p>
              <p className="leading-relaxed mb-4">
                Жизнь требует обновления привычек и эмоциональных реакций. Нужен воздух, пространство, новые форматы.
              </p>
              <p className="font-semibold mb-3">Действие:</p>
              <ul className="space-y-2">
                <li>Осознанно вводить изменения в быт, а не ждать кризиса.</li>
                <li>Учиться экологично обозначать свои потребности.</li>
                <li>Не принимать скоропалительных решений на пике эмоций.</li>
              </ul>
            </Card>

            <h2 className="text-3xl font-bold mt-12 mb-6">Миникейсы: как транзиты проигрываются в реальной жизни</h2>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Кейс 1. Сатурн и тема работы</h3>
            <p className="leading-relaxed mb-4">
              Марина, 36 лет.<br />
              Транзитный Сатурн входил в квадрат к её Солнцу в 10 доме. Начались проверки на работе, новое руководство, повышенные требования. Первое ощущение - "меня не ценят, все навалилось", хотелось уйти в протест.
            </p>
            <p className="leading-relaxed mb-6">
              Когда она рассмотрела транзит, стало понятно: это время определить, хочет ли она расти в этой профессии. Марина выбрала пройти внутреннее обучение, частично перераспределила задачи, договорилась о понятной системе показателей. Через год получила повышение. Сатурн отработался как проверка и укрепление, а не как "наказание".
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Кейс 2. Юпитер и отношения</h3>
            <p className="leading-relaxed mb-4">
              Ольга, 29 лет.<br />
              Юпитер шёл по её 7 дому и делал тригон к натальной Венере. Появилось много знакомств, приглашений, приятных встреч. Вместо того чтобы просто "наслаждаться моментом", она осознанно пошла на несколько мероприятий по работе и интересам, где можно встретить близких по ценностям людей.
            </p>
            <p className="leading-relaxed mb-6">
              Итог: под новый год она познакомилась с будущим мужем именно через профессиональное окружение. Юпитер дал возможности, но её решения и действия позволили им реализоваться.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Типичные риски при работе с транзитами и как их обойти</h2>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Фатализм</h3>
            <p className="leading-relaxed mb-4">
              "У меня плохой транзит, значит всё будет плохо".<br />
              Риск - вы заранее сдаётесь и реально начинаете выбирать варианты похуже.
            </p>
            <p className="leading-relaxed mb-6">
              <strong>Как обойти:</strong> рассматривайте транзит как тему обучения. Спросите: чему он учит, где мой выбор, какие варианты действий.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Игнорирование медленных транзитов</h3>
            <p className="leading-relaxed mb-4">
              "Что-то тянется годами, но я не вижу связи".<br />
              Риск - не пользоваться моментом для глубоких изменений, а жить в постоянной усталости или хаосе.
            </p>
            <p className="leading-relaxed mb-6">
              <strong>Как обойти:</strong> отслеживать транзиты Сатурна, Урана, Нептуна, Плутона к личным планетам и смотреть, как они меняют долгие циклы вашей жизни.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Преувеличение влияния быстрых транзитов</h3>
            <p className="leading-relaxed mb-4">
              "Луна в квадрате к моему Марсу, всё пропало".<br />
              Риск - накручивать себя, делать резкие выводы по краткосрочным влияниям.
            </p>
            <p className="leading-relaxed mb-6">
              <strong>Как обойти:</strong> воспринимать Луну, Меркурий, Венеру как "погоду", а не как судьбоносные события.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Как использовать транзиты экологично: короткие рекомендации</h2>
            <Card className="p-6 bg-primary/5 border-primary/20 my-8">
              <p className="leading-relaxed mb-2">
                <strong>Рекомендации:</strong>
              </p>
              <ol className="space-y-2 list-decimal list-inside">
                <li>Не пугаться "плохих" аспектов, а сразу переводить их в вопросы "чему учит"</li>
                <li>Учитывать дом и тему жизни, куда попадает транзит, а не только знак</li>
                <li>Обязательно прорабатывать медленные транзиты к Солнцу, Луне, Асценденту и управителю 1 дома.</li>
              </ol>
            </Card>

            <h2 className="text-3xl font-bold mt-12 mb-6">Транзиты и личная ответственность</h2>
            <p className="leading-relaxed mb-4">
              Важно зафиксировать: транзит создаёт условия и подсвечивает тему, но не принимает решения за вас.
            </p>
            <ul className="space-y-2 mb-6">
              <li><strong>Сигнал:</strong> что происходит в жизни и что вы чувствуете.</li>
              <li><strong>Смысл:</strong> какую тему жизни поднимает транзит.</li>
              <li><strong>Действие:</strong> какие шаги вы можете сделать, чтобы пройти период осознанно.</li>
            </ul>
            <p className="leading-relaxed mb-6">
              Например, транзитный Марс к вашему натальному Марсу может дать вспышку активности и конфликтности. Можно:
            </p>
            <ul className="space-y-2 mb-6">
              <li>Ввязаться в бессмысленный спор и поссориться.</li>
              <li>А можно направить эту энергию в спорт, уборку, завершение накопившихся задач.</li>
            </ul>
            <p className="leading-relaxed mb-6">
              Транзит тот же, сценарий - разный.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Краткие выводы</h2>
            <Card className="p-6 bg-secondary/5 border-secondary/20 my-8">
              <ul className="space-y-3">
                <li>Транзиты к натальной карте показывают, какие темы вашей жизни активируются сейчас, но не лишают вас выбора.</li>
                <li>Быстрые транзиты формируют "погоду дня", медленные - целые жизненные сезоны и поворотные этапы.</li>
                <li>Для анализа транзита важно учитывать планеты, аспект, дома и временной коридор, а не вырывать один фактор.</li>
                <li>Логика "сигнал → смысл → действие" помогает превратить астрологию из страха в инструмент планирования и развития.</li>
                <li>Риски транзитов связаны не с самими аспектами, а с фатализмом, игнорированием долгих влияний и эмоциональным реагированием без осознанных решений.</li>
                <li>Самые важные транзиты - к Солнцу, Луне, Асценденту и управителю 1 дома: за ними стоит ключевой разворот личной истории.</li>
              </ul>
            </Card>

            {/* CTA */}
            <div className="mt-16 text-center">
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <h3 className="text-2xl font-bold mb-4">
                  Получите 3 моментальных отчёта бесплатно
                </h3>
                <p className="text-muted-foreground mb-6">
                  Начните с готовых мини-результатов за пару минут
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
                  <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                    Получить 3 отчёта
                  </a>
                </Button>
              </Card>
            </div>

            {/* FAQ */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8">FAQ по транзитам к натальной карте</h2>
              
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    1. Как понять, какие транзиты для меня самые важные прямо сейчас?
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Смотрите в первую очередь на медленные планеты (Сатурн, Уран, Нептун, Плутон) и их аспекты к вашим личным планетам (Солнце, Луна, Меркурий, Венера, Марс) и к Асценденту. Если такой аспект точный или близок к точному, это главный фон периода. Быстрые планеты больше показывают детализацию дня к общему тренду.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    2. Как считать транзиты, если я не очень разбираюсь в астрологии?
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Базовый вариант: взять свою натальную карту и транзитную карту на текущую дату и сравнить, какие транзитные планеты находятся рядом с вашими натальными точками или делают к ним аспекты. Даже если вы начнёте с соединений и квадратов, это уже даст много информации. Важно каждый аспект перевести в понятный язык: "про что планеты" + "какие дома задействованы".
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    3. Сколько длится влияние транзита, если аспект уже прошёл точно?
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Медленные планеты ощущаются и до, и после точного аспекта. Важно, когда планета заходит в орбис (обычно несколько градусов до и после). Плюс бывают ретроградные петли, когда аспект повторяется. В жизни это похоже на цикл "подготовка - событие - закрепление результата", а не на один день "сегодня был транзит и всё".
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    4. Что делать, если у меня сразу несколько сложных транзитов?
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Сначала выделите главный - самый медленный и напряжённый аспект к ключевой точке (Солнце, Луна, Асцендент). Остальные рассматривайте как фон или дополнительные детали. Важно не пытаться контролировать всё сразу, а выбрать 1–2 темы, где вы готовы действовать конкретно и поэтапно.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    5. Можно ли "обезвредить" тяжёлый транзит полностью?
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Полностью убрать влияние нельзя, но можно сильно снизить риски и усилить конструктив. Для этого важно понимать смысл транзита, не зажимать эмоции, не убегать от ответственности и принимать решения осознанно. Часто "тяжёлый" транзит приводит к лучшим результатам, если вовремя увидеть, что нужно менять, и не цепляться за старое.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    6. Как учитывать риски транзитов в долгосрочных планах?
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Если видите впереди период напряжённого Сатурна, Урана или Плутона к важным точкам, не перегружайте себя лишними обязательствами и оставляйте запас по времени и ресурсам. В крупные проекты лучше входить там, где транзиты дают поддержку (тригоны, секстили от Юпитера, гармоничные аспекты к управителю 10 дома), а сложные транзиты использовать для пересмотра и перестройки того, что уже не работает.
                  </p>
                </Card>
              </div>
            </div>
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
                  <a href="https://chat.aidzen.ru" target="_blank" rel="noopener noreferrer">
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

export default Tranzity;
