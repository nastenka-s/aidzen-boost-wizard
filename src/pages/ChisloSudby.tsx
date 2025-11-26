import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "@/assets/logo.png";

const ChisloSudby = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Число судьбы: как рассчитать и применить в жизни | НейроДзен</title>
        <meta
          name="description"
          content="Узнайте, как рассчитать число судьбы по дате рождения и понять, что оно значит. Простое объяснение, примеры и рекомендации, как использовать число судьбы в жизни без ошибок."
        />
        <meta
          name="keywords"
          content="число судьбы, как рассчитать число судьбы, значение числа судьбы, нумерология судьбы, число жизненного пути, дата рождения и судьба, расчёт числа судьбы, нумерология по дате рождения"
        />

        <meta property="og:title" content="Число судьбы: как рассчитать и применить в жизни" />
        <meta
          property="og:description"
          content="Узнайте, как рассчитать число судьбы по дате рождения и понять, что оно значит. Простое объяснение, примеры и рекомендации."
        />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2025-01-16" />
        <meta property="article:section" content="Нумерология" />
        <meta property="article:tag" content="нумерология" />
        <meta property="article:tag" content="число судьбы" />

        <link rel="canonical" href="https://aidzen.ru/chislo-sudby-kak-primenit" />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="НейроДзен" className="w-10 h-10" />
            <span className="text-lg font-semibold tracking-tight">НЕЙРОДЗЕН</span>
          </Link>
          <Link to="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />К статьям
            </Button>
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <article className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
        <div className="mb-8">
          <Badge variant="outline" className="border-primary/30 text-primary font-medium mb-4">
            Нумерология
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Число судьбы: как рассчитать и применить в жизни
          </h1>
          <p className="text-sm text-muted-foreground">16 января, 2025 • Время чтения: 9 мин</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <p className="text-lg leading-relaxed">
            Число судьбы — одно из ключевых понятий в нумерологии. Оно помогает понять, что в человеке заложено
            изначально: сильные стороны, задачи, тип жизненных испытаний и способ достижения успеха. В этой статье вы
            научитесь вычислять число судьбы по дате рождения, расшифруете своё значение и поймёте, как использовать эту
            информацию в повседневной жизни.
          </p>

          <section>
            <h2 className="text-3xl font-bold mb-4">Что такое число судьбы</h2>
            <p className="mb-4">
              Число судьбы (или число жизненного пути) показывает, с какими качествами вы пришли в этот мир и через
              какие уроки реализуетесь. Это не приговор, а карта маршрута: направление задано, но способ пройти путь —
              ваш выбор.
            </p>

            <Card className="p-6 bg-card/50 border-primary/20">
              <h3 className="text-xl font-semibold mb-3">Сигнал → Смысл → Действие</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>
                    <strong>Сигнал:</strong> дата рождения повторяет определённую числовую вибрацию
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>
                    <strong>Смысл:</strong> эта вибрация определяет общий сценарий и стратегию жизни
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>
                    <strong>Действие:</strong> когда вы понимаете свой «код судьбы», легче принимать решения в согласии
                    с собой
                  </span>
                </li>
              </ul>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Как рассчитать число судьбы: пошагово</h2>
            <p className="mb-4">Берём полную дату рождения и складываем все цифры до однозначного числа.</p>

            <Card className="p-6 bg-secondary/10 border-secondary/30 mb-6">
              <h3 className="text-xl font-semibold mb-3">Формула:</h3>
              <p className="text-lg">
                День + Месяц + Год рождения → складываем цифры до 1–9 или до мастер-числа (11, 22, 33)
              </p>
            </Card>

            <div className="space-y-4">
              <Card className="p-6 bg-card border-border/50">
                <h4 className="text-lg font-semibold mb-2">Пример 1:</h4>
                <p className="mb-2">Дата рождения: 12.06.1987</p>
                <p className="mb-2">1 + 2 + 0 + 6 + 1 + 9 + 8 + 7 = 34</p>
                <p className="mb-2">3 + 4 = 7</p>
                <p className="text-primary font-semibold">Число судьбы: 7</p>
              </Card>

              <Card className="p-6 bg-card border-border/50">
                <h4 className="text-lg font-semibold mb-2">Пример 2 (мастер-число):</h4>
                <p className="mb-2">Дата рождения: 29.11.1984</p>
                <p className="mb-2">2 + 9 + 1 + 1 + 1 + 9 + 8 + 4 = 35</p>
                <p className="mb-2">3 + 5 = 8</p>
                <p className="text-sm text-muted-foreground">
                  Мастер-числа 11, 22 и 33 не сокращают, если они получаются сразу
                </p>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Значения чисел судьбы</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left p-3 font-semibold">Число</th>
                    <th className="text-left p-3 font-semibold">Ключевые черты</th>
                    <th className="text-left p-3 font-semibold">Задача</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { num: "1", traits: "лидер, инициатор", task: "учиться действовать самостоятельно" },
                    { num: "2", traits: "дипломат, посредник", task: "сохранять баланс и чувствительность" },
                    { num: "3", traits: "творец, коммуникатор", task: "выражать себя, вдохновлять других" },
                    { num: "4", traits: "организатор, практик", task: "строить стабильность, системность" },
                    { num: "5", traits: "исследователь, свободолюбец", task: "жить гибко, без страха перемен" },
                    { num: "6", traits: "хранитель, заботливый", task: "брать ответственность с любовью" },
                    { num: "7", traits: "аналитик, философ", task: "искать смысл, не уходя в отрыв от жизни" },
                    { num: "8", traits: "управленец, стратег", task: "научиться использовать власть мудро" },
                    { num: "9", traits: "гуманист, наставник", task: "завершать, делиться опытом" },
                    { num: "11", traits: "вдохновитель", task: "реализовать идеалы, не уходя в иллюзии" },
                    { num: "22", traits: "архитектор реальности", task: "строить масштабно, не теряя человечности" },
                    { num: "33", traits: "духовный учитель", task: "помогать, не жертвуя собой" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-muted/30">
                      <td className="p-3 font-semibold text-primary">{row.num}</td>
                      <td className="p-3">{row.traits}</td>
                      <td className="p-3">{row.task}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Как применить число судьбы в жизни</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-3">1. Принять сценарий, но выбрать путь</h3>
                <p>
                  Число судьбы не говорит, кем вы «должны быть». Оно подсказывает, в какой роли вы будете естественнее и
                  сильнее. Например, если у вас число 4, вам ближе стабильность, структура, ответственность. Значит,
                  хаотичные решения или частая смена направлений будет вызывать внутреннее напряжение.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3">2. Настроить выбор профессии и окружения</h3>
                <p className="mb-3">Число судьбы помогает понять, в какой сфере вы раскрываетесь:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>1 и 8 — управленцы, предприниматели</li>
                  <li>2 и 6 — помощники, консультанты, специалисты в сервисе</li>
                  <li>3 и 5 — креативные и свободные направления</li>
                  <li>4 и 7 — аналитика, технологии, системный подход</li>
                  <li>9, 11, 33 — образование, психология, творчество, служение</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3">3. Понимать риски и слабые места</h3>
                <p className="mb-4">Каждое число имеет «тень» — склонность, мешающую реализоваться.</p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-border">
                        <th className="text-left p-3 font-semibold">Число</th>
                        <th className="text-left p-3 font-semibold">Риск</th>
                        <th className="text-left p-3 font-semibold">Как обойти</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { num: "1", risk: "упрямство, давление", solution: "учиться слушать других" },
                        { num: "2", risk: "зависимость от мнений", solution: "ставить личные границы" },
                        { num: "3", risk: "поверхностность", solution: "доводить начатое до конца" },
                        { num: "4", risk: "чрезмерный контроль", solution: "доверять процессу" },
                        { num: "5", risk: "хаос, бунт", solution: "создавать рамки, но гибкие" },
                        { num: "6", risk: "жертвенность", solution: "помнить о себе" },
                        { num: "7", risk: "изоляция", solution: "делиться идеями, не уходить в одиночество" },
                        { num: "8", risk: "жёсткость", solution: "проявлять эмпатию" },
                        { num: "9", risk: "выгорание", solution: "дозировать помощь" },
                        { num: "11", risk: "тревожность", solution: "заземляться, отдыхать" },
                        { num: "22", risk: "перегруз", solution: "дробить задачи" },
                        { num: "33", risk: "спасательство", solution: "помогать только по запросу" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-muted/30">
                          <td className="p-3 font-semibold text-primary">{row.num}</td>
                          <td className="p-3">{row.risk}</td>
                          <td className="p-3">{row.solution}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Мини-кейсы</h2>

            <div className="space-y-4">
              <Card className="p-6 bg-card border-border/50">
                <h3 className="text-xl font-semibold mb-3">Кейс 1</h3>
                <p>
                  <strong>Анна, 4 июля 1983 → число судьбы 5.</strong> Работала бухгалтером, но часто чувствовала
                  усталость и скуку. Когда перешла в маркетинг и стала вести проекты с командой и путешествиями,
                  почувствовала прилив энергии. Число 5 требует свободы и перемен.
                </p>
              </Card>

              <Card className="p-6 bg-card border-border/50">
                <h3 className="text-xl font-semibold mb-3">Кейс 2</h3>
                <p>
                  <strong>Ирина, 9 марта 1976 → число судьбы 8.</strong> Всегда стремилась к руководящим ролям, но
                  боялась ответственности. После 40 лет начала свой бизнес и признала, что «управлять» — это её природа.
                  Число 8 активируется, когда человек берёт ответственность, а не избегает её.
                </p>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Рекомендации</h2>
            <Card className="p-6 bg-primary/10 border-primary/30">
              <ol className="list-decimal list-inside space-y-2">
                <li>Рассчитайте число судьбы</li>
                <li>Сравните свои решения с его смыслом</li>
                <li>Отслеживайте, где вы действуете «вопреки себе»</li>
              </ol>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">ВЫВОДЫ</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Число судьбы вычисляется по дате рождения</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Оно показывает природные сильные стороны и тип жизненных задач</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Мастер-числа 11, 22, 33 не сокращаются</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Зная число, можно выстроить подходящую профессию и стиль жизни</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Риски у каждого числа свои, важно их знать, чтобы не «застревать»</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Это не приговор, а карта потенциала</span>
              </li>
            </ul>
          </section>

          <div className="bg-gradient-to-br from-secondary/20 to-primary/20 border border-border rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">Получите 3 моментальных отчёта бесплатно</h3>
            <p className="mb-6 text-lg">Начните с готовых результатов за пару минут</p>
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold glow-yellow"
              asChild
            >
              <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                Получить 3 бесплатных расчета
                <Sparkles className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>

          <section>
            <h2 className="text-3xl font-bold mb-6">FAQ</h2>

            <div className="space-y-4">
              <Card className="p-6 bg-card border-border/50">
                <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  Как рассчитать число судьбы?
                </h3>
                <p className="text-muted-foreground">
                  Сложите все цифры своей даты рождения до однозначного числа (или оставьте 11, 22, 33). Пример:
                  24.09.1988 → 2+4+0+9+1+9+8+8=41 → 4+1=5.
                </p>
              </Card>

              <Card className="p-6 bg-card border-border/50">
                <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  Что делать, если получается мастер-число 11 или 22?
                </h3>
                <p className="text-muted-foreground">
                  Не сокращайте. Эти числа указывают на усиленный потенциал, но требуют большей внутренней зрелости.
                </p>
              </Card>

              <Card className="p-6 bg-card border-border/50">
                <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  Можно ли изменить число судьбы?
                </h3>
                <p className="text-muted-foreground">
                  Нет, но можно осознанно проживать его светлую сторону и сглаживать риски через выбор действий.
                </p>
              </Card>

              <Card className="p-6 bg-card border-border/50">
                <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  Как использовать число судьбы в работе?
                </h3>
                <p className="text-muted-foreground">
                  Выбирайте деятельность, где естественно проявляются качества вашего числа — так вы меньше тратите
                  энергию и быстрее растёте.
                </p>
              </Card>

              <Card className="p-6 bg-card border-border/50">
                <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  Что делать, если число судьбы не совпадает с ощущениями?
                </h3>
                <p className="text-muted-foreground">
                  Возможно, вы сейчас живёте под влиянием другого цикла — года, месяца или персонального числа. Основное
                  число судьбы проявляется сильнее с возрастом.
                </p>
              </Card>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default ChisloSudby;
