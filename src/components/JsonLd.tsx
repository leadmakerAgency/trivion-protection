/** Renders `<script type="application/ld+json">` safely (server components). */

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export const JsonLd = ({ data }: JsonLdProps) => {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(payload.length === 1 ? payload[0] : payload) }} />
  );
};
