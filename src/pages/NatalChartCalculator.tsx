import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

type CityOption = {
  name: string;
  country?: string;
  country_code?: string;
  lat: number;
  lon: number;
  tz?: string | null;
  display_name?: string;
};

const NatalChartCalculator = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [cityLat, setCityLat] = useState("");
  const [cityLon, setCityLon] = useState("");
  const [cityTz, setCityTz] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState<any | null>(null);

  // автопоиск города
  const [cityQuery, setCityQuery] = useState("");
  const [cityOptions, setCityOptions] = useState<CityOption[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [cityLoading, setCityLoading] = useState(false);
  const [cityError, setCityError] = useState<string | null>(null);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const validateForm = () => {
    if (!date || !time || !cityQuery) {
      setError("Пожалуйста, заполните дату, время и город рождения");
      return false;
    }
    return true;
  };

  const searchCities = async (q: string) => {
    setCityError(null);

    if (!q || q.trim().length < 2) {
      setCityOptions([]);
      setShowCityDropdown(false);
      return;
    }

    try {
      setCityLoading(true);
      const res = await fetch(
        `https://api.aidzen.ru/api/geo/resolve?q=${encodeURIComponent(q.trim())}&lang=ru&limit=7`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw new Error(`Ошибка поиска города: ${res.status}`);
      }

      const data: CityOption[] = await res.json();
      setCityOptions(data || []);
      setShowCityDropdown((data || []).length > 0);
    } catch (err: any) {
      console.error("City search error:", err);
      setCityError("Не удалось найти город, попробуйте ещё раз");
      setCityOptions([]);
      setShowCityDropdown(false);
    } finally {
      setCityLoading(false);
    }
  };

  const handleCalculate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setChartData(null);

    const payload: any = {
      date,
      time,
      city: selectedCity?.display_name || cityQuery,
    };

    // если выбрали город через поиск — координаты и tz из него
    if (selectedCity) {
      payload.city_lat = selectedCity.lat;
      payload.city_lon = selectedCity.lon;
      if (selectedCity.tz) {
        payload.city_tz = selectedCity.tz;
      }
    }

    // если вручную переопределили
    if (cityLat) payload.city_lat = Number(cityLat);
    if (cityLon) payload.city_lon = Number(cityLon);
    if (cityTz) payload.city_tz = cityTz;

    try {
      const res = await fetch("https://api.aidzen.ru/api/natal_chart_summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status !== "success") {
        setError(data.error || "Ошибка при расчете натальной карты");
        return;
      }

      setChartData(data.summary);
    } catch (err) {
      console.error(err);
      setError("Ошибка соединения с сервером. Проверьте подключение к интернету.");
    } finally {
      setLoading(false);
    }
  };

  const prepareChartData = () => {
    if (!chartData) return null;

    const housesData = Object.entries(chartData.houses.cusps)
      .map(([num, deg]) => ({
        number: Number(num),
        cuspDegree: Number(deg),
      }))
      .sort((a, b) => a.number - b.number);

    const planetsData = Object.entries(chartData.planets).map(([name, p]: [string, any]) => ({
      name,
      longitude: Number(p.ecliptic_deg),
      sign: p.sign,
      signShort: p.sign_short,
      degInSign: Number(p.deg_in_sign),
      element: p.element,
      modality: p.modality,
      house: chartData.planet_house_map?.[name] || null,
    }));

    const parseAspectString = (s: string) => {
      const match = s.match(/^(\S+)\s+(.+?)\s+(\S+)\s*\(([-\d.]+)°\)/);
      if (!match) return null;
      const [, p1, aspectRu, p2, diff] = match;
      return { from: p1, to: p2, type: aspectRu, orb: Number(diff) };
    };

    const aspectsData = (chartData.aspects || []).map(parseAspectString).filter((x: any): x is any => Boolean(x));

    return { housesData, planetsData, aspectsData };
  };

  const data = prepareChartData();

  return (
    <>
      <Helmet>
        <title>Натальная Карта - Расчет и Интерпретация | НейроДзен</title>
        <meta
          name="description"
          content="Рассчитайте свою натальную карту онлайн бесплатно. Астрологический анализ планет, домов и аспектов в вашем гороскопе рождения."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950">
        <Header />

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-white">Расчет Натальной Карты</h1>

            <Card className="mb-8 bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-purple-900">Данные рождения</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="date" className="text-purple-900">
                      Дата рождения *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={error && !date ? "border-red-500" : ""}
                    />
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-purple-900">
                      Время рождения *
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={error && !time ? "border-red-500" : ""}
                    />
                  </div>

                  <div className="relative">
                    <Label htmlFor="city" className="text-purple-900">
                      Город рождения *
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      value={cityQuery}
                      onChange={(e) => {
                        const value = e.target.value;
                        setCityQuery(value);
                        setSelectedCity(null);
                        searchCities(value);
                      }}
                      onFocus={() => {
                        if (cityOptions.length > 0) setShowCityDropdown(true);
                      }}
                      onBlur={() => {
                        setTimeout(() => setShowCityDropdown(false), 200);
                      }}
                      placeholder="Москва, Санкт-Петербург, Череповец..."
                      className={error && !cityQuery ? "border-red-500" : ""}
                      autoComplete="off"
                    />

                    {cityLoading && <div className="absolute right-2 top-8 text-xs text-purple-500">ищу...</div>}

                    {showCityDropdown && cityOptions.length > 0 && (
                      <div className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-purple-200 bg-white shadow-lg">
                        {cityOptions.map((opt) => (
                          <button
                            key={`${opt.lat}-${opt.lon}-${opt.display_name}`}
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              setSelectedCity(opt);
                              setCityQuery(opt.display_name || opt.name || "");
                              setCityLat(String(opt.lat));
                              setCityLon(String(opt.lon));
                              if (opt.tz) setCityTz(opt.tz);
                              setShowCityDropdown(false);
                            }}
                            className="flex w-full flex-col items-start px-3 py-2 text-left text-sm hover:bg-purple-50"
                          >
                            <span className="font-medium text-purple-900">{opt.display_name || opt.name}</span>
                            <span className="text-xs text-gray-500">
                              {opt.country} {opt.tz ? `· ${opt.tz}` : ""}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {selectedCity && (
                      <p className="mt-1 text-xs text-purple-700">
                        Координаты: {selectedCity.lat.toFixed(3)}, {selectedCity.lon.toFixed(3)}
                        {selectedCity.tz ? ` · Часовой пояс: ${selectedCity.tz}` : ""}
                      </p>
                    )}

                    {cityError && <p className="mt-1 text-xs text-red-500">{cityError}</p>}
                  </div>
                </div>

                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-purple-700 hover:text-purple-900 text-sm font-medium mb-4 flex items-center gap-1"
                  type="button"
                >
                  {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  Расширенные настройки
                </button>

                {showAdvanced && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-purple-50 rounded-lg">
                    <div>
                      <Label htmlFor="lat" className="text-purple-900">
                        Широта
                      </Label>
                      <Input
                        id="lat"
                        type="number"
                        step="0.0001"
                        value={cityLat}
                        onChange={(e) => setCityLat(e.target.value)}
                        placeholder="59.1269"
                      />
                    </div>

                    <div>
                      <Label htmlFor="lon" className="text-purple-900">
                        Долгота
                      </Label>
                      <Input
                        id="lon"
                        type="number"
                        step="0.0001"
                        value={cityLon}
                        onChange={(e) => setCityLon(e.target.value)}
                        placeholder="37.9097"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tz" className="text-purple-900">
                        Часовой пояс
                      </Label>
                      <Input
                        id="tz"
                        type="text"
                        value={cityTz}
                        onChange={(e) => setCityTz(e.target.value)}
                        placeholder="Europe/Moscow"
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Расчет...
                    </>
                  ) : (
                    "Рассчитать натальную карту"
                  )}
                </Button>
              </CardContent>
            </Card>

            {!chartData && !loading && (
              <div className="text-center text-white/70 py-12">
                <p className="text-lg">Введите данные рождения, чтобы построить натальную карту</p>
              </div>
            )}

            {data && chartData && (
              <>
                <NatalChartWheel
                  data={{
                    houses: data.housesData,
                    planets: data.planetsData,
                    aspects: data.aspectsData,
                  }}
                  birthInfo={{
                    date: chartData.date,
                    time: chartData.time,
                    location: chartData.city,
                  }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <PlanetsTable planets={data.planetsData} />
                  <HousesTable houses={data.housesData} housesReadable={chartData.houses_readable} />
                </div>

                <div className="mt-6">
                  <AspectsTable aspects={chartData.aspects || []} />
                </div>
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

// ─────────── колесо натальной карты ───────────

const ZODIAC_SIGNS = [
  { name: "Овен", symbol: "♈", startDegree: 0, color: "#EF4444" },
  { name: "Телец", symbol: "♉", startDegree: 30, color: "#10B981" },
  { name: "Близнецы", symbol: "♊", startDegree: 60, color: "#F59E0B" },
  { name: "Рак", symbol: "♋", startDegree: 90, color: "#C0C0C0" },
  { name: "Лев", symbol: "♌", startDegree: 120, color: "#FBBF24" },
  { name: "Дева", symbol: "♍", startDegree: 150, color: "#8B4513" },
  { name: "Весы", symbol: "♎", startDegree: 180, color: "#FFC0CB" },
  { name: "Скорпион", symbol: "♏", startDegree: 210, color: "#7C2D12" },
  { name: "Стрелец", symbol: "♐", startDegree: 240, color: "#A855F7" },
  { name: "Козерог", symbol: "♑", startDegree: 270, color: "#4B5563" },
  { name: "Водолей", symbol: "♒", startDegree: 300, color: "#06B6D4" },
  { name: "Рыбы", symbol: "♓", startDegree: 330, color: "#8B5CF6" },
];

const PLANET_GLYPHS: any = {
  Sun: { glyph: "☉", label: "Солнце", meaning: "Я, воля", color: "#F59E0B" },
  Moon: { glyph: "☽", label: "Луна", meaning: "эмоции", color: "#C0C0C0" },
  Mercury: { glyph: "☿", label: "Меркурий", meaning: "мысли", color: "#A3E635" },
  Venus: { glyph: "♀", label: "Венера", meaning: "любовь", color: "#EC4899" },
  Mars: { glyph: "♂", label: "Марс", meaning: "действие", color: "#EF4444" },
  Jupiter: { glyph: "♃", label: "Юпитер", meaning: "рост", color: "#F97316" },
  Saturn: { glyph: "♄", label: "Сатурн", meaning: "структура", color: "#6B7280" },
  Uranus: { glyph: "♅", label: "Уран", meaning: "свобода", color: "#06B6D4" },
  Neptune: { glyph: "♆", label: "Нептун", meaning: "мечты", color: "#8B5CF6" },
  Pluto: { glyph: "♇", label: "Плутон", meaning: "трансформация", color: "#7C2D12" },
};

const ASPECT_STYLES: any = {
  Соединение: { color: "#FFDC00", label: "Соединение 0°", meaning: "слияние" },
  Секстиль: { color: "#06B6D4", label: "Секстиль 60°", meaning: "возможности" },
  Квадрат: { color: "#EF4444", label: "Квадрат 90°", meaning: "напряжение" },
  Трин: { color: "#10B981", label: "Трин 120°", meaning: "поддержка" },
  Оппозиция: { color: "#DC2626", label: "Оппозиция 180°", meaning: "полярность" },
};

const NatalChartWheel = ({ data, birthInfo }: any) => {
  const [hoveredPlanet, setHoveredPlanet] = useState<any | null>(null);
  const [hoveredHouse, setHoveredHouse] = useState<number | null>(null);

  const centerX = 500;
  const centerY = 500;
  const outerRadius = 450;
  const zodiacRadius = 380;
  const houseRadius = 310;
  const planetRadius = 240;
  const centerRadius = 100;

  const firstHouse = data.houses.find((h: any) => h.number === 1);
  const ascAngle = firstHouse ? firstHouse.cuspDegree : 0;
  const rotationOffset = 90 - ascAngle;

  const applyRotation = (angle: number) => {
    return (angle + rotationOffset + 360) % 360;
  };

  const degToRad = (deg: number) => ((90 + deg) * Math.PI) / 180;

  const polarToCartesian = (angle: number, radius: number) => {
    const rotated = applyRotation(angle);
    const rad = degToRad(rotated);
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY - radius * Math.sin(rad),
    };
  };

  const angularPoints = [
    { name: "ASC", label: "Асцендент", house: 1, color: "#84CC16", glyph: "AC" },
    { name: "MC", label: "МС", house: 10, color: "#06B6D4", glyph: "MC" },
    { name: "DSC", label: "Десцендент", house: 7, color: "#059669", glyph: "DC" },
    { name: "IC", label: "IC", house: 4, color: "#0891B2", glyph: "IC" },
  ];

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-purple-100 text-center text-2xl">Колесо Натальной Карты</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="w-full max-w-[95vmin]">
          <svg viewBox="0 0 1000 1000" className="w-full h-auto">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="centerGlow">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#5E418F" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="centerFill">
                <stop offset="0%" stopColor="#1E1B4B" stopOpacity="1" />
                <stop offset="100%" stopColor="#312E81" stopOpacity="1" />
              </radialGradient>
            </defs>

            {/* фон */}
            <circle cx={centerX} cy={centerY} r={outerRadius} fill="url(#centerGlow)" opacity={0.5} />

            {/* зодиак */}
            {ZODIAC_SIGNS.map((sign) => {
              const startDeg = sign.startDegree;
              const endDeg = (sign.startDegree + 30) % 360;
              const midDeg = sign.startDegree + 15;

              const textPos = polarToCartesian(midDeg, zodiacRadius + 35);
              const symbolPos = polarToCartesian(midDeg, zodiacRadius + 15);

              const signInner = polarToCartesian(startDeg, zodiacRadius - 15);
              const signOuter = polarToCartesian(startDeg, outerRadius + 5);

              return (
                <g key={sign.name}>
                  <line
                    x1={signInner.x}
                    y1={signInner.y}
                    x2={signOuter.x}
                    y2={signOuter.y}
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                  />

                  <text
                    x={symbolPos.x}
                    y={symbolPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={sign.color}
                    fontSize={36}
                    fontWeight="bold"
                    filter="url(#glow)"
                  >
                    {sign.symbol}
                  </text>

                  <text
                    x={textPos.x}
                    y={textPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize={11}
                    opacity={0.7}
                  >
                    {sign.name}
                  </text>

                  {[10, 20].map((offset) => {
                    const deg = sign.startDegree + offset;
                    const inner = polarToCartesian(deg, zodiacRadius - 30);
                    const outer = polarToCartesian(deg, zodiacRadius - 20);
                    return (
                      <line
                        key={offset}
                        x1={inner.x}
                        y1={inner.y}
                        x2={outer.x}
                        y2={outer.y}
                        stroke="white"
                        strokeWidth={1}
                        opacity={0.2}
                      />
                    );
                  })}
                </g>
              );
            })}

            <circle
              cx={centerX}
              cy={centerY}
              r={zodiacRadius - 30}
              fill="none"
              stroke="white"
              strokeWidth={2}
              opacity={0.3}
            />

            {/* дома */}
            {data.houses.map((house: any, i: number) => {
              const nextHouse = data.houses[(i + 1) % data.houses.length];
              const startDeg = house.cuspDegree;
              const endDeg = nextHouse.cuspDegree;
              const midDeg = startDeg + (endDeg > startDeg ? (endDeg - startDeg) / 2 : (360 - startDeg + endDeg) / 2);

              const cuspPos = polarToCartesian(startDeg, houseRadius + 30);
              const numberPos = polarToCartesian(midDeg, houseRadius + 50);

              return (
                <g
                  key={house.number}
                  onMouseEnter={() => setHoveredHouse(house.number)}
                  onMouseLeave={() => setHoveredHouse(null)}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    d={`
                      M ${centerX} ${centerY}
                      L ${polarToCartesian(startDeg, houseRadius).x} ${polarToCartesian(startDeg, houseRadius).y}
                      A ${houseRadius} ${houseRadius} 0 ${endDeg - startDeg > 180 ? 1 : 0} 1
                      ${polarToCartesian(endDeg, houseRadius).x} ${polarToCartesian(endDeg, houseRadius).y}
                      Z
                    `}
                    fill={house.number % 2 === 0 ? "#8B5CF6" : "#6366F1"}
                    opacity={hoveredHouse === house.number ? 0.3 : 0.1}
                  />

                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={polarToCartesian(startDeg, houseRadius).x}
                    y2={polarToCartesian(startDeg, houseRadius).y}
                    stroke="#FFDC00"
                    strokeWidth={2}
                    opacity={0.5}
                  />

                  <text
                    x={numberPos.x}
                    y={numberPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize={16}
                    fontWeight="bold"
                  >
                    {house.number}
                  </text>

                  <text
                    x={cuspPos.x}
                    y={cuspPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#FFDC00"
                    fontSize={9}
                    opacity={0.8}
                  >
                    {Math.round(house.cuspDegree)}°
                  </text>
                </g>
              );
            })}

            <circle
              cx={centerX}
              cy={centerY}
              r={houseRadius}
              fill="none"
              stroke="white"
              strokeWidth={2}
              opacity={0.3}
            />

            {/* угловые точки */}
            {angularPoints.map((point) => {
              const house = data.houses.find((h: any) => h.number === point.house);
              if (!house) return null;

              const pos = polarToCartesian(house.cuspDegree, houseRadius + 15);
              const labelPos = polarToCartesian(house.cuspDegree, houseRadius + 45);

              return (
                <g key={point.name}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={12}
                    fill={point.color}
                    stroke="#FFDC00"
                    strokeWidth={2.5}
                    filter="url(#glow)"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize={9}
                    fontWeight="bold"
                  >
                    {point.glyph}
                  </text>
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={point.color}
                    fontSize={11}
                    fontWeight="bold"
                  >
                    {point.name}
                  </text>
                </g>
              );
            })}

            {/* аспекты */}
            {data.aspects.map((aspect: any, i: number) => {
              const fromPlanet = data.planets.find((p: any) => p.name === aspect.from);
              const toPlanet = data.planets.find((p: any) => p.name === aspect.to);
              if (!fromPlanet || !toPlanet) return null;

              const from = polarToCartesian(fromPlanet.longitude, planetRadius);
              const to = polarToCartesian(toPlanet.longitude, planetRadius);
              const style: any = ASPECT_STYLES[aspect.type] || {};

              return (
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={style.color || "#FFDC00"}
                  strokeWidth={2}
                  opacity={0.65}
                  filter="url(#glow)"
                />
              );
            })}

            {/* орбита планет */}
            <circle
              cx={centerX}
              cy={centerY}
              r={planetRadius}
              fill="none"
              stroke="white"
              strokeWidth={1}
              opacity={0.2}
              strokeDasharray="5,5"
            />

            {/* планеты */}
            {data.planets.map((planet: any) => {
              const pos = polarToCartesian(planet.longitude, planetRadius);
              const info = PLANET_GLYPHS[planet.name];
              if (!info) return null;

              return (
                <g
                  key={planet.name}
                  onMouseEnter={() => setHoveredPlanet(planet)}
                  onMouseLeave={() => setHoveredPlanet(null)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={hoveredPlanet?.name === planet.name ? 28 : 24}
                    fill={info.color}
                    stroke="#FFDC00"
                    strokeWidth={2}
                    filter="url(#glow)"
                    style={{ transition: "all 0.3s" }}
                  />

                  <text
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize={22}
                    fontWeight="bold"
                  >
                    {info.glyph}
                  </text>
                </g>
              );
            })}

            {/* центр */}
            <circle
              cx={centerX}
              cy={centerY}
              r={centerRadius}
              fill="url(#centerFill)"
              stroke="#FFDC00"
              strokeWidth={3}
              filter="url(#glow)"
            />

            {birthInfo && (
              <>
                <text
                  x={centerX}
                  y={centerY - 20}
                  textAnchor="middle"
                  fill="white"
                  fontSize={14}
                  opacity={0.9}
                  fontWeight={500}
                >
                  {birthInfo.date}
                </text>
                <text
                  x={centerX}
                  y={centerY + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize={14}
                  opacity={0.9}
                  fontWeight={500}
                >
                  {birthInfo.time}
                </text>
                <text x={centerX} y={centerY + 30} textAnchor="middle" fill="#FFDC00" fontSize={13} opacity={0.8}>
                  {birthInfo.location}
                </text>
              </>
            )}
          </svg>

          {hoveredPlanet && (
            <div className="mt-4 p-4 bg-purple-900/80 backdrop-blur-sm rounded-lg border border-yellow-400/30">
              <p className="text-white font-medium text-sm">
                {PLANET_GLYPHS[hoveredPlanet.name]?.label} · {Math.round(hoveredPlanet.longitude)}° {hoveredPlanet.sign}{" "}
                · {hoveredPlanet.house} дом
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// ─────────── таблицы ───────────

const PlanetsTable = ({ planets }: any) => (
  <Card className="bg-white/95 backdrop-blur">
    <CardHeader>
      <CardTitle className="text-purple-900">Планеты</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-purple-200">
              <th className="text-left py-2 px-2 text-purple-900">Планета</th>
              <th className="text-left py-2 px-2 text-purple-900">Знак</th>
              <th className="text-left py-2 px-2 text-purple-900">° в знаке</th>
              <th className="text-left py-2 px-2 text-purple-900">Дом</th>
              <th className="text-left py-2 px-2 text-purple-900">Стихия</th>
              <th className="text-left py-2 px-2 text-purple-900">Качество</th>
            </tr>
          </thead>
          <tbody>
            {planets.map((planet: any) => (
              <tr key={planet.name} className="border-b border-purple-100">
                <td className="py-2 px-2 font-medium text-purple-900">{planet.name}</td>
                <td className="py-2 px-2">{planet.sign}</td>
                <td className="py-2 px-2">{planet.degInSign.toFixed(2)}°</td>
                <td className="py-2 px-2">{planet.house ?? "-"}</td>
                <td className="py-2 px-2">{planet.element}</td>
                <td className="py-2 px-2">{planet.modality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

const HousesTable = ({ houses, housesReadable }: any) => (
  <Card className="bg-white/95 backdrop-blur">
    <CardHeader>
      <CardTitle className="text-purple-900">Дома</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-purple-200">
              <th className="text-left py-2 px-2 text-purple-900">Дом</th>
              <th className="text-left py-2 px-2 text-purple-900">Кусп, °</th>
              <th className="text-left py-2 px-2 text-purple-900">Положение</th>
            </tr>
          </thead>
          <tbody>
            {houses.map((house: any) => (
              <tr key={house.number} className="border-b border-purple-100">
                <td className="py-2 px-2 font-medium text-purple-900">{house.number}</td>
                <td className="py-2 px-2">{house.cuspDegree.toFixed(2)}°</td>
                <td className="py-2 px-2">{housesReadable?.[`H${house.number}`] || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

const AspectsTable = ({ aspects }: any) => (
  <Card className="bg-white/95 backdrop-blur">
    <CardHeader>
      <CardTitle className="text-purple-900">Аспекты</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-purple-200">
              <th className="text-left py-2 px-3 text-purple-900">Аспект</th>
            </tr>
          </thead>
          <tbody>
            {aspects.map((aspect: string, index: number) => (
              <tr key={index} className="border-b border-purple-100">
                <td className="py-2 px-3">{aspect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

export default NatalChartCalculator;
