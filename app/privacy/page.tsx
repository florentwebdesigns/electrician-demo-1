import type { Metadata } from "next";
import { business } from "@/content/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${business.name}`,
  description: `How ${business.name} handles information submitted through this website.`,
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <main className="legal" id="main">
      <div className="container">
        <a href="/" className="legal__back">
          ← Back to home
        </a>
        <h1>Privacy Policy</h1>
        <p>
          This policy explains how {business.name} handles information you share through this website. It should be
          reviewed by the business owner before publication.
        </p>
        <h2>Information you provide</h2>
        <p>
          When you submit a booking request, we collect the details you enter, such as your name, phone number, the
          service and property type, your preferred date and time, your address and a description of the work.
        </p>
        <h2>How it is used</h2>
        <ul>
          <li>To respond to your request and discuss your electrical project.</li>
          <li>To contact you to confirm an appointment.</li>
        </ul>
        <p>We do not sell your personal information.</p>
        <h2>Service providers</h2>
        <p>
          Form submissions may be delivered through third-party email or automation services solely to route your
          request to us. This website is hosted on Vercel.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about this policy? Call <a href={business.phoneHref}>{business.phoneDisplay}</a>.
        </p>
      </div>
    </main>
  );
}
