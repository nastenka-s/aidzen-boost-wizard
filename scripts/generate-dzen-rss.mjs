import { readFile, writeFile, rename, rm } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";

const SOURCE_URL = "https://rhksexmodcihbasgohvb.supabase.co/functions/v1/dzen-rss";
const TARGET_PATH = "public/dzen-rss.xml";

function isRss(xml) {
  return /^<\?xml\s/.test(xml.trimStart()) &&
    /<rss\b[^>]*>/.test(xml) && /<channel\b[^>]*>/.test(xml) &&
    /<item\b[^>]*>/.test(xml) &&
    /<\/channel>\s*<\/rss>\s*$/.test(xml) &&
    !/<(?:html|!doctype\s+html)\b/i.test(xml);
}

export async function generateDzenRss({
  sourceUrl = SOURCE_URL,
  targetPath = TARGET_PATH,
  fetchImpl = fetch,
  attempts = 3,
  timeoutMs = 12_000,
  wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  logger = console,
} = {}) {
  let xml;
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(sourceUrl, {
        headers: { Accept: "application/rss+xml, application/xml, text/xml" },
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`Dzen RSS HTTP ${response.status} ${response.statusText}`);
      }
      const candidate = await response.text();
      if (!isRss(candidate)) throw new Error("Dzen RSS source returned invalid or incomplete RSS");
      xml = candidate;
      break;
    } catch (error) {
      lastError = error;
      logger.warn(`Dzen RSS attempt ${attempt}/${attempts} failed: ${error.message}${error.cause?.code ? ` (${error.cause.code})` : ""}`);
    } finally {
      clearTimeout(timer);
    }
    if (attempt < attempts) await wait(attempt * 1_000);
  }

  if (xml === undefined) {
    let cached;
    try {
      cached = await readFile(targetPath, "utf8");
    } catch {
      // A missing feed must not be replaced with an empty placeholder.
    }
    if (!cached || !isRss(cached)) {
      throw new Error("Dzen RSS unavailable and no valid saved feed exists", { cause: lastError });
    }
    logger.warn(`WARNING: Dzen RSS unavailable; keeping saved ${targetPath}. Website build can continue, but RSS may be stale.`);
    return { status: "cached" };
  }

  const temporaryPath = `${targetPath}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporaryPath, xml, "utf8");
    await rename(temporaryPath, targetPath);
  } finally {
    await rm(temporaryPath, { force: true });
  }
  logger.log(`Generated ${targetPath}`);
  return { status: "updated" };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await generateDzenRss();
}