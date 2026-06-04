"use client";

import { useEffect, useState } from "react";
import "./Preloader.css";

export default function Preloader() {
  const [phase, setPhase] = useState("enter"); // enter → hold → exit → done
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll while preloader is active
    document.body.style.overflow = "hidden";

    // Animate progress bar
    let start = null;
    const duration = 1800;

    const tick = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        // Hold briefly then exit
        setTimeout(() => {
          setPhase("exit");
          setTimeout(() => {
            setPhase("done");
            document.body.style.overflow = "";
            // Trigger scroll reveal for elements already in view
            triggerReveal();
          }, 900);
        }, 200);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  // Intersection Observer for scroll reveal
  useEffect(() => {
    if (phase !== "done") return;
    triggerReveal();
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div className={`preloader ${phase === "exit" ? "preloader--exit" : ""}`}>
      {/* Background curtain */}
      <div className="preloader__curtain preloader__curtain--top" />
      <div className="preloader__curtain preloader__curtain--bottom" />

      {/* Center content */}
      <div className="preloader__center">
        {/* Logo */}
        <div className="preloader__logo-wrap">
          <img
            src="/images/Organic_logo.svg"
            alt="Organic Heritage Cosmetics"
            className="preloader__logo"
          />
        </div>

        {/* Brand name */}
        <p className="preloader__brand">ORGANIC HERITAGE COSMETICS</p>

        {/* Progress bar */}
        <div className="preloader__track">
          <div
            className="preloader__bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Tagline */}
        <p className="preloader__tagline">Pure · Botanical · Crafted</p>
      </div>
    </div>
  );
}

/* ---- Scroll Reveal Helper ---- */
function triggerReveal() {
  const els = document.querySelectorAll(
    "[data-reveal], .reveal, .reveal-img, .reveal-left, .reveal-right, .reveal-up"
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
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  els.forEach((el) => observer.observe(el));
}
