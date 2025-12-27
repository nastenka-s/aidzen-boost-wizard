import { Helmet } from "react-helmet";
import founderImage1 from "@/assets/neurozen-founder-1.png";
import founderImage2 from "@/assets/neurozen-founder-2.png";
import matrixScreen from "@/assets/neurozen-matrix.png";
import eventsScreen from "@/assets/neurozen-events.png";
import relocationScreen from "@/assets/neurozen-relocation.png";
import transitsScreen from "@/assets/neurozen-transits.png";

const Neurozen = () => {
  return (
    <>
      <Helmet>
        <title>Нейродзен — Твоя жизнь. Твой код.</title>
        <meta name="description" content="Честные ответы на важные вопросы через астрологию и нумерологию. Персональные разборы, транзиты, жизненные циклы." />
        <meta name="keywords" content="нейродзен, астрология, нумерология, натальная карта, транзиты, жизненные циклы, персональный разбор" />
        <link rel="canonical" href="https://neurozen.app/neurozen" />
        <meta property="og:title" content="Нейродзен — Твоя жизнь. Твой код." />
        <meta property="og:description" content="Честные ответы на важные вопросы через астрологию и нумерологию." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-neurozen-bg text-neurozen-text">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-b from-neurozen-deep via-neurozen-bg to-neurozen-bg">
            {/* Stars effect */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-neurozen-lavender rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
            {/* Orbital lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[600px] h-[600px] border border-neurozen-lavender/10 rounded-full" />
              <div className="absolute w-[400px] h-[400px] border border-neurozen-lavender/15 rounded-full" />
              <div className="absolute w-[200px] h-[200px] border border-neurozen-lavender/20 rounded-full" />
            </div>
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-8 leading-tight">
              Твоя жизнь. Твой код.
            </h1>
            <p className="text-xl md:text-2xl text-neurozen-muted font-light max-w-2xl mx-auto mb-16 leading-relaxed">
              Честные ответы на важные вопросы через астрологию и нумерологию.
            </p>
            <a
              href="/natal-chart-calculator"
              className="inline-block px-8 py-4 bg-neurozen-lavender/20 border border-neurozen-lavender/40 text-neurozen-text rounded-full hover:bg-neurozen-lavender/30 transition-all duration-500 text-lg font-light tracking-wide"
            >
              Начать с бесплатной натальной карты
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-50">
            <div className="w-6 h-10 border border-neurozen-lavender/40 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-neurozen-lavender/60 rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* Story Section 1 */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl leading-relaxed text-neurozen-muted font-light mb-12">
              Иногда наступает момент, когда жизнь будто выходит из-под контроля.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-neurozen-muted/80 font-light mb-12">
              Вроде бы всё делаешь правильно — принимаешь решения, стараешься, двигаешься вперёд.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-neurozen-muted/80 font-light mb-8">
              У кого-то внешне всё хорошо, но внутри — ощущение пустоты.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-neurozen-muted/80 font-light mb-12">
              А у кого-то жизнь буквально рушится, и появляется острое чувство, что ты потерял свой путь.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-neurozen-text font-light">
              В такие моменты больше всего хочется понять: что со мной происходит и что делать дальше.
            </p>
          </div>
        </section>

        {/* CTA Block 1 */}
        <section className="py-16 px-6 bg-gradient-to-b from-neurozen-bg to-neurozen-deep/30">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-neurozen-lavender text-lg mb-4">→</p>
            <a
              href="/tranzity-k-natalnoj-karte-i-ih-vliyanie"
              className="text-xl md:text-2xl text-neurozen-lavender hover:text-neurozen-gold transition-colors duration-300 font-light"
            >
              Понять, в каком периоде жизни я сейчас
            </a>
            <p className="text-neurozen-muted/60 text-sm mt-3 font-light">
              Астрологические транзиты и жизненные циклы — входит в безлимит
            </p>
          </div>
        </section>

        {/* Story Section 2 */}
        <section className="py-24 md:py-32 px-6 bg-neurozen-deep/20">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg md:text-xl leading-relaxed text-neurozen-muted/80 font-light mb-12">
              Мы начинаем искать ответы.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-neurozen-muted/80 font-light mb-12">
              Идём к тарологам, нумерологам, эзотерикам.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-neurozen-muted/80 font-light mb-16">
              Иногда тратим на это большие деньги — в надежде получить конкретный прогноз и ясность.
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-8 my-16">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-neurozen-lavender/20 flex-shrink-0">
                <img 
                  src={founderImage1} 
                  alt="Основательница Нейродзен" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="border-l-2 border-neurozen-lavender/30 pl-8 py-4">
                <p className="text-xl md:text-2xl leading-relaxed text-neurozen-text font-light italic">
                  Как человек с большим опытом в эзотерических практиках, могу сказать честно: в большинстве случаев это не работает.
                </p>
              </div>
            </div>

            <p className="text-lg md:text-xl leading-relaxed text-neurozen-muted/80 font-light mb-12">
              Не потому, что «эзотерика плохая»,
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-neurozen-text font-light">
              а потому что чужие интерпретации редко дают опору.
            </p>
          </div>
        </section>

        {/* Key Insight */}
        <section className="py-32 md:py-40 px-6 bg-gradient-to-b from-neurozen-deep/20 to-neurozen-bg">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-neurozen-text font-light mb-12">
              Единственное, что действительно меняет жизнь, —
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl leading-tight text-neurozen-lavender font-light">
              это разобраться в себе.
            </p>
          </div>
        </section>

        {/* Story Section 3 */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg md:text-xl leading-relaxed text-neurozen-muted/80 font-light mb-8">
              Понять, в каком жизненном периоде ты находишься,
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-neurozen-muted/80 font-light mb-8">
              какие сценарии ты проживаешь,
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-neurozen-muted/80 font-light mb-8">
              какие кармические задачи сейчас активны
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-neurozen-text font-light">
              и где у тебя есть возможность начать действовать иначе.
            </p>
          </div>
        </section>

        {/* CTA Block 2 */}
        <section className="py-16 px-6 bg-neurozen-deep/10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-neurozen-lavender text-lg mb-4">→</p>
            <a
              href="/natalchart"
              className="text-xl md:text-2xl text-neurozen-lavender hover:text-neurozen-gold transition-colors duration-300 font-light"
            >
              Увидеть свой жизненный цикл и ключевые темы
            </a>
            <p className="text-neurozen-muted/60 text-sm mt-3 font-light">
              Астрология — входит в безлимит
            </p>
          </div>
        </section>

        {/* Origin Story */}
        <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-neurozen-deep/10 to-neurozen-bg">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-16">
              <div className="w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden border border-neurozen-lavender/20 flex-shrink-0 shadow-2xl shadow-neurozen-lavender/10">
                <img 
                  src={founderImage2} 
                  alt="Основательница Нейродзен" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-lg md:text-xl leading-relaxed text-neurozen-muted/80 font-light mb-8">
                  Когда я сама оказалась в сложном жизненном периоде, стало очевидно:
                </p>
                <p className="text-xl md:text-2xl leading-relaxed text-neurozen-text font-light">
                  мне не нужны абстрактные обещания и красивые формулировки. Мне нужна ясность.
                </p>
              </div>
            </div>
            
            <div className="py-16 text-center">
              <p className="text-3xl md:text-4xl lg:text-5xl text-neurozen-lavender font-light tracking-wide">
                Так появился Нейродзен.
              </p>
            </div>
          </div>
        </section>

        {/* What is Neurozen */}
        <section className="py-24 md:py-32 px-6 bg-neurozen-deep/20">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg md:text-xl leading-relaxed text-neurozen-muted/80 font-light mb-12">
              Он родился как попытка собрать в одном месте то, чего всегда не хватало:
            </p>
            <div className="space-y-4 mb-16 text-lg md:text-xl text-neurozen-muted font-light">
              <p>астрологическую логику,</p>
              <p>нумерологические закономерности,</p>
              <p>реальные жизненные циклы</p>
            </div>
            <p className="text-xl md:text-2xl leading-relaxed text-neurozen-text font-light">
              и современный интеллект, который способен связать всё это и объяснить простым, человеческим языком.
            </p>
          </div>
        </section>

        {/* What Neurozen Does */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl leading-relaxed text-neurozen-text font-light mb-12">
              Нейродзен помогает увидеть,
            </p>
            <div className="space-y-6 text-lg md:text-xl text-neurozen-muted/80 font-light mb-8">
              <p>в каком периоде ты живёшь прямо сейчас,</p>
              <p>какие темы выходят на первый план,</p>
              <p>где лучше не торопиться,</p>
              <p>а где, наоборот, важно не упустить момент.</p>
            </div>
          </div>
        </section>

        {/* Service Screenshots Gallery */}
        <section className="py-24 md:py-32 px-6 bg-neurozen-deep/30">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-xl md:text-2xl text-neurozen-muted font-light mb-16">
              Как это выглядит внутри
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Matrix Screenshot */}
              <div className="group">
                <div className="rounded-2xl overflow-hidden border border-neurozen-lavender/20 shadow-2xl shadow-neurozen-deep/50 transition-transform duration-500 group-hover:scale-[1.02]">
                  <img 
                    src={matrixScreen} 
                    alt="Матрица Судьбы — анализ кармических задач" 
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-center text-neurozen-muted/60 text-sm mt-4 font-light">
                  Матрица Судьбы — кармические задачи и родовые линии
                </p>
              </div>

              {/* Transits Screenshot */}
              <div className="group">
                <div className="rounded-2xl overflow-hidden border border-neurozen-lavender/20 shadow-2xl shadow-neurozen-deep/50 transition-transform duration-500 group-hover:scale-[1.02]">
                  <img 
                    src={transitsScreen} 
                    alt="Астрологические транзиты и рекомендации" 
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-center text-neurozen-muted/60 text-sm mt-4 font-light">
                  Транзиты — практичные шаги и окна возможностей
                </p>
              </div>

              {/* Events Screenshot */}
              <div className="group">
                <div className="rounded-2xl overflow-hidden border border-neurozen-lavender/20 shadow-2xl shadow-neurozen-deep/50 transition-transform duration-500 group-hover:scale-[1.02]">
                  <img 
                    src={eventsScreen} 
                    alt="Хронология событий года" 
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-center text-neurozen-muted/60 text-sm mt-4 font-light">
                  Формулы событий — хронология года
                </p>
              </div>

              {/* Relocation Screenshot */}
              <div className="group">
                <div className="rounded-2xl overflow-hidden border border-neurozen-lavender/20 shadow-2xl shadow-neurozen-deep/50 transition-transform duration-500 group-hover:scale-[1.02]">
                  <img 
                    src={relocationScreen} 
                    alt="Анализ релокации по городам" 
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-center text-neurozen-muted/60 text-sm mt-4 font-light">
                  Анализ релокации — сравнение городов
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Block 3 */}
        <section className="py-16 px-6 bg-neurozen-deep/10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-neurozen-lavender text-lg mb-4">→</p>
            <a
              href="/formuladushi"
              className="text-xl md:text-2xl text-neurozen-lavender hover:text-neurozen-gold transition-colors duration-300 font-light"
            >
              Получить персональный разбор текущего периода
            </a>
            <p className="text-neurozen-muted/60 text-sm mt-3 font-light">
              Астрология и нумерология — входит в безлимит
            </p>
          </div>
        </section>

        {/* Wisdom Section */}
        <section className="py-32 md:py-40 px-6 bg-gradient-to-b from-neurozen-deep/10 to-neurozen-bg">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl md:text-2xl leading-relaxed text-neurozen-muted font-light mb-12">
              Многие думают, что проблемы — это ошибки.
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-neurozen-text font-light">
              Но чаще всего это просто несовпадение со временем.
            </p>
          </div>
        </section>

        {/* Resolution */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl leading-relaxed text-neurozen-text font-light mb-12">
              Когда ты видишь свой текущий цикл, многое внутри успокаивается.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-neurozen-muted font-light mb-12">
              Появляется ощущение опоры.
            </p>
            <p className="text-2xl md:text-3xl leading-relaxed text-neurozen-lavender font-light">
              Ты просто проходишь свой этап.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 md:py-40 px-6 bg-gradient-to-b from-neurozen-bg via-neurozen-deep/30 to-neurozen-deep/50">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-neurozen-lavender text-lg mb-6">→</p>
            <a
              href="/natal-chart-calculator"
              className="inline-block text-2xl md:text-3xl text-neurozen-lavender hover:text-neurozen-gold transition-colors duration-300 font-light mb-4"
            >
              Начать с бесплатной натальной карты
            </a>
            <p className="text-neurozen-muted/60 text-sm font-light">
              Без оплаты. Без подписки.
            </p>
          </div>
        </section>

        {/* Closing */}
        <section className="py-24 px-6 bg-neurozen-deep/50">
          <div className="max-w-2xl mx-auto text-center">
            <div className="border border-neurozen-lavender/20 rounded-2xl p-12 bg-neurozen-bg/5 backdrop-blur-sm">
              <p className="text-lg md:text-xl text-neurozen-muted/80 font-light leading-relaxed italic">
                «Здесь не продают.<br />
                Здесь понимают.<br />
                Здесь можно спокойно разобраться.»
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 bg-neurozen-deep/60 border-t border-neurozen-lavender/10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-neurozen-lavender text-2xl font-light tracking-widest mb-6">
              НЕЙРОДЗЕН
            </p>
            <p className="text-neurozen-muted/50 text-sm font-light">
              © {new Date().getFullYear()} Все права защищены
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Neurozen;
