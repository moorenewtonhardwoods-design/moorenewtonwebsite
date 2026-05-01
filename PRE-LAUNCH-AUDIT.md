# Pre-Launch Audit — moorenewton.com

**Date of audit:** 2026-05-01  
**Audited by:** Claude Code (Opus)  
**Audit scope:** Full read-only audit per Pre-Launch Audit Prompt  
**Staging URL tested:** https://moorenewtonwebsite-production.up.railway.app

---

## Executive Summary

The moorenewton.com site is **ready for launch** pending CSP verification. The core functionality is solid: 23 species pages are published and rendering, all 5 core pages work, forms are properly secured with server-side validation and honeypot protection, SEO infrastructure is comprehensive (all 11 JSON-LD schema types implemented), and accessibility fundamentals are in place.

**Fixed since initial audit:**
- ~~Color contrast violations~~ — Fixed: `--color-accent` darkened to `#7F5D0C`, muted text opacity increased to 85%
- ~~6 moderate dependency vulnerabilities~~ — Fixed via pnpm overrides for js-yaml, uuid, postcss
- ~~Articles not published~~ — Fixed: 4 articles seeded, published, and added to sitemap
- ~~No CSP header~~ — In progress: CSP deployed in report-only mode, awaiting 24-hour verification before enforcement

**Findings summary:** 0 blockers (1 in verification), 6 should-fix items, 5 polish items.

---

## Launch Blockers (Must Fix Before Going Live)

### Finding 1: Content-Security-Policy Header — ⏳ IN VERIFICATION

- **Category:** 7 — Security
- **Severity:** ~~Blocker~~ → In Verification
- **Status:** CSP deployed in **report-only mode** as of 2026-05-01. Awaiting 24-hour verification before switching to enforcement mode.
- **What was done:**
  - Enumerated all external resources (see `CSP-IMPLEMENTATION.md`)
  - Implemented strict CSP for main site, permissive CSP for /studio
  - Deployed as `Content-Security-Policy-Report-Only` header
- **Main site CSP:**
  ```
  default-src 'self'; script-src 'self' https://www.googletagmanager.com; 
  style-src 'self' 'unsafe-inline'; img-src 'self' https://cdn.sanity.io data:; 
  font-src 'self'; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; 
  frame-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
  ```
- **Next step:** After 24 hours with no violations in browser console, switch from `Content-Security-Policy-Report-Only` to `Content-Security-Policy` in `next.config.ts`

---

### ~~Finding 2: Color Contrast Violations (WCAG AA Failures)~~ ✅ FIXED

- **Category:** 5 — Accessibility
- **Severity:** ~~Blocker~~ → Resolved
- **What was wrong:** Two color combinations failed WCAG 2.1 AA contrast requirements:
  - `#877961` on `#ede6d8` background: **3.42:1** (requires 4.5:1)
  - `#8b6914` on `#f5f0e8` background: **4.48:1** (requires 4.5:1)
- **Fix applied:**
  - Darkened `--color-accent` from `#8B6914` to `#7F5D0C` (now 5.33:1 on canvas, 4.87:1 on surface)
  - Changed all `text-body/60`, `text-body/70`, `text-body/80` to `text-body/85` (now 4.81:1 on surface, 5.12:1 on canvas)
  - Re-enabled `color-contrast` checks in `tests/e2e/a11y.spec.ts`
  - All 18 Playwright tests pass with contrast checks enabled

---

### ~~Finding 3: Dependency Vulnerabilities (6 Moderate)~~ ✅ FIXED

- **Category:** 7 — Security
- **Severity:** ~~Blocker~~ → Resolved
- **What was wrong:** `pnpm audit` reported 6 moderate vulnerabilities in js-yaml, uuid, and postcss (transitive deps from Sanity/Next.js).
- **Fix applied:**
  - Added pnpm overrides to `package.json`:
    ```json
    "pnpm": {
      "overrides": {
        "js-yaml@<3.14.2": ">=3.14.2",
        "uuid@<14.0.0": ">=14.0.0",
        "postcss@<8.5.10": ">=8.5.10"
      }
    }
    ```
  - `pnpm audit` now returns: **No known vulnerabilities found**
  - Build verified: 54 pages, all tests pass

---

### ~~Finding 4: Launch Articles Not Published~~ ✅ FIXED

- **Category:** 1 — Content Completeness
- **Severity:** ~~Blocker~~ → Resolved
- **What was wrong:** The 4 launch articles existed as drafts but were not published in Sanity.
- **Fix applied:**
  - Ran `npx tsx scripts/seed-articles.ts` to seed all 4 articles
  - Ran `npx tsx scripts/publish-drafts.ts` to publish them
  - Ran `npx tsx scripts/add-publish-dates.ts` to add `publishedAt` dates (required for sitemap query)
  - Updated `app/sitemap.xml/route.ts` to include articles in the sitemap
  - Verified: `/articles` page renders all 4 articles, sitemap includes `/articles/*` URLs

---

## Should Fix (Meaningful Issues, Not Blockers)

### Finding 5: Species Pages Missing Product Hub Links

- **Category:** 2 — Internal Linking
- **Severity:** Should Fix
- **What's wrong:** Per CLAUDE.md §6, every species page should link to "≥1 product hub page." Currently, species pages only have a millwork CTA linking to `/quote`. There are no links to `/products/hardwood-lumber`, `/products/hardwood-plywood`, etc.
- **Why it matters:** Internal linking distributes page authority and helps users discover related products. Missing product hub links means species pages are SEO islands.
- **Recommended fix:** Add a "Shop This Species" section to `app/(site)/species/[slug]/page.tsx` with links to relevant product categories based on species category (hardwood → hardwood-lumber, softwood → softwood-lumber).
- **Estimated effort:** M (1-2 hours)

---

### Finding 6: No Lighthouse CI Configured

- **Category:** 4 — Performance
- **Severity:** Should Fix
- **What's wrong:** CUTOVER.md specifies Lighthouse targets (Performance >90, A11y >90, BP >90, SEO >90), but `.github/workflows/ci.yml` only runs lint, typecheck, and Playwright tests. No Lighthouse CI step exists.
- **Why it matters:** Performance budgets (LCP <2.5s, CLS <0.1, INP <200ms, JS <150kb) cannot be verified or enforced. Regressions will ship silently.
- **Recommended fix:** Add `@lhci/cli` to devDependencies and a Lighthouse CI step to the workflow. Create `.lighthouserc.json` with assertion thresholds.
- **Estimated effort:** M (1 hour)

---

### Finding 7: Contact Page Meta Description Over Limit

- **Category:** 3 — SEO Metadata
- **Severity:** Should Fix
- **What's wrong:** Contact page meta description is 168 characters. CLAUDE.md §6 specifies 150-160 characters. 8 characters over the soft limit.
- **Why it matters:** Google truncates descriptions over ~160 chars. The trailing content ("We respond within one business day") gets cut off.
- **Recommended fix:** Edit Contact page metadata in `app/(site)/contact/page.tsx` to trim description to 160 chars or fewer.
- **Estimated effort:** S (10 minutes)

---

### Finding 8: Species Hero Images — Verify Flagged Species

- **Category:** 9 — Sanity Content Quality
- **Severity:** Should Fix
- **What's wrong:** The audit prompt flagged Alder, Ash, Honduran Mahogany, and Western Red Cedar as potentially missing hero images. These species ARE in the sitemap and rendering, but hero image upload status needs manual verification in Sanity Studio.
- **Why it matters:** Pages without hero images may render with fallback placeholders or broken layouts.
- **Recommended fix:** Open Sanity Studio, navigate to each flagged species document, verify `heroImage` field is populated. If missing, upload appropriate imagery or ensure graceful fallback renders.
- **Estimated effort:** S (30 minutes manual check)

---

### Finding 9: Product Pages Not CMS-Driven

- **Category:** 1 — Content Completeness
- **Severity:** Should Fix
- **What's wrong:** Product pages are static routes (hardcoded in `app/(site)/products/*/page.tsx`), not rendered from Sanity. There's no `scripts/seed-products.ts` script, despite `productPage` schema existing and queries (`getAllProducts`, `getProductBySlug`) being defined.
- **Why it matters:** Content cannot be edited without code deploys. Future product additions require developer intervention.
- **Recommended fix:** Either accept static product pages for v1 (document as known limitation) OR migrate to dynamic `[slug]` routing with Sanity content.
- **Estimated effort:** L (4-6 hours if migrating)

---

### Finding 10: Homepage Transient 503

- **Category:** 10 — Production Cutover
- **Severity:** Should Fix
- **What's wrong:** Initial `curl -I https://moorenewtonwebsite-production.up.railway.app/` returned HTTP 503, though the homepage HTML subsequently loaded (90KB response). Other pages returned 200 consistently.
- **Why it matters:** May indicate CDN cache warming issues or sporadic origin errors. Monitor closely post-cutover.
- **Recommended fix:** Check Railway logs for the 503 cause. May be benign (cold start, cache miss) but warrants investigation.
- **Estimated effort:** S (30 minutes investigation)

---

## Polish Items (Nice-to-Have, Can Do Post-Launch)

### Finding 11: Sanity Image URL Missing Quality Optimization

- **Category:** 4 — Performance
- **Severity:** Polish
- **What's wrong:** `lib/sanity/image.ts` builds image URLs without explicit quality parameter. Images served at default quality (~80-100).
- **Recommended fix:** Add `.quality(75).auto('format')` to `urlFor()` helper.
- **Estimated effort:** S (15 minutes)

---

### Finding 12: No Bundle Analysis Configured

- **Category:** 4 — Performance
- **Severity:** Polish
- **What's wrong:** No `@next/bundle-analyzer` or similar configured. Cannot verify <150kb JS budget.
- **Recommended fix:** Add bundle analyzer to dev workflow.
- **Estimated effort:** S (30 minutes)

---

### Finding 13: Footer Legal/Social Links Empty

- **Category:** 2 — Internal Linking
- **Severity:** Polish
- **What's wrong:** `Footer.tsx` has empty arrays for `legalLinks` and `socialLinks`. Privacy Policy, Terms of Service, and Instagram links are commented out.
- **Recommended fix:** Either populate with real links or remove the sections entirely.
- **Estimated effort:** S (15 minutes)

---

### Finding 14: Missing Blur Placeholders on Hero Images

- **Category:** 4 — Performance
- **Severity:** Polish
- **What's wrong:** Hero images use `fill` layout without `placeholder="blur"`. Initial load shows empty space before image renders.
- **Recommended fix:** Generate LQIP placeholders from Sanity asset metadata.
- **Estimated effort:** M (1-2 hours)

---

### Finding 15: In-Memory Rate Limiting Resets on Deploy

- **Category:** 6 — Forms
- **Severity:** Polish
- **What's wrong:** Form rate limiting uses in-memory Map. Each Railway deploy resets the rate limit state.
- **Recommended fix:** Accept for v1 (low traffic) or migrate to Redis/KV store post-launch.
- **Estimated effort:** M (2-3 hours if migrating)

---

## Verified Passing

**Category 1 — Content Completeness:**
- 23 species pages published and in sitemap (matches 23 Copy drafts)
- 5 core pages (Home, About, Contact, Quote, Delivery) rendering
- 7 product pages rendering (static routes)

**Category 2 — Internal Linking:**
- Header: 7 nav links, all resolve
- Footer: 7 site links, all resolve
- Product pages: 19 species links on Hardwood Lumber (exceeds ≥3 requirement)
- `/robots.txt`: Returns 200, allows all, disallows /studio
- `/sitemap.xml`: Returns 200, 30 URLs total

**Category 3 — SEO Metadata:**
- All 11 JSON-LD schema types implemented per CLAUDE.md §6
- `buildMetadata()` validates title (60 chars) and description (160 chars) in dev
- Canonical URLs, OG tags, Twitter cards all present
- Sitemap includes proper lastmod, priority, changefreq

**Category 5 — Accessibility:**
- Skip-to-content link: Properly implemented
- Form labels: All use `<label htmlFor>`, not placeholder-only
- Mobile nav: Keyboard accessible (Escape closes)
- Axe tests: 6 routes covered (with color-contrast exclusion)

**Category 6 — Forms:**
- HubSpot NA2 endpoint correctly configured
- Server-side Zod validation on both forms
- Honeypot field (`website`) implemented
- Rate limiting: 5 requests/IP/hour
- Method validation: 405 for non-POST

**Category 7 — Security (partial):**
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()
- HSTS: max-age=31536000; includeSubDomains
- Revalidation webhook: HMAC-SHA256 signature validation
- Sanity client: Runtime guard prevents client import

**Category 8 — Mobile Rendering:**
- Viewport meta tag correct
- Touch targets: 48px minimum
- Mobile nav: Full-screen overlay, proper focus management

**Category 10 — Cutover Readiness:**
- CUTOVER.md checklist exists
- All env vars documented in `.env.example`
- Health endpoint returns `{"status":"ok"}`

---

## Performance Numbers

**Security Headers Observed (via curl -I on /species):**

| Header | Status |
|--------|--------|
| X-Content-Type-Options | nosniff |
| X-Frame-Options | DENY |
| Strict-Transport-Security | max-age=31536000; includeSubDomains |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | camera=(), microphone=(), geolocation=() |
| Content-Security-Policy | **MISSING** |

**Lighthouse Scores:** Not available (Lighthouse CI not configured). Manual run recommended before cutover.

**Sitemap Stats:**
- Total URLs: 30
- Species pages: 24 (23 species + 1 hub)
- Article pages: 0
- Core pages: 5
- Product pages: 1 (hub only; individual products not in sitemap)

---

## Content Completeness Summary

| Content Type | Drafted | Published | Status |
|--------------|---------|-----------|--------|
| Species pages | 23 | 23 | Complete |
| Product pages | 7 | 7 (static) | Complete (not CMS-driven) |
| Articles | 4 | 0 | **NOT PUBLISHED** |
| Core pages | 5 | 5 | Complete |

**Missing from sitemap vs. Copy drafts:** 4 articles

---

## Internal Linking Summary

| Check | Result |
|-------|--------|
| Header nav links resolve | 7/7 |
| Footer nav links resolve | 7/7 |
| Species → Related Species (≥2) | Manual spot-check needed |
| Species → Product Hub (≥1) | **MISSING** |
| Products → Species (≥3) | 19 links on Hardwood Lumber |
| Articles cross-links | N/A (articles not published) |

---

## Recommended Next Prompts

### Prompt 1: Add CSP Header

```
Read next.config.ts and add a Content-Security-Policy header to the headers array.

The policy should:
- Allow scripts from 'self', Google Tag Manager
- Allow styles from 'self' with inline (Tailwind)
- Allow images from 'self', data:, and Sanity CDN (cdn.sanity.io)
- Allow fonts from 'self'
- Allow connections to HubSpot Forms API (api-na2.hsforms.com) and Sanity API
- Deny frame ancestors (prevent clickjacking)

Test by running curl -I on staging after deploy to verify the header appears.
```

### Prompt 2: Fix Color Contrast Violations

```
Read Design System Style Guide.md and app/globals.css. Two color combinations fail WCAG AA:

1. #877961 on #ede6d8 (3.42:1, needs 4.5:1)
2. #8b6914 on #f5f0e8 (4.48:1, needs 4.5:1)

Darken the --color-body and --color-accent tokens to achieve 4.5:1 contrast ratio.
After updating globals.css, remove the 'color-contrast' exclusion from tests/e2e/a11y.spec.ts
and run pnpm test:e2e to verify the tests pass.
```

### Prompt 3: Patch Dependency Vulnerabilities

```
Run pnpm audit to see current vulnerabilities (6 moderate: js-yaml, uuid, postcss).

Update the affected packages:
pnpm update sanity next-sanity next --latest

If vulnerabilities persist after update, add pnpm overrides to package.json to force
the patched versions:
- js-yaml: >=3.14.2
- uuid: >=14.0.0  
- postcss: >=8.5.10

Run pnpm audit again to confirm 0 vulnerabilities.
```

### Prompt 4: Seed and Publish Articles

```
Read scripts/seed-articles.ts and run it to seed the 4 launch articles into Sanity:
- White Oak vs. Red Oak
- Choosing Hardwood Plywood for Custom Cabinets
- Understanding NHLA Grading
- Veneer Core vs. Combination Core

After seeding, open Sanity Studio at /studio, navigate to each article document,
review the content, and click Publish. Verify the articles appear in /sitemap.xml
and render at /articles/[slug].
```

### Prompt 5: Add Product Hub Links to Species Pages

```
Read CLAUDE.md §6: "every species page should link to... at least one product hub page."

Open app/(site)/species/[slug]/page.tsx and add a "Shop This Species" section
after the Related Species section. The section should:

- For domestic hardwoods: link to /products/hardwood-lumber
- For imported hardwoods: link to /products/hardwood-lumber  
- For softwoods: link to /products/softwood-lumber
- Additionally: if the species is commonly used in plywood, link to /products/hardwood-plywood

Use the species.category field to determine which product hubs to link.
```

---

*End of audit report*
