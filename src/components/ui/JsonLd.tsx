export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "Brand"],
    "name": "UrbanStyle",
    "url": "https://urbanstyle.ltd",
    "logo": "https://urbanstyle.ltd/icon.png",
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Kristi Tamm"
    },
    "description": "Premium Estonian urban streetwear brand. Tallinn street culture refined through Scandinavian clarity.",
    "sameAs": [
      "https://urbanstyle.ltd/strateegia",
      "https://www.ettevotluskeskus.ee/daca25-andmeanaluutiku-karjaarikiirendi"
    ],
    "knowsAbout": ["Data Analytics", "Streetwear", "E-commerce Optimization", "Digital Transformation", "DACA"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Tormilinna 4",
      "addressLocality": "Tallinn",
      "postalCode": "10145",
      "addressCountry": "EE"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
