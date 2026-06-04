"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Runs the IntersectionObserver-based scroll reveal on every route change.
 * Elements with classes: reveal, reveal-up, reveal-left, reveal-right, reveal-img
 * will animate in when they enter the viewport.
 */
export default function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay so the new page's DOM is painted
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
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );

      els.forEach((el) => {
        // Reset visibility for page transitions
        el.classList.remove("is-visible");
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
