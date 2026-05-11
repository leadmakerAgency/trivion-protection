import { validateContactRequest } from "@/lib/contact-payload";

const WEBHOOK_TIMEOUT_MS = 12_000;

/** Production n8n webhook; override with `LEADMAKER_WEBHOOK_URL` for staging or if the workflow URL changes. */
const DEFAULT_LEADMAKER_WEBHOOK_URL =
  "https://hooks.leadmaker.agency/webhook/a8ebc1c1-1a8f-4ec7-9d33-9dfcbae7e4ca";

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  if (raw !== null && typeof raw === "object") {
    const rec = raw as Record<string, unknown>;
    const faxRaw = rec.faxNumber;
    const fax = typeof faxRaw === "string" ? faxRaw.trim() : "";
    if (fax.length > 0) {
      return Response.json({ ok: true });
    }
  }

  const validated = validateContactRequest(raw);
  if (!validated.ok) {
    return Response.json({ ok: false, message: validated.message }, { status: validated.status });
  }

  const webhookUrl =
    process.env.LEADMAKER_WEBHOOK_URL?.trim() || DEFAULT_LEADMAKER_WEBHOOK_URL;

  let upstream: Response;
  try {
    upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "trivon-protection-site/1.0",
      },
      body: JSON.stringify(validated.payload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
  } catch {
    return Response.json(
      {
        ok: false,
        message: "We could not deliver your message. Please try again or call or email us directly.",
      },
      { status: 502 },
    );
  }

  if (!upstream.ok) {
    return Response.json(
      {
        ok: false,
        message: "We could not deliver your message. Please try again or call or email us directly.",
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
