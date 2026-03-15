'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { locales, type Locale } from '@/i18n/config';

const labels: Record<Locale, string> = {
  et: 'ET',
  en: 'EN',
  ru: 'RU',
  lv: 'LV',
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex gap-2">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => router.replace(pathname as any, { locale: l })}
          className={`text-xs font-mono tracking-wider transition-colors duration-300 ${
            locale === l
              ? 'text-burnt-orange'
              : 'text-offwhite/80 hover:text-offwhite'
          }`}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}
