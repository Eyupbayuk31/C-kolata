"use client";

import { useEffect, useRef } from "react";

// Sayfa geneli küçük etkileşimler: okuma çubuğu, kartlarda imleci izleyen ışık, hero'da hafif paralaks.
export default function Etkilesim() {
  const cubuk = useRef(null);

  useEffect(() => {
    const azHareket = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dokunmatik = matchMedia("(hover: none)").matches;

    let bekliyor = false;
    const kaydir = () => {
      if (bekliyor) return;
      bekliyor = true;
      requestAnimationFrame(() => {
        const yukseklik = document.documentElement.scrollHeight - innerHeight;
        const oran = yukseklik > 0 ? Math.min(scrollY / yukseklik, 1) : 0;
        if (cubuk.current) cubuk.current.style.transform = `scaleX(${oran})`;
        bekliyor = false;
      });
    };
    addEventListener("scroll", kaydir, { passive: true });
    kaydir();

    const isikli = ".urun-karti, .kutu, .adim, .tesis-bilgi > div";
    const imlec = (e) => {
      const kart = e.target.closest?.(isikli);
      if (kart) {
        const k = kart.getBoundingClientRect();
        kart.style.setProperty("--mx", `${e.clientX - k.left}px`);
        kart.style.setProperty("--my", `${e.clientY - k.top}px`);
      }
      const vitrin = e.target.closest?.(".kahraman");
      if (vitrin && !azHareket) {
        const k = vitrin.getBoundingClientRect();
        vitrin.style.setProperty("--px", ((e.clientX - k.left) / k.width - 0.5).toFixed(3));
        vitrin.style.setProperty("--py", ((e.clientY - k.top) / k.height - 0.5).toFixed(3));
      }
    };
    if (!dokunmatik) addEventListener("pointermove", imlec, { passive: true });

    return () => {
      removeEventListener("scroll", kaydir);
      removeEventListener("pointermove", imlec);
    };
  }, []);

  return <div className="ilerleme" ref={cubuk} aria-hidden="true" />;
}
