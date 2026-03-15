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

const CONTENT: Record<"en" | "et", PageContent> = {
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
};

// ---------------------------------------------------------------------------
// Helper to resolve locale content
// ---------------------------------------------------------------------------

function useContent(): PageContent {
  const locale = useLocale() as Locale;
  return CONTENT[locale as "en" | "et"] || CONTENT.en;
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

      {/* Stats */}
      <section className="px-6 md:px-16 py-16 border-b border-charcoal/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {l.stats.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
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
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6">
              {l.ctaHeadline}
            </h2>
            <a
              href={programUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 bg-burnt-orange text-offwhite font-bold rounded-lg text-lg tracking-wide hover:bg-offwhite hover:text-burnt-orange transition-all duration-500 shadow-xl"
            >
              {l.ctaButton}
            </a>
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

      {/* Stats */}
      <section className="px-6 md:px-16 py-16 border-b border-charcoal/10">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
          {e.stats.map((s) => (
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
            <p className="text-offwhite/70 text-lg mb-8">
              {e.ctaDesc}
            </p>
            <a
              href="mailto:info@ettevotluskeskus.ee?subject=DACA%20Partnership%20Inquiry"
              className="inline-flex items-center justify-center px-10 py-4 bg-burnt-orange text-offwhite font-bold rounded-lg text-lg tracking-wide hover:bg-offwhite hover:text-burnt-orange transition-all duration-500 shadow-xl"
            >
              {e.ctaButton}
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
      <section className="px-6 md:px-16 py-16 bg-charcoal text-offwhite text-center">
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4">
              {m.contactTitle}
            </h2>
            <p className="text-offwhite/70 mb-6">
              {m.contactDesc}
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
// Main page component
// ---------------------------------------------------------------------------

export default function ApproachPage() {
  const [activeTab, setActiveTab] = useState<AudienceTab>("learners");
  const t = useContent();

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
                {t.tabs[tab]}
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
