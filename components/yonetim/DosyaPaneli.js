"use client";

import { useState } from "react";
import { dosyaBase64 } from "@/lib/gorselIsle";
import { yol } from "@/lib/yol";

const SINIR_MB = 25;

export default function DosyaPaneli({ kaydet, mesgul, bildir }) {
  const [pdf, setPdf] = useState(null);

  function sec(e) {
    const dosya = e.target.files?.[0];
    if (!dosya) return;
    if (dosya.type !== "application/pdf") return bildir({ tur: "hata", metin: "Lütfen bir PDF dosyası seçin." });
    if (dosya.size > SINIR_MB * 1024 * 1024) {
      return bildir({ tur: "hata", metin: `Dosya ${SINIR_MB} MB'dan büyük. PDF'i küçültüp tekrar deneyin (ör. ilovepdf.com).` });
    }
    setPdf(dosya);
  }

  async function yukle() {
    const base64 = await dosyaBase64(pdf);
    const ok = await kaydet({ mesaj: "Panel: ürün kataloğu güncellendi", dosyalar: [{ yol: "public/Katalog.pdf", base64 }] }, "Katalog yüklendi. Site 1-2 dakika içinde güncellenecek.");
    if (ok) setPdf(null);
  }

  return (
    <section>
      <h2>Ürün kataloğu (PDF)</h2>
      <p>
        Sitedeki “Ürün kataloğu” bağlantıları bu dosyayı açar. Mevcut katalog:{" "}
        <a href={yol("/Katalog.pdf")} target="_blank" rel="noopener noreferrer">
          Katalog.pdf ↗
        </a>
      </p>
      <p className="ipucu">Mobilde hızlı açılması için dosyanın 5 MB civarında olması iyi olur. En fazla {SINIR_MB} MB yüklenebilir.</p>

      <label className="dosya-sec genis">
        {pdf ? `Seçilen: ${pdf.name} (${(pdf.size / 1048576).toFixed(1)} MB)` : "PDF seç…"}
        <input type="file" accept="application/pdf" onChange={sec} hidden />
      </label>
      <div className="form-alt yapisik">
        <button type="button" className="birincil" disabled={!pdf || mesgul} onClick={yukle}>
          {mesgul ? "Yükleniyor…" : "Kataloğu yükle"}
        </button>
      </div>
    </section>
  );
}
