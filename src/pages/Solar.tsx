import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Solar = () => {
  return (
    <div className="min-h-screen bg-background">
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
          Расчет соляра
        </h1>
        
        <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
          Соляр: астрологический прогноз на год — что ждёт именно вас
        </h2>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Каждый год в нашей жизни начинается новый цикл, и астрология знает уникальный инструмент, который помогает понять, каким он будет. Речь идёт о солярном гороскопе — индивидуальном прогнозе на год, который строится на момент возвращения Солнца в ту же точку, где оно находилось в день вашего рождения.
          </p>

          <p className="mb-6">
            В отличие от общего астрологического календаря, соляр даёт именно персональный прогноз на год, раскрывающий главные тенденции, вызовы и возможности. Если вы хотите заранее знать, что принесёт вам астрология 2025 года, соляр поможет ответить на этот вопрос.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Что такое солярный гороскоп?</h3>
          <p className="mb-6">
            Соляр (от лат. sol — Солнце) — это астрологическая карта, построенная на момент точного возвращения Солнца в градус и знак, соответствующие вашему натальному Солнцу. Проще говоря, это день и час, когда у вас «астрологический день рождения». Соляр формирует индивидуальный прогноз на ближайший год и действует до следующего дня рождения.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Как рассчитывается соляр?</h3>
          <p className="mb-6">
            Чтобы построить соляр, нужно знать дату и время рождения, место рождения и город, где вы будете встречать свой день рождения. Это важно, так как даже смена города может изменить акценты соляра, усиливая позитивные влияния или смягчая сложные.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Для чего нужен солярный гороскоп?</h3>
          <p className="mb-4">Соляр показывает:</p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Основные задачи года</li>
            <li>Сферы, которые будут в фокусе (работа, семья, финансы, здоровье)</li>
            <li>Благоприятные месяцы для перемен</li>
            <li>Время для новых проектов</li>
            <li>Кармические уроки и вызовы</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-4">НЕЙРОДЗЕН и солярный прогноз</h3>
          <p className="mb-6">
            НЕЙРОДЗЕН рассчитывает соляр автоматически: учитывает дату, время и место рождения, а также город празднования дня рождения. Сервис строит солярный гороскоп и формирует подробный индивидуальный прогноз на год с акцентами на карьеру, любовь, финансы и здоровье.
          </p>

          <div className="bg-card border border-border rounded-2xl p-8 my-12">
            <h4 className="text-xl font-semibold mb-4">НЕЙРОДЗЕН показывает:</h4>
            <ul className="space-y-2 mb-6">
              <li>✔ Визуальную карту соляра</li>
              <li>✔ Толкование планет и домов</li>
              <li>✔ Сильные и слабые стороны года</li>
              <li>✔ Рекомендации для гармоничного прохождения года</li>
            </ul>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground glow-yellow" asChild>
              <a href="https://chat.aidzen.ru" target="_blank" rel="noopener noreferrer">
                Рассчитать Соляр
                <Sparkles className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Solar;
