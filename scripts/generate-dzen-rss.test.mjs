import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { generateDzenRss } from "./generate-dzen-rss.mjs";

const feed = (title) => `<?xml version="1.0"?><rss version="2.0"><channel><title>${title}</title><item><title>Article</title></item></channel></rss>`;
const oldFeed = feed("Saved");
const newFeed = feed("Fresh");

async function fixture(t, initial = oldFeed) {
  const directory = await mkdtemp(join(tmpdir(), "dzen-rss-test-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const targetPath = join(directory, "dzen-rss.xml");
  if (initial !== null) await writeFile(targetPath, initial);
  const warnings = [];
  return { directory, targetPath, warnings, options: {
    targetPath, wait: async () => {},
    logger: { log() {}, warn(message) { warnings.push(message); } },
  } };
}

test("a transient ETIMEDOUT is retried and fresh RSS replaces the saved feed", async (t) => {
  const f = await fixture(t);
  let calls = 0;
  const result = await generateDzenRss({ ...f.options, fetchImpl: async () => {
    calls += 1;
    if (calls === 1) throw new TypeError("fetch failed", { cause: { code: "ETIMEDOUT" } });
    return new Response(newFeed);
  } });
  assert.equal(calls, 2);
  assert.equal(result.status, "updated");
  assert.equal(await readFile(f.targetPath, "utf8"), newFeed);
  assert.deepEqual(await readdir(f.directory), ["dzen-rss.xml"]);
});

test("three failed requests preserve the saved feed and warn that it is stale", async (t) => {
  const f = await fixture(t);
  let calls = 0;
  const result = await generateDzenRss({ ...f.options, fetchImpl: async () => {
    calls += 1;
    throw new Error("network unavailable");
  } });
  assert.equal(calls, 3);
  assert.equal(result.status, "cached");
  assert.equal(await readFile(f.targetPath, "utf8"), oldFeed);
  assert.match(f.warnings.at(-1), /RSS may be stale/);
});

test("each stalled request is aborted before falling back", async (t) => {
  const f = await fixture(t);
  let aborts = 0;
  const result = await generateDzenRss({ ...f.options, timeoutMs: 5, fetchImpl: async (_url, { signal }) =>
    new Promise((_resolve, reject) => signal.addEventListener("abort", () => {
      aborts += 1;
      reject(new Error("aborted"));
    }, { once: true })) });
  assert.equal(aborts, 3);
  assert.equal(result.status, "cached");
});

test("HTML, truncated XML and HTTP errors never overwrite valid saved RSS", async (t) => {
  for (const response of [
    () => new Response("<html>Unavailable</html>"),
    () => new Response('<?xml version="1.0"?><rss><channel><item>'),
    () => new Response("Unavailable", { status: 503 }),
  ]) {
    const f = await fixture(t);
    assert.equal((await generateDzenRss({ ...f.options, fetchImpl: response })).status, "cached");
    assert.equal(await readFile(f.targetPath, "utf8"), oldFeed);
  }
});

test("unavailable source without a valid saved feed fails instead of publishing garbage", async (t) => {
  for (const initial of [null, "<html>Not RSS</html>"]) {
    const f = await fixture(t, initial);
    await assert.rejects(generateDzenRss({ ...f.options, fetchImpl: async () => {
      throw new Error("offline");
    } }), /no valid saved feed/);
    if (initial !== null) assert.equal(await readFile(f.targetPath, "utf8"), initial);
  }
});