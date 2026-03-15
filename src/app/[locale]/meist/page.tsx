import { useTranslations, useLocale } from 'next-intl';
import { teamMembers, getTeamImageUrl } from '@/data/products';
import type { Locale } from '@/i18n/config';

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale() as Locale;

  const timeline = [
    { year: '2020', event: { et: 'Asutatud Tallinnas', en: 'Founded in Tallinn', ru: 'Основан в Таллинне' } },
    { year: '2021', event: { et: 'Esimene pop-up pood', en: 'First pop-up store', ru: 'Первый поп-ап магазин' } },
    { year: '2022', event: { et: 'E-poe avamine, laienemine Tartusse', en: 'E-commerce launch, expanded to Tartu', ru: 'Запуск интернет-магазина, расширение в Тарту' } },
    { year: '2023', event: { et: 'Pärnu pood, 350+ toodet', en: 'Pärnu store, 350+ products', ru: 'Магазин в Пярну, 350+ товаров' } },
    { year: '2025', event: { et: 'Andmepõhine transformatsioon algab', en: 'Data-driven transformation begins', ru: 'Начало цифровой трансформации' } },
  ];

  const storyText: Record<string, string> = {
    et: 'Asutatud 2020. aastal Tallinnas, UrbanStyle ühendab Eesti tänavakultuurist inspiratsiooni Skandinaavia disainipõhimõtetega. Alustades väikese hoolikalt valitud baaskollektsiooniga, on bränd kasvanud Tallinna loomingulise energia kehastuseks — toores, viimistletud ja vaieldamatult kohalik.',
    en: 'Founded in 2020 in Tallinn, UrbanStyle blends Estonian street culture with Scandinavian design principles. What started as a small collection of carefully crafted basics has grown into a brand that represents the creative energy of Tallinn — raw, refined, and unmistakably local.',
    ru: 'Основанный в 2020 году в Таллинне, UrbanStyle сочетает эстонскую уличную культуру со скандинавскими принципами дизайна. То, что началось как небольшая коллекция тщательно продуманных базовых вещей, выросло в бренд, воплощающий творческую энергию Таллинна — необработанную, утончённую и безошибочно местную.',
  };

  return (
    <div className="pt-24 pb-16">
      {/* Story section */}
      <section className="px-6 md:px-16 mb-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-8">
            {t('story')}
          </h1>
          <p className="text-lg text-charcoal/70 leading-relaxed">
            {storyText[locale] || storyText.en}
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-16 py-24 bg-charcoal text-offwhite mb-24">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {timeline.map(({ year, event }) => (
              <div key={year} className="flex gap-8 items-baseline">
                <span className="font-mono text-burnt-orange text-xl">{year}</span>
                <span className="text-lg">{event[locale] || event.en}</span>
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
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="aspect-[3/4] bg-limestone/30 rounded-lg overflow-hidden mb-4" />
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-charcoal/60 text-sm">{member.role[locale]}</p>
                <p className="text-charcoal/50 text-sm italic mt-2">&ldquo;{member.quote[locale]}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
