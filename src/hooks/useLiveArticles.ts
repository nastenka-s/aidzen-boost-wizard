import { useQuery } from '@tanstack/react-query';

export interface LiveArticle {
  title: string; slug: string; description: string; cover: string;
  publishedAt: string; category: string; html?: string;
}
const endpoint = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/blog-articles`;
async function loadArticles(slug?: string) {
  const response = await fetch(slug ? `${endpoint}?slug=${encodeURIComponent(slug)}` : endpoint);
  if (response.status === 404) return { article: null };
  if (!response.ok) throw new Error('Не удалось загрузить статьи');
  return response.json() as Promise<{ articles?: LiveArticle[]; article?: LiveArticle | null }>;
}
export function useLiveArticles(slug?: string) {
  return useQuery({ queryKey: ['live-articles', slug ?? 'catalog'], queryFn: () => loadArticles(slug), staleTime: 60000, refetchInterval: 60000, retry: 2 });
}