"use client";

import { useEffect, useRef } from "react";

// Ekrana girince yumuşakça beliren kutu. JS kapalıysa layout'taki <noscript> stili gösterir.
export default function Belir({ as: Etiket = "div", gecikme = 0, className = "", children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const gozcu = new IntersectionObserver(
      ([giris]) => {
        if (giris.isIntersecting) {
          el.classList.add("gorundu");
          gozcu.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    gozcu.observe(el);
    return () => gozcu.disconnect();
  }, []);

  return (
    <Etiket
      ref={ref}
      data-belir=""
      className={className}
      style={gecikme ? { transitionDelay: `${gecikme}ms` } : undefined}
      {...rest}
    >
      {children}
    </Etiket>
  );
}
