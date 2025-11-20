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

const OUTER_RADIUS = 330;
const MID_RADIUS = OUTER_RADIUS * 0.75;

export function MatrixVisualization({ matrix }: MatrixVisualizationProps) {
  return (
    <div className="flex justify-center items-center w-full overflow-x-auto py-8">
      <svg viewBox="-400 -400 800 800" className="w-full max-w-4xl h-auto" style={{ minWidth: "600px" }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Внешний круг */}
        <circle r={OUTER_RADIUS} fill="none" stroke="#9CA3AF" strokeWidth="2" opacity="0.5" />

        {/* Линии от центра к внешним точкам (только к 8 основным) */}
        {matrix.spokes.map((spoke, i) => {
          const rad = (spoke.angle * Math.PI) / 180;
          const ox = Math.cos(rad) * OUTER_RADIUS;
          const oy = Math.sin(rad) * OUTER_RADIUS;

          return (
            <line key={`line-${i}`} x1="0" y1="0" x2={ox} y2={oy} stroke="#9CA3AF" strokeWidth="2" opacity="0.6" />
          );
        })}

        {/* Родовой квадрат (прямой квадрат) */}
        <g>
          {/* Линии квадрата */}
          <line x1="-120" y1="-120" x2="120" y2="-120" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="120" y1="-120" x2="120" y2="120" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="120" y1="120" x2="-120" y2="120" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="-120" y1="120" x2="-120" y2="-120" stroke="#9CA3AF" strokeWidth="2" />

          {/* Диагонали */}
          <line x1="-120" y1="-120" x2="120" y2="120" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4,4" />
          <line x1="120" y1="-120" x2="-120" y2="120" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,4" />

          {/* Углы квадрата */}
          <g transform="translate(-120, -120)">
            <circle r="24" fill="#8B5CF6" stroke="#FFDC00" strokeWidth="2" />
            <text y="6" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">
              {matrix.TL}
            </text>
          </g>

          <g transform="translate(120, -120)">
            <circle r="24" fill="#8B5CF6" stroke="#FFDC00" strokeWidth="2" />
            <text y="6" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">
              {matrix.TR}
            </text>
          </g>

          <g transform="translate(120, 120)">
            <circle r="24" fill="#EF4444" stroke="#FFDC00" strokeWidth="2" />
            <text y="6" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">
              {matrix.BR}
            </text>
          </g>

          <g transform="translate(-120, 120)">
            <circle r="24" fill="#EF4444" stroke="#FFDC00" strokeWidth="2" />
            <text y="6" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">
              {matrix.BL}
            </text>
          </g>
        </g>

        {/* Личный ромб (диагональный) */}
        <g>
          {/* Линии ромба */}
          <line x1="-180" y1="0" x2="0" y2="-180" stroke="#8B5CF6" strokeWidth="2" />
          <line x1="0" y1="-180" x2="180" y2="0" stroke="#8B5CF6" strokeWidth="2" />
          <line x1="180" y1="0" x2="0" y2="180" stroke="#EF4444" strokeWidth="2" />
          <line x1="0" y1="180" x2="-180" y2="0" stroke="#EF4444" strokeWidth="2" />

          {/* Точки ромба */}
          <g transform="translate(-180, 0)">
            <circle r="28" fill="#8B5CF6" stroke="#FFDC00" strokeWidth="2" filter="url(#glow)" />
            <text y="6" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">
              {matrix.Day}
            </text>
            <text y="-42" textAnchor="middle" fontSize="11" fontWeight="600" fill="#C4B5FD">
              День
            </text>
          </g>

          <g transform="translate(0, -180)">
            <circle r="28" fill="#8B5CF6" stroke="#FFDC00" strokeWidth="2" filter="url(#glow)" />
            <text y="6" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">
              {matrix.Month}
            </text>
            <text y="-42" textAnchor="middle" fontSize="11" fontWeight="600" fill="#C4B5FD">
              Месяц
            </text>
          </g>

          <g transform="translate(180, 0)">
            <circle r="28" fill="#EF4444" stroke="#FFDC00" strokeWidth="2" filter="url(#glow)" />
            <text y="6" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">
              {matrix.Year}
            </text>
            <text y="-42" textAnchor="middle" fontSize="11" fontWeight="600" fill="#F87171">
              Год
            </text>
          </g>

          <g transform="translate(0, 180)">
            <circle r="28" fill="#EF4444" stroke="#FFDC00" strokeWidth="2" filter="url(#glow)" />
            <text y="6" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">
              {matrix.Bottom}
            </text>
            <text y="42" textAnchor="middle" fontSize="11" fontWeight="600" fill="#F87171">
              Низ
            </text>
          </g>
        </g>

        {/* Промежуточные точки (5, 15, 25...) */}
        {matrix.spokes.map((spoke, i) => {
          const midAngle = spoke.angle + 22.5;
          const midRad = (midAngle * Math.PI) / 180;
          const mx = Math.cos(midRad) * OUTER_RADIUS;
          const my = Math.sin(midRad) * OUTER_RADIUS;
          const midAge = i * 10 + 5;

          return (
            <g key={`mid-${i}`} transform={`translate(${mx}, ${my})`}>
              <circle r="3" fill="#9CA3AF" />
              <text
                x={Math.cos(midRad) * 15}
                y={Math.sin(midRad) * 15 + 4}
                textAnchor="middle"
                fontSize="10"
                fill="#9CA3AF"
              >
                {midAge}
              </text>
            </g>
          );
        })}

        {/* Основные 8 точек возраста */}
        {matrix.spokes.map((spoke, i) => {
          const rad = (spoke.angle * Math.PI) / 180;
          const mx = Math.cos(rad) * MID_RADIUS;
          const my = Math.sin(rad) * MID_RADIUS;
          const ox = Math.cos(rad) * OUTER_RADIUS;
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
                  style={{
                    textShadow: "0px 1px 2px rgba(0,0,0,0.8)",
                  }}
                >
                  {ARCANA_NAMES[spoke.outer]}
                </text>
              </g>

              {/* Средняя точка (только если есть) */}
              {/* Внутренняя точка (чёрный кружок ближе к центру) */}
              {spoke.inner > 0 && (
                <g transform={`translate(${mx}, ${my})`}>
                  <circle r="18" fill="#6366F1" stroke="white" strokeWidth="1.5" />
                  <text y="5" textAnchor="middle" fontSize="11" fontWeight="600" fill="white">
                    {spoke.inner}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Точки любви и денег */}
        <g
          transform={`translate(${Math.cos((90 * Math.PI) / 180) * 200 - 25}, ${Math.sin((90 * Math.PI) / 180) * 200})`}
        >
          <circle r="16" fill="#BE185D" stroke="white" strokeWidth="1.5" />
          <text y="4" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">
            {matrix.lovePoint}
          </text>
          <text x="0" y="-22" textAnchor="middle" fontSize="14">
            ❤
          </text>
        </g>

        <g transform={`translate(${Math.cos(0) * 200}, ${Math.sin(0) * 200 - 25})`}>
          <circle r="16" fill="#059669" stroke="white" strokeWidth="1.5" />
          <text y="4" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">
            {matrix.moneyPoint}
          </text>
          <text x="0" y="-22" textAnchor="middle" fontSize="14">
            💰
          </text>
        </g>

        {/* Центральная точка (на переднем плане) */}
        <g transform="translate(0, 0)">
          <circle r="50" fill="#FBBF24" stroke="#FFDC00" strokeWidth="3" filter="url(#glow)" />
          <text y="8" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#7C2D12">
            {matrix.Center}
          </text>
        </g>

        {/* Легенда */}
        <text x="-150" y="-140" textAnchor="middle" fontSize="12" fontWeight="600" fill="#3B82F6">
          Мужская линия
        </text>

        <text x="150" y="-140" textAnchor="middle" fontSize="12" fontWeight="600" fill="#EF4444">
          Женская линия
        </text>
      </svg>
    </div>
  );
}
