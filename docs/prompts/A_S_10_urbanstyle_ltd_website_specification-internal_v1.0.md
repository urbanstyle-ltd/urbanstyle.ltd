# urbanstyle.ltd — Website Specification v1.0

**Client:** UrbanStyle OÜ (simulatsiooniettevõte)
**Domain:** urbanstyle.ltd
**Deployment:** Vercel
**Repo:** github.com/urbanstyle-ltd/urbanstyle.ltd
**Author:** Ettevõtluskeskus OÜ / Alek Kozlov
**Date:** 2026-03-15

---

## 1. STRATEGIC CONTEXT

### 1.1 Dual Purpose

The website serves TWO audiences simultaneously:

| Audience | Experience | Goal |
|----------|-----------|------|
| **DACA osalejad** (aktiivsed) | Tõelähedane ettevõtte veeb, mida nad "uurivad" programmi raames | Immersion, simulatsiooni usutavus |
| **Potentsiaalsed osalejad** (tulevased) | Muljetavaldav ettevõtte veeb, mis demonstreerib andmeanalüüsi rolli | Huvi DACA programmi vastu, konversioon |

### 1.2 Strategic Funnel

```
urbanstyle.ltd (brand/product experience)
    ↓
"Andmed ja AI meie strateegias" (sisuleht)
    ↓
"Meie analüütikute programm" (soft CTA)
    ↓
ettevotluskeskus.ee/daca (landing page → registreerimine)
```

The transition from "company website" to "training program" must feel ORGANIC, not promotional. The visitor discovers that UrbanStyle invested in data literacy through a structured program — and that program is open for the next cohort.

### 1.3 Tone Principle

**The website IS UrbanStyle.** It does not DESCRIBE a simulation. Visitors experience a real company. The simulation disclosure lives only in legal/footer, never in primary content.

---

## 2. TECH STACK

### 2.1 Framework & Build

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js 15 (App Router) | SSR/SSG hybrid, best Vercel integration, React Server Components |
| **Language** | TypeScript 5.x | Type safety, DX |
| **Styling** | Tailwind CSS v4 | Utility-first, matches brand system, zero runtime |
| **Animation** | Framer Motion 12 | Scroll-triggered, page transitions, micro-interactions |
| **i18n** | next-intl | App Router native, SSG-compatible, type-safe message keys |
| **CMS/Content** | MDX + contentlayer2 | Git-based, markdown for content, type-safe |
| **Images** | next/image + Vercel Image Optimization | WebP/AVIF auto, responsive srcset, blur placeholders |
| **Icons** | Lucide React | Consistent, tree-shakeable |
| **Font loading** | next/font/local | Self-hosted PP Neue Montreal + Inter, zero CLS |
| **Analytics** | Vercel Analytics + Plausible | Privacy-first, GDPR compliant, no cookies |
| **Forms** | React Hook Form + Zod | Validation, type-safe |
| **Deployment** | Vercel Pro | Edge functions, ISR, image optimization, analytics |

### 2.2 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 98+ |
| LCP (Largest Contentful Paint) | < 1.2s |
| FID (First Input Delay) | < 50ms |
| CLS (Cumulative Layout Shift) | < 0.05 |
| TTFB (Time to First Byte) | < 200ms (Edge) |
| Bundle size (first load JS) | < 80kB |
| Image format | WebP/AVIF auto-negotiation |

### 2.3 Project Structure

```
urbanstyle.ltd/
├── public/
│   ├── images/
│   │   ├── products/          # Product photography
│   │   ├── team/              # Persona headshots & office shots
│   │   ├── lifestyle/         # Lifestyle/campaign photography
│   │   ├── brand/             # Logo, patterns, icons
│   │   └── og/                # Social sharing images
│   ├── fonts/                 # PP Neue Montreal, Inter (self-hosted)
│   ├── robots.txt
│   ├── sitemap.xml            # Auto-generated
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── [locale]/          # i18n routing
│   │   │   ├── layout.tsx     # Root layout with locale
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── tooted/        # Products (collection + PDP)
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── meist/         # About Us (team, story)
│   │   │   │   └── page.tsx
│   │   │   ├── strateegia/    # Data & AI strategy page
│   │   │   │   └── page.tsx
│   │   │   ├── kontakt/       # Contact
│   │   │   │   └── page.tsx
│   │   │   └── legal/         # Legal pages
│   │   │       ├── privaatsus/page.tsx
│   │   │       ├── kasutustingimused/page.tsx
│   │   │       └── programm/page.tsx
│   │   ├── api/
│   │   │   └── og/route.tsx   # Dynamic OG image generation
│   │   ├── not-found.tsx
│   │   └── sitemap.ts         # Dynamic sitemap
│   ├── components/
│   │   ├── layout/            # Header, Footer, Navigation
│   │   ├── sections/          # Homepage sections
│   │   ├── product/           # Product card, gallery, grid
│   │   ├── team/              # Team grid, member card
│   │   ├── ui/                # Button, Badge, Card, etc.
│   │   └── seo/               # JsonLd, Meta, Breadcrumbs
│   ├── content/
│   │   ├── products/          # MDX product descriptions
│   │   ├── team/              # MDX team member bios
│   │   └── pages/             # MDX page content
│   ├── i18n/
│   │   ├── messages/
│   │   │   ├── et.json        # Estonian
│   │   │   ├── en.json        # English
│   │   │   └── ru.json        # Russian
│   │   ├── request.ts
│   │   └── routing.ts
│   ├── lib/
│   │   ├── fonts.ts           # Font configuration
│   │   ├── metadata.ts        # SEO metadata helpers
│   │   └── constants.ts       # Brand colors, config
│   └── styles/
│       └── globals.css        # Tailwind base + custom properties
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 3. i18n — MULTILINGUAL ARCHITECTURE

### 3.1 Supported Languages

| Code | Language | URL pattern | Default |
|------|----------|-------------|---------|
| `et` | Eesti keel | `urbanstyle.ltd/et/...` | Yes (redirect from `/`) |
| `en` | English | `urbanstyle.ltd/en/...` | — |
| `ru` | Русский | `urbanstyle.ltd/ru/...` | — |

### 3.2 URL Structure by Locale

| Page | ET | EN | RU |
|------|----|----|-----|
| Home | `/et` | `/en` | `/ru` |
| Products | `/et/tooted` | `/en/products` | `/ru/produkty` |
| Product Detail | `/et/tooted/[slug]` | `/en/products/[slug]` | `/ru/produkty/[slug]` |
| About | `/et/meist` | `/en/about` | `/ru/o-nas` |
| Strategy | `/et/strateegia` | `/en/strategy` | `/ru/strategiya` |
| Contact | `/et/kontakt` | `/en/contact` | `/ru/kontakty` |
| Privacy | `/et/legal/privaatsus` | `/en/legal/privacy` | `/ru/legal/konfidentsialnost` |

### 3.3 Implementation: next-intl

```typescript
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['et', 'en', 'ru'],
  defaultLocale: 'et',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/tooted': { et: '/tooted', en: '/products', ru: '/produkty' },
    '/tooted/[slug]': { et: '/tooted/[slug]', en: '/products/[slug]', ru: '/produkty/[slug]' },
    '/meist': { et: '/meist', en: '/about', ru: '/o-nas' },
    '/strateegia': { et: '/strateegia', en: '/strategy', ru: '/strategiya' },
    '/kontakt': { et: '/kontakt', en: '/contact', ru: '/kontakty' },
  }
});
```

### 3.4 Language Switcher

- Persistent position: Header right, before mobile menu
- Shows: `ET | EN | RU` as minimal text links
- Active language: bold, accent underline
- Switching preserves current page (hreflang-mapped)
- Language preference stored in cookie (1 year)

### 3.5 hreflang Tags (Auto-generated)

```html
<link rel="alternate" hreflang="et" href="https://urbanstyle.ltd/et/tooted" />
<link rel="alternate" hreflang="en" href="https://urbanstyle.ltd/en/products" />
<link rel="alternate" hreflang="ru" href="https://urbanstyle.ltd/ru/produkty" />
<link rel="alternate" hreflang="x-default" href="https://urbanstyle.ltd/et/tooted" />
```

---

## 4. PAGE ARCHITECTURE & CONTENT

### 4.1 SITEMAP OVERVIEW

```
HOME (/)
├── TOOTED (/tooted)
│   ├── Signature Denim Jacket (/tooted/signature-denim-jacket)
│   ├── Heavyweight Hoodie Collection (/tooted/heavyweight-hoodie)
│   ├── Graphic Tee Series (/tooted/graphic-tee-series)
│   ├── Urban Joggers (/tooted/urban-joggers)
│   ├── Tech Parka (/tooted/tech-parka)
│   ├── Urban Runner Sneakers (/tooted/urban-runner)
│   ├── Crossbody Bag (/tooted/crossbody-bag)
│   └── Accessories (/tooted/aksessuaarid)
├── MEIST (/meist)
├── STRATEEGIA (/strateegia)  ← KEY FUNNEL PAGE
├── KONTAKT (/kontakt)
└── LEGAL
    ├── Privaatsuspoliitika (/legal/privaatsus)
    ├── Kasutustingimused (/legal/kasutustingimused)
    └── Programmi info (/legal/programm)  ← SIMULATION DISCLOSURE
```

---

### 4.2 PAGE: HOME (`/`)

**Purpose:** Brand immersion, product showcase, emotional hook
**Hero type:** Full-bleed lifestyle image with parallax

#### Sections (scroll order):

**1. HERO — Full Viewport**
```
Layout: Full-bleed 100vh
Image: 16:9 lifestyle hero (model in denim jacket, Tallinn Rotermann)
Overlay: Gradient from charcoal-bottom (60% opacity)
Content (lower-left):
  - H1: "Tallinna tänavakultuuri uus peatükk" (ET)
        "The new chapter of Tallinn street culture" (EN)
        "Новая глава уличной культуры Таллинна" (RU)
  - Subtitle: "Premium urban streetwear · Est. 2020"
  - CTA button: "Avasta kollektsiooni →" (burnt orange, rounded)
Navigation: Transparent, white text, becomes solid charcoal on scroll
Animation: Subtle parallax on hero image, fade-in text
```

**2. BRAND STATEMENT — Clean text block**
```
Layout: Centered text, max-w-3xl, generous padding (py-24)
Background: Off-white
Content:
  "Me ei müü riideid. Me loome tööriistu linnatänavaks —
  iga ese on läbi mõeldud, et kesta ja eristuda."
Typography: PP Neue Montreal, 36px, charcoal, leading-relaxed
Animation: Fade-up on scroll
```

**3. FEATURED PRODUCTS — 3-column grid**
```
Layout: 3-col grid (desktop), 1-col scroll (mobile)
Background: Off-white
Cards: 3:4 product images, rounded-12px, subtle shadow on hover
  - Image with scale(1.02) hover
  - Product name (PP Neue Montreal, Medium)
  - Price (JetBrains Mono)
  - "Vaata lähemalt →" link
Products shown: Denim Jacket, Sage Hoodie, Graphic Tee (hero three)
Below grid: "Kõik tooted →" link (charcoal text, arrow)
Animation: Staggered fade-in, 100ms delay between cards
```

**4. LOOKBOOK STRIP — Full-bleed parallax**
```
Layout: Full-width, 60vh height
Image: 16:9 lifestyle group shot or campaign image
Parallax: Background-attachment fixed (CSS) or Framer scroll
Overlay: Subtle vignette
Content: None (pure visual break) or minimal text "AW 2026"
```

**5. PRODUCT HIGHLIGHTS — Alternating layout**
```
Layout: Two rows, alternating image-left/image-right
Row 1: Large product image (left 60%) + text block (right 40%)
  - "Signature Denim Jacket"
  - 2-3 lines describing quality, selvedge, Tallinn inspiration
  - "€189" + "Vaata →" button
Row 2: Text block (left 40%) + large product image (right 60%)
  - "Heavyweight Hoodie"
  - Description + price + CTA
Animation: Slide-in from respective sides on scroll
```

**6. DATA & STRATEGY TEASER — Dark section**
```
Layout: Full-width, charcoal background
Content (centered):
  Eyebrow: "STRATEEGILINE SUUND"
  H2: "Andmepõhine mõtlemine igas otsuses"
  Body: "UrbanStyle'i kasv 150% kahe aastaga ei ole juhus.
  Iga toode, kampaania ja laootsus põhineb andmetel —
  ja meie meeskond areneb pidevalt."
  CTA: "Loe meie strateegiast →" (burnt orange outline button)
Background accent: Subtle data dot matrix pattern (very low opacity)
Animation: Counter animation for "150%" on scroll into view
```

**7. TEAM PREVIEW — Horizontal scroll**
```
Layout: Horizontal card scroll (mobile-native, desktop grid)
Background: Off-white
Cards: 5 team members, circular portrait + name + role
  Hover: Card expands slightly, shows one-line quote in italic
CTA: "Tutvu meeskonnaga →"
Animation: Staggered reveal
```

**8. INSTAGRAM / SOCIAL — Grid**
```
Layout: 4x2 grid of lifestyle images (no API, static curated)
Background: Off-white
Images: Mix of product and lifestyle shots, 1:1
Hover: Subtle overlay with heart icon
CTA: "@urbanstyle.ltd" link
```

**9. NEWSLETTER — Minimal CTA**
```
Layout: Centered, max-w-xl
Background: Limestone
Content:
  H3: "Ole esimene, kes teada saab"
  Body: "Uued kollektsioonid, sündmused ja kulissidetagused."
  Form: Email input + "Liitu →" button (burnt orange)
  Small: "Me ei jaga sinu andmeid. Kunagi."
```

**10. FOOTER**
```
Background: Charcoal
Layout: 4-column grid
Col 1: UrbanStyle logo (white) + "Tallinn · Est. 2020" + social icons
Col 2: Tooted (links to each product category)
Col 3: Ettevõte — Meist, Strateegia, Kontakt, Karjäär (→ no career page, link to /strateegia)
Col 4: Info — Kasutustingimused, Privaatsus, Programmi info
Bottom bar:
  "© 2026 UrbanStyle OÜ · Tallinn, Estonia"
  Language switcher: ET | EN | RU
  "Simulatsiooniettevõte · Ettevõtluskeskus OÜ programm" (small, muted gray)
```

---

### 4.3 PAGE: TOOTED (`/tooted`)

**Purpose:** Product catalog, e-commerce feel without cart

#### Layout:
```
HERO: Slim banner (30vh), texture strip background
  H1: "Kollektsioon"
  Subtitle: "Premium urban streetwear, disainitud Tallinnas"

FILTER BAR (sticky):
  Categories: Kõik | Riided | Aksessuaarid | Jalatsid
  (simple pill buttons, no complex filtering)

PRODUCT GRID:
  Desktop: 3-column, 3:4 cards
  Tablet: 2-column
  Mobile: 1-column (full-width cards)

  Each card:
  - 3:4 image (hover: secondary image crossfade)
  - Product name
  - Price (JetBrains Mono)
  - Color dots (available colors)
  - Quick view: detail shots appear on hover/click (lightbox)
```

---

### 4.4 PAGE: PRODUCT DETAIL (`/tooted/[slug]`)

**Purpose:** Product deep-dive, quality storytelling, detail gallery

#### Layout:
```
TOP SECTION (2-column):
  LEFT (55%): Image gallery
    - Main image (large, zoomable on click)
    - Thumbnail strip below (4-6 images: hero, details, lifestyle, flat lay)
    - Swipe on mobile
  RIGHT (45%): Product info
    - Breadcrumb: Tooted / Signature Denim Jacket
    - H1: Product name
    - Price: "€189" (JetBrains Mono, large)
    - Short description (2-3 sentences)
    - Color selector (visual dots)
    - Size guide link (modal)
    - Material & care (expandable accordion)
    - "Küsi lisainfot →" button (instead of Add to Cart)

STORY SECTION:
  Full-width image (lifestyle) + text overlay
  "14oz Jaapani selvedge denim. Messingist YKK nööbid.
  Punane satiinvooder geomeetrilise mustriga.
  Iga detail on valitud."

DETAIL GALLERY:
  Horizontal scroll of detail close-ups
  (stitching, buttons, lining, back panel)
  Captions under each image

RELATED PRODUCTS:
  "Sobi kokku" — 3 complementary products as cards
```

---

### 4.5 PAGE: MEIST (`/meist`)

**Purpose:** Team introduction, company story, brand credibility

#### Sections:

**1. HERO**
```
Image: 21:9 team group banner
Overlay text:
  H1: "Kes me oleme"
  Subtitle: "45 inimest, 3 linna, 1 missioon"
```

**2. COMPANY STORY**
```
Layout: Timeline / alternating blocks
2020: "Kristi ja tema visioon — Tallinna tänavamoodi uus hääl"
2021: "Esimene pood Rotermann kvartalis"
2022: "Tartu ja Pärnu laienemised, 150% kasv"
2023: "Andmepõhise kultuuri algus"
2024: "3M€ käive, 45 töötajat, 350+ toodet"
Each milestone: Year + photo + short text
```

**3. MEESKOND — Team Grid**
```
Layout: 5-card grid (desktop), 2-col (tablet), 1-col (mobile)
Card: 3:4 headshot + name + role + one-liner quote
Hover: Card flips or expands with:
  - Longer bio (3-4 sentences)
  - MBTI badge (small, subtle)
  - "Vastutusala" list (3 bullet points)

KRISTI TAMM — Tegevjuht
  "Ma ei tee otsuseid tunde pealt — ainult andmete põhjal."
  Bio: Ettevõtte asutaja ja visionäär...

TOOMAS KASK — IT Direktor
  "Kui see pole dokumenteeritud, siis seda ei juhtunud."
  Bio: 18 aastat IT kogemust...

ANNA METS — Turunduse juht
  "Iga number räägib lugu — aga lugu müüb."
  Bio: Loov digiturundaja...

MARKO SAAR — Tootejuht
  "Ma ei usu arvamusi. Ma usun andmeid."
  Bio: Analüütiline tootejuht...

LIIS KOPPEL — Operatsioonijuht
  "Andmed on head, aga kas poemüüja saab sellest aru?"
  Bio: 10+ aastat jaemüügis...
```

**4. VALUES**
```
Layout: 3-column icon blocks
Values:
  KVALITEET — "Iga õmblus loeb"
  LOKAALSUS — "Disainitud Tallinnas, inspireeritud tänavalt"
  ANDMED — "Iga otsus põhineb faktidel, mitte tundel"
```

---

### 4.6 PAGE: STRATEEGIA (`/strateegia`) — KEY FUNNEL PAGE

**Purpose:** THIS is the conversion bridge. Shows how data/AI is strategic for UrbanStyle, then soft-introduces the training program.

**SEO target:** "andmeanalüüs ettevõttes", "AI strateegia e-kaubandus", "andmepõhine juhtimine"

#### Sections:

**1. HERO**
```
Image: Dark atmospheric shot, Tallinn at night, data visualization overlay
H1: "Andmed on meie strateegiline eelis"
Subtitle: "Kuidas UrbanStyle muutis andmed ja AI oma peamiseks konkurentsieeliseks"
```

**2. THE PROBLEM — Before Data**
```
Layout: Dark background, red/orange accent
H2: "2022: Otsused põhinesid tundel"
Content (3-column problem cards):
  ❌ 5000+ duplikaatset müügirida — keegi ei teadnud tegelikku käivet
  ❌ 3 erinevat süsteemi — kliendiinfo oli hajutatud
  ❌ Turunduse ROI oli tundmatu — "Kas Instagram või Facebook?"
  ❌ Laosaldo ei klappinud — Tartu poes oli -40 lahknevust

Quote: Kristi headshot + "Me tegime otsuseid tundel, mitte faktidel.
See pidi muutuma." — Kristi Tamm, CEO
```

**3. THE TRANSFORMATION — Data Culture**
```
Layout: Light background, teal/green accents
H2: "Meie andmeteekond"
Content: Visual journey / roadmap

PHASE 1: Andmete korrastamine
  - SQL-põhine andmepuhastus
  - 5000 duplikaati eemaldatud
  - Ühtne andmebaas Supabase'is
  → Toomas Kask: "Iga samm dokumenteeritud. See on professionaalne standard."

PHASE 2: Analüüsi võimekus
  - TOP 20 klientide identifitseerimine (JOINs)
  - Turunduskanalite ROI mõõtmine
  - Varude audit: lahknevuste leidmine
  → Anna Mets: "Lõpuks teame, et TOP klient tuleb Google Ads'ist!"

PHASE 3: Visualiseerimine ja storytelling
  - Investorite dashboard (Power BI / Streamlit)
  - Reaalajas KPI-d
  - Data storytelling framework
  → Kristi: "Investorid ei taha numbreid — nad tahavad LUGU."

PHASE 4: Python ja automatiseerimine
  - RFM kliendisegmenteerimine (245 VIP klienti!)
  - Automated data pipeline
  - API-põhine andmevoog
  → Marko Saar: "SQL on foundation. Python on superpower."

PHASE 5: AI integratsioon
  - NotebookLM teadmiste haldamiseks
  - AI-toetatud koodigenereerimine
  - Promptide inseneeria turunduses
  - Automaatsed aruanded
  → "AI ei asenda analüütikut — AI võimendab analüütikut."
```

**4. AI ROLE — Strategic AI Integration**
```
Layout: Charcoal background, accent cards
H2: "AI meie igapäevas"

Cards (4):
  🔍 ANALÜÜS: "AI aitab leida mustreid, mida inimsilm ei märka"
  📊 ARUANDLUS: "Automaatsed nädalaaruanded juhtkonnale"
  💬 TURUNDUS: "AI-genereeritud A/B testid ja sisuloome"
  📦 LOGISTIKA: "Nõudluse prognoosimine ML mudelitega"

Quote: "Me ei küsi, kas kasutada AI-d. Me küsime, kuidas kasutada AI-d VASTUTUSTUNDLIKULT."
```

**5. RESULTS — Impact Numbers**
```
Layout: Big numbers, animated counters on scroll
Background: Off-white

  150%    kasv 2 aastaga
  3M€     aastakäive 2024
  245     VIP klienti identifitseeritud
  40+     lao lahknevust avastatud ja parandatud
  3.2x    turunduse ROI Facebook'is
  85%     otsustest nüüd andmepõhised

Source line: "Numbrid põhinevad UrbanStyle OÜ 2024. aasta andmetel"
```

**6. THE PROGRAM — Soft CTA (Conversion Section)**
```
Layout: Warm gradient background (limestone → off-white)
H2: "Kuidas me siia jõudsime?"

Body:
"2023. aastal otsustasime, et andmepädevus ei ole ainult IT osakonna
teema — see on kogu ettevõtte kompetents. Koostöös Ettevõtluskeskus OÜ-ga
lõime struktureeritud koolitusprogrammi, kus meie meeskonnaliikmed
õppisid SQL-i, andmevisualiseerimist, Python'it ja AI-tööriistade
kasutamist reaalsete UrbanStyle'i andmetega.

Programm oli nii edukas, et nüüd avame selle ka välistele osalejatele.
Järgmine grupp alustab peagi."

TEAM TESTIMONIALS (2-3 cards):
  Liis Koppel: "Ma ei uskunud, et laoprobleemid on SQL päringuga lahendatavad.
  Nüüd teen seda iga nädal."

  Anna Mets: "Enne oli turunduse ROI tundmatu. Nüüd tean täpselt,
  et Google Ads toob 3.2x ja Instagram 1.8x."

CTA Block:
  H3: "Soovid aidata oma organisatsioonil muutuda andmepõhiseks?"
  Body: "DACA — Andmeanalüütiku Karjäärikiirendi programm on avatud."
  Button: "Tutvu programmiga →" → ettevotluskeskus.ee/daca
  Small: "Ettevõtluskeskus OÜ · Töötukassa koolituskaart aktsepteeritud"
```

**7. FAQ — Strategy-related**
```
Expandable accordion:
  "Kas UrbanStyle kasutab AI-d toodete disainimisel?"
  "Kuidas andmeanalüüs mõjutab igapäevaseid otsuseid?"
  "Millised tööriistad on teie andmemeeskonnal?"
  "Kas väikeettevõte saab samuti andmepõhiseks muutuda?"
```

---

### 4.7 PAGE: KONTAKT (`/kontakt`)

```
Layout: 2-column
LEFT: Contact form (Name, Email, Subject dropdown, Message, Submit)
RIGHT: Company info
  UrbanStyle OÜ
  Rotermanni 8, 10111 Tallinn
  info@urbanstyle.ltd
  +372 5XX XXXX (simulated)
  Map: Embedded static map or illustration of Rotermann Quarter

Business hours: E-R 10:00–18:00
```

---

### 4.8 PAGE: LEGAL / PROGRAMM (`/legal/programm`)

**THE SIMULATION DISCLOSURE** — Required but not prominent.

```
H1: "Programmi informatsioon"

Body:
"UrbanStyle OÜ on simulatsiooniettevõte, mis on loodud
Andmeanalüütiku Karjäärikiirendi (DACA) koolitusprogrammi raames.
Veebileht, tooted ja meeskonnaliikmed on osa interaktiivsest
õppekeskkonnast, mis võimaldab osalejatel harjutada andmeanalüüsi
tõelähedases ettevõttekontekstis.

Programmi arendab ja haldab:
Ettevõtluskeskus OÜ
[link: ettevotluskeskus.ee]

Küsimused programmi kohta:
[email] [phone]

Kõik veebilehel kujutatud tooted on genereeritud AI tööriistade
abil demonstreerimise eesmärgil. UrbanStyle OÜ ei müü füüsilisi
tooteid."
```

---

## 5. SEO ARCHITECTURE

### 5.1 Technical SEO

| Element | Implementation |
|---------|---------------|
| **Sitemap** | Dynamic `sitemap.ts`, auto-generated, all locales |
| **robots.txt** | Allow all, sitemap reference |
| **Canonical URLs** | Auto per locale, self-referencing |
| **hreflang** | Auto-generated for all locale variants |
| **Structured Data** | JSON-LD on every page |
| **Open Graph** | Dynamic OG images via `api/og/route.tsx` |
| **Meta descriptions** | Unique per page per locale |
| **Heading hierarchy** | Strict H1 → H2 → H3, one H1 per page |
| **Image alt text** | Descriptive, locale-aware |
| **Core Web Vitals** | Monitored via Vercel Analytics |
| **404 page** | Custom, branded, helpful links |

### 5.2 Structured Data (JSON-LD)

**Homepage:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "UrbanStyle OÜ",
  "url": "https://urbanstyle.ltd",
  "logo": "https://urbanstyle.ltd/images/brand/us_logo_wordmark.svg",
  "description": "Premium urban streetwear brand from Tallinn, Estonia",
  "foundingDate": "2020",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rotermanni 8",
    "addressLocality": "Tallinn",
    "postalCode": "10111",
    "addressCountry": "EE"
  },
  "sameAs": [
    "https://instagram.com/urbanstyle.ltd",
    "https://facebook.com/urbanstyle.ltd"
  ],
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": 45 }
}
```

**Product pages:**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Signature Denim Jacket",
  "description": "14oz Japanese selvedge denim jacket...",
  "image": "https://urbanstyle.ltd/images/products/denim-jacket-hero.webp",
  "brand": { "@type": "Brand", "name": "UrbanStyle" },
  "offers": {
    "@type": "Offer",
    "price": "189.00",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  }
}
```

**Strategy page:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Andmed on meie strateegiline eelis",
  "author": { "@type": "Organization", "name": "UrbanStyle OÜ" },
  "publisher": { "@type": "Organization", "name": "UrbanStyle OÜ" },
  "description": "Kuidas UrbanStyle muutis andmed ja AI oma peamiseks konkurentsieeliseks"
}
```

### 5.3 AI Agent Optimization

For AI crawlers (ChatGPT, Perplexity, Claude, Gemini):

**`/.well-known/ai-plugin.json`** (optional, future-proofing):
```json
{
  "schema_version": "v1",
  "name": "UrbanStyle",
  "description": "Premium urban streetwear brand from Tallinn, Estonia. Founded 2020. Data-driven fashion company.",
  "auth": { "type": "none" },
  "api": { "type": "openapi", "url": "https://urbanstyle.ltd/api/openapi.json" }
}
```

**`/llms.txt`** (LLMs.txt standard):
```
# UrbanStyle OÜ
> Premium urban streetwear brand from Tallinn, Estonia

## Company
- Founded: 2020
- HQ: Tallinn, Estonia (Rotermanni 8)
- Employees: ~45
- Revenue: ~3M EUR (2024)
- CEO: Kristi Tamm
- Stores: Tallinn, Tartu, Pärnu
- Products: Streetwear, denim, hoodies, graphic tees, accessories

## Strategy
- Data-driven decision making across all departments
- AI integration in analytics, marketing, and operations
- 150% growth in 2 years through data culture

## Products
- Signature Denim Jacket (€189) - Japanese selvedge, brass buttons
- Heavyweight Hoodie Collection (€89) - 450gsm, 5 colors
- Graphic Tee Series (€49) - Tallinn-inspired prints
- Urban Joggers (€109) - Ripstop nylon, water-resistant
- Tech Parka (€249) - Waterproof, sealed seams
- Urban Runner Sneakers (€139) - Leather, gum sole
- Crossbody Bag (€69) - Nylon, YKK zippers
- Accessories: Beanies (€39), Caps (€45)

## Team
- Kristi Tamm (CEO, 38) - Strategic vision, investor relations
- Toomas Kask (IT Director, 42) - Data infrastructure, security
- Anna Mets (Marketing Lead, 31) - Digital marketing, social media
- Marko Saar (Product Manager, 29) - Product analytics, customer segmentation
- Liis Koppel (Operations Manager, 34) - Store operations, inventory

## Training Program
- UrbanStyle partners with Ettevõtluskeskus OÜ for data analytics training
- Program: DACA (Andmeanalüütiku Karjäärikiirendi)
- Website: ettevotluskeskus.ee
```

**`/robots.txt`:**
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://urbanstyle.ltd/sitemap.xml
```

### 5.4 Meta Tags Per Page

| Page | Title (ET) | Description (ET) |
|------|-----------|-----------------|
| Home | UrbanStyle — Premium Urban Streetwear \| Tallinn | Tallinna tänavakultuuri uus peatükk. Premium streetwear, disainitud Eestis. Denim, hoodie'd, aksessuaarid. |
| Tooted | Kollektsioon — UrbanStyle | Avasta UrbanStyle'i premium streetwear kollektsiooni. Denim jakid, hoodie'd, teed, joggerid ja aksessuaarid. |
| Meist | Meie lugu — UrbanStyle | 45 inimest, 3 linna, 1 missioon. Tutvu UrbanStyle'i meeskonna ja visiooniga. |
| Strateegia | Andmed meie strateegias — UrbanStyle | Kuidas UrbanStyle muutis andmed ja AI oma peamiseks konkurentsieeliseks. 150% kasv läbi andmepõhise kultuuri. |
| Kontakt | Kontakt — UrbanStyle | Võta UrbanStyle'iga ühendust. Rotermanni 8, Tallinn. |

---

## 6. DESIGN SYSTEM TOKENS (Tailwind Config)

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          charcoal: '#2C2C2C',
          offwhite: '#F5F0EB',
          limestone: '#D4CDC4',
          orange: '#C4622D',
          sage: '#7A8B6F',
          slate: '#4A6274',
          rose: '#C4A08A',
        },
      },
      fontFamily: {
        display: ['var(--font-neue-montreal)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      borderRadius: {
        card: '12px',
        button: '8px',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      spacing: {
        section: '6rem',       // py-24
        'section-sm': '4rem',  // py-16
      },
      maxWidth: {
        content: '1280px',
        text: '768px',
      },
    },
  },
};

export default config;
```

---

## 7. COMPONENT INVENTORY

| Component | Props | Usage |
|-----------|-------|-------|
| `<Header />` | `locale, transparent` | All pages, sticky |
| `<Footer />` | `locale` | All pages |
| `<LanguageSwitcher />` | `currentLocale, pathname` | Header |
| `<Hero />` | `image, title, subtitle, cta, height` | Home, Tooted, Meist, Strateegia |
| `<ProductCard />` | `product, locale` | Product grid |
| `<ProductGallery />` | `images[]` | PDP |
| `<TeamCard />` | `member, locale, expandable` | Meist |
| `<SectionHeading />` | `eyebrow, title, subtitle, align` | All pages |
| `<StatCounter />` | `value, label, suffix` | Strateegia |
| `<Timeline />` | `items[]` | Meist, Strateegia |
| `<Accordion />` | `items[]` | PDP (specs), Strateegia (FAQ) |
| `<CTABlock />` | `title, body, buttonText, href, variant` | Strateegia, Home |
| `<QuoteCard />` | `quote, author, role, image` | Strateegia, Meist |
| `<ImageStrip />` | `images[], parallax` | Home, between sections |
| `<NewsletterForm />` | `locale` | Home footer area |
| `<Breadcrumbs />` | `items[]` | All subpages |
| `<JsonLd />` | `data` | All pages (head) |
| `<OGMeta />` | `title, description, image, locale` | All pages |

---

## 8. ANIMATION SPECIFICATION

| Element | Trigger | Animation | Duration |
|---------|---------|-----------|----------|
| Hero text | Page load | Fade-up + slight scale | 800ms, ease-out |
| Product cards | Scroll into view | Staggered fade-up | 500ms, 100ms stagger |
| Stat counters | Scroll into view | Count-up from 0 | 2000ms, ease-out |
| Section headings | Scroll into view | Fade-up | 600ms |
| Team cards | Scroll into view | Staggered fade-in | 400ms, 80ms stagger |
| Parallax images | Scroll position | translateY at 0.3x rate | Continuous |
| Nav background | Scroll > 50px | Transparent → solid charcoal | 300ms |
| Product image hover | Mouse enter | scale(1.02) | 300ms |
| Page transitions | Route change | Fade | 200ms |
| Language switch | Click | None (instant, no flash) | — |

---

## 9. ACCESSIBILITY

| Requirement | Implementation |
|-------------|---------------|
| WCAG 2.1 AA | Minimum standard |
| Color contrast | All text meets 4.5:1 on backgrounds |
| Focus indicators | Visible focus ring (2px burnt orange outline) |
| Keyboard nav | Full tab navigation, skip-to-content link |
| Screen readers | Semantic HTML, ARIA labels where needed |
| Reduced motion | `prefers-reduced-motion` disables parallax + animations |
| Alt text | All images have descriptive alt (locale-aware) |
| Form labels | All inputs labeled, error states announced |

---

## 10. DEPLOYMENT & OPS

### 10.1 Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "regions": ["arn1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ],
  "redirects": [
    { "source": "/", "destination": "/et", "permanent": false }
  ]
}
```

### 10.2 Domain Setup

| Domain | Points to | Purpose |
|--------|-----------|---------|
| `urbanstyle.ltd` | Vercel | Primary |
| `www.urbanstyle.ltd` | → redirect to `urbanstyle.ltd` | WWW redirect |

### 10.3 Environment Variables

```
# .env.local
NEXT_PUBLIC_SITE_URL=https://urbanstyle.ltd
NEXT_PUBLIC_DEFAULT_LOCALE=et
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=urbanstyle.ltd
```

---

## 11. CONTENT DELIVERY PRIORITY

### Sprint 1 — MVP Launch (1 week)
- [ ] Home page (all sections)
- [ ] Product listing page
- [ ] 3 product detail pages (Denim, Hoodie, Tee)
- [ ] Footer with legal disclaimer
- [ ] Estonian language only
- [ ] SEO basics (meta, sitemap, robots, JSON-LD)
- [ ] Vercel deployment

### Sprint 2 — Full Catalog + Team (1 week)
- [ ] All 8 product pages
- [ ] Meist (About) page with team grid
- [ ] English translations
- [ ] OG image generation
- [ ] `llms.txt` + AI agent optimization

### Sprint 3 — Strategy + i18n + Polish (1 week)
- [ ] Strateegia page (full funnel)
- [ ] Russian translations
- [ ] Animation polish (Framer Motion)
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Newsletter form

### Sprint 4 — Launch
- [ ] Domain DNS configuration
- [ ] Final content review
- [ ] Lighthouse 98+ validation
- [ ] Soft launch to DACA cohort
