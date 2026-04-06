'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from '@/components/ui/Logo';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const isHome = pathname === '/';
  
  const navLinks = [
    { href: '/tooted' as const, label: t('products') },
    { href: '/meist' as const, label: t('about') },
    { href: '/strateegia' as const, label: t('strategy') },
    { href: '/kontakt' as const, label: t('contact') },
  ];

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
        <Link href="/" className="flex items-center" aria-label="UrbanStyle Home">
          <Logo variant="lockup" className="h-6 w-auto text-offwhite hover:opacity-90 transition-opacity" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
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
          <Link
            href={'/approach' as const}
            className={`ml-2 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
              pathname === '/approach'
                ? 'bg-burnt-orange text-offwhite'
                : 'bg-burnt-orange/90 text-offwhite hover:bg-burnt-orange'
            }`}
          >
            {t('approach')}
          </Link>
          <Link
            href={'/automatiseerimine' as const}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
              pathname === '/automatiseerimine'
                ? 'bg-[#009B8D] text-offwhite'
                : 'bg-[#009B8D]/90 text-offwhite hover:bg-[#009B8D]'
            }`}
          >
            {t('automation')}
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex flex-col items-center justify-center w-8 h-8 z-[60]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`block w-6 h-[2px] bg-offwhite transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[6px]' : '-translate-y-1'}`} />
          <span className={`block w-6 h-[2px] bg-offwhite transition-opacity duration-300 my-1 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-6 h-[2px] bg-offwhite transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : 'translate-y-1'}`} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-10"
          >
            <div className="flex flex-col items-center space-y-12 w-full max-w-sm">
              <div className="flex flex-col items-center space-y-8 w-full">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-bold uppercase tracking-widest transition-colors duration-300 ${
                      pathname === href
                        ? 'text-burnt-orange'
                        : 'text-offwhite hover:text-burnt-orange'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <Link
                href={'/approach' as const}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-8 py-3 rounded-full text-lg font-bold uppercase tracking-widest transition-all duration-300 ${
                  pathname === '/approach'
                    ? 'bg-burnt-orange text-offwhite'
                    : 'bg-burnt-orange/90 text-offwhite hover:bg-burnt-orange'
                }`}
              >
                {t('approach')}
              </Link>
              <Link
                href={'/automatiseerimine' as const}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-8 py-3 rounded-full text-lg font-bold uppercase tracking-widest transition-all duration-300 ${
                  pathname === '/automatiseerimine'
                    ? 'bg-[#009B8D] text-offwhite'
                    : 'bg-[#009B8D]/90 text-offwhite hover:bg-[#009B8D]'
                }`}
              >
                {t('automation')}
              </Link>

              <div className="w-16 h-[1px] bg-offwhite/20" />
              
              <div className="flex flex-col items-center space-y-6">
                <span className="text-xs font-mono text-charcoal/40 uppercase tracking-widest text-offwhite/50">Language / Keel / Язык</span>
                <LanguageSwitcher />
              </div>
            </div>
            
            {/* Background decorative element */}
            <div className="absolute bottom-10 opacity-5 pointer-events-none">
              <Logo variant="monogram" className="w-[300px] h-auto text-offwhite" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
