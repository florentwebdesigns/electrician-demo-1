/**
 * Single source of truth for business details and page copy.
 *
 * Do not add licenses, certifications, years in business, response times,
 * emergency availability or service cities until the owner confirms them.
 */

export const business = {
  name: "W Sincinnati Electrical",
  tagline: "Professional electrical service for your home or business.",
  phoneDisplay: "513-418-3776",
  phoneHref: "tel:+15134183776",
  phoneE164: "+15134183776",
  // Base of operations confirmed by the owner. Street address not provided.
  city: "Cincinnati",
  region: "OH",
  regionName: "Ohio",
  country: "US",
  // Add a verified Google Business Profile reviews URL to show a "Read reviews" link.
  googleReviewsUrl: "",
  // Add verified profile URLs to show them in the footer.
  social: [] as { label: string; href: string }[],
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how" },
  { label: "FAQ", href: "#faq" },
  { label: "Book", href: "#book" },
];

export type IconName = "home" | "bulb" | "gauge" | "building";

export const services: { title: string; icon: IconName; body: string }[] = [
  {
    title: "Repairs & Troubleshooting",
    icon: "home",
    body: "Outlets, switches, tripping breakers, flickering lights and wiring problems.",
  },
  {
    title: "Lighting",
    icon: "bulb",
    body: "Interior, exterior, recessed and security lighting, plus fixture replacement.",
  },
  {
    title: "Panels & Upgrades",
    icon: "gauge",
    body: "Panel work and upgrades, dedicated circuits and new electrical installations.",
  },
  {
    title: "Commercial",
    icon: "building",
    body: "Repairs, lighting systems and electrical installation for businesses.",
  },
];

export const serviceOptions = [
  "Repair or troubleshooting",
  "Outlets or switches",
  "Lighting installation",
  "Panel work or upgrade",
  "New circuit or installation",
  "Commercial electrical",
  "Something else",
];

export const timeWindows = ["Morning", "Afternoon", "Evening", "Flexible"];

export const steps = [
  {
    title: "Request a visit",
    body: "Send the form or call. Tell us what you need and when works for you.",
  },
  {
    title: "Confirm the details",
    body: "W Sincinnati Electrical follows up to talk through the job and set a time.",
  },
  {
    title: "Get it done right",
    body: "The work is completed carefully, with clear communication along the way.",
  },
];

/**
 * REVIEWS
 * The section stays hidden until real, authorized reviews are added, e.g.
 * { quote: "...", name: "First L.", source: "Google", url: "https://..." }
 */
export type Review = { quote: string; name: string; source: string; url?: string };
export const reviews: Review[] = [];

export const faqs = [
  {
    q: "What electrical work do you do?",
    a: "Repairs and troubleshooting, outlets and switches, lighting, panel work and upgrades, wiring, dedicated circuits and commercial electrical work. Not sure if your project fits? Call 513-418-3776.",
  },
  {
    q: "Do you work with homes and businesses?",
    a: "Yes. W Sincinnati Electrical takes residential and commercial requests.",
  },
  {
    q: "How do I book a visit?",
    a: "Fill out the booking form with your preferred date and time, or call 513-418-3776. You'll be contacted to confirm the details. A request is not a confirmed appointment until then.",
  },
  {
    q: "Which areas do you serve?",
    a: "W Sincinnati Electrical is based in Cincinnati, Ohio. Include your address in the request or call to confirm service in your area.",
  },
  {
    q: "What if it's an emergency?",
    a: "If there is smoke, fire or immediate danger, move away from the area and call 911 first. Please don't open panels or attempt hazardous repairs yourself.",
  },
];
