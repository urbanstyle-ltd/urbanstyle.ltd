import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/ui/JsonLd';
import '../globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic', 'latin-ext'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin', 'cyrillic', 'latin-ext'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: {
      default: t('title'),
      template: `%s | UrbanStyle`,
    },
    description: t('description'),
    metadataBase: new URL('https://urbanstyle.ltd'),
    alternates: {
      canonical: `/${locale === 'et' ? '' : locale}`,
      languages: {
        'et-EE': '/',
        'en-US': '/en',
        'ru-RU': '/ru',
        'lv-LV': '/lv',
        'uk-UA': '/uk',
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'UrbanStyle',
      locale: locale === 'et' ? 'et_EE' : locale === 'ru' ? 'ru_RU' : locale === 'lv' ? 'lv_LV' : locale === 'uk' ? 'uk_UA' : 'en_US',
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "et" | "ru" | "lv" | "uk")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-offwhite text-charcoal`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <JsonLd />
      </body>
    </html>
  );
}
