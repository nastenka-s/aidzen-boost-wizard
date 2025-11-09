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
  Eye
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Sparkles className="w-7 h-7 text-primary" />
              <div className="absolute inset-0 blur-xl opacity-50 bg-primary"></div>
            </div>
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

              {/* Urgency */}
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-xl shadow-sm">
                <div className="relative">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                </div>
                <span className="text-sm font-medium">Осталось 3 места на сегодня</span>
              </div>
            </div>

            {/* Right Column - Modern Phone Mockup */}
            <div className="relative lg:scale-110">
              <div className="relative mx-auto w-[280px] h-[560px] rounded-[3rem] bg-gradient-to-br from-primary via-primary to-accent p-1 shadow-2xl glow-purple">
                <div className="w-full h-full bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 rounded-[2.8rem] overflow-hidden">
                  {/* Phone notch */}
                  <div className="h-8 bg-black/20 rounded-b-3xl mx-auto w-40"></div>
                  
                  {/* Screen Content */}
                  <div className="p-6 space-y-6">
                    <div className="text-center text-white space-y-3">
                      <p className="text-xs font-medium text-purple-300 tracking-wide">НАТАЛЬНАЯ КАРТА</p>
                      <div className="relative w-44 h-44 mx-auto">
                        {/* Zodiac wheel */}
                        <div className="absolute inset-0 border-2 border-purple-400/40 rounded-full"></div>
                        <div className="absolute inset-3 border border-purple-500/30 rounded-full"></div>
                        <div className="absolute inset-6 border border-purple-600/20 rounded-full"></div>
                        
                        {/* Center star */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="relative">
                            <Star className="w-12 h-12 text-secondary fill-secondary drop-shadow-lg" />
                            <div className="absolute inset-0 blur-xl bg-secondary opacity-50"></div>
                          </div>
                        </div>
                        
                        {/* Constellation lines */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                          <line x1="50" y1="20" x2="50" y2="50" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1"/>
                          <line x1="50" y1="50" x2="80" y2="50" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1"/>
                          <line x1="50" y1="50" x2="50" y2="80" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1"/>
                          <line x1="50" y1="50" x2="20" y2="50" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Menu items */}
                    <div className="space-y-2">
                      {[
                        { icon: TrendingUp, text: 'Нумерологический Расчет' },
                        { icon: Heart, text: 'Совместимость' },
                        { icon: Gem, text: 'Счастливые Камни' }
                      ].map((item, i) => (
                        <div 
                          key={i} 
                          className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white text-xs py-3 px-4 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <item.icon className="w-4 h-4 text-secondary" />
                          <span className="font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="p-12 lg:p-16 bg-gradient-to-br from-card via-primary/5 to-card border-primary/20 shadow-xl">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div className="space-y-3">
                <div className="text-5xl lg:text-6xl font-bold text-gradient">37</div>
                <div className="text-muted-foreground font-medium">Книг изучено</div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl lg:text-6xl font-bold text-gradient">45</div>
                <div className="text-muted-foreground font-medium">Курсов пройдено</div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl lg:text-6xl font-bold text-gradient">91%</div>
                <div className="text-muted-foreground font-medium">Получили ясность</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32 bg-muted/30">
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
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4 lg:px-8 text-center text-sm text-muted-foreground">
          <p>© 2024 НейроДзен. Ваш персональный ИИ-наставник по эзотерике</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
