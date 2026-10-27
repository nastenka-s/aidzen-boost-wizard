export const rssOffer = Object.freeze({ url: 'https://aidzen.ru', freeCalculations: 3 });

export function withRssFooter(html) {
  // Replace only the generator-owned trailing CTA, never article prose or inline links.
  const body = html.replace(/\s*<p><b>Бесплатный расчёт натальной карты и матрицы судьбы:<\/b>\s*<a href="https:\/\/chat\.aidzen\.ru\/login">chat\.aidzen\.ru<\/a><\/p>\s*$/, '')
    .replace(/\s*<p>Попробуйте [0-9]+ бесплатных расчёта на сайте <a href="https:\/\/aidzen\.ru">aidzen\.ru<\/a>\.<\/p>\s*$/, '');
  return `${body}\n<p>Попробуйте ${rssOffer.freeCalculations} бесплатных расчёта на сайте <a href="${rssOffer.url}">aidzen.ru</a>.</p>`;
}