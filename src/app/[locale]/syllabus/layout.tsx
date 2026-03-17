import { getTranslations } from "next-intl/server";

import { Suspense } from "react";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale: locale,
    namespace: "approach.meta",
  });

  return {
    title: `Syllabus | ${t("title")}`,
    description: t("description"),
  };
}

export default function SyllabusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
