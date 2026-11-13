export const publicFields = 'topic,slug_hint,description,dzen_html,cover_url,generated_at,published_url,category';
export function isPublicArticle(row) {
  return row.status === 'published' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug_hint ?? '') &&
    Boolean(row.dzen_html?.trim() && row.cover_url && row.generated_at);
}
export function projectArticle(row) {
  return { title: row.topic, slug: row.slug_hint, description: row.description ?? '',
    html: row.dzen_html, cover: row.cover_url, publishedAt: row.generated_at, category: row.category };
}