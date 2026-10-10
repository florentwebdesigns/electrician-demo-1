import { business, faqs, navLinks, reviews, services, steps } from "@/content/site";
import { Navbar, MobileActionBar } from "@/components/Navbar";
import { RevealObserver } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { BookingForm } from "@/components/BookingForm";
import { FaqAccordion } from "@/components/Faq";
import { ArrowIcon, CheckIcon, PhoneIcon, ServiceIcon } from "@/components/Icons";

function LiveBackground() {
  return (
    <div className="live-bg" aria-hidden="true">
      <span className="live-bg__blob live-bg__blob--1" />
      <span className="live-bg__blob live-bg__blob--2" />
      <span className="live-bg__blob live-bg__blob--3" />
      <span className="live-bg__blob live-bg__blob--4" />
      <span className="live-bg__grid" />
      <span className="live-bg__grain" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <LiveBackground />
      <RevealObserver />
      <Navbar />

      <main id="main">
        {/* Hero + booking */}
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="container hero__inner">
            <div className="hero__copy">
              <p className="eyebrow">
                <span className="pulse-dot" aria-hidden="true" />
                Electrician · {business.city}, {business.regionName}
              </p>
              <h1 id="hero-title" className="hero__title">
                Electrical work, <em>done right.</em>
              </h1>
              <p className="hero__lede">
                Repairs, lighting, panels and upgrades for homes and businesses. Book a visit online or call to talk it
                through.
              </p>
              <a href={business.phoneHref} className="hero__call">
                <span className="hero__call-icon">
                  <PhoneIcon size={22} />
                </span>
                <span>
                  <small>Call now</small>
                  <strong>{business.phoneDisplay}</strong>
                </span>
              </a>
              <ul className="hero__checks">
                <li>
                  <CheckIcon size={18} /> Residential &amp; commercial
                </li>
                <li>
                  <CheckIcon size={18} /> Clear answers before work starts
                </li>
                <li>
                  <CheckIcon size={18} /> Careful, tidy workmanship
                </li>
              </ul>
            </div>
            <div className="hero__form" id="book">
              <BookingForm />
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section" id="services" aria-labelledby="services-title">
          <div className="container">
            <div className="section-head" data-reveal>
              <p className="eyebrow">Services</p>
              <h2 id="services-title">What we can help with</h2>
            </div>
            <ul className="services">
              {services.map((s, i) => (
                <li key={s.title} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                  <a href="#book" className="service">
                    <span className="service__icon">
                      <ServiceIcon name={s.icon} size={24} />
                    </span>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                    <span className="service__cta">
                      Book this <ArrowIcon size={16} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section className="section" id="how" aria-labelledby="how-title">
          <div className="container">
            <div className="section-head" data-reveal>
              <p className="eyebrow">How it works</p>
              <h2 id="how-title">Three simple steps</h2>
            </div>
            <ol className="steps" data-reveal>
              {steps.map((s, i) => (
                <li key={s.title} className="step" style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
                  <span className="step__num">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Reviews: shown only once real reviews are added in content/site.ts */}
        {reviews.length > 0 && (
          <section className="section" id="reviews" aria-labelledby="reviews-title">
            <div className="container">
              <div className="section-head" data-reveal>
                <p className="eyebrow">Reviews</p>
                <h2 id="reviews-title">What customers say</h2>
              </div>
              <div className="reviews">
                {reviews.map((r) => (
                  <figure key={r.name + r.quote.slice(0, 12)} className="review" data-reveal>
                    <blockquote>“{r.quote}”</blockquote>
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
              {business.googleReviewsUrl && (
                <p className="reviews__more">
                  <a href={business.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
                    Read more reviews <ArrowIcon size={16} />
                  </a>
                </p>
              )}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="section" id="faq" aria-labelledby="faq-title">
          <div className="container faq-wrap">
            <div className="section-head" data-reveal>
              <p className="eyebrow">FAQ</p>
              <h2 id="faq-title">Good to know</h2>
            </div>
            <div data-reveal>
              <FaqAccordion items={faqs} />
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="section cta" aria-labelledby="cta-title">
          <div className="container">
            <div className="cta__card" data-reveal>
              <h2 id="cta-title">Ready when you are.</h2>
              <p>Book a visit in a minute, or call and talk to someone now.</p>
              <div className="cta__actions">
                <a href="#book" className="btn btn--light btn--lg">
                  Book a Visit <ArrowIcon size={18} />
                </a>
                <a href={business.phoneHref} className="btn btn--ghost btn--lg">
                  <PhoneIcon size={18} /> {business.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <Logo />
            <p>{business.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="footer__links">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
              {business.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href={business.phoneHref} className="footer__phone">
            <PhoneIcon size={18} /> {business.phoneDisplay}
          </a>
        </div>
        <div className="container footer__base">
          <p>
            © {new Date().getFullYear()} {business.name} · {business.city}, {business.regionName}
          </p>
          <p>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </p>
        </div>
      </footer>

      <MobileActionBar />
    </>
  );
}
