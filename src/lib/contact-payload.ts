import { getArea, type ServiceAreaState } from "@/lib/areas";
import { getServiceBySlug } from "@/lib/services";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFormRequestBody = {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  serviceSlug: string;
  /** Composite `state:areaSlug` (e.g. `california:los-angeles-county`). */
  areaKey: string;
  pageUrl?: string;
};

export type ContactWebhookPayload = {
  source: "trivon_protection_contact";
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  serviceSlug: string;
  serviceTitle: string;
  areaState: ServiceAreaState;
  areaSlug: string;
  areaName: string;
  pageUrl: string;
};

export type ContactValidationResult =
  | { ok: true; payload: ContactWebhookPayload }
  | { ok: false; status: 400; message: string };

const isServiceAreaState = (value: string): value is ServiceAreaState =>
  value === "california" || value === "texas";

export const parseAreaKey = (areaKey: string): { state: ServiceAreaState; slug: string } | null => {
  const trimmed = areaKey.trim();
  const idx = trimmed.indexOf(":");
  if (idx <= 0 || idx === trimmed.length - 1) return null;
  const state = trimmed.slice(0, idx);
  const slug = trimmed.slice(idx + 1);
  if (!isServiceAreaState(state) || !slug) return null;
  return { state, slug };
};

export const validateContactRequest = (raw: unknown): ContactValidationResult => {
  if (raw === null || typeof raw !== "object") {
    return { ok: false, status: 400, message: "Invalid request body." };
  }

  const body = raw as Record<string, unknown>;

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const serviceSlug = typeof body.serviceSlug === "string" ? body.serviceSlug.trim() : "";
  const areaKey = typeof body.areaKey === "string" ? body.areaKey.trim() : "";
  const pageUrl = typeof body.pageUrl === "string" ? body.pageUrl.trim().slice(0, 2048) : "";

  if (!fullName) {
    return { ok: false, status: 400, message: "Name is required." };
  }
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, status: 400, message: "A valid email is required." };
  }
  if (!phone) {
    return { ok: false, status: 400, message: "Phone is required." };
  }
  if (!message) {
    return { ok: false, status: 400, message: "Message is required." };
  }
  if (!serviceSlug) {
    return { ok: false, status: 400, message: "Service is required." };
  }
  if (!areaKey) {
    return { ok: false, status: 400, message: "Service area is required." };
  }

  const service = getServiceBySlug(serviceSlug);
  if (!service) {
    return { ok: false, status: 400, message: "Unknown service." };
  }

  const parsedArea = parseAreaKey(areaKey);
  if (!parsedArea) {
    return { ok: false, status: 400, message: "Unknown service area." };
  }

  const area = getArea(parsedArea.state, parsedArea.slug);
  if (!area) {
    return { ok: false, status: 400, message: "Unknown service area." };
  }

  const payload: ContactWebhookPayload = {
    source: "trivon_protection_contact",
    submittedAt: new Date().toISOString(),
    fullName,
    email,
    phone,
    company,
    message,
    serviceSlug: service.slug,
    serviceTitle: service.title,
    areaState: area.state,
    areaSlug: area.slug,
    areaName: area.name,
    pageUrl,
  };

  return { ok: true, payload };
};
