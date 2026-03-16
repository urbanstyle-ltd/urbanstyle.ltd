"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

// Locale-aware labels (RU falls back to EN)
const LABELS: Record<string, {
  qrCodes: string;
  forLearners: string;
  programInfo: string;
  forEmployers: string;
  partnership: string;
  forPartners: string;
  methodology: string;
  myContact: string;
  vCard: string;
  bookMeeting: string;
  meetingDesc: string;
  hint: string;
  tapToClose: string;
}> = {
  et: {
    qrCodes: "QR koodid",
    forLearners: "Õppijale",
    programInfo: "Programmi info",
    forEmployers: "Tööandjale",
    partnership: "Koostöö",
    forPartners: "Partnerile",
    methodology: "Metoodika",
    myContact: "Minu kontakt",
    vCard: "vCard",
    bookMeeting: "Broneeri kohtumine",
    meetingDesc: "15 min Google Meet",
    hint: "Puuduta suurendamiseks \u00b7 Hoia all salvestamiseks",
    tapToClose: "Puuduta sulgemiseks",
  },
  en: {
    qrCodes: "QR Codes",
    forLearners: "For Learners",
    programInfo: "Program info",
    forEmployers: "For Employers",
    partnership: "Partnership",
    forPartners: "For Partners",
    methodology: "Methodology",
    myContact: "My Contact",
    vCard: "vCard",
    bookMeeting: "Book a Meeting",
    meetingDesc: "15 min Google Meet",
    hint: "Tap to show fullscreen \u00b7 Press & hold to save",
    tapToClose: "Tap anywhere to close",
  },
  ru: {
    qrCodes: "QR коды",
    forLearners: "Для учащихся",
    programInfo: "Информация",
    forEmployers: "Для работодателей",
    partnership: "Сотрудничество",
    forPartners: "Для партнёров",
    methodology: "Методология",
    myContact: "Мой контакт",
    vCard: "vCard",
    bookMeeting: "Записаться на встречу",
    meetingDesc: "15 мин Google Meet",
    hint: "Нажмите для полноэкранного просмотра \u00b7 Удерживайте для сохранения",
    tapToClose: "Нажмите для закрытия",
  },
  lv: {
    qrCodes: "QR kodi",
    forLearners: "Dalībniekiem",
    programInfo: "Programmas info",
    forEmployers: "Darba devējiem",
    partnership: "Sadarbība",
    forPartners: "Partneriem",
    methodology: "Metodoloģija",
    myContact: "Mans kontakts",
    vCard: "vCard",
    bookMeeting: "Rezervēt tikšanos",
    meetingDesc: "15 min Google Meet",
    hint: "Nospiediet pilnekrāna režīmam \u00b7 Turiet nospiestu saglabāšanai",
    tapToClose: "Nospiediet lai aizvērtu",
  },
};

function getLabels(locale: string) {
  return LABELS[locale] || LABELS.en;
}

function getQrCodes(locale: string) {
  const l = getLabels(locale);
  return [
    {
      id: "learner",
      label: l.forLearners,
      sublabel: l.programInfo,
      color: "#7A8B6F", // sage
      url: "https://urbanstyle.ltd/en/qr/learner",
    },
    {
      id: "employer",
      label: l.forEmployers,
      sublabel: l.partnership,
      color: "#4A6274", // slate-blue
      url: "https://urbanstyle.ltd/en/qr/employer",
    },
    {
      id: "partner",
      label: l.forPartners,
      sublabel: l.methodology,
      color: "#C4622D", // burnt-orange
      url: "https://urbanstyle.ltd/en/qr/partner",
    },
    {
      id: "contact",
      label: l.myContact,
      sublabel: l.vCard,
      color: "#C4A08A", // dusty-rose
      url: "https://urbanstyle.ltd/en/qr/contact",
    },
    {
      id: "calendly",
      label: l.bookMeeting,
      sublabel: l.meetingDesc,
      color: "#C4622D", // burnt-orange
      url: "https://calendly.com/alekkozlov/daca-with-producer-data-analyst-career-accelerator",
    },
  ] as const;
}

export default function QrGalleryPage() {
  const locale = useLocale();
  const labels = getLabels(locale);
  const qrCodes = getQrCodes(locale);
  const [fullscreen, setFullscreen] = useState<string | null>(null);

  const activeCode = qrCodes.find((q) => q.id === fullscreen);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0d0d0d] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="pt-12 pb-4 px-6 text-center shrink-0">
        <h1 className="text-lg font-bold text-offwhite/80 tracking-tight">
          <span className="text-offwhite">Urban</span>
          <span className="text-burnt-orange">Style</span>
          <span className="text-offwhite/40 font-normal ml-2 text-sm">{labels.qrCodes}</span>
        </h1>
      </div>

      {/* QR Grid — 2 cols, last item centered if odd */}
      <div className="flex-1 grid grid-cols-2 gap-3 p-4 max-w-lg mx-auto w-full auto-rows-min content-center">
        {qrCodes.map((qr, idx) => {
          const isLastOdd = qrCodes.length % 2 === 1 && idx === qrCodes.length - 1;
          return (
          <motion.button
            key={qr.id}
            onClick={() => setFullscreen(qr.id)}
            whileTap={{ scale: 0.95 }}
            className={`bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center p-4 hover:bg-white/10 transition-colors relative overflow-hidden ${isLastOdd ? 'col-span-2 max-w-[50%] justify-self-center' : ''}`}
          >
            {/* QR placeholder - uses the generated SVGs from /public/qr/ */}
            <div className="w-full aspect-square max-w-[160px] rounded-xl bg-white flex items-center justify-center mb-3 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/qr/qr-${qr.id}.svg`}
                alt={`QR code for ${qr.label}`}
                className="w-full h-full object-contain p-2"
                onError={(e) => {
                  // Fallback: show URL text if SVG not generated yet
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement("div");
                    fallback.className = "text-charcoal/40 text-[10px] font-mono text-center p-2 break-all";
                    fallback.textContent = qr.url;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>

            {/* Label */}
            <p className="text-offwhite text-sm font-semibold tracking-tight">
              {qr.label}
            </p>
            <p className="text-offwhite/40 text-[10px] font-mono uppercase tracking-wider">
              {qr.sublabel}
            </p>

            {/* Color accent dot */}
            <div
              className="absolute top-3 right-3 w-2 h-2 rounded-full"
              style={{ backgroundColor: qr.color }}
            />
          </motion.button>
          );
        })}
      </div>

      {/* Language switcher + Hint */}
      <div className="flex flex-col items-center gap-4 pb-8 px-4 shrink-0">
        <LanguageSwitcher />
        <p className="text-offwhite/20 text-[10px] font-mono">
          {labels.hint}
        </p>
      </div>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {fullscreen && activeCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-8"
            onClick={() => setFullscreen(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              className="w-full max-w-xs flex flex-col items-center"
            >
              {/* QR Code large */}
              <div className="w-full aspect-square rounded-2xl bg-white flex items-center justify-center mb-6 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/qr/qr-${activeCode.id}.svg`}
                  alt={`QR code for ${activeCode.label}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement("div");
                      fallback.className = "text-charcoal/30 text-xs font-mono text-center p-4 break-all";
                      fallback.textContent = activeCode.url;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>

              {/* Label */}
              <h2
                className="text-2xl font-bold text-charcoal tracking-tight mb-1"
              >
                {activeCode.label}
              </h2>
              <p className="text-charcoal/40 text-xs font-mono tracking-wider mb-8">
                {activeCode.url.replace("https://", "")}
              </p>

              {/* Tap to close hint */}
              <p className="text-charcoal/30 text-xs font-mono">
                {labels.tapToClose}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
