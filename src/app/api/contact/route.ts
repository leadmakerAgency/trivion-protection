import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  service: z.string().min(2),
  locations: z.string().min(4),
  schedule: z.string().optional(),
  details: z.string().optional(),
  website: z.string().optional(),
});

export const POST = async (request: Request) => {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the required fields and try again." },
      { status: 400 },
    );
  }

  if (parsed.data.website && parsed.data.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { ok: false, error: "Email is not configured yet. Please try again later or email us directly." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const { name, company, email, service, locations, schedule, details } = parsed.data;

  const html = `
    <h2>New quote request: Trivon Protection</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company ?? "")}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Service:</strong> ${escapeHtml(service)}</p>
    <p><strong>Locations:</strong><br/>${escapeHtml(locations).replace(/\n/g, "<br/>")}</p>
    <p><strong>Schedule:</strong> ${escapeHtml(schedule ?? "")}</p>
    <p><strong>Details:</strong><br/>${escapeHtml(details ?? "").replace(/\n/g, "<br/>")}</p>
  `;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Quote request: ${service} (${name})`,
    html,
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Unable to send email right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
