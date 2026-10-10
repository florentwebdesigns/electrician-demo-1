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

The form posts to `app/api/request-service/route.ts`, which forwards each request server-side.
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

- **Reviews:** `reviews` is empty, so the section shows marked placeholders. Add only real, authorized reviews.
- **Google reviews link:** `business.googleReviewsUrl` shows a "Read Customer Reviews" button when set.
- **Project photos:** gallery items are sample illustrations tagged "Sample visual". Put photos in `public/work/`,
  set `photo: "/work/your-photo.jpg"` and `sample: false`, and update the title and description.
- **Service areas:** `business.serviceAreas` (left empty until confirmed).
- **Social profiles:** `business.social`.
- **Services:** the categories are the brief's suggested list. Remove anything the business does not offer.
- **Privacy Policy / Terms:** `app/privacy` and `app/terms` are starting drafts for the owner to review.

Do not add licenses, insurance, years in business, response times, emergency availability or guarantees unless the
owner confirms them.
