import * as Astronomy from 'npm:astronomy-engine@2.1.19';
import keywords from './keywords.json' with { type: 'json' };

export const KINDS = ['astrology_education', 'numerology_education', 'tomorrow_horoscope'] as const;
export type Kind = typeof KINDS[number];
export const SIGNS = ['Овен','Телец','Близнецы','Рак','Лев','Дева','Весы','Скорпион','Стрелец','Козерог','Водолей','Рыбы'];
export const DISCLAIMER = 'Астрология и нумерология — символические традиции, а не научно подтверждённые прогнозы. Общий гороскоп не заменяет индивидуальную натальную карту.';
export const moscowDay = (now: Date) => new Date(now.getTime()+10800000).toISOString().slice(0,10);
export const tomorrow = (day: string) => new Date(Date.parse(`${day}T12:00:00Z`)+86400000).toISOString().slice(0,10);
export const dateLabel = (day: string) => new Date(`${day}T12:00:00Z`).toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric',timeZone:'Europe/Moscow'});
export const distance = (a: number,b: number) => Math.abs(((a-b+540)%360)-180);
const bodies = [Astronomy.Body.Sun,Astronomy.Body.Moon,Astronomy.Body.Mercury,Astronomy.Body.Venus,Astronomy.Body.Mars,Astronomy.Body.Jupiter,Astronomy.Body.Saturn,Astronomy.Body.Uranus,Astronomy.Body.Neptune,Astronomy.Body.Pluto];
const names = ['Солнце','Луна','Меркурий','Венера','Марс','Юпитер','Сатурн','Уран','Нептун','Плутон'];
const meanings = ['самовыражение','эмоциональные потребности','мышление и общение','ценности и симпатии','инициатива','расширение опыта','ответственность и границы','обновление','воображение','глубокие изменения'];
const aspects = [{name:'соединение',angle:0,meaning:'объединение тем'},{name:'секстиль',angle:60,meaning:'возможность сотрудничества'},{name:'квадрат',angle:90,meaning:'напряжение и поиск решения'},{name:'трин',angle:120,meaning:'согласованность'},{name:'оппозиция',angle:180,meaning:'поиск баланса'}];
const astroSource = 'https://www.astro.com/astrology/in_intro_e.htm';
const houseSource = 'https://www.astro.com/astrology/in_house1_e.htm';
const numberSource = 'https://www.numerology.com/articles/about-numerology/single-digit-numbers-in-numerology/';
export function longitude(body: Astronomy.Body,date: Date): number {
 if(body===Astronomy.Body.Sun) return Astronomy.SunPosition(date).elon;
 if(body===Astronomy.Body.Moon) return Astronomy.EclipticGeoMoon(date).lon;
 return Astronomy.Ecliptic(Astronomy.GeoVector(body,date,true)).elon;
}
export function skyBrief(day: string) {
 const target=tomorrow(day), noon=new Date(`${target}T12:00:00+03:00`);
 const positions=bodies.map((body,i)=>{const lon=longitude(body,noon);return {name:names[i],longitude:lon,sign:SIGNS[Math.floor(lon/30)],signIndex:Math.floor(lon/30),meaning:meanings[i]};});
 // A sampled in-orb interval is not an exact event. Never invent perfection times.
 const found = [];
 for(let i=0;i<bodies.length;i++) for(let j=i+1;j<bodies.length;j++) for(const aspect of aspects) {
  let best={orb:Infinity,hour:0,separation:0};
  for(let hour=0;hour<24;hour++) {const at=new Date(`${target}T00:00:00+03:00`);at.setTime(at.getTime()+hour*3600000);const sep=distance(longitude(bodies[i],at),longitude(bodies[j],at));const orb=Math.abs(sep-aspect.angle);if(orb<best.orb)best={orb,hour,separation:sep};}
  if(best.orb<=3)found.push({id:`${i}-${j}-${aspect.angle}`,first:names[i],second:names[j],...aspect,...best});
 }
 found.sort((a,b)=>a.orb-b.orb);
 const facts=[`Дата: ${dateLabel(target)}. Геоцентрический тропический зодиак; положения на 12:00 МСК.`,...positions.map(p=>`${p.name}: ${p.sign}, ${(p.longitude%30).toFixed(2)}°.`),`Основные аспекты: орбис до 3°, почасовая выборка в пределах суток МСК; указанный час — ближайший образец, не момент точного аспекта.`,...found.map(a=>`${a.first} — ${a.second}: ${a.name} (${a.angle}°); орбис ${a.orb.toFixed(2)}° в ${String(a.hour).padStart(2,'0')}:00 МСК.`)];
 return {target,positions,aspects:found,facts,method:'Astronomy Engine 2.1.19; геоцентрическая эклиптика даты. Солнечные цельнознаковые дома: знак читателя принят за первый дом, это не расчёт асцендента.',sources:['https://github.com/cosinekitty/astronomy/tree/v2.1.19',astroSource,houseSource]};
}
export interface Lesson { key:string; kind:Kind; title:string; slug:string; keywords:string; facts:string[]; sources:string[]; frequency:number; }
export function lessons(): Lesson[] {
 const out:Lesson[]=[];
 const add=(key:string,kind:Kind,title:string,patterns:string[],facts:string[],sources:string[])=>{
  const matches=keywords.filter(k=>patterns.some(p=>k.phrase.includes(p)));
  if(!matches.length)return;
  out.push({key,kind,title,slug:`uchebnik-${key}`,keywords:matches.map(k=>k.phrase).join(', '),facts,sources,frequency:Math.max(...matches.map(k=>Number(k.suppliedFrequency)||0))});
 };
 const houseThemes=['личность и способ самопредъявления','ресурсы и личные ценности','общение и ближайшее окружение','дом и семейные корни','творчество и самовыражение','повседневные обязанности','партнёрство','общие ресурсы','мировоззрение и обучение','общественная роль и карьера','сообщества и коллективные цели','уединение и скрытые процессы'];
 for(let i=1;i<=12;i++)add(`dom-${i}`,'astrology_education',`${i} дом в астрологии: значение и правила чтения`,[`${i} дом в астрологии`],[`В западной традиции дом ${i} связывают с темой: ${houseThemes[i-1]}.`,`Положение дома зависит от системы домов. Куспиды обычно требуют точного времени и места рождения. В цельнознаковой системе каждый знак занимает один дом.`,`Нельзя делать вывод по одному дому без управителя, планет и аспектов. Не вычисляй карту вымышленного человека.`],[houseSource]);
 for(let i=0;i<names.length;i++)add(`planeta-${i}`,'astrology_education',`${names[i]} в астрологии: что символизирует планета`,[`${names[i].toLowerCase()} в астрологии`],[`${names[i]} традиционно символизирует: ${meanings[i]}.`,`Планета, знак, дом и аспект — разные части интерпретации. Символика не доказывает причинное влияние на характер.`],[astroSource]);
 add('aspekty','astrology_education','Аспекты в астрологии: углы, орбисы и значения',['аспекты в астрологии','квадрат в астрологии'],aspects.map(a=>`${a.name}: ${a.angle}°, ${a.meaning}; это традиционная интерпретация. Орбис — отклонение от точного угла.`),[astroSource]);
 add('doma','astrology_education','Дома в астрологии: за что отвечают и как их читать',['дома в астрологии','карта домов'],houseThemes.map((m,i)=>`Дом ${i+1}: ${m}.`),[houseSource]);
 add('natalnaya-karta','astrology_education','Натальная карта: планеты, знаки, дома и точность расчёта',['натальная','астрология карта','астрология расчет','астрология рассчитать'],['Для натальной карты нужны дата, точное время и место рождения. Без времени нельзя надёжно установить асцендент и дома.','Знак — сектор тропической эклиптики в 30 градусов, а не одноимённое созвездие.','Аспекты — угловые отношения планет. Интерпретация не является научным прогнозом.'],[astroSource,houseSource]);
 add('zapadnaya-i-vedicheskaya','astrology_education','Западная и ведическая астрология: различия систем',['ведическая','джйотиш','джойтиш','индийская','западная'],['Западная тропическая система отсчитывает зодиак от весеннего равноденствия.','В сидерических школах используют аянамшу; её выбор должен быть назван. Нельзя смешивать сидерические и тропические положения.','Не приводить рассчитанные ведические положения без явных настроек и расчёта.'],['https://www.astro.com/astrowiki/en/Sidereal_Zodiac']);
 const arcana=['Маг','Верховная Жрица','Императрица','Император','Иерофант','Влюблённые','Колесница','Справедливость','Отшельник','Колесо Фортуны','Сила','Повешенный','Смерть','Умеренность','Дьявол','Башня','Звезда','Луна','Солнце','Суд','Мир','Шут'];
 const symbols=['инициатива и навыки','наблюдение и внутреннее знание','забота и творчество','порядок и ответственность','обучение и традиция','выбор и ценности','направление и самодисциплина','взвешенность и последствия решений','самоанализ','циклы и изменчивость','самообладание','смена взгляда','завершение и обновление','умеренность','привязанности','пересмотр неустойчивых структур','надежда','неопределённость и воображение','ясность и жизненность','пересмотр опыта','целостность','новое начало'];
 for(let i=1;i<=22;i++)add(`arkan-${i}`,'numerology_education',`${i} аркан в Матрице судьбы: символика и границы трактовки`,[`${i} в матрице судьбы`,`${i} аркан в матрице судьбы`,...(i===19?['19 матрица судьбы']:[])],[`Используемая в этих материалах нумерация 22 арканов: ${i} — ${arcana[i-1]}. В этой convention 8 — Справедливость, 11 — Сила, 22 — Шут; в других колодах порядок может отличаться.`,`Традиционная символическая тема: ${symbols[i-1]}.`,`Матрица судьбы — современная эзотерическая система, не классическая однозначная нумерология. Не выдумывай формулу расчёта, позиции карты, кармические программы, диагнозы и предсказания.`,`Значение аркана само по себе не определяет события жизни; символика — повод для размышления.`],['https://matrixdestiny.io/en/methodology','https://destinymatrix.org/']);
 add('matrica-metody','numerology_education','Матрица судьбы по дате рождения: методы и ограничения',['матрица судьбы по дате','расчет матрицы','рассчитать матрицу','матрица судьбы калькулятор','что значит матрица'],['Матрица судьбы использует символику 22 арканов. Различные школы могут использовать разные схемы и редукцию чисел.','Сложение цифр до 1–9 не является универсальной формулой Матрицы судьбы. Без названной и подтверждённой методики не приводить расчёт матрицы.','В западной нумерологии число жизненного пути получают редукцией цифр даты; правила мастер-чисел различаются по школе. Не смешивать это с арканами.'],['https://matrixdestiny.io/en/methodology',numberSource]);
 add('matrica-sovmestimost','numerology_education','Совместимость Матрицы судьбы: как читать символы без фатализма',['матрица судьбы совместимость','совместимость арканов','матрица судьбы рассчитать совместимость'],['Совместимость в этой традиции — символическая интерпретация, не измеренная вероятность успеха отношений.','Не вводить универсальные формулы, программы или значения позиций без выбранной методики. Сосредоточиться на различиях методов и ограничениях.'],['https://matrixdestiny.io/en/methodology']);
 return out.sort((a,b)=>b.frequency-a.frequency);
}
export function validateArticle(a:any,kind:Kind,brief:any,existing:string[]) {
 if(!a || typeof a.title!=='string' || typeof a.metaTitle!=='string' || typeof a.metaDescription!=='string' || !Array.isArray(a.intro) || !a.intro.every((p:unknown)=>typeof p==='string') || !Array.isArray(a.sections) || !a.sections.length || !Array.isArray(a.faq) || a.faq.length<4 || typeof a.conclusion!=='string')throw new Error('Invalid article structure');
 for(const s of a.sections)if(typeof s.h2!=='string'||!Array.isArray(s.paragraphs)||!s.paragraphs.every((p:unknown)=>typeof p==='string')||(s.bulletList&&!s.bulletList.every((p:unknown)=>typeof p==='string')))throw new Error('Invalid article section');
 for(const q of a.faq)if(typeof q.question!=='string'||typeof q.answer!=='string')throw new Error('Invalid FAQ');
 a.relatedSlugs=(a.relatedSlugs??[]).filter((s:string)=>existing.includes(s)).slice(0,3);
 if(kind==='tomorrow_horoscope') {
  if(a.sections.length!==12||a.sections.some((s:any,i:number)=>s.h2!==SIGNS[i]))throw new Error('Horoscope must contain all twelve signs in order');
  // AI authors reflection only. Dated/numerical astronomy comes exclusively from deterministic facts.
  const prose=[...a.intro,...a.sections.flatMap((s:any)=>[s.h2,...s.paragraphs,...(s.bulletList??[]),s.example??'',s.warning??'']),...a.faq.flatMap((q:any)=>[q.question,q.answer]),a.conclusion].join(' ');
  if(/\d/.test(prose)||/ретроград|затмени|новолуни|полнолуни|станци|ингресс|входит в знак|переходит в знак/i.test(prose))throw new Error('Uncomputed astronomical claim in horoscope prose');
  a.title=`Гороскоп на ${dateLabel(brief.target)} для всех знаков зодиака`;
  a.metaTitle=a.title;
  a.metaDescription=`Гороскоп на ${dateLabel(brief.target)}: символические рекомендации для всех знаков по рассчитанным положениям планет и аспектам дня.`;
 }
 a.intro.unshift(DISCLAIMER);
 a.sections.unshift({h2:kind==='tomorrow_horoscope'?'Рассчитанные положения и аспекты дня':'Основа материала',paragraphs:brief.facts});
 a.sections.push({h2:'Источники и методика',paragraphs:[...(brief.method?[brief.method]:[]),...brief.sources]});
 return a;
}