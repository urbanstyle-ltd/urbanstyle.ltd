import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR | UrbanStyle',
  robots: { index: false, follow: false },
};

export default function QrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Render children directly — the parent locale layout still provides
  // fonts, body classes, and NextIntlClientProvider. The QR pages use
  // fixed positioning to overlay the Header/Footer from the parent layout.
  return <>{children}</>;
}
