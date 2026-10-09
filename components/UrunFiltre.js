"use client";

import { useState } from "react";
import UrunKarti from "@/components/UrunKarti";

// Kategoriye göre süzülen ürün listesi. Metinler sunucudan zaten dile çevrilmiş gelir.
export default function UrunFiltre({ lang, urunler, kategoriler, tumu, incele, altYazi }) {
  const [secili, setSecili] = useState("hepsi");
  const gorunen = secili === "hepsi" ? kategoriler : kategoriler.filter((k) => k.anahtar === secili);

  return (
    <>
      {kategoriler.length > 1 && (
        <div className="filtre" role="group">
          {[{ anahtar: "hepsi", etiket: tumu }, ...kategoriler].map((k) => (
            <button
              key={k.anahtar}
              type="button"
              className={k.anahtar === secili ? "aktif" : undefined}
              aria-pressed={k.anahtar === secili}
              onClick={() => setSecili(k.anahtar)}
            >
              {k.etiket}
            </button>
          ))}
        </div>
      )}

      {gorunen.map((kat) => {
        const liste = urunler.filter((u) => u.kategoriAnahtar === kat.anahtar);
        if (!liste.length) return null;
        return (
          <section key={kat.anahtar} className="kategori">
            <h2>{kat.etiket}</h2>
            <div className="urun-izgara">
              {liste.map((u, i) => (
                <UrunKarti key={u.slug} urun={u} lang={lang} incele={incele} altYazi={altYazi} oncelikli={i < 4} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
