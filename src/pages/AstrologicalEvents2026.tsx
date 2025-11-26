import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle, Smartphone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "@/assets/logo.png";

const AstrologicalEvents2026 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Ключевые астрологические события 2026 года: как подготовиться | НейроДзен</title>
        <meta
          name="description"
          content="Какие затмения, ретроградный Меркурий и большие транзиты ждут нас в 2026 году. Простое объяснение по шагам: что это значит и как использовать в свою пользу."
        />
        <meta
          name="keywords"
          content="астрологические события 2026, ключевые астрологические события 2026, астропрогноз 2026, затмения 2026, меркурий ретроградный 2026, сатурн в овне 2026, уран в близнецах 2026, плутон в водолее 2026"
        />
        <link rel="canonical" href="https://aidzen.ru/klyuchevye-astrologicheskie-sobytiya-2026" />
        <meta property="og:title" content="Ключевые астрологические события 2026 года: как подготовиться" />
        <meta property="og:description" content="Какие затмения, ретроградный Меркурий и большие транзиты ждут нас в 2026 году. Простое объяснение по шагам." />
        <meta property="og:url" content="https://aidzen.ru/klyuchevye-astrologicheskie-sobytiya-2026" />
        <meta property="og:type" content="article" />
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
              <a href="https://aidzen.app/login" target="_blank" rel="noopener noreferrer">ВХОД</a>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
              <a href="https://t.me/Neurodzenaibot" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Telegram Бот</span>
              </a>
            </Button>
            <Button size="sm" variant="outline" className="border-primary/30" asChild>
              <a href="https://aidzen.app/login" target="_blank" rel="noopener noreferrer">
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
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-primary/30 text-primary font-medium">
                <Calendar className="w-3 h-3 mr-1" />
                Астрология
              </Badge>
              <span className="text-sm text-muted-foreground">Время чтения: 10–12 минут</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Ключевые астрологические события 2026 года: как подготовиться
            </h1>
            <p className="text-xl text-muted-foreground">
              16 января, 2025
            </p>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              В 2026 году не просто «что-то там в гороскопе». Меняется сам фон жизни: затмения в новых знаках, сильные ретрограды и большие планеты, которые сдвигают эпоху. В этой статье разберем, какие события реально стоит учитывать, как по шагам проверить, заденут ли они вашу карту, и каких типичных ошибок можно избежать.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Общая картина 2026 года: год смены фона</h2>
            <p className="leading-relaxed mb-4">
              2026 год продолжает большой разворот, который начался в 2024–2025: Плутон уже в Водолее до 2043 года, а Сатурн и Нептун переходят в огненный Овен, Уран закрепляется в Близнецах.
            </p>
            <p className="leading-relaxed mb-4">
              Это значит: меньше вязкого «болота» водных и земных знаков, больше воздуха и огня. Темы свободы, реформ, технологий, обучения, личной инициативы будут звучать громче, чем «подержаться за старое».
            </p>

            <Card className="p-6 bg-primary/5 border-primary/20 my-8">
              <h3 className="text-xl font-semibold mb-4">Главные тренды года</h3>
              <ul className="space-y-2">
                <li>усиление тем коллективных изменений, технологий и сообществ (Плутон в Водолее)</li>
                <li>новые рамки и ответственность в теме «я и моя свобода» (Сатурн в Овне)</li>
                <li>революция в форматах общения, учёбы, работы с информацией (Уран в Близнецах)</li>
                <li>проверка мечты на реальность: соединение Сатурна и Нептуна в Овне в феврале 2026 года</li>
              </ul>
            </Card>

            <h2 className="text-3xl font-bold mt-12 mb-6">Затмения 2026 года: четыре поворотные точки</h2>
            <p className="leading-relaxed mb-4">
              В 2026 году будет четыре затмения. Это месяцы, когда жизнь ускоряется, что-то «отсекается» и запускается новый сюжет.
            </p>
            
            <Card className="p-6 bg-secondary/5 border-secondary/20 my-6">
              <p className="font-semibold mb-3">По данным астрологических таблиц, нас ждут:</p>
              <ul className="space-y-2">
                <li><strong>17 февраля</strong> – кольцеобразное солнечное затмение в 28–29 градусе Водолея</li>
                <li><strong>3 марта</strong> – полное лунное затмение в 12–13 градусе Девы</li>
                <li><strong>12 августа</strong> – полное солнечное затмение в около 20 градуса Льва</li>
                <li><strong>28 августа</strong> – частное лунное затмение в около 5 градуса Рыб</li>
              </ul>
            </Card>

            <h3 className="text-2xl font-semibold mt-10 mb-4">Как читать любое затмение: базовая схема</h3>
            <p className="leading-relaxed mb-4">Сигнал → Смысл → Действие.</p>
            
            <Card className="p-6 bg-primary/5 border-primary/20 my-6">
              <ul className="space-y-2">
                <li><strong>Сигнал:</strong> знак и дом вашей натальной карты, где происходит затмение</li>
                <li><strong>Смысл:</strong> какая жизненная тема активируется (работа, семья, деньги, отношения и т.д.)</li>
                <li><strong>Действие:</strong> что вам выгодно сделать/не делать в этот период</li>
              </ul>
            </Card>

            <h3 className="text-2xl font-semibold mt-10 mb-4">1. Солнечное затмение 17 февраля 2026 в Водолее</h3>
            <p className="leading-relaxed mb-2"><strong>Сигнал:</strong> Водолей в вашей карте и градусы около 25–29 Водолея.</p>
            <p className="leading-relaxed mb-2"><strong>Смысл:</strong> новый цикл в теме свободы, сообществ, прогресса, «нестандартных» решений.</p>
            <p className="leading-relaxed mb-3"><strong>Действие:</strong></p>
            <ul className="space-y-1 mb-4">
              <li>пересмотреть, с кем вы на одной волне (друзья, команды, онлайн-проекты)</li>
              <li>запускать обновления, связанные с работой в интернете, технологиями, учебой</li>
            </ul>
            
            <Card className="p-5 bg-muted/30 border-muted-foreground/20 my-4">
              <p className="text-sm leading-relaxed mb-2"><strong>Мини-кейс:</strong></p>
              <p className="text-sm leading-relaxed">
                У женщины с асцендентом в Тельце и Водолеем в 10 доме предыдущее водолейское затмение совпало с резкой сменой работы: её пригласили в удалённый международный проект. Сам переход был нервным, но через полгода доход и свобода сильно выросли.
              </p>
            </Card>
            
            <p className="leading-relaxed mb-4">
              <strong>Риск:</strong> резкие решения «на эмоциях». Лучше дать себе 2–3 недели на адаптацию и план.
            </p>

            <h3 className="text-2xl font-semibold mt-10 mb-4">2. Лунное затмение 3 марта 2026 в Деве</h3>
            <p className="leading-relaxed mb-2"><strong>Сигнал:</strong> Дева и рыбо-девий коридор в вашей карте.</p>
            <p className="leading-relaxed mb-2"><strong>Смысл:</strong> кульминация в теме здоровья, режима, работы по найму, бытовых систем.</p>
            <p className="leading-relaxed mb-3"><strong>Действие:</strong></p>
            <ul className="space-y-1 mb-4">
              <li>завершать нездоровые привычки и проекты, которые «съедают нервы»</li>
              <li>наводить порядок: тело, питание, рабочие процессы, документы</li>
            </ul>
            <p className="leading-relaxed mb-4">
              <strong>Риск:</strong> загнать себя в перфекционизм и чувство вины. Важно не «идеально», а устойчиво и по силам.
            </p>

            <h3 className="text-2xl font-semibold mt-10 mb-4">3. Солнечное затмение 12 августа 2026 во Льве</h3>
            <p className="leading-relaxed mb-2"><strong>Сигнал:</strong> Лев в вашей карте, личные планеты в середине фиксированных знаков.</p>
            <p className="leading-relaxed mb-2"><strong>Смысл:</strong> старт новой главы про самореализацию, творчество, детей, личный бренд.</p>
            <p className="leading-relaxed mb-3"><strong>Действие:</strong></p>
            <ul className="space-y-1 mb-4">
              <li>заявить о себе громче: сменить формат продвижения, начать публиковаться</li>
              <li>обратить внимание на тему «я хочу так, а не как надо»</li>
            </ul>
            <p className="leading-relaxed mb-4">
              <strong>Риск:</strong> делать всё «через драму». Выбирайте честный, но спокойный разговор.
            </p>

            <h3 className="text-2xl font-semibold mt-10 mb-4">4. Лунное затмение 28 августа 2026 в Рыбах</h3>
            <p className="leading-relaxed mb-2"><strong>Сигнал:</strong> Рыбы и ось Рыбы–Дева в вашей карте.</p>
            <p className="leading-relaxed mb-2"><strong>Смысл:</strong> эмоциональное завершение, отпускание, конец иллюзии.</p>
            <p className="leading-relaxed mb-3"><strong>Действие:</strong></p>
            <ul className="space-y-1 mb-4">
              <li>отпускать то, что держалось «на надежде», а не на реальности</li>
              <li>дать себе право на отдых, паузу, восстановление</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6">Ретроградный Меркурий 2026: три водные волны</h2>
            <p className="leading-relaxed mb-4">
              В 2026 году Меркурий ретрограден трижды, каждый раз в водных знаках.
            </p>
            
            <Card className="p-6 bg-secondary/5 border-secondary/20 my-6">
              <ul className="space-y-2">
                <li><strong>26 февраля – 20 марта</strong> – Меркурий ретрограден в Рыбах</li>
                <li><strong>29 июня – 23 июля</strong> – Меркурий ретрограден в Раке</li>
                <li><strong>24 октября – 13 ноября</strong> – Меркурий ретрограден в Скорпионе</li>
              </ul>
            </Card>

            <p className="leading-relaxed mb-6">
              Общая тема года по Меркурию: переосмысление эмоций, семейных сценариев, финансовой и интимной честности.
            </p>

            <Card className="p-6 bg-primary/5 border-primary/20 my-8">
              <h3 className="text-xl font-semibold mb-4">Рекомендации по ретроградному Меркурию</h3>
              <ol className="space-y-2">
                <li>Не стартуйте принципиально новые финансовые схемы на ретро-Меркурии, если есть выбор</li>
                <li>Всё, что связано с эмоциями и семьёй, записывайте и проговаривайте</li>
                <li>Ставьте напоминания и дублируйте важные договорённости</li>
              </ol>
            </Card>

            <h2 className="text-3xl font-bold mt-12 mb-6">Большие планеты: Сатурн, Нептун, Уран, Плутон</h2>
            
            <h3 className="text-2xl font-semibold mt-8 mb-4">Сатурн в Овне</h3>
            <p className="leading-relaxed mb-4">
              Сатурн возвращается в Овен 13 февраля 2026 и останется там до апреля 2028.
            </p>
            <p className="leading-relaxed mb-3"><strong>Смысл:</strong> пора структурировать инициативу: не просто «хочу», а план действий и ответственность.</p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Уран в Близнецах</h3>
            <p className="leading-relaxed mb-4">
              Уран закрепляется в Близнецах в конце апреля 2026 и остаётся там примерно до 2032 года.
            </p>
            <p className="leading-relaxed mb-3"><strong>Смысл:</strong> быстрые перемены в том, как мы учимся, делимся информацией, общаемся.</p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Плутон в Водолее</h3>
            <p className="leading-relaxed mb-4">
              Плутон окончательно переходит в Водолея с конца 2024 года и в 2026 году идёт по первым градусам знака.
            </p>
            <p className="leading-relaxed mb-3"><strong>Смысл:</strong> глубокая перестройка того, как вы включены в общество, какие группы выбираете.</p>

            <div className="my-12">
              <Card className="p-8 bg-gradient-to-br from-primary/5 via-purple-500/5 to-primary/5 border-primary/20">
                <h3 className="text-2xl font-bold mb-4 text-center">Получите 3 моментальных отчёта бесплатно</h3>
                <p className="text-muted-foreground mb-6 text-center">Начните с готовых мини-результатов за пару минут</p>
                <div className="flex justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
                    <a href="https://aidzen.app/login" target="_blank" rel="noopener noreferrer">
                      Получить 3 отчёта
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </Card>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">FAQ по астрологическим событиям 2026 года</h2>
            
            <div className="space-y-6">
              <Card className="p-6 bg-muted/30 border-muted-foreground/20">
                <h3 className="font-semibold mb-2">1. Как понять, какие транзиты для меня самые важные?</h3>
                <p className="text-sm leading-relaxed">
                  Смотрите на медленные планеты (Сатурн, Уран, Нептун, Плутон) и их аспекты к вашим личным планетам (Солнце, Луна, Меркурий, Венера, Марс) и к Асценденту.
                </p>
              </Card>

              <Card className="p-6 bg-muted/30 border-muted-foreground/20">
                <h3 className="font-semibold mb-2">2. Как считать транзиты, если я не разбираюсь в астрологии?</h3>
                <p className="text-sm leading-relaxed">
                  Базовый вариант: взять свою натальную карту и транзитную карту на текущую дату и сравнить, какие транзитные планеты находятся рядом с вашими натальными точками.
                </p>
              </Card>

              <Card className="p-6 bg-muted/30 border-muted-foreground/20">
                <h3 className="font-semibold mb-2">3. Сколько длится влияние транзита?</h3>
                <p className="text-sm leading-relaxed">
                  Медленные планеты ощущаются и до, и после точного аспекта. В жизни это похоже на цикл «подготовка - событие - закрепление результата».
                </p>
              </Card>

              <Card className="p-6 bg-muted/30 border-muted-foreground/20">
                <h3 className="font-semibold mb-2">4. Что делать, если несколько сложных транзитов?</h3>
                <p className="text-sm leading-relaxed">
                  Выделите главный - самый медленный и напряжённый аспект к ключевой точке. Важно не пытаться контролировать всё сразу.
                </p>
              </Card>

              <Card className="p-6 bg-muted/30 border-muted-foreground/20">
                <h3 className="font-semibold mb-2">5. Можно ли «обезвредить» тяжёлый транзит?</h3>
                <p className="text-sm leading-relaxed">
                  Полностью убрать влияние нельзя, но можно сильно снизить риски и усилить конструктив через понимание смысла транзита и осознанные решения.
                </p>
              </Card>
            </div>
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
                  <a href="https://aidzen.app/login" target="_blank" rel="noopener noreferrer">
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

export default AstrologicalEvents2026;
