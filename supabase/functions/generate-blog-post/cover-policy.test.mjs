import test from 'node:test';
import assert from 'node:assert/strict';
import { coverPrompt, coverBrief } from './cover-policy.mjs';
test('Tomorrow cover specifies exact target date and headline', () => {
  const prompt = coverPrompt('Гороскоп', 'tomorrow_horoscope', '2026-10-28');
  assert.ok(prompt.includes('«ГОРОСКОП НА ЗАВТРА»'));
  assert.ok(prompt.includes('«28 октября 2026»'));
  assert.throws(() => coverPrompt('Гороскоп', 'tomorrow_horoscope'), /requires target date/);
});
test('Education cover is grounded in its topic and permits people or symbols', () => {
  const prompt = coverPrompt('Дома в астрологии', 'astrology_education');
  assert.ok(prompt.includes('Дома в астрологии'));
  assert.ok(prompt.includes('людей'));
  assert.ok(prompt.includes('символы'));
});
test('Relationship articles select romantic photography and the requested ex-partner headline', () => {
  assert.deepEqual(coverBrief('Стоит ли возвращаться к бывшему? Что может подсказать хорарная астрология'), { romantic: true, headline: 'ВЕРНУТЬСЯ К БЫВШЕМУ?' });
  assert.equal(coverBrief('Любовный гороскоп на выходные').romantic, true);
  assert.equal(coverBrief('Совместимость по датам рождения').romantic, true);
  assert.equal(coverBrief('Дома в астрологии').romantic, false);
});
test('All educational covers have a headline while approved inscriptions stay exact', () => {
  assert.equal(coverBrief('Дома в астрологии').headline, 'Дома в астрологии');
  assert.equal(coverBrief('Любовный гороскоп', 'ЛЮБОВНЫЙ ГОРОСКОП 14–15 НОЯБРЯ').headline, 'ЛЮБОВНЫЙ ГОРОСКОП 14–15 НОЯБРЯ');
});