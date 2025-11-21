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
  const INNER_NODE_RADIUS = 18;
  const INNER_NODE_FONT_SIZE = 11;
  const DIAG_RADIUS = OUTER_RADIUS * 0.85; // длина мужской/женской диагоналей

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
      {/* Основное колесо */}
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
          {/* Мужская и женская линии */}
          {/* Мужская и женская линии */}
          <g>
            {/* Мужская линия (розовая диагональ) */}
            <line
              x1={-DIAG_RADIUS}
              y1={DIAG_RADIUS}
              x2={DIAG_RADIUS}
              y2={-DIAG_RADIUS}
              stroke="#FB7185"
              strokeWidth={2}
              strokeDasharray="6 6"
              opacity={0.7}
            />
            <text
              x={DIAG_RADIUS * 0.55}
              y={DIAG_RADIUS * 0.3} // сдвинули ВЫШЕ (ближе к центру)
              textAnchor="middle"
              fontSize={12}
              fontWeight={600}
              fill="#38BDF8" // надпись мужская — ГОЛУБОЙ
            >
              Мужская линия
            </text>

            {/* Женская линия (голубая диагональ) */}
            <line
              x1={-DIAG_RADIUS}
              y1={-DIAG_RADIUS}
              x2={DIAG_RADIUS}
              y2={DIAG_RADIUS}
              stroke="#38BDF8"
              strokeWidth={2}
              strokeDasharray="6 6"
              opacity={0.7}
            />
            <text
              x={DIAG_RADIUS * 0.55}
              y={-DIAG_RADIUS * 0.3} // сдвинули НИЖЕ (ближе к центру)
              textAnchor="middle"
              fontSize={12}
              fontWeight={600}
              fill="#FB7185" // надпись женская — РОЗОВЫЙ
            >
              Женская линия
            </text>
          </g>
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

          {/* Основные 8 точек возраста */}
          {matrix.spokes.map((spoke, i) => {
            const rad = (spoke.angle * Math.PI) / 180;

            const mx = Math.cos(rad) * MID_RADIUS; // средний круг
            const my = Math.sin(rad) * MID_RADIUS;

            const ix = Math.cos(rad) * INNER_RADIUS; // внутренний круг
            const iy = Math.sin(rad) * INNER_RADIUS;

            const ox = Math.cos(rad) * OUTER_RADIUS; // внешний круг возрастов
            const oy = Math.sin(rad) * OUTER_RADIUS;

            const age = parseInt(spoke.label, 10);
            const isMainAge = age % 20 === 0;

            const outerColor = age === 0 || age === 20 ? "#8B5CF6" : age === 40 || age === 60 ? "#EF4444" : "#6B7280";

            const ageLabelY = age === 20 ? -52 : isMainAge ? 46 : 40;

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
                  <text y={ageLabelY} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FDE047">
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

                {/* Средняя точка */}
                {spoke.middle > 0 && (
                  <g transform={`translate(${mx}, ${my})`}>
                    <circle r={INNER_NODE_RADIUS} fill="#020617" stroke="#9CA3AF" strokeWidth="1.5" />
                    <text y="4" textAnchor="middle" fontSize={INNER_NODE_FONT_SIZE} fontWeight="bold" fill="white">
                      {spoke.middle}
                    </text>
                  </g>
                )}

                {/* Внутренняя точка */}
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

          {/* Центр */}
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

          {/* Линия любви и денег */}
          {(() => {
            const loveSpoke = matrix.spokes.find((s) => parseInt(s.label, 10) === 60);
            const moneySpoke = matrix.spokes.find((s) => parseInt(s.label, 10) === 40);

            if (!loveSpoke || !moneySpoke) return null;

            const loveRad = (loveSpoke.angle * Math.PI) / 180;
            const moneyRad = (moneySpoke.angle * Math.PI) / 180;

            const LOVE_LINE_RADIUS = 70;
            const MONEY_LINE_RADIUS = 70;

            const loveX = Math.cos(loveRad) * LOVE_LINE_RADIUS;
            const loveY = Math.sin(loveRad) * LOVE_LINE_RADIUS;

            const moneyX = Math.cos(moneyRad) * MONEY_LINE_RADIUS;
            const moneyY = Math.sin(moneyRad) * MONEY_LINE_RADIUS;

            return (
              <>
                <line x1={0} y1={0} x2={loveX} y2={loveY} stroke="#EC4899" strokeWidth={2} strokeDasharray="4 4" />
                <g transform={`translate(${loveX}, ${loveY})`}>
                  <circle r="16" fill="#DB2777" stroke="white" strokeWidth="1" />
                  <text y="4" textAnchor="middle" fontSize="11" fontWeight="600" fill="white">
                    {matrix.lovePoint}
                  </text>
                </g>

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

        {/* Внешние подписи */}
        <g transform={`translate(${center}, ${center})`}>
          <circle r={OUTER_RADIUS + 40} fill="none" stroke="#4C1D95" strokeWidth="2" strokeDasharray="6 10" />
          <circle r={OUTER_RADIUS + 50} fill="none" stroke="rgba(148, 163, 184, 0.35)" strokeWidth="1" />

          <text x="0" y={-OUTER_RADIUS - 64} textAnchor="middle" fontSize="14" fontWeight="600" fill="#E5E7EB">
            НЕБО
          </text>
          <text x="0" y={OUTER_RADIUS + 78} textAnchor="middle" fontSize="14" fontWeight="600" fill="#E5E7EB">
            ЗЕМЛЯ
          </text>
          <text x={-OUTER_RADIUS - 60} y={-40} textAnchor="middle" fontSize="14" fontWeight="600" fill="#E5E7EB">
            ДУХОВНОЕ
          </text>
          <text x={OUTER_RADIUS + 60} y={-40} textAnchor="middle" fontSize="14" fontWeight="600" fill="#E5E7EB">
            МАТЕРИАЛЬНОЕ
          </text>
        </g>
      </svg>

      {/* Блок возрастных этапов + легенда */}
    </div>
  );
};
