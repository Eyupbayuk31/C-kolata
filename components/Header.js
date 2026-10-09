"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/", ad: "Anasayfa" },
  { href: "/urunler", ad: "Ürünler" },
  { href: "/hakkimizda", ad: "Hakkımızda" },
  { href: "/haberler", ad: "Haberler" },
  { href: "/bayilik", ad: "Bayilik" },
  { href: "/iletisim", ad: "İletişim" },
];

export default function Header() {
  const [acik, setAcik] = useState(false);
  const [kaydi, setKaydi] = useState(false);
  const yol = usePathname();

  // sayfanın tepesindeyken menü şeffaf, aşağı inince koyulaşıyor
  useEffect(() => {
    const bak = () => setKaydi(window.scrollY > 40);
    bak();
    window.addEventListener("scroll", bak, { passive: true });
    return () => window.removeEventListener("scroll", bak);
  }, []);

  // mobil menü açıkken arkadaki sayfa kaymasın
  useEffect(() => {
    document.body.style.overflow = acik ? "hidden" : "";
  }, [acik]);

  function aktifMi(href) {
    if (href === "/") return yol === "/";
    return yol.startsWith(href);
  }

  const sinif = ["ust", kaydi || acik ? "dolu" : "", acik ? "menu-acik" : ""].join(" ");

  return (
    <header className={sinif}>
      <div className="kap ust-ic">
        <Link href="/" className="logo" onClick={() => setAcik(false)}>
          <Image src="/img/logo.webp" alt="MB Çikolata" width={150} height={56} priority />
        </Link>

        <nav id="ana-menu" className="menu">
          {menu.map((m, i) => (
            <Link
              key={m.href}
              href={m.href}
              className={aktifMi(m.href) ? "aktif" : undefined}
              style={{ "--sira": i }}
              onClick={() => setAcik(false)}
            >
              {m.ad}
            </Link>
          ))}
          <Link href="/iletisim#teklif" className="dugme kucuk" onClick={() => setAcik(false)}>
            Teklif İste
          </Link>
        </nav>

        <button
          className="menu-dugme"
          aria-expanded={acik}
          aria-controls="ana-menu"
          onClick={() => setAcik(!acik)}
        >
          <span className="sr-only">Menü</span>
          <span className="cizgiler" />
        </button>
      </div>
    </header>
  );
}
