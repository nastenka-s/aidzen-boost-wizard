import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight, MessageCircle, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "@/assets/logo.png";

const Blog = () => {
  const posts = [
    {
      title: 'Транзиты к натальной карте и их влияние: простое объяснение',
      desc: 'Что такое транзиты к натальной карте, как они влияют на события и решения, как читать транзиты по шагам',
      date: '16 января, 2025',
      link: '/tranzity-k-natalnoj-karte-i-ih-vliyanie'
    },
    {
      title: 'Число дома и квартиры: как адрес влияет на деньги и сон',
      desc: 'Узнайте, как посчитать число дома и квартиры по нумерологии и что оно значит для вашего благополучия',
      date: '16 января, 2025',
      link: '/chislo-doma-i-kvartiry-vliyanie-na-dengi-i-son'
    },
    {
      title: 'Показатели денег и богатства в матрице судьбы',
      desc: 'Как по дате рождения увидеть денежный потенциал в матрице судьбы',
      date: '16 января, 2025',
      link: '/pokazateli-deneg-i-bogatstva-v-matrice-sudby'
    },
    {
      title: 'Совместимость для долгих отношений: как понять по дате рождения',
      desc: 'Узнайте, как определить совместимость по дате рождения и числу судьбы',
      date: '16 января, 2025',
      link: '/sovmestimost-dlya-dolgih-otnosheniy'
    },
    {
      title: 'Число судьбы: как рассчитать и применить в жизни',
      desc: 'Узнайте, как рассчитать число судьбы по дате рождения и понять, что оно значит',
      date: '16 января, 2025',
      link: '/chislo-sudby-kak-primenit'
    },
    {
      title: 'Формулы событий в астрологии',
      desc: 'Как читать карту без магии и фатализма',
      date: '11 ноября, 2025',
      link: '/formulaevents'
    },
    {
      title: 'СОЛЯР - РАСЧЕТ',
      desc: 'Персональный астрологический прогноз на год',
      date: '4 сентября, 2025',
      link: '/solar'
    },
    {
      title: 'ФОРМУЛА ДУШИ (АСТРОГОР)',
      desc: 'Глубинный анализ вашей души через астрологию',
      date: '4 сентября, 2025',
      link: '/formuladushi'
    },
    {
      title: 'Совместимость по натальной карте',
      desc: 'Узнайте о совместимости с вашим партнером',
      date: '4 сентября, 2025',
      link: '/synastry'
    },
    {
      title: 'Натальная карта',
      desc: 'Полный расчет вашей натальной карты',
      date: '4 сентября, 2025',
      link: '/natalchart'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Блог НейроДзен: статьи по астрологии и нумерологии | НейроДзен</title>
        <meta name="description" content="Блог о астрологии, нумерологии и эзотерике. Полезные статьи о натальных картах, совместимости, числе судьбы и астрологических расчетах." />
        <meta name="keywords" content="блог астрология, нумерология статьи, натальная карта, астрология обучение, эзотерика" />
        <link rel="canonical" href="https://aidzen.ru/blog" />
      </Helmet>
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
              <a href="https://chat.aidzen.ru" target="_blank" rel="noopener noreferrer">ВХОД</a>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
              <a href="https://t.me/Neurodzenaibot" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Telegram Бот </span>
              </a>
            </Button>
            <Button size="sm" variant="outline" className="border-primary/30" asChild>
              <a href="https://chat.aidzen.ru" target="_blank" rel="noopener noreferrer">
                <Smartphone className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">RuStore</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="border-primary/30 text-primary font-medium mb-4">
              Блог
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              НЕЙРОДЗЕН - блог духовного нейропомощника
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Астролог, нумеролог, духовный наставник
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts.map((post, i) => (
              <Link key={i} to={post.link}>
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
              </Link>
            ))}
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
                <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                  <a href="https://t.me/Neurodzenaibot" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </Button>
                <Button size="sm" variant="outline" className="border-primary/30" asChild>
                  <a href="https://chat.aidzen.ru" target="_blank" rel="noopener noreferrer">
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

export default Blog;
