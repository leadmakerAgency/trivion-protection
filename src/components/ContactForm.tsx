"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/Button";

export type ContactFormServiceOption = { slug: string; title: string };

export type ContactFormAreaOption = {
  state: "california" | "texas";
  slug: string;
  name: string;
};

export type ContactFormProps = {
  services: ContactFormServiceOption[];
  areas: ContactFormAreaOption[];
  defaultServiceSlug?: string;
  defaultAreaKey?: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "mt-1.5 w-full rounded-sm border border-surface-light-edge bg-white px-3 py-2.5 text-sm text-foreground-on-light shadow-sm placeholder:text-muted-on-light focus-ring-on-light focus:border-accent-dark focus:outline-none";

const labelClass = "text-sm font-medium text-foreground-on-light";

export const ContactForm = ({
  services,
  areas,
  defaultServiceSlug,
  defaultAreaKey,
}: ContactFormProps) => {
  const initialService = useMemo(() => {
    if (!defaultServiceSlug) return "";
    return services.some((s) => s.slug === defaultServiceSlug) ? defaultServiceSlug : "";
  }, [defaultServiceSlug, services]);

  const initialArea = useMemo(() => {
    if (!defaultAreaKey) return "";
    const valid = areas.some((a) => `${a.state}:${a.slug}` === defaultAreaKey);
    return valid ? defaultAreaKey : "";
  }, [defaultAreaKey, areas]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [serviceSlug, setServiceSlug] = useState(initialService);
  const [areaKey, setAreaKey] = useState(initialArea);
  const [faxNumber, setFaxNumber] = useState("");

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const californiaAreas = areas.filter((a) => a.state === "california");
  const texasAreas = areas.filter((a) => a.state === "texas");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    const nextFieldErrors: Record<string, string> = {};
    if (!fullName.trim()) nextFieldErrors.fullName = "Name is required.";
    if (!email.trim() || !EMAIL_RE.test(email.trim().toLowerCase())) {
      nextFieldErrors.email = "A valid email is required.";
    }
    if (!phone.trim()) nextFieldErrors.phone = "Phone is required.";
    if (!message.trim()) nextFieldErrors.message = "Message is required.";
    if (!serviceSlug) nextFieldErrors.serviceSlug = "Select a service.";
    if (!areaKey) nextFieldErrors.areaKey = "Select a service area.";

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      return;
    }

    setStatus("submitting");
    const pageUrl =
      typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          company: company.trim(),
          message: message.trim(),
          serviceSlug,
          areaKey,
          pageUrl,
          faxNumber,
        }),
      });

      const data = (await res.json()) as { ok?: boolean; message?: string };

      if (res.ok && data.ok) {
        setStatus("success");
        setFullName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setMessage("");
        setServiceSlug(initialService);
        setAreaKey(initialArea);
        setFaxNumber("");
        return;
      }

      setStatus("error");
      setErrorMessage(
        typeof data.message === "string" && data.message
          ? data.message
          : "Something went wrong. Please try again or use phone or email below.",
      );
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again or use phone or email below.");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <form className="relative space-y-5" onSubmit={(ev) => void handleFormSubmit(ev)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="contact-fullName" className={labelClass}>
            Full name <span className="text-accent-dark">*</span>
          </label>
          <input
            id="contact-fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={fieldClass}
            aria-invalid={fieldErrors.fullName ? true : undefined}
            aria-describedby={fieldErrors.fullName ? "contact-fullName-error" : undefined}
            disabled={isSubmitting}
          />
          {fieldErrors.fullName ? (
            <p id="contact-fullName-error" className="mt-1 text-xs text-red-700" role="alert">
              {fieldErrors.fullName}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email <span className="text-accent-dark">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            disabled={isSubmitting}
          />
          {fieldErrors.email ? (
            <p id="contact-email-error" className="mt-1 text-xs text-red-700" role="alert">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Phone <span className="text-accent-dark">*</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClass}
            aria-invalid={fieldErrors.phone ? true : undefined}
            aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
            disabled={isSubmitting}
          />
          {fieldErrors.phone ? (
            <p id="contact-phone-error" className="mt-1 text-xs text-red-700" role="alert">
              {fieldErrors.phone}
            </p>
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-company" className={labelClass}>
            Company <span className="text-muted-on-light font-normal">(optional)</span>
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={fieldClass}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="contact-service" className={labelClass}>
            Service <span className="text-accent-dark">*</span>
          </label>
          <select
            id="contact-service"
            name="serviceSlug"
            required
            value={serviceSlug}
            onChange={(e) => setServiceSlug(e.target.value)}
            className={fieldClass}
            aria-invalid={fieldErrors.serviceSlug ? true : undefined}
            aria-describedby={fieldErrors.serviceSlug ? "contact-service-error" : undefined}
            disabled={isSubmitting}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
          {fieldErrors.serviceSlug ? (
            <p id="contact-service-error" className="mt-1 text-xs text-red-700" role="alert">
              {fieldErrors.serviceSlug}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-area" className={labelClass}>
            Service area <span className="text-accent-dark">*</span>
          </label>
          <select
            id="contact-area"
            name="areaKey"
            required
            value={areaKey}
            onChange={(e) => setAreaKey(e.target.value)}
            className={fieldClass}
            aria-invalid={fieldErrors.areaKey ? true : undefined}
            aria-describedby={fieldErrors.areaKey ? "contact-area-error" : undefined}
            disabled={isSubmitting}
          >
            <option value="">Select an area</option>
            <optgroup label="California">
              {californiaAreas.map((a) => (
                <option key={`${a.state}:${a.slug}`} value={`${a.state}:${a.slug}`}>
                  {a.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Texas">
              {texasAreas.map((a) => (
                <option key={`${a.state}:${a.slug}`} value={`${a.state}:${a.slug}`}>
                  {a.name}
                </option>
              ))}
            </optgroup>
          </select>
          {fieldErrors.areaKey ? (
            <p id="contact-area-error" className="mt-1 text-xs text-red-700" role="alert">
              {fieldErrors.areaKey}
            </p>
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={labelClass}>
            How can we help? <span className="text-accent-dark">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${fieldClass} resize-y min-h-[120px]`}
            placeholder="Site location, hours, type of coverage, and timeline help us respond faster."
            aria-invalid={fieldErrors.message ? true : undefined}
            aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
            disabled={isSubmitting}
          />
          {fieldErrors.message ? (
            <p id="contact-message-error" className="mt-1 text-xs text-red-700" role="alert">
              {fieldErrors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="contact-faxNumber">Fax</label>
        <input
          id="contact-faxNumber"
          name="faxNumber"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={faxNumber}
          onChange={(e) => setFaxNumber(e.target.value)}
        />
      </div>

      <div aria-live="polite" className="min-h-[1.25rem] text-sm">
        {status === "success" ? (
          <p className="font-medium text-foreground-on-light">
            Thank you — your message was sent. We will get back to you soon.
          </p>
        ) : null}
        {status === "error" && errorMessage ? (
          <p className="font-medium text-red-800" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>

      <Button type="submit" variant="primary" surface="light" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
};
