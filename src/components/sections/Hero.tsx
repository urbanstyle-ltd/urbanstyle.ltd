"use client";

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getImageUrl } from '@/data/images';

export default function Hero() {
  const t = useTranslations();

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background with abstract data/fashion imagery overlay */}
      <div className="absolute inset-0 bg-charcoal">
        <Image 
          src={getImageUrl('images/v1/hero/hero_denim_season_lg.webp')}
          alt={t('hero.headline')}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/20" />
        
        {/* Abstract animated grid (Data representation) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center text-center">
        
        {/* Subtle data insight */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-3 py-1 mb-8 rounded-full border border-offwhite/10 bg-offwhite/5 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-burnt-orange animate-pulse" />
          <span className="text-xs font-mono text-offwhite/70 uppercase tracking-wider">
            {t('hero.liveData')}
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-9xl font-bold text-offwhite tracking-tighter uppercase leading-[0.9]"
        >
          {t('hero.headline')}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-lg md:text-xl text-limestone font-light max-w-2xl"
        >
          {t('hero.subheadline')}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/tooted"
            className="group relative inline-flex items-center justify-center px-10 py-4 bg-offwhite text-charcoal font-semibold rounded-none text-lg overflow-hidden transition-all hover:bg-limestone"
          >
            <span className="relative z-10 uppercase tracking-wide">{t('hero.cta')}</span>
          </Link>
          <Link
            href="/strateegia"
            className="group relative inline-flex items-center justify-center px-10 py-4 border border-offwhite/20 text-offwhite font-medium rounded-none text-lg hover:border-offwhite/40 transition-all"
          >
            <span className="font-mono text-sm uppercase tracking-wider">{t('hero.secondaryCta')}</span>
          </Link>
        </motion.div>
      </div>

      {/* Floating scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-offwhite/40 to-transparent" />
      </motion.div>
    </section>
  );
}
