# UrbanStyle OÜ — Website Asset Gap Prompts v1.0

**Purpose:** Fill all missing image assets for urbanstyle.ltd website build
**Context:** nano-banana batch 1 produced 24 images (5 persona refs + 19 product shots), all in 1:1
**This file:** All remaining prompts needed, organized by PRIORITY for website launch

---

## PRIORITY LEGEND

| Priority | Meaning | Deadline |
|----------|---------|----------|
| **P0** | Website cannot launch without these | Before dev starts |
| **P1** | Needed for full website experience | During dev |
| **P2** | Nice-to-have, enriches content | Post-launch |

---

## SECTION A: PERSONA PORTRAITS & CONSISTENCY SHOTS (P0)

### WHY THIS MATTERS
The turnaround ref sheets are excellent for INTERNAL reference, but they are NOT usable on the website directly. We need:
- Clean individual portraits (team page)
- Situational shots (About Us storytelling)
- Expression variants (email headers, narrative moments)

**CRITICAL:** Use each persona's turnaround ref sheet as `--cref` (character reference) input for ALL shots below to maintain face/body consistency.

---

### A1. TEAM PAGE HEADSHOTS (P0) — All 5 personas, identical framing

**Format: 3:4 (900x1200px) — vertical portrait**

These MUST have identical framing, lighting, and background for the team grid.

```
KRISTI TAMM — Team Headshot:
Professional portrait of a 38-year-old Estonian female CEO,
dark brown hair in sleek low bun, high cheekbones, dark brown eyes,
thin gold chain necklace visible, quality wristwatch,
confident slight smile with warmth, direct eye contact,
wearing tailored black blazer over white silk blouse,
clean warm beige gradient background,
framing: chest up, face centered at upper third,
soft key light from upper left, subtle fill from right,
consistent corporate team portrait style
--cref [kristi_tamm_ref.png] --ar 3:4 --style raw --v 6.1
```

```
TOOMAS KASK — Team Headshot:
Professional portrait of a 42-year-old Estonian male IT Director,
short dark blonde hair with grey at temples, broad forehead,
dark-framed rectangular glasses, pale blue eyes, clean-shaven,
reserved but approachable expression, slight professional smile,
wearing light blue oxford button-down shirt,
clean warm beige gradient background,
framing: chest up, face centered at upper third,
soft key light from upper left, subtle fill from right,
consistent corporate team portrait style
--cref [toomas_kask_ref.png] --ar 3:4 --style raw --v 6.1
```

```
ANNA METS — Team Headshot:
Professional portrait of a 31-year-old Estonian female Marketing Lead,
auburn red-brown wavy hair past shoulders,
round face, bright green eyes, natural freckles across nose,
warm genuine wide smile, colorful geometric statement earrings,
wearing cream knit turtleneck,
clean warm beige gradient background,
framing: chest up, face centered at upper third,
soft key light from upper left, subtle fill from right,
consistent corporate team portrait style
--cref [anna_mets_ref.png] --ar 3:4 --style raw --v 6.1
```

```
MARKO SAAR — Team Headshot:
Professional portrait of a 29-year-old Estonian male Product Manager,
dark brown medium-length textured tousled hair,
angular features, short well-maintained stubble, warm brown eyes,
thoughtful half-smile, intelligent curious gaze,
wearing dark charcoal crewneck merino sweater,
clean warm beige gradient background,
framing: chest up, face centered at upper third,
soft key light from upper left, subtle fill from right,
consistent corporate team portrait style
--cref [marko_saar_ref.png] --ar 3:4 --style raw --v 6.1
```

```
LIIS KOPPEL — Team Headshot:
Professional portrait of a 34-year-old Estonian female Operations Manager,
honey blonde medium-length hair in neat low ponytail,
warm oval face, light blue-grey eyes, kind smile, subtle smile lines,
reading glasses hanging on thin gold chain around neck,
wearing fitted navy blazer over white v-neck tee,
clean warm beige gradient background,
framing: chest up, face centered at upper third,
soft key light from upper left, subtle fill from right,
consistent corporate team portrait style
--cref [liis_koppel_ref.png] --ar 3:4 --style raw --v 6.1
```

---

### A2. LIIS KOPPEL — CORRECTED REF SHEET (P0)

The current ref sheet says "KATRIN TAMM" — must be regenerated with correct name or without any name text.

```
LIIS KOPPEL — Corrected Character Turnaround:
Character turnaround reference sheet of a 34-year-old Estonian woman,
Operations Manager, warm practical grounded energy,
medium build 168cm, approachable confident posture,
honey blonde medium-length hair in neat low ponytail,
warm oval face, light blue-grey eyes, kind expression, subtle smile lines,
reading glasses hanging on thin gold chain around neck,
wearing fitted navy blazer over white v-neck tee,
dark straight-leg jeans, tan leather flat ankle boots,
practical structured tan leather tote bag over one shoulder,
FOUR VIEWS on white background: front view, three-quarter view,
side profile view, back view,
NO TEXT on image, clean studio lighting, full body head to toe
--cref [liis_koppel_ref.png] --ar 16:9 --style raw --v 6.1
```

---

### A3. PERSONA OFFICE/WORK SITUATIONS (P1) — About Us page storytelling

**Format: 3:2 (1800x1200px) — landscape, website content blocks**

```
KRISTI — CEO at Standing Desk:
38-year-old Estonian female CEO at modern minimalist standing desk,
dark brown hair in low bun, black blazer, white blouse, gold necklace,
reviewing revenue dashboard on ultrawide monitor,
one hand on wireless mouse, concentrated confident expression,
clean organized desk with single plant and espresso cup,
floor-to-ceiling window showing Tallinn Rotermann Quarter,
warm natural afternoon light from window,
contemporary executive office, concrete and glass interior
--cref [kristi_tamm_ref.png] --ar 3:2 --style raw --v 6.1
```

```
KRISTI — Presenting to Board:
38-year-old Estonian female CEO standing in glass meeting room,
dark brown hair straight down, navy blazer, cream blouse, gold necklace,
one hand gesturing at large screen showing Q4 growth chart,
confident commanding posture, mid-presentation,
modern meeting room, 4 blurred figures seated at table,
bright contemporary office, city skyline through windows
--cref [kristi_tamm_ref.png] --ar 3:2 --style raw --v 6.1
```

```
TOOMAS — At Dual Monitor Workstation:
42-year-old Estonian male IT Director at dual-monitor desk,
dark-framed glasses, light blue oxford shirt rolled to elbows,
left screen: database entity-relationship diagram,
right screen: SQL terminal with query results,
leaning in slightly, adjusting glasses with one hand,
focused analytical expression, Moleskine notebook open beside keyboard,
modern open-plan office, cool blue-white overhead lighting
--cref [toomas_kask_ref.png] --ar 3:2 --style raw --v 6.1
```

```
TOOMAS — Explaining at Whiteboard:
42-year-old Estonian IT Director standing at whiteboard,
drawing database schema with blue marker,
dark glasses, light blue shirt, navy chinos,
half-turned toward camera, patient teaching expression,
whiteboard shows entity boxes with relationship arrows,
glass-walled meeting room, colleagues visible in background
--cref [toomas_kask_ref.png] --ar 3:2 --style raw --v 6.1
```

```
ANNA — Social Media War Room:
31-year-old Estonian female Marketing Lead in creative workspace,
auburn wavy hair pushed behind ear, sage UrbanStyle hoodie,
colorful statement earrings, phone in one hand,
standing at large mood board covered with Instagram screenshots,
campaign analytics printouts, product photos, color swatches,
animated excited expression, other hand placing sticky note,
bright creative office with plants and neon sign in background
--cref [anna_mets_ref.png] --ar 3:2 --style raw --v 6.1
```

```
ANNA — Laptop on Couch:
31-year-old Estonian woman cross-legged on modern office couch,
auburn wavy hair in messy bun with pencil through it,
laptop on lap showing social media dashboard,
UrbanStyle graphic tee, denim jacket draped on armrest,
focused with slight smile, checking phone simultaneously,
modern coworking space, warm ambient lighting
--cref [anna_mets_ref.png] --ar 3:2 --style raw --v 6.1
```

```
MARKO — Deep Analysis at Standing Desk:
29-year-old Estonian male Product Manager at standing desk,
dark tousled hair, stubble, charcoal sweater,
large screen showing customer segmentation scatter plot with clusters,
hand on chin in thinking pose, iPad with handwritten notes beside,
sticky notes with hypotheses on monitor bezel,
deep concentration expression, modern tech office
--cref [marko_saar_ref.png] --ar 3:2 --style raw --v 6.1
```

```
MARKO — Collaborative Meeting:
29-year-old Estonian Product Manager on office couch edge,
leaning forward in animated discussion, dark hair, stubble,
gesturing with both hands explaining a concept,
iPad on knee showing product funnel diagram,
engaged curious expression, slight enthusiastic smile,
bright modern meeting nook with plants
--cref [marko_saar_ref.png] --ar 3:2 --style raw --v 6.1
```

```
LIIS — On Store Floor:
34-year-old Estonian female Operations Manager on retail store floor,
honey blonde ponytail, navy blazer, jeans,
reading glasses on, holding tablet showing inventory dashboard,
standing in UrbanStyle retail store among clothing racks,
one hand touching denim jacket on rack while checking stock count,
focused practical expression, modern retail interior,
concrete floors, industrial light fixtures, neatly organized displays
--cref [liis_koppel_ref.png] --ar 3:2 --style raw --v 6.1
```

```
LIIS — Team Huddle:
34-year-old Estonian Operations Manager at round table,
honey blonde ponytail, reading glasses on, navy blazer,
pointing at specific row on printed inventory report,
warm encouraging expression explaining to 2 colleagues,
paper coffee cups and notebooks on table,
warm natural meeting room lighting
--cref [liis_koppel_ref.png] --ar 3:2 --style raw --v 6.1
```

---

### A4. PERSONA EXPRESSION SHEETS (P1) — Narrative email/material variety

**Format: 3:2 (1800x1200px) — 2x3 grid of headshots**

```
KRISTI — 6 Expressions:
Expression sheet, 38-year-old Estonian female CEO,
dark brown hair in low bun, black blazer, gold necklace,
SIX headshots in 2x3 grid on white background,
consistent soft studio lighting, same framing:
TOP ROW: (1) focused concentration reviewing data,
(2) pleased approval with confident nod,
(3) concerned skepticism with hand on chin
BOTTOM ROW: (4) enthusiastic excitement with bright smile,
(5) serious determination with firm direct stare,
(6) warm mentoring with soft tilted-head smile
--cref [kristi_tamm_ref.png] --ar 3:2 --style raw --v 6.1
```

```
TOOMAS — 6 Expressions:
Expression sheet, 42-year-old Estonian male IT Director,
dark-framed rectangular glasses, short dark blonde hair, blue shirt,
SIX headshots in 2x3 grid on white background,
consistent lighting, same framing:
TOP ROW: (1) careful analysis squinting and adjusting glasses,
(2) concern about data quality with slight frown,
(3) reluctant approval with raised eyebrows
BOTTOM ROW: (4) skepticism about AI with pursed lips,
(5) patient teaching with calm pointing gesture,
(6) rare satisfied smile with subtle pride
--cref [toomas_kask_ref.png] --ar 3:2 --style raw --v 6.1
```

```
ANNA — 6 Expressions:
Expression sheet, 31-year-old Estonian female Marketing Lead,
auburn wavy hair, freckles, colorful earrings,
SIX headshots in 2x3 grid on white background,
consistent lighting, same framing:
TOP ROW: (1) excited discovery wide-eyed "OMG!",
(2) creative thinking looking up biting lip,
(3) impatient eye-roll checking phone
BOTTOM ROW: (4) warm encouragement with nodding smile,
(5) passionate pitch with animated gesturing,
(6) surprisingly focused serious reading
--cref [anna_mets_ref.png] --ar 3:2 --style raw --v 6.1
```

```
MARKO — 6 Expressions:
Expression sheet, 29-year-old Estonian male Product Manager,
dark tousled hair, stubble, charcoal sweater,
SIX headshots in 2x3 grid on white background,
consistent lighting, same framing:
TOP ROW: (1) intense curiosity leaning forward,
(2) analytical one-eyebrow-raised skepticism,
(3) eureka moment eyes wide with hand gesture
BOTTOM ROW: (4) collaborative warm smile making notes,
(5) deep thought hand-on-chin looking down,
(6) satisfied confirmation with confident nod
--cref [marko_saar_ref.png] --ar 3:2 --style raw --v 6.1
```

```
LIIS — 6 Expressions:
Expression sheet, 34-year-old Estonian female Operations Manager,
honey blonde ponytail, reading glasses on chain, navy blazer,
SIX headshots in 2x3 grid on white background,
consistent lighting, same framing:
TOP ROW: (1) practical concern with hands on hips,
(2) warm encouragement with genuine nod,
(3) problem-solving with glasses on squinting
BOTTOM ROW: (4) frustrated by errors rubbing temple,
(5) patient explaining with open palms,
(6) relieved satisfaction relaxed "finally" smile
--cref [liis_koppel_ref.png] --ar 3:2 --style raw --v 6.1
```

---

### A5. GROUP SHOTS (P0) — Website hero banner

**Format: 21:9 (2560x1097px) — ultra-wide hero**

```
GROUP — Hero Banner (All 5):
Candid group photo of five Estonian professionals around high table
in modern office with floor-to-ceiling windows showing Tallinn skyline,
warm golden afternoon light streaming in,
KRISTI (38, dark hair bun, black blazer, gold necklace) center, standing,
TOOMAS (42, glasses, blue shirt) to her left, arms crossed, slight smile,
ANNA (31, auburn waves, sage hoodie, statement earrings) right side, laughing,
MARKO (29, tousled dark hair, grey sweater) leaning on table edge, thoughtful smile,
LIIS (34, blonde ponytail, navy blazer, glasses on chain) seated, warm expression,
natural genuine team chemistry, relaxed professional atmosphere,
editorial company culture photography,
ultra-wide hero banner composition with text space on left third
--ar 21:9 --style raw --v 6.1
```

```
GROUP — Secondary Banner (Team Walking):
Five Estonian professionals walking abreast through Tallinn Rotermann Quarter,
modern glass and steel architecture, golden hour backlighting,
KRISTI center leading, TOOMAS and LIIS flanking,
ANNA and MARKO on outer edges,
all in their signature outfits, natural confident stride,
shot from slight low angle, wide lens,
cinematic team campaign banner
--ar 21:9 --style raw --v 6.1
```

**Format: 16:9 (2560x1440px) — standard hero**

```
GROUP — Meeting Scene:
Five professionals in modern glass-walled meeting room,
KRISTI standing at screen presenting growth chart,
TOOMAS taking notes seriously, ANNA leaning forward excited,
MARKO hand-on-chin thinking, LIIS reviewing printout with glasses on,
warm professional lighting, Tallinn skyline through windows,
corporate editorial photography
--ar 16:9 --style raw --v 6.1
```

---

## SECTION B: PRODUCT FORMAT VARIATIONS (P0)

### B1. PRODUCT CARDS — 3:4 Vertical (900x1200px)

Every product needs a vertical card for the website grid. Regenerate existing 1:1 shots in 3:4.

```
DENIM JACKET — Product Card:
Premium oversized raw selvedge denim jacket hung on matte black hanger,
brass buttons, red satin lining partially visible, UrbanStyle label,
shot against clean warm off-white seamless backdrop,
full jacket visible with hanger hook at top,
soft directional light from upper left, subtle shadow,
vertical product card framing with breathing room above and below
--cref [product_1a_denim_hero] --ar 3:4 --style raw --v 6.1
```

```
SAGE HOODIE — Product Card:
Premium 450gsm heavyweight sage green hoodie on wooden hanger,
oversized relaxed fit, flat drawcords, kangaroo pocket,
tone-on-tone "UrbanStyle" embroidery on left chest,
shot against warm off-white backdrop,
soft wrap-around lighting, fabric weight and drape visible,
vertical product card framing
--cref [product_2a_hoodie_hero] --ar 3:4 --style raw --v 6.1
```

```
GRAPHIC TEE — Product Card:
White premium cotton tee with geometric Bauhaus-inspired screen print,
relaxed fit, dropped shoulders, ribbed crew neck,
laid flat on kraft paper or hung on minimal hanger,
warm off-white backdrop, clean directional light,
vertical product card framing
--cref [product_3a_tee_hero] --ar 3:4 --style raw --v 6.1
```

```
CHARCOAL JOGGERS — Product Card:
Technical urban jogger in charcoal ripstop nylon,
tapered silhouette, elastic cuffs, reflective zip pulls,
drawstring waist, articulated knee darts,
hung on minimalist metal clip hanger,
warm off-white backdrop, vertical product card framing
--cref [product_4a_joggers_hero] --ar 3:4 --style raw --v 6.1
```

```
CROSSBODY BAG — Product Card:
Minimalist black nylon crossbody bag,
adjustable woven strap, embossed "US" on front flap,
placed on light surface at slight angle,
strap artfully arranged, warm off-white backdrop,
vertical product card framing
--cref [product_5a_bag_hero] --ar 3:4 --style raw --v 6.1
```

---

### B2. MISSING PRODUCTS — Full Set (P0)

**BEANIE (Product 6A):**
```
Beanie — Hero 1:1:
Ribbed merino wool beanie in burnt orange,
folded cuff with small woven label "US",
placed on white marble surface,
soft directional light, cozy premium knitwear
--ar 1:1 --style raw --v 6.1

Beanie — Product Card 3:4:
Same beanie, vertical framing with more background space,
warm off-white backdrop
--ar 3:4 --style raw --v 6.1
```

**CAP (Product 6B):**
```
Cap — Hero 1:1:
Unstructured 5-panel cap in slate blue,
curved brim, adjustable leather strap with brass buckle,
minimal tonal "UrbanStyle" embroidery on front,
placed on dark wood surface, warm moody lighting
--ar 1:1 --style raw --v 6.1

Cap — Product Card 3:4:
Same cap, vertical framing, warm off-white backdrop
--ar 3:4 --style raw --v 6.1
```

**ACCESSORIES GROUP (Product 6C):**
```
Accessories Flat Lay — 1:1:
Flat lay on raw concrete: burnt orange beanie,
slate blue cap, black crossbody bag,
matte black sunglasses, brown leather card holder,
scattered autumn leaves as accent,
overhead shot, warm natural light,
urban essentials editorial
--ar 1:1 --style raw --v 6.1
```

**TECH PARKA (Product 7A-D):**
```
Parka — Hero 1:1:
Urban tech parka in matte black, waterproof shell,
oversized hood with hidden drawcord,
asymmetric front zip, utility pockets,
inner quilted lining in burnt orange visible at open front,
displayed on industrial metal rack against concrete wall
--ar 1:1 --style raw --v 6.1

Parka — Product Card 3:4:
Same parka, vertical framing on warm off-white backdrop
--ar 3:4 --style raw --v 6.1

Parka — Detail Seam Tape 1:1:
Macro inside parka showing sealed waterproof seam tape,
technical construction detail, premium outerwear quality
--ar 1:1 --style raw --v 6.1

Parka — Detail Hood 1:1:
Parka hood from behind, hidden drawcord adjustment,
matte black hardware, clean technical design
--ar 1:1 --style raw --v 6.1
```

**SNEAKERS (Product 8A-B):**
```
Sneaker — Hero 1:1:
Minimalist urban sneaker in off-white leather upper,
charcoal suede heel tab, chunky gum rubber sole,
flat waxed laces, small debossed "US" on outer heel,
single shoe angled 45 degrees on white surface,
dramatic side lighting emphasizing form
--ar 1:1 --style raw --v 6.1

Sneaker — Product Card 3:4:
Same sneaker, vertical framing, pair visible,
warm off-white backdrop
--ar 3:4 --style raw --v 6.1

Sneaker — Sole Detail 1:1:
Bottom view of gum sole showing tread pattern
inspired by Tallinn cobblestone texture
--ar 1:1 --style raw --v 6.1

Sneaker — Heel Tab Detail 1:1:
Close-up charcoal suede heel tab with debossed "US",
contrast stitching, premium construction detail
--ar 1:1 --style raw --v 6.1
```

---

### B3. HERO BANNERS WITH PRODUCTS (P0)

**Format: 16:9 (2560x1440px)**

```
HERO 1 — Denim Season (Lifestyle):
Full body editorial, female model wearing UrbanStyle denim jacket open,
white graphic tee underneath, charcoal joggers, off-white sneakers,
black crossbody bag across chest,
walking through Tallinn Rotermann Quarter at golden hour,
glass and steel buildings, warm amber light,
confident relaxed stride, shot from slight low angle,
high-end streetwear campaign,
composition: model in right third, text space on left
--ar 16:9 --style raw --v 6.1
```

```
HERO 2 — Storm Ready (Atmospheric):
Male model in black tech parka, slate blue hoodie underneath,
charcoal joggers, sneakers, burnt orange beanie,
walking through Tallinn Noblessner area at dusk,
industrial maritime architecture, dramatic overcast sky,
wet pavement reflecting amber lights,
cinematic moody atmosphere,
composition: model center-left, dramatic sky right
--ar 16:9 --style raw --v 6.1
```

```
HERO 3 — Product Focus (Clean):
Three hero products floating/arranged against pure charcoal background:
denim jacket center, sage hoodie left, crossbody bag right,
dramatic spotlight from above on each product,
premium minimal dark-mode product showcase,
text space in lower third
--ar 16:9 --style raw --v 6.1
```

**Format: 21:9 (2560x1097px) — ultra-wide**

```
HERO 4 — Tallinn Cityscape:
Atmospheric Tallinn skyline at golden hour,
Old Town medieval towers and modern glass buildings together,
subtle UrbanStyle products visible: jacket on foreground railing,
bag on bench, shoes on stone,
brand world establishing shot,
warm amber light, cinematic depth of field,
ultra-wide with generous text space center
--ar 21:9 --style raw --v 6.1
```

---

### B4. LIFESTYLE / MODEL SHOTS (P1)

**Format: 3:4 (900x1200px) — matches product cards for mixed grid**

```
LIFESTYLE — Denim Jacket on Model:
Young woman mid-20s in UrbanStyle denim jacket over white tee,
high-waisted wide leg trousers, walking through Tallinn Old Town,
golden hour, cobblestones, medieval architecture blurred behind,
wind catching open jacket, natural movement,
editorial candid style
--ar 3:4 --style raw --v 6.1
```

```
LIFESTYLE — Hoodie Friends:
Two friends (mixed gender, early 20s) in UrbanStyle hoodies
(sage green and dusty rose), sitting on bench at Linnahall,
Baltic Sea background, overcast moody sky,
holding coffee, laughing naturally,
slightly desaturated cool tones
--ar 3:4 --style raw --v 6.1
```

```
LIFESTYLE — Graphic Tee Street:
Young man walking confidently through Telliskivi Creative City,
wearing UrbanStyle Tallinn skyline tee, dark jeans,
colorful street art wall in background,
late afternoon light, candid street photography
--ar 3:4 --style raw --v 6.1
```

```
LIFESTYLE — Joggers Skater:
Male model in UrbanStyle charcoal joggers and white tee,
skateboard under arm, at Culture Kilometer,
industrial pipe installations backdrop,
golden hour, streetwear lookbook style
--ar 3:4 --style raw --v 6.1
```

```
LIFESTYLE — Crossbody in Motion:
Over-shoulder view, person wearing black crossbody across chest
over sage hoodie, walking through Balti Jaam area,
urban environment, natural movement,
candid street photography
--ar 3:4 --style raw --v 6.1
```

```
LIFESTYLE — Full Winter Look:
Female model in black tech parka, slate blue hoodie visible,
charcoal joggers, sneakers, burnt orange beanie,
Pirita beach boardwalk, dramatic winter Baltic sky,
wind in hair, hands in pockets,
atmospheric moody fashion
--ar 3:4 --style raw --v 6.1
```

---

### B5. DETAIL STRIP BANNERS (P1)

**Format: 4:1 (2400x600px) — section dividers / parallax strips**

```
STRIP 1 — Texture Montage:
Horizontal strip: four product detail textures side by side,
denim weave | hoodie fleece | ripstop nylon | leather grain,
all extreme macro, warm directional lighting,
seamless horizontal composition for website divider
--ar 4:1 --style raw --v 6.1
```

```
STRIP 2 — Tallinn Skyline Minimal:
Ultra-wide minimal Tallinn skyline silhouette at dusk,
medieval towers and modern buildings,
muted charcoal/slate blue tones,
generous sky space for text overlay,
atmospheric website section divider
--ar 4:1 --style raw --v 6.1
```

```
STRIP 3 — Detail Parade:
Horizontal strip: five brand details in sequence,
US brass button | woven label | embossed monogram | zipper pull | sole pattern,
all on dark backgrounds, dramatic spotlight,
consistent spacing and lighting
--ar 4:1 --style raw --v 6.1
```

---

## SECTION C: SOCIAL / META IMAGES (P1)

**Format: 1.91:1 (1200x630px) — OG meta / social sharing**

```
OG IMAGE — Primary:
UrbanStyle wordmark logo centered on charcoal background,
"Tallinn · Est. 2020" below in small caps,
subtle denim texture in background at low opacity,
clean minimal social sharing card
--ar 1.91:1 --style raw --v 6.1
```

```
OG IMAGE — Product:
Denim jacket and sage hoodie arranged on off-white background,
UrbanStyle wordmark in charcoal top-left,
"Premium Urban Streetwear" text bottom-right,
clean product social card
--ar 1.91:1 --style raw --v 6.1
```

**Format: 9:16 (1080x1920px) — mobile hero / stories**

```
MOBILE HERO 1 — Product Stack:
Vertical arrangement on off-white: denim jacket at top,
hoodie folded middle, crossbody bag bottom,
vertical rhythm, generous spacing,
mobile-first product showcase
--ar 9:16 --style raw --v 6.1
```

```
MOBILE HERO 2 — Lifestyle:
Female model full-length in UrbanStyle denim jacket,
walking toward camera on Tallinn street,
shallow depth of field, vertical phone-native composition,
model centered, cobblestones and buildings stretching up
--ar 9:16 --style raw --v 6.1
```

---

## SECTION D: LOOKBOOK / CAMPAIGN (P2)

**Format: 3:4 (1200x1600px)**

```
LOOKBOOK 1 — Full Look Denim:
Full body editorial, female model:
denim jacket open + white graphic tee + charcoal joggers +
off-white sneakers + black crossbody,
Rotermann Quarter, golden hour, confident one-hand-in-pocket,
high-end streetwear campaign
--ar 3:4 --style raw --v 6.1
```

```
LOOKBOOK 2 — Full Look Storm:
Male model: black tech parka + slate hoodie +
charcoal joggers + sneakers + burnt orange beanie,
raw concrete wall, industrial area,
overcast dramatic, moody winter campaign
--ar 3:4 --style raw --v 6.1
```

```
LOOKBOOK 3 — Group Campaign:
Four models (diverse, 20s) in mixed UrbanStyle outfits,
walking abreast down Vabaduse väljak,
sunset backlighting, low-angle wide lens,
brand campaign key visual
--ar 16:9 --style raw --v 6.1
```

```
LOOKBOOK 4 — Studio Minimal:
Two models back-to-back on white cyclorama,
one in sage hoodie + joggers,
other in denim jacket + graphic tee,
strong directional light, graphic shadows,
minimal high-fashion studio campaign
--ar 3:4 --style raw --v 6.1
```

---

## GENERATION CHECKLIST & ORDER

### Phase 1 — P0 (Website Launch Blockers)

| # | Asset | Format | Count |
|---|-------|--------|-------|
| 1 | Liis Koppel corrected ref sheet | 16:9 | 1 |
| 2 | 5x Team headshots (identical style) | 3:4 | 5 |
| 3 | Team group hero banner | 21:9 | 1 |
| 4 | Team group hero banner (backup) | 16:9 | 1 |
| 5 | 5x Product cards (existing products) | 3:4 | 5 |
| 6 | Beanie hero + card | 1:1 + 3:4 | 2 |
| 7 | Cap hero + card | 1:1 + 3:4 | 2 |
| 8 | Tech Parka hero + card + 2 details | 1:1/3:4 | 4 |
| 9 | Sneakers hero + card + 2 details | 1:1/3:4 | 4 |
| 10 | Accessories flat lay | 1:1 | 1 |
| 11 | 3x Hero banners (lifestyle/product) | 16:9 | 3 |
| 12 | 1x Hero banner (cityscape) | 21:9 | 1 |
| **P0 TOTAL** | | | **30** |

### Phase 2 — P1 (Full Experience)

| # | Asset | Format | Count |
|---|-------|--------|-------|
| 13 | 10x Persona office situations (2 per person) | 3:2 | 10 |
| 14 | 5x Expression sheets | 3:2 | 5 |
| 15 | 6x Lifestyle model shots | 3:4 | 6 |
| 16 | 3x Detail strip banners | 4:1 | 3 |
| 17 | 2x OG/social sharing images | 1.91:1 | 2 |
| 18 | 2x Mobile hero | 9:16 | 2 |
| **P1 TOTAL** | | | **28** |

### Phase 3 — P2 (Enrichment)

| # | Asset | Format | Count |
|---|-------|--------|-------|
| 19 | 4x Lookbook campaign shots | 3:4/16:9 | 4 |
| 20 | Video/showreel stills | 16:9 | 5 |
| **P2 TOTAL** | | | **9** |

---

### GRAND TOTAL

| Phase | Assets | + Existing | = Total |
|-------|--------|-----------|---------|
| Existing (nano-banana batch 1) | — | 24 | 24 |
| P0 — Launch blockers | 30 | — | 30 |
| P1 — Full experience | 28 | — | 28 |
| P2 — Enrichment | 9 | — | 9 |
| **TOTAL** | **67** | **24** | **91** |
