// Server-only kie.ai contract, matching the existing Pinterest GPT Image integration.
export class ProviderError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

export async function generateKieCover(prompt, apiKey, { fetchImpl = fetch, wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms)) } = {}) {
  if (!apiKey?.trim()) throw new Error('KIE_AI_API_KEY is not configured');
  const headers = { Authorization: `Bearer ${apiKey.trim()}`, 'Content-Type': 'application/json' };
  const create = await fetchImpl('https://api.kie.ai/api/v1/jobs/createTask', {
    method: 'POST', headers,
    body: JSON.stringify({ model: 'gpt-image-2-text-to-image', input: { prompt, size: '1:1', nVariants: 1, quality: 'high' } }),
  });
  if (!create.ok) throw new ProviderError(create.status, `kie.ai cover creation HTTP ${create.status}`);
  const created = await create.json();
  if (created.code && created.code !== 200) throw new ProviderError(created.code, `kie.ai cover creation rejected (${created.code})`);
  const taskId = created?.data?.taskId ?? created?.data?.task_id ?? created?.taskId;
  if (typeof taskId !== 'string' || !taskId) throw new Error('kie.ai cover task ID missing');
  for (let i = 0; i < 60; i++) {
    await wait(5000);
    const info = await fetchImpl(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${encodeURIComponent(taskId)}`, { headers });
    if (!info.ok) {
      if (info.status === 429 || info.status >= 500) continue;
      throw new ProviderError(info.status, `kie.ai cover status HTTP ${info.status}`);
    }
    const record = await info.json();
    if (record.code && record.code !== 200) throw new ProviderError(record.code, `kie.ai cover status rejected (${record.code})`);
    const state = record?.data?.state ?? record?.data?.status;
    if (['fail', 'failed', 'error'].includes(state)) {
      const code = Number(record?.data?.failCode);
      throw new ProviderError(code >= 400 && code <= 599 ? code : 403, 'kie.ai cover task failed');
    }
    if (!['success', 'succeeded', 'completed'].includes(state)) continue;
    const result = record.data.resultJson ?? record.data.response ?? record.data;
    const parsed = typeof result === 'string' ? JSON.parse(result) : result;
    const urls = parsed?.resultUrls ?? parsed?.result_urls ?? parsed?.images ?? parsed?.output ?? [];
    const url = Array.isArray(urls) ? urls[0] : urls;
    if (typeof url !== 'string' || !url.startsWith('https://')) throw new Error('kie.ai cover URL missing');
    // No API credentials are sent to the result image host.
    const image = await fetchImpl(url);
    if (!image.ok) throw new Error(`kie.ai cover download HTTP ${image.status}`);
    const bytes = new Uint8Array(await image.arrayBuffer());
    if (![137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => bytes[index] === byte)) throw new Error('kie.ai cover is not a PNG');
    let binary = '';
    for (let offset = 0; offset < bytes.length; offset += 8192) binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
    return btoa(binary);
  }
  throw new Error('kie.ai cover polling timeout');
}