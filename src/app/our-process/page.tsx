"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Static export cannot use `redirects()` in next.config. Preserve the old path in the URL bar
 * by sending users to the homepage process section.
 */
export default function OurProcessRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/#our-process");
  }, [router]);

  return (
    <p className="mx-auto max-w-md px-6 py-24 text-center text-sm text-muted-on-light">
      Taking you to Our process…
    </p>
  );
}
