import { NextResponse } from "next/server";
import { business } from "@/content/site";

/**
 * Receives service requests from the contact form and forwards them.
 *
 * Configure ONE of these in Vercel → Project → Settings → Environment Variables:
 *   - RESEND_API_KEY + LEAD_TO_EMAIL + LEAD_FROM_EMAIL  (email via resend.com)
 *   - LEAD_WEBHOOK_URL                                   (JSON POST to Zapier, Make, a CRM, etc.)
 *
 * With neither configured, the route answers 503 and the form tells the
 * visitor the request was NOT sent and shows the phone number instead.
 */

export const runtime = "nodejs";

const LIMITS: Record<string, number> = {
  name: 120,
  phone: 40,
  service: 120,
  propertyType: 60,
  date: 20,
  time: 40,
  address: 300,
  details: 4000,
};

type Lead = Record<keyof typeof LIMITS, string>;

function clean(input: unknown): Lead {
  const src = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const out = {} as Lead;
  for (const [key, max] of Object.entries(LIMITS)) {
    const v = src[key];
    out[key] = typeof v === "string" ? v.trim().slice(0, max) : "";
  }
  return out;
}

function validate(lead: Lead): string | null {
  if (lead.name.length < 2) return "Please enter your name.";
  const digits = lead.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) return "Please enter a valid phone number.";
  if (!lead.service) return "Please choose a service.";
  return null;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function summary(lead: Lead) {
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Service", lead.service],
    ["Property", lead.propertyType || "Not specified"],
    ["Preferred date", lead.date || "Any"],
    ["Preferred time", lead.time || "Any"],
    ["Address / ZIP", lead.address || "Not provided"],
    ["Details", lead.details || "None"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<h2>New booking request</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;
  return { text, html };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "The request could not be read." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success so they move on.
  if (body && typeof body === "object" && (body as Record<string, unknown>).company_website) {
    return NextResponse.json({ ok: true });
  }

  const lead = clean(body);
  const problem = validate(lead);
  if (problem) return NextResponse.json({ ok: false, message: problem }, { status: 422 });

  const { RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL, LEAD_WEBHOOK_URL } = process.env;
  const { text, html } = summary(lead);

  try {
    if (RESEND_API_KEY && LEAD_TO_EMAIL && LEAD_FROM_EMAIL) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: LEAD_FROM_EMAIL,
          to: LEAD_TO_EMAIL.split(",").map((s) => s.trim()),
          subject: `Booking request: ${lead.service} (${lead.name})`,
          text,
          html,
        }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
      return NextResponse.json({ ok: true });
    }

    if (LEAD_WEBHOOK_URL) {
      const res = await fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, business: business.name, submittedAt: new Date().toISOString(), text }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      return NextResponse.json({ ok: true });
    }
  } catch (err) {
    console.error("[request-service] delivery failed:", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong while sending your request." },
      { status: 502 }
    );
  }

  console.warn("[request-service] No delivery method configured; request was not sent.");
  return NextResponse.json(
    { ok: false, message: "Online requests are not connected yet." },
    { status: 503 }
  );
}
