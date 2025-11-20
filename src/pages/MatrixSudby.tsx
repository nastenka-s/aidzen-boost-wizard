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
  1: "Маг", 2: "Верховная Жрица", 3: "Императрица", 4: "Император", 5: "Иерофант",
  6: "Влюблённые", 7: "Колесница", 8: "Сила", 9: "Отшельник", 10: "Колесо Фортуны",
  11: "Справедливость", 12: "Повешенный", 13: "Смерть", 14: "Умеренность", 15: "Дьявол",
  16: "Башня", 17: "Звезда", 18: "Луна", 19: "Солнце", 20: "Суд", 21: "Мир", 22: "Шут",
};

const calculateArcana = (num: number): number => {
  let n = Math.abs(parseInt(String(num), 10) || 0);
  if (n === 0) return 22;
  while (n > 22) {
    n = n.toString().split("").reduce((sum, d) => sum + (parseInt(d, 10) || 0), 0);
    if (n === 0) n = 22;
  }
  return n;
};

interface MatrixData {
  Day: number; Month: number; Year: number; Bottom: number; Center: number;
  TL: number; TR: number; BR: number; BL: number;
  lovePoint: number; moneyPoint: number;
  spokes: Array<{ angle: number; outer: number; middle: number; inner: number; label: string }>;
}

export default function MatrixSudby() {
  const [birthDate, setBirthDate] = useState("");
  const [matrix, setMatrix] = useState<MatrixData | null>(null);

  const handleCalculate = () => {
    if (!birthDate) return;
    const [year, month, day] = birthDate.split("-").map(Number);
    if (!day || !month || !year) return;

    const Day = calculateArcana(day);
    const Month = calculateArcana(month);
    const Year = calculateArcana(String(year).split("").reduce((a, v) => a + Number(v), 0));
    const Bottom = calculateArcana(Day + Month + Year);
    const Center = calculateArcana(Day + Month + Year + Bottom);
    const TL = calculateArcana(Day + Month);
    const TR = calculateArcana(Month + Year);
    const BR = calculateArcana(Year + Bottom);
    const BL = calculateArcana(Bottom + Day);

    const earth_inner_left = calculateArcana(Center + Day);
    const earth_middle_left = calculateArcana(Day + earth_inner_left);
    const earth_inner_right = calculateArcana(Center + Year);
    const earth_middle_right = calculateArcana(Year + earth_inner_right);
    const sky_inner_top = calculateArcana(Center + Month);
    const sky_middle_top = calculateArcana(Month + sky_inner_top);
    const sky_inner_bottom = calculateArcana(Center + Bottom);
    const sky_middle_bottom = calculateArcana(Bottom + sky_inner_bottom);
    const rod_inner_TL = calculateArcana(TL + Center);
    const rod_middle_TL = calculateArcana(TL + rod_inner_TL);
    const rod_inner_TR = calculateArcana(TR + Center);
    const rod_middle_TR = calculateArcana(TR + rod_inner_TR);
    const rod_inner_BR = calculateArcana(BR + Center);
    const rod_middle_BR = calculateArcana(BR + rod_inner_BR);
    const rod_inner_BL = calculateArcana(BL + Center);
    const rod_middle_BL = calculateArcana(BL + rod_inner_BL);

    const lovePoint = calculateArcana(sky_middle_bottom + sky_inner_bottom);
    const moneyPoint = calculateArcana(earth_middle_right + earth_inner_right);

    setMatrix({
      Day, Month, Year, Bottom, Center, TL, TR, BR, BL, lovePoint, moneyPoint,
      spokes: [
        { angle: 90, outer: Month, middle: sky_middle_top, inner: sky_inner_top, label: "0" },
        { angle: 67.5, outer: calculateArcana(Month + TL), middle: rod_middle_TL, inner: rod_inner_TL, label: "5" },
        { angle: 45, outer: TL, middle: rod_middle_TL, inner: rod_inner_TL, label: "10" },
        { angle: 22.5, outer: calculateArcana(TL + Day), middle: earth_middle_left, inner: earth_inner_left, label: "15" },
        { angle: 0, outer: Day, middle: earth_middle_left, inner: earth_inner_left, label: "20" },
        { angle: 337.5, outer: calculateArcana(Day + BL), middle: rod_middle_BL, inner: rod_inner_BL, label: "25" },
        { angle: 315, outer: BL, middle: rod_middle_BL, inner: rod_inner_BL, label: "30" },
        { angle: 292.5, outer: calculateArcana(BL + Bottom), middle: sky_middle_bottom, inner: sky_inner_bottom, label: "35" },
        { angle: 270, outer: Bottom, middle: sky_middle_bottom, inner: sky_inner_bottom, label: "40" },
        { angle: 247.5, outer: calculateArcana(Bottom + BR), middle: rod_middle_BR, inner: rod_inner_BR, label: "45" },
        { angle: 225, outer: BR, middle: rod_middle_BR, inner: rod_inner_BR, label: "50" },
        { angle: 202.5, outer: calculateArcana(BR + Year), middle: earth_middle_right, inner: earth_inner_right, label: "55" },
        { angle: 180, outer: Year, middle: earth_middle_right, inner: earth_inner_right, label: "60" },
        { angle: 157.5, outer: calculateArcana(Year + TR), middle: rod_middle_TR, inner: rod_inner_TR, label: "65" },
        { angle: 135, outer: TR, middle: rod_middle_TR, inner: rod_inner_TR, label: "70" },
        { angle: 112.5, outer: calculateArcana(TR + Month), middle: sky_middle_top, inner: sky_inner_top, label: "75" },
      ],
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
                  Матрица Судьбы — это система самопознания, основанная на дате рождения. 
                  Она раскрывает ваши таланты, предназначение и жизненные циклы.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="birthDate" className="text-white text-lg mb-2 block">Дата рождения</Label>
                  <Input
                    id="birthDate" type="date" value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="bg-white/20 border-white/30 text-white text-lg"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <Button onClick={handleCalculate} disabled={!birthDate}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg py-6">
                  Рассчитать Матрицу
                </Button>

                {matrix && (
                  <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-semibold text-lg py-6" asChild>
                    <a href="https://chat.aidzen.ru/login" target="_blank" rel="noopener noreferrer">
                      <Sparkles className="w-5 h-5 mr-2" />Получить полный анализ
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {matrix && (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Ваша Матрица</h2>
                <MatrixVisualization matrix={matrix} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
