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
  ArrowRight
} from "lucide-react";
import logo from "@/assets/logo.png";
import neurodzenApp from "@/assets/neurodzenapp.png";
import astrologyGif from "@/assets/astrologyapp.gif";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="НейроДзен" className="w-10 h-10" />
            <span className="text-lg font-semibold tracking-tight">НЕЙРОДЗЕН</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              ЦЕНЫ
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
              <MessageCircle className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Telegram</span>
            </Button>
            <Button size="sm" variant="outline" className="border-primary/30">
              <Smartphone className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">RuStore</span>
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
        
        <div className="container relative mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4 text-primary" />
                <span>ИИ-наставник нового поколения</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                  Точные ответы на{" "}
                  <span className="text-gradient">
                    важные вопросы
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl">
                  ИИ обучен на 37 книгах и 45 курсах по эзотерике. Получите персональные расчеты за минуты.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-purple border-2 border-background flex items-center justify-center"
                      >
                        <Star className="w-5 h-5 text-white" />
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="flex gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />
                      ))}
                    </div>
                    <p className="text-sm font-medium">37,000+ пользователей</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full lg:w-auto text-base px-8 py-6 h-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 glow-yellow"
                >
                  Получить бесплатный расчет
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline" className="border-primary/30 text-primary font-medium">
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
                <img 
                  src={neurodzenApp} 
                  alt="НейроДзен приложение" 
                  className="w-full h-auto rounded-[3rem]"
                />
              </div>
              
              {/* Floating orbs */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-secondary/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="border-primary/30 text-primary font-medium mb-4">
              Возможности
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Что я могу для вас сделать
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Комплексный анализ с использованием новейших методов эзотерики
            </p>
          </div>
          
          {/* Design Variant 1 - Original */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-center">Вариант 1</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { icon: Star, title: 'Астро-прогнозы', desc: 'Персональные предсказания на основе планет', color: 'text-primary' },
                { icon: Heart, title: 'Матрица судьбы', desc: 'Раскройте свое истинное предназначение', color: 'text-primary' },
                { icon: TrendingUp, title: 'Нумерология', desc: 'Узнайте влияние чисел на вашу жизнь', color: 'text-primary' },
                { icon: Users, title: 'Совместимость', desc: 'Анализ отношений с партнером', color: 'text-primary' },
                { icon: Eye, title: 'Хоранные вопросы', desc: 'Ответы на конкретные вопросы', color: 'text-primary' },
                { icon: Gem, title: 'Счастливые камни', desc: 'Подбор талисманов для удачи', color: 'text-primary' },
              ].map((service, i) => (
                <Card 
                  key={i} 
                  className="group p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                    <service.icon className={`w-7 h-7 ${service.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Design Variant 2 - Glassmorphic with gradient borders */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-center">Вариант 2</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { icon: Star, title: 'Астро-прогнозы', desc: 'Персональные предсказания на основе планет' },
                { icon: Heart, title: 'Матрица судьбы', desc: 'Раскройте свое истинное предназначение' },
                { icon: TrendingUp, title: 'Нумерология', desc: 'Узнайте влияние чисел на вашу жизнь' },
                { icon: Users, title: 'Совместимость', desc: 'Анализ отношений с партнером' },
                { icon: Eye, title: 'Хоранные вопросы', desc: 'Ответы на конкретные вопросы' },
                { icon: Gem, title: 'Счастливые камни', desc: 'Подбор талисманов для удачи' },
              ].map((service, i) => (
                <div key={i} className="group relative">
                  <div className="absolute inset-0 bg-gradient-purple rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity blur-xl"></div>
                  <Card className="relative p-8 bg-background/80 backdrop-blur-xl border-primary/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
                    <div className="mb-4 inline-flex p-4 bg-gradient-purple rounded-2xl text-white">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gradient">{service.title}</h3>
                    <p className="text-muted-foreground">{service.desc}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Design Variant 3 - Minimal with hover glow */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center">Вариант 3</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { icon: Star, title: 'Астро-прогнозы', desc: 'Персональные предсказания на основе планет' },
                { icon: Heart, title: 'Матрица судьбы', desc: 'Раскройте свое истинное предназначение' },
                { icon: TrendingUp, title: 'Нумерология', desc: 'Узнайте влияние чисел на вашу жизнь' },
                { icon: Users, title: 'Совместимость', desc: 'Анализ отношений с партнером' },
                { icon: Eye, title: 'Хоранные вопросы', desc: 'Ответы на конкретные вопросы' },
                { icon: Gem, title: 'Счастливые камни', desc: 'Подбор талисманов для удачи' },
              ].map((service, i) => (
                <Card 
                  key={i} 
                  className="group p-8 border-0 bg-card hover:glow-purple transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary/20 rounded-xl group-hover:bg-secondary/30 transition-colors">
                      <service.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Uniqueness Section - Astrological Program */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={astrologyGif} 
                alt="Астрологическая программа считает" 
                className="w-full max-w-sm mx-auto lg:mx-0 rounded-3xl"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Астрологическая программа считает
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>Искусственный интеллект анализирует и оперативно выдает отчет</p>
                <p className="font-medium text-foreground">30+ готовых расчетов на любой случай жизни по различным методологиям и учениям</p>
              </div>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold glow-yellow">
                НАЧАТЬ СЧИТАТЬ....Я ГОТОВ
                <img src={logo} alt="" className="w-6 h-6 ml-2" />
              </Button>
              <p className="text-sm text-muted-foreground">Первые 5 расчетов бесплатно</p>
            </div>
          </div>
        </div>
      </section>

      {/* Uniqueness Section 2 - Tarot Cards */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Точные расчеты и анализ
              </h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">Консультация Астролога</h3>
                  <p className="text-lg text-primary font-semibold">5000р - 15000р</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">Консультация Нумерлога</h3>
                  <p className="text-lg text-primary font-semibold">5000р - 10000р</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">Комплексные консультации</h3>
                  <p className="text-lg text-primary font-semibold">7000р - 20000р</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-lg text-primary font-semibold">Первые 5 расчетов и анализов БЕСПЛАТНО</p>
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold glow-yellow">
                  НАЧАТЬ СЧИТАТЬ....Я ГОТОВ
                  <img src={logo} alt="" className="w-6 h-6 ml-2" />
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-lg">
                <svg viewBox="0 0 600 400" className="w-full h-auto">
                  {/* Tarot cards illustration */}
                  {[
                    { x: 50, y: 50, rotate: -15, title: 'ЗАЧЕМ\nРОДИЛАСЬ', emoji: '♀' },
                    { x: 150, y: 30, rotate: -5, title: 'ФОРМУ\nДУШИ', emoji: '🎯' },
                    { x: 250, y: 20, rotate: 5, title: 'МАГИЯ ИИ', emoji: '🤖' },
                    { x: 350, y: 30, rotate: 15, title: 'ОН-МОЯ\nСУДЬБА?', emoji: '💑' },
                    { x: 450, y: 50, rotate: 25, title: 'ПОПУЛЯРНО\nПЕРИОД', emoji: '⭐' },
                  ].map((card, i) => (
                    <g key={i} transform={`translate(${card.x}, ${card.y}) rotate(${card.rotate})`}>
                      <rect 
                        width="100" 
                        height="140" 
                        rx="8" 
                        fill="none" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth="2"
                      />
                      <text 
                        x="50" 
                        y="60" 
                        textAnchor="middle" 
                        fill="hsl(var(--primary))" 
                        fontSize="12" 
                        fontWeight="600"
                      >
                        {card.title.split('\n').map((line, j) => (
                          <tspan key={j} x="50" dy={j === 0 ? 0 : 14}>{line}</tspan>
                        ))}
                      </text>
                      <text x="50" y="100" textAnchor="middle" fontSize="24">
                        {card.emoji}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>
          <p className="text-center mt-12 text-xl font-semibold max-w-3xl mx-auto">
            НЕЙРОДЗЕН - уникальный сервис, который совмещает расчеты и искусственный интеллект
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="border-primary/30 text-primary font-medium mb-4">
              Тарифы
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              ПАКЕТЫ КОНСУЛЬТАЦИЙ
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Консультанты и любители эзотерики теперь могут использовать силу современного искусственного интеллекта и точно рассчитывать и анализировать личную жизнь, карьеру, совместимость, удачные периоды для сделок, поездок.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {[
              { count: '5', price: 'БЕСПЛАТНО', popular: true },
              { count: '20', price: '1000р' },
              { count: '40', price: '1500р' },
              { count: '70', price: '2000р' },
              { count: '100', price: '2500р' },
            ].map((plan, i) => (
              <Card 
                key={i} 
                className={`p-6 ${plan.popular ? 'border-secondary shadow-xl shadow-secondary/20 glow-yellow' : 'border-border/50'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-4xl font-bold text-foreground">{plan.count}</div>
                    <div className="text-xl font-medium text-muted-foreground">Расчетов</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl font-bold ${plan.popular ? 'text-secondary' : 'text-foreground'}`}>
                      {plan.price}
                    </div>
                    {plan.popular && (
                      <Badge className="bg-secondary text-secondary-foreground">Популярно</Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-12 py-6 h-auto font-semibold glow-yellow">
              НАЧАТЬ СЧИТАТЬ....Я ГОТОВ
              <img src={logo} alt="" className="w-6 h-6 ml-2" />
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">Первые 5 расчетов бесплатно</p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="border-primary/30 text-primary font-medium mb-4">
              Блог
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              НЕЙРОДЗЕН - блог духовного нейропомощника
            </h2>
            <p className="text-lg text-muted-foreground">
              Астролог, нумеролог, духовный наставник
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { title: 'НЕЙРОДЗЕН - НОВЫЙ РАСЧЕТ', desc: 'Добавили новый расчет счастливый камней по вашей дате рождения', date: '4 сентября, 2025' },
              { title: 'СОЛЯР - РАСЧЕТ', desc: 'Персональный астрологический прогноз на год', date: '4 сентября, 2025' },
              { title: 'ФОРМУЛА ДУШИ (АСТРОГОР)', desc: 'Глубинный анализ вашей души через астрологию', date: '4 сентября, 2025' },
              { title: 'Совместимость по натальной карте', desc: 'Узнайте о совместимости с вашим партнером', date: '4 сентября, 2025' },
            ].map((post, i) => (
              <Card 
                key={i} 
                className="group p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.desc}
                    </p>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-medium text-sm">
                    Читать далее
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-primary/30">
              Смотреть все статьи
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-purple rounded-3xl p-12 lg:p-20 text-center text-white shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            
            <div className="relative space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Готовы узнать ответы?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                  Начните свое путешествие к самопознанию прямо сейчас
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-10 py-6 h-auto font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 glow-yellow"
                >
                  Начать считать... Я готов
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </div>
              
              <Badge variant="secondary" className="text-base px-6 py-2 bg-white/20 border-white/30 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Первые 5 расчетов бесплатно
              </Badge>
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
              <p className="text-sm text-muted-foreground">
                Ваш персональный ИИ-наставник по эзотерике
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Документы</h3>
              <div className="space-y-2 text-sm">
                <a href="/dataprocessingpolicy" className="block text-muted-foreground hover:text-primary transition-colors">
                  Политика конфиденциальности
                </a>
                <a href="/dataprocessing" className="block text-muted-foreground hover:text-primary transition-colors">
                  Обработка персональных данных
                </a>
                <a href="/publicoffer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Публичная оферта
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Контакты</h3>
              <div className="flex gap-3">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-primary/30">
                  <Smartphone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 НейроДзен. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
