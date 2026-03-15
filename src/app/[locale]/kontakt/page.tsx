import { useTranslations, useLocale } from 'next-intl';
import type { Locale } from '@/i18n/config';
import { motion } from 'framer-motion';

const stores = [
  {
    city: 'Tallinn',
    label: { et: 'Peakontor & Flagship', en: 'HQ & Flagship', ru: 'Штаб-квартира & Флагман' },
    address: 'Tormilinna 4',
    zip: '10145 Tallinn',
  },
  {
    city: 'Tartu',
    label: { et: 'Tartu pood', en: 'Tartu Store', ru: 'Магазин в Тарту' },
    address: 'Jaamapõllu 12',
    zip: '51008 Tartu',
  },
  {
    city: 'Pärnu',
    label: { et: 'Pärnu pood', en: 'Pärnu Store', ru: 'Магазин в Пярну' },
    address: 'Päikesekalda 7',
    zip: '80032 Pärnu',
  },
];

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale() as Locale;

  return (
    <div className="pt-32 pb-24 px-6 md:px-16 min-h-screen bg-offwhite">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-[100px] font-bold uppercase tracking-tight leading-[0.9] text-charcoal mb-24"
          style={{ letterSpacing: '-0.02em' }}
        >
          {t('title')}
        </motion.h1>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Contact form - Takes 7 columns */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium mb-3 text-charcoal tracking-wide">{t('name')}</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border border-charcoal/10 bg-white focus:outline-none focus:ring-1 focus:ring-burnt-orange focus:border-burnt-orange transition-all duration-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-charcoal tracking-wide">{t('email')}</label>
                  <input
                    type="email"
                    className="w-full px-5 py-4 rounded-xl border border-charcoal/10 bg-white focus:outline-none focus:ring-1 focus:ring-burnt-orange focus:border-burnt-orange transition-all duration-300 shadow-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-charcoal tracking-wide">{t('message')}</label>
                <textarea
                  rows={6}
                  className="w-full px-5 py-4 rounded-xl border border-charcoal/10 bg-white focus:outline-none focus:ring-1 focus:ring-burnt-orange focus:border-burnt-orange transition-all duration-300 shadow-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="px-10 py-5 bg-charcoal text-offwhite font-medium rounded-lg hover:bg-burnt-orange tracking-widest uppercase text-sm transition-colors duration-300"
              >
                {t('send')}
              </button>
            </form>
          </motion.div>

          {/* Store locations - Takes 5 columns */}
          <motion.div 
            className="lg:col-span-5 space-y-12 lg:border-l lg:border-charcoal/10 lg:pl-16"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <h3 className="font-bold text-2xl tracking-tight mb-2 text-charcoal">UrbanStyle HQ</h3>
              <p className="text-charcoal/60 font-mono text-sm tracking-widest uppercase">Est. 2020 &middot; Tallinn</p>
            </div>
            
            <div className="space-y-10">
              {stores.map((store) => (
                <div key={store.city} className="group">
                  <h3 className="font-bold text-lg mb-2 text-charcoal group-hover:text-burnt-orange transition-colors">{store.label[locale]}</h3>
                  <p className="text-charcoal/70 leading-relaxed font-medium">
                    {store.address}<br />
                    <span className="font-mono text-sm mt-1 inline-block">{store.zip}</span>
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
