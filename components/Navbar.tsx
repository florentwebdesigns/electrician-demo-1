"use client";

import { useEffect, useRef, useState } from "react";
import { business, navLinks } from "@/content/site";
import { Logo } from "./Logo";
import { CloseIcon, MenuIcon, PhoneIcon } from "./Icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""} ${open ? "nav--open" : ""}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__brand" aria-label={`${business.name}, back to top`}>
          <Logo />
        </a>
        <nav className="nav__links" aria-label="Primary">
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={business.phoneHref} className="btn btn--primary nav__cta">
          <PhoneIcon size={18} />
          <span>
            <span className="nav__cta-label">Call Now</span> {business.phoneDisplay}
          </span>
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      <div
        id="mobile-menu"
        ref={panelRef}
        className="nav__panel"
        hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul>
            {navLinks.map((l, i) => (
              <li key={l.href} style={{ "--i": i } as React.CSSProperties}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav__panel-actions">
          <a href={business.phoneHref} className="btn btn--primary btn--block">
            <PhoneIcon size={18} /> Call {business.phoneDisplay}
          </a>
          <a href="#book" className="btn btn--ghost btn--block" onClick={() => setOpen(false)}>
            Book a Visit
          </a>
        </div>
      </div>
    </header>
  );
}

export function MobileActionBar() {
  return (
    <div className="mobile-bar" role="region" aria-label="Quick actions">
      <a href={business.phoneHref} className="mobile-bar__call">
        <PhoneIcon size={18} />
        Call Now
      </a>
      <a href="#book" className="mobile-bar__request">
        Book a Visit
      </a>
    </div>
  );
}
