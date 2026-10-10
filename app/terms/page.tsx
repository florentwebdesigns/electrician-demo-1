import type { Metadata } from "next";
import { business } from "@/content/site";

export const metadata: Metadata = {
  title: `Terms of Use | ${business.name}`,
  description: `Terms for using the ${business.name} website.`,
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <main className="legal" id="main">
      <div className="container">
        <a href="/" className="legal__back">
          ← Back to home
        </a>
        <h1>Terms of Use</h1>
        <p>
          These terms apply to your use of this website. They should be reviewed by the business owner before
          publication.
        </p>
        <h2>General information only</h2>
        <p>
          Content on this site is general information about the services offered by {business.name}. It is not a
          diagnosis of any electrical issue and is not a substitute for an assessment by a qualified electrician. Do not
          attempt hazardous electrical work yourself. In an emergency involving smoke, fire or immediate danger, call 911.
        </p>
        <h2>Requests and estimates</h2>
        <p>
          Submitting a request through this site does not create a contract or guarantee availability, pricing or
          scheduling. Any work is subject to a separate agreement between you and {business.name}.
        </p>
        <h2>Images</h2>
        <p>Some images on this site are illustrations and may not depict actual completed projects.</p>
        <h2>Contact</h2>
        <p>
          Call <a href={business.phoneHref}>{business.phoneDisplay}</a> with any questions.
        </p>
      </div>
    </main>
  );
}
