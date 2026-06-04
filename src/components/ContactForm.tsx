"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { CheckIcon } from "./Icons";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "phone" | "email" | "consent", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.contact.form;
  const subjects = dict.practiceAreas.items;

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(form: HTMLFormElement): FieldErrors {
    const data = new FormData(form);
    const next: FieldErrors = {};
    if (!String(data.get("name") || "").trim()) next.name = t.required;
    if (!String(data.get("phone") || "").trim()) next.phone = t.required;
    const email = String(data.get("email") || "").trim();
    if (!email) next.email = t.required;
    else if (!EMAIL_RE.test(email)) next.email = t.invalidEmail;
    if (data.get("consent") !== "on") next.consent = t.consentRequired;
    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
      preferredTime: data.get("preferredTime"),
      company: data.get("company"), // honeypot
      consent: data.get("consent") === "on",
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-surface p-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-gold">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="text-xl">{t.successTitle}</h3>
        <p className="max-w-md text-muted">{t.successBody}</p>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-md border border-border bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition-colors placeholder:text-muted/60 focus:border-gold focus:ring-2 focus:ring-gold/20";
  const labelClass = "mb-1.5 block text-sm font-medium text-navy";
  const errorClass = "mt-1 text-xs text-red-600";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {t.name} <span className="text-gold">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t.namePlaceholder}
            className={fieldClass}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            {t.phone} <span className="text-gold">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder={t.phonePlaceholder}
            className={`${fieldClass} text-start`}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            {t.email} <span className="text-gold">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            dir="ltr"
            placeholder={t.emailPlaceholder}
            className={`${fieldClass} text-start`}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="subject" className={labelClass}>
            {t.subject}
          </label>
          <select id="subject" name="subject" className={fieldClass} defaultValue="">
            <option value="" disabled>
              {t.subjectPlaceholder}
            </option>
            {subjects.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="preferredTime" className={labelClass}>
          {t.preferredTime}
        </label>
        <input
          id="preferredTime"
          name="preferredTime"
          type="text"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={t.messagePlaceholder}
          className={`${fieldClass} resize-y`}
        />
      </div>

      {/* Honeypot — hidden from real users, catches bots. */}
      <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-2.5 text-sm text-muted">
        <input
          name="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--gold)]"
          aria-invalid={!!errors.consent}
        />
        <span>{t.consent}</span>
      </label>
      {errors.consent && <p className={`${errorClass} -mt-3`}>{errors.consent}</p>}

      {status === "error" && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <strong className="font-semibold">{t.errorTitle}.</strong> {t.errorBody}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-gold/20 transition-colors hover:bg-gold-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? t.submitting : t.submit}
      </button>
    </form>
  );
}
