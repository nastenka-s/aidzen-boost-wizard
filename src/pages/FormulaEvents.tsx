import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Smartphone, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const FormulaEvents = () => {
  return (
    <>
      <Helmet>
        <title>Формулы событий в натальной карте: как астрологи предсказывают моменты перемен | НейроДзен</title>
        <meta name="description" content="Что такое формулы событий в натальной карте, как они строятся и зачем нужны. Пошагово разбираем связки планет, дома и триггеры для событий — с примерами и чек-листом." />
        <meta name="keywords" content="формулы событий в натальной карте, астрологические формулы, прогноз событий по натальной карте, аспекты и дома, транзиты прогрессии дирекции, как читать натальную карту" />
        <link rel="canonical" href="https://neurodzen.ru/formuly-sobytiy-v-natalnoy-karte" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Формулы событий в натальной карте: как астрологи предсказывают моменты перемен" />
        <meta property="og:description" content="Что такое формулы событий в натальной карте, как они строятся и зачем нужны. Пошагово разбираем связки планет, дома и триггеры для событий — с примерами и чек-листом." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://neurodzen.ru/formuly-sobytiy-v-natalnoy-karte" />
        
        {/* Article specific */}
        <meta property="article:published_time" content="2025-11-11" />
        <meta property="article:author" content="НейроДзен" />
        <meta property="article:section" content="Астрология" />
        <meta property="article:tag" content="формулы событий в натальной карте" />
        <meta property="article:tag" content="астрологические формулы" />
        <meta property="article:tag" content="прогноз событий по натальной карте" />
      </Helmet>
    <div className="min-h-screen bg-background">
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
              <a href="https://aidzen.app" target="_blank" rel="noopener noreferrer">ВХОД</a>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
              <a href="https://t.me/Neurodzenaibot" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Telegram Бот </span>
              </a>
            </Button>
            <Button size="sm" variant="outline" className="border-primary/30" asChild>
              <a href="https://aidzen.app" target="_blank" rel="noopener noreferrer">
                <Smartphone className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">RuStore</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Article Header */}
          <div className="mb-12 space-y-6">
            <Badge variant="outline" className="border-primary/30 text-primary font-medium">
              Астрология
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Формулы событий в астрологии: как читать карту без магии и фатализма
            </h1>
            <p className="text-xl text-muted-foreground">
              «Формула события» — это не магия, а логика: определённая связка планет, домов и аспектов, которая чаще всего сопровождает конкретный тип событий.
            </p>
            <div className="text-sm text-muted-foreground">
              11 ноября, 2025
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-4">Что такое формулы событий</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Формула события — это повторяемая комбинация факторов, которые указывают на вероятность события определённого класса: брак, переезд, рождение ребёнка, карьерный поворот, крупные сделки, обучение и т.д.
              </p>
              
              <h3 className="text-2xl font-semibold mb-4 mt-8">Элементы формулы:</h3>
              
              <Card className="p-6 bg-card/50 border-border/50 mb-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Семантика домов
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  1 — я, 2 — ресурсы, 4 — дом/семья, 5 — дети/творчество/романтика, 7 — брак/долгосрочные союзы, 9 — обучение/переезды далеко, 10 — карьера, 11 — сообщество/проекты, и т.д.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 border-border/50 mb-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Планеты-агенты
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Венера/Юпитер — браки/радости/расширение; Сатурн — структурные решения/оформления; Марс — инициатива/активные действия; Уран — неожиданные перемены; Плутон — глубокие трансформации; Луна — цикл/семья; Меркурий — документы/переговоры.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 border-border/50 mb-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Аспекты
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  соединение/тригон/секстиль — чаще «зелёный коридор»; квадрат/оппозиция — напряжение и выбор; точность аспекта повышает шанс проявления.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 border-border/50">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Связи
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  «дом → планета → дом». Например, управитель 7 дома соединяется с управителем 1 дома — частая формула партнёрства.
                </p>
              </Card>
            </section>

            <Separator className="my-12" />

            <section>
              <h2 className="text-3xl font-bold mb-4">Как это работает: «базовая связка» + «триггер»</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Сначала ищем натальную предрасположенность (база), затем — включатель (триггер) во времени.
              </p>

              <div className="space-y-6">
                <Card className="p-6 bg-primary/5 border-primary/20">
                  <h3 className="text-xl font-semibold mb-4">Шаг 1. Определи базовую формулу</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Найди дома, смысл которых соответствует событию (брак — 5/7/11; карьера — 2/6/10; переезд — 4/9/12).</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Посмотри управителей этих домов: где стоят, с кем аспектируют.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Отметь значимые натальные аспекты и конфигурации (соединения, мажорные аспекты).</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 bg-primary/5 border-primary/20">
                  <h3 className="text-xl font-semibold mb-4">Шаг 2. Подбери триггеры</h3>
                  <p className="text-muted-foreground mb-4">
                    Триггер — это временной фактор, который «включает» базу:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Транзиты:</strong> быстрые — дают фон/событийность дня-недели; медленные — закладывают этап.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Вторичные прогрессии:</strong> атмосферу периода, эмоциональную готовность (Луна/Солнце/Венера/Меркурий).</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Дирекции (первичные/символические):</strong> «геометрия» важных сдвигов, оформление статуса.</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4 italic">
                    Правило большого пальца: если база сильная и хотя бы два метода дают конкордантный сигнал — вероятность выше.
                  </p>
                </Card>
              </div>
            </section>

            <Separator className="my-12" />

            <section>
              <h2 className="text-3xl font-bold mb-6">Мини-таблица сравнения методов</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">Метод</th>
                      <th className="text-left py-3 px-4 font-semibold">Что даёт</th>
                      <th className="text-left py-3 px-4 font-semibold">Сроки/гранулярность</th>
                      <th className="text-left py-3 px-4 font-semibold">Лучшее применение</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium">Транзиты</td>
                      <td className="py-3 px-4">Точки включения/событийность</td>
                      <td className="py-3 px-4">Дни–месяцы</td>
                      <td className="py-3 px-4">Даты старта/подписи</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium">Прогрессии</td>
                      <td className="py-3 px-4">Внутренняя готовность</td>
                      <td className="py-3 px-4">Месяцы–годы</td>
                      <td className="py-3 px-4">Психологическая зрелость</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium">Дирекции</td>
                      <td className="py-3 px-4">Статус/поворот сюжета</td>
                      <td className="py-3 px-4">Месяцы–годы</td>
                      <td className="py-3 px-4">«Каркас» перемен</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <Separator className="my-12" />

            <section>
              <h2 className="text-3xl font-bold mb-6">Примеры формул (прикладной уровень)</h2>
              
              <div className="space-y-6">
                <Card className="p-6 border-primary/30">
                  <h3 className="text-xl font-semibold mb-3">Брак/официальный союз</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>База:</strong> связь 1–7 домов (или их управителей), участие Венеры/Юпитера/Сатурна; активный 5 дом.</p>
                    <p><strong>Триггеры:</strong> транзитный Юпитер/Сатурн к управителю 7 дома; прогрессивная Венера к управителю 7; дирекционное Солнце к Венере/упр.7.</p>
                    <p><strong>Маркер результата:</strong> оформление, совместные планы, публичность.</p>
                  </div>
                </Card>

                <Card className="p-6 border-primary/30">
                  <h3 className="text-xl font-semibold mb-3">Рождение ребёнка</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>База:</strong> 5 дом, Луна, Юпитер; связь 5–4–8 (тело/семья/род).</p>
                    <p><strong>Триггеры:</strong> прогрессивная Луна в аспекте к управителю 5; транзит Юпитера по 5 дому; дирекционное Солнце к Луне/Юпитеру.</p>
                  </div>
                </Card>

                <Card className="p-6 border-primary/30">
                  <h3 className="text-xl font-semibold mb-3">Переезд/смена страны</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>База:</strong> 4/9/12 дома, Уран/Юпитер/Сатурн; связи 4↔9, 4↔12.</p>
                    <p><strong>Триггеры:</strong> транзит Урана к IC/упр.4; прогрессии Меркурия (документы)/Солнца; дирекции к оси IC/MC.</p>
                  </div>
                </Card>

                <Card className="p-6 border-primary/30">
                  <h3 className="text-xl font-semibold mb-3">Карьерный скачок</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>База:</strong> 10 дом, Солнце/Сатурн/Плутон/Юпитер; связка 2–6–10.</p>
                    <p><strong>Триггеры:</strong> транзит Юпитера/Плутона к MC/упр.10; прогрессивное Солнце к Юпитеру/Сатурну; дирекции к MC.</p>
                  </div>
                </Card>
              </div>
            </section>

            <Separator className="my-12" />

            <section>
              <h2 className="text-3xl font-bold mb-6">Частые ошибки и как их избежать</h2>
              
              <div className="space-y-4">
                <Card className="p-5 bg-destructive/5 border-destructive/20">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Фатализм</h4>
                      <p className="text-sm text-muted-foreground">формула — это склонность, а не приговор. Решения принимаешь ты.</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 bg-destructive/5 border-destructive/20">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Один метод = истина</h4>
                      <p className="text-sm text-muted-foreground">ищи конкордантность (минимум 2 метода + реальный контекст).</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 bg-destructive/5 border-destructive/20">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Игнор контекста</h4>
                      <p className="text-sm text-muted-foreground">без действий событие может «проиграться» внутри, а не вовне.</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 bg-destructive/5 border-destructive/20">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Переспам аспектами</h4>
                      <p className="text-sm text-muted-foreground">качество и смысл важнее количества.</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 bg-destructive/5 border-destructive/20">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Непроверенные источники времени/места рождения</h4>
                      <p className="text-sm text-muted-foreground">уточняй данные, иначе сместятся дома и оси.</p>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            <Separator className="my-12" />

            <section>
              <h2 className="text-3xl font-bold mb-6">5 рекомендаций (короткий чек-лист)</h2>
              
              <div className="space-y-3">
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-semibold">1</span>
                    <p className="text-muted-foreground">Определи событие и соответствующие дома (например, брак → 5/7/11).</p>
                  </div>
                </Card>

                <Card className="p-4 bg-primary/5 border-primary/20">
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-semibold">2</span>
                    <p className="text-muted-foreground">Найди управителей этих домов и их натальные аспекты — это твоя база.</p>
                  </div>
                </Card>

                <Card className="p-4 bg-primary/5 border-primary/20">
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-semibold">3</span>
                    <p className="text-muted-foreground">Проверь триггеры минимум двумя методами: транзиты + прогрессии/дирекции.</p>
                  </div>
                </Card>

                <Card className="p-4 bg-primary/5 border-primary/20">
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-semibold">4</span>
                    <p className="text-muted-foreground">Сверь с реальностью: готовность, ресурсы, юридические/бытовые шаги.</p>
                  </div>
                </Card>

                <Card className="p-4 bg-primary/5 border-primary/20">
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-semibold">5</span>
                    <p className="text-muted-foreground">Планируй окна действий (±3–6 недель к точному аспекту медленных планет; для быстрых — дни).</p>
                  </div>
                </Card>
              </div>
            </section>

            <Separator className="my-12" />

            <section>
              <h2 className="text-3xl font-bold mb-4">Итоги</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Формулы событий помогают увидеть когда и за счёт чего сюжетам легче проявиться. Это не о «суждено/не суждено», а о вероятностях и грамотном тайминге. Сильная база + согласованные триггеры + твои действия = ощутимый результат.
              </p>
            </section>

            <Separator className="my-12" />

            {/* CTA Section */}
            <Card className="p-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30">
              <h2 className="text-2xl font-bold mb-4 text-center">Начни свой путь в астрологии</h2>
              <p className="text-center text-muted-foreground mb-6">
                Регистрируйся и забирай 3 моментальных отчёта бесплатно — начни с базовой натальной карты, совместимости и персональных периодов удачи.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
                  <a href="https://aidzen.app/login" target="_blank" rel="noopener noreferrer">
                    Получить 3 бесплатных расчета
                  </a>
                </Button>
              </div>
            </Card>

            <Separator className="my-12" />

            {/* FAQ Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6">FAQ</h2>
              
              <div className="space-y-6">
                <Card className="p-6 bg-card/50 border-border/50">
                  <h3 className="font-semibold mb-2">В: Формула события гарантирует результат?</h3>
                  <p className="text-muted-foreground text-sm">О: Нет. Это вероятностный сигнал. Решения, готовность и действия остаются за тобой.</p>
                </Card>

                <Card className="p-6 bg-card/50 border-border/50">
                  <h3 className="font-semibold mb-2">В: Сколько методов нужно, чтобы «верить» формуле?</h3>
                  <p className="text-muted-foreground text-sm">О: Идеально — два и более независимых метода (например, транзит + прогрессия) в согласии с натальной базой.</p>
                </Card>

                <Card className="p-6 bg-card/50 border-border/50">
                  <h3 className="font-semibold mb-2">В: Что важнее: точная дата или период?</h3>
                  <p className="text-muted-foreground text-sm">О: Дата — для старта/подписи; период — для подготовки. У медленных планет окно может длиться месяцами.</p>
                </Card>

                <Card className="p-6 bg-card/50 border-border/50">
                  <h3 className="font-semibold mb-2">В: А если в натале «нет базы», но есть мощные транзиты?</h3>
                  <p className="text-muted-foreground text-sm">О: Часто проявление будет мягче или в другой сфере. База задаёт «канал», транзиты — громкость.</p>
                </Card>

                <Card className="p-6 bg-card/50 border-border/50">
                  <h3 className="font-semibold mb-2">В: Можно ли «обойти» напряжённые аспекты?</h3>
                  <p className="text-muted-foreground text-sm">О: Их задача — дать выбор и рост. Осознанные действия переводят напряжение в конструктив.</p>
                </Card>
              </div>
            </section>
          </div>

          {/* Back to Blog */}
          <div className="mt-16 text-center">
            <Button variant="outline" asChild>
              <Link to="/blog">← Вернуться в блог</Link>
            </Button>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
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
                  <a href="https://aidzen.app" target="_blank" rel="noopener noreferrer">
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
    </>
  );
};

export default FormulaEvents;