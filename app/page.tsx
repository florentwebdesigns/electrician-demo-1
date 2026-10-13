import {
  business,
  commonIssues,
  faqs,
  navLinks,
  processSteps,
  projects,
  reasons,
  reviews,
  serviceGroups,
  warningSigns,
} from "@/content/site";
import { Navbar, MobileActionBar } from "@/components/Navbar";
import { RevealObserver } from "@/components/Reveal";
import { CircuitLines, Glow } from "@/components/Backdrop";
import { Logo } from "@/components/Logo";
import { PanelScene, PendantScene, OutletScene } from "@/components/Visuals";
import { WorkGallery } from "@/components/WorkGallery";
import { FaqAccordion } from "@/components/Faq";
import { ContactForm } from "@/components/ContactForm";
import { AlertIcon, ArrowIcon, CheckIcon, PhoneIcon, PinIcon, QuoteIcon, ServiceIcon } from "@/components/Icons";

function CallButton({ variant = "ghost", label }: { variant?: "primary" | "ghost"; label?: string }) {
  return (
    <a href={business.phoneHref} className={`btn btn--${variant}`}>
      <PhoneIcon size={18} />
      {label ?? `Call ${business.phoneDisplay}`}
    </a>
  );
}

function RequestButton({ label = "Request Service", variant = "primary" }: { label?: string; variant?: "primary" | "ghost" }) {
  return (
    <a href="#contact" className={`btn btn--${variant}`}>
      {label}
      <ArrowIcon size={18} />
    </a>
  );
}

function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <div className={`section-head section-head--${align}`} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {intro && <p className="lede">{intro}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Navbar />

      <main id="main">
        {/* ================= HERO ================= */}
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__bg" aria-hidden="true">
            <Glow variant="hero" />
            <div data-parallax="0.12" className="hero__circuit">
              <CircuitLines />
            </div>
            <div className="grain" />
          </div>
          <div className="container hero__inner">
            <div className="hero__copy">
              <p className="eyebrow hero__eyebrow">
                <span className="pulse-dot" aria-hidden="true" />
                Electrical Contractor · {business.city}, {business.regionName}
              </p>
              <h1 id="hero-title" className="hero__title">
                <span className="line"><span>Electrical work</span></span>
                <span className="line"><span>done with</span></span>
                <span className="line"><span><em>precision.</em></span></span>
              </h1>
              <p className="hero__lede">
                Professional electrical services focused on dependable solutions, quality workmanship, and keeping your
                home or business powered safely.
              </p>
              <div className="hero__actions">
                <a href="#contact" className="btn btn--primary btn--lg">
                  Request Electrical Service
                  <ArrowIcon size={18} />
                </a>
                <a href={business.phoneHref} className="btn btn--ghost btn--lg">
                  <PhoneIcon size={18} />
                  Call {business.phoneDisplay}
                </a>
              </div>
              <ul className="hero__points" aria-label="Services at a glance">
                <li>Residential</li>
                <li>Commercial</li>
                <li>Lighting</li>
                <li>Upgrades</li>
              </ul>
            </div>
            <div className="hero__visual">
              <div className="hero__frame">
                <PanelScene uid="hero" className="scene" title="Illustration of an open residential electrical panel with breakers" />
                <div className="hero__frame-sheen" aria-hidden="true" />
              </div>
              <div className="hero__chip hero__chip--top" aria-hidden="true">
                <span className="hero__chip-dot" />
                Panels · Wiring · Lighting
              </div>
              <a href={business.phoneHref} className="hero__chip hero__chip--call">
                <span className="hero__chip-icon">
                  <PhoneIcon size={18} />
                </span>
                <span>
                  <small>Talk to an electrician</small>
                  <strong>{business.phoneDisplay}</strong>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section className="section services" id="services" aria-labelledby="services-title">
          <div className="container services__layout">
            <div className="services__intro">
              <SectionHead
                id="services-title"
                eyebrow="What we do"
                title="Electrical services"
                intro="Explore electrical services for residential and commercial needs. Contact W Sincinnati Electrical to discuss your project and determine the right next step."
              />
              <div className="services__intro-cta" data-reveal>
                <RequestButton />
                <CallButton />
              </div>
            </div>
            <ol className="services__list">
              {serviceGroups.map((g, i) => (
                <li key={g.id} className="service" data-reveal style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
                  <a href="#contact" className="service__link" aria-label={`Request ${g.title.toLowerCase()} service`}>
                    <span className="service__index">0{i + 1}</span>
                    <span className="service__icon">
                      <ServiceIcon name={g.icon} size={26} />
                    </span>
                    <span className="service__body">
                      <h3 className="service__title">{g.title}</h3>
                      <span className="service__summary">{g.summary}</span>
                      <span className="service__items">
                        {g.items.map((it) => (
                          <span key={it}>{it}</span>
                        ))}
                      </span>
                    </span>
                    <span className="service__arrow" aria-hidden="true">
                      <ArrowIcon size={22} />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ================= PROBLEMS ================= */}
        <section className="section problems" aria-labelledby="problems-title">
          <div className="container problems__layout">
            <div className="problems__visual" data-reveal="mask">
              <OutletScene uid="problems" className="scene" title="Illustration of a wall outlet with a cool blue rim light" />
            </div>
            <div className="problems__copy">
              <SectionHead
                id="problems-title"
                eyebrow="Common concerns"
                title={
                  <>
                    Electrical issues? <span className="text-grad">Let&apos;s find the right solution.</span>
                  </>
                }
              />
              <ul className="issue-list" data-reveal>
                {commonIssues.map((issue) => (
                  <li key={issue}>
                    <CheckIcon size={18} />
                    {issue}
                  </li>
                ))}
              </ul>
              <p className="problems__note" data-reveal>
                Electrical problems should be assessed by a qualified professional. Describe what you are noticing, and
                W Sincinnati Electrical can talk through the right next step. A diagnosis needs an in-person look.
              </p>
              <div className="actions" data-reveal>
                <RequestButton />
                <CallButton />
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHY CHOOSE ================= */}
        <section className="section why" aria-labelledby="why-title">
          <Glow variant="soft" />
          <div className="container">
            <SectionHead
              id="why-title"
              eyebrow={`Why ${business.name}`}
              title={
                <>
                  The right electrical team <span className="text-grad">makes a difference.</span>
                </>
              }
              align="center"
            />
            <div className="why__grid">
              {reasons.map((r, i) => (
                <article key={r.title} className="why__item" data-reveal style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
                  <span className="why__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section className="section about" id="about" aria-labelledby="about-title">
          <div className="container about__layout">
            <div className="about__copy">
              <SectionHead
                id="about-title"
                eyebrow="About us"
                title="Powering projects with professionalism and care."
              />
              <p className="about__text" data-reveal>
                Electrical work requires careful attention to detail, a thoughtful approach, and clear communication.
                W Sincinnati Electrical provides a point of contact for customers looking to discuss electrical service
                needs and project requirements, from a single repair to a larger upgrade.
              </p>
              <ul className="principles" data-reveal>
                <li>
                  <strong>Listen first.</strong>
                  <span>Understand the problem or the goal before recommending anything.</span>
                </li>
                <li>
                  <strong>Work carefully.</strong>
                  <span>Treat every home and business with respect and keep the job organized.</span>
                </li>
                <li>
                  <strong>Explain clearly.</strong>
                  <span>Make the scope, options and next steps easy to understand.</span>
                </li>
              </ul>
              <div className="actions" data-reveal>
                <RequestButton label="Contact Our Team" />
                <CallButton />
              </div>
            </div>
            <div className="about__visual" data-reveal="mask">
              <PendantScene uid="about" className="scene" title="Illustration of three pendant lights glowing over a kitchen counter" />
              <div className="about__badge" aria-hidden="true">
                <span>Residential</span>
                <span>Commercial</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WORK ================= */}
        <section className="section work" id="work" aria-labelledby="work-title">
          <div className="container">
            <div className="work__head">
              <SectionHead
                id="work-title"
                eyebrow="Our work"
                title="The work speaks for itself."
                intro="Explore examples of electrical work, installations, and improvements."
              />
              <p className="work__disclaimer" data-reveal>
                Project photos are coming soon. The visuals below are sample illustrations, not completed jobs.
              </p>
            </div>
            <WorkGallery projects={projects} />
            <div className="work__cta" data-reveal>
              <p>Have a similar project in mind?</p>
              <RequestButton label="Discuss Your Project" />
            </div>
          </div>
        </section>

        {/* ================= REVIEWS ================= */}
        <section className="section reviews" id="reviews" aria-labelledby="reviews-title">
          <div className="container">
            <SectionHead id="reviews-title" eyebrow="Customer feedback" title="Trust built through the work." align="center" />
            {reviews.length > 0 ? (
              <div className="reviews__grid">
                {reviews.map((r, i) => (
                  <figure key={r.name + i} className={`review ${i === 0 ? "review--featured" : ""}`} data-reveal>
                    <QuoteIcon className="review__mark" />
                    {r.rating ? (
                      <p className="review__stars" aria-label={`Rated ${r.rating} out of 5`}>
                        {"★".repeat(r.rating)}
                      </p>
                    ) : null}
                    <blockquote>{r.quote}</blockquote>
                    <figcaption>
                      <strong>{r.name}</strong>
                      {r.url ? (
                        <a href={r.url} target="_blank" rel="noopener noreferrer">
                          {r.source}
                        </a>
                      ) : (
                        <span>{r.source}</span>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="reviews__grid reviews__grid--empty">
                <figure className="review review--featured review--placeholder" data-reveal>
                  <QuoteIcon className="review__mark" />
                  <span className="sample-tag sample-tag--inline">Placeholder</span>
                  <blockquote>Verified customer reviews will be featured here.</blockquote>
                  <figcaption>
                    <span>Real reviews only. Names and ratings are shown with the customer&apos;s permission.</span>
                  </figcaption>
                </figure>
                {[0, 1].map((i) => (
                  <figure key={i} className="review review--placeholder" data-reveal style={{ "--d": `${(i + 1) * 80}ms` } as React.CSSProperties}>
                    <QuoteIcon className="review__mark" />
                    <span className="sample-tag sample-tag--inline">Placeholder</span>
                    <span className="skeleton" />
                    <span className="skeleton skeleton--short" />
                    <figcaption>
                      <span>Review source and link</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
            <div className="reviews__cta" data-reveal>
              {business.googleReviewsUrl ? (
                <a href={business.googleReviewsUrl} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
                  Read Customer Reviews <ArrowIcon size={18} />
                </a>
              ) : null}
              <RequestButton label="Request a Quote" />
            </div>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="section process" aria-labelledby="process-title">
          <div className="container">
            <SectionHead id="process-title" eyebrow="How it works" title="A clear path from request to completion." />
            <ol className="timeline" data-reveal>
              {processSteps.map((s, i) => (
                <li key={s.title} className="timeline__step" style={{ "--d": `${i * 140}ms` } as React.CSSProperties}>
                  <span className="timeline__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="actions actions--center" data-reveal>
              <RequestButton label="Get in Touch" />
              <CallButton />
            </div>
          </div>
        </section>

        {/* ================= SAFETY ================= */}
        <section className="section safety" aria-labelledby="safety-title">
          <div className="container safety__layout">
            <div>
              <SectionHead
                id="safety-title"
                eyebrow="Electrical safety"
                title="When it comes to electricity, don't ignore the warning signs."
                intro="These signs are worth having a qualified professional assess. Please don't open panels, remove covers or attempt hazardous repairs yourself."
              />
              <div className="safety__alert" data-reveal role="note">
                <AlertIcon size={22} />
                <p>
                  <strong>Smoke, fire or immediate danger?</strong> Move away from the area and call 911 right away.
                </p>
              </div>
              <div className="actions" data-reveal>
                <RequestButton label="Discuss an Electrical Issue" />
              </div>
            </div>
            <ul className="signs">
              {warningSigns.map((s, i) => (
                <li key={s.title} className="sign" data-reveal style={{ "--d": `${i * 50}ms` } as React.CSSProperties}>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= SERVICE AREA ================= */}
        <section className="section area" aria-labelledby="area-title">
          <div className="container area__inner" data-reveal>
            <span className="area__icon">
              <PinIcon size={28} />
            </span>
            <div>
              <p className="eyebrow">Based in {business.city}, {business.regionName}</p>
              <h2 id="area-title">Local electrical service</h2>
              <p className="lede">
                Looking for electrical service in your area? Contact W Sincinnati Electrical to discuss your location and
                project needs.
              </p>
              {business.serviceAreas.length > 0 && (
                <ul className="area__list">
                  {business.serviceAreas.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
            <CallButton variant="primary" label={`Check Your Area · ${business.phoneDisplay}`} />
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="section faq-section" id="faq" aria-labelledby="faq-title">
          <div className="container faq__layout">
            <div>
              <SectionHead id="faq-title" eyebrow="FAQ" title="Questions, answered." intro="Can't find what you're looking for? Call and ask." />
              <div className="actions" data-reveal>
                <CallButton variant="primary" />
              </div>
            </div>
            <div data-reveal>
              <FaqAccordion items={faqs} />
            </div>
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="container contact__layout">
            <div className="contact__copy">
              <SectionHead
                id="contact-title"
                eyebrow="Request service"
                title="Let's talk about your electrical project."
                intro="Tell us a little about the work you need, and contact W Sincinnati Electrical to discuss the next steps."
              />
              <a href={business.phoneHref} className="call-card" data-reveal>
                <span className="call-card__icon">
                  <PhoneIcon size={24} />
                </span>
                <span>
                  <small>Call W Sincinnati Electrical</small>
                  <strong>{business.phoneDisplay}</strong>
                </span>
                <ArrowIcon size={20} />
              </a>
              <ul className="contact__checks" data-reveal>
                <li>
                  <CheckIcon size={18} /> Residential and commercial requests
                </li>
                <li>
                  <CheckIcon size={18} /> Repairs, installations and upgrades
                </li>
                <li>
                  <CheckIcon size={18} /> Talk through options before work begins
                </li>
              </ul>
            </div>
            <div data-reveal>
              <ContactForm />
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="final" aria-labelledby="final-title">
          <Glow variant="cta" />
          <CircuitLines className="final__circuit" />
          <div className="grain" aria-hidden="true" />
          <div className="container final__inner">
            <h2 id="final-title" className="final__title" data-reveal>
              Let&apos;s get your electrical project <em>moving.</em>
            </h2>
            <p className="lede" data-reveal>
              Have an electrical repair, installation, or upgrade in mind? Get in touch with W Sincinnati Electrical to
              discuss your needs.
            </p>
            <div className="actions actions--center" data-reveal>
              <a href="#contact" className="btn btn--light btn--lg">
                Request Service <ArrowIcon size={18} />
              </a>
              <a href={business.phoneHref} className="btn btn--ghost btn--lg">
                <PhoneIcon size={18} /> Call {business.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <Logo />
            <p>{business.tagline}</p>
            <a href={business.phoneHref} className="footer__phone">
              <PhoneIcon size={18} /> {business.phoneDisplay}
            </a>
          </div>
          <nav aria-label="Footer">
            <h2 className="footer__h">Quick links</h2>
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="footer__h">Services</h2>
            <ul>
              {serviceGroups.map((g) => (
                <li key={g.id}>
                  <a href="#services">{g.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer__h">Contact</h2>
            <ul>
              <li>
                <a href={business.phoneHref}>{business.phoneDisplay}</a>
              </li>
              <li>
                {business.city}, {business.regionName}
              </li>
              <li>
                <a href="#contact">Request service online</a>
              </li>
              {business.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container footer__base">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms</a>
          </p>
        </div>
      </footer>

      <MobileActionBar />
    </>
  );
}
