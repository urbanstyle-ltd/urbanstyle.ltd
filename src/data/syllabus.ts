export const PROGRAM_DATA = {
  "program": {
    "name": "DACA — Andmeanalüütiku Karjäärikiirendi",
    "provider": "Ettevõtluskeskus OÜ",
    "producer": "Alek Kozlov",
    "duration": "11 nädalat (Nädal 0–10)",
    "company": "UrbanStyle OÜ",
    "updated": "2026-03-12"
  },
  "sprints": [
    {
      "id": 0,
      "name": "Onboarding",
      "weeks": [
        0
      ],
      "color": "#6B7280",
      "description": "Programmi tutvustus, töökeskkondade seadistamine, meeskonna moodustamine"
    },
    {
      "id": 1,
      "name": "SQL Fundamentals",
      "weeks": [
        1,
        2
      ],
      "color": "#3B82F6",
      "description": "SQL põhitõed: SELECT, WHERE, DELETE, UPDATE, andmete puhastamine"
    },
    {
      "id": 2,
      "name": "SQL Advanced",
      "weeks": [
        3,
        4
      ],
      "color": "#8B5CF6",
      "description": "SQL edasijõudnute: JOINs, GROUP BY, HAVING, CTE, Window Functions"
    },
    {
      "id": 3,
      "name": "Visualization",
      "weeks": [
        5,
        6
      ],
      "color": "#F59E0B",
      "description": "Andmete visualiseerimine: Power BI / Plotly+Streamlit, dashboardid, data storytelling"
    },
    {
      "id": 4,
      "name": "Python Analysis",
      "weeks": [
        7,
        8
      ],
      "color": "#10B981",
      "description": "Python analüüs: pandas, numpy, RFM segmenteerimine, API-d, automatiseerimine"
    },
    {
      "id": 5,
      "name": "Portfolio & Career",
      "weeks": [
        9,
        10
      ],
      "color": "#EF4444",
      "description": "Karjääri ettevalmistus, portfoolio kaitsmine, lõpetamine"
    }
  ],
  "weeks": [
    {
      "id": 0,
      "name": "Onboarding",
      "sprint": 0,
      "shuHaRi": "Shu",
      "bloomLevel": "Mäletamine",
      "character": "Toomas + Kristi",
      "characterQuote": "Tere tulemast UrbanStyle'i! Praegu teeme otsuseid tundel, mitte faktidel.",
      "narrativeTitle": "Esimene Päev UrbanStyle'is",
      "emotionalArc": "Elevus → esimene commit → oma GitHub profiil!",
      "aiLevel": {
        "name": "Tutvumine",
        "desc": "NotebookLM, AI küsimused",
        "pct": 10
      },
      "sessions": {
        "s1": {
          "topic": "Programmi tutvustus, DA turu statistika, AI-koostöö tutvustus",
          "outcomes": [
            "ÕV1: Mõistab DA rolli ja turu kasvutrendi",
            "ÕV2: Teab DACA 4 komponenti"
          ],
          "duration": "90 min"
        },
        "s2": {
          "topic": "Meeskonna moodustamine + GitHub repo seadistamine (JAGA-TEE-KOGU-ESITLE)",
          "outcomes": [
            "6 meeskonda moodustatud",
            "GitHub repo loodud, README, esimene commit"
          ],
          "duration": "90 min"
        },
        "s3": {
          "topic": "Tööriistade setup + Show & Tell",
          "outcomes": [
            "Supabase/VS Code installitud",
            "Esimene demo"
          ],
          "duration": "90 min"
        }
      },
      "selfStudy": {
        "akt": 22,
        "activities": [
          "Töökeskkonna paigaldamine",
          "McKinney Ch 1",
          "Knaflic Ch 1",
          "GitHub tutorial"
        ]
      },
      "portfolio": {
        "artifact": "GitHub repo + README",
        "base": "Repository loodud, README.md, 1+ commit",
        "advanced": "Kataloogistruktuur, .gitignore, badges"
      },
      "tools": [
        "GitHub",
        "VS Code",
        "Supabase",
        "SQL (tutvustus)",
        "Power BI / Python",
        "NotebookLM"
      ],
      "textbooks": {
        "mckinney": "Ch 1: Preliminaries",
        "knaflic": "Ch 1: Importance of Context"
      },
      "fourC": "Connection (siduda kogemusega)",
      "components": {
        "mentorlus": "Programmi tutvustus + DA turu ülevaade",
        "portfoolio": "GitHub repo + README",
        "eopik": "McKinney Ch1 + Knaflic Ch1",
        "ekataloog": "4 CORE RAG + 2 weekly RAG"
      }
    },
    {
      "id": 1,
      "name": "SQL Põhitõed",
      "sprint": 1,
      "shuHaRi": "Shu",
      "bloomLevel": "Mõistmine",
      "character": "Toomas",
      "characterQuote": "Meie sales tabelis on üle 5000 duplikaati. Ainult analüüsige!",
      "narrativeTitle": "Toomas Avastab 5000 Duplikaati",
      "emotionalArc": "Ärevus (duplikaadid!) → SELECT töötab! → suurim müük leitud!",
      "aiLevel": {
        "name": "Tutvumine",
        "desc": "NotebookLM, AI küsimused",
        "pct": 15
      },
      "sessions": {
        "s1": {
          "topic": "SQL süntaksi alused: SELECT, WHERE, ORDER BY",
          "outcomes": [
            "Kirjutab SELECT päringuid",
            "Kasutab WHERE filtreerimist"
          ],
          "duration": "90 min"
        },
        "s2": {
          "topic": "Sales tabeli uurimine (andmedomeeni dekomposits.)",
          "outcomes": [
            "5+ SQL päringut",
            "Duplikaadid ja NULLid leitud"
          ],
          "duration": "90 min"
        },
        "s3": {
          "topic": "Demo: Raporteerime Toomasele",
          "outcomes": [
            "SQL tulemused esitletud",
            "Peer + mentor tagasiside"
          ],
          "duration": "90 min"
        }
      },
      "selfStudy": {
        "akt": 22,
        "activities": [
          "SQL süntaks",
          "McKinney Ch 2",
          "Knaflic Ch 1 kordamine",
          "Päringute dokumenteerimine"
        ]
      },
      "portfolio": {
        "artifact": "Sales tabeli uurimisuuring",
        "base": "5 SQL päringut + kommentaarid + README",
        "advanced": "GROUP BY, duplikaatide list, iga kaupluse kogumüük"
      },
      "tools": [
        "SQL (SELECT, WHERE, ORDER BY, LIMIT, DISTINCT, COUNT)",
        "Supabase SQL Editor",
        "GitHub",
        "NotebookLM"
      ],
      "textbooks": {
        "mckinney": "Ch 2: Python Basics",
        "knaflic": "Ch 1 (kordamine)"
      },
      "fourC": "Connection (Excel filtreerimine = WHERE)",
      "components": {
        "mentorlus": "SQL süntaks + live coding",
        "portfoolio": "week1_sales_exploration.sql",
        "eopik": "McKinney Ch2 + Knaflic Ch1",
        "ekataloog": "2 weekly RAG (SQL basics)"
      }
    },
    {
      "id": 2,
      "name": "Andmete Puhastamine",
      "sprint": 1,
      "shuHaRi": "Shu",
      "bloomLevel": "Rakendamine",
      "character": "Toomas",
      "characterQuote": "Muljetavaldav. Te dokumenteeriste iga sammu. See on professionaalne töö.",
      "narrativeTitle": "Toomas Vajab Puhastamisskripti",
      "emotionalArc": "Hirm (kustutada?) → COALESCE geniaalne! → 5000+ puhastatud!",
      "aiLevel": {
        "name": "Abiline",
        "desc": "Debug, kontroll",
        "pct": 25
      },
      "sessions": {
        "s1": {
          "topic": "DELETE, UPDATE, COALESCE, turvakoopia",
          "outcomes": [
            "DELETE koos WHERE klausliga",
            "Test koopia loomine"
          ],
          "duration": "90 min"
        },
        "s2": {
          "topic": "Puhastamisskripti loomine (andmedomeeni dekomposits.)",
          "outcomes": [
            "Cleaning script valmis",
            "Logi tabel loodud"
          ],
          "duration": "90 min"
        },
        "s3": {
          "topic": "Demo: Esitleme skripti Toomasele",
          "outcomes": [
            "Skript esitletud",
            "Toomas kiidab"
          ],
          "duration": "90 min"
        }
      },
      "selfStudy": {
        "akt": 22,
        "activities": [
          "DELETE/UPDATE harjutamine",
          "McKinney Ch 3",
          "Knaflic Ch 2",
          "Skripti dokumenteerimine"
        ]
      },
      "portfolio": {
        "artifact": "Andmete puhastamisskript",
        "base": "Test koopia + DELETE + UPDATE NULLid + logi",
        "advanced": "Transaktsioonid, rollback plaan"
      },
      "tools": [
        "SQL (DELETE, UPDATE, COALESCE, CASE WHEN)",
        "Supabase",
        "GitHub (branch)",
        "NotebookLM"
      ],
      "textbooks": {
        "mckinney": "Ch 3: Data Structures",
        "knaflic": "Ch 2: Effective Visuals"
      },
      "fourC": "Connection (Excel duplikaadid = DELETE)",
      "components": {
        "mentorlus": "Puhastamise meetodid + turvalisus",
        "portfoolio": "week2_cleaning_script.sql",
        "eopik": "McKinney Ch3 + Knaflic Ch2",
        "ekataloog": "2 weekly RAG (SQL cleaning)"
      }
    },
    {
      "id": 3,
      "name": "SQL JOINs",
      "sprint": 2,
      "shuHaRi": "Shu",
      "bloomLevel": "Analüüsimine",
      "character": "Toomas + Anna",
      "characterQuote": "See on TÄPSELT see, mida ma vajasin! TOP klient tuleb Google Ads'ist!",
      "narrativeTitle": "Anna Ilmub – KES on Parimad Kliendid?",
      "emotionalArc": "JOIN? Mis see on? → INNER JOIN töötab! → Anna vaimustuses!",
      "aiLevel": {
        "name": "Abiline",
        "desc": "Debug, kontroll",
        "pct": 30
      },
      "sessions": {
        "s1": {
          "topic": "INNER JOIN, LEFT JOIN, multi-table",
          "outcomes": [
            "Ühendab 2 tabelit",
            "Mõistab INNER vs LEFT"
          ],
          "duration": "90 min"
        },
        "s2": {
          "topic": "3 tabeli ühendamine + turunduskanalid (andmedomeeni dekomposits.)",
          "outcomes": [
            "TOP 20 klienti leitud",
            "Turunduskanalid analüüsitud"
          ],
          "duration": "90 min"
        },
        "s3": {
          "topic": "Demo: Anna Metsa tagasiside",
          "outcomes": [
            "Anna: WOW!",
            "Toomas noogutab"
          ],
          "duration": "90 min"
        }
      },
      "selfStudy": {
        "akt": 22,
        "activities": [
          "JOIN harjutused",
          "McKinney Ch 5",
          "Knaflic Ch 3",
          "TOP klientide analüüs"
        ]
      },
      "portfolio": {
        "artifact": "TOP 20 klientide analüüs",
        "base": "Sales+customers JOIN, TOP 20",
        "advanced": "3 tabeli JOIN (+ web_logs), turunduskanalid"
      },
      "tools": [
        "SQL (INNER/LEFT/RIGHT JOIN, multi-table)",
        "Supabase",
        "GitHub (PR)",
        "NotebookLM"
      ],
      "textbooks": {
        "mckinney": "Ch 5: pandas",
        "knaflic": "Ch 3: Clutter is Your Enemy"
      },
      "fourC": "Connection (Excel VLOOKUP = SQL JOIN)",
      "components": {
        "mentorlus": "JOIN loogika + live coding",
        "portfoolio": "week3_top_customers_analysis.sql",
        "eopik": "McKinney Ch5 + Knaflic Ch3",
        "ekataloog": "2 weekly RAG (SQL JOINs)"
      }
    },
    {
      "id": 4,
      "name": "SQL Agregatsioon",
      "sprint": 2,
      "shuHaRi": "Ha",
      "bloomLevel": "Analüüsimine",
      "character": "Anna + Liis",
      "characterQuote": "Miks me ei teadnud seda varem?! Need trendid on kristallselged.",
      "narrativeTitle": "GROUP BY Maailm – CEO Tahab Numbreid",
      "emotionalArc": "Entusiasm → Liisi inventuuri probleem → CEO kiidab!",
      "aiLevel": {
        "name": "Koostööpartner",
        "desc": "Koodigener., kriitiline hindamine",
        "pct": 45
      },
      "sessions": {
        "s1": {
          "topic": "GROUP BY, HAVING, agregaatfunktsioonid, CTE",
          "outcomes": [
            "GROUP BY loogika",
            "COUNT, SUM, AVG, CTE"
          ],
          "duration": "90 min"
        },
        "s2": {
          "topic": "ÄriKPI’de arvutamine + varude audit (andmedomeeni dekomposits.)",
          "outcomes": [
            "KPI'd arvutatud",
            "Laoaudit tehtud"
          ],
          "duration": "90 min"
        },
        "s3": {
          "topic": "Demo: CEO aruanded + Window Functions",
          "outcomes": [
            "Kristi: kristallselged trendid",
            "Window functions tutvustus"
          ],
          "duration": "90 min"
        }
      },
      "selfStudy": {
        "akt": 22,
        "activities": [
          "GROUP BY/HAVING",
          "McKinney Ch 6",
          "Knaflic Ch 4",
          "CTE ja window functions"
        ]
      },
      "portfolio": {
        "artifact": "Äri-KPI aruanded",
        "base": "Kuude kaupa müük, TOP kliendid, laoaudit",
        "advanced": "CTE'd, LAG/LEAD, ROW_NUMBER, jooksev summa"
      },
      "tools": [
        "SQL (GROUP BY, HAVING, CTE, Window Functions)",
        "Supabase",
        "GitHub (branch + PR)",
        "NotebookLM"
      ],
      "textbooks": {
        "mckinney": "Ch 6: Data Loading",
        "knaflic": "Ch 4: Focus Attention"
      },
      "fourC": "Concrete Practice rõhk (45%)",
      "components": {
        "mentorlus": "Agregatsioon + CTE muster",
        "portfoolio": "week4_aggregation_queries.sql",
        "eopik": "McKinney Ch6 + Knaflic Ch4",
        "ekataloog": "2 weekly RAG (SQL aggregation)"
      }
    },
    {
      "id": 5,
      "name": "Visualiseerimise Disain",
      "sprint": 3,
      "shuHaRi": "Ha",
      "bloomLevel": "Hindamine",
      "character": "Kristi + Anna",
      "characterQuote": "Investorid tulevad 5 nädala pärast. Nad tahavad INTERAKTIIVSET dashboardi.",
      "narrativeTitle": "Kriisihetk – Investor Pitch 5 Nädala Pärast",
      "emotionalArc": "Elevus + pressure → Chart types matter! → Prototüübid VALMIS!",
      "aiLevel": {
        "name": "Koostööpartner",
        "desc": "Koodigener., kriitiline hindamine",
        "pct": 50
      },
      "sessions": {
        "s1": {
          "topic": "Viz põhimõtted, dashboard anatomy, data-ink ratio",
          "outcomes": [
            "Chart type selection",
            "Dashboard layout"
          ],
          "duration": "90 min"
        },
        "s2": {
          "topic": "Investor dashboard ehitamine (diagrammi dekomposits.)",
          "outcomes": [
            "3–4 chart'i loodud",
            "KPI kaardid, filtrid"
          ],
          "duration": "90 min"
        },
        "s3": {
          "topic": "Retrospektiiv + peer feedback",
          "outcomes": [
            "Peer feedback 3x3",
            "Dashboard screenshot GitHub'is"
          ],
          "duration": "90 min"
        }
      },
      "selfStudy": {
        "akt": 22,
        "activities": [
          "Power BI / Plotly+Streamlit install",
          "McKinney Ch 9",
          "Knaflic Ch 5",
          "Dashboard prototoop"
        ]
      },
      "portfolio": {
        "artifact": "Investor Dashboard v1.0",
        "base": "3 chart'i + 1–2 KPI + 1 filter",
        "advanced": "4+ chart'i, cross-filtering, drill-down"
      },
      "tools": [
        "Power BI Desktop (Track A)",
        "Plotly + Streamlit (Track B)",
        "Supabase (PostgreSQL)",
        "GitHub"
      ],
      "textbooks": {
        "mckinney": "Ch 9: Plotting & Visualization",
        "knaflic": "Ch 5: Think Like a Designer"
      },
      "fourC": "Concepts rõhk (chart types, data-ink ratio)",
      "components": {
        "mentorlus": "Viz põhimõtted + Knaflic",
        "portfoolio": ".pbix / streamlit_app.py",
        "eopik": "McKinney Ch9 + Knaflic Ch5",
        "ekataloog": "2 weekly RAG (viz design)"
      }
    },
    {
      "id": 6,
      "name": "Andmelood – Dashboard",
      "sprint": 3,
      "shuHaRi": "Ha",
      "bloomLevel": "Loomine",
      "character": "Anna + Liis",
      "characterQuote": "Investors buy stories, not spreadsheets. Iga number räägib lugu.",
      "narrativeTitle": "Dashboard Polish + Data Storytelling",
      "emotionalArc": "Dashboard VALMIS! → Kristi: tahab STORYT → Published!",
      "aiLevel": {
        "name": "Suunaja",
        "desc": "Delegeerimine, prompt engineering",
        "pct": 60
      },
      "sessions": {
        "s1": {
          "topic": "Data storytelling framework + executive summary",
          "outcomes": [
            "Story arc (Setup→Conflict→Resolution)",
            "Executive summary"
          ],
          "duration": "90 min"
        },
        "s2": {
          "topic": "Dashboard polish + publishing (jutuvestmise dekomposits.)",
          "outcomes": [
            "Annotations lisatud",
            "Published (PBI Service / Streamlit Cloud)"
          ],
          "duration": "90 min"
        },
        "s3": {
          "topic": "Investor pitch role-play + gallery walk",
          "outcomes": [
            "Gallery walk + hääletamine",
            "Liisi Operations view"
          ],
          "duration": "90 min"
        }
      },
      "selfStudy": {
        "akt": 22,
        "activities": [
          "Dashboard polish",
          "McKinney Ch 9 jätk",
          "Knaflic Ch 6",
          "Deployment"
        ]
      },
      "portfolio": {
        "artifact": "Investor Dashboard v2.0 (published!)",
        "base": "Published URL + executive summary + annotations",
        "advanced": "Multi-audience views, interactive storytelling"
      },
      "tools": [
        "Power BI Service (Track A)",
        "Streamlit Cloud (Track B)",
        "Plotly annotations",
        "Git branching"
      ],
      "textbooks": {
        "mckinney": "Ch 9 jätk",
        "knaflic": "Ch 6: Tell a Story"
      },
      "fourC": "Concrete Practice rõhk (storytelling + publish)",
      "components": {
        "mentorlus": "Data storytelling + Knaflic Ch6",
        "portfoolio": "live URL + data_story.md",
        "eopik": "McKinney Ch9 + Knaflic Ch6",
        "ekataloog": "2 weekly RAG (viz data)"
      }
    },
    {
      "id": 7,
      "name": "Python ja Pandas",
      "sprint": 4,
      "shuHaRi": "Ha→Ri",
      "bloomLevel": "Analüüsimine",
      "character": "Marko",
      "characterQuote": "SQL on foundation. Python on superpower. Ma vajan RFM analüüsi!",
      "narrativeTitle": "Marko Saar – Customer Segmentation",
      "emotionalArc": "Python time! → DataFrames selged! → 245 VIP klienti!",
      "aiLevel": {
        "name": "Suunaja",
        "desc": "Delegeerimine, prompt engineering",
        "pct": 70
      },
      "sessions": {
        "s1": {
          "topic": "Python + Pandas basics, Supabase SDK",
          "outcomes": [
            "DataFrame operations",
            "Supabase → pandas"
          ],
          "duration": "90 min"
        },
        "s2": {
          "topic": "RFM Customer Segmentation (analüüsietapi dekomposits.)",
          "outcomes": [
            "R, F, M arvutatud",
            "Segmendid loodud"
          ],
          "duration": "90 min"
        },
        "s3": {
          "topic": "Demo: Marko tagasiside + RFM visualiseerimine",
          "outcomes": [
            "Marko: GAME CHANGER!",
            "RFM scatter plot"
          ],
          "duration": "90 min"
        }
      },
      "selfStudy": {
        "akt": 22,
        "activities": [
          "Python basics",
          "McKinney Ch 7",
          "Knaflic Ch 7",
          "RFM skript"
        ]
      },
      "portfolio": {
        "artifact": "RFM Customer Segmentation",
        "base": "rfm_analysis.py + CSV + summary",
        "advanced": "Jupyter, weighted scoring, 8 segmenti, Plotly"
      },
      "tools": [
        "Python 3.11+",
        "pandas",
        "Supabase Python SDK",
        "Jupyter",
        "Plotly Express",
        "GitHub"
      ],
      "textbooks": {
        "mckinney": "Ch 7: Data Cleaning",
        "knaflic": "Ch 7: Lessons in Storytelling"
      },
      "fourC": "Connection (SQL limitations → Python solves)",
      "components": {
        "mentorlus": "Python + pandas + RFM loogika",
        "portfoolio": "rfm_analysis.py + rfm_scores.csv",
        "eopik": "McKinney Ch7 + Knaflic Ch7",
        "ekataloog": "2 weekly RAG (Python pandas)"
      }
    },
    {
      "id": 8,
      "name": "Python ja API'd",
      "sprint": 4,
      "shuHaRi": "Ri",
      "bloomLevel": "Loomine",
      "character": "Marko + Toomas",
      "characterQuote": "Production-grade analytics = automated, tested, documented. Saavutatud!",
      "narrativeTitle": "Automatiseerimine – Toomas Usaldab Täielikult",
      "emotionalArc": "API time! → Supabase client töötab! → Pipeline valmis! Toomas: USALDUS!",
      "aiLevel": {
        "name": "Meeskonna tugevdaja",
        "desc": "AI grupitöös",
        "pct": 80
      },
      "sessions": {
        "s1": {
          "topic": "Supabase Python client, REST API, .env",
          "outcomes": [
            "REST API basics",
            "Environment variables"
          ],
          "duration": "90 min"
        },
        "s2": {
          "topic": "Automated data pipeline (andmeallika dekomposits.)",
          "outcomes": [
            "ETL pipeline valmis",
            "Scheduling (cron/GitHub Actions)"
          ],
          "duration": "90 min"
        },
        "s3": {
          "topic": "Demo: Toomas palub IT koolitust",
          "outcomes": [
            "Pipeline demo",
            "Toomas: koolitame meeskonda!"
          ],
          "duration": "90 min"
        }
      },
      "selfStudy": {
        "akt": 22,
        "activities": [
          "API harjutused",
          "McKinney Ch 8",
          "Knaflic Ch 8",
          "Pipeline dokumenteerimine"
        ]
      },
      "portfolio": {
        "artifact": "Automated Data Pipeline",
        "base": "Python: fetch → process → export + .env + logging",
        "advanced": "GitHub Actions, Slack notifications, retry logic"
      },
      "tools": [
        "Python",
        "Supabase REST API",
        "python-dotenv",
        "GitHub Actions",
        "Vercel"
      ],
      "textbooks": {
        "mckinney": "Ch 8: Data Wrangling",
        "knaflic": "Ch 8: Storytelling (jätk)"
      },
      "fourC": "Concrete Practice rõhk (pipeline building)",
      "components": {
        "mentorlus": "API + automatiseerimine + CI/CD",
        "portfoolio": "pipeline.py + .github/workflows/",
        "eopik": "McKinney Ch8 + Knaflic Ch8",
        "ekataloog": "2 weekly RAG (Python APIs)"
      }
    },
    {
      "id": 9,
      "name": "Karjääri Ettevalmistus",
      "sprint": 5,
      "shuHaRi": "Ri",
      "bloomLevel": "Hindamine",
      "character": "KÕIK + Liis",
      "characterQuote": "Aidake mul luua värbamisjuhend. Te TEATE, mida hea analüütik peab oskama.",
      "narrativeTitle": "Liis Koppeli Väljakutse – Värbamisjuhend",
      "emotionalArc": "Liisi üllesanne → Tööandja perspektiiv → Aha: värbamisjuhendis kirjeldasid iseennast!",
      "aiLevel": {
        "name": "Meeskonna tugevdaja",
        "desc": "AI grupitöös",
        "pct": 85
      },
      "sessions": {
        "s1": {
          "topic": "CV, LinkedIn optimeerimine, DA turu ülevaade, tööandja perspektiiv",
          "outcomes": [
            "CV kirjutatud",
            "LinkedIn uuendatud",
            "Turu statistika mõistetud"
          ],
          "duration": "90 min"
        },
        "s2": {
          "topic": "Värbamisjuhend (JAGA-TEE-KOGU-ESITLE, osakonna dekomposits.)",
          "outcomes": [
            "6 meeskonda: tööandja-poolne värbamisjuhend",
            "Liis + kõik tegelased osalevad"
          ],
          "duration": "90 min"
        },
        "s3": {
          "topic": "Aha-moment + privaatne CV/LinkedIn aken",
          "outcomes": [
            "Värbamisjuhend = iseenda kirjeldus!",
            "20 min isiklik CV/LinkedIn töö"
          ],
          "duration": "90 min"
        }
      },
      "selfStudy": {
        "akt": 22,
        "activities": [
          "CV ja kaaskirja kirjutamine",
          "McKinney Ch 10",
          "Knaflic Ch 9",
          "Tööotsing ja kandideerimine"
        ]
      },
      "portfolio": {
        "artifact": "Karjääripakett (CV + LinkedIn + Portfolio)",
        "base": "CV, LinkedIn, GitHub – uuendatud ja korrektsed",
        "advanced": "Medium artikkel, personal website"
      },
      "tools": [
        "LinkedIn",
        "CV builder",
        "GitHub (final polish)",
        "Presentation tools"
      ],
      "textbooks": {
        "mckinney": "Ch 10: Aggregation & Groups",
        "knaflic": "Ch 9: Case Studies"
      },
      "fourC": "Conclusions rõhk (reflekteerimine, süntees)",
      "components": {
        "mentorlus": "Karjääri coaching + tööturu statistika",
        "portfoolio": "CV.pdf + LinkedIn screenshot",
        "eopik": "McKinney Ch10 + Knaflic Ch9",
        "ekataloog": "2 weekly RAG (career HR)"
      }
    },
    {
      "id": 10,
      "name": "Portfoolio Kaitsmine",
      "sprint": 5,
      "shuHaRi": "Ri",
      "bloomLevel": "Loomine",
      "character": "KÕIK (Kristi juhib)",
      "characterQuote": "Te olete DATA-DRIVEN muutuse nägu. Rääkige oma lugu juhatusele!",
      "narrativeTitle": "UrbanStyle Board Meeting + Lõpetamine",
      "emotionalArc": "SHOCK (meie juhatusele?!) → Relay esitlus → Portfolio Fair → Auhinnad!",
      "aiLevel": {
        "name": "Demonstreerija",
        "desc": "Portfoolios: “Kuidas AI meid aitas”",
        "pct": 100
      },
      "sessions": {
        "s1": {
          "topic": "GitHub portfoolio optimeerimine, 5-min pitch struktuur",
          "outcomes": [
            "Profile README poleeritud",
            "Pitch struktuur valmis"
          ],
          "duration": "90 min"
        },
        "s2": {
          "topic": "Board Meeting ettevalmistus (JAGA-TEE-KOGU-ESITLE, relay esitlus)",
          "outcomes": [
            "6 meeskonda harjutavad relay esitlust",
            "Slide deck + visuaalne abi"
          ],
          "duration": "90 min"
        },
        "s3": {
          "topic": "UrbanStyle Board Meeting + Portfolio Fair + Auhinnad",
          "outcomes": [
            "6 x 7 min esitlused",
            "Portfolio Fair (13 min)",
            "6 auhinnakategooriat"
          ],
          "duration": "90 min"
        }
      },
      "selfStudy": {
        "akt": 22,
        "activities": [
          "Portfolio polish",
          "McKinney Ch 11",
          "Knaflic Ch 10",
          "LinkedIn profiili uuendamine"
        ]
      },
      "portfolio": {
        "artifact": "Lõppkaitsmine + poleeritud portfoolio",
        "base": "Profile README, 6+ pinned repos, screenshots",
        "advanced": "Comprehensive final analysis, live demos, custom domain"
      },
      "tools": [
        "GitHub (portfolio polish)",
        "LinkedIn",
        "Presentation tools",
        "Vercel (portfolio site)"
      ],
      "textbooks": {
        "mckinney": "Ch 11: Time Series",
        "knaflic": "Ch 10: Final Thoughts"
      },
      "fourC": "Conclusions rõhk (lõpurefleksioon)",
      "components": {
        "mentorlus": "Pitch coaching + lõputagasiside",
        "portfoolio": "Lõppkaitsmine + GitHub Profile",
        "eopik": "McKinney Ch11 + Knaflic Ch10",
        "ekataloog": "2 weekly RAG (portfolio defense)"
      }
    }
  ],
  "totals": {
    "contactPerWeek": 6,
    "contactTotal": 66,
    "selfStudyTotal": 246,
    "grandTotal": 312,
    "eap": 13,
    "hours": 234
  },
  "characters": [
    {
      "name": "Toomas Kask",
      "role": "IT Director",
      "weeks": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        8
      ],
      "primary": [
        0,
        1,
        2
      ],
      "color": "#3B82F6"
    },
    {
      "name": "Anna Mets",
      "role": "Marketing Lead",
      "weeks": [
        3,
        4,
        5,
        6,
        7,
        8
      ],
      "primary": [
        3,
        4,
        5,
        6
      ],
      "color": "#F59E0B"
    },
    {
      "name": "Kristi Tamm",
      "role": "CEO & Co-Founder",
      "weeks": [
        0,
        5,
        6,
        9,
        10
      ],
      "primary": [
        5,
        6,
        9,
        10
      ],
      "color": "#EF4444"
    },
    {
      "name": "Marko Saar",
      "role": "Product Manager",
      "weeks": [
        7,
        8,
        9,
        10
      ],
      "primary": [
        7,
        8
      ],
      "color": "#10B981"
    },
    {
      "name": "Liis Koppel",
      "role": "Operations Manager",
      "weeks": [
        4,
        6,
        9,
        10
      ],
      "primary": [
        9
      ],
      "color": "#8B5CF6"
    }
  ],
  "googleEStudy": [
    {
      "weekId": 0,
      "course": "Course 1",
      "title": "Foundations: Data, Data, Everywhere",
      "modules": "Modules 1–4",
      "hours": "~10h",
      "focus": "Mis on andmeanalüütika, analüütiku roll, analüütiline mõtlemine",
      "alignment": "DA rolli tutvustus, turu ülevaade"
    },
    {
      "weekId": 1,
      "course": "Course 2",
      "title": "Ask Questions to Make Data-Driven Decisions",
      "modules": "Modules 1–2",
      "hours": "~10h",
      "focus": "Efektiivsed küsimused, andmepõhised otsused, töölehed",
      "alignment": "SQL põhitõed, andmete uurimine"
    },
    {
      "weekId": 2,
      "course": "Course 2–3",
      "title": "Ask Questions (lõpp) + Prepare Data",
      "modules": "C2 Mod 3–4, C3 Mod 1–2",
      "hours": "~10h",
      "focus": "Andmete ettevalmistamine, andmekvaliteet, metaandmed",
      "alignment": "DELETE/UPDATE, andmete puhastamine"
    },
    {
      "weekId": 3,
      "course": "Course 3–4",
      "title": "Prepare Data (lõpp) + Process Data",
      "modules": "C3 Mod 3–5, C4 Mod 1–2",
      "hours": "~10h",
      "focus": "Andmebaasid, SQL funktsioonid, andmete töötlus",
      "alignment": "JOIN-id, mitu tabelit, andmekvaliteet"
    },
    {
      "weekId": 4,
      "course": "Course 4–5",
      "title": "Process Data (lõpp) + Analyze Data",
      "modules": "C4 Mod 3–6, C5 Mod 1–2",
      "hours": "~10h",
      "focus": "Andmete valideerimine, sorteerimine, filtreerimine, SQL funktsioonid",
      "alignment": "GROUP BY, agregatsioon, CTE, KPI-d"
    },
    {
      "weekId": 5,
      "course": "Course 5–6",
      "title": "Analyze Data (lõpp) + Visualization",
      "modules": "C5 Mod 3–4, C6 Mod 1–2",
      "hours": "~10h",
      "focus": "Andmete analüüs, visualiseerimise põhimõtted, Tableau",
      "alignment": "Dashboard disain, viz põhimõtted"
    },
    {
      "weekId": 6,
      "course": "Course 6",
      "title": "Share Data Through Art of Visualization",
      "modules": "Modules 3–4",
      "hours": "~10h",
      "focus": "Esitlused, data storytelling, publikuga suhtlemine",
      "alignment": "Data storytelling, executive summary"
    },
    {
      "weekId": 7,
      "course": "Course 7",
      "title": "Introduction to Data Analysis Using Python",
      "modules": "Modules 1–2",
      "hours": "~10h",
      "focus": "Python alused, süntaks, tsyklid, andmestruktuurid",
      "alignment": "Python + pandas, DataFrame operatsioonid"
    },
    {
      "weekId": 8,
      "course": "Course 7–8",
      "title": "Python (lõpp) + Capstone",
      "modules": "C7 Mod 3–4, C8 Mod 1",
      "hours": "~10h",
      "focus": "pandas/NumPy, juhtumiuuring, portfoolio projekt",
      "alignment": "API-d, automatiseerimine, pipeline"
    },
    {
      "weekId": 9,
      "course": "Course 8–9",
      "title": "Capstone (lõpp) + Job Search with AI",
      "modules": "C8 Mod 2–4, C9 Mod 1–2",
      "hours": "~10h",
      "focus": "Juhtumiuuringu esitlemine, CV, LinkedIn, AI tööriist",
      "alignment": "CV, LinkedIn, karjääri ettevalmistus"
    },
    {
      "weekId": 10,
      "course": "Course 9",
      "title": "Accelerate Your Job Search with AI (lõpp)",
      "modules": "Modules 3–4",
      "hours": "~6h",
      "focus": "Intervjuuks valmistumine, sertifikaat, badge",
      "alignment": "Portfoolio kaitsmine, sertifikaadi saamine"
    }
  ]
};
