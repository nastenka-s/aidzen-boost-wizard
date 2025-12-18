import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "@/assets/logo.png";

const FormulaDushi = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Формула души по Астрогору: расчет предназначения | НейроДзен</title>
        <meta name="description" content="Узнайте своё предназначение с помощью формулы души по методике Астрогора. Глубинный астрологический анализ миссии души." />
        <meta name="keywords" content="формула души, Астрогор, предназначение, миссия души, астрология души, расчет души" />
        <link rel="canonical" href="https://aidzen.ru/formuladushi" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Формула души по Астрогору: расчет предназначения" />
        <meta property="og:description" content="Узнайте своё предназначение с помощью формулы души по методике Астрогора." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://aidzen.ru/formuladushi" />
        <meta property="og:site_name" content="НейроДзен" />
        <meta property="og:locale" content="ru_RU" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Формула души по Астрогору: расчет предназначения" />
        <meta name="twitter:description" content="Узнайте своё предназначение с помощью формулы души по методике Астрогора." />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Формула души по Астрогору: расчет предназначения",
            "description": "Глубинный астрологический анализ миссии души по методике Астрогора",
            "url": "https://aidzen.ru/formuladushi",
            "publisher": {
              "@type": "Organization",
              "name": "НейроДзен",
              "url": "https://aidzen.ru"
            }
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
          ФОРМУЛА ДУШИ (ПО АСТРОГОРУ)
        </h1>
        
        <h2 className="text-2xl lg:text-3xl font-semibold mb-8">
          Как понять своё предназначение и миссию
        </h2>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Каждый человек хотя бы раз в жизни задаётся вопросами: «Для чего я живу? В чём моё предназначение? Как найти свой путь?» Эти вопросы лежат в основе поисков счастья, успеха и гармонии. Традиционно за ответами люди обращались к религии, философии, психологии. Но существует ещё один древний и мощный инструмент самопознания — эзотерический расчет, известный как формула души.
          </p>

          <p className="mb-6">
            Это уникальная методика, разработанная российским астрологом Александром Астрогором. Она сочетает астрологические знания и нумерологический подход. Формула души даёт возможность каждому человеку открыть скрытые ресурсы своей личности и понять, куда направить энергию, чтобы реализовать себя в полной мере.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Что такое формула души?</h3>
          <p className="mb-6">
            Формула души — это схема, построенная на основе положения планет в момент рождения. В отличие от классической натальной карты, где учитываются знаки Зодиака и дома, формула души концентрируется на энергетическом взаимодействии планет.
          </p>

          <p className="mb-6">
            В центре формулы находятся ключевые планеты, определяющие ядро личности. Вокруг — вспомогательные планеты, раскрывающие таланты, задачи и кармические уроки. Схема позволяет увидеть, какие энергии преобладают, а какие требуют проработки.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Зачем нужна формула души?</h3>
          <p className="mb-6">
            Методика помогает понять сильные стороны и таланты, выявить задачи души, определить кармические уроки. Формула души показывает направление, в котором человеку лучше всего реализовать своё предназначение по дате рождения.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Основные элементы формулы души</h3>
          <ol className="list-decimal list-inside mb-6 space-y-2">
            <li>Центральные планеты — ядро личности</li>
            <li>Спутники — планеты, усиливающие или ослабляющие влияние центра</li>
            <li>Орбиты — внешние влияния и взаимодействие с миром</li>
            <li>Кармические планеты — указывают на задачи души</li>
          </ol>

          <h3 className="text-2xl font-semibold mt-8 mb-4">НЕЙРОДЗЕН и расчет формулы души</h3>
          <p className="mb-6">
            НЕЙРОДЗЕН использует современные алгоритмы и астрологические базы данных для расчёта формулы души. Достаточно ввести дату, время и место рождения, и система построит индивидуальную схему. НЕЙРОДЗЕН учитывает не только положение планет, но и кармические узлы, аспекты и энергетические связи.
          </p>

          <div className="bg-card border border-border rounded-2xl p-8 my-12">
            <h4 className="text-xl font-semibold mb-4">Результат включает:</h4>
            <ul className="space-y-2 mb-6">
              <li>✔ подробное толкование миссии и задач</li>
              <li>✔ раскрытие кармических уроков</li>
              <li>✔ рекомендации по развитию и профессии</li>
            </ul>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground glow-yellow" asChild>
              <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                Рассчитать Формулу Души
                <Sparkles className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default FormulaDushi;
