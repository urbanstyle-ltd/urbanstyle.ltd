import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');

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

          {/* Company info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-2">UrbanStyle O\u00dc</h3>
              <p className="text-charcoal/60">Reg. 16XXXXXX</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Tallinn</h3>
              <p className="text-charcoal/60">Rotermanni kvartal<br />Tallinn 10111, Estonia</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Tartu</h3>
              <p className="text-charcoal/60">K\u00fc\u00fcni 5<br />Tartu 51003, Estonia</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">P\u00e4rnu</h3>
              <p className="text-charcoal/60">R\u00fc\u00fctli 40<br />P\u00e4rnu 80011, Estonia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
