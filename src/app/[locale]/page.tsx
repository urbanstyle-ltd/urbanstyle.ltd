import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal">
          {/* Hero image placeholder - will be replaced with gen-AI lifestyle photo */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-offwhite tracking-tight uppercase">
            {t('hero.headline')}
          </h1>
          <div className="mt-8">
            <Link
              href="/tooted"
              className="inline-flex items-center justify-center px-8 py-4 bg-burnt-orange text-offwhite font-medium rounded-lg text-lg hover:bg-burnt-orange/90 transition-colors duration-300"
            >
              {t('hero.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-24 px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-charcoal/80">
            {t('brand.statement')}
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold uppercase tracking-wide mb-16">
            {t('products.featured')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product cards will be populated with gen-AI images */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group">
                <div className="aspect-[3/4] bg-limestone/30 rounded-lg overflow-hidden mb-4">
                  <div className="w-full h-full bg-limestone/50 group-hover:scale-[1.02] transition-transform duration-300" />
                </div>
                <h3 className="font-medium text-lg">Product {i}</h3>
                <p className="font-mono text-sm text-charcoal/60 mt-1">&euro;89.00</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data & Strategy Teaser */}
      <section className="py-24 px-6 md:px-16 bg-charcoal text-offwhite">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-8">
            {t('strategy.headline')}
          </h2>
          <p className="text-lg text-offwhite/70 mb-12 max-w-2xl mx-auto">
            {t('strategy.dataTransformation')}
          </p>
          <Link
            href="/strateegia"
            className="inline-flex items-center justify-center px-8 py-4 border border-offwhite/30 text-offwhite font-medium rounded-lg hover:bg-offwhite/10 transition-colors duration-300"
          >
            {t('strategy.joinCta')}
          </Link>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold uppercase tracking-wide mb-16">
            {t('about.team')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {['Kristi Tamm', 'Toomas Kask', 'Anna Mets', 'Marko Saar', 'Liis Koppel'].map((name) => (
              <div key={name} className="text-center">
                <div className="aspect-square bg-limestone/30 rounded-full overflow-hidden mb-4 mx-auto w-32 h-32" />
                <h3 className="font-medium">{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
