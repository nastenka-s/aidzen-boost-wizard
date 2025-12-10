import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Heart, Star, Gem, Home, Users, Briefcase, Book, Globe, DollarSign, Palette, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const VeneraVDomahGoroskopa = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Венера в домах гороскопа: значение и влияние в натальной карте | НейроДзен</title>
        <meta name="description" content="Венера в домах гороскопа: полный разбор значения Венеры в каждом из 12 домов натальной карты. Узнайте, как позиция Венеры влияет на любовь, деньги и отношения." />
        <meta name="keywords" content="венера в домах гороскопа, венера в натальной карте, венера в 1 доме, венера в 7 доме, венера в 2 доме, венера в 5 доме, венера в 8 доме, венера значение, планета венера астрология, венера любовь, венера деньги" />
        <link rel="canonical" href="https://aidzen.ru/venera-v-domah-goroskopa" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Венера в домах гороскопа: значение и влияние в натальной карте" />
        <meta property="og:description" content="Полный разбор значения Венеры в каждом из 12 домов натальной карты. Как позиция Венеры влияет на любовь, деньги и отношения." />
        <meta property="og:url" content="https://aidzen.ru/venera-v-domah-goroskopa" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://aidzen.ru/logo.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Венера в домах гороскопа: значение и влияние" />
        <meta name="twitter:description" content="Полный разбор Венеры в 12 домах натальной карты" />
        
        {/* Article meta */}
        <meta property="article:published_time" content="2025-12-10" />
        <meta property="article:author" content="НейроДзен" />
        <meta property="article:section" content="Астрология" />
        <meta property="article:tag" content="Венера" />
        <meta property="article:tag" content="натальная карта" />
        <meta property="article:tag" content="дома гороскопа" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Венера в домах гороскопа: значение и влияние в натальной карте",
            "description": "Полный разбор значения Венеры в каждом из 12 домов натальной карты",
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
            "datePublished": "2025-12-10",
            "dateModified": "2025-12-10",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://aidzen.ru/venera-v-domah-goroskopa"
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
                "name": "Венера в домах гороскопа",
                "item": "https://aidzen.ru/venera-v-domah-goroskopa"
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
          <span className="text-foreground">Венера в домах гороскопа</span>
        </nav>

        <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient">
          Венера в домах гороскопа: полный разбор
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Венера — планета любви, красоты и финансов. Её положение в доме натальной карты показывает, в какой сфере жизни вы ищете гармонию и удовольствие.
        </p>

        <div className="prose prose-lg max-w-none">
          {/* Введение */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-500" />
              Что означает Венера в астрологии
            </h2>
            <p className="mb-4">
              <strong>Венера в натальной карте</strong> отвечает за то, как мы любим, что ценим, как относимся к деньгам и красоте. Это планета притяжения — она показывает, что нас привлекает и как мы привлекаем других.
            </p>
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <h3 className="font-semibold mb-3">Венера управляет:</h3>
              <ul className="space-y-2">
                <li>♀ Любовью и романтическими отношениями</li>
                <li>💰 Деньгами и материальными ценностями</li>
                <li>✨ Красотой, эстетикой, искусством</li>
                <li>🤝 Партнёрством и социальными связями</li>
                <li>🍰 Удовольствиями и комфортом</li>
              </ul>
            </div>
            <p>
              Хотите узнать положение Венеры в вашей карте? <Link to="/natalchart" className="text-primary hover:underline">Рассчитайте натальную карту бесплатно</Link>.
            </p>
          </section>

          {/* Венера в 1 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-secondary" />
              Венера в 1 доме: природное обаяние
            </h2>
            <p className="mb-4">
              <strong>Венера в первом доме</strong> наделяет человека природной привлекательностью и обаянием. Такие люди легко нравятся окружающим, часто обладают приятной внешностью или манерами.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Ключевые черты:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Дипломатичность и мягкость в общении</li>
                <li>• Внимание к внешности и стилю</li>
                <li>• Стремление к гармонии в отношениях</li>
                <li>• Умение производить хорошее первое впечатление</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Подробнее о первом доме читайте в статье <Link to="/pervyi-dom-goroskopa-upravitel-aspekty" className="text-primary hover:underline">Первый дом гороскопа: асцендент и управители</Link>.
            </p>
          </section>

          {/* Венера во 2 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-500" />
              Венера во 2 доме: финансовый талант
            </h2>
            <p className="mb-4">
              <strong>Венера во втором доме</strong> — одно из лучших положений для финансов. Деньги приходят через красоту, искусство, моду, партнёрства. Человек умеет зарабатывать и ценит комфорт.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Финансовые таланты:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Заработок через творческие профессии</li>
                <li>• Умение привлекать деньги через связи</li>
                <li>• Любовь к качественным вещам</li>
                <li>• Стабильный доход при гармоничных аспектах</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              О финансах в карте: <Link to="/2-dom-v-natalnoy-karte-aspekty-tranzity" className="text-primary hover:underline">2 дом в натальной карте: деньги и ресурсы</Link>.
            </p>
          </section>

          {/* Венера в 3 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Book className="w-6 h-6 text-blue-500" />
              Венера в 3 доме: обаяние в общении
            </h2>
            <p className="mb-4">
              <strong>Венера в третьем доме</strong> даёт приятную речь, дипломатичность, любовь к обучению и коротким поездкам. Хорошие отношения с братьями, сёстрами, соседями.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Проявления:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Талант к переговорам и продажам</li>
                <li>• Красивая речь, писательские способности</li>
                <li>• Романтика в повседневном общении</li>
                <li>• Любовь к приятным коротким путешествиям</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Подробнее: <Link to="/3-dom-goroskopa" className="text-primary hover:underline">3 дом гороскопа: общение и обучение</Link>.
            </p>
          </section>

          {/* Венера в 4 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Home className="w-6 h-6 text-orange-500" />
              Венера в 4 доме: любовь к дому
            </h2>
            <p className="mb-4">
              <strong>Венера в четвёртом доме</strong> делает дом местом гармонии и красоты. Человек любит уютную обстановку, тёплые семейные отношения. Часто красивый дом или недвижимость.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Ключевые темы:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Красивый, уютный дом</li>
                <li>• Гармоничные отношения с родителями</li>
                <li>• Эмоциональная привязанность к семье</li>
                <li>• Возможная прибыль от недвижимости</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Читайте также: <Link to="/4-dom-goroskopa" className="text-primary hover:underline">4 дом гороскопа: семья и корни</Link>.
            </p>
          </section>

          {/* Венера в 5 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Palette className="w-6 h-6 text-purple-500" />
              Венера в 5 доме: творчество и романтика
            </h2>
            <p className="mb-4">
              <strong>Венера в пятом доме</strong> — идеальное положение для любви и творчества. Романтичная натура, любовь к детям, художественные таланты. Много романов и флирта.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Яркие проявления:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Богатая романтическая жизнь</li>
                <li>• Художественные и артистические таланты</li>
                <li>• Любовь к развлечениям и праздникам</li>
                <li>• Тёплые отношения с детьми</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Подробнее: <Link to="/5-dom-goroskopa" className="text-primary hover:underline">5 дом гороскопа: дети, любовь, творчество</Link> и <Link to="/deti-v-natalnoy-karte-kogda-i-skolko" className="text-primary hover:underline">Дети в натальной карте</Link>.
            </p>
          </section>

          {/* Венера в 6 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-gray-500" />
              Венера в 6 доме: гармония на работе
            </h2>
            <p className="mb-4">
              <strong>Венера в шестом доме</strong> приносит приятную рабочую атмосферу, хорошие отношения с коллегами. Работа может быть связана с красотой, здоровьем, обслуживанием.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Рабочие таланты:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Гармоничные отношения с коллегами</li>
                <li>• Работа в сфере красоты или здоровья</li>
                <li>• Удовольствие от рутинных дел</li>
                <li>• Любовь к домашним животным</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Читайте: <Link to="/shestoy-dom-goroskopa" className="text-primary hover:underline">6 дом гороскопа: работа и здоровье</Link>.
            </p>
          </section>

          {/* Венера в 7 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-pink-500" />
              Венера в 7 доме: брак и партнёрство
            </h2>
            <p className="mb-4">
              <strong>Венера в седьмом доме</strong> — классическое указание на счастливый брак. Человек ценит отношения, легко находит партнёра. Часто привлекательный супруг.
            </p>
            <div className="bg-card border-2 border-pink-500/30 rounded-2xl p-6 mb-4">
              <h4 className="font-semibold mb-3 text-pink-500">💕 Лучшее положение для брака:</h4>
              <ul className="space-y-2">
                <li>• Гармоничные, долгие отношения</li>
                <li>• Привлекательный, обаятельный партнёр</li>
                <li>• Талант к партнёрству в бизнесе</li>
                <li>• Дипломатичность в конфликтах</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Подробнее: <Link to="/7-dom-goroskopa" className="text-primary hover:underline">7 дом гороскопа: брак и партнёрства</Link> и <Link to="/7-dom-v-natalnoj-karte-otnosheniya-i-razryvy" className="text-primary hover:underline">7 дом: отношения и разрывы</Link>.
            </p>
          </section>

          {/* Венера в 8 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Moon className="w-6 h-6 text-red-500" />
              Венера в 8 доме: страсть и трансформация
            </h2>
            <p className="mb-4">
              <strong>Венера в восьмом доме</strong> приносит глубокие, страстные отношения. Деньги могут приходить через партнёра, наследство, инвестиции. Магнетическая привлекательность.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Глубинные проявления:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Интенсивные, трансформирующие отношения</li>
                <li>• Финансы через партнёра или наследство</li>
                <li>• Интерес к психологии, оккультизму</li>
                <li>• Сексуальная притягательность</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Подробнее: <Link to="/8-dom-v-natalnoj-karte" className="text-primary hover:underline">8 дом в натальной карте: деньги партнёра и кризисы</Link>.
            </p>
          </section>

          {/* Венера в 9 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-cyan-500" />
              Венера в 9 доме: любовь к путешествиям
            </h2>
            <p className="mb-4">
              <strong>Венера в девятом доме</strong> даёт любовь к путешествиям, иностранным культурам, философии. Партнёр может быть иностранцем или познакомиться в поездке.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Темы 9 дома с Венерой:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Романтика в путешествиях</li>
                <li>• Партнёр из другой страны или культуры</li>
                <li>• Любовь к обучению и философии</li>
                <li>• Удача за границей</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Читайте: <Link to="/9-dom-v-natalnoj-karte" className="text-primary hover:underline">9 дом: путешествия и философия</Link>.
            </p>
          </section>

          {/* Венера в 10 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Венера в 10 доме: карьера в искусстве
            </h2>
            <p className="mb-4">
              <strong>Венера в десятом доме</strong> приносит успех в творческих профессиях, популярность, хорошую репутацию. Часто карьера связана с красотой, модой, искусством.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Карьерные возможности:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Успех в творческих профессиях</li>
                <li>• Публичное признание и популярность</li>
                <li>• Карьера через связи и обаяние</li>
                <li>• Работа в сфере красоты, моды, искусства</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Подробнее: <Link to="/10-dom-v-natalnoj-karte" className="text-primary hover:underline">10 дом: карьера и статус</Link> и <Link to="/talanty-v-goroskope-tehnar-ili-gumanitarij" className="text-primary hover:underline">Таланты в гороскопе</Link>.
            </p>
          </section>

          {/* Венера в 11 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-500" />
              Венера в 11 доме: дружба и мечты
            </h2>
            <p className="mb-4">
              <strong>Венера в одиннадцатом доме</strong> даёт много друзей, поддержку от социальных групп. Любовь часто начинается с дружбы. Общие мечты с партнёром.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Социальные таланты:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Много друзей, особенно женщин</li>
                <li>• Любовь через дружбу или соцсети</li>
                <li>• Общие цели и мечты с партнёром</li>
                <li>• Поддержка от групп и сообществ</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Читайте: <Link to="/11-dom-v-natalnoj-karte" className="text-primary hover:underline">11 дом: друзья и цели</Link>.
            </p>
          </section>

          {/* Венера в 12 доме */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Gem className="w-6 h-6 text-violet-500" />
              Венера в 12 доме: тайная любовь
            </h2>
            <p className="mb-4">
              <strong>Венера в двенадцатом доме</strong> приносит скрытую романтику, тайные отношения, глубокую духовную любовь. Часто жертвенность в отношениях, любовь к уединению.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <strong>Глубинные темы:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Тайные или запретные отношения</li>
                <li>• Духовная, платоническая любовь</li>
                <li>• Самопожертвование ради любви</li>
                <li>• Творчество в уединении</li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Подробнее: <Link to="/12-dom-v-natalnoj-karte" className="text-primary hover:underline">12 дом: подсознание и тайны</Link>.
            </p>
          </section>

          {/* CTA */}
          <div className="bg-card border border-border rounded-2xl p-8 my-12 text-center">
            <h3 className="text-2xl font-semibold mb-4">🌟 Узнайте положение вашей Венеры</h3>
            <p className="mb-6 text-muted-foreground">
              Рассчитайте свою натальную карту и получите полную расшифровку Венеры в вашем гороскопе
            </p>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground glow-yellow" asChild>
              <a href="https://chat.aidzen.ru" target="_blank" rel="noopener noreferrer">
                Рассчитать натальную карту
                <Sparkles className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">Первые 3 расчёта — бесплатно</p>
          </div>

          {/* Связанные статьи */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">📚 Читайте также</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link to="/synastry" className="block bg-card border border-border rounded-xl p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Совместимость по натальной карте</h4>
                <p className="text-sm text-muted-foreground">Как Венера влияет на совместимость партнёров</p>
              </Link>
              <Link to="/razvody-v-astrologii-gde-iskat" className="block bg-card border border-border rounded-xl p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Разводы в астрологии</h4>
                <p className="text-sm text-muted-foreground">Какие аспекты Венеры указывают на риск разрыва</p>
              </Link>
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default VeneraVDomahGoroskopa;
