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
  TrendingUp
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/10 to-background">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold">НЕЙРОДЗЕН ИИ-НАСТАВНИК</span>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" asChild>
            <a href="#" className="flex items-center gap-2">
              <img src="/placeholder.svg" className="w-5 h-5" alt="RuStore" />
              RuStore
            </a>
          </Button>
          <Button size="sm" className="bg-accent hover:bg-accent/90">
            <MessageCircle className="w-4 h-4 mr-2" />
            Telegram Bot
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Message */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Получите точные ответы на{" "}
                <span className="text-secondary text-shadow-glow">
                  важные жизненные вопросы
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                ИИ-наставник, обученный на 37 книгах и 45 курсах по эзотерике
              </p>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border/50 shadow-lg">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center"
                  >
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-sm font-medium">
                  <span className="font-bold">37,000+</span> довольных пользователей
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full lg:w-auto text-lg px-12 py-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Получить бесплатный расчет
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span className="font-medium">Первые 5 расчетов абсолютно бесплатно</span>
              </div>
            </div>

            {/* Urgency Element */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full">
              <Clock className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm font-medium">Осталось 3 бесплатных места на сегодня</span>
            </div>
          </div>

          {/* Right Column - Phone Mockup */}
          <div className="relative">
            <div className="relative mx-auto w-[280px] h-[560px] bg-gradient-to-br from-mystical-dark to-accent rounded-[3rem] p-4 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-purple-900 to-purple-950 rounded-[2.5rem] overflow-hidden">
                {/* Phone Screen Content */}
                <div className="p-6 space-y-6">
                  <div className="text-center text-white">
                    <p className="text-sm font-medium mb-4">Натальная карта</p>
                    <div className="relative w-48 h-48 mx-auto">
                      <div className="absolute inset-0 border-2 border-purple-400 rounded-full"></div>
                      <div className="absolute inset-4 border border-purple-500 rounded-full"></div>
                      <Star className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-purple-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {['Нумерологический Расчет', 'Совместимость', 'Счастливые Камни'].map((item) => (
                      <div key={item} className="bg-purple-800/50 text-white text-sm py-3 px-4 rounded-lg text-center">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 animate-float">
              <div className="bg-secondary rounded-full p-3 shadow-lg">
                <Moon className="w-6 h-6 text-secondary-foreground" />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 animate-float" style={{ animationDelay: '2s' }}>
              <div className="bg-accent rounded-full p-3 shadow-lg">
                <Sparkles className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          Что я могу для вас сделать
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Star, title: 'Астро-прогнозы', desc: 'Персональные предсказания на основе планет' },
            { icon: Heart, title: 'Матрица судьбы', desc: 'Раскройте свое истинное предназначение' },
            { icon: TrendingUp, title: 'Нумерология', desc: 'Узнайте влияние чисел на вашу жизнь' },
            { icon: Users, title: 'Совместимость', desc: 'Анализ отношений с партнером' },
            { icon: Moon, title: 'Хоранные вопросы', desc: 'Ответы на конкретные вопросы прямо сейчас' },
            { icon: Gem, title: 'Счастливые камни', desc: 'Подбор талисманов для защиты и удачи' },
          ].map((service, i) => (
            <Card key={i} className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border-primary/20">
              <service.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="p-8 lg:p-12 bg-gradient-to-r from-card to-primary/5 border-primary/20">
          <div className="grid lg:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">37</div>
              <div className="text-muted-foreground">Книг изучено</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">45</div>
              <div className="text-muted-foreground">Курсов пройдено</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">91%</div>
              <div className="text-muted-foreground">Получили ясность после первой консультации</div>
            </div>
          </div>
        </Card>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-8 lg:p-16 text-center text-primary-foreground shadow-2xl">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Готовы узнать ответы?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Начните свое путешествие к самопознанию прямо сейчас
          </p>
          <Button 
            size="lg" 
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-12 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Начать считать... Я готов
          </Button>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Badge variant="secondary" className="text-base px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Первые 5 расчетов бесплатно
            </Badge>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>© 2024 НейроДзен. Ваш персональный ИИ-наставник по эзотерике</p>
      </footer>
    </div>
  );
};

export default Index;
