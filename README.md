# Jupiter Decors — Website

Static marketing website for **Jupiter Decors**, a painting service in Chennai, Tamil Nadu.
Built with React, Vite, TypeScript, Tailwind CSS, React Router and Lucide icons. No backend or database.

## Quick start

Requires Node.js 18 or newer.

```bash
npm install        # install dependencies
npm run dev        # run locally at http://localhost:5173
npm run build      # type-check and build to ./dist
npm run preview    # preview the production build
```

## ✅ Before you go live — checklist

Everything below is edited in **`src/config/business.ts`** (one file, used everywhere on the site).
Empty values are hidden automatically; nothing fake is ever displayed. While you run `npm run dev`
a yellow box lists anything still missing, and `npm run build` prints the same list.

| Setting | Why it matters |
| --- | --- |
| `whatsapp` | **Required for the enquiry form.** Without it (or an email) the form can't send anything. |
| `phone` | Shows the click-to-call buttons. |
| `email` | Shown in the footer; used by the form only if WhatsApp isn't set. |
| `address`, `postalCode`, `googleMapsUrl` | Optional location details and map link. |
| `workingHours` | Opening hours shown on the contact page and footer. |
| `serviceAreas` | Only list Chennai areas you have confirmed you serve. |
| `social` | Instagram / Facebook / YouTube links. |
| `siteUrl` | Your live domain. Enables canonical URLs, Open Graph images and `sitemap.xml`. |
| `formspreeFormId` | Formspree form ID (e.g. `xyzabcde` from `https://formspree.io/f/xyzabcde`). When set, enquiries are emailed to you via Formspree. |

Also:

1. **Photos** — add real photos to `public/images/` (see `public/images/README.txt` for file names). Only use photos you own or are licensed to use.
2. **Projects** — in `src/data/projects.ts`, replace the sample entries with real projects and set `isPlaceholder: false`. The "sample placeholders" notice disappears once no placeholders remain.
3. **Reviews** — add genuine customer reviews (with permission) to `src/data/testimonials.ts`. The section stays hidden until you do.
4. **"Get a Free Quote"** — the hero button text says "Free". If quotations are not free, change it in `src/components/home/Hero.tsx`.

## How enquiries work

**With Formspree (recommended):** set `formspreeFormId` in `src/config/business.ts`. The form posts the
enquiry to `https://formspree.io/f/<id>` and Formspree emails it to the address on your Formspree account.
The visitor sees "Thank you — your enquiry has been sent" only after Formspree confirms it. A hidden
`_gotcha` field filters basic spam bots. The free plan allows 50 submissions per month.

**Without Formspree (fallback, no server):**

Because this is a static site, form submissions are **not stored anywhere**.

1. The visitor fills in name, phone, service, location and (optionally) requirements.
2. The form validates the fields and shows clear errors next to anything missing or invalid.
3. When valid, it opens WhatsApp using the official click-to-chat link
   (`https://wa.me/<number>?text=<URL-encoded message>`) with the enquiry pre-written.
4. The visitor must tap **Send** in WhatsApp. The site tells them this — it never shows a false "message sent" confirmation.

If no WhatsApp number is set but an email is, the form opens the visitor's email app instead.
Logic lives in `src/lib/whatsapp.ts` and `src/lib/enquiry.ts`.
Formspree submission lives in `submitToFormspree()` in `src/lib/enquiry.ts`.

## Editing content

| What | File |
| --- | --- |
| Contact details, hours, areas | `src/config/business.ts` |
| Service text, benefits, steps | `src/data/services.ts` |
| Project gallery | `src/data/projects.ts` |
| Customer reviews | `src/data/testimonials.ts` |
| FAQs | `src/data/faqs.ts` |
| Colours and fonts | `src/index.css` (`@theme` block) |

Each service page (`/services/<slug>`) is generated from `services.ts` using one shared layout,
so adding a service there automatically creates its page, card, footer link and sitemap entry.

## Pages

`/`, `/services`, `/services/interior-painting`, `/services/exterior-painting`,
`/services/new-house-painting`, `/services/repainting`, `/services/waterproofing`,
`/services/texture-painting`, `/projects`, `/about`, `/contact`, and a 404 page.

## SEO

- Unique title, description, Open Graph and canonical tags per page (`src/lib/seo.ts`).
- `HousePainter` structured data built only from details you have filled in.
- `robots.txt` always generated; `sitemap.xml` generated once `siteUrl` is set.
- Images lazy-load below the fold and reserve space to avoid layout shift.

## Deploying

Run `npm run build` and upload the `dist/` folder. Refreshing any page works on these hosts:

- **Netlify** — drag `dist/` into Netlify, or connect the repo (build: `npm run build`, publish: `dist`). `public/_redirects` is included.
- **Vercel** — import the repo; `vercel.json` is included.
- **Other hosts** — configure all unknown paths to serve `index.html` (single-page app fallback).

## Accessibility

Keyboard-accessible navigation, skip link, visible focus rings, labelled form fields with
announced errors, an image lightbox with Esc / arrow-key support and focus trapping, and
reduced-motion support. Button colours use a darker terracotta (`#B0552A`) so white text meets
WCAG AA contrast; the original `#D97745` is used for accents and icons.

## Images

Every image slot already has a matching stock photo (free Pexels licence), listed in
`src/data/images.ts`. Until a file exists in `public/images`, the site loads the stock
photo from Pexels. Run `npm run images` once to download them all into `public/images`
so the site hosts them itself. To use your own photo, save it in `public/images` under
the same file name — your file always wins. Project gallery photos keep their "Sample"
label until you replace them with real work and set `isPlaceholder: false`.

## SEO

- Page titles and descriptions for every route live in `src/data/seo.ts`. The homepage
  tab title is just "Jupiter Decors"; inner pages are "Page | Jupiter Decors".
- `npm run build` writes a static HTML file per route with its own title, description,
  canonical URL, Open Graph/Twitter tags and schema.org data (HousePainter business,
  FAQ on the homepage, Service + breadcrumbs on service pages), plus `sitemap.xml`
  and `robots.txt`.
- **Set `siteUrl` in `src/config/business.ts` before going live.** Canonical URLs,
  the sitemap and share-preview images need it. Filling in phone, address and
  service areas there also strengthens the local business data.
- After launch, add the site to Google Search Console, submit `/sitemap.xml`, and
  create a Google Business Profile using the same name, phone and address.
