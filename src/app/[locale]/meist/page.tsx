import { useTranslations } from 'next-intl';

const team = [
  { name: 'Kristi Tamm', role: 'CEO', quote: 'Quality over quantity, always.' },
  { name: 'Toomas Kask', role: 'IT Director', quote: 'Data drives every decision.' },
  { name: 'Anna Mets', role: 'Marketing Lead', quote: 'Authentic stories resonate.' },
  { name: 'Marko Saar', role: 'Product Manager', quote: 'Every stitch matters.' },
  { name: 'Liis Koppel', role: 'Operations Manager', quote: 'Efficiency creates freedom.' },
];

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="pt-24 pb-16">
      {/* Story section */}
      <section className="px-6 md:px-16 mb-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-8">
            {t('story')}
          </h1>
          <p className="text-lg text-charcoal/70 leading-relaxed">
            Founded in 2020 in Tallinn, UrbanStyle blends Estonian street culture with Scandinavian design principles.
            What started as a small collection of carefully crafted basics has grown into a brand that represents
            the creative energy of Tallinn — raw, refined, and unmistakably local.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-16 py-24 bg-charcoal text-offwhite mb-24">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {[
              { year: '2020', event: 'Founded in Tallinn' },
              { year: '2021', event: 'First pop-up store in Rotermann Quarter' },
              { year: '2022', event: 'Launched e-commerce, expanded to Tartu' },
              { year: '2023', event: 'P\u00e4rnu store opened, 350+ products' },
              { year: '2024', event: 'Data-driven transformation begins' },
            ].map(({ year, event }) => (
              <div key={year} className="flex gap-8 items-baseline">
                <span className="font-mono text-burnt-orange text-xl">{year}</span>
                <span className="text-lg">{event}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold uppercase tracking-wide mb-16">
            {t('team')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {team.map(({ name, role, quote }) => (
              <div key={name} className="text-center">
                <div className="aspect-[3/4] bg-limestone/30 rounded-lg overflow-hidden mb-4" />
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="text-charcoal/60 text-sm">{role}</p>
                <p className="text-charcoal/50 text-sm italic mt-2">&ldquo;{quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
