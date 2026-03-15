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
      lv: '/produkti',
    },
    '/tooted/[slug]': {
      et: '/tooted/[slug]',
      en: '/products/[slug]',
      ru: '/produkty/[slug]',
      lv: '/produkti/[slug]',
    },
    '/meist': {
      et: '/meist',
      en: '/about',
      ru: '/o-nas',
      lv: '/par-mums',
    },
    '/strateegia': {
      et: '/strateegia',
      en: '/strategy',
      ru: '/strategiya',
      lv: '/strategija',
    },
    '/kontakt': {
      et: '/kontakt',
      en: '/contact',
      ru: '/kontakt',
      lv: '/kontakti',
    },
    '/approach': {
      et: '/lahenemine',
      en: '/approach',
      ru: '/podkhod',
      lv: '/pieeja',
    },
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
