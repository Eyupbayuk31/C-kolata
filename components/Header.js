"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { diller, dilBilgi, dilYol, yoldanDil } from "@/lib/dil";

const menu = [
  { href: "/", anahtar: "anasayfa" },
  { href: "/urunler", anahtar: "urunler" },
  { href: "/hakkimizda", anahtar: "hakkimizda" },
  { href: "/haberler", anahtar: "haberler" },
  { href: "/bayilik", anahtar: "bayilik" },
  { href: "/iletisim", anahtar: "iletisim" },
];

export default function Header({ lang, nav, duyuru, duyuruLink }) {
  const [acik, setAcik] = useState(false);
  const [kaydi, setKaydi] = useState(false);
  const yol = usePathname();
  const { yol: dilsizYol } = yoldanDil(yol);

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
    if (href === "/") return dilsizYol === "/";
    return dilsizYol.startsWith(href);
  }

  const sinif = ["ust", kaydi || acik ? "dolu" : "", acik ? "menu-acik" : ""].join(" ");

  return (
    <header className={sinif}>
      {duyuru && (
        <div className="duyuru">
          {duyuruLink ? (
            <a href={duyuruLink} target={duyuruLink.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
              {duyuru}
            </a>
          ) : (
            <span>{duyuru}</span>
          )}
        </div>
      )}
      <div className="kap ust-ic">
        <Link href={dilYol(lang, "/")} className="logo" onClick={() => setAcik(false)}>
          <Image src="/img/logo.webp" alt="MB Çikolata" width={150} height={56} priority />
        </Link>

        <nav id="ana-menu" className="menu" aria-label={nav.menu}>
          {menu.map((m, i) => (
            <Link
              key={m.href}
              href={dilYol(lang, m.href)}
              className={aktifMi(m.href) ? "aktif" : undefined}
              style={{ "--sira": i }}
              onClick={() => setAcik(false)}
            >
              {nav[m.anahtar]}
            </Link>
          ))}
          <Link href={`${dilYol(lang, "/iletisim")}#teklif`} className="dugme kucuk" onClick={() => setAcik(false)}>
            {nav.teklif}
          </Link>

          <div className="dil-secici" role="group" aria-label={nav.dil}>
            {diller.map((d) => (
              <Link
                key={d}
                // kök layout (html lang/dir) değiştiği için Next burada tam sayfa yüklemesi yapıyor
                href={dilYol(d, dilsizYol)}
                prefetch={false}
                hrefLang={d}
                lang={d}
                className={d === lang ? "aktif" : undefined}
                aria-current={d === lang ? "true" : undefined}
                title={dilBilgi[d].ad}
              >
                {dilBilgi[d].kisa}
              </Link>
            ))}
          </div>
        </nav>

        <button className="menu-dugme" aria-expanded={acik} aria-controls="ana-menu" onClick={() => setAcik(!acik)}>
          <span className="sr-only">{nav.menu}</span>
          <span className="cizgiler" />
        </button>
      </div>
    </header>
  );
}
