# Coolviro Services — Website

Professional home appliance repair & service website for **Coolviro Services**, Kolkata. Built with Next.js (React + JavaScript), focused on customer bookings and local SEO.

## 1. Project Overview

A conversion-focused, SEO-optimized marketing + booking website for a home appliance repair business (AC, Refrigerator, Geyser, Microwave Oven, Washing Machine) serving Kolkata and nearby areas (Salt Lake, New Town, Kasba, Park Street, Belgharia, Ballygunge, Jadavpur, Dum Dum, Barasat, Barrackpore).

The site has **no admin panel, no customer login, and no online payment** — its only jobs are: inform, and get customers to Call, WhatsApp, or submit the booking form.

There is no logo file in the project's assets, so the header/footer currently render a clean SVG wordmark built from the brand colors (see "Logo" below) — swap it for the real logo whenever it's available.

## 2. Technology

- **Next.js 14** (Pages Router) + **React 18**, plain **JavaScript** (no TypeScript)
- Plain **CSS** with CSS variables for the design system + [styled-jsx](https://github.com/vercel/styled-jsx) (built into Next.js) for component-scoped styles — no CSS framework dependency
- **Nodemailer** for the server-side booking email (API route, not a third-party form service)
- No UI kit, no icon-font library, no analytics library — everything is hand-built and only loads when configured

## 3. Installation

Requires Node.js 18.18+.

```bash
npm install
```

## 4. Local Development

```bash
npm run dev
```

Visit **http://localhost:3000**. The site runs fully locally — no domain or hosting purchase required to test it.

Booking form submissions work locally too: without SMTP credentials configured, the API route runs in **development mode** and logs the booking to your terminal instead of sending an email (see "Booking Email Setup" below).

## 5. How to Run (all commands)

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Production build (also regenerates `sitemap.xml`/`robots.txt`) |
| `npm start` | Serve the production build (`npm run build` first) |
| `npm run lint` | Run ESLint |
| `npm run seo:generate` | Regenerate `sitemap.xml`/`robots.txt` from `SITE_URL` without a full build |

## 6. Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

`.env.local` is gitignored — **never commit real credentials**. See `.env.example` for the full list with explanations. Summary:

| Variable | Purpose |
|---|---|
| `EMAIL_TO` | Booking notification destination (pre-filled: `suvojitroy188@gmail.com`) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` | SMTP credentials used to send the booking email |
| `EMAIL_FROM` | Optional "From" address override |
| `SITE_URL` | Production domain, used for canonical URLs, Open Graph, sitemap.xml, robots.txt |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Google Analytics 4 Measurement ID (script only loads if this is set) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console HTML tag verification code |

No secret is ever imported into client-side/browser code — SMTP credentials are only read inside `pages/api/booking.js`, which runs on the server.

## 7. Booking Email Setup

**Flow:** Customer → Booking Form → `pages/api/booking.js` (server-side API route) → Email Service (SMTP via Nodemailer) → `suvojitroy188@gmail.com`.

The booking form (`src/components/booking/BookingForm.jsx`) POSTs to `/api/booking`. That route:

1. Validates every field again on the server (never trusts the client).
2. Rejects the request if a hidden honeypot field was filled in (basic bot protection) or if the request is rate-limited.
3. If real SMTP credentials are present in the environment, sends the booking details by email via Nodemailer.
4. If SMTP credentials are **not** configured, it logs the booking to the server console instead ("development mode") and still returns success — it never claims an email was sent when it wasn't.

### To enable real email delivery

Set these in `.env.local` (development) or your hosting provider's environment variables (production):

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-sending-address@gmail.com
SMTP_PASS=your-16-character-app-password
EMAIL_FROM=your-sending-address@gmail.com
EMAIL_TO=suvojitroy188@gmail.com
```

Works with any SMTP provider — Gmail (with an [App Password](https://support.google.com/accounts/answer/185833), not your regular password), SendGrid, Mailgun, Amazon SES, Postmark, Zoho Mail, etc. Just point `SMTP_HOST`/`SMTP_PORT`/`SMTP_USER`/`SMTP_PASS` at whichever provider you choose.

### How to test the booking form

1. Run `npm run dev`, open the site, scroll to "Book a Service" (or visit `/#booking`).
2. Fill in the form and submit.
3. **Without** SMTP configured: check your terminal — you'll see `[Coolviro booking - DEV MODE, email not sent]` followed by the submitted details, and the form shows the success message.
4. **With** SMTP configured: check the `EMAIL_TO` inbox for the notification email.

### Production email delivery

Once real SMTP credentials are set as environment variables on your hosting provider (see "Deployment" below) and the site is deployed, every booking form submission will trigger a real email to `suvojitroy188@gmail.com` automatically — no code changes needed.

## 8. Phone Configuration

The phone number is centralized in `src/data/site.js`:

```js
phoneDisplay: '+91 82401 06770',
phoneHref: 'tel:+918240106770',
```

Every "Call Now" button across the site uses these values. To change the number, edit this one file.

## 9. WhatsApp Configuration

Also in `src/data/site.js`:

```js
whatsappDisplay: '+91 82401 06770',
whatsappHref: 'https://wa.me/918240106770',
```

Every "WhatsApp Us" button uses these values (some also pre-fill a message via `whatsappHrefWithText`).

## 10. Service & Pricing Configuration

All service data — name, starting price, appliance types, supported brands, FAQs, SEO copy — lives in one file: `src/data/services.js`. Editing a service's `startingPrice`/`priceDisplay`, `types`, or `brands` array automatically updates:

- The homepage service cards
- The `/services` index page
- The individual service page (hero, overview, chips, FAQ schema)
- The booking form's "Select Service" and dynamic "Appliance Type" options
- The Service structured data (JSON-LD) on that service's page

Service areas are centralized in `src/data/site.js` (`serviceAreas` array) and used on the homepage, `/areas` page, footer, and structured data.

## 11. Image Replacement

- **Logo** (`src/components/ui/Logo.jsx`) uses the official Coolviro Services logo at `public/images/brand/coolviro-logo.png` — cropped (logo mark only, no technician photo) and background-removed from the original artwork the client supplied. The untouched original artwork is kept for reference/provenance at `design-assets/coolviro-brand-artwork-source.png` — deliberately **outside** `public/`, since anything under `public/` is directly servable by URL regardless of whether a page links to it, and that source artwork includes a technician's photo the site itself never displays. Rendered via `next/image`, so the logo is automatically served as an optimized, appropriately-sized WebP/AVIF in production. On the dark footer, it's shown inside a small white badge (`.site-footer-logo-badge` in `Footer.jsx`) so the logo's dark navy text stays legible — remove that wrapper if a future logo version already has enough contrast on dark backgrounds.
- No product/appliance photography or technician photos were supplied for the services themselves, so **service illustrations** (`src/components/ui/ApplianceArt.jsx`) are clean, on-brand vector graphics, not photos.
- The **favicon/app icons** (`favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) and the Open Graph share image (`public/images/og-default.jpg`) still use the original placeholder mark — the supplied artwork doesn't crop cleanly into a small square icon without cutting into the wordmark or the photo, so regenerate these from a proper square icon version of the logo if/when one is available.

To replace service photography or update the logo further:

1. Add optimized `.webp`/`.avif` files to `/public/images/services/` (e.g. `ac-service.webp`) or `/public/images/brand/`.
2. Swap the relevant `<ApplianceArt type="..." />` usage for a Next.js `<Image>` component, or update `LOGO_SRC`/`LOGO_WIDTH`/`LOGO_HEIGHT` in `src/components/ui/Logo.jsx` to point at the new file (keep `width`/`height` accurate — they come from the source image's real pixel dimensions and drive the aspect ratio).
3. Regenerate `favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, and `public/images/og-default.jpg` from the logo (any image editor or a quick script works — see `scripts/` for how the current placeholder-based versions were generated).

## 12. Google Analytics (GA4) Setup

Analytics is **off by default** — no script loads unless configured, per the project's performance/privacy requirements.

1. Create a GA4 property and get its Measurement ID (format `G-XXXXXXXXXX`).
2. Set `NEXT_PUBLIC_GA4_MEASUREMENT_ID` in your environment.
3. Rebuild/redeploy. `src/components/seo/Analytics.jsx` will now load `gtag.js` automatically on every page.

## 13. Search Console Setup

1. Verify your domain in [Google Search Console](https://search.google.com/search-console) using the "HTML tag" method.
2. Copy just the `content="..."` value from the verification meta tag.
3. Set `NEXT_PUBLIC_GSC_VERIFICATION` in your environment and redeploy — it's rendered as a `<meta name="google-site-verification">` tag on every page (`src/components/seo/SEO.jsx`).
4. Submit `https://<your-domain>/sitemap.xml` in Search Console → Sitemaps.

## 14. Domain Configuration

No domain has been purchased yet. Once you have one:

1. Set `SITE_URL=https://your-real-domain.com` in your hosting provider's environment variables.
2. Rebuild — `npm run build` runs `scripts/generate-seo-files.mjs` afterward (`postbuild`), which regenerates `public/sitemap.xml` and `public/robots.txt` using `SITE_URL`. Canonical URLs and Open Graph tags (`src/components/seo/SEO.jsx`) also read from `SITE_URL` automatically.

Until `SITE_URL` is set, these files use a clearly-labeled placeholder domain (`your-production-domain-example.com`) so the site still builds and runs locally.

## 15. Production Build

```bash
npm run build
npm start
```

`npm start` serves the optimized production build on port 3000 (override with `-p`, e.g. `npm start -- -p 4000`).

## 16. Deployment

This is a standard Next.js app (Pages Router) with one serverless API route (`/api/booking`), so it deploys cleanly to any Node-capable host:

- **Vercel** (recommended — zero-config for Next.js): connect the repo, set the environment variables from `.env.example` in the project settings, deploy.
- **Netlify**, **Render**, or any Node host: build with `npm run build`, run with `npm start`, and set the same environment variables.

No database, admin panel, or payment gateway is required — the only server-side piece is the booking email API route.

---

## Design System

Brand colors, spacing, radii, and shadows are defined as CSS variables in `src/styles/globals.css`:

- Primary `#0066FF`, Secondary `#00C2FF`, Text `#0F172A`, Background `#FFFFFF`, Section Background `#F0F9FF`

## Project Structure

```
pages/                  Next.js routes (file-based routing)
  api/booking.js        Server-side booking email API route
  services/              Services index + 5 individual service pages
  index.js, about.js, contact.js, areas.js, ...
src/
  components/
    layout/              Header, MobileMenu, Footer, StickyMobileCTA, Layout
    ui/                   Button, CTAButtons, ServiceCard, Breadcrumb, FAQAccordion, Icons, Logo, ApplianceArt
    booking/              BookingForm, BookingSection
    services/             ServicePageTemplate (shared 13-part service page layout)
    seo/                  SEO, OrganizationSchema, ServiceSchema, Analytics
    legal/                LegalLayout
  data/                  site.js, services.js — single source of truth for all business facts
  utils/                 validation.js (shared client+server), email.js (server-only)
  styles/globals.css     Design system + base styles
scripts/generate-seo-files.mjs   Builds sitemap.xml/robots.txt from SITE_URL
public/                  Static assets, icons, manifest
```

## Local Testing Checklist

Before deploying, verify locally (`npm run dev`):

- [ ] Homepage, Services index, all 5 service pages, Areas, About, Contact load correctly
- [ ] Header nav + hamburger menu work on mobile (open/close, keyboard accessible, Escape closes)
- [ ] Call Now (`tel:+918240106770`) and WhatsApp Us (`https://wa.me/918240106770`) links work
- [ ] Every "Book Online" / "Book a Service" / "Book Now" button scrolls to or opens the booking form
- [ ] Booking form: required-field validation, Indian mobile/pincode validation, dynamic Appliance Type options per Service, success message, and dev-mode console logging all work
- [ ] Responsive at mobile / tablet / desktop widths — no horizontal scroll, no clipped text, no overlapping elements
- [ ] 404 page appears for unknown URLs, with working "Go Home" / "View Services" / "Book a Service" buttons
- [ ] `npm run build && npm run lint` complete with no errors

## What This Site Intentionally Does Not Include

Per project requirements: no admin panel, no customer/technician login, no shopping cart or online payment, no fabricated reviews/ratings/certifications/awards/brand partnerships, no business address, no Google Maps embed, and no invented business facts. Anywhere real information was missing, this is documented above (or marked `[NEEDS USER INPUT]` in `.env.example`) rather than invented.

## Security Notes

- `npm audit` may report a small number of vulnerabilities inherited from Next.js 14's internal build tooling (e.g. PostCSS source-map handling). These affect the framework's own dev/build tooling; fixing them fully requires upgrading to Next.js 15/16, which is a larger migration best done deliberately rather than as part of this build. Run `npm audit` periodically and plan a Next.js upgrade when convenient.
- No secrets are present in this repository. All credentials are read from environment variables on the server only.
