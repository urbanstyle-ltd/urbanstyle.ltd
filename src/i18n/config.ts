export const locales = ['et', 'en', 'ru', 'lv'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'et';
