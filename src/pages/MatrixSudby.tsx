import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { MatrixVisualization } from "@/components/MatrixVisualization";
import logo from "@/assets/logo.png";

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
      { angle: 180, outer: Day, middle: earth_middle_left, inner: earth_inner_left, label: "0" },
      { angle: 225, outer: TL, middle: rod_middle_TL, inner: rod_inner_TL, label: "10" },
      { angle: 270, outer: Month, middle: sky_middle_top, inner: sky_inner_top, label: "20" },
      { angle: 315, outer: TR, middle: rod_middle_TR, inner: rod_inner_TR, label: "30" },
      { angle: 0, outer: Year, middle: moneyEntrance, inner: earth_inner_right, label: "40" },
      { angle: 45, outer: BR, middle: rod_middle_BR, inner: rod_inner_BR, label: "50" },
      { angle: 90, outer: Bottom, middle: relEntrance, inner: sky_inner_bottom, label: "60" },
      { angle: 135, outer: BL, middle: rod_middle_BL, inner: rod_inner_BL, label: "70" },
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
        <title>Матрица Судьбы - Расчет онлайн бесплатно | НейроДзен</title>
        <meta name="description" content="Рассчитайте свою Матрицу Судьбы онлайн бесплатно." />
      </Helmet>

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="НейроДзен" className="w-10 h-10" />
            <span className="text-lg font-semibold tracking-tight">НЕЙРОДЗЕН</span>
          </Link>
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-8">
              <div className="text-center space-y-4 mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Матрица Судьбы</h1>
                <p className="text-xl text-purple-200">Откройте секреты вашей судьбы</p>
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Что такое Матрица Судьбы?
                </h3>
                <p className="text-gray-200">
                  Матрица Судьбы — это система самопознания, основанная на дате рождения. Она раскрывает ваши таланты,
                  предназначение и жизненные циклы.
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
                  <h2 className="text-3xl font-bold mb-6 text-center text-white">Ваша Матрица</h2>
                  <MatrixVisualization matrix={matrix} />
                </CardContent>
              </Card>

              {/* Расшифровка */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6 text-white">Расшифровка матрицы</h2>

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
    </>
  );
}
