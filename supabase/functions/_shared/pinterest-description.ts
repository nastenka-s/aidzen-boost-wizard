export function cleanPinterestDescription(value: string): string {
  return value
    .replace(/https?:\/\/[^\s<>"']+|\b(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:ru|com|org|net|app|io|me)(?:\/[^\s<>"']*)?/gi, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}