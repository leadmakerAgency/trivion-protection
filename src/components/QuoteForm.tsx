"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

const serviceOptions = [
  "Armed security guards",
  "Unarmed security guards",
  "Marked vehicle patrol",
  "Fire watch",
  "Construction site security",
  "Warehouse security",
  "Multiple / not sure",
];

type QuoteFormProps = {
  /** Paper pages use bordered white fields for readability on white backgrounds */
  surface?: "dark" | "light";
};

export const QuoteForm = ({ surface = "dark" }: QuoteFormProps) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      service: String(formData.get("service") ?? ""),
      locations: String(formData.get("locations") ?? ""),
      schedule: String(formData.get("schedule") ?? ""),
      details: String(formData.get("details") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please call or email us.");
        return;
      }
      setStatus("success");
      setMessage("Thanks. We received your request and will follow up shortly.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again or contact us directly.");
    }
  };

  const isLight = surface === "light";
  const fieldClass = isLight
    ? "focus-ring-on-light w-full rounded-sm border border-surface-light-edge bg-white px-3 py-2 text-foreground-on-light placeholder:text-muted-on-light/80 outline-none shadow-sm"
    : "focus-ring w-full rounded-sm border border-edge bg-panel px-3 py-2 text-foreground outline-none";
  const legendClass = isLight
    ? "px-1 text-sm font-semibold text-foreground-on-light"
    : "px-1 text-sm font-semibold text-foreground";
  const labelMuted = isLight ? "text-muted-on-light" : "text-muted";
  const formShell = isLight
    ? "grid gap-6 rounded-xl border border-surface-light-edge bg-surface-light p-6 shadow-sm sm:p-8"
    : "grid gap-6 rounded-sm border border-edge bg-card p-6 sm:p-8";
  const fieldsetShell = isLight
    ? "grid gap-4 rounded-lg border border-surface-light-edge bg-white p-4 sm:p-5"
    : "grid gap-4 border border-edge p-4 sm:p-5";
  const statusClass =
    status === "success"
      ? isLight
        ? "text-accent-dark"
        : "text-accent"
      : isLight
        ? "text-red-700"
        : "text-red-300";

  return (
    <form onSubmit={handleSubmit} className={formShell} noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <fieldset className={fieldsetShell}>
        <legend className={legendClass}>Contact details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className={labelMuted}>Full name</span>
            <input name="name" required className={fieldClass} />
          </label>
          <label className="grid gap-1 text-sm">
            <span className={labelMuted}>Company</span>
            <input name="company" className={fieldClass} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className={labelMuted}>Phone</span>
            <input name="phone" required type="tel" className={fieldClass} />
          </label>
          <label className="grid gap-1 text-sm">
            <span className={labelMuted}>Email</span>
            <input name="email" required type="email" className={fieldClass} />
          </label>
        </div>
      </fieldset>

      <fieldset className={fieldsetShell}>
        <legend className={legendClass}>Job details</legend>
        <label className="grid gap-1 text-sm">
          <span className={labelMuted}>Service needed</span>
          <select name="service" required className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select an option
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          <span className={labelMuted}>Site address(es) or cities</span>
          <textarea name="locations" required rows={3} className={fieldClass} />
        </label>
        <label className="grid gap-1 text-sm">
          <span className={labelMuted}>Hours / schedule needed</span>
          <input
            name="schedule"
            placeholder="Example: 24/7, Mon–Fri nights, weekends only"
            className={fieldClass}
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className={labelMuted}>Details</span>
          <textarea name="details" rows={4} className={fieldClass} />
        </label>
      </fieldset>

      {message ? (
        <p role="status" className={`text-sm ${statusClass}`}>
          {message}
        </p>
      ) : null}
      <Button
        type="submit"
        variant="primary"
        surface={isLight ? "light" : "dark"}
        className="w-full sm:w-auto"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Submit request"}
      </Button>
    </form>
  );
};
