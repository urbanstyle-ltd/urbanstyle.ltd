import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { products, teamMembers, getProductImageUrl, getTeamImageUrl } from '@/data/products';
import type { Locale } from '@/i18n/config';

const featuredProducts = products.filter(p =>
  ['denim-jacket', 'sage-hoodie', 'tallinn-tee', 'charcoal-joggers', 'crossbody-bag', 'tech-parka'].includes(p.id)
);

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal">
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
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="aspect-[3/4] bg-limestone/30 rounded-lg overflow-hidden mb-4">
                  <img
                    src={getProductImageUrl(product.heroImage, 'md')}
                    alt={product.name[locale]}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-medium text-lg">{product.name[locale]}</h3>
                <p className="font-mono text-sm text-charcoal/60 mt-1">&euro;{product.price}.00</p>
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
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="aspect-square bg-limestone/30 rounded-full overflow-hidden mb-4 mx-auto w-32 h-32" />
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-charcoal/60 text-sm">{member.role[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
