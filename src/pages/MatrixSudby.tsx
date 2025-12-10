import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sparkles, Calculator, BookOpen, Heart, Coins, Star, Users, Calendar, ArrowRight, HelpCircle } from "lucide-react";
import { MatrixVisualization } from "@/components/MatrixVisualization";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const ARCANA_NAMES: Record<number, string> = {
  1: "Маг",
  2: "Верховная Жрица",
  3: "Императрица",
  4: "Император",
  5: "Иерофант",
  6: "Влюблённые",
  7: "Колесница",
  8: "Сила",
  9: "Отшельник",
  10: "Колесо Фортуны",
  11: "Справедливость",
  12: "Повешенный",
  13: "Смерть",
  14: "Умеренность",
  15: "Дьявол",
  16: "Башня",
  17: "Звезда",
  18: "Луна",
  19: "Солнце",
  20: "Суд",
  21: "Мир",
  22: "Шут",
};

const calculateArcana = (num: number): number => {
  let n = Math.abs(parseInt(String(num), 10) || 0);
  if (n === 0) return 22;
  while (n > 22) {
    n = n
      .toString()
      .split("")
      .reduce((sum, d) => sum + (parseInt(d, 10) || 0), 0);
    if (n === 0) n = 22;
  }
  return n;
};

interface MatrixData {
  Day: number;
  Month: number;
  Year: number;
  Bottom: number;
  Center: number;
  TL: number;
  TR: number;
  BR: number;
  BL: number;

  lovePoint: number;
  moneyPoint: number;
  talentPoint: number;

  // Предназначения
  P_ground: number;
  P_sky: number;
  P: number;
  male: number;
  female: number;
  family: number;
  general: number;

  // Кармический хвост
  tailBottom: number;
  tailMiddle: number;
  tailInner: number;

  // Лучи и возрастной круг
  spokes: Array<{
    angle: number;
    outer: number;
    middle: number;
    inner: number;
    label: string;
  }>;
  yearCircle: Array<{ age: number; arcana: number }>;
}

export default function MatrixSudby() {
  const [birthDate, setBirthDate] = useState("");
  const [matrix, setMatrix] = useState<MatrixData | null>(null);

  const handleCalculate = () => {
    if (!birthDate) return;
    const [year, month, day] = birthDate.split("-").map(Number);
    if (!day || !month || !year) return;

    // === 1. ЛИЧНЫЙ КВАДРАТ (Диагональный ромб) ===
    const Day = calculateArcana(day); // ЛЕВО
    const Month = calculateArcana(month); // ВЕРХ

    const yearDigitsSum = String(year)
      .split("")
      .reduce((acc, val) => acc + Number(val), 0);
    const Year = calculateArcana(yearDigitsSum); // ПРАВО

    const Bottom = calculateArcana(Day + Month + Year); // НИЗ
    const Center = calculateArcana(Day + Month + Year + Bottom); // ЦЕНТР

    // === 2. РОДОВОЙ КВАДРАТ (Прямой квадрат) ===
    const TL = calculateArcana(Day + Month); // Верх-Лево (Духовное Отца)
    const TR = calculateArcana(Month + Year); // Верх-Право (Духовное Матери)
    const BR = calculateArcana(Year + Bottom); // Низ-Право (Материальное Матери)
    const BL = calculateArcana(Bottom + Day); // Низ-Лево (Материальное Отца)

    // === 3. ВНУТРЕННИЕ ТОЧКИ НА ОСЯХ (Spokes) ===
    // Линия Земли (Горизонталь)
    const earth_inner_left = calculateArcana(Center + Day);
    const earth_middle_left = calculateArcana(Day + earth_inner_left);

    const earth_inner_right = calculateArcana(Center + Year);
    const earth_middle_right = calculateArcana(Year + earth_inner_right); // Вход в деньги

    // Линия Неба (Вертикаль)
    const sky_inner_top = calculateArcana(Center + Month);
    const sky_middle_top = calculateArcana(Month + sky_inner_top);

    const sky_inner_bottom = calculateArcana(Center + Bottom); // Точка кармического хвоста
    const sky_middle_bottom = calculateArcana(Bottom + sky_inner_bottom); // Вход в отношения

    // Родовые линии (Диагонали)
    const rod_inner_TL = calculateArcana(TL + Center);
    const rod_middle_TL = calculateArcana(TL + rod_inner_TL);

    const rod_inner_TR = calculateArcana(TR + Center);
    const rod_middle_TR = calculateArcana(TR + rod_inner_TR);

    const rod_inner_BR = calculateArcana(BR + Center);
    const rod_middle_BR = calculateArcana(BR + rod_inner_BR);

    const rod_inner_BL = calculateArcana(BL + Center);
    const rod_middle_BL = calculateArcana(BL + rod_inner_BL);

    // === 4. ДЕНЬГИ И ОТНОШЕНИЯ ===
    const relEntrance = sky_middle_bottom; // вход в отношения
    const moneyEntrance = earth_middle_right; // вход в деньги

    const lovePoint = calculateArcana(relEntrance + sky_inner_bottom);
    const moneyPoint = calculateArcana(moneyEntrance + earth_inner_right);

    // === 5. ПРЕДНАЗНАЧЕНИЯ (как в MatrixOfDestinyWheel) ===
    const SkyDestiny = calculateArcana(Month + Bottom); // Небо (Верх + Низ)
    const EarthDestiny = calculateArcana(Day + Year); // Земля (Лево + Право)
    const PersonalDestiny = calculateArcana(SkyDestiny + EarthDestiny); // 1-е предназначение

    const MaleRod = calculateArcana(TL + BR); // Диагональ Отца
    const FemaleRod = calculateArcana(TR + BL); // Диагональ Матери
    const SocialDestiny = calculateArcana(MaleRod + FemaleRod); // 2-е предназначение (Социум/Род)

    const GeneralDestiny = calculateArcana(PersonalDestiny + SocialDestiny); // 3-е предназначение (Духовное)

    // === 6. ЛУЧИ "ПАУТИНЫ" ===
    const spokesData = [
      // 0 лет — внутренний квадрат = earth_inner_left
      { angle: 180, outer: Day, middle: earth_inner_left, inner: earth_middle_left, label: "0" },

      // 10 лет — внутренний квадрат = rod_inner_TL
      { angle: 225, outer: TL, middle: rod_inner_TL, inner: rod_middle_TL, label: "10" },

      // 20 лет — внутренний квадрат = sky_inner_top
      { angle: 270, outer: Month, middle: sky_inner_top, inner: sky_middle_top, label: "20" },

      // 30 лет — внутренний квадрат = rod_inner_TR
      { angle: 315, outer: TR, middle: rod_inner_TR, inner: rod_middle_TR, label: "30" },

      // 40 лет — внутренний квадрат = earth_inner_right
      { angle: 0, outer: Year, middle: earth_inner_right, inner: moneyEntrance, label: "40" },

      // 50 лет — внутренний квадрат = rod_inner_BR
      { angle: 45, outer: BR, middle: rod_inner_BR, inner: rod_middle_BR, label: "50" },

      // 60 лет — внутренний квадрат = sky_inner_bottom
      { angle: 90, outer: Bottom, middle: sky_inner_bottom, inner: relEntrance, label: "60" },

      // 70 лет — внутренний квадрат = rod_inner_BL
      { angle: 135, outer: BL, middle: rod_inner_BL, inner: rod_middle_BL, label: "70" },
    ];

    // === 7. КРУГ ВОЗРАСТОВ (как в колесе) ===
    const yearCircle = spokesData.map((s, i) => ({
      age: i * 10,
      arcana: s.outer,
    }));

    console.log("=== РАСЧЕТЫ МАТРИЦЫ ===");
    console.log("Day:", Day, "Month:", Month, "Year:", Year, "Bottom:", Bottom, "Center:", Center);
    console.log("earth_inner_right:", earth_inner_right, "earth_middle_right:", earth_middle_right);
    console.log("sky_inner_bottom:", sky_inner_bottom, "sky_middle_bottom:", sky_middle_bottom);
    console.log("Spokes для angle 0 (40 лет):", spokesData[4]);
    console.log("Spokes для angle 90 (60 лет):", spokesData[6]);

    setMatrix({
      Day,
      Month,
      Year,
      Bottom,
      Center,
      TL,
      TR,
      BR,
      BL,
      lovePoint,
      moneyPoint,
      talentPoint: Month,
      P_ground: EarthDestiny,
      P_sky: SkyDestiny,
      P: PersonalDestiny,
      male: MaleRod,
      female: FemaleRod,
      family: SocialDestiny,
      general: GeneralDestiny,
      tailBottom: Bottom,
      tailMiddle: relEntrance,
      tailInner: sky_inner_bottom,
      spokes: spokesData,
      yearCircle,
    });
  };

  return (
    <>
      <Helmet>
        <title>Матрица Судьбы онлайн бесплатно — рассчитать по дате рождения с расшифровкой | Нейродзен</title>
        <meta name="description" content="Рассчитайте Матрицу Судьбы онлайн бесплатно по дате рождения. Расшифровка 22 арканов: точка любви, денег, предназначение, родовые программы. Калькулятор с мгновенным результатом." />
        <meta name="keywords" content="матрица судьбы, матрица судьбы рассчитать, матрица судьбы онлайн бесплатно, матрица судьбы по дате рождения, матрица судьбы расшифровка, 22 аркана, точка любви, точка денег, предназначение по матрице судьбы, родовые программы, кармический хвост" />
        <link rel="canonical" href="https://aidzen.ru/matrica-sudby-rasschitat" />
        
        <meta property="og:title" content="Матрица Судьбы — бесплатный расчёт онлайн" />
        <meta property="og:description" content="Рассчитайте свою Матрицу Судьбы по дате рождения. Узнайте своё предназначение, точку любви, денег и родовые программы." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aidzen.ru/matrica-sudby-rasschitat" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Калькулятор Матрицы Судьбы",
            "description": "Бесплатный онлайн калькулятор Матрицы Судьбы по дате рождения с расшифровкой 22 арканов",
            "url": "https://aidzen.ru/matrica-sudby-rasschitat",
            "applicationCategory": "LifestyleApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "RUB"
            }
          })}
        </script>
      </Helmet>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-8">
              <div className="text-center space-y-4 mb-6">
                <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">МАТРИЦА СУДЬБЫ - БЕСПЛАТНЫй РАСЧЕТ</h1>
                <p className="text-xl text-purple-200">Откройте секреты вашей судьбы</p>
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  Что такое Матрица Судьбы?
                </h3>
                <p className="text-gray-200">
                  Матрица Судьбы — это система самопознания и прогнозирования, основанная на дате рождения и 22х
                  арканах. Она раскрывает ваши таланты, предназначение и жизненные циклы.
                </p>
                <p className="text-gray-200">
                  {" "}
                  Вы можете рассчитать свои матрицу судьбы ниже и зарегистрироваться, что бы запустить нейроанализ.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="birthDate" className="text-white text-lg mb-2 block">
                    Дата рождения
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="bg-white/20 border-white/30 text-white text-lg"
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <Button
                  onClick={handleCalculate}
                  disabled={!birthDate}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg py-6"
                >
                  Рассчитать Матрицу
                </Button>

                {matrix && (
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-semibold text-lg py-6"
                      asChild
                    >
                      <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Получить полный анализ
                      </a>
                    </Button>
                    <p className="text-sm text-gray-400 text-center">Требуется регистрация</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {matrix && (
            <>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6 text-center text-white">Ваша Матрица Судьбы</h2>
                  <MatrixVisualization matrix={matrix} />
                </CardContent>
              </Card>

              {/* Расшифровка */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6 text-white text-center">Расшифровка Матрицы Судьбы</h2>
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-semibold text-lg py-6"
                      asChild
                    >
                      <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Получить полный анализ
                      </a>
                    </Button>
                    <p className="text-sm text-gray-400 text-center">Требуется регистрация</p>
                  </div>
                  {/* Личный квадрат */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-purple-300">Личный квадрат</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-purple-800/40 p-4 rounded-lg border border-purple-500/30">
                        <div className="text-sm text-purple-200 mb-1">День (Духовное)</div>
                        <div className="text-2xl font-bold text-white">{matrix.Day}</div>
                        <div className="text-xs text-purple-300">{ARCANA_NAMES[matrix.Day]}</div>
                      </div>
                      <div className="bg-purple-800/40 p-4 rounded-lg border border-purple-500/30">
                        <div className="text-sm text-purple-200 mb-1">Месяц (Небо)</div>
                        <div className="text-2xl font-bold text-white">{matrix.Month}</div>
                        <div className="text-xs text-purple-300">{ARCANA_NAMES[matrix.Month]}</div>
                      </div>
                      <div className="bg-purple-800/40 p-4 rounded-lg border border-purple-500/30">
                        <div className="text-sm text-purple-200 mb-1">Год (Материальное)</div>
                        <div className="text-2xl font-bold text-white">{matrix.Year}</div>
                        <div className="text-xs text-purple-300">{ARCANA_NAMES[matrix.Year]}</div>
                      </div>
                      <div className="bg-purple-800/40 p-4 rounded-lg border border-purple-500/30">
                        <div className="text-sm text-purple-200 mb-1">Низ (Земля)</div>
                        <div className="text-2xl font-bold text-white">{matrix.Bottom}</div>
                        <div className="text-xs text-purple-300">{ARCANA_NAMES[matrix.Bottom]}</div>
                      </div>
                    </div>
                    <div className="mt-4 bg-yellow-500/20 p-6 rounded-lg text-center border border-yellow-500/30">
                      <div className="text-sm text-yellow-200 mb-1">Центр (Комфорт)</div>
                      <div className="text-3xl font-bold text-white">{matrix.Center}</div>
                      <div className="text-sm text-yellow-300">{ARCANA_NAMES[matrix.Center]}</div>
                    </div>
                  </div>

                  {/* Родовой квадрат */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-purple-300">Родовой квадрат</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-purple-800/40 p-4 rounded-lg border border-purple-500/30">
                        <div className="text-sm text-purple-200 mb-1">Верх-Лево</div>
                        <div className="text-2xl font-bold text-white">{matrix.TL}</div>
                        <div className="text-xs text-purple-300">{ARCANA_NAMES[matrix.TL]}</div>
                      </div>
                      <div className="bg-purple-800/40 p-4 rounded-lg border border-purple-500/30">
                        <div className="text-sm text-purple-200 mb-1">Верх-Право</div>
                        <div className="text-2xl font-bold text-white">{matrix.TR}</div>
                        <div className="text-xs text-purple-300">{ARCANA_NAMES[matrix.TR]}</div>
                      </div>
                      <div className="bg-red-800/40 p-4 rounded-lg border border-red-500/30">
                        <div className="text-sm text-red-200 mb-1">Низ-Право</div>
                        <div className="text-2xl font-bold text-white">{matrix.BR}</div>
                        <div className="text-xs text-red-300">{ARCANA_NAMES[matrix.BR]}</div>
                      </div>
                      <div className="bg-red-800/40 p-4 rounded-lg border border-red-500/30">
                        <div className="text-sm text-red-200 mb-1">Низ-Лево</div>
                        <div className="text-2xl font-bold text-white">{matrix.BL}</div>
                        <div className="text-xs text-red-300">{ARCANA_NAMES[matrix.BL]}</div>
                      </div>
                    </div>
                  </div>

                  {/* Ключевые точки */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-purple-300">Ключевые точки</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-pink-800/40 p-4 rounded-lg border border-pink-500/30">
                        <div className="text-sm text-pink-200 mb-1">❤ Точка любви</div>
                        <div className="text-2xl font-bold text-white">{matrix.lovePoint}</div>
                        <div className="text-xs text-pink-300">{ARCANA_NAMES[matrix.lovePoint]}</div>
                      </div>
                      <div className="bg-green-800/40 p-4 rounded-lg border border-green-500/30">
                        <div className="text-sm text-green-200 mb-1">💰 Точка денег</div>
                        <div className="text-2xl font-bold text-white">{matrix.moneyPoint}</div>
                        <div className="text-xs text-green-300">{ARCANA_NAMES[matrix.moneyPoint]}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <section className="py-16 bg-gradient-to-b from-purple-900/50 to-background">
        <div className="container mx-auto px-4 lg:px-8 space-y-16">
          
          {/* Что такое Матрица Судьбы */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/80 backdrop-blur-sm border-primary/30 shadow-xl">
              <CardContent className="p-6 md:p-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
                  <BookOpen className="inline-block w-8 h-8 mr-3 mb-1" />
                  Что такое Матрица Судьбы?
                </h2>
                <div className="prose prose-lg dark:prose-invert mx-auto text-foreground/90 space-y-4">
                  <p>
                    <strong className="text-primary">Матрица Судьбы</strong> — это уникальная система самопознания, основанная на нумерологии и символике 22 арканов Таро. 
                    Она позволяет раскрыть глубинные аспекты личности, понять своё предназначение, выявить сильные стороны и кармические задачи.
                  </p>
                  <p>
                    В отличие от классической астрологии, <strong className="text-primary">матрица судьбы по дате рождения</strong> использует только числа из вашей даты рождения, 
                    которые преобразуются в энергии арканов. Каждый аркан несёт определённое значение и влияет на различные сферы жизни: 
                    отношения, финансы, здоровье, самореализацию.
                  </p>
                  <p>
                    Метод позволяет увидеть не только текущие возможности, но и проследить жизненные циклы по годам, 
                    понять, какие периоды благоприятны для тех или иных начинаний.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Как рассчитывается Матрица */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
              <Calculator className="inline-block w-8 h-8 mr-3 mb-1" />
              Как рассчитать Матрицу Судьбы?
            </h2>
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardContent className="p-6 md:p-8 space-y-6">
                <p className="text-muted-foreground">
                  Расчёт Матрицы Судьбы основан на простых арифметических операциях с числами даты рождения. 
                  Все числа сводятся к значениям от 1 до 22 (по количеству старших арканов Таро).
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-primary">Личный квадрат</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">День:</span> 
                        <span>Число дня рождения (сведённое к 1-22)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">Месяц:</span> 
                        <span>Число месяца рождения</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">Год:</span> 
                        <span>Сумма цифр года рождения</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">Низ:</span> 
                        <span>День + Месяц + Год</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">Центр:</span> 
                        <span>День + Месяц + Год + Низ</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-primary">Родовой квадрат</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">Верх-Лево:</span> 
                        <span>День + Месяц (Духовное отца)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">Верх-Право:</span> 
                        <span>Месяц + Год (Духовное матери)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">Низ-Право:</span> 
                        <span>Год + Низ (Материальное матери)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">Низ-Лево:</span> 
                        <span>Низ + День (Материальное отца)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ключевые точки матрицы */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
              <Star className="inline-block w-8 h-8 mr-3 mb-1" />
              Ключевые точки Матрицы Судьбы
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-card/50 backdrop-blur border-pink-500/30 hover:border-pink-500/50 transition-colors">
                <CardContent className="p-6">
                  <Heart className="w-10 h-10 text-pink-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Точка любви</h3>
                  <p className="text-muted-foreground text-sm">
                    Показывает ваш потенциал в отношениях, способ проявления любви и партнёрства. 
                    Указывает на кармические уроки в сфере личных отношений.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur border-green-500/30 hover:border-green-500/50 transition-colors">
                <CardContent className="p-6">
                  <Coins className="w-10 h-10 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Точка денег</h3>
                  <p className="text-muted-foreground text-sm">
                    Раскрывает ваше отношение к материальному миру, способы заработка и финансовые блоки. 
                    Помогает понять путь к изобилию.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur border-yellow-500/30 hover:border-yellow-500/50 transition-colors">
                <CardContent className="p-6">
                  <Sparkles className="w-10 h-10 text-yellow-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Точка таланта</h3>
                  <p className="text-muted-foreground text-sm">
                    Указывает на врождённые способности и дары, которые важно развивать. 
                    Это ключ к самореализации и успеху в профессии.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur border-purple-500/30 hover:border-purple-500/50 transition-colors">
                <CardContent className="p-6">
                  <Users className="w-10 h-10 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Родовые программы</h3>
                  <p className="text-muted-foreground text-sm">
                    Родовой квадрат показывает влияние семьи, унаследованные паттерны и кармические задачи рода, 
                    которые вы пришли проработать.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur border-blue-500/30 hover:border-blue-500/50 transition-colors">
                <CardContent className="p-6">
                  <Star className="w-10 h-10 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Предназначение</h3>
                  <p className="text-muted-foreground text-sm">
                    Три уровня предназначения: личное, социальное и духовное. Раскрывает вашу миссию 
                    и главные задачи в этом воплощении.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur border-orange-500/30 hover:border-orange-500/50 transition-colors">
                <CardContent className="p-6">
                  <Calendar className="w-10 h-10 text-orange-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Возрастные циклы</h3>
                  <p className="text-muted-foreground text-sm">
                    Матрица показывает энергии каждого десятилетия жизни, помогая понять, 
                    какие темы будут актуальны в разные периоды.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Как читать матрицу */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
              Как читать Матрицу Судьбы?
            </h2>
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardContent className="p-6 md:p-8 space-y-6">
                <p className="text-muted-foreground">
                  Каждое число в матрице соответствует одному из 22 арканов Таро. Чтобы понять значение, 
                  нужно изучить символику аркана и его влияние в конкретной позиции:
                </p>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-lg">1. Центр матрицы</h4>
                    <p className="text-muted-foreground text-sm">
                      Точка комфорта и баланса. Показывает состояние, в которое вы стремитесь вернуться. 
                      Это ваша «зона комфорта» и ключ к гармонии.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-lg">2. Личный квадрат</h4>
                    <p className="text-muted-foreground text-sm">
                      Четыре угла показывают основные энергии: духовное, материальное, небесное и земное. 
                      Это фундамент вашей личности.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-lg">3. Родовой квадрат</h4>
                    <p className="text-muted-foreground text-sm">
                      Влияние линий отца и матери, унаследованные программы. Верхние точки — духовное наследие, 
                      нижние — материальное.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-lg">4. Линии предназначения</h4>
                    <p className="text-muted-foreground text-sm">
                      Вертикальная ось (небо-земля) и горизонтальная ось (материальное-духовное) формируют 
                      ваши главные жизненные задачи и предназначение.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
              <HelpCircle className="inline-block w-8 h-8 mr-3 mb-1" />
              Часто задаваемые вопросы
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card/50 backdrop-blur rounded-lg border border-primary/20 px-6">
                <AccordionTrigger className="text-left">Насколько точна Матрица Судьбы?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Матрица Судьбы — это инструмент самопознания, а не предсказания. Она показывает потенциалы и тенденции, 
                  но не определяет вашу жизнь. Точность интерпретации зависит от глубины понимания символики арканов 
                  и умения применять их к конкретной жизненной ситуации.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-card/50 backdrop-blur rounded-lg border border-primary/20 px-6">
                <AccordionTrigger className="text-left">Можно ли изменить свою Матрицу Судьбы?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Матрица показывает исходные данные, с которыми вы пришли в этот мир. Изменить числа нельзя, 
                  но можно научиться работать с энергиями арканов в их высших проявлениях, превращая потенциальные 
                  трудности в возможности для роста.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="bg-card/50 backdrop-blur rounded-lg border border-primary/20 px-6">
                <AccordionTrigger className="text-left">Чем Матрица Судьбы отличается от астрологии?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  В отличие от астрологии, Матрица Судьбы не требует времени и места рождения — только дату. 
                  Она использует систему 22 арканов вместо планет и знаков зодиака, что делает её более простой 
                  для понимания, но не менее глубокой по смыслу.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="bg-card/50 backdrop-blur rounded-lg border border-primary/20 px-6">
                <AccordionTrigger className="text-left">Как часто нужно рассчитывать Матрицу?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Основная матрица рассчитывается один раз и остаётся неизменной на всю жизнь. 
                  Однако можно дополнительно изучать прогностические методы: годовой прогноз (по солнечному возврату), 
                  анализ текущих энергий и совместимость с партнёром.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="bg-card/50 backdrop-blur rounded-lg border border-primary/20 px-6">
                <AccordionTrigger className="text-left">Можно ли рассчитать совместимость по Матрице Судьбы?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, можно построить совместную матрицу для двух людей, чтобы увидеть потенциал отношений, 
                  точки притяжения и возможные конфликты. Это помогает понять кармические задачи пары 
                  и работать над отношениями более осознанно.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Related Links */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
              Полезные материалы
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/matrica-sudby-22-arkana" className="block">
                <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:scale-[1.02]">
                  <CardContent className="p-5 flex items-center gap-4">
                    <BookOpen className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">22 аркана Матрицы Судьбы</h3>
                      <p className="text-sm text-muted-foreground">Подробное описание всех арканов</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto" />
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/natal-chart-calculator" className="block">
                <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:scale-[1.02]">
                  <CardContent className="p-5 flex items-center gap-4">
                    <Star className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Натальная карта онлайн</h3>
                      <p className="text-sm text-muted-foreground">Бесплатный расчёт гороскопа</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto" />
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/chislo-sudby" className="block">
                <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:scale-[1.02]">
                  <CardContent className="p-5 flex items-center gap-4">
                    <Calculator className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Число судьбы</h3>
                      <p className="text-sm text-muted-foreground">Нумерологический расчёт</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto" />
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/formula-dushi" className="block">
                <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:scale-[1.02]">
                  <CardContent className="p-5 flex items-center gap-4">
                    <Sparkles className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Формула души</h3>
                      <p className="text-sm text-muted-foreground">Астрологический метод Астрогора</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto" />
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/synastry" className="block">
                <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:scale-[1.02]">
                  <CardContent className="p-5 flex items-center gap-4">
                    <Heart className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Синастрия</h3>
                      <p className="text-sm text-muted-foreground">Совместимость по гороскопу</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto" />
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/tranzity" className="block">
                <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:scale-[1.02]">
                  <CardContent className="p-5 flex items-center gap-4">
                    <Calendar className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Транзиты планет</h3>
                      <p className="text-sm text-muted-foreground">Прогноз по натальной карте</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-3xl mx-auto text-center">
            <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-primary/30">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Получите полный анализ вашей Матрицы Судьбы</h2>
                <p className="text-muted-foreground mb-6">
                  Наш ИИ-астролог подготовит персональную расшифровку всех аспектов вашей матрицы 
                  с рекомендациями по развитию и гармонизации
                </p>
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" asChild>
                  <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Получить полный анализ
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
