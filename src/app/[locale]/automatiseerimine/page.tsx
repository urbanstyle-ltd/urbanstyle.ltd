"use client";

import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/config";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Link } from "@/i18n/routing";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WeekCard {
  week: string;
  topic: string;
  tools: string;
  artifact: string;
  maturity: string;
}

interface ToolItem {
  name: string;
  role: string;
  when: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface PageContent {
  hero: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    motto: string;
  };
  problem: {
    title: string;
    stat: string;
    statLabel: string;
    desc: string;
    items: string[];
  };
  solution: {
    title: string;
    desc: string;
    highlights: { value: string; label: string }[];
  };
  program: {
    title: string;
    desc: string;
    dualPathTitle: string;
    pathOwn: string;
    pathOwnDesc: string;
    pathNarrative: string;
    pathNarrativeDesc: string;
  };
  weekMap: {
    title: string;
    weeks: WeekCard[];
  };
  tools: {
    title: string;
    items: ToolItem[];
  };
  audience: {
    title: string;
    groups: { label: string; desc: string }[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  cta: {
    title: string;
    desc: string;
    button: string;
    link: string;
  };
}

// ---------------------------------------------------------------------------
// Content dictionary
// ---------------------------------------------------------------------------

const CONTENT: Record<string, PageContent> = {
  // =========================================================================
  // ESTONIAN
  // =========================================================================
  et: {
    hero: {
      eyebrow: "02Signal",
      headline: "Mürast Signaalini",
      subtitle:
        "7-nädalane praktikum, mis viib sind nullist AI automatiseerijani. Ehitad oma esimese Telegram bot'i, n8n töövoo ja AI-põhise äriprotseessi.",
      motto: "From noise to signal. From manual to automated.",
    },
    problem: {
      title: "Probleem",
      stat: "47",
      statLabel: "manuaalset protsessi",
      desc: "UrbanStyle.ltd kasvas kiiresti, kuid protsessid jäid manuaalseks. IT-meeskond kulutab 40% ajast rutiinsetele raportitele. Klienditeenindus ei jõua vastata. Turundusmeeskond toodab 5 sisuühikut nädalas, kui vaja oleks 20.",
      items: [
        "IT kulutab 40% ajast manuaalsetele raportitele",
        "Kliendipäringute vastamisaeg: 24+ tundi",
        "Turunduse tootlikkus: 5 vs vajaminev 20 sisuühikut/nädalas",
        "Narva poe avamine nõuab 47 manuaalset sammu",
      ],
    },
    solution: {
      title: "Lahendus: AI automatiseerimine",
      desc: "02Signal programm õpetab sind ehitama AI-põhiseid automatiseerimisi, mis muudavad manuaalsed sammud automaatseks töövoooks. Praktikumi lõpuks on sul toimiv prototüüp oma ärile.",
      highlights: [
        { value: "7", label: "nädalat" },
        { value: "3", label: "sessiooni nädalas" },
        { value: "6", label: "portfoolioartefakti" },
        { value: "1", label: "toimiv prototüüp" },
      ],
    },
    program: {
      title: "Programmi ülevaade",
      desc: "02Signal kasutab spiraalõpet: iga nädal lisab uue kihi samale töövoole. Alustame AI chat'ist ja jõuame automatiseeritud bot'ideni.",
      dualPathTitle: "Kaks rada",
      pathOwn: "Oma äri",
      pathOwnDesc:
        "Rakendad kõiki tööriistu ja tehnikaid oma päris ärile. Ehitad prototüübi, mis lahendab sinu tegeliku probleemi.",
      pathNarrative: "02Signal Advisory (narratiiv)",
      pathNarrativeDesc:
        "Tegutsed 02Signal Advisory nooremkonsultandina. Sinu klient: UrbanStyle.ltd. Lahendad päris äriprobleeme simuleeritud keskkonnas.",
    },
    weekMap: {
      title: "Nädalakaart",
      weeks: [
        {
          week: "N0",
          topic: "AI alused + promptimine",
          tools: "Claude, NotebookLM",
          artifact: "AI tööriistakast seadistatud",
          maturity: "Tase 1\u21922",
        },
        {
          week: "N1",
          topic: "Klient & turg + GitHub",
          tools: "GitHub, NotebookLM",
          artifact: "Klientide analüüs + GitHub repo",
          maturity: "Tase 2",
        },
        {
          week: "N2",
          topic: "Operatsioonid & protsessid",
          tools: "NotebookLM (multi-RAG)",
          artifact: "Protsessikaart + automatiseerimise kandidaadid",
          maturity: "Tase 2+",
        },
        {
          week: "N3",
          topic: "Automatiseerimine",
          tools: "n8n, Telegram",
          artifact: "Esimene n8n \u2192 Telegram bot",
          maturity: "Tase 3",
        },
        {
          week: "N4",
          topic: "Sisu & turundus",
          tools: "AI sisu + n8n töövood",
          artifact: "Form \u2192 AI \u2192 Telegram töövoog",
          maturity: "Tase 3",
        },
        {
          week: "N5",
          topic: "Andmed & otsused",
          tools: "n8n + Google Sheets",
          artifact: "Automaatne raport + andmete salvestus",
          maturity: "Tase 3\u21924",
        },
        {
          week: "N6",
          topic: "Integratsioon & demo",
          tools: "Kõik tööriistad",
          artifact: "AI strateegia + lõpuesitlus",
          maturity: "Tase 4",
        },
      ],
    },
    tools: {
      title: "Tööriistad",
      items: [
        { name: "Claude", role: "AI assistent — promptimine, analüüs, sisu loomine", when: "Kõik nädalad" },
        { name: "n8n", role: "Visuaalne töövoo automatiseerimine", when: "Alates N3 (põhitööriist)" },
        { name: "Telegram", role: "Bot'i kanal — automatiseeritud vastused", when: "Alates N3" },
        { name: "GitHub", role: "Portfoolio ja versioonihaldus", when: "Alates N1" },
        { name: "NotebookLM", role: "AI-põhine audio-õpe ja RAG", when: "Kõik nädalad" },
        { name: "Google Sheets", role: "Andmete salvestus ja analüüs", when: "Alates N5" },
      ],
    },
    audience: {
      title: "Kellele sobib?",
      groups: [
        {
          label: "Ettevõtjad",
          desc: "Sul on äri, kus manuaalsed protsessid röövivad aega. Tahad automatiseerida, aga ei tea, kust alustada.",
        },
        {
          label: "Ettevõtlikud inimesed",
          desc: "Sul pole (veel) oma äri, aga tahad omandada AI automatiseerimise oskused, mis on tööturul nõutud.",
        },
        {
          label: "Meeskonnad",
          desc: "Sinu organisatsioon tahab üles ehitada AI automatiseerimise kompetentsi. Saada meeskond praktilist kogemust saama.",
        },
      ],
    },
    faq: {
      title: "Korduma kippuvad küsimused",
      items: [
        {
          q: "Kas mul peab olema tehniline taust?",
          a: "Ei. Programm algab nullist. Kõik tööriistad on visuaalsed (n8n drag-and-drop, GitHub veebiliides). Koodi kirjutamist ei nõuta.",
        },
        {
          q: "Kas ma pean kasutama Claude'i?",
          a: "Claude on eelistatud ja kõik näited on Claude-põhised, kuid võid kasutada ka teisi AI tööriistu (ChatGPT, Gemini jne).",
        },
        {
          q: "Mis keeles programm toimub?",
          a: "Eesti keeles, ingliskeelsed tehnilised terminid jäävad originaali.",
        },
        {
          q: "Kui palju aega nõuab?",
          a: "3 sessiooni nädalas (igaüks ~1.5h) + iseseisev töö (~2-3h). Kokku ~7-8h nädalas.",
        },
        {
          q: "Mis on lõpptulemus?",
          a: "GitHub portfoolio 6 artefaktiga + toimiv AI automatiseerimise prototüüp + AI strateegia oma ärile.",
        },
        {
          q: "Kui palju maksab?",
          a: "Programm on toetatud Ettevõtluskeskus OÜ poolt. Täpsema info saad ettevotluskeskus.ee lehelt.",
        },
      ],
    },
    cta: {
      title: "Valmis automatiseerima?",
      desc: "Liitu järgmise kohordiga ja ehita oma esimene AI-põhine äriprotsessi automatiseerimine 7 nädalaga.",
      button: "Vaata programmi",
      link: "https://www.ettevotluskeskus.ee",
    },
  },

  // =========================================================================
  // ENGLISH
  // =========================================================================
  en: {
    hero: {
      eyebrow: "02Signal",
      headline: "From Noise to Signal",
      subtitle:
        "A 7-week practicum that takes you from zero to AI automation builder. Build your first Telegram bot, n8n workflow, and AI-powered business process.",
      motto: "From noise to signal. From manual to automated.",
    },
    problem: {
      title: "The Problem",
      stat: "47",
      statLabel: "manual processes",
      desc: "UrbanStyle.ltd grew fast, but processes stayed manual. The IT team spends 40% of time on routine reports. Customer service can't keep up. Marketing produces 5 content units per week when 20 are needed.",
      items: [
        "IT spends 40% of time on manual reports",
        "Customer response time: 24+ hours",
        "Marketing output: 5 vs needed 20 units/week",
        "New store opening requires 47 manual steps",
      ],
    },
    solution: {
      title: "The Solution: AI Automation",
      desc: "The 02Signal program teaches you to build AI-powered automations that turn manual steps into automated workflows. By the end, you'll have a working prototype for your own business.",
      highlights: [
        { value: "7", label: "weeks" },
        { value: "3", label: "sessions/week" },
        { value: "6", label: "portfolio artifacts" },
        { value: "1", label: "working prototype" },
      ],
    },
    program: {
      title: "Program Overview",
      desc: "02Signal uses spiral learning: each week adds a new layer to the same workflow. We start from AI chat and arrive at automated bots.",
      dualPathTitle: "Two Paths",
      pathOwn: "Own Business",
      pathOwnDesc:
        "Apply all tools and techniques to your real business. Build a prototype that solves your actual problem.",
      pathNarrative: "02Signal Advisory (narrative)",
      pathNarrativeDesc:
        "Work as an 02Signal Advisory junior consultant. Your client: UrbanStyle.ltd. Solve real business problems in a simulated environment.",
    },
    weekMap: {
      title: "Week Map",
      weeks: [
        {
          week: "W0",
          topic: "AI Foundations + Prompting",
          tools: "Claude, NotebookLM",
          artifact: "AI toolkit configured",
          maturity: "Level 1\u21922",
        },
        {
          week: "W1",
          topic: "Customer & Market + GitHub",
          tools: "GitHub, NotebookLM",
          artifact: "Customer analysis + GitHub repo",
          maturity: "Level 2",
        },
        {
          week: "W2",
          topic: "Operations & Processes",
          tools: "NotebookLM (multi-RAG)",
          artifact: "Process map + automation candidates",
          maturity: "Level 2+",
        },
        {
          week: "W3",
          topic: "Automation",
          tools: "n8n, Telegram",
          artifact: "First n8n \u2192 Telegram bot",
          maturity: "Level 3",
        },
        {
          week: "W4",
          topic: "Content & Marketing",
          tools: "AI content + n8n workflows",
          artifact: "Form \u2192 AI \u2192 Telegram workflow",
          maturity: "Level 3",
        },
        {
          week: "W5",
          topic: "Data & Decisions",
          tools: "n8n + Google Sheets",
          artifact: "Auto-report + data logging",
          maturity: "Level 3\u21924",
        },
        {
          week: "W6",
          topic: "Integration & Demo",
          tools: "All tools combined",
          artifact: "AI strategy + final presentation",
          maturity: "Level 4",
        },
      ],
    },
    tools: {
      title: "Tools",
      items: [
        { name: "Claude", role: "AI assistant — prompting, analysis, content", when: "All weeks" },
        { name: "n8n", role: "Visual workflow automation", when: "From W3 (core tool)" },
        { name: "Telegram", role: "Bot channel — automated responses", when: "From W3" },
        { name: "GitHub", role: "Portfolio and version control", when: "From W1" },
        { name: "NotebookLM", role: "AI-powered audio learning and RAG", when: "All weeks" },
        { name: "Google Sheets", role: "Data storage and analysis", when: "From W5" },
      ],
    },
    audience: {
      title: "Who Is It For?",
      groups: [
        {
          label: "Entrepreneurs",
          desc: "You have a business where manual processes steal your time. You want to automate but don't know where to start.",
        },
        {
          label: "Aspiring Entrepreneurs",
          desc: "You don't (yet) have your own business, but want to acquire AI automation skills that are in demand.",
        },
        {
          label: "Teams",
          desc: "Your organization wants to build AI automation competency. Send your team to gain hands-on experience.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Do I need a technical background?",
          a: "No. The program starts from zero. All tools are visual (n8n drag-and-drop, GitHub web interface). No coding required.",
        },
        {
          q: "Do I have to use Claude?",
          a: "Claude is preferred and all examples are Claude-based, but you may use other AI tools (ChatGPT, Gemini, etc.).",
        },
        {
          q: "What language is the program in?",
          a: "Estonian, with English technical terms kept in their original form.",
        },
        {
          q: "How much time does it require?",
          a: "3 sessions per week (~1.5h each) + self-study (~2-3h). About 7-8h total per week.",
        },
        {
          q: "What's the end result?",
          a: "A GitHub portfolio with 6 artifacts + a working AI automation prototype + an AI strategy for your business.",
        },
        {
          q: "How much does it cost?",
          a: "The program is supported by Ettevõtluskeskus OÜ. Details available at ettevotluskeskus.ee.",
        },
      ],
    },
    cta: {
      title: "Ready to Automate?",
      desc: "Join the next cohort and build your first AI-powered business process automation in 7 weeks.",
      button: "View Program",
      link: "https://www.ettevotluskeskus.ee",
    },
  },
};

// ---------------------------------------------------------------------------
// Teal accent color for 02Signal branding
// ---------------------------------------------------------------------------
const TEAL = "#009B8D";
const TEAL_LIGHT = "#E6F7F5";

// ---------------------------------------------------------------------------
// Reusable section fade-in
// ---------------------------------------------------------------------------
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

// ---------------------------------------------------------------------------
// FAQ Accordion Item
// ---------------------------------------------------------------------------
function FaqAccordion({ item, idx }: { item: FaqItem; idx: number }) {
  return (
    <motion.details
      {...fadeIn}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      className="group border-b border-charcoal/10 last:border-0"
    >
      <summary className="flex items-center justify-between py-5 cursor-pointer text-lg font-semibold text-charcoal hover:text-[#009B8D] transition-colors list-none [&::-webkit-details-marker]:hidden">
        <span>{item.q}</span>
        <span className="ml-4 text-xl text-charcoal/40 group-open:rotate-45 transition-transform duration-300">+</span>
      </summary>
      <p className="pb-5 text-charcoal/70 leading-relaxed">{item.a}</p>
    </motion.details>
  );
}

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------
export default function AutomationPage() {
  const locale = useLocale() as Locale;
  const c = CONTENT[locale] || CONTENT.en;

  return (
    <div className="pt-32 pb-0 overflow-hidden">
      {/* ================================================================= */}
      {/* HERO                                                               */}
      {/* ================================================================= */}
      <section className="px-6 md:px-16 py-32 bg-charcoal text-offwhite relative overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-offwhite) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Teal accent glow */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 rounded-full blur-[120px] pointer-events-none"
          style={{ background: TEAL }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-mono font-semibold tracking-widest uppercase"
              style={{ background: `${TEAL}30`, color: TEAL }}
            >
              {c.hero.eyebrow}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[90px] font-bold uppercase tracking-tighter leading-[0.9] mb-8"
          >
            {c.hero.headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-offwhite/80 max-w-2xl mx-auto font-medium leading-relaxed mb-6"
          >
            {c.hero.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm font-mono tracking-widest text-offwhite/40 uppercase"
          >
            {c.hero.motto}
          </motion.p>
        </div>
      </section>

      {/* ================================================================= */}
      {/* PROBLEM                                                            */}
      {/* ================================================================= */}
      <section className="px-6 md:px-16 py-32">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-bold uppercase tracking-tight mb-12 flex items-center gap-4">
              <span className="font-mono text-2xl" style={{ color: TEAL }}>
                01
              </span>
              {c.problem.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-[200px_1fr] gap-12 mb-16">
            <motion.div
              {...fadeIn}
              className="text-center md:text-left"
            >
              <span className="text-7xl font-bold font-mono" style={{ color: TEAL }}>
                {c.problem.stat}
              </span>
              <p className="text-charcoal/60 text-sm font-medium mt-2 uppercase tracking-wide">
                {c.problem.statLabel}
              </p>
            </motion.div>
            <motion.div {...fadeIn} transition={{ duration: 0.6, delay: 0.1 }}>
              <p className="text-xl text-charcoal/80 leading-relaxed font-medium mb-8">
                {c.problem.desc}
              </p>
              <ul className="space-y-3">
                {c.problem.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-charcoal/70"
                  >
                    <span
                      className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: TEAL }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SOLUTION                                                           */}
      {/* ================================================================= */}
      <section
        className="px-6 md:px-16 py-32 relative"
        style={{ background: TEAL_LIGHT }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-bold uppercase tracking-tight mb-8 flex items-center gap-4">
              <span className="font-mono text-2xl" style={{ color: TEAL }}>
                02
              </span>
              {c.solution.title}
            </h2>
            <p className="text-xl text-charcoal/80 leading-relaxed font-medium mb-16 max-w-3xl">
              {c.solution.desc}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {c.solution.highlights.map((h, idx) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-offwhite rounded-xl p-8 text-center shadow-sm border border-charcoal/5"
              >
                <span
                  className="block text-5xl font-bold font-mono mb-2"
                  style={{ color: TEAL }}
                >
                  {h.value}
                </span>
                <span className="text-charcoal/60 text-sm font-medium uppercase tracking-wide">
                  {h.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* PROGRAM OVERVIEW + DUAL PATH                                       */}
      {/* ================================================================= */}
      <section className="px-6 md:px-16 py-32">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-bold uppercase tracking-tight mb-8 flex items-center gap-4">
              <span className="font-mono text-2xl" style={{ color: TEAL }}>
                03
              </span>
              {c.program.title}
            </h2>
            <p className="text-xl text-charcoal/80 leading-relaxed font-medium mb-16 max-w-3xl">
              {c.program.desc}
            </p>
          </motion.div>

          <motion.h3
            {...fadeIn}
            className="text-2xl font-bold uppercase tracking-tight mb-8"
          >
            {c.program.dualPathTitle}
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Own Business */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl p-8 border-2 relative overflow-hidden"
              style={{ borderColor: TEAL }}
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 opacity-10 rounded-bl-full"
                style={{ background: TEAL }}
              />
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-4"
                style={{ background: `${TEAL}20`, color: TEAL }}
              >
                {locale === "et" ? "Eelistatud" : "Preferred"}
              </span>
              <h4 className="text-xl font-bold mb-3">{c.program.pathOwn}</h4>
              <p className="text-charcoal/70 leading-relaxed">
                {c.program.pathOwnDesc}
              </p>
            </motion.div>

            {/* Narrative */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl p-8 border border-charcoal/10 bg-offwhite"
            >
              <h4 className="text-xl font-bold mb-3">
                {c.program.pathNarrative}
              </h4>
              <p className="text-charcoal/70 leading-relaxed">
                {c.program.pathNarrativeDesc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* WEEK MAP                                                           */}
      {/* ================================================================= */}
      <section className="px-6 md:px-16 py-32 bg-charcoal text-offwhite relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-offwhite) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            {...fadeIn}
            className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-16 text-center"
          >
            {c.weekMap.title}
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {c.weekMap.weeks.map((w, idx) => (
              <motion.div
                key={w.week}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="bg-offwhite/5 backdrop-blur-sm rounded-xl p-6 border border-offwhite/10 hover:border-[#009B8D]/40 transition-colors duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-2xl font-bold font-mono"
                    style={{ color: TEAL }}
                  >
                    {w.week}
                  </span>
                  <span className="text-xs font-mono text-offwhite/40 uppercase tracking-wider">
                    {w.maturity}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-3 text-offwhite/90 leading-tight">
                  {w.topic}
                </h3>
                <p className="text-sm text-offwhite/50 mb-2">
                  <span className="font-mono text-offwhite/30 text-xs uppercase tracking-wider">
                    {locale === "et" ? "Tööriistad" : "Tools"}:
                  </span>{" "}
                  {w.tools}
                </p>
                <p className="text-sm text-offwhite/50">
                  <span className="font-mono text-offwhite/30 text-xs uppercase tracking-wider">
                    {locale === "et" ? "Artefakt" : "Artifact"}:
                  </span>{" "}
                  {w.artifact}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* TOOLS                                                              */}
      {/* ================================================================= */}
      <section className="px-6 md:px-16 py-32">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            {...fadeIn}
            className="text-4xl font-bold uppercase tracking-tight mb-16 text-center"
          >
            {c.tools.title}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.tools.items.map((tool, idx) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-xl p-6 border border-charcoal/10 bg-offwhite hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: TEAL }}
                  />
                  {tool.name}
                </h3>
                <p className="text-charcoal/70 text-sm leading-relaxed mb-3">
                  {tool.role}
                </p>
                <span className="text-xs font-mono uppercase tracking-wider text-charcoal/40">
                  {tool.when}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* AUDIENCE                                                           */}
      {/* ================================================================= */}
      <section
        className="px-6 md:px-16 py-32"
        style={{ background: TEAL_LIGHT }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            {...fadeIn}
            className="text-4xl font-bold uppercase tracking-tight mb-16 text-center"
          >
            {c.audience.title}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {c.audience.groups.map((group, idx) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-offwhite rounded-xl p-8 shadow-sm border border-charcoal/5"
              >
                <h3 className="text-xl font-bold mb-4" style={{ color: TEAL }}>
                  {group.label}
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  {group.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FAQ                                                                */}
      {/* ================================================================= */}
      <section className="px-6 md:px-16 py-32">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            {...fadeIn}
            className="text-4xl font-bold uppercase tracking-tight mb-12 text-center"
          >
            {c.faq.title}
          </motion.h2>

          <div className="divide-y divide-charcoal/10">
            {c.faq.items.map((item, idx) => (
              <FaqAccordion key={idx} item={item} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* CTA                                                                */}
      {/* ================================================================= */}
      <section className="px-6 md:px-16 py-32 bg-charcoal text-offwhite text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Logo variant="monogram" className="w-[800px] h-[800px] text-offwhite" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8"
          >
            {c.cta.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-offwhite/80 mb-16 leading-relaxed font-medium"
          >
            {c.cta.desc}
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            href={c.cta.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-12 py-5 text-offwhite font-bold rounded-lg text-lg tracking-wide transition-all duration-500 shadow-xl hover:shadow-2xl"
            style={{
              background: TEAL,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F5F0EB";
              e.currentTarget.style.color = TEAL;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = TEAL;
              e.currentTarget.style.color = "#F5F0EB";
            }}
          >
            {c.cta.button}
          </motion.a>
        </div>
      </section>

      {/* Back to strategy link */}
      <section className="px-6 md:px-16 py-8 text-center bg-limestone/20">
        <Link
          href="/strateegia"
          className="text-sm font-medium text-charcoal/60 hover:text-charcoal transition-colors"
        >
          &larr; {locale === "et" ? "Tagasi strateegia lehele" : "Back to Strategy"}
        </Link>
      </section>
    </div>
  );
}
