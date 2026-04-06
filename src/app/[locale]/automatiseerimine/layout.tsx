import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'automation.meta' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  };
}

export default async function AutomationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'automation.meta' });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": t('title'),
    "description": t('description'),
    "provider": {
      "@type": "Organization",
      "name": "Ettevõtluskeskus OÜ",
      "sameAs": "https://www.ettevotluskeskus.ee"
    },
    "coursePrerequisites": "No prior AI or automation experience required.",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Blended",
      "courseWorkload": "PT80H"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
