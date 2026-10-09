"use client";

import { useState } from "react";

export const DILLER = [
  { kod: "tr", ad: "Türkçe", dir: "ltr" },
  { kod: "en", ad: "English", dir: "ltr" },
  { kod: "ar", ad: "العربية", dir: "rtl" },
];

// Üç dilli metin alanlarını bir arada tutan sekmeler. Çevirisi boş olan sekmede nokta çıkar.
export function DilSekmeleri({ dil, setDil, kontrol = [] }) {
  return (
    <div className="dil-sekme" role="tablist" aria-label="Dil">
      {DILLER.map((d) => {
        const eksik = d.kod !== "tr" && kontrol.some((alan) => !String(alan?.[d.kod] || "").trim());
        return (
          <button
            key={d.kod}
            type="button"
            role="tab"
            aria-selected={dil === d.kod}
            className={dil === d.kod ? "aktif" : undefined}
            onClick={() => setDil(d.kod)}
          >
            {d.ad}
            {eksik && <i title="Bu dilde çeviri eksik, Türkçe metin gösterilir" />}
          </button>
        );
      })}
    </div>
  );
}

export function Alan({ etiket, ipucu, children }) {
  return (
    <label className="alan">
      <span className="alan-etiket">{etiket}</span>
      {children}
      {ipucu && <small>{ipucu}</small>}
    </label>
  );
}

// {tr, en, ar} biçimli bir alanı, seçili dile göre düzenler
export function DilliGirdi({ etiket, ipucu, deger, degistir, dil, satir = 0, gerekli = false }) {
  const yon = DILLER.find((d) => d.kod === dil)?.dir;
  const ortak = {
    value: deger?.[dil] || "",
    dir: yon,
    lang: dil,
    onChange: (e) => degistir({ ...deger, [dil]: e.target.value }),
    required: gerekli && dil === "tr",
  };
  return (
    <Alan etiket={`${etiket}${gerekli ? " *" : ""}`} ipucu={dil !== "tr" ? "Boş bırakırsanız Türkçe metin gösterilir." : ipucu}>
      {satir ? <textarea rows={satir} {...ortak} /> : <input type="text" {...ortak} />}
    </Alan>
  );
}

export function Bildirim({ bildirim, kapat }) {
  if (!bildirim) return null;
  return (
    <div className={`bildirim ${bildirim.tur}`} role={bildirim.tur === "hata" ? "alert" : "status"}>
      <span>{bildirim.metin}</span>
      <button type="button" onClick={kapat} aria-label="Kapat">
        ×
      </button>
    </div>
  );
}

// Silmeden önce emin misiniz? kutusu
export function Onayli({ metin, onay, children, className = "" }) {
  const [soruluyor, setSoruluyor] = useState(false);
  if (!soruluyor) {
    return (
      <button type="button" className={className} onClick={() => setSoruluyor(true)}>
        {children}
      </button>
    );
  }
  return (
    <span className="onay-kutusu">
      {metin}
      <button type="button" className="tehlike" onClick={() => { setSoruluyor(false); onay(); }}>
        Evet, sil
      </button>
      <button type="button" onClick={() => setSoruluyor(false)}>
        Vazgeç
      </button>
    </span>
  );
}
