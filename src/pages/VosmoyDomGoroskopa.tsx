import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, TrendingUp, Heart, AlertTriangle, DollarSign, Shield, Users, Sparkles } from "lucide-react";

const VosmoyDomGoroskopa = () => {
  return (
    <>
      <Helmet>
        <title>8 дом в натальной карте: деньги партнёра, кризисы и сила | Нейродзен</title>
        <meta name="description" content="Что значит 8 дом в натальной карте у женщины. Как его найти, как читать деньги партнёра, кредиты, наследство, секс и кризисы, и какие риски учитывать." />
        <meta name="keywords" content="8 дом в натальной карте, восьмой дом астрология, 8 дом гороскопа значение, 8 дом деньги партнёра, 8 дом кредиты и долги, 8 дом секс и близость, планеты в 8 доме, 8 дом риски и кризисы" />
        <link rel="canonical" href="https://aidzen.ru/8-dom-v-natalnoj-karte" />
        <meta property="og:title" content="8 дом в натальной карте: деньги партнёра, кризисы и сила" />
        <meta property="og:description" content="Что значит 8 дом в натальной карте у женщины. Как его найти, как читать деньги партнёра, кредиты, наследство, секс и кризисы." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://aidzen.ru/8-dom-v-natalnoj-karte" />
        <meta property="og:image" content="https://aidzen.ru/logo.png" />
        <meta property="article:published_time" content="2025-12-02" />
        <meta property="article:section" content="Астрология" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="8 дом в натальной карте: деньги партнёра, кризисы и сила" />
        <meta name="twitter:description" content="Что значит 8 дом в натальной карте у женщины. Как его найти, как читать деньги партнёра, кредиты, наследство, секс и кризисы." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "8 дом в натальной карте: деньги партнёра, кризисы и сила",
            "description": "Что значит 8 дом в натальной карте у женщины. Как его найти, как читать деньги партнёра, кредиты, наследство, секс и кризисы.",
            "author": { "@type": "Organization", "name": "Нейродзен" },
            "publisher": { "@type": "Organization", "name": "Нейродзен", "logo": { "@type": "ImageObject", "url": "https://aidzen.ru/logo.png" } },
            "datePublished": "2025-12-02",
            "mainEntityOfPage": { "@type": "WebPage", "@id": "https://aidzen.ru/8-dom-v-natalnoj-karte" }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://aidzen.ru" },
              { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://aidzen.ru/blog" },
              { "@type": "ListItem", "position": 3, "name": "8 дом в натальной карте", "item": "https://aidzen.ru/8-dom-v-natalnoj-karte" }
            ]
          })}
        </script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Астрология • 10 минут чтения
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                8 дом в натальной карте: кризисы, деньги партнёра и ваша внутренняя сила
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Восьмой дом часто пугает. Его связывают с потерями, кризисами и смертью. На самом деле 8 дом показывает, как вы проходите через сложные ситуации, как обращаетесь с чужими деньгами, насколько глубоко умеете сближаться с людьми и во что превращаете свои кризисы.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Что такое 8 дом */}
            <section className="mb-12">
              <Card className="border-primary/20 bg-card/50 backdrop-blur">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Что такое 8 дом: простым языком</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    8 дом в астрологии отвечает за темы, которые обычно не лежат на поверхности:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                      <DollarSign className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">Чужие деньги:</span>
                        <span className="text-muted-foreground"> доходы партнёра, совместный бюджет, кредиты, налоги, алименты, наследство</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                      <TrendingUp className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">Кризисы и трансформации:</span>
                        <span className="text-muted-foreground"> разводы, банкротства, операции, эмоциональные встряски</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                      <Heart className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">Интимность:</span>
                        <span className="text-muted-foreground"> глубина близости, доверие, тема «я обнажён(а) не только телом, но и душой»</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                      <AlertTriangle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">Табу и страхи:</span>
                        <span className="text-muted-foreground"> контроль, ревность, зависимость, манипуляции</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50 md:col-span-2">
                      <Shield className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">Психологическая глубина:</span>
                        <span className="text-muted-foreground"> способность пережить и «воскреснуть», выйти из тяжёлого сильнее</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-foreground font-medium">
                      Важно: 8 дом не говорит, что «обязательно будет плохо». Он показывает, где ваша зона повышенного напряжения и одновременно зона роста. Как мышца — там, где больно, там и сила, если правильно работать.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Как найти 8 дом */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Как найти свой 8 дом: инструкция по шагам</h2>
              
              <div className="space-y-6">
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Шаг 1. Подготовьте данные</h3>
                    <p className="text-muted-foreground mb-4">Вам нужны три параметра:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center flex-shrink-0">1</span>
                        Дата рождения
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center flex-shrink-0">2</span>
                        Точное время рождения (чем точнее, тем лучше)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center flex-shrink-0">3</span>
                        Город рождения
                      </li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-4 italic">
                      Без времени дома будут «плавать», и трактовка по 8 дому будет неточной.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Шаг 2. Постройте натальную карту</h3>
                    <p className="text-muted-foreground">
                      В любом астрологическом сервисе или программе введите свои данные и постройте натальную карту.
                      На круге карты вы увидите 12 секторов с цифрами от 1 до 12. Это дома. Нас интересует сектор с цифрой 8.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Шаг 3. Что смотреть в 8 доме</h3>
                    <p className="text-muted-foreground mb-4">В идеале нужно записать три вещи:</p>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                        <h4 className="font-semibold text-foreground mb-2">Знак на куспиде 8 дома</h4>
                        <p className="text-sm text-muted-foreground">Это знак зодиака на границе 8 дома. Он показывает стиль, в котором вы проходите кризисы и обращаетесь с чужими деньгами.</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                        <h4 className="font-semibold text-foreground mb-2">Планеты внутри 8 дома</h4>
                        <p className="text-sm text-muted-foreground">Есть ли планеты в этом секторе. Какие. Каждая добавляет свою тему и риск.</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                        <h4 className="font-semibold text-foreground mb-2">Управитель 8 дома</h4>
                        <p className="text-sm text-muted-foreground">Планета, которая управляет знаком на куспиде. Смотрите, в каком доме стоит эта планета — там раскрываются главные сцены ваших кризисов.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Значение по знакам */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Значение 8 дома по знакам</h2>
              <p className="text-muted-foreground mb-6">Короткие характеристики по знакам на куспиде 8 дома:</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { sign: "8 дом в Овне", signal: "Кризисы приходят резко, часто через конфликты и импульсивные решения.", meaning: "Вы учитесь управлять своей силой и гневом.", action: "Не подписывать договоры и кредиты «на эмоциях», соблюдать паузу." },
                  { sign: "8 дом в Тельце", signal: "Главная тема кризисов — деньги, имущество, стабильность.", meaning: "Вы проходите уроки ценности и умения опираться на себя.", action: "Учиться финансовой грамотности, не отдавать партнёру полный контроль над деньгами." },
                  { sign: "8 дом в Близнецах", signal: "Кризисы через информацию, документы, разговоры, сплетни.", meaning: "Учитесь фильтровать информацию и не сливать секреты.", action: "Внимательно читать договоры, не обсуждать интимное с кем попало." },
                  { sign: "8 дом в Раке", signal: "Сильные эмоциональные кризисы, часто через семью, дом, детей.", meaning: "Вырастить эмоциональную зрелость, сепарироваться от родовых сценариев.", action: "Работать с личной терапией, не растворяться в чужой боли." },
                  { sign: "8 дом во Льве", signal: "Кризисы через тему признания, гордости, романов, творчества.", meaning: "Учитесь оставаться собой, даже когда рушится «сцена» и зрители уходят.", action: "Не делать из партнёра «бога», развивать собственные проекты и самоуважение." },
                  { sign: "8 дом в Деве", signal: "Кризисы через здоровье, работу, контроль и перфекционизм.", meaning: "Отпустить идею «я должна всё держать в руках».", action: "Делегировать, следить за психосоматикой, не заедать тревогу контролем." },
                  { sign: "8 дом в Весах", signal: "Главные кризисы — в отношениях и партнёрстве.", meaning: "Учитесь балансу «я и другой», справедливому обмену.", action: "Обсуждать финансовые и интимные договорённости заранее." },
                  { sign: "8 дом в Скорпионе", signal: "Глубокие, мощные, иногда резкие трансформации.", meaning: "Вы рождены для сильных внутренних перерождений.", action: "Развивать психологическую осознанность, не играть в власть и контроль." },
                  { sign: "8 дом в Стрельце", signal: "Кризисы через чужие мировоззрения, юридические темы, дальние поездки.", meaning: "Расширить взгляды, уйти из узких рамок.", action: "Проверять юридические моменты, не идеализировать «учителей» и гуру." },
                  { sign: "8 дом в Козероге", signal: "Кризисы через работу, статус, обязанность, страх потери опоры.", meaning: "Выстраивать свои правила и границы.", action: "Планировать финансовую подушку, не принимать всю ответственность за других." },
                  { sign: "8 дом в Водолее", signal: "Внезапные изменения, нестандартные кризисы, неожиданные повороты в деньгах.", meaning: "Научиться гибкости и принятию перемен.", action: "Иметь резервный план, не привязываться к одному источнику дохода." },
                  { sign: "8 дом в Рыбах", signal: "Размытые финансы, скрытые истории, путаница в документах, тайные связи.", meaning: "Учиться видеть реальность, а не жить только ощущениями.", action: "Всё фиксировать письменно, не давать в долг «из жалости»." }
                ].map((item, index) => (
                  <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-3">{item.sign}</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-primary font-medium">Сигнал:</span> <span className="text-muted-foreground">{item.signal}</span></p>
                        <p><span className="text-primary font-medium">Смысл:</span> <span className="text-muted-foreground">{item.meaning}</span></p>
                        <p><span className="text-primary font-medium">Действие:</span> <span className="text-muted-foreground">{item.action}</span></p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Планеты в 8 доме */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Планеты в 8 доме: где подсвечены риски</h2>
              <p className="text-muted-foreground mb-6">
                Если в 8 доме есть планеты, их темы становятся особенно заметны в кризисах и при работе с чужими деньгами.
              </p>
              
              <div className="space-y-4">
                {[
                  { planet: "Луна в 8 доме", signal: "Эмоции включаются на максимум при любых изменениях. Часто сильная привязка к партнёру и его деньгам.", meaning: "Вы эмоционально завязаны на тему безопасности, но ищете её через другого.", action: "Учиться успокаивать себя самостоятельно, не «прилипать» к финансово сильному партнёру." },
                  { planet: "Венера в 8 доме", signal: "Притяжение к интенсивным отношениям, магнитичность, тема подарков и финансов от партнёра.", meaning: "Вы можете получать поддержку, но есть риск платить за это своей свободой и самоуважением.", action: "Не входить в связи только ради денег. Проверять, не «покупают» ли вас комфортом." },
                  { planet: "Марс в 8 доме", signal: "Вспышки конфликтов из-за денег, ревности, контроля.", meaning: "Вы мощно проживаете страсть и агрессию, можете разрушить или защитить.", action: "Переводить энергию в конструктивную работу, спорт, активные действия, а не в скандалы и войны за ресурсы." },
                  { planet: "Юпитер в 8 доме", signal: "Крупные суммы, кредиты, наследства, финансовые потоки через других людей.", meaning: "Потенциал крупных совместных ресурсов, но и склонность «раздувать» риски.", action: "Не брать на себя слишком большие обязательства, считать риски и проценты, консультироваться со специалистами." },
                  { planet: "Сатурн в 8 доме", signal: "Тяжёлые, долгие уроки в теме долгов, совместных денег, секса и доверия.", meaning: "Вы учитесь взрослой ответственности в кризисах.", action: "Строить долгосрочный финансовый план, не уходить от сложных разговоров о деньгах и близости." },
                  { planet: "Плутон в 8 доме", signal: "Очень мощные трансформации. Часто истории «рухнуло всё, но я выжила и стала другой».", meaning: "Вы проходите через крайние точки, чтобы открыть свою глубинную силу.", action: "Не играть в манипуляции, власть, «либо всё, либо ничего». Отслеживать токсичные связи." }
                ].map((item, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">{item.planet}</h3>
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <span className="text-primary font-medium min-w-[70px]">Сигнал:</span>
                          <span className="text-muted-foreground">{item.signal}</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-primary font-medium min-w-[70px]">Смысл:</span>
                          <span className="text-muted-foreground">{item.meaning}</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-primary font-medium min-w-[70px]">Действие:</span>
                          <span className="text-muted-foreground">{item.action}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <p className="text-muted-foreground mt-6 p-4 rounded-lg bg-muted/30">
                Если 8 дом пустой (без планет), это не значит «нет проблем». Просто акцент смещён на знак и управителя дома. Смотрите, где стоит управитель и какие у него аспекты.
              </p>
            </section>

            {/* Миникейсы */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Миникейсы из практики</h2>
              
              <div className="space-y-6">
                <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Кейс 1: «Мы взяли ипотеку, чтобы спасти отношения»</h3>
                    <p className="text-sm text-primary mb-4">Марина, 32 года. 8 дом в Раке, Луна в 8 доме, управитель 8 дома в 7 доме</p>
                    
                    <div className="space-y-4 text-muted-foreground">
                      <div>
                        <span className="font-medium text-foreground">Сценарий:</span> В отношениях было много эмоциональной зависимости. Партнёр предлагал: «Возьмём ипотеку, тогда точно не разбежимся». Марина согласилась из страха остаться одна.
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Как сыграл 8 дом:</span> Через пару лет чувства остыли, но общая ипотека держала в токсичном союзе. Разрыв всё равно случился, но уже через тяжёлый финансовый и эмоциональный кризис.
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Что помогло:</span> Осознав связку «страх одиночества + общие деньги», Марина на следующих этапах стала разделять: чувства отдельно, финансовые решения отдельно, и никогда больше не использует кредит как «клей» для отношений.
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Кейс 2: «Развод забрал всё, но вернул себя»</h3>
                    <p className="text-sm text-primary mb-4">Екатерина, 40 лет. 8 дом в Скорпионе, Плутон в 8 доме, Сатурн в аспекте</p>
                    
                    <div className="space-y-4 text-muted-foreground">
                      <div>
                        <span className="font-medium text-foreground">Сценарий:</span> Брак с финансово сильным партнёром, полная материальная зависимость. При разводе муж забрал почти всё, шли тяжёлые судебные процессы.
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Как сыграл 8 дом:</span> Классический кризис по 8 дому — потеря статуса, денег, привычной жизни. Но через это Екатерина получила сильный внутренний разворот. Пошла на обучение, перевела свой глубокий опыт в профессию психолога, выстроила свои доходы.
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Смысл 8 дома:</span> Сначала «умирает» прежняя жизнь, но потом рождается очень сильная, самостоятельная версия человека. Важно не цепляться за старое и не застревать в роли жертвы.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Теневая сторона и риски */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Теневая сторона 8 дома и как обойти риски</h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card className="border-destructive/20 bg-destructive/5">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">Финансовые зависимости</h3>
                    <p className="text-sm text-muted-foreground mb-3">Когда все крупные решения и ресурсы у партнёра. Риск остаться «ни с чем».</p>
                    <p className="text-sm text-primary">Действие: даже в счастливых отношениях иметь свой счёт и личные накопления.</p>
                  </CardContent>
                </Card>

                <Card className="border-destructive/20 bg-destructive/5">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">Токсичная близость</h3>
                    <p className="text-sm text-muted-foreground mb-3">Страсть, ревность, контроль, слияние «без границ».</p>
                    <p className="text-sm text-primary">Действие: выстраивать личные границы, не игнорировать тревожные сигналы.</p>
                  </CardContent>
                </Card>

                <Card className="border-destructive/20 bg-destructive/5">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">Игнорирование документов</h3>
                    <p className="text-sm text-muted-foreground mb-3">Подписать не читая, «я всё равно не понимаю».</p>
                    <p className="text-sm text-primary">Действие: для договоров, кредитов, наследства всегда консультироваться с профессионалами.</p>
                  </CardContent>
                </Card>

                <Card className="border-destructive/20 bg-destructive/5">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">Зацикленность на прошлом</h3>
                    <p className="text-sm text-muted-foreground mb-3">Постоянно прокручивать старые травмы, не позволять себе идти дальше.</p>
                    <p className="text-sm text-primary">Действие: работать с психологом, переводить опыт в осознанные выводы.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Рекомендации */}
            <section className="mb-12">
              <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">Рекомендации</h2>
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center flex-shrink-0">1</span>
                      Всегда смотрите знак и управителя 8 дома, а не только «страшные» трактовки
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center flex-shrink-0">2</span>
                      Отдельно выписывайте темы денег, секса и кризисов и наблюдайте, как они проявляются в жизни
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center flex-shrink-0">3</span>
                      Для серьёзных финансовых шагов используйте консультацию астролога или финансового специалиста
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </section>

            {/* Итоги */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Итоги по 8 дому</h2>
              <div className="space-y-4">
                {[
                  "8 дом показывает ваши кризисы, работу с чужими деньгами и глубину интимной близости, а не «обязательные беды».",
                  "Первый шаг в чтении — найти знак на куспиде 8 дома, планеты внутри и управителя дома.",
                  "Любой «сложный» показатель в 8 доме — это сигнал, где важно развивать осознанность.",
                  "Деньги партнёра, кредиты и наследства всегда требуют здравого смысла и консультаций.",
                  "Правильно прожитый 8 дом даёт огромный ресурс: психологическую устойчивость, финансовую зрелость и способность начинать новую жизнь даже после тяжёлых ударов."
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="mb-12">
              <Card className="border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Получите 3 моментальных отчёта бесплатно
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Начните с готовых мини-результатов за пару минут
                  </p>
                  <Button asChild size="lg" className="gap-2">
                    <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                      Получить 3 отчёта
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">FAQ по 8 дому</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    Как посчитать свой 8 дом, если я не знаю точное время рождения?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Без времени дома будут сильно смещаться, особенно 8 дом. Если вы не знаете точное время, попробуйте хотя бы сузить диапазон до пары часов по воспоминаниям родных. Есть метод ректификации времени рождения у астролога, когда по событиям жизни уточняется время. Без этого любые выводы по 8 дому будут очень приблизительными.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Что значит, если 8 дом пустой?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Пустой дом не значит, что темы не работают. Просто в них нет дополнительного «подсвета» планетами. В этом случае главное — знак на куспиде 8 дома и положение управителя этого знака. По ним и считываются сценарии. Планеты из других домов всё равно могут аспектировать 8 дом и включать его темы.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Как по 8 дому понять, стоит ли брать кредит?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Гороскоп не заменяет финансового планирования. Но 8 дом покажет ваш стиль обращения с кредитами. Если там много напряжения, важно быть особенно аккуратной. Считайте цифры, смотрите реальные сценарии: что будет, если доход уменьшится, какие есть подстраховки. Астрология здесь больше про «где я могу перегнуть палку», чем про «можно или нельзя».
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    8 дом и секс — это про «плохо» или «опасно»?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Не обязательно. 8 дом про глубину и интенсивность. У кого-то это проживается через очень глубокую сексуальную близость, у кого-то — через страхи и блоки. Важно отслеживать, где вы теряете себя: соглашаетесь ли на интим «в долг» или «чтобы не ушёл», позволяете ли пересекать границы. Тогда 8 дом становится не про опасность, а про честное взросление.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    Можно ли по 8 дому предсказать наследство или развод?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Предсказать «точно да или нет» нельзя. 8 дом показывает вероятность тем и «почву», на которой они могут развернуться. Наследство может проявиться как реальный денежный поток, а может как внутренний «родовой багаж», сценарии и установки. С разводом так же — астролог видит, что зона партнёрства и кризисов напряжена, но то, как вы проживёте её, зависит от ваших решений и работы над собой.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Навигация */}
            <div className="flex justify-center">
              <Button asChild variant="outline" className="gap-2">
                <Link to="/blog">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Все статьи блога
                </Link>
              </Button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default VosmoyDomGoroskopa;
