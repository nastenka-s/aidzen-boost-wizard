import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
// import { MatrixVisualization } from "@/components/MatrixVisualization"; // Старый компонент удален
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
  if (n === 0) return 22; // Считаем 0 как 22 (Шут/Пустота)
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
// 2. ПОЛНАЯ ФУНКЦИЯ РАСЧЕТА МАТРИЦЫ
// Включает расчет L, T, R, B, C, P1, P2, P3, lovePoint, moneyPoint и ВСЕХ wheel_spokes
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
  const P1 = r(N + S); // Личное (N + S)
  const P2 = r(E + W); // Социальное (E + W)
  const P3 = r(P1 + P2); // Духовное (P1 + P2)

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

    // Средний круг (R_MIDDLE): Угол + Внутренний
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
    wheel_spokes: wheel_spokes,
  };
};

// ====================================================================
// 3. ХЕЛПЕРЫ И КОНСТАНТЫ ДЛЯ ОТРИСОВКИ SVG (Скопировано из MatrixOfDestinyWheel.jsx)
// ====================================================================

const SVG_SIZE = 1000;
const CENTER_X = SVG_SIZE / 2; // 500
const CENTER_Y = SVG_SIZE / 2; // 500

// Радиусы (должны совпадать с тем, как вы хотите видеть колесо)
const R_INNER = 160;
const R_MIDDLE = 240;
const R_OUTER = 320;

const getCoords = (angle: number, radius: number) => {
  // Угол 0 градусов = 12 часов (верх)
  const rad = (angle - 90) * (Math.PI / 180);
  const x = CENTER_X + radius * Math.cos(rad);
  const y = CENTER_Y + radius * Math.sin(rad);
  return { x, y };
};

// Компонент для отрисовки аркана (Circle + Text)
const ArcanaCircle = ({
  x,
  y,
  arcanaNum,
  size = 30,
  colorClass = "bg-[#B08FFF]",
}: {
  x: number;
  y: number;
  arcanaNum: number;
  size?: number;
  colorClass?: string;
}) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Цвет круга: можно настроить через пропсы, но для простоты используем один */}
    <circle r={size / 2} fill="#B08FFF" stroke="#8A4DFF" strokeWidth="2" />
    <text x="0" y="5" textAnchor="middle" fill="#2b134b" fontSize="14" fontWeight="bold">
      {arcanaNum}
    </text>
  </g>
);

// ====================================================================
// 4. ОСНОВНОЙ КОМПОНЕНТ MatrixSudby
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

  useEffect(() => {
    // Автоматический расчет для примера, если нужно
    // const exampleDate = new Date("1985-08-25");
    // setBirthDate("1985-08-25");
    // setMatrix(calculateFullMatrix(exampleDate));
  }, []);

  return (
    <div className="min-h-screen bg-background text-white">
      <Helmet>
        <title>Матрица Судьбы: Расчет и Анализ</title>
      </Helmet>
      <div className="container mx-auto py-8">
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

        {matrix && (
          <>
            <Card className="bg-gradient-to-br from-[#2b134b] to-[#1d0e2c] border-purple-800/50 shadow-2xl shadow-purple-900/50">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* БЛОК ВИЗУАЛИЗАЦИИ КОЛЕСА (SVG-разметка) */}
                  <div className="flex-shrink-0 mx-auto">
                    <svg viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} className="w-full max-w-[500px] h-auto">
                      {/* 1. ГЛАВНЫЕ ТОЧКИ (L, T, R, B) - Внешний круг */}
                      <ArcanaCircle {...getCoords(0, R_OUTER)} arcanaNum={matrix.T.num} size={35} />
                      <ArcanaCircle {...getCoords(90, R_OUTER)} arcanaNum={matrix.R.num} size={35} />
                      <ArcanaCircle {...getCoords(180, R_OUTER)} arcanaNum={matrix.B.num} size={35} />
                      <ArcanaCircle {...getCoords(270, R_OUTER)} arcanaNum={matrix.L.num} size={35} />

                      {/* 2. ДИАГОНАЛЬНЫЕ ТОЧКИ (N, E, S, W) - Внешний квадрат */}
                      <ArcanaCircle {...getCoords(45, R_OUTER)} arcanaNum={matrix.E.num} size={35} />
                      <ArcanaCircle {...getCoords(135, R_OUTER)} arcanaNum={matrix.S.num} size={35} />
                      <ArcanaCircle {...getCoords(225, R_OUTER)} arcanaNum={matrix.W.num} size={35} />
                      <ArcanaCircle {...getCoords(315, R_OUTER)} arcanaNum={matrix.N.num} size={35} />

                      {/* 3. ЦЕНТР (C) */}
                      <ArcanaCircle x={CENTER_X} y={CENTER_Y} arcanaNum={matrix.C.num} size={45} />

                      {/* 4. ВНУТРЕННИЕ ТОЧКИ (R_INNER = 160) */}
                      {matrix.wheel_spokes && (
                        <>
                          {/* Главные оси */}
                          <ArcanaCircle {...getCoords(0, R_INNER)} arcanaNum={matrix.wheel_spokes.T_inner.num} />
                          <ArcanaCircle {...getCoords(90, R_INNER)} arcanaNum={matrix.wheel_spokes.R_inner.num} />
                          <ArcanaCircle {...getCoords(180, R_INNER)} arcanaNum={matrix.wheel_spokes.B_inner.num} />
                          <ArcanaCircle {...getCoords(270, R_INNER)} arcanaNum={matrix.wheel_spokes.L_inner.num} />

                          {/* Диагонали */}
                          <ArcanaCircle {...getCoords(45, R_INNER)} arcanaNum={matrix.wheel_spokes.E_inner.num} />
                          <ArcanaCircle {...getCoords(135, R_INNER)} arcanaNum={matrix.wheel_spokes.S_inner.num} />
                          <ArcanaCircle {...getCoords(225, R_INNER)} arcanaNum={matrix.wheel_spokes.W_inner.num} />
                          <ArcanaCircle {...getCoords(315, R_INNER)} arcanaNum={matrix.wheel_spokes.N_inner.num} />

                          {/* 5. СРЕДНИЕ ТОЧКИ (R_MIDDLE = 240) */}
                          {/* Главные оси */}
                          <ArcanaCircle {...getCoords(0, R_MIDDLE)} arcanaNum={matrix.wheel_spokes.T_middle.num} />
                          <ArcanaCircle {...getCoords(90, R_MIDDLE)} arcanaNum={matrix.wheel_spokes.R_middle.num} />
                          <ArcanaCircle {...getCoords(180, R_MIDDLE)} arcanaNum={matrix.wheel_spokes.B_middle.num} />
                          <ArcanaCircle {...getCoords(270, R_MIDDLE)} arcanaNum={matrix.wheel_spokes.L_middle.num} />

                          {/* Диагонали */}
                          <ArcanaCircle {...getCoords(45, R_MIDDLE)} arcanaNum={matrix.wheel_spokes.E_middle.num} />
                          <ArcanaCircle {...getCoords(135, R_MIDDLE)} arcanaNum={matrix.wheel_spokes.S_middle.num} />
                          <ArcanaCircle {...getCoords(225, R_MIDDLE)} arcanaNum={matrix.wheel_spokes.W_middle.num} />
                          <ArcanaCircle {...getCoords(315, R_MIDDLE)} arcanaNum={matrix.wheel_spokes.N_middle.num} />
                        </>
                      )}

                      {/* ... (Здесь должна быть отрисовка линий, предназначений и кармического хвоста, которые не были скопированы) ... */}
                    </svg>
                  </div>

                  <div className="flex-grow">
                    {/* 6. ТЕКСТОВАЯ ИНФОРМАЦИЯ И КЛЮЧЕВЫЕ ТОЧКИ */}
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-purple-300">Ключевые точки</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Пример, как отобразить Точку Любви и Точку Денег */}
                        <div className="bg-pink-800/40 p-4 rounded-lg border border-pink-500/30">
                          <div className="text-sm text-pink-200 mb-1">❤ Точка любви (L+E)</div>
                          <div className="text-2xl font-bold text-white">{matrix.lovePoint.num}</div>
                          <div className="text-xs text-pink-300">{matrix.lovePoint.name}</div>
                        </div>
                        <div className="bg-green-800/40 p-4 rounded-lg border border-green-500/30">
                          <div className="text-sm text-green-200 mb-1">💰 Точка денег (R+W)</div>
                          <div className="text-2xl font-bold text-white">{matrix.moneyPoint.num}</div>
                          <div className="text-xs text-green-300">{matrix.moneyPoint.name}</div>
                        </div>
                      </div>

                      <h3 className="text-2xl font-semibold mt-6 mb-4 text-purple-300">Предназначение</h3>
                      <div className="bg-purple-800/40 p-4 rounded-lg border border-purple-500/30">
                        <div className="text-sm text-purple-200 mb-1">Личное (P1)</div>
                        <div className="text-xl font-bold text-white">
                          {matrix.P1.num} - {matrix.P1.name}
                        </div>

                        <div className="text-sm text-purple-200 mt-3 mb-1">Социальное (P2)</div>
                        <div className="text-xl font-bold text-white">
                          {matrix.P2.num} - {matrix.P2.name}
                        </div>

                        <div className="text-sm text-purple-200 mt-3 mb-1">Общее (P3)</div>
                        <div className="text-xl font-bold text-white">
                          {matrix.P3.num} - {matrix.P3.name}
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
