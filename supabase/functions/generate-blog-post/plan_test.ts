import { assertEquals, assert, assertThrows } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { PLAN, rangeEvents, dueItem, validatePlanArticle, dailyTargetOk, charLimit, charMin } from './plan.ts';
import { SIGNS } from './editorial.ts';
const FILL='слово '.repeat(1000);
const ok=(over:any={})=>({title:'x',intro:['Короткий лид.'],sections:[{h2:'Раз',paragraphs:[FILL]},{h2:'Два',paragraphs:['Текст.']},{h2:'Три',paragraphs:['Текст.']},{h2:'Четыре',paragraphs:['Текст.']}],conclusion:'Персональную карту можно рассчитать в Нейродзене.',...over});
const item=(id:string)=>PLAN.find(p=>p.id===id)!;
Deno.test('Plan has 28 articles, four per Moscow day from 12 to 18 November at 07:00, 11:30, 16:00, 20:00',()=>{
 assertEquals(PLAN.length,28);
 for(let d=12;d<=18;d++)assertEquals(PLAN.filter(p=>p.at.startsWith(`2026-11-${d}`)).map(p=>p.at.slice(11,16)),['07:00','11:30','16:00','20:00']);
});
Deno.test('Daily horoscope titles target the next calendar day',()=>{for(const p of PLAN.filter(p=>p.mode==='daily'))assert(dailyTargetOk(p,new Date(p.at)));assert(!dailyTargetOk(item('p01'),new Date('2026-11-13T05:00:00+03:00')));});
Deno.test('Only items scheduled for the current Moscow day and already due are claimed',()=>{
 assertEquals(dueItem(new Date('2026-11-12T06:59:00+03:00'),new Set()),undefined);
 assertEquals(dueItem(new Date('2026-11-12T12:00:00+03:00'),new Set())?.id,'p01');
 assertEquals(dueItem(new Date('2026-11-12T12:00:00+03:00'),new Set(['p01']))?.id,'p02');
 assertEquals(dueItem(new Date('2026-11-13T07:30:00+03:00'),new Set())?.id,'p05');
});
Deno.test('Regular articles are 4000–7000 chars, 12-sign and long forecasts 6000–11000',()=>{assertEquals([charMin(item('p04')),charLimit(item('p04'))],[4000,7000]);assertEquals([charMin(item('p09')),charLimit(item('p09'))],[6000,11000]);assertThrows(()=>validatePlanArticle(ok({intro:['а'.repeat(7001)]}),item('p04'),{}),Error,'Too long');assertThrows(()=>validatePlanArticle(ok({sections:[1,2,3,4].map(h2=>({h2:String(h2),paragraphs:['Коротко.']}))}),item('p04'),{}),Error,'Too short');});
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
Deno.test('Calculated November 2026 events include the 24 November full moon in Gemini',()=>{const b=rangeEvents('2026-11-15','2026-11-30');assert(b.events.some(e=>e.date==='2026-11-24'&&e.text.startsWith('Полнолуние в знаке Близнецы')));assert(b.events.some(e=>e.text.startsWith('Солнце переходит в знак Стрелец')&&e.date==='2026-11-22'));});
