import test from 'node:test';
import assert from 'node:assert/strict';
import { rssOffer, withRssFooter } from './footer-policy.mjs';
test('RSS offer links to the requested website', () => {
  assert.equal(rssOffer.url, 'https://aidzen.ru');
  const original = '<p>Article</p>';
  const output = withRssFooter(original);
  assert.equal([...output.matchAll(/href="([^"]+)"/g)].at(-1)?.[1], 'https://aidzen.ru');
  assert.ok(output.startsWith(original));
  assert.equal(withRssFooter(output), output);
});
test('RSS offer includes exactly three free calculations', () => {
  assert.equal(rssOffer.freeCalculations, 3);
});