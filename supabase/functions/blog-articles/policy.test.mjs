import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isPublicArticle, projectArticle } from './policy.mjs';
const ready = { status: 'published', slug_hint: 'real-article', dzen_html: '<p>Full text</p>', cover_url: 'https://aidzen.ru/cover.png', generated_at: '2026-11-13T04:02:00Z' };
test('Only published articles are public, not drafts or needs_review', () => {
  assert.equal(isPublicArticle(ready), true);
  for (const status of ['pending', 'draft', 'needs_review', 'failed']) assert.equal(isPublicArticle({ ...ready, status }), false);
});
test('Articles without full text or cover are not exposed', () => {
  assert.equal(isPublicArticle({ ...ready, dzen_html: '' }), false);
  assert.equal(isPublicArticle({ ...ready, cover_url: null }), false);
});
test('Public projection never returns job payload or editorial brief', () => {
  const projected = projectArticle({ ...ready, payload: { coverB64: 'private' }, editorial_brief: 'private', id: 'private' });
  assert.equal(projected.html, ready.dzen_html);
  for (const key of ['payload', 'editorial_brief', 'id', 'status']) assert.equal(key in projected, false);
});