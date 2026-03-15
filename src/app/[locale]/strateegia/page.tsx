import { useTranslations } from 'next-intl';

export default function StrategyPage() {
  const t = useTranslations('strategy');

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="px-6 md:px-16 py-24 bg-charcoal text-offwhite">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide mb-8">
            {t('headline')}
          </h1>
          <p className="text-xl text-offwhite/70 max-w-2xl mx-auto">
            {t('dataTransformation')}
          </p>
        </div>
      </section>

      {/* Problem - Transformation */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold uppercase tracking-wide mb-8">
            The Challenge
          </h2>
          <p className="text-lg text-charcoal/70 leading-relaxed mb-12">
            As UrbanStyle grew from a small Tallinn brand to operating across three cities with 350+ products,
            the complexity of decisions grew exponentially. Inventory management, customer insights, marketing ROI —
            intuition alone could no longer keep pace.
          </p>

          <h2 className="text-3xl font-bold uppercase tracking-wide mb-8">
            {t('dataTransformation')}
          </h2>
          <p className="text-lg text-charcoal/70 leading-relaxed">
            We embarked on a strategic transformation, embedding data analytics and AI into every function —
            from supply chain optimization to personalized marketing. This wasn&apos;t just about tools;
            it was about building a data-literate culture across the entire organization.
          </p>
        </div>
      </section>

      {/* AI Role */}
      <section className="px-6 md:px-16 py-24 bg-limestone/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold uppercase tracking-wide mb-12">
            {t('aiRole')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Demand Forecasting', desc: 'AI-powered predictions reduce overstock by 30%' },
              { title: 'Customer Segmentation', desc: 'Data-driven personas for targeted campaigns' },
              { title: 'Supply Chain', desc: 'Automated reorder points across 3 stores' },
              { title: 'Content Creation', desc: 'AI-assisted product descriptions and imagery' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-charcoal/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - conversion funnel to DACA program */}
      <section className="px-6 md:px-16 py-24 bg-charcoal text-offwhite text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-8">
            {t('joinCta')}
          </h2>
          <p className="text-lg text-offwhite/70 mb-12">
            Our data transformation was supported by talented analysts from the DACA program.
            Discover how you can be part of the next cohort.
          </p>
          <a
            href="https://ettevotluskeskus.ee/daca"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-5 bg-burnt-orange text-offwhite font-bold rounded-lg text-lg hover:bg-burnt-orange/90 transition-colors duration-300"
          >
            {t('programLink')}
          </a>
        </div>
      </section>
    </div>
  );
}
