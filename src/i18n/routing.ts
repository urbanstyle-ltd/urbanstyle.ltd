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
      uk: '/tovary',
    },
    '/tooted/[slug]': {
      et: '/tooted/[slug]',
      en: '/products/[slug]',
      ru: '/produkty/[slug]',
      lv: '/produkti/[slug]',
      uk: '/tovary/[slug]',
    },
    '/meist': {
      et: '/meist',
      en: '/about',
      ru: '/o-nas',
      lv: '/par-mums',
      uk: '/pro-nas',
    },
    '/strateegia': {
      et: '/strateegia',
      en: '/strategy',
      ru: '/strategiya',
      lv: '/strategija',
      uk: '/stratehiya',
    },
    '/kontakt': {
      et: '/kontakt',
      en: '/contact',
      ru: '/kontakt',
      lv: '/kontakti',
      uk: '/kontakty',
    },
    '/approach': {
      et: '/lahenemine',
      en: '/approach',
      ru: '/podkhod',
      lv: '/pieeja',
      uk: '/pidkhid',
    },
    '/automatiseerimine': {
      et: '/automatiseerimine',
      en: '/automation',
      ru: '/avtomatizaciya',
      lv: '/automatizacija',
      uk: '/avtomatyzaciya',
    },
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
