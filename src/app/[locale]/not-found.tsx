"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { getImageUrl } from '@/data/images';

export default function NotFoundPage() {
  const t = useTranslations('notFound');

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-charcoal">
      <img 
        src={getImageUrl('images/v1/hero/hero_cityscape_lg.webp')}
        alt="404 Cityscape"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-overlay filter grayscale"
        fetchPriority="high"
        loading="eager"
      />
      
      {/* Abstract data grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent pointer-events-none" />
      
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto -mt-20">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 rounded-full border border-offwhite/10 bg-offwhite/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-burnt-orange animate-pulse" />
            <span className="text-xs font-mono text-offwhite/70 uppercase tracking-wider">
              SYSTEM_RECORD_NOT_FOUND
            </span>
          </div>

          <h1 className="text-8xl md:text-[180px] leading-none font-bold font-mono tracking-tighter text-burnt-orange mb-2 drop-shadow-lg">
            404
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-offwhite mb-6">
            {t('title').replace('404 - ', '')}
          </h2>
          <p className="text-lg md:text-xl text-limestone font-light leading-relaxed mb-12">
            {t('description')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/tooted"
            className="group relative inline-flex items-center justify-center px-10 py-4 bg-offwhite text-charcoal font-bold rounded-none text-lg overflow-hidden transition-all hover:bg-limestone"
          >
            <span className="relative z-10 uppercase tracking-wide">{t('productsCta')}</span>
          </Link>
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center px-10 py-4 border border-offwhite/20 text-offwhite font-medium rounded-none text-lg hover:border-offwhite/40 transition-all bg-charcoal/30 backdrop-blur-sm"
          >
            <span className="font-mono text-sm uppercase tracking-wider">{t('homeCta')}</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
