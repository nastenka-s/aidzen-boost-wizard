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