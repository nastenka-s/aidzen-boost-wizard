import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
// Используем ваш оригинальный импорт, предполагая, что этот компонент теперь содержит правильный SVG
import { MatrixVisualization } from "@/components/MatrixVisualization";
import logo from "@/assets/logo.png";

// ====================================================================
// 1. КОНСТАНТЫ АРКАНОВ И БАЗОВАЯ ФУНКЦИЯ РЕДУКЦИИ
// ====================================================================

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
  if (n === 0) return 22; // Считаем 0 как 22
  while (n > 22) {
    n = String(n)
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
    if (n > 22) n = n % 22 === 0 ? 22 : n % 22;
  }
  return n;
};

// ====================================================================
// 2. ИНТЕРФЕЙСЫ И ПОЛНАЯ ФУНКЦИЯ РАСЧЕТА МАТРИЦЫ (С ИСПРАВЛЕННЫМ РАСЧЕТОМ wheel_spokes)
// ====================================================================

interface ArcanaPoint {
  num: number;
  name: string;
}

interface MatrixResult {
  L: ArcanaPoint;
  T: ArcanaPoint;
  R: ArcanaPoint;
  B: ArcanaPoint;
  C: ArcanaPoint;
  N: ArcanaPoint;
  E: ArcanaPoint;
  S: ArcanaPoint;
  W: ArcanaPoint;
  P1: ArcanaPoint;
  P2: ArcanaPoint;
  P3: ArcanaPoint;
  lovePoint: ArcanaPoint;
  moneyPoint: ArcanaPoint;
  wheel_spokes: Record<string, ArcanaPoint>;
  [key: string]: any;
}

const calculateFullMatrix = (date: Date): MatrixResult => {
  const r = calculateArcana;
  // Хелпер, который сразу возвращает объект {num: X, name: Y}
  const innerArcana = (a: number, b: number): ArcanaPoint => {
    const num = r(a + b);
    return { num, name: ARCANA_NAMES[num] };
  };

  // 1. Главные углы (L, T, R, B)
  const L = r(date.getDate());
  const T = r(date.getMonth() + 1);
  const yearSum = date
    .getFullYear()
    .toString()
    .split("")
    .map(Number)
    .reduce((a, b) => a + b, 0);
  const R = r(yearSum);
  const B = r(L + T + R);

  // 2. Центр и Диагонали (C, N, E, S, W)
  const C = r(L + T + R + B);
  const N = r(L + T); // TL (Top-Left)
  const E = r(T + R); // TR (Top-Right)
  const S = r(R + B); // BR (Bottom-Right)
  const W = r(B + L); // BL (Bottom-Left)

  // 3. Предназначения (P1, P2, P3)
  const P1 = r(N + S);
  const P2 = r(E + W);
  const P3 = r(P1 + P2);

  // 4. Точки входа
  const lovePoint = innerArcana(L, E.num); // L + E
  const moneyPoint = innerArcana(R, W.num); // R + W

  // 5. Расчет 16 внутренних/средних точек (wheel_spokes)
  const wheel_spokes = {
    // Внутренний круг (R_INNER): Угол + Центр (L_C, T_C, R_C, B_C)
    L_inner: innerArcana(L, C),
    T_inner: innerArcana(T, C),
    R_inner: innerArcana(R, C),
    B_inner: innerArcana(B, C),

    // Внутренний квадрат (N_C, E_C, S_C, W_C)
    N_inner: innerArcana(N, C),
    E_inner: innerArcana(E, C),
    S_inner: innerArcana(S, C),
    W_inner: innerArcana(W, C),

    // Средний круг (R_MIDDLE): Угол + Внутренний (L_M, T_M, R_M, B_M)
    L_middle: innerArcana(L, innerArcana(L, C).num),
    T_middle: innerArcana(T, innerArcana(T, C).num),
    R_middle: innerArcana(R, innerArcana(R, C).num),
    B_middle: innerArcana(B, innerArcana(B, C).num),

    // Средний квадрат (Диагональный Угол + Внутренний)
    N_middle: innerArcana(N, innerArcana(N, C).num),
    E_middle: innerArcana(E, innerArcana(E, C).num),
    S_middle: innerArcana(S, innerArcana(S, C).num),
    W_middle: innerArcana(W, innerArcana(W, C).num),
  };

  // Собираем главный объект матрицы
  return {
    L: { num: L, name: ARCANA_NAMES[L] },
    T: { num: T, name: ARCANA_NAMES[T] },
    R: { num: R, name: ARCANA_NAMES[R] },
    B: { num: B, name: ARCANA_NAMES[B] },
    C: { num: C, name: ARCANA_NAMES[C] },
    N: { num: N, name: ARCANA_NAMES[N] },
    E: { num: E, name: ARCANA_NAMES[E] },
    S: { num: S, name: ARCANA_NAMES[S] },
    W: { num: W, name: ARCANA_NAMES[W] },
    P1: { num: P1, name: ARCANA_NAMES[P1] },
    P2: { num: P2, name: ARCANA_NAMES[P2] },
    P3: { num: P3, name: ARCANA_NAMES[P3] },
    lovePoint: lovePoint,
    moneyPoint: moneyPoint,
    wheel_spokes: wheel_spokes, // <--- ЭТОТ БЛОК ТЕПЕРЬ ПОЛНЫЙ И ПЕРЕДАЕТСЯ
  };
};

// ====================================================================
// 3. ОСНОВНОЙ КОМПОНЕНТ MatrixSudby
// ====================================================================

const MatrixSudby = () => {
  const [birthDate, setBirthDate] = useState<string>("");
  const [matrix, setMatrix] = useState<MatrixResult | null>(null);

  const handleCalculate = () => {
    try {
      if (!birthDate) return;
      const date = new Date(birthDate);
      if (isNaN(date.getTime())) throw new Error("Некорректная дата");

      // Используем новую, полную функцию расчета
      const result = calculateFullMatrix(date);
      setMatrix(result);
    } catch (error) {
      console.error("Ошибка расчета:", error);
      setMatrix(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <Helmet>
        <title>Матрица Судьбы: Расчет и Анализ</title>
      </Helmet>
      <div className="container mx-auto py-8">
        {/* Блок ввода даты */}
        <div className="max-w-md mx-auto mb-8">
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-4">Рассчитать Матрицу Судьбы</h2>
          <div className="flex flex-col gap-4">
            <Label htmlFor="birthDate" className="text-lg text-purple-200">
              Дата рождения
            </Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="bg-[#2b134b] border-purple-600/50 text-white"
            />
            <Button
              onClick={handleCalculate}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-bold"
            >
              <Sparkles className="w-4 h-4 mr-2" /> Рассчитать
            </Button>
          </div>
        </div>

        {/* Блок результатов */}
        {matrix && (
          <>
            <Card className="bg-gradient-to-br from-[#2b134b] to-[#1d0e2c] border-purple-800/50 shadow-2xl shadow-purple-900/50">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* БЛОК ВИЗУАЛИЗАЦИИ КОЛЕСА (ВОССТАНОВЛЕННЫЙ ВЫЗОВ КОМПОНЕНТА) */}
                  <div className="flex-shrink-0 mx-auto">
                    {/* Передаем полный объект 'matrix', включая wheel_spokes */}
                    <MatrixVisualization matrix={matrix} arcanaNames={ARCANA_NAMES} />
                  </div>

                  <div className="flex-grow">
                    {/* КАРТОЧКА С BL (ВОССТАНОВЛЕНА И ИСПРАВЛЕНА НА НОВУЮ СТРУКТУРУ) */}
                    {/* Я предполагаю, что BL - это W (Bottom-Left) */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-red-800/40 p-4 rounded-lg border border-red-500/30">
                        <div className="text-sm text-red-200 mb-1">Аркан W (BL)</div>
                        {/* Теперь BL берется из W.num, а не из matrix.BL, которого не было */}
                        <div className="text-2xl font-bold text-white">{matrix.W.num}</div>
                        <div className="text-xs text-red-300">{matrix.W.name}</div>
                      </div>
                    </div>

                    {/* Ключевые точки (ВОССТАНОВЛЕНЫ И ИСПРАВЛЕНЫ НА НОВУЮ СТРУКТУРУ) */}
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-purple-300">Ключевые точки</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-pink-800/40 p-4 rounded-lg border border-pink-500/30">
                          <div className="text-sm text-pink-200 mb-1">❤ Точка любви (L+E)</div>
                          {/* Теперь lovePoint - это объект */}
                          <div className="text-2xl font-bold text-white">{matrix.lovePoint.num}</div>
                          <div className="text-xs text-pink-300">{matrix.lovePoint.name}</div>
                        </div>
                        <div className="bg-green-800/40 p-4 rounded-lg border border-green-500/30">
                          <div className="text-sm text-green-200 mb-1">💰 Точка денег (R+W)</div>
                          {/* Теперь moneyPoint - это объект */}
                          <div className="text-2xl font-bold text-white">{matrix.moneyPoint.num}</div>
                          <div className="text-xs text-green-300">{matrix.moneyPoint.name}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default MatrixSudby;
