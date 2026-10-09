"use client";

import { useEffect, useRef, useState } from "react";

// Görünür olunca 0'dan hedefe sayan rakam. Sunucuda direkt hedef yazılı gelir (SEO, JS kapalı).
export default function Sayac({ hedef, sure = 1600 }) {
  const ref = useRef(null);
  const [deger, setDeger] = useState(hedef);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const kutu = el.getBoundingClientRect();
    if (kutu.top < window.innerHeight) return; // zaten ekrandaysa sayma, olduğu gibi kalsın

    setDeger(0);
    const gozcu = new IntersectionObserver(([giris]) => {
      if (!giris.isIntersecting) return;
      gozcu.disconnect();
      const basla = performance.now();
      const adim = (simdi) => {
        const t = Math.min((simdi - basla) / sure, 1);
        const yumusak = 1 - Math.pow(1 - t, 3);
        setDeger(Math.round(hedef * yumusak));
        if (t < 1) requestAnimationFrame(adim);
      };
      requestAnimationFrame(adim);
    });
    gozcu.observe(el);
    return () => gozcu.disconnect();
  }, [hedef, sure]);

  return <span ref={ref}>{deger}</span>;
}
