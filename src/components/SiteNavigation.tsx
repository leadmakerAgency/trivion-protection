"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { services } from "@/lib/services";
import { californiaAreas, texasAreas } from "@/lib/areas";
import { Button } from "@/components/Button";

type Mega = "services" | "areas" | null;

type MainLink = { href: string; label: string; ariaLabel?: string };

const mainLinks: MainLink[] = [
  { href: "/industries", label: "Industries", ariaLabel: "Industries we serve" },
  { href: "/our-process", label: "Process", ariaLabel: "Our process" },
  { href: "/knowledge", label: "Knowledge", ariaLabel: "Knowledge base" },
  { href: "/blog", label: "Blog" },
];

const navLinkClass =
  "focus-ring shrink-0 whitespace-nowrap rounded-sm px-3 py-2.5 text-sm font-medium text-foreground/90 hover:bg-panel hover:text-foreground";

const triggerClass =
  "focus-ring inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm px-3 py-2.5 text-sm font-medium text-foreground/90 hover:bg-panel hover:text-foreground";

const dropdownPanelClass =
  "rounded-sm border border-edge bg-card py-1 shadow-[0_4px_14px_rgba(0,0,0,0.45)]";

const dropdownLinkClass =
  "block px-3 py-2 text-sm text-foreground/90 hover:bg-panel hover:text-foreground focus-visible:bg-panel focus-visible:outline-none";

const CARET_CLASS =
  "h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-150 ease-out motion-reduce:transition-none";

export const SiteNavigation = () => {
  const [openMega, setOpenMega] = useState<Mega>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<"services" | "areas" | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelScheduledClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelScheduledClose();
    closeTimerRef.current = setTimeout(() => {
      setOpenMega(null);
      closeTimerRef.current = null;
    }, 140);
  }, [cancelScheduledClose]);

  const openDesktopMenu = useCallback(
    (key: Exclude<Mega, null>) => {
      cancelScheduledClose();
      setOpenMega(key);
    },
    [cancelScheduledClose],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cancelScheduledClose();
        setOpenMega(null);
        setMobileOpen(false);
        setMobileSection(null);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [cancelScheduledClose]);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        cancelScheduledClose();
        setOpenMega(null);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [cancelScheduledClose]);

  useEffect(() => () => cancelScheduledClose(), [cancelScheduledClose]);

  const handleToggleMega = (key: Exclude<Mega, null>) => {
    cancelScheduledClose();
    setOpenMega((prev) => (prev === key ? null : key));
  };

  const handleDropdownMouseLeave = (e: React.MouseEvent) => {
    const next = e.relatedTarget as Node | null;
    if (next && e.currentTarget.contains(next)) return;
    scheduleClose();
  };

  const handleDropdownBlurCapture = (e: React.FocusEvent) => {
    const next = e.relatedTarget as Node | null;
    if (next && e.currentTarget.contains(next)) return;
    scheduleClose();
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent, key: Exclude<Mega, null>, menuId: string) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      cancelScheduledClose();
      setOpenMega(key);
      requestAnimationFrame(() => {
        const root = document.getElementById(menuId);
        const first = root?.querySelector<HTMLElement>("a[href], button:not([disabled])");
        first?.focus();
      });
    }
    if (e.key === "Escape") {
      e.preventDefault();
      cancelScheduledClose();
      setOpenMega(null);
    }
  };

  const handlePanelKeyDown = (e: React.KeyboardEvent, triggerId: string) => {
    if (e.key !== "ArrowUp") return;
    const links = (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>("a[href]");
    if (links.length && document.activeElement === links[0]) {
      e.preventDefault();
      document.getElementById(triggerId)?.focus();
    }
  };

  const toggleMobileSection = (s: "services" | "areas") => {
    setMobileSection((prev) => (prev === s ? null : s));
  };

  const handleTriggerFocusKeyboard = (key: Exclude<Mega, null>) => (e: React.FocusEvent<HTMLButtonElement>) => {
    try {
      if (e.currentTarget.matches(":focus-visible")) openDesktopMenu(key);
    } catch {
      openDesktopMenu(key);
    }
  };

  return (
    <nav ref={navRef} className="relative flex justify-end">
      <div className="flex items-center justify-end gap-0">
        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-edge bg-background text-foreground hover:bg-panel lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => {
            setMobileOpen((v) => !v);
            if (mobileOpen) setMobileSection(null);
          }}
        >
          {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          <span className="sr-only">Toggle navigation</span>
        </button>

        <div className="hidden min-w-0 flex-1 flex-nowrap items-center justify-end gap-0 overflow-visible lg:flex">
          <Link href="/" className={navLinkClass}>
            Home
          </Link>

          <div
            className="relative shrink-0"
            onMouseEnter={() => openDesktopMenu("services")}
            onMouseLeave={handleDropdownMouseLeave}
            onBlurCapture={handleDropdownBlurCapture}
          >
            <button
              id="nav-services-trigger"
              type="button"
              className={`${triggerClass} ${openMega === "services" ? "bg-panel text-foreground" : ""}`}
              aria-expanded={openMega === "services"}
              aria-haspopup="true"
              aria-controls="services-menu"
              aria-label="Services menu"
              onFocus={handleTriggerFocusKeyboard("services")}
              onClick={() => handleToggleMega("services")}
              onKeyDown={(e) => handleTriggerKeyDown(e, "services", "services-menu")}
            >
              Services
              <ChevronDown
                className={`${CARET_CLASS} ${openMega === "services" ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {openMega === "services" ? (
              <div
                id="services-menu"
                className={`absolute left-0 top-full z-[60] min-w-[14rem] max-w-[min(100vw-2rem,20rem)] pt-1 ${dropdownPanelClass}`}
                role="region"
                aria-labelledby="nav-services-trigger"
                onKeyDown={(e) => handlePanelKeyDown(e, "nav-services-trigger")}
              >
                <ul className="max-h-[min(70vh,22rem)] overflow-y-auto">
                  {services.map((s) => (
                    <li key={s.slug} className="border-b border-edge/80 last:border-b-0">
                      <Link
                        href={`/services/${s.slug}`}
                        className={dropdownLinkClass}
                        onClick={() => {
                          cancelScheduledClose();
                          setOpenMega(null);
                        }}
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-edge px-2 py-2">
                  <Link
                    href="/services"
                    className="block rounded-sm px-2 py-1.5 text-xs font-medium text-muted hover:bg-panel hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                    onClick={() => {
                      cancelScheduledClose();
                      setOpenMega(null);
                    }}
                  >
                    All services
                  </Link>
                </div>
              </div>
            ) : null}
          </div>

          <div
            className="relative shrink-0"
            onMouseEnter={() => openDesktopMenu("areas")}
            onMouseLeave={handleDropdownMouseLeave}
            onBlurCapture={handleDropdownBlurCapture}
          >
            <button
              id="nav-areas-trigger"
              type="button"
              className={`${triggerClass} ${openMega === "areas" ? "bg-panel text-foreground" : ""}`}
              aria-expanded={openMega === "areas"}
              aria-haspopup="true"
              aria-controls="areas-menu"
              aria-label="Service areas menu"
              onFocus={handleTriggerFocusKeyboard("areas")}
              onClick={() => handleToggleMega("areas")}
              onKeyDown={(e) => handleTriggerKeyDown(e, "areas", "areas-menu")}
            >
              Areas
              <ChevronDown
                className={`${CARET_CLASS} ${openMega === "areas" ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {openMega === "areas" ? (
              <div
                id="areas-menu"
                className={`absolute right-0 top-full z-[60] w-[min(100vw-2rem,28rem)] max-w-[calc(100vw-2rem)] pt-1 lg:left-0 lg:right-auto ${dropdownPanelClass}`}
                role="region"
                aria-labelledby="nav-areas-trigger"
                onKeyDown={(e) => handlePanelKeyDown(e, "nav-areas-trigger")}
              >
                <div className="grid max-h-[min(70vh,26rem)] grid-cols-2 gap-0 divide-x divide-edge overflow-y-auto">
                  <div className="min-w-0 px-1 py-2">
                    <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                      California
                    </p>
                    <ul>
                      {californiaAreas.map((a) => (
                        <li key={a.slug}>
                          <Link
                            href={`/service-areas/california/${a.slug}`}
                            className={dropdownLinkClass}
                            onClick={() => {
                              cancelScheduledClose();
                              setOpenMega(null);
                            }}
                          >
                            {a.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/service-areas/california"
                      className="mx-2 mt-2 block rounded-sm px-2 py-1.5 text-xs font-medium text-muted hover:bg-panel hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                      onClick={() => {
                        cancelScheduledClose();
                        setOpenMega(null);
                      }}
                    >
                      California overview
                    </Link>
                  </div>
                  <div className="min-w-0 px-1 py-2">
                    <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted">Texas</p>
                    <ul>
                      {texasAreas.map((a) => (
                        <li key={a.slug}>
                          <Link
                            href={`/service-areas/texas/${a.slug}`}
                            className={dropdownLinkClass}
                            onClick={() => {
                              cancelScheduledClose();
                              setOpenMega(null);
                            }}
                          >
                            {a.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/service-areas/texas"
                      className="mx-2 mt-2 block rounded-sm px-2 py-1.5 text-xs font-medium text-muted hover:bg-panel hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                      onClick={() => {
                        cancelScheduledClose();
                        setOpenMega(null);
                      }}
                    >
                      Texas overview
                    </Link>
                  </div>
                </div>
                <div className="border-t border-edge px-2 py-2">
                  <Link
                    href="/service-areas"
                    className="block rounded-sm px-2 py-1.5 text-xs font-medium text-muted hover:bg-panel hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                    onClick={() => {
                      cancelScheduledClose();
                      setOpenMega(null);
                    }}
                  >
                    All service areas
                  </Link>
                </div>
              </div>
            ) : null}
          </div>

          {mainLinks.map((l) => (
            <Link key={l.href} href={l.href} className={navLinkClass} aria-label={l.ariaLabel}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-menu"
          className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-1.5rem,22rem)] rounded-sm border border-edge bg-card py-2 shadow-[0_6px_20px_rgba(0,0,0,0.5)] lg:hidden"
        >
          <div className="flex flex-col">
            <Link
              href="/"
              className="px-4 py-2.5 text-sm font-medium hover:bg-panel"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            <div className="border-t border-edge">
              <button
                type="button"
                className="focus-ring flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-medium hover:bg-panel"
                aria-expanded={mobileSection === "services"}
                aria-controls="mobile-services-panel"
                onClick={() => toggleMobileSection("services")}
              >
                Services
                <ChevronDown
                  className={`${CARET_CLASS} ${mobileSection === "services" ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              {mobileSection === "services" ? (
                <div id="mobile-services-panel" className="border-t border-edge bg-panel px-2 py-2">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="block rounded-sm px-3 py-2 text-sm text-muted hover:bg-panel hover:text-foreground"
                      onClick={() => {
                        setMobileOpen(false);
                        setMobileSection(null);
                      }}
                    >
                      {s.title}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="mt-1 block rounded-sm px-3 py-2 text-xs font-medium text-muted hover:bg-panel hover:text-foreground"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileSection(null);
                    }}
                  >
                    All services
                  </Link>
                </div>
              ) : null}
            </div>

            <div className="border-t border-edge">
              <button
                type="button"
                className="focus-ring flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-medium hover:bg-panel"
                aria-expanded={mobileSection === "areas"}
                aria-controls="mobile-areas-panel"
                onClick={() => toggleMobileSection("areas")}
              >
                Areas
                <ChevronDown
                  className={`${CARET_CLASS} ${mobileSection === "areas" ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              {mobileSection === "areas" ? (
                <div id="mobile-areas-panel" className="border-t border-edge bg-panel px-2 py-2">
                  <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted">California</p>
                  {californiaAreas.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/service-areas/california/${a.slug}`}
                      className="block rounded-sm px-3 py-1.5 text-sm text-muted hover:bg-panel hover:text-foreground"
                      onClick={() => {
                        setMobileOpen(false);
                        setMobileSection(null);
                      }}
                    >
                      {a.name}
                    </Link>
                  ))}
                  <Link
                    href="/service-areas/california"
                    className="mt-1 block px-3 py-2 text-xs font-medium text-muted hover:text-foreground"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileSection(null);
                    }}
                  >
                    California overview
                  </Link>
                  <p className="mt-3 px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted">Texas</p>
                  {texasAreas.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/service-areas/texas/${a.slug}`}
                      className="block rounded-sm px-3 py-1.5 text-sm text-muted hover:bg-panel hover:text-foreground"
                      onClick={() => {
                        setMobileOpen(false);
                        setMobileSection(null);
                      }}
                    >
                      {a.name}
                    </Link>
                  ))}
                  <Link
                    href="/service-areas/texas"
                    className="mt-1 block px-3 py-2 text-xs font-medium text-muted hover:text-foreground"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileSection(null);
                    }}
                  >
                    Texas overview
                  </Link>
                  <Link
                    href="/service-areas"
                    className="mt-2 block border-t border-edge px-3 py-2 text-xs font-medium text-muted hover:bg-panel hover:text-foreground"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileSection(null);
                    }}
                  >
                    All service areas
                  </Link>
                </div>
              ) : null}
            </div>

            {mainLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="border-t border-edge px-4 py-2.5 text-sm font-medium hover:bg-panel"
                aria-label={l.ariaLabel}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}

            <div className="mt-1 flex flex-col gap-2 border-t border-edge px-4 py-3">
              <Button href="/contact" variant="primary" onClick={() => setMobileOpen(false)}>
                Get a quote
              </Button>
              <Button href="/careers" variant="secondary" onClick={() => setMobileOpen(false)}>
                Join our team
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
};
