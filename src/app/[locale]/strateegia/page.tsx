import { useTranslations, useLocale } from 'next-intl';
import type { Locale } from '@/i18n/config';

export default function StrategyPage() {
  const t = useTranslations('strategy');
  const locale = useLocale() as Locale;

  const challengeText: Record<string, string> = {
    et: 'Kui UrbanStyle kasvas väikesest Tallinna brändist kolme linna ja 350+ tootega ettevõtteks, kasvas ka otsuste keerukus plahvatuslikult. Laohaldus, kliendiarusaamad, turunduse tootlikkus — intuitsioon üksi ei pidanud enam sammu.',
    en: 'As UrbanStyle grew from a small Tallinn brand to operating across three cities with 350+ products, the complexity of decisions grew exponentially. Inventory management, customer insights, marketing ROI — intuition alone could no longer keep pace.',
    ru: 'По мере роста UrbanStyle от небольшого таллиннского бренда до компании с тремя магазинами и 350+ товарами, сложность решений росла экспоненциально. Управление запасами, понимание клиентов, ROI маркетинга — одной интуиции уже было недостаточно.',
  };

  const transformText: Record<string, string> = {
    et: 'Alustasime strateegilist transformatsiooni, integreerides andmeanalüüsi ja tehisintellekti igasse funktiooni — tarneahela optimeerimisest personaliseeritud turunduseni. See polnud ainult tööriistade küsimus, vaid andmekirjaoskuse kultuuri loomine kogu organisatsioonis.',
    en: 'We embarked on a strategic transformation, embedding data analytics and AI into every function — from supply chain optimization to personalized marketing. This was not just about tools; it was about building a data-literate culture across the entire organization.',
    ru: 'Мы начали стратегическую трансформацию, внедряя аналитику данных и ИИ в каждую функцию — от оптимизации цепочки поставок до персонализированного маркетинга. Дело было не только в инструментах, а в создании культуры работы с данными во всей организации.',
  };

  const challengeTitle: Record<string, string> = {
    et: 'Väljakutse', en: 'The Challenge', ru: 'Вызов',
  };

  const ctaText: Record<string, string> = {
    et: 'Meie andmepõhist transformatsiooni toetasid andekad analüütikud DACA programmist. Avasta, kuidas saad olla järgmise lennu osa.',
    en: 'Our data transformation was supported by talented analysts from the DACA program. Discover how you can be part of the next cohort.',
    ru: 'Нашу цифровую трансформацию поддержали талантливые аналитики из программы DACA. Узнайте, как стать частью следующего потока.',
  };

  const aiCards: { title: Record<string, string>; desc: Record<string, string> }[] = [
    { title: { et: 'Nõudluse prognoosimine', en: 'Demand Forecasting', ru: 'Прогнозирование спроса' }, desc: { et: 'AI-põhised prognoosid vähendavad ülelaoseisu 30%', en: 'AI-powered predictions reduce overstock by 30%', ru: 'Прогнозы на основе ИИ сокращают избыточные запасы на 30%' } },
    { title: { et: 'Kliendisegmentimine', en: 'Customer Segmentation', ru: 'Сегментация клиентов' }, desc: { et: 'Andmepõhised persoonad sihitud kampaaniate jaoks', en: 'Data-driven personas for targeted campaigns', ru: 'Персоны на основе данных для целевых кампаний' } },
    { title: { et: 'Tarneahel', en: 'Supply Chain', ru: 'Цепочка поставок' }, desc: { et: 'Automaatsed täienduspunktid kolme poe vahel', en: 'Automated reorder points across 3 stores', ru: 'Автоматические точки повторного заказа в 3 магазинах' } },
    { title: { et: 'Sisu loomine', en: 'Content Creation', ru: 'Создание контента' }, desc: { et: 'AI-toetatud tootekirjeldused ja visuaalid', en: 'AI-assisted product descriptions and imagery', ru: 'Описания товаров и визуалы с помощью ИИ' } },
  ];

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
            {challengeTitle[locale]}
          </h2>
          <p className="text-lg text-charcoal/70 leading-relaxed mb-12">
            {challengeText[locale]}
          </p>

          <h2 className="text-3xl font-bold uppercase tracking-wide mb-8">
            {t('dataTransformation')}
          </h2>
          <p className="text-lg text-charcoal/70 leading-relaxed">
            {transformText[locale]}
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
            {aiCards.map((card) => (
              <div key={card.title.en} className="bg-white rounded-xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
                <h3 className="font-bold text-lg mb-2">{card.title[locale]}</h3>
                <p className="text-charcoal/60">{card.desc[locale]}</p>
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
            {ctaText[locale]}
          </p>
          <a
            href={locale === 'et'
              ? 'https://www.ettevotluskeskus.ee/daca25-andmeanaluutiku-karjaarikiirendi'
              : 'https://www.ettevotluskeskus.ee/daca25en-data-analyst-career-accelerator'}
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
