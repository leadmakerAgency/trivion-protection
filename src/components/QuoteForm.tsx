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

const fieldClass =
  "focus-ring w-full rounded-sm border border-edge bg-panel px-3 py-2 text-foreground outline-none";

const legendClass = "px-1 text-sm font-semibold text-foreground";

export const QuoteForm = () => {
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
      setMessage("Thanks — we received your request and will follow up shortly.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again or contact us directly.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-sm border border-edge bg-card p-6 sm:p-8"
      noValidate
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <fieldset className="grid gap-4 border border-edge p-4 sm:p-5">
        <legend className={legendClass}>Contact details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className="text-muted">Full name</span>
            <input name="name" required className={fieldClass} />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-muted">Company</span>
            <input name="company" className={fieldClass} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className="text-muted">Phone</span>
            <input name="phone" required type="tel" className={fieldClass} />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-muted">Email</span>
            <input name="email" required type="email" className={fieldClass} />
          </label>
        </div>
      </fieldset>

      <fieldset className="grid gap-4 border border-edge p-4 sm:p-5">
        <legend className={legendClass}>Job details</legend>
        <label className="grid gap-1 text-sm">
          <span className="text-muted">Service needed</span>
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
          <span className="text-muted">Site address(es) or cities</span>
          <textarea name="locations" required rows={3} className={fieldClass} />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-muted">Hours / schedule needed</span>
          <input
            name="schedule"
            placeholder="Example: 24/7, Mon–Fri nights, weekends only"
            className={fieldClass}
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-muted">Details</span>
          <textarea name="details" rows={4} className={fieldClass} />
        </label>
      </fieldset>

      {message ? (
        <p
          role="status"
          className={`text-sm ${status === "success" ? "text-accent" : "text-red-300"}`}
        >
          {message}
        </p>
      ) : null}
      <Button
        type="submit"
        variant="primary"
        className="w-full sm:w-auto"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Submit request"}
      </Button>
    </form>
  );
};
