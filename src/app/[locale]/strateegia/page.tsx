"use client";

import { useTranslations, useLocale } from 'next-intl';
import type { Locale } from '@/i18n/config';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';

export default function StrategyPage() {
  const t = useTranslations('strategy');
  const locale = useLocale() as Locale;

  const challengeText: Record<string, string> = {
    et: 'Kui UrbanStyle kasvas väikesest Tallinna brändist kolme linna ja 350+ tootega ettevõtteks, kasvas ka otsuste keerukus plahvatuslikult. Laohaldus, kliendiarusaamad, turunduse tootlikkus — intuitsioon üksi ei pidanud enam sammu.',
    en: 'As UrbanStyle grew from a small Tallinn brand to operating across three cities with 350+ products, the complexity of decisions grew exponentially. Inventory management, customer insights, marketing ROI — intuition alone could no longer keep pace.',
    ru: 'По мере роста UrbanStyle от небольшого таллиннского бренда до компании с тремя магазинами и 350+ товарами, сложность решений росла экспоненциально. Управление запасами, понимание клиентов, ROI маркетинга — одной интуиции уже было недостаточно.',
  };

  const transformText: Record<string, string> = {
    et: 'Alustasime strateegilist transformatsiooni, integreerides andmeanalüüsi ja tehisintellekti igasse funktiooni — tarneahela optimeerimisest personaliseeritud turunduseni. See polnud ainult tööriistade küsimus, vaid andmekirjaoskuse kultuuri loomine kogu organisatsioonis.',
    en: 'We embarked on a strategic transformation, embedding data analytics and AI into every function — from supply chain optimization to personalized marketing. This was not just about tools; it was about building a data-literate culture across the entire organization.',
    ru: 'Мы начали стратегическую трансформацию, внедряя аналитику данных и ИИ в каждую функцию — от оптимизации цепочки поставок до персонализированного маркетинга. Дело было не только в инструментах, а в создании культуры работы с данными во всей организации.',
  };

  const challengeTitle: Record<string, string> = {
    et: 'Väljakutse', en: 'The Challenge', ru: 'Вызов',
  };

  const ctaText: Record<string, string> = {
    et: 'Meie andmepõhist transformatsiooni toetasid andekad analüütikud DACA programmist. Avasta, kuidas saad olla järgmise lennu osa.',
    en: 'Our data transformation was supported by talented analysts from the DACA program. Discover how you can be part of the next cohort.',
    ru: 'Нашу цифровую трансформацию поддержали талантливые аналитики из программы DACA. Узнайте, как стать частью следующего потока.',
  };

  const aiCards: { title: Record<string, string>; desc: Record<string, string> }[] = [
    { title: { et: 'Nõudluse prognoosimine', en: 'Demand Forecasting', ru: 'Прогнозирование спроса' }, desc: { et: 'AI-põhised prognoosid vähendavad ülelaoseisu 30%', en: 'AI-powered predictions reduce overstock by 30%', ru: 'Прогнозы на основе ИИ сокращают избыточные запасы на 30%' } },
    { title: { et: 'Kliendisegmentimine', en: 'Customer Segmentation', ru: 'Сегментация клиентов' }, desc: { et: 'Andmepõhised persoonad sihitud kampaaniate jaoks', en: 'Data-driven personas for targeted campaigns', ru: 'Персоны на основе данных для целевых кампаний' } },
    { title: { et: 'Tarneahel', en: 'Supply Chain', ru: 'Цепочка поставок' }, desc: { et: 'Automaatsed täienduspunktid kolme poe vahel', en: 'Automated reorder points across 3 stores', ru: 'Автоматические точки повторного заказа в 3 магазинах' } },
    { title: { et: 'Sisu loomine', en: 'Content Creation', ru: 'Создание контента' }, desc: { et: 'AI-toetatud tootekirjeldused ja visuaalid', en: 'AI-assisted product descriptions and imagery', ru: 'Описания товаров и визуалы с помощью ИИ' } },
  ];

  return (
    <div className="pt-32 pb-16 overflow-hidden">
      {/* Hero */}
      <section className="px-6 md:px-16 py-32 bg-charcoal text-offwhite relative">
        {/* Subtle data grid background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(var(--color-offwhite) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
             <Logo variant="monogram" className="w-24 h-24 mx-auto text-offwhite/20" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[90px] font-bold uppercase tracking-tighter leading-[0.9] mb-12"
          >
            {t('headline')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-offwhite/80 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            {t('dataTransformation')}
          </motion.p>
        </div>
      </section>

      {/* Problem - Transformation */}
      <section className="px-6 md:px-16 py-32 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold uppercase tracking-tight mb-8 flex items-center gap-4">
              <span className="text-burnt-orange font-mono text-2xl">01</span>
              {challengeTitle[locale as Locale]}
            </h2>
            <p className="text-xl text-charcoal/80 leading-relaxed mb-24 font-medium pl-10 border-l-2 border-charcoal/10">
              {challengeText[locale as Locale]}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold uppercase tracking-tight mb-8 flex items-center gap-4">
              <span className="text-burnt-orange font-mono text-2xl">02</span>
              {t('dataTransformation')}
            </h2>
            <p className="text-xl text-charcoal/80 leading-relaxed font-medium pl-10 border-l-2 border-charcoal/10">
              {transformText[locale as Locale]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Role */}
      <section className="px-6 md:px-16 py-32 bg-limestone/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-16 text-center"
          >
            {t('aiRole')}
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {aiCards.map((card, idx) => (
              <motion.div 
                key={card.title.en} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-offwhite rounded-xl p-10 shadow-sm border border-charcoal/5 group hover:shadow-xl transition-all duration-500 relative overflow-hidden"
              >
                {/* Tech glitch accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-blue scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
                
                <h3 className="font-bold text-2xl mb-4 text-charcoal tracking-tight">{card.title[locale as Locale]}</h3>
                <p className="text-charcoal/70 text-lg leading-relaxed font-medium">{card.desc[locale as Locale]}</p>
                <div className="mt-8 pt-6 border-t border-charcoal/10 flex justify-between items-center text-sm font-mono text-charcoal/40 uppercase tracking-widest">
                  <span>SYSTEM_ACTIVE</span>
                  <span className="text-sage">OPTIMIZED</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - conversion funnel to DACA program */}
      <section className="px-6 md:px-16 py-32 bg-charcoal text-offwhite text-center relative overflow-hidden">
        {/* Background decorative Monogram */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Logo variant="monogram" className="w-[800px] h-[800px] text-offwhite" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8"
          >
            {t('joinCta')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-offwhite/80 mb-16 leading-relaxed font-medium"
          >
            {ctaText[locale as Locale]}
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            href={locale === 'et'
              ? 'https://www.ettevotluskeskus.ee/daca25-andmeanaluutiku-karjaarikiirendi'
              : 'https://www.ettevotluskeskus.ee/daca25en-data-analyst-career-accelerator'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-12 py-5 bg-burnt-orange text-offwhite font-bold rounded-lg text-lg tracking-wide hover:bg-offwhite hover:text-burnt-orange transition-all duration-500 shadow-xl hover:shadow-2xl"
          >
            {t('programLink')}
          </motion.a>
        </div>
      </section>
    </div>
  );
}
