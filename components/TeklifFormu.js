"use client";

import { useState } from "react";
import Metin from "@/components/Metin";

// Sunucu tarafında mail servisi yok, o yüzden form WhatsApp'ı hazır mesajla açıyor.
// f: lib/ui sözlüğündeki form metinleri, wa: WhatsApp numarası (sadece rakam)
export default function TeklifFormu({ lang, f, wa, eposta, bayilik = false }) {
  const [hata, setHata] = useState("");

  function gonder(e) {
    e.preventDefault();
    const v = new FormData(e.currentTarget);
    const ad = v.get("ad").trim();
    const tel = v.get("telefon").trim();

    if (ad.length < 2 || tel.replace(/\D/g, "").length < 10) {
      setHata(f.hata);
      return;
    }
    setHata("");

    const satirlar = [
      bayilik ? f.msgBayi : f.msgTeklif,
      `${f.msgAd}: ${ad}`,
      v.get("firma") && `${f.msgFirma}: ${v.get("firma").trim()}`,
      bayilik && v.get("sehir") && `${f.msgSehir}: ${v.get("sehir").trim()}`,
      bayilik && v.get("isletme") && `${f.msgIsletme}: ${v.get("isletme")}`,
      `${f.msgTelefon}: ${tel}`,
      v.get("mesaj") && `${f.msgMesaj}: ${v.get("mesaj").trim()}`,
    ].filter(Boolean);

    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(satirlar.join("\n"))}`, "_blank", "noopener");
  }

  return (
    <form className="form" onSubmit={gonder} noValidate>
      <div className="form-iki">
        <label>
          {f.adSoyad}
          <input name="ad" type="text" autoComplete="name" required />
        </label>
        <label>
          {f.telefon}
          <input name="telefon" type="tel" dir="ltr" autoComplete="tel" placeholder={f.telefonIpucu} required />
        </label>
      </div>

      <div className="form-iki">
        <label>
          <span>
            {f.firma} <small>{f.varsa}</small>
          </span>
          <input name="firma" type="text" autoComplete="organization" />
        </label>
        {bayilik && (
          <label>
            {f.sehir}
            <input name="sehir" type="text" autoComplete="address-level1" />
          </label>
        )}
      </div>

      {bayilik && (
        <label>
          {f.isletme}
          <select name="isletme" defaultValue="">
            <option value="">{f.sec}</option>
            {f.isletmeler.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      )}

      <label>
        {f.mesaj}
        <textarea name="mesaj" rows={4} placeholder={bayilik ? f.mesajIpucuBayi : f.mesajIpucuTeklif} />
      </label>

      <p className="form-not">
        <Metin metin={f.not} lang={lang} />
      </p>

      {hata && (
        <p className="form-hata" role="alert">
          {hata}
        </p>
      )}

      <div className="form-alt">
        <button type="submit" className="dugme">
          {f.gonder}
        </button>
        <a className="dugme ikinci" href={`mailto:${eposta}`}>
          {f.epostaYaz}
        </a>
      </div>
    </form>
  );
}
