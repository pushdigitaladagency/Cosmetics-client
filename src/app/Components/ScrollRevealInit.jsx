"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Runs the IntersectionObserver-based scroll reveal on every route change.
 * Elements with classes: reveal, reveal-up, reveal-left, reveal-right, reveal-img
 * will animate in when they enter the viewport.
 *
 * Fixes applied:
 *  1. Delay increased to 250ms so React hydration fully settles after hard refresh.
 *  2. Elements already in the viewport (e.g. hero content) get is-visible immediately
 *     via getBoundingClientRect instead of waiting for the async IO callback.
 *  3. Looser threshold (0.08) + smaller rootMargin so elements near the fold still trigger.
 */
export default function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll(
        ".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-img"
      );
      if (!els.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
      );

      els.forEach((el) => {
        // Reset for clean page transitions
        el.classList.remove("is-visible");

        // Immediately reveal elements already visible on screen (hero content on refresh)
        const rect = el.getBoundingClientRect();
        const alreadyInView = rect.top < window.innerHeight - 20 && rect.bottom > 0;
        if (alreadyInView) {
          el.classList.add("is-visible");
        } else {
          observer.observe(el);
        }
      });

      return () => observer.disconnect();
    }, 250);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
