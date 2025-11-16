import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DivorceInAstrology = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Разводы в астрологии: где искать в натальной карте | НейроДзен</title>
        <meta name="description" content="Как увидеть тему разводов в натальной карте: какие дома, планеты и аспекты указывают на риск, а что помогает сохранить брак. Пошаговые подсказки без фатализма." />
        <meta name="keywords" content="разводы в астрологии, развод в натальной карте, астрология брак и развод, разведен ли по гороскопу, 7 дом развод, аспекты к управителю 7 дома, венера и марс в отношениях, уран в доме отношений" />
        <link rel="canonical" href="https://aidzen.ru/razvody-v-astrologii-gde-iskat" />
        
        <meta property="og:title" content="Разводы в астрологии: где искать в натальной карте | НейроДзен" />
        <meta property="og:description" content="Как увидеть тему разводов в натальной карте: какие дома, планеты и аспекты указывают на риск, а что помогает сохранить брак." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://aidzen.ru/razvody-v-astrologii-gde-iskat" />
        <meta property="article:published_time" content="2025-11-15" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Разводы в астрологии: где искать в натальной карте" />
        <meta name="twitter:description" content="Как увидеть тему разводов в натальной карте: какие дома, планеты и аспекты указывают на риск, а что помогает сохранить брак." />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="НейроДзен" className="h-8" />
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Блог
            </Link>
            <a 
              href="https://t.me/aidzenbot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Telegram Bot
            </a>
            <a 
              href="https://apps.rustore.ru/app/com.aidzen.twa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              RuStore
            </a>
          </nav>
        </div>
      </header>

      {/* Article Content */}
      <main className="container max-w-4xl py-12 px-4">
        <article>
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">Астрология</Badge>
              <Badge variant="secondary">Отношения</Badge>
              <Badge variant="secondary">Развод</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Разводы в астрологии: где искать и как с этим работать
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime="2025-11-15">15 ноября 2025</time>
              <span>•</span>
              <span>10-12 минут чтения</span>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              В этой статье разберем, как астролог смотрит на тему развода: какие дома и планеты включены, какие сигналы усиливают риск, а что, наоборот, помогает сохранить отношения. Вы поймете, где "живут" разводы в натальной карте, чем отличается просто сложный характер в любви от реально нестабильного брачного сценария и какую ошибку важно не допустить: не ставить на себе крест только из-за одного аспекта.
            </p>
          </div>

          {/* Main Rule */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Главное правило: развод — это всегда комплекс</h2>
              <p className="mb-4">
                В астрологии нет одной планеты "разводов". Мы всегда смотрим набор факторов и их повторяемость. Один напряженный аспект не приговаривает к разводу, но если тема нестабильности в браках звучит пять раз в разных местах карты, это уже сценарий, которым стоит осознанно заниматься.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg mb-3">Ключевые зоны для анализа:</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>7 дом и его управитель.</strong> Брак, официальные партнерства, образ "моего человека".</li>
                  <li><strong>Венера и Марс.</strong> Как вы любите, выбираете и проживаете близость и страсть.</li>
                  <li><strong>5, 8, иногда 4 дом.</strong> Любовь, секс, глубинная близость, семейный быт.</li>
                  <li><strong>Уран, Плутон, Сатурн.</strong> Часто включены в истории кризисов, разрывов и трансформаций.</li>
                </ul>
              </div>
              <p className="mt-4 italic">
                Важно: сигналы про развод почти всегда одновременно показывают и зону роста. То, на чем "падают" отношения, то же самое становится опорой, если это проработать.
              </p>
            </CardContent>
          </Card>

          {/* 7th House */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">7 дом: база для анализа разводов</h2>
            
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Что смотрим в 7 доме</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Знак на куспиде 7 дома. Какой тип отношений притягиваете.</li>
                  <li>Управитель 7 дома. Его знак, дом и аспекты.</li>
                  <li>Планеты в самом 7 доме. Особенно тяжелые или взрывные.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Типичные "звоночки" разводов:</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Управитель 7 дома в напряженных аспектах с Ураном, Марсом, Плутоном, иногда Сатурном.</li>
                  <li>Уран или Марс в 7 доме с квадратами/оппозициями.</li>
                  <li>Поврежденный управитель 7 дома в 8, 12 или 6 доме.</li>
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Логика "сигнал - смысл - действие":</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">Сигнал:</p>
                      <p className="text-muted-foreground">управитель 7 дома в напряженном аспекте с Ураном.</p>
                    </div>
                    <div>
                      <p className="font-medium">Смысл:</p>
                      <p className="text-muted-foreground">склонность к резким решениям, потребность в свободе, бунт против ограничений в браке.</p>
                    </div>
                    <div>
                      <p className="font-medium">Действие:</p>
                      <p className="text-muted-foreground">сразу на берегу проговаривать границы свободы, не доводить до взрыва, учиться завершать разговор, а не отношения.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">Сигнал:</p>
                      <p className="text-muted-foreground">Марс в 7 доме в квадрате к Луне.</p>
                    </div>
                    <div>
                      <p className="font-medium">Смысл:</p>
                      <p className="text-muted-foreground">вспыльчивость в паре, сцепки "кто сильнее" и обиды по бытовым поводам.</p>
                    </div>
                    <div>
                      <p className="font-medium">Действие:</p>
                      <p className="text-muted-foreground">работа с управлением гневом, правила "без оскорблений" в ссорах, возможно совместная терапия.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Venus and Mars */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Роль Венеры и Марса в теме разводов</h2>
            
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Венера: как вы выбираете партнера</h3>
                <p className="mb-4">
                  Венера показывает ваши ценности в любви, стиль привязанности, что вам "красиво" в отношениях.
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Напряженная Венера (особенно с Ураном, Нептуном, Плутоном) часто дает истории "влюбилась - перегорела", иллюзии и разочарования.</li>
                  <li>Венера в знаках свободы (Водолей, Стрелец, иногда Близнецы) при отсутствии других факторов может давать несколько официальных браков, но не обязана.</li>
                </ul>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-3">Логика:</h4>
                  <div className="space-y-2">
                    <p><strong>Сигнал:</strong> Венера в тесных аспектах с Нептуном.</p>
                    <p><strong>Смысл:</strong> идеализация партнера, слепые зоны, склонность "не видеть красные флажки".</p>
                    <p><strong>Действие:</strong> не принимать жизненные решения на пике влюбленности, проверять партнера временем и делами, не только словами.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Марс: как вы конфликтуете и проявляете желание</h3>
                <p className="mb-4">
                  Марс показывает, как вы добиваетесь своего и как реагируете в конфликте.
                </p>
                <ul className="space-y-2 list-disc list-inside mb-6">
                  <li>Марс в 7 доме или в тяжелых аспектах к управителю 7 дома часто говорит о браках с яркими, конфликтными расставаниями.</li>
                  <li>Марс с Ураном - классика резких разрывов "встал и ушел".</li>
                </ul>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-3">Сигнал - смысл - действие:</h4>
                  <div className="space-y-2">
                    <p><strong>Сигнал:</strong> Марс в квадрате к Меркурию и управляет 7 домом.</p>
                    <p><strong>Смысл:</strong> ссоры через слова, резкость, болезненная прямота, скандалы.</p>
                    <p><strong>Действие:</strong> учиться заменять "ты-высказывания" на "я-чувствую", вводить правила "пауза 10 минут" в конфликте.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Heavy Planets */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Уран, Плутон, Сатурн: тяжелая артиллерия разводов</h2>
            
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Уран: разрывы, свобода, внезапность</h3>
                <p className="mb-4">Уран особенно силен в историях разводов, когда:</p>
                <ul className="space-y-2 list-disc list-inside mb-4">
                  <li>он в 7 доме;</li>
                  <li>он управляет 7 домом;</li>
                  <li>он делает напряженные аспекты к Венере, управителю 7 дома или к Луне.</li>
                </ul>
                <p className="mb-4">
                  Это дает сценарий "все было нормально - и вдруг все закончилось". Внутри всегда есть тема свободы, удушья, потребности в новизне.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Как смягчать:</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>честно признавать свою потребность в личном пространстве;</li>
                    <li>не тащить себя в традиционный сценарий брака, если он реально вам не подходит;</li>
                    <li>строить отношения, где изменения и движения являются нормой, а не угрозой.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Плутон: кризисы и "по крайней мере один тяжелый развод"</h3>
                <p className="mb-4">Плутон часто включает:</p>
                <ul className="space-y-2 list-disc list-inside mb-4">
                  <li>историю зависимости и контроля;</li>
                  <li>крайности "либо ты со мной, либо никак";</li>
                  <li>разрушение, после которого вы формально уже другой человек.</li>
                </ul>
                <p className="mb-3"><strong>Сигналы:</strong></p>
                <ul className="space-y-2 list-disc list-inside mb-4">
                  <li>Плутон в 7 доме или в напряжении к управителю 7 дома;</li>
                  <li>Плутон в тесном аспекте к Венере.</li>
                </ul>
                <div className="bg-destructive/10 p-4 rounded-lg mb-4">
                  <p><strong>Риск:</strong> брак, который держится до последнего, а потом рушится в формате "выжженной земли".</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p><strong>Действие:</strong> учиться выходить из власти-борьбы, не терпеть насилие, устойчиво переживать кризисы через терапию, границы и финансовую автономность.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Сатурн: не всегда развод, но часто испытание</h3>
                <p className="mb-4">
                  Сатурн больше про задержки, страхи и "через усилия".
                </p>
                <ul className="space-y-2 list-disc list-inside mb-4">
                  <li>Сатурн в 7 доме может дать поздний брак, страх сближения, партнеров старше или более строгих.</li>
                  <li>Напряжения от Сатурна к Венере/управителю 7 дома нередко дают развод через ощущение "мы не тянем друг друга".</li>
                </ul>
                <p className="italic text-primary">
                  Важно: при хорошем "проживании" Сатурн, наоборот, дает долгий, стабильный союз. Это тот случай, когда сложный аспект больше про работу, чем приговор.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Additional Houses */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Дополнительные дома: 4, 5 и 8</h2>
            
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">4 дом: семья и общий быт</h3>
                <p className="mb-4">
                  4 дом показывает, как вы живете в семье, а также сценарии, которые вы принесли из родительского дома.
                </p>
                <ul className="space-y-2 list-disc list-inside mb-6">
                  <li>Развод родителей, отраженный в 4 доме, часто задает внутреннюю норму "семья = боль", и человек бессознательно повторяет сценарий.</li>
                  <li>Напряженный управитель 4 дома в связи с 7 домом усиливает риск развода.</li>
                </ul>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Сигнал - смысл - действие:</h4>
                  <div className="space-y-2">
                    <p><strong>Сигнал:</strong> управитель 4 дома в напряженном аспекте к управителю 7 дома.</p>
                    <p><strong>Смысл:</strong> прошлые семейные истории вмешиваются в ваш брак.</p>
                    <p><strong>Действие:</strong> работать со своей семейной историей, не переносить образ родителя на партнера, осознанно строить другой сценарий.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">5 и 8 дом: любовь, страсть, кризис</h3>
                <ul className="space-y-3 list-disc list-inside">
                  <li><strong>5 дом:</strong> истории влюбленностей, любовников, романов. Планеты и аспекты могут показывать измены как фактор разводов.</li>
                  <li><strong>8 дом:</strong> кризисы, общие ресурсы, сексуальная тема. Напряжения с 7 домом часто дают разводы на почве денег и интимной близости.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Typical Combinations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Типичные комбинации, при которых тема разводов звучит часто</h2>
            
            <Card className="mb-6 border-primary/20">
              <CardContent className="pt-6">
                <p className="mb-4 italic">
                  Важно: речь не про "у вас точно будет два развода", а про повышенную вероятность, если не работать с собой.
                </p>
                <p className="mb-4">Чаще всего тема разводов поднимается, когда:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Управитель 7 дома поражен и связан с Ураном/Плутоном/Марсом.</li>
                  <li>В 7 доме стоит Уран или Плутон с напряженными аспектами.</li>
                  <li>Луна, Венера и управитель 7 дома одновременно в напряжении с Ураном и Плутоном.</li>
                  <li>Есть повторяемость сюжета нестабильности: и 7 дом, и Венера, и 4 дом говорят о расставаниях.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6 bg-muted/30">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">Миникейс 1:</h3>
                <p className="mb-4">
                  Женщина, 37 лет. Управитель 7 дома в соединении с Ураном, Уран в напряжении к Венере. Два официальных брака, оба начинались стремительно, с ощущением "это судьба". Оба завершились внезапно, когда партнеры пытались жестко ограничить ее свободу.
                </p>
                <p className="italic">
                  Проработка: осознанный выбор формата отношений, честное проговаривание своих границ заранее, собственные проекты и интересы. Сейчас в третьем союзе уже 5 лет: разводов стало меньше не потому, что "звезды передумали", а потому что сценарий проживается по-новому.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-6 bg-muted/30">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">Миникейс 2:</h3>
                <p className="mb-4">
                  Женщина, 42 года. Плутон в 7 доме, квадрат к Венере. Долгий брак с контролем, ревностью и эмоциональными качелями. Развод оказался тяжелым, но именно он стал точкой личной терапии, запуском карьеры и возвращением к себе.
                </p>
                <p className="italic">
                  Плутон остался в карте, но теперь он про глубину и честность, а не про разрушение во что бы то ни стало.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/10">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">Рекомендации</h3>
                <ol className="space-y-2 list-decimal list-inside">
                  <li>Не делайте вывод по одному аспекту.</li>
                  <li>Всегда смотрите повторяемость сюжета в разных домах и планетах.</li>
                  <li>Используйте знание карты как план работы, а не как приговор.</li>
                </ol>
              </CardContent>
            </Card>
          </section>

          {/* Risks */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Риски и как их обходить</h2>
            
            <Card className="mb-6 border-destructive/30">
              <CardContent className="pt-6">
                <p className="mb-4">
                  Главный риск при изучении своей карты - самопрограммирование. Увидела "сложный" 7 дом и решила, что "мне не положено быть в браке". Это ловушка. Астрология показывает склонности и сценарии, но не лишает свободы выбора.
                </p>
                
                <h3 className="font-semibold mb-3">Как снижать риски:</h3>
                <ul className="space-y-3 list-disc list-inside">
                  <li><strong>Не драматизировать формулировки.</strong> Вместо "у меня знак развода" говорите "у меня сильная тема свободы/кризисов в отношениях".</li>
                  <li><strong>Работать с психологией:</strong> многие сложные аспекты проигрываются мягче, если вы умеете говорить о чувствах, ставите границы и не живете в зависимости.</li>
                  <li><strong>Не торопиться с браком,</strong> если карта показывает резкие решения. Дайте себе время узнать человека в быту, в конфликте, в кризисе.</li>
                  <li><strong>Отдельно смотреть финансы:</strong> напряжения 8 дома к 7 часто говорят о разводах из-за денег. Значит, вам жизненно важны личные накопления и прозрачные финансовые договоренности.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Transits and Progressions */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Транзиты и прогрессии: когда тема развода выходит на поверхность</h2>
            
            <Card className="mb-6">
              <CardContent className="pt-6">
                <p className="mb-4">
                  Натальная карта показывает сценарий. Транзиты и прогрессии включают его во времени. Развод почти никогда не происходит "на пустом месте". Обычно сначала назревает внутренний кризис, а уже потом внешний шаг. В карте это видно как сочетание: <strong>натальные показатели + долгосрочные транзиты + прогрессии.</strong>
                </p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Как транзиты подводят к разводу</h3>
                <p className="mb-4">
                  В транзитах особенно смотрим на медленные планеты и их влияние на ось 1–7 домов, управителя 7 дома, Венеру, Луну и иногда 4 дом.
                </p>
                <p className="mb-3">Чаще всего в истории развода участвуют транзиты:</p>
                <ul className="space-y-2 list-disc list-inside mb-6">
                  <li><strong>Сатурна.</strong> Проверка брака на прочность. Иногда официальный развод, иногда "пересборка" отношений.</li>
                  <li><strong>Урана.</strong> Резкие повороты, внезапные решения, желание вырваться.</li>
                  <li><strong>Плутона.</strong> Глубокий кризис, разрушение прежней формы брака.</li>
                  <li><strong>Затмений</strong> по оси 1–7 или 4–10 домов. Сильные поворотные точки в семейной жизни.</li>
                </ul>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Мини-алгоритм, как смотреть транзиты к теме развода:</h4>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li>Найдите управителя 7 дома, Венеру и куспид 7 дома в натале.</li>
                    <li>Посмотрите, какие медленные планеты сейчас делают точные аспекты к этим точкам.</li>
                    <li>Отдельно обратите внимание, не проходят ли Сатурн, Уран, Плутон по 1 или 7 дому.</li>
                    <li>Сверьте события. Транзит обычно "звучит" за несколько месяцев до точного аспекта и еще какое-то время после.</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6 mb-6">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-3">Логика "сигнал - смысл - действие":</h4>
                  <div className="space-y-3">
                    <p><strong>Сигнал:</strong> Транзитный Сатурн делает квадрат к вашей Венере и управляет 7 домом.</p>
                    <p><strong>Смысл:</strong> Проверка чувств на реальность. Отношения проходят тест "оно мне вообще надо" и "можем ли мы жить в быту". Возможны охлаждение, дистанция, ощущение тяжести.</p>
                    <p><strong>Действие:</strong> Не убегать от разговора. Честно смотреть, где вы перегружены, а где идеализировали. Работа с ответственностью за свои чувства, возможны семейная терапия или четкие договоренности.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <p><strong>Сигнал:</strong> Транзитный Уран делает аспект к управителю 7 дома или проходит по самому 7 дому.</p>
                    <p><strong>Смысл:</strong> Потребность в свободе, переменах, свежем воздухе в отношениях. Часто события идут резко. Внезапное решение развестись или, наоборот, неожиданное новое партнерство.</p>
                    <p><strong>Действие:</strong> Максимально осознанно относиться к своим "хочу все бросить". Отделять импульс от глубокой потребности. Делать изменения в формате брака, а не обязательно ставить точку.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Прогрессии: внутренняя готовность к разводу</h3>
                <p className="mb-4">
                  Если транзиты больше про внешнее давление обстоятельств, то прогрессии описывают внутреннюю зрелость и готовность к изменениям.
                </p>
                <p className="mb-3">В прогрессиях особенно смотрим:</p>
                <ul className="space-y-2 list-disc list-inside mb-4">
                  <li><strong>прогрессивную Луну.</strong> Она показывает эмоциональный фон года и "чего душа хочет";</li>
                  <li><strong>прогрессивное Солнце, Венеру и углы карты</strong> (ASC–DSC).</li>
                </ul>
                <p className="mb-3">Когда тема развода активна, часто видно:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>прогрессивная Луна проходит по 7 дому или делает аспекты к управителю 7 дома, Венере, Сатурну, Плутону, Урану;</li>
                  <li>прогрессивное Солнце или Венера меняют знак или дом, связанный с отношениями;</li>
                  <li>прогрессивный Асцендент или Десцендент меняют знак. Человек как будто "перерастает" старый формат союза.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 mb-6">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-3">Пример логики:</h4>
                <div className="space-y-3">
                  <p><strong>Сигнал:</strong> Прогрессивная Луна входит в 7 дом, а через год туда же приходит транзитный Сатурн с аспектом к вашей Венере.</p>
                  <p><strong>Смысл:</strong> Внутренне вы дозрели до пересмотра партнерства, а внешние обстоятельства подталкивают к решению. Это может быть как честный разговор и перезапуск отношений, так и развод.</p>
                  <p><strong>Действие:</strong> Осознанно выбрать: я хочу изменить формат этого союза или завершить его. Не тянуть время просто из страха, но и не рубить сгоряча.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Как не превращать транзиты и прогрессии в "календарь развода"</h3>
                <p className="mb-4">
                  Главный риск работы с прогностикой: ждать конкретный день развода. Так формируется ощущение обреченности, а не свободы выбора.
                </p>
                <h4 className="font-semibold mb-3">Как работать экологично:</h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Считать транзиты и прогрессии рамкой времени, когда тема отношений обостряется, а не готовым приговором.</li>
                  <li>В тяжелые периоды не принимать решение в одиночестве. Подключать терапевта, специалиста, которому доверяете.</li>
                  <li>Видеть альтернативы. Один и тот же транзит Урана к 7 дому может проиграться как развод в истощающем браке или как смелое изменение формата союза, которое этот союз спасет.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 mt-6">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-3">Миникейс:</h4>
                <p>
                  Женщина, 34 года. В натале: Уран в квадрате к управителю 7 дома. В транзите Уран вошел в соединение с Десцендентом, а прогрессивная Луна шла по 7 дому. Муж активно настаивал на "как раньше": больше контроля, меньше личной свободы. Сценарий по карте позволял и резкий развод, и честную перестройку. В итоге через терапию и договоренности они не разошлись, а изменили правила. Развод не случился, хотя набор "под него" был. Именно это показывает, что даже при жестких транзитах у вас остается выбор.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Key Takeaways */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Главное, что стоит запомнить</h2>
            
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>В астрологии нет одной "планеты развода". Это всегда комплекс показателей, повторяющий один и тот же сюжет.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>7 дом и его управитель - база анализа. Уран, Плутон, Марс и Сатурн могут усиливать тему разводов, но также дают ресурс для роста.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Венера и Марс показывают не только "сколько браков", а ваш стиль любви и конфликтов. Работать нужно именно с этим.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Родительский опыт и 4 дом могут тянуть в повторение сценария. Осознанность и терапия помогают его переписать.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Сложные аспекты не приговаривают к одиночеству. Они требуют сознательных решений, личной работы и честности с собой и партнером.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">FAQ</h2>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">1. Можно ли точно предсказать развод по натальной карте?</h3>
                  <p className="text-muted-foreground">
                    Нет, карта не дает приговор. Она показывает склонности, сценарии и зоны уязвимости. Даже при "тяжелых" показателях брак может быть долгим и счастливым, если вы осознанно работаете с собой и отношениями.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">2. Уран в 7 доме обязательно означает развод?</h3>
                  <p className="text-muted-foreground">
                    Не обязательно. Уран говорит о потребности в свободе и переменах. При правильном проживании это может быть нетрадиционный, но устойчивый формат отношений: раздельное проживание, открытый брак, частые смены обстановки вместе.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">3. Что важнее для темы разводов: 7 дом или Венера?</h3>
                  <p className="text-muted-foreground">
                    Оба важны, но смотрят разное. 7 дом - про формат брака и партнерства в целом. Венера - про ваши ценности и стиль любви. Идеально смотреть их вместе, чтобы увидеть полную картину.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">4. У меня напряженный 7 дом. Мне вообще не нужен брак?</h3>
                  <p className="text-muted-foreground">
                    Совсем нет. Напряженный 7 дом просто требует больше осознанности. Многие люди с такими картами строят крепкие союзы, потому что изначально знают: придется работать, договариваться, не идеализировать.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">5. Как использовать знание о разводах в карте на практике?</h3>
                  <p className="text-muted-foreground">
                    Знание - это не приговор, а инструкция. Если видите склонность к резким решениям, учитесь паузе перед действием. Если видите контроль и власть, идите в терапию. Если есть тема финансов, стройте договоренности на берегу.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-8 pb-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Получите 5 моментальных отчётов бесплатно</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Начните с готовых мини-результатов за пару минут
              </p>
              <Button size="lg" className="font-semibold" asChild>
                <a href="https://t.me/aidzenbot" target="_blank" rel="noopener noreferrer">
                  Получить 5 отчётов
                </a>
              </Button>
            </CardContent>
          </Card>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-20">
        <div className="container py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <img src="/logo.png" alt="НейроДзен" className="h-8" />
              </Link>
              <p className="text-sm text-muted-foreground">
                Персональная астрология и нумерология на основе ИИ
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Юридическая информация</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/dataprocessingpolicy" className="text-muted-foreground hover:text-primary transition-colors">
                    Политика конфиденциальности
                  </Link>
                </li>
                <li>
                  <Link to="/dataprocessing" className="text-muted-foreground hover:text-primary transition-colors">
                    Обработка данных
                  </Link>
                </li>
                <li>
                  <Link to="/marketingacceptance" className="text-muted-foreground hover:text-primary transition-colors">
                    Публичная оферта
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://t.me/aidzenbot" target="_blank" rel="noopener noreferrer">
                    Telegram Bot
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://apps.rustore.ru/app/com.aidzen.twa" target="_blank" rel="noopener noreferrer">
                    RuStore
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 НейроДзен. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DivorceInAstrology;