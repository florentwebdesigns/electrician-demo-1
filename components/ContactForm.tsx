"use client";

import { useRef, useState } from "react";
import { business, serviceOptions } from "@/content/site";
import { AlertIcon, CheckIcon, PhoneIcon } from "./Icons";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "phone" | "email" | "service" | "propertyType" | "details", string>>;

const phoneDigits = (v: string) => v.replace(/\D/g, "");

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const details = String(data.get("details") ?? "").trim();
  if (name.length < 2) errors.name = "Please enter your full name.";
  const digits = phoneDigits(phone);
  if (digits.length < 10 || digits.length > 11) errors.phone = "Please enter a 10-digit phone number.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address, or leave it blank.";
  if (!data.get("service")) errors.service = "Please choose the service you need.";
  if (!data.get("propertyType")) errors.propertyType = "Please choose a property type.";
  if (details.length < 10) errors.details = "Please add a few words about the work you need.";
  return errors;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverMessage, setServerMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("/api/request-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.message || "Your request could not be sent.");
      }
      setStatus("success");
      form.reset();
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch (err) {
      setStatus("error");
      setServerMessage(err instanceof Error ? err.message : "Your request could not be sent.");
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  if (status === "success") {
    return (
      <div className="form-card form-success" ref={statusRef} tabIndex={-1} role="status">
        <span className="form-success__icon">
          <CheckIcon size={28} />
        </span>
        <h3>Request received.</h3>
        <p>
          Thanks for reaching out to {business.name}. Your request has been sent. If your matter is time-sensitive,
          please call directly.
        </p>
        <div className="form-success__actions">
          <a href={business.phoneHref} className="btn btn--primary">
            <PhoneIcon size={18} /> Call {business.phoneDisplay}
          </a>
          <button type="button" className="btn btn--ghost" onClick={() => setStatus("idle")}>
            Send another request
          </button>
        </div>
      </div>
    );
  }

  const field = (name: keyof Errors) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  const err = (name: keyof Errors) =>
    errors[name] ? (
      <p className="field__error" id={`${name}-error`}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} className="form-card" noValidate onSubmit={onSubmit} aria-describedby="form-note">
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" type="text" autoComplete="name" required {...field("name")} />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="phone">Phone number</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required {...field("phone")} />
          {err("phone")}
        </div>
        <div className="field">
          <label htmlFor="email">
            Email address <span className="field__opt">Optional</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" {...field("email")} />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor="service">Service needed</label>
          <div className="select">
            <select id="service" name="service" required defaultValue="" {...field("service")}>
              <option value="" disabled>
                Choose a service
              </option>
              {serviceOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          {err("service")}
        </div>
        <fieldset className="field field--full" aria-describedby={errors.propertyType ? "propertyType-error" : undefined}>
          <legend>Property type</legend>
          <div className="chips">
            {["Home", "Business", "Rental / Multi-unit", "Other"].map((t) => (
              <label className="chip" key={t}>
                <input type="radio" name="propertyType" value={t} />
                <span>{t}</span>
              </label>
            ))}
          </div>
          {err("propertyType")}
        </fieldset>
        <div className="field field--full">
          <label htmlFor="details">Project details</label>
          <textarea
            id="details"
            name="details"
            rows={4}
            placeholder="What's going on, or what would you like installed?"
            required
            {...field("details")}
          />
          {err("details")}
        </div>
        <div className="field">
          <label htmlFor="address">
            Project address <span className="field__opt">Optional</span>
          </label>
          <input id="address" name="address" type="text" autoComplete="street-address" />
        </div>
        <div className="field">
          <label htmlFor="date">
            Preferred date <span className="field__opt">Optional</span>
          </label>
          <input id="date" name="date" type="date" />
        </div>
        <fieldset className="field field--full">
          <legend>Preferred contact method</legend>
          <div className="chips">
            {["Phone call", "Text message", "Email"].map((t, i) => (
              <label className="chip" key={t}>
                <input type="radio" name="contactMethod" value={t} defaultChecked={i === 0} />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {/* Spam trap: hidden from people, left blank by real visitors */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="company_website">Leave this field empty</label>
          <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status === "error" && (
        <div className="form-error" ref={statusRef} tabIndex={-1} role="alert">
          <AlertIcon size={20} />
          <div>
            <strong>Your request was not sent.</strong>
            <p>
              {serverMessage} Please call <a href={business.phoneHref}>{business.phoneDisplay}</a> instead.
            </p>
          </div>
        </div>
      )}

      <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending request…" : "Request Electrical Service"}
      </button>
      <p className="form-note" id="form-note">
        Your details are only used to respond to your request. For anything urgent, call{" "}
        <a href={business.phoneHref}>{business.phoneDisplay}</a>.
      </p>
    </form>
  );
}
