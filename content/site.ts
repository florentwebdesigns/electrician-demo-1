/**
 * Single source of truth for business details and page copy.
 *
 * Anything marked `verified: false` or described as a placeholder must be
 * confirmed by the owner before launch. Do not add licenses, certifications,
 * years in business, response times or service cities until they are confirmed.
 */

export const business = {
  name: "W Sincinnati Electrical",
  shortName: "W Sincinnati",
  tagline: "Professional electrical service for your home or business.",
  phoneDisplay: "513-418-3776",
  phoneHref: "tel:+15134183776",
  phoneE164: "+15134183776",
  // Base of operations confirmed by the owner. Street address not provided.
  city: "Cincinnati",
  region: "OH",
  regionName: "Ohio",
  country: "US",
  // Add verified profile URLs to show them in the footer and reviews section.
  googleReviewsUrl: "",
  social: [] as { label: string; href: string }[],
  // Leave empty until the owner confirms the areas served.
  serviceAreas: [] as string[],
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Our Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export type IconName =
  | "home"
  | "bulb"
  | "gauge"
  | "building"
  | "plug"
  | "panel"
  | "spark"
  | "wire";

export type ServiceGroup = {
  id: string;
  title: string;
  icon: IconName;
  summary: string;
  items: string[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "residential",
    title: "Residential Electrical",
    icon: "home",
    summary:
      "Repairs, troubleshooting and installations that keep everyday power at home working the way it should.",
    items: [
      "Electrical repairs",
      "Electrical troubleshooting",
      "Outlet and switch installation",
      "Lighting installation",
      "Electrical panel work",
      "Wiring and rewiring",
    ],
  },
  {
    id: "lighting",
    title: "Lighting Solutions",
    icon: "bulb",
    summary:
      "Interior and exterior lighting planned around how a space is used, from fixture swaps to recessed layouts.",
    items: [
      "Interior lighting",
      "Exterior lighting",
      "Fixture replacement",
      "Recessed lighting",
      "Security lighting",
    ],
  },
  {
    id: "upgrades",
    title: "Electrical Upgrades",
    icon: "gauge",
    summary:
      "Improvements for homes and buildings that need more capacity, new circuits or modernized components.",
    items: [
      "Electrical system upgrades",
      "Panel upgrades",
      "Dedicated circuits",
      "Electrical improvements",
      "New electrical installations",
    ],
  },
  {
    id: "commercial",
    title: "Commercial Electrical",
    icon: "building",
    summary:
      "Electrical repairs, lighting and installation work for businesses that depend on reliable power.",
    items: [
      "Commercial electrical repairs",
      "Lighting systems",
      "Electrical installation",
      "Electrical troubleshooting",
      "Commercial electrical improvements",
    ],
  },
];

export const serviceOptions = [
  "Electrical repair or troubleshooting",
  "Outlets or switches",
  "Lighting installation",
  "Panel work or upgrade",
  "Wiring or rewiring",
  "Dedicated circuit",
  "Commercial electrical",
  "Something else",
];

export const commonIssues = [
  "Outlets or switches that stop working",
  "Lights that flicker",
  "Breakers that trip repeatedly",
  "Outdated electrical components",
  "New lighting or installation needs",
  "Electrical upgrades for a renovation",
];

export const reasons = [
  {
    title: "Professional Approach",
    body: "Clear communication and a professional approach to every electrical job, large or small.",
  },
  {
    title: "Attention to Detail",
    body: "Careful planning, organized work and close attention to what each project actually requires.",
  },
  {
    title: "Customer-Focused Service",
    body: "An easy way to explain what you need, and a clear picture of the proposed next steps.",
  },
  {
    title: "Practical Solutions",
    body: "Help understanding the options available for your electrical project before work begins.",
  },
  {
    title: "Quality Workmanship",
    body: "A commitment to doing electrical work carefully, neatly and professionally.",
  },
  {
    title: "Clear Communication",
    body: "Straightforward explanations of the scope of work, recommendations and what happens next.",
  },
];

export const processSteps = [
  {
    title: "Get in Touch",
    body: "Call or submit a service request explaining what you need.",
  },
  {
    title: "Discuss the Project",
    body: "Share the relevant details so the service requirements can be understood.",
  },
  {
    title: "Determine the Next Steps",
    body: "Discuss the appropriate assessment, recommendations or project plan.",
  },
  {
    title: "Move Forward",
    body: "Proceed with the agreed work and next steps.",
  },
];

export const warningSigns = [
  {
    title: "Breakers that keep tripping",
    body: "A breaker that trips again and again is a sign the circuit should be looked at.",
  },
  {
    title: "Burning smells",
    body: "Any burning or hot-plastic smell near outlets or the panel deserves prompt attention.",
  },
  {
    title: "Damaged outlets or switches",
    body: "Cracked, loose or scorched devices should not be left in service.",
  },
  {
    title: "Flickering lights",
    body: "Persistent flicker can point to a loose connection or a circuit issue.",
  },
  {
    title: "Warm or discolored parts",
    body: "Cover plates, cords or components that feel warm or look discolored are a warning sign.",
  },
  {
    title: "Renovation concerns",
    body: "Remodeling often changes electrical needs. Plan the electrical side before walls close up.",
  },
];

/**
 * SAMPLE PROJECTS
 * These are illustrative placeholders, not completed W Sincinnati Electrical
 * projects. Replace `visual` with a real photo path (e.g. "/work/kitchen.jpg")
 * and update the copy once the owner supplies genuine project details.
 */
export type Project = {
  id: string;
  title: string;
  category: "Residential" | "Lighting" | "Commercial" | "Upgrades";
  description: string;
  visual: "panel" | "pendants" | "ceiling" | "outlet" | "exterior";
  photo?: string;
  sample: boolean;
};

export const projects: Project[] = [
  {
    id: "panel",
    title: "Panel Upgrade",
    category: "Upgrades",
    description:
      "Space reserved for a panel or service upgrade project. Add before and after photos and a short scope summary.",
    visual: "panel",
    sample: true,
  },
  {
    id: "pendants",
    title: "Kitchen Lighting",
    category: "Lighting",
    description:
      "Space reserved for an interior lighting project such as pendant or recessed lighting.",
    visual: "pendants",
    sample: true,
  },
  {
    id: "ceiling",
    title: "Commercial Lighting",
    category: "Commercial",
    description:
      "Space reserved for a commercial lighting or electrical installation project.",
    visual: "ceiling",
    sample: true,
  },
  {
    id: "outlet",
    title: "Outlets and Switches",
    category: "Residential",
    description:
      "Space reserved for a residential repair or device installation project.",
    visual: "outlet",
    sample: true,
  },
  {
    id: "exterior",
    title: "Exterior Lighting",
    category: "Lighting",
    description:
      "Space reserved for an exterior or security lighting project.",
    visual: "exterior",
    sample: true,
  },
];

/**
 * REVIEWS
 * Empty by design. Add only real, authorized customer reviews, e.g.
 * { quote: "...", name: "First L.", source: "Google", url: "https://...", rating: 5 }
 */
export type Review = {
  quote: string;
  name: string;
  source: string;
  url?: string;
  rating?: number;
};

export const reviews: Review[] = [];

export const faqs = [
  {
    q: "What electrical services do you provide?",
    a: "W Sincinnati Electrical handles electrical repairs, troubleshooting, outlet and switch work, lighting, panel work, wiring and upgrades. If your project is not listed, call 513-418-3776 to ask.",
  },
  {
    q: "Do you handle residential electrical projects?",
    a: "Yes. Residential work such as repairs, lighting installation, outlets and switches, and electrical upgrades is a core part of the services offered.",
  },
  {
    q: "Do you work on commercial electrical projects?",
    a: "Commercial repairs, lighting systems and electrical installation are among the services offered. Get in touch with the details of your property and project to discuss it.",
  },
  {
    q: "How do I request electrical service?",
    a: "Call 513-418-3776 or fill out the service request form on this page. Include what you need and the best way to reach you.",
  },
  {
    q: "Can I contact you about an electrical upgrade?",
    a: "Yes. Panel upgrades, dedicated circuits and other electrical improvements can be discussed by phone or through the request form.",
  },
  {
    q: "What information should I provide when requesting service?",
    a: "A short description of the issue or project, the property type (home or business), your location, and any photos or details that help explain the work. Do not open panels or remove covers to gather information.",
  },
  {
    q: "Which areas do you serve?",
    a: "W Sincinnati Electrical is based in Cincinnati, Ohio. Call or send a request with your location to confirm service in your area.",
  },
  {
    q: "How can I get in touch?",
    a: "Call 513-418-3776 or use the service request form. Questions about pricing, scheduling and availability are best answered by contacting the team directly.",
  },
];
