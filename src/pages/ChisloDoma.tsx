import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, MessageCircle, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "@/assets/logo.png";

const ChisloDoma = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Число дома и квартиры: как адрес влияет на деньги и сон | НейроДзен</title>
        <meta name="description" content="Узнайте, как посчитать число дома и квартиры по нумерологии, что оно значит для вашего благополучия и как нейтрализовать негативные вибрации." />
        <meta name="keywords" content="нумерология адреса, число дома, нумерология квартиры, значение адреса, энергия дома, вибрации чисел, нумерология денег, гармония жилья" />
        <link rel="canonical" href="https://aidzen.ru/chislo-doma-i-kvartiry-vliyanie-na-dengi-i-son" />
        <meta property="og:title" content="Число дома и квартиры: как адрес влияет на деньги и сон" />
        <meta property="og:description" content="Узнайте, как посчитать число дома и квартиры по нумерологии, что оно значит для вашего благополучия и как нейтрализовать негативные вибрации." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://aidzen.ru/chislo-doma-i-kvartiry-vliyanie-na-dengi-i-son" />
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
                <span className="hidden md:inline">Telegram Бот</span>
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

      {/* Article Content */}
      <article className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Article Header */}
          <div className="mb-12 space-y-6">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-primary/30 text-primary font-medium">
                <Home className="w-3 h-3 mr-1" />
                Нумерология
              </Badge>
              <span className="text-sm text-muted-foreground">Время чтения: 9 мин</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Число дома и квартиры: влияет ли адрес на деньги и сон
            </h1>
            <p className="text-xl text-muted-foreground">
              Вы замечали, что в одном доме деньги будто сами текут в руки, а в другом — всё время что-то ломается и приходят счета? В нумерологии это связывают с вибрацией адреса.
            </p>
            <div className="text-sm text-muted-foreground">
              Опубликовано: 16 января, 2025
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-4">Как посчитать число дома или квартиры</h2>
              <p className="text-muted-foreground mb-4">
                Алгоритм простой. Нумерология всегда сводит числа к однозначному коду от 1 до 9.
              </p>
              <Card className="p-6 mb-4 bg-card/50 backdrop-blur-sm border-primary/20">
                <p className="font-semibold mb-2">Формула:</p>
                <p className="text-muted-foreground">
                  Складываем все цифры номера дома (или квартиры), пока не получится одно число.
                </p>
                <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                  <p className="font-semibold">Пример:</p>
                  <p>Дом № 245 → 2 + 4 + 5 = 11 → 1 + 1 = 2</p>
                  <p className="text-primary font-semibold">→ Число дома = 2</p>
                </div>
              </Card>
              <p className="text-muted-foreground mb-4">
                Если адрес включает букву (например, 12А), то букву переводят в число по алфавиту (А = 1, Б = 2, В = 3 и т.д.) и добавляют в расчёт.
              </p>
              <p className="text-muted-foreground">12А → 1 + 2 + 1 = 4</p>
              
              <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                <p className="font-semibold mb-2">Рекомендации:</p>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Всегда считайте отдельно дом и квартиру.</li>
                  <li>Приоритетнее энергия квартиры (вы в ней спите).</li>
                  <li>Если вы живёте в доме частично (например, в таунхаусе), можно суммировать оба числа.</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Значение чисел домов и квартир</h2>
              <p className="text-muted-foreground mb-6">
                Каждое число несёт свою «частоту» и формирует эмоциональный фон, привычки и денежные сценарии.
              </p>

              <div className="space-y-6">
                <Card className="p-6 border-primary/20">
                  <h3 className="text-2xl font-semibold mb-3">1 — энергия начала и индивидуализма</h3>
                  <p className="text-muted-foreground mb-2"><strong>Сигнал:</strong> активность, независимость, постоянное движение.</p>
                  <p className="text-muted-foreground mb-2"><strong>Смысл:</strong> дом «лидера», где хорошо запускать новое, но тяжело отдыхать.</p>
                  <p className="text-muted-foreground mb-3"><strong>Действие:</strong> добавьте элементы воды (синий, зеркала) — они смягчат импульсивность.</p>
                  <div className="p-3 bg-accent/10 rounded">
                    <p className="text-sm italic">Пример: девушка с квартирой № 19 (1 + 9 = 10 → 1) жаловалась, что не может «остановить голову». После перестановки — убрала яркий красный, добавила растения — сон улучшился.</p>
                  </div>
                </Card>

                <Card className="p-6 border-primary/20">
                  <h3 className="text-2xl font-semibold mb-3">2 — комфорт и эмоции</h3>
                  <p className="text-muted-foreground mb-2"><strong>Сигнал:</strong> уют, пары, тихие разговоры.</p>
                  <p className="text-muted-foreground mb-2"><strong>Смысл:</strong> хорошо для семьи и сна, но может «гасить» амбиции.</p>
                  <p className="text-muted-foreground"><strong>Действие:</strong> активируйте энергию огня — свечи, красные детали, чтобы не застревать в пассивности.</p>
                </Card>

                <Card className="p-6 border-primary/20">
                  <h3 className="text-2xl font-semibold mb-3">3 — радость, лёгкость, общение</h3>
                  <p className="text-muted-foreground mb-2"><strong>Сигнал:</strong> лёгкость, творчество, гости.</p>
                  <p className="text-muted-foreground mb-2"><strong>Смысл:</strong> помогает расширять связи, но тратится много энергии.</p>
                  <p className="text-muted-foreground"><strong>Действие:</strong> чтобы не разбрасываться, держите чёткий финансовый план на месяц.</p>
                </Card>

                <Card className="p-6 border-primary/20">
                  <h3 className="text-2xl font-semibold mb-3">4 — стабильность и порядок</h3>
                  <p className="text-muted-foreground mb-2"><strong>Сигнал:</strong> дисциплина, рациональность, материализация.</p>
                  <p className="text-muted-foreground mb-2"><strong>Смысл:</strong> помогает накапливать, но создаёт ощущение рутины.</p>
                  <p className="text-muted-foreground"><strong>Действие:</strong> добавляйте символы движения — картины дорог, зеркала у выхода.</p>
                </Card>

                <Card className="p-6 border-primary/20">
                  <h3 className="text-2xl font-semibold mb-3">5 — движение и перемены</h3>
                  <p className="text-muted-foreground mb-2"><strong>Сигнал:</strong> энергия риска и новизны.</p>
                  <p className="text-muted-foreground mb-2"><strong>Смысл:</strong> хорошо для бизнеса и вдохновения, плохо для сна и покоя.</p>
                  <p className="text-muted-foreground"><strong>Действие:</strong> зонируйте: отдельное место для отдыха без техники и лишнего света.</p>
                </Card>

                <Card className="p-6 border-primary/20">
                  <h3 className="text-2xl font-semibold mb-3">6 — семья и забота</h3>
                  <p className="text-muted-foreground mb-2"><strong>Сигнал:</strong> чувство долга, поддержка, красота.</p>
                  <p className="text-muted-foreground mb-2"><strong>Смысл:</strong> идеален для гармоничных отношений, но может тянуть в «служение».</p>
                  <p className="text-muted-foreground"><strong>Действие:</strong> не берите на себя лишнюю ответственность за родственников — учитесь делегировать.</p>
                </Card>

                <Card className="p-6 border-primary/20">
                  <h3 className="text-2xl font-semibold mb-3">7 — тишина, духовность, изоляция</h3>
                  <p className="text-muted-foreground mb-2"><strong>Сигнал:</strong> концентрация, внутренняя работа.</p>
                  <p className="text-muted-foreground mb-2"><strong>Смысл:</strong> место для анализа, учёбы, но может усиливать одиночество.</p>
                  <p className="text-muted-foreground"><strong>Действие:</strong> чаще устраивайте встречи вне дома, иначе энергия «запретит» движение.</p>
                </Card>

                <Card className="p-6 border-primary/20">
                  <h3 className="text-2xl font-semibold mb-3">8 — сила, статус, деньги</h3>
                  <p className="text-muted-foreground mb-2"><strong>Сигнал:</strong> власть, цели, материальный рост.</p>
                  <p className="text-muted-foreground mb-2"><strong>Смысл:</strong> усиливает амбиции, но требует дисциплины.</p>
                  <p className="text-muted-foreground mb-3"><strong>Действие:</strong> поддерживайте порядок — любая неорганизованность «съедает» поток денег.</p>
                  <div className="p-3 bg-accent/10 rounded">
                    <p className="text-sm italic">Кейс: предприниматель переехал в квартиру с числом 8, через полгода открыл второй филиал. Но позже столкнулся с выгоранием — дом не отпускал в отдых. Решение: медитации и спальные цвета без золота.</p>
                  </div>
                </Card>

                <Card className="p-6 border-primary/20">
                  <h3 className="text-2xl font-semibold mb-3">9 — завершение и мудрость</h3>
                  <p className="text-muted-foreground mb-2"><strong>Сигнал:</strong> подведение итогов, завершения, отпускание.</p>
                  <p className="text-muted-foreground mb-2"><strong>Смысл:</strong> место переходов — можно хорошо очищаться, но тяжело строить долгосрочные планы.</p>
                  <p className="text-muted-foreground"><strong>Действие:</strong> используйте дом как «ретрит» или временную базу, не запускайте долгие проекты из него.</p>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Как число адреса влияет на деньги и сон</h2>
              <p className="text-muted-foreground mb-4">
                Нумерологически дом «говорит» с вами через ритм. Если вибрация совпадает с вашим личным числом судьбы — энергия усиливается. Если конфликтует — создаются утечки.
              </p>
              <Card className="p-6 mb-4 bg-primary/5 border-primary/30">
                <p className="font-semibold mb-2">Пример:</p>
                <p className="text-muted-foreground mb-2">У человека с числом судьбы 3 квартира 4 → конфликт: порядок подавляет креатив.</p>
                <p><strong>Решение:</strong> разрешить творческий хаос хотя бы в одной зоне — рабочем столе или балконе.</p>
              </Card>

              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-3">Риски:</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>«Металлические» дома (4, 8) могут усиливать контроль и тревогу.</li>
                  <li>«Водные» (2, 7) тянут в эмоции и лень.</li>
                  <li>«Огненные» (1, 5) провоцируют переутомление.</li>
                </ul>
              </div>

              <div className="p-4 bg-accent/10 rounded-lg">
                <p className="font-semibold mb-2">Как обойти:</p>
                <p className="text-muted-foreground">
                  Балансируйте интерьер — противоположная стихия в цвете, ткани, освещении помогает сгладить перекос.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Миникейсы</h2>
              <div className="space-y-4">
                <Card className="p-6 border-primary/20">
                  <p className="text-muted-foreground">
                    <strong>Кейс 1.</strong> Женщина, живущая в доме № 11 (1 + 1 = 2), постоянно ощущала упадок сил. После того как она добавила в спальню ярко-красные акценты и начала спать на востоке, вернулись энергия и интерес к делам.
                  </p>
                </Card>
                <Card className="p-6 border-primary/20">
                  <p className="text-muted-foreground">
                    <strong>Кейс 2.</strong> Семья с квартирой № 44 (4 + 4 = 8) постоянно спорила из-за денег. После раздельных рабочих зон и ежедневного порядка финансы стабилизировались — энергия 8 требует контроля.
                  </p>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Выводы</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Число дома показывает общий эмоциональный и финансовый фон жилья.</li>
                <li>• Его легко посчитать: просто сведите номер к одной цифре.</li>
                <li>• Негативные вибрации можно нейтрализовать цветом, символами и порядком.</li>
                <li>• Дом усиливает то, что вы в нём создаёте: 1 — новое, 6 — семью, 8 — деньги.</li>
                <li>• Совпадение с вашим числом судьбы даёт мощный резонанс — но и риск перегрузки.</li>
                <li>• Если чувствуете сопротивление дома — ищите не «проклятие адреса», а способ сбалансировать энергию.</li>
              </ul>
            </section>

            {/* CTA Section */}
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 text-center">
              <h3 className="text-2xl font-bold mb-4">Получите 3 моментальных отчёта бесплатно</h3>
              <p className="text-muted-foreground mb-6">Начните с готовых результатов за пару минут</p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
                <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                  Получить 5 отчётов
                </a>
              </Button>
            </Card>

            {/* FAQ Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6">FAQ</h2>
              <div className="space-y-4">
                <Card className="p-6 border-primary/20">
                  <h3 className="font-semibold mb-2">Как рассчитать число квартиры, если в номере есть буква?</h3>
                  <p className="text-muted-foreground">
                    Присвойте букве значение по алфавиту (А = 1, Б = 2 и т.д.) и сложите с цифрами номера, пока не получите одно число.
                  </p>
                </Card>
                <Card className="p-6 border-primary/20">
                  <h3 className="font-semibold mb-2">Что важнее — число дома или квартиры?</h3>
                  <p className="text-muted-foreground">
                    Если вы живёте в многоквартирном доме, ведущую вибрацию создаёт квартира. Дом задаёт общий фон, квартира — личный уровень энергии.
                  </p>
                </Card>
                <Card className="p-6 border-primary/20">
                  <h3 className="font-semibold mb-2">Можно ли изменить вибрацию адреса без переезда?</h3>
                  <p className="text-muted-foreground">
                    Да. Корректируйте через интерьер, цвета, символы, музыку, а также — внутренние намерения жильцов.
                  </p>
                </Card>
                <Card className="p-6 border-primary/20">
                  <h3 className="font-semibold mb-2">Что делать, если число дома конфликтует с моим личным числом судьбы?</h3>
                  <p className="text-muted-foreground">
                    Добавьте противоположную стихию в декор: для «жёстких» домов — мягкие ткани, для «водных» — яркие огненные детали.
                  </p>
                </Card>
                <Card className="p-6 border-primary/20">
                  <h3 className="font-semibold mb-2">Почему в доме с «плохим» числом всё же бывает удача?</h3>
                  <p className="text-muted-foreground">
                    Потому что энергия не абсолютна. Если жильцы осознанно поддерживают гармонию и порядок, они «перепрошивают» вибрацию под себя.
                  </p>
                </Card>
              </div>
            </section>
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

export default ChisloDoma;