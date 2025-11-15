import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Sparkles,
  Moon,
  Heart,
  Users,
  Calendar,
  Gem,
  MessageCircle,
  Clock,
  TrendingUp,
  Zap,
  Eye,
  Smartphone,
  Check,
  BookOpen,
  ArrowRight,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "@/assets/logo.png";
import neurodzenApp from "@/assets/neurodzenapp.png";
import astrologyGif from "@/assets/astrologyapp.gif";
import blondeWoman from "@/assets/blondewoman.png";
import brunetteWoman from "@/assets/brunetterwoman.png";
import manDarkHair from "@/assets/mandarkhair.png";
import matrixSudby from "@/assets/matrix-sudby.png";
const Index = () => {
  const isAndroid = /Android/i.test(navigator.userAgent);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>НейроДзен - Натальная карта онлайн бесплатно, Гороскоп, Нумерология | Бесплатный расчет</title>
        <meta
          name="description"
          content="Получите натальную карту онлайн бесплатно, гороскоп бесплатно и нумерологический расчет. Рассчитать матрицу судьбы, число судьбы, транзиты планет. ИИ-наставник по астрологии и эзотерике. Первые 5 расчетов бесплатно."
        />
        <meta
          name="keywords"
          content="натальная карта онлайн бесплатно, гороскоп бесплатно, нумерология, рассчитать матрицу судьбы, астрология, натальная карта, бесплатный расчет натальная карта, астрологический прогноз, астролог, матрица судьбы, соляр, синастрия, совместимость, число судьбы, транзиты планет"
        />
        <link rel="canonical" href="https://aidzen.ru/" />
      </Helmet>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="НейроДзен" className="w-10 h-10" />
            <span className="text-lg font-semibold tracking-tight">НЕЙРОДЗЕН</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
              <a href="#pricing">ЦЕНЫ</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                ВХОД
              </a>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
              <a href="https://t.me/Neurodzenaibot" target="_blank" rel="noopener noreferrer">
                <Send className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Telegram Бот </span>
              </a>
            </Button>
            <Button size="sm" variant="outline" className="border-primary/30" asChild>
              <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                <Smartphone className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">RuStore</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-purple-glow"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl"></div>

        <div className="container relative mx-auto px-3 lg:px-8 py-6 sm:py-8 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 border border-primary/20 rounded-full text-xs sm:text-sm font-medium">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="hidden sm:inline">Эзотерический ИИ-наставник нового поколения</span>
                <span className="sm:hidden">ИИ-наставник нового поколения</span>
              </div>

              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold leading-tight tracking-tight">
                  Точные ответы на важные вопросы <span className="text-gradient"> в новой астро-нумеро-нейронке</span>
                </h1>
                <p className="text-sm sm:text-base lg:text-xl text-muted-foreground max-w-xl">
                  Рассчитать астрологический прогноз, матрицу судьбы, транзиты планет — ИИ обучен на 37 книгах и 45
                  курсах по эзотерике. Получите персональные прогнозы за минуты.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
                {/* Faces + Text */}
                <div className="flex flex-col items-center gap-2 p-2 sm:p-3 lg:p-4 bg-card/50 rounded-lg sm:rounded-xl border border-border/30 flex-1 min-w-[140px] max-w-[180px]">
                  <div className="flex -space-x-2 sm:-space-x-3">
                    <img
                      src={blondeWoman}
                      alt="User 1"
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-background"
                    />
                    <img
                      src={brunetteWoman}
                      alt="User 2"
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-background"
                    />
                    <img
                      src={manDarkHair}
                      alt="User 3"
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-background"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm font-medium leading-tight">Для любителей и консультантов</p>
                  </div>
                </div>

                {/* 30+ готовых расчетов */}
                <div className="flex flex-col items-center gap-2 p-2 sm:p-3 lg:p-4 bg-card/50 rounded-lg sm:rounded-xl border border-border/30 flex-1 min-w-[140px] max-w-[180px]">
                  <div className="w-auto px-2 sm:px-3 lg:px-4 h-8 sm:h-10 lg:h-12 rounded-full bg-gradient-purple flex items-center justify-center gap-1 sm:gap-2">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-purple-800 text-sm sm:text-base font-bold whitespace-nowrap">Более 30</span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm font-medium leading-tight">
                      астрологических и нумерологических расчетов
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3 sm:space-y-4">
                <Button
                  size="lg"
                  className="w-full lg:w-auto text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-5 lg:py-6 h-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 glow-yellow"
                  asChild
                >
                  <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                    Получить бесплатный расчет
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </a>
                </Button>
                {isAndroid && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full lg:w-auto text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-5 lg:py-6 h-auto border-primary/30 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <a
                      href="https://www.rustore.ru/catalog/app/ru.neurodzen.app"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Скачать в RuStore
                    </a>
                  </Button>
                )}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Badge variant="outline" className="border-primary/30 text-primary font-medium text-xs">
                    Бесплатно
                  </Badge>
                  <span>Первые 5 расчетов без оплаты</span>
                </div>
              </div>

              {/* News */}
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-xl shadow-sm">
                <div className="relative">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                </div>
                <span className="text-sm font-medium">Добавлен новый расчет - Каббала - Путь Души</span>
              </div>
            </div>

            {/* Right Column - App Screenshot */}
            <div className="relative lg:scale-110">
              <div className="relative mx-auto w-[320px] h-auto">
                <img src={neurodzenApp} alt="НейроДзен приложение" className="w-full h-auto rounded-[3rem]" />
              </div>

              {/* Floating orbs */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-secondary/20 rounded-full blur-2xl animate-pulse"></div>
              <div
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-pulse"
                style={{
                  animationDelay: "1s",
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-8 lg:py-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="border-primary/30 text-primary font-medium mb-4">
              Возможности
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Что я могу для вас рассчитать</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Комплексный анализ с использованием новейших методов эзотерики
            </p>
          </div>

          {/* Design Variant 3 - Selected */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Star,
                title: "Астро-прогнозы",
                desc: "Персональные предсказания на основе положения ваших планет",
              },
              {
                icon: Heart,
                title: "Матрица судьбы",
                desc: "Раскройте свое истинное предназначение по нумерологии",
              },
              {
                icon: TrendingUp,
                title: "Нумерология",
                desc: "Узнайте влияние чисел на вашу жизнь",
              },
              {
                icon: Users,
                title: "Совместимость",
                desc: "Анализ отношений с партнером по вашим натальным картам",
              },
              {
                icon: Eye,
                title: "Хоранные вопросы",
                desc: "Быстрые ответы на конкретные вопросы",
              },
              {
                icon: Gem,
                title: "Счастливые камни",
                desc: "Подбор индивидуальных талисманов для удачи",
              },
              {
                icon: Users,
                title: "Дизайн Человека",
                desc: "Узнайте свой тип и стратегию жизни по уникальной методике",
              },
              {
                icon: Moon,
                title: "Натальная Карта",
                desc: "Ваша и ребенка, западная и ведическая",
              },
              {
                icon: Sparkles,
                title: "Предназначение и кармические отработки",
                desc: "Раскройте свою миссию и уроки души по разным учениям",
              },
            ].map((service, i) => (
              <Card
                key={i}
                className="group p-8 border-0 bg-card hover:glow-purple transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{service.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Matrix Sudby Section */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="border-primary/30 text-primary font-medium">
                Нумерология
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Матрица судьбы</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Матрица судьбы — это древняя нумерологическая система, которая раскрывает ваши таланты, предназначение
                  и кармические задачи через энергии чисел и арканов.
                </p>
                <p className="font-medium text-foreground">
                  Узнайте о своих сильных сторонах, денежных возможностях, отношениях и жизненных задачах через расчет
                  матрицы по дате рождения.
                </p>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>Определение предназначения и талантов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>Анализ денежных энергий и финансового потенциала</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>Совместимость в отношениях по матрице</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>Кармические задачи и уроки души</span>
                  </li>
                </ul>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
                <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                  Рассчитать матрицу судьбы бесплатно
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={matrixSudby} alt="Матрица судьбы - пример расчета" className="w-full" />
              </div>
              {/* Floating orbs */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-secondary/20 rounded-full blur-2xl animate-pulse"></div>
              <div
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-pulse"
                style={{
                  animationDelay: "1s",
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Uniqueness Section - Astrological Program */}
      <section className="py-8 lg:py-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={astrologyGif}
                alt="Астрологическая программа считает"
                className="w-full max-w-sm mx-auto lg:mx-0"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Астро-программа считает, ИИ анализирует</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>Искусственный интеллект анализирует и оперативно выдает отчет</p>
                <p className="font-medium text-foreground">
                  30+ готовых расчетов на любой случай жизни по различным методологиям и учениям
                </p>
              </div>
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold glow-yellow"
                asChild
              >
                <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                  Получить 5 бесплатных расчетов
                  <Sparkles className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-8 lg:py-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="border-primary/30 text-primary font-medium mb-4">
              Тарифы
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">ПАКЕТЫ КОНСУЛЬТАЦИЙ</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Консультанты и любители эзотерики теперь могут использовать силу современного искусственного интеллекта и
              точно рассчитывать и анализировать личную жизнь, карьеру, совместимость, удачные периоды для сделок,
              поездок.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {[
              {
                count: "5",
                price: "БЕСПЛАТНО",
                popular: false,
              },
              {
                count: "20",
                price: "1000р",
                popular: true,
              },
              {
                count: "40",
                price: "1500р",
              },
              {
                count: "70",
                price: "2000р",
              },
              {
                count: "100",
                price: "2500р",
              },
            ].map((plan, i) => (
              <Card
                key={i}
                className={`p-6 ${plan.popular ? "border-secondary shadow-xl shadow-secondary/20 glow-yellow" : "border-border/50"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-4xl font-bold text-foreground">{plan.count}</div>
                    <div className="text-xl font-medium text-muted-foreground">Расчетов</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl font-bold ${plan.popular ? "text-secondary" : "text-foreground"}`}>
                      {plan.price}
                    </div>
                    {plan.popular && <Badge className="bg-secondary text-secondary-foreground">Популярно</Badge>}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-12 py-6 h-auto font-semibold glow-yellow"
              asChild
            >
              <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                Получить 5 бесплатных расчетов
                <Sparkles className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="border-primary/30 text-primary font-medium mb-4">
              Блог
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">НЕЙРОДЗЕН - блог духовного нейропомощника</h2>
            <p className="text-lg text-muted-foreground">Астролог, нумеролог, духовный наставник</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Ключевые астрологические события 2026 года: как подготовиться",
                desc: "Какие затмения, ретроградный Меркурий и большие транзиты ждут нас в 2026 году",
                date: "16 января, 2025",
                link: "/klyuchevye-astrologicheskie-sobytiya-2026",
              },
              {
                title: "Транзиты к натальной карте и их влияние: простое объяснение",
                desc: "Что такое транзиты к натальной карте, как они влияют на события и решения",
                date: "16 января, 2025",
                link: "/tranzity-k-natalnoj-karte-i-ih-vliyanie",
              },
              {
                title: "Число дома и квартиры: как адрес влияет на деньги и сон",
                desc: "Узнайте, как посчитать число дома и квартиры по нумерологии",
                date: "16 января, 2025",
                link: "/chislo-doma-i-kvartiry-vliyanie-na-dengi-i-son",
              },
            ].map((post, i) => (
              <Link key={i} to={post.link}>
                <Card className="group p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm cursor-pointer h-full">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.desc}</p>
                      <p className="text-xs text-muted-foreground">{post.date}</p>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm">
                      Читать далее
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-primary/30" asChild>
              <Link to="/blog">Смотреть все статьи</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 lg:py-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-purple rounded-3xl p-12 lg:p-20 text-center shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>

            <div className="relative space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-primary">Готовы узнать ответы?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Начните свое путешествие к самопознанию прямо сейчас
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-10 py-6 h-auto font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 glow-yellow"
                  asChild
                >
                  <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                    Получить 5 бесплатных расчетов
                    <Sparkles className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src={logo} alt="НейроДзен" className="w-10 h-10" />
                <span className="text-lg font-semibold">НЕЙРОДЗЕН</span>
              </div>
              <p className="text-sm text-muted-foreground">Ваш персональный ИИ-наставник по эзотерике</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Документы</h3>
              <div className="space-y-2 text-sm">
                <Link
                  to="/dataprocessingpolicy"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
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
                  <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
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
  );
};
export default Index;
