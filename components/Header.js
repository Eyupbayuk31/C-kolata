"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
  const yol = usePathname();

  function aktifMi(href) {
    if (href === "/") return yol === "/";
    return yol.startsWith(href);
  }

  return (
    <header className="ust">
      <div className="kap ust-ic">
        <Link href="/" className="logo" onClick={() => setAcik(false)}>
          <Image src="/img/logo.webp" alt="MB Çikolata" width={150} height={56} priority />
        </Link>

        <button
          className="menu-dugme"
          aria-expanded={acik}
          aria-controls="ana-menu"
          onClick={() => setAcik(!acik)}
        >
          <span className="sr-only">Menü</span>
          <span className={acik ? "cizgiler acik" : "cizgiler"} />
        </button>

        <nav id="ana-menu" className={acik ? "menu acik" : "menu"}>
          {menu.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={aktifMi(m.href) ? "aktif" : undefined}
              onClick={() => setAcik(false)}
            >
              {m.ad}
            </Link>
          ))}
          <Link href="/iletisim#teklif" className="dugme kucuk" onClick={() => setAcik(false)}>
            Teklif İste
          </Link>
        </nav>
      </div>
    </header>
  );
}
