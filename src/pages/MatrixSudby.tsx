import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Названия 22 арканов
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

// Редукция к 1–22
const calculateArcana = (num: number): number => {
  let n = Math.abs(parseInt(String(num), 10) || 0);
  if (n === 0) return 22;
  while (n > 22) {
    n = n
      .toString()
      .split("")
      .reduce((sum, d) => sum + (parseInt(d, 10) || 0), 0);
    if (n === 0) n = 22;
  }
  return n;
};

interface MatrixData {
  Day: number;
  Month: number;
  Year: number;
  Bottom: number;
  Center: number;
  TL: number;
  TR: number;
  BR: number;
  BL: number;
  SkyDestiny: number;
  EarthDestiny: number;
  PersonalDestiny: number;
  MaleRod: number;
  FemaleRod: number;
  SocialDestiny: number;
  PlanetDestiny: number;
  lovePoint: number;
  moneyPoint: number;
  talentPoint: number;
}

export default function MatrixSudby() {
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState("");
  const [matrix, setMatrix] = useState<MatrixData | null>(null);

  const handleCalculate = () => {
    if (!birthDate) return;
    
    const [year, month, day] = birthDate.split("-").map(Number);
    if (!day || !month || !year || day > 31 || month > 12 || year < 1000) {
      return;
    }

    // Расчет матрицы
    const Day = calculateArcana(day);
    const Month = calculateArcana(month);
    const yearDigitsSum = String(year)
      .split("")
      .reduce((acc, val) => acc + Number(val), 0);
    const Year = calculateArcana(yearDigitsSum);
    const Bottom = calculateArcana(Day + Month + Year);
    const Center = calculateArcana(Day + Month + Year + Bottom);

    // Родовой квадрат
    const TL = calculateArcana(Day + Month);
    const TR = calculateArcana(Month + Year);
    const BR = calculateArcana(Year + Bottom);
    const BL = calculateArcana(Bottom + Day);

    // Предназначения
    const SkyDestiny = calculateArcana(Month + Bottom);
    const EarthDestiny = calculateArcana(Day + Year);
    const PersonalDestiny = calculateArcana(SkyDestiny + EarthDestiny);
    const MaleRod = calculateArcana(TL + BR);
    const FemaleRod = calculateArcana(TR + BL);
    const SocialDestiny = calculateArcana(MaleRod + FemaleRod);
    const PlanetDestiny = calculateArcana(PersonalDestiny + SocialDestiny);

    // Внутренние точки
    const sky_inner_bottom = calculateArcana(Center + Bottom);
    const sky_middle_bottom = calculateArcana(Bottom + sky_inner_bottom);
    const earth_inner_right = calculateArcana(Center + Year);
    const earth_middle_right = calculateArcana(Year + earth_inner_right);

    const lovePoint = calculateArcana(sky_middle_bottom + sky_inner_bottom);
    const moneyPoint = calculateArcana(earth_middle_right + earth_inner_right);
    const talentPoint = calculateArcana(Day + sky_inner_bottom);

    setMatrix({
      Day,
      Month,
      Year,
      Bottom,
      Center,
      TL,
      TR,
      BR,
      BL,
      SkyDestiny,
      EarthDestiny,
      PersonalDestiny,
      MaleRod,
      FemaleRod,
      SocialDestiny,
      PlanetDestiny,
      lovePoint,
      moneyPoint,
      talentPoint,
    });
  };

  const handleAnalysis = () => {
    // Перенаправление на регистрацию
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Helmet>
        <title>Рассчитать матрицу судьбы онлайн бесплатно | NeuroDzen</title>
        <meta
          name="description"
          content="Бесплатный расчет матрицы судьбы по дате рождения. Узнайте своё предназначение, таланты и энергии через нумерологию и 22 аркана Таро."
        />
        <meta name="keywords" content="матрица судьбы, расчет матрицы, нумерология, арканы таро, предназначение" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="NeuroDzen" className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                NeuroDzen
              </span>
            </div>
            <Button variant="default" onClick={() => navigate("/")}>
              На главную
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 max-w-6xl">
          <article>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Матрица судьбы: рассчитать онлайн бесплатно
            </h1>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Матрица судьбы — это система самопознания, основанная на нумерологии и арканах Таро. 
                Она показывает ваши сильные стороны, таланты, кармические задачи и предназначение через дату рождения.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Введите дату рождения и получите персональный расчет матрицы судьбы с основными энергиями и точками.
              </p>
            </div>

            {/* Calculator Card */}
            <Card className="mb-12">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="birthDate" className="text-lg font-semibold mb-2 block">
                      Дата рождения
                    </Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="text-lg"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <Button 
                    onClick={handleCalculate}
                    disabled={!birthDate}
                    className="w-full text-lg py-6"
                    size="lg"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Рассчитать матрицу
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {matrix && (
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold mb-6">Ваша матрица судьбы</h2>

                    {/* Личный квадрат */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-semibold mb-4 text-primary">Личный квадрат</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">День (Духовное)</div>
                          <div className="text-2xl font-bold">{matrix.Day}</div>
                          <div className="text-xs text-muted-foreground">{ARCANA_NAMES[matrix.Day]}</div>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Месяц (Небо)</div>
                          <div className="text-2xl font-bold">{matrix.Month}</div>
                          <div className="text-xs text-muted-foreground">{ARCANA_NAMES[matrix.Month]}</div>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Год (Материальное)</div>
                          <div className="text-2xl font-bold">{matrix.Year}</div>
                          <div className="text-xs text-muted-foreground">{ARCANA_NAMES[matrix.Year]}</div>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Низ (Земля)</div>
                          <div className="text-2xl font-bold">{matrix.Bottom}</div>
                          <div className="text-xs text-muted-foreground">{ARCANA_NAMES[matrix.Bottom]}</div>
                        </div>
                      </div>
                      <div className="mt-4 bg-primary/10 p-6 rounded-lg text-center">
                        <div className="text-sm text-muted-foreground mb-2">Центр личности</div>
                        <div className="text-4xl font-bold text-primary">{matrix.Center}</div>
                        <div className="text-lg mt-2">{ARCANA_NAMES[matrix.Center]}</div>
                      </div>
                    </div>

                    {/* Родовой квадрат */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-semibold mb-4 text-primary">Родовой квадрат</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Духовное отца</div>
                          <div className="text-2xl font-bold">{matrix.TL}</div>
                          <div className="text-xs text-muted-foreground">{ARCANA_NAMES[matrix.TL]}</div>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Духовное матери</div>
                          <div className="text-2xl font-bold">{matrix.TR}</div>
                          <div className="text-xs text-muted-foreground">{ARCANA_NAMES[matrix.TR]}</div>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Материальное матери</div>
                          <div className="text-2xl font-bold">{matrix.BR}</div>
                          <div className="text-xs text-muted-foreground">{ARCANA_NAMES[matrix.BR]}</div>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Материальное отца</div>
                          <div className="text-2xl font-bold">{matrix.BL}</div>
                          <div className="text-xs text-muted-foreground">{ARCANA_NAMES[matrix.BL]}</div>
                        </div>
                      </div>
                    </div>

                    {/* Предназначения */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-semibold mb-4 text-primary">Предназначения</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-accent/20 p-6 rounded-lg text-center">
                          <div className="text-sm text-muted-foreground mb-2">Личное</div>
                          <div className="text-3xl font-bold text-accent">{matrix.PersonalDestiny}</div>
                          <div className="text-sm mt-1">{ARCANA_NAMES[matrix.PersonalDestiny]}</div>
                        </div>
                        <div className="bg-accent/20 p-6 rounded-lg text-center">
                          <div className="text-sm text-muted-foreground mb-2">Социальное</div>
                          <div className="text-3xl font-bold text-accent">{matrix.SocialDestiny}</div>
                          <div className="text-sm mt-1">{ARCANA_NAMES[matrix.SocialDestiny]}</div>
                        </div>
                        <div className="bg-accent/20 p-6 rounded-lg text-center">
                          <div className="text-sm text-muted-foreground mb-2">Планетарное</div>
                          <div className="text-3xl font-bold text-accent">{matrix.PlanetDestiny}</div>
                          <div className="text-sm mt-1">{ARCANA_NAMES[matrix.PlanetDestiny]}</div>
                        </div>
                      </div>
                    </div>

                    {/* Ключевые точки */}
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-primary">Ключевые точки</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-6 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-2">Любовь</div>
                          <div className="text-3xl font-bold">{matrix.lovePoint}</div>
                          <div className="text-sm mt-1">{ARCANA_NAMES[matrix.lovePoint]}</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-2">Деньги</div>
                          <div className="text-3xl font-bold">{matrix.moneyPoint}</div>
                          <div className="text-sm mt-1">{ARCANA_NAMES[matrix.moneyPoint]}</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-2">Талант</div>
                          <div className="text-3xl font-bold">{matrix.talentPoint}</div>
                          <div className="text-sm mt-1">{ARCANA_NAMES[matrix.talentPoint]}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CTA for Analysis */}
                <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Хотите получить полный анализ матрицы?</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                      Получите детальную расшифровку каждого аркана, персональные рекомендации по развитию 
                      и работе с энергиями. Узнайте, как использовать свои таланты и раскрыть потенциал.
                    </p>
                    <Button 
                      size="lg" 
                      onClick={handleAnalysis}
                      className="text-lg px-8 py-6"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Получить полный анализ
                    </Button>
                    <p className="text-xs text-muted-foreground mt-4">
                      Для получения анализа необходима регистрация
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Info Section */}
            <div className="mt-12 prose prose-lg max-w-none">
              <h2>Что показывает матрица судьбы</h2>
              <p className="text-muted-foreground leading-relaxed">
                Матрица судьбы — это карта вашей жизни, построенная на основе даты рождения. 
                Каждое число в матрице соответствует одному из 22 арканов Таро и несет определенную энергию.
              </p>
              
              <h3>Основные элементы матрицы:</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Личный квадрат</strong> — показывает ваши природные качества и способ взаимодействия с миром</li>
                <li><strong>Родовой квадрат</strong> — отражает программы, полученные от родителей</li>
                <li><strong>Предназначения</strong> — три уровня реализации: личный, социальный и планетарный</li>
                <li><strong>Точки любви, денег и таланта</strong> — показывают, как проявляются эти сферы в вашей жизни</li>
              </ul>

              <h3>Как использовать расчет матрицы</h3>
              <p className="text-muted-foreground leading-relaxed">
                Расчет матрицы судьбы помогает понять свои сильные и слабые стороны, увидеть повторяющиеся 
                паттерны в жизни и найти путь к реализации своего потенциала. Это инструмент для самопознания 
                и саморазвития, который дает конкретные подсказки для каждой сферы жизни.
              </p>
            </div>
          </article>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/40 mt-20">
          <div className="container py-8 text-center text-sm text-muted-foreground">
            <p>© 2025 NeuroDzen. Все права защищены.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
