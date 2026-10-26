import { assertEquals, assert, assertAlmostEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { ASPECTS, briefs, chooseBrief, DAILY_LIMIT, longitude, moscowDay, NUMBERS, pickSlot, SLOTS, visualStyle } from "./editorial.ts";
import { Body, SearchMoonPhase } from "npm:astronomy-engine@2.1.19";

Deno.test("two daily slots and hard limit", () => {
  assertEquals(DAILY_LIMIT, 2);
  assertEquals(SLOTS.length, 2);
  assertEquals(SLOTS.map(s=>s.hour), [6,18]);
  assertEquals(pickSlot(new Date("2026-10-26T18:05:00Z")).idx, 1);
});
Deno.test("Moscow day starts at 21 UTC", () => {
  assertEquals(moscowDay(new Date("2026-10-26T20:59:59Z")), "2026-10-26");
  assertEquals(moscowDay(new Date("2026-10-26T21:00:00Z")), "2026-10-27");
});
Deno.test("eight distinct visual styles across four days", () => {
  const ids = new Set<string>();
  for (let day=26; day<=29; day++) for (let slot=0; slot<2; slot++) ids.add(visualStyle(`2026-10-${day}`,slot).id);
  assertEquals(ids.size, 8);
});
Deno.test("all requested list categories and factual sources", () => {
  const pool = briefs(new Date("2026-10-26T08:00:00Z"));
  assertEquals([...new Set(pool.map(b=>b.category))].sort(), ["aspects","events","numerology","planet-meanings","positions"]);
  assert(pool.every(b=>b.bullets.length>=1 && b.bullets.length<=5 && b.sources.includes("https://")));
  assertEquals(ASPECTS.map(a=>a.angle), [0,60,90,120,180]);
  assertEquals(NUMBERS.length, 9);
});
Deno.test("astronomical event timestamps match the October 2026 full moon", () => {
  const event = SearchMoonPhase(180,new Date("2026-10-25T00:00:00Z"),3);
  assert(event);
  // Independent published phase table: full moon Oct 26, 04:12 UTC.
  assertAlmostEquals(event.date.getTime(), Date.parse("2026-10-26T04:12:00Z"), 0, 120000);
  const sun=longitude(Body.Sun,new Date("2026-10-26T09:00:00Z"));
  assert(sun>=210 && sun<240);
});
Deno.test("consecutive pins avoid previous category and topic", () => {
  const now=new Date("2026-10-26T08:00:00Z");
  const first=chooseBrief(now,0,[]);
  const second=chooseBrief(now,1,[`::KEY::${first.key} ::CAT::${first.category}`]);
  assert(first.key!==second.key);
  assert(first.category!==second.category);
});