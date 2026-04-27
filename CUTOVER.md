# Production Cutover Plan

**Purpose:** Step-by-step checklist for cutting over from the staging Railway URL to the production domain (`www.moorenewton.com`). This plan is documentation only — do not execute until scheduled with Jack.

**Estimated cutover time:** 30 minutes active work + 1 hour monitoring  
**Best time to execute:** Tuesday–Thursday, 9 AM–11 AM PT (low traffic, full business day for monitoring)

---

## 1. Pre-Cutover Checklist

Complete all items before starting the cutover.

### Content Readiness

- [ ] All Sanity documents reviewed and published (no drafts pending)
- [ ] Homepage content finalized
- [ ] All species pages populated (or intentionally hidden)
- [ ] All product pages populated
- [ ] About, Contact, Delivery, Quote pages reviewed
- [ ] Site settings (address, phone, hours) verified in Sanity
- [ ] FAQ items reviewed

### Test Data Cleanup

- [ ] Delete test form submissions from HubSpot:
  - Contact form: `claude-test-delete-me@example.com`
  - Quote form: `claude-test-quote-delete-me@example.com`
  - Quote form: `playwright-test@example.com`
  - Any other test submissions
- [ ] Verify HubSpot form notifications route to correct recipients

### Technical Validation

- [ ] Playwright tests passing on staging (`pnpm test:e2e`)
- [ ] Lighthouse CI scores acceptable:
  - Performance: > 90
  - Accessibility: > 90 (note: color contrast issues documented)
  - Best Practices: > 90
  - SEO: > 90
- [ ] All pages render without console errors
- [ ] Forms submit successfully on staging
- [ ] Sanity webhook revalidation working (edit → publish → page updates)

### Environment Variables

Confirm these are set in Railway production service:

| Variable | Value | Status |
|----------|-------|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `3mozn5ff` | [ ] Set |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | [ ] Set |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-10-01` | [ ] Set |
| `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` | `5302852` | [ ] Set |
| `NEXT_PUBLIC_HUBSPOT_QUOTE_FORM_ID` | `223ad648-c6d8-46c4-ad68-10e3be6622fe` | [ ] Set |
| `NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID` | `ebecd94b-2fd6-4322-8203-b0bdaddbf38a` | [ ] Set |
| `HUBSPOT_REGION` | `na2` | [ ] Set |
| `SANITY_REVALIDATE_SECRET` | (secret) | [ ] Set |
| `NEXT_PUBLIC_SITE_URL` | `https://www.moorenewton.com` | [ ] **Update at cutover** |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` | [ ] Set (if available) |
| `SANITY_API_READ_TOKEN` | (secret) | [ ] Set (optional) |

### DNS Preparation

Document current DNS records before changing:

| Record | Type | Current Value | New Value |
|--------|------|---------------|-----------|
| `moorenewton.com` | A or CNAME | (document current) | Railway IP or CNAME |
| `www.moorenewton.com` | CNAME | (document current) | Railway CNAME |

**Railway CNAME target:** Found in Railway → Service → Settings → Networking → Custom Domain

- [ ] DNS provider login credentials confirmed
- [ ] Current TTL noted: ______ seconds
- [ ] If TTL > 300, consider lowering 24h before cutover

### Search Console

- [ ] New property added for `https://www.moorenewton.com`
- [ ] Ownership verified (DNS TXT record or HTML meta tag)
- [ ] Old property (`http://` version if exists) noted for redirect monitoring

---

## 2. Cutover Steps

Execute in order. Estimated time: 30 minutes.

### Step 1: Final Staging Verification (5 min)

```
# Run on staging URL one last time
- [ ] Homepage loads
- [ ] /quote form submits
- [ ] /contact form displays
- [ ] /api/health returns 200
- [ ] /robots.txt returns correctly
- [ ] /sitemap.xml returns valid XML
```

### Step 2: Update Environment Variable (2 min)

In Railway dashboard:

1. Go to Service → Variables
2. Update `NEXT_PUBLIC_SITE_URL` to `https://www.moorenewton.com`
3. Railway will auto-redeploy

- [ ] Variable updated
- [ ] Redeploy triggered
- [ ] Redeploy completed successfully

### Step 3: Add Custom Domain in Railway (3 min)

1. Railway → Service → Settings → Networking
2. Click "Custom Domain"
3. Add `www.moorenewton.com`
4. Add `moorenewton.com` (for redirect to www)
5. Note the CNAME target Railway provides

- [ ] `www.moorenewton.com` added
- [ ] `moorenewton.com` added
- [ ] CNAME target noted: ______________________

### Step 4: Update DNS Records (5 min)

In your DNS provider (Cloudflare, GoDaddy, etc.):

1. Update `www.moorenewton.com` CNAME to point to Railway target
2. Update `moorenewton.com`:
   - If CNAME supported at apex: point to Railway
   - If A record required: use Railway's IP (found in dashboard)
   - Or: set up redirect from apex to www

- [ ] `www` CNAME updated
- [ ] Apex domain configured
- [ ] Changes saved

### Step 5: Wait for DNS Propagation (5–30 min)

Check propagation status:
- https://dnschecker.org/#CNAME/www.moorenewton.com

- [ ] DNS propagating (at least 50% of checkers showing new value)

### Step 6: Verify HTTPS Certificate (5 min)

Railway auto-provisions Let's Encrypt certificates.

1. Visit `https://www.moorenewton.com`
2. Check for valid certificate (padlock icon)
3. If certificate error, wait 5 minutes and retry (provisioning can take a few minutes)

- [ ] HTTPS working on `www.moorenewton.com`
- [ ] HTTPS working on `moorenewton.com` (redirects to www)
- [ ] No mixed content warnings

### Step 7: Verify Canonical URLs (2 min)

1. View page source on homepage
2. Confirm `<link rel="canonical" href="https://www.moorenewton.com/"`
3. Confirm OG URLs use production domain

- [ ] Canonical URLs correct
- [ ] OG image URLs correct

### Step 8: Update Sanity Webhook (2 min)

In Sanity dashboard (manage.sanity.io):

1. Go to API → Webhooks
2. Edit the revalidation webhook
3. Update URL from staging to `https://www.moorenewton.com/api/revalidate`
4. Save

- [ ] Webhook URL updated
- [ ] Test: edit a document in Sanity, verify revalidation works

### Step 9: Submit Sitemap to Search Console (2 min)

1. Go to Search Console → Sitemaps
2. Add `https://www.moorenewton.com/sitemap.xml`
3. Click Submit

- [ ] Sitemap submitted
- [ ] Status shows "Success" or "Pending"

### Step 10: Monitor (1 hour)

For the first hour after cutover:

- [ ] Railway logs: no 500 errors
- [ ] GA4 Real-time: traffic appearing (if GA4 configured)
- [ ] Submit a test form, verify it reaches HubSpot
- [ ] Spot-check 5 random pages for correct rendering

---

## 3. Rollback Plan

If something breaks during cutover:

### DNS Rollback (if site is down)

1. Revert DNS records to previous values (documented in pre-cutover checklist)
2. Wait for propagation (TTL-dependent)
3. Site returns to previous hosting

**Time to rollback:** 5 minutes active + TTL propagation time

### Railway Deploy Rollback (if code issue)

1. Railway → Service → Deployments
2. Find the last working deployment
3. Click "..." → "Rollback"
4. Railway redeploys the previous version

**Time to rollback:** 2–3 minutes

### Environment Variable Rollback

If `NEXT_PUBLIC_SITE_URL` change causes issues:

1. Railway → Service → Variables
2. Revert to staging URL
3. Wait for redeploy

---

## 4. Post-Cutover: First Week

### Day 1

- [ ] Confirm all forms are receiving submissions in HubSpot
- [ ] Check Railway logs for any errors
- [ ] Verify GA4 is receiving pageviews
- [ ] Test Sanity → site revalidation flow

### Day 2–3

- [ ] Check Search Console for crawl errors
- [ ] Check Search Console for any 404s
- [ ] Review Core Web Vitals data (may take 24–48h to appear)
- [ ] Verify indexed page count is growing

### Day 4–7

- [ ] Address any 404s reported in Search Console with redirects
- [ ] Monitor form submission volume vs. historical baseline
- [ ] Check for any spam submissions (honeypot working)
- [ ] Review Lighthouse scores on production

### Ongoing

- [ ] Weekly: Check Search Console for new issues
- [ ] Weekly: Review HubSpot form analytics
- [ ] Monthly: Review Core Web Vitals trends

---

## 5. Emergency Contacts

| Role | Name | Contact |
|------|------|---------|
| Site Owner | Jack Moore | jackmoore@moorenewton.com |
| DNS Provider | (document) | (login/support info) |
| Railway Support | — | https://railway.app/help |
| Sanity Support | — | https://www.sanity.io/contact |

---

## 6. Post-Cutover Cleanup

After 1 week of stable operation:

- [ ] Remove staging-specific test data if any remains
- [ ] Update any documentation referencing staging URL
- [ ] Consider increasing DNS TTL back to 3600+ for caching benefits
- [ ] Archive this checklist with completion dates

---

**Document version:** 1.0  
**Created:** 2026-04-27  
**Last updated:** 2026-04-27
