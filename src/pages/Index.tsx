import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles, Moon, Heart, Users, Calendar, Gem, MessageCircle, Clock, TrendingUp, Zap, Eye, Smartphone, Check, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import neurodzenApp from "@/assets/neurodzenapp.png";
import astrologyGif from "@/assets/astrologyapp.gif";
const Index = () => {
  return <div className="min-h-screen bg-background">
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
              <span className="hidden md:inline">Telegram </span>
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
        
        <div className="container relative mx-auto px-4 lg:px-8 py-12 lg:py-16">
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

              {/* Trust Badges - Варианты */}
              <div className="flex flex-wrap gap-6">
                {/* Вариант 1: 37,000+ пользователей */}
                <div className="flex items-center gap-3 p-4 bg-card/50 rounded-xl border border-border/30">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-gradient-purple border-2 border-background flex items-center justify-center">
                        <Star className="w-5 h-5 text-white" />
                      </div>)}
                  </div>
                  <div className="text-left">
                    <div className="flex gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />)}
                    </div>
                    <p className="text-sm font-medium">37,000+ пользователей</p>
                  </div>
                </div>

                {/* Вариант 2: 30+ готовых расчетов */}
                <div className="flex items-center gap-3 p-4 bg-card/50 rounded-xl border border-border/30">
                  <div className="w-10 h-10 rounded-full bg-gradient-purple flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-primary">30+</p>
                    <p className="text-sm font-medium">готовых расчетов</p>
                  </div>
                </div>

                {/* Вариант 3: 5 лет опыта */}
                <div className="flex items-center gap-3 p-4 bg-card/50 rounded-xl border border-border/30">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-secondary">5+</p>
                    <p className="text-sm font-medium">лет разработки</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-4">
                <Button size="lg" className="w-full lg:w-auto text-base px-8 py-6 h-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 glow-yellow">
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
                <img src={neurodzenApp} alt="НейроДзен приложение" className="w-full h-auto rounded-[3rem]" />
              </div>
              
              {/* Floating orbs */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-secondary/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-pulse" style={{
              animationDelay: '1s'
            }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 lg:py-20 bg-muted/30">
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
          
          {/* Design Variant 3 - Selected */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[{
              icon: Star,
              title: 'Астро-прогнозы',
              desc: 'Персональные предсказания на основе планет'
            }, {
              icon: Heart,
              title: 'Матрица судьбы',
              desc: 'Раскройте свое истинное предназначение'
            }, {
              icon: TrendingUp,
              title: 'Нумерология',
              desc: 'Узнайте влияние чисел на вашу жизнь'
            }, {
              icon: Users,
              title: 'Совместимость',
              desc: 'Анализ отношений с партнером'
            }, {
              icon: Eye,
              title: 'Хоранные вопросы',
              desc: 'Ответы на конкретные вопросы'
            }, {
              icon: Gem,
              title: 'Счастливые камни',
              desc: 'Подбор талисманов для удачи'
            }, {
              icon: Users,
              title: 'Дизайн Человека',
              desc: 'Узнайте свой тип и стратегию жизни'
            }, {
              icon: Moon,
              title: 'Натальная Карта',
              desc: 'Своя и ребенка, западная и ведическая'
            }, {
              icon: Sparkles,
              title: 'Предназначение и кармические отработки',
              desc: 'Раскройте свою миссию и уроки души'
            }].map((service, i) => <Card key={i} className="group p-8 border-0 bg-card hover:glow-purple transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.desc}</p>
                  </div>
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Uniqueness Section - Astrological Program */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img src={astrologyGif} alt="Астрологическая программа считает" className="w-full max-w-sm mx-auto lg:mx-0" />
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
                Получить 5 бесплатных расчетов
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      <section className="py-12 lg:py-20 bg-muted/30">
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
            {[{
            count: '5',
            price: 'БЕСПЛАТНО',
            popular: false
          }, {
            count: '20',
            price: '1000р',
            popular: true
          }, {
            count: '40',
            price: '1500р'
          }, {
            count: '70',
            price: '2000р'
          }, {
            count: '100',
            price: '2500р'
          }].map((plan, i) => <Card key={i} className={`p-6 ${plan.popular ? 'border-secondary shadow-xl shadow-secondary/20 glow-yellow' : 'border-border/50'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-4xl font-bold text-foreground">{plan.count}</div>
                    <div className="text-xl font-medium text-muted-foreground">Расчетов</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl font-bold ${plan.popular ? 'text-secondary' : 'text-foreground'}`}>
                      {plan.price}
                    </div>
                    {plan.popular && <Badge className="bg-secondary text-secondary-foreground">Популярно</Badge>}
                  </div>
                </div>
              </Card>)}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-12 py-6 h-auto font-semibold glow-yellow">
              Получить 5 бесплатных расчетов
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-12 lg:py-20">
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
            {[{
            title: 'СОЛЯР - РАСЧЕТ',
            desc: 'Персональный астрологический прогноз на год',
            date: '4 сентября, 2025',
            link: '/solar'
          }, {
            title: 'ФОРМУЛА ДУШИ (АСТРОГОР)',
            desc: 'Глубинный анализ вашей души через астрологию',
            date: '4 сентября, 2025',
            link: '/formuladushi'
          }, {
            title: 'Совместимость по натальной карте',
            desc: 'Узнайте о совместимости с вашим партнером',
            date: '4 сентября, 2025',
            link: '/synastry'
          }, {
            title: 'Натальная карта',
            desc: 'Полный расчет вашей натальной карты',
            date: '4 сентября, 2025',
            link: '/natalchart'
          }].map((post, i) => <Link key={i} to={post.link}>
              <Card className="group p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm cursor-pointer h-full">
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
            </Link>)}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-primary/30">
              Смотреть все статьи
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-purple rounded-3xl p-12 lg:p-20 text-center shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            
            <div className="relative space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-primary">
                  Готовы узнать ответы?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Начните свое путешествие к самопознанию прямо сейчас
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-10 py-6 h-auto font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 glow-yellow">
                  Получить 5 бесплатных расчетов
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </div>
              
              <Badge variant="secondary" className="text-base px-6 py-2 bg-secondary/20 border-secondary/30 backdrop-blur-sm">
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
    </div>;
};
export default Index;