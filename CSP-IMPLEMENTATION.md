# Content-Security-Policy Implementation

## Phase 1: External Resource Enumeration

### Summary Table

| Domain | Resource Type | Directive | Render-Blocking | Critical Flow | Notes |
|--------|--------------|-----------|-----------------|---------------|-------|
| `cdn.sanity.io` | Images | `img-src` | No | All pages | Sanity CDN for all CMS images |
| `3mozn5ff.api.sanity.io` | XHR | `connect-src` | No | Studio only | Sanity Content Lake API |
| `3mozn5ff.apicdn.sanity.io` | XHR | `connect-src` | No | Studio only | Sanity CDN API |
| `www.googletagmanager.com` | Script | `script-src` | No | Analytics | GA4 loader via @next/third-parties |
| `www.google-analytics.com` | XHR | `connect-src` | No | Analytics | GA4 telemetry |
| `region1.google-analytics.com` | XHR | `connect-src` | No | Analytics | GA4 regional endpoint |
| `api-na2.hsforms.com` | XHR | N/A (server-side) | No | Form submit | HubSpot forms API (server-side only) |

### Detailed Analysis

#### 1. Sanity CDN (`cdn.sanity.io`)
- **Used by:** All pages with CMS images (species, products, articles)
- **Resource type:** `<img>` elements via Next.js Image
- **Render-blocking:** No (images load async)
- **Critical flow:** Homepage, species pages, plywood page (33 swatches)
- **CSP directive:** `img-src 'self' https://cdn.sanity.io data:`

#### 2. Sanity API (`*.api.sanity.io`, `*.apicdn.sanity.io`)
- **Used by:** Sanity Studio at `/studio` only
- **Resource type:** XHR/fetch for CRUD operations
- **Render-blocking:** No
- **Critical flow:** Studio editing, document save
- **CSP directive:** `connect-src` (Studio pages only)
- **Note:** Main site uses server-side data fetching, no client API calls

#### 3. Google Analytics 4
- **Used by:** All pages via `<GoogleAnalytics gaId={...} />`
- **Resource type:** External script + XHR telemetry
- **Render-blocking:** No (async loaded by @next/third-parties)
- **Critical flow:** None (analytics only)
- **CSP directives:**
  - `script-src 'self' https://www.googletagmanager.com`
  - `connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com`

#### 4. HubSpot Forms API (`api-na2.hsforms.com`)
- **Used by:** `/api/forms/quote` and `/api/forms/contact` routes
- **Resource type:** Server-side fetch (not browser)
- **Render-blocking:** N/A
- **Critical flow:** Quote and contact form submissions
- **CSP directive:** None needed (server-side only)
- **Note:** Browser submits to same-origin `/api/forms/*`, server proxies to HubSpot

#### 5. Self-Hosted Resources
- **Fonts:** All loaded via `next/font` (self-hosted)
- **Scripts:** No external scripts except GA4
- **Styles:** Tailwind CSS (self-hosted), no external CSS

#### 6. Sanity Studio (`/studio`)
- **Special requirements:**
  - Real-time collaboration (WebSocket): `wss://3mozn5ff.api.sanity.io`
  - Image uploads: `blob:` URLs
  - Inline styles: Required by Sanity UI components
  - Inline scripts: May be needed for Studio functionality
- **Recommendation:** Apply a separate, more permissive CSP for `/studio` route

---

## Phase 2: CSP Construction

### Main Site CSP (all routes except `/studio`)

```
default-src 'self';
script-src 'self' https://www.googletagmanager.com;
style-src 'self' 'unsafe-inline';
img-src 'self' https://cdn.sanity.io data:;
font-src 'self';
connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com;
frame-src 'none';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
```

### Studio CSP (`/studio` route)

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' https://cdn.sanity.io data: blob:;
font-src 'self' data:;
connect-src 'self' https://*.api.sanity.io https://*.apicdn.sanity.io wss://*.api.sanity.io https://www.google-analytics.com;
frame-src 'self';
frame-ancestors 'self';
base-uri 'self';
form-action 'self';
```

### Directive Rationale

| Directive | Value | Reason |
|-----------|-------|--------|
| `default-src` | `'self'` | Restrictive default, explicitly allow needed sources |
| `script-src` | `'self' https://www.googletagmanager.com` | Self + GA4 loader only |
| `style-src` | `'self' 'unsafe-inline'` | Tailwind + runtime styles (Next.js) |
| `img-src` | `'self' https://cdn.sanity.io data:` | Self + Sanity CDN + data URIs (LQIP) |
| `font-src` | `'self'` | All fonts self-hosted via next/font |
| `connect-src` | `'self' + GA4 endpoints` | Same-origin API + analytics |
| `frame-src` | `'none'` | No iframes needed on main site |
| `frame-ancestors` | `'none'` | Prevent clickjacking (replaces X-Frame-Options) |
| `base-uri` | `'self'` | Prevent base tag injection |
| `form-action` | `'self'` | Forms submit to same-origin only |

---

## Phase 3: Verification Flows

After report-only deployment, test these flows:

1. **Homepage browse** - Verify no violations on `/`
2. **Species page browse** - Test `/species/white-oak` with images
3. **Plywood page** - Test `/products/hardwood-plywood` (33 swatches, heaviest page)
4. **Quote form submission** - Submit form on `/quote`
5. **Contact form submission** - Submit form on `/contact`
6. **Studio editor load** - Navigate to `/studio`
7. **Studio document edit** - Edit and save a species document

---

## Implementation Status

- [x] Phase 1: Resource enumeration complete
- [x] Phase 2: Report-only CSP deployed (2026-05-01)
- [ ] Phase 3: 24-hour verification (check after 2026-05-02)
- [ ] Phase 3: Enforce CSP

---

## Phase 3 Instructions

After 24 hours of report-only mode on staging:

### Step 1: Check for CSP Violations

Open browser DevTools Console on each test page. Look for messages like:
```
[Report Only] Refused to load the script '...' because it violates the following Content Security Policy directive: "script-src 'self' ..."
```

### Step 2: Test Critical Flows

1. **Homepage** (`/`) - Verify images load, no console errors
2. **Species page** (`/species/white-oak`) - Verify hero image + gallery load
3. **Plywood page** (`/products/hardwood-plywood`) - All 33 swatches render
4. **Quote form** (`/quote`) - Submit form, verify redirect to thank-you
5. **Contact form** (`/contact`) - Submit form, verify redirect to thank-you
6. **Studio** (`/studio`) - Login, edit a document, save

### Step 3: Fix Any Violations

If violations occur, update the CSP in `next.config.ts`:
- Add missing domains to appropriate directives
- If inline scripts are blocked, consider using nonces (complex) or `'unsafe-inline'` (less secure)

### Step 4: Switch to Enforcing Mode

Once clean for 24 hours, change the header key in `next.config.ts`:

```diff
- key: 'Content-Security-Policy-Report-Only',
+ key: 'Content-Security-Policy',
```

### Step 5: Post-Enforcement Verification

Re-run all test flows after enforcement to confirm no breakage.
