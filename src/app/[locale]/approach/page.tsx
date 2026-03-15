"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/config";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AudienceTab = "learners" | "employers" | "methodology";

interface StatItem {
  value: string;
  label: string;
}

interface ValueCard {
  icon: string;
  title: string;
  desc: string;
}

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const tabContent = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

// ---------------------------------------------------------------------------
// Reusable sub-components
// ---------------------------------------------------------------------------

function RevealSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StatCounter({ value, label }: StatItem) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const numericMatch = value.match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = numericMatch ? value.slice(numericMatch[1].length) : value;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || !numericValue) return;
    let frame: number;
    const duration = 1200;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numericValue));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, numericValue]);

  return (
    <div ref={ref} className="text-center">
      <span className="block text-4xl md:text-5xl font-bold font-mono tracking-tight text-burnt-orange">
        {numericValue ? `${count}${suffix}` : value}
      </span>
      <span className="block mt-2 text-sm font-medium text-charcoal/60 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="divide-y divide-charcoal/10 border-t border-b border-charcoal/10">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between py-5 px-2 text-left group"
              aria-expanded={isOpen}
            >
              <span className="text-lg font-semibold tracking-tight group-hover:text-burnt-orange transition-colors">
                {item.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-2xl text-charcoal/40 flex-shrink-0 ml-4"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 px-2 text-charcoal/80 leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function ValueGrid({ items }: { items: ValueCard[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((card, idx) => (
        <RevealSection key={card.title}>
          <motion.div
            custom={idx}
            variants={fadeUp}
            className="bg-offwhite rounded-xl p-8 border border-charcoal/5 hover:shadow-lg transition-shadow duration-500 h-full"
          >
            <span className="text-3xl mb-4 block">{card.icon}</span>
            <h3 className="font-bold text-lg mb-2 tracking-tight">{card.title}</h3>
            <p className="text-charcoal/70 text-sm leading-relaxed">{card.desc}</p>
          </motion.div>
        </RevealSection>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Content data
// ---------------------------------------------------------------------------

// TODO: i18n — all strings below should move to messages/{locale}.json under "approach" namespace
// For now, English is hardcoded. Estonian/Russian can be added by locale lookup.

const TAB_LABELS: Record<AudienceTab, string> = {
  learners: "For Learners",
  employers: "For Employers",
  methodology: "Methodology",
};

const LEARNER_STATS: StatItem[] = [
  { value: "11", label: "Weeks" },
  { value: "200+", label: "Hours" },
  { value: "13", label: "EAP Credits" },
  { value: "66", label: "Contact Hours" },
  { value: "3", label: "Sessions / Week" },
  { value: "10", label: "Portfolio Projects" },
];

const EMPLOYER_STATS: StatItem[] = [
  { value: "15", label: "Cohorts Completed" },
  { value: "13", label: "EAP Credits" },
  { value: "66", label: "Contact Hours" },
];

const LEARNER_VALUES: ValueCard[] = [
  {
    icon: "\u{1F4CA}",
    title: "SQL \u2192 Python",
    desc: "From querying databases to automating analysis with pandas and APIs.",
  },
  {
    icon: "\u{1F916}",
    title: "AI Skills",
    desc: "Learn to collaborate with AI tools as a core professional competency.",
  },
  {
    icon: "\u{1F91D}",
    title: "Teamwork",
    desc: "Work in fixed teams simulating a real analytics department.",
  },
  {
    icon: "\u{1F680}",
    title: "Career Ready",
    desc: "Graduate with a professional GitHub portfolio and career materials.",
  },
];

const EMPLOYER_VALUES: ValueCard[] = [
  {
    icon: "\u{1F3AF}",
    title: "Job-Relevant",
    desc: "Curriculum built around real business scenarios — skills transfer immediately.",
  },
  {
    icon: "\u{23F0}",
    title: "Minimal Disruption",
    desc: "3 sessions per week, blend of self-study and live sessions.",
  },
  {
    icon: "\u{2705}",
    title: "Quality Assured",
    desc: "HAKA quality mark, microcredential candidate, 13 EAP accredited.",
  },
  {
    icon: "\u{1F4B0}",
    title: "Funding Available",
    desc: "Funding options available for eligible organizations and participants.",
  },
];

const METHODOLOGY_DIFFERENTIATORS: ValueCard[] = [
  {
    icon: "\u{1F3AD}",
    title: "Simulation-Based",
    desc: "Every exercise uses UrbanStyle data — realistic, consistent, and engaging.",
  },
  {
    icon: "\u{1F504}",
    title: "Spiral Learning",
    desc: "Each topic is revisited from multiple perspectives across sessions.",
  },
  {
    icon: "\u{1F4D6}",
    title: "4C Method",
    desc: "Connect \u2192 Concept \u2192 Concrete \u2192 Conclusion in every learning unit.",
  },
  {
    icon: "\u{1F94B}",
    title: "Shu-Ha-Ri",
    desc: "Progression from copying to adapting to innovating over 11 weeks.",
  },
  {
    icon: "\u{1F4BC}",
    title: "Portfolio-First",
    desc: "Assessment is 100% portfolio-based. Pass/Fail. No exams.",
  },
  {
    icon: "\u{1F916}",
    title: "AI as 6th Competency",
    desc: "AI collaboration is taught as a skill, not just a tool.",
  },
];

const WEEK_MAP = [
  { week: "0", topic: "Onboarding & Setup" },
  { week: "1", topic: "SQL Basics (SELECT, WHERE, ORDER BY)" },
  { week: "2", topic: "SQL Data Cleaning (NULLs, duplicates)" },
  { week: "3", topic: "SQL JOINs (INNER, LEFT, RIGHT)" },
  { week: "4", topic: "SQL Aggregation (GROUP BY, HAVING, CTE)" },
  { week: "5", topic: "Visualization Design (Power BI / Plotly)" },
  { week: "6", topic: "Dashboard Creation & Data Storytelling" },
  { week: "7", topic: "Python pandas & numpy" },
  { week: "8", topic: "Python APIs & Automation (Supabase)" },
  { week: "9", topic: "Career Preparation (CV, LinkedIn, Interview)" },
  { week: "10", topic: "Portfolio Defense & Graduation" },
];

const TECH_STACK = [
  "SQL (PostgreSQL via Supabase)",
  "Python (pandas, numpy, Plotly)",
  "Power BI / Streamlit",
  "GitHub (version control + portfolio)",
  "VS Code",
  "Google Workspace",
  "AI Tools (NotebookLM, GitHub Copilot)",
];

const AI_PROGRESSION = [
  { stage: "W0\u20131", level: "Introduction", desc: "NotebookLM, asking AI questions" },
  { stage: "W2\u20133", level: "Assistant", desc: "Debugging, fact-checking AI output" },
  { stage: "W4\u20135", level: "Co-Pilot", desc: "Code generation, critical evaluation" },
  { stage: "W6\u20137", level: "Director", desc: "Delegation, prompt engineering" },
  { stage: "W8\u20139", level: "Team Amplifier", desc: "AI in group collaboration" },
  { stage: "W10", level: "Demonstrator", desc: "Showcasing AI usage in portfolio" },
];

const FOUR_COMPONENTS = [
  {
    num: "1",
    name: "Mentoring",
    color: "bg-slate-blue",
    desc: "Live mentor sessions using 4C methodology. Expert-led, interactive, challenge-based.",
    required: true,
  },
  {
    num: "2",
    name: "Portfolio",
    color: "bg-sage",
    desc: "The ONLY assessed component. 10 projects building a professional GitHub portfolio.",
    required: true,
  },
  {
    num: "3",
    name: "Textbooks",
    color: "bg-burnt-orange",
    desc: "Two required textbooks: 'Python for Data Analysis' (McKinney) and 'Storytelling with Data' (Knaflic).",
    required: true,
  },
  {
    num: "4",
    name: "E-Learning Catalog",
    color: "bg-limestone",
    desc: "Voluntary supplementary resources. Never graded, never on certificate.",
    required: false,
  },
];

// ---------------------------------------------------------------------------
// Zoom-in detail accordions per view
// ---------------------------------------------------------------------------

function LearnersAccordions() {
  const items: AccordionItem[] = [
    {
      id: "l-weekmap",
      title: "11-Week Topic Map",
      content: (
        <div className="space-y-2">
          {WEEK_MAP.map((w) => (
            <div key={w.week} className="flex gap-4 items-baseline">
              <span className="font-mono text-burnt-orange font-bold w-8 text-right flex-shrink-0">
                W{w.week}
              </span>
              <span>{w.topic}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "l-weeklyflow",
      title: "Weekly Flow (Spiral Learning)",
      content: (
        <div className="space-y-4">
          <p>
            Each week follows a spiral pattern where the same topic is explored
            from multiple perspectives:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                label: "Self-Study (Perspective A)",
                desc: "Independent exploration with hierarchical 4C cycles",
              },
              {
                label: "Session 1: Mentor (Perspective B)",
                desc: "Live teaching adds a new angle, 4C methodology",
              },
              {
                label: "Session 2: Group Work (A+B)",
                desc: "Teams synthesize both perspectives in practice",
              },
              {
                label: "Session 3: Demo + Retro",
                desc: "Present results, get feedback, retrospective",
              },
            ].map((s) => (
              <div key={s.label} className="p-4 bg-limestone/20 rounded-lg">
                <p className="font-semibold text-sm mb-1">{s.label}</p>
                <p className="text-sm text-charcoal/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "l-ai",
      title: "AI Skills Progression",
      content: (
        <div className="space-y-3">
          <p className="mb-4">
            AI collaboration is treated as the 6th core competency, developed
            progressively using the Shu-Ha-Ri framework:
          </p>
          {AI_PROGRESSION.map((a) => (
            <div key={a.stage} className="flex gap-4 items-baseline">
              <span className="font-mono text-burnt-orange font-bold w-14 text-right flex-shrink-0 text-sm">
                {a.stage}
              </span>
              <span className="font-semibold w-32 flex-shrink-0">{a.level}</span>
              <span className="text-charcoal/70">{a.desc}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "l-tech",
      title: "Technology Stack",
      content: (
        <ul className="space-y-2">
          {TECH_STACK.map((t) => (
            <li key={t} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0" />
              {t}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "l-career",
      title: "Career Changer Support",
      content: (
        <div className="space-y-3">
          <p>
            DACA is designed for career changers. Your existing professional
            background is an asset, not a limitation.
          </p>
          <ul className="space-y-2">
            {[
              "Estonian DA market has 56+ open roles and is growing",
              "UrbanStyle simulation values diverse perspectives",
              "Week 9 features an 'aha moment' where you realize the hiring guide describes YOU",
              "Career materials: CV template, LinkedIn optimization, interview preparation",
              "Portfolio-based assessment means no traditional exams",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ];
  return <Accordion items={items} />;
}

function EmployersAccordions() {
  const items: AccordionItem[] = [
    {
      id: "e-roi",
      title: "Return on Investment",
      content: (
        <div className="space-y-3">
          <p>
            Employees gain immediately applicable skills through simulation-based
            learning with real business datasets.
          </p>
          <ul className="space-y-2">
            {[
              "200+ hours of structured learning over 11 weeks",
              "10 portfolio projects with tangible business outputs",
              "SQL, Python, visualization, and AI skills",
              "Employees work in teams mirroring real analytics departments",
              "Funding options available for eligible organizations",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-sage mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "e-quality",
      title: "Quality & Accreditation",
      content: (
        <div className="space-y-3">
          <p>
            The program holds HAKA quality mark recognition and is a
            microcredential candidate with 13 EAP (European Credit Transfer
            System) credits.
          </p>
          <p>
            Assessment is portfolio-based (Pass/Fail), requiring 70% attendance
            and 8\u201310 submitted projects with a defended final project.
          </p>
        </div>
      ),
    },
    {
      id: "e-schedule",
      title: "Schedule & Format",
      content: (
        <div className="space-y-3">
          <p>3 live sessions per week (90 minutes each), plus self-study:</p>
          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            {[
              { day: "Tuesday", type: "Mentor Session", desc: "Expert-led teaching" },
              { day: "Wednesday", type: "Group Work", desc: "Autonomous team practice" },
              { day: "Thu/Fri", type: "Demo + Retro", desc: "Presentations & feedback" },
            ].map((s) => (
              <div key={s.day} className="p-4 bg-limestone/20 rounded-lg text-center">
                <p className="font-mono text-burnt-orange text-sm mb-1">{s.day}</p>
                <p className="font-semibold text-sm">{s.type}</p>
                <p className="text-xs text-charcoal/60 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "e-skills",
      title: "Skills Map",
      content: (
        <div className="space-y-2">
          {[
            { skill: "SQL & Database Querying", weeks: "Weeks 1\u20134" },
            { skill: "Data Visualization & Storytelling", weeks: "Weeks 5\u20136" },
            { skill: "Python & Automation", weeks: "Weeks 7\u20138" },
            { skill: "AI Collaboration", weeks: "Throughout" },
            { skill: "Portfolio & Career Readiness", weeks: "Weeks 9\u201310" },
          ].map((s) => (
            <div key={s.skill} className="flex justify-between items-center py-2">
              <span className="font-medium">{s.skill}</span>
              <span className="font-mono text-sm text-charcoal/50">{s.weeks}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "e-simulation",
      title: "Why Simulation-Based Learning Works",
      content: (
        <div className="space-y-3">
          <p>
            Participants work as data analysts at UrbanStyle \u2014 a realistic
            Estonian fashion startup with real datasets, real characters, and real
            business problems.
          </p>
          <p>
            This means skills transfer directly to the workplace. Employees
            don&apos;t learn abstract theory \u2014 they practice solving
            problems identical to those in your organization.
          </p>
        </div>
      ),
    },
  ];
  return <Accordion items={items} />;
}

function MethodologyAccordions() {
  const items: AccordionItem[] = [
    {
      id: "m-4c",
      title: "4C Teaching Method",
      content: (
        <div className="space-y-3">
          <p>Every learning unit follows the 4C cycle:</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {[
              {
                c: "Connect",
                desc: "Activate prior knowledge, connect to something familiar",
              },
              { c: "Concept", desc: "Introduce the new concept with clear explanation" },
              { c: "Concrete", desc: "Apply immediately with hands-on exercises" },
              {
                c: "Conclusion",
                desc: "Reflect, summarize, and bridge to next topic",
              },
            ].map((step) => (
              <div key={step.c} className="p-4 bg-limestone/20 rounded-lg">
                <p className="font-bold text-burnt-orange mb-1">{step.c}</p>
                <p className="text-sm text-charcoal/70">{step.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-charcoal/60">
            Self-study workbooks use <strong>hierarchical 4C</strong>: each
            sub-concept (Osa) gets its own full 4C cycle, followed by an
            integrative synthesis.
          </p>
        </div>
      ),
    },
    {
      id: "m-groupwork",
      title: "JAGA-TEE-KOGU-ESITLE Group Pattern",
      content: (
        <div className="space-y-3">
          <p>All Session 2 group work follows the universal 90-minute pattern:</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {[
              {
                step: "JAGA (Share)",
                desc: "Team reviews what they learned individually, shares insights",
              },
              {
                step: "TEE (Do)",
                desc: "Collaborative hands-on work on the week's challenge",
              },
              {
                step: "KOGU (Gather)",
                desc: "Compile results, prepare deliverables",
              },
              {
                step: "ESITLE (Present)",
                desc: "Demonstrate outcomes to the group, receive feedback",
              },
            ].map((s) => (
              <div key={s.step} className="p-4 bg-limestone/20 rounded-lg">
                <p className="font-bold text-sage mb-1">{s.step}</p>
                <p className="text-sm text-charcoal/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "m-shuhari",
      title: "Shu-Ha-Ri Progression",
      content: (
        <div className="space-y-4">
          <p>
            Borrowed from martial arts, this framework governs how autonomy
            increases over the program:
          </p>
          {[
            {
              phase: "Shu (Copy)",
              weeks: "Weeks 0\u20133",
              desc: "Follow instructions precisely. Emphasis on correct technique.",
            },
            {
              phase: "Ha (Adapt)",
              weeks: "Weeks 4\u20137",
              desc: "Begin to understand WHY. Modify approaches with guidance.",
            },
            {
              phase: "Ri (Innovate)",
              weeks: "Weeks 8\u201310",
              desc: "Create your own approach. Defend decisions in portfolio.",
            },
          ].map((p) => (
            <div key={p.phase} className="flex gap-4">
              <div className="w-32 flex-shrink-0">
                <p className="font-bold">{p.phase}</p>
                <p className="text-xs font-mono text-charcoal/50">{p.weeks}</p>
              </div>
              <p className="text-charcoal/80">{p.desc}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "m-ai",
      title: "AI as 6th Competency",
      content: (
        <div className="space-y-3">
          <p>
            AI-assisted collaboration is a named skill developed throughout the
            entire program. It follows the Shu-Ha-Ri curve:
          </p>
          <div className="space-y-2 mt-4">
            {AI_PROGRESSION.map((a) => (
              <div key={a.stage} className="flex gap-4 items-baseline">
                <span className="font-mono text-burnt-orange font-bold w-14 text-right flex-shrink-0 text-sm">
                  {a.stage}
                </span>
                <span className="font-semibold w-36 flex-shrink-0">{a.level}</span>
                <span className="text-charcoal/70">{a.desc}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-charcoal/60 mt-4">
            From Week 4 onward, every portfolio README includes an &ldquo;AI
            Usage&rdquo; section (1\u20132 sentences).
          </p>
        </div>
      ),
    },
    {
      id: "m-portfolio",
      title: "Portfolio Assessment",
      content: (
        <div className="space-y-3">
          <p>
            Assessment is <strong>100% portfolio-based</strong> (Pass/Fail):
          </p>
          <ul className="space-y-2 mt-4">
            {[
              "70% attendance required",
              "8\u201310 portfolio projects submitted",
              "Final project defended in front of peers and mentors",
              "Base level (70%): Required for pass",
              "Advanced level (30%): Optional deeper analysis for faster learners",
              "No traditional exams, no grades \u2014 only Arvestatud (Pass) or Mittearvestatud (Fail)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-sage mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "m-career",
      title: "Career Changer Design",
      content: (
        <div className="space-y-3">
          <p>
            The program is specifically designed for career changers. Every
            element reinforces that existing professional experience is an asset:
          </p>
          <ul className="space-y-2">
            {[
              "Week 0: Estonian DA market statistics (56+ roles, growing demand)",
              "Weeks 1\u20138: Role rotation within UrbanStyle values diverse viewpoints",
              "Week 9: 'Aha moment' \u2014 the hiring guide describes YOU",
              "Week 10: UrbanStyle Board Meeting as graduation ceremony",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "m-curriculum",
      title: "Curriculum Structure",
      content: (
        <div className="space-y-4">
          <p>6 sprints across 11 weeks:</p>
          <div className="space-y-2">
            {[
              { sprint: "Sprint 0", weeks: "Week 0", focus: "Onboarding" },
              { sprint: "Sprint 1", weeks: "Weeks 1\u20132", focus: "SQL Fundamentals" },
              { sprint: "Sprint 2", weeks: "Weeks 3\u20134", focus: "SQL Advanced" },
              { sprint: "Sprint 3", weeks: "Weeks 5\u20136", focus: "Visualization" },
              { sprint: "Sprint 4", weeks: "Weeks 7\u20138", focus: "Python Analysis" },
              {
                sprint: "Sprint 5",
                weeks: "Weeks 9\u201310",
                focus: "Portfolio & Career",
              },
            ].map((s) => (
              <div key={s.sprint} className="flex gap-4 items-baseline">
                <span className="font-mono font-bold text-burnt-orange w-20 flex-shrink-0 text-sm">
                  {s.sprint}
                </span>
                <span className="font-mono text-charcoal/50 w-24 flex-shrink-0 text-sm">
                  {s.weeks}
                </span>
                <span>{s.focus}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-charcoal/60 mt-2">
            Two required textbooks support the curriculum: &ldquo;Python for Data
            Analysis&rdquo; (McKinney) and &ldquo;Storytelling with Data&rdquo;
            (Knaflic).
          </p>
        </div>
      ),
    },
    {
      id: "m-tech",
      title: "Technology Stack",
      content: (
        <ul className="space-y-2">
          {TECH_STACK.map((t) => (
            <li key={t} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-blue flex-shrink-0" />
              {t}
            </li>
          ))}
        </ul>
      ),
    },
  ];
  return <Accordion items={items} />;
}

// ---------------------------------------------------------------------------
// View components for each audience tab
// ---------------------------------------------------------------------------

function LearnersView() {
  const [zoomed, setZoomed] = useState(false);
  const locale = useLocale() as Locale;

  const programUrl =
    locale === "et"
      ? "https://www.ettevotluskeskus.ee/daca25-andmeanaluutiku-karjaarikiirendi"
      : "https://www.ettevotluskeskus.ee/daca25en-data-analyst-career-accelerator";

  return (
    <div id="learners">
      {/* Hero */}
      <section className="px-6 md:px-16 py-24 md:py-32 bg-charcoal text-offwhite relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-offwhite) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-burnt-orange text-sm uppercase tracking-widest mb-6"
          >
            {/* TODO: i18n */}
            DACA Program
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.95] mb-8"
          >
            {/* TODO: i18n */}
            From zero to job-ready data analyst in 11&nbsp;weeks
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-offwhite/70 max-w-2xl mx-auto"
          >
            {/* TODO: i18n */}
            A simulation-based intensive that gives you a professional portfolio,
            real skills, and career-ready confidence.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-16 py-16 border-b border-charcoal/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {LEARNER_STATS.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* What You Get */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
              {/* TODO: i18n */}
              What You Get
            </h2>
            <p className="text-charcoal/70 text-lg mb-6 max-w-2xl">
              {/* TODO: i18n */}
              A professional GitHub portfolio with 10 data analytics projects
              that employers can review. Not certificates on a wall &mdash;
              working artifacts that prove your skills.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Experience */}
      <section className="px-6 md:px-16 py-20 bg-limestone/20">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
              {/* TODO: i18n */}
              You&apos;re Not a Student &mdash; You&apos;re a Team Member
            </h2>
            <p className="text-charcoal/70 text-lg mb-6 max-w-3xl">
              {/* TODO: i18n */}
              From day one, you work as a data analyst at UrbanStyle &mdash; a
              simulated Estonian fashion startup. Real datasets, real business
              problems, real characters who give you tasks and feedback.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Value Grid */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <ValueGrid items={LEARNER_VALUES} />
        </div>
      </section>

      {/* Assessment */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="bg-charcoal text-offwhite rounded-xl p-8 md:p-12">
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">
                {/* TODO: i18n */}
                Assessment: Portfolio Only
              </h3>
              <p className="text-offwhite/70 text-lg mb-4">
                {/* TODO: i18n */}
                No traditional exams. Pass/Fail based on your portfolio: 70%
                attendance, 8&ndash;10 projects submitted, final project
                defended.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <span className="px-4 py-2 bg-sage/20 text-sage rounded-full text-sm font-medium">
                  13 EAP Credits
                </span>
                <span className="px-4 py-2 bg-sage/20 text-sage rounded-full text-sm font-medium">
                  HAKA Quality Mark
                </span>
                <span className="px-4 py-2 bg-sage/20 text-sage rounded-full text-sm font-medium">
                  Microcredential Candidate
                </span>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Zoom toggle + details */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <ZoomToggle zoomed={zoomed} onToggle={() => setZoomed(!zoomed)} />
          <AnimatePresence>
            {zoomed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden mt-8"
              >
                <LearnersAccordions />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-24 bg-charcoal text-offwhite text-center">
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <p className="font-mono text-burnt-orange text-sm uppercase tracking-widest mb-4">
              {/* TODO: i18n */}
              Applications Open
            </p>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6">
              {/* TODO: i18n */}
              First Cohort Starts March&nbsp;23,&nbsp;2026
            </h2>
            <a
              href={programUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 bg-burnt-orange text-offwhite font-bold rounded-lg text-lg tracking-wide hover:bg-offwhite hover:text-burnt-orange transition-all duration-500 shadow-xl"
            >
              {/* TODO: i18n */}
              Apply Now
            </a>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}

function EmployersView() {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div id="employers">
      {/* Hero */}
      <section className="px-6 md:px-16 py-24 md:py-32 bg-slate-blue text-offwhite relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-offwhite) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-burnt-orange text-sm uppercase tracking-widest mb-6"
          >
            {/* TODO: i18n */}
            For Organizations
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.95] mb-8"
          >
            {/* TODO: i18n */}
            Upskill your team in data analytics &mdash; without disrupting
            operations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-offwhite/70 max-w-2xl mx-auto"
          >
            {/* TODO: i18n */}
            An accredited, simulation-based program that turns your employees
            into confident data analysts.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-16 py-16 border-b border-charcoal/10">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
          {EMPLOYER_STATS.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Quality card */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="bg-charcoal text-offwhite rounded-xl p-8 md:p-12">
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="px-4 py-2 bg-sage/20 text-sage rounded-full text-sm font-medium">
                  HAKA Quality Mark
                </span>
                <span className="px-4 py-2 bg-sage/20 text-sage rounded-full text-sm font-medium">
                  Microcredential Candidate
                </span>
                <span className="px-4 py-2 bg-sage/20 text-sage rounded-full text-sm font-medium">
                  13 EAP Credits
                </span>
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">
                {/* TODO: i18n */}
                Accredited & Quality Assured
              </h3>
              <p className="text-offwhite/70 text-lg">
                {/* TODO: i18n */}
                DACA holds HAKA quality recognition and is on the microcredential
                track. Your employees receive a credential with real academic
                weight &mdash; 13 EAP credits, 66 contact hours.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* What employees learn */}
      <section className="px-6 md:px-16 py-20 bg-limestone/20">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-10">
              {/* TODO: i18n */}
              What Your Employees Learn
            </h2>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "SQL & Databases", desc: "Query, clean, and analyze relational data" },
              { label: "Data Visualization", desc: "Power BI, Plotly, and data storytelling" },
              { label: "Python & pandas", desc: "Automate analysis and work with APIs" },
              { label: "AI Collaboration", desc: "Use AI tools as a professional skill" },
              { label: "Data Storytelling", desc: "Present insights that drive decisions" },
              { label: "Portfolio Building", desc: "GitHub-based professional portfolio" },
            ].map((item, idx) => (
              <RevealSection key={item.label}>
                <motion.div
                  custom={idx}
                  variants={fadeUp}
                  className="bg-offwhite rounded-xl p-6 border border-charcoal/5"
                >
                  <h3 className="font-bold mb-2">{item.label}</h3>
                  <p className="text-sm text-charcoal/70">{item.desc}</p>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Value grid */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <ValueGrid items={EMPLOYER_VALUES} />
        </div>
      </section>

      {/* Why simulation */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
              {/* TODO: i18n */}
              Why Simulation-Based Learning?
            </h2>
            <p className="text-charcoal/70 text-lg max-w-3xl">
              {/* TODO: i18n */}
              Participants work as data analysts at UrbanStyle, solving realistic
              business problems with real datasets. Skills transfer directly to
              the workplace because the context mirrors real organizations.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Zoom toggle + details */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <ZoomToggle zoomed={zoomed} onToggle={() => setZoomed(!zoomed)} />
          <AnimatePresence>
            {zoomed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden mt-8"
              >
                <EmployersAccordions />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-24 bg-slate-blue text-offwhite text-center">
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6">
              {/* TODO: i18n */}
              Send Your Team to DACA
            </h2>
            <p className="text-offwhite/70 text-lg mb-8">
              {/* TODO: i18n */}
              Contact us to discuss cohort enrollment, funding options, and
              custom scheduling.
            </p>
            <a
              href="mailto:info@ettevotluskeskus.ee?subject=DACA%20Partnership%20Inquiry"
              className="inline-flex items-center justify-center px-10 py-4 bg-burnt-orange text-offwhite font-bold rounded-lg text-lg tracking-wide hover:bg-offwhite hover:text-burnt-orange transition-all duration-500 shadow-xl"
            >
              {/* TODO: i18n */}
              Get in Touch
            </a>
            <p className="mt-6 text-offwhite/50 text-sm">
              info@ettevotluskeskus.ee &middot; +372 652 0001
            </p>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}

function MethodologyView() {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div id="methodology">
      {/* Hero */}
      <section className="px-6 md:px-16 py-24 md:py-32 bg-charcoal text-offwhite relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-offwhite) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-burnt-orange text-sm uppercase tracking-widest mb-6"
          >
            {/* TODO: i18n */}
            Pedagogy
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[0.95] mb-8"
          >
            {/* TODO: i18n */}
            We don&apos;t sell information &mdash; it&apos;s free online. We sell
            a transformative experience.
          </motion.h1>
        </div>
      </section>

      {/* Core Proposition */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
              {/* TODO: i18n */}
              Simulation-Based Learning
            </h2>
            <p className="text-charcoal/70 text-lg max-w-3xl mb-6">
              {/* TODO: i18n */}
              Every exercise, dataset, and character belongs to UrbanStyle &mdash;
              a simulated Estonian fashion startup. Participants don&apos;t study
              data analytics; they <em>practice</em> it in a realistic context
              that builds transferable skills.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Four-Component Model */}
      <section className="px-6 md:px-16 py-20 bg-limestone/20">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-10">
              {/* TODO: i18n */}
              Four-Component Architecture
            </h2>
          </RevealSection>
          <div className="grid sm:grid-cols-2 gap-6">
            {FOUR_COMPONENTS.map((comp, idx) => (
              <RevealSection key={comp.name}>
                <motion.div
                  custom={idx}
                  variants={fadeUp}
                  className="bg-offwhite rounded-xl p-8 border border-charcoal/5 relative overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 w-1 h-full ${comp.color}`}
                  />
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-burnt-orange font-bold text-lg">
                      {comp.num}
                    </span>
                    <h3 className="font-bold text-lg">{comp.name}</h3>
                    {!comp.required && (
                      <span className="text-xs px-2 py-0.5 bg-limestone rounded-full text-charcoal/60">
                        Voluntary
                      </span>
                    )}
                  </div>
                  <p className="text-charcoal/70 text-sm leading-relaxed">
                    {comp.desc}
                  </p>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-10">
              {/* TODO: i18n */}
              Key Differentiators
            </h2>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {METHODOLOGY_DIFFERENTIATORS.map((card, idx) => (
              <RevealSection key={card.title}>
                <motion.div
                  custom={idx}
                  variants={fadeUp}
                  className="bg-offwhite rounded-xl p-8 border border-charcoal/5 hover:shadow-lg transition-shadow duration-500 h-full"
                >
                  <span className="text-3xl mb-4 block">{card.icon}</span>
                  <h3 className="font-bold text-lg mb-2 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-charcoal/70 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Rhythm */}
      <section className="px-6 md:px-16 py-20 bg-limestone/20">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-6">
              {/* TODO: i18n */}
              Weekly Rhythm: Spiral Learning
            </h2>
            <p className="text-charcoal/70 text-lg mb-10 max-w-3xl">
              {/* TODO: i18n */}
              Each activity adds a new perspective on the same topic. By the end
              of each week, the concept has been explored from self-study,
              mentoring, teamwork, and demonstration angles.
            </p>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: "Self-Study",
                subtitle: "Perspective A",
                desc: "Independent exploration with 4C cycles",
              },
              {
                step: "02",
                title: "Mentor Session",
                subtitle: "Perspective B",
                desc: "Expert adds new angle, live teaching",
              },
              {
                step: "03",
                title: "Group Work",
                subtitle: "A + B Synthesis",
                desc: "Team applies both perspectives",
              },
              {
                step: "04",
                title: "Demo + Retro",
                subtitle: "Reflection",
                desc: "Present, get feedback, improve",
              },
            ].map((item, idx) => (
              <RevealSection key={item.step}>
                <motion.div
                  custom={idx}
                  variants={fadeUp}
                  className="bg-offwhite rounded-xl p-6 border border-charcoal/5 text-center"
                >
                  <span className="font-mono text-burnt-orange text-2xl font-bold block mb-2">
                    {item.step}
                  </span>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-xs font-mono text-charcoal/40 uppercase tracking-widest mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-charcoal/70">{item.desc}</p>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Zoom toggle + details */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <ZoomToggle zoomed={zoomed} onToggle={() => setZoomed(!zoomed)} />
          <AnimatePresence>
            {zoomed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden mt-8"
              >
                <MethodologyAccordions />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 md:px-16 py-16 bg-charcoal text-offwhite text-center">
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4">
              {/* TODO: i18n */}
              Questions About Our Approach?
            </h2>
            <p className="text-offwhite/70 mb-6">
              {/* TODO: i18n */}
              Reach out to program producer Alek Kozlov for detailed information.
            </p>
            <p className="text-offwhite/50 text-sm">
              info@ettevotluskeskus.ee &middot; +372 652 0001 &middot; Alek
              Kozlov +372 502 1033
            </p>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Zoom toggle component
// ---------------------------------------------------------------------------

function ZoomToggle({
  zoomed,
  onToggle,
}: {
  zoomed: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={onToggle}
        className="group flex items-center gap-3 px-6 py-3 rounded-full border border-charcoal/15 hover:border-burnt-orange/40 transition-colors duration-300"
      >
        <span className="text-sm font-medium text-charcoal/70 group-hover:text-charcoal transition-colors">
          {zoomed ? "Hide Details" : "Show Full Details"}
        </span>
        <motion.span
          animate={{ rotate: zoomed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-burnt-orange"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="block"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

export default function ApproachPage() {
  const [activeTab, setActiveTab] = useState<AudienceTab>("learners");

  // Hash-based deep linking
  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.replace("#", "") as AudienceTab;
    if (hash && ["learners", "employers", "methodology"].includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  useEffect(() => {
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [handleHashChange]);

  // Update hash when tab changes
  const switchTab = (tab: AudienceTab) => {
    setActiveTab(tab);
    window.history.replaceState(null, "", `#${tab}`);
  };

  return (
    <div className="pt-20 overflow-hidden">
      {/* Sticky tab navigation */}
      <nav
        className="sticky top-20 z-40 bg-offwhite/90 backdrop-blur-md border-b border-charcoal/10"
        aria-label="Audience views"
      >
        <div className="max-w-5xl mx-auto px-6 md:px-16 flex">
          {(["learners", "employers", "methodology"] as AudienceTab[]).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                className={`relative flex-1 py-4 text-sm md:text-base font-medium tracking-wide text-center transition-colors duration-300 ${
                  activeTab === tab
                    ? "text-charcoal"
                    : "text-charcoal/40 hover:text-charcoal/70"
                }`}
              >
                {TAB_LABELS[tab]}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-burnt-orange"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            )
          )}
        </div>
      </nav>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabContent}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {activeTab === "learners" && <LearnersView />}
          {activeTab === "employers" && <EmployersView />}
          {activeTab === "methodology" && <MethodologyView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
