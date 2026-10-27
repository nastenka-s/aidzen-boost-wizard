import test from 'node:test';
import assert from 'node:assert/strict';
import { coverPrompt } from './cover-policy.mjs';
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