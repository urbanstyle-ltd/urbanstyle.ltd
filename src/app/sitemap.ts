import { MetadataRoute } from 'next';

const locales = ['et', 'en', 'ru', 'lv', 'uk'];
const baseUrl = 'https://urbanstyle.ltd';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/tooted',
    '/meist',
    '/strateegia',
    '/kontakt',
    '/lahenemine',
    '/automatiseerimine',
    '/syllabus',
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      const prefix = locale === 'et' ? '' : `/${locale}`;
      entries.push({
        url: `${baseUrl}${prefix}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : page === '/lahenemine' || page === '/automatiseerimine' ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
