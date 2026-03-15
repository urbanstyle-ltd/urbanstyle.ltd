import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-offwhite">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold tracking-wider mb-4">UrbanStyle</h3>
            <p className="text-offwhite/50 text-sm">
              Tallinn &middot; Est. 2020
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-medium mb-4">{t('products')}</h4>
            <ul className="space-y-2 text-sm text-offwhite/60">
              <li><Link href="/tooted" className="hover:text-offwhite transition-colors">{t('products')}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium mb-4">{t('company')}</h4>
            <ul className="space-y-2 text-sm text-offwhite/60">
              <li><Link href="/meist" className="hover:text-offwhite transition-colors">{t('about')}</Link></li>
              <li><Link href="/strateegia" className="hover:text-offwhite transition-colors">{t('strategy')}</Link></li>
              <li><Link href="/kontakt" className="hover:text-offwhite transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-medium mb-4">{t('newsletter')}</h4>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                className="flex-1 px-4 py-2 bg-offwhite/10 rounded-lg text-sm border border-offwhite/10 focus:outline-none focus:ring-1 focus:ring-burnt-orange/50"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-burnt-orange text-offwhite text-sm font-medium rounded-lg hover:bg-burnt-orange/90 transition-colors"
              >
                {t('subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-offwhite/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-offwhite/40">
            {t('copyright', { year })}
          </p>
          <p className="text-xs text-offwhite/30">
            {t('simulation')}{' '}
            <a
              href="https://ettevotluskeskus.ee"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-offwhite/50 transition-colors"
            >
              {t('moreInfo')}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
