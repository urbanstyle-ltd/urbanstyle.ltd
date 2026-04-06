import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  // Read localized metadata specifics for Approach page
  const t = await getTranslations({ locale, namespace: 'approach.meta' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: locale === 'et'
      ? ['andmeanalüütika', 'DACA', 'SQL', 'Python', 'Power BI', 'karjäärikiirendi', 'andmeteadus']
      : ['data analytics', 'DACA', 'SQL', 'Python', 'Power BI', 'career accelerator', 'data science'],
  };
}

export default async function ApproachLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'approach.meta' });
  
  // JSON-LD structured data mapping the DACA program as a Course
  // so that Google and AI bots immediately understand what this is.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": t('title'),
    "description": t('description'),
    "provider": {
      "@type": "Organization",
      "name": "UrbanStyle / Ettevõtluskeskus OÜ",
      "sameAs": "https://www.urbanstyle.ltd"
    },
    "coursePrerequisites": "No prior data experience required.",
    "educationalCredentialAwarded": "HAKA Microcredential",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Blended",
      "courseWorkload": "PT200H" // Roughly 200 hours across 11 weeks
    }
  };

  return (
    <>
      {/* We inject JSON-LD directly into the HTML tree */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
