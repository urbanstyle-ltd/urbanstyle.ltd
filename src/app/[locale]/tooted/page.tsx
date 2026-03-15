import { useTranslations } from 'next-intl';

export default function ProductsPage() {
  const t = useTranslations('products');

  return (
    <div className="pt-24 pb-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-16">
          {t('title')}
        </h1>

        {/* Filter bar */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
          {['all', 'jackets', 'hoodies', 'tees', 'pants', 'accessories'].map((filter) => (
            <button
              key={filter}
              className="px-6 py-2 rounded-full border border-charcoal/20 text-sm font-medium whitespace-nowrap hover:bg-charcoal hover:text-offwhite transition-colors duration-300"
            >
              {filter === 'all' ? t('all') : filter}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-limestone/30 rounded-lg overflow-hidden mb-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
                <div className="w-full h-full bg-limestone/50 group-hover:scale-[1.02] transition-transform duration-300" />
              </div>
              <h3 className="font-medium text-lg">Product Name</h3>
              <p className="font-mono text-sm text-charcoal/60 mt-1">&euro;89.00</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
