import { useTranslations, useLocale } from 'next-intl';
import type { Locale } from '@/i18n/config';

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
    <div className="pt-24 pb-16 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-16">
          {t('title')}
        </h1>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact form */}
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">{t('name')}</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-charcoal/20 bg-white focus:outline-none focus:ring-2 focus:ring-burnt-orange/50 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('email')}</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-charcoal/20 bg-white focus:outline-none focus:ring-2 focus:ring-burnt-orange/50 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('message')}</label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-charcoal/20 bg-white focus:outline-none focus:ring-2 focus:ring-burnt-orange/50 transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-charcoal text-offwhite font-medium rounded-lg hover:bg-burnt-orange transition-colors duration-300"
            >
              {t('send')}
            </button>
          </form>

          {/* Store locations */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-2">UrbanStyle</h3>
              <p className="text-charcoal/60 text-sm">Est. 2020 &middot; Tallinn</p>
            </div>
            {stores.map((store) => (
              <div key={store.city}>
                <h3 className="font-bold text-lg mb-2">{store.label[locale]}</h3>
                <p className="text-charcoal/60">{store.address}<br />{store.zip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
