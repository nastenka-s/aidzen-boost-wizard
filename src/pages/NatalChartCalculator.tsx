import { useState } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";

const NatalChartCalculator = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [cityLat, setCityLat] = useState("");
  const [cityLon, setCityLon] = useState("");
  const [cityTz, setCityTz] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState(null);

  const validateForm = () => {
    if (!date || !time || !city) {
      setError("Пожалуйста, заполните дату, время и город рождения");
      return false;
    }
    return true;
  };

  const handleCalculate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setChartData(null);

    const payload: any = { date, time, city };
    if (cityLat) payload.city_lat = Number(cityLat);
    if (cityLon) payload.city_lon = Number(cityLon);
    if (cityTz) payload.city_tz = cityTz;

    try {
      const res = await fetch("https://api.aidzen.ru/api/natal_chart_summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status !== "success") {
        setError(data.error || "Ошибка при расчете натальной карты");
        return;
      }

      setChartData(data.summary);
    } catch (err) {
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

    const parseAspectString = (s) => {
      const match = s.match(/^(\S+)\s+(.+?)\s+(\S+)\s*\(([-\d.]+)°\)/);
      if (!match) return null;
      const [, p1, aspectRu, p2, diff] = match;
      return { from: p1, to: p2, type: aspectRu, orb: Number(diff) };
    };

    const aspectsData = (chartData.aspects || [])
      .map(parseAspectString)
      .filter(Boolean);

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
            <h1 className="text-4xl font-bold text-center mb-8 text-white">
              Расчет Натальной Карты
            </h1>

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

                  <div>
                    <Label htmlFor="city" className="text-purple-900">
                      Город рождения *
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Например: Москва"
                      className={error && !city ? "border-red-500" : ""}
                    />
                  </div>
                </div>

                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-purple-700 hover:text-purple-900 text-sm font-medium mb-4 flex items-center gap-1"
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
                <p className="text-lg">
                  Введите данные рождения, чтобы построить натальную карту
                </p>
              </div>
            )}

            {data && chartData && (
              <div className="space-y-8">
                <NatalChartWheel
                  houses={data.housesData}
                  planets={data.planetsData}
                  aspects={data.aspectsData}
                  birthInfo={{
                    date: chartData.date,
                    time: chartData.time,
                    city: chartData.city,
                  }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <PlanetsTable planets={data.planetsData} />
                  <HousesTable houses={data.housesData} housesReadable={chartData.houses_readable} />
                </div>

                <AspectsTable aspects={chartData.aspects || []} />
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

const NatalChartWheel = ({ houses, planets, aspects, birthInfo }) => {
  const centerX = 250;
  const centerY = 250;
  const outerRadius = 230;
  const zodiacRadius = 200;
  const houseRadius = 160;
  const planetRadius = 120;

  const polarToCartesian = (degree, radius) => {
    const rad = ((degree - 90) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad),
    };
  };

  const zodiacSigns = [
    { name: "Овен", symbol: "♈", start: 0 },
    { name: "Телец", symbol: "♉", start: 30 },
    { name: "Близнецы", symbol: "♊", start: 60 },
    { name: "Рак", symbol: "♋", start: 90 },
    { name: "Лев", symbol: "♌", start: 120 },
    { name: "Дева", symbol: "♍", start: 150 },
    { name: "Весы", symbol: "♎", start: 180 },
    { name: "Скорпион", symbol: "♏", start: 210 },
    { name: "Стрелец", symbol: "♐", start: 240 },
    { name: "Козерог", symbol: "♑", start: 270 },
    { name: "Водолей", symbol: "♒", start: 300 },
    { name: "Рыбы", symbol: "♓", start: 330 },
  ];

  const getZodiacArc = (startDeg, endDeg, radius) => {
    const start = polarToCartesian(startDeg, radius);
    const end = polarToCartesian(endDeg, radius);
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  return (
    <Card className="bg-white/95 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-purple-900 text-center">Колесо Натальной Карты</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <svg width={500} height={500}>
          <circle
            cx={centerX}
            cy={centerY}
            r={outerRadius}
            fill="#1e1030"
            stroke="#A855F7"
            strokeWidth="2"
          />

          {zodiacSigns.map((sign) => {
            const startDeg = sign.start;
            const endDeg = sign.start + 30;
            const midDeg = startDeg + 15;
            const labelPos = polarToCartesian(midDeg, zodiacRadius);
            return (
              <g key={sign.name}>
                <path
                  d={getZodiacArc(startDeg, endDeg, zodiacRadius)}
                  fill="none"
                  stroke="#4C1D95"
                  strokeWidth="24"
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="16"
                  fill="#E9D5FF"
                >
                  {sign.symbol}
                </text>
              </g>
            );
          })}

          {houses.map((house, i) => {
            const startDeg = house.cuspDegree;
            const nextHouse = houses[(i + 1) % houses.length];
            const endDeg = nextHouse ? nextHouse.cuspDegree : startDeg + 30;
            const midDeg =
              endDeg > startDeg
                ? startDeg + (endDeg - startDeg) / 2
                : startDeg + (360 - startDeg + endDeg) / 2;

            const cuspPos = polarToCartesian(startDeg, houseRadius);
            const numberPos = polarToCartesian(midDeg, houseRadius - 20);

            return (
              <g key={house.number}>
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={cuspPos.x}
                  y2={cuspPos.y}
                  stroke="#FDE68A"
                  strokeWidth="2"
                  opacity="0.7"
                />
                <text
                  x={numberPos.x}
                  y={numberPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="14"
                  fill="#FDE68A"
                  fontWeight="bold"
                >
                  {house.number}
                </text>
              </g>
            );
          })}

          <circle
            cx={centerX}
            cy={centerY}
            r={planetRadius}
            fill="none"
            stroke="#A855F7"
            strokeWidth="1"
            opacity="0.5"
          />

          {planets.map((planet) => {
            const pos = polarToCartesian(planet.longitude, planetRadius);
            return (
              <g key={planet.name}>
                <circle cx={pos.x} cy={pos.y} r={8} fill="#FCD34D" />
                <text
                  x={pos.x}
                  y={pos.y - 14}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#E9D5FF"
                >
                  {planet.name}
                </text>
              </g>
            );
          })}

          {aspects.map((asp, index) => {
            const from = planets.find((p) => p.name === asp.from);
            const to = planets.find((p) => p.name === asp.to);
            if (!from || !to) return null;

            const fromPos = polarToCartesian(from.longitude, planetRadius);
            const toPos = polarToCartesian(to.longitude, planetRadius);

            let color = "#FDE68A";
            if (asp.type.includes("Квадрат")) color = "#F97373";
            if (asp.type.includes("Трин")) color = "#6EE7B7";
            if (asp.type.includes("Оппозиция")) color = "#FB7185";

            return (
              <line
                key={index}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke={color}
                strokeWidth="1.5"
                opacity="0.7"
              />
            );
          })}

          <circle cx={centerX} cy={centerY} r={40} fill="#4C1D95" opacity="0.8" />
          <text
            x={centerX}
            y={centerY - 6}
            textAnchor="middle"
            fontSize="12"
            fill="#E9D5FF"
          >
            {birthInfo.date}
          </text>
          <text
            x={centerX}
            y={centerY + 10}
            textAnchor="middle"
            fontSize="11"
            fill="#E9D5FF"
          >
            {birthInfo.time} · {birthInfo.city}
          </text>
        </svg>
      </CardContent>
    </Card>
  );
};

const PlanetsTable = ({ planets }) => (
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
            {planets.map((planet) => (
              <tr key={planet.name} className="border-b border-purple-100">
                <td className="py-2 px-2 font-medium text-purple-900">{planet.name}</td>
                <td className="py-2 px-2">{planet.sign}</td>
                <td className="py-2 px-2">{planet.degInSign.toFixed(2)}°</td>
                <td className="py-2 px-2">{planet.house || "-"}</td>
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

const HousesTable = ({ houses, housesReadable }) => (
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
            {houses.map((house) => (
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

const AspectsTable = ({ aspects }) => (
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
            {aspects.map((aspect, index) => (
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
