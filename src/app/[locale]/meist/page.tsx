"use client";

import { useTranslations, useLocale } from 'next-intl';
import { teamMembers, getTeamImageUrl } from '@/data/products';
import type { Locale } from '@/i18n/config';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';

export default function AboutPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations('about');

  const timeline = [
    { year: '2020', event: { et: 'Asutatud Tallinnas', en: 'Founded in Tallinn', ru: 'Основан в Таллинне' } },
    { year: '2021', event: { et: 'Esimene pop-up pood', en: 'First pop-up store', ru: 'Первый поп-ап магазин' } },
    { year: '2022', event: { et: 'E-poe avamine, laienemine Tartusse', en: 'E-commerce launch, expanded to Tartu', ru: 'Запуск интернет-магазина, расширение в Тарту' } },
    { year: '2023', event: { et: 'Pärnu pood, 350+ toodet', en: 'Pärnu store, 350+ products', ru: 'Магазин в Пярну, 350+ товаров' } },
    { year: '2025', event: { et: 'Andmepõhine transformatsioon algab', en: 'Data-driven transformation begins', ru: 'Начало цифровой трансформации' } },
  ];

  const storyText: Record<string, string> = {
    et: 'Asutatud 2020. aastal Tallinnas, UrbanStyle ühendab Eesti tänavakultuurist inspiratsiooni Skandinaavia disainipõhimõtetega. Alustades väikese hoolikalt valitud baaskollektsiooniga, on bränd kasvanud Tallinna loomingulise energia kehastuseks — toores, viimistletud ja vaieldamatult kohalik.',
    en: 'Founded in 2020 in Tallinn, UrbanStyle blends Estonian street culture with Scandinavian design principles. What started as a small collection of carefully crafted basics has grown into a brand that represents the creative energy of Tallinn — raw, refined, and unmistakably local.',
    ru: 'Основанный в 2020 году в Таллинне, UrbanStyle сочетает эстонскую уличную культуру со скандинавскими принципами дизайна. То, что началось как небольшая коллекция тщательно продуманных базовых вещей, выросло в бренд, воплощающий творческую энергию Таллинна — необработанную, утончённую и безошибочно местную.',
  };

  return (
    <div className="pt-32 pb-16 overflow-hidden">
      {/* Story section */}
      <section className="px-6 md:px-16 mb-32 relative">
        {/* Background decorative Monogram */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 opacity-5 pointer-events-none hidden md:block">
          <Logo variant="monogram" className="w-[600px] h-[600px] text-charcoal" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-[100px] font-bold uppercase tracking-tight leading-[0.9] text-charcoal mb-12"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t('story')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-charcoal/80 leading-relaxed font-medium max-w-2xl"
          >
            {storyText[locale] || storyText.en}
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-16 py-32 bg-charcoal text-offwhite my-32">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            {timeline.map(({ year, event }, i) => (
              <motion.div 
                key={year} 
                className="flex flex-col md:flex-row gap-4 md:gap-16 items-start md:items-baseline border-b border-offwhite/10 pb-16 last:border-0 last:pb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <span className="font-mono text-burnt-orange text-3xl md:text-4xl tracking-widest">{year}</span>
                <span className="text-xl md:text-2xl font-medium tracking-wide leading-tight">{event[locale as Locale] || event.en}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 md:px-16 mb-24 relative">
        {/* Background decorative Monogram */}
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 opacity-[0.03] pointer-events-none hidden md:block">
          <Logo variant="monogram" className="w-[800px] h-[800px] text-charcoal" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-24 text-center md:text-left"
          >
            {t('team')}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-20">
            {teamMembers.map((member, idx) => {
              // Create asymmetrical layout logic
              const colSpan = idx === 0 ? 'lg:col-span-12' : (idx === 1 || idx === 2 ? 'lg:col-span-6' : 'lg:col-span-4');
              const isCEO = idx === 0;

              return (
                <motion.div 
                  key={member.id} 
                  className={`flex flex-col ${isCEO ? 'items-center text-center' : 'items-center text-center'} ${colSpan}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <div className={`
                    ${isCEO ? 'w-64 h-64 md:w-80 md:h-80' : 'w-48 h-48 md:w-56 md:h-56'} 
                    bg-limestone/30 rounded-full overflow-hidden mb-8 shadow-sm group
                  `}>
                    {/* Placeholder for real team images */}
                    <div className="w-full h-full bg-limestone/50 group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                  <h3 className="font-bold text-2xl tracking-tight text-charcoal">{member.name}</h3>
                  <p className="text-charcoal/60 text-sm tracking-widest uppercase mt-2 font-mono">{member.role[locale as Locale]}</p>
                  <p className="text-charcoal/80 text-lg italic mt-4 max-w-sm">&ldquo;{member.quote[locale as Locale]}&rdquo;</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
