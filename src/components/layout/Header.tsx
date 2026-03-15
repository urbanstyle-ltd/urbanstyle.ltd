'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-charcoal/95 backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-16 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-offwhite tracking-wider">
          UrbanStyle
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '/tooted' as const, label: t('products') },
            { href: '/meist' as const, label: t('about') },
            { href: '/strateegia' as const, label: t('strategy') },
            { href: '/kontakt' as const, label: t('contact') },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                pathname === href
                  ? 'text-burnt-orange'
                  : 'text-offwhite/80 hover:text-offwhite'
              }`}
            >
              {label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}
