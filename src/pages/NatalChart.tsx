import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "@/assets/logo.png";
const NatalChart = () => {
  return <div className="min-h-screen bg-background">
      <Helmet>
        <title>Натальная карта бесплатно: расчет и расшифровка онлайн | НейроДзен</title>
        <meta name="description" content="Рассчитайте натальную карту бесплатно онлайн. Полная расшифровка всех планет, домов и аспектов вашего гороскопа." />
        <meta name="keywords" content="натальная карта, натальная карта бесплатно, расчет натальной карты, натальный гороскоп, гороскоп рождения" />
        <link rel="canonical" href="https://aidzen.ru/natalchart" />
      </Helmet>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="НейроДзен" className="w-10 h-10" />
            <span className="text-lg font-semibold tracking-tight">НЕЙРОДЗЕН</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
          </Link>
        </div>
      </header>

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

          <div className="bg-card border border-border rounded-2xl p-8 my-12">
            <h4 className="text-xl font-semibold mb-4"> Заключение</h4>
            <p className="mb-6">
              Натальная карта — это карта возможностей, а не приговор.
            </p>
            <p className="mb-6">
              ✨ Постройте свою натальную карту в НЕЙРОДЗЕН прямо сейчас.
            </p>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground glow-yellow" asChild>
              <a href="https://aidzen.app" target="_blank" rel="noopener noreferrer">
                Рассчитать натальную карту
                <Sparkles className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <p className="mt-4 text-sm">Первые 3 расчёта — бесплатно</p>
          </div>
        </div>
      </article>
    </div>;
};
export default NatalChart;