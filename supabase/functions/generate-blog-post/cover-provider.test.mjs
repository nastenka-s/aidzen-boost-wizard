import test from 'node:test';
import assert from 'node:assert/strict';
import { generateKieCover, ProviderError } from './cover-provider.mjs';

test('Article covers use Pinterest GPT Image model on kie.ai and return PNG base64', async () => {
  const calls = [];
  const png = Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const replies = [
    Response.json({ code: 200, data: { taskId: 'cover-task' } }),
    Response.json({ data: { state: 'generating' } }),
    Response.json({ data: { state: 'success', resultJson: JSON.stringify({ resultUrls: ['https://images.example/cover.png'] }) } }),
    new Response(png),
  ];
  const result = await generateKieCover('ГОРОСКОП НА ЗАВТРА', 'test-key', {
    wait: async () => {}, fetchImpl: async (url, options) => { calls.push({ url, options }); return replies.shift(); },
  });
  const body = JSON.parse(calls[0].options.body);
  assert.equal(calls[0].url, 'https://api.kie.ai/api/v1/jobs/createTask');
  assert.equal(body.model, 'gpt-image-2-text-to-image');
  assert.deepEqual(body.input, { prompt: 'ГОРОСКОП НА ЗАВТРА', size: '1:1', nVariants: 1, quality: 'high' });
  assert.equal(result, Buffer.from(png).toString('base64'));
  assert.equal(calls[3].options, undefined);
});

test('Missing kie.ai key does not call any provider', async () => {
  let calls = 0;
  await assert.rejects(generateKieCover('Cover', '', { fetchImpl: async () => { calls++; } }), /not configured/);
  assert.equal(calls, 0);
});

test('Provider denial is preserved without switching models or retrying', async () => {
  let calls = 0;
  await assert.rejects(generateKieCover('Cover', 'test-key', {
    fetchImpl: async () => { calls++; return new Response('', { status: 403 }); },
  }), (error) => error instanceof ProviderError && error.status === 403);
  assert.equal(calls, 1);
});

test('Invalid downloaded images cannot become published PNG covers', async () => {
  const replies = [Response.json({ data: { taskId: 'task' } }), Response.json({ data: { state: 'success', resultJson: '{"resultUrls":["https://images.example/cover.png"]}' } }), new Response('<html>Error</html>')];
  await assert.rejects(generateKieCover('Cover', 'test-key', { wait: async () => {}, fetchImpl: async () => replies.shift() }), /not a PNG/);
});