import { Button } from "@/components/ui/button";
import { ArrowLeft, Flame, Sword, Zap, Target, Shield, Heart, DollarSign, Book, Home, Briefcase, Users, Globe, Moon, Crown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const MarsVDomahGoroskopa = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Марс в домах гороскопа: значение и влияние в натальной карте | НейроДзен</title>
        <meta name="description" content="Марс в домах гороскопа: полный разбор значения Марса в каждом из 12 домов натальной карты. Узнайте, как позиция Марса влияет на энергию, амбиции, конфликты и сексуальность." />
        <meta name="keywords" content="марс в домах гороскопа, марс в натальной карте, марс в 1 доме, марс в 7 доме, марс в 10 доме, марс в 8 доме, марс значение, планета марс астрология, марс энергия, марс агрессия, дома гороскопа, натальная карта" />
        <link rel="canonical" href="https://aidzen.ru/mars-v-domah-goroskopa" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Марс в домах гороскопа: значение и влияние в натальной карте" />
        <meta property="og:description" content="Полный разбор значения Марса в каждом из 12 домов натальной карты. Как позиция Марса влияет на энергию, амбиции и действия." />
        <meta property="og:url" content="https://aidzen.ru/mars-v-domah-goroskopa" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://aidzen.ru/logo.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Марс в домах гороскопа: значение и влияние" />
        <meta name="twitter:description" content="Полный разбор Марса в 12 домах натальной карты" />
        
        {/* Article meta */}
        <meta property="article:published_time" content="2025-12-12" />
        <meta property="article:author" content="НейроДзен" />
        <meta property="article:section" content="Астрология" />
        <meta property="article:tag" content="Марс" />
        <meta property="article:tag" content="натальная карта" />
        <meta property="article:tag" content="дома гороскопа" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Марс в домах гороскопа: значение и влияние в натальной карте",
            "description": "Полный разбор значения Марса в каждом из 12 домов натальной карты",
            "image": "https://aidzen.ru/logo.png",
            "author": {
              "@type": "Organization",
              "name": "НейроДзен"
            },
            "publisher": {
              "@type": "Organization",
              "name": "НейроДзен",
              "logo": {
                "@type": "ImageObject",
                "url": "https://aidzen.ru/logo.png"
              }
            },
            "datePublished": "2025-12-12",
            "dateModified": "2025-12-12",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://aidzen.ru/mars-v-domah-goroskopa"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Главная",
                "item": "https://aidzen.ru"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Блог",
                "item": "https://aidzen.ru/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Марс в домах гороскопа",
                "item": "https://aidzen.ru/mars-v-domah-goroskopa"
              }
            ]
          })}
        </script>
      </Helmet>

      <Header />

      <article className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-primary">Блог</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Марс в домах гороскопа</span>
        </nav>

        <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient">
          Марс в домах гороскопа: полный разбор
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Марс — планета энергии, действия и страсти. Его положение в доме натальной карты показывает, в какой сфере жизни вы проявляете активность, амбиции и где возможны конфликты.
        </p>

        <div className="prose prose-lg max-w-none">
          {/* Введение */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Flame className="w-6 h-6 text-red-500" />
              Что означает Марс в астрологии
            </h2>
            <p className="mb-4">
              <strong>Марс в натальной карте</strong> отвечает за то, как мы действуем, боремся за свои цели, проявляем агрессию и сексуальность. Это планета воина — она показывает нашу силу, смелость и способ достижения желаемого.
            </p>
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <h3 className="font-semibold mb-3">Марс управляет:</h3>
              <ul className="space-y-2">
                <li>🔥 Энергией и физической активностью</li>
                <li>⚔️ Конфликтами и способом их разрешения</li>
                <li>🎯 Амбициями и целеустремлённостью</li>
                <li>💪 Силой воли и решительностью</li>
                <li>❤️‍🔥 Сексуальностью и страстью</li>
              </ul>
            </div>
            <p>
              Хотите узнать положение Марса в вашей карте? <Link to="/natal-chart-calculator" className="text-primary hover:underline">Рассчитайте натальную карту бесплатно</Link>.
            </p>
          </section>

          {/* Марс в 1 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-red-500" />
              Марс в 1 доме: прирождённый лидер
            </h2>
            <p className="mb-4">
              <strong>Марс в первом доме</strong> даёт мощную энергию, напористость и яркую индивидуальность. Такие люди — прирождённые лидеры, которые не боятся действовать первыми и идти напролом.
            </p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
              <strong className="text-red-400">Ключевые черты:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Высокая физическая активность и выносливость</li>
                <li>• Прямолинейность и нетерпеливость</li>
                <li>• Склонность к соревновательности</li>
                <li>• Возможна импульсивность и вспыльчивость</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Подробнее о первом доме: <Link to="/pervyi-dom-goroskopa-upravitel-aspekty" className="text-primary hover:underline">Первый дом гороскопа: асцендент и управители</Link>.
            </p>
          </section>

          {/* Марс во 2 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-500" />
              Марс во 2 доме: борец за ресурсы
            </h2>
            <p className="mb-4">
              <strong>Марс во втором доме</strong> направляет энергию на заработок и накопление. Человек активно борется за финансовую независимость, может быть агрессивен в денежных вопросах.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Финансовые проявления:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Активный заработок через физический труд</li>
                <li>• Импульсивные траты и рисковые вложения</li>
                <li>• Конкуренция за ресурсы</li>
                <li>• Способность быстро наращивать доход</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              О финансах в карте: <Link to="/2-dom-v-natalnoy-karte-aspekty-tranzity" className="text-primary hover:underline">2 дом в натальной карте: деньги и ресурсы</Link>.
            </p>
          </section>

          {/* Марс в 3 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Book className="w-6 h-6 text-blue-500" />
              Марс в 3 доме: острый ум и язык
            </h2>
            <p className="mb-4">
              <strong>Марс в третьем доме</strong> даёт быстрый ум, острый язык и способность отстаивать своё мнение. Возможны споры с братьями, сёстрами, соседями.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Проявления:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Талант к дебатам и спорам</li>
                <li>• Агрессивная манера общения</li>
                <li>• Быстрое обучение новому</li>
                <li>• Активные короткие поездки</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Подробнее: <Link to="/3-dom-goroskopa" className="text-primary hover:underline">3 дом гороскопа: общение и обучение</Link>.
            </p>
          </section>

          {/* Марс в 4 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Home className="w-6 h-6 text-orange-500" />
              Марс в 4 доме: энергия в доме
            </h2>
            <p className="mb-4">
              <strong>Марс в четвёртом доме</strong> приносит активность в семью и дом. Возможны конфликты с родителями, частые переезды, ремонты. Много энергии тратится на обустройство жилья.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Ключевые темы:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Активная домашняя жизнь</li>
                <li>• Конфликты в семье или с родителями</li>
                <li>• Частые переезды или ремонты</li>
                <li>• Защита своей территории</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Читайте также: <Link to="/4-dom-goroskopa" className="text-primary hover:underline">4 дом гороскопа: семья и корни</Link>.
            </p>
          </section>

          {/* Марс в 5 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-500" />
              Марс в 5 доме: страсть и творчество
            </h2>
            <p className="mb-4">
              <strong>Марс в пятом доме</strong> даёт яркую романтическую жизнь, страстные увлечения, спортивные хобби. Сильная энергия направлена на творчество и детей.
            </p>
            <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4 mb-4">
              <strong className="text-pink-400">Яркие проявления:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Бурные романы и страстная любовь</li>
                <li>• Спортивные и соревновательные хобби</li>
                <li>• Творческая энергия и драйв</li>
                <li>• Активные отношения с детьми</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Подробнее: <Link to="/5-dom-goroskopa" className="text-primary hover:underline">5 дом гороскопа: дети, любовь, творчество</Link>.
            </p>
          </section>

          {/* Марс в 6 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-gray-500" />
              Марс в 6 доме: трудоголик
            </h2>
            <p className="mb-4">
              <strong>Марс в шестом доме</strong> — положение трудоголика. Человек работает с полной отдачей, любит физический труд, спорт. Возможны конфликты с коллегами.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Рабочие проявления:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Высокая работоспособность</li>
                <li>• Конфликты на работе</li>
                <li>• Активный подход к здоровью</li>
                <li>• Работа с инструментами или техникой</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Читайте: <Link to="/shestoy-dom-goroskopa" className="text-primary hover:underline">6 дом гороскопа: работа и здоровье</Link>.
            </p>
          </section>

          {/* Марс в 7 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-purple-500" />
              Марс в 7 доме: страсть в партнёрстве
            </h2>
            <p className="mb-4">
              <strong>Марс в седьмом доме</strong> приносит страстные, но конфликтные отношения. Партнёр может быть активным, спортивным, иногда агрессивным. Важно учиться компромиссам.
            </p>
            <div className="bg-card border-2 border-red-500/30 rounded-2xl p-6 mb-4">
              <h4 className="font-semibold mb-3 text-red-400">⚡ Внимание в отношениях:</h4>
              <ul className="space-y-2">
                <li>• Притяжение к сильным партнёрам</li>
                <li>• Конфликты и споры в браке</li>
                <li>• Страстные, но бурные отношения</li>
                <li>• Важность здоровой конкуренции</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Подробнее: <Link to="/7-dom-goroskopa" className="text-primary hover:underline">7 дом гороскопа: брак и партнёрство</Link>.
            </p>
          </section>

          {/* Марс в 8 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-600" />
              Марс в 8 доме: трансформация через борьбу
            </h2>
            <p className="mb-4">
              <strong>Марс в восьмом доме</strong> — мощное положение. Сильная сексуальность, интерес к табуированным темам, способность проходить через кризисы. Возможны конфликты из-за денег партнёра или наследства.
            </p>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 mb-4">
              <strong className="text-purple-400">Глубинные проявления:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Интенсивная сексуальная энергия</li>
                <li>• Способность к регенерации</li>
                <li>• Интерес к оккультному и запретному</li>
                <li>• Борьба за чужие ресурсы</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Читайте: <Link to="/8-dom-v-natalnoj-karte" className="text-primary hover:underline">8 дом в натальной карте: кризисы и трансформации</Link>.
            </p>
          </section>

          {/* Марс в 9 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-teal-500" />
              Марс в 9 доме: воин идей
            </h2>
            <p className="mb-4">
              <strong>Марс в девятом доме</strong> даёт энергию на путешествия, обучение, борьбу за свои убеждения. Человек активно отстаивает свою философию и мировоззрение.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Проявления:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Активные дальние путешествия</li>
                <li>• Борьба за свои убеждения</li>
                <li>• Энергичное обучение и преподавание</li>
                <li>• Возможны конфликты на почве религии</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Подробнее: <Link to="/9-dom-v-natalnoj-karte" className="text-primary hover:underline">9 дом гороскопа: путешествия и философия</Link>.
            </p>
          </section>

          {/* Марс в 10 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              Марс в 10 доме: карьерный воин
            </h2>
            <p className="mb-4">
              <strong>Марс в десятом доме</strong> — одно из лучших положений для карьеры. Амбиции, напор, способность добиваться высоких позиций. Часто военная или спортивная карьера.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-4">
              <strong className="text-yellow-500">Карьерные проявления:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Сильные карьерные амбиции</li>
                <li>• Лидерские позиции и руководство</li>
                <li>• Конкуренция в профессии</li>
                <li>• Репутация решительного человека</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Читайте: <Link to="/10-dom-v-natalnoj-karte" className="text-primary hover:underline">10 дом в натальной карте: карьера и статус</Link>.
            </p>
          </section>

          {/* Марс в 11 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-500" />
              Марс в 11 доме: борец за идеалы
            </h2>
            <p className="mb-4">
              <strong>Марс в одиннадцатом доме</strong> направляет энергию на друзей, группы, социальные цели. Человек активен в коллективах, может быть лидером сообществ.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Социальные проявления:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Активность в группах и сообществах</li>
                <li>• Борьба за социальные идеалы</li>
                <li>• Конфликты с друзьями</li>
                <li>• Энергичное достижение целей</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Подробнее: <Link to="/11-dom-v-natalnoj-karte" className="text-primary hover:underline">11 дом в натальной карте: друзья и цели</Link>.
            </p>
          </section>

          {/* Марс в 12 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Moon className="w-6 h-6 text-indigo-500" />
              Марс в 12 доме: скрытая сила
            </h2>
            <p className="mb-4">
              <strong>Марс в двенадцатом доме</strong> — сложное положение. Энергия направлена внутрь, на подсознательные процессы. Возможны тайные враги, скрытая агрессия, работа в уединении.
            </p>
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 mb-4">
              <strong className="text-indigo-400">Глубинные темы:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Скрытая или подавленная агрессия</li>
                <li>• Работа за кулисами</li>
                <li>• Духовные практики и медитация</li>
                <li>• Возможные тайные враги</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Читайте: <Link to="/12-dom-v-natalnoj-karte" className="text-primary hover:underline">12 дом в натальной карте: подсознание и тайны</Link>.
            </p>
          </section>

          {/* Заключение */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Как использовать знание о Марсе</h2>
            <p className="mb-4">
              Понимание положения <strong>Марса в натальной карте</strong> помогает направить энергию в правильное русло. Вместо того чтобы подавлять агрессию, вы можете использовать её конструктивно.
            </p>
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-6">
              <h3 className="font-semibold mb-3">Практические рекомендации:</h3>
              <ul className="space-y-2">
                <li>🏃 Направляйте энергию Марса в спорт и физическую активность</li>
                <li>🎯 Используйте амбиции для достижения целей в доме Марса</li>
                <li>⚖️ Учитесь управлять гневом через осознанность</li>
                <li>🛡️ Защищайте свои границы, но избегайте лишней агрессии</li>
              </ul>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-card border border-border rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Узнайте положение Марса в вашей карте</h2>
            <p className="text-muted-foreground mb-6">
              Рассчитайте натальную карту бесплатно и получите полный анализ положения Марса и других планет.
            </p>
            <Link to="/natal-chart-calculator">
              <Button size="lg" className="gap-2">
                <Target className="w-5 h-5" />
                Рассчитать натальную карту
              </Button>
            </Link>
          </section>

          {/* Связанные статьи */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Читайте также</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/venera-v-domah-goroskopa" className="block p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors">
                <h3 className="font-semibold mb-2">Венера в домах гороскопа</h3>
                <p className="text-sm text-muted-foreground">Любовь, деньги и красота в натальной карте</p>
              </Link>
              <Link to="/tranzity-k-natalnoj-karte-i-ih-vliyanie" className="block p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors">
                <h3 className="font-semibold mb-2">Транзиты к натальной карте</h3>
                <p className="text-sm text-muted-foreground">Как читать влияние планет на события</p>
              </Link>
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default MarsVDomahGoroskopa;
