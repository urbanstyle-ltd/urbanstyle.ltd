# UrbanStyle.ltd — Claude Code Configuration

## PROJECT OVERVIEW

This is the **urbanstyle.ltd** website — a fictional Estonian streetwear brand website serving as an immersive simulation for the DACA (Andmeanalüütiku Karjäärikiirendi) data analytics training program.

**The website has TWO audiences:**
1. **Active DACA participants** — immersive company experience during 11-week training
2. **Potential future participants** — conversion funnel: urbanstyle.ltd → /strateegia → ettevotluskeskus.ee/daca

## CRITICAL RULES

### 1. UrbanStyle is NOT a Real Company
- **NEVER use "UrbanStyle OÜ"** — OÜ implies legal registration. Just use "UrbanStyle"
- **NEVER use real Estonian addresses** for UrbanStyle locations
- UrbanStyle is a **fictional simulation company** — this must be clear in legal/footer but NOT prominent
- The simulation disclosure appears ONLY in the footer (small, muted) and on the /legal page

### 2. The Real Organization
- **Ettevõtluskeskus OÜ** is the real company behind the DACA program
- Address: Liivalaia 13, Tallinn, Estonia
- Website: ettevotluskeskus.ee
- The conversion funnel: urbanstyle.ltd/strateegia → ettevotluskeskus.ee/daca

### 3. Fictional Addresses (UrbanStyle stores)
These are intentionally fictional — do NOT replace with real addresses:

| Store | Address |
|-------|---------|
| Tallinn (HQ + Flagship) | Tormilinna 4, 10145 Tallinn |
| Tartu | Jaamapõllu 12, 51008 Tartu |
| Pärnu | Päikesekalda 7, 80032 Pärnu |

### 4. Estonian Characters (öäüõ)
- Always use proper Estonian diacritics: ö, ä, ü, õ, š, ž
- In English translations, Estonian proper nouns keep their diacritics: "Pärnu" not "Parnu", "Tallinn" not "Talinn"
- Exception: URL slugs use ASCII (e.g., `/parnu` not `/pärnu`)

### 5. Content Language
- All hardcoded text in .tsx files MUST go through i18n (next-intl)
- Default locale: Estonian (et)
- Supported: et, en, ru
- Never hardcode UI text in English in components

## COMPANY NARRATIVE (Canonical)

### Brand
- **Name:** UrbanStyle (no suffix, no OÜ)
- **Domain:** urbanstyle.ltd
- **Founded:** 2020 in Tallinn
- **Positioning:** Premium accessible Estonian urban streetwear
- **Essence:** "Tallinn street culture refined through Scandinavian clarity"
- **Employees:** ~45
- **Revenue model:** Direct-to-consumer streetwear (physical stores + e-commerce)
- **Products:** ~350 SKUs across 8 categories

### Timeline
| Year | Event |
|------|-------|
| 2020 | Founded in Tallinn by Kristi Tamm |
| 2021 | First pop-up store, initial collection |
| 2022 | E-commerce launch, expanded to Tartu |
| 2023 | Pärnu store, 350+ products |
| 2025 | Data-driven digital transformation begins (DACA program) |

**IMPORTANT:** The data-driven transformation begins in **2025** (when DACA participants start working with the company). Do NOT use 2024.

### Team (5 Key Personas)
| Name | Role | Age | Key Trait |
|------|------|-----|-----------|
| **Kristi Tamm** | CEO | 38 | Visionary, founded the brand, architecture background |
| **Toomas Kask** | IT Director | 42 | Pragmatic, data infrastructure, skeptical of AI hype |
| **Anna Mets** | Marketing Lead | 31 | Creative, social media native, data-curious |
| **Marko Saar** | Product Manager | 29 | Detail-oriented, quality obsessed, youngest team member |
| **Liis Koppel** | Operations Manager | 34 | Efficiency-driven, supply chain, process optimizer |

**NEVER** use email addresses for these characters (e.g., no kristi@urbanstyle.ltd).
These are fictional personas — formats that look like real contact info must be avoided.

### Products (8 Categories)
1. **Denim Jacket** — Hero product, signature piece
2. **Hoodie** — Sage green, embroidered logo
3. **Graphic Tees** — 4 designs (Tallinn skyline, abstract, typography, minimal)
4. **Joggers** — Charcoal, technical fabric
5. **Crossbody Bag** — Leather + canvas
6. **Beanie & Cap** — Accessories duo
7. **Tech Parka** — Premium outerwear
8. **Sneakers** — Collab piece

### Brand Design Tokens
| Token | Hex | Role |
|-------|-----|------|
| Charcoal | #2C2C2C | Primary text, dark backgrounds |
| Off-White | #F5F0EB | Backgrounds, light areas |
| Limestone | #D4CDC4 | Secondary neutral |
| Burnt Orange | #C4622D | CTA, energy accent (10% max) |
| Sage | #7A8B6F | Nature, sustainability |
| Slate Blue | #4A6274 | Trust, depth |
| Dusty Rose | #C4A08A | Warmth, softness |

## TECH STACK

- **Framework:** Next.js 15, App Router, TypeScript
- **Styling:** Tailwind CSS v4 with @theme design tokens
- **i18n:** next-intl (et/en/ru) with localized URL paths
- **Animation:** Framer Motion 12
- **Images:** Firebase Storage CDN (europe-north1) + sharp processing pipeline
- **Deployment:** Vercel (Stockholm region arn1)
- **Fonts:** Inter (body), JetBrains Mono (data/prices)

## IMAGE PIPELINE

### Firebase Storage Structure
```
gs://urbanstyle-ltd.firebasestorage.app/
└── images/v1/
    ├── products/   (WebP + AVIF + PNG OG, 4 sizes each)
    └── personas/   (WebP + AVIF + PNG OG, 3 sizes each)
```

### Image Access Pattern
```typescript
import { images, getImageUrl } from '@/data/images';
// Get URL: getImageUrl(images.product_1a_denim_hero.variants.md)
```

### Adding New Images
```bash
# 1. Add source PNGs to public/images/{category}/
# 2. Process: npm run images:process
# 3. Upload: GOOGLE_APPLICATION_CREDENTIALS=./service-account.json npm run images:upload
```

## DACA PROGRAM CONTEXT

The DACA (Andmeanalüütiku Karjäärikiirendi) is an 11-week (W0-W10) data analytics training program organized by **Ettevõtluskeskus OÜ**. UrbanStyle serves as the simulation company throughout the program.

### How UrbanStyle Fits in DACA
- Participants act as data analysts/consultants for UrbanStyle
- Each week covers a different PM/analytics topic using UrbanStyle as case study
- The website makes the simulation feel real and immersive
- The /strateegia page bridges from "company website" to "join the training program"

### Canonical Reference (DACA repo)
Full program details, character bibles, and narrative arcs are in:
`/Users/ak/GitHub/DACA-andmeanaluutiku-karjaarikiirendi/`

Key reference files:
- `A-Annexe/Strategy/A_S_10_urbanstyle_ltd_website_specification-internal_v1.0.md` — Full website spec
- `A-Annexe/Strategy/A_S_8_urbanstyle_brand_identity_prompts-internal_v1.0.md` — Brand identity
- `A-Annexe/Strategy/A_S_6_urbanstyle_product_imagery_prompts-internal_v1.0.md` — Product prompts
- `A-Annexe/Strategy/A_S_7_urbanstyle_persona_imagery_prompts-internal_v1.0.md` — Persona prompts

## FILE ORGANIZATION

```
src/
├── app/[locale]/          # Pages (et/en/ru routing)
├── components/
│   ├── layout/            # Header, Footer, LanguageSwitcher
│   ├── ui/                # Reusable UI components
│   └── sections/          # Page sections (Hero, ProductGrid, etc.)
├── data/                  # Product catalog, image manifest
├── i18n/                  # Internationalization config
└── lib/                   # Utilities, helpers
messages/                  # Translation JSON files (et/en/ru)
scripts/                   # Image processing, upload, utilities
public/                    # Static assets (robots.txt, llms.txt, favicon)
```

## CONVENTIONS

- **No README.md creation** unless explicitly asked
- **No "OÜ"** anywhere in the codebase
- **All UI text through i18n** — no hardcoded strings in components
- **Images from Firebase CDN** — never serve large images from public/
- **Estonian diacritics preserved** in all languages when referring to Estonian proper nouns
- **Commit often** with descriptive messages
- **Mobile-first** responsive design
