import { writeFile } from "node:fs/promises";

const SOURCE_URL = "https://rhksexmodcihbasgohvb.supabase.co/functions/v1/dzen-rss";
const TARGET_PATH = "public/dzen-rss.xml";

const response = await fetch(SOURCE_URL, {
  headers: { Accept: "application/rss+xml, application/xml, text/xml" },
});

if (!response.ok) {
  throw new Error(`Failed to fetch Dzen RSS: ${response.status} ${response.statusText}`);
}

const xml = await response.text();

if (!xml.trimStart().startsWith("<?xml") || !xml.includes("<rss")) {
  throw new Error("Dzen RSS source did not return valid XML");
}

await writeFile(TARGET_PATH, xml, "utf8");
console.log(`Generated ${TARGET_PATH}`);