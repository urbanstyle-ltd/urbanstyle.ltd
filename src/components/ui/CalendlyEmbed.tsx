"use client";

import { useEffect, useRef } from 'react';

type ThemeType = "dark" | "light" | "slate";

export default function CalendlyEmbed({ 
  url = "https://calendly.com/alekkozlov/daca-with-producer-data-analyst-career-accelerator",
  theme = "light" 
}: { 
  url?: string;
  theme?: ThemeType 
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only load the script if it hasn't been loaded yet.
    if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Determine colors based on theme tokens
  let bgColor = "F5F0EB"; // offwhite
  let textColor = "2C2C2C"; // charcoal
  const primaryColor = "C4622D"; // burnt-orange

  if (theme === "dark") {
    bgColor = "2C2C2C";
    textColor = "F5F0EB";
  } else if (theme === "slate") {
    bgColor = "4A6274";
    textColor = "F5F0EB";
  }

  const finalUrl = `${url}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=${bgColor}&text_color=${textColor}&primary_color=${primaryColor}`;

  return (
    <div 
      ref={containerRef}
      className="calendly-inline-widget w-full rounded-xl overflow-hidden mx-auto shadow-2xl border border-charcoal/10" 
      data-url={finalUrl} 
      style={{ minWidth: '320px', height: '700px', maxWidth: '1000px' }} 
    />
  );
}
