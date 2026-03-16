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

interface ComponentCard {
  num: string;
  name: string;
  color: string;
  desc: string;
  required: boolean;
  voluntaryLabel?: string;
}

interface PageContent {
  tabs: Record<AudienceTab, string>;
  zoom: { show: string; hide: string };
  sharedCta: {
    bookCallTitle: string;
    bookCallDesc: string;
    bookCallBtn: string;
    contactInfo: string;
  };
  learners: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    stats: StatItem[];
    whatYouGetTitle: string;
    whatYouGetDesc: string;
    teamTitle: string;
    teamDesc: string;
    values: ValueCard[];
    assessmentTitle: string;
    assessmentDesc: string;
    badges: string[];
    ctaEyebrow: string;
    ctaHeadline: string;
    ctaButton: string;
    accordions: {
      weekMap: string;
      weeklyFlow: string;
      aiSkills: string;
      techStack: string;
      careerChanger: string;
    };
    weekMapItems: Array<{ week: string; topic: string }>;
    weeklyFlowIntro: string;
    weeklyFlowSteps: Array<{ label: string; desc: string }>;
    aiIntro: string;
    aiProgression: Array<{ stage: string; level: string; desc: string }>;
    careerIntro: string;
    careerPoints: string[];
  };
  employers: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    stats: StatItem[];
    qualityBadges: string[];
    qualityTitle: string;
    qualityDesc: string;
    learnTitle: string;
    learnItems: Array<{ label: string; desc: string }>;
    values: ValueCard[];
    simTitle: string;
    simDesc: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaButton: string;
    execCtaPrimary: string;
    execCtaSecondary: string;
    accordions: {
      roi: string;
      quality: string;
      schedule: string;
      skills: string;
      simulation: string;
    };
    roiIntro: string;
    roiPoints: string[];
    qualityAccordionP1: string;
    qualityAccordionP2: string;
    scheduleSessions: Array<{ day: string; type: string; desc: string }>;
    scheduleIntro: string;
    skillsMap: Array<{ skill: string; weeks: string }>;
    simulationP1: string;
    simulationP2: string;
  };
  methodology: {
    eyebrow: string;
    headline: string;
    stats: Array<{ value: string; label: string }>;
    simTitle: string;
    simDesc: string;
    fourCompTitle: string;
    components: ComponentCard[];
    diffTitle: string;
    differentiators: ValueCard[];
    rhythmTitle: string;
    rhythmDesc: string;
    rhythmSteps: Array<{ step: string; title: string; subtitle: string; desc: string }>;
    contactTitle: string;
    contactDesc: string;
    accordions: {
      fourC: string;
      groupWork: string;
      shuHaRi: string;
      aiCompetency: string;
      portfolio: string;
      careerChanger: string;
      curriculum: string;
      techStack: string;
    };
    fourCIntro: string;
    fourCSteps: Array<{ c: string; desc: string }>;
    fourCHierarchical: string;
    groupWorkIntro: string;
    groupWorkSteps: Array<{ step: string; desc: string }>;
    shuHaRiIntro: string;
    shuHaRiPhases: Array<{ phase: string; weeks: string; desc: string }>;
    aiCompIntro: string;
    aiCompFootnote: string;
    portfolioIntro: string;
    portfolioPoints: string[];
    careerDesignIntro: string;
    careerDesignPoints: string[];
    curriculumIntro: string;
    curriculumSprints: Array<{ sprint: string; weeks: string; focus: string }>;
    curriculumFootnote: string;
  };
}

// ---------------------------------------------------------------------------
// Content dictionary (EN + ET; RU falls back to EN)
// ---------------------------------------------------------------------------

const TECH_STACK = [
  "SQL (PostgreSQL via Supabase)",
  "Python (pandas, numpy, Plotly)",
  "Power BI / Streamlit",
  "GitHub (version control + portfolio)",
  "VS Code",
  "Google Workspace",
  "AI Tools (NotebookLM, GitHub Copilot)",
];

const CONTENT: Record<string, PageContent> = {
  // =========================================================================
  // ENGLISH
  // =========================================================================
  en: {
    tabs: {
      learners: "For Learners",
      employers: "For Employers",
      methodology: "Methodology",
    },
    zoom: { show: "Show Full Details", hide: "Hide Details" },
    sharedCta: {
      bookCallTitle: "15-min Google Meet with Alek Kozlov",
      bookCallDesc: "Meet with the producer to discuss collaboration ideas.",
      bookCallBtn: "Book a Meeting (Calendly)",
      contactInfo: "Alek Kozlov \u00b7 ak@ettevotluskeskus.ee \u00b7 +372 502 1033",
    },

    // -- Learners -----------------------------------------------------------
    learners: {
      eyebrow: "DACA Program",
      headline: "From zero to job-ready data analyst in 11\u00a0weeks",
      subtitle:
        "A simulation-based intensive that gives you a professional portfolio, real skills, and career-ready confidence.",
      stats: [
        { value: "11", label: "Weeks" },
        { value: "200+", label: "Hours" },
        { value: "13", label: "EAP Credits" },
        { value: "66", label: "Contact Hours" },
        { value: "3", label: "Sessions / Week" },
        { value: "10", label: "Portfolio Projects" },
      ],
      whatYouGetTitle: "What You Get",
      whatYouGetDesc:
        "A professional GitHub portfolio with 10 data analytics projects that employers can review. Not certificates on a wall \u2014 working artifacts that prove your skills.",
      teamTitle: "You\u2019re Not a Student \u2014 You\u2019re a Team Member",
      teamDesc:
        "From day one, you work as a data analyst at UrbanStyle \u2014 a simulated Estonian fashion startup. Real datasets, real business problems, real characters who give you tasks and feedback.",
      values: [
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
      ],
      assessmentTitle: "Assessment: Portfolio Only",
      assessmentDesc:
        "No traditional exams. Pass/Fail based on your portfolio: 70% attendance, 8\u201310 projects submitted, final project defended.",
      badges: ["13 EAP Credits", "HAKA Quality Mark", "Microcredential Candidate"],
      ctaEyebrow: "Applications Open",
      ctaHeadline: "First Cohort Starts March\u00a023,\u00a02026",
      ctaButton: "Apply Now",

      accordions: {
        weekMap: "11-Week Topic Map",
        weeklyFlow: "Weekly Flow (Spiral Learning)",
        aiSkills: "AI Skills Progression",
        techStack: "Technology Stack",
        careerChanger: "Career Changer Support",
      },
      weekMapItems: [
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
      ],
      weeklyFlowIntro:
        "Each week follows a spiral pattern where the same topic is explored from multiple perspectives:",
      weeklyFlowSteps: [
        { label: "Self-Study (Perspective A)", desc: "Independent exploration with hierarchical 4C cycles" },
        { label: "Session 1: Mentor (Perspective B)", desc: "Live teaching adds a new angle, 4C methodology" },
        { label: "Session 2: Group Work (A+B)", desc: "Teams synthesize both perspectives in practice" },
        { label: "Session 3: Demo + Retro", desc: "Present results, get feedback, retrospective" },
      ],
      aiIntro:
        "AI collaboration is treated as the 6th core competency, developed progressively using the Shu-Ha-Ri framework:",
      aiProgression: [
        { stage: "W0\u20131", level: "Introduction", desc: "NotebookLM, asking AI questions" },
        { stage: "W2\u20133", level: "Assistant", desc: "Debugging, fact-checking AI output" },
        { stage: "W4\u20135", level: "Co-Pilot", desc: "Code generation, critical evaluation" },
        { stage: "W6\u20137", level: "Director", desc: "Delegation, prompt engineering" },
        { stage: "W8\u20139", level: "Team Amplifier", desc: "AI in group collaboration" },
        { stage: "W10", level: "Demonstrator", desc: "Showcasing AI usage in portfolio" },
      ],
      careerIntro:
        "DACA is designed for career changers. Your existing professional background is an asset, not a limitation.",
      careerPoints: [
        "Estonian DA market has 56+ open roles and is growing",
        "UrbanStyle simulation values diverse perspectives",
        "Week 9 features an \u2018aha moment\u2019 where you realize the hiring guide describes YOU",
        "Career materials: CV template, LinkedIn optimization, interview preparation",
        "Portfolio-based assessment means no traditional exams",
      ],
    },

    // -- Employers ----------------------------------------------------------
    employers: {
      eyebrow: "For Organizations",
      headline: "Upskill your team in data analytics \u2014 without disrupting operations",
      subtitle:
        "An accredited, simulation-based program that turns your employees into confident data analysts.",
      stats: [
        { value: "15", label: "Cohorts Completed" },
        { value: "13", label: "EAP Credits" },
        { value: "66", label: "Contact Hours" },
      ],
      qualityBadges: ["HAKA Quality Mark", "Microcredential Candidate", "13 EAP Credits"],
      qualityTitle: "Accredited & Quality Assured",
      qualityDesc:
        "DACA holds HAKA quality recognition and is on the microcredential track. Your employees receive a credential with real academic weight \u2014 13 EAP credits, 66 contact hours.",
      learnTitle: "What Your Employees Learn",
      learnItems: [
        { label: "SQL & Databases", desc: "Query, clean, and analyze relational data" },
        { label: "Data Visualization", desc: "Power BI, Plotly, and data storytelling" },
        { label: "Python & pandas", desc: "Automate analysis and work with APIs" },
        { label: "AI Collaboration", desc: "Use AI tools as a professional skill" },
        { label: "Data Storytelling", desc: "Present insights that drive decisions" },
        { label: "Portfolio Building", desc: "GitHub-based professional portfolio" },
      ],
      values: [
        {
          icon: "\u{1F3AF}",
          title: "Job-Relevant",
          desc: "Curriculum built around real business scenarios \u2014 skills transfer immediately.",
        },
        {
          icon: "\u23F0",
          title: "Minimal Disruption",
          desc: "3 sessions per week, blend of self-study and live sessions.",
        },
        {
          icon: "\u2705",
          title: "Quality Assured",
          desc: "HAKA quality mark, microcredential candidate, 13 EAP accredited.",
        },
        {
          icon: "\u{1F4B0}",
          title: "Funding Available",
          desc: "Funding options available for eligible organizations and participants.",
        },
      ],
      simTitle: "Why Simulation-Based Learning?",
      simDesc:
        "Participants work as data analysts at UrbanStyle, solving realistic business problems with real datasets. Skills transfer directly to the workplace because the context mirrors real organizations.",
      ctaTitle: "Send Your Team to DACA",
      ctaDesc: "Contact us to discuss cohort enrollment, funding options, and custom scheduling.",
      ctaButton: "Get in Touch",
      execCtaPrimary: "Book 15-min Fit Call",
      execCtaSecondary: "Download Syllabus (PDF)",

      accordions: {
        roi: "Return on Investment",
        quality: "Quality & Accreditation",
        schedule: "Schedule & Format",
        skills: "Skills Map",
        simulation: "Why Simulation-Based Learning Works",
      },
      roiIntro:
        "Employees gain immediately applicable skills through simulation-based learning with real business datasets.",
      roiPoints: [
        "200+ hours of structured learning over 11 weeks",
        "10 portfolio projects with tangible business outputs",
        "SQL, Python, visualization, and AI skills",
        "Employees work in teams mirroring real analytics departments",
        "Funding options available for eligible organizations",
      ],
      qualityAccordionP1:
        "The program holds HAKA quality mark recognition and is a microcredential candidate with 13 EAP (European Credit Transfer System) credits.",
      qualityAccordionP2:
        "Assessment is portfolio-based (Pass/Fail), requiring 70% attendance and 8\u201310 submitted projects with a defended final project.",
      scheduleIntro: "3 live sessions per week (90 minutes each), plus self-study:",
      scheduleSessions: [
        { day: "Tuesday", type: "Mentor Session", desc: "Expert-led teaching" },
        { day: "Wednesday", type: "Group Work", desc: "Autonomous team practice" },
        { day: "Thu/Fri", type: "Demo + Retro", desc: "Presentations & feedback" },
      ],
      skillsMap: [
        { skill: "SQL & Database Querying", weeks: "Weeks 1\u20134" },
        { skill: "Data Visualization & Storytelling", weeks: "Weeks 5\u20136" },
        { skill: "Python & Automation", weeks: "Weeks 7\u20138" },
        { skill: "AI Collaboration", weeks: "Throughout" },
        { skill: "Portfolio & Career Readiness", weeks: "Weeks 9\u201310" },
      ],
      simulationP1:
        "Participants work as data analysts at UrbanStyle \u2014 a realistic Estonian fashion startup with real datasets, real characters, and real business problems.",
      simulationP2:
        "This means skills transfer directly to the workplace. Employees don\u2019t learn abstract theory \u2014 they practice solving problems identical to those in your organization.",
    },

    // -- Methodology --------------------------------------------------------
    methodology: {
      eyebrow: "Pedagogy",
      headline: "We don\u2019t sell information \u2014 it\u2019s free online. We sell a transformative experience.",
      stats: [
        { value: "4", label: "Core Principles" },
        { value: "11", label: "Weeks Simulation" },
        { value: "100%", label: "Hands-on Practice" },
      ],
      simTitle: "Simulation-Based Learning",
      simDesc:
        "Every exercise, dataset, and character belongs to UrbanStyle \u2014 a simulated Estonian fashion startup. Participants don\u2019t study data analytics; they practice it in a realistic context that builds transferable skills.",
      fourCompTitle: "Four-Component Architecture",
      components: [
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
          desc: "Two required textbooks: \u2018Python for Data Analysis\u2019 (McKinney) and \u2018Storytelling with Data\u2019 (Knaflic).",
          required: true,
        },
        {
          num: "4",
          name: "E-Learning Catalog",
          color: "bg-limestone",
          desc: "Voluntary supplementary resources. Never graded, never on certificate.",
          required: false,
          voluntaryLabel: "Voluntary",
        },
      ],
      diffTitle: "Key Differentiators",
      differentiators: [
        {
          icon: "\u{1F3AD}",
          title: "Simulation-Based",
          desc: "Every exercise uses UrbanStyle data \u2014 realistic, consistent, and engaging.",
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
      ],
      rhythmTitle: "Weekly Rhythm: Spiral Learning",
      rhythmDesc:
        "Each activity adds a new perspective on the same topic. By the end of each week, the concept has been explored from self-study, mentoring, teamwork, and demonstration angles.",
      rhythmSteps: [
        { step: "01", title: "Self-Study", subtitle: "Perspective A", desc: "Independent exploration with 4C cycles" },
        { step: "02", title: "Mentor Session", subtitle: "Perspective B", desc: "Expert adds new angle, live teaching" },
        { step: "03", title: "Group Work", subtitle: "A + B Synthesis", desc: "Team applies both perspectives" },
        { step: "04", title: "Demo + Retro", subtitle: "Reflection", desc: "Present, get feedback, improve" },
      ],
      contactTitle: "Questions About Our Approach?",
      contactDesc: "Reach out to program producer Alek Kozlov for detailed information.",

      accordions: {
        fourC: "4C Teaching Method",
        groupWork: "JAGA-TEE-KOGU-ESITLE Group Pattern",
        shuHaRi: "Shu-Ha-Ri Progression",
        aiCompetency: "AI as 6th Competency",
        portfolio: "Portfolio Assessment",
        careerChanger: "Career Changer Design",
        curriculum: "Curriculum Structure",
        techStack: "Technology Stack",
      },
      fourCIntro: "Every learning unit follows the 4C cycle:",
      fourCSteps: [
        { c: "Connect", desc: "Activate prior knowledge, connect to something familiar" },
        { c: "Concept", desc: "Introduce the new concept with clear explanation" },
        { c: "Concrete", desc: "Apply immediately with hands-on exercises" },
        { c: "Conclusion", desc: "Reflect, summarize, and bridge to next topic" },
      ],
      fourCHierarchical:
        "Self-study workbooks use hierarchical 4C: each sub-concept (Osa) gets its own full 4C cycle, followed by an integrative synthesis.",
      groupWorkIntro: "All Session 2 group work follows the universal 90-minute pattern:",
      groupWorkSteps: [
        { step: "JAGA (Share)", desc: "Team reviews what they learned individually, shares insights" },
        { step: "TEE (Do)", desc: "Collaborative hands-on work on the week\u2019s challenge" },
        { step: "KOGU (Gather)", desc: "Compile results, prepare deliverables" },
        { step: "ESITLE (Present)", desc: "Demonstrate outcomes to the group, receive feedback" },
      ],
      shuHaRiIntro:
        "Borrowed from martial arts, this framework governs how autonomy increases over the program:",
      shuHaRiPhases: [
        { phase: "Shu (Copy)", weeks: "Weeks 0\u20133", desc: "Follow instructions precisely. Emphasis on correct technique." },
        { phase: "Ha (Adapt)", weeks: "Weeks 4\u20137", desc: "Begin to understand WHY. Modify approaches with guidance." },
        { phase: "Ri (Innovate)", weeks: "Weeks 8\u201310", desc: "Create your own approach. Defend decisions in portfolio." },
      ],
      aiCompIntro:
        "AI-assisted collaboration is a named skill developed throughout the entire program. It follows the Shu-Ha-Ri curve:",
      aiCompFootnote:
        "From Week 4 onward, every portfolio README includes an \u201cAI Usage\u201d section (1\u20132 sentences).",
      portfolioIntro: "Assessment is 100% portfolio-based (Pass/Fail):",
      portfolioPoints: [
        "70% attendance required",
        "8\u201310 portfolio projects submitted",
        "Final project defended in front of peers and mentors",
        "Base level (70%): Required for pass",
        "Advanced level (30%): Optional deeper analysis for faster learners",
        "No traditional exams, no grades \u2014 only Arvestatud (Pass) or Mittearvestatud (Fail)",
      ],
      careerDesignIntro:
        "The program is specifically designed for career changers. Every element reinforces that existing professional experience is an asset:",
      careerDesignPoints: [
        "Week 0: Estonian DA market statistics (56+ roles, growing demand)",
        "Weeks 1\u20138: Role rotation within UrbanStyle values diverse viewpoints",
        "Week 9: \u2018Aha moment\u2019 \u2014 the hiring guide describes YOU",
        "Week 10: UrbanStyle Board Meeting as graduation ceremony",
      ],
      curriculumIntro: "6 sprints across 11 weeks:",
      curriculumSprints: [
        { sprint: "Sprint 0", weeks: "Week 0", focus: "Onboarding" },
        { sprint: "Sprint 1", weeks: "Weeks 1\u20132", focus: "SQL Fundamentals" },
        { sprint: "Sprint 2", weeks: "Weeks 3\u20134", focus: "SQL Advanced" },
        { sprint: "Sprint 3", weeks: "Weeks 5\u20136", focus: "Visualization" },
        { sprint: "Sprint 4", weeks: "Weeks 7\u20138", focus: "Python Analysis" },
        { sprint: "Sprint 5", weeks: "Weeks 9\u201310", focus: "Portfolio & Career" },
      ],
      curriculumFootnote:
        "Two required textbooks support the curriculum: \u201cPython for Data Analysis\u201d (McKinney) and \u201cStorytelling with Data\u201d (Knaflic).",
    },
  },

  // =========================================================================
  // ESTONIAN
  // =========================================================================
  et: {
    tabs: {
      learners: "\u00d5ppijale",
      employers: "T\u00f6\u00f6andjale",
      methodology: "Metoodika",
    },
    zoom: { show: "N\u00e4ita t\u00e4isdetaile", hide: "Peida detailid" },
    sharedCta: {
      bookCallTitle: "15-min Google Meet kohtumine Alek Kozloviga",
      bookCallDesc: "Kohtumine produtsendiga ja koost\u00f6\u00f6 m\u00f5tteid.",
      bookCallBtn: "Broneeri Kohtumine (Calendly)",
      contactInfo: "Alek Kozlov \u00b7 ak@ettevotluskeskus.ee \u00b7 +372 502 1033",
    },

    // -- Learners -----------------------------------------------------------
    learners: {
      eyebrow: "DACA Programm",
      headline: "Nullist t\u00f6\u00f6turul valmis andmeanal\u00fc\u00fctikuks 11\u00a0n\u00e4dalaga",
      subtitle:
        "Simulatsioonip\u00f5hine intensiivprogramm, mis annab sulle professionaalse portfoolio, reaalsed oskused ja karj\u00e4\u00e4rikindluse.",
      stats: [
        { value: "11", label: "N\u00e4dalat" },
        { value: "200+", label: "Tundi" },
        { value: "13", label: "EAP ainepunkti" },
        { value: "66", label: "Kontakttundi" },
        { value: "3", label: "Sessiooni / n\u00e4dal" },
        { value: "10", label: "Portfoolioprojekti" },
      ],
      whatYouGetTitle: "Mida sa saad",
      whatYouGetDesc:
        "Professionaalne GitHub portfoolio 10 andmeanal\u00fc\u00fctika projektiga, mida t\u00f6\u00f6andjad saavad \u00fcle vaadata. Mitte sertifikaadid seinal \u2014 t\u00f6\u00f6tavad artefaktid, mis t\u00f5estavad sinu oskusi.",
      teamTitle: "Sa ei ole \u00fcli\u00f5pilane \u2014 sa oled meeskonnaliige",
      teamDesc:
        "Esimesest p\u00e4evast t\u00f6\u00f6tad sa andmeanal\u00fc\u00fctikuna UrbanStyle\u2019is \u2014 simuleeritud Eesti moefirmas. P\u00e4ris andmestikud, p\u00e4ris \u00e4riprobleemid, p\u00e4ris karakterid, kes annavad sulle \u00fclesandeid ja tagasisidet.",
      values: [
        {
          icon: "\u{1F4CA}",
          title: "SQL \u2192 Python",
          desc: "Andmebaaside p\u00e4ringust anal\u00fc\u00fcsi automatiseerimiseni pandas ja API-dega.",
        },
        {
          icon: "\u{1F916}",
          title: "AI oskused",
          desc: "\u00d5pi AI-t\u00f6\u00f6riistadega koost\u00f6\u00f6d tegema kui professionaalset kompetentsi.",
        },
        {
          icon: "\u{1F91D}",
          title: "Meeskonnat\u00f6\u00f6",
          desc: "T\u00f6\u00f6ta p\u00fcsivates meeskondades, mis simuleerivad p\u00e4ris anal\u00fc\u00fctikaosakonda.",
        },
        {
          icon: "\u{1F680}",
          title: "Karj\u00e4\u00e4rivalmis",
          desc: "L\u00f5peta professionaalse GitHub portfoolio ja karj\u00e4\u00e4rimaterjalidega.",
        },
      ],
      assessmentTitle: "Hindamine: ainult portfoolio",
      assessmentDesc:
        "Traditsionaalseid eksameid ei ole. Arvestatud/Mittearvestatud portfoolio alusel: 70% osalus, 8\u201310 projekti esitatud, l\u00f5puprojekt kaitstud.",
      badges: ["13 EAP ainepunkti", "HAKA kvaliteedim\u00e4rk", "Mikrokvalifikatsiooni kandidaat"],
      ctaEyebrow: "Registreerumine avatud",
      ctaHeadline: "Esimene lend alustab 23.\u00a0m\u00e4rtsil\u00a02026",
      ctaButton: "Kandideeri",

      accordions: {
        weekMap: "11 n\u00e4dala teemakaart",
        weeklyFlow: "N\u00e4dala r\u00fctm (spiraalne \u00f5pe)",
        aiSkills: "AI oskuste areng",
        techStack: "Tehnoloogiapakett",
        careerChanger: "Karj\u00e4\u00e4rivahetaja tugi",
      },
      weekMapItems: [
        { week: "0", topic: "Sissejuhatus ja seadistamine" },
        { week: "1", topic: "SQL alused (SELECT, WHERE, ORDER BY)" },
        { week: "2", topic: "SQL andmete puhastamine (NULL-id, duplikaadid)" },
        { week: "3", topic: "SQL JOIN-id (INNER, LEFT, RIGHT)" },
        { week: "4", topic: "SQL agregatsioon (GROUP BY, HAVING, CTE)" },
        { week: "5", topic: "Visualiseerimise disain (Power BI / Plotly)" },
        { week: "6", topic: "Dashboard\u2019ide loomine ja andmelugude jutustamine" },
        { week: "7", topic: "Python pandas ja numpy" },
        { week: "8", topic: "Python API-d ja automatiseerimine (Supabase)" },
        { week: "9", topic: "Karj\u00e4\u00e4ri ettevalmistus (CV, LinkedIn, intervjuu)" },
        { week: "10", topic: "Portfoolio kaitsmine ja l\u00f5petamine" },
      ],
      weeklyFlowIntro:
        "Iga n\u00e4dal j\u00e4rgib spiraalmustrit, kus sama teemat uuritakse erinevatest vaatenurkadest:",
      weeklyFlowSteps: [
        { label: "Iseseisev t\u00f6\u00f6 (Perspektiiv A)", desc: "Iseseisev uurimine hierarhiliste 4C ts\u00fcklitega" },
        { label: "Sessioon 1: Mentor (Perspektiiv B)", desc: "Live-\u00f5pe lisab uue vaatenurga, 4C metoodika" },
        { label: "Sessioon 2: Grupit\u00f6\u00f6 (A+B)", desc: "Meeskonnad s\u00fcnteesivad m\u00f5lemat perspektiivi praktikas" },
        { label: "Sessioon 3: Demo + retro", desc: "Esitle tulemused, saa tagasisidet, retrospektiiv" },
      ],
      aiIntro:
        "AI koost\u00f6\u00f6d k\u00e4sitletakse kui 6. p\u00f5hikompetentsi, mida arendatakse progressiivselt Shu-Ha-Ri raamistiku abil:",
      aiProgression: [
        { stage: "W0\u20131", level: "Tutvumine", desc: "NotebookLM, AI-le k\u00fcsimuste esitamine" },
        { stage: "W2\u20133", level: "Abiline", desc: "Silumine, AI v\u00e4ljundi kontrollimine" },
        { stage: "W4\u20135", level: "Koost\u00f6\u00f6partner", desc: "Koodi genereerimine, kriitiline hindamine" },
        { stage: "W6\u20137", level: "Suunaja", desc: "Delegeerimine, prompt engineering" },
        { stage: "W8\u20139", level: "Meeskonna tugevdaja", desc: "AI grupit\u00f6\u00f6s" },
        { stage: "W10", level: "Demonstreerija", desc: "AI kasutamise esitlemine portfoolios" },
      ],
      careerIntro:
        "DACA on loodud karj\u00e4\u00e4rivahetajatele. Sinu olemasolev professionaalne taust on eelis, mitte piirang.",
      careerPoints: [
        "Eesti DA turul on 56+ avatud rolli ja see kasvab",
        "UrbanStyle\u2019i simulatsioon v\u00e4\u00e4rtustab erinevaid vaatenurki",
        "9. n\u00e4dalal on \u2018aha-moment\u2019, kus saad aru, et v\u00e4rbamisjuhend kirjeldab SIND",
        "Karj\u00e4\u00e4rimaterjalid: CV mall, LinkedIn\u2019i optimeerimine, intervjuuks ettevalmistus",
        "Portfoolip\u00f5hine hindamine t\u00e4hendab, et traditsioonilisi eksameid ei ole",
      ],
    },

    // -- Employers ----------------------------------------------------------
    employers: {
      eyebrow: "Organisatsioonidele",
      headline: "Koolitag oma meeskonda andmeanal\u00fc\u00fctikas \u2014 ilma tegevust h\u00e4irimata",
      subtitle:
        "Akrediteeritud, simulatsioonip\u00f5hine programm, mis muudab teie t\u00f6\u00f6tajad enesekindlateks andmeanal\u00fc\u00fctikuteks.",
      stats: [
        { value: "15", label: "Lendu l\u00e4bitud" },
        { value: "13", label: "EAP ainepunkti" },
        { value: "66", label: "Kontakttundi" },
      ],
      qualityBadges: ["HAKA kvaliteedim\u00e4rk", "Mikrokvalifikatsiooni kandidaat", "13 EAP ainepunkti"],
      qualityTitle: "Akrediteeritud ja kvaliteediga tagatud",
      qualityDesc:
        "DACA-l on HAKA kvaliteedim\u00e4rk ja see on mikrokvalifikatsiooni kandidaat. Teie t\u00f6\u00f6tajad saavad akadeemilise kaaluga tunnistuse \u2014 13 EAP ainepunkti, 66 kontakttundi.",
      learnTitle: "Mida teie t\u00f6\u00f6tajad \u00f5pivad",
      learnItems: [
        { label: "SQL ja andmebaasid", desc: "P\u00e4ringud, puhastamine ja relatsiooniliste andmete anal\u00fc\u00fcs" },
        { label: "Andmete visualiseerimine", desc: "Power BI, Plotly ja andmelugude jutustamine" },
        { label: "Python ja pandas", desc: "Anal\u00fc\u00fcsi automatiseerimine ja API-dega t\u00f6\u00f6" },
        { label: "AI koost\u00f6\u00f6", desc: "AI-t\u00f6\u00f6riistade kasutamine professionaalse oskusena" },
        { label: "Andmelugude jutustamine", desc: "Otsuseid m\u00f5jutavate seisukohtade esitlemine" },
        { label: "Portfoolio ehitamine", desc: "GitHub-p\u00f5hine professionaalne portfoolio" },
      ],
      values: [
        {
          icon: "\u{1F3AF}",
          title: "T\u00f6\u00f6ga seotud",
          desc: "\u00d5ppekava on \u00fcles ehitatud reaalsetele \u00e4ristsenaariumidele \u2014 oskused kanduvad kohe \u00fcle.",
        },
        {
          icon: "\u23F0",
          title: "Minimaalne h\u00e4ire",
          desc: "3 sessiooni n\u00e4dalas, iseseisva t\u00f6\u00f6 ja live-sessioonide kombinatsioon.",
        },
        {
          icon: "\u2705",
          title: "Kvaliteet tagatud",
          desc: "HAKA kvaliteedim\u00e4rk, mikrokvalifikatsiooni kandidaat, 13 EAP ainepunkti.",
        },
        {
          icon: "\u{1F4B0}",
          title: "Rahastamine saadaval",
          desc: "Rahastamisv\u00f5imalused k\u00f5lblikele organisatsioonidele ja osalejatele.",
        },
      ],
      simTitle: "Miks simulatsioonip\u00f5hine \u00f5pe?",
      simDesc:
        "Osalejad t\u00f6\u00f6tavad andmeanal\u00fc\u00fctikutena UrbanStyle\u2019is, lahendades realistlikke \u00e4riprobleeme p\u00e4ris andmestikega. Oskused kanduvad t\u00f6\u00f6le otse \u00fcle, sest kontekst peegeldab reaalseid organisatsioone.",
      ctaTitle: "Saatke oma meeskond DACA-sse",
      ctaDesc: "V\u00f5tke meiega \u00fchendust, et arutada grupiliitumist, rahastamisv\u00f5imalusi ja kohandatud ajakava.",
      ctaButton: "V\u00f5ta \u00fchendust",
      execCtaPrimary: "Broneeri 15-min Partnerlusk\u00f5ne",
      execCtaSecondary: "Executive Syllabus (PDF)",

      accordions: {
        roi: "Investeeringu tasuvus",
        quality: "Kvaliteet ja akrediteerimine",
        schedule: "Ajakava ja formaat",
        skills: "Oskuste kaart",
        simulation: "Miks simulatsioonip\u00f5hine \u00f5pe t\u00f6\u00f6tab",
      },
      roiIntro:
        "T\u00f6\u00f6tajad omandavad kohe rakendatavad oskused simulatsioonip\u00f5hise \u00f5ppe kaudu reaalsete \u00e4riandmestikega.",
      roiPoints: [
        "200+ tundi struktureeritud \u00f5pet 11 n\u00e4dala jooksul",
        "10 portfoolioprojekti k\u00e4egakatsutavate \u00e4ritulemustega",
        "SQL, Python, visualiseerimise ja AI oskused",
        "T\u00f6\u00f6tajad t\u00f6\u00f6tavad meeskondades, mis peegeldavad p\u00e4ris anal\u00fc\u00fctikaosakonda",
        "Rahastamisv\u00f5imalused k\u00f5lblikele organisatsioonidele",
      ],
      qualityAccordionP1:
        "Programmil on HAKA kvaliteedim\u00e4rk ja see on mikrokvalifikatsiooni kandidaat 13 EAP (Euroopa ainepunktide \u00fclekandes\u00fcsteemi) ainepunktiga.",
      qualityAccordionP2:
        "Hindamine on portfoolip\u00f5hine (Arvestatud/Mittearvestatud), n\u00f5udes 70% osalust ja 8\u201310 esitatud projekti kaitstud l\u00f5puprojektiga.",
      scheduleIntro: "3 live-sessiooni n\u00e4dalas (90 minutit iga\u00fcks), pluss iseseisev t\u00f6\u00f6:",
      scheduleSessions: [
        { day: "Teisip\u00e4ev", type: "Mentorsessioon", desc: "Ekspertide juhtimisel \u00f5pe" },
        { day: "Kolmap\u00e4ev", type: "Grupit\u00f6\u00f6", desc: "Iseseisev meeskonnapraktika" },
        { day: "N/R", type: "Demo + retro", desc: "Esitlused ja tagasiside" },
      ],
      skillsMap: [
        { skill: "SQL ja andmebaasi p\u00e4ringud", weeks: "N\u00e4dalad 1\u20134" },
        { skill: "Andmete visualiseerimine ja jutustamine", weeks: "N\u00e4dalad 5\u20136" },
        { skill: "Python ja automatiseerimine", weeks: "N\u00e4dalad 7\u20138" },
        { skill: "AI koost\u00f6\u00f6", weeks: "Kogu programmi jooksul" },
        { skill: "Portfoolio ja karj\u00e4\u00e4rivalmidus", weeks: "N\u00e4dalad 9\u201310" },
      ],
      simulationP1:
        "Osalejad t\u00f6\u00f6tavad andmeanal\u00fc\u00fctikutena UrbanStyle\u2019is \u2014 realistlikus Eesti moefirmas p\u00e4ris andmestike, p\u00e4ris karakterite ja p\u00e4ris \u00e4riprobleemidega.",
      simulationP2:
        "See t\u00e4hendab, et oskused kanduvad otse t\u00f6\u00f6le. T\u00f6\u00f6tajad ei \u00f5pi abstraktset teooriat \u2014 nad harjutavad selliste probleemide lahendamist, mis on identsed teie organisatsiooni omadega.",
    },

    // -- Methodology --------------------------------------------------------
    methodology: {
      eyebrow: "Pedagoogika",
      headline: "Me ei m\u00fc\u00fc informatsiooni \u2014 see on internetis tasuta. Me m\u00fc\u00fcme transformatiivset kogemust.",
      stats: [
        { value: "4", label: "P\u00f5hiprintsiipi" },
        { value: "11", label: "N\u00e4dalat Simulatsiooni" },
        { value: "100%", label: "Praktiline \u00d5pe" },
      ],
      simTitle: "Simulatsioonip\u00f5hine \u00f5pe",
      simDesc:
        "Iga harjutus, andmestik ja karakter kuulub UrbanStyle\u2019ile \u2014 simuleeritud Eesti moefirmale. Osalejad ei \u00f5pi andmeanal\u00fc\u00fctikat; nad praktiseerivad seda realistlikus kontekstis, mis arendab \u00fclekantavaid oskusi.",
      fourCompTitle: "Nelja komponendi arhitektuur",
      components: [
        {
          num: "1",
          name: "Mentorlus",
          color: "bg-slate-blue",
          desc: "Live-mentorsessioonid 4C metoodikaga. Ekspertide juhtimisel, interaktiivne, v\u00e4ljakutsep\u00f5hine.",
          required: true,
        },
        {
          num: "2",
          name: "Portfoolio",
          color: "bg-sage",
          desc: "AINUS hinnatav komponent. 10 projekti, mis moodustavad professionaalse GitHub portfoolio.",
          required: true,
        },
        {
          num: "3",
          name: "\u00d5pikud",
          color: "bg-burnt-orange",
          desc: "Kaks kohustuslikku \u00f5pikut: \u2018Python for Data Analysis\u2019 (McKinney) ja \u2018Storytelling with Data\u2019 (Knaflic).",
          required: true,
        },
        {
          num: "4",
          name: "E-\u00f5ppe kataloog",
          color: "bg-limestone",
          desc: "Vabatahtlikud t\u00e4iendavad ressursid. Mitte kunagi hinnatud, mitte kunagi tunnistusel.",
          required: false,
          voluntaryLabel: "Vabatahtlik",
        },
      ],
      diffTitle: "Peamised eristajad",
      differentiators: [
        {
          icon: "\u{1F3AD}",
          title: "Simulatsioonip\u00f5hine",
          desc: "Iga harjutus kasutab UrbanStyle\u2019i andmeid \u2014 realistlik, j\u00e4rjepidev ja k\u00f6itev.",
        },
        {
          icon: "\u{1F504}",
          title: "Spiraalne \u00f5pe",
          desc: "Igat teemat vaadatakse uuesti erinevatest vaatenurkadest erinevates sessioonides.",
        },
        {
          icon: "\u{1F4D6}",
          title: "4C meetod",
          desc: "Connect \u2192 Concept \u2192 Concrete \u2192 Conclusion igas \u00f5pi\u00fchikus.",
        },
        {
          icon: "\u{1F94B}",
          title: "Shu-Ha-Ri",
          desc: "Arenguteekond kopeerimisest kohandamise kaudu innovatsioonini 11 n\u00e4dala jooksul.",
        },
        {
          icon: "\u{1F4BC}",
          title: "Portfoolio-esmane",
          desc: "Hindamine on 100% portfoolip\u00f5hine. Arvestatud/Mittearvestatud. Eksameid ei ole.",
        },
        {
          icon: "\u{1F916}",
          title: "AI kui 6. kompetents",
          desc: "AI koost\u00f6\u00f6d \u00f5petatakse kui oskust, mitte lihtsalt t\u00f6\u00f6riista.",
        },
      ],
      rhythmTitle: "N\u00e4dalar\u00fctm: spiraalne \u00f5pe",
      rhythmDesc:
        "Iga tegevus lisab samale teemale uue vaatenurga. N\u00e4dala l\u00f5puks on kontseptsiooni uuritud iseseisva t\u00f6\u00f6, mentorluse, meeskonnat\u00f6\u00f6 ja esitluse vaatenurkadest.",
      rhythmSteps: [
        { step: "01", title: "Iseseisev t\u00f6\u00f6", subtitle: "Perspektiiv A", desc: "Iseseisev uurimine 4C ts\u00fcklitega" },
        { step: "02", title: "Mentorsessioon", subtitle: "Perspektiiv B", desc: "Ekspert lisab uue vaatenurga, live-\u00f5pe" },
        { step: "03", title: "Grupit\u00f6\u00f6", subtitle: "A + B s\u00fcntees", desc: "Meeskond rakendab m\u00f5lemat perspektiivi" },
        { step: "04", title: "Demo + retro", subtitle: "Refleksioon", desc: "Esitle, saa tagasisidet, parenda" },
      ],
      contactTitle: "K\u00fcsimused meie l\u00e4henemise kohta?",
      contactDesc: "V\u00f5tke \u00fchendust programmi peaprodutsendi Alek Kozloviga \u00fcksikasjaliku info saamiseks.",

      accordions: {
        fourC: "4C \u00f5petamismeetod",
        groupWork: "JAGA-TEE-KOGU-ESITLE grupimuster",
        shuHaRi: "Shu-Ha-Ri areng",
        aiCompetency: "AI kui 6. kompetents",
        portfolio: "Portfoolio hindamine",
        careerChanger: "Karj\u00e4\u00e4rivahetaja disain",
        curriculum: "\u00d5ppekava struktuur",
        techStack: "Tehnoloogiapakett",
      },
      fourCIntro: "Iga \u00f5pi\u00fchik j\u00e4rgib 4C ts\u00fcklit:",
      fourCSteps: [
        { c: "Connect", desc: "Aktiveeri eelteadmised, seosta millegi tuttavaga" },
        { c: "Concept", desc: "Tutvusta uut kontseptsiooni selge selgitusega" },
        { c: "Concrete", desc: "Rakenda kohe praktiliste harjutustega" },
        { c: "Conclusion", desc: "Reflekteeri, v\u00f5ta kokku ja loo sild j\u00e4rgmise teemani" },
      ],
      fourCHierarchical:
        "Iseseisva t\u00f6\u00f6 vihikud kasutavad hierarhilist 4C-d: iga alamkontseptsioon (Osa) saab oma t\u00e4ieliku 4C ts\u00fckli, millele j\u00e4rgneb integreeriv s\u00fcntees.",
      groupWorkIntro: "K\u00f5ik 2. sessiooni grupit\u00f6\u00f6d j\u00e4rgivad universaalset 90-minutilist mustrit:",
      groupWorkSteps: [
        { step: "JAGA (Share)", desc: "Meeskond vaatab \u00fcle, mida nad individuaalselt \u00f5ppisid, jagab teadmisi" },
        { step: "TEE (Do)", desc: "Koost\u00f6\u00f6l p\u00f5hinev praktiline t\u00f6\u00f6 n\u00e4dala v\u00e4ljakutsega" },
        { step: "KOGU (Gather)", desc: "Koosta tulemused, valmista ette v\u00e4ljundid" },
        { step: "ESITLE (Present)", desc: "N\u00e4ita tulemusi grupile, saa tagasisidet" },
      ],
      shuHaRiIntro:
        "V\u00f5\u00f5rs\u00f5nadest laenatud raamistik, mis juhib autonoomia kasvu programmi jooksul:",
      shuHaRiPhases: [
        { phase: "Shu (kopeeri)", weeks: "N\u00e4dalad 0\u20133", desc: "J\u00e4rgi juhiseid t\u00e4pselt. R\u00f5hk \u00f5igel tehnikal." },
        { phase: "Ha (kohanda)", weeks: "N\u00e4dalad 4\u20137", desc: "Hakka m\u00f5istma MIKS. Muuda l\u00e4henemist juhendamisel." },
        { phase: "Ri (innoveeri)", weeks: "N\u00e4dalad 8\u201310", desc: "Loo oma l\u00e4henemine. Kaitse otsuseid portfoolios." },
      ],
      aiCompIntro:
        "AI-toetatud koost\u00f6\u00f6 on nimetatud oskus, mida arendatakse kogu programmi jooksul. See j\u00e4rgib Shu-Ha-Ri k\u00f5verat:",
      aiCompFootnote:
        "Alates 4. n\u00e4dalast sisaldab iga portfoolio README l\u00f5iku \u2018AI kasutamine\u2019 (1\u20132 lauset).",
      portfolioIntro: "Hindamine on 100% portfoolip\u00f5hine (Arvestatud/Mittearvestatud):",
      portfolioPoints: [
        "70% osalus n\u00f5utud",
        "8\u201310 portfoolioprojekti esitatud",
        "L\u00f5puprojekt kaitstud kaaslaste ja mentorite ees",
        "Baastase (70%): n\u00f5utud arvestuse saamiseks",
        "Edasij\u00f5udnute tase (30%): vabatahtlik s\u00fcvaanal\u00fc\u00fcs kiirematele \u00f5ppijatele",
        "Traditsioonilisi eksameid ega hindeid ei ole \u2014 ainult Arvestatud v\u00f5i Mittearvestatud",
      ],
      careerDesignIntro:
        "Programm on spetsiaalselt loodud karj\u00e4\u00e4rivahetajatele. Iga element tugevdab, et olemasolev professionaalne kogemus on eelis:",
      careerDesignPoints: [
        "N\u00e4dal 0: Eesti DA turu statistika (56+ rolli, kasvav n\u00f5udlus)",
        "N\u00e4dalad 1\u20138: rollide rotatsioon UrbanStyle\u2019is v\u00e4\u00e4rtustab erinevaid vaatenurki",
        "N\u00e4dal 9: \u2018Aha-moment\u2019 \u2014 v\u00e4rbamisjuhend kirjeldab SIND",
        "N\u00e4dal 10: UrbanStyle\u2019i juhatuse koosolek kui l\u00f5petamistseremoonia",
      ],
      curriculumIntro: "6 sprinti 11 n\u00e4dala jooksul:",
      curriculumSprints: [
        { sprint: "Sprint 0", weeks: "N\u00e4dal 0", focus: "Sissejuhatus" },
        { sprint: "Sprint 1", weeks: "N\u00e4dalad 1\u20132", focus: "SQL alused" },
        { sprint: "Sprint 2", weeks: "N\u00e4dalad 3\u20134", focus: "SQL edasij\u00f5udnud" },
        { sprint: "Sprint 3", weeks: "N\u00e4dalad 5\u20136", focus: "Visualiseerimine" },
        { sprint: "Sprint 4", weeks: "N\u00e4dalad 7\u20138", focus: "Python anal\u00fc\u00fcs" },
        { sprint: "Sprint 5", weeks: "N\u00e4dalad 9\u201310", focus: "Portfoolio ja karj\u00e4\u00e4r" },
      ],
      curriculumFootnote:
        "\u00d5ppekava toetab kaks kohustuslikku \u00f5pikut: \u201cPython for Data Analysis\u201d (McKinney) ja \u201cStorytelling with Data\u201d (Knaflic).",
    },
  },

  // =========================================================================
  // RUSSIAN
  // =========================================================================
  ru: {
    tabs: {
      learners: "\u0414\u043b\u044f \u0443\u0447\u0430\u0449\u0438\u0445\u0441\u044f",
      employers: "\u0414\u043b\u044f \u0440\u0430\u0431\u043e\u0442\u043e\u0434\u0430\u0442\u0435\u043b\u0435\u0439",
      methodology: "\u041c\u0435\u0442\u043e\u0434\u043e\u043b\u043e\u0433\u0438\u044f",
    },
    zoom: { show: "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0441\u0435 \u0434\u0435\u0442\u0430\u043b\u0438", hide: "\u0421\u043a\u0440\u044b\u0442\u044c \u0434\u0435\u0442\u0430\u043b\u0438" },
    sharedCta: {
      bookCallTitle: "15-\u043c\u0438\u043d. \u0432\u0441\u0442\u0440\u0435\u0447\u0430 Google Meet \u0441 \u0410\u043b\u0435\u043a\u043e\u043c \u041a\u043e\u0437\u043b\u043e\u0432\u044b\u043c",
      bookCallDesc: "\u0412\u0441\u0442\u0440\u0435\u0447\u0430 \u0441 \u043f\u0440\u043e\u0434\u044e\u0441\u0435\u0440\u043e\u043c \u0438 \u0438\u0434\u0435\u0438 \u0434\u043b\u044f \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u0447\u0435\u0441\u0442\u0432\u0430.",
      bookCallBtn: "\u0417\u0430\u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0432\u0441\u0442\u0440\u0435\u0447\u0443 (Calendly)",
      contactInfo: "\u0410\u043b\u0435\u043a \u041a\u043e\u0437\u043b\u043e\u0432 \u00b7 ak@ettevotluskeskus.ee \u00b7 +372 502 1033",
    },

    learners: {
      eyebrow: "\u041f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430 DACA",
      headline: "\u041e\u0442 \u043d\u0443\u043b\u044f \u0434\u043e \u0433\u043e\u0442\u043e\u0432\u043e\u0433\u043e \u043a \u0440\u0430\u0431\u043e\u0442\u0435 \u0430\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0430 \u0434\u0430\u043d\u043d\u044b\u0445 \u0437\u0430 11\u00a0\u043d\u0435\u0434\u0435\u043b\u044c",
      subtitle:
        "\u0418\u043d\u0442\u0435\u043d\u0441\u0438\u0432\u043d\u0430\u044f \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430 \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u0441\u0438\u043c\u0443\u043b\u044f\u0446\u0438\u0438, \u043a\u043e\u0442\u043e\u0440\u0430\u044f \u0434\u0430\u0451\u0442 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e, \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u0435 \u043d\u0430\u0432\u044b\u043a\u0438 \u0438 \u0443\u0432\u0435\u0440\u0435\u043d\u043d\u043e\u0441\u0442\u044c \u0432 \u043a\u0430\u0440\u044c\u0435\u0440\u0435.",
      stats: [
        { value: "11", label: "\u041d\u0435\u0434\u0435\u043b\u044c" },
        { value: "200+", label: "\u0427\u0430\u0441\u043e\u0432" },
        { value: "13", label: "\u041a\u0440\u0435\u0434\u0438\u0442\u043e\u0432 EAP" },
        { value: "66", label: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u043d\u044b\u0445 \u0447\u0430\u0441\u043e\u0432" },
        { value: "3", label: "\u0421\u0435\u0441\u0441\u0438\u0439 / \u043d\u0435\u0434\u0435\u043b\u044e" },
        { value: "10", label: "\u041f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432" },
      ],
      whatYouGetTitle: "\u0427\u0442\u043e \u0432\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u0435",
      whatYouGetDesc:
        "\u041f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0435 GitHub \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e \u0441 10 \u043f\u0440\u043e\u0435\u043a\u0442\u0430\u043c\u0438 \u043f\u043e \u0430\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0435 \u0434\u0430\u043d\u043d\u044b\u0445, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0440\u0430\u0431\u043e\u0442\u043e\u0434\u0430\u0442\u0435\u043b\u0438 \u043c\u043e\u0433\u0443\u0442 \u043e\u0446\u0435\u043d\u0438\u0442\u044c. \u041d\u0435 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u044b \u043d\u0430 \u0441\u0442\u0435\u043d\u0435 \u2014 \u0440\u0430\u0431\u043e\u0442\u0430\u044e\u0449\u0438\u0435 \u0430\u0440\u0442\u0435\u0444\u0430\u043a\u0442\u044b, \u0434\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u044e\u0449\u0438\u0435 \u0432\u0430\u0448\u0438 \u043d\u0430\u0432\u044b\u043a\u0438.",
      teamTitle: "\u0412\u044b \u043d\u0435 \u0441\u0442\u0443\u0434\u0435\u043d\u0442 \u2014 \u0432\u044b \u0447\u043b\u0435\u043d \u043a\u043e\u043c\u0430\u043d\u0434\u044b",
      teamDesc:
        "\u0421 \u043f\u0435\u0440\u0432\u043e\u0433\u043e \u0434\u043d\u044f \u0432\u044b \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442\u0435 \u0430\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u043e\u043c \u0434\u0430\u043d\u043d\u044b\u0445 \u0432 UrbanStyle \u2014 \u0441\u0438\u043c\u0443\u043b\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u043e\u043c \u044d\u0441\u0442\u043e\u043d\u0441\u043a\u043e\u043c \u043c\u043e\u0434\u043d\u043e\u043c \u0441\u0442\u0430\u0440\u0442\u0430\u043f\u0435. \u0420\u0435\u0430\u043b\u044c\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435, \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u0435 \u0431\u0438\u0437\u043d\u0435\u0441-\u0437\u0430\u0434\u0430\u0447\u0438, \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u0435 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0438, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0434\u0430\u044e\u0442 \u0437\u0430\u0434\u0430\u043d\u0438\u044f \u0438 \u043e\u0431\u0440\u0430\u0442\u043d\u0443\u044e \u0441\u0432\u044f\u0437\u044c.",
      values: [
        { icon: "\u{1F4CA}", title: "SQL \u2192 Python", desc: "\u041e\u0442 \u0437\u0430\u043f\u0440\u043e\u0441\u043e\u0432 \u043a \u0431\u0430\u0437\u0430\u043c \u0434\u0430\u043d\u043d\u044b\u0445 \u0434\u043e \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0438 \u0430\u043d\u0430\u043b\u0438\u0437\u0430 \u0441 pandas \u0438 API." },
        { icon: "\u{1F916}", title: "\u041d\u0430\u0432\u044b\u043a\u0438 AI", desc: "\u041d\u0430\u0443\u0447\u0438\u0442\u0435\u0441\u044c \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u0447\u0430\u0442\u044c \u0441 AI \u043a\u0430\u043a \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0439 \u043a\u043e\u043c\u043f\u0435\u0442\u0435\u043d\u0446\u0438\u0438." },
        { icon: "\u{1F91D}", title: "\u041a\u043e\u043c\u0430\u043d\u0434\u043d\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430", desc: "\u0420\u0430\u0431\u043e\u0442\u0430\u0439\u0442\u0435 \u0432 \u043f\u043e\u0441\u0442\u043e\u044f\u043d\u043d\u044b\u0445 \u043a\u043e\u043c\u0430\u043d\u0434\u0430\u0445, \u043c\u043e\u0434\u0435\u043b\u0438\u0440\u0443\u044e\u0449\u0438\u0445 \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u0439 \u0430\u043d\u0430\u043b\u0438\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u043e\u0442\u0434\u0435\u043b." },
        { icon: "\u{1F680}", title: "\u0413\u043e\u0442\u043e\u0432\u043d\u043e\u0441\u0442\u044c \u043a \u043a\u0430\u0440\u044c\u0435\u0440\u0435", desc: "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0435 \u0441 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u043c GitHub \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e \u0438 \u043a\u0430\u0440\u044c\u0435\u0440\u043d\u044b\u043c\u0438 \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u0430\u043c\u0438." },
      ],
      assessmentTitle: "\u041e\u0446\u0435\u043d\u043a\u0430: \u0442\u043e\u043b\u044c\u043a\u043e \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e",
      assessmentDesc:
        "\u041d\u0438\u043a\u0430\u043a\u0438\u0445 \u0442\u0440\u0430\u0434\u0438\u0446\u0438\u043e\u043d\u043d\u044b\u0445 \u044d\u043a\u0437\u0430\u043c\u0435\u043d\u043e\u0432. \u0417\u0430\u0447\u0451\u0442/\u041d\u0435\u0437\u0430\u0447\u0451\u0442 \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e: 70% \u043f\u043e\u0441\u0435\u0449\u0430\u0435\u043c\u043e\u0441\u0442\u044c, 8\u201310 \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432, \u0437\u0430\u0449\u0438\u0442\u0430 \u0444\u0438\u043d\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u043f\u0440\u043e\u0435\u043a\u0442\u0430.",
      badges: ["13 \u043a\u0440\u0435\u0434\u0438\u0442\u043e\u0432 EAP", "\u0417\u043d\u0430\u043a \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0430 HAKA", "\u041a\u0430\u043d\u0434\u0438\u0434\u0430\u0442 \u043d\u0430 \u043c\u0438\u043a\u0440\u043e\u043a\u0440\u0435\u0434\u0438\u0442"],
      ctaEyebrow: "\u041f\u0440\u0438\u0451\u043c \u043e\u0442\u043a\u0440\u044b\u0442",
      ctaHeadline: "\u041f\u0435\u0440\u0432\u044b\u0439 \u043f\u043e\u0442\u043e\u043a \u043d\u0430\u0447\u0438\u043d\u0430\u0435\u0442\u0441\u044f 23\u00a0\u043c\u0430\u0440\u0442\u0430\u00a02026",
      ctaButton: "\u041f\u043e\u0434\u0430\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443",

      accordions: {
        weekMap: "\u041a\u0430\u0440\u0442\u0430 \u0442\u0435\u043c 11 \u043d\u0435\u0434\u0435\u043b\u044c",
        weeklyFlow: "\u041d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0439 \u0440\u0438\u0442\u043c (\u0441\u043f\u0438\u0440\u0430\u043b\u044c\u043d\u043e\u0435 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0435)",
        aiSkills: "\u041f\u0440\u043e\u0433\u0440\u0435\u0441\u0441\u0438\u044f \u043d\u0430\u0432\u044b\u043a\u043e\u0432 AI",
        techStack: "\u0422\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0441\u0442\u0435\u043a",
        careerChanger: "\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430 \u0441\u043c\u0435\u043d\u044b \u043a\u0430\u0440\u044c\u0435\u0440\u044b",
      },
      weekMapItems: [
        { week: "0", topic: "\u041e\u043d\u0431\u043e\u0440\u0434\u0438\u043d\u0433 \u0438 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430" },
        { week: "1", topic: "\u041e\u0441\u043d\u043e\u0432\u044b SQL (SELECT, WHERE, ORDER BY)" },
        { week: "2", topic: "\u041e\u0447\u0438\u0441\u0442\u043a\u0430 \u0434\u0430\u043d\u043d\u044b\u0445 SQL (NULL, \u0434\u0443\u0431\u043b\u0438\u043a\u0430\u0442\u044b)" },
        { week: "3", topic: "SQL JOIN-\u044b (INNER, LEFT, RIGHT)" },
        { week: "4", topic: "\u0410\u0433\u0440\u0435\u0433\u0430\u0446\u0438\u044f SQL (GROUP BY, HAVING, CTE)" },
        { week: "5", topic: "\u0414\u0438\u0437\u0430\u0439\u043d \u0432\u0438\u0437\u0443\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438 (Power BI / Plotly)" },
        { week: "6", topic: "\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u0434\u0430\u0448\u0431\u043e\u0440\u0434\u043e\u0432 \u0438 \u0441\u0442\u043e\u0440\u0438\u0442\u0435\u043b\u043b\u0438\u043d\u0433 \u0434\u0430\u043d\u043d\u044b\u0445" },
        { week: "7", topic: "Python pandas \u0438 numpy" },
        { week: "8", topic: "Python API \u0438 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044f (Supabase)" },
        { week: "9", topic: "\u041f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0430 \u043a \u043a\u0430\u0440\u044c\u0435\u0440\u0435 (CV, LinkedIn, \u0441\u043e\u0431\u0435\u0441\u0435\u0434\u043e\u0432\u0430\u043d\u0438\u0435)" },
        { week: "10", topic: "\u0417\u0430\u0449\u0438\u0442\u0430 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e \u0438 \u0432\u044b\u043f\u0443\u0441\u043a" },
      ],
      weeklyFlowIntro:
        "\u041a\u0430\u0436\u0434\u0430\u044f \u043d\u0435\u0434\u0435\u043b\u044f \u0441\u043b\u0435\u0434\u0443\u0435\u0442 \u0441\u043f\u0438\u0440\u0430\u043b\u044c\u043d\u043e\u043c\u0443 \u043f\u0430\u0442\u0442\u0435\u0440\u043d\u0443, \u0433\u0434\u0435 \u043e\u0434\u043d\u0430 \u0442\u0435\u043c\u0430 \u0438\u0437\u0443\u0447\u0430\u0435\u0442\u0441\u044f \u0441 \u0440\u0430\u0437\u043d\u044b\u0445 \u043f\u0435\u0440\u0441\u043f\u0435\u043a\u0442\u0438\u0432:",
      weeklyFlowSteps: [
        { label: "\u0421\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430 (\u041f\u0435\u0440\u0441\u043f\u0435\u043a\u0442\u0438\u0432\u0430 A)", desc: "\u0421\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u0438\u0437\u0443\u0447\u0435\u043d\u0438\u0435 \u0441 \u0438\u0435\u0440\u0430\u0440\u0445\u0438\u0447\u0435\u0441\u043a\u0438\u043c\u0438 \u0446\u0438\u043a\u043b\u0430\u043c\u0438 4C" },
        { label: "\u0421\u0435\u0441\u0441\u0438\u044f 1: \u041c\u0435\u043d\u0442\u043e\u0440 (\u041f\u0435\u0440\u0441\u043f\u0435\u043a\u0442\u0438\u0432\u0430 B)", desc: "\u0416\u0438\u0432\u043e\u0435 \u043f\u0440\u0435\u043f\u043e\u0434\u0430\u0432\u0430\u043d\u0438\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u0435\u0442 \u043d\u043e\u0432\u044b\u0439 \u0440\u0430\u043a\u0443\u0440\u0441, \u043c\u0435\u0442\u043e\u0434\u043e\u043b\u043e\u0433\u0438\u044f 4C" },
        { label: "\u0421\u0435\u0441\u0441\u0438\u044f 2: \u0413\u0440\u0443\u043f\u043f\u043e\u0432\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430 (A+B)", desc: "\u041a\u043e\u043c\u0430\u043d\u0434\u044b \u0441\u0438\u043d\u0442\u0435\u0437\u0438\u0440\u0443\u044e\u0442 \u043e\u0431\u0435 \u043f\u0435\u0440\u0441\u043f\u0435\u043a\u0442\u0438\u0432\u044b \u043d\u0430 \u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0435" },
        { label: "\u0421\u0435\u0441\u0441\u0438\u044f 3: \u0414\u0435\u043c\u043e + \u0440\u0435\u0442\u0440\u043e", desc: "\u041f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u043e\u0432, \u043e\u0431\u0440\u0430\u0442\u043d\u0430\u044f \u0441\u0432\u044f\u0437\u044c, \u0440\u0435\u0442\u0440\u043e\u0441\u043f\u0435\u043a\u0442\u0438\u0432\u0430" },
      ],
      aiIntro:
        "AI-\u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0440\u0430\u0441\u0441\u043c\u0430\u0442\u0440\u0438\u0432\u0430\u0435\u0442\u0441\u044f \u043a\u0430\u043a 6-\u044f \u043a\u043b\u044e\u0447\u0435\u0432\u0430\u044f \u043a\u043e\u043c\u043f\u0435\u0442\u0435\u043d\u0446\u0438\u044f, \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u0435\u043c\u0430\u044f \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441\u0438\u0432\u043d\u043e \u043f\u043e \u0444\u0440\u0435\u0439\u043c\u0432\u043e\u0440\u043a\u0443 Shu-Ha-Ri:",
      aiProgression: [
        { stage: "W0\u20131", level: "\u0417\u043d\u0430\u043a\u043e\u043c\u0441\u0442\u0432\u043e", desc: "NotebookLM, \u0432\u043e\u043f\u0440\u043e\u0441\u044b \u043a AI" },
        { stage: "W2\u20133", level: "\u041f\u043e\u043c\u043e\u0449\u043d\u0438\u043a", desc: "\u041e\u0442\u043b\u0430\u0434\u043a\u0430, \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u043e\u0432 AI" },
        { stage: "W4\u20135", level: "\u041a\u043e-\u043f\u0438\u043b\u043e\u0442", desc: "\u0413\u0435\u043d\u0435\u0440\u0430\u0446\u0438\u044f \u043a\u043e\u0434\u0430, \u043a\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u043e\u0446\u0435\u043d\u043a\u0430" },
        { stage: "W6\u20137", level: "\u0414\u0438\u0440\u0435\u043a\u0442\u043e\u0440", desc: "\u0414\u0435\u043b\u0435\u0433\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435, prompt engineering" },
        { stage: "W8\u20139", level: "\u0423\u0441\u0438\u043b\u0438\u0442\u0435\u043b\u044c \u043a\u043e\u043c\u0430\u043d\u0434\u044b", desc: "AI \u0432 \u0433\u0440\u0443\u043f\u043f\u043e\u0432\u043e\u0439 \u0440\u0430\u0431\u043e\u0442\u0435" },
        { stage: "W10", level: "\u0414\u0435\u043c\u043e\u043d\u0441\u0442\u0440\u0430\u0442\u043e\u0440", desc: "\u0414\u0435\u043c\u043e\u043d\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u044f AI \u0432 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e" },
      ],
      careerIntro:
        "DACA \u0441\u043e\u0437\u0434\u0430\u043d\u0430 \u0434\u043b\u044f \u0442\u0435\u0445, \u043a\u0442\u043e \u043c\u0435\u043d\u044f\u0435\u0442 \u043a\u0430\u0440\u044c\u0435\u0440\u0443. \u0412\u0430\u0448 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0439 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0439 \u043e\u043f\u044b\u0442 \u2014 \u043f\u0440\u0435\u0438\u043c\u0443\u0449\u0435\u0441\u0442\u0432\u043e, \u0430 \u043d\u0435 \u043e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u0438\u0435.",
      careerPoints: [
        "\u041d\u0430 \u0440\u044b\u043d\u043a\u0435 DA \u042d\u0441\u0442\u043e\u043d\u0438\u0438 56+ \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u0445 \u043f\u043e\u0437\u0438\u0446\u0438\u0439, \u0438 \u043e\u043d \u0440\u0430\u0441\u0442\u0451\u0442",
        "\u0421\u0438\u043c\u0443\u043b\u044f\u0446\u0438\u044f UrbanStyle \u0446\u0435\u043d\u0438\u0442 \u0440\u0430\u0437\u043d\u043e\u043e\u0431\u0440\u0430\u0437\u0438\u0435 \u043f\u0435\u0440\u0441\u043f\u0435\u043a\u0442\u0438\u0432",
        "\u041d\u0430 9-\u0439 \u043d\u0435\u0434\u0435\u043b\u0435 \u2014 \u2018\u0430\u0433\u0430-\u043c\u043e\u043c\u0435\u043d\u0442\u2019: \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0441\u0442\u0432\u043e \u043f\u043e \u043d\u0430\u0439\u043c\u0443 \u043e\u043f\u0438\u0441\u044b\u0432\u0430\u0435\u0442 \u0412\u0410\u0421",
        "\u041a\u0430\u0440\u044c\u0435\u0440\u043d\u044b\u0435 \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b: \u0448\u0430\u0431\u043b\u043e\u043d CV, \u043e\u043f\u0442\u0438\u043c\u0438\u0437\u0430\u0446\u0438\u044f LinkedIn, \u043f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0430 \u043a \u0441\u043e\u0431\u0435\u0441\u0435\u0434\u043e\u0432\u0430\u043d\u0438\u044e",
        "\u041e\u0446\u0435\u043d\u043a\u0430 \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e \u043e\u0437\u043d\u0430\u0447\u0430\u0435\u0442 \u043d\u0438\u043a\u0430\u043a\u0438\u0445 \u0442\u0440\u0430\u0434\u0438\u0446\u0438\u043e\u043d\u043d\u044b\u0445 \u044d\u043a\u0437\u0430\u043c\u0435\u043d\u043e\u0432",
      ],
    },

    employers: {
      eyebrow: "\u0414\u043b\u044f \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u0439",
      headline: "\u041f\u043e\u0432\u044b\u0441\u044c\u0442\u0435 \u043a\u0432\u0430\u043b\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u044e \u043a\u043e\u043c\u0430\u043d\u0434\u044b \u0432 \u0430\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0435 \u0434\u0430\u043d\u043d\u044b\u0445 \u2014 \u0431\u0435\u0437 \u043d\u0430\u0440\u0443\u0448\u0435\u043d\u0438\u044f \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0439",
      subtitle:
        "\u0410\u043a\u043a\u0440\u0435\u0434\u0438\u0442\u043e\u0432\u0430\u043d\u043d\u0430\u044f, \u043e\u0441\u043d\u043e\u0432\u0430\u043d\u043d\u0430\u044f \u043d\u0430 \u0441\u0438\u043c\u0443\u043b\u044f\u0446\u0438\u0438 \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430, \u043a\u043e\u0442\u043e\u0440\u0430\u044f \u043f\u0440\u0435\u0432\u0440\u0430\u0449\u0430\u0435\u0442 \u0432\u0430\u0448\u0438\u0445 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u043e\u0432 \u0432 \u0443\u0432\u0435\u0440\u0435\u043d\u043d\u044b\u0445 \u0430\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u043e\u0432 \u0434\u0430\u043d\u043d\u044b\u0445.",
      stats: [
        { value: "15", label: "\u041f\u043e\u0442\u043e\u043a\u043e\u0432 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043e" },
        { value: "13", label: "\u041a\u0440\u0435\u0434\u0438\u0442\u043e\u0432 EAP" },
        { value: "66", label: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u043d\u044b\u0445 \u0447\u0430\u0441\u043e\u0432" },
      ],
      qualityBadges: ["\u0417\u043d\u0430\u043a \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0430 HAKA", "\u041a\u0430\u043d\u0434\u0438\u0434\u0430\u0442 \u043d\u0430 \u043c\u0438\u043a\u0440\u043e\u043a\u0440\u0435\u0434\u0438\u0442", "13 \u043a\u0440\u0435\u0434\u0438\u0442\u043e\u0432 EAP"],
      qualityTitle: "\u0410\u043a\u043a\u0440\u0435\u0434\u0438\u0442\u043e\u0432\u0430\u043d\u043d\u0430\u044f \u0438 \u0441 \u0433\u0430\u0440\u0430\u043d\u0442\u0438\u0435\u0439 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0430",
      qualityDesc:
        "DACA \u0438\u043c\u0435\u0435\u0442 \u0437\u043d\u0430\u043a \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0430 HAKA \u0438 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043a\u0430\u043d\u0434\u0438\u0434\u0430\u0442\u043e\u043c \u043d\u0430 \u043c\u0438\u043a\u0440\u043e\u043a\u0440\u0435\u0434\u0438\u0442. \u0412\u0430\u0448\u0438 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0438 \u043f\u043e\u043b\u0443\u0447\u0430\u044e\u0442 \u043a\u0432\u0430\u043b\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u044e \u0441 \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u043c \u0430\u043a\u0430\u0434\u0435\u043c\u0438\u0447\u0435\u0441\u043a\u0438\u043c \u0432\u0435\u0441\u043e\u043c \u2014 13 \u043a\u0440\u0435\u0434\u0438\u0442\u043e\u0432 EAP, 66 \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u043d\u044b\u0445 \u0447\u0430\u0441\u043e\u0432.",
      learnTitle: "\u0427\u0435\u043c\u0443 \u043d\u0430\u0443\u0447\u0430\u0442\u0441\u044f \u0432\u0430\u0448\u0438 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0438",
      learnItems: [
        { label: "SQL \u0438 \u0431\u0430\u0437\u044b \u0434\u0430\u043d\u043d\u044b\u0445", desc: "\u0417\u0430\u043f\u0440\u043e\u0441\u044b, \u043e\u0447\u0438\u0441\u0442\u043a\u0430 \u0438 \u0430\u043d\u0430\u043b\u0438\u0437 \u0440\u0435\u043b\u044f\u0446\u0438\u043e\u043d\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445" },
        { label: "\u0412\u0438\u0437\u0443\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f \u0434\u0430\u043d\u043d\u044b\u0445", desc: "Power BI, Plotly \u0438 \u0441\u0442\u043e\u0440\u0438\u0442\u0435\u043b\u043b\u0438\u043d\u0433 \u0434\u0430\u043d\u043d\u044b\u0445" },
        { label: "Python \u0438 pandas", desc: "\u0410\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044f \u0430\u043d\u0430\u043b\u0438\u0437\u0430 \u0438 \u0440\u0430\u0431\u043e\u0442\u0430 \u0441 API" },
        { label: "AI-\u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u0447\u0435\u0441\u0442\u0432\u043e", desc: "\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u0435 AI-\u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u043e\u0432 \u043a\u0430\u043a \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u043d\u0430\u0432\u044b\u043a\u0430" },
        { label: "\u0421\u0442\u043e\u0440\u0438\u0442\u0435\u043b\u043b\u0438\u043d\u0433 \u0434\u0430\u043d\u043d\u044b\u0445", desc: "\u041f\u0440\u0435\u0437\u0435\u043d\u0442\u0430\u0446\u0438\u044f \u0438\u043d\u0441\u0430\u0439\u0442\u043e\u0432 \u0434\u043b\u044f \u043f\u0440\u0438\u043d\u044f\u0442\u0438\u044f \u0440\u0435\u0448\u0435\u043d\u0438\u0439" },
        { label: "\u041f\u043e\u0441\u0442\u0440\u043e\u0435\u043d\u0438\u0435 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e", desc: "\u041f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e \u043d\u0430 GitHub" },
      ],
      values: [
        { icon: "\u{1F3AF}", title: "\u0420\u0435\u043b\u0435\u0432\u0430\u043d\u0442\u043d\u043e\u0441\u0442\u044c \u0440\u0430\u0431\u043e\u0442\u0435", desc: "\u0423\u0447\u0435\u0431\u043d\u0430\u044f \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430 \u043f\u043e\u0441\u0442\u0440\u043e\u0435\u043d\u0430 \u043d\u0430 \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u0445 \u0431\u0438\u0437\u043d\u0435\u0441-\u0441\u0446\u0435\u043d\u0430\u0440\u0438\u044f\u0445 \u2014 \u043d\u0430\u0432\u044b\u043a\u0438 \u043f\u0440\u0438\u043c\u0435\u043d\u0438\u043c\u044b \u0441\u0440\u0430\u0437\u0443." },
        { icon: "\u23F0", title: "\u041c\u0438\u043d\u0438\u043c\u0430\u043b\u044c\u043d\u043e\u0435 \u043d\u0430\u0440\u0443\u0448\u0435\u043d\u0438\u0435", desc: "3 \u0441\u0435\u0441\u0441\u0438\u0438 \u0432 \u043d\u0435\u0434\u0435\u043b\u044e, \u0441\u043e\u0447\u0435\u0442\u0430\u043d\u0438\u0435 \u0441\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0439 \u0438 \u0436\u0438\u0432\u043e\u0439 \u0440\u0430\u0431\u043e\u0442\u044b." },
        { icon: "\u2705", title: "\u0413\u0430\u0440\u0430\u043d\u0442\u0438\u044f \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0430", desc: "\u0417\u043d\u0430\u043a \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0430 HAKA, \u043a\u0430\u043d\u0434\u0438\u0434\u0430\u0442 \u043d\u0430 \u043c\u0438\u043a\u0440\u043e\u043a\u0440\u0435\u0434\u0438\u0442, 13 \u0430\u043a\u043a\u0440\u0435\u0434\u0438\u0442\u043e\u0432\u0430\u043d\u043d\u044b\u0445 \u043a\u0440\u0435\u0434\u0438\u0442\u043e\u0432 EAP." },
        { icon: "\u{1F4B0}", title: "\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u043e\u0435 \u0444\u0438\u043d\u0430\u043d\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435", desc: "\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u044b \u0432\u0430\u0440\u0438\u0430\u043d\u0442\u044b \u0444\u0438\u043d\u0430\u043d\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f \u0434\u043b\u044f \u043f\u043e\u0434\u0445\u043e\u0434\u044f\u0449\u0438\u0445 \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u0439 \u0438 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432." },
      ],
      simTitle: "\u041f\u043e\u0447\u0435\u043c\u0443 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0435 \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u0441\u0438\u043c\u0443\u043b\u044f\u0446\u0438\u0438?",
      simDesc:
        "\u0423\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0438 \u0440\u0430\u0431\u043e\u0442\u0430\u044e\u0442 \u043a\u0430\u043a \u0430\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0438 \u0434\u0430\u043d\u043d\u044b\u0445 \u0432 UrbanStyle, \u0440\u0435\u0448\u0430\u044f \u0440\u0435\u0430\u043b\u0438\u0441\u0442\u0438\u0447\u043d\u044b\u0435 \u0431\u0438\u0437\u043d\u0435\u0441-\u0437\u0430\u0434\u0430\u0447\u0438 \u0441 \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u043c\u0438 \u0434\u0430\u043d\u043d\u044b\u043c\u0438. \u041d\u0430\u0432\u044b\u043a\u0438 \u043f\u0435\u0440\u0435\u043d\u043e\u0441\u044f\u0442\u0441\u044f \u043d\u0435\u043f\u043e\u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0435\u043d\u043d\u043e \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0443, \u043f\u043e\u0442\u043e\u043c\u0443 \u0447\u0442\u043e \u043a\u043e\u043d\u0442\u0435\u043a\u0441\u0442 \u0437\u0435\u0440\u043a\u0430\u043b\u0438\u0442 \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u0435 \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u0438.",
      ctaTitle: "\u041d\u0430\u043f\u0440\u0430\u0432\u044c\u0442\u0435 \u0441\u0432\u043e\u044e \u043a\u043e\u043c\u0430\u043d\u0434\u0443 \u0432 DACA",
      ctaDesc: "\u0421\u0432\u044f\u0436\u0438\u0442\u0435\u0441\u044c \u0441 \u043d\u0430\u043c\u0438 \u0434\u043b\u044f \u043e\u0431\u0441\u0443\u0436\u0434\u0435\u043d\u0438\u044f \u0433\u0440\u0443\u043f\u043f\u043e\u0432\u043e\u0433\u043e \u0443\u0447\u0430\u0441\u0442\u0438\u044f, \u0432\u0430\u0440\u0438\u0430\u043d\u0442\u043e\u0432 \u0444\u0438\u043d\u0430\u043d\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f \u0438 \u0438\u043d\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u0440\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u044f.",
      ctaButton: "\u0421\u0432\u044f\u0437\u0430\u0442\u044c\u0441\u044f",
      execCtaPrimary: "\u0417\u0430\u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c 15-\u043c\u0438\u043d. \u0437\u0432\u043e\u043d\u043e\u043a",
      execCtaSecondary: "\u0421\u043a\u0430\u0447\u0430\u0442\u044c Syllabus (PDF)",

      accordions: {
        roi: "\u0412\u043e\u0437\u0432\u0440\u0430\u0442 \u0438\u043d\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0439",
        quality: "\u041a\u0430\u0447\u0435\u0441\u0442\u0432\u043e \u0438 \u0430\u043a\u043a\u0440\u0435\u0434\u0438\u0442\u0430\u0446\u0438\u044f",
        schedule: "\u0420\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0438 \u0444\u043e\u0440\u043c\u0430\u0442",
        skills: "\u041a\u0430\u0440\u0442\u0430 \u043d\u0430\u0432\u044b\u043a\u043e\u0432",
        simulation: "\u041f\u043e\u0447\u0435\u043c\u0443 \u0441\u0438\u043c\u0443\u043b\u044f\u0446\u0438\u043e\u043d\u043d\u043e\u0435 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0435 \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442",
      },
      roiIntro:
        "\u0421\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0438 \u043f\u043e\u043b\u0443\u0447\u0430\u044e\u0442 \u043d\u0435\u043c\u0435\u0434\u043b\u0435\u043d\u043d\u043e \u043f\u0440\u0438\u043c\u0435\u043d\u0438\u043c\u044b\u0435 \u043d\u0430\u0432\u044b\u043a\u0438 \u0447\u0435\u0440\u0435\u0437 \u0441\u0438\u043c\u0443\u043b\u044f\u0446\u0438\u043e\u043d\u043d\u043e\u0435 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0435 \u0441 \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u043c\u0438 \u0431\u0438\u0437\u043d\u0435\u0441-\u0434\u0430\u043d\u043d\u044b\u043c\u0438.",
      roiPoints: [
        "200+ \u0447\u0430\u0441\u043e\u0432 \u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u043e\u0433\u043e \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u044f \u0437\u0430 11 \u043d\u0435\u0434\u0435\u043b\u044c",
        "10 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e-\u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432 \u0441 \u043e\u0449\u0443\u0442\u0438\u043c\u044b\u043c\u0438 \u0431\u0438\u0437\u043d\u0435\u0441-\u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u0430\u043c\u0438",
        "\u041d\u0430\u0432\u044b\u043a\u0438 SQL, Python, \u0432\u0438\u0437\u0443\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438 \u0438 AI",
        "\u0421\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0438 \u0440\u0430\u0431\u043e\u0442\u0430\u044e\u0442 \u0432 \u043a\u043e\u043c\u0430\u043d\u0434\u0430\u0445, \u043c\u043e\u0434\u0435\u043b\u0438\u0440\u0443\u044e\u0449\u0438\u0445 \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u0435 \u0430\u043d\u0430\u043b\u0438\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u043e\u0442\u0434\u0435\u043b\u044b",
        "\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u044b \u0432\u0430\u0440\u0438\u0430\u043d\u0442\u044b \u0444\u0438\u043d\u0430\u043d\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f \u0434\u043b\u044f \u043f\u043e\u0434\u0445\u043e\u0434\u044f\u0449\u0438\u0445 \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u0439",
      ],
      qualityAccordionP1:
        "\u041f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430 \u0438\u043c\u0435\u0435\u0442 \u0437\u043d\u0430\u043a \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0430 HAKA \u0438 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043a\u0430\u043d\u0434\u0438\u0434\u0430\u0442\u043e\u043c \u043d\u0430 \u043c\u0438\u043a\u0440\u043e\u043a\u0440\u0435\u0434\u0438\u0442 \u0441 13 \u043a\u0440\u0435\u0434\u0438\u0442\u0430\u043c\u0438 EAP.",
      qualityAccordionP2:
        "\u041e\u0446\u0435\u043d\u043a\u0430 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e-\u043e\u0440\u0438\u0435\u043d\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u0430\u044f (\u0417\u0430\u0447\u0451\u0442/\u041d\u0435\u0437\u0430\u0447\u0451\u0442), \u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f 70% \u043f\u043e\u0441\u0435\u0449\u0430\u0435\u043c\u043e\u0441\u0442\u044c \u0438 8\u201310 \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432 \u0441 \u0437\u0430\u0449\u0438\u0442\u043e\u0439 \u0444\u0438\u043d\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u043f\u0440\u043e\u0435\u043a\u0442\u0430.",
      scheduleIntro: "3 \u0436\u0438\u0432\u044b\u0445 \u0441\u0435\u0441\u0441\u0438\u0438 \u0432 \u043d\u0435\u0434\u0435\u043b\u044e (90 \u043c\u0438\u043d\u0443\u0442 \u043a\u0430\u0436\u0434\u0430\u044f), \u043f\u043b\u044e\u0441 \u0441\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430:",
      scheduleSessions: [
        { day: "\u0412\u0442\u043e\u0440\u043d\u0438\u043a", type: "\u041c\u0435\u043d\u0442\u043e\u0440-\u0441\u0435\u0441\u0441\u0438\u044f", desc: "\u041f\u0440\u0435\u043f\u043e\u0434\u0430\u0432\u0430\u043d\u0438\u0435 \u043f\u043e\u0434 \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0441\u0442\u0432\u043e\u043c \u044d\u043a\u0441\u043f\u0435\u0440\u0442\u0430" },
        { day: "\u0421\u0440\u0435\u0434\u0430", type: "\u0413\u0440\u0443\u043f\u043f\u043e\u0432\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430", desc: "\u0410\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u0430\u044f \u043a\u043e\u043c\u0430\u043d\u0434\u043d\u0430\u044f \u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0430" },
        { day: "\u0427\u0442/\u041f\u0442", type: "\u0414\u0435\u043c\u043e + \u0440\u0435\u0442\u0440\u043e", desc: "\u041f\u0440\u0435\u0437\u0435\u043d\u0442\u0430\u0446\u0438\u0438 \u0438 \u043e\u0431\u0440\u0430\u0442\u043d\u0430\u044f \u0441\u0432\u044f\u0437\u044c" },
      ],
      skillsMap: [
        { skill: "SQL \u0438 \u0437\u0430\u043f\u0440\u043e\u0441\u044b \u043a \u0431\u0430\u0437\u0430\u043c \u0434\u0430\u043d\u043d\u044b\u0445", weeks: "\u041d\u0435\u0434\u0435\u043b\u0438 1\u20134" },
        { skill: "\u0412\u0438\u0437\u0443\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u0441\u0442\u043e\u0440\u0438\u0442\u0435\u043b\u043b\u0438\u043d\u0433", weeks: "\u041d\u0435\u0434\u0435\u043b\u0438 5\u20136" },
        { skill: "Python \u0438 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044f", weeks: "\u041d\u0435\u0434\u0435\u043b\u0438 7\u20138" },
        { skill: "AI-\u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u0447\u0435\u0441\u0442\u0432\u043e", weeks: "\u041d\u0430 \u043f\u0440\u043e\u0442\u044f\u0436\u0435\u043d\u0438\u0438 \u0432\u0441\u0435\u0439 \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u044b" },
        { skill: "\u041f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e \u0438 \u043a\u0430\u0440\u044c\u0435\u0440\u043d\u0430\u044f \u0433\u043e\u0442\u043e\u0432\u043d\u043e\u0441\u0442\u044c", weeks: "\u041d\u0435\u0434\u0435\u043b\u0438 9\u201310" },
      ],
      simulationP1:
        "\u0423\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0438 \u0440\u0430\u0431\u043e\u0442\u0430\u044e\u0442 \u043a\u0430\u043a \u0430\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0438 \u0434\u0430\u043d\u043d\u044b\u0445 \u0432 UrbanStyle \u2014 \u0440\u0435\u0430\u043b\u0438\u0441\u0442\u0438\u0447\u043d\u043e\u043c \u044d\u0441\u0442\u043e\u043d\u0441\u043a\u043e\u043c \u043c\u043e\u0434\u043d\u043e\u043c \u0441\u0442\u0430\u0440\u0442\u0430\u043f\u0435 \u0441 \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u043c\u0438 \u0434\u0430\u043d\u043d\u044b\u043c\u0438, \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0430\u043c\u0438 \u0438 \u0431\u0438\u0437\u043d\u0435\u0441-\u0437\u0430\u0434\u0430\u0447\u0430\u043c\u0438.",
      simulationP2:
        "\u042d\u0442\u043e \u043e\u0437\u043d\u0430\u0447\u0430\u0435\u0442, \u0447\u0442\u043e \u043d\u0430\u0432\u044b\u043a\u0438 \u043f\u0435\u0440\u0435\u043d\u043e\u0441\u044f\u0442\u0441\u044f \u043d\u0435\u043f\u043e\u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0435\u043d\u043d\u043e \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0443. \u0421\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0438 \u043d\u0435 \u0438\u0437\u0443\u0447\u0430\u044e\u0442 \u0430\u0431\u0441\u0442\u0440\u0430\u043a\u0442\u043d\u0443\u044e \u0442\u0435\u043e\u0440\u0438\u044e \u2014 \u043e\u043d\u0438 \u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0443\u044e\u0442 \u0440\u0435\u0448\u0435\u043d\u0438\u0435 \u0437\u0430\u0434\u0430\u0447, \u0438\u0434\u0435\u043d\u0442\u0438\u0447\u043d\u044b\u0445 \u0437\u0430\u0434\u0430\u0447\u0430\u043c \u0432\u0430\u0448\u0435\u0439 \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u0438.",
    },

    methodology: {
      eyebrow: "\u041f\u0435\u0434\u0430\u0433\u043e\u0433\u0438\u043a\u0430",
      headline: "\u041c\u044b \u043d\u0435 \u043f\u0440\u043e\u0434\u0430\u0451\u043c \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e \u2014 \u043e\u043d\u0430 \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u0430 \u0432 \u0438\u043d\u0442\u0435\u0440\u043d\u0435\u0442\u0435. \u041c\u044b \u043f\u0440\u043e\u0434\u0430\u0451\u043c \u0442\u0440\u0430\u043d\u0441\u0444\u043e\u0440\u043c\u0438\u0440\u0443\u044e\u0449\u0438\u0439 \u043e\u043f\u044b\u0442.",
      stats: [
        { value: "4", label: "\u0411\u0430\u0437\u043e\u0432\u044b\u0445 \u043f\u0440\u0438\u043d\u0446\u0438\u043f\u0430" },
        { value: "11", label: "\u041d\u0435\u0434\u0435\u043b\u044c \u0441\u0438\u043c\u0443\u043b\u044f\u0446\u0438\u0438" },
        { value: "100%", label: "\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0438" },
      ],
      simTitle: "\u041e\u0431\u0443\u0447\u0435\u043d\u0438\u0435 \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u0441\u0438\u043c\u0443\u043b\u044f\u0446\u0438\u0438",
      simDesc:
        "\u041a\u0430\u0436\u0434\u043e\u0435 \u0443\u043f\u0440\u0430\u0436\u043d\u0435\u043d\u0438\u0435, \u043d\u0430\u0431\u043e\u0440 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436 \u043f\u0440\u0438\u043d\u0430\u0434\u043b\u0435\u0436\u0438\u0442 UrbanStyle \u2014 \u0441\u0438\u043c\u0443\u043b\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u043e\u043c\u0443 \u044d\u0441\u0442\u043e\u043d\u0441\u043a\u043e\u043c\u0443 \u043c\u043e\u0434\u043d\u043e\u043c\u0443 \u0441\u0442\u0430\u0440\u0442\u0430\u043f\u0443. \u0423\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0438 \u043d\u0435 \u0438\u0437\u0443\u0447\u0430\u044e\u0442 \u0430\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0443 \u0434\u0430\u043d\u043d\u044b\u0445; \u043e\u043d\u0438 \u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0443\u044e\u0442 \u0435\u0451 \u0432 \u0440\u0435\u0430\u043b\u0438\u0441\u0442\u0438\u0447\u043d\u043e\u043c \u043a\u043e\u043d\u0442\u0435\u043a\u0441\u0442\u0435, \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u044e\u0449\u0435\u043c \u043f\u0435\u0440\u0435\u043d\u043e\u0441\u0438\u043c\u044b\u0435 \u043d\u0430\u0432\u044b\u043a\u0438.",
      fourCompTitle: "\u0410\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0430 \u0447\u0435\u0442\u044b\u0440\u0451\u0445 \u043a\u043e\u043c\u043f\u043e\u043d\u0435\u043d\u0442\u043e\u0432",
      components: [
        { num: "1", name: "\u041c\u0435\u043d\u0442\u043e\u0440\u0441\u0442\u0432\u043e", color: "bg-slate-blue", desc: "\u0416\u0438\u0432\u044b\u0435 \u043c\u0435\u043d\u0442\u043e\u0440\u0441\u043a\u0438\u0435 \u0441\u0435\u0441\u0441\u0438\u0438 \u043f\u043e \u043c\u0435\u0442\u043e\u0434\u043e\u043b\u043e\u0433\u0438\u0438 4C. \u041f\u043e\u0434 \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0441\u0442\u0432\u043e\u043c \u044d\u043a\u0441\u043f\u0435\u0440\u0442\u043e\u0432, \u0438\u043d\u0442\u0435\u0440\u0430\u043a\u0442\u0438\u0432\u043d\u044b\u0435, \u043e\u0441\u043d\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u043d\u0430 \u0432\u044b\u0437\u043e\u0432\u0430\u0445.", required: true },
        { num: "2", name: "\u041f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e", color: "bg-sage", desc: "\u0415\u0414\u0418\u041d\u0421\u0422\u0412\u0415\u041d\u041d\u042b\u0419 \u043e\u0446\u0435\u043d\u0438\u0432\u0430\u0435\u043c\u044b\u0439 \u043a\u043e\u043c\u043f\u043e\u043d\u0435\u043d\u0442. 10 \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432, \u0444\u043e\u0440\u043c\u0438\u0440\u0443\u044e\u0449\u0438\u0445 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0435 GitHub \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e.", required: true },
        { num: "3", name: "\u0423\u0447\u0435\u0431\u043d\u0438\u043a\u0438", color: "bg-burnt-orange", desc: "\u0414\u0432\u0430 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0445 \u0443\u0447\u0435\u0431\u043d\u0438\u043a\u0430: \u2018Python for Data Analysis\u2019 (McKinney) \u0438 \u2018Storytelling with Data\u2019 (Knaflic).", required: true },
        { num: "4", name: "\u041a\u0430\u0442\u0430\u043b\u043e\u0433 e-\u043e\u0431\u0443\u0447\u0435\u043d\u0438\u044f", color: "bg-limestone", desc: "\u0414\u043e\u0431\u0440\u043e\u0432\u043e\u043b\u044c\u043d\u044b\u0435 \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u0440\u0435\u0441\u0443\u0440\u0441\u044b. \u041d\u0438\u043a\u043e\u0433\u0434\u0430 \u043d\u0435 \u043e\u0446\u0435\u043d\u0438\u0432\u0430\u044e\u0442\u0441\u044f, \u043d\u0438\u043a\u043e\u0433\u0434\u0430 \u043d\u0435 \u043d\u0430 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u0435.", required: false, voluntaryLabel: "\u0414\u043e\u0431\u0440\u043e\u0432\u043e\u043b\u044c\u043d\u043e" },
      ],
      diffTitle: "\u041a\u043b\u044e\u0447\u0435\u0432\u044b\u0435 \u043e\u0442\u043b\u0438\u0447\u0438\u044f",
      differentiators: [
        { icon: "\u{1F3AD}", title: "\u041d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u0441\u0438\u043c\u0443\u043b\u044f\u0446\u0438\u0438", desc: "\u041a\u0430\u0436\u0434\u043e\u0435 \u0443\u043f\u0440\u0430\u0436\u043d\u0435\u043d\u0438\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0435 UrbanStyle \u2014 \u0440\u0435\u0430\u043b\u0438\u0441\u0442\u0438\u0447\u043d\u043e, \u043f\u043e\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u0438 \u0443\u0432\u043b\u0435\u043a\u0430\u0442\u0435\u043b\u044c\u043d\u043e." },
        { icon: "\u{1F504}", title: "\u0421\u043f\u0438\u0440\u0430\u043b\u044c\u043d\u043e\u0435 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0435", desc: "\u041a\u0430\u0436\u0434\u0430\u044f \u0442\u0435\u043c\u0430 \u043f\u0435\u0440\u0435\u0441\u043c\u0430\u0442\u0440\u0438\u0432\u0430\u0435\u0442\u0441\u044f \u0441 \u0440\u0430\u0437\u043d\u044b\u0445 \u043f\u0435\u0440\u0441\u043f\u0435\u043a\u0442\u0438\u0432 \u0432 \u0440\u0430\u0437\u043d\u044b\u0445 \u0441\u0435\u0441\u0441\u0438\u044f\u0445." },
        { icon: "\u{1F4D6}", title: "\u041c\u0435\u0442\u043e\u0434 4C", desc: "Connect \u2192 Concept \u2192 Concrete \u2192 Conclusion \u0432 \u043a\u0430\u0436\u0434\u043e\u0439 \u0443\u0447\u0435\u0431\u043d\u043e\u0439 \u0435\u0434\u0438\u043d\u0438\u0446\u0435." },
        { icon: "\u{1F94B}", title: "Shu-Ha-Ri", desc: "\u041f\u0440\u043e\u0433\u0440\u0435\u0441\u0441\u0438\u044f \u043e\u0442 \u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f \u043a \u0430\u0434\u0430\u043f\u0442\u0430\u0446\u0438\u0438 \u043a \u0438\u043d\u043d\u043e\u0432\u0430\u0446\u0438\u0438 \u0437\u0430 11 \u043d\u0435\u0434\u0435\u043b\u044c." },
        { icon: "\u{1F4BC}", title: "\u041f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e \u0432 \u043f\u0435\u0440\u0432\u0443\u044e \u043e\u0447\u0435\u0440\u0435\u0434\u044c", desc: "\u041e\u0446\u0435\u043d\u043a\u0430 100% \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e. \u0417\u0430\u0447\u0451\u0442/\u041d\u0435\u0437\u0430\u0447\u0451\u0442. \u0411\u0435\u0437 \u044d\u043a\u0437\u0430\u043c\u0435\u043d\u043e\u0432." },
        { icon: "\u{1F916}", title: "AI \u043a\u0430\u043a 6-\u044f \u043a\u043e\u043c\u043f\u0435\u0442\u0435\u043d\u0446\u0438\u044f", desc: "AI-\u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043f\u0440\u0435\u043f\u043e\u0434\u0430\u0451\u0442\u0441\u044f \u043a\u0430\u043a \u043d\u0430\u0432\u044b\u043a, \u0430 \u043d\u0435 \u043f\u0440\u043e\u0441\u0442\u043e \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442." },
      ],
      rhythmTitle: "\u041d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0439 \u0440\u0438\u0442\u043c: \u0441\u043f\u0438\u0440\u0430\u043b\u044c\u043d\u043e\u0435 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0435",
      rhythmDesc:
        "\u041a\u0430\u0436\u0434\u043e\u0435 \u0437\u0430\u043d\u044f\u0442\u0438\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u0435\u0442 \u043d\u043e\u0432\u0443\u044e \u043f\u0435\u0440\u0441\u043f\u0435\u043a\u0442\u0438\u0432\u0443 \u043a \u0442\u043e\u0439 \u0436\u0435 \u0442\u0435\u043c\u0435. \u041a \u043a\u043e\u043d\u0446\u0443 \u043d\u0435\u0434\u0435\u043b\u0438 \u043a\u043e\u043d\u0446\u0435\u043f\u0446\u0438\u044f \u0438\u0437\u0443\u0447\u0435\u043d\u0430 \u0441 \u043f\u043e\u0437\u0438\u0446\u0438\u0439 \u0441\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0439 \u0440\u0430\u0431\u043e\u0442\u044b, \u043c\u0435\u043d\u0442\u043e\u0440\u0441\u0442\u0432\u0430, \u043a\u043e\u043c\u0430\u043d\u0434\u043d\u043e\u0439 \u0440\u0430\u0431\u043e\u0442\u044b \u0438 \u0434\u0435\u043c\u043e\u043d\u0441\u0442\u0440\u0430\u0446\u0438\u0438.",
      rhythmSteps: [
        { step: "01", title: "\u0421\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430", subtitle: "\u041f\u0435\u0440\u0441\u043f\u0435\u043a\u0442\u0438\u0432\u0430 A", desc: "\u0421\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u0438\u0437\u0443\u0447\u0435\u043d\u0438\u0435 \u0441 \u0446\u0438\u043a\u043b\u0430\u043c\u0438 4C" },
        { step: "02", title: "\u041c\u0435\u043d\u0442\u043e\u0440-\u0441\u0435\u0441\u0441\u0438\u044f", subtitle: "\u041f\u0435\u0440\u0441\u043f\u0435\u043a\u0442\u0438\u0432\u0430 B", desc: "\u042d\u043a\u0441\u043f\u0435\u0440\u0442 \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u0435\u0442 \u043d\u043e\u0432\u044b\u0439 \u0440\u0430\u043a\u0443\u0440\u0441, \u0436\u0438\u0432\u043e\u0435 \u043f\u0440\u0435\u043f\u043e\u0434\u0430\u0432\u0430\u043d\u0438\u0435" },
        { step: "03", title: "\u0413\u0440\u0443\u043f\u043f\u043e\u0432\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430", subtitle: "\u0421\u0438\u043d\u0442\u0435\u0437 A + B", desc: "\u041a\u043e\u043c\u0430\u043d\u0434\u0430 \u043f\u0440\u0438\u043c\u0435\u043d\u044f\u0435\u0442 \u043e\u0431\u0435 \u043f\u0435\u0440\u0441\u043f\u0435\u043a\u0442\u0438\u0432\u044b" },
        { step: "04", title: "\u0414\u0435\u043c\u043e + \u0440\u0435\u0442\u0440\u043e", subtitle: "\u0420\u0435\u0444\u043b\u0435\u043a\u0441\u0438\u044f", desc: "\u041f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u044c, \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u043e\u0431\u0440\u0430\u0442\u043d\u0443\u044e \u0441\u0432\u044f\u0437\u044c, \u0443\u043b\u0443\u0447\u0448\u0438\u0442\u044c" },
      ],
      contactTitle: "\u0412\u043e\u043f\u0440\u043e\u0441\u044b \u043e \u043d\u0430\u0448\u0435\u043c \u043f\u043e\u0434\u0445\u043e\u0434\u0435?",
      contactDesc: "\u0421\u0432\u044f\u0436\u0438\u0442\u0435\u0441\u044c \u0441 \u043f\u0440\u043e\u0434\u044e\u0441\u0435\u0440\u043e\u043c \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u044b \u0410\u043b\u0435\u043a\u043e\u043c \u041a\u043e\u0437\u043b\u043e\u0432\u044b\u043c \u0434\u043b\u044f \u043f\u043e\u0434\u0440\u043e\u0431\u043d\u043e\u0439 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438.",

      accordions: {
        fourC: "\u041c\u0435\u0442\u043e\u0434 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u044f 4C",
        groupWork: "\u0413\u0440\u0443\u043f\u043f\u043e\u0432\u043e\u0439 \u043f\u0430\u0442\u0442\u0435\u0440\u043d JAGA-TEE-KOGU-ESITLE",
        shuHaRi: "\u041f\u0440\u043e\u0433\u0440\u0435\u0441\u0441\u0438\u044f Shu-Ha-Ri",
        aiCompetency: "AI \u043a\u0430\u043a 6-\u044f \u043a\u043e\u043c\u043f\u0435\u0442\u0435\u043d\u0446\u0438\u044f",
        portfolio: "\u041e\u0446\u0435\u043d\u043a\u0430 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e",
        careerChanger: "\u0414\u0438\u0437\u0430\u0439\u043d \u0434\u043b\u044f \u0441\u043c\u0435\u043d\u044b \u043a\u0430\u0440\u044c\u0435\u0440\u044b",
        curriculum: "\u0421\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430 \u0443\u0447\u0435\u0431\u043d\u043e\u0439 \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u044b",
        techStack: "\u0422\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0441\u0442\u0435\u043a",
      },
      fourCIntro: "\u041a\u0430\u0436\u0434\u0430\u044f \u0443\u0447\u0435\u0431\u043d\u0430\u044f \u0435\u0434\u0438\u043d\u0438\u0446\u0430 \u0441\u043b\u0435\u0434\u0443\u0435\u0442 \u0446\u0438\u043a\u043b\u0443 4C:",
      fourCSteps: [
        { c: "Connect", desc: "\u0410\u043a\u0442\u0438\u0432\u0430\u0446\u0438\u044f \u043f\u0440\u0435\u0436\u043d\u0438\u0445 \u0437\u043d\u0430\u043d\u0438\u0439, \u0441\u0432\u044f\u0437\u044c \u0441 \u0447\u0435\u043c-\u0442\u043e \u0437\u043d\u0430\u043a\u043e\u043c\u044b\u043c" },
        { c: "Concept", desc: "\u0412\u0432\u0435\u0434\u0435\u043d\u0438\u0435 \u043d\u043e\u0432\u043e\u0433\u043e \u043a\u043e\u043d\u0446\u0435\u043f\u0442\u0430 \u0441 \u044f\u0441\u043d\u044b\u043c \u043e\u0431\u044a\u044f\u0441\u043d\u0435\u043d\u0438\u0435\u043c" },
        { c: "Concrete", desc: "\u041d\u0435\u043c\u0435\u0434\u043b\u0435\u043d\u043d\u043e\u0435 \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d\u0438\u0435 \u0441 \u043f\u0440\u0430\u043a\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u043c\u0438 \u0443\u043f\u0440\u0430\u0436\u043d\u0435\u043d\u0438\u044f\u043c\u0438" },
        { c: "Conclusion", desc: "\u0420\u0435\u0444\u043b\u0435\u043a\u0441\u0438\u044f, \u043f\u043e\u0434\u0432\u0435\u0434\u0435\u043d\u0438\u0435 \u0438\u0442\u043e\u0433\u043e\u0432 \u0438 \u043c\u043e\u0441\u0442 \u043a \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0435\u0439 \u0442\u0435\u043c\u0435" },
      ],
      fourCHierarchical:
        "\u0420\u0430\u0431\u043e\u0447\u0438\u0435 \u0442\u0435\u0442\u0440\u0430\u0434\u0438 \u0434\u043b\u044f \u0441\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0439 \u0440\u0430\u0431\u043e\u0442\u044b \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u044e\u0442 \u0438\u0435\u0440\u0430\u0440\u0445\u0438\u0447\u0435\u0441\u043a\u0438\u0439 4C: \u043a\u0430\u0436\u0434\u044b\u0439 \u043f\u043e\u0434\u043a\u043e\u043d\u0446\u0435\u043f\u0442 \u043f\u043e\u043b\u0443\u0447\u0430\u0435\u0442 \u0441\u0432\u043e\u0439 \u043f\u043e\u043b\u043d\u044b\u0439 \u0446\u0438\u043a\u043b 4C, \u0437\u0430 \u043a\u043e\u0442\u043e\u0440\u044b\u043c \u0441\u043b\u0435\u0434\u0443\u0435\u0442 \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0442\u0438\u0432\u043d\u044b\u0439 \u0441\u0438\u043d\u0442\u0435\u0437.",
      groupWorkIntro: "\u0412\u0441\u0435 \u0433\u0440\u0443\u043f\u043f\u043e\u0432\u044b\u0435 \u0440\u0430\u0431\u043e\u0442\u044b \u0421\u0435\u0441\u0441\u0438\u0438 2 \u0441\u043b\u0435\u0434\u0443\u044e\u0442 \u0443\u043d\u0438\u0432\u0435\u0440\u0441\u0430\u043b\u044c\u043d\u043e\u043c\u0443 90-\u043c\u0438\u043d\u0443\u0442\u043d\u043e\u043c\u0443 \u043f\u0430\u0442\u0442\u0435\u0440\u043d\u0443:",
      groupWorkSteps: [
        { step: "JAGA (\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f)", desc: "\u041a\u043e\u043c\u0430\u043d\u0434\u0430 \u043e\u0431\u0441\u0443\u0436\u0434\u0430\u0435\u0442, \u0447\u0442\u043e \u0443\u0437\u043d\u0430\u043b\u0438 \u0438\u043d\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043b\u044c\u043d\u043e, \u0434\u0435\u043b\u0438\u0442\u0441\u044f \u0437\u043d\u0430\u043d\u0438\u044f\u043c\u0438" },
        { step: "TEE (\u0414\u0435\u043b\u0430\u0442\u044c)", desc: "\u0421\u043e\u0432\u043c\u0435\u0441\u0442\u043d\u0430\u044f \u043f\u0440\u0430\u043a\u0442\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430 \u043d\u0430\u0434 \u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u043c \u0432\u044b\u0437\u043e\u0432\u043e\u043c" },
        { step: "KOGU (\u0421\u043e\u0431\u0440\u0430\u0442\u044c)", desc: "\u041a\u043e\u043c\u043f\u0438\u043b\u044f\u0446\u0438\u044f \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u043e\u0432, \u043f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0430 \u0432\u044b\u0445\u043e\u0434\u043d\u044b\u0445 \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u043e\u0432" },
        { step: "ESITLE (\u041f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u044c)", desc: "\u0414\u0435\u043c\u043e\u043d\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u043e\u0432 \u0433\u0440\u0443\u043f\u043f\u0435, \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u0435 \u043e\u0431\u0440\u0430\u0442\u043d\u043e\u0439 \u0441\u0432\u044f\u0437\u0438" },
      ],
      shuHaRiIntro:
        "\u0417\u0430\u0438\u043c\u0441\u0442\u0432\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0438\u0437 \u0431\u043e\u0435\u0432\u044b\u0445 \u0438\u0441\u043a\u0443\u0441\u0441\u0442\u0432 \u0444\u0440\u0435\u0439\u043c\u0432\u043e\u0440\u043a, \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u044e\u0449\u0438\u0439 \u0440\u043e\u0441\u0442\u043e\u043c \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u0438\u0438 \u0432 \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0435:",
      shuHaRiPhases: [
        { phase: "Shu (\u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c)", weeks: "\u041d\u0435\u0434\u0435\u043b\u0438 0\u20133", desc: "\u0421\u043b\u0435\u0434\u0443\u0439\u0442\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043a\u0446\u0438\u044f\u043c \u0442\u043e\u0447\u043d\u043e. \u0410\u043a\u0446\u0435\u043d\u0442 \u043d\u0430 \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e\u0439 \u0442\u0435\u0445\u043d\u0438\u043a\u0435." },
        { phase: "Ha (\u0410\u0434\u0430\u043f\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c)", weeks: "\u041d\u0435\u0434\u0435\u043b\u0438 4\u20137", desc: "\u041d\u0430\u0447\u043d\u0438\u0442\u0435 \u043f\u043e\u043d\u0438\u043c\u0430\u0442\u044c \u041f\u041e\u0427\u0415\u041c\u0423. \u041c\u043e\u0434\u0438\u0444\u0438\u0446\u0438\u0440\u0443\u0439\u0442\u0435 \u043f\u043e\u0434\u0445\u043e\u0434\u044b \u043f\u043e\u0434 \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0441\u0442\u0432\u043e\u043c." },
        { phase: "Ri (\u0418\u043d\u043d\u043e\u0432\u0438\u0440\u043e\u0432\u0430\u0442\u044c)", weeks: "\u041d\u0435\u0434\u0435\u043b\u0438 8\u201310", desc: "\u0421\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u0441\u0432\u043e\u0439 \u043f\u043e\u0434\u0445\u043e\u0434. \u0417\u0430\u0449\u0438\u0442\u0438\u0442\u0435 \u0440\u0435\u0448\u0435\u043d\u0438\u044f \u0432 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e." },
      ],
      aiCompIntro:
        "AI-\u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u2014 \u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u043d\u0430\u0432\u044b\u043a, \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u0435\u043c\u044b\u0439 \u043d\u0430 \u043f\u0440\u043e\u0442\u044f\u0436\u0435\u043d\u0438\u0438 \u0432\u0441\u0435\u0439 \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u044b. \u0421\u043b\u0435\u0434\u0443\u0435\u0442 \u043a\u0440\u0438\u0432\u043e\u0439 Shu-Ha-Ri:",
      aiCompFootnote:
        "\u041d\u0430\u0447\u0438\u043d\u0430\u044f \u0441 4-\u0439 \u043d\u0435\u0434\u0435\u043b\u0438, \u043a\u0430\u0436\u0434\u044b\u0439 README \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e \u0432\u043a\u043b\u044e\u0447\u0430\u0435\u0442 \u0440\u0430\u0437\u0434\u0435\u043b \u00ab\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u0435 AI\u00bb (1\u20132 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f).",
      portfolioIntro: "\u041e\u0446\u0435\u043d\u043a\u0430 100% \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e (\u0417\u0430\u0447\u0451\u0442/\u041d\u0435\u0437\u0430\u0447\u0451\u0442):",
      portfolioPoints: [
        "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f 70% \u043f\u043e\u0441\u0435\u0449\u0430\u0435\u043c\u043e\u0441\u0442\u044c",
        "8\u201310 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e-\u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432 \u0441\u0434\u0430\u043d\u044b",
        "\u0424\u0438\u043d\u0430\u043b\u044c\u043d\u044b\u0439 \u043f\u0440\u043e\u0435\u043a\u0442 \u0437\u0430\u0449\u0438\u0449\u0451\u043d \u043f\u0435\u0440\u0435\u0434 \u043a\u043e\u043b\u043b\u0435\u0433\u0430\u043c\u0438 \u0438 \u043c\u0435\u043d\u0442\u043e\u0440\u0430\u043c\u0438",
        "\u0411\u0430\u0437\u043e\u0432\u044b\u0439 \u0443\u0440\u043e\u0432\u0435\u043d\u044c (70%): \u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0434\u043b\u044f \u0437\u0430\u0447\u0451\u0442\u0430",
        "\u041f\u0440\u043e\u0434\u0432\u0438\u043d\u0443\u0442\u044b\u0439 \u0443\u0440\u043e\u0432\u0435\u043d\u044c (30%): \u043e\u043f\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0439 \u0433\u043b\u0443\u0431\u043e\u043a\u0438\u0439 \u0430\u043d\u0430\u043b\u0438\u0437 \u0434\u043b\u044f \u0431\u044b\u0441\u0442\u0440\u044b\u0445 \u0443\u0447\u0435\u043d\u0438\u043a\u043e\u0432",
        "\u041d\u0438\u043a\u0430\u043a\u0438\u0445 \u0442\u0440\u0430\u0434\u0438\u0446\u0438\u043e\u043d\u043d\u044b\u0445 \u044d\u043a\u0437\u0430\u043c\u0435\u043d\u043e\u0432, \u043d\u0438\u043a\u0430\u043a\u0438\u0445 \u043e\u0446\u0435\u043d\u043e\u043a \u2014 \u0442\u043e\u043b\u044c\u043a\u043e \u0417\u0430\u0447\u0451\u0442 \u0438\u043b\u0438 \u041d\u0435\u0437\u0430\u0447\u0451\u0442",
      ],
      careerDesignIntro:
        "\u041f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430 \u0441\u043f\u0435\u0446\u0438\u0430\u043b\u044c\u043d\u043e \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0430\u043d\u0430 \u0434\u043b\u044f \u0442\u0435\u0445, \u043a\u0442\u043e \u043c\u0435\u043d\u044f\u0435\u0442 \u043a\u0430\u0440\u044c\u0435\u0440\u0443. \u041a\u0430\u0436\u0434\u044b\u0439 \u044d\u043b\u0435\u043c\u0435\u043d\u0442 \u043f\u043e\u0434\u0447\u0451\u0440\u043a\u0438\u0432\u0430\u0435\u0442, \u0447\u0442\u043e \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0439 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0439 \u043e\u043f\u044b\u0442 \u2014 \u043f\u0440\u0435\u0438\u043c\u0443\u0449\u0435\u0441\u0442\u0432\u043e:",
      careerDesignPoints: [
        "\u041d\u0435\u0434\u0435\u043b\u044f 0: \u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430 \u0440\u044b\u043d\u043a\u0430 DA \u042d\u0441\u0442\u043e\u043d\u0438\u0438 (56+ \u043f\u043e\u0437\u0438\u0446\u0438\u0439, \u0440\u0430\u0441\u0442\u0443\u0449\u0438\u0439 \u0441\u043f\u0440\u043e\u0441)",
        "\u041d\u0435\u0434\u0435\u043b\u0438 1\u20138: \u0420\u043e\u0442\u0430\u0446\u0438\u044f \u0440\u043e\u043b\u0435\u0439 \u0432 UrbanStyle \u0446\u0435\u043d\u0438\u0442 \u0440\u0430\u0437\u043d\u043e\u043e\u0431\u0440\u0430\u0437\u0438\u0435 \u0442\u043e\u0447\u0435\u043a \u0437\u0440\u0435\u043d\u0438\u044f",
        "\u041d\u0435\u0434\u0435\u043b\u044f 9: \u2018\u0410\u0433\u0430-\u043c\u043e\u043c\u0435\u043d\u0442\u2019 \u2014 \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0441\u0442\u0432\u043e \u043f\u043e \u043d\u0430\u0439\u043c\u0443 \u043e\u043f\u0438\u0441\u044b\u0432\u0430\u0435\u0442 \u0412\u0410\u0421",
        "\u041d\u0435\u0434\u0435\u043b\u044f 10: \u0417\u0430\u0441\u0435\u0434\u0430\u043d\u0438\u0435 \u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f UrbanStyle \u043a\u0430\u043a \u0446\u0435\u0440\u0435\u043c\u043e\u043d\u0438\u044f \u0432\u044b\u043f\u0443\u0441\u043a\u0430",
      ],
      curriculumIntro: "6 \u0441\u043f\u0440\u0438\u043d\u0442\u043e\u0432 \u0437\u0430 11 \u043d\u0435\u0434\u0435\u043b\u044c:",
      curriculumSprints: [
        { sprint: "Sprint 0", weeks: "\u041d\u0435\u0434\u0435\u043b\u044f 0", focus: "\u041e\u043d\u0431\u043e\u0440\u0434\u0438\u043d\u0433" },
        { sprint: "Sprint 1", weeks: "\u041d\u0435\u0434\u0435\u043b\u0438 1\u20132", focus: "\u041e\u0441\u043d\u043e\u0432\u044b SQL" },
        { sprint: "Sprint 2", weeks: "\u041d\u0435\u0434\u0435\u043b\u0438 3\u20134", focus: "\u041f\u0440\u043e\u0434\u0432\u0438\u043d\u0443\u0442\u044b\u0439 SQL" },
        { sprint: "Sprint 3", weeks: "\u041d\u0435\u0434\u0435\u043b\u0438 5\u20136", focus: "\u0412\u0438\u0437\u0443\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f" },
        { sprint: "Sprint 4", weeks: "\u041d\u0435\u0434\u0435\u043b\u0438 7\u20138", focus: "\u0410\u043d\u0430\u043b\u0438\u0437 Python" },
        { sprint: "Sprint 5", weeks: "\u041d\u0435\u0434\u0435\u043b\u0438 9\u201310", focus: "\u041f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e \u0438 \u043a\u0430\u0440\u044c\u0435\u0440\u0430" },
      ],
      curriculumFootnote:
        "\u0423\u0447\u0435\u0431\u043d\u0443\u044e \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0443 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044e\u0442 \u0434\u0432\u0430 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0445 \u0443\u0447\u0435\u0431\u043d\u0438\u043a\u0430: \u201cPython for Data Analysis\u201d (McKinney) \u0438 \u201cStorytelling with Data\u201d (Knaflic).",
    },
  },

  // =========================================================================
  // LATVIAN
  // =========================================================================
  lv: {
    tabs: {
      learners: "Dal\u012bbniekiem",
      employers: "Darba dev\u0113jiem",
      methodology: "Metodolo\u0123ija",
    },
    zoom: { show: "R\u0101d\u012bt visas deta\u013cas", hide: "Sl\u0113pt deta\u013cas" },
    sharedCta: {
      bookCallTitle: "15 min Google Meet ar Aleku Kozlovu",
      bookCallDesc: "Tik\u0161an\u0101s ar producentu un sadarb\u012bbas idejas.",
      bookCallBtn: "Rezerv\u0113t tik\u0161anos (Calendly)",
      contactInfo: "Aleks Kozlovs \u00b7 ak@ettevotluskeskus.ee \u00b7 +372 502 1033",
    },

    learners: {
      eyebrow: "DACA Programma",
      headline: "No nulles l\u012bdz darba tirgum gatavam datu anal\u012bti\u0137im 11\u00a0ned\u0113\u013c\u0101s",
      subtitle:
        "Simul\u0101cijas intens\u012bv\u0101 programma, kas sniedz profesion\u0101lu portfeli, re\u0101las prasmes un karjeras p\u0101rliec\u012bbu.",
      stats: [
        { value: "11", label: "Ned\u0113\u013cas" },
        { value: "200+", label: "Stundas" },
        { value: "13", label: "EAP kred\u012bti" },
        { value: "66", label: "Kontaktstundas" },
        { value: "3", label: "Sesijas / ned\u0113\u013c\u0101" },
        { value: "10", label: "Portfe\u013ca projekti" },
      ],
      whatYouGetTitle: "Ko j\u016bs ieg\u016bstat",
      whatYouGetDesc:
        "Profesion\u0101lu GitHub portfeli ar 10 datu anal\u012btikas projektiem, ko darba dev\u0113ji var nov\u0113rt\u0113t. Ne sertifik\u0101ti uz sienas \u2014 str\u0101d\u0101jo\u0161i artefakti, kas pier\u0101da j\u016bsu prasmes.",
      teamTitle: "J\u016bs neesat students \u2014 j\u016bs esat komandas biedrs",
      teamDesc:
        "No pirm\u0101s dienas j\u016bs str\u0101d\u0101jat k\u0101 datu anal\u012bti\u0137is UrbanStyle \u2014 simul\u0113t\u0101 Igaunijas modes jaun\u0101uz\u0146\u0113mum\u0101. Re\u0101li dati, re\u0101las biznesa probl\u0113mas, re\u0101li varo\u0146i, kas dod uzdevumus un atgriezenisko saiti.",
      values: [
        { icon: "\u{1F4CA}", title: "SQL \u2192 Python", desc: "No datu b\u0101zu vaic\u0101jumiem l\u012bdz anal\u012bzes automatiz\u0101cijai ar pandas un API." },
        { icon: "\u{1F916}", title: "AI prasmes", desc: "Iem\u0101cieties sadarboties ar AI r\u012bkiem k\u0101 profesion\u0101lu kompetenci." },
        { icon: "\u{1F91D}", title: "Komandas darbs", desc: "Str\u0101d\u0101jiet past\u0101v\u012bg\u0101s komand\u0101s, kas simul\u0113 re\u0101lu anal\u012btikas noda\u013cu." },
        { icon: "\u{1F680}", title: "Gatavs karjerai", desc: "Absolv\u0113jiet ar profesion\u0101lu GitHub portfeli un karjeras materi\u0101liem." },
      ],
      assessmentTitle: "Nov\u0113rt\u0113\u0161ana: tikai portfelis",
      assessmentDesc:
        "Nek\u0101du tradicion\u0101lu eks\u0101menu. Ieskat\u012bts/Neieskat\u012bts, pamatojoties uz portfeli: 70% apmekl\u0113jums, 8\u201310 projekti iesniegti, gala projekts aizst\u0101v\u0113ts.",
      badges: ["13 EAP kred\u012bti", "HAKA kvalit\u0101tes z\u012bme", "Mikrokred\u012bta kandid\u0101ts"],
      ctaEyebrow: "Pieteik\u0161an\u0101s atv\u0113rta",
      ctaHeadline: "Pirm\u0101 grupa s\u0101k 2026.\u00a0gada 23.\u00a0mart\u0101",
      ctaButton: "Pieteikties",

      accordions: {
        weekMap: "11 ned\u0113\u013cu t\u0113mu karte",
        weeklyFlow: "Ned\u0113\u013cas ritms (spir\u0101lveida m\u0101c\u012b\u0161an\u0101s)",
        aiSkills: "AI prasmju progresija",
        techStack: "Tehnolo\u0123iju steks",
        careerChanger: "Atbalsts karjeras mai\u0146ai",
      },
      weekMapItems: [
        { week: "0", topic: "Ievads un iestat\u012b\u0161ana" },
        { week: "1", topic: "SQL pamati (SELECT, WHERE, ORDER BY)" },
        { week: "2", topic: "SQL datu t\u012br\u012b\u0161ana (NULL, dublik\u0101ti)" },
        { week: "3", topic: "SQL JOIN-i (INNER, LEFT, RIGHT)" },
        { week: "4", topic: "SQL agreg\u0101cija (GROUP BY, HAVING, CTE)" },
        { week: "5", topic: "Vizualiz\u0101cijas dizains (Power BI / Plotly)" },
        { week: "6", topic: "Inform\u0101cijas pane\u013cu izveide un datu st\u0101st\u012bjums" },
        { week: "7", topic: "Python pandas un numpy" },
        { week: "8", topic: "Python API un automatiz\u0101cija (Supabase)" },
        { week: "9", topic: "Karjeras sagatavo\u0161ana (CV, LinkedIn, intervija)" },
        { week: "10", topic: "Portfe\u013ca aizst\u0101v\u0113\u0161ana un izlaidums" },
      ],
      weeklyFlowIntro:
        "Katra ned\u0113\u013ca seko spir\u0101lveida modelim, kur viena t\u0113ma tiek izp\u0113t\u012bta no da\u017e\u0101d\u0101m perspekt\u012bv\u0101m:",
      weeklyFlowSteps: [
        { label: "Patst\u0101v\u012bgais darbs (Perspekt\u012bva A)", desc: "Neatkar\u012bga izp\u0113te ar hierarhiskiem 4C cikliem" },
        { label: "Sesija 1: Mentors (Perspekt\u012bva B)", desc: "Tie\u0161saistes m\u0101c\u012b\u0161ana pievieno jaunu skat\u012bjumu, 4C metodolo\u0123ija" },
        { label: "Sesija 2: Grupas darbs (A+B)", desc: "Komandas sint\u0113z\u0113 abas perspekt\u012bvas praks\u0113" },
        { label: "Sesija 3: Demo + retro", desc: "Rezult\u0101tu prezent\u0101cija, atgriezenisk\u0101 saite, retrospekt\u012bva" },
      ],
      aiIntro:
        "AI sadarb\u012bba tiek uzskat\u012bta par 6. galveno kompetenci, kas tiek att\u012bst\u012bta progres\u012bvi p\u0113c Shu-Ha-Ri ietvara:",
      aiProgression: [
        { stage: "W0\u20131", level: "Iepaz\u012b\u0161an\u0101s", desc: "NotebookLM, jaut\u0101jumu uzdo\u0161ana AI" },
        { stage: "W2\u20133", level: "Pal\u012bgs", desc: "Atk\u013c\u016bdo\u0161ana, AI rezult\u0101tu p\u0101rbaude" },
        { stage: "W4\u20135", level: "L\u012bdzpilots", desc: "Koda \u0123ener\u0113\u0161ana, kritiska nov\u0113rt\u0113\u0161ana" },
        { stage: "W6\u20137", level: "Vad\u012bt\u0101js", desc: "Dele\u0123\u0113\u0161ana, prompt engineering" },
        { stage: "W8\u20139", level: "Komandas pastiprin\u0101t\u0101js", desc: "AI grupas darb\u0101" },
        { stage: "W10", level: "Demonstr\u0113t\u0101js", desc: "AI izmanto\u0161anas demonstr\u0113\u0161ana portfel\u012b" },
      ],
      careerIntro:
        "DACA ir veidota karjeras main\u012bt\u0101jiem. J\u016bsu eso\u0161\u0101 profesion\u0101l\u0101 pieredze ir priek\u0161roc\u012bba, nevis ierobe\u017eojums.",
      careerPoints: [
        "Igaunijas DA tirg\u016b ir 56+ atv\u0113rtas poz\u012bcijas un tas aug",
        "UrbanStyle simul\u0101cija nov\u0113rt\u0113 da\u017e\u0101das perspekt\u012bvas",
        "9. ned\u0113\u013c\u0101 ir \u2018aha moments\u2019 \u2014 darb\u0101 pie\u0146em\u0161anas vadl\u012bnijas apraksta J\u016aS",
        "Karjeras materi\u0101li: CV veidne, LinkedIn optimiz\u0101cija, intervijas sagatavo\u0161ana",
        "Uz portfeli balst\u012bta nov\u0113rt\u0113\u0161ana noz\u012bm\u0113 nek\u0101dus tradicion\u0101lus eks\u0101menus",
      ],
    },

    employers: {
      eyebrow: "Organiz\u0101cij\u0101m",
      headline: "Paaugstiniet savas komandas datu anal\u012btikas prasmes \u2014 netrauc\u0113jot darb\u012bbu",
      subtitle:
        "Akredit\u0113ta, uz simul\u0101ciju balst\u012bta programma, kas p\u0101rv\u0113r\u0161 j\u016bsu darbiniekus par p\u0101rliecin\u0101tiem datu anal\u012bti\u0137iem. Pieejama Baltijas re\u0123iona dal\u012bbniekiem.",
      stats: [
        { value: "15", label: "Pabeigtas grupas" },
        { value: "13", label: "EAP kred\u012bti" },
        { value: "66", label: "Kontaktstundas" },
      ],
      qualityBadges: ["HAKA kvalit\u0101tes z\u012bme", "Mikrokred\u012bta kandid\u0101ts", "13 EAP kred\u012bti"],
      qualityTitle: "Akredit\u0113ta un ar kvalit\u0101tes garantiju",
      qualityDesc:
        "DACA ir sa\u0146\u0113musi HAKA kvalit\u0101tes z\u012bmi un ir mikrokred\u012bta kandid\u0101te. J\u016bsu darbinieki sa\u0146em kvalifik\u0101ciju ar re\u0101lu akad\u0113misku svaru \u2014 13 EAP kred\u012bti, 66 kontaktstundas.",
      learnTitle: "Ko iem\u0101c\u012bsies j\u016bsu darbinieki",
      learnItems: [
        { label: "SQL un datu b\u0101zes", desc: "Vaic\u0101jumi, t\u012br\u012b\u0161ana un rel\u0101ciju datu anal\u012bze" },
        { label: "Datu vizualiz\u0101cija", desc: "Power BI, Plotly un datu st\u0101st\u012bjums" },
        { label: "Python un pandas", desc: "Anal\u012bzes automatiz\u0101cija un darbs ar API" },
        { label: "AI sadarb\u012bba", desc: "AI r\u012bku izmanto\u0161ana k\u0101 profesion\u0101la prasme" },
        { label: "Datu st\u0101st\u012bjums", desc: "L\u0113mumu vir\u0161o\u0161u ieskatu prezent\u0113\u0161ana" },
        { label: "Portfe\u013ca veido\u0161ana", desc: "GitHub balst\u012bts profesion\u0101ls portfelis" },
      ],
      values: [
        { icon: "\u{1F3AF}", title: "Atbilsto\u0161s darbam", desc: "M\u0101c\u012bbu programma veidota ap re\u0101liem biznesa scen\u0101rijiem \u2014 prasmes p\u0101rnesamas uzreiz." },
        { icon: "\u23F0", title: "Minim\u0101li trauc\u0113jumi", desc: "3 sesijas ned\u0113\u013c\u0101, patst\u0101v\u012bg\u0101 un tie\u0161saistes darba kombin\u0101cija." },
        { icon: "\u2705", title: "Kvalit\u0101te garant\u0113ta", desc: "HAKA kvalit\u0101tes z\u012bme, mikrokred\u012bta kandid\u0101ts, 13 akrediteti EAP kred\u012bti." },
        { icon: "\u{1F4B0}", title: "Finans\u0113jums pieejams", desc: "Finans\u0113\u0161anas iesp\u0113jas pieejamas piem\u0113rot\u0101m organiz\u0101cij\u0101m un dal\u012bbniekiem Baltijas re\u0123ion\u0101." },
      ],
      simTitle: "K\u0101p\u0113c uz simul\u0101ciju balst\u012bta m\u0101c\u012b\u0161an\u0101s?",
      simDesc:
        "Dal\u012bbnieki str\u0101d\u0101 k\u0101 datu anal\u012bti\u0137i UrbanStyle, risinot re\u0101listiskas biznesa probl\u0113mas ar re\u0101liem datiem. Prasmes tiek tie\u0161i p\u0101rnestas uz darbu, jo konteksts atspogu\u013co re\u0101las organiz\u0101cijas.",
      ctaTitle: "Nos\u016btiet savu komandu uz DACA",
      ctaDesc: "Sazinieties ar mums, lai apspriestu grupas dal\u012bbu, finans\u0113\u0161anas iesp\u0113jas un piel\u0101gotu grafiku. Programma ir pieejama dal\u012bbniekiem no visas Baltijas.",
      ctaButton: "Sazin\u0101ties",
      execCtaPrimary: "Rezerv\u0113t 15 min zvanu",
      execCtaSecondary: "Lejupiel\u0101d\u0113t Syllabus (PDF)",

      accordions: {
        roi: "Ieguld\u012bjumu atdeve",
        quality: "Kvalit\u0101te un akredit\u0101cija",
        schedule: "Grafiks un form\u0101ts",
        skills: "Prasmju karte",
        simulation: "K\u0101p\u0113c simul\u0101cijas m\u0101c\u012b\u0161an\u0101s darbojas",
      },
      roiIntro:
        "Darbinieki ieg\u016bst nekav\u0113joties pielietojamas prasmes caur simul\u0101cijas m\u0101c\u012b\u0161anos ar re\u0101liem biznesa datiem.",
      roiPoints: [
        "200+ stundas struktur\u0113tas m\u0101c\u012b\u0161an\u0101s 11 ned\u0113\u013cu laik\u0101",
        "10 portfe\u013ca projekti ar taust\u0101miem biznesa rezult\u0101tiem",
        "SQL, Python, vizualiz\u0101cijas un AI prasmes",
        "Darbinieki str\u0101d\u0101 komand\u0101s, kas atspogu\u013co re\u0101las anal\u012btikas noda\u013cas",
        "Finans\u0113\u0161anas iesp\u0113jas pieejamas piem\u0113rot\u0101m organiz\u0101cij\u0101m",
      ],
      qualityAccordionP1:
        "Programmai ir HAKA kvalit\u0101tes z\u012bme un t\u0101 ir mikrokred\u012bta kandid\u0101te ar 13 EAP kred\u012btiem.",
      qualityAccordionP2:
        "Nov\u0113rt\u0113\u0161ana ir balst\u012bta uz portfeli (Ieskat\u012bts/Neieskat\u012bts), prasot 70% apmekl\u0113jumu un 8\u201310 iesniegtos projektus ar aizst\u0101v\u0113tu gala projektu.",
      scheduleIntro: "3 tie\u0161saistes sesijas ned\u0113\u013c\u0101 (90 min\u016btes katra), plus patst\u0101v\u012bgais darbs:",
      scheduleSessions: [
        { day: "Otrdiena", type: "Mentora sesija", desc: "Ekspertu vad\u012bta m\u0101c\u012b\u0161ana" },
        { day: "Tre\u0161diena", type: "Grupas darbs", desc: "Autonoma komandas prakse" },
        { day: "Ce/Pk", type: "Demo + retro", desc: "Prezent\u0101cijas un atgriezenisk\u0101 saite" },
      ],
      skillsMap: [
        { skill: "SQL un datu b\u0101zu vaic\u0101jumi", weeks: "Ned\u0113\u013cas 1\u20134" },
        { skill: "Datu vizualiz\u0101cija un st\u0101st\u012bjums", weeks: "Ned\u0113\u013cas 5\u20136" },
        { skill: "Python un automatiz\u0101cija", weeks: "Ned\u0113\u013cas 7\u20138" },
        { skill: "AI sadarb\u012bba", weeks: "Visas programmas laik\u0101" },
        { skill: "Portfelis un karjeras gatav\u012bba", weeks: "Ned\u0113\u013cas 9\u201310" },
      ],
      simulationP1:
        "Dal\u012bbnieki str\u0101d\u0101 k\u0101 datu anal\u012bti\u0137i UrbanStyle \u2014 re\u0101listisk\u0101 Igaunijas modes jaun\u0101uz\u0146\u0113mum\u0101 ar re\u0101liem datiem, varo\u0146iem un biznesa probl\u0113m\u0101m.",
      simulationP2:
        "Tas noz\u012bm\u0113, ka prasmes tiek tie\u0161i p\u0101rnestas uz darbu. Darbinieki nem\u0101c\u0101s abstraktu teoriju \u2014 vi\u0146i praktiz\u0113 t\u0101du probl\u0113mu risin\u0101\u0161anu, kas ir identiskas j\u016bsu organiz\u0101cijas probl\u0113m\u0101m.",
    },

    methodology: {
      eyebrow: "Pedago\u0123ija",
      headline: "M\u0113s nep\u0101rdodam inform\u0101ciju \u2014 t\u0101 ir bezmaksas internet\u0101. M\u0113s p\u0101rdodam transform\u0113jo\u0161u pieredzi.",
      stats: [
        { value: "4", label: "Pamatprincipi" },
        { value: "11", label: "Ned\u0113\u013cu simul\u0101cija" },
        { value: "100%", label: "Praktiska pieeja" },
      ],
      simTitle: "Uz simul\u0101ciju balst\u012bta m\u0101c\u012b\u0161an\u0101s",
      simDesc:
        "Katrs uzdevums, datu kopa un varonis pieder UrbanStyle \u2014 simul\u0113tam Igaunijas modes jaun\u0101uz\u0146\u0113mumam. Dal\u012bbnieki nem\u0101c\u0101s datu anal\u012btiku; vi\u0146i to praktiz\u0113 re\u0101listisk\u0101 kontekst\u0101, kas att\u012bsta p\u0101rnesamas prasmes.",
      fourCompTitle: "\u010cetru komponentu arhitekt\u016bra",
      components: [
        { num: "1", name: "Mentorings", color: "bg-slate-blue", desc: "Tie\u0161saistes mentoru sesijas ar 4C metodolo\u0123iju. Ekspertu vad\u012btas, interakt\u012bvas, uz izaicin\u0101jumiem balst\u012btas.", required: true },
        { num: "2", name: "Portfelis", color: "bg-sage", desc: "VIEN\u012aGAIS v\u0113rt\u0113tais komponents. 10 projekti, kas veido profesion\u0101lu GitHub portfeli.", required: true },
        { num: "3", name: "M\u0101c\u012bbu gr\u0101matas", color: "bg-burnt-orange", desc: "Divas oblig\u0101t\u0101s m\u0101c\u012bbu gr\u0101matas: \u2018Python for Data Analysis\u2019 (McKinney) un \u2018Storytelling with Data\u2019 (Knaflic).", required: true },
        { num: "4", name: "E-m\u0101c\u012bbu katalogs", color: "bg-limestone", desc: "Br\u012bvpr\u0101t\u012bgi papildu resursi. Nekad netiek v\u0113rt\u0113ti, nekad nav sertifik\u0101t\u0101.", required: false, voluntaryLabel: "Br\u012bvpr\u0101t\u012bgs" },
      ],
      diffTitle: "Galven\u0101s at\u0161\u0137ir\u012bbas",
      differentiators: [
        { icon: "\u{1F3AD}", title: "Uz simul\u0101ciju balst\u012bts", desc: "Katrs uzdevums izmanto UrbanStyle datus \u2014 re\u0101listiski, konsekventi un aizraujo\u0161i." },
        { icon: "\u{1F504}", title: "Spir\u0101lveida m\u0101c\u012b\u0161an\u0101s", desc: "Katra t\u0113ma tiek atk\u0101rtoti apl\u016bkota no da\u017e\u0101d\u0101m perspekt\u012bv\u0101m da\u017e\u0101d\u0101s sesij\u0101s." },
        { icon: "\u{1F4D6}", title: "4C metode", desc: "Connect \u2192 Concept \u2192 Concrete \u2192 Conclusion katr\u0101 m\u0101c\u012bbu vien\u012bb\u0101." },
        { icon: "\u{1F94B}", title: "Shu-Ha-Ri", desc: "Progresija no kop\u0113\u0161anas uz piel\u0101go\u0161anu uz inov\u0101ciju 11 ned\u0113\u013cu laik\u0101." },
        { icon: "\u{1F4BC}", title: "Portfelis pirmaj\u0101 viet\u0101", desc: "Nov\u0113rt\u0113\u0161ana ir 100% balst\u012bta uz portfeli. Ieskat\u012bts/Neieskat\u012bts. Nek\u0101du eks\u0101menu." },
        { icon: "\u{1F916}", title: "AI k\u0101 6. kompetence", desc: "AI sadarb\u012bba tiek m\u0101c\u012bta k\u0101 prasme, nevis tikai k\u0101 r\u012bks." },
      ],
      rhythmTitle: "Ned\u0113\u013cas ritms: spir\u0101lveida m\u0101c\u012b\u0161an\u0101s",
      rhythmDesc:
        "Katra aktivit\u0101te pievieno jaunu perspekt\u012bvu tai pa\u0161ai t\u0113mai. L\u012bdz ned\u0113\u013cas beig\u0101m koncepts ir izp\u0113t\u012bts no patst\u0101v\u012bg\u0101 darba, mentoringa, komandas darba un demonstr\u0101cijas skat\u012bjumiem.",
      rhythmSteps: [
        { step: "01", title: "Patst\u0101v\u012bgais darbs", subtitle: "Perspekt\u012bva A", desc: "Neatkar\u012bga izp\u0113te ar 4C cikliem" },
        { step: "02", title: "Mentora sesija", subtitle: "Perspekt\u012bva B", desc: "Eksperts pievieno jaunu skat\u012bjumu, tie\u0161saistes m\u0101c\u012b\u0161ana" },
        { step: "03", title: "Grupas darbs", subtitle: "A + B sint\u0113ze", desc: "Komanda piemero abas perspekt\u012bvas" },
        { step: "04", title: "Demo + retro", subtitle: "Refleksija", desc: "Prezent\u0113t, sa\u0146emt atgriezenisko saiti, uzlabot" },
      ],
      contactTitle: "Jaut\u0101jumi par m\u016bsu pieeju?",
      contactDesc: "Sazinieties ar programmas produc\u0113t\u0101ju Aleku Kozlovu detal\u012bz\u0113tai inform\u0101cijai.",

      accordions: {
        fourC: "4C m\u0101c\u012b\u0161anas metode",
        groupWork: "JAGA-TEE-KOGU-ESITLE grupas modelis",
        shuHaRi: "Shu-Ha-Ri progresija",
        aiCompetency: "AI k\u0101 6. kompetence",
        portfolio: "Portfe\u013ca nov\u0113rt\u0113\u0161ana",
        careerChanger: "Karjeras mai\u0146as dizains",
        curriculum: "M\u0101c\u012bbu programmas strukt\u016bra",
        techStack: "Tehnolo\u0123iju steks",
      },
      fourCIntro: "Katra m\u0101c\u012bbu vien\u012bba seko 4C ciklam:",
      fourCSteps: [
        { c: "Connect", desc: "Aktiv\u012bz\u0113t iepriek\u0161\u0113j\u0101s zin\u0101\u0161anas, savienot ar kaut ko paz\u012bstamu" },
        { c: "Concept", desc: "Ieviest jaunu konceptu ar skaidru skaidrojumu" },
        { c: "Concrete", desc: "Nekav\u0113joties pielietot ar praktiskiem uzdevumiem" },
        { c: "Conclusion", desc: "Reflekt\u0113t, apkopot un veidot tiltu uz n\u0101kamo t\u0113mu" },
      ],
      fourCHierarchical:
        "Patst\u0101v\u012bg\u0101 darba burtn\u012bcas izmanto hierarhisku 4C: katrs apak\u0161koncepts sa\u0146em savu pilnu 4C ciklu, kam seko integr\u0113jo\u0161a sint\u0113ze.",
      groupWorkIntro: "Visi Sesijas 2 grupas darbi seko univers\u0101lam 90 min\u016b\u0161u modelim:",
      groupWorkSteps: [
        { step: "JAGA (Dal\u012bties)", desc: "Komanda p\u0101rskata, ko iem\u0101c\u012bj\u0101s individu\u0101li, dal\u0101s atzi\u0146\u0101s" },
        { step: "TEE (Dar\u012bt)", desc: "Sadarb\u012bbas praktiskais darbs ar ned\u0113\u013cas izaicin\u0101jumu" },
        { step: "KOGU (Apkopot)", desc: "Rezult\u0101tu apkopo\u0161ana, izvades materi\u0101lu sagatavo\u0161ana" },
        { step: "ESITLE (Prezent\u0113t)", desc: "Rezult\u0101tu demonstr\u0113\u0161ana grupai, atgriezenisk\u0101s saites sa\u0146em\u0161ana" },
      ],
      shuHaRiIntro:
        "No c\u012b\u0146as m\u0101ksl\u0101m aizg\u016bts ietvars, kas vada autonomijas pieaugumu programm\u0101:",
      shuHaRiPhases: [
        { phase: "Shu (Kop\u0113t)", weeks: "Ned\u0113\u013cas 0\u20133", desc: "Sekojiet instrukcij\u0101m prec\u012bzi. Uzsvars uz pareizu tehniku." },
        { phase: "Ha (Piel\u0101got)", weeks: "Ned\u0113\u013cas 4\u20137", desc: "S\u0101ciet saprast K\u0100P\u0112C. Mainiet pieejas ar vad\u012bbu." },
        { phase: "Ri (Inov\u0113t)", weeks: "Ned\u0113\u013cas 8\u201310", desc: "Izveidojiet savu pieeju. Aizst\u0101viet l\u0113mumus portfel\u012b." },
      ],
      aiCompIntro:
        "AI sadarb\u012bba ir nosaukta prasme, kas tiek att\u012bst\u012bta visas programmas laik\u0101. T\u0101 seko Shu-Ha-Ri l\u012bknei:",
      aiCompFootnote:
        "S\u0101kot no 4. ned\u0113\u013cas, katrs portfe\u013ca README ietver sada\u013cu \u2018AI izmanto\u0161ana\u2019 (1\u20132 teikumi).",
      portfolioIntro: "Nov\u0113rt\u0113\u0161ana ir 100% balst\u012bta uz portfeli (Ieskat\u012bts/Neieskat\u012bts):",
      portfolioPoints: [
        "Nepiecie\u0161ams 70% apmekl\u0113jums",
        "8\u201310 portfe\u013ca projekti iesniegti",
        "Gala projekts aizst\u0101v\u0113ts kol\u0113\u0123u un mentoru priek\u0161\u0101",
        "Pamata l\u012bmenis (70%): nepiecie\u0161ams ieskaitei",
        "Augst\u0101kais l\u012bmenis (30%): br\u012bvpr\u0101t\u012bga padzi\u013cin\u0101ta anal\u012bze \u0101tr\u0101kiem m\u0101cek\u013ciem",
        "Nek\u0101du tradicion\u0101lu eks\u0101menu, nek\u0101du atz\u012bmju \u2014 tikai Ieskat\u012bts vai Neieskat\u012bts",
      ],
      careerDesignIntro:
        "Programma ir \u012bpa\u0161i veidota karjeras main\u012bt\u0101jiem. Katrs elements pastiprina, ka eso\u0161\u0101 profesion\u0101l\u0101 pieredze ir priek\u0161roc\u012bba:",
      careerDesignPoints: [
        "Ned\u0113\u013ca 0: Igaunijas DA tirgus statistika (56+ poz\u012bcijas, augo\u0161s piepras\u012bjums)",
        "Ned\u0113\u013cas 1\u20138: Lomu rot\u0101cija UrbanStyle nov\u0113rt\u0113 da\u017e\u0101dus skat\u012bjumus",
        "Ned\u0113\u013ca 9: \u2018Aha moments\u2019 \u2014 darb\u0101 pie\u0146em\u0161anas vadl\u012bnijas apraksta J\u016aS",
        "Ned\u0113\u013ca 10: UrbanStyle valdes s\u0113de k\u0101 izlaiduma ceremonija",
      ],
      curriculumIntro: "6 sprinti 11 ned\u0113\u013cu laik\u0101:",
      curriculumSprints: [
        { sprint: "Sprint 0", weeks: "Ned\u0113\u013ca 0", focus: "Ievads" },
        { sprint: "Sprint 1", weeks: "Ned\u0113\u013cas 1\u20132", focus: "SQL pamati" },
        { sprint: "Sprint 2", weeks: "Ned\u0113\u013cas 3\u20134", focus: "SQL padzi\u013cin\u0101ti" },
        { sprint: "Sprint 3", weeks: "Ned\u0113\u013cas 5\u20136", focus: "Vizualiz\u0101cija" },
        { sprint: "Sprint 4", weeks: "Ned\u0113\u013cas 7\u20138", focus: "Python anal\u012bze" },
        { sprint: "Sprint 5", weeks: "Ned\u0113\u013cas 9\u201310", focus: "Portfelis un karjera" },
      ],
      curriculumFootnote:
        "M\u0101c\u012bbu programmu atbalsta divas oblig\u0101t\u0101s m\u0101c\u012bbu gr\u0101matas: \u201cPython for Data Analysis\u201d (McKinney) un \u201cStorytelling with Data\u201d (Knaflic).",
    },
  },
};

// ---------------------------------------------------------------------------
// Helper to resolve locale content
// ---------------------------------------------------------------------------

function useContent(): PageContent {
  const locale = useLocale() as Locale;
  return CONTENT[locale as "en" | "et" | "ru" | "lv"] || CONTENT.en;
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

function StatHorizontal({ value, label }: StatItem) {
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
    <div ref={ref} className="flex flex-col border-l-2 border-charcoal/10 pl-4 py-1 shrink-0 snap-start">
      <span className="block text-3xl font-bold font-mono tracking-tight leading-none text-burnt-orange">
        {numericValue ? `${count}${suffix}` : value}
      </span>
      <span className="block mt-1 text-xs font-semibold text-charcoal/60 uppercase tracking-widest max-w-[140px] leading-tight">
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
// Zoom toggle component
// ---------------------------------------------------------------------------

function ZoomToggle({
  zoomed,
  onToggle,
  showLabel,
  hideLabel,
}: {
  zoomed: boolean;
  onToggle: () => void;
  showLabel: string;
  hideLabel: string;
}) {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={onToggle}
        className="group flex items-center gap-3 px-6 py-3 rounded-full border border-charcoal/15 hover:border-burnt-orange/40 transition-colors duration-300"
      >
        <span className="text-sm font-medium text-charcoal/70 group-hover:text-charcoal transition-colors">
          {zoomed ? hideLabel : showLabel}
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
// Zoom-in detail accordions per view
// ---------------------------------------------------------------------------

function LearnersAccordions() {
  const t = useContent();
  const l = t.learners;

  const items: AccordionItem[] = [
    {
      id: "l-weekmap",
      title: l.accordions.weekMap,
      content: (
        <div className="space-y-2">
          {l.weekMapItems.map((w) => (
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
      title: l.accordions.weeklyFlow,
      content: (
        <div className="space-y-4">
          <p>{l.weeklyFlowIntro}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {l.weeklyFlowSteps.map((s) => (
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
      title: l.accordions.aiSkills,
      content: (
        <div className="space-y-3">
          <p className="mb-4">{l.aiIntro}</p>
          {l.aiProgression.map((a) => (
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
      title: l.accordions.techStack,
      content: (
        <ul className="space-y-2">
          {TECH_STACK.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "l-career",
      title: l.accordions.careerChanger,
      content: (
        <div className="space-y-3">
          <p>{l.careerIntro}</p>
          <ul className="space-y-2">
            {l.careerPoints.map((item) => (
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
  const t = useContent();
  const e = t.employers;

  const items: AccordionItem[] = [
    {
      id: "e-roi",
      title: e.accordions.roi,
      content: (
        <div className="space-y-3">
          <p>{e.roiIntro}</p>
          <ul className="space-y-2">
            {e.roiPoints.map((item) => (
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
      title: e.accordions.quality,
      content: (
        <div className="space-y-3">
          <p>{e.qualityAccordionP1}</p>
          <p>{e.qualityAccordionP2}</p>
        </div>
      ),
    },
    {
      id: "e-schedule",
      title: e.accordions.schedule,
      content: (
        <div className="space-y-3">
          <p>{e.scheduleIntro}</p>
          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            {e.scheduleSessions.map((s) => (
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
      title: e.accordions.skills,
      content: (
        <div className="space-y-2">
          {e.skillsMap.map((s) => (
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
      title: e.accordions.simulation,
      content: (
        <div className="space-y-3">
          <p>{e.simulationP1}</p>
          <p>{e.simulationP2}</p>
        </div>
      ),
    },
  ];
  return <Accordion items={items} />;
}

function MethodologyAccordions() {
  const t = useContent();
  const m = t.methodology;
  const l = t.learners;

  const items: AccordionItem[] = [
    {
      id: "m-4c",
      title: m.accordions.fourC,
      content: (
        <div className="space-y-3">
          <p>{m.fourCIntro}</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {m.fourCSteps.map((step) => (
              <div key={step.c} className="p-4 bg-limestone/20 rounded-lg">
                <p className="font-bold text-burnt-orange mb-1">{step.c}</p>
                <p className="text-sm text-charcoal/70">{step.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-charcoal/60">
            {m.fourCHierarchical}
          </p>
        </div>
      ),
    },
    {
      id: "m-groupwork",
      title: m.accordions.groupWork,
      content: (
        <div className="space-y-3">
          <p>{m.groupWorkIntro}</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {m.groupWorkSteps.map((s) => (
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
      title: m.accordions.shuHaRi,
      content: (
        <div className="space-y-4">
          <p>{m.shuHaRiIntro}</p>
          {m.shuHaRiPhases.map((p) => (
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
      title: m.accordions.aiCompetency,
      content: (
        <div className="space-y-3">
          <p>{m.aiCompIntro}</p>
          <div className="space-y-2 mt-4">
            {l.aiProgression.map((a) => (
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
            {m.aiCompFootnote}
          </p>
        </div>
      ),
    },
    {
      id: "m-portfolio",
      title: m.accordions.portfolio,
      content: (
        <div className="space-y-3">
          <p>{m.portfolioIntro}</p>
          <ul className="space-y-2 mt-4">
            {m.portfolioPoints.map((item) => (
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
      title: m.accordions.careerChanger,
      content: (
        <div className="space-y-3">
          <p>{m.careerDesignIntro}</p>
          <ul className="space-y-2">
            {m.careerDesignPoints.map((item) => (
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
      title: m.accordions.curriculum,
      content: (
        <div className="space-y-4">
          <p>{m.curriculumIntro}</p>
          <div className="space-y-2">
            {m.curriculumSprints.map((s) => (
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
            {m.curriculumFootnote}
          </p>
        </div>
      ),
    },
    {
      id: "m-tech",
      title: m.accordions.techStack,
      content: (
        <ul className="space-y-2">
          {TECH_STACK.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-blue flex-shrink-0" />
              {item}
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
  const t = useContent();
  const l = t.learners;

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
            {l.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.95] mb-8"
          >
            {l.headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-offwhite/70 max-w-2xl mx-auto"
          >
            {l.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Executive Summary (Stats) */}
      <section className="border-b border-charcoal/10 bg-offwhite">
        <div className="w-full overflow-x-auto hide-scrollbar snap-x snap-mandatory lg:flex lg:justify-center">
          <div className="flex gap-6 md:gap-10 px-6 md:px-16 py-8 md:py-12 w-max">
            {l.stats.map((s) => (
              <StatHorizontal key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
              {l.whatYouGetTitle}
            </h2>
            <p className="text-charcoal/70 text-lg mb-6 max-w-2xl">
              {l.whatYouGetDesc}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Experience */}
      <section className="px-6 md:px-16 py-20 bg-limestone/20">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
              {l.teamTitle}
            </h2>
            <p className="text-charcoal/70 text-lg mb-6 max-w-3xl">
              {l.teamDesc}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Value Grid */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <ValueGrid items={l.values} />
        </div>
      </section>

      {/* Assessment */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="bg-charcoal text-offwhite rounded-xl p-8 md:p-12">
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">
                {l.assessmentTitle}
              </h3>
              <p className="text-offwhite/70 text-lg mb-4">
                {l.assessmentDesc}
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                {l.badges.map((badge) => (
                  <span key={badge} className="px-4 py-2 bg-sage/20 text-sage rounded-full text-sm font-medium">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Zoom toggle + details */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <ZoomToggle zoomed={zoomed} onToggle={() => setZoomed(!zoomed)} showLabel={t.zoom.show} hideLabel={t.zoom.hide} />
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
              {l.ctaEyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-10">
              {l.ctaHeadline}
            </h2>
            
            <div className="bg-white/5 border border-offwhite/10 rounded-xl p-8 mb-10 max-w-2xl mx-auto backdrop-blur-sm">
              <h3 className="text-offwhite/90 text-2xl font-bold mb-2">
                {t.sharedCta.bookCallTitle}
              </h3>
              <p className="text-offwhite/70 text-base mb-8">
                {t.sharedCta.bookCallDesc}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={programUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-offwhite/20 text-offwhite font-bold rounded-lg text-base tracking-wide hover:bg-offwhite/10 hover:border-offwhite transition-all duration-300 w-full sm:w-auto"
                >
                  {l.ctaButton}
                </a>
                <a
                  href="https://calendly.com/alekkozlov/daca-with-producer-data-analyst-career-accelerator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-burnt-orange text-offwhite font-bold rounded-lg text-base tracking-wide hover:bg-offwhite hover:text-burnt-orange transition-all duration-300 shadow-xl w-full sm:w-auto"
                >
                  {t.sharedCta.bookCallBtn}
                </a>
              </div>
            </div>
            
            <p className="mt-8 text-offwhite/50 text-sm">
              {t.sharedCta.contactInfo}
            </p>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}

function EmployersView() {
  const [zoomed, setZoomed] = useState(false);
  const t = useContent();
  const e = t.employers;

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
            {e.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.95] mb-8"
          >
            {e.headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-offwhite/70 max-w-2xl mx-auto"
          >
            {e.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Executive Summary (Stats) */}
      <section className="border-b border-charcoal/10 bg-offwhite">
        <div className="w-full overflow-x-auto hide-scrollbar snap-x snap-mandatory lg:flex lg:justify-center">
          <div className="flex gap-6 md:gap-10 px-6 md:px-16 py-8 md:py-12 w-max">
            {e.stats.map((s) => (
              <StatHorizontal key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Quality card */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="bg-charcoal text-offwhite rounded-xl p-8 md:p-12">
              <div className="flex flex-wrap gap-4 mb-6">
                {e.qualityBadges.map((badge) => (
                  <span key={badge} className="px-4 py-2 bg-sage/20 text-sage rounded-full text-sm font-medium">
                    {badge}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">
                {e.qualityTitle}
              </h3>
              <p className="text-offwhite/70 text-lg">
                {e.qualityDesc}
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
              {e.learnTitle}
            </h2>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {e.learnItems.map((item, idx) => (
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
          <ValueGrid items={e.values} />
        </div>
      </section>

      {/* Why simulation */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
              {e.simTitle}
            </h2>
            <p className="text-charcoal/70 text-lg max-w-3xl">
              {e.simDesc}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Zoom toggle + details */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <ZoomToggle zoomed={zoomed} onToggle={() => setZoomed(!zoomed)} showLabel={t.zoom.show} hideLabel={t.zoom.hide} />
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
              {e.ctaTitle}
            </h2>
            <p className="text-offwhite/70 text-lg mb-10">
              {e.ctaDesc}
            </p>
            
            <div className="bg-charcoal/20 border border-offwhite/10 rounded-xl p-8 mb-10 max-w-2xl mx-auto backdrop-blur-sm">
              <h3 className="text-offwhite/90 text-2xl font-bold mb-2">
                {t.sharedCta.bookCallTitle}
              </h3>
              <p className="text-offwhite/70 text-base mb-8">
                {t.sharedCta.bookCallDesc}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="#employers"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-offwhite/20 text-offwhite font-bold rounded-lg text-base tracking-wide hover:bg-offwhite/10 hover:border-offwhite transition-all duration-300 w-full sm:w-auto"
                >
                  {e.execCtaSecondary}
                </a>
                <a
                  href="https://calendly.com/alekkozlov/daca-with-producer-data-analyst-career-accelerator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-burnt-orange text-offwhite font-bold rounded-lg text-base tracking-wide hover:bg-offwhite hover:text-burnt-orange transition-all duration-300 shadow-xl w-full sm:w-auto"
                >
                  {t.sharedCta.bookCallBtn}
                </a>
              </div>
            </div>
            
            <p className="mt-8 text-offwhite/50 text-sm">
              {t.sharedCta.contactInfo}
            </p>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}

function MethodologyView() {
  const [zoomed, setZoomed] = useState(false);
  const t = useContent();
  const m = t.methodology;

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
            {m.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[0.95] mb-8"
          >
            {m.headline}
          </motion.h1>
        </div>
      </section>

      {/* Executive Summary (Stats) */}
      <section className="border-b border-charcoal/10 bg-offwhite">
        <div className="w-full overflow-x-auto hide-scrollbar snap-x snap-mandatory lg:flex lg:justify-center">
          <div className="flex gap-6 md:gap-10 px-6 md:px-16 py-8 md:py-12 w-max">
            {m.stats.map((s) => (
              <StatHorizontal key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Core Proposition */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
              {m.simTitle}
            </h2>
            <p className="text-charcoal/70 text-lg max-w-3xl mb-6">
              {m.simDesc}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Four-Component Model */}
      <section className="px-6 md:px-16 py-20 bg-limestone/20">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-10">
              {m.fourCompTitle}
            </h2>
          </RevealSection>
          <div className="grid sm:grid-cols-2 gap-6">
            {m.components.map((comp, idx) => (
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
                        {comp.voluntaryLabel}
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
              {m.diffTitle}
            </h2>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {m.differentiators.map((card, idx) => (
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
              {m.rhythmTitle}
            </h2>
            <p className="text-charcoal/70 text-lg mb-10 max-w-3xl">
              {m.rhythmDesc}
            </p>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {m.rhythmSteps.map((item, idx) => (
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
          <ZoomToggle zoomed={zoomed} onToggle={() => setZoomed(!zoomed)} showLabel={t.zoom.show} hideLabel={t.zoom.hide} />
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
      <section className="px-6 md:px-16 py-24 bg-slate-blue text-offwhite text-center">
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6">
              {m.contactTitle}
            </h2>
            <p className="text-offwhite/70 text-lg mb-10">
              {m.contactDesc}
            </p>
            
            <div className="bg-charcoal/20 border border-offwhite/10 rounded-xl p-8 mb-10 max-w-2xl mx-auto backdrop-blur-sm">
              <h3 className="text-offwhite/90 text-2xl font-bold mb-2">
                {t.sharedCta.bookCallTitle}
              </h3>
              <p className="text-offwhite/70 text-base mb-8">
                {t.sharedCta.bookCallDesc}
              </p>
              
              <div className="flex flex-col justify-center items-center">
                <a
                  href="https://calendly.com/alekkozlov/daca-with-producer-data-analyst-career-accelerator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-burnt-orange text-offwhite font-bold rounded-lg text-base tracking-wide hover:bg-offwhite hover:text-burnt-orange transition-all duration-300 shadow-xl w-full sm:w-auto"
                >
                  {t.sharedCta.bookCallBtn}
                </a>
              </div>
            </div>
            
            <p className="mt-8 text-offwhite/50 text-sm">
              {t.sharedCta.contactInfo}
            </p>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

export default function ApproachPage() {
  const [activeTab, setActiveTab] = useState<AudienceTab>("learners");
  const t = useContent();

  // Hash-based and URL Parameter deep linking
  const handleUrlState = useCallback(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("audience") === "exec") {
      setActiveTab("employers");
      // Clean URL, push to history
      const unparamUrl = window.location.pathname + window.location.hash;
      window.history.replaceState(null, "", unparamUrl);
      return;
    }

    const hash = window.location.hash.replace("#", "") as AudienceTab;
    if (hash && ["learners", "employers", "methodology"].includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => handleUrlState(), 0);
    window.addEventListener("hashchange", handleUrlState);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", handleUrlState);
    };
  }, [handleUrlState]);

  // Update hash when tab changes
  const switchTab = (tab: AudienceTab) => {
    setActiveTab(tab);
    window.history.replaceState(null, "", `#${tab}`);
  };

  return (
    <div className="pt-20 overflow-hidden">
      {/* Sticky pill navigation */}
      <nav
        className="sticky top-14 md:top-20 z-40 bg-offwhite/90 backdrop-blur-md border-b border-charcoal/10"
        aria-label="Audience views"
      >
        <div className="max-w-5xl mx-auto px-4 md:px-16 py-3 flex justify-center overflow-x-auto hide-scrollbar">
          <div className="bg-charcoal/5 p-1 flex items-center justify-between rounded-full w-full max-w-lg md:max-w-max">
            {(["learners", "employers", "methodology"] as AudienceTab[]).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className={`relative flex-1 sm:min-w-[150px] py-2.5 px-3 md:px-6 text-xs md:text-sm lg:text-base font-semibold tracking-wide text-center transition-all duration-300 rounded-full whitespace-nowrap ${
                    activeTab === tab
                      ? "text-offwhite shadow-sm"
                      : "text-charcoal/60 hover:text-charcoal transition-colors hover:bg-charcoal/5"
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-charcoal rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{t.tabs[tab]}</span>
                </button>
              )
            )}
          </div>
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
