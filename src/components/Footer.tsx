import Link from "next/link";
import { Logo } from "@/components/Logo";
import { getSiteAddressLines, getSiteContactEmail, getSitePhoneRaw, getSiteTelHref, SITE_NAME } from "@/lib/site";
import { services } from "@/lib/services";
import { imageAttribution } from "@/lib/site-images";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/#our-process", label: "Process" },
  { href: "/industries", label: "Industries" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
];

export const Footer = () => {
  const year = new Date().getFullYear();
  const email = getSiteContactEmail();
  const phoneDisplay = getSitePhoneRaw();
  const telHref = getSiteTelHref();
  const addressLines = getSiteAddressLines();

  return (
    <footer className="border-t border-edge bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 border-b border-edge pb-10 md:grid-cols-3 md:border-b-0 md:pb-0">
          <div className="md:border-r md:border-solid md:border-edge md:pr-8">
            <div className="mb-5">
              <Logo />
            </div>
            <p className="text-base leading-relaxed text-muted">
              Licensed private security for Los Angeles County and select regional programs.
              California-licensed professionals. Insurance and supervision aligned to professional
              standards, details confirmed during onboarding.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted/80">{imageAttribution}</p>
          </div>
          <div className="md:border-r md:border-solid md:border-edge md:px-2 lg:px-4">
            <p className="text-base font-semibold text-foreground">Contact</p>
            <ul className="mt-3 space-y-2 text-base text-muted">
              {addressLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
              {phoneDisplay && telHref ? (
                <li>
                  <a className="hover:text-accent hover:underline" href={telHref}>
                    {phoneDisplay}
                  </a>
                </li>
              ) : phoneDisplay ? (
                <li>{phoneDisplay}</li>
              ) : null}
              <li>
                <a className="hover:text-accent hover:underline" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">Services</p>
            <ul className="mt-3 grid gap-2 text-base">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    className="text-muted hover:text-accent hover:underline"
                    href={`/services/${s.slug}`}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-edge pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-3 gap-y-2 sm:gap-x-4">
            {footerLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-accent hover:underline">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-1 text-muted sm:items-end">
            <p className="sm:text-base">
              © {year} {SITE_NAME}. All rights reserved.
            </p>
            <a
              href="/llms.txt"
              aria-label="LLM-readable site index (llms.txt)"
              className="text-xs text-muted/80 hover:text-accent hover:underline"
            >
              llms.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
