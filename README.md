# W Sincinnati Electrical

Marketing and lead-generation website for **W Sincinnati Electrical**, Cincinnati, Ohio · 513-418-3776.

Built with Next.js (App Router) and plain CSS. No UI or animation libraries; animations are CSS with a small
IntersectionObserver for scroll reveals, and they respect `prefers-reduced-motion`.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Deploy on Vercel

Import this repository in Vercel. The framework preset (Next.js) is detected automatically; no build settings are needed.

## Service request form

The booking form posts to `app/api/request-service/route.ts`, which forwards each request server-side.
Set **one** of these in Vercel → Project → Settings → Environment Variables (see `.env.example`):

| Option | Variables |
| --- | --- |
| Email via [Resend](https://resend.com) | `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` (an address on a domain verified in Resend) |
| Webhook (Zapier, Make, CRM…) | `LEAD_WEBHOOK_URL` |

Until one is configured the form shows visitors a clear "not sent, please call 513-418-3776" message. It never
pretends a request went through. Also set `NEXT_PUBLIC_SITE_URL` to the live domain for canonical URLs and the sitemap.

## Editing content

All business details and copy live in `content/site.ts`.

Before launch, confirm with the owner and fill in:

- **Reviews:** `reviews` is empty, so the reviews section is hidden. Add only real, authorized reviews and it appears.
- **Google reviews link:** `business.googleReviewsUrl` shows a "Read more reviews" link when set.
- **Social profiles:** `business.social`.
- **Services:** remove anything the business does not offer.
- **Privacy Policy / Terms:** `app/privacy` and `app/terms` are starting drafts for the owner to review.

The booking form collects a preferred date and time. It is a request, not a confirmed appointment; the copy says the
business will follow up to confirm.

Do not add licenses, insurance, years in business, response times, emergency availability or guarantees unless the
owner confirms them.
