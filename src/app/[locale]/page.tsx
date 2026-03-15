import { useTranslations, useLocale } from 'next-intl';
import { products, teamMembers, getProductImageUrl } from '@/data/products';
import type { Locale } from '@/i18n/config';

import Hero from '@/components/sections/Hero';
import StrategyTeaser from '@/components/sections/StrategyTeaser';

const featuredProducts = products.filter(p =>
  ['denim-jacket', 'sage-hoodie', 'tallinn-tee', 'charcoal-joggers', 'crossbody-bag', 'tech-parka'].includes(p.id)
);

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  return (
    <>
      <Hero />

      {/* Brand Statement */}
      <section className="py-32 px-6 md:px-16 bg-offwhite">
        <div className="max-w-4xl mx-auto text-center border-b border-charcoal/10 pb-24">
          <p className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-charcoal/90 mb-8">
            {t('brand.statement')}
          </p>
          <div className="w-16 h-1 bg-burnt-orange mx-auto" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 md:px-16 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl font-bold uppercase tracking-widest text-charcoal">
              {t('products.featured')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-limestone/20 overflow-hidden mb-6 relative">
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 mix-blend-multiply transition-colors duration-500 z-10" />
                  <img
                    src={getProductImageUrl(product.heroImage, 'lg')}
                    alt={product.name[locale]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Fake "data metric" overlay on hover */}
                  <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div aria-hidden="true" className="bg-charcoal/80 backdrop-blur-md text-offwhite text-xs font-mono px-2 py-1 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                       <span className="before:content-[attr(data-text)]" data-text={`TRENDING: ${(Math.random() * 4 + 1).toFixed(1)}K VIEWS/DAY`} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg uppercase tracking-wide group-hover:text-burnt-orange transition-colors">{product.name[locale]}</h3>
                  <p className="font-mono font-medium text-charcoal">&euro;{product.price}</p>
                </div>
                <p className="text-sm text-charcoal/50 mt-1">{product.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StrategyTeaser />

      {/* Team Preview */}
      <section className="py-24 px-6 md:px-16 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold uppercase tracking-widest mb-16 text-center text-charcoal">
            {t('about.team')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center group">
                <div className="aspect-square bg-limestone/30 rounded-full overflow-hidden mb-6 mx-auto w-40 h-40 filter grayscale group-hover:grayscale-0 transition-all duration-500 shadow-sm group-hover:shadow-md" />
                <h3 className="font-semibold tracking-wide uppercase">{member.name}</h3>
                <p className="text-burnt-orange text-sm mt-1">{member.role[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
