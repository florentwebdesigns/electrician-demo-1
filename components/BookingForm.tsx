"use client";

import { useEffect, useRef, useState } from "react";
import { business, serviceOptions, timeWindows } from "@/content/site";
import { AlertIcon, ArrowIcon, CheckIcon, PhoneIcon } from "./Icons";

type Status = "idle" | "submitting" | "success" | "error";
type Field = "name" | "phone" | "service";
type Errors = Partial<Record<Field, string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (String(data.get("name") ?? "").trim().length < 2) errors.name = "Please enter your name.";
  const digits = String(data.get("phone") ?? "").replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) errors.phone = "Please enter a 10-digit phone number.";
  if (!data.get("service")) errors.service = "Please choose a service.";
  return errors;
}

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const [minDate, setMinDate] = useState<string>();
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    setMinDate(d.toISOString().slice(0, 10));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/request-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (!res.ok || !json.ok) throw new Error(json.message || "Your request could not be sent.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Your request could not be sent.");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status === "success") {
    return (
      <div className="book book--done" ref={statusRef} tabIndex={-1} role="status">
        <span className="book__check">
          <CheckIcon size={28} />
        </span>
        <h2 className="book__title">Request received</h2>
        <p>
          Thanks. {business.name} will contact you to confirm the details and a time. Need to talk sooner? Call{" "}
          <a href={business.phoneHref}>{business.phoneDisplay}</a>.
        </p>
        <button type="button" className="btn btn--ghost" onClick={() => setStatus("idle")}>
          Send another request
        </button>
      </div>
    );
  }

  const aria = (name: Field) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  const err = (name: Field) =>
    errors[name] ? (
      <p className="field__error" id={`${name}-error`}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form className="book" noValidate onSubmit={onSubmit} aria-labelledby="book-title">
      <div className="book__head">
        <h2 className="book__title" id="book-title">
          Book a visit
        </h2>
        <p>Takes about a minute. We&apos;ll follow up to confirm.</p>
      </div>

      <div className="book__grid">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" autoComplete="name" required {...aria("name")} />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required {...aria("phone")} />
          {err("phone")}
        </div>
        <div className="field">
          <label htmlFor="service">Service</label>
          <div className="select">
            <select id="service" name="service" required defaultValue="" {...aria("service")}>
              <option value="" disabled>
                Choose one
              </option>
              {serviceOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          {err("service")}
        </div>
        <fieldset className="field">
          <legend>Property</legend>
          <div className="segmented">
            {["Home", "Business"].map((t, i) => (
              <label key={t}>
                <input type="radio" name="propertyType" value={t} defaultChecked={i === 0} />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="field">
          <label htmlFor="date">
            Preferred date <span className="field__opt">Optional</span>
          </label>
          <input id="date" name="date" type="date" min={minDate} />
        </div>
        <div className="field">
          <label htmlFor="time">
            Preferred time <span className="field__opt">Optional</span>
          </label>
          <div className="select">
            <select id="time" name="time" defaultValue="">
              <option value="">Any time</option>
              {timeWindows.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="field field--full">
          <label htmlFor="address">
            Address or ZIP <span className="field__opt">Optional</span>
          </label>
          <input id="address" name="address" autoComplete="street-address" />
        </div>
        <div className="field field--full">
          <label htmlFor="details">
            What do you need? <span className="field__opt">Optional</span>
          </label>
          <textarea id="details" name="details" rows={3} placeholder="e.g. Breaker keeps tripping in the kitchen" />
        </div>
        <div className="hp" aria-hidden="true">
          <label htmlFor="company_website">Leave this field empty</label>
          <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status === "error" && (
        <div className="form-error" ref={statusRef} tabIndex={-1} role="alert">
          <AlertIcon size={20} />
          <p>
            <strong>Your request was not sent.</strong> {message} Please call{" "}
            <a href={business.phoneHref}>{business.phoneDisplay}</a>.
          </p>
        </div>
      )}

      <button type="submit" className="btn btn--primary btn--block btn--lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Request My Appointment"}
        {status !== "submitting" && <ArrowIcon size={18} />}
      </button>
      <p className="book__alt">
        Prefer to talk?{" "}
        <a href={business.phoneHref}>
          <PhoneIcon size={15} /> {business.phoneDisplay}
        </a>
      </p>
    </form>
  );
}
