import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "@/assets/logo.png";

const Synastry = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Совместимость по натальной карте: синастрия партнеров | НейроДзен</title>
        <meta name="description" content="Проверьте совместимость с партнером по натальным картам. Глубокий астрологический анализ отношений и синастрии." />
        <meta name="keywords" content="совместимость, синастрия, натальная карта совместимость, астрология отношений, гороскоп совместимости" />
        <link rel="canonical" href="https://aidzen.ru/synastry" />
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
          Совместимость по натальной карте
        </h1>
        
        <h2 className="text-2xl lg:text-3xl font-semibold mb-8">
          Секреты идеальных отношений и как люди выбирают друг друга
        </h2>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Гороскоп совместимости — это один из самых увлекательных инструментов астрологии. Он помогает лучше понять природу отношений, раскрыть скрытые причины притяжения или конфликтов, а также подсказать, как гармонизировать союз. Синастрия — это сравнение двух натальных карт, которое позволяет оценить, насколько энергетически совпадают партнеры.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Что такое синастрия и как она работает?</h3>
          <p className="mb-6">
            Синастрия основывается на сравнении положения планет в натальных картах двух людей. Особое внимание уделяется аспектам — угловым расстояниям между планетами. Например, гармоничные аспекты (трины, секстили) указывают на легкость во взаимодействии, а напряженные (квадратуры, оппозиции) могут создавать вызовы, требующие осознанной работы.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Ключевые планеты в совместимости</h3>
          
          <div className="space-y-4 mb-6">
            <div>
              <h4 className="text-xl font-semibold mb-2">☉ Солнце</h4>
              <p>Солнце отражает эго, жизненную энергию и цели человека. Совместимость по Солнцу показывает, насколько партнёры разделяют жизненные ориентиры и ценности.</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-2">☽ Луна</h4>
              <p>Луна связана с эмоциями, привычками и глубинными потребностями. Совместимость по Луне особенно важна для семейных отношений: совпадение или гармония Лун приносит чувство уюта и поддержки.</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-2">♀ Венера</h4>
              <p>Венера отвечает за любовь, притяжение и эстетику. Аспекты между Венерами показывают стиль проявления чувств и степень романтической совместимости.</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-2">♂ Марс</h4>
              <p>Марс символизирует страсть, сексуальность и динамику. Он указывает, как партнеры выражают желание и насколько совпадают их ритмы активности.</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Кармические аспекты в совместимости</h3>
          <p className="mb-6">
            Северный и Южный узлы показывают кармические уроки и задачи души. Когда планеты партнера соединяются с узлами другого, это указывает на судьбоносность встречи. Часто такие отношения воспринимаются как «не случайные», они несут важный опыт и трансформацию.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">НЕЙРОДЗЕН и расчет совместимости</h3>
          <p className="mb-6">
            НЕЙРОДЗЕН позволяет получить глубокий и персонализированный анализ совместимости по натальной карте. Сервис учитывает десятки факторов: аспекты, дома, кармические точки и даже влияние текущих транзитов. Благодаря визуальным схемам и детальным интерпретациям вы сможете лучше понять динамику отношений и получить практические рекомендации для их гармонизации.
          </p>

          <div className="bg-card border border-border rounded-2xl p-8 my-12">
            <h4 className="text-xl font-semibold mb-4">Персональный расчет совместимости в НЕЙРОДЗЕН позволит вам:</h4>
            <ul className="space-y-2 mb-6">
              <li>✔ Получить подробный анализ ваших натальных карт</li>
              <li>✔ Узнать сильные и слабые стороны союза</li>
              <li>✔ Определить кармические уроки и точки роста</li>
              <li>✔ Получить рекомендации для укрепления отношений</li>
            </ul>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground glow-yellow" asChild>
              <a href="https://aidzen.app" target="_blank" rel="noopener noreferrer">
                Рассчитать Совместимость
                <Sparkles className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Synastry;
