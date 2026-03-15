import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/tooted': {
      et: '/tooted',
      en: '/products',
      ru: '/produkty',
    },
    '/tooted/[slug]': {
      et: '/tooted/[slug]',
      en: '/products/[slug]',
      ru: '/produkty/[slug]',
    },
    '/meist': {
      et: '/meist',
      en: '/about',
      ru: '/o-nas',
    },
    '/strateegia': {
      et: '/strateegia',
      en: '/strategy',
      ru: '/strategiya',
    },
    '/kontakt': {
      et: '/kontakt',
      en: '/contact',
      ru: '/kontakt',
    },
    '/lahenemine': {
      et: '/lahenemine',
      en: '/approach',
      ru: '/podkhod',
    },
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
