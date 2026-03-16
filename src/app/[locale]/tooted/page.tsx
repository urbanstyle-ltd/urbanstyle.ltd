"use client";

import { useTranslations, useLocale } from 'next-intl';
import { products, getProductImageUrl } from '@/data/products';
import type { Locale } from '@/i18n/config';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { DataInsightWidget } from '@/components/ui/DataInsight';
import { useState } from 'react';

export default function ProductsPage() {
  const t = useTranslations('products');
  const locale = useLocale() as Locale;
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <div className="pt-24 pb-16 px-6 md:px-16">
      <div className="relative w-full h-[40vh] min-h-[400px] mb-16 overflow-hidden flex items-center justify-center p-6 md:p-16">
        {/* Background Image */}
        <div className="absolute inset-0 bg-charcoal">
          <img 
            src={getProductImageUrl('hero_product_focus', 'lg')}
            alt="UrbanStyle Products"
            className="w-full h-full object-cover object-center opacity-80 mix-blend-overlay"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-offwhite via-offwhite/5 to-transparent" />
        
        <div className="relative z-10 text-center max-w-2xl mx-auto mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-charcoal mb-4"
          >
            {t('title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-charcoal/80 font-medium"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Filter bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mb-20 overflow-x-auto pb-4 scrollbar-hide"
        >
          {['all', 'jackets', 'hoodies', 'tees', 'pants', 'outerwear', 'footwear', 'bags', 'accessories'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-lg border text-sm font-medium whitespace-nowrap transition-colors duration-300 tracking-wide ${
                activeFilter === filter 
                  ? 'bg-charcoal text-offwhite border-charcoal' 
                  : 'border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-offwhite'
              }`}
            >
              {filter === 'all' ? t('all') : t('category_' + filter, { defaultValue: filter })}
            </button>
          ))}
        </motion.div>

        {/* Product grid - Uniform 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-8 lg:gap-x-12">
          {filteredProducts.map((product) => {
            // Simulated dynamic analytics data per product
            const views = Math.floor(Math.random() * 500) + 100;
            const trend = Math.random() > 0.5 ? 'up' : 'down';

            return (
              <motion.div 
                key={product.id} 
                layout
                className="group cursor-pointer flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="relative aspect-[3/4] bg-offwhite rounded-lg overflow-hidden mb-8 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                  <motion.div
                    className="absolute inset-0 w-full h-full"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Image
                      src={getProductImageUrl(product.heroImage, 'md')}
                      alt={product.seoAlt[locale as Locale]}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </motion.div>
                  
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
                    <h3 className="font-bold text-xl lg:text-2xl tracking-tight text-charcoal">{product.name[locale as Locale]}</h3>
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
