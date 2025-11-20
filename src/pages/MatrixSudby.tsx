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

    // Расчет как в оригинале: L, T, R, B, C
    const L = calculateArcana(day);        // Left/День
    const T = calculateArcana(month);      // Top/Месяц
    const yearSum = String(year).split("").reduce((acc, d) => acc + Number(d), 0);
    const R = calculateArcana(yearSum);    // Right/Год
    const B = calculateArcana(L + T + R);  // Bottom/Низ
    const C = calculateArcana(L + T + R + B); // Center/Центр

    // Стороны квадрата (N, E, S, W)
    const N = calculateArcana(L + T);      // North
    const E = calculateArcana(T + R);      // East
    const S = calculateArcana(R + B);      // South
    const W = calculateArcana(B + L);      // West

    // Точки любви и денег
    const lovePoint = calculateArcana(B + C);
    const moneyPoint = calculateArcana(R + C);

    setMatrix({
      Day: L, Month: T, Year: R, Bottom: B, Center: C,
      TL: N, TR: E, BR: S, BL: W,
      lovePoint, moneyPoint,
      spokes: [
        { angle: 180, outer: L, middle: calculateArcana(L + C), inner: 0, label: "0" },     // 0 лет - слева
        { angle: 225, outer: W, middle: calculateArcana(W + C), inner: 0, label: "10" },    // 10 лет
        { angle: 270, outer: B, middle: calculateArcana(B + C), inner: 0, label: "20" },    // 20 лет - внизу
        { angle: 315, outer: S, middle: calculateArcana(S + C), inner: 0, label: "30" },    // 30 лет
        { angle: 0, outer: R, middle: calculateArcana(R + C), inner: 0, label: "40" },      // 40 лет - справа
        { angle: 45, outer: E, middle: calculateArcana(E + C), inner: 0, label: "50" },     // 50 лет
        { angle: 90, outer: T, middle: calculateArcana(T + C), inner: 0, label: "60" },     // 60 лет - вверху (C в оригинале)
        { angle: 135, outer: N, middle: calculateArcana(N + C), inner: 0, label: "70" },    // 70 лет
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
