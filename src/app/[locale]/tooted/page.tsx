import { useTranslations, useLocale } from 'next-intl';
import { products, getProductImageUrl } from '@/data/products';
import type { Locale } from '@/i18n/config';
import { motion } from 'framer-motion';
import { DataInsightWidget } from '@/components/ui/DataInsight';

export default function ProductsPage() {
  const t = useTranslations('products');
  const locale = useLocale() as Locale;

  return (
    <div className="pt-24 pb-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-16">
          {t('title')}
        </h1>

        {/* Filter bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mb-20 overflow-x-auto pb-4 scrollbar-hide"
        >
          {['all', 'jackets', 'hoodies', 'tees', 'pants', 'accessories'].map((filter) => (
            <button
              key={filter}
              className="px-6 py-2 rounded-lg border border-charcoal/20 text-sm font-medium whitespace-nowrap hover:bg-charcoal hover:text-offwhite transition-colors duration-300 tracking-wide"
            >
              {filter === 'all' ? t('all') : filter}
            </button>
          ))}
        </motion.div>

        {/* Product grid - Asymmetrical with aggressive whitespace */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-24 gap-x-12 lg:gap-x-16">
          {products.map((product, idx) => {
            // Create an asymmetrical layout pattern (span 5, 7, 6, 6 columns etc)
            const isWide = idx % 3 === 0;
            const spanClass = isWide ? 'lg:col-span-7' : 'lg:col-span-5';
            
            // Offset every other item vertically on large screens for a staggered look
            const offsetClass = idx % 2 !== 0 ? 'lg:mt-32' : '';

            // Simulated dynamic analytics data per product
            const views = Math.floor(Math.random() * 500) + 100;
            const trend = Math.random() > 0.5 ? 'up' : 'down';

            return (
              <motion.div 
                key={product.id} 
                className={`group cursor-pointer flex flex-col ${spanClass} ${offsetClass}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="relative aspect-[3/4] bg-offwhite rounded-lg overflow-hidden mb-8 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                  <motion.img
                    src={getProductImageUrl(product.heroImage, 'md')}
                    alt={product.name[locale]}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    loading="lazy"
                  />
                  
                  {/* Subtle Tech Overlay - The "Dual Interface" trick */}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 pointer-events-none transition-colors duration-300" />
                  
                  {/* Data Insight Overlay */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100"
                  >
                    <DataInsightWidget 
                      label="View Velocity" 
                      value={`${views}/h`} 
                      trend={trend as any} 
                    />
                  </motion.div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl lg:text-2xl tracking-tight text-charcoal">{product.name[locale]}</h3>
                    <p className="text-sm text-charcoal/50 mt-1 uppercase tracking-widest">{t('category_' + product.category, { defaultValue: product.category })}</p>
                  </div>
                  <p className="font-mono text-lg font-medium text-charcoal">&euro;{product.price}.00</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
