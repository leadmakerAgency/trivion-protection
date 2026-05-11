# Deploying Trivon Protection (`trivonprotection.com`)

## Environment variables

Create these in Vercel (or your host) for production:

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site origin, e.g. `https://trivonprotection.com` (no trailing slash). Used for `metadataBase`, sitemap, robots, and JSON-LD. **If unset on Vercel**, the app uses the automatic `VERCEL_URL` host (for example `https://trivion-protection.vercel.app`), so previews match the deployment URL without configuration. Set this explicitly once you attach a custom domain. |
| `LEADMAKER_WEBHOOK_URL` | Optional | Overrides the built-in production n8n webhook URL used by `POST /api/contact`. Set this if you use a different workflow, staging hook, or rotate the endpoint without redeploying. |
| `RESEND_API_KEY` | Optional (future email) | Resend API key for transactional email, if you add a separate email pipeline later. |
| `CONTACT_TO_EMAIL` | Optional (future email) | Inbox address for email-based quote delivery. |
| `CONTACT_FROM_EMAIL` | Optional (future email) | Verified sender domain on Resend, e.g. `Trivon Protection <hello@trivonprotection.com>`. |

The contact form posts to `/api/contact`, which forwards JSON to the LeadMaker n8n webhook (default URL is built into the app). Set `LEADMAKER_WEBHOOK_URL` only when you need to override that destination. Resend variables are unrelated unless you add email separately.

## Vercel + DNS

Use the default Next.js deployment on Vercel (Node/serverless) so `POST /api/contact` runs. Pure static hosting that only serves `next export` output is not sufficient for the contact form.

1. Import the repository into Vercel and select the Next.js framework preset.
2. Set **Root Directory** to the repository root (this project).
3. Add the environment variables above.
4. In your DNS provider for `trivonprotection.com`, point records per Vercel instructions (typically an `A`/`CNAME` to Vercel).
5. Enable HTTPS in Vercel (default).

## Post-launch SEO checklist

- Replace placeholder phone, email, and address values in `src/lib/site.ts` and footer content as needed.
- Add your real California BSIS PPO number to the footer and structured data when available.
- Submit `https://trivonprotection.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Create/claim a Google Business Profile once you have a consistent service-area or office address policy.
