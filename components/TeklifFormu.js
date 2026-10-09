"use client";

import Link from "next/link";
import { useState } from "react";
import { firma, whatsappLink } from "@/data/firma";

// Sunucu tarafında mail servisi yok, o yüzden form WhatsApp'ı hazır mesajla açıyor.
// İstenirse sonradan bir API rotasına çevrilebilir.
export default function TeklifFormu({ bayilik = false }) {
  const [hata, setHata] = useState("");

  function gonder(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const ad = f.get("ad").trim();
    const tel = f.get("telefon").trim();

    if (ad.length < 2 || tel.replace(/\D/g, "").length < 10) {
      setHata("Adınızı ve geçerli bir telefon numarası yazın.");
      return;
    }
    setHata("");

    const satirlar = [
      bayilik ? "Merhaba, bayilik başvurusu yapmak istiyorum." : "Merhaba, toptan fiyat teklifi almak istiyorum.",
      `Ad Soyad: ${ad}`,
      f.get("firma") && `Firma: ${f.get("firma").trim()}`,
      bayilik && f.get("sehir") && `Şehir: ${f.get("sehir").trim()}`,
      bayilik && f.get("isletme") && `İşletme türü: ${f.get("isletme")}`,
      `Telefon: ${tel}`,
      f.get("mesaj") && `Mesaj: ${f.get("mesaj").trim()}`,
    ].filter(Boolean);

    window.open(whatsappLink(satirlar.join("\n")), "_blank", "noopener");
  }

  return (
    <form className="form" onSubmit={gonder} noValidate>
      <div className="form-iki">
        <label>
          Ad soyad
          <input name="ad" type="text" autoComplete="name" required />
        </label>
        <label>
          Telefon
          <input name="telefon" type="tel" autoComplete="tel" placeholder="05xx xxx xx xx" required />
        </label>
      </div>

      <div className="form-iki">
        <label>
          <span>Firma <small>(varsa)</small></span>
          <input name="firma" type="text" autoComplete="organization" />
        </label>
        {bayilik && (
          <label>
            Şehir
            <input name="sehir" type="text" autoComplete="address-level1" />
          </label>
        )}
      </div>

      {bayilik && (
        <label>
          İşletme türü
          <select name="isletme" defaultValue="">
            <option value="">Seçin</option>
            <option>Market / bakkal</option>
            <option>Kuruyemişçi / şekerci</option>
            <option>Toptancı / distribütör</option>
            <option>Kafe / restoran</option>
            <option>Online satıcı</option>
            <option>Diğer</option>
          </select>
        </label>
      )}

      <label>
        Mesajınız
        <textarea
          name="mesaj"
          rows={4}
          placeholder={bayilik ? "Bölgeniz ve ihtiyacınız hakkında kısaca yazın." : "Hangi ürünlerle ilgileniyorsunuz, yaklaşık ne kadar?"}
        />
      </label>

      <p className="form-not">
        Gönder'e basınca WhatsApp açılır ve mesajınız hazır gelir. Bilgileriniz yalnızca size
        dönüş yapmak için kullanılır, ayrıntı için <Link href="/kvkk">KVKK metnine</Link> bakın.
      </p>

      {hata && <p className="form-hata" role="alert">{hata}</p>}

      <div className="form-alt">
        <button type="submit" className="dugme">WhatsApp ile gönder</button>
        <a className="dugme ikinci" href={`mailto:${firma.eposta}`}>E-posta yaz</a>
      </div>
    </form>
  );
}
