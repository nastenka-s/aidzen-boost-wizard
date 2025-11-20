import React from "react";

interface MatrixVisualizationProps {
  matrix: {
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
    spokes: Array<{
      angle: number;
      outer: number;
      middle: number;
      inner: number;
      label: string;
    }>;
  };
}

// Названия 22 арканов
const ARCANA_NAMES: { [key: number]: string } = {
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

export const MatrixVisualization: React.FC<MatrixVisualizationProps> = ({ matrix }) => {
  const size = 700;
  const center = size / 2;
  const OUTER_RADIUS = 230;
  const MID_RADIUS = 170;
  const INNER_RADIUS = OUTER_RADIUS * 0.5;

  const axes = [
    { angle: 180, label: "0 лет" },
    { angle: 225, label: "10 лет" },
    { angle: 270, label: "20 лет" },
    { angle: 315, label: "30 лет" },
    { angle: 0, label: "40 лет" },
    { angle: 45, label: "50 лет" },
    { angle: 90, label: "60 лет" },
    { angle: 135, label: "70 лет" },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-3xl mx-auto drop-shadow-xl">
        <defs>
          <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1F2937" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
          <linearGradient id="axisGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Фон */}
        <rect width={size} height={size} fill="url(#bgGradient)" rx="24" />

        {/* Центральная система */}
        <g transform={`translate(${center}, ${center})`}>
          {/* Сетчатый круг */}
          {[1, 0.75, 0.5].map((k, i) => (
            <circle
              key={k}
              r={OUTER_RADIUS * k}
              fill="none"
              stroke={i === 0 ? "#4C1D95" : "#1D2333"}
              strokeWidth={i === 0 ? 2 : 1}
              strokeDasharray={i === 2 ? "4 6" : "none"}
            />
          ))}

          {/* Оси */}
          {axes.map((axis, index) => {
            const rad = (axis.angle * Math.PI) / 180;
            const x = Math.cos(rad) * OUTER_RADIUS;
            const y = Math.sin(rad) * OUTER_RADIUS;

            return (
              <g key={axis.angle}>
                <line
                  x1={0}
                  y1={0}
                  x2={x}
                  y2={y}
                  stroke="url(#axisGradient)"
                  strokeWidth={index % 2 === 0 ? 1.75 : 1.25}
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          {/* Метки возрастов между основными точками */}
          {matrix.spokes.map((spoke, i) => {
            const nextSpoke = matrix.spokes[(i + 1) % matrix.spokes.length];
            const midAngle = (spoke.angle + nextSpoke.angle) / 2;
            const midRad = (midAngle * Math.PI) / 180;
            const mx = Math.cos(midRad) * OUTER_RADIUS;
            const my = Math.sin(midRad) * OUTER_RADIUS;
            const midAge = i * 10 + 5;

            return (
              <g key={`mid-${i}`} transform={`translate(${mx}, ${my})`}>
                <circle r="3" fill="#9CA3AF" />
                <text y={-10} textAnchor="middle" fontSize="10" fill="#9CA3AF">
                  {midAge}
                </text>
              </g>
            );
          })}

          {/* Точки внешнего и внутреннего кругов */}
          {/* Основные 8 точек возраста */}
          {matrix.spokes.map((spoke, i) => {
            const rad = (spoke.angle * Math.PI) / 180;

            const mx = Math.cos(rad) * MID_RADIUS; // средний круг (фиолетовый)
            const my = Math.sin(rad) * MID_RADIUS;

            const ix = Math.cos(rad) * INNER_RADIUS; // ВНУТРЕННИЙ круг (чёрные кружки)
            const iy = Math.sin(rad) * INNER_RADIUS;

            const ox = Math.cos(rad) * OUTER_RADIUS; // внешний круг возрастов
            const oy = Math.sin(rad) * OUTER_RADIUS;

            const age = parseInt(spoke.label);
            const isMainAge = age % 20 === 0;
            const outerColor = age === 0 || age === 20 ? "#8B5CF6" : age === 40 || age === 60 ? "#EF4444" : "#6B7280";

            return (
              <g key={`group-${i}`}>
                {/* Внешняя точка возраста */}
                <g transform={`translate(${ox}, ${oy})`}>
                  <circle
                    r={isMainAge ? 34 : 28}
                    fill={outerColor}
                    stroke="#FFDC00"
                    strokeWidth="2"
                    filter="url(#glow)"
                  />
                  <text y="6" textAnchor="middle" fontSize={isMainAge ? 18 : 14} fontWeight="bold" fill="white">
                    {spoke.outer}
                  </text>
                  <text y={isMainAge ? 46 : 40} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FDE047">
                    {age} лет
                  </text>
                  <text
                    y={isMainAge ? 58 : 52}
                    textAnchor="middle"
                    fontSize="8"
                    fill="#E5E7EB"
                    opacity="0.9"
                    style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.8)" }}
                  >
                    {ARCANA_NAMES[spoke.outer]}
                  </text>
                </g>

                {/* Средняя точка (фиолетовый круг) */}
                {spoke.middle > 0 && (
                  <g transform={`translate(${mx}, ${my})`}>
                    <circle r={INNER_NODE_RADIUS} fill="#020617" stroke="#9CA3AF" strokeWidth="1.5" />
                    <text y="4" textAnchor="middle" fontSize={INNER_NODE_FONT_SIZE} fontWeight="bold" fill="white">
                      {spoke.middle}
                    </text>
                  </g>
                )}

                {/* ВНУТРЕННЯЯ точка (чёрный кружок ближе к центру) */}
                {spoke.inner > 0 && (
                  <g transform={`translate(${ix}, ${iy})`}>
                    <circle r={INNER_NODE_RADIUS} fill="#020617" stroke="#9CA3AF" strokeWidth="1.5" />
                    <text y="4" textAnchor="middle" fontSize={INNER_NODE_FONT_SIZE} fontWeight="bold" fill="white">
                      {spoke.inner}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Центральная точка матрицы */}
          <g transform="translate(0, 0)">
            <circle r="38" fill="#F59E0B" stroke="white" strokeWidth="2" />
            <circle r="32" fill="#0F172A" />
            <text y="-4" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white">
              {matrix.Center}
            </text>
            <text y="16" textAnchor="middle" fontSize="10" fill="#FEF3C7" letterSpacing="0.08em">
              ЦЕНТР
            </text>
          </g>

          {/* Линия любви и денег от центра */}
          {(() => {
            const loveSpoke = matrix.spokes.find((s) => parseInt(s.label) === 60);
            const moneySpoke = matrix.spokes.find((s) => parseInt(s.label) === 40);

            if (!loveSpoke || !moneySpoke) return null;

            const loveRad = (loveSpoke.angle * Math.PI) / 180;
            const moneyRad = (moneySpoke.angle * Math.PI) / 180;

            const loveX = Math.cos(loveRad) * 100;
            const loveY = Math.sin(loveRad) * 100;
            const moneyX = Math.cos(moneyRad) * 100;
            const moneyY = Math.sin(moneyRad) * 100;

            return (
              <>
                {/* Линия к любви */}
                <line x1={0} y1={0} x2={loveX} y2={loveY} stroke="#EC4899" strokeWidth={2} strokeDasharray="4 4" />
                <g transform={`translate(${loveX}, ${loveY})`}>
                  <circle r="16" fill="#DB2777" stroke="white" strokeWidth="1" />
                  <text y="4" textAnchor="middle" fontSize="11" fontWeight="600" fill="white">
                    {matrix.lovePoint}
                  </text>
                </g>

                {/* Линия к деньгам */}
                <line x1={0} y1={0} x2={moneyX} y2={moneyY} stroke="#22C55E" strokeWidth={2} strokeDasharray="4 4" />
                <g transform={`translate(${moneyX}, ${moneyY})`}>
                  <circle r="16" fill="#16A34A" stroke="white" strokeWidth="1" />
                  <text y="4" textAnchor="middle" fontSize="11" fontWeight="600" fill="white">
                    {matrix.moneyPoint}
                  </text>
                </g>
              </>
            );
          })()}
        </g>

        {/* Обрамление и подписи */}
        <g transform={`translate(${center}, ${center})`}>
          {/* Внешний декоративный круг */}
          <circle r={OUTER_RADIUS + 40} fill="none" stroke="#4C1D95" strokeWidth="2" strokeDasharray="6 10" />
          <circle r={OUTER_RADIUS + 50} fill="none" stroke="rgba(148, 163, 184, 0.35)" strokeWidth="1" />

          {/* Подписи направлений */}
          <text x="0" y={-OUTER_RADIUS - 64} textAnchor="middle" fontSize="14" fontWeight="600" fill="#E5E7EB">
            НЕБО
          </text>
          <text x="0" y={OUTER_RADIUS + 78} textAnchor="middle" fontSize="14" fontWeight="600" fill="#E5E7EB">
            ЗЕМЛЯ
          </text>
          <text x={-OUTER_RADIUS - 78} y="4" textAnchor="middle" fontSize="14" fontWeight="600" fill="#E5E7EB">
            ДУХОВНОЕ
          </text>
          <text x={OUTER_RADIUS + 78} y="4" textAnchor="middle" fontSize="14" fontWeight="600" fill="#E5E7EB">
            МАТЕРИАЛЬНОЕ
          </text>
        </g>
      </svg>

      <svg viewBox="0 0 400 220" className="w-full max-w-xl mx-auto mt-4 drop-shadow-lg">
        <rect width="400" height="220" rx="16" fill="#020617" />
        <rect x="12" y="12" width="376" height="196" rx="14" fill="none" stroke="rgba(148, 163, 184, 0.45)" />

        {/* Легенда по возрастам */}
        <text x="200" y="40" textAnchor="middle" fontSize="15" fontWeight="600" fill="#E5E7EB">
          Возрастные этапы судьбы
        </text>

        <g transform="translate(200, 110)">
          <g transform="translate(-150, -40)">
            <circle r="16" fill="#8B5CF6" stroke="#FFDC00" strokeWidth="1.5" />
            <text y="5" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">
              0
            </text>
          </g>
          <text x="-115" y="-35" textAnchor="start" fontSize="12" fill="#E5E7EB">
            Стартовые задачи (0–10 лет)
          </text>

          <g transform="translate(0, -40)">
            <circle r="16" fill="#8B5CF6" stroke="#FFDC00" strokeWidth="1.5" />
            <text y="5" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">
              20
            </text>
          </g>
          <text x="35" y="-35" textAnchor="start" fontSize="12" fill="#E5E7EB">
            Формирование характера (20–30 лет)
          </text>

          <g transform="translate(-150, 20)">
            <circle r="16" fill="#EF4444" stroke="#FFDC00" strokeWidth="1.5" />
            <text y="5" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">
              40
            </text>
          </g>
          <text x="-115" y="25" textAnchor="start" fontSize="12" fill="#E5E7EB">
            Реализация потенциала (40–50 лет)
          </text>

          <g transform="translate(0, 20)">
            <circle r="16" fill="#EF4444" stroke="#FFDC00" strokeWidth="1.5" />
            <text y="5" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">
              60
            </text>
          </g>
          <text x="35" y="25" textAnchor="start" fontSize="12" fill="#E5E7EB">
            Мудрость и передача опыта (60+)
          </text>
        </g>

        {/* Маленькая легенда по линиям рода */}
        <g transform="translate(200, 180)">
          <circle cx="-120" cy="0" r="5" fill="#F97316" />
          <text x="-108" y="4" textAnchor="start" fontSize="12" fill="#F97316">
            Родовые задачи
          </text>

          <circle cx="50" cy="0" r="5" fill="#22C55E" />
          <text x="62" y="4" textAnchor="start" fontSize="12" fill="#22C55E">
            Деньги и ресурс
          </text>
        </g>
      </svg>
    </div>
  );
};
