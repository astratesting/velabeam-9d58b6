# VelaBeam Build Plan

## 1. PRODUCT

VelaBeam is an end-to-end pipeline tool for freelance web developers and small agencies who sell websites to local businesses. The operator searches a target area for businesses that lack a website, picks a lead, fills in business details, picks an industry template, and VelaBeam generates and deploys a polished site — collapsing the prospecting → proposal → mockup → build → deploy chain into one workspace. The pain solved is the front-of-funnel grind: 27% of US small businesses (≈9M) still have no web presence, but finding them, qualifying them, and producing a first draft site takes hours per lead. VelaBeam compresses that to minutes, so the operator walks into the sales call with a live, branded preview already on a subdomain.

## 2. WHO IT'S FOR

Solo devs and 1–5 person agencies who already know HTML/CSS, run their own hosting/PaaS accounts, and price sites between $1,500–$8,000. They're time-poor on prospecting, allergic to drag-and-drop builders that produce generic output, and want a tool that hands them a strong first draft they can refine — not a Squarespace clone. The product tone is therefore clinical, instrument-grade, and respectful of craft: dense data, no hand-holding, keyboard-friendly, monospace numerics, and a single "Today" view on login. The operator feels in control of the pipeline; VelaBeam is the radar and the drafting table.

## 3. LOOK & FEEL

**Visual system**
- **Vibe:** Crisp Operator — instrument-panel quiet, dense but legible, enterprise-focused, restrained motion. Think Bloomberg Terminal meets a ship-bridge console: dark, calm, information-first.
- **Palette:**
  - Background base: `#0B1220` (deep navy, app shell)
  - Surface 1: `#101A2E` (cards/panels)
  - Surface 2: `#15233F` (raised, hover)
  - Border subtle: `#1E2D4D`
  - Text primary: `#E6EDF7`
  - Text secondary: `#8FA0BF`
  - Cobalt accent: `#2D5BFF` (primary actions, links, focus ring)
  - Slate cool: `#5B6B8A` (secondary UI, dividers)
  - Green accent: `#34D399` (success, "deployed", live status pulses only)
  - Amber: `#F5B544` (warn, "stale lead")
  - Red: `#EF4444` (destructive, errors)
- **Typography:**
  - UI / headings: IBM Plex Sans (400, 500, 600, 700)
  - Numerics, codes, IDs, log lines: IBM Plex Mono
  - Landing page hero headline: Inter Tight 600/700 (the one place Inter is used, to keep marketing feel distinct from the console)
  - Scale: 12 / 13 / 14 (body) / 16 / 20 / 24 / 32 / 44 / 56. Tight letter-spacing on display, normal on body.
- **Spacing/layout:**
  - 4px grid; cards use 16px padding; sections 24/32px; max content width 1280px
  - Dashboard shell: 240px fixed left nav, top bar 56px, content scrolls
  - Landing page: 1200px max, generous 96–128px vertical rhythm on hero, tighter on features
- **Iconography:** Lucide icons, 16px default, 1.5px stroke, never decorative. No emoji.
- **Imagery:** Abstract harbor/grid motif — thin 1px line illustrations of piers, channel markers, and contour lines used as section dividers on the landing page and as a faint SVG background grid on the dashboard empty states (≤6% opacity). No stock photos of "smiling business owners." No fake logos.
- **Motion:** 150ms ease-out on hover/focus; 250ms on panel transitions; subtle 2s pulse on the green "Live" status dot. No bouncy springs. Reduced-motion respected.
- **Components:** Cobalt primary button (filled, white text), slate ghost button, panel card with 1px border + 8px radius, status pills (Live/Building/Stale/Draft), data table with zebra rows on `--surface-1`, monospaced numerics, focus ring 2px cobalt with 2px offset.

**Landing page (top to bottom)**
1. **Top nav** — left: VelaBeam wordmark (Plex Sans 600, cobalt dot at the "i" replaced with a small harbor-marker glyph). Center: Product, Pricing, Docs (placeholder href), Changelog (placeholder). Right: Sign in (ghost) + Start free trial (cobalt filled). Sticky, 64px, 1px bottom border.
2. **Hero** — 96px top padding. Two-column on ≥1024px. Left: eyebrow "AI-POWERED PIPELINE FOR LOCAL-BUSINESS SITES" in mono uppercase, 12px tracking-wide. H1 Inter Tight 56px: "Find the businesses without a website. Ship theirs by lunch." Subhead Plex Sans 18px secondary text, max 56ch. Two CTAs: "Start a lead scan" (cobalt) + "See it run" (ghost, anchors to demo). Right: a stylized console mockup — dark panel with a fake "Lead Finder" query (`area: "Austin, TX" · radius: 15mi · filter: "no_site" →`), a table of 5 mock leads (real-sounding local business names, status pills, monospace numbers for "domain age: —"), and a small "Generated preview" thumbnail. No fake customer logos.
3. **Logo strip** — replaced with honest row: "Built on Next.js · Deployed on Vercel · Powered by OpenAI" with neutral tool logos, not customer logos.
4. **Problem section** — three cards on a slate-tinted background. "9M businesses. No website." "Prospecting eats your Friday." "Mockups eat your weekend." Each card: 1px border, Plex Mono stat on top, 14px Plex Sans description.
5. **How it works** — 4-step horizontal flow with the harbor motif as connectors (pier-line SVG between steps). Steps: Scan → Pick → Generate → Deploy. Each step has a 1px outlined number tile, a 1-line title, a 2-line description.
6. **Features grid** — 2×3 grid of feature cards: Lead Discovery, Industry Templates, AI Site Generator, Live Preview & Deploy, Lead CRM, Multi-tenant Workspaces. Each card: 32px icon (Lucide), 18px Plex Sans 600 title, 14px description, no marketing fluff.
7. **Pipeline demo** — full-width dark panel showing an animated (CSS-only) sequence: a query typed, leads appear, a lead is selected, fields auto-filled, template chosen, a preview site loads on the right. Static frames, not a video.
8. **Pricing** — 3 tiers, dark cards on slightly lighter background, current plan highlighted with cobalt border. Starter $49/mo, Pro $99/mo (highlighted), Agency $199/mo. Feature comparison matrix below the cards (8 rows, check/dash). Annual toggle saves 20%. Honest placeholder: "Prices in USD. Cancel anytime." No fake "most popular" ribbons beyond the highlight border.
9. **Testimonials** — honest placeholders: 3 cards labeled "[Testimonial placeholder — to be replaced with real customer quotes post-launch]". No invented names, companies, or photos. Avatars are neutral monogram tiles in slate.
10. **FAQ** — 6 entries, accordion, Plex Sans. Honest, product-specific questions.
11. **Final CTA** — dark band with a single harbor-line divider: "Open the console. Find your next ten clients." Two buttons.
12. **Footer** — 4 columns: Product, Company, Resources, Legal. Wordmark + © year + small "Made for operators" tag.

**Auth pages** — centered single-column card on full-bleed navy background with a faint contour-line SVG (harbor bathymetry). 400px wide. Logo on top. Form fields stacked, 44px tall, 8px radius, 1px border, cobalt focus. Submit button full-width. "Don't have an account? Sign up" link below. No marketing copy on these pages.

**Dashboard shell** — left nav 240px, deep-navy `#0B1220`, 1px right border. Sections: Today, Leads, Sites, Templates, Settings. Top bar 56px: breadcrumbs left, search (cmd-K) center (placeholder), workspace switcher + avatar right. Main content area: 32px padding, max-width 1280px. Default route is `/dashboard` (Today view).

**Dashboard / Today** — single primary view (no nested menus on first paint). Top row: 4 KPI tiles (Sites live, Leads this week, Builds in progress, Deploys this month) with monospaced numbers and 7-day sparkline. Middle: split — left 60% "Lead queue" (table: Business, Category, City, Status, Score, Action), right 40% "Recent builds" (list with Live/Building/Draft pills, last-updated timestamp). Bottom: "Pipeline activity" feed (mono 13px log lines: `[14:02] site.build.completed · tidewellplumbing.com`).

**Leads page** — full-width search interface. Top: scan form (area text input, radius slider 1–50mi, category multi-select chips: Plumber, Electrician, Salon, Restaurant, Auto repair, Dentist, Landscaper, Other). Below: results table (paginated 25/page) with columns: Business, Category, Address, City, Phone, Has site (✓/—), Domain age, Google rating, Status (New/Contacted/Qualified/Disqualified), Action (Generate site · Save · Mark contacted). Row hover reveals row actions. Right-side detail drawer slides in on row click with: business info, "Generate site" CTA, activity log.

**Site builder** — three-pane layout. Left (320px): template gallery (vertical scroll cards, one thumbnail + name per industry). Center: form (Business name, Tagline, Phone, Address, Hours, Services list, About, Primary color picker, Logo upload, Photos). Right (40%): live preview iframe of the generated site with a top bar: Desktop/Tablet/Mobile toggle, "Regenerate" button, "Publish" button (cobalt). A subtle "auto-saved 12s ago" line under the form.

**Sites management** — table view: Site, Business, Domain, Template, Status (Live / Building / Draft / Error), Last deployed, Deploys/mo, Actions (View, Edit, Unpublish, Delete). Filters: status, template, date range. Bulk actions: unpublish, delete (with confirm modal).

**Settings** — vertical sections in a single column: Profile (name, email), Workspace (name, slug), Billing (current plan, manage — placeholder link), API Keys (generate, revoke), Danger zone (delete workspace).

## 4. USER FLOWS

**Sign up → first scan**
1. Landing → "Start free trial" → `/register`
2. Register form (email, password, workspace name) → POST `/api/auth/register` → creates User + Workspace in Prisma
3. Auto sign-in via NextAuth credentials → redirect to `/dashboard`
4. Onboarding modal (first login only): "Run your first lead scan" with one field (area) and a primary CTA "Scan now" → leads them into Leads page pre-filled
5. Results render from mock generator → user clicks "Generate site" on a lead → routes to `/dashboard/sites/new?leadId=...`

**Generate a site**
1. Site builder loads with lead data prefilled
2. User picks template (e.g., Plumber)
3. User edits fields, primary color, uploads logo
4. Live preview re-renders on field change (debounced 400ms)
5. User clicks "Publish" → POST `/api/sites` with status `live` → site moves into Sites table with green Live pill, deploy log entry written
6. Toast: "Deployed · {subdomain}.velabeam.app" (subdomain is the slugified business name; if taken, append `-{shortid}`)

**Manage sites**
1. `/dashboard/sites` lists all
2. Click row → site detail (preview + edit + activity)
3. Edit re-opens the builder with values loaded
4. Unpublish → status → `draft`, deployment record retains history
5. Delete → confirm modal → soft delete (status `deleted`, hidden from list, retained 30 days)

**Settings / API keys**
1. Generate key → modal shows token once with copy button → stored hashed
2. Revoke → confirm → key invalidated

**States**
- Empty (no leads yet): illustration of harbor grid + "Run your first scan" CTA
- Empty (no sites yet): "Sites you build will appear here"
- Loading: skeleton rows (no spinners except on actions)
- Error: inline form errors in red 13px, top-of-form banner for systemic errors
- Success: small toast bottom-right, 4s, no auto-action buttons

## 5. PAGES / ROUTES

| Route | Purpose | Layout & key elements |
|---|---|---|
| `/` | Marketing landing | Hero, problem, how it works, features, pipeline demo, pricing, testimonials placeholders, FAQ, final CTA, footer |
| `/pricing` | Detailed pricing | Plan cards, monthly/annual toggle, full comparison matrix, FAQ snippet, CTA |
| `/login` | Sign in | Centered card, email + password, "Forgot password" link, "Sign up" link |
| `/register` | Sign up | Centered card, email + password + workspace name, terms checkbox, "Sign in" link |
| `/legal/privacy` | Privacy policy | Markdown rendered, single column, sidebar-less |
| `/legal/terms` | Terms of service | Same as privacy |
| `/dashboard` | Today view | KPI tiles, lead queue, recent builds, activity feed |
| `/dashboard/leads` | Lead discovery | Scan form + results table + detail drawer |
| `/dashboard/leads/[id]` | Lead detail | Full business profile, activity log, "Generate site" CTA |
| `/dashboard/sites` | Sites management | Filterable table, bulk actions |
| `/dashboard/sites/new` | Site builder (new) | 3-pane builder, lead prefill support via `?leadId=` |
| `/dashboard/sites/[id]` | Site detail / edit | 3-pane builder with loaded values, publish/unpublish controls |
| `/dashboard/templates` | Template gallery | Grid of template cards with industry + thumbnail |
| `/dashboard/settings` | Settings | Profile, Workspace, Billing, API Keys, Danger zone |
| `/api/auth/[...nextauth]` | NextAuth handler | Credentials provider, JWT session |
| `/api/auth/register` | Register | Creates User + Workspace, returns 201 |
| `/api/leads` | List + scan | GET list, POST scan (returns mock leads) |
| `/api/leads/[id]` | Lead CRUD | GET, PATCH (status, notes), DELETE |
| `/api/sites` | Sites | GET list, POST create (publish) |
| `/api/sites/[id]` | Site CRUD | GET, PATCH (regenerate / unpublish), DELETE |
| `/api/sites/[id]/generate` | AI generation | POST → returns generated site payload (mock for now, structure ready for LLM) |
| `/api/templates` | Templates | GET list of available industry templates |
| `/api/workspace` | Workspace | GET, PATCH (name, slug) |
| `/api/keys` | API keys | GET list, POST create, DELETE revoke |

## 6. CORE FEATURES

**Lead Discovery (mock engine)**
- `POST /api/leads` with `{ area, radius, categories[] }` returns 8–25 mock leads generated deterministically from the area string (seeded random) so scans feel local
- Each lead: `{ id, businessName, category, address, city, state, phone, hasWebsite: false, domainAge: null, googleRating: 3.8–4.9, reviewCount, lat, lng, source: "mock", status: "new" }`
- Stored in `Lead` table on first scan, surfaced on subsequent runs
- `GET /api/leads?status=&q=&page=` returns paginated, filterable list
- `PATCH /api/leads/[id]` updates status (`new|contacted|qualified|disqualified`) and free-text notes
- No real Google Places calls; a single `lib/leads/mockEngine.ts` module with a clear `// MOCK:` comment block and a `// TODO: swap with Google Places / Yelp Fusion` makes the seam obvious

**AI Website Generator (mock, LLM-ready)**
- `POST /api/sites/[id]/generate` accepts template id + business payload, returns a fully structured `site.content` JSON
- Structure (the only thing that matters now):
  ```ts
  {
    template: string,
    theme: { primary: string, font: string },
    sections: [
      { type: "hero", props: { headline, sub, cta, phone, bg } },
      { type: "services", props: { items: [{ title, desc, icon }] } },
      { type: "about", props: { title, body, imageAlt } },
      { type: "testimonials", props: { items: [{ quote, author }] } },
      { type: "contact", props: { address, phone, hours, mapEmbedUrl } },
      { type: "footer", props: { copyright } }
    ]
  }
  ```
- For mock mode: a `lib/generator/mockGenerator.ts` uses a small per-template copy bank and substitutes `{businessName}`, `{city}`, `{tagline}` etc. Output is deterministic for the same input (hash of payload) so the UI doesn't flicker.
- Real LLM seam: `lib/generator/index.ts` exports `generateSite(payload)` that dispatches to mock or `openai` based on env. `OPENAI_API_KEY` absent → mock.
- Rendered in the builder preview by a small client component `<SiteRenderer content={...} />` that maps each section type to a React component. Templates differ only in copy banks + section order + a base CSS variable set; the renderer is the same.
- Each generation writes a `Build` row with `{ siteId, content, createdAt }` for history.

**Templates**
- Ship 5 templates: Plumber, Electrician, Salon, Restaurant, Auto Repair. Each has a copy bank, section order, default theme, and a thumbnail SVG (no raster assets needed).
- Stored as TS modules in `lib/templates/{industry}.ts` exporting `{ id, name, sectionOrder, theme, copyBank, thumbnail }`.
- `GET /api/templates` returns the registry.
- Adding a template = adding one file. Documented in `lib/templates/README.md`.

**Live Preview & Deploy**
- Preview: iframe'd `<SiteRenderer>` in the right pane, device toggle swaps width (1280 / 768 / 390). Iframe `sandbox="allow-same-origin"` only.
- Publish: sets `Site.status = "live"`, generates a `subdomain` (slug + dedupe), sets `publishedAt`, writes a `Deployment` row, returns the preview URL `{subdomain}.velabeam.app` (the URL is a placeholder route in this build; full hosting integration is out of scope but the data model and route are present).
- Re-publish: writes a new `Deployment`, increments `deployCount`.

**Lead CRM**
- Status state machine on Lead (`new → contacted → qualified | disqualified`)
- Activity log entries on every status change, generated, and note add
- "Save" toggles a `saved` boolean on the lead for quick recall

**Workspace & Auth**
- One user belongs to one workspace; workspace is the tenancy boundary for all queries
- All API routes scope by `session.user.workspaceId`
- NextAuth v5 with Credentials provider, JWT strategy, 30-day session
- Password hashing with `bcryptjs` (cost 10)
- Rate limit register: 5/IP/hour (in-memory token bucket, dev-only)

**API Keys (foundational)**
- Generate: returns plaintext token once, stores SHA-256 hash + last-4
- List: shows name, last-4, createdAt, lastUsedAt
- Revoke: deletes
- Auth: `Authorization: Bearer vb_live_...` validated against hash (router scaffolded, not wired to public endpoints in v1)

## 7. DATA MODEL (Prisma / SQLite)

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  passwordHash  String
  name          String?
  workspaceId   String
  workspace     Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  apiKeys       ApiKey[]
  builds        Build[]
  activities    Activity[]
}

model Workspace {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  users     User[]
  leads     Lead[]
  sites     Site[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Lead {
  id           String   @id @default(cuid())
  workspaceId  String
  workspace    Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  businessName String
  category     String
  address      String
  city         String
  state        String
  phone        String?
  hasWebsite   Boolean  @default(false)
  domainAge    Int?
  googleRating Float?
  reviewCount  Int?
  lat          Float?
  lng          Float?
  source       String   @default("mock")
  status       String   @default("new") // new|contacted|qualified|disqualified
  saved        Boolean  @default(false)
  notes        String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  sites        Site[]
  activities   Activity[]
  @@index([workspaceId, status])
  @@index([workspaceId, city])
}

model Site {
  id           String   @id @default(cuid())
  workspaceId  String
  workspace    Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  leadId       String?
  lead         Lead?    @relation(fields: [leadId], references: [id], onDelete: SetNull)
  businessName String
  templateId   String
  subdomain    String   @unique
  status       String   @default("draft") // draft|building|live|error|deleted
  content      Json     // structured site content from generator
  theme        Json
  publishedAt  DateTime?
  deployCount  Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  builds       Build[]
  deployments  Deployment[]
  @@index([workspaceId, status])
}

model Build {
  id        String   @id @default(cuid())
  siteId    String
  site      Site     @relation(fields: [siteId], references: [id], onDelete: Cascade)
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  content   Json
  createdAt DateTime @default(now())
  @@index([siteId, createdAt])
}

model Deployment {
  id        String   @id @default(cuid())
  siteId    String
  site      Site     @relation(fields: [siteId], references: [id], onDelete: Cascade)
  url       String
  status    String   @default("success") // success|failed
  createdAt DateTime @default(now())
  @@index([siteId, createdAt])
}

model Activity {
  id           String   @id @default(cuid())
  workspaceId  String
  userId       String?
  user         User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  leadId       String?
  lead         Lead?    @relation(fields: [leadId], references: [id], onDelete: Cascade)
  siteId       String?
  type         String   // lead.scanned, lead.status_changed, site.created, site.published, site.unpublished, etc.
  message      String
  meta         Json?
  createdAt    DateTime @default(now())
  @@index([workspaceId, createdAt])
}

model ApiKey {
  id          String   @id @default(cuid())
  workspaceId String
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  name        String
  hash        String   @unique
  last4       String
  lastUsedAt  DateTime?
  revokedAt   DateTime?
  createdAt   DateTime @default(now())
}
```

## 8. AUTH

NextAuth.js v5 (beta) with Credentials provider, JWT session strategy.
- `auth.config.ts` declares providers, callbacks (`jwt` adds `userId` + `workspaceId`; `session` exposes them)
- `auth.ts` exports `{ handlers, auth, signIn, signOut }`
- `app/api/auth/[...nextauth]/route.ts` re-exports `handlers.GET` and `handlers.POST`
- Password verification in the `authorize` callback against `User.passwordHash` via `bcryptjs.compare`
- Server-side route protection via `middleware.ts` matching `/dashboard/:path*` — unauthenticated → `/login?next=...`
- Server components/pages call `await auth()` to read the session and resolve the workspace
- All API routes run a `requireWorkspace()` helper that 401s if no session and returns the `workspaceId` for scoping
- `POST /api/auth/register` is a plain route handler (not a NextAuth provider) that creates the User + Workspace, then calls `signIn("credentials", ...)` on the client to mint the session

## 9. FILES

```
app/
  layout.tsx                              // root layout, fonts, theme provider
  page.tsx                                // landing page
  globals.css                             // Tailwind base, CSS variables, utility classes
  pricing/page.tsx                        // pricing page
  login/page.tsx                          // sign in
  register/page.tsx                       // sign up
  legal/privacy/page.tsx                  // privacy
  legal/terms/page.tsx                    // terms
  dashboard/layout.tsx                    // dashboard shell (left nav, top bar)
  dashboard/page.tsx                      // today view
  dashboard/leads/page.tsx                // lead discovery
  dashboard/leads/[id]/page.tsx           // lead detail
  dashboard/sites/page.tsx                // sites management
  dashboard/sites/new/page.tsx            // site builder (new)
  dashboard/sites/[id]/page.tsx           // site detail / edit
  dashboard/templates/page.tsx            // template gallery
  dashboard/settings/page.tsx             // settings
  api/auth/[...nextauth]/route.ts         // NextAuth handler
  api/auth/register/route.ts              // register
  api/leads/route.ts                      // list + scan
  api/leads/[id]/route.ts                 // lead crud
  api/sites/route.ts                      // list + create
  api/sites/[id]/route.ts                 // site crud
  api/sites/[id]/generate/route.ts        // ai generation
  api/templates/route.ts                  // templates
  api/workspace/route.ts                  // workspace
  api/keys/route.ts                       // api keys list/create
  api/keys/[id]/route.ts                  // api key revoke
components/
  marketing/Nav.tsx
  marketing/Footer.tsx
  marketing/Hero.tsx
  marketing/Problem.tsx
  marketing/HowItWorks.tsx
  marketing/Features.tsx
  marketing/PipelineDemo.tsx
  marketing/PricingCards.tsx
  marketing/Testimonials.tsx
  marketing/FAQ.tsx
  marketing/FinalCTA.tsx
  marketing/harbor/ContourLines.tsx       // SVG motif
  marketing/harbor/PierLine.tsx
  ui/Button.tsx
  ui/Card.tsx
  ui/Input.tsx
  ui/Textarea.tsx
  ui/Select.tsx
  ui/Modal.tsx
  ui/Toast.tsx
  ui/Pill.tsx
  ui/Table.tsx
  ui/EmptyState.tsx
  ui/Skeleton.tsx
  ui/StatusDot.tsx
  dashboard/Sidebar.tsx
  dashboard/Topbar.tsx
  dashboard/KpiTile.tsx
  dashboard/LeadQueue.tsx
  dashboard/RecentBuilds.tsx
  dashboard/ActivityFeed.tsx
  dashboard/LeadScanForm.tsx
  dashboard/LeadTable.tsx
  dashboard/LeadDetailDrawer.tsx
  dashboard/TemplateGallery.tsx
  dashboard/SiteBuilder.tsx
  dashboard/SiteForm.tsx
  dashboard/SitePreview.tsx
  dashboard/SiteRenderer.tsx              // renders generated JSON
  dashboard/DeviceToggle.tsx
  dashboard/SitesTable.tsx
  dashboard/SettingsSections.tsx
  auth/AuthCard.tsx
lib/
  prisma.ts                               // Prisma client singleton
  auth.ts                                 // NextAuth v5 init + exports
  auth.config.ts                          // providers, callbacks
  session.ts                              // requireSession, requireWorkspace helpers
  validators.ts                           // zod schemas
  slug.ts                                 // subdomain slugify + dedupe
  activity.ts                             // writeActivity()
  leads/mockEngine.ts                     // MOCK lead generator
  generator/index.ts                      // dispatch (mock | openai)
  generator/mockGenerator.ts              // MOCK generator
  generator/prompts.ts                    // LLM prompt scaffolds
  templates/registry.ts                   // template registry
  templates/plumber.ts
  templates/electrician.ts
  templates/salon.ts
  templates/restaurant.ts
  templates/autoRepair.ts
  templates/README.md
  api/keys.ts                             // hash/verify
  rateLimit.ts                            // in-memory token bucket
prisma/
  schema.prisma
  seed.ts                                 // creates demo workspace + leads
middleware.ts                             // protects /dashboard
tailwind.config.ts
postcss.config.js
next.config.ts
tsconfig.json
package.json
.env.example
README.md
```

## 10. ACCEPTANCE

- [ ] `pnpm dev` (or `npm run dev`) starts Next.js 15 with no errors; `prisma migrate dev` creates SQLite DB; `prisma db seed` populates a demo workspace with one user and 12 leads
- [ ] Landing page renders hero, problem, how-it-works, features, pipeline demo, pricing, testimonial placeholders, FAQ, final CTA, footer — all with the navy/cobalt/slate palette, IBM Plex Sans + Inter Tight, no fake logos or invented stats beyond the sourced "27% / 9M" figures
- [ ] `/register` creates a User + Workspace, auto signs in, redirects to `/dashboard`
- [ ] `/login` authenticates with the credentials provider and redirects; bad credentials show inline error
- [ ] Middleware blocks unauthenticated `/dashboard/*` requests
- [ ] `/dashboard` shows 4 KPI tiles, lead queue, recent builds, activity feed
- [ ] `/dashboard/leads` scan form returns 8–25 deterministic mock leads for any input area; results paginate, filter by status, and are saved to DB
- [ ] Lead row opens detail drawer; status changes write `Activity` rows
- [ ] "Generate site" on a lead routes to `/dashboard/sites/new?leadId=...` with lead data prefilled in the form
- [ ] Site builder left pane lists 5 industry templates; selecting one updates copy bank in preview
- [ ] Center form edits are debounced and re-render the right-pane preview via `<SiteRenderer>`; device toggle swaps preview width
- [ ] "Publish" creates a Site with `status="live"`, writes a Deployment, returns a `{subdomain}.velabeam.app` URL, and shows a success toast
- [ ] `/dashboard/sites` lists all sites with status pills, filters, and bulk actions
- [ ] Site row click opens `/dashboard/sites/[id]` in edit mode with values loaded
- [ ] Unpublish sets status to `draft`; delete soft-deletes (hidden from list)
- [ ] `/dashboard/settings` shows profile, workspace, billing placeholder, API key generate/revoke
- [ ] All API routes scope queries by `session.user.workspaceId`; cross-tenant access returns 404
- [ ] `/api/sites/[id]/generate` works without `OPENAI_API_KEY` (mock path) and is structured to accept one (real LLM path documented in `lib/generator/prompts.ts`)
- [ ] No invented testimonials, customer names, company logos, user counts, ratings, or press mentions anywhere in the UI
- [ ] Color tokens, type scale, and motion timings match the spec; reduced-motion is respected
- [ ] Lighthouse on landing page: Performance ≥ 90, Accessibility ≥ 95, no contrast violations on the navy/cobalt/green combinations
- [ ] No `any` types in `lib/`; all API inputs validated with zod

FILES: ["app/layout.tsx","app/page.tsx","app/globals.css","app/pricing/page.tsx","app/login/page.tsx","app/register/page.tsx","app/legal/privacy/page.tsx","app/legal/terms/page.tsx","app/dashboard/layout.tsx","app/dashboard/page.tsx","app/dashboard/leads/page.tsx","app/dashboard/leads/[id]/page.tsx","app/dashboard/sites/page.tsx","app/dashboard/sites/new/page.tsx","app/dashboard/sites/[id]/page.tsx","app/dashboard/templates/page.tsx","app/dashboard/settings/page.tsx","app/api/auth/[...nextauth]/route.ts","app/api/auth/register/route.ts","app/api/leads/route.ts","app/api/leads/[id]/route.ts","app/api/sites/route.ts","app/api/sites/[id]/route.ts","app/api/sites/[id]/generate/route.ts","app/api/templates/route.ts","app/api/workspace/route.ts","app/api/keys/route.ts","app/api/keys/[id]/route.ts","components/marketing/Nav.tsx","components/marketing/Footer.tsx","components/marketing/Hero.tsx","components/marketing/Problem.tsx","components/marketing/HowItWorks.tsx","components/marketing/Features.tsx","components/marketing/PipelineDemo.tsx","components/marketing/PricingCards.tsx","components/marketing/Testimonials.tsx","components/marketing/FAQ.tsx","components/marketing/FinalCTA.tsx","components/marketing/harbor/ContourLines.tsx","components/marketing/harbor/PierLine.tsx","components/ui/Button.tsx","components/ui/Card.tsx","components/ui/Input.tsx","components/ui/Textarea.tsx","components/ui/Select.tsx","components/ui/Modal.tsx","components/ui/Toast.tsx","components/ui/Pill.tsx","components/ui/Table.tsx","components/ui/EmptyState.tsx","components/ui/Skeleton.tsx","components/ui/StatusDot.tsx","components/dashboard/Sidebar.tsx","components/dashboard/Topbar.tsx","components/dashboard/KpiTile.tsx","components/dashboard/LeadQueue.tsx","components/dashboard/RecentBuilds.tsx","components/dashboard/ActivityFeed.tsx","components/dashboard/LeadScanForm.tsx","components/dashboard/LeadTable.tsx","components/dashboard/LeadDetailDrawer.tsx","components/dashboard/TemplateGallery.tsx","components/dashboard/SiteBuilder.tsx","components/dashboard/SiteForm.tsx","components/dashboard/SitePreview.tsx","components/dashboard/SiteRenderer.tsx","components/dashboard/DeviceToggle.tsx","components/dashboard/SitesTable.tsx","components/dashboard/SettingsSections.tsx","components/auth/AuthCard.tsx","lib/prisma.ts","lib/auth.ts","lib/auth.config.ts","lib/session.ts","lib/validators.ts","lib/slug.ts","lib/activity.ts","lib/leads/mockEngine.ts","lib/generator/index.ts","lib/generator/mockGenerator.ts","lib/generator/prompts.ts","lib/templates/registry.ts","lib/templates/plumber.ts","lib/templates/electrician.ts","