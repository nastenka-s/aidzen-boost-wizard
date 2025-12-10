import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Star, Heart, Briefcase, Users, Home, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
const NatalChart = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Натальная карта бесплатно: расчет и расшифровка онлайн | НейроДзен</title>
        <meta name="description" content="Рассчитайте натальную карту бесплатно онлайн. Полная расшифровка всех планет, домов и аспектов вашего гороскопа. Узнайте значение домов, планет и аспектов." />
        <meta name="keywords" content="натальная карта, натальная карта бесплатно, расчет натальной карты, натальный гороскоп, гороскоп рождения, расшифровка натальной карты, дома гороскопа, планеты в натальной карте" />
        <link rel="canonical" href="https://aidzen.ru/natalchart" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Натальная карта бесплатно: расчет и расшифровка онлайн" />
        <meta property="og:description" content="Рассчитайте натальную карту бесплатно. Полная расшифровка планет, домов и аспектов." />
        <meta property="og:url" content="https://aidzen.ru/natalchart" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://aidzen.ru/logo.png" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Натальная карта бесплатно: расчет и расшифровка онлайн",
            "description": "Рассчитайте натальную карту бесплатно онлайн. Полная расшифровка всех планет, домов и аспектов вашего гороскопа.",
            "url": "https://aidzen.ru/natalchart",
            "publisher": {
              "@type": "Organization",
              "name": "НейроДзен",
              "logo": {
                "@type": "ImageObject",
                "url": "https://aidzen.ru/logo.png"
              }
            }
          })}
        </script>
      </Helmet>

      <Header />

      {/* Article Content */}
      <article className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient">
          Натальная Карта
        </h1>
        
        <h2 className="text-2xl lg:text-3xl font-semibold mb-8">
          Натальная карта: как правильно построить и что она значит
        </h2>

        <div className="prose prose-lg max-w-none">
          <h3 className="text-2xl font-semibold mt-8 mb-4">🌌 Что такое натальная карта и натальный гороскоп</h3>
          <p className="mb-6">
            Натальная карта — это ваш уникальный «паспорт души», фиксирующий расположение планет в момент рождения.
          </p>

          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <h4 className="text-lg font-semibold mb-3"> В НЕЙРОДЗЕН:</h4>
            <ul className="space-y-2">
              <li>- вы вводите дату, время и место рождения</li>
              <li>- получаете точную карту и подробную расшифровку</li>
              <li>- видите свою уникальную комбинацию энергий</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">✨ Зачем нужна натальная карта?</h3>
          <p className="mb-4">Натальный гороскоп помогает:</p>
          <ul className="list-none mb-6 space-y-2">
            <li>- понять сильные и слабые стороны</li>
            <li>-  разобраться в отношениях</li>
            <li>-  выбрать профессию</li>
            <li>-  осознать предназначение</li>
          </ul>

          <p className="mb-6">
            💡 В НЕЙРОДЗЕН вся информация подаётся простым языком, без перегрузки терминами.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Как рассчитать натальную карту в ИИ Дзен</h3>
          <p className="mb-4">Всё просто:</p>
          <ol className="list-decimal list-inside mb-6 space-y-2">
            <li>Введите дату рождения</li>
            <li>Укажите время и город</li>
            <li>Получите готовый натальный гороскоп и расшифровку</li>
          </ol>
          <p className="mb-6">✨ Первые 3 расчета — бесплатно.</p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">🔭 Из чего состоит натальный гороскоп</h3>
          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <h4 className="text-lg font-semibold mb-3">Таблица планет:</h4>
            <div className="space-y-2">
              <p>Солнце ☉ — ядро личности</p>
              <p>Луна ☽ — эмоции, подсознание</p>
              <p>Меркурий ☿ — мышление, речь</p>
              <p>Венера ♀ — любовь, гармония</p>
              <p>Марс ♂ — энергия, воля</p>
              <p>Юпитер ♃ — рост, удача</p>
              <p>Сатурн ♄ — карма, ограничения</p>
              <p>Уран ♅ — перемены, свобода</p>
              <p>Нептун ♆ — вдохновение, мечты</p>
              <p>Плутон ♇ — трансформация</p>
            </div>
          </div>

          <p className="mb-6">
            🏠 12 астрологических домов (каждый отвечает за сферу жизни: финансы, отношения, карьера и др.).
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4"> Расшифровка натальной карты: шаг за шагом</h3>
          <ul className="list-none mb-6 space-y-2">
            <li>- 🌅 Асцендент — образ, который видят окружающие</li>
            <li>- ☉ Солнце — ваше «я» и энергия жизни</li>
            <li>- ☽ Луна — эмоции и привычки</li>
            <li>- ☿ Меркурий — интеллект и общение</li>
            <li>- ♀ Венера — любовь, красота</li>
            <li>- ♂ Марс — воля и страсть</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Практическая польза натальной карты</h3>
          <ul className="list-none mb-6 space-y-2">
            <li>- Карьера — выбор профессии</li>
            <li>-  Отношения — понимание партнёров</li>
            <li>-  Самопознание — поиск предназначения</li>
            <li>- Здоровье — слабые зоны организма</li>
          </ul>

          <div className="bg-card border border-border rounded-2xl p-8 my-12 text-center">
            <h4 className="text-xl font-semibold mb-4">✨ Заключение</h4>
            <p className="mb-6">Натальная карта — это карта возможностей, а не приговор.</p>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground glow-yellow" asChild>
              <a href="https://chat.aidzen.ru" target="_blank" rel="noopener noreferrer">
                Рассчитать натальную карту
                <Sparkles className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">Первые 3 расчёта — бесплатно</p>
          </div>
        </div>

        {/* SEO-блоки */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">📚 Изучите натальную карту глубже</h2>
          
          <div className="bg-card border border-border rounded-2xl p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-secondary/10">
                <Home className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">12 домов гороскопа</h3>
                <p className="text-muted-foreground">Каждый дом описывает определённую сферу жизни.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Link to="/pervyi-dom-goroskopa-upravitel-aspekty" className="block p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <span className="font-medium">1 дом</span> <span className="text-sm text-muted-foreground">Личность</span>
              </Link>
              <Link to="/2-dom-v-natalnoy-karte-aspekty-tranzity" className="block p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <span className="font-medium">2 дом</span> <span className="text-sm text-muted-foreground">Деньги</span>
              </Link>
              <Link to="/3-dom-goroskopa" className="block p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <span className="font-medium">3 дом</span> <span className="text-sm text-muted-foreground">Общение</span>
              </Link>
              <Link to="/4-dom-goroskopa" className="block p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <span className="font-medium">4 дом</span> <span className="text-sm text-muted-foreground">Семья</span>
              </Link>
              <Link to="/5-dom-goroskopa" className="block p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <span className="font-medium">5 дом</span> <span className="text-sm text-muted-foreground">Дети, творчество</span>
              </Link>
              <Link to="/shestoy-dom-goroskopa" className="block p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <span className="font-medium">6 дом</span> <span className="text-sm text-muted-foreground">Работа</span>
              </Link>
              <Link to="/7-dom-goroskopa" className="block p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <span className="font-medium">7 дом</span> <span className="text-sm text-muted-foreground">Брак</span>
              </Link>
              <Link to="/8-dom-v-natalnoj-karte" className="block p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <span className="font-medium">8 дом</span> <span className="text-sm text-muted-foreground">Кризисы</span>
              </Link>
              <Link to="/9-dom-v-natalnoj-karte" className="block p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <span className="font-medium">9 дом</span> <span className="text-sm text-muted-foreground">Путешествия</span>
              </Link>
              <Link to="/10-dom-v-natalnoj-karte" className="block p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <span className="font-medium">10 дом</span> <span className="text-sm text-muted-foreground">Карьера</span>
              </Link>
              <Link to="/11-dom-v-natalnoj-karte" className="block p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <span className="font-medium">11 дом</span> <span className="text-sm text-muted-foreground">Друзья</span>
              </Link>
              <Link to="/12-dom-v-natalnoj-karte" className="block p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <span className="font-medium">12 дом</span> <span className="text-sm text-muted-foreground">Подсознание</span>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/venera-v-domah-goroskopa" className="block p-6 bg-gradient-to-r from-pink-500/10 to-transparent rounded-xl border border-pink-500/20 hover:border-pink-500/40 transition-colors">
              <h4 className="font-semibold mb-2">♀ Венера в домах гороскопа</h4>
              <p className="text-sm text-muted-foreground">Любовь, деньги и красота</p>
            </Link>
            <Link to="/synastry" className="block p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
              <h4 className="font-semibold mb-2">💑 Совместимость</h4>
              <p className="text-sm text-muted-foreground">Анализ отношений по картам</p>
            </Link>
            <Link to="/deti-v-natalnoy-karte-kogda-i-skolko" className="block p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
              <h4 className="font-semibold mb-2">👶 Дети в натальной карте</h4>
              <p className="text-sm text-muted-foreground">Когда и сколько</p>
            </Link>
            <Link to="/talanty-v-goroskope-tehnar-ili-gumanitarij" className="block p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
              <h4 className="font-semibold mb-2">🎯 Таланты в гороскопе</h4>
              <p className="text-sm text-muted-foreground">Технарь или гуманитарий?</p>
            </Link>
          </div>
        </section>
      </article>

      <Footer />
    </div>
  );
};

export default NatalChart;