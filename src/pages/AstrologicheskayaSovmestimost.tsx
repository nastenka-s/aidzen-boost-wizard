import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, BookOpen, MessageCircle, Smartphone, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "@/assets/logo.png";

const AstrologicheskayaSovmestimost = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Астрологическая совместимость: как читать синастрию по натальным картам | НейроДзен</title>
        <meta name="description" content="Как определить совместимость по натальным картам. Какие планеты, аспекты и дома отвечают за отношения в синастрии и где проходят границы метода." />
        <meta name="keywords" content="астрологическая совместимость, синастрия натальных карт, совместимость по гороскопу, астрология отношений, совместимость партнеров астрология, Венера Марс совместимость, 7 дом совместимость" />
        <link rel="canonical" href="https://aidzen.ru/astrologicheskaya-sovmestimost" />
        
        <meta property="og:title" content="Астрологическая совместимость: как читать синастрию по натальным картам" />
        <meta property="og:description" content="Как определить совместимость по натальным картам. Какие планеты, аспекты и дома отвечают за отношения в синастрии." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://aidzen.ru/astrologicheskaya-sovmestimost" />
        <meta property="article:published_time" content="2026-02-19" />
        <meta property="article:author" content="НейроДзен" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Астрологическая совместимость: как читать синастрию" />
        <meta name="twitter:description" content="Как определить совместимость по натальным картам. Какие планеты и аспекты отвечают за отношения." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Астрологическая совместимость: как читать синастрию по натальным картам",
            "description": "Как определить совместимость по натальным картам. Какие планеты, аспекты и дома отвечают за отношения в синастрии.",
            "author": { "@type": "Organization", "name": "НейроДзен" },
            "publisher": { "@type": "Organization", "name": "НейроДзен", "logo": { "@type": "ImageObject", "url": "https://aidzen.ru/logo.png" } },
            "datePublished": "2026-02-19",
            "mainEntityOfPage": { "@type": "WebPage", "@id": "https://aidzen.ru/astrologicheskaya-sovmestimost" }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://aidzen.ru/" },
              { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://aidzen.ru/blog" },
              { "@type": "ListItem", "position": 3, "name": "Астрологическая совместимость" }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Можно ли по натальным картам точно определить, подходят ли два человека?",
                "acceptedAnswer": { "@type": "Answer", "text": "Синастрия показывает потенциал взаимодействия — зоны лёгкости и напряжения. Но она не даёт однозначного ответа «да» или «нет». Совместимость зависит от зрелости обоих партнёров, а не только от карты." }
              },
              {
                "@type": "Question",
                "name": "Какие планеты самые важные для совместимости?",
                "acceptedAnswer": { "@type": "Answer", "text": "Венера и Марс отвечают за притяжение и страсть. Луна — за эмоциональный комфорт. Солнце — за общие цели. Сатурн — за долгосрочность и обязательства. Все они важны, но приоритет зависит от запроса." }
              },
              {
                "@type": "Question",
                "name": "Что такое композитная карта и чем она отличается от синастрии?",
                "acceptedAnswer": { "@type": "Answer", "text": "Синастрия сравнивает две отдельные карты. Композит — это одна объединённая карта пары, рассчитанная как средние точки между планетами партнёров. Композит показывает характер самих отношений как отдельной сущности." }
              },
              {
                "@type": "Question",
                "name": "Если в синастрии много квадратур, отношения обречены?",
                "acceptedAnswer": { "@type": "Answer", "text": "Нет. Квадратуры создают напряжение, но именно оно часто становится источником роста. Многие крепкие пары имеют напряжённые аспекты — они не дают отношениям стать скучными." }
              },
              {
                "@type": "Question",
                "name": "Нужно ли знать точное время рождения для синастрии?",
                "acceptedAnswer": { "@type": "Answer", "text": "Для полной синастрии — да, потому что без времени рождения нельзя определить Асцендент, дома и точное положение Луны. Без этих данных анализ будет неполным." }
              }
            ]
          })}
        </script>
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
      <article className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
          {" / "}
          <Link to="/blog" className="hover:text-primary transition-colors">Блог</Link>
          {" / "}
          <span className="text-foreground">Астрологическая совместимость</span>
        </nav>

        {/* Header */}
        <header className="mb-12 space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="outline" className="border-primary/30 text-primary font-medium">
              <Heart className="w-3 h-3 mr-1" />
              Астрология отношений
            </Badge>
            <Badge variant="outline" className="border-border/50">
              <BookOpen className="w-3 h-3 mr-1" />
              12 мин чтения
            </Badge>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Астрологическая совместимость: как читать синастрию по натальным картам
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Почему с одним человеком разговор не клеится с первой минуты, а с другим — ощущение, будто знакомы всю жизнь? Синастрия — метод сравнения двух натальных карт — показывает, где между людьми возникает притяжение, где трение, а где потенциал для глубокой связи. Разбираем, как это работает, какие планеты и дома отвечают за совместимость и где метод заканчивается.
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border/40 pt-6">
            <time dateTime="2026-02-19">19 февраля, 2026</time>
          </div>
        </header>

        {/* Content Sections */}
        <div className="prose prose-lg max-w-none space-y-8">
          
          {/* Что такое синастрия */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Что такое синастрия и зачем она нужна</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Синастрия — это наложение натальной карты одного человека на карту другого. Астролог смотрит, как планеты первого партнёра взаимодействуют с планетами и домами второго. Это не «гадание на любовь», а структурный анализ энергетического взаимодействия.
            </p>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Что показывает синастрия
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Зоны естественного притяжения — где вам легко вместе.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Точки напряжения — где будут конфликты и чему они учат.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Эмоциональная совместимость — насколько партнёры чувствуют друг друга.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Потенциал длительности — есть ли «клей» для долгих отношений.</span>
                </li>
              </ul>
            </Card>
          </section>

          {/* Ключевые планеты */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Какие планеты отвечают за совместимость</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Не все планеты одинаково важны в синастрии. Каждая отвечает за свой «слой» отношений — от физического притяжения до духовной связи.
            </p>

            <div className="space-y-4">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-semibold mb-2">☉ Солнце — общие цели и направление</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Если Солнца партнёров в гармоничном аспекте (трин, секстиль), им легко двигаться в одном направлении. Квадратура Солнц часто создаёт ощущение «мы хотим разного». Это не фатально, но требует компромиссов.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-semibold mb-2">☽ Луна — эмоциональный комфорт</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Луна — самый важный фактор для совместной жизни. Если Луны совместимы, партнёры чувствуют себя «дома» друг с другом. Луна одного на Солнце другого — классический показатель крепкой связи. Напряжённые аспекты Лун — постоянное эмоциональное несовпадение.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-semibold mb-2">♀ Венера — любовь и притяжение</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Венера показывает, как человек любит и чего ждёт от партнёра. Венера одного на Марсе другого — мощное физическое и романтическое притяжение. Венера на Венере — общие вкусы, ценности и стиль жизни.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-semibold mb-2">♂ Марс — страсть и конфликты</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Марс отвечает за сексуальное влечение и за то, как пара справляется с агрессией. Гармоничные аспекты Марса — здоровая страсть. Квадратура Марсов — частые ссоры, борьба за контроль.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-semibold mb-2">♄ Сатурн — долгосрочность и обязательства</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Сатурн в синастрии — это «клей». Если Сатурн одного партнёра в аспекте к личным планетам другого, отношения приобретают серьёзность и структуру. Но избыток Сатурна может превратить союз в обязанность, а не радость.
                </p>
              </Card>
            </div>
          </section>

          {/* Аспекты */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Аспекты в синастрии: гармония и напряжение</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Аспект — это угловое расстояние между планетами двух карт. Разные аспекты создают разную динамику.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold">Аспект</th>
                    <th className="text-left p-3 font-semibold">Градусы</th>
                    <th className="text-left p-3 font-semibold">Характер</th>
                    <th className="text-left p-3 font-semibold">Что даёт в отношениях</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { aspect: "Соединение", deg: "0°", char: "Усиление", effect: "Максимальное резонирование. Может быть и гармонией, и перегрузкой — зависит от планет." },
                    { aspect: "Секстиль", deg: "60°", char: "Гармония", effect: "Лёгкое взаимодействие, поддержка, дружеское тепло." },
                    { aspect: "Квадратура", deg: "90°", char: "Напряжение", effect: "Трение, вызовы, но и мощная энергия роста. Не даёт застояться." },
                    { aspect: "Трин", deg: "120°", char: "Гармония", effect: "Естественное понимание. Иногда настолько комфортно, что нет стимула развиваться." },
                    { aspect: "Оппозиция", deg: "180°", char: "Полярность", effect: "Притяжение противоположностей. Учит видеть себя через партнёра." }
                  ].map((row) => (
                    <tr key={row.aspect} className="border-b border-border/30 hover:bg-muted/50 transition-colors">
                      <td className="p-3 font-semibold text-primary">{row.aspect}</td>
                      <td className="p-3 text-muted-foreground">{row.deg}</td>
                      <td className="p-3 text-muted-foreground">{row.char}</td>
                      <td className="p-3 text-muted-foreground">{row.effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-primary">Важно:</strong> один аспект не определяет судьбу отношений. Анализируется вся картина в целом — баланс гармоничных и напряжённых связей, а также какие именно планеты задействованы.
              </p>
            </Card>
          </section>

          {/* Дома в синастрии */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Дома в синастрии: куда попадают планеты партнёра</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Когда планеты одного человека попадают в дома другого, они «активируют» определённые сферы жизни. Это показывает, какую роль партнёр играет в вашей жизни.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold">Дом</th>
                    <th className="text-left p-3 font-semibold">Что активирует партнёр</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { house: "1 дом", effect: "Сильное личное влияние. Партнёр меняет вашу самоидентификацию." },
                    { house: "4 дом", effect: "Тема семьи, дома, корней. Ощущение «родного человека»." },
                    { house: "5 дом", effect: "Романтика, творчество, влюблённость. Лёгкость и радость." },
                    { house: "7 дом", effect: "Классический показатель партнёрства. Человек воспринимается как «вторая половина»." },
                    { house: "8 дом", effect: "Глубокая трансформация, страсть, кризисы. Отношения «на грани»." },
                    { house: "10 дом", effect: "Партнёр влияет на карьеру и социальный статус." },
                    { house: "12 дом", effect: "Тайная связь, кармические уроки. Часто непроговорённые чувства." }
                  ].map((row) => (
                    <tr key={row.house} className="border-b border-border/30 hover:bg-muted/50 transition-colors">
                      <td className="p-3 font-semibold text-primary">{row.house}</td>
                      <td className="p-3 text-muted-foreground">{row.effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Кармические показатели */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Кармические показатели: узлы и Плутон</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Лунные узлы в синастрии показывают, есть ли между людьми кармическая связь — ощущение «мы встретились не просто так».
            </p>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-xl font-semibold mb-3">Северный узел (Раху)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Если планеты партнёра соединяются с вашим Северным узлом, этот человек помогает вам двигаться к вашему предназначению. Такие отношения воспринимаются как значимые и развивающие, хотя не всегда комфортные.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-xl font-semibold mb-3">Южный узел (Кету)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Связь с Южным узлом даёт ощущение «знакомости с первой встречи». Это комфортно, но может тянуть назад — в старые паттерны. Важно осознавать, не застреваете ли вы в привычном, вместо того чтобы расти.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-xl font-semibold mb-3">Плутон в синастрии</h3>
              <p className="text-muted-foreground leading-relaxed">
                Плутон создаёт мощную, иногда obsessive связь. Аспекты Плутона к личным планетам — это трансформация через отношения. Такие союзы меняют обоих, но могут сопровождаться борьбой за власть.
              </p>
            </Card>
          </section>

          {/* Мини-кейсы */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Мини-кейсы</h2>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-xl font-semibold mb-3">Кейс 1: «Магнит с первой встречи»</h3>
              <p className="text-muted-foreground leading-relaxed">
                Венера Анны точно на Марсе Сергея, его Луна в её 7 доме. С первого свидания — ощущение сильного притяжения и «правильности». Но квадратура Сатурна к её Венере со временем создала тему «он меня ограничивает». Понимание этого аспекта помогло перестать обвинять партнёра и увидеть, что Сатурн учит зрелой любви.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-xl font-semibold mb-3">Кейс 2: «Тихая глубина»</h3>
              <p className="text-muted-foreground leading-relaxed">
                У Марины и Дмитрия мало ярких аспектов — нет «искры». Но его Луна в трине к её Луне, а Солнца в секстиле. Их отношения похожи на тихую реку: без драмы, но с глубоким пониманием. Именно такие синастрии часто дают самые долгие браки — не на страсти, а на дружбе.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-xl font-semibold mb-3">Кейс 3: «Кармический урок»</h3>
              <p className="text-muted-foreground leading-relaxed">
                Плутон Ольги на Солнце Алексея, его Северный узел на её Венере. Отношения были интенсивными: постоянные трансформации, кризисы, невозможность расстаться. Через 5 лет они расстались, но оба признали: эти отношения полностью изменили их понимание себя.
              </p>
            </Card>
          </section>

          {/* Риски и ограничения */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Риски и ограничения метода</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Синастрия — мощный инструмент, но у неё есть чёткие границы.
            </p>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-destructive/20">
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-destructive font-semibold">⚠</span>
                  <span className="text-muted-foreground"><strong>Карта не заменяет терапию.</strong> Если в отношениях есть насилие или зависимость, никакие «хорошие аспекты» это не оправдывают.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-destructive font-semibold">⚠</span>
                  <span className="text-muted-foreground"><strong>Синастрия не предсказывает будущее.</strong> Она показывает потенциал, а не гарантию. Отношения строят люди, а не планеты.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-destructive font-semibold">⚠</span>
                  <span className="text-muted-foreground"><strong>Без точного времени рождения анализ неполный.</strong> Дома, Асцендент и точное положение Луны требуют точного времени.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-destructive font-semibold">⚠</span>
                  <span className="text-muted-foreground"><strong>Один аспект — не приговор.</strong> Нельзя делать выводы по одной квадратуре или одному трину. Важна вся картина.</span>
                </li>
              </ul>
            </Card>
          </section>

          {/* Выводы */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">ВЫВОДЫ</h2>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Синастрия сравнивает две натальные карты и показывает зоны притяжения, напряжения и роста.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Венера, Марс и Луна — ключевые планеты для романтической совместимости. Сатурн — для долгосрочности.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Гармоничные аспекты дают лёгкость, напряжённые — мотивацию к развитию. Нужен баланс.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Дома показывают, какую роль партнёр играет в вашей жизни — от романтики до трансформации.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Кармические показатели (узлы, Плутон) указывают на глубину и значимость связи.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Синастрия — инструмент понимания, а не приговор. Отношения строят люди, а не звёзды.</span>
                </li>
              </ul>
            </Card>
          </section>

          {/* CTA */}
          <section className="my-12">
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Получите 3 моментальных отчёта бесплатно</h3>
                <p className="text-muted-foreground">
                  Начните с готовых мини-результатов за пару минут
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
                  <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                    Получить 3 отчёта
                  </a>
                </Button>
              </div>
            </Card>
          </section>

          {/* FAQ */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">FAQ</h2>
            
            <div className="space-y-4">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold mb-2">Можно ли по натальным картам точно определить, подходят ли два человека?</h3>
                <p className="text-muted-foreground">
                  Синастрия показывает потенциал взаимодействия — зоны лёгкости и напряжения. Но она не даёт однозначного ответа «да» или «нет». Совместимость зависит от зрелости обоих партнёров, а не только от карты.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold mb-2">Какие планеты самые важные для совместимости?</h3>
                <p className="text-muted-foreground">
                  Венера и Марс отвечают за притяжение и страсть. Луна — за эмоциональный комфорт. Солнце — за общие цели. Сатурн — за долгосрочность и обязательства. Все они важны, но приоритет зависит от запроса.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold mb-2">Что такое композитная карта и чем она отличается от синастрии?</h3>
                <p className="text-muted-foreground">
                  Синастрия сравнивает две отдельные карты. Композит — это одна объединённая карта пары, рассчитанная как средние точки между планетами партнёров. Композит показывает характер самих отношений как отдельной сущности.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold mb-2">Если в синастрии много квадратур, отношения обречены?</h3>
                <p className="text-muted-foreground">
                  Нет. Квадратуры создают напряжение, но именно оно часто становится источником роста. Многие крепкие пары имеют напряжённые аспекты — они не дают отношениям стать скучными.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold mb-2">Нужно ли знать точное время рождения для синастрии?</h3>
                <p className="text-muted-foreground">
                  Для полной синастрии — да, потому что без времени рождения нельзя определить Асцендент, дома и точное положение Луны. Без этих данных анализ будет неполным.
                </p>
              </Card>
            </div>
          </section>

        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 mt-16">
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

export default AstrologicheskayaSovmestimost;