"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

const AUDIENCES = ["learner", "employer", "partner", "contact"] as const;
type Audience = (typeof AUDIENCES)[number];

const UTM = "?utm_source=qr&utm_medium=conference&utm_campaign=daca2026";

// Locale-aware approach paths (ET default has no prefix)
const APPROACH_PATHS: Record<string, string> = {
  et: "/lahenemine",
  en: "/en/approach",
  ru: "/ru/podkhod",
};

function getRedirectUrl(audience: Exclude<Audience, "contact">, locale: string): string {
  const basePath = APPROACH_PATHS[locale] || APPROACH_PATHS.en;
  const HASH_MAP: Record<Exclude<Audience, "contact">, string> = {
    learner: "#learners",
    employer: "#employers",
    partner: "#methodology",
  };
  return basePath + HASH_MAP[audience];
}

// Locale-aware redirect labels (RU falls back to EN)
const REDIRECT_LABELS: Record<string, Record<Exclude<Audience, "contact">, string>> = {
  et: {
    learner: "Suunamine õppija infole...",
    employer: "Suunamine tööandja infole...",
    partner: "Suunamine koostöö detailidele...",
  },
  en: {
    learner: "Redirecting to learner information...",
    employer: "Redirecting to employer information...",
    partner: "Redirecting to partnership details...",
  },
};

function getRedirectLabel(audience: Exclude<Audience, "contact">, locale: string): string {
  const labels = REDIRECT_LABELS[locale] || REDIRECT_LABELS.en;
  return labels[audience];
}

// Locale-aware contact card labels (RU falls back to EN)
const CONTACT_LABELS: Record<string, {
  saveContact: string;
  saved: string;
  mobile: string;
  email: string;
  office: string;
  program: string;
  programm: string;
  iosHint: string;
}> = {
  et: {
    saveContact: "Salvesta kontakt",
    saved: "Salvestatud!",
    mobile: "Mobiil",
    email: "E-post",
    office: "Kontor",
    program: "Program",
    programm: "Programm",
    iosHint: "iOS: Puuduta Jaga > Lisa avakuvale",
  },
  en: {
    saveContact: "Save Contact",
    saved: "Saved!",
    mobile: "Mobile",
    email: "Email",
    office: "Office",
    program: "Program",
    programm: "Programm",
    iosHint: "iOS: Tap Share > Add to Home Screen",
  },
};

function getContactLabels(locale: string) {
  return CONTACT_LABELS[locale] || CONTACT_LABELS.en;
}

// --- vCard generator ---
function generateVCard(): string {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Kozlov;Alek;;;",
    "FN:Alek Kozlov",
    "ORG:Ettevotluskeskus OU",
    "TITLE:Program Producer, DACA",
    "TEL;TYPE=CELL:+372 502 1033",
    "TEL;TYPE=WORK:+372 652 0001",
    "EMAIL;TYPE=WORK:info@ettevotluskeskus.ee",
    "URL:https://urbanstyle.ltd",
    "URL:https://www.ettevotluskeskus.ee/daca25en-data-analyst-career-accelerator",
    "END:VCARD",
  ].join("\r\n");
}

function downloadVCard() {
  const vcf = generateVCard();
  const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "alek-kozlov.vcf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// --- Redirect page (learner / employer / partner) ---
function RedirectPage({ audience }: { audience: Exclude<Audience, "contact"> }) {
  const locale = useLocale();

  useEffect(() => {
    const target = getRedirectUrl(audience, locale) + UTM;
    const timer = setTimeout(() => {
      window.location.href = target;
    }, 1200);
    return () => clearTimeout(timer);
  }, [audience, locale]);

  const redirectUrl = getRedirectUrl(audience, locale);

  return (
    <div className="fixed inset-0 z-[100] bg-charcoal flex flex-col items-center justify-center text-offwhite">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* UrbanStyle wordmark */}
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          style={{ letterSpacing: "-0.03em" }}
        >
          <span className="text-offwhite">Urban</span>
          <span className="text-burnt-orange">Style</span>
        </h1>

        {/* Loading indicator */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <motion.div
            className="w-2 h-2 rounded-full bg-burnt-orange"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-burnt-orange"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-burnt-orange"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>

        <p className="text-offwhite/60 text-sm font-mono tracking-wide">
          {getRedirectLabel(audience, locale)}
        </p>
      </motion.div>

      {/* Fallback link */}
      <noscript>
        <meta
          httpEquiv="refresh"
          content={`0;url=${redirectUrl}${UTM}`}
        />
        <p style={{ color: "#F5F0EB", textAlign: "center", marginTop: "2rem" }}>
          <a
            href={`${redirectUrl}${UTM}`}
            style={{ color: "#C4622D" }}
          >
            Click here if not redirected
          </a>
        </p>
      </noscript>
    </div>
  );
}

// --- Contact card page ---
function ContactCard() {
  const locale = useLocale();
  const labels = getContactLabels(locale);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    downloadVCard();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-charcoal via-[#1a1a1a] to-[#0d0d0d] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
          {/* Header accent */}
          <div className="h-1.5 bg-gradient-to-r from-burnt-orange via-dusty-rose to-sage" />

          {/* Content */}
          <div className="p-8 text-center">
            {/* Avatar circle */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-burnt-orange to-dusty-rose mx-auto mb-5 flex items-center justify-center">
              <span className="text-offwhite text-2xl font-bold">AK</span>
            </div>

            {/* Name & Title */}
            <h1 className="text-2xl font-bold text-offwhite tracking-tight mb-1">
              Alek Kozlov
            </h1>
            <p className="text-burnt-orange text-sm font-medium tracking-wide uppercase mb-1">
              Program Producer
            </p>
            <p className="text-offwhite/40 text-xs font-mono tracking-widest uppercase mb-8">
              DACA &middot; Ettevotluskeskus OU
            </p>

            {/* Contact details */}
            <div className="space-y-4 text-left">
              <a
                href="tel:+3725021033"
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-burnt-orange/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-burnt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-offwhite/40 text-xs font-mono uppercase tracking-wider">{labels.mobile}</p>
                  <p className="text-offwhite text-sm font-medium group-hover:text-burnt-orange transition-colors">+372 502 1033</p>
                </div>
              </a>

              <a
                href="mailto:info@ettevotluskeskus.ee"
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-sage/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-offwhite/40 text-xs font-mono uppercase tracking-wider">{labels.email}</p>
                  <p className="text-offwhite text-sm font-medium group-hover:text-sage transition-colors">info@ettevotluskeskus.ee</p>
                </div>
              </a>

              <a
                href="tel:+3726520001"
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-blue/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-slate-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                </div>
                <div>
                  <p className="text-offwhite/40 text-xs font-mono uppercase tracking-wider">{labels.office}</p>
                  <p className="text-offwhite text-sm font-medium group-hover:text-slate-blue transition-colors">+372 652 0001</p>
                </div>
              </a>
            </div>

            {/* Program links */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.ettevotluskeskus.ee/daca25en-data-analyst-career-accelerator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-center transition-colors"
              >
                <span className="text-offwhite/60 text-xs font-mono uppercase tracking-wider block">{labels.program}</span>
                <span className="text-offwhite text-sm font-medium">EN</span>
              </a>
              <a
                href="https://www.ettevotluskeskus.ee/daca25-andmeanaluutiku-karjaarikiirendi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-center transition-colors"
              >
                <span className="text-offwhite/60 text-xs font-mono uppercase tracking-wider block">{labels.programm}</span>
                <span className="text-offwhite text-sm font-medium">ET</span>
              </a>
            </div>

            {/* Save Contact button */}
            <motion.button
              onClick={handleSave}
              whileTap={{ scale: 0.97 }}
              className="mt-6 w-full py-4 rounded-xl bg-burnt-orange text-offwhite font-semibold text-sm uppercase tracking-widest hover:bg-burnt-orange/90 transition-colors"
            >
              {saved ? labels.saved : labels.saveContact}
            </motion.button>

            {/* iOS hint */}
            <p className="mt-4 text-offwhite/30 text-[11px] font-mono">
              {labels.iosHint}
            </p>
          </div>
        </div>

        {/* Branding */}
        <p className="text-center mt-6 text-offwhite/20 text-xs font-mono tracking-[0.3em] uppercase">
          urbanstyle.ltd
        </p>
      </motion.div>
    </div>
  );
}

// --- Main page component ---
export default function QrAudiencePage() {
  const params = useParams();
  const audience = params.audience as string;

  if (!AUDIENCES.includes(audience as Audience)) {
    return (
      <div className="fixed inset-0 z-[100] bg-charcoal flex items-center justify-center text-offwhite">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">404</h1>
          <p className="text-offwhite/60 font-mono text-sm">Unknown audience type</p>
        </div>
      </div>
    );
  }

  if (audience === "contact") {
    return <ContactCard />;
  }

  return <RedirectPage audience={audience as Exclude<Audience, "contact">} />;
}
