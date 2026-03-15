"use client";

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function StrategyTeaser() {
  const t = useTranslations();

  return (
    <section className="relative py-32 px-6 md:px-16 overflow-hidden bg-charcoal text-offwhite border-t border-offwhite/10">
      
      {/* Terminal/Data background effect */}
      <div aria-hidden="true" className="absolute inset-0 opacity-10 font-mono text-[8px] sm:text-xs leading-none whitespace-pre select-none pointer-events-none text-sage overflow-hidden flex flex-wrap">
        {Array.from({ length: 50 }).map((_, i) => (
          <span key={i} className="mr-8 mb-2">
            {`[${new Date().getFullYear()}-03-15 ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}] INFO [core] Analyzing user behavior pattern | Conf: ${(Math.random() * 0.9 + 0.1).toFixed(3)}`}
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 mb-6">
              <span className="w-8 h-[1px] bg-burnt-orange" />
              <span className="text-xs font-mono text-burnt-orange uppercase tracking-widest">
                {t('strategy.eyebrow')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6 leading-tight">
              {t('strategy.headline')}
            </h2>
            <p className="text-lg text-offwhite/70 font-light leading-relaxed mb-8">
              {t('strategy.teaserDesc')}
            </p>
            
            <Link
              href="/strateegia"
              className="group relative inline-flex items-center justify-between px-8 py-4 bg-offwhite/5 border border-offwhite/20 hover:border-offwhite hover:bg-offwhite text-offwhite hover:text-charcoal transition-all w-full sm:w-auto"
            >
              <span className="font-mono uppercase tracking-widest text-sm mr-8">
                {t('strategy.joinCta')}
              </span>
              <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="relative p-1 bg-gradient-to-br from-offwhite/20 to-offwhite/5"
          >
             <div className="bg-charcoal p-8 h-full w-full relative overflow-hidden flex flex-col justify-center">
                {/* Abstract Data Viz */}
                <div className="flex items-end justify-between h-48 opacity-50 mb-4 gap-2">
                  {[40, 70, 45, 90, 65, 85, 100, 30, 50].map((h, i) => (
                    <motion.div 
                      key={i} 
                      className="w-full bg-slate-blue" 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  ))}
                </div>
                <div aria-hidden="true" className="flex justify-between text-xs font-mono text-charcoal/50 border-t border-offwhite/10 pt-4">
                  <span className="text-sage">SYSTEM_OPTIMIZED</span>
                  <span>v.2.0.25</span>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
