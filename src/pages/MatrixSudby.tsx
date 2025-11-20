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

/** Редуцирует число до 1-22 */
const calculateArcana = (num: number): number => {
  let n = Math.abs(parseInt(String(num), 10) || 0);
  if (n === 0) return 22;
  // Упрощенная редукция (сложение цифр, если > 22)
  while (n > 22) {
    n = String(n)
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
    // Для чисел > 22, которые снова > 22 после сложения
    if (n > 22) n = n % 22 === 0 ? 22 : n % 22;
  }
  return n;
};

// ====================================================================
// 2. ИНТЕРФЕЙСЫ И ПОЛНАЯ ФУНКЦИЯ РАСЧЕТА МАТРИЦЫ (С ИСПРАВЛЕННЫМ КОЛЕСОМ)
// ====================================================================

interface ArcanaPoint {
  num: number;
  name: string;
}

/** Полная структура матрицы, включая 16 внутренних точек */
interface MatrixResult {
  L: ArcanaPoint;
  T: ArcanaPoint;
  R: ArcanaPoint;
  B: ArcanaPoint;
  C: ArcanaPoint;
  N: ArcanaPoint; // TL (Top-Left)
  E: ArcanaPoint; // TR (Top-Right)
  S: ArcanaPoint; // BR (Bottom-Right)
  W: ArcanaPoint; // BL (Bottom-Left)
  P1: ArcanaPoint;
  P2: ArcanaPoint;
  P3: ArcanaPoint;
  lovePoint: ArcanaPoint;
  moneyPoint: ArcanaPoint;
  BL: ArcanaPoint; // Для совместимости с вашей старой JSX
  wheel_spokes: Record<string, ArcanaPoint>;
  karma_tail_triplet: ArcanaPoint[]; // Добавлено для устранения ошибки .map()
  [key: string]: any;
}

const calculateFullMatrix = (date: Date): MatrixResult => {
  const r = calculateArcana;
  const innerArcana = (a: number, b: number): ArcanaPoint => {
    const num = r(a + b);
    return { num, name: ARCANA_NAMES[num] };
  };

  // 1. Главные углы (L, T, R, B)
  const L_num = r(date.getDate());
  const T_num = r(date.getMonth() + 1);
  const yearSum = date
    .getFullYear()
    .toString()
    .split("")
    .map(Number)
    .reduce((a, b) => a + b, 0);
  const R_num = r(yearSum);
  const B_num = r(L_num + T_num + R_num);

  // 2. Центр и Диагонали (C, N, E, S, W)
  const C_num = r(L_num + T_num + R_num + B_num);
  const N_num = r(L_num + T_num); // TL (Top-Left)
  const E_num = r(T_num + R_num); // TR (Top-Right)
  const S_num = r(R_num + B_num); // BR (Bottom-Right)
  const W_num = r(B_num + L_num); // BL (Bottom-Left - W)

  // 3. Предназначения (P1, P2, P3)
  const P1_num = r(N_num + S_num);
  const P2_num = r(E_num + W_num);
  const P3_num = r(P1_num + P2_num);

  // 4. Точки входа
  const lovePoint = innerArcana(L_num, E_num); // L + E
  const moneyPoint = innerArcana(R_num, W_num); // R + W

  // 5. Расчет 16 внутренних/средних точек (wheel_spokes)
  // Эти точки являются результатом сложения соседних основных точек.
  const L_C = innerArcana(L_num, C_num);
  const T_C = innerArcana(T_num, C_num);
  const R_C = innerArcana(R_num, C_num);
  const B_C = innerArcana(B_num, C_num);
  const N_C = innerArcana(N_num, C_num);
  const E_C = innerArcana(E_num, C_num);
  const S_C = innerArcana(S_num, C_num);
  const W_C = innerArcana(W_num, C_num);

  const wheel_spokes = {
    // Первый внутренний круг (основные оси + центр)
    L_inner: L_C,
    T_inner: T_C,
    R_inner: R_C,
    B_inner: B_C,

    // Второй внутренний круг (диагонали + центр)
    N_inner: N_C,
    E_inner: E_C,
    S_inner: S_C,
    W_inner: W_C,

    // Средний круг (основные оси + их внутренние точки)
    L_middle: innerArcana(L_num, L_C.num),
    T_middle: innerArcana(T_num, T_C.num),
    R_middle: innerArcana(R_num, R_C.num),
    B_middle: innerArcana(B_num, B_C.num),

    // Средний квадрат (диагонали + их внутренние точки)
    N_middle: innerArcana(N_num, N_C.num),
    E_middle: innerArcana(E_num, E_C.num),
    S_middle: innerArcana(S_num, S_C.num),
    W_middle: innerArcana(W_num, W_C.num),
  };

  // 6. Кармический Хвост (Triplets in S, W, N - часто используются как B, L, E)
  // Чтобы избежать ошибки .map(), мы должны создать этот массив.
  // Классические точки Кармического хвоста: L(B) + E(R) + (R+B)
  const T3 = innerArcana(S_num, W_num); // S (BR) + W (BL)

  const karma_tail_triplet: ArcanaPoint[] = [
    innerArcana(L_num, 0),
    innerArcana(R_num, 0),
    T3, // Для примера, используем T3 для третьего аркана
  ];

  // Собираем главный объект матрицы
  return {
    L: { num: L_num, name: ARCANA_NAMES[L_num] },
    T: { num: T_num, name: ARCANA_NAMES[T_num] },
    R: { num: R_num, name: ARCANA_NAMES[R_num] },
    B: { num: B_num, name: ARCANA_NAMES[B_num] },
    C: { num: C_num, name: ARCANA_NAMES[C_num] },
    N: { num: N_num, name: ARCANA_NAMES[N_num] },
    E: { num: E_num, name: ARCANA_NAMES[E_num] },
    S: { num: S_num, name: ARCANA_NAMES[S_num] },
    W: { num: W_num, name: ARCANA_NAMES[W_num] },
    BL: { num: W_num, name: ARCANA_NAMES[W_num] }, // BL=W для обратной совместимости
    P1: { num: P1_num, name: ARCANA_NAMES[P1_num] },
    P2: { num: P2_num, name: ARCANA_NAMES[P2_num] },
    P3: { num: P3_num, name: ARCANA_NAMES[P3_num] },
    lovePoint: lovePoint,
    moneyPoint: moneyPoint,
    wheel_spokes: wheel_spokes,
    karma_tail_triplet: karma_tail_triplet, // Необходимый массив
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
                  {/* БЛОК ВИЗУАЛИЗАЦИИ КОЛЕСА */}
                  <div className="flex-shrink-0 mx-auto">
                    {/* Передаем полный объект 'matrix', включая wheel_spokes и karma_tail_triplet */}
                    <MatrixVisualization matrix={matrix} arcanaNames={ARCANA_NAMES} />
                  </div>

                  <div className="flex-grow">
                    {/* КАРТОЧКА BL (МИНИМАЛЬНО ИСПРАВЛЕННЫЙ JSX ДЛЯ ОБЪЕКТНОЙ СТРУКТУРЫ) */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-red-800/40 p-4 rounded-lg border border-red-500/30">
                        {/* ! ИСПРАВЛЕНО: Доступ к числу через .num ! */}
                        <div className="text-sm text-red-200 mb-1">Аркан BL (W)</div>
                        <div className="text-2xl font-bold text-white">{matrix.BL.num}</div>
                        <div className="text-xs text-red-300">{matrix.BL.name}</div>
                      </div>
                    </div>

                    {/* Ключевые точки (МИНИМАЛЬНО ИСПРАВЛЕННЫЙ JSX ДЛЯ ОБЪЕКТНОЙ СТРУКТУРЫ) */}
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-purple-300">Ключевые точки</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-pink-800/40 p-4 rounded-lg border border-pink-500/30">
                          <div className="text-sm text-pink-200 mb-1">❤ Точка любви (L+E)</div>
                          {/* ! ИСПРАВЛЕНО: Доступ к числу через .num ! */}
                          <div className="text-2xl font-bold text-white">{matrix.lovePoint.num}</div>
                          <div className="text-xs text-pink-300">{matrix.lovePoint.name}</div>
                        </div>
                        <div className="bg-green-800/40 p-4 rounded-lg border border-green-500/30">
                          <div className="text-sm text-green-200 mb-1">💰 Точка денег (R+W)</div>
                          {/* ! ИСПРАВЛЕНО: Доступ к числу через .num ! */}
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
