import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Exercise the exact sanitizer used by the feed without starting its Deno server.
const source = readFileSync(new URL('./index.ts', import.meta.url), 'utf8');
const start = source.indexOf('const ALLOWED_TAGS');
const end = source.indexOf('Deno.serve', start);
const sanitizer = source.slice(start, end).replace('html: string): string', 'html)');
const sanitize = vm.runInNewContext(`${sanitizer}\nsanitizeForDzen`);

test('December reissue keeps one catalog article and a separate feed destination', () => {
  const articles = JSON.parse(readFileSync(new URL('../_shared/approved-articles.json', import.meta.url), 'utf8'));
  const december = articles.filter(article => article.slug_hint === 'goroskop-na-dekabr-2026');
  assert.equal(december.length, 1);
  assert.equal(december[0].published_url, 'https://aidzen.ru/goroskop-na-dekabr-2026');
  assert.equal(december[0].dzen_link, 'https://aidzen.ru/goroskop-na-dekabr-2026?v=2');
});

for (const [label, url] of [
  ['В Telegram-боте', 'https://t.me/matricasudbyaibot'],
  ['На сайте Нейродзен', 'https://aidzen.ru'],
]) {
  test(`RSS preserves the destination for ${label} inside a list`, () => {
    const result = sanitize(`<ul><li><a href="${url}">${label}</a>.</li></ul>`);
    const destination = result.match(/<a href="([^"]+)"/);
    assert.equal(destination?.[1], url);
  });
}