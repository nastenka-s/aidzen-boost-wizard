import { assertEquals, assert, assertThrows } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { PLAN, rangeEvents, dueItem, validatePlanArticle, dailyTargetOk, charLimit, charMin } from './plan.ts';
import { SIGNS } from './editorial.ts';
const FILL='слово '.repeat(1000);
const ok=(over:any={})=>({title:'x',intro:['Короткий лид.'],sections:[{h2:'Раз',paragraphs:[FILL]},{h2:'Два',paragraphs:['Текст.']},{h2:'Три',paragraphs:['Текст.']},{h2:'Четыре',paragraphs:['Текст.']}],conclusion:'Персональную карту можно рассчитать в Нейродзене.',...over});
const item=(id:string)=>PLAN.find(p=>p.id===id)!;
Deno.test('Plan has 28 articles, four per Moscow day from 12 to 18 November at 07:00, 11:30, 16:00, 20:00',()=>{
 assertEquals(PLAN.length,100);
 for(let d=12;d<=18;d++)assertEquals(PLAN.filter(p=>p.at.startsWith(`2026-11-${d}`)).map(p=>p.at.slice(11,16)),['07:00','11:30','16:00','20:00']);
});
Deno.test('Daily horoscope titles target the next calendar day',()=>{for(const p of PLAN.filter(p=>p.mode==='daily'))assert(dailyTargetOk(p,new Date(p.at)));assert(!dailyTargetOk(item('p01'),new Date('2026-11-13T05:00:00+03:00')));});
Deno.test('Only items scheduled for the current Moscow day and already due are claimed',()=>{
 assertEquals(dueItem(new Date('2026-11-12T06:59:00+03:00'),new Set()),undefined);
 assertEquals(dueItem(new Date('2026-11-12T12:00:00+03:00'),new Set())?.id,'p01');
 assertEquals(dueItem(new Date('2026-11-12T12:00:00+03:00'),new Set(['p01']))?.id,'p02');
 assertEquals(dueItem(new Date('2026-11-13T07:30:00+03:00'),new Set())?.id,'p05');
});
Deno.test('Regular articles are 4000–7000 chars, 12-sign and long forecasts 6000–11000',()=>{assertEquals([charMin(item('p04')),charLimit(item('p04'))],[4000,7000]);assertEquals([charMin(item('p09')),charLimit(item('p09'))],[6000,11000]);assertThrows(()=>validatePlanArticle(ok({sections:[1,2,3,4].map(h2=>({h2:String(h2),paragraphs:['Коротко.']}))}),item('p04'),{}),Error,'Too short');});
Deno.test('Requested early publication selects only the next unfinished item today',()=>{
 const now=new Date('2026-11-13T10:00:00+03:00');
 const done=new Set(['p05']);
 assertEquals(dueItem(now,done),undefined);
 assertEquals(dueItem(now,done,true)?.id,'p06');
 assertEquals(dueItem(now,new Set(['p05','p06']),true)?.id,'p07');
 assertEquals(dueItem(now,new Set(['p05','p06','p07','p08']),true),undefined);
});
Deno.test('Promised twelve signs must all be present',()=>{assertThrows(()=>validatePlanArticle(ok(),item('p09'),{events:[]}),Error,'signs');validatePlanArticle(ok({sections:SIGNS.map(h2=>({h2,paragraphs:['слово '.repeat(90)]}))}),item('p09'),{events:[]});});
Deno.test('Dates must come from calculated events',()=>{
 const brief={events:[{date:'2026-11-24',type:'phase'}]};
 validatePlanArticle(ok({intro:['24 ноября полнолуние.']}),item('p15'),brief);
 assertThrows(()=>validatePlanArticle(ok({intro:['21 ноября удачный день.']}),item('p15'),brief),Error,'Date not backed');
});
Deno.test('Guarantees, links, uncalculated retrogrades and missing Нейродзен CTA are blocked',()=>{
 assertThrows(()=>validatePlanArticle(ok({intro:['Вы гарантированно встретите любовь.']}),item('p04'),{}),Error,'Guaranteed');
 assertThrows(()=>validatePlanArticle(ok({intro:['См. https://x.ru']}),item('p04'),{}),Error,'Links');
 assertThrows(()=>validatePlanArticle(ok({intro:['Меркурий ретроградный.']}),item('p04'),{}),Error,'retrograde');
 assertThrows(()=>validatePlanArticle(ok({conclusion:'Удачи.'}),item('p04'),{}),Error,'Нейродзен');
});
Deno.test('Calculated November 2026 events include the 24 November full moon in Gemini',()=>{const b=rangeEvents('2026-11-15','2026-11-30');assert(b.events.some((e:any)=>e.date==='2026-11-24'&&e.text.startsWith('Полнолуние в знаке Близнецы')));assert(b.events.some((e:any)=>e.text.startsWith('Солнце переходит в знак Стрелец')&&e.date==='2026-11-22'));});
Deno.test('Cached 2027 range equals a fresh calculation',()=>{
 const c=rangeEvents('2027-01-01','2027-12-31',true),f=rangeEvents('2027-01-01','2027-12-31',true,false);
 assertEquals(JSON.stringify(c.events),JSON.stringify(f.events));assert(c.events.length>30);
});
Deno.test('Plan 20–26 November: five articles per Moscow day, unique slugs, horoscope for the next day',()=>{
 for(let d=20;d<=26;d++){const day=PLAN.filter(p=>p.at.startsWith(`2026-11-${d}`)&&Number(p.id.slice(1))>30);assertEquals(day.length,5);assertEquals(day.filter(p=>p.mode==='daily')[0].target,`2026-11-${d+1}`);}
 assertEquals(new Set(PLAN.map(p=>p.slug)).size,PLAN.length);
});
Deno.test('December month brief calculates within budget',()=>{const t=Date.now();const b=rangeEvents('2026-12-01','2026-12-31');assert(b.events.length>5);assert(Date.now()-t<4000,`${Date.now()-t}ms`);});
Deno.test('Plan 27 November – 3 December: five articles per Moscow day, horoscope for the next day, regular slots 07:00–18:00',()=>{
 const days=['2026-11-27','2026-11-28','2026-11-29','2026-11-30','2026-12-01','2026-12-02','2026-12-03','2026-12-04'];
 for(let i=0;i<7;i++){const day=PLAN.filter(p=>p.at.startsWith(days[i])&&Number(p.id.slice(1))>65);assertEquals(day.length,5);assertEquals(day.filter(p=>p.mode==='daily').map(p=>p.target),[days[i+1]]);if(i>0)assertEquals(day.map(p=>p.at.slice(11,16)),['07:00','09:00','12:00','15:00','18:00']);}
 for(const p of PLAN.filter(p=>p.mode==='evergreen'&&Number(p.id.slice(1))>65))assert(p.facts!.length>=5);
 assertEquals(dueItem(new Date('2026-11-27T11:45:00+03:00'),new Set())?.id,'p66');
});
Deno.test('A longer article is published as written, without cutting paragraphs',()=>{
 const sec=(n:number)=>({h2:'Раздел',paragraphs:Array.from({length:n},()=>'а'.repeat(990)+'.')});
 const a=validatePlanArticle(ok({sections:[sec(4),sec(3),sec(2),sec(1)]}),item('p04'),{});
 assertEquals(a.sections.map((s:any)=>s.paragraphs.length),[4,3,2,1]);
});
Deno.test('Blocked articles are released again in a new slot on the day of retryAt',()=>{
 const p=item('p40');assert(p.retryAt);
 const rest=new Set(PLAN.filter(x=>x.id!=='p40').map(x=>x.id));
 assertEquals(dueItem(new Date(new Date(p.retryAt!).getTime()+60000),rest)?.id,'p40');
 assertEquals(dueItem(new Date(new Date(p.retryAt!).getTime()-60000),rest),undefined);
 assertEquals(dueItem(new Date(new Date(p.at).getTime()+60000),rest),undefined);
});
Deno.test('Retrograde named in the approved facts may be explained as tradition; elsewhere it stays blocked',()=>{
 validatePlanArticle(ok({intro:['Для договоров традиционно избегают ретроградного Меркурия.']}),item('p50'),null);
 assertThrows(()=>validatePlanArticle(ok({intro:['Меркурий ретроградный.']}),item('p04'),{}),Error,'retrograde');
});
Deno.test('A denied guarantee is allowed as a disclaimer; a promised outcome is still blocked',()=>{
 validatePlanArticle(ok({intro:['Соляр не гарантирует событий и не означает неизбежного исхода. Никто не может гарантировать результат.']}),item('p04'),{});
 assertThrows(()=>validatePlanArticle(ok({intro:['Соляр гарантирует успех.']}),item('p04'),{}),Error,'Guaranteed');
 assertThrows(()=>validatePlanArticle(ok({intro:['Это неизбежно приведёт к переменам.']}),item('p04'),{}),Error,'Guaranteed');
});
