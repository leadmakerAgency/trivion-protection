# Deploying Trivon Protection (`trivonprotection.com`)

## Environment variables

Create these in Vercel (or your host) for production:

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site origin, e.g. `https://trivonprotection.com` (no trailing slash). Used for metadata, sitemap, and JSON-LD. |
| `RESEND_API_KEY` | For email | Resend API key for transactional email. |
| `CONTACT_TO_EMAIL` | For email | Inbox address that receives quote form submissions. |
| `CONTACT_FROM_EMAIL` | For email | Verified sender domain on Resend, e.g. `Trivon Protection <hello@trivonprotection.com>`. |

If Resend variables are missing, the contact API returns a clear error and the page suggests calling/emailing instead.

## Vercel + DNS

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
