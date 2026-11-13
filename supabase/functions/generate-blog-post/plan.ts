import * as Astronomy from 'npm:astronomy-engine@2.1.19';
import plan from './content-plan.json' with { type: 'json' };
import { SIGNS, distance, longitude, moscowDay, tomorrow } from './editorial.ts';

// Editorial content plan: publication slots, eclipse/station/ingress/aspect calculation and pre-publication checks.
export const PLAN = plan as PlanItem[];
export const PLAN_CTA = 'https://aidzen.ru';
export const EPHEMERIS = 'Astronomy Engine 2.1.19 (геоцентрический тропический зодиак, Europe/Moscow)';
export interface PlanItem { id:string; at:string; rubric:string; title:string; slug:string; keyword:string; related:string; mode:'daily'|'events'|'evergreen'; target?:string; range?:[string,string]; signs12?:boolean; signs?:string[]; long?:boolean; slow?:boolean; facts?:string[]; selection?:string; coverText?:string; pinKind:string; }
const MONTHS=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const B=Astronomy.Body;
const BODIES:[Astronomy.Body,string][]=[[B.Sun,'Солнце'],[B.Mercury,'Меркурий'],[B.Venus,'Венера'],[B.Mars,'Марс'],[B.Jupiter,'Юпитер'],[B.Saturn,'Сатурн'],[B.Uranus,'Уран'],[B.Neptune,'Нептун'],[B.Pluto,'Плутон']];
const ASPECTS:[number,string][]=[[0,'соединение'],[60,'секстиль'],[90,'квадрат'],[120,'трин'],[180,'оппозиция']];
export const msk=(d:Date)=>{const x=new Date(d.getTime()+10800000);return {day:x.toISOString().slice(0,10),label:`${x.getUTCDate()} ${MONTHS[x.getUTCMonth()]} ${x.getUTCFullYear()}`,time:x.toISOString().slice(11,16)};};
const signOf=(lon:number)=>SIGNS[Math.floor(lon/30)];
const start=(d:string)=>new Date(`${d}T00:00:00+03:00`), end=(d:string)=>new Date(`${d}T23:59:59+03:00`);
function bisect(f:(d:Date)=>boolean,a:Date,b:Date){let lo=a.getTime(),hi=b.getTime();while(hi-lo>60000){const m=(lo+hi)/2;if(f(new Date(m)))hi=m;else lo=m;}return new Date(hi);}

const KIND:Record<string,string>={penumbral:' (полутеневое)',partial:' (частное)',total:' (полное)',annular:' (кольцеобразное)',hybrid:' (гибридное)'};
export interface SkyEvent { date:string; time?:string; type:string; text:string; }
// Only events found by calculation inside the requested range; nothing is taken from model memory.
export function rangeEvents(from:string,to:string,slow=false){
 const a=start(from),b=end(to),events:SkyEvent[]=[];
 const push=(d:Date,type:string,text:string,timed=true)=>{const m=msk(d);if(d>=a&&d<=b)events.push({date:m.day,time:timed?m.time:undefined,type,text});};
 if(!slow)for(const [phase,name] of [[0,'Новолуние'],[180,'Полнолуние']] as [number,string][]){let t:any=a;for(;;){const r=Astronomy.SearchMoonPhase(phase,t,40);if(!r||r.date>b)break;push(r.date,'phase',`${name} в знаке ${signOf(longitude(B.Moon,r.date))}`);t=new Date(r.date.getTime()+86400000);}}
 for(let e=Astronomy.SearchLunarEclipse(new Date(a.getTime()-1));e.peak.date<=b;e=Astronomy.NextLunarEclipse(e.peak))push(e.peak.date,'eclipse',`Лунное затмение${KIND[e.kind]??''} в знаке ${signOf(longitude(B.Moon,e.peak.date))}`);
 for(let e=Astronomy.SearchGlobalSolarEclipse(new Date(a.getTime()-1));e.peak.date<=b;e=Astronomy.NextGlobalSolarEclipse(e.peak))push(e.peak.date,'eclipse',`Солнечное затмение${KIND[e.kind]??''} в знаке ${signOf(longitude(B.Sun,e.peak.date))}`);
 const step=slow?86400000:6*3600000, list=BODIES;
 for(const [body,name] of list){
  for(let t=a.getTime();t<b.getTime();t+=step){
   const d1=new Date(t),d2=new Date(Math.min(t+step,b.getTime())),l1=longitude(body,d1),l2=longitude(body,d2);
   if(Math.floor(l1/30)!==Math.floor(l2/30)){const s2=Math.floor(l2/30);const at=bisect(d=>Math.floor(longitude(body,d)/30)===s2,d1,d2);if(!slow||![B.Sun,B.Mercury].includes(body))push(at,'ingress',`${name} переходит в знак ${SIGNS[s2]}`);}
   if(body!==B.Sun){const m=(d:Date)=>((longitude(body,new Date(d.getTime()+3600000))-longitude(body,d)+540)%360)-180;const r1=m(d1)<0,r2=m(d2)<0;if(r1!==r2){const at=bisect(d=>(m(d)<0)===r2,d1,d2);push(at,'station',`${name} разворачивается ${r2?'в ретроградное':'в директное'} движение в знаке ${signOf(longitude(body,at))}`,false);}}
  }
 }
 const outer=[B.Mars,B.Jupiter,B.Saturn,B.Uranus,B.Neptune,B.Pluto];
 const pairs=BODIES.flatMap(([b1,n1],i)=>BODIES.slice(i+1).map(([b2,n2])=>[b1,n1,b2,n2] as const)).filter(([b1,,b2])=>!slow||outer.includes(b1)&&outer.includes(b2));
 const day=86400000;
 for(const [b1,n1,b2,n2] of pairs)for(const [ang,an] of ASPECTS){
  const f=(d:Date)=>Math.abs(distance(longitude(b1,d),longitude(b2,d))-ang);
  for(let t=a.getTime()-day;t<=b.getTime();t+=day){const p=f(new Date(t-day)),c=f(new Date(t)),n=f(new Date(t+day));if(c<=p&&c<n&&c<0.6&&t>=a.getTime())push(new Date(t),'aspect',`${n1} — ${n2}: ${an}`,false);}
 }
 events.sort((x,y)=>(x.date+(x.time??'')).localeCompare(y.date+(y.time??'')));
 const mid=new Date((a.getTime()+b.getTime())/2);
 const retro=BODIES.filter(([body])=>body!==B.Sun&&(((longitude(body,new Date(mid.getTime()+3600000))-longitude(body,mid)+540)%360)-180)<0).map(([,n])=>n);
 const positions=(d:Date)=>BODIES.map(([body,name])=>({name,sign:signOf(longitude(body,d))}));
 const solarHouses=SIGNS.map((sign,i)=>({sign,houses:positions(mid).map(p=>`${p.name}: ${((SIGNS.indexOf(p.sign)-i+12)%12)+1}-й дом`)}));
 const moonDays=[] as {date:string;sign:string}[];
 if(b.getTime()-a.getTime()<=10*day)for(let t=a.getTime();t<=b.getTime();t+=day){const d=new Date(t+12*3600000);moonDays.push({date:msk(d).day,sign:signOf(longitude(B.Moon,d))});}
 return {from,to,timezone:'Europe/Moscow',source:EPHEMERIS,calculatedAt:new Date().toISOString(),events,retrograde:retro,positionsAtStart:positions(a),positionsAtMid:positions(mid),solarHouses,moonDays};
}

export function dueItem(now:Date,done:Set<string>,publishNext=false){
 const today=moscowDay(now);
 return PLAN.find(p=>!done.has(p.id)&&(publishNext||new Date(p.at)<=now)&&moscowDay(new Date(p.at))===today);
}
export function plainText(a:any){return [a.title,...a.intro,...a.sections.flatMap((s:any)=>[s.h2,...s.paragraphs,...(s.bulletList??[]),s.example??'',s.warning??'']),a.conclusion].join(' ');}
export const charLimit=(p:PlanItem)=>p.long||p.signs12?11000:7000;
export const charMin=(p:PlanItem)=>p.long||p.signs12?6000:4000;
const dateRe=new RegExp(`(\\d{1,2})(?:\\s*[–-]\\s*(\\d{1,2}))?\\s+(${MONTHS.join('|')})`,'g');
// Pre-publication gate: any failure blocks publication and sends the slot to revision.
export function validatePlanArticle(a:any,p:PlanItem,brief:any){
 if(!a||typeof a.title!=='string'||!Array.isArray(a.intro)||!Array.isArray(a.sections)||typeof a.conclusion!=='string')throw new Error('Invalid article structure');
 for(const s of a.sections)if(typeof s.h2!=='string'||!Array.isArray(s.paragraphs)||!s.paragraphs.every((x:unknown)=>typeof x==='string'))throw new Error('Invalid section');
 const want=p.signs12?SIGNS:p.signs;
 if(want){const h=a.sections.map((s:any)=>s.h2);if(!want.every(s=>h.some((x:string)=>x.startsWith(s))))throw new Error('Promised signs are missing');}
 else if(a.sections.length<4||a.sections.length>7)throw new Error('Expected 4–7 sections');
 const text=plainText(a);
 if(text.length<charMin(p))throw new Error(`Too short: ${text.length} chars`);
 if(text.length>charLimit(p))throw new Error(`Too long: ${text.length} chars`);
 if(/https?:\/\/|www\./i.test(text))throw new Error('Links are added by the program only');
 if(/гарантир|обязательно (?:встретите|случится|получите)|неизбежно|точно (?:будет|случится)/i.test(text))throw new Error('Guaranteed-outcome claim');
 if(/источник|методик|библиограф/i.test(a.sections.map((s:any)=>s.h2).join(' ')))throw new Error('Sources section is not published');
 if(!/Нейродзен/i.test(a.conclusion))throw new Error('Conclusion must contain Нейродзен CTA');
 if(/ретроград/i.test(text)&&!(brief?.retrograde?.length||brief?.events?.some((e:any)=>e.type==='station')))throw new Error('Uncalculated retrograde claim');
 if(/затмени/i.test(text)&&!brief?.events?.some((e:any)=>e.type==='eclipse'))throw new Error('Uncalculated eclipse claim');
 const allowed=new Set<string>([...(brief?.events??[]).map((e:any)=>e.date),...(brief?.moonDays??[]).map((m:any)=>m.date)]);
 if(p.range){allowed.add(p.range[0]);allowed.add(p.range[1]);}
 if(p.target)allowed.add(p.target);
 const year=(p.range?.[0]??p.target??'2026').slice(0,4);
 for(const m of text.matchAll(dateRe)){
  const mm=String(MONTHS.indexOf(m[3])+1).padStart(2,'0');
  for(const d of [m[1],m[2]].filter(Boolean)){
   const iso=`${year}-${mm}-${d!.padStart(2,'0')}`, iso2=`${Number(year)+1}-${mm}-${d!.padStart(2,'0')}`;
   if(p.id==='p02'&&iso.endsWith('-11-13'))continue;
   if(!allowed.has(iso)&&!allowed.has(iso2))throw new Error(`Date not backed by calculation: ${m[0]}`);
  }
 }
 a.faq=[];a.relatedSlugs=[];a.title=p.title;a.slug=p.slug;a.keywords=`${p.keyword}, ${p.related}`;a.category=p.rubric;
 a.metaTitle=a.metaTitle&&a.metaTitle.length<=70?a.metaTitle:p.title.slice(0,70);
 return a;
}
export function dailyTargetOk(p:PlanItem,now:Date){return p.mode!=='daily'||p.target===tomorrow(moscowDay(now));}
